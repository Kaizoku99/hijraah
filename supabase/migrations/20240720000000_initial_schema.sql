-- Migration: 20240720000000_initial_schema.sql
-- Description: Consolidated schema for Hijraah platform from all historical migrations
-- Created: July 20, 2024
-- This file replaces all individual migrations with a single baseline schema

-- Begin transaction
BEGIN;

-- ===================================================
-- SECTION 1: Core Setup (Schema, Extensions, Config)
-- ===================================================

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET search_path = public, extensions, migration_meta; -- This can be simplified later if all names are qualified
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Create primary schema
CREATE SCHEMA IF NOT EXISTS public; -- Quoted "public" is fine, but `public` is conventional
ALTER SCHEMA public OWNER TO pg_database_owner; -- Quoted "public" is fine
COMMENT ON SCHEMA public IS 'standard public schema';

-- Create extensions schema and enable required extensions
CREATE SCHEMA IF NOT EXISTS extensions;
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

-- Enable key extensions
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions; -- Provides extensions.gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_cron; -- Creates objects in `cron` schema
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions; -- Explicitly set schema for pg_net

-- Default grants for public schema
GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;

-- Grant permissions on auth schema to postgres role
GRANT ALL ON SCHEMA auth TO postgres;

-- ===================================================
-- SECTION 1.5: Drop Legacy Tables (if they exist)
-- ===================================================

-- Drop legacy tables to avoid naming conflicts and ensure a clean schema
DROP TABLE IF EXISTS public."Chat" CASCADE;
DROP TABLE IF EXISTS public."Message" CASCADE;
DROP TABLE IF EXISTS public."Message_v2" CASCADE;
DROP TABLE IF EXISTS public."Vote" CASCADE;
DROP TABLE IF EXISTS public."Vote_v2" CASCADE;
DROP TABLE IF EXISTS public."Stream" CASCADE;
DROP TABLE IF EXISTS public.artifacts CASCADE;
DROP TABLE IF EXISTS public.suggestions CASCADE;
DROP TABLE IF EXISTS public.streams CASCADE;

-- ===================================================
-- SECTION 2: Migration Versioning System
-- ===================================================

-- Create migration_meta schema for versioning
CREATE SCHEMA IF NOT EXISTS migration_meta;

-- Create migration versioning tables
CREATE TABLE IF NOT EXISTS migration_meta.versions (
    id SERIAL PRIMARY KEY,
    major INTEGER NOT NULL,
    minor INTEGER NOT NULL,
    patch INTEGER NOT NULL,
    description TEXT NOT NULL,
    filename TEXT NOT NULL,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (major, minor, patch)
);
COMMENT ON TABLE migration_meta.versions IS 'Tracks all migrations applied to the database';

-- Create migration history table
CREATE TABLE IF NOT EXISTS migration_meta.history (
    id SERIAL PRIMARY KEY,
    version_id INTEGER REFERENCES migration_meta.versions(id),
    filename TEXT NOT NULL,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    operation TEXT NOT NULL, -- 'apply', 'rollback', 'consolidated'
    status TEXT NOT NULL, -- 'success', 'failed'
    details TEXT
);
COMMENT ON TABLE migration_meta.history IS 'Tracks detailed history of migration operations';

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_history_version_id ON migration_meta.history(version_id);

-- Create rollback scripts table
CREATE TABLE IF NOT EXISTS migration_meta.rollback_scripts (
    id SERIAL PRIMARY KEY,
    version_id INTEGER REFERENCES migration_meta.versions(id),
    down_sql TEXT NOT NULL,
    dependencies TEXT[] DEFAULT '{}'::TEXT[]
);
COMMENT ON TABLE migration_meta.rollback_scripts IS 'Stores SQL to rollback migrations';

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_rollback_scripts_version_id ON migration_meta.rollback_scripts(version_id);

-- Create function to register a migration
CREATE OR REPLACE FUNCTION migration_meta.register_migration(
    p_major INTEGER,
    p_minor INTEGER,
    p_patch INTEGER,
    p_description TEXT,
    p_filename TEXT
) RETURNS INTEGER AS $$
DECLARE
    v_id INTEGER;
BEGIN
    -- Check if migration already exists
    SELECT id INTO v_id
    FROM migration_meta.versions
    WHERE major = p_major AND minor = p_minor AND patch = p_patch;
    
    IF v_id IS NULL THEN
        -- Insert new migration version
        INSERT INTO migration_meta.versions (major, minor, patch, description, filename)
        VALUES (p_major, p_minor, p_patch, p_description, p_filename)
        RETURNING id INTO v_id;
        
        -- Record in history
        INSERT INTO migration_meta.history (version_id, filename, operation, status)
        VALUES (v_id, p_filename, 'apply', 'success');
    END IF;
    
    RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = migration_meta, public, extensions;

-- Create function to register a rollback script
CREATE OR REPLACE FUNCTION migration_meta.register_rollback_script(
    p_major INTEGER,
    p_minor INTEGER,
    p_patch INTEGER,
    p_down_sql TEXT,
    p_dependencies TEXT[] DEFAULT '{}'::TEXT[]
) RETURNS VOID AS $$
DECLARE
    v_version_id INTEGER;
BEGIN
    -- Get the version ID
    SELECT id INTO v_version_id
    FROM migration_meta.versions
    WHERE major = p_major AND minor = p_minor AND patch = p_patch;
    
    IF v_version_id IS NULL THEN
        RAISE EXCEPTION 'Migration version %.%.% not found', p_major, p_minor, p_patch;
    END IF;
    
    -- Delete existing rollback script if it exists
    DELETE FROM migration_meta.rollback_scripts
    WHERE version_id = v_version_id;
    
    -- Insert new rollback script
    INSERT INTO migration_meta.rollback_scripts (version_id, down_sql, dependencies)
    VALUES (v_version_id, p_down_sql, p_dependencies);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = migration_meta, public, extensions;

