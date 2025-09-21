/**
 * AI SDK v5 - Chat Stream Resume Route
 * 
 * Dedicated endpoint for resumi    // Context7 - Check for active stream (following the guide pattern)
    const activeStreamId = await loadActiveStreamId(chatId);
    
    if (activeStreamId == null) {
      // No content response when there is no active stream (as per guide)
      logger.info("No active stream found for chat", { chatId, userId });
      return new Response(null, { status: 204 });
    }

    const streamId = activeStreamId;s following AI SDK v5 patterns
 * and Context7 architecture principles with Upstash Redis and Supabase integration.
 */

import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";
import { loadActiveStreamId } from "@/lib/chat-store";
import { UI_MESSAGE_STREAM_HEADERS } from "ai";
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from "resumable-stream";
import { after } from "next/server";
import { ChatRepository } from "@/_infrastructure/repositories/chat-repository";

// Import our authentication adapter
import {
  authenticateRequest as authenticateRequestAdapter,
  createAuthErrorResponse,
  AuthenticationError,
  type AuthResult,
} from "../../auth-adapter";

// Global stream context
let globalStreamContext: ResumableStreamContext | null = null;

function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({ 
        waitUntil: after,
      });
    } catch (error: any) {
      if (!error.message.includes("REDIS_URL") && !error.message.includes("UPSTASH_REDIS")) {
        logger.error("Failed to initialize resumable stream context", error);
      }
    }
  }
  return globalStreamContext;
}

/**
 * Context7 - GET handler for resuming chat streams
 * 
 * This endpoint checks for active streams for a given chat ID and resumes them
 * using the resumable-stream package with Upstash Redis as the storage backend.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Context7 - Authentication check
    let authResult: AuthResult;
    try {
      authResult = await authenticateRequestAdapter(request as any);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return createAuthErrorResponse(error);
      }
      throw error;
    }
    
    const { user, isGuest } = authResult;
    const userId = user.id;
    
    const { id: chatId } = await params;
    
    // Context7 - Validate chat ownership
    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);
    
    if (!chat) {
      logger.info("Chat not found for stream resume", { chatId, userId });
      return new Response("Chat not found", { status: 404 });
    }
    
    if (chat.userId !== userId) {
      logger.warn("Unauthorized access to chat", { chatId, userId, chatOwner: chat.userId });
      return new Response("Forbidden", { status: 403 });
    }

    // Context7 - Check for active stream (following the guide pattern)
    const activeStreamId = await loadActiveStreamId(chatId);
    
    if (activeStreamId == null) {
      // No content response when there is no active stream (as per guide)
      logger.info("No active stream found for chat", { chatId, userId });
      return new Response(null, { status: 204 });
    }

    // Context7 - Get stream context and attempt resume
    const streamContext = getStreamContext();
    if (!streamContext) {
      logger.error("Resumable stream context not available");
      return new Response("Resumable streaming not available", { status: 503 });
    }

    try {
      // Context7 - Resume existing stream using AI SDK v5 patterns (as per guide)
      const resumedStream = await streamContext.resumeExistingStream(activeStreamId);
      
      if (!resumedStream) {
        logger.info("No resumable stream data found", { chatId, streamId: activeStreamId });
        return new Response(null, { status: 204 });
      }

      logger.info("Successfully resumed chat stream", { 
        chatId, 
        streamId: activeStreamId, 
        userId,
        isGuest 
      });

      // Context7 - Return resumed stream with UI_MESSAGE_STREAM_HEADERS (as per guide)
      return new Response(resumedStream, {
        headers: {
          ...UI_MESSAGE_STREAM_HEADERS,
          "X-Chat-Id": chatId,
          "X-Stream-Id": activeStreamId,
        },
      });
    } catch (error) {
      // Context7 - Enhanced error handling
      const safeError = error instanceof Error ? error : new Error(String(error));
      logger.error("Failed to resume stream", safeError, {
        chatId,
        streamId: activeStreamId,
        userId,
      });
      
      return new Response("Failed to resume stream", { status: 500 });
    }
  } catch (error) {
    // Context7 - Top-level error handling
    const safeError = error instanceof Error ? error : new Error(String(error));
    logger.error("Stream resume route error", safeError);
    
    return new Response("Internal server error", { status: 500 });
  }
}

/**
 * Context7 - OPTIONS handler for CORS support
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
