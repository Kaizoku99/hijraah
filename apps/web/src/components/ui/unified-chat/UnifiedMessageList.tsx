"use client";

import { UIMessage } from "ai";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

import { UnifiedMessage } from "./UnifiedMessage";
import { UnifiedTypingIndicator } from "./UnifiedTypingIndicator";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "./ai-elements";

interface UnifiedMessageListProps {
  messages: UIMessage[];
  isLoading?: boolean;
  className?: string;
  isArtifactVisible?: boolean;
  chatId: string;
  isReasoningStreaming?: boolean;
}

export function UnifiedMessageList({
  messages,
  isLoading = false,
  className,
  isArtifactVisible = false,
  chatId,
  isReasoningStreaming = false,
}: UnifiedMessageListProps) {
  // Log messages for debugging
  useEffect(() => {
    console.log("Messages in MessageList:", messages);
  }, [messages]);

  return (
    <Conversation
      className={cn(
        "flex flex-col gap-4",
        isArtifactVisible ? "md:pr-[calc(30vw+1rem)]" : "",
        className,
      )}
    >
      <ConversationContent>
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <h3 className="text-lg font-semibold">Welcome to AI Chat</h3>
            <p className="text-sm text-muted-foreground">
              Ask anything, from complex topics to creative ideas
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={message.id || index} className="message-wrapper">
              <UnifiedMessage
                message={message}
                isLastMessage={index === messages.length - 1}
                chatId={chatId}
                isReasoningStreaming={isReasoningStreaming && index === messages.length - 1}
              />
            </div>
          ))
        )}

        {isLoading && <UnifiedTypingIndicator />}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
