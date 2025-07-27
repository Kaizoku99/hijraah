import equal from "fast-deep-equal";
import { memo } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useCopyToClipboard } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { CopyIcon, ThumbDownIcon, ThumbUpIcon } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ChatMessageVote } from "@/supabase/schema";
import type { User } from "@supabase/supabase-js";

import type { Message } from "ai";

export function PureMessageActions({
  sessionId,
  message,
  vote,
  isLoading,
  currentUserId,
}: {
  sessionId: string;
  message: Message;
  vote: ChatMessageVote | undefined;
  isLoading: boolean;
  currentUserId: string | undefined;
}) {
  const { mutate } = useSWRConfig();
  const [_, copyToClipboard] = useCopyToClipboard();

  if (isLoading) return null;
  if (message.role === "user") return null;
  if (message.toolInvocations && message.toolInvocations.length > 0)
    return null;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-row gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="py-1 px-2 h-fit text-muted-foreground"
              variant="outline"
              onClick={async () => {
                await copyToClipboard(message.content as string);
                toast.success("Copied to clipboard!");
              }}
            >
              <CopyIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="message-upvote"
              className="py-1 px-2 h-fit text-muted-foreground !pointer-events-auto"
              disabled={!currentUserId || vote?.isUpvoted === true}
              variant="outline"
              onClick={async () => {
                if (!currentUserId) {
                  toast.error("You must be logged in to vote.");
                  return;
                }
                const upvotePromise = fetch("/api/vote", {
                  method: "PATCH",
                  body: JSON.stringify({
                    messageId: message.id,
                    type: "up",
                  }),
                });

                toast.promise(upvotePromise, {
                  loading: "Upvoting Response...",
                  success: () => {
                    mutate<ChatMessageVote[]>(
                      `/api/vote?sessionId=${sessionId}`,
                      (currentVotesData) => {
                        const newVote: ChatMessageVote = {
                          messageId: message.id,
                          userId: currentUserId,
                          isUpvoted: true,
                          createdAt: new Date(),
                        };
                        if (!currentVotesData) return [newVote];

                        const existingVoteIndex = currentVotesData.findIndex(
                          (v) =>
                            v.messageId === message.id &&
                            v.userId === currentUserId,
                        );
                        if (existingVoteIndex !== -1) {
                          const updatedVotes = [...currentVotesData];
                          updatedVotes[existingVoteIndex] = {
                            ...updatedVotes[existingVoteIndex],
                            isUpvoted: true,
                            createdAt: new Date(),
                          };
                          return updatedVotes;
                        }
                        return [...currentVotesData, newVote];
                      },
                      { revalidate: false },
                    );
                    return "Upvoted Response!";
                  },
                  error: "Failed to upvote response.",
                });
              }}
            >
              <ThumbUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Upvote Response</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="message-downvote"
              className="py-1 px-2 h-fit text-muted-foreground !pointer-events-auto"
              variant="outline"
              disabled={!currentUserId || (vote && vote.isUpvoted === false)}
              onClick={async () => {
                if (!currentUserId) {
                  toast.error("You must be logged in to vote.");
                  return;
                }
                const downvotePromise = fetch("/api/vote", {
                  method: "PATCH",
                  body: JSON.stringify({
                    messageId: message.id,
                    type: "down",
                  }),
                });

                toast.promise(downvotePromise, {
                  loading: "Downvoting Response...",
                  success: () => {
                    mutate<ChatMessageVote[]>(
                      `/api/vote?sessionId=${sessionId}`,
                      (currentVotesData) => {
                        const newVote: ChatMessageVote = {
                          messageId: message.id,
                          userId: currentUserId,
                          isUpvoted: false,
                          createdAt: new Date(),
                        };
                        if (!currentVotesData) return [newVote];

                        const existingVoteIndex = currentVotesData.findIndex(
                          (v) =>
                            v.messageId === message.id &&
                            v.userId === currentUserId,
                        );

                        if (existingVoteIndex !== -1) {
                          const updatedVotes = [...currentVotesData];
                          updatedVotes[existingVoteIndex] = {
                            ...updatedVotes[existingVoteIndex],
                            isUpvoted: false,
                            createdAt: new Date(),
                          };
                          return updatedVotes;
                        }
                        return [...currentVotesData, newVote];
                      },
                      { revalidate: false },
                    );
                    return "Downvoted Response!";
                  },
                  error: "Failed to downvote response.",
                });
              }}
            >
              <ThumbDownIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Downvote Response</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (prevProps.currentUserId !== nextProps.currentUserId) return false;
    if (!equal(prevProps.vote, nextProps.vote)) return false;
    if (prevProps.isLoading !== nextProps.isLoading) return false;

    return true;
  },
);
