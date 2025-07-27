import { UseChatHelpers } from "@ai-sdk/react";
import { Message } from "ai";
import equal from "fast-deep-equal";
import { memo } from "react";

import type { ChatMessageVote } from "@/supabase/schema";

import { PreviewMessage, ThinkingMessage } from "./message";
import { Overview } from "./overview";
import { useScrollToBottom } from "./use-scroll-to-bottom";

export interface MessagesProps {
  sessionId: string;
  status: UseChatHelpers["status"];
  votes: ChatMessageVote[] | undefined;
  messages: Array<Message>;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
  isReadonly: boolean;
  isArtifactVisible: boolean;
  currentUserId: string | undefined;
}

function PureMessages({
  sessionId,
  status,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
  currentUserId,
}: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
    >
      {messages.length === 0 && <Overview />}

      {messages.map((message, index) => {
        const currentUserVote = votes?.find(
          (vote) =>
            vote.messageId === message.id && vote.userId === currentUserId
        );

        return (
          <PreviewMessage
            key={message.id}
            sessionId={sessionId}
            message={message}
            isLoading={status === "streaming" && messages.length - 1 === index}
            vote={currentUserVote}
            setMessages={setMessages}
            reload={reload}
            isReadonly={isReadonly}
            currentUserId={currentUserId}
          />
        );
      })}

      {status === "submitted" &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}

      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.isArtifactVisible && nextProps.isArtifactVisible) return true;

  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;
  if (!equal(prevProps.votes, nextProps.votes)) return false;
  if (prevProps.currentUserId !== nextProps.currentUserId) return false;

  return true;
});
