-- ===================================================
-- SECTION 0: Setup
-- ===================================================

-- Ensure `extensions` schema is in the search_path so the `vector` data type
-- is resolved unambiguously without needing to fully-qualify it in every
-- statement. This mirrors the pattern in the consolidated baseline migration.
SET search_path = public, extensions, migration_meta;

-- ===================================================
-- SECTION 1: Knowledge Graph Tables
-- ===================================================

-- Knowledge Graph Entities
CREATE TABLE IF NOT EXISTS public.kg_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL, -- 'country', 'visa_type', 'requirement', 'document', 'program'
    entity_name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    properties JSONB DEFAULT '{}',
    embedding vector(1536), -- For semantic similarity of entities
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    source_references JSONB DEFAULT '[]', -- Array of source document IDs
    confidence_score FLOAT DEFAULT 1.0,
    is_active BOOLEAN DEFAULT true
);

-- Knowledge Graph Relationships
CREATE TABLE IF NOT EXISTS public.kg_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_entity_id UUID NOT NULL REFERENCES public.kg_entities(id) ON DELETE CASCADE,
    target_entity_id UUID NOT NULL REFERENCES public.kg_entities(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) NOT NULL, -- 'requires', 'leads_to', 'excludes', 'related_to'
    properties JSONB DEFAULT '{}',
    strength FLOAT DEFAULT 1.0, -- Relationship strength/confidence
    temporal_validity JSONB DEFAULT '{}', -- Valid from/to dates
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    source_references JSONB DEFAULT '[]'
);

-- ===================================================
-- SECTION 2: Enhanced Document Chunks Table
-- ===================================================

-- Enhanced Document Chunks with Entity Links
-- Note: This is an enhanced version of the existing `document_chunks` table.
-- During implementation, you might choose to alter the existing table
-- or migrate data to this new one.
CREATE TABLE IF NOT EXISTS public.document_chunks_enhanced (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    text_content TEXT NOT NULL,
    embedding vector(1536),
    token_count INTEGER,
    entities JSONB DEFAULT '[]', -- Extracted entities with positions
    key_phrases JSONB DEFAULT '[]',
    language VARCHAR(10) DEFAULT 'en',
    chunk_metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(document_id, chunk_index)
);

-- ===================================================
-- SECTION 3: Caching and History Tables
-- ===================================================

-- RAG Query Cache
CREATE TABLE IF NOT EXISTS public.rag_query_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_hash VARCHAR(64) NOT NULL, -- SHA-256 of normalized query
    query_text TEXT NOT NULL,
    query_embedding vector(1536),
    retrieved_chunks JSONB NOT NULL, -- Array of chunk IDs with scores
    kg_entities JSONB NOT NULL, -- Related knowledge graph entities
    response_metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    hit_count INTEGER DEFAULT 0
);

-- RAG Cache Meta (track last purge timestamp)
CREATE TABLE IF NOT EXISTS public.rag_cache_meta (
    id TEXT PRIMARY KEY,
    last_purged_at TIMESTAMPTZ
);

-- User Query History with Feedback
CREATE TABLE IF NOT EXISTS public.user_query_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    query_text TEXT NOT NULL,
    query_embedding vector(1536),
    response TEXT,
    sources_used JSONB DEFAULT '[]',
    feedback_score INTEGER, -- 1-5 rating
    feedback_text TEXT,
    query_metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================
-- SECTION 4: Policy and Timeline Tables
-- ===================================================

-- Immigration Policy Timeline
CREATE TABLE IF NOT EXISTS public.policy_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID REFERENCES public.kg_entities(id),
    policy_type VARCHAR(100) NOT NULL,
    country_code VARCHAR(3),
    effective_date DATE NOT NULL,
    expiry_date DATE,
    description TEXT,
    changes JSONB DEFAULT '{}',
    source_url TEXT,
    scraped_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================
-- SECTION 5: Indexes and Functions
-- ===================================================

-- Vector similarity search indexes
CREATE INDEX IF NOT EXISTS idx_kg_entities_embedding ON public.kg_entities
    USING ivfflat (embedding extensions.vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS idx_chunks_enhanced_embedding ON public.document_chunks_enhanced
    USING ivfflat (embedding extensions.vector_cosine_ops) WITH (lists = 200);

-- Entity and relationship type indexes
CREATE INDEX IF NOT EXISTS idx_kg_entities_type ON public.kg_entities(entity_type);
CREATE INDEX IF NOT EXISTS idx_kg_relationships_type ON public.kg_relationships(relationship_type);
CREATE INDEX IF NOT EXISTS idx_rag_query_cache_hash ON public.rag_query_cache(query_hash);

-- Temporal indexes
CREATE INDEX IF NOT EXISTS idx_policy_timeline_dates ON public.policy_timeline(effective_date, expiry_date);

-- Full-text search index for entities
CREATE INDEX IF NOT EXISTS idx_entities_search ON public.kg_entities
    USING gin(to_tsvector('english', entity_name || ' ' || display_name));

-- Function for hybrid search (vector + full-text)
CREATE OR REPLACE FUNCTION search_rag_hybrid(
    p_query_embedding vector(1536),
    p_query_text TEXT,
    p_match_count INT DEFAULT 10,
    p_similarity_threshold FLOAT DEFAULT 0.7
)
RETURNS TABLE (
    chunk_id UUID,
    document_id UUID,
    content TEXT,
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
        v.text_content as content,
        v.similarity as vector_similarity,
        COALESCE(t.rank, 0) AS text_rank,
        v.entities,
        (v.similarity * 0.7 + COALESCE(t.rank, 0) * 0.3) AS final_score
    FROM vector_search v
    LEFT JOIN text_search t ON v.id = t.id
    ORDER BY final_score DESC
    LIMIT p_match_count;
END;
$$ LANGUAGE plpgsql;

-- ===================================================
-- SECTION 6: Multi-modal Image Embeddings
-- ===================================================

-- Table to store CLIP embeddings of images referenced in documents
CREATE TABLE IF NOT EXISTS public.image_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    embedding vector(768), -- CLIP ViT-L/14 returns 768 dims
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vector index for fast ANN search on image embeddings
CREATE INDEX IF NOT EXISTS idx_image_embeddings_vector ON public.image_embeddings
    USING ivfflat (embedding extensions.vector_cosine_ops) WITH (lists = 100); 