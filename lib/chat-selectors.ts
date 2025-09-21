/**
 * Chat Store Selectors - Optimized hooks for AI SDK Tools Store
 * 
 * These custom hooks provide optimized access to specific parts of the chat state
 * to prevent unnecessary re-renders and improve performance.
 */

import { 
  useChat, 
  useChatMessages, 
  useChatStatus, 
  useChatSendMessage, 
  useChatError,
  useChatProperty
} from '@ai-sdk-tools/store';


import { useMemo, useState, useCallback } from 'react';
import type { UIMessage } from '@ai-sdk-tools/store';

/**
 * Hook that only re-renders when messages change
 */
export function useMessages(): UIMessage[] {
  return useChatMessages();
}

/**
 * Hook that only re-renders when the last message changes
 */
export function useLastMessage(): UIMessage | undefined {
  const messages = useChatMessages();
  return useMemo(() => {
    return messages.length > 0 ? messages[messages.length - 1] : undefined;
  }, [messages]);
}

/**
 * Hook that only re-renders when loading state changes
 */
export function useIsLoading(): boolean {
  const status = useChatStatus();
  return useMemo(() => {
    return status === 'streaming' || status === 'submitted';
  }, [status]);
}

/**
 * Hook that manages input state for chat messages
 * Note: Input management is not provided by @ai-sdk-tools/store, so we implement it locally
 */
export function useChatInput(): {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setInput: (value: string) => void;
} {
  const [input, setInput] = useState('');
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return { input, handleInputChange, setInput };
}

/**
 * Hook that only re-renders when error state changes
 */
export function useChatErrorSelector(): Error | undefined {
  return useChatError();
}

/**
 * Hook that returns message count without causing re-renders on message content changes
 */
export function useMessageCount(): number {
  const messages = useChatMessages();
  return useMemo(() => messages.length, [messages.length]);
}

/**
 * Hook that returns only user messages
 */
export function useUserMessages(): UIMessage[] {
  const messages = useChatMessages();
  return useMemo(() => {
    return messages.filter(message => message.role === 'user');
  }, [messages]);
}

/**
 * Hook that returns only assistant messages
 */
export function useAssistantMessages(): UIMessage[] {
  const messages = useChatMessages();
  return useMemo(() => {
    return messages.filter(message => message.role === 'assistant');
  }, [messages]);
}

/**
 * Hook that returns chat actions without state
 * Note: Some actions need to be implemented based on available store APIs
 */
export function useChatActions(): {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  stop: () => void;
  reload: () => void;
  setMessages: (messages: UIMessage[]) => void;
} {
  const sendMessage = useChatSendMessage();
  
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formData.get('message') as string;
    if (input?.trim()) {
      // Based on UnifiedChatContainer usage pattern
      sendMessage({
        text: input
      });
    }
  }, [sendMessage]);
  
  const stop = useCallback(() => {
    // Stop functionality needs to be implemented based on your specific requirements
    console.warn('Stop functionality not yet implemented');
  }, []);
  
  const reload = useCallback(() => {
    // Reload functionality needs to be implemented based on your specific requirements
    console.warn('Reload functionality not yet implemented');
  }, []);
  
  const setMessages = useCallback((messages: UIMessage[]) => {
    // SetMessages functionality needs to be implemented based on your specific requirements
    console.warn('SetMessages functionality not yet implemented');
  }, []);

  return { handleSubmit, stop, reload, setMessages };
}

/**
 * Hook that returns basic chat status information
 */
export function useChatStatusInfo(): {
  isLoading: boolean;
  error: Error | undefined;
  messageCount: number;
  hasMessages: boolean;
} {
  const status = useChatStatus();
  const error = useChatError();
  const messages = useChatMessages();
  
  return useMemo(() => ({
    isLoading: status === 'streaming' || status === 'submitted',
    error,
    messageCount: messages.length,
    hasMessages: messages.length > 0,
  }), [status, error, messages.length]);
}

/**
 * Hook for getting the current conversation context (last N messages)
 */
export function useConversationContext(limit: number = 5): UIMessage[] {
  const messages = useChatMessages();
  return useMemo(() => {
    return messages.slice(-limit);
  }, [messages, limit]);
}

/**
 * Hook that provides optimized access to message by ID
 */
export function useMessage(messageId: string): UIMessage | undefined {
  const messages = useChatMessages();
  return useMemo(() => {
    return messages.find(message => message.id === messageId);
  }, [messages, messageId]);
}

/**
 * Hook that returns whether the chat is in a ready state for new messages
 */
export function useIsChatReady(): boolean {
  const status = useChatStatus();
  const error = useChatError();
  return useMemo(() => {
    return status === 'ready' && !error;
  }, [status, error]);
}

/**
 * Hook for streaming state information
 */
export function useStreamingState(): {
  isStreaming: boolean;
  canStop: boolean;
  canReload: boolean;
} {
  const status = useChatStatus();
  
  return useMemo(() => ({
    isStreaming: status === 'streaming',
    canStop: status === 'streaming', // Can stop when streaming
    canReload: status === 'ready' || status === 'error', // Can reload when not streaming
  }), [status]);
}