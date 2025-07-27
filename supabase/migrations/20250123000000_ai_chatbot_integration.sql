-- Migration: 20250123000000_ai_chatbot_integration.sql
-- Description: Phase 1.2 - AI-chatbot schema integration for Context7 migration
-- Created: January 23, 2025
-- Adds AI-chatbot schema elements while maintaining compatibility with existing Hijraah schema

BEGIN;

-- ===================================================
-- SECTION 1: User Table for AI-Chatbot Compatibility
-- ===================================================

-- Create User table for ai-chatbot compatibility (maps to auth.users + profiles)
-- This provides a simplified interface that ai-chatbot code expects
CREATE TABLE IF NOT EXISTS public."User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) -- For guest users, regular users use Supabase auth
);

COMMENT ON TABLE public."User" IS 'AI-chatbot compatibility table - maps to auth.users and profiles';

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_user_email ON public."User"(email);

-- ===================================================
-- SECTION 2: Chat Table for AI-Chatbot Compatibility  
-- ===================================================

-- Create Chat table for ai-chatbot compatibility (extends existing chat_sessions)
CREATE TABLE IF NOT EXISTS public."Chat" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    "userId" UUID NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
    visibility VARCHAR(10) CHECK (visibility IN ('public', 'private')) NOT NULL DEFAULT 'private'
);

COMMENT ON TABLE public."Chat" IS 'AI-chatbot Chat table - compatible with existing chat_sessions';

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_chat_user_id ON public."Chat"("userId");
CREATE INDEX IF NOT EXISTS idx_chat_visibility ON public."Chat"(visibility);
CREATE INDEX IF NOT EXISTS idx_chat_created_at ON public."Chat"("createdAt");

-- ===================================================
-- SECTION 3: Message Tables (v1 and v2)
-- ===================================================

