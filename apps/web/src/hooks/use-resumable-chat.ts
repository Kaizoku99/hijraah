/**
 * Context7 - Resumable Chat Hook
 * 
 * A custom React hook that extends the AI SDK v5's useChat with resumable streaming
 * capabilities following Context7 principles and modern AI SDK patterns.
 */

'use client';

import { useChat } from '@ai-sdk-tools/store';
import { DefaultChatTransport } from 'ai';
import { useEffect, useCallback, useRef, useState } from 'react';
import { logger } from '@/lib/logger';
import { loadActiveStreamId } from '@/lib/chat-store';
import {
  type UseResumableChatOptions,
  type UseResumableChatResult,
  type StreamMetadata,
  type StreamError,
  StreamStatus, // Regular import, not type-only
} from '@/types/resumable-stream';
import { useAIDevtoolsEnhanced } from '@/components/ai/ai-devtools-wrapper';

/**
 * Context7 - Enhanced useChat hook with resumable streaming support
 * 
 * This hook provides automatic stream resumption capabilities using the AI SDK v5
 * patterns and Context7 architecture principles.
 */
export function useResumableChat({
  id,
  initialMessages = [],
  api = '/api/chat',
  autoResume = false,
  resumeTimeout = 30000,
  maxRetries = 3,
  onError,
  onFinish,
  onProgress,
  onStreamEvent,
  headers = {},
}: UseResumableChatOptions): UseResumableChatResult {
  const resumeAttempted = useRef(false);
  const [streamMetadata, setStreamMetadata] = useState<StreamMetadata | undefined>();
  const [input, setInput] = useState('');
  
  // === AI DevTools Integration ===
  const devtools = useAIDevtoolsEnhanced();
  
  // Note: intentionally not using some options yet (resumeTimeout, maxRetries, onProgress, onStreamEvent)
  
  // Context7 - Use AI SDK v5 useChat with enhanced configuration
  const {
    messages,
    sendMessage,
    status,
    error: chatError,
    stop,
    regenerate,
    setMessages,
  } = useChat({
    id,
    messages: initialMessages,
    // AI SDK v5 - Enable resumable streaming
    resume: autoResume,
    // Use transport for configuration (following the guide)
    transport: new DefaultChatTransport({
      api,
      headers,
      // Context7 - Prepare send messages request with chat ID
      prepareSendMessagesRequest: ({ id, messages }) => {
        return {
          body: {
            id,
            // Align with AI SDK guide: send only the last message
            message: messages[messages.length - 1],
            selectedChatModel: 'GPT_4O', // Default model, make configurable if needed
          },
        };
      },
      // Context7 - Customize reconnect settings (following the guide)
      prepareReconnectToStreamRequest: ({ id }) => {
        return {
          api: `/api/chat/${id}/stream`,
          credentials: 'include',
          headers,
        };
      },
    }),
    onError: (error) => {
      logger.error('Chat error occurred', error);
      const streamError: StreamError = {
        code: 'CHAT_ERROR',
        message: error.message,
        timestamp: new Date(),
        retryable: true,
        retryCount: 0,
      };
      onError?.(streamError);
    },
    onFinish: ({ message, messages }) => {
      logger.info('Chat message finished', { messageId: message.id });
      onFinish?.(message, messages);
      
      // Clear stream metadata when finished
      setStreamMetadata(undefined);
    },
  });

  // Sync internal input state with chat input
  // No need to sync as we manage input independently

  // Convert chat error to stream error
  const error = chatError ? {
    code: 'CHAT_ERROR',
    message: chatError.message,
    timestamp: new Date(),
    retryable: true,
    retryCount: 0,
  } : undefined;

  // Handle form submission using sendMessage from AI SDK v5
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Context7 - Update stream metadata when starting new message
      setStreamMetadata({
        streamId: `stream-${Date.now()}`,
        chatId: id,
        status: StreamStatus.STREAMING,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Use sendMessage from AI SDK v5
      sendMessage({ text: input });
      setInput('');
    }
  }, [input, sendMessage, id]);

  // Clear messages - use setMessages from AI SDK v5
  const clear = useCallback(() => {
    setMessages([]);
    setStreamMetadata(undefined);
  }, [setMessages]);

  // Reload messages - use regenerate from AI SDK v5
  const reload = useCallback(() => {
    regenerate();
  }, [regenerate]);

  /**
   * Context7 - Resume active streams for the current chat
   * 
   * This function attempts to resume any interrupted streams using the
   * AI SDK v5 resumable streaming patterns.
   */
  const resume = useCallback(async () => {
    if (!id || resumeAttempted.current) {
      return;
    }

    resumeAttempted.current = true;
    
    try {
      logger.info('Attempting to resume chat stream', { chatId: id });
      
      // Context7 - Update stream metadata during resume
      setStreamMetadata(prev => prev ? {
        ...prev,
        status: StreamStatus.RESUMING,
        updatedAt: new Date(),
      } : {
        streamId: `resume-${Date.now()}`,
        chatId: id,
        status: StreamStatus.RESUMING,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Context7 - Use the loadActiveStream API to check for active streams
      try {
        const activeStreamId = await loadActiveStreamId(id);
        if (activeStreamId) {
          // Use the dedicated stream resume endpoint
          const response = await fetch(`/api/chat/${id}/stream`, {
            method: 'GET',
            headers: {
              Accept: 'text/event-stream',
              'Cache-Control': 'no-cache',
              ...headers,
            },
            credentials: 'include',
          });

          if (response.status === 204) {
            // No active streams to resume - this is normal
            logger.info('No active streams found for chat', { chatId: id });
            setStreamMetadata(prev => prev ? {
              ...prev,
              status: StreamStatus.IDLE,
              updatedAt: new Date(),
            } : undefined);
            return;
          }

          if (!response.ok) {
            throw new Error(`Failed to resume stream: ${response.status} ${response.statusText}`);
          }

          logger.info('Successfully resumed chat stream', { chatId: id });

          // Context7 - Update stream metadata on successful resume
          setStreamMetadata(prev => prev ? {
            ...prev,
            status: StreamStatus.STREAMING,
            updatedAt: new Date(),
          } : undefined);
        }
      } catch (error) {
        const safeError = error instanceof Error ? error : new Error(String(error));
        logger.error('Failed to resume chat stream', safeError, { chatId: id });

        const streamError: StreamError = {
          code: 'RESUME_ERROR',
          message: safeError.message,
          timestamp: new Date(),
          retryable: true,
          retryCount: 0,
        };

        // Context7 - Update stream metadata on error
        setStreamMetadata(prev => prev ? {
          ...prev,
          status: StreamStatus.ERROR,
          error: streamError,
          updatedAt: new Date(),
        } : undefined);

        onError?.(streamError);
      }
    } finally {
      // Reset the flag after a delay to allow for retries
      setTimeout(() => {
        resumeAttempted.current = false;
      }, 5000);
    }
  }, [id, headers, onError]);

  // Context7 - Auto-resume on mount if enabled and not already auto-resuming
  useEffect(() => {
    if (autoResume && id && !resumeAttempted.current) {
      // Delay the resume attempt to ensure component is fully mounted
      const timeoutId = setTimeout(() => {
        resume();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [autoResume, id, resume]);

  // Context7 - Monitor status for stream metadata updates
  useEffect(() => {
    if (status === 'streaming' && streamMetadata && streamMetadata.status !== StreamStatus.STREAMING) {
      setStreamMetadata(prev => prev ? {
        ...prev,
        status: StreamStatus.STREAMING,
        updatedAt: new Date(),
      } : undefined);
    } else if (status !== 'streaming' && status !== 'submitted' && streamMetadata && streamMetadata.status === StreamStatus.STREAMING) {
      setStreamMetadata(prev => prev ? {
        ...prev,
        status: StreamStatus.COMPLETED,
        completedAt: new Date(),
        updatedAt: new Date(),
      } : undefined);
    }
  }, [status, streamMetadata]);

  // Determine loading state based on status
  const isLoading = status === 'streaming' || status === 'submitted';

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    error,
    streamMetadata,
    resume,
    stop,
    reload,
    clear,
  };
}
