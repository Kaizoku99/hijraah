-- 20240960_1.23.0_fix_policy_references.sql
-- Migration to fix policy references in the database
-- This ensures all policies on the profiles table use id = auth.uid() instead of user_id = auth.uid()

-- Begin transaction for atomicity
BEGIN;

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

COMMIT; 