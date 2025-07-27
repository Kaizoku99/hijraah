-- Migration: 20250718093000_fix_search_path_and_extension.sql
-- Description: Set explicit search_path for functions flagged by linter and move pg_net extension out of public schema.
-- Created: 2025-07-18

-- ===================================================
-- SECTION 0: Move pg_net extension to extensions schema
-- ===================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension e
    JOIN pg_namespace n ON n.oid = e.extnamespace
    WHERE e.extname = 'pg_net' AND n.nspname = 'public'
  ) THEN
    -- Drop and recreate extension in permitted schema since pg_net is not relocatable
    DROP EXTENSION pg_net;
    /* Recreate pg_net; the extension itself defines objects in schema "net".
       No WITH SCHEMA clause needed because pg_net is not relocatable and will
       always create its own schema. */
    CREATE EXTENSION IF NOT EXISTS pg_net;
  END IF;
END$$;

-- Ensure roles retain access to the pg_net objects
GRANT USAGE ON SCHEMA net TO anon, authenticated, service_role;

-- ===================================================
-- SECTION 1: Re-create functions with immutable search_path
-- ===================================================

-- 1. get_related_edges ------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_related_edges(p_entity_names text[])
RETURNS TABLE (
    relationship_type text,
    source_entity_id uuid,
    source_entity_name text,
    target_entity_id uuid,
    target_entity_name text
) 
LANGUAGE sql STABLE
SET search_path = public, extensions
AS $$
  SELECT
    r.relationship_type,
    r.source_entity_id,
    s.entity_name AS source_entity_name,
    r.target_entity_id,
    t.entity_name AS target_entity_name
  FROM public.kg_relationships r
  JOIN public.kg_entities s ON s.id = r.source_entity_id
  JOIN public.kg_entities t ON t.id = r.target_entity_id
  WHERE s.entity_name = ANY(p_entity_names)
     OR t.entity_name = ANY(p_entity_names);
$$;

GRANT EXECUTE ON FUNCTION public.get_related_edges(text[]) TO anon, authenticated;

-- 2. is_admin ---------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, auth, extensions
AS $$
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
$$;

-- 3. match_image_embeddings -------------------------------------------------
CREATE OR REPLACE FUNCTION public.match_image_embeddings(
  p_query_embedding vector(1536),
  p_match_count INT DEFAULT 5
)
RETURNS TABLE (
  image_url TEXT,
  metadata JSONB,
  similarity FLOAT
) 
LANGUAGE sql STABLE
SET search_path = public, extensions
AS $$
  SELECT
    ie.image_url,
    ie.metadata,
    1 - (ie.embedding <=> p_query_embedding) AS similarity
  FROM public.image_embeddings ie
  ORDER BY ie.embedding <=> p_query_embedding
  LIMIT p_match_count;
$$;

GRANT EXECUTE ON FUNCTION public.match_image_embeddings(vector, int) TO anon, authenticated;

-- 4. search_rag_hybrid ------------------------------------------------------
CREATE OR REPLACE FUNCTION public.search_rag_hybrid(
    p_query_embedding vector(1536),
    p_query_text TEXT,
    p_match_count INT DEFAULT 10,
    p_similarity_threshold FLOAT8 DEFAULT 0.7
)
RETURNS TABLE (
    chunk_id UUID,
    document_id UUID,
    chunk_index INT,
    content TEXT,
    source_url TEXT,
    vector_similarity FLOAT8,
    text_rank FLOAT8,
    entities JSONB,
    final_score FLOAT8
) 
LANGUAGE plpgsql
SET search_path = public, extensions
AS $$
BEGIN
    RETURN QUERY
    WITH vector_search AS (
        SELECT
            c.id,
            c.document_id,
            c.chunk_index,
            c.text_content,
            1 - (c.embedding <=> p_query_embedding) AS similarity,
            c.entities
        FROM public.document_chunks_enhanced c
        WHERE 1 - (c.embedding <=> p_query_embedding) > p_similarity_threshold
        ORDER BY similarity DESC
        LIMIT p_match_count * 2
    ),
    text_search AS (
        SELECT
            c.id,
            ts_rank(to_tsvector('english', c.text_content),
                   plainto_tsquery('english', p_query_text))::FLOAT8 AS rank
        FROM public.document_chunks_enhanced c
        WHERE to_tsvector('english', c.text_content) @@
              plainto_tsquery('english', p_query_text)
        LIMIT p_match_count * 2
    )
    SELECT
        v.id AS chunk_id,
        v.document_id,
        v.chunk_index,
        v.text_content AS content,
        d.file_path AS source_url,
        v.similarity::FLOAT8 AS vector_similarity,
        COALESCE(t.rank, 0.0)::FLOAT8 AS text_rank,
        v.entities,
        (v.similarity::FLOAT8 * 0.7 + COALESCE(t.rank, 0.0)::FLOAT8 * 0.3) AS final_score
    FROM vector_search v
    LEFT JOIN text_search t ON v.id = t.id
    JOIN public.documents d ON d.id = v.document_id
    ORDER BY final_score DESC
    LIMIT p_match_count;
END;
$$;

-- ===================================================
-- SECTION 2: Comments
-- ===================================================

COMMENT ON FUNCTION public.get_related_edges(text[]) IS 'Returns relationships involving any of the provided entity names (search_path fixed).';
COMMENT ON FUNCTION public.is_admin() IS 'Checks if current auth.uid() has an admin role (search_path fixed).';
COMMENT ON FUNCTION public.match_image_embeddings(vector, int) IS 'Vector similarity search over image embeddings (search_path fixed).';
COMMENT ON FUNCTION public.search_rag_hybrid(vector, text, integer, double precision) IS 'Hybrid vector/text similarity search for RAG (search_path fixed).'; 