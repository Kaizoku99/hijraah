-- Added by syntax fixer script
BEGIN;
-- Migration: 20240924_1.6.1_user_profiles.sql
-- Description: Adds user_profiles table for storing user profile information

-- Register this migration with versioning system
DO $$ 
BEGIN
  -- Only run if the migration_meta schema exists
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'migration_meta') THEN
    PERFORM migration_meta.register_migration(
      1, 6, 1,
      'User profiles for storing immigration-related user information',
      '20240924_1.6.1_user_profiles.sql'
    );
  END IF;
END $$;

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  country_of_origin TEXT,
  destination_country TEXT,
  visa_type TEXT,
  immigration_goals TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add comments for documentation
COMMENT ON TABLE user_profiles IS 'Stores immigration-related profile information for users';
COMMENT ON COLUMN user_profiles.id IS 'Primary key for the profile record';
COMMENT ON COLUMN user_profiles.user_id IS 'Foreign key reference to the auth.users table';
COMMENT ON COLUMN user_profiles.full_name IS 'User''s full name';
COMMENT ON COLUMN user_profiles.country_of_origin IS 'User''s country of origin';
COMMENT ON COLUMN user_profiles.destination_country IS 'User''s destination country for immigration';
COMMENT ON COLUMN user_profiles.visa_type IS 'Type of visa the user is interested in';
COMMENT ON COLUMN user_profiles.immigration_goals IS 'User''s immigration goals and objectives';
COMMENT ON COLUMN user_profiles.preferred_language IS 'User''s preferred language for the platform';
COMMENT ON COLUMN user_profiles.created_at IS 'Timestamp when the profile was created';
COMMENT ON COLUMN user_profiles.updated_at IS 'Timestamp when the profile was last updated';

-- Add trigger for updated_at timestamp
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- User Profiles RLS
CREATE POLICY "Users can view their own profile"
ON user_profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON user_profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON user_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_country_of_origin ON user_profiles(country_of_origin);
CREATE INDEX IF NOT EXISTS idx_user_profiles_destination_country ON user_profiles(destination_country);
CREATE INDEX IF NOT EXISTS idx_user_profiles_preferred_language ON user_profiles(preferred_language); 
