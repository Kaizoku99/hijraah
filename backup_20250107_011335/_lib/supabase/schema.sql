-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Create vector type for embeddings
CREATE TABLE public.embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add vector similarity search functions
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  content_id UUID,
  content_type TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.id,
    e.content_id,
    e.content_type,
    1 - (e.embedding <=> query_embedding) as similarity
  FROM embeddings e
  WHERE 1 - (e.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- Add indexes for better performance
CREATE INDEX embeddings_embedding_idx ON public.embeddings USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Enable RLS for embeddings
ALTER TABLE public.embeddings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for embeddings
CREATE POLICY "Enable read access for authenticated users"
  ON public.embeddings
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Rest of the existing schema...