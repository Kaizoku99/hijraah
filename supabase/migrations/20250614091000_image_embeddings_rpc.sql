-- Resize embedding vector dimension to 1536 to align with text-embedding-3-small
ALTER TABLE public.image_embeddings
  ALTER COLUMN embedding TYPE vector(1536) USING embedding::vector(1536);

-- Function for vector similarity search on images
CREATE OR REPLACE FUNCTION public.match_image_embeddings(
  p_query_embedding vector(1536),
  p_match_count INT DEFAULT 5
)
RETURNS TABLE (
  image_url TEXT,
  metadata JSONB,
  similarity FLOAT
) AS $$
  SELECT
    ie.image_url,
    ie.metadata,
    1 - (ie.embedding <=> p_query_embedding) AS similarity
  FROM public.image_embeddings ie
  ORDER BY ie.embedding <=> p_query_embedding
  LIMIT p_match_count;
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION public.match_image_embeddings(vector, int) TO anon, authenticated; 