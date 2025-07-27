"use client";

import * as React from "react";

interface UseChatScrollProps {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore?: boolean;
  loadMore?: () => Promise<void>;
  count: number;
}

export function useChatScroll({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: UseChatScrollProps) {
  const [hasInitialized, setHasInitialized] = React.useState(false);

  React.useEffect(() => {
    const topDiv = chatRef.current;
    const bottomDiv = bottomRef.current;
    const shouldAutoScroll = !hasInitialized;

    if (!topDiv || !bottomDiv) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && shouldLoadMore && loadMore) {
            loadMore();
          }
        });
      },
      { threshold: 0.5 },
    );

    if (shouldLoadMore && loadMore) {
      observer.observe(topDiv);
    }

    if (shouldAutoScroll) {
      bottomDiv.scrollIntoView({ behavior: "smooth" });
      setHasInitialized(true);
    }

    return () => {
      observer.disconnect();
    };
  }, [chatRef, bottomRef, shouldLoadMore, loadMore, hasInitialized, count]);
}
