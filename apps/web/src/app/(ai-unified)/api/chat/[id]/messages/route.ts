/* eslint-disable */
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { ChatRepository } from "@/infrastructure/repositories/chat-repository";
import { logger } from "@/lib/logger";
import {
  authenticateRequest as authenticateRequestAdapter,
  createAuthErrorResponse,
  AuthenticationError,
  type AuthResult,
} from "@/app/(ai-unified)/api/chat/auth-adapter";

const postSchema = z.object({
  message: z.string().min(1),
  attachments: z
    .array(
      z.object({
        url: z.string().url().optional(),
        name: z.string().min(1),
        contentType: z.string().optional(),
        size: z.number().optional(),
      }),
    )
    .optional(),
});

function getChatId(url: string): string | null {
  try {
    const { pathname } = new URL(url);
    const parts = pathname.split("/");
    // /api/chat/[id]/messages
    if (parts.length >= 6 && parts[1] === "api" && parts[2] === "chat") {
      return parts[3] || null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    let authResult: AuthResult;
    try {
      authResult = await authenticateRequestAdapter(request as any);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return createAuthErrorResponse(error);
      }
      throw error;
    }

    const chatId = getChatId(request.url);
    if (!chatId) return new Response("Chat ID required", { status: 400 });

    const body = await request.json();
    const { message, attachments } = postSchema.parse(body);

    const repo = new ChatRepository();
    const chat = await repo.getChatById(chatId);
    if (!chat || chat.userId !== authResult.user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    // Save user message
    const userMessageId = uuidv4();
    await repo.addMessage(chatId, {
      id: userMessageId,
      role: "user",
      content: message,
      user_id: authResult.user.id,
      metadata: {
        timestamp: new Date().toISOString(),
      } as any,
    } as any);

    // Save attachments if provided
    if (attachments && attachments.length > 0) {
      try {
        const client = await (repo as any).getClient?.();
        if (client) {
          await client.from("chat_attachments").insert(
            attachments.map((a) => ({
              chat_id: chatId,
              message_id: userMessageId,
              user_id: authResult.user.id,
              file_name: a.name,
              file_type: a.contentType || "application/octet-stream",
              file_size: a.size || 0,
              file_path: a.url || "",
              created_at: new Date().toISOString(),
            })),
          );
        }
      } catch (e) {
        logger.warn("Failed to save attachments", e as any);
      }
    }

    // Assistant response generation is handled by the unified streaming API (/api/chat)
    // Here we return IDs so the client can refresh the chat state.
    return Response.json({ userMessageId, assistantMessageId: null });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: error.issues }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    logger.error(
      "[chat/[id]/messages] POST error",
      error instanceof Error ? error : new Error(String(error)),
    );
    return new Response("Internal server error", { status: 500 });
  }
}
