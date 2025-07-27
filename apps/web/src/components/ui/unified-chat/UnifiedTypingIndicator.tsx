"use client";

import { cn } from "@/lib/utils";

interface UnifiedTypingIndicatorProps {
  className?: string;
}

export function UnifiedTypingIndicator({
  className,
}: UnifiedTypingIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        <span className="text-xs">AI</span>
      </div>
      <div className="flex gap-1 items-center rounded-lg bg-muted px-4 py-2.5 text-sm">
        <div className="flex space-x-1">
          <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.3s]" />
          <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.15s]" />
          <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" />
        </div>
        <span className="ml-2 text-muted-foreground text-xs">Thinking...</span>
      </div>
    </div>
  );
}
