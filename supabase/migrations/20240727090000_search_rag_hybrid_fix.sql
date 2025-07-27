-- Fix search_rag_hybrid RPC contract drift: align returned columns with HybridRetriever expectations
-- Adds chunk_index and source_url fields
-- Note: uses documents.file_path as source_url; adjust if documents table changes

DROP FUNCTION IF EXISTS public.search_rag_hybrid(vector, text, integer, double precision);

CREATE OR REPLACE FUNCTION public.search_rag_hybrid(
    p_query_embedding vector(1536),
    p_query_text TEXT,
    p_match_count INT DEFAULT 10,
    p_similarity_threshold FLOAT DEFAULT 0.7
)
RETURNS TABLE (
    chunk_id UUID,
    document_id UUID,
    chunk_index INT,
    content TEXT,
    source_url TEXT,
    vector_similarity FLOAT,
    text_rank FLOAT,
    entities JSONB,
    final_score FLOAT
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
                   plainto_tsquery('english', p_query_text)) AS rank
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
        v.similarity as vector_similarity,
        COALESCE(t.rank, 0) AS text_rank,
        v.entities,
        (v.similarity * 0.7 + COALESCE(t.rank, 0) * 0.3) AS final_score
    FROM vector_search v
    LEFT JOIN text_search t ON v.id = t.id
    JOIN public.documents d ON d.id = v.document_id
    ORDER BY final_score DESC
    LIMIT p_match_count;
END;
$$ LANGUAGE plpgsql; 