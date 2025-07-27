-- Migration: 20250718090000_enable_rls_kg_rag_cache.sql
-- Description: Enable Row Level Security (RLS) on knowledge-graph and RAG-related tables flagged by the database linter and add least-privilege policies.
-- Created: 2025-07-18

-- ===================================================
-- SECTION 0: Setup
-- ===================================================

-- Ensure search_path resolves vector and other extension types without qualification
SET search_path = public, extensions, migration_meta;

-- ===================================================
-- SECTION 1: Knowledge Graph Tables
-- ===================================================

-- kg_entities --------------------------------------------------------------
ALTER TABLE public.kg_entities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view active kg_entities" ON public.kg_entities;
CREATE POLICY "Authenticated users can view active kg_entities"
  ON public.kg_entities FOR SELECT
  TO authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Service role can manage kg_entities" ON public.kg_entities;
CREATE POLICY "Service role can manage kg_entities"
  ON public.kg_entities FOR ALL
  USING (auth.role() = 'service_role' OR auth.is_admin());

-- kg_relationships ---------------------------------------------------------
ALTER TABLE public.kg_relationships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view kg_relationships" ON public.kg_relationships;
CREATE POLICY "Authenticated users can view kg_relationships"
  ON public.kg_relationships FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Service role can manage kg_relationships" ON public.kg_relationships;
CREATE POLICY "Service role can manage kg_relationships"
  ON public.kg_relationships FOR ALL
  USING (auth.role() = 'service_role' OR auth.is_admin());

-- ===================================================
-- SECTION 2: Enhanced Document Chunks
-- ===================================================

ALTER TABLE public.document_chunks_enhanced ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view chunks for their own documents" ON public.document_chunks_enhanced;
CREATE POLICY "Users can view chunks for their own documents"
  ON public.document_chunks_enhanced FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.documents d
      WHERE d.id = document_chunks_enhanced.document_id AND d.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Service role can access all chunks_enhanced" ON public.document_chunks_enhanced;
CREATE POLICY "Service role can access all chunks_enhanced"
  ON public.document_chunks_enhanced FOR ALL
  USING (auth.role() = 'service_role');

-- ===================================================
-- SECTION 3: RAG Cache Tables
-- ===================================================

-- rag_query_cache ----------------------------------------------------------
ALTER TABLE public.rag_query_cache ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage rag_query_cache" ON public.rag_query_cache;
CREATE POLICY "Service role can manage rag_query_cache"
  ON public.rag_query_cache FOR ALL
  USING (auth.role() = 'service_role');

-- rag_cache_meta -----------------------------------------------------------
ALTER TABLE public.rag_cache_meta ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage rag_cache_meta" ON public.rag_cache_meta;
CREATE POLICY "Service role can manage rag_cache_meta"
  ON public.rag_cache_meta FOR ALL
  USING (auth.role() = 'service_role');

-- ===================================================
-- SECTION 4: User Query History
-- ===================================================

ALTER TABLE public.user_query_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own query history" ON public.user_query_history;
CREATE POLICY "Users can view their own query history"
  ON public.user_query_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own query history" ON public.user_query_history;
CREATE POLICY "Users can insert their own query history"
  ON public.user_query_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all query history" ON public.user_query_history;
CREATE POLICY "Service role can manage all query history"
  ON public.user_query_history FOR ALL
  USING (auth.role() = 'service_role');

-- ===================================================
-- SECTION 5: Image Embeddings and Policy Timeline
-- ===================================================

-- image_embeddings ---------------------------------------------------------
ALTER TABLE public.image_embeddings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view image embeddings" ON public.image_embeddings;
CREATE POLICY "Authenticated users can view image embeddings"
  ON public.image_embeddings FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Service role can manage image_embeddings" ON public.image_embeddings;
CREATE POLICY "Service role can manage image_embeddings"
  ON public.image_embeddings FOR ALL
  USING (auth.role() = 'service_role');

-- policy_timeline ----------------------------------------------------------
ALTER TABLE public.policy_timeline ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view policy timeline" ON public.policy_timeline;
CREATE POLICY "Authenticated users can view policy timeline"
  ON public.policy_timeline FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Service role can manage policy timeline" ON public.policy_timeline;
CREATE POLICY "Service role can manage policy timeline"
  ON public.policy_timeline FOR ALL
  USING (auth.role() = 'service_role' OR auth.is_admin());

-- ===================================================
-- SECTION 6: Comments & Documentation
-- ===================================================

COMMENT ON POLICY "Authenticated users can view active kg_entities" ON public.kg_entities IS 'Allows any logged-in user to read active knowledge-graph entities.';
COMMENT ON POLICY "Users can view chunks for their own documents" ON public.document_chunks_enhanced IS 'Restricts chunk access to owner of the parent document.';
COMMENT ON POLICY "Service role can manage rag_query_cache" ON public.rag_query_cache IS 'Internal cache table ‑ unrestricted for service role.';

-- Commit block ends automatically because Supabase migration runner wraps each file in a transaction by default. Ensure idempotency throughout (IF EXISTS / IF NOT EXISTS). 