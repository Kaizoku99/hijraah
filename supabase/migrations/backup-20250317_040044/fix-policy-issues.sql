-- fix-policy-issues.sql
-- Script to fix policy references in all tables
-- This ensures all policies on the profiles table use id = auth.uid() instead of user_id = auth.uid()

-- Begin transaction for atomicity
BEGIN;

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

COMMIT; 