-- Fix type mismatch: ensure all float values are double precision to match return type
-- Drop and recreate function with proper casts
DROP FUNCTION IF EXISTS public.search_rag_hybrid(vector, text, integer, double precision);

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
) AS $$
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
        v.id as chunk_id,
        v.document_id,
        v.chunk_index,
        v.text_content as content,
        d.file_path as source_url,
        v.similarity::FLOAT8 as vector_similarity,
        COALESCE(t.rank, 0.0)::FLOAT8 AS text_rank,
        v.entities,
        (v.similarity::FLOAT8 * 0.7 + COALESCE(t.rank, 0.0)::FLOAT8 * 0.3) AS final_score
    FROM vector_search v
    LEFT JOIN text_search t ON v.id = t.id
    JOIN public.documents d ON d.id = v.document_id
    ORDER BY final_score DESC
    LIMIT p_match_count;
END;
$$ LANGUAGE plpgsql; 