-- Migration: 20250119000000_phase2_firestarter_integration.sql
-- Description: Phase 2 - Firestarter integration with web crawling and caching infrastructure
-- Created: January 19, 2025

BEGIN;

-- ===================================================
-- SECTION 1: Firestarter Web Indexes (Create First)
-- ===================================================

-- Create web_indexes table for managing crawled websites
CREATE TABLE IF NOT EXISTS public.web_indexes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    namespace VARCHAR(255) NOT NULL,
    title TEXT,
    description TEXT,
    pages_crawled INTEGER DEFAULT 0,
    total_pages INTEGER,
    last_crawl_duration INTEGER, -- in seconds
    metadata JSONB DEFAULT '{}',
    crawl_config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_crawled_at TIMESTAMPTZ,
    
    -- Constraints
    UNIQUE(user_id, namespace)
);

COMMENT ON TABLE public.web_indexes IS 'Stores web crawling indexes for Firestarter functionality';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_web_indexes_user_id ON public.web_indexes(user_id);
CREATE INDEX IF NOT EXISTS idx_web_indexes_url ON public.web_indexes(url);
CREATE INDEX IF NOT EXISTS idx_web_indexes_namespace ON public.web_indexes(namespace);
CREATE INDEX IF NOT EXISTS idx_web_indexes_is_active ON public.web_indexes(is_active);

-- Add updated_at trigger
CREATE TRIGGER update_web_indexes_updated_at
    BEFORE UPDATE ON public.web_indexes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ===================================================
-- SECTION 2: Enhanced Chat Sessions for Web Index Linking
-- ===================================================

-- Add web_index_id column to existing chat_sessions table to link chats with web indexes
ALTER TABLE public.chat_sessions 
ADD COLUMN IF NOT EXISTS web_index_id UUID;

-- Add index for the new column
CREATE INDEX IF NOT EXISTS idx_chat_sessions_web_index_id ON public.chat_sessions(web_index_id);

-- ===================================================
-- SECTION 3: Crawl Jobs Management
-- ===================================================

-- Create status enum for crawl jobs
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE t.typname = 'crawl_status' AND n.nspname = 'public') THEN
    CREATE TYPE public.crawl_status AS ENUM ('pending', 'processing', 'completed', 'failed');
  END IF;
END $$;

-- Create crawl_jobs table for tracking background crawling operations
CREATE TABLE IF NOT EXISTS public.crawl_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    web_index_id UUID NOT NULL REFERENCES public.web_indexes(id) ON DELETE CASCADE,
    status public.crawl_status DEFAULT 'pending' NOT NULL,
    firecrawl_job_id TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    error_message TEXT,
    pages_processed INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.crawl_jobs IS 'Tracks background crawling jobs using Firecrawl';

-- Create indexes for crawl jobs
CREATE INDEX IF NOT EXISTS idx_crawl_jobs_web_index_id ON public.crawl_jobs(web_index_id);
CREATE INDEX IF NOT EXISTS idx_crawl_jobs_status ON public.crawl_jobs(status);
CREATE INDEX IF NOT EXISTS idx_crawl_jobs_created_at ON public.crawl_jobs(created_at);

-- ===================================================
-- SECTION 4: Upstash Cache Metadata
-- ===================================================

-- Create upstash_cache_meta table for tracking cache performance and usage
CREATE TABLE IF NOT EXISTS public.upstash_cache_meta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cache_key TEXT NOT NULL UNIQUE,
    namespace VARCHAR(100) NOT NULL,
    size INTEGER,
    ttl INTEGER, -- time to live in seconds
    hit_count INTEGER DEFAULT 0,
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.upstash_cache_meta IS 'Metadata for Upstash cache entries to track performance and usage';