-- Create function to rollback a migration
CREATE OR REPLACE FUNCTION migration_meta.rollback_migration(
    p_major INTEGER,
    p_minor INTEGER,
    p_patch INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    v_version_id INTEGER;
    v_down_sql TEXT;
    v_filename TEXT;
    v_dependencies TEXT[];
    v_dep TEXT;
BEGIN
    -- Get the version ID and rollback script
    SELECT v.id, r.down_sql, v.filename, r.dependencies
    INTO v_version_id, v_down_sql, v_filename, v_dependencies
    FROM migration_meta.versions v
    JOIN migration_meta.rollback_scripts r ON v.id = r.version_id
    WHERE v.major = p_major AND v.minor = p_minor AND v.patch = p_patch;
    
    IF v_version_id IS NULL THEN
        RAISE EXCEPTION 'Migration version %.%.% not found or has no rollback script', p_major, p_minor, p_patch;
        RETURN FALSE;
    END IF;
    
    -- Check dependencies
    IF v_dependencies IS NOT NULL AND array_length(v_dependencies, 1) > 0 THEN
        FOREACH v_dep IN ARRAY v_dependencies
        LOOP
            IF EXISTS (
                SELECT 1 FROM migration_meta.versions
                WHERE filename = v_dep
                AND NOT EXISTS (
                    SELECT 1 FROM migration_meta.history
                    WHERE filename = v_dep AND operation = 'rollback' AND status = 'success'
                )
            ) THEN
                RAISE WARNING 'Dependency % must be rolled back first', v_dep;
                RETURN FALSE;
            END IF;
        END LOOP;
    END IF;
    
    BEGIN
        -- Execute rollback SQL
        EXECUTE v_down_sql;
        
        -- Record rollback in history
        INSERT INTO migration_meta.history (version_id, filename, operation, status)
        VALUES (v_version_id, v_filename, 'rollback', 'success');
        
        RETURN TRUE;
    EXCEPTION WHEN OTHERS THEN
        -- Record failed rollback
        INSERT INTO migration_meta.history (version_id, filename, operation, status, details)
        VALUES (v_version_id, v_filename, 'rollback', 'failed', SQLERRM);
        
        RAISE;
        RETURN FALSE;
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = migration_meta, public, extensions;

-- ===================================================
-- SECTION 3: Common Functions
-- ===================================================

-- Common function for tracking updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql' SET search_path = public, extensions;

COMMENT ON FUNCTION public.update_updated_at_column IS 'Automatically updates the updated_at timestamp column on record updates';

-- ===================================================
-- SECTION 4: Core Types and Enums
-- ===================================================

-- Create required enums
DO $$ 
BEGIN
  -- Session type enum
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE t.typname = 'session_type' AND n.nspname = 'public') THEN
    CREATE TYPE public.session_type AS ENUM ('chat', 'research', 'case');
  END IF;
  
  -- Session status enum  
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE t.typname = 'session_status' AND n.nspname = 'public') THEN
    CREATE TYPE public.session_status AS ENUM ('active', 'completed', 'archived');
  END IF;
  
  -- Case status enum
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE t.typname = 'case_status' AND n.nspname = 'public') THEN
    CREATE TYPE public.case_status AS ENUM ('draft', 'submitted', 'in_review', 'approved', 'rejected', 'completed');
  END IF;
  
  -- Document status enum
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE t.typname = 'document_status' AND n.nspname = 'public') THEN
    CREATE TYPE public.document_status AS ENUM ('pending', 'verified', 'rejected');
  END IF;
  
  -- Notification type enum
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE t.typname = 'notification_type' AND n.nspname = 'public') THEN
    CREATE TYPE public.notification_type AS ENUM ('system', 'case_update', 'document_request', 'message');
  END IF;

  -- User role enum
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE t.typname = 'user_role' AND n.nspname = 'public') THEN
    CREATE TYPE public.user_role AS ENUM ('user', 'admin', 'client');
  END IF;

  -- Source category enum
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE t.typname = 'source_category' AND n.nspname = 'public') THEN
    CREATE TYPE public.source_category AS ENUM (
      'government',
      'legal',
      'news',
      'blog',
      'forum',
      'other'
    );
  END IF;
END $$;

-- ===================================================
-- SECTION 5: Core Tables - Auth, Profiles, Sessions
-- ===================================================

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  timezone TEXT,
  language TEXT DEFAULT 'en',
  country_of_residence TEXT,
  country_of_interest TEXT,
  country_of_citizenship TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  visa_type TEXT,
  immigration_goals JSONB DEFAULT '[]'::jsonb,
  role public.user_role DEFAULT 'client',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles auto-creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    avatar_url, 
    is_admin
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    FALSE -- Default not admin
  );
  
  -- Insert into user_onboarding
  INSERT INTO public.user_onboarding (
    user_id, 
    current_step, 
    progress, 
    is_completed, 
    is_active
  )
  VALUES (
    NEW.id, 
    'welcome', -- Default starting step
    0,         -- Default progress
    false,     -- Default completion status
    true       -- Default active status
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

-- Trigger for auto-creating user profiles and onboarding
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Profile RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Add trigger for updated_at timestamp
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON public.admin_users(user_id);

-- RLS Policies for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Remove old policies first to avoid conflicts if they still exist
DROP POLICY IF EXISTS "Users can read their own admin status" ON public.admin_users;
DROP POLICY IF EXISTS "Service role can manage all admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow specific SELECT access to admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Service role can INSERT/UPDATE/DELETE admin users" ON public.admin_users;

-- Combined policy for SELECT access to admin_users
CREATE POLICY "Allow specific SELECT access to admin_users"
    ON public.admin_users FOR SELECT
    USING (
        ((SELECT auth.role()) = 'service_role') OR
        (user_id = (SELECT auth.uid()))
    );

-- Policy for INSERT, UPDATE, DELETE actions for service_role
CREATE POLICY "Service role can INSERT/UPDATE/DELETE admin users"
    ON public.admin_users FOR ALL
    USING ((SELECT auth.role()) = 'service_role')
    WITH CHECK ((SELECT auth.role()) = 'service_role');

-- Add admin status check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  is_admin_result BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid() AND (raw_app_meta_data->>'user_role' = 'admin' OR role = 'admin')
  ) INTO is_admin_result;
  RETURN is_admin_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===================================================
-- SECTION 6: User Experience (Onboarding, Preferences)
-- ===================================================

-- Create user_onboarding table to track onboarding progress
CREATE TABLE IF NOT EXISTS public.user_onboarding (
  id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_step TEXT NOT NULL DEFAULT 'welcome',
  progress SMALLINT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  hide_for_session BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add comments for documentation
COMMENT ON TABLE public.user_onboarding IS 'Tracks user progress through the onboarding flow';

-- Create table for onboarding actions completed
CREATE TABLE IF NOT EXISTS public.onboarding_actions (
  id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_key TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, action_key)
);

