/**
 * AI Store Configuration - @ai-sdk-tools/store Integration
 * 
 * This file provides utilities and configuration for @ai-sdk-tools/store,
 * enabling optimal performance and simplified state management across the application.
 * 
 * Migration Guide:
 * ===============
 * 
 * Before (using @ai-sdk/react):
 * ```tsx
 * import { useChat } from '@ai-sdk/react';
 * 
 * function ChatComponent() {
 *   const { messages, input, handleInputChange, handleSubmit } = useChat();
 *   return ...
 * }
 * ```
 * 
 * After (using @ai-sdk-tools/store):
 * ```tsx
 * import { useChat } from '@ai-sdk-tools/store';
 * 
 * function ChatComponent() {
 *   const { messages, input, handleInputChange, handleSubmit } = useChat();
 *   return ... // Same API, now with global state!
 * }
 * ```
 * 
 * Key Benefits:
 * - Global state access from any component
 * - No prop drilling required
 * - Optimized re-renders with selective subscriptions
 * - Same API as @ai-sdk/react (drop-in replacement)
 */

import type { UIMessage } from '@ai-sdk-tools/store';

// Re-export the main hooks for easy access - these should be imported directly from '@ai-sdk-tools/store' in components
export {
  useChat,
  useChatMessages,
  useChatStatus,
  useChatSendMessage,
  useChatError,
} from '@ai-sdk-tools/store';

// Store utility functions
export const storeUtils = {
  /**
   * Get store statistics from messages
   */
  getStoreStats: (messages: UIMessage[]) => {
    return {
      totalMessages: messages.length,
      userMessages: messages.filter(m => m.role === 'user').length,
      assistantMessages: messages.filter(m => m.role === 'assistant').length,
      systemMessages: messages.filter(m => m.role === 'system').length,
    };
  },
  
  /**
   * Get the last message from the store
   */
  getLastMessage: (messages: UIMessage[]): UIMessage | undefined => {
    return messages.length > 0 ? messages[messages.length - 1] : undefined;
  },
  
  /**
   * Filter messages by role
   */
  filterMessagesByRole: (messages: UIMessage[], role: string): UIMessage[] => {
    return messages.filter(m => m.role === role);
  },
  
  /**
   * Get conversation context (last N messages)
   */
  getConversationContext: (messages: UIMessage[], limit: number = 5): UIMessage[] => {
    return messages.slice(-limit);
  },
  
  /**
   * Find message by ID
   */
  findMessageById: (messages: UIMessage[], messageId: string): UIMessage | undefined => {
    return messages.find(message => message.id === messageId);
  },
};

// Common store configurations for different use cases
export const storeConfigs = {
  // Configuration for immigration-related chats
  immigration: {
    storeId: 'immigration-chat',
    api: '/api/ai/chat',
    body: {
      filters: {
        category: 'immigration',
      },
    },
  },
  
  // Configuration for general purpose chats
  general: {
    storeId: 'general-chat', 
    api: '/api/chat',
  },
  
  // Configuration for document analysis chats
  document: {
    storeId: 'document-chat',
    api: '/api/ai/chat',
    body: {
      filters: {
        category: 'document',
      },
    },
  },
};

// Export types for convenience
export type { UIMessage };