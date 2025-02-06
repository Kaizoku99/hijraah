'use client';

import * as React from 'react';
import { useChat } from 'ai/react';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { ErrorBoundary } from '@/components/error-boundary';
import { ChatService } from '@/lib/supabase/chat';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { ChatMessage } from '@/lib/supabase/chat';

interface ChatContainerProps {
  sessionId: string;
}

export function ChatContainer({ sessionId }: ChatContainerProps) {
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    error,
    stop 
  } = useChat({
    api: '/api/chat',
    body: { sessionId },
    onResponse: (response) => {
      if (!response.ok) {
        toast.error('Failed to send message');
      }
    },
    onFinish: (message) => {
      // Message completed successfully
    },
    onError: (error) => {
      console.error('Chat error:', error);
      toast.error('An error occurred while chatting');
    }
  });

  const chatService = React.useMemo(() => new ChatService(), []);

  React.useEffect(() => {
    const setupSubscription = async () => {
      const supabase = await getSupabaseClient();
      
      const subscription = supabase
        .channel(`chat:${sessionId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${sessionId}`,
        }, (payload) => {
          const message = payload.new as ChatMessage;
          // Handle new message
          console.log('New message:', message);
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Subscribed to chat messages');
          } else if (status === 'CLOSED') {
            console.log('Lost connection to chat');
            toast.error('Lost connection to chat');
          } else if (status === 'CHANNEL_ERROR') {
            console.error('Chat subscription error');
            toast.error('Error connecting to chat');
          }
        });

      return () => {
        subscription.unsubscribe();
      };
    };

    const cleanup = setupSubscription();
    return () => {
      cleanup.then(unsubscribe => unsubscribe());
    };
  }, [sessionId]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">
          An error occurred. Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-full flex-col">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput 
          input={input}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onStop={stop}
        />
      </div>
    </ErrorBoundary>
  );
} 