COMMENT ON TABLE public.onboarding_actions IS 'Tracks specific onboarding actions completed by users';

-- Create function to mark onboarding actions as completed
CREATE OR REPLACE FUNCTION public.mark_onboarding_action_completed(action_key TEXT)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
  v_onboarding_exists BOOLEAN;
  v_action_count INTEGER;
  v_total_actions INTEGER := 5; -- Set this to the total number of possible onboarding actions
  v_progress INTEGER;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if user has an onboarding record
  SELECT EXISTS (
    SELECT 1 FROM public.user_onboarding WHERE user_id = v_user_id
  ) INTO v_onboarding_exists;
  
  -- Create onboarding record if it doesn't exist
  IF NOT v_onboarding_exists THEN
    INSERT INTO public.user_onboarding (user_id)
    VALUES (v_user_id);
  END IF;
  
  -- Insert or update the action record
  INSERT INTO public.onboarding_actions (user_id, action_key)
  VALUES (v_user_id, action_key)
  ON CONFLICT (user_id, action_key)
  DO UPDATE SET completed_at = NOW();
  
  -- Count completed actions for this user
  SELECT COUNT(*) INTO v_action_count
  FROM public.onboarding_actions
  WHERE user_id = v_user_id;
  
  -- Calculate progress percentage
  v_progress := LEAST(100, (v_action_count * 100) / v_total_actions);
  
  -- Update the onboarding progress
  UPDATE public.user_onboarding
  SET 
    progress = v_progress,
    updated_at = NOW(),
    is_completed = (v_progress = 100)
  WHERE user_id = v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

-- Add indexes for better performance

-- Add trigger for updated_at timestamp
DROP TRIGGER IF EXISTS update_user_onboarding_updated_at ON public.user_onboarding;
CREATE TRIGGER update_user_onboarding_updated_at
BEFORE UPDATE ON public.user_onboarding
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add RLS policies
ALTER TABLE public.user_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_actions ENABLE ROW LEVEL SECURITY;

-- User Onboarding RLS
DROP POLICY IF EXISTS "Users can view their own onboarding process" ON public.user_onboarding;
CREATE POLICY "Users can view their own onboarding process"
ON public.user_onboarding
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own onboarding process" ON public.user_onboarding;
CREATE POLICY "Users can update their own onboarding process"
ON public.user_onboarding
FOR UPDATE
USING (auth.uid() = user_id);

-- Onboarding Actions RLS
DROP POLICY IF EXISTS "Users can view their own onboarding actions" ON public.onboarding_actions;
CREATE POLICY "Users can view their own onboarding actions"
ON public.onboarding_actions
FOR SELECT
USING (auth.uid() = user_id);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT NOT NULL DEFAULT 'light',
  font_size TEXT NOT NULL DEFAULT 'medium',
  notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  email_frequency TEXT NOT NULL DEFAULT 'daily' CHECK (email_frequency IN ('never', 'daily', 'weekly', 'monthly')),
  ui_density TEXT NOT NULL DEFAULT 'comfortable' CHECK (ui_density IN ('compact', 'comfortable', 'spacious')),
  sidebar_collapsed BOOLEAN NOT NULL DEFAULT FALSE,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own preferences" ON public.user_preferences;
CREATE POLICY "Users can view their own preferences"
ON public.user_preferences
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own preferences" ON public.user_preferences;
CREATE POLICY "Users can update their own preferences"
ON public.user_preferences
FOR UPDATE
USING (auth.uid() = user_id);

-- ===================================================
-- SECTION 8: Case Management System
-- ===================================================

-- Create cases table
CREATE TABLE IF NOT EXISTS public.cases (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status public.case_status NOT NULL DEFAULT 'draft',
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.cases IS 'Stores information about user immigration cases';

-- Add indexes for cases table
CREATE INDEX IF NOT EXISTS idx_cases_user_id ON public.cases(user_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON public.cases(status);

-- Add trigger for updated_at timestamp on cases
DROP TRIGGER IF EXISTS update_cases_updated_at ON public.cases;
CREATE TRIGGER update_cases_updated_at
    BEFORE UPDATE ON public.cases
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for cases table
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own cases" ON public.cases;
CREATE POLICY "Users can manage their own cases"
    ON public.cases FOR ALL
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all cases" ON public.cases;
CREATE POLICY "Service role can manage all cases"
    ON public.cases FOR ALL
    USING (auth.role() = 'service_role');

-- ===================================================
-- SECTION 7: Chat System (Unified Structure)
-- ===================================================

ALTER TABLE IF EXISTS public.chat_sessions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE IF EXISTS public.chat_sessions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Chat sessions table (unified structure)
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT,
    context TEXT,
    prompt TEXT,
    model TEXT,
    system_prompt TEXT,
    agent_config JSONB DEFAULT '{}'::JSONB,
    case_id UUID NULL REFERENCES public.cases(id) ON DELETE SET NULL,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::JSONB,
    visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('private', 'public', 'team')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.chat_sessions IS 'Stores chat sessions with unified structure';

-- Create indexes for chat_sessions
CREATE INDEX IF NOT EXISTS idx_chat_sessions_case_id ON public.chat_sessions(case_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_visibility ON public.chat_sessions(visibility);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON public.chat_sessions(created_at);

-- Chat Messages table 
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'tool', 'function')),
    content TEXT NOT NULL,
    sources JSONB,
    tool_calls JSONB,
    metadata JSONB DEFAULT '{}',
    tokens INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.chat_messages IS 'Stores individual messages within chat sessions';

-- Add indexes for chat_messages
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_role ON public.chat_messages(role);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sources ON public.chat_messages USING GIN (sources);
CREATE INDEX IF NOT EXISTS idx_chat_messages_tool_calls ON public.chat_messages USING GIN (tool_calls);

-- Chat Attachments table
CREATE TABLE IF NOT EXISTS public.chat_attachments (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    chat_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    message_id UUID NOT NULL REFERENCES public.chat_messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.chat_attachments IS 'Stores attachments linked to specific chat messages';

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_chat_attachments_chat_id ON public.chat_attachments(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_attachments_message_id ON public.chat_attachments(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_attachments_user_id ON public.chat_attachments(user_id);

-- Add trigger for updated_at timestamp on chat_sessions
DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON public.chat_sessions;
CREATE TRIGGER update_chat_sessions_updated_at
    BEFORE UPDATE ON public.chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for updated_at timestamp on chat_messages
DROP TRIGGER IF EXISTS trigger_update_chat_messages_updated_at ON public.chat_messages;
CREATE TRIGGER trigger_update_chat_messages_updated_at
    BEFORE UPDATE ON public.chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_attachments ENABLE ROW LEVEL SECURITY;

-- Chat Sessions RLS
DROP POLICY IF EXISTS "Users can manage their own chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can manage their own chat sessions"
    ON public.chat_sessions FOR ALL
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view public chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can view public chat sessions"
    ON public.chat_sessions FOR SELECT
    USING (visibility = 'public');

-- Chat Messages RLS
DROP POLICY IF EXISTS "Users can view messages in their sessions" ON public.chat_messages;
CREATE POLICY "Users can view messages in their sessions"
ON public.chat_messages FOR SELECT
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.chat_sessions cs
    WHERE cs.id = chat_messages.session_id AND cs.user_id = auth.uid()
));

DROP POLICY IF EXISTS "Users can view messages in public sessions" ON public.chat_messages;
CREATE POLICY "Users can view messages in public sessions"
ON public.chat_messages FOR SELECT
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.chat_sessions cs
    WHERE cs.id = chat_messages.session_id AND cs.visibility = 'public'
));

DROP POLICY IF EXISTS "Users can insert messages into their sessions" ON public.chat_messages;
CREATE POLICY "Users can insert messages into their sessions"
ON public.chat_messages FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
    SELECT 1 FROM public.chat_sessions cs
    WHERE cs.id = chat_messages.session_id AND cs.user_id = auth.uid()
));

-- Chat Attachments RLS
DROP POLICY IF EXISTS "Users can insert attachments to their own chats" ON public.chat_attachments;
CREATE POLICY "Users can insert attachments to their own chats"
ON public.chat_attachments FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
    SELECT 1 FROM public.chat_sessions cs
    WHERE cs.id = chat_attachments.chat_id AND cs.user_id = auth.uid()
));

DROP POLICY IF EXISTS "Users can view attachments from their own chats" ON public.chat_attachments;
CREATE POLICY "Users can view attachments from their own chats"
ON public.chat_attachments FOR SELECT
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.chat_sessions cs
    WHERE cs.id = chat_attachments.chat_id AND cs.user_id = auth.uid()
));

DROP POLICY IF EXISTS "Users can view attachments from public chats" ON public.chat_attachments;
CREATE POLICY "Users can view attachments from public chats"
ON public.chat_attachments FOR SELECT
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.chat_sessions cs
    WHERE cs.id = chat_attachments.chat_id AND cs.visibility = 'public'
));

-- ===================================================
-- SECTION 7.5: Chat Message Votes Table
-- ===================================================

-- New table for message votes, replacing legacy Vote and Vote_v2 functionality
CREATE TABLE IF NOT EXISTS public.chat_message_votes (
    message_id UUID NOT NULL REFERENCES public.chat_messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    is_upvoted BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (message_id, user_id)
);

COMMENT ON TABLE public.chat_message_votes IS 'Stores user votes (upvotes) on chat messages.';

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_chat_message_votes_message_id ON public.chat_message_votes(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_votes_user_id ON public.chat_message_votes(user_id);

-- RLS Policies for chat_message_votes
ALTER TABLE public.chat_message_votes ENABLE ROW LEVEL SECURITY;

-- Users can insert their own votes
CREATE POLICY "Users can insert their own votes" 
    ON public.chat_message_votes FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Users can view all votes (adjust as needed, e.g., only their own or if they can see the message)
CREATE POLICY "Authenticated users can view votes" 
    ON public.chat_message_votes FOR SELECT
    TO authenticated
    USING (true);

-- Users can update their own votes
CREATE POLICY "Users can update their own votes"
    ON public.chat_message_votes FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

-- Users can delete their own votes
CREATE POLICY "Users can delete their own votes"
    ON public.chat_message_votes FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Service role can manage all votes
CREATE POLICY "Service role can manage all votes"
    ON public.chat_message_votes FOR ALL
    USING (auth.role() = 'service_role');

-- ===================================================
-- SECTION 7.6: Chat Artifacts, Suggestions, and Streams
-- ===================================================

-- Create artifacts table
CREATE TABLE IF NOT EXISTS public.artifacts (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    kind TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artifacts_user_id ON public.artifacts(user_id);

CREATE TRIGGER update_artifacts_updated_at
    BEFORE UPDATE ON public.artifacts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for artifacts
ALTER TABLE public.artifacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own artifacts" ON public.artifacts;
CREATE POLICY "Users can manage their own artifacts"
    ON public.artifacts FOR ALL
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all artifacts" ON public.artifacts;
CREATE POLICY "Service role can manage all artifacts"
    ON public.artifacts FOR ALL
    USING (auth.role() = 'service_role');

-- Create suggestions table
CREATE TABLE IF NOT EXISTS public.suggestions (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES public.artifacts(id) ON DELETE CASCADE,
    title TEXT,
    from_text TEXT,
    to_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_suggestions_user_id ON public.suggestions(user_id);
CREATE INDEX IF NOT EXISTS idx_suggestions_document_id ON public.suggestions(document_id);

CREATE TRIGGER update_suggestions_updated_at
    BEFORE UPDATE ON public.suggestions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for suggestions
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own suggestions" ON public.suggestions;
CREATE POLICY "Users can manage their own suggestions"
    ON public.suggestions FOR ALL
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all suggestions" ON public.suggestions;
CREATE POLICY "Service role can manage all suggestions"
    ON public.suggestions FOR ALL
    USING (auth.role() = 'service_role');

-- Stream table for streaming responses
CREATE TABLE IF NOT EXISTS public.streams (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    chat_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_streams_chat_id ON public.streams(chat_id);

-- RLS Policies for streams table
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own streams" ON public.streams;
CREATE POLICY "Users can manage their own streams"
    ON public.streams FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.chat_sessions cs
        WHERE cs.id = streams.chat_id AND cs.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Service role can manage all streams" ON public.streams;
CREATE POLICY "Service role can manage all streams"
    ON public.streams FOR ALL
    USING (auth.role() = 'service_role');

-- Legacy tables to maintain compatibility
-- These are kept for now but can be migrated and dropped in a future migration
CREATE TABLE IF NOT EXISTS public.legacy_chats (
  id uuid PRIMARY KEY DEFAULT extensions.gen_random_uuid() NOT NULL,
  created_at timestamp NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  visibility varchar DEFAULT 'private' NOT NULL
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_legacy_chats_user_id ON public.legacy_chats(user_id);

-- RLS Policies for Chat table (legacy)
ALTER TABLE public.legacy_chats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own legacy chats" ON public.legacy_chats;
CREATE POLICY "Users can manage their own legacy chats"
    ON public.legacy_chats FOR ALL
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all legacy chats" ON public.legacy_chats;
CREATE POLICY "Service role can manage all legacy chats"
    ON public.chat_sessions FOR ALL
    USING (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS public.legacy_messages (
  id uuid PRIMARY KEY DEFAULT extensions.gen_random_uuid() NOT NULL,
  chat_id uuid NOT NULL REFERENCES public.legacy_chats(id) ON DELETE CASCADE,
  role varchar NOT NULL,
  parts json NOT NULL,
  attachments json NOT NULL,
  created_at timestamp NOT NULL
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_legacy_messages_chat_id ON public.legacy_messages(chat_id);

-- RLS Policies for Message table (legacy)
ALTER TABLE public.legacy_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access messages in their own legacy chats" ON public.legacy_messages;
CREATE POLICY "Users can access messages in their own legacy chats"
    ON public.legacy_messages FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.legacy_chats c
        WHERE c.id = legacy_messages.chat_id AND c.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Service role can manage all legacy messages" ON public.legacy_messages;
CREATE POLICY "Service role can manage all legacy messages"
    ON public.legacy_messages FOR ALL
    USING (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS public.legacy_votes (
  chat_id uuid NOT NULL REFERENCES public.legacy_chats(id) ON DELETE CASCADE,
  message_id uuid NOT NULL REFERENCES public.legacy_messages(id) ON DELETE CASCADE,
  is_upvoted boolean NOT NULL,
  CONSTRAINT "legacy_votes_chat_id_message_id_pk" PRIMARY KEY(chat_id,message_id)
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_legacy_votes_message_id ON public.legacy_votes(message_id);

-- RLS Policies for Vote table (legacy)
ALTER TABLE public.legacy_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can vote on messages in their own legacy chats" ON public.legacy_votes;
CREATE POLICY "Users can vote on messages in their own legacy chats"
    ON public.legacy_votes FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.legacy_chats c
        WHERE c.id = legacy_votes.chat_id AND c.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Service role can manage all legacy votes" ON public.legacy_votes;
CREATE POLICY "Service role can manage all legacy votes"
    ON public.legacy_votes FOR ALL
    USING (auth.role() = 'service_role');

-- Also create v2 versions to maintain compatibility
CREATE TABLE IF NOT EXISTS public.legacy_messages_v2 (
  id uuid PRIMARY KEY DEFAULT extensions.gen_random_uuid() NOT NULL,
  chat_id uuid NOT NULL REFERENCES public.legacy_chats(id) ON DELETE CASCADE,
  role varchar NOT NULL,
  parts json NOT NULL,
  attachments json NOT NULL,
  created_at timestamp NOT NULL
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_legacy_messages_v2_chat_id ON public.legacy_messages_v2(chat_id);

-- RLS Policies for Message_v2 table (legacy)
ALTER TABLE public.legacy_messages_v2 ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access messages_v2 in their own legacy chats" ON public.legacy_messages_v2;
CREATE POLICY "Users can access messages_v2 in their own legacy chats"
    ON public.legacy_messages_v2 FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.legacy_chats c
        WHERE c.id = legacy_messages_v2.chat_id AND c.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Service role can manage all legacy messages_v2" ON public.legacy_messages_v2;
CREATE POLICY "Service role can manage all legacy messages_v2"
    ON public.legacy_messages_v2 FOR ALL
    USING (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS public.legacy_votes_v2 (
  chat_id uuid NOT NULL REFERENCES public.legacy_chats(id) ON DELETE CASCADE,
  message_id uuid NOT NULL REFERENCES public.legacy_messages_v2(id) ON DELETE CASCADE,
  is_upvoted boolean NOT NULL,
  CONSTRAINT "legacy_votes_v2_chat_id_message_id_pk" PRIMARY KEY(chat_id,message_id)
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_legacy_votes_v2_message_id ON public.legacy_votes_v2(message_id);

-- RLS Policies for Vote_v2 table (legacy)
ALTER TABLE public.legacy_votes_v2 ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can vote_v2 on messages in their own legacy chats" ON public.legacy_votes_v2;
CREATE POLICY "Users can vote_v2 on messages in their own legacy chats"
    ON public.legacy_votes_v2 FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.legacy_chats c
        WHERE c.id = legacy_votes_v2.chat_id AND c.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Service role can manage all legacy votes_v2" ON public.legacy_votes_v2;
CREATE POLICY "Service role can manage all legacy votes_v2"
    ON public.legacy_votes_v2 FOR ALL
    USING (auth.role() = 'service_role');

-- ===================================================
-- SECTION 9: Document Processing Pipeline
-- ===================================================

-- Create document_categories table
CREATE TABLE IF NOT EXISTS public.document_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.document_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for document_categories
DROP POLICY IF EXISTS "Anyone can view document categories" ON public.document_categories;
CREATE POLICY "Anyone can view document categories"
    ON public.document_categories FOR SELECT
    USING (true);

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_document_categories_updated_at ON public.document_categories;
CREATE TRIGGER update_document_categories_updated_at
    BEFORE UPDATE ON public.document_categories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Documents Table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    filename TEXT NOT NULL,
    file_path TEXT NOT NULL UNIQUE,
    file_type TEXT,
    file_size BIGINT,
    text TEXT DEFAULT 'text' NOT NULL,
    content TEXT,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'uploading' CHECK (status IN ('uploading', 'uploaded', 'processing', 'error', 'complete')),
    classification JSONB,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.documents IS 'Stores metadata about uploaded documents for the processing pipeline.';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS documents_status_idx ON public.documents(status);

-- Trigger to update 'updated_at' timestamp
DROP TRIGGER IF EXISTS update_documents_updated_at ON public.documents;
CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON public.documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for documents table
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own documents" ON public.documents;
CREATE POLICY "Users can manage their own documents"
    ON public.documents FOR ALL
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can access all documents" ON public.documents;
CREATE POLICY "Service role can access all documents"
    ON public.documents FOR ALL
    USING (auth.role() = 'service_role');

-- Document Chunks Table
CREATE TABLE IF NOT EXISTS public.document_chunks (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    text_content TEXT NOT NULL,
    embedding extensions.vector(1024), -- Qualified type
    token_count INTEGER,
    created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.document_chunks IS 'Stores text chunks and their vector embeddings for semantic search.';

-- Indexes for document_chunks
CREATE INDEX IF NOT EXISTS idx_document_chunks_document_id ON public.document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding ON public.document_chunks
    USING ivfflat (embedding extensions.vector_cosine_ops) WITH (lists = 100); -- Qualified type and operator class

-- RLS Policies for document_chunks
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view chunks for their own documents" ON public.document_chunks;
CREATE POLICY "Users can view chunks for their own documents"
    ON public.document_chunks FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.documents d
            WHERE d.id = document_chunks.document_id AND d.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Service role can access all chunks" ON public.document_chunks;
CREATE POLICY "Service role can access all chunks"
    ON public.document_chunks FOR ALL
    USING (auth.role() = 'service_role');

-- Document chat session links table
CREATE TABLE IF NOT EXISTS public.document_chat_session_links (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    UNIQUE(document_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_doc_chat_links_session_id ON public.document_chat_session_links(session_id);
CREATE INDEX IF NOT EXISTS idx_doc_chat_links_created_by ON public.document_chat_session_links(created_by);

-- RLS Policies for document links
ALTER TABLE public.document_chat_session_links ENABLE ROW LEVEL SECURITY;

-- Allow service_role full access
DROP POLICY IF EXISTS "Allow service_role full access on document_chat_session_links" ON public.document_chat_session_links;
CREATE POLICY "Allow service_role full access on document_chat_session_links"
    ON public.document_chat_session_links FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Allow users to view links if they can access BOTH the document AND the session
DROP POLICY IF EXISTS "Allow view access if user can access document and session" ON public.document_chat_session_links;
CREATE POLICY "Allow view access if user can access document and session"
    ON public.document_chat_session_links FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.documents d
            WHERE d.id = document_chat_session_links.document_id
            AND d.user_id = auth.uid()
        )
        AND
        EXISTS (
            SELECT 1 FROM public.chat_sessions cs
            WHERE cs.id = document_chat_session_links.session_id
            AND cs.user_id = auth.uid()
        )
    );

-- Similarity Search Function for documents
CREATE OR REPLACE FUNCTION public.match_document_chunks(
  query_embedding extensions.vector(1024), -- Qualified type
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5,
  p_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  text_content TEXT,
  similarity float
)
LANGUAGE plpgsql
SET search_path = public, extensions -- Added search_path setting
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.document_id,
    dc.text_content,
    1 - (dc.embedding <=> query_embedding) AS similarity -- Operator assumes types are compatible or search_path helps resolve
  FROM public.document_chunks dc
  JOIN public.documents d ON dc.document_id = d.id
  WHERE (1 - (dc.embedding <=> query_embedding)) > match_threshold
    AND (p_user_id IS NULL OR d.user_id = p_user_id)
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

COMMENT ON FUNCTION public.match_document_chunks IS 'Searches for document chunks semantically similar to a query embedding.';

-- ===================================================
-- SECTION 10: Research System
-- ===================================================

-- Research Sessions table
CREATE TABLE IF NOT EXISTS public.research_sessions (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.research_sessions IS 'Stores user research sessions';

-- Research Sources table
CREATE TABLE IF NOT EXISTS public.research_sources (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.research_sessions(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    content TEXT,
    relevance DOUBLE PRECISION,
    credibility_score DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

COMMENT ON TABLE public.research_sources IS 'Stores sources used in research';

-- Research Findings table 
CREATE TABLE IF NOT EXISTS public.research_findings (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.research_sessions(id) ON DELETE CASCADE,
    source_id UUID REFERENCES public.research_sources(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    category TEXT,
    confidence DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

COMMENT ON TABLE public.research_findings IS 'Stores individual findings from research sources';

-- Research Reports table
CREATE TABLE IF NOT EXISTS public.research_reports (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.research_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

COMMENT ON TABLE public.research_reports IS 'Stores research reports generated from sessions';

-- Create indexes for research tables
CREATE INDEX IF NOT EXISTS idx_research_sessions_user_id ON public.research_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_research_sessions_status ON public.research_sessions(status);
CREATE INDEX IF NOT EXISTS idx_research_reports_user_id ON public.research_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_research_reports_session_id ON public.research_reports(session_id);
CREATE INDEX IF NOT EXISTS idx_research_sources_session_id ON public.research_sources(session_id);
CREATE INDEX IF NOT EXISTS idx_research_findings_session_id ON public.research_findings(session_id);
CREATE INDEX IF NOT EXISTS idx_research_findings_source_id ON public.research_findings(source_id);

-- Add updated_at trigger for research
DROP TRIGGER IF EXISTS update_research_sessions_updated_at ON public.research_sessions;
CREATE TRIGGER update_research_sessions_updated_at
    BEFORE UPDATE ON public.research_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_research_reports_updated_at ON public.research_reports;
CREATE TRIGGER update_research_reports_updated_at
    BEFORE UPDATE ON public.research_reports
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add RLS policies for research tables
ALTER TABLE public.research_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_findings ENABLE ROW LEVEL SECURITY;

-- Research Sessions RLS
DROP POLICY IF EXISTS "Users can view their own research sessions" ON public.research_sessions;
CREATE POLICY "Users can view their own research sessions"
ON public.research_sessions
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own research sessions" ON public.research_sessions;
CREATE POLICY "Users can create their own research sessions"
ON public.research_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Research Reports RLS
DROP POLICY IF EXISTS "Users can view their own research reports" ON public.research_reports;
CREATE POLICY "Users can view their own research reports"
ON public.research_reports
FOR SELECT
USING (auth.uid() = user_id);

-- Research Sources RLS
DROP POLICY IF EXISTS "Users can view sources for their research sessions" ON public.research_sources;
CREATE POLICY "Users can view sources for their research sessions"
ON public.research_sources
FOR SELECT
USING (session_id IN (
  SELECT id FROM public.research_sessions
  WHERE user_id = auth.uid()
));

-- Research Findings RLS
DROP POLICY IF EXISTS "Users can view findings for their research sessions" ON public.research_findings;
CREATE POLICY "Users can view findings for their research sessions"
ON public.research_findings
FOR SELECT
USING (session_id IN (
  SELECT id FROM public.research_sessions
  WHERE user_id = auth.uid()
));

-- Deep Research Tables
CREATE TABLE IF NOT EXISTS public.deep_research_sessions (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(), -- Changed from uuid_generate_v4()
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    query TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_deep_research_sessions_user_id ON public.deep_research_sessions(user_id);

-- RLS Policies for deep_research_sessions
ALTER TABLE public.deep_research_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own deep_research_sessions" ON public.deep_research_sessions;
CREATE POLICY "Users can manage their own deep_research_sessions"
    ON public.deep_research_sessions FOR ALL
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all deep_research_sessions" ON public.deep_research_sessions;
CREATE POLICY "Service role can manage all deep_research_sessions"
    ON public.deep_research_sessions FOR ALL
    USING (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS public.deep_research_sources (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(), -- Changed from uuid_generate_v4()
    session_id UUID REFERENCES public.deep_research_sessions(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    relevance REAL DEFAULT 0.0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_deep_research_sources_session_id ON public.deep_research_sources(session_id);

-- RLS Policies for deep_research_sources
ALTER TABLE public.deep_research_sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access sources for their own deep_research_sessions" ON public.deep_research_sources;
CREATE POLICY "Users can access sources for their own deep_research_sessions"
    ON public.deep_research_sources FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.deep_research_sessions drs
        WHERE drs.id = deep_research_sources.session_id AND drs.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Service role can manage all deep_research_sources" ON public.deep_research_sources;
CREATE POLICY "Service role can manage all deep_research_sources"
    ON public.deep_research_sources FOR ALL
    USING (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS public.deep_research_findings (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(), -- Changed from uuid_generate_v4()
    session_id UUID REFERENCES public.deep_research_sessions(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    depth INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_deep_research_findings_session_id ON public.deep_research_findings(session_id);

-- RLS Policies for deep_research_findings
ALTER TABLE public.deep_research_findings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access findings for their own deep_research_sessions" ON public.deep_research_findings;
CREATE POLICY "Users can access findings for their own deep_research_sessions"
    ON public.deep_research_findings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.deep_research_sessions drs
        WHERE drs.id = deep_research_findings.session_id AND drs.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Service role can manage all deep_research_findings" ON public.deep_research_findings;
CREATE POLICY "Service role can manage all deep_research_findings"
    ON public.deep_research_findings FOR ALL
    USING (auth.role() = 'service_role');

-- ===================================================
-- SECTION 10.5: Research Views
-- ===================================================

CREATE OR REPLACE VIEW public.recent_research_sessions
WITH (security_invoker = true) -- Addresses the SECURITY DEFINER lint issue
AS
SELECT
    rs.id,
    rs.user_id,
    rs.query,
    rs.status,
    rs.metadata,
    rs.created_at,
    rs.updated_at
FROM
    public.research_sessions rs
ORDER BY
    rs.created_at DESC
LIMIT 100; -- Example limit, adjust as necessary

COMMENT ON VIEW public.recent_research_sessions IS 'Provides a view of the 100 most recent research sessions, respecting user RLS from the underlying table due to security_invoker=true.';

-- Note: RLS policies on public.research_sessions will automatically apply to this view
-- when queried by a user, because security_invoker is true. Explicit RLS on the view
-- is generally not needed unless different access patterns are required for the view itself.

-- ===================================================
-- SECTION 11: Scraping System
-- ===================================================

-- Create table for scraping sources
CREATE TABLE IF NOT EXISTS public.scraping_sources (
  id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category public.source_category NOT NULL DEFAULT 'other',
  description TEXT,
  trust_score INTEGER NOT NULL DEFAULT 50,
  last_scraped TIMESTAMPTZ,
  scrape_frequency INTERVAL DEFAULT '1 day'::INTERVAL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_scraping_sources_created_by ON public.scraping_sources(created_by);

-- RLS Policies for scraping_sources
ALTER TABLE public.scraping_sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can manage scraping_sources" ON public.scraping_sources;
CREATE POLICY "Admin users can manage scraping_sources"
    ON public.scraping_sources FOR ALL
    USING (auth.role() = 'service_role' OR (select public.is_admin()))
    WITH CHECK (auth.role() = 'service_role' OR (select public.is_admin())); 

DROP POLICY IF EXISTS "Authenticated users can view scraping_sources" ON public.scraping_sources;
CREATE POLICY "Authenticated users can view scraping_sources"
    ON public.scraping_sources FOR SELECT
    TO authenticated
    USING (true);

-- Create table for source_validations
CREATE TABLE IF NOT EXISTS public.source_validations (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES public.scraping_sources(id) ON DELETE CASCADE,
    validated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_valid BOOLEAN NOT NULL,
    validation_notes TEXT,
    validated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.source_validations IS 'Stores validation status and history for scraping sources.';

CREATE INDEX IF NOT EXISTS idx_source_validations_source_id ON public.source_validations(source_id);
CREATE INDEX IF NOT EXISTS idx_source_validations_validated_by ON public.source_validations(validated_by);

DROP TRIGGER IF EXISTS update_source_validations_updated_at ON public.source_validations;
CREATE TRIGGER update_source_validations_updated_at
    BEFORE UPDATE ON public.source_validations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.source_validations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin and service_role can manage source_validations" ON public.source_validations;
CREATE POLICY "Admin and service_role can manage source_validations"
    ON public.source_validations FOR ALL
    USING (auth.role() = 'service_role' OR (select public.is_admin()))
    WITH CHECK (auth.role() = 'service_role' OR (select public.is_admin()));

-- Create table for scraping configurations
CREATE TABLE IF NOT EXISTS public."scrape_configurations" (
  "id" UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
  "name" TEXT NOT NULL UNIQUE,
  "base_url" TEXT NOT NULL,
  "source_type" TEXT NOT NULL,
  "country_code" TEXT,
  "extraction_schema" JSONB, -- Renamed from selectors, to store Firecrawl JSON schema
  "firecrawl_params" JSONB NULL, -- New field for other Firecrawl specific parameters
  "schedule" TEXT, -- Cron schedule for recurring scraping
  "is_active" BOOLEAN DEFAULT TRUE,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public."scrape_configurations" ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for scrape_configurations
DROP POLICY IF EXISTS "Admin and service_role can manage scrape_configurations" ON public."scrape_configurations";
CREATE POLICY "Admin and service_role can manage scrape_configurations"
    ON public."scrape_configurations" FOR ALL
    USING (auth.role() = 'service_role' OR (select public.is_admin())) 
    WITH CHECK (auth.role() = 'service_role' OR (select public.is_admin())); 

-- Create table for scraped sources
CREATE TABLE IF NOT EXISTS public."scraped_sources" (
  "id" UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(), -- Changed from uuid_generate_v4()
  "url" TEXT NOT NULL UNIQUE,
  "title" TEXT,
  "source_type" TEXT NOT NULL, -- e.g., 'official', 'community', 'legal'
  "country_code" TEXT, -- Optional country association
  "r2_object_key" TEXT, -- Reference to the R2 object (if storing large content externally)
  "autorag_indexed" BOOLEAN DEFAULT FALSE, -- Whether this has been added to AutoRAG
  "last_scraped_at" TIMESTAMPTZ DEFAULT now(),
  "content_hash" TEXT, -- To detect changes
  "metadata" JSONB DEFAULT '{}'::jsonb, -- Store Firecrawl's full metadata object here
  "markdown_content" TEXT NULL, -- To store markdown from Firecrawl
  "html_content" TEXT NULL, -- To store HTML from Firecrawl
  "raw_content" TEXT NULL, -- To store raw_content from Firecrawl (if available/needed)
  "extracted_data" JSONB NULL, -- To store structured data from Firecrawl LLM extraction
  "page_status_code" INTEGER NULL, -- Store page status code from Firecrawl metadata
  "firecrawl_job_id" TEXT NULL, -- Store Firecrawl job ID if applicable
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ DEFAULT now()
);

-- Add RLS policies for scraped_sources
ALTER TABLE public."scraped_sources" ENABLE ROW LEVEL SECURITY;

-- Scraped sources policies 
DROP POLICY IF EXISTS "Authenticated users can view scraped sources" ON public."scraped_sources";
CREATE POLICY "Authenticated users can view scraped sources"
  ON public."scraped_sources" FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only service role can modify scraped sources
DROP POLICY IF EXISTS "Only service role can insert scraped sources" ON public."scraped_sources";
CREATE POLICY "Only service role can insert scraped sources"
  ON public."scraped_sources" FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Only service role can update scraped sources" ON public."scraped_sources";
CREATE POLICY "Only service role can update scraped sources"
  ON public."scraped_sources" FOR UPDATE
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Only service role can delete scraped sources" ON public."scraped_sources";
CREATE POLICY "Only service role can delete scraped sources"
  ON public."scraped_sources" FOR DELETE
  USING (auth.role() = 'service_role');

-- Create table for scraping logs
CREATE TABLE IF NOT EXISTS public.scraping_logs (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    triggered_at TIMESTAMPTZ NOT NULL,
    status_code INTEGER,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policies for scraping_logs
ALTER TABLE public.scraping_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin and service_role can access scraping_logs" ON public.scraping_logs;
CREATE POLICY "Admin and service_role can access scraping_logs"
    ON public.scraping_logs FOR ALL
    USING (auth.role() = 'service_role' OR (select public.is_admin())) 
    WITH CHECK (auth.role() = 'service_role' OR (select public.is_admin())); 

-- Create table for scrape_history
CREATE TABLE IF NOT EXISTS public.scrape_history (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
    source_id UUID REFERENCES public.scraping_sources(id) ON DELETE SET NULL,
    config_id UUID REFERENCES public."scrape_configurations"(id) ON DELETE SET NULL,
    scraped_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'partial', 'pending', 'running')),
    items_scraped INTEGER, -- More relevant for crawls; for single scrape, might be 1
    error_message TEXT,
    duration_ms INTEGER,
    log_details JSONB, -- Can store Firecrawl job status/warnings
    firecrawl_job_id TEXT NULL, -- Store Firecrawl job ID if applicable
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.scrape_history IS 'Logs the history of scraping activities and their outcomes.';

CREATE INDEX IF NOT EXISTS idx_scrape_history_source_id ON public.scrape_history(source_id);
CREATE INDEX IF NOT EXISTS idx_scrape_history_config_id ON public.scrape_history(config_id);
CREATE INDEX IF NOT EXISTS idx_scrape_history_scraped_at ON public.scrape_history(scraped_at);
CREATE INDEX IF NOT EXISTS idx_scrape_history_status ON public.scrape_history(status);

ALTER TABLE public.scrape_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin and service_role can manage scrape_history" ON public.scrape_history;
CREATE POLICY "Admin and service_role can manage scrape_history"
    ON public.scrape_history FOR ALL
    USING (auth.role() = 'service_role' OR (select public.is_admin()))
    WITH CHECK (auth.role() = 'service_role' OR (select public.is_admin()));

-- ===================================================
-- SECTION 12: Feedback and Notifications
-- ===================================================

-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(), -- Changed from uuid_generate_v4()
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    chat_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON public.feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_chat_id ON public.feedback(chat_id);

-- RLS Policies for feedback table
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for feedback
DROP POLICY IF EXISTS "Users can view their own feedback" ON public.feedback;
CREATE POLICY "Users can view their own feedback"
  ON public.feedback
  FOR SELECT
  USING (user_id = auth.uid());

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id uuid NOT NULL DEFAULT extensions.gen_random_uuid() PRIMARY KEY, -- Changed from uuid_generate_v4()
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    message text NOT NULL,
    is_read boolean NOT NULL DEFAULT false,
    link_url text,
    notification_type public.notification_type,
    metadata jsonb
);

-- Add index for foreign key
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);

-- RLS Policies for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
DROP POLICY IF EXISTS "Users can view their own notifications." ON public.notifications;
CREATE POLICY "Users can view their own notifications."
    ON public.notifications FOR SELECT
    USING (auth.uid() = user_id);

-- ===================================================
-- SECTION 13: Finalization
-- ===================================================

-- Register this migration with the versioning system
DO $$ 
BEGIN
  -- Register the consolidated migration
  PERFORM migration_meta.register_migration(
    99, 0, 0, 
    'Consolidated schema migration including all historical migrations',
    '20250717000000_initial_schema.sql'
  );
END $$;

-- Commit all changes
COMMIT;
