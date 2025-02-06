'use client';

import * as React from 'react';
import { Message } from 'ai';
import { StreamData } from '@/types/chat';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../scroll-area';
import { ChatMessage } from './chat-message';
import { TypingIndicator } from './typing-indicator';

interface ChatMessagesProps {
  messages: Message[];
  streamData?: StreamData[];
  isLoading?: boolean;
  className?: string;
}

export function ChatMessages({ 
  messages, 
  streamData, 
  isLoading,
  className 
}: ChatMessagesProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamData]);

  return (
    <ScrollArea ref={scrollRef} className={cn('flex-1 p-4', className)}>
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {streamData?.map((data, index) => (
          data.value.message && (
            <ChatMessage
              key={`stream-${index}`}
              message={{
                id: `stream-${index}`,
                content: data.value.message,
                role: 'assistant',
                createdAt: new Date()
              }}
            />
          )
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
      </div>
    </ScrollArea>
  );
} 