-- Legacy Message table (marked as deprecated in ai-chatbot)
CREATE TABLE IF NOT EXISTS public."Message" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "chatId" UUID NOT NULL REFERENCES public."Chat"(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    content JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public."Message" IS 'DEPRECATED: Legacy message table from ai-chatbot';

-- Create indexes for legacy message table
CREATE INDEX IF NOT EXISTS idx_message_chat_id ON public."Message"("chatId");
CREATE INDEX IF NOT EXISTS idx_message_role ON public."Message"(role);
CREATE INDEX IF NOT EXISTS idx_message_created_at ON public."Message"("createdAt");

-- Modern Message_v2 table (current ai-chatbot format)
CREATE TABLE IF NOT EXISTS public."Message_v2" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "chatId" UUID NOT NULL REFERENCES public."Chat"(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    parts JSONB NOT NULL DEFAULT '[]',
    attachments JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public."Message_v2" IS 'Modern message table with parts and attachments support';

-- Create indexes for Message_v2
CREATE INDEX IF NOT EXISTS idx_message_v2_chat_id ON public."Message_v2"("chatId");
CREATE INDEX IF NOT EXISTS idx_message_v2_role ON public."Message_v2"(role);
CREATE INDEX IF NOT EXISTS idx_message_v2_created_at ON public."Message_v2"("createdAt");

-- ===================================================
-- SECTION 4: Vote Tables (v1 and v2)
-- ===================================================

-- Legacy Vote table (deprecated)
CREATE TABLE IF NOT EXISTS public."Vote" (
    "chatId" UUID NOT NULL REFERENCES public."Chat"(id) ON DELETE CASCADE,
    "messageId" UUID NOT NULL REFERENCES public."Message"(id) ON DELETE CASCADE,
    "isUpvoted" BOOLEAN NOT NULL,
    PRIMARY KEY ("chatId", "messageId")
);

COMMENT ON TABLE public."Vote" IS 'DEPRECATED: Legacy vote table from ai-chatbot';

-- Create indexes for legacy vote table
CREATE INDEX IF NOT EXISTS idx_vote_chat_id ON public."Vote"("chatId");
CREATE INDEX IF NOT EXISTS idx_vote_message_id ON public."Vote"("messageId");

-- Modern Vote_v2 table
CREATE TABLE IF NOT EXISTS public."Vote_v2" (
    "chatId" UUID NOT NULL REFERENCES public."Chat"(id) ON DELETE CASCADE,
    "messageId" UUID NOT NULL REFERENCES public."Message_v2"(id) ON DELETE CASCADE,
    "isUpvoted" BOOLEAN NOT NULL,
    PRIMARY KEY ("chatId", "messageId")
);

COMMENT ON TABLE public."Vote_v2" IS 'Modern vote table for Message_v2';

-- Create indexes for Vote_v2
CREATE INDEX IF NOT EXISTS idx_vote_v2_chat_id ON public."Vote_v2"("chatId");
CREATE INDEX IF NOT EXISTS idx_vote_v2_message_id ON public."Vote_v2"("messageId");

-- ===================================================
-- SECTION 5: Document Table for Artifacts
-- ===================================================

-- Document table for ai-chatbot artifacts with compound primary key
CREATE TABLE IF NOT EXISTS public."Document" (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    content TEXT,
    kind VARCHAR(10) CHECK (kind IN ('text', 'code', 'image', 'sheet')) NOT NULL DEFAULT 'text',
    "userId" UUID NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
    PRIMARY KEY (id, "createdAt")
);

COMMENT ON TABLE public."Document" IS 'Document storage for ai-chatbot artifacts with compound primary key';

-- Create indexes for Document table
CREATE INDEX IF NOT EXISTS idx_document_user_id ON public."Document"("userId");
CREATE INDEX IF NOT EXISTS idx_document_kind ON public."Document"(kind);
CREATE INDEX IF NOT EXISTS idx_document_created_at ON public."Document"("createdAt");

-- ===================================================
-- SECTION 6: Suggestion Table for Document Collaboration
-- ===================================================

-- Suggestion table for document collaboration
CREATE TABLE IF NOT EXISTS public."Suggestion" (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    "documentId" UUID NOT NULL,
    "documentCreatedAt" TIMESTAMPTZ NOT NULL,
    "originalText" TEXT NOT NULL,
    "suggestedText" TEXT NOT NULL,
    description TEXT,
    "isResolved" BOOLEAN NOT NULL DEFAULT FALSE,
    "userId" UUID NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY ("documentId", "documentCreatedAt") REFERENCES public."Document"(id, "createdAt") ON DELETE CASCADE
);

COMMENT ON TABLE public."Suggestion" IS 'Document suggestions for collaborative editing';

-- Create indexes for Suggestion table
CREATE INDEX IF NOT EXISTS idx_suggestion_document ON public."Suggestion"("documentId", "documentCreatedAt");
CREATE INDEX IF NOT EXISTS idx_suggestion_user_id ON public."Suggestion"("userId");
CREATE INDEX IF NOT EXISTS idx_suggestion_is_resolved ON public."Suggestion"("isResolved");
CREATE INDEX IF NOT EXISTS idx_suggestion_created_at ON public."Suggestion"("createdAt");

-- ===================================================
-- SECTION 7: Stream Table for Resumable Streams
-- ===================================================

-- Stream table for resumable streaming
CREATE TABLE IF NOT EXISTS public."Stream" (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    "chatId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY ("chatId") REFERENCES public."Chat"(id) ON DELETE CASCADE
);

COMMENT ON TABLE public."Stream" IS 'Stream management for resumable AI responses';

-- Create indexes for Stream table
CREATE INDEX IF NOT EXISTS idx_stream_chat_id ON public."Stream"("chatId");
CREATE INDEX IF NOT EXISTS idx_stream_created_at ON public."Stream"("createdAt");

-- ===================================================
-- SECTION 8: Guest User Support Functions
-- ===================================================

-- Function to create guest users
CREATE OR REPLACE FUNCTION public.create_guest_user()
RETURNS TABLE(id UUID, email TEXT) AS $$
DECLARE
    guest_id UUID;
    guest_email TEXT;
BEGIN
    -- Generate unique guest email
    guest_email := 'guest_' || encode(gen_random_bytes(8), 'hex') || '@guest.local';
    
    -- Insert into User table
    INSERT INTO public."User" (email, password)
    VALUES (guest_email, NULL)
    RETURNING public."User".id INTO guest_id;
    
    RETURN QUERY SELECT guest_id, guest_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

COMMENT ON FUNCTION public.create_guest_user() IS 'Creates a guest user for ai-chatbot guest mode';

-- Function to get user by email (ai-chatbot compatibility)
CREATE OR REPLACE FUNCTION public.get_user(user_email TEXT)
RETURNS TABLE(
    id UUID,
    email TEXT,
    password TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.email, u.password
    FROM public."User" u
    WHERE u.email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

COMMENT ON FUNCTION public.get_user(TEXT) IS 'Gets user by email for ai-chatbot authentication';

-- ===================================================
-- SECTION 9: Data Synchronization Views
-- ===================================================

-- View to sync existing chat_sessions to ai-chatbot Chat format
CREATE OR REPLACE VIEW public.unified_chats AS
SELECT
    cs.id,
    cs.created_at as "createdAt",
    COALESCE(cs.title, 'Untitled Chat') as title,
    cs.user_id as "userId",
    CASE 
        WHEN cs.visibility = 'public' THEN 'public'
        ELSE 'private'
    END as visibility
FROM public.chat_sessions cs
UNION ALL
SELECT
    c.id,
    c."createdAt",
    c.title,
    c."userId",
    c.visibility
FROM public."Chat" c;

COMMENT ON VIEW public.unified_chats IS 'Unified view of existing and ai-chatbot chats';

-- View to sync existing chat_messages to ai-chatbot format
CREATE OR REPLACE VIEW public.unified_messages AS
SELECT
    cm.id,
    cm.session_id as "chatId",
    cm.role,
    CASE 
        WHEN cm.content IS NOT NULL THEN 
            json_build_array(json_build_object('type', 'text', 'text', cm.content))::jsonb
        ELSE '[]'::jsonb
    END as parts,
    COALESCE(cm.metadata, '[]'::jsonb) as attachments,
    cm.created_at as "createdAt"
FROM public.chat_messages cm
WHERE cm.session_id IN (SELECT id FROM public.chat_sessions)
UNION ALL
SELECT
    m.id,
    m."chatId",
    m.role,
    m.parts,
    m.attachments,
    m."createdAt"
FROM public."Message_v2" m;

COMMENT ON VIEW public.unified_messages IS 'Unified view of existing and ai-chatbot messages';

-- ===================================================
-- SECTION 10: Row Level Security
-- ===================================================

-- Enable RLS for all ai-chatbot tables
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Chat" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Message" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Message_v2" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Vote" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Vote_v2" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Document" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Suggestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Stream" ENABLE ROW LEVEL SECURITY;

-- User table policies
DROP POLICY IF EXISTS "Service role can manage users" ON public."User";
CREATE POLICY "Service role can manage users"
    ON public."User" FOR ALL
    USING (auth.role() = 'service_role');

-- Chat table policies
DROP POLICY IF EXISTS "Users can manage their own chats" ON public."Chat";
CREATE POLICY "Users can manage their own chats"
    ON public."Chat" FOR ALL
    USING (
        auth.role() = 'service_role' OR
        "userId" IN (
            SELECT u.id FROM public."User" u 
            JOIN auth.users au ON u.email = au.email 
            WHERE au.id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can view public chats" ON public."Chat";
CREATE POLICY "Users can view public chats"
    ON public."Chat" FOR SELECT
    USING (visibility = 'public');

-- Message table policies (both versions)
DROP POLICY IF EXISTS "Users can manage messages in their chats" ON public."Message";
CREATE POLICY "Users can manage messages in their chats"
    ON public."Message" FOR ALL
    USING (
        auth.role() = 'service_role' OR
        "chatId" IN (
            SELECT c.id FROM public."Chat" c
            JOIN public."User" u ON c."userId" = u.id
            JOIN auth.users au ON u.email = au.email
            WHERE au.id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can manage messages v2 in their chats" ON public."Message_v2";
CREATE POLICY "Users can manage messages v2 in their chats"
    ON public."Message_v2" FOR ALL
    USING (
        auth.role() = 'service_role' OR
        "chatId" IN (
            SELECT c.id FROM public."Chat" c
            JOIN public."User" u ON c."userId" = u.id
            JOIN auth.users au ON u.email = au.email
            WHERE au.id = auth.uid()
        )
    );

-- Vote table policies
DROP POLICY IF EXISTS "Users can manage votes in their chats" ON public."Vote";
CREATE POLICY "Users can manage votes in their chats"
    ON public."Vote" FOR ALL
    USING (
        auth.role() = 'service_role' OR
        "chatId" IN (
            SELECT c.id FROM public."Chat" c
            JOIN public."User" u ON c."userId" = u.id
            JOIN auth.users au ON u.email = au.email
            WHERE au.id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can manage votes v2 in their chats" ON public."Vote_v2";
CREATE POLICY "Users can manage votes v2 in their chats"
    ON public."Vote_v2" FOR ALL
    USING (
        auth.role() = 'service_role' OR
        "chatId" IN (
            SELECT c.id FROM public."Chat" c
            JOIN public."User" u ON c."userId" = u.id
            JOIN auth.users au ON u.email = au.email
            WHERE au.id = auth.uid()
        )
    );

-- Document table policies
DROP POLICY IF EXISTS "Users can manage their own documents" ON public."Document";
CREATE POLICY "Users can manage their own documents"
    ON public."Document" FOR ALL
    USING (
        auth.role() = 'service_role' OR
        "userId" IN (
            SELECT u.id FROM public."User" u 
            JOIN auth.users au ON u.email = au.email 
            WHERE au.id = auth.uid()
        )
    );

-- Suggestion table policies
DROP POLICY IF EXISTS "Users can manage suggestions for their documents" ON public."Suggestion";
CREATE POLICY "Users can manage suggestions for their documents"
    ON public."Suggestion" FOR ALL
    USING (
        auth.role() = 'service_role' OR
        ("userId" IN (
            SELECT u.id FROM public."User" u 
            JOIN auth.users au ON u.email = au.email 
            WHERE au.id = auth.uid()
        ) OR
        "documentId" IN (
            SELECT d.id FROM public."Document" d
            JOIN public."User" u ON d."userId" = u.id
            JOIN auth.users au ON u.email = au.email
            WHERE au.id = auth.uid()
        ))
    );

-- Stream table policies
DROP POLICY IF EXISTS "Users can manage streams in their chats" ON public."Stream";
CREATE POLICY "Users can manage streams in their chats"
    ON public."Stream" FOR ALL
    USING (
        auth.role() = 'service_role' OR
        "chatId" IN (
            SELECT c.id FROM public."Chat" c
            JOIN public."User" u ON c."userId" = u.id
            JOIN auth.users au ON u.email = au.email
            WHERE au.id = auth.uid()
        )
    );

-- ===================================================
-- SECTION 11: Migration Registration
-- ===================================================

-- Register this migration
SELECT migration_meta.register_migration(
    1, 2, 0,
    'AI-chatbot schema integration for Context7 migration',
    '20250123000000_ai_chatbot_integration.sql'
);

-- Register rollback script
SELECT migration_meta.register_rollback_script(
    1, 2, 0,
    '
    -- Rollback AI-chatbot integration
    DROP VIEW IF EXISTS public.unified_messages CASCADE;
    DROP VIEW IF EXISTS public.unified_chats CASCADE;
    DROP FUNCTION IF EXISTS public.get_user(TEXT) CASCADE;
    DROP FUNCTION IF EXISTS public.create_guest_user() CASCADE;
    DROP TABLE IF EXISTS public."Stream" CASCADE;
    DROP TABLE IF EXISTS public."Suggestion" CASCADE;
    DROP TABLE IF EXISTS public."Document" CASCADE;
    DROP TABLE IF EXISTS public."Vote_v2" CASCADE;
    DROP TABLE IF EXISTS public."Vote" CASCADE;
    DROP TABLE IF EXISTS public."Message_v2" CASCADE;
    DROP TABLE IF EXISTS public."Message" CASCADE;
    DROP TABLE IF EXISTS public."Chat" CASCADE;
    DROP TABLE IF EXISTS public."User" CASCADE;
    '
);

COMMIT; 