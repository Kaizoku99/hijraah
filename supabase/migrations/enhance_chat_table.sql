/**
 * Enhanced Chat Schema Migration
 * 
 * This migration enhances the existing AI SDK v5 Chat table to preserve all valuable
 * data from the legacy chat_sessions table while maintaining AI SDK v5 compatibility.
 * 
 * The migration adds the following fields to the Chat table:
 * - updatedAt: Track last modification time
 * - lastMessageAt: Track conversation activity (for sorting/filtering)
 * - model: Default model for the chat
 * - systemPrompt: Chat-specific system instructions
 * - caseId: Link to immigration case (business logic)
 * - metadata: Extensible JSON field for chat configuration
 * 
 * This follows AI SDK v5 patterns where:
 * - Chat table stores conversation metadata
 * - Message table stores the actual conversation content
 * - Additional fields support business requirements without breaking AI SDK compatibility
 */

-- Add enhanced fields to the existing Chat table
ALTER TABLE "Chat" 
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS "lastMessageAt" TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS "model" TEXT,
ADD COLUMN IF NOT EXISTS "systemPrompt" TEXT,
ADD COLUMN IF NOT EXISTS "caseId" UUID,
ADD COLUMN IF NOT EXISTS "metadata" JSONB DEFAULT '{}';

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS "Chat_userId_lastMessageAt_idx" ON "Chat"("userId", "lastMessageAt" DESC);
CREATE INDEX IF NOT EXISTS "Chat_caseId_idx" ON "Chat"("caseId") WHERE "caseId" IS NOT NULL;
CREATE INDEX IF NOT EXISTS "Chat_visibility_idx" ON "Chat"("visibility");
CREATE INDEX IF NOT EXISTS "Chat_model_idx" ON "Chat"("model") WHERE "model" IS NOT NULL;

-- Add foreign key constraint for caseId if cases table exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cases') THEN
        ALTER TABLE "Chat" 
        ADD CONSTRAINT "Chat_caseId_fkey" 
        FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE SET NULL;
    END IF;
END $$;

-- Create trigger to automatically update updatedAt
CREATE OR REPLACE FUNCTION update_chat_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER chat_update_updated_at
    BEFORE UPDATE ON "Chat"
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_updated_at();

-- Create trigger to update lastMessageAt when messages are added
CREATE OR REPLACE FUNCTION update_chat_last_message_at()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "Chat" 
    SET "lastMessageAt" = NEW."createdAt"
    WHERE "id" = NEW."chatId";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER message_update_chat_last_message_at
    AFTER INSERT ON "Message"
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_last_message_at();

COMMENT ON TABLE "Chat" IS 'Enhanced AI SDK v5 compatible chat table with business logic fields';
COMMENT ON COLUMN "Chat"."metadata" IS 'Extensible JSON field for chat configuration, agent settings, and business data';
COMMENT ON COLUMN "Chat"."systemPrompt" IS 'Chat-specific system instructions that override global defaults';
COMMENT ON COLUMN "Chat"."model" IS 'Default AI model for this chat (e.g., gpt-4, claude-3, etc.)';
COMMENT ON COLUMN "Chat"."caseId" IS 'Optional link to immigration case for business context';
COMMENT ON COLUMN "Chat"."lastMessageAt" IS 'Timestamp of the last message for sorting and activity tracking';
