'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ErrorBoundary } from '../ErrorBoundary';
import { subscribeToMessages } from '@/lib/supabase/chat';

export function ChatContainer({ sessionId }: { sessionId: string }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    body: { sessionId },
    onResponse: (response) => {
      // Handle streaming updates
      console.log('Streaming response:', response);
    },
    onFinish: (message) => {
      // Handle completion
      console.log('Finished message:', message);
    },
  });

  useEffect(() => {
    const subscription = subscribeToMessages(sessionId, (message) => {
      // Handle new messages
      console.log('New message:', message);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [sessionId]);

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full">
        <MessageList messages={messages} />
        <ChatInput 
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </ErrorBoundary>
  );
}
