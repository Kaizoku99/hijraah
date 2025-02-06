'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface MessageStatusProps {
  messageCount: number;
  isLoading?: boolean;
  className?: string;
}

export function MessageStatus({ 
  messageCount, 
  isLoading,
  className 
}: MessageStatusProps) {
  return (
    <div className={cn('flex items-center gap-2 text-xs text-muted-foreground', className)}>
      {messageCount > 0 && (
        <span>{messageCount} message{messageCount === 1 ? '' : 's'}</span>
      )}
      {isLoading && (
        <div className="flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Generating...</span>
        </div>
      )}
    </div>
  );
} 