'use client'

import React from 'react'
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { BotIcon } from 'lucide-react';

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
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

export default TypingIndicator
