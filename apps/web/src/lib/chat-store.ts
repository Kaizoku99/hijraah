/**
 * Chat Store Utilities for Resumable Streaming
 * 
 * This module provides utility functions for managing chat streams
 * and supporting resumable streaming functionality in the AI SDK.
 */

import { ChatRepository } from "@/_infrastructure/repositories/chat-repository";
import { logger } from "@/lib/logger";

/**
 * Save chat messages and manage active stream state
 */
export async function saveChat({
  chatId,
  messages,
  activeStreamId = null,
}: {
  chatId: string;
  messages: any[];
  activeStreamId?: string | null;
}) {
  try {
    const chatRepository = new ChatRepository();
    
    // Update the chat's metadata with active stream info
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      // Update chat metadata to include active stream state
      const chat = await chatRepository.getChatById(chatId);
      if (chat) {
        await chatRepository.update(chatId, {
          metadata: {
            ...(chat.metadata as any || {}),
            lastMessageAt: new Date().toISOString(),
            messageCount: messages.length,
            activeStreamId,
          }
        });
      }
      
      logger.info("Chat saved successfully", { 
        chatId, 
        messageCount: messages.length,
        activeStreamId 
      });
    }
  } catch (error) {
    logger.error("Failed to save chat", error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}

/**
 * Context7 - Load the active stream ID for a given chat
 */
export async function loadActiveStreamId(chatId: string): Promise<string | null> {
  try {
    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);
    
    if (!chat) {
      return null;
    }
    
    // Get active stream ID from chat metadata
    const activeStreamId = (chat.metadata as any)?.activeStreamId || null;
    return activeStreamId;
  } catch (error) {
    logger.error("Failed to load active stream ID", error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

/**
 * Load stream IDs for a given chat (for backward compatibility)
 */
export async function loadStreams(chatId: string): Promise<string[]> {
  try {
    const activeStreamId = await loadActiveStreamId(chatId);
    return activeStreamId ? [activeStreamId] : [];
  } catch (error) {
    logger.error("Failed to load streams", error instanceof Error ? error : new Error(String(error)));
    return [];
  }
}

/**
 * Context7 - Set active stream ID for a chat
 */
export async function setActiveStream({
  chatId,
  streamId,
}: {
  chatId: string;
  streamId: string | null;
}) {
  try {
    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);
    
    if (!chat) {
      throw new Error("Chat not found");
    }
    
    // Update chat metadata with active stream ID
    await chatRepository.update(chatId, {
      metadata: {
        ...(chat.metadata as any || {}),
        activeStreamId: streamId,
        updatedAt: new Date().toISOString(),
      }
    });
    
    logger.info("Active stream updated", { chatId, streamId });
  } catch (error) {
    logger.error("Failed to set active stream", error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}

/**
 * Append a new stream ID to a chat (legacy - now just sets active stream)
 */
export async function appendStreamId({
  chatId,
  streamId,
}: {
  chatId: string;
  streamId: string;
}) {
  return setActiveStream({ chatId, streamId });
}

/**
 * Context7 - Clear active stream for a chat
 */
export async function clearActiveStream(chatId: string) {
  return setActiveStream({ chatId, streamId: null });
}

/**
 * Clean up old stream IDs for a chat
 */
export async function cleanupStreamIds(chatId: string, keepLatest = 5) {
  try {
    // For resumable streams, we only keep one active stream at a time
    // Redis handles expiration automatically through the resumable-stream package
    logger.info("Stream cleanup not needed for resumable streams", { chatId });
  } catch (error) {
    logger.error("Failed to cleanup stream IDs", error instanceof Error ? error : new Error(String(error)));
  }
}
