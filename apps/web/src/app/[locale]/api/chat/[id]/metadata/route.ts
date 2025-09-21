import { NextRequest } from "next/server";
import { logger } from "@/lib/logger";
import { ChatRepository } from "@/_infrastructure/repositories/chat-repository";
import {
  authenticateRequest,
  createAuthErrorResponse,
  AuthenticationError,
} from "../../../../../(ai-unified)/api/chat/auth-adapter";

/**
 * Lightweight metadata endpoint for chat information
 * Returns chat details without opening SSE stream - optimizes initial page load
 *
 * Context7 - Uses consolidated auth adapter for performance and consistency
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  const { id: chatId } = await params;

  try {
    // Context7 - Use consolidated auth adapter (same pattern as other API routes)
    const authResult = await authenticateRequest(request as any);
    const { user, isGuest } = authResult;

    // Fast metadata retrieval - no message loading
    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);

    if (!chat) {
      return new Response(JSON.stringify({ error: "Chat not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify user ownership
    if (chat.userId !== user.id) {
      return new Response(
        JSON.stringify({ error: "Access denied to this chat" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return lightweight metadata with performance tracking
    const metadata = {
      id: chat.id,
      title: chat.title,
      model: (chat as any).selectedChatModel || (chat as any).model || "GPT_4",
      visibility: chat.visibility,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      hasMessages: (chat as any).messageCount > 0,
      messageCount: (chat as any).messageCount || 0,
      // Performance info
      loadTime: Date.now() - startTime,
    };

    logger.info("Chat metadata retrieved successfully", {
      chatId,
      userId: user.id,
      loadTime: metadata.loadTime,
      isGuest,
    });

    return Response.json(metadata, {
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0",
        "X-Chat-Id": chatId,
        "X-Load-Time": metadata.loadTime.toString(),
      },
    });
  } catch (error: unknown) {
    // Handle authentication errors using established pattern
    if (error instanceof AuthenticationError) {
      logger.warn("Chat metadata: Authentication failed", {
        errorMessage: error.message,
        chatId,
        correlationId: error.correlationId,
      });
      return createAuthErrorResponse(error);
    }

    // Handle general errors with proper type checking
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;

    logger.error(
      "Chat metadata fetch error",
      new Error(`${errorMessage} - ChatId: ${chatId}`)
    );

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
