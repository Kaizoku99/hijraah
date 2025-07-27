-- Empty seed file 

-- Seed file with necessary initial data
-- Reset any existing data in critical tables (optional, uncomment if needed)
-- TRUNCATE public.profiles CASCADE;

-- Document categories for immigration system
INSERT INTO public.document_categories (name, description)
VALUES 
    ('Identification', 'Personal identification documents like passport, ID cards'),
    ('Education', 'Educational certificates and transcripts'),
    ('Employment', 'Employment-related documents and contracts'),
    ('Financial', 'Financial statements and proof of funds'),
    ('Immigration', 'Immigration forms and previous visas'),
    ('Medical', 'Medical certificates and vaccination records'),
    ('Reference', 'Reference letters and recommendations'),
    ('Other', 'Other supporting documents')
ON CONFLICT (name) DO NOTHING;

-- Create an admin user in auth.users (will only work if RLS is correctly set up)
DO $$
BEGIN
    -- Only proceed if table exists to prevent errors
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        -- Check if auth trigger for creating profiles exists
        IF EXISTS (
            SELECT 1 FROM pg_trigger 
            WHERE tgname = 'on_auth_user_created' 
            AND tgrelid = 'auth.users'::regclass
        ) THEN
            -- Let the trigger handle profile creation
            NULL;
        ELSE
            -- Insert directly if no trigger exists
            INSERT INTO public.profiles (id, first_name, last_name, is_admin)
            SELECT 
                id, 
                'Admin', 
                'User', 
                TRUE
            FROM auth.users
            WHERE email = 'admin@example.com'
            ON CONFLICT (id) DO NOTHING;
        END IF;
    END IF;
END $$; 