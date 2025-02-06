'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/25" style={{ animationDelay: '0ms' }} />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/25" style={{ animationDelay: '150ms' }} />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/25" style={{ animationDelay: '300ms' }} />
    </div>
  );
} 