/**
 * AI SDK Message Adapter
 *
 * This adapter handles the conversion between Vercel AI SDK message format
 * and our database schema format. The AI SDK expects certain fields in
 * camelCase format while our database uses snake_case.
 */

import { type Message as AIMessage } from "ai";
import { DBChatMessageRow } from "@/_infrastructure/repositories/chat-repository";

/**
 * Converts a database message row to the format expected by the Vercel AI SDK.
 * @param message The message row from the database.
 * @returns The message in AI SDK format.
 */
export function dbMessageToAIMessage(message: DBChatMessageRow): AIMessage {
  const parts =
    typeof message.metadata === "object" &&
    message.metadata !== null &&
    "parts" in message.metadata
      ? (message.metadata.parts as any)
      : [{ type: "text", content: message.content }];

  return {
    id: message.id,
    role: message.role as "user" | "assistant" | "system",
    content: message.content || "",
    createdAt: new Date(message.created_at),
    // Re-construct parts and attachments from metadata if they exist, for full compatibility
    ...(parts && {
      parts: parts.map((p: any) => ({
        type: p.type || "text",
        ...(p.content && { content: p.content }),
        ...(p.text && { text: p.text }),
      })),
    }),
    ...(message.metadata &&
      "experimental_attachments" in message.metadata && {
        experimental_attachments: (message.metadata as any)
          .experimental_attachments,
      }),
  };
}

/**
 * Convert AI SDK message to database format
 */
export function aiMessageToDbFormat(
  message: AIMessage,
  sessionId: string,
  userId: string
): Partial<DBChatMessageRow> {
  return {
    id: message.id,
    session_id: sessionId,
    user_id: userId,
    role: message.role,
    content: message.content,
    // Don't include created_at or updated_at - let the database handle them
    metadata: {} as any,
  };
}

/**
 * Strip any camelCase fields that might cause PostgREST issues
 */
export function sanitizeForPostgREST<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {};

  // List of fields that should never be sent to PostgREST
  const blacklistedFields = ["createdAt", "updatedAt", "userId", "sessionId"];

  for (const [key, value] of Object.entries(obj)) {
    // Skip blacklisted fields
    if (blacklistedFields.includes(key)) continue;

    // Only include snake_case fields
    if (!key.match(/[A-Z]/)) {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}
