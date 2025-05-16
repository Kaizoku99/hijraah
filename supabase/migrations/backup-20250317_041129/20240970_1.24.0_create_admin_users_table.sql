-- Added by syntax fixer script
BEGIN;
BEGIN;
BEGIN;
BEGIN;
-- Migration: 20240970_1.24.0_create_admin_users_table.sql
-- Description: Creates the missing admin_users table and fixes authentication method

-- Register migration in metadata if the function exists
DO $$
DECLARE
    migration_id TEXT := '20240970';
    migration_name TEXT := '1.24.0_create_admin_users_table';
BEGIN
    -- Register migration if the function exists
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'register_migration') THEN
        PERFORM migration_meta.register_migration(
            migration_name,
            1, -- major
            24, -- minor 
            0, -- patch
            'Creates admin_users table and fixes auth',
            '20240970_1.24.0_create_admin_users_table.sql'
        );
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Failed to register migration metadata: %', SQLERRM;
END $$;

-- Create admin_users table
DO $$
BEGIN
    -- Create the admin_users table if it doesn't exist
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'admin_users'
    ) THEN
        CREATE TABLE public.admin_users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
            is_admin BOOLEAN NOT NULL DEFAULT TRUE,
            permissions JSONB DEFAULT '{}'::JSONB,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE(user_id)
        );
        
        -- Add RLS policies
        ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
        
        -- Allow users to view their own admin status
        CREATE POLICY "Users can view their own admin status"
            ON public.admin_users
            FOR SELECT
            USING (auth.uid() = user_id);
            
        -- Allow admins to manage admin_users
        CREATE POLICY "Admins can manage admin users"
            ON public.admin_users
            USING (EXISTS (
                SELECT 1 FROM public.admin_users
                WHERE user_id = auth.uid()
                AND is_admin = TRUE
            ));
        
        -- Create function to check if a user is admin
        CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID DEFAULT NULL)
        RETURNS BOOLEAN AS $$
        DECLARE
            target_id UUID;
        BEGIN
            -- Use provided ID or current user ID
            target_id := COALESCE(check_user_id, auth.uid());
            
            -- Return false if no user ID
            IF target_id IS NULL THEN
                RETURN FALSE;
            END IF;
            
            -- Check admin status
            RETURN EXISTS (
                SELECT 1
                FROM public.admin_users
                WHERE user_id = target_id
                AND is_admin = TRUE
            );
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
        
        COMMENT ON FUNCTION public.is_admin(UUID) IS 'Checks if a user is an admin';
        
        -- Create a trigger to update the updated_at timestamp
        CREATE OR REPLACE FUNCTION public.update_admin_users_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        
        CREATE TRIGGER update_admin_users_updated_at
        BEFORE UPDATE ON public.admin_users
        FOR EACH ROW
        EXECUTE FUNCTION public.update_admin_users_updated_at();
        
        RAISE NOTICE 'Created admin_users table and related objects';
    ELSE
        RAISE NOTICE 'admin_users table already exists';
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Error creating admin_users table: %', SQLERRM;
END $$;

-- Add sample admin user if needed for testing
DO $$
DECLARE
    first_user_id UUID;
BEGIN
    -- Get the first user from auth.users if it exists
    SELECT id INTO first_user_id FROM auth.users LIMIT 1;
    
    -- If we have a user and no admin users exist, create a test admin
    IF first_user_id IS NOT NULL AND 
       NOT EXISTS (SELECT 1 FROM public.admin_users) THEN
        INSERT INTO public.admin_users (user_id, is_admin)
        VALUES (first_user_id, TRUE);
        
        RAISE NOTICE 'Created sample admin user for ID: %', first_user_id;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Error creating sample admin user: %', SQLERRM;
END $$;

-- Get first user in the system
INSERT INTO public.admin_users (user_id, is_admin)
SELECT id, TRUE FROM auth.users LIMIT 1; 
