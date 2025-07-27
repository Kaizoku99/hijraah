import { useEffect, useRef } from 'react';

import { chatService } from '@/lib/services/chat';

export function useTypingStatus(conversationId: string, userId: string) {
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleTyping = () => {
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set typing status to true
    chatService.updateTypingStatus(true);

    // Set a timeout to clear typing status after 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      chatService.updateTypingStatus(false);
    }, 2000);
  };

  return handleTyping;
}