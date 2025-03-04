'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { BotIcon } from 'lucide-react';

interface TypingIndicatorProps {
  className?: string;
  variant?: 'simple' | 'avatar';
}

export function TypingIndicator({ className, variant = 'simple' }: TypingIndicatorProps) {
  if (variant === 'avatar') {
    return (
      <div className={cn('flex items-start gap-4 pr-4', className)}>
        <Avatar className="mt-1">
          <BotIcon className="h-5 w-5" />
        </Avatar>
        <Card className="flex-1 max-w-[85%] px-4 py-3 bg-muted">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/25" style={{ animationDelay: '0ms' }} />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/25" style={{ animationDelay: '150ms' }} />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/25" style={{ animationDelay: '300ms' }} />
    </div>
  );
} 