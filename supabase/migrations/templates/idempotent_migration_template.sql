-- IDEMPOTENT MIGRATION TEMPLATE
-- Copy and adapt this template to create robust, idempotent migrations

-- MIGRATION HEADER
---------------------------------------------------------------------------
-- Migration: [YYYY-MM-DD]_[VERSION]_[NAME].sql
-- Description: [BRIEF DESCRIPTION]
---------------------------------------------------------------------------

-- MIGRATION TRANSACTION 
-- Wrapping in a transaction ensures the migration is atomic
BEGIN;

-- DECLARE VARIABLES FOR TRACKING
DO $$
DECLARE
    migration_id INTEGER;
    start_time TIMESTAMPTZ;
    end_time TIMESTAMPTZ;
    execution_time_ms INTEGER;
BEGIN
    -- Record start time
    start_time := clock_timestamp();
    
    -- SCHEMA CREATION (IDEMPOTENT)
    ---------------------------------------------------------------------------
    IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'my_schema') THEN
        CREATE SCHEMA my_schema;
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Created schema my_schema'
        );
    ELSE
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Schema my_schema already exists, skipping creation'
        );
    END IF;

    -- TABLE CREATION (IDEMPOTENT)
    ---------------------------------------------------------------------------
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'my_schema' AND table_name = 'my_table') THEN
        CREATE TABLE my_schema.my_table (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Created table my_schema.my_table'
        );
    ELSE
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Table my_schema.my_table already exists, skipping creation'
        );
    END IF;

    -- INDEX CREATION (IDEMPOTENT)
    ---------------------------------------------------------------------------
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'my_schema' AND tablename = 'my_table' AND indexname = 'idx_my_table_name') THEN
        CREATE INDEX idx_my_table_name ON my_schema.my_table (name);
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Created index idx_my_table_name'
        );
    ELSE
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Index idx_my_table_name already exists, skipping creation'
        );
    END IF;

    -- COLUMN ADDITION (IDEMPOTENT)
    ---------------------------------------------------------------------------
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'my_schema' AND table_name = 'my_table' AND column_name = 'status') THEN
        ALTER TABLE my_schema.my_table ADD COLUMN status TEXT DEFAULT 'active';
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Added column status to my_schema.my_table'
        );
    ELSE
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Column status already exists in my_schema.my_table, skipping addition'
        );
    END IF;

    -- FUNCTION CREATION (IDEMPOTENT)
    ---------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION my_schema.my_function() 
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    
    PERFORM migration_meta.log_migration(
        migration_id, 
        'INFO', 
        'Created or replaced function my_schema.my_function'
    );

    -- TRIGGER CREATION (IDEMPOTENT)
    ---------------------------------------------------------------------------
    DO $TRIGGER$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_my_table_updated_at' AND tgrelid = 'my_schema.my_table'::regclass) THEN
            CREATE TRIGGER trg_my_table_updated_at
            BEFORE UPDATE ON my_schema.my_table
            FOR EACH ROW
            EXECUTE FUNCTION my_schema.my_function();
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Created trigger trg_my_table_updated_at'
            );
        ELSE
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Trigger trg_my_table_updated_at already exists, skipping creation'
            );
        END IF;
    END $TRIGGER$;

    -- RLS POLICY MANAGEMENT (IDEMPOTENT)
    ---------------------------------------------------------------------------
    -- Enable RLS
    ALTER TABLE my_schema.my_table ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policy if it exists and recreate it (safe way to update policies)
    DROP POLICY IF EXISTS policy_my_table_select ON my_schema.my_table;
    
    CREATE POLICY policy_my_table_select ON my_schema.my_table
    FOR SELECT
    USING (auth.uid() IS NOT NULL);
    
    PERFORM migration_meta.log_migration(
        migration_id, 
        'INFO', 
        'Setup RLS policies for my_schema.my_table'
    );

    -- EXTENSION MANAGEMENT (IDEMPOTENT)
    ---------------------------------------------------------------------------
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_stat_statements') THEN
        CREATE EXTENSION pg_stat_statements;
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Created extension pg_stat_statements'
        );
    ELSE
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Extension pg_stat_statements already exists, skipping creation'
        );
    END IF;

    -- RECORD EXECUTION TIME
    ---------------------------------------------------------------------------
    end_time := clock_timestamp();
    execution_time_ms := extract(epoch from (end_time - start_time)) * 1000;
    
    -- Register successful migration
    PERFORM migration_meta.register_migration(
        '[VERSION]',
        '[NAME]',
        '[BRIEF DESCRIPTION]',
        TRUE,
        execution_time_ms
    );
    
    EXCEPTION WHEN OTHERS THEN
        -- Log error and register failed migration
        PERFORM migration_meta.log_migration(
            migration_id, 
            'ERROR', 
            'Migration failed: ' || SQLERRM,
            jsonb_build_object('error_detail', SQLSTATE)
        );
        
        PERFORM migration_meta.register_migration(
            '[VERSION]',
            '[NAME]',
            '[BRIEF DESCRIPTION]',
            FALSE,
            NULL
        );
        
        RAISE;
END;
$$;

COMMIT; 