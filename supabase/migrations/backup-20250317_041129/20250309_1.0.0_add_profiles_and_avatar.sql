-- Added by syntax fixer script
BEGIN;
BEGIN;
BEGIN;
BEGIN;
-- Add profiles table and avatar storage support
-- Version: 2024-09-10

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    website TEXT,
    bio TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update only their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert only their own profile" ON public.profiles;

-- Create policy to allow users to read any profile
CREATE POLICY "Users can view all profiles" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (true);

-- Create policy to allow users to update only their own profile
CREATE POLICY "Users can update only their own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (id = auth.uid());

-- Create policy to allow users to insert only their own profile
CREATE POLICY "Users can insert only their own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (id = auth.uid());

-- Add function to handle avatar updates
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, full_name, avatar_url)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NULL);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to add profile when user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update trigger function to handle avatar_url updates
CREATE OR REPLACE FUNCTION public.update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update the updated_at column
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_profile_updated_at();

-- Storage setup for avatars - Make this idempotent with proper checks
DO $$
BEGIN
    -- Check if storage schema exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
        -- Storage schema doesn't exist, so we skip this operation
        RAISE NOTICE 'Storage schema not found. Skipping avatar storage setup.';
        RETURN;
    END IF;

    -- Check if buckets table exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'storage' AND table_name = 'buckets'
    ) THEN
        RAISE NOTICE 'Storage buckets table not found. Skipping avatar storage setup.';
        RETURN;
    END IF;

    -- Check if policies table exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'storage' AND table_name = 'policies'
    ) THEN
        RAISE NOTICE 'Storage policies table not found. Skipping avatar storage setup.';
        RETURN;
    END IF;

    -- Create the avatars bucket if it doesn't exist
    INSERT INTO storage.buckets (id, name, public) 
    VALUES ('avatars', 'User Avatars', TRUE)
    ON CONFLICT (id) DO NOTHING;
    
    -- Check if the foldername function exists
    IF EXISTS (
        SELECT 1 
        FROM pg_proc 
        JOIN pg_namespace ON pg_namespace.oid = pg_proc.pronamespace
        WHERE pg_namespace.nspname = 'storage' AND pg_proc.proname = 'foldername'
    ) THEN
        -- Create storage policies for avatars
        DELETE FROM storage.policies WHERE bucket_id = 'avatars';
        
        INSERT INTO storage.policies (name, definition, bucket_id)
        VALUES 
            ('Avatar images are publicly accessible',
            'bucket_id = ''avatars'' AND (auth.role() = ''authenticated'' OR auth.role() = ''anon'')',
            'avatars'),
            
            ('Users can upload avatars',
            'bucket_id = ''avatars'' AND auth.role() = ''authenticated''',
            'avatars'),
            
            ('Users can update their own avatars',
            'bucket_id = ''avatars'' AND auth.role() = ''authenticated'' AND (storage.foldername(name))[1] = auth.uid()::text',
            'avatars');
    ELSE
        RAISE NOTICE 'Storage foldername function not found. Skipping avatar policies.';
    END IF;
END $$; 
