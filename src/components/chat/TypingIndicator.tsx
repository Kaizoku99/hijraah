import { useEffect, useState } from 'react';
import { chatService } from '@/services/chat.ts';

interface TypingIndicatorProps {
    conversationId: string;
    userId: string;
}

export function TypingIndicator({ conversationId, userId }: TypingIndicatorProps) {
    const [typingUsers, setTypingUsers] = useState<string[]>([]);

    useEffect(() => {
        // Join the conversation presence channel
        chatService.joinConversation(conversationId, userId);

        // Set up an interval to update typing users
        const interval = setInterval(() => {
            const users = chatService.getTypingUsers();
            setTypingUsers(users.filter(id => id !== userId));
        }, 1000);

        // Clean up
        return () => {
            clearInterval(interval);
            chatService.leaveConversation();
        };
    }, [conversationId, userId]);

    if (typingUsers.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
            <div className="flex gap-1">
                <span className="block w-1 h-1 rounded-full bg-current animate-bounce" />
                <span className="block w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                <span className="block w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
            </div>
            <span>
                {typingUsers.length === 1
                    ? 'Someone is typing...'
                    : `${typingUsers.length} people are typing...`}
            </span>
        </div>
    );
}
