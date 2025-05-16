-- Added by syntax fixer script
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
BEGIN;
-- Migration: 20250317_1.26.0_consolidated_fixes.sql
-- Description: Consolidated fixes and duplicate migrations resolution
-- Created: 03/17/2025 04:03:25

-- Begin transaction for atomicity
BEGIN;

-- Register this migration
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'register_migration') THEN
        PERFORM migration_meta.register_migration(
            1, 26, 0,
            'Consolidated fixes and duplicate migrations resolution',
            '20250317_1.26.0_consolidated_fixes.sql'
        );
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Failed to register migration metadata: %', SQLERRM;
END $$;

-- Log the start of the migration
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Starting consolidated fixes migration');

-- =====================================================
-- 2. CONSOLIDATED FIX FILES
-- =====================================================

-- -----------------------------------------------------
-- Consolidated from fix file: 20240940_1.20.0_migration_fixes.sql
-- -----------------------------------------------------
-- Added by syntax fixer script
-- Transaction markers removed during consolidation
-- Transaction markers removed during consolidation
-- Transaction markers removed during consolidation
-- Transaction markers removed during consolidation
-- Transaction markers removed during consolidation
-- 20240940_1.20.0_migration_fixes.sql
-- Migration to fix various issues from previous migrations and restore functionality

-- Wrap the entire migration in a transaction
-- Transaction markers removed during consolidation

-- Fix for document_categories table if it doesn't exist
DO $$
BEGIN
    -- Check if document_categories table exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'document_categories') THEN
        CREATE TABLE public.document_categories (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            description TEXT,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );
        
        -- Create RLS policies
        ALTER TABLE public.document_categories ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for viewing categories (everyone can view)
        CREATE POLICY "Anyone can view document categories" 
        ON public.document_categories FOR SELECT
        USING (true);
        
        -- Create policy for managing categories (only admins)
        CREATE POLICY "Only admins can manage document categories" 
        ON public.document_categories FOR ALL
        USING (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND is_admin = true
            )
        );
        
        RAISE NOTICE 'Created document_categories table successfully';
    ELSE
        RAISE NOTICE 'document_categories table already exists';
    END IF;
END $$;

-- Fix for the profiles table to ensure is_admin column exists
DO $$
BEGIN
    -- Check if is_admin column exists in profiles table
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_schema = 'public' 
                       AND table_name = 'profiles' 
                       AND column_name = 'is_admin') THEN
            ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
            RAISE NOTICE 'Added is_admin column to profiles table';
        ELSE
            RAISE NOTICE 'is_admin column already exists in profiles table';
        END IF;
    END IF;
END $$;

-- Fix policy references to use id instead of user_id in profiles table
DO $$
BEGIN
    -- Fix policies that reference profiles table with incorrect column (user_id instead of id)
    
    -- Fix for fine_tuning_jobs policies
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Fine-tuning jobs viewable by admins') THEN
        DROP POLICY "Fine-tuning jobs viewable by admins" ON public.fine_tuning_jobs;
        
        CREATE POLICY "Fine-tuning jobs viewable by admins" 
        ON public.fine_tuning_jobs FOR SELECT 
        TO authenticated 
        USING (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND is_admin = true
            )
        );
        
        RAISE NOTICE 'Fixed Fine-tuning jobs policy to use correct id column';
    END IF;
    
    -- Fix for AI feedback policies
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'AI feedback viewable by admins') THEN
        DROP POLICY "AI feedback viewable by admins" ON public.ai_feedback;
        
        CREATE POLICY "AI feedback viewable by admins" 
        ON public.ai_feedback FOR SELECT 
        TO authenticated 
        USING (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND is_admin = true
            )
        );
        
        RAISE NOTICE 'Fixed AI feedback policy to use correct id column';
    END IF;
    
    -- Fix for any other policies with the same issue
    -- Add more policy fixes here if needed
END $$;

