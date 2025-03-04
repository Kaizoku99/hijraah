-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create embeddings table for vector search
CREATE TABLE IF NOT EXISTS embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding VECTOR(1536) NOT NULL, -- Ada-002 embeddings are 1536 dimensions
  collection_id TEXT NOT NULL DEFAULT 'default',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster vector searches
CREATE INDEX IF NOT EXISTS embeddings_collection_id_idx ON embeddings (collection_id);
CREATE INDEX IF NOT EXISTS embeddings_user_id_idx ON embeddings (user_id);

-- Create GIN index for JSON metadata - helps with filtering on metadata
CREATE INDEX IF NOT EXISTS embeddings_metadata_idx ON embeddings USING GIN (metadata);

-- Create vector index for similarity search
CREATE INDEX IF NOT EXISTS embeddings_vector_idx ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create function for matching embeddings
CREATE OR REPLACE FUNCTION match_embeddings(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  collection_id TEXT,
  user_id UUID,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.id,
    e.content,
    e.collection_id,
    e.user_id,
    e.metadata,
    1 - (e.embedding <=> query_embedding) AS similarity
  FROM
    embeddings e
  WHERE
    1 - (e.embedding <=> query_embedding) > match_threshold
  ORDER BY
    similarity DESC
  LIMIT
    match_count;
END;
$$;

-- Create table for scrape history
CREATE TABLE IF NOT EXISTS scrape_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  storage_path TEXT,
  public_url TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for scrape history user lookups
CREATE INDEX IF NOT EXISTS scrape_history_user_id_idx ON scrape_history (user_id);

-- RLS (Row Level Security) policies for the tables
ALTER TABLE embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_history ENABLE ROW LEVEL SECURITY;

-- Only allow users to see their own embeddings, or public ones
CREATE POLICY "Users can view their own embeddings" ON embeddings
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Only allow users to insert their own embeddings
CREATE POLICY "Users can insert their own embeddings" ON embeddings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only allow users to update their own embeddings
CREATE POLICY "Users can update their own embeddings" ON embeddings
  FOR UPDATE USING (auth.uid() = user_id);

-- Only allow users to delete their own embeddings
CREATE POLICY "Users can delete their own embeddings" ON embeddings
  FOR DELETE USING (auth.uid() = user_id);

-- Only allow users to see their own scrape history
CREATE POLICY "Users can view their own scrape history" ON scrape_history
  FOR SELECT USING (auth.uid() = user_id);

-- Only allow users to insert into their own scrape history
CREATE POLICY "Users can insert their own scrape history" ON scrape_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only allow users to delete their own scrape history
CREATE POLICY "Users can delete their own scrape history" ON scrape_history
  FOR DELETE USING (auth.uid() = user_id); 