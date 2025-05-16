-- Added by syntax fixer script
BEGIN;
-- 0_schema.sql
-- A consolidated schema file to replace all the individual migrations
-- This is recommended by Supabase when migrations get out of sync

-- Core system setup (from 20240901_1.0.0_core_system_setup.sql)
DO $$
BEGIN
  -- Create migration_meta schema if it doesn't exist
  CREATE SCHEMA IF NOT EXISTS migration_meta;
  
  -- Create migration tracking table
  CREATE TABLE IF NOT EXISTS migration_meta.migrations (
    major INT,
    minor INT,
    patch INT,
    description TEXT,
    script_name TEXT,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (major, minor, patch)
  );
  
  -- Function to register migrations
  CREATE OR REPLACE FUNCTION migration_meta.register_migration(
    p_major INT,
    p_minor INT,
    p_patch INT,
    p_description TEXT,
    p_script_name TEXT
  ) RETURNS VOID AS $$
  BEGIN
    INSERT INTO migration_meta.migrations (major, minor, patch, description, script_name)
    VALUES (p_major, p_minor, p_patch, p_description, p_script_name)
    ON CONFLICT (major, minor, patch) DO NOTHING;
  END;
  $$ LANGUAGE plpgsql;
  
  -- Create update_updated_at_column function for all tables
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  
  -- Create admin schema
  CREATE SCHEMA IF NOT EXISTS admin;
END $$;

-- Primary schema (from 20240902_1.1.0_primary_schema.sql)
DO $$
BEGIN
  -- Create profiles table
  CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    email TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Create sessions table
  CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
  );

  -- Create chat_sessions table
  CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'New Chat',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_archived BOOLEAN NOT NULL DEFAULT FALSE
  );

  -- Create chat_messages table
  CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Create cases table
  CREATE TABLE IF NOT EXISTS cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Create notifications table
  CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Create triggers for updated_at columns
  CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

  CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

  CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

  CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON cases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

  -- Enable RLS on all tables
  ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
  ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
  ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

  -- Set up RLS policies
  -- Profiles
  CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

  CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
  
  -- Admin can view all profiles
  CREATE POLICY "Admins can view all profiles" 
  ON profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

  -- Sessions
  CREATE POLICY "Users can view their own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

  CREATE POLICY "Users can insert their own sessions"
  ON sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can update their own sessions"
  ON sessions FOR UPDATE
  USING (auth.uid() = user_id);

  -- Chat Sessions
  CREATE POLICY "Users can view their own chat sessions"
  ON chat_sessions FOR SELECT
  USING (auth.uid() = user_id);

  CREATE POLICY "Users can insert their own chat sessions"
  ON chat_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can update their own chat sessions"
  ON chat_sessions FOR UPDATE
  USING (auth.uid() = user_id);

  -- Chat Messages
  CREATE POLICY "Users can view their own chat messages"
  ON chat_messages FOR SELECT
  USING (
    auth.uid() = user_id OR 
    auth.uid() IN (
      SELECT user_id FROM chat_sessions 
      WHERE id = chat_messages.chat_session_id
    )
  );

  CREATE POLICY "Users can insert their own chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

  -- Cases
  CREATE POLICY "Users can view their own cases"
  ON cases FOR SELECT
  USING (auth.uid() = user_id);

  CREATE POLICY "Users can insert their own cases"
  ON cases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can update their own cases"
  ON cases FOR UPDATE
  USING (auth.uid() = user_id);

  -- Notifications
  CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

  CREATE POLICY "Users can update is_read status"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    -- Only allow updating the is_read field
    OLD.user_id = NEW.user_id AND
    OLD.title = NEW.title AND
    OLD.message = NEW.message AND
    OLD.created_at = NEW.created_at
  );
END $$;

-- Extensions and Features (from 20240903_1.2.0_extensions_and_features.sql)
DO $$
BEGIN
  -- Create admin user table
  CREATE TABLE IF NOT EXISTS admin.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'support', 'analytics', 'developer')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Create admin audit log
  CREATE TABLE IF NOT EXISTS admin.audit_logs (
    id BIGSERIAL PRIMARY KEY,
    admin_id UUID REFERENCES admin.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_table TEXT,
    target_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Enable RLS on admin tables
  ALTER TABLE admin.users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE admin.audit_logs ENABLE ROW LEVEL SECURITY;

  -- Set up RLS policies for admin tables
  CREATE POLICY "Only admins can view admin users"
  ON admin.users FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM admin.users)
  );

  CREATE POLICY "Only admins can view audit logs"
  ON admin.audit_logs FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM admin.users)
  );

  -- Create trigger for updated_at column on admin.users
  CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

  -- Create vector extension if it doesn't exist
  CREATE EXTENSION IF NOT EXISTS vector;
END $$;

-- Profile and avatar (from 20240910_add_profiles_and_avatar.sql)
DO $$
BEGIN
  -- Add user profiles RLS policies
  CREATE POLICY "Users can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (true);
  
  CREATE POLICY "Users can update only their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);
  
  CREATE POLICY "Users can insert only their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
  
  -- Add trigger for updated_at timestamp
  CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
END $$;

-- User profiles (from 20240924_1.6.1_user_profiles.sql)
DO $$
BEGIN
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
END $$;

-- Onboarding triggers (from 20240923_onboarding_triggers.sql)
DO $$
BEGIN
  -- Function to handle new user creation
  CREATE OR REPLACE FUNCTION public.handle_new_user() 
  RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.user_onboarding (
      user_id, 
      current_step, 
      progress, 
      is_completed, 
      is_active
    )
    VALUES (
      NEW.id, 
      'welcome', 
      0, 
      false, 
      true
    );
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;
  
  -- Trigger the function every time a user is created
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
END $$;

-- Migration Verification System (from 20240930_1.9.0_migration_verification.sql)
DO $$
BEGIN
    -- Create migration_logs table if not exists
    CREATE TABLE IF NOT EXISTS migration_meta.migration_logs (
        id SERIAL PRIMARY KEY,
        migration_id INTEGER REFERENCES migration_meta.migrations(id),
        log_level TEXT NOT NULL,
        message TEXT NOT NULL,
        logged_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Create indexes for better performance
    CREATE INDEX IF NOT EXISTS idx_migration_logs_migration_id ON migration_meta.migration_logs(migration_id);
    CREATE INDEX IF NOT EXISTS idx_migration_logs_log_level ON migration_meta.migration_logs(log_level);
    CREATE INDEX IF NOT EXISTS idx_migration_logs_logged_at ON migration_meta.migration_logs(logged_at);

    -- Create log_migration function if not exists
    CREATE OR REPLACE FUNCTION migration_meta.log_migration(
        p_migration_id INTEGER,
        p_log_level TEXT,
        p_message TEXT
    ) RETURNS VOID
    AS $$
    BEGIN
        INSERT INTO migration_meta.migration_logs(migration_id, log_level, message)
        VALUES (p_migration_id, p_log_level, p_message);
    END;
    $$ LANGUAGE plpgsql;

    COMMENT ON FUNCTION migration_meta.log_migration IS 'Logs a message for a migration';

    -- Create verification view for quickly checking migration status
    CREATE OR REPLACE VIEW migration_meta.migration_status AS
    SELECT 
        major || '.' || minor || '.' || patch AS version,
        script_name AS migration_name,
        description,
        applied_at,
        NULL::TEXT AS applied_by,
        TRUE AS success,
        NULL::INTEGER AS execution_time_ms,
        NULL::TEXT AS environment
    FROM 
        migration_meta.migrations
    ORDER BY 
        applied_at DESC;

    -- Function to verify if all expected migrations are applied
    CREATE OR REPLACE FUNCTION migration_meta.verify_migrations(
        p_expected_versions TEXT[] DEFAULT NULL
    ) RETURNS TABLE (
        version TEXT,
        migration_name TEXT,
        applied BOOLEAN,
        success BOOLEAN
    ) AS $$
    BEGIN
        IF p_expected_versions IS NULL THEN
            RETURN QUERY
            SELECT 
                major || '.' || minor || '.' || patch AS version,
                script_name AS migration_name,
                TRUE AS applied,
                TRUE AS success
            FROM 
                migration_meta.migrations
            ORDER BY 
                major, minor, patch;
        ELSE
            RETURN QUERY
            WITH expected AS (
                SELECT unnest(p_expected_versions) AS version
            )
            SELECT 
                e.version,
                COALESCE(m.script_name, 'Not Applied') AS migration_name,
                m.major IS NOT NULL AS applied,
                TRUE AS success
            FROM 
                expected e
            LEFT JOIN 
                migration_meta.migrations m 
                ON (major || '.' || minor || '.' || patch) = e.version
            ORDER BY 
                e.version;
        END IF;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

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

    -- Add comments for documentation
    COMMENT ON SCHEMA migration_meta IS 'Schema for tracking and verifying database migrations';
    COMMENT ON TABLE migration_meta.migrations IS 'Records all migrations applied to the database';
    COMMENT ON TABLE migration_meta.migration_logs IS 'Detailed logs for migration execution';
    COMMENT ON FUNCTION migration_meta.register_migration IS 'Registers a migration as applied to the database';
    COMMENT ON FUNCTION migration_meta.verify_migrations IS 'Verifies if expected migrations are applied successfully';
END $$; 
