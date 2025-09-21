/**
 * Consolidated Chat Service
 *
 * Based on Vercel AI SDK patterns:
 * - Direct database queries (no service layer abstraction)
 * - Simple query functions
 * - Proper TypeScript typing
 * - onFinish callbacks for persistence
 *
 * Replaces:
 * - chat-service.ts
 * - chat-legacy-service.ts
 * - lib/contexts/chat-context.tsx ChatService
 * - lib/ai/chat-service.ts
 * - _core/chat/services/chat-service.ts
 */

import { createClient } from "@supabase/supabase-js";
import { streamText, generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// eslint-disable-next-line import/no-relative-parent-imports
import type { Database } from "@/types/database.types";

// Types based on actual database schema
// NOTE: Use chat_sessions as the canonical chat table
export type ChatSessionRow =
  Database["public"]["Tables"]["chat_sessions"]["Row"];
export type ChatSessionInsert =
  Database["public"]["Tables"]["chat_sessions"]["Insert"];
export type ChatMessageRow =
  Database["public"]["Tables"]["chat_messages"]["Row"];
export type ChatMessageInsert =
  Database["public"]["Tables"]["chat_messages"]["Insert"];
export type ChatAttachmentRow =
  Database["public"]["Tables"]["chat_attachments"]["Row"];
export type ChatAttachmentInsert =
  Database["public"]["Tables"]["chat_attachments"]["Insert"];

// Initialize typed Supabase client (service role for server-side operations)
// Note: API routes execute on the server and should use the service role for
// server-to-database access while still enforcing userId filters in queries.
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

// ============================================================================
// DIRECT DATABASE QUERIES (Vercel AI Chatbot Pattern)
// ============================================================================

/**
 * Save chat with messages - Used in onFinish callback
 */
export async function saveChat({
  id,
  title,
  userId,
  messages,
}: {
  id: string;
  title: string;
  userId: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
    attachments?: Array<{ name: string; url: string; contentType: string }>;
  }>;
}) {
  try {
    // Ensure chat session exists (upsert by id)
    const chatUpsert: ChatSessionInsert = {
      id,
      user_id: userId,
      title,
      visibility: "private",
      last_message_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as ChatSessionInsert;

    const { error: chatError } = await supabase
      .from("chat_sessions")
      .upsert(chatUpsert, { onConflict: "id" });
    if (chatError) throw chatError;

    // Insert messages sequentially to capture generated message IDs
    for (const msg of messages) {
      const { data: insertedMessage, error: insertMsgError } = await supabase
        .from("chat_messages")
        .insert({
          session_id: id,
          role: msg.role,
          content: msg.content,
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } satisfies ChatMessageInsert)
        .select("id")
        .single();
      if (insertMsgError) throw insertMsgError;

      // Insert attachments if any
      if (msg.attachments?.length && insertedMessage?.id) {
        const attachmentInserts: ChatAttachmentInsert[] = msg.attachments.map(
          (att) => ({
            message_id: insertedMessage.id,
            chat_id: id,
            user_id: userId,
            file_name: att.name,
            file_path: att.url,
            file_type: att.contentType,
            file_size: 0,
            created_at: new Date().toISOString(),
          })
        );
        const { error: attachmentsError } = await supabase
          .from("chat_attachments")
          .insert(attachmentInserts);
        if (attachmentsError) throw attachmentsError;
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to save chat:", error);
    return { success: false, error };
  }
}

/**
 * Get chat by ID with messages and attachments
 * Note: The Chat table and chat_messages/chat_sessions have different relationships
 */
export async function getChatById(id: string) {
  const { data: chat, error: chatError } = await supabase
    .from("chat_sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (chatError) throw chatError;

  const { data: messages, error: messagesError } = await supabase
    .from("chat_messages")
    .select(
      `
      *,
      chat_attachments:chat_attachments!chat_attachments_message_id_fkey(*)
    `
    )
    .eq("session_id", id)
    .order("created_at", { ascending: true });
  if (messagesError) throw messagesError;

  return {
    ...chat,
    messages: messages || [],
  };
}

/**
 * Get user's chat history
 * Returns data in format compatible with sidebar ChatSession type
 * Context7 - Enhanced error handling for body cloning issues
 */
export async function getUserChats(userId: string) {
  try {
    // Fetch all required fields to match ChatSession type from Drizzle schema
    const { data, error } = await supabase
      .from("chat_sessions")
      .select(
        `
        id, 
        title, 
        created_at, 
        updated_at, 
        visibility, 
        user_id,
        context,
        prompt,
        model,
        system_prompt,
        agent_config,
        case_id,
        last_message_at,
        metadata
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase query error in getUserChats:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw new Error(`Failed to fetch user chats: ${error.message}`);
    }

    // Map to match Drizzle schema ChatSession type (camelCase conversion)
    return (data || []).map((row) => ({
      id: row.id,
      userId: row.user_id,
      title: row.title ?? "Untitled",
      context: row.context,
      prompt: row.prompt,
      model: row.model,
      systemPrompt: row.system_prompt,
      agentConfig: row.agent_config,
      caseId: row.case_id,
      lastMessageAt: row.last_message_at,
      metadata: row.metadata,
      visibility: row.visibility,
      createdAt: row.created_at ?? new Date().toISOString(),
      updatedAt: row.updated_at ?? new Date().toISOString(),
    }));
  } catch (error: any) {
    // Context7 - Enhanced error handling with specific error types
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error("Failed to get chat history:", {
      message: errorMessage,
      details: error instanceof Error ? error.stack : undefined,
      hint: "Check Supabase connection and Web Streams compatibility",
      code: error?.code || "UNKNOWN_ERROR",
    });

    // Throw a more descriptive error
    throw new Error(`Failed to load user chat history: ${errorMessage}`);
  }
}

/**
 * Delete chat and all related data
 */
export async function deleteChat(id: string) {
  // Perform safe deletes in order in case FKs are not ON DELETE CASCADE
  const { error: attErr } = await supabase
    .from("chat_attachments")
    .delete()
    .eq("chat_id", id);
  if (attErr) throw attErr;

  const { error: msgErr } = await supabase
    .from("chat_messages")
    .delete()
    .eq("session_id", id);
  if (msgErr) throw msgErr;

  const { error: chatErr } = await supabase
    .from("chat_sessions")
    .delete()
    .eq("id", id);
  if (chatErr) throw chatErr;
  return { success: true };
}

// ============================================================================
// AI CHAT FUNCTIONALITY (Vercel AI SDK Pattern)
// ============================================================================

/**
 * Stream chat response with automatic persistence
 * This follows the Vercel AI SDK pattern exactly
 */
export async function streamChatResponse({
  chatId,
  messages,
  userId,
  title,
}: {
  chatId: string;
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  userId: string;
  title?: string;
}) {
  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: "You are a helpful immigration assistant for Canada.",
    // Vercel pattern: Use onFinish to save complete conversation
    onFinish: async ({ text, response }) => {
      try {
        // Create assistant message from the text response
        const assistantMessage = {
          role: "assistant" as const,
          content: text,
        };

        await saveChat({
          id: chatId,
          title: title || messages[0]?.content.slice(0, 50) || "New Chat",
          userId,
          messages: [...messages, assistantMessage],
        });
      } catch (error) {
        console.error("Failed to save chat:", error);
      }
    },
  });

  return result.toTextStreamResponse();
}

/**
 * Generate chat response (non-streaming)
 */
export async function generateChatResponse({
  chatId,
  messages,
  userId,
  title,
}: {
  chatId: string;
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  userId: string;
  title?: string;
}) {
  const result = await generateText({
    model: openai("gpt-4o"),
    messages,
    system: "You are a helpful immigration assistant for Canada.",
  });

  // Save the complete conversation
  await saveChat({
    id: chatId,
    title: title || messages[0]?.content.slice(0, 50) || "New Chat",
    userId,
    messages: [...messages, { role: "assistant", content: result.text }],
  });

  return {
    text: result.text,
    usage: result.usage,
    finishReason: result.finishReason,
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert database messages to AI SDK format
 */
export function convertToAIMessages(dbMessages: ChatMessageRow[]) {
  return dbMessages
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .map((msg) => ({
      role: msg.role as "user" | "assistant" | "system",
      content: msg.content,
    }));
}

/**
 * Search user's chats
 */
export async function searchUserChats(userId: string, query: string) {
  // Use canonical chat_sessions and simple ilike for portability
  const { data, error } = await supabase
    .from("chat_sessions")
    .select("id, title, created_at, visibility, user_id")
    .eq("user_id", userId)
    .ilike("title", `%${query}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map((row) => ({
    id: row.id,
    title: row.title ?? "Untitled",
    createdAt: row.created_at ?? new Date().toISOString(),
    visibility: row.visibility,
    userId: row.user_id,
  }));
}

/**
 * Update chat title
 */
export async function updateChatTitle(chatId: string, title: string) {
  const { error } = await supabase
    .from("chat_sessions")
    .update({ title, updated_at: new Date().toISOString() })
    .eq("id", chatId);

  if (error) throw error;
  return { success: true };
}

// ============================================================================
// EXPORT DEFAULT (for compatibility)
// ============================================================================

const chatService = {
  saveChat,
  getChatById,
  getUserChats,
  deleteChat,
  streamChatResponse,
  generateChatResponse,
  convertToAIMessages,
  searchUserChats,
  updateChatTitle,
};

export default chatService;
