-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Ensure artifacts table has an embedding column
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Create function for similarity search
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

-- Create an update trigger to flag documents that need embeddings
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS needs_embedding BOOLEAN DEFAULT FALSE;

CREATE OR REPLACE FUNCTION update_needs_embedding()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') OR 
     (TG_OP = 'UPDATE' AND (
       NEW.title != OLD.title OR 
       NEW.content != OLD.content
     )) THEN
    NEW.needs_embedding := TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER artifacts_needs_embedding_trigger
BEFORE INSERT OR UPDATE ON artifacts
FOR EACH ROW EXECUTE FUNCTION update_needs_embedding(); 