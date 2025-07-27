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
import { z } from "zod";
import type { Database } from "@/types/database.types";

// Types based on actual database schema
export type ChatRow = Database["public"]["Tables"]["Chat"]["Row"];
export type ChatInsert = Database["public"]["Tables"]["Chat"]["Insert"];
export type ChatMessageRow =
  Database["public"]["Tables"]["chat_messages"]["Row"];
export type ChatMessageInsert =
  Database["public"]["Tables"]["chat_messages"]["Insert"];
export type ChatAttachmentRow =
  Database["public"]["Tables"]["chat_attachments"]["Row"];
export type ChatAttachmentInsert =
  Database["public"]["Tables"]["chat_attachments"]["Insert"];

// Initialize typed Supabase client (Vercel pattern)
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
    // Insert or update chat
    const { error: chatError } = await supabase.from("Chat").upsert({
      id,
      title,
      userId,
      createdAt: new Date().toISOString(),
    });

    if (chatError) throw chatError;

    // Insert messages
    const messageInserts: ChatMessageInsert[] = messages.map((msg, index) => ({
      id: `${id}-msg-${index}`,
      session_id: id,
      role: msg.role,
      content: msg.content,
      user_id: userId,
      created_at: new Date().toISOString(),
    }));

    const { error: messagesError } = await supabase
      .from("chat_messages")
      .upsert(messageInserts);

    if (messagesError) throw messagesError;

    // Insert attachments if any
    for (const [msgIndex, msg] of messages.entries()) {
      if (msg.attachments?.length) {
        const attachmentInserts: ChatAttachmentInsert[] = msg.attachments.map(
          (att, attIndex) => ({
            id: `${id}-msg-${msgIndex}-att-${attIndex}`,
            message_id: `${id}-msg-${msgIndex}`,
            chat_id: id,
            user_id: userId,
            file_name: att.name,
            file_path: att.url,
            file_type: att.contentType,
            file_size: 0, // Default size, should be provided in actual implementation
            created_at: new Date().toISOString(),
          }),
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
    .from("Chat")
    .select("*")
    .eq("id", id)
    .single();

  if (chatError) throw chatError;

  // Get associated messages from chat_sessions
  const { data: messages, error: messagesError } = await supabase
    .from("chat_messages")
    .select(
      `
      *,
      chat_attachments (*)
    `,
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
 */
export async function getUserChats(userId: string) {
  const { data, error } = await supabase
    .from("Chat")
    .select("id, title, createdAt")
    .eq("userId", userId)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Delete chat and all related data
 */
export async function deleteChat(id: string) {
  // Cascade delete will handle messages and attachments
  const { error } = await supabase.from("Chat").delete().eq("id", id);

  if (error) throw error;
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

  return result.toDataStreamResponse();
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
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
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
  const { data, error } = await supabase
    .from("Chat")
    .select("id, title, createdAt")
    .eq("userId", userId)
    .textSearch("title", query)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Update chat title
 */
export async function updateChatTitle(chatId: string, title: string) {
  const { error } = await supabase
    .from("Chat")
    .update({ title })
    .eq("id", chatId);

  if (error) throw error;
  return { success: true };
}

// ============================================================================
// EXPORT DEFAULT (for compatibility)
// ============================================================================

export default {
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
