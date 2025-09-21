"use client";

import { cn } from "@/lib/utils";
import {
  Message as AIMessage,
  MessageContent,
  MessageAvatar,
  Loader,
} from "./ai-elements";

interface UnifiedTypingIndicatorProps {
  className?: string;
}

export function UnifiedTypingIndicator({
  className,
}: UnifiedTypingIndicatorProps) {
  return (
    <AIMessage from="assistant" className={cn("w-full", className)}>
      <MessageAvatar 
        src="/bot-avatar.png" 
        name="Assistant" 
      />
      <MessageContent>
        <div className="flex items-center gap-2">
          <Loader size={16} />
          <span className="text-muted-foreground text-sm">Thinking...</span>
        </div>
      </MessageContent>
    </AIMessage>
  );
}
