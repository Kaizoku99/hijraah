'use client';

import * as React from 'react';
import { useChat as useVercelChat } from 'ai/react';
import { toast } from 'sonner';
import { Message } from 'ai';

interface UseChatQueryProps {
  initialMessages?: Message[];
  onResponse?: (response: {
    content: string;
    sources?: { title: string; url: string }[];
  }) => void;
  filters?: {
    country?: string;
    category?: string;
    language?: string;
  };
}

export function useChatQuery({
  initialMessages,
  onResponse,
  filters,
}: UseChatQueryProps) {
  const [isTyping, setIsTyping] = React.useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
  } = useVercelChat({
    api: '/api/hono/ai/chat',
    initialMessages,
    body: {
      filters,
    },
    onResponse: (response) => {
      setIsTyping(false);
      if (response.ok) {
        const reader = response.body?.getReader();
        if (reader) {
          onResponse?.({
            content: 'Streaming response...',
          });
        } else {
          toast.error('Failed to get response from AI');
        }
      }
    },
    onFinish: () => {
      setIsTyping(false);
    },
  });

  const handleFormSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsTyping(true);
        await handleSubmit(e);
      } catch (error) {
        console.error('Error submitting message:', error);
        toast.error('Failed to send message');
        setIsTyping(false);
      }
    },
    [handleSubmit]
  );

  const clearMessages = React.useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleFormSubmit,
    isLoading,
    isTyping,
    error,
    clearMessages,
  };
} 