-- Create indexes for cache metadata
CREATE INDEX IF NOT EXISTS idx_upstash_cache_meta_cache_key ON public.upstash_cache_meta(cache_key);
CREATE INDEX IF NOT EXISTS idx_upstash_cache_meta_namespace ON public.upstash_cache_meta(namespace);
CREATE INDEX IF NOT EXISTS idx_upstash_cache_meta_last_accessed ON public.upstash_cache_meta(last_accessed);

-- ===================================================
-- SECTION 5: Enhanced Documents Table for Web Index Linking
-- ===================================================

-- Add web_index_id column to existing documents table
ALTER TABLE public.documents 
ADD COLUMN IF NOT EXISTS web_index_id UUID REFERENCES public.web_indexes(id) ON DELETE CASCADE;

-- Add index for the new foreign key
CREATE INDEX IF NOT EXISTS idx_documents_web_index_id ON public.documents(web_index_id);

-- ===================================================
-- SECTION 6: Row Level Security Policies
-- ===================================================

-- Web Indexes RLS
ALTER TABLE public.web_indexes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own web indexes" ON public.web_indexes;
CREATE POLICY "Users can manage their own web indexes"
    ON public.web_indexes FOR ALL
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view public web indexes" ON public.web_indexes;
CREATE POLICY "Users can view public web indexes"
    ON public.web_indexes FOR SELECT
    USING (is_public = true);

DROP POLICY IF EXISTS "Service role can manage all web indexes" ON public.web_indexes;
CREATE POLICY "Service role can manage all web indexes"
    ON public.web_indexes FOR ALL
    USING (auth.role() = 'service_role');

-- Crawl Jobs RLS
ALTER TABLE public.crawl_jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view crawl jobs for their web indexes" ON public.crawl_jobs;
CREATE POLICY "Users can view crawl jobs for their web indexes"
    ON public.crawl_jobs FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.web_indexes wi
        WHERE wi.id = crawl_jobs.web_index_id AND wi.user_id = auth.uid()
    ));

DROP POLICY IF EXISTS "Service role can manage all crawl jobs" ON public.crawl_jobs;
CREATE POLICY "Service role can manage all crawl jobs"
    ON public.crawl_jobs FOR ALL
    USING (auth.role() = 'service_role');

-- Upstash Cache Meta RLS
ALTER TABLE public.upstash_cache_meta ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage cache metadata" ON public.upstash_cache_meta;
CREATE POLICY "Service role can manage cache metadata"
    ON public.upstash_cache_meta FOR ALL
    USING (auth.role() = 'service_role');

-- ===================================================
-- SECTION 7: Helper Functions
-- ===================================================

-- Function to get web index statistics
CREATE OR REPLACE FUNCTION public.get_web_index_stats(p_web_index_id UUID)
RETURNS TABLE (
    total_documents INTEGER,
    total_embeddings INTEGER,
    last_crawl_date TIMESTAMPTZ,
    average_crawl_duration FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*)::INTEGER FROM public.documents WHERE web_index_id = p_web_index_id),
        (SELECT COUNT(*)::INTEGER FROM public.document_chunks dc 
         JOIN public.documents d ON dc.document_id = d.id 
         WHERE d.web_index_id = p_web_index_id),
        (SELECT last_crawled_at FROM public.web_indexes WHERE id = p_web_index_id),
        (SELECT AVG(last_crawl_duration)::FLOAT FROM public.web_indexes WHERE id = p_web_index_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to cleanup old cache entries
CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.upstash_cache_meta
    WHERE last_accessed < NOW() - INTERVAL '7 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ===================================================
-- SECTION 8: Add Foreign Key Constraints
-- ===================================================

-- Now add the foreign key constraint to chat_sessions after web_indexes table exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_chat_sessions_web_index_id' 
        AND table_name = 'chat_sessions'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.chat_sessions 
        ADD CONSTRAINT fk_chat_sessions_web_index_id 
        FOREIGN KEY (web_index_id) REFERENCES public.web_indexes(id) ON DELETE SET NULL;
    END IF;
END $$;

COMMIT; 