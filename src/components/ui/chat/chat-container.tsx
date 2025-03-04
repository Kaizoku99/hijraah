'use client';

import * as React from 'react';
import { useChat, type Message } from 'ai/react';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { ErrorBoundary } from '@/components/error-boundary';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';

export interface ChatContainerProps {
  sessionId: string;
  api?: string;
  initialMessages?: Message[];
  onMessageCreated?: (message: Message) => void;
}

export function ChatContainer({
  sessionId,
  api = '/api/chat',
  initialMessages = [],
  onMessageCreated
}: ChatContainerProps) {
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    append,
    error
  } = useChat({
    api,
    id: sessionId,
    initialMessages,
    body: {
      sessionId,
      conversationId: sessionId
    },
    onResponse: (response) => {
      if (!response.ok) {
        toast.error(response.statusText || 'Error connecting to chat service');
      }
    },
    onFinish: (message) => {
      if (onMessageCreated) {
        onMessageCreated(message);
      }

      // Save message to Supabase
      saveMessageToSupabase(message);
    },
  });

  const saveMessageToSupabase = async (message: Message) => {
    try {
      const supabase = getSupabaseClient();
      await supabase
        .from('chat_messages')
        .insert({
          id: message.id || nanoid(),
          session_id: sessionId,
          role: message.role,
          content: message.content,
          created_at: new Date().toISOString(),
        });
    } catch (err) {
      console.error('Failed to save message to database:', err);
    }
  };

  React.useEffect(() => {
    const setupSubscription = async () => {
      if (isSubscribed) return;

      try {
        const supabase = getSupabaseClient();
        const subscription = supabase
          .channel(`chat:${sessionId}`)
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `session_id=eq.${sessionId}`
          }, (payload: any) => {
            // Only add the message if it's not already in the messages array
            const newMessage = payload.new;
            const messageExists = messages.some(m => m.id === newMessage.id);

            if (!messageExists && newMessage.role === 'assistant') {
              append({
                id: newMessage.id,
                content: newMessage.content,
                role: newMessage.role,
              });
            }
          })
          .subscribe();

        setIsSubscribed(true);

        return () => {
          subscription.unsubscribe();
          setIsSubscribed(false);
        };
      } catch (err) {
        console.error('Error setting up chat subscription:', err);
        toast.error('Failed to connect to chat');
      }
    };

    setupSubscription();
  }, [sessionId, messages, append, isSubscribed]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-lg font-medium">Error connecting to chat</h3>
          <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput
          input={input}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </ErrorBoundary>
  );
} 