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
BEGIN;
BEGIN;
BEGIN;
BEGIN;
-- Migration: 20240902_1.1.0_primary_schema.sql
-- Description: Consolidated primary schema for Hijraah immigration platform
-- Includes core tables, enums, and base functionality

-- Register this migration
DO $$ 
BEGIN
  -- Only run if the migration_meta schema exists
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'migration_meta') THEN
    PERFORM migration_meta.register_migration(
      1, 1, 0,
      'Consolidated primary schema with core tables and functionality',
      '20240902_1.1.0_primary_schema.sql'
    );
  END IF;
END $$;

-- Create required enums
DO $$ 
BEGIN
  -- Session type enum
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'session_type') THEN
    CREATE TYPE session_type AS ENUM ('chat', 'research', 'case');
  END IF;
  
  -- Session status enum  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'session_status') THEN
    CREATE TYPE session_status AS ENUM ('active', 'completed', 'archived');
  END IF;
  
  -- Case status enum
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'case_status') THEN
    CREATE TYPE case_status AS ENUM ('draft', 'submitted', 'in_review', 'approved', 'rejected', 'completed');
  END IF;
  
  -- Document status enum
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'document_status') THEN
    CREATE TYPE document_status AS ENUM ('pending', 'verified', 'rejected');
  END IF;
  
  -- Notification type enum
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type') THEN
    CREATE TYPE notification_type AS ENUM ('system', 'case_update', 'document_request', 'message');
  END IF;
END $$;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  timezone TEXT,
  language TEXT DEFAULT 'en',
  country_of_residence TEXT,
  country_of_interest TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profile RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create profiles auto-creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type session_type NOT NULL,
    title TEXT,
    summary TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    status session_status DEFAULT 'active'::session_status,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions indexes
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'sessions' AND indexname = 'sessions_user_id_idx'
    ) THEN
        CREATE INDEX sessions_user_id_idx ON sessions(user_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'sessions' AND indexname = 'sessions_type_idx'
    ) THEN
        CREATE INDEX sessions_type_idx ON sessions(type);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'sessions' AND indexname = 'sessions_status_idx'
    ) THEN
        CREATE INDEX sessions_status_idx ON sessions(status);
    END IF;
END $$;

-- Sessions RLS policies
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own sessions" ON sessions;
CREATE POLICY "Users can view their own sessions" 
    ON sessions FOR SELECT 
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own sessions" ON sessions;
CREATE POLICY "Users can insert their own sessions" 
    ON sessions FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own sessions" ON sessions;
CREATE POLICY "Users can update their own sessions" 
    ON sessions FOR UPDATE 
    USING (auth.uid() = user_id);

-- Add updated_at trigger for sessions
CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
    context TEXT,
    prompt TEXT,
    agent_config JSONB DEFAULT '{}'::JSONB,
    last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat sessions RLS policies
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own chat sessions" ON chat_sessions;
CREATE POLICY "Users can view their own chat sessions" 
    ON chat_sessions FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM sessions 
        WHERE sessions.id = chat_sessions.id 
        AND sessions.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Users can insert their own chat sessions" ON chat_sessions;
CREATE POLICY "Users can insert their own chat sessions" 
    ON chat_sessions FOR INSERT 
    WITH CHECK (EXISTS (
        SELECT 1 FROM sessions 
        WHERE sessions.id = chat_sessions.id 
        AND sessions.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Users can update their own chat sessions" ON chat_sessions;
CREATE POLICY "Users can update their own chat sessions" 
    ON chat_sessions FOR UPDATE 
    USING (EXISTS (
        SELECT 1 FROM sessions 
        WHERE sessions.id = chat_sessions.id 
        AND sessions.user_id = auth.uid()
    ));

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::JSONB,
    tokens INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat messages indexes
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'chat_messages' AND indexname = 'chat_messages_session_id_idx'
    ) THEN
        CREATE INDEX chat_messages_session_id_idx ON chat_messages(session_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'chat_messages' AND indexname = 'chat_messages_role_idx'
    ) THEN
        CREATE INDEX chat_messages_role_idx ON chat_messages(role);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'chat_messages' AND indexname = 'chat_messages_created_at_idx'
    ) THEN
        CREATE INDEX chat_messages_created_at_idx ON chat_messages(created_at);
    END IF;
END $$;

-- Chat messages RLS policies
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own chat messages" ON chat_messages;
CREATE POLICY "Users can view their own chat messages" 
    ON chat_messages FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM sessions 
        WHERE sessions.id = chat_messages.session_id 
        AND sessions.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Users can insert their own chat messages" ON chat_messages;
CREATE POLICY "Users can insert their own chat messages" 
    ON chat_messages FOR INSERT 
    WITH CHECK (EXISTS (
        SELECT 1 FROM sessions 
        WHERE sessions.id = chat_messages.session_id 
        AND sessions.user_id = auth.uid()
    ));

-- Create cases table
CREATE TABLE IF NOT EXISTS cases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status case_status DEFAULT 'draft'::case_status,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create case_events table for case history
CREATE TABLE IF NOT EXISTS case_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL,
    mime_type TEXT,
    status document_status DEFAULT 'pending'::document_status,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add updated_at triggers
CREATE TRIGGER update_cases_updated_at
    BEFORE UPDATE ON cases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_events_updated_at
    BEFORE UPDATE ON case_events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Cases RLS policies
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own cases" ON cases;
CREATE POLICY "Users can view their own cases" ON cases FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert their own cases" ON cases;
CREATE POLICY "Users can insert their own cases" ON cases FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own cases" ON cases;
CREATE POLICY "Users can update their own cases" ON cases FOR UPDATE USING (auth.uid() = user_id);

-- Add indexes for performance
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'cases' AND indexname = 'idx_cases_user_id') THEN
        CREATE INDEX idx_cases_user_id ON cases(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'cases' AND indexname = 'idx_cases_status') THEN
        CREATE INDEX idx_cases_status ON cases(status);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'case_events' AND indexname = 'idx_case_events_case_id') THEN
        CREATE INDEX idx_case_events_case_id ON case_events(case_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_case_id') THEN
        CREATE INDEX idx_documents_case_id ON documents(case_id);
    END IF;
END $$;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    data JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications RLS policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update is_read status" ON notifications;
CREATE POLICY "Users can update is_read status" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Add indexes for notifications
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'notifications' AND indexname = 'idx_notifications_user_id') THEN
        CREATE INDEX idx_notifications_user_id ON notifications(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'notifications' AND indexname = 'idx_notifications_is_read') THEN
        CREATE INDEX idx_notifications_is_read ON notifications(is_read);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'notifications' AND indexname = 'idx_notifications_created_at') THEN
        CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
    END IF;
END $$; 
