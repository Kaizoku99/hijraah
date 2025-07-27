import { UseChatHelpers } from "@ai-sdk/react";
import { Message } from "ai";
import equal from "fast-deep-equal";
import { memo } from "react";

import type { ChatMessageVote } from "@/supabase/schema";
import type { BaseArtifactData } from "@/artifacts";

import { Artifact } from "./artifact";
import { PreviewMessage } from "./message";
import { useScrollToBottom } from "./use-scroll-to-bottom";

export interface ArtifactMessagesProps {
  sessionId: string;
  status: UseChatHelpers["status"];
  votes: ChatMessageVote[] | undefined;
  messages: Array<Message>;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
  isReadonly: boolean;
  artifactStatus: BaseArtifactData["status"];
  currentUserId: string | undefined;
}

function PureArtifactMessages({
  sessionId,
  status,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
  currentUserId,
}: ArtifactMessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col gap-4 h-full items-center overflow-y-scroll px-4 pt-20"
    >
      {messages.map((message, index) => {
        const currentUserVote = votes?.find(
          (vote) =>
            vote.messageId === message.id && vote.userId === currentUserId,
        );
        return (
          <PreviewMessage
            sessionId={sessionId}
            key={message.id}
            message={message}
            isLoading={status === "streaming" && index === messages.length - 1}
            vote={currentUserVote}
            setMessages={setMessages}
            reload={reload}
            isReadonly={isReadonly}
            currentUserId={currentUserId}
          />
        );
      })}

      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
}

function areEqual(
  prevProps: ArtifactMessagesProps,
  nextProps: ArtifactMessagesProps,
) {
  if (
    prevProps.artifactStatus === "streaming" &&
    nextProps.artifactStatus === "streaming"
  )
    return true;

  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.votes, nextProps.votes)) return false;
  if (prevProps.currentUserId !== nextProps.currentUserId) return false;

  return true;
}

export const ArtifactMessages = memo(PureArtifactMessages, areEqual);