-- Helper function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    is_admin_result BOOLEAN;
BEGIN
    -- Check if the current user has admin privileges
    SELECT is_admin INTO is_admin_result
    FROM public.profiles
    WHERE id = auth.uid();
    
    -- Return false if no profile found or not admin
    RETURN COALESCE(is_admin_result, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.is_admin() IS 'Checks if the current user has admin privileges';

-- Create trigger to automatically create a profile when a user is created
DO $$
BEGIN
    -- Check if the trigger already exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created' 
        AND tgrelid = 'auth.users'::regclass
    ) THEN
        -- Create the function first
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO public.profiles (id, first_name, last_name, avatar_url, is_admin)
            VALUES (
                NEW.id,
                COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
                COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
                COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
                FALSE -- Default not admin
            );
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
        
        -- Create the trigger
        CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
        
        RAISE NOTICE 'Created user profile trigger successfully';
    ELSE
        RAISE NOTICE 'User profile trigger already exists';
    END IF;
END $$;

-- Commit the transaction
-- Transaction markers removed during consolidation 



-- -----------------------------------------------------
-- Consolidated from fix file: 20240941_1.21.0_fix_startup_issues.sql
-- -----------------------------------------------------
-- Added by syntax fixer script
-- Transaction markers removed during consolidation
-- Transaction markers removed during consolidation
-- 20240941_1.21.0_fix_startup_issues.sql
-- Migration to fix Supabase startup issues and ensure compatibility

-- Wrap the entire migration in a transaction for safety
-- Transaction markers removed during consolidation

-- Ensure document_categories table exists properly
DO $$
BEGIN
    -- Check if document_categories table exists, if not create it
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'document_categories') THEN
        -- Create the table
        CREATE TABLE public.document_categories (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            description TEXT,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );
        
        -- Create RLS policies
        ALTER TABLE public.document_categories ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for viewing categories (everyone can view)
        CREATE POLICY "Anyone can view document categories" 
        ON public.document_categories FOR SELECT
        USING (true);
        
        -- Create policy for managing categories (only admins)
        CREATE POLICY "Only admins can manage document categories" 
        ON public.document_categories FOR ALL
        USING (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND is_admin = true
            )
        );
        
        RAISE NOTICE 'Created document_categories table successfully';
    ELSE
        RAISE NOTICE 'document_categories table already exists';
    END IF;
END $$;

-- Ensure profiles table has necessary columns and structure
DO $$
BEGIN
    -- First, check if profiles table exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        -- Create the profiles table
        CREATE TABLE public.profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            first_name TEXT,
            last_name TEXT,
            avatar_url TEXT,
            email TEXT,
            is_admin BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );
        
        -- Create RLS policies
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        -- Allow users to view their own profile
        CREATE POLICY "Users can view their own profile" 
        ON public.profiles FOR SELECT 
        USING (auth.uid() = id);
        
        -- Allow users to update their own profile
        CREATE POLICY "Users can update their own profile" 
        ON public.profiles FOR UPDATE 
        USING (auth.uid() = id);
        
        -- Admin can view all profiles
        CREATE POLICY "Admins can view all profiles" 
        ON public.profiles FOR SELECT 
        USING (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND is_admin = true
            )
        );
        
        RAISE NOTICE 'Created profiles table successfully';
    ELSE
        -- Ensure is_admin column exists
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                    WHERE table_schema = 'public' 
                    AND table_name = 'profiles' 
                    AND column_name = 'is_admin') THEN
            ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
            RAISE NOTICE 'Added is_admin column to profiles table';
        ELSE
            RAISE NOTICE 'is_admin column already exists in profiles table';
        END IF;
    END IF;
END $$;

-- Fix or create user creation trigger
DO $$
BEGIN
    -- Drop the trigger if it exists but is problematic
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    
    -- Create the function first
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO public.profiles (id, first_name, last_name, avatar_url, email, is_admin)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
            COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
            COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
            NEW.email,
            FALSE -- Default not admin
        )
        ON CONFLICT (id) DO NOTHING;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    
    -- Create the trigger
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
    
    RAISE NOTICE 'Created/updated user profile trigger successfully';
END $$;

-- Create helper function for admins
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    is_admin_result BOOLEAN;
BEGIN
    -- Check if the current user has admin privileges
    SELECT is_admin INTO is_admin_result
    FROM public.profiles
    WHERE id = auth.uid();
    
    -- Return false if no profile found or not admin
    RETURN COALESCE(is_admin_result, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.is_admin() IS 'Checks if the current user has admin privileges';

-- Commit all changes
-- Transaction markers removed during consolidation 



-- -----------------------------------------------------
-- Consolidated from fix file: 20240950_1.22.0_consolidated_fixes.sql
-- -----------------------------------------------------
-- Added by syntax fixer script
-- Transaction markers removed during consolidation
-- Transaction markers removed during consolidation
-- Transaction markers removed during consolidation
-- Transaction markers removed during consolidation
-- 20240950_1.22.0_consolidated_fixes.sql
-- A consolidated migration file that combines all previous fixes into one

-- Transaction markers removed during consolidation

-- Register this migration
DO $$
DECLARE
    migration_id INTEGER;
BEGIN
    -- Register migration
    SELECT migration_meta.register_migration(
        1, 22, 0,
        'Consolidated fixes for various issues',
        '20240950_1.22.0_consolidated_fixes.sql'
    ) INTO migration_id;
    
    -- Log the start of the process
    PERFORM migration_meta.log_migration(
        migration_id, 
        'INFO', 
        'Starting consolidated fixes migration'
    );

    -- =====================================================
    -- Fix 1: Storage Policies Fix (from 1.12.0)
    -- =====================================================
    DO $STORAGE_POLICIES$
    BEGIN
        -- Check if storage schema exists
        IF EXISTS (
            SELECT 1 
            FROM information_schema.schemata 
            WHERE schema_name = 'storage'
        ) THEN
            -- Fix avatar bucket policy if it exists
            DROP POLICY IF EXISTS "Avatar access" ON storage.objects;
            
            -- Create proper policy for avatars
            CREATE POLICY "Avatar access" ON storage.objects FOR ALL
            USING (bucket_id = 'avatars' AND (
                -- Either the object belongs to the user
                (storage.foldername(name))[1] = auth.uid()::text OR
                -- Or the object is in a public folder
                (storage.foldername(name))[1] = 'public'
            ));
            
            -- Fix documents bucket policy if it exists
            DROP POLICY IF EXISTS "Documents access" ON storage.objects;
            
            -- Create proper policy for documents
            CREATE POLICY "Documents access" ON storage.objects FOR ALL
            USING (bucket_id = 'documents' AND (
                -- Either the object belongs to the user
                (storage.foldername(name))[1] = auth.uid()::text OR
                -- Or the user is an admin
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND is_admin = true
                )
            ));
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Fixed storage bucket policies'
            );
        ELSE
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Storage schema not found, skipping storage policy fixes'
            );
        END IF;
    EXCEPTION WHEN OTHERS THEN
        PERFORM migration_meta.log_migration(
            migration_id, 
            'ERROR', 
            'Error fixing storage policies: ' || SQLERRM
        );
    END $STORAGE_POLICIES$;

    -- =====================================================
    -- Fix 2: Policy Syntax Fix (from 1.13.0)
    -- =====================================================
    DO $POLICY_SYNTAX$
    BEGIN
        -- Fix any policy that might use incorrect syntax
        
        -- Fix cases table policies if needed
        DROP POLICY IF EXISTS "Cases viewable by owners" ON public.cases;
        CREATE POLICY "Cases viewable by owners" 
        ON public.cases FOR SELECT 
        USING (auth.uid() = user_id);
        
        -- Fix chat_sessions policies if needed
        DROP POLICY IF EXISTS "Chat sessions viewable by owners" ON public.chat_sessions;
        CREATE POLICY "Chat sessions viewable by owners" 
        ON public.chat_sessions FOR SELECT 
        USING (auth.uid() = user_id);
        
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Fixed policy syntax issues'
        );
    EXCEPTION WHEN OTHERS THEN
        PERFORM migration_meta.log_migration(
            migration_id, 
            'WARNING', 
            'Error fixing policy syntax: ' || SQLERRM
        );
    END $POLICY_SYNTAX$;

    -- =====================================================
    -- Fix 3: Admin Column References (from 1.14.0)
    -- =====================================================
    DO $ADMIN_REFS$
    BEGIN
        -- Update the is_admin column in the profiles table if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'is_admin'
        ) THEN
            ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Added is_admin column to profiles table'
            );
        END IF;
        
        -- Create the is_admin helper function
        CREATE OR REPLACE FUNCTION public.is_admin_user()
        RETURNS BOOLEAN AS $$
        DECLARE
            is_admin_result BOOLEAN;
        BEGIN
            -- Check if the current user has admin privileges
            SELECT is_admin INTO is_admin_result
            FROM public.profiles
            WHERE id = auth.uid();
            
            -- Return false if no profile found or not admin
            RETURN COALESCE(is_admin_result, false);
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        COMMENT ON FUNCTION public.is_admin_user() IS 'Checks if the current user has admin privileges by using the correct id column';
        
        PERFORM migration_meta.log_migration(
            migration_id, 
            'INFO', 
            'Fixed admin column references and created helper function'
        );
    EXCEPTION WHEN OTHERS THEN
        PERFORM migration_meta.log_migration(
            migration_id, 
            'ERROR', 
            'Error fixing admin column references: ' || SQLERRM
        );
    END $ADMIN_REFS$;

    -- =====================================================
    -- Fix 4: Fine-tuning Policy Fix (from 1.15.0)
    -- =====================================================
    DO $FINE_TUNING$
    BEGIN
        -- Drop the problematic policy if it exists
        DROP POLICY IF EXISTS "Fine-tuning jobs viewable by admins" ON public.fine_tuning_jobs;
        
        IF EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'fine_tuning_jobs'
        ) THEN
            -- Create policy using the correct column reference (id instead of user_id)
            CREATE POLICY "Fine-tuning jobs viewable by admins" 
            ON public.fine_tuning_jobs FOR SELECT 
            TO authenticated 
            USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND is_admin = true
                )
            );
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Fixed Fine-tuning jobs policy to use id instead of user_id'
            );
        ELSE
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Table fine_tuning_jobs not found, skipping policy fix'
            );
        END IF;

        -- Fix policy issue in ai_feedback
        DROP POLICY IF EXISTS "AI feedback viewable by admins" ON public.ai_feedback;
        
        IF EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'ai_feedback'
        ) THEN
            -- Recreate with correct column reference
            CREATE POLICY "AI feedback viewable by admins" 
            ON public.ai_feedback FOR SELECT 
            TO authenticated 
            USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND is_admin = true
                )
            );
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Fixed AI feedback policy to use id instead of user_id'
            );
        END IF;

        -- Check and fix policies in llm_models table
        IF EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'llm_models'
        ) THEN
            DROP POLICY IF EXISTS "LLM models viewable by admins" ON public.llm_models;
            
            CREATE POLICY "LLM models viewable by admins" 
            ON public.llm_models FOR SELECT 
            TO authenticated 
            USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND is_admin = true
                )
            );
            
            PERFORM migration_meta.log_migration(
                migration_id, 
                'INFO', 
                'Fixed LLM models policy'
            );
        END IF;
    EXCEPTION WHEN OTHERS THEN
        PERFORM migration_meta.log_migration(
            migration_id, 
            'ERROR', 
            'Error fixing fine-tuning policies: ' || SQLERRM
        );
    END $FINE_TUNING$;

    -- Log completion
    PERFORM migration_meta.log_migration(
        migration_id, 
        'INFO', 
        'Completed consolidated fixes migration'
    );
END $$;

-- Transaction markers removed during consolidation 



-- -----------------------------------------------------
-- Consolidated from fix file: 20240960_1.23.0_fix_policy_references.sql
-- -----------------------------------------------------
-- 20240960_1.23.0_fix_policy_references.sql
-- Migration to fix policy references in the database
-- This ensures all policies on the profiles table use id = auth.uid() instead of user_id = auth.uid()

-- Begin transaction for atomicity
-- Transaction markers removed during consolidation

-- Register this migration
SELECT migration_meta.register_migration(1, 23, 0, 'Fix policy references', '20240960_1.23.0_fix_policy_references.sql');

-- Log the start of the migration
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 23, 0, 'Starting policy reference fixes');

-- =============================================
-- 1. Fix policies on profiles table
-- =============================================

-- Drop and recreate all policies on profiles table to ensure they use id = auth.uid()
DO $$
BEGIN
    -- Drop and recreate policies on public.profiles
    DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
    CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);
    
    DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
    CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);
    
    DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
    CREATE POLICY "Admins can view all profiles" 
    ON public.profiles FOR SELECT 
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND is_admin = true
      )
    );
    
    DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
    CREATE POLICY "Users can view all profiles"
    ON public.profiles FOR SELECT
    USING (true);
    
    DROP POLICY IF EXISTS "Users can update only their own profile" ON public.profiles;
    CREATE POLICY "Users can update only their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);
    
    DROP POLICY IF EXISTS "Users can insert only their own profile" ON public.profiles;
    CREATE POLICY "Users can insert only their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);
    
    -- Drop and recreate policies on profiles (without public schema)
    DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
    CREATE POLICY "Users can view own profile" 
    ON profiles FOR SELECT 
    USING (auth.uid() = id);
    
    DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
    CREATE POLICY "Users can update own profile" 
    ON profiles FOR UPDATE 
    USING (auth.uid() = id);
    
    -- Log the policy recreation
    INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
    VALUES (1, 23, 0, 'Recreated policies on profiles table to use id = auth.uid()');
END $$;

-- =============================================
-- 2. Ensure is_admin function uses id = auth.uid()
-- =============================================

-- Recreate the is_admin function to ensure it uses id = auth.uid()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    is_admin_result BOOLEAN;
BEGIN
    -- Check if the current user has admin privileges
    SELECT is_admin INTO is_admin_result
    FROM public.profiles
    WHERE id = auth.uid();
    
    -- Return false if no profile found or not admin
    RETURN COALESCE(is_admin_result, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.is_admin() IS 'Checks if the current user has admin privileges';

-- =============================================
-- 3. Add indexes to improve policy performance
-- =============================================

-- Add index on profiles.id if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'profiles' AND indexname = 'idx_profiles_id'
    ) THEN
        CREATE INDEX IF NOT EXISTS idx_profiles_id ON public.profiles(id);
        
        INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
        VALUES (1, 23, 0, 'Created index idx_profiles_id on public.profiles(id)');
    END IF;
END $$;

-- Log the completion of the migration
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 23, 0, 'Completed policy reference fixes');

-- Add comment about migration
COMMENT ON DATABASE postgres IS 'Fixed policy references to ensure profiles table uses id = auth.uid()';

-- Transaction markers removed during consolidation 


-- -----------------------------------------------------
-- Consolidated from fix file: fix-policy-issues.sql
-- -----------------------------------------------------
-- fix-policy-issues.sql
-- Script to fix policy references in all tables
-- This ensures all policies on the profiles table use id = auth.uid() instead of user_id = auth.uid()

-- Begin transaction for atomicity
-- Transaction markers removed during consolidation

-- =============================================
-- 1. Fix policies in 0_schema.sql
-- =============================================

-- Drop and recreate all policies on profiles table
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view all profiles"
ON public.profiles FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Users can update only their own profile" ON public.profiles;
CREATE POLICY "Users can update only their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert only their own profile" ON public.profiles;
CREATE POLICY "Users can insert only their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- =============================================
-- 2. Fix policies in 20240902_1.1.0_primary_schema.sql
-- =============================================

-- These policies are already correct, but we'll recreate them to be sure
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- =============================================
-- 3. Fix is_admin function
-- =============================================

-- Recreate the is_admin function to ensure it uses id = auth.uid()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    is_admin_result BOOLEAN;
BEGIN
    -- Check if the current user has admin privileges
    SELECT is_admin INTO is_admin_result
    FROM public.profiles
    WHERE id = auth.uid();
    
    -- Return false if no profile found or not admin
    RETURN COALESCE(is_admin_result, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.is_admin() IS 'Checks if the current user has admin privileges';

-- =============================================
-- 4. Add indexes to improve policy performance
-- =============================================

-- Add index on profiles.id if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_profiles_id ON public.profiles(id);

-- Transaction markers removed during consolidation 


-- -----------------------------------------------------
-- Consolidated from fix file: fix-simple.sql
-- -----------------------------------------------------
INSERT INTO _migration_history (version, name, success, execution_time_ms, log) VALUES ('FIX-POLICY', 'final-policy-fix', true, 0, 'Applied migrations to fix policy issues');


-- Log the completion of the migration
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Completed consolidated fixes migration');

COMMIT;

