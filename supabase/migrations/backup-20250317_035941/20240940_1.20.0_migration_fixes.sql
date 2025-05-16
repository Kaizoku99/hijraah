-- 20240940_1.20.0_migration_fixes.sql
-- Migration to fix various issues from previous migrations and restore functionality

-- Wrap the entire migration in a transaction
BEGIN;

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
COMMIT; 