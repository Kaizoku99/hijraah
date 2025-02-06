'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ChatSkeletonProps {
  className?: string;
}

export function ChatSkeleton({ className }: ChatSkeletonProps) {
  return (
    <div className={cn('mb-4 flex justify-start', className)}>
      <div className="flex max-w-[80%] items-center gap-3 rounded-lg bg-muted p-4">
        <div className="h-6 w-6 animate-pulse rounded-full bg-muted-foreground/10" />
        <div className="h-4 w-[200px] animate-pulse rounded bg-muted-foreground/10" />
      </div>
    </div>
  );
} 