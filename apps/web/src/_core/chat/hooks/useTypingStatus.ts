import { useEffect, useRef } from "react";

import { PresenceManager } from "@/lib/presence";

export function useTypingStatus(conversationId: string, userId: string) {
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const presenceManagerRef = useRef<PresenceManager>();

  useEffect(() => {
    // Initialize presence manager
    presenceManagerRef.current = new PresenceManager();
    presenceManagerRef.current.join(conversationId, userId);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      presenceManagerRef.current?.leave();
    };
  }, [conversationId, userId]);

  const handleTyping = () => {
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set typing status to true
    presenceManagerRef.current?.updateTypingStatus(true);

    // Set a timeout to clear typing status after 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      presenceManagerRef.current?.updateTypingStatus(false);
    }, 2000);
  };

  return handleTyping;
}
