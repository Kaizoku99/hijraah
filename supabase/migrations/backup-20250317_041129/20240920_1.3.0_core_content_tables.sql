-- Added by syntax fixer script
BEGIN;
BEGIN;
-- Migration: 20240920_1.3.0_core_content_tables.sql
-- Description: Implements artifacts and content storage system

-- Register this migration with versioning system
DO $$ 
BEGIN
  -- Only run if the migration_meta schema exists
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'migration_meta') THEN
    PERFORM migration_meta.register_migration(
      1, 3, 0,
      'Core content tables including artifacts',
      '20240920_1.3.0_core_content_tables.sql'
    );
  END IF;
END $$;

-- Artifacts table for storing user-generated content
CREATE TABLE IF NOT EXISTS artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('document', 'spreadsheet', 'code', 'image', 'mindmap')),
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('private', 'public', 'team')),
    embedding vector(1536),
    needs_embedding BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comments for better documentation
COMMENT ON TABLE artifacts IS 'Stores user-generated content artifacts of various types';
COMMENT ON COLUMN artifacts.id IS 'Primary key for the artifact';
COMMENT ON COLUMN artifacts.user_id IS 'Foreign key to the user who created the artifact';
COMMENT ON COLUMN artifacts.title IS 'Title or name of the artifact';
COMMENT ON COLUMN artifacts.description IS 'Optional description of the artifact';
COMMENT ON COLUMN artifacts.type IS 'Type of artifact (document, spreadsheet, code, etc.)';
COMMENT ON COLUMN artifacts.content IS 'JSON content of the artifact, structure depends on type';
COMMENT ON COLUMN artifacts.visibility IS 'Visibility setting: private, public, or team';
COMMENT ON COLUMN artifacts.embedding IS 'Vector embedding for semantic search';
COMMENT ON COLUMN artifacts.needs_embedding IS 'Flag indicating whether embedding needs to be generated';
COMMENT ON COLUMN artifacts.metadata IS 'Additional metadata about the artifact';
COMMENT ON COLUMN artifacts.created_at IS 'When the artifact was created';
COMMENT ON COLUMN artifacts.updated_at IS 'When the artifact was last updated';

-- Create artifact_messages table for commenting/collaboration
CREATE TABLE IF NOT EXISTS artifact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artifact_id UUID NOT NULL REFERENCES artifacts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comments for better documentation
COMMENT ON TABLE artifact_messages IS 'Messages or comments related to artifacts';
COMMENT ON COLUMN artifact_messages.id IS 'Primary key for the message';
COMMENT ON COLUMN artifact_messages.artifact_id IS 'Foreign key to the artifact';
COMMENT ON COLUMN artifact_messages.user_id IS 'Foreign key to the user who created the message';
COMMENT ON COLUMN artifact_messages.message IS 'Content of the message';
COMMENT ON COLUMN artifact_messages.created_at IS 'When the message was created';

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS idx_artifacts_user_id ON artifacts(user_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_type ON artifacts(type);
CREATE INDEX IF NOT EXISTS idx_artifacts_visibility ON artifacts(visibility);
CREATE INDEX IF NOT EXISTS idx_artifact_messages_artifact_id ON artifact_messages(artifact_id);
CREATE INDEX IF NOT EXISTS idx_artifact_messages_user_id ON artifact_messages(user_id);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_artifacts_updated_at
BEFORE UPDATE ON artifacts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create trigger function to flag artifacts for embedding
CREATE OR REPLACE FUNCTION update_needs_embedding()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') OR 
     (TG_OP = 'UPDATE' AND (
       NEW.title != OLD.title OR 
       NEW.content != OLD.content OR
       NEW.description != OLD.description
     )) THEN
    NEW.needs_embedding := TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add the trigger to the artifacts table
CREATE TRIGGER artifacts_needs_embedding_trigger
BEFORE INSERT OR UPDATE ON artifacts
FOR EACH ROW EXECUTE FUNCTION update_needs_embedding();

-- Function for similarity search of artifacts
CREATE OR REPLACE FUNCTION match_artifacts (
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.78,
  match_count int DEFAULT 10,
  filter_visibility text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  title text,
  content jsonb,
  type text,
  visibility text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    a.title,
    a.content,
    a.type,
    a.visibility,
    1 - (a.embedding <=> query_embedding) AS similarity
  FROM artifacts a
  WHERE 
    a.embedding IS NOT NULL
    AND (filter_visibility IS NULL OR a.visibility = filter_visibility)
    AND 1 - (a.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

COMMENT ON FUNCTION match_artifacts IS 'Performs similarity search on artifacts using vector embeddings';

-- Add RLS policies
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;

-- Users can view their own artifacts
CREATE POLICY "Users can view their own artifacts"
ON artifacts
FOR SELECT
USING (auth.uid() = user_id);

-- Users can view public artifacts
CREATE POLICY "Users can view public artifacts"
ON artifacts
FOR SELECT
USING (visibility = 'public');

-- Users can create artifacts
CREATE POLICY "Users can insert their own artifacts"
ON artifacts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own artifacts
CREATE POLICY "Users can update their own artifacts"
ON artifacts
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own artifacts
CREATE POLICY "Users can delete their own artifacts"
ON artifacts
FOR DELETE
USING (auth.uid() = user_id);

-- RLS for artifact messages
ALTER TABLE artifact_messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages for artifacts they can access
CREATE POLICY "Users can view messages for their artifacts"
ON artifact_messages
FOR SELECT
USING (artifact_id IN (
  SELECT id FROM artifacts 
  WHERE user_id = auth.uid() OR visibility = 'public'
));

-- Users can add messages to artifacts they own
CREATE POLICY "Users can insert messages for their artifacts"
ON artifact_messages
FOR INSERT
WITH CHECK (artifact_id IN (
  SELECT id FROM artifacts 
  WHERE user_id = auth.uid()
));

-- Users can delete their own messages
CREATE POLICY "Users can delete their own messages"
ON artifact_messages
FOR DELETE
USING (user_id = auth.uid()); 
