-- Added by syntax fixer script
BEGIN;
BEGIN;
-- 20240941_1.21.0_fix_startup_issues.sql
-- Migration to fix Supabase startup issues and ensure compatibility

-- Wrap the entire migration in a transaction for safety
BEGIN;

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
COMMIT; 
