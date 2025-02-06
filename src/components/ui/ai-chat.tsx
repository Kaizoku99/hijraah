'use client';

import * as React from 'react';
import { Message as UIMessage } from 'ai/react';
import { cn } from '@/lib/utils';
import { Card } from './card';
import { ScrollArea } from './scroll-area';
import { ChatMessage } from './chat/chat-message';
import { ChatInput } from './chat/chat-input';
import { ChatSkeleton } from './chat/chat-skeleton';
import { useChatQuery } from '@/hooks/use-chat-query';
import { useChatScroll } from '@/hooks/use-chat-scroll';

interface Message extends UIMessage {
  timestamp?: Date;
}

interface AIResponse {
  content: string;
  sources?: {
    title: string;
    url: string;
  }[];
  error?: string;
}

interface AIChatProps {
  initialMessages?: Message[];
  onResponse?: (response: AIResponse) => void;
  className?: string;
  filters?: {
    country?: string;
    category?: string;
    language?: string;
  };
}

export function AIChat({ initialMessages, onResponse, className, filters }: AIChatProps) {
  const chatRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isTyping,
    clearMessages,
  } = useChatQuery({
    initialMessages,
    onResponse,
    filters,
  });

  useChatScroll({
    chatRef,
    bottomRef,
    count: messages.length,
  });

  return (
    <Card className={cn('flex h-[600px] flex-col', className)}>
      <ScrollArea className="flex-1 p-4" ref={chatRef}>
        {messages.map((message: Message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}
        {isTyping && <ChatSkeleton />}
        <div ref={bottomRef} />
      </ScrollArea>
      <ChatInput
        input={input}
        isLoading={isLoading}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Card>
  );
} 