/* eslint-disable import/no-relative-parent-imports */
import { v4 as uuidv4 } from "uuid";

import {
  authenticateRequest as authenticateRequestAdapter,
  createAuthErrorResponse,
  AuthenticationError,
  type AuthResult,
} from "@/app/(ai-unified)/api/chat/auth-adapter";
import { ChatRepository } from "@/infrastructure/repositories/chat-repository";
import { logger } from "@/lib/logger";

function getChatId(url: string): string | null {
  try {
    const { pathname } = new URL(url);
    const parts = pathname.split("/");
    // /api/chat/[id]/generate-title
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

    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);
    if (!chat || chat.userId !== authResult.user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    const messages = await chatRepository.getMessages(chatId);
    const firstUserMessage = messages.find((m: any) => m.role === "user");
    const title = (firstUserMessage?.content || chat.title || "New Chat").slice(0, 100);

    await chatRepository.update(chatId, { title } as any);
    return Response.json({ success: true, title });
  } catch (error) {
    logger.error(
      "[chat/[id]/generate-title] POST error",
      error instanceof Error ? error : new Error(String(error)),
    );
    return new Response("Internal server error", { status: 500 });
  }
}
