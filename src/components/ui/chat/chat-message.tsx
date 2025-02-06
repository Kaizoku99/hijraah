'use client';

import * as React from 'react';
import { Message } from 'ai/react';
import { cn } from '@/lib/utils';
import { Avatar } from '../avatar';
import { Card } from '@/components/ui/card';
import { BotIcon, UserIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message & {
    timestamp?: Date;
  };
  className?: string;
}

export function ChatMessage({ message, className }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-4 pr-4',
        message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse',
        className
      )}
    >
      <Avatar className="mt-1">
        {message.role === 'assistant' ? (
          <BotIcon className="h-5 w-5" />
        ) : (
          <UserIcon className="h-5 w-5" />
        )}
      </Avatar>
      <Card
        className={cn(
          'flex-1 max-w-[85%] px-4 py-3',
          message.role === 'assistant'
            ? 'bg-muted'
            : 'bg-primary text-primary-foreground'
        )}
      >
        <div className={cn(
          'prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0',
          message.role === 'assistant'
            ? 'prose-slate'
            : 'prose-white'
        )}>
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              pre: ({ children }) => (
                <pre className="mb-2 mt-2 overflow-auto rounded-lg bg-muted p-4">
                  {children}
                </pre>
              ),
              code: ({ children }) => (
                <code className="rounded bg-muted px-1 py-0.5">
                  {children}
                </code>
              )
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        {message.timestamp && (
          <p className="mt-2 text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        )}
      </Card>
    </div>
  );
} 