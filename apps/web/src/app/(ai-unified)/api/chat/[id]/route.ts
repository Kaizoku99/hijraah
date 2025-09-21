/* eslint-disable import/no-relative-parent-imports */
import { z } from "zod";

import { ChatModelType } from "@/core/chat/entities/chat";
import {
  authenticateRequest as authenticateRequestAdapter,
  createAuthErrorResponse,
  AuthenticationError,
  type AuthResult,
} from "@/app/(ai-unified)/api/chat/auth-adapter";
import { ChatRepository } from "@/infrastructure/repositories/chat-repository";
import { logger } from "@/lib/logger";

// Validation schema (kept in sync with main chat route)
const chatVisibilityEnumValues = ["private", "public", "team"] as const;
const updateChatSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  modelType: z.nativeEnum(ChatModelType).optional(),
  caseId: z.string().uuid().optional().nullable(),
  visibility: z.enum(chatVisibilityEnumValues).optional(),
});

// Helpers
function getChatIdFromUrl(url: string): string | null {
  try {
    const { pathname } = new URL(url);
    const parts = pathname.split("/");
    // /api/chat/[id]
    if (parts.length >= 4 && parts[1] === "api" && parts[2] === "chat") {
      return parts[3] || null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
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

    const chatId = getChatIdFromUrl(request.url);
    if (!chatId) return new Response("Chat ID required", { status: 400 });

    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);
    if (!chat || chat.userId !== authResult.user.id) {
      return new Response("Chat not found", { status: 404 });
    }
    return Response.json({ chat: chat.toObject() });
  } catch (error) {
    logger.error(
      "[chat/[id]] GET error",
      error instanceof Error ? error : new Error(String(error)),
    );
    return new Response("Internal server error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
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

    const chatId = getChatIdFromUrl(request.url);
    if (!chatId) return new Response("Chat ID required", { status: 400 });

    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);
    if (!chat || chat.userId !== authResult.user.id) {
      return new Response("Chat not found", { status: 404 });
    }

    const body = await request.json();
    const validated = updateChatSchema.parse(body);

    const updated = await chatRepository.update(chatId, {
      title: validated.title,
      model: validated.modelType,
      visibility: validated.visibility,
      case_id: validated.caseId,
      metadata: {
        ...chat.metadata,
        ...(validated.description !== undefined && {
          description: validated.description,
        }),
        updatedAt: new Date().toISOString(),
      },
    } as any);

    // eslint-disable-next-line import/no-relative-parent-imports
    const { Chat } = await import("@/core/chat/entities/chat");
    return Response.json({ chat: Chat.fromDatabase(updated).toObject() });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: error.issues }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    logger.error(
      "[chat/[id]] PATCH error",
      error instanceof Error ? error : new Error(String(error)),
    );
    return new Response("Internal server error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
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

    const chatId = getChatIdFromUrl(request.url);
    if (!chatId) return new Response("Chat ID required", { status: 400 });

    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);
    if (!chat || chat.userId !== authResult.user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    await chatRepository.deleteChat(chatId);
    return Response.json({ success: true });
  } catch (error) {
    logger.error(
      "[chat/[id]] DELETE error",
      error instanceof Error ? error : new Error(String(error)),
    );
    return new Response("Internal server error", { status: 500 });
  }
}
