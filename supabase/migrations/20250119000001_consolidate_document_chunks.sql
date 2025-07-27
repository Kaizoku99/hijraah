-- Migration: 20250119000001_consolidate_document_chunks.sql
-- Description: Remove redundant document_chunks table and use only document_chunks_enhanced
-- Created: January 19, 2025

BEGIN;

-- ===================================================
-- SECTION 1: Data Migration (if needed)
-- ===================================================

-- Check if there's any data in the old document_chunks table that needs to be migrated
-- Note: This is a safety check - in most cases this table should be empty or have test data only

DO $$
DECLARE
    old_chunks_count INTEGER;
    enhanced_chunks_count INTEGER;
BEGIN
    -- Count records in both tables
    SELECT COUNT(*) INTO old_chunks_count FROM public.document_chunks;
    SELECT COUNT(*) INTO enhanced_chunks_count FROM public.document_chunks_enhanced;
    
    -- Log the counts
    RAISE NOTICE 'Found % records in document_chunks and % records in document_chunks_enhanced', 
        old_chunks_count, enhanced_chunks_count;
    
    -- If old table has data but enhanced doesn't, migrate it
    -- Note: This is a basic migration - embeddings will need to be regenerated due to dimension difference
    IF old_chunks_count > 0 AND enhanced_chunks_count = 0 THEN
        RAISE NOTICE 'Migrating data from document_chunks to document_chunks_enhanced';
        
        INSERT INTO public.document_chunks_enhanced (
            document_id,
            chunk_index,
            text_content,
            embedding, -- Note: This will be NULL due to dimension mismatch
            token_count,
            created_at
        )
        SELECT 
            document_id,
            chunk_index,
            text_content,
            NULL, -- Embedding needs to be regenerated with 1536 dimensions
            token_count,
            created_at
        FROM public.document_chunks
        ON CONFLICT (document_id, chunk_index) DO NOTHING;
        
        RAISE NOTICE 'Migrated % records. Note: Embeddings will need to be regenerated.', old_chunks_count;
    END IF;
END $$;

-- ===================================================
-- SECTION 2: Update Functions to Use Enhanced Table
-- ===================================================

-- Drop the old match_document_chunks function
DROP FUNCTION IF EXISTS public.match_document_chunks(vector, float, int, uuid);

-- Create new function that uses document_chunks_enhanced
CREATE OR REPLACE FUNCTION public.match_document_chunks(
  query_embedding vector(1536),
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
SET search_path = public, extensions
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dce.id,
    dce.document_id,
    dce.text_content,
    1 - (dce.embedding <=> query_embedding) AS similarity
  FROM public.document_chunks_enhanced dce
  JOIN public.documents d ON dce.document_id = d.id
  WHERE (1 - (dce.embedding <=> query_embedding)) > match_threshold
    AND dce.embedding IS NOT NULL
    AND (p_user_id IS NULL OR d.user_id = p_user_id)
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

COMMENT ON FUNCTION public.match_document_chunks IS 'Searches for document chunks semantically similar to a query embedding using document_chunks_enhanced table.';

-- ===================================================
-- SECTION 3: Drop Old Table and Constraints
-- ===================================================

-- Drop indexes and constraints related to the old table
DROP INDEX IF EXISTS public.idx_document_chunks_document_id;
DROP INDEX IF EXISTS public.idx_document_chunks_embedding;

-- Drop RLS policies for the old table
DROP POLICY IF EXISTS "Users can view chunks for their own documents" ON public.document_chunks;
DROP POLICY IF EXISTS "Service role can access all chunks" ON public.document_chunks;

-- Drop the old document_chunks table
DROP TABLE IF EXISTS public.document_chunks CASCADE;

-- ===================================================
-- SECTION 4: Rename Enhanced Table (Optional)
-- ===================================================

-- Option 1: Keep the enhanced name for clarity
-- This is recommended to make it clear this is the enhanced version

-- Option 2: Rename to document_chunks for backwards compatibility
-- Uncomment the following lines if you want to rename:

-- ALTER TABLE public.document_chunks_enhanced RENAME TO document_chunks;
-- 
-- -- Update the search_rag_hybrid function to use the renamed table
-- DROP FUNCTION IF EXISTS public.search_rag_hybrid(vector, text, integer, double precision);
-- 
-- CREATE FUNCTION public.search_rag_hybrid(
--     p_query_embedding vector(1536),
--     p_query_text TEXT,
--     p_match_count INT DEFAULT 10,
--     p_similarity_threshold FLOAT8 DEFAULT 0.7
-- )
-- RETURNS TABLE (
--     chunk_id UUID,
--     document_id UUID,
--     chunk_index INT,
--     content TEXT,
--     source_url TEXT,
--     vector_similarity FLOAT8,
--     text_rank FLOAT8,
--     entities JSONB,
--     final_score FLOAT8
-- ) 
-- LANGUAGE plpgsql
-- SET search_path = public, extensions
-- AS $$
-- BEGIN
--     RETURN QUERY
--     WITH vector_search AS (
--         SELECT
--             c.id,
--             c.document_id,
--             c.chunk_index,
--             c.text_content,
--             1 - (c.embedding <=> p_query_embedding) AS similarity,
--             c.entities
--         FROM public.document_chunks c  -- Now using renamed table
--         WHERE 1 - (c.embedding <=> p_query_embedding) > p_similarity_threshold
--         ORDER BY similarity DESC
--         LIMIT p_match_count * 2
--     ),
--     text_search AS (
--         SELECT
--             c.id,
--             ts_rank(to_tsvector('english', c.text_content),
--                    plainto_tsquery('english', p_query_text))::FLOAT8 AS rank
--         FROM public.document_chunks c  -- Now using renamed table
--         WHERE to_tsvector('english', c.text_content) @@
--               plainto_tsquery('english', p_query_text)
--         LIMIT p_match_count * 2
--     )
--     SELECT
--         v.id AS chunk_id,
--         v.document_id,
--         v.chunk_index,
--         v.text_content AS content,
--         d.file_path AS source_url,
--         v.similarity::FLOAT8 AS vector_similarity,
--         COALESCE(t.rank, 0.0)::FLOAT8 AS text_rank,
--         v.entities,
--         (v.similarity::FLOAT8 * 0.7 + COALESCE(t.rank, 0.0)::FLOAT8 * 0.3) AS final_score
--     FROM vector_search v
--     LEFT JOIN text_search t ON v.id = t.id
--     JOIN public.documents d ON d.id = v.document_id
--     ORDER BY final_score DESC
--     LIMIT p_match_count;
-- END;
-- $$;

-- ===================================================
-- SECTION 5: Comments and Documentation
-- ===================================================

COMMENT ON TABLE public.document_chunks_enhanced IS 'Enhanced document chunks table with 1536-dimensional embeddings and additional metadata for RAG operations. This is the single source of truth for document chunks.';

-- ===================================================
-- SECTION 6: Register Migration
-- ===================================================

-- Register this migration
SELECT migration_meta.register_migration(
    1, 19, 1,
    'Consolidate document chunks tables - remove redundant document_chunks table',
    '20250119000001_consolidate_document_chunks.sql'
);

COMMIT; 