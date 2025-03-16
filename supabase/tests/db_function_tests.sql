-- Database function tests using pgTAP
-- Run with: psql -d your_database -f db_function_tests.sql

-- Load pgTAP
BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap;

-- Plan the tests
SELECT plan(12);

-- Test the update_updated_at_column function
SELECT has_function(
    'public', 'update_updated_at_column', ARRAY[]::text[],
    'Function update_updated_at_column should exist'
);

-- Test migration tracking function: register_migration
SELECT has_function(
    'migration_meta', 'register_migration', ARRAY['text', 'integer', 'integer', 'integer', 'text', 'text'],
    'Function register_migration should exist'
);

SELECT has_function(
    'migration_meta', 'get_latest_version', ARRAY[]::text[],
    'Function get_latest_version should exist'
);

-- Test is_admin function
SELECT has_function(
    'public', 'is_admin', ARRAY['uuid'],
    'Function is_admin should exist'
);

-- Test onboarding function
SELECT has_function(
    'public', 'mark_onboarding_action_completed', ARRAY['text'],
    'Function mark_onboarding_action_completed should exist'
);

-- Create test user for functional tests
DO $$
DECLARE
    test_user_id UUID;
BEGIN
    -- Create a test user in auth.users
    INSERT INTO auth.users (id, email)
    VALUES (gen_random_uuid(), 'test_function@example.com')
    RETURNING id INTO test_user_id;
    
    -- Set auth.uid() to return our test user
    PERFORM set_config('request.jwt.claim.sub', test_user_id::text, false);
    
    -- Insert a test admin user
    INSERT INTO public.admin_users (user_id, is_admin)
    VALUES (test_user_id, true);
    
    -- Test is_admin function
    PERFORM ok(
        is_admin(test_user_id) = true,
        'is_admin function should correctly identify an admin user'
    );
    
    -- Create a non-admin user
    INSERT INTO auth.users (id, email)
    VALUES (gen_random_uuid(), 'test_nonadmin@example.com')
    RETURNING id INTO test_user_id;
    
    -- Test is_admin function with non-admin
    PERFORM ok(
        is_admin(test_user_id) = false,
        'is_admin function should correctly identify a non-admin user'
    );
    
    -- Test migration_meta.register_migration function
    PERFORM migration_meta.register_migration(
        'test_version',
        9,
        9,
        9,
        'Test migration',
        'test_migration.sql'
    );
    
    PERFORM ok(
        EXISTS (
            SELECT 1 FROM migration_meta.versions 
            WHERE version = 'test_version'
        ),
        'register_migration should insert a record into migration_meta.versions'
    );
    
    -- Test batch process status function if it exists
    IF EXISTS (
        SELECT 1 FROM pg_proc 
        WHERE proname = 'update_batch_process_status'
    ) THEN
        PERFORM has_function(
            'public', 'update_batch_process_status', ARRAY[]::text[],
            'Function update_batch_process_status should exist'
        );
    END IF;
    
    -- Test trigger functions
    PERFORM has_trigger(
        'public', 'user_onboarding', 'update_user_onboarding_updated_at',
        'Trigger update_user_onboarding_updated_at should exist on user_onboarding'
    );
    
    PERFORM has_trigger(
        'public', 'documents', 'update_documents_updated_at',
        'Trigger update_documents_updated_at should exist on documents'
    );

    -- Clean up our test data after we're done
    DELETE FROM public.admin_users WHERE user_id = test_user_id;
    DELETE FROM auth.users WHERE email IN ('test_function@example.com', 'test_nonadmin@example.com');
    DELETE FROM migration_meta.versions WHERE version = 'test_version';
END
$$;

-- Check specific behavior of update_updated_at_column
CREATE TEMPORARY TABLE test_updated_at (
    id SERIAL PRIMARY KEY,
    data TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER update_test_updated_at
BEFORE UPDATE ON test_updated_at
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert test data
INSERT INTO test_updated_at (data) VALUES ('original');

-- Sleep to ensure timestamps will be different
SELECT pg_sleep(1);

-- Update the record
UPDATE test_updated_at SET data = 'updated' WHERE id = 1;

-- Test that updated_at was changed
SELECT ok(
    (SELECT updated_at > created_at FROM test_updated_at WHERE id = 1),
    'update_updated_at_column should update the updated_at timestamp'
);

-- Finish the test
SELECT * FROM finish();
ROLLBACK; 