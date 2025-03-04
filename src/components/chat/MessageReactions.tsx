import { Button } from '@/components/ui/button.tsx';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { chatService } from '@/services/chat.ts';
import { Reaction, ReactionType } from '@/types/chat.ts';
import { useEffect, useState } from 'react';

interface MessageReactionsProps {
    messageId: string;
    userId: string;
}

const REACTION_TYPES: ReactionType[] = [
    '👍',
    '❤️',
    '😄',
    '😮',
    '😢',
    '😡',
    '🎉',
    '🚀',
    '👀',
    '💯',
];

export function MessageReactions({ messageId, userId }: MessageReactionsProps) {
    const [reactions, setReactions] = useState<Reaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadReactions() {
            try {
                const data = await chatService.getReactions(messageId);
                setReactions(data);
            } catch (error) {
                console.error('Error loading reactions:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadReactions();

        const subscription = chatService.subscribeToReactions(
            messageId,
            (reaction) => {
                setReactions((prev) => {
                    const exists = prev.some((r) => r.id === reaction.id);
                    if (exists) {
                        return prev.map((r) => (r.id === reaction.id ? reaction : r));
                    }
                    return [...prev, reaction];
                });
            },
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [messageId]);

    const counts = chatService.getReactionCounts(reactions);
    const userReaction = chatService.getUserReaction(reactions, userId);

    async function handleReaction(type: ReactionType) {
        try {
            if (userReaction === type) {
                await chatService.removeReaction(messageId, userId);
                setReactions((prev) => prev.filter((r) => r.user_id !== userId));
            } else {
                const reaction = await chatService.addReaction(messageId, userId, type);
                setReactions((prev) => {
                    const filtered = prev.filter((r) => r.user_id !== userId);
                    return [...filtered, reaction];
                });
            }
        } catch (error) {
            console.error('Error handling reaction:', error);
        }
    }

    if (isLoading) {
        return <div className='animate-pulse h-8 w-full bg-muted rounded' />;
    }

    return (
        <div className='flex flex-wrap gap-1.5'>
            {REACTION_TYPES.map((type) => {
                const count = counts[type] || 0;
                const isSelected = userReaction === type;

                return (
                    <Tooltip key={type}>
                        <TooltipTrigger asChild>
                            <Button
                                variant={isSelected ? 'default' : 'ghost'}
                                size='sm'
                                className='h-8 px-2 font-normal'
                                onClick={() => handleReaction(type)}
                            >
                                {type}
                                {count > 0 && (
                                    <span className='ml-1 text-xs font-medium'>{count}</span>
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {isSelected ? 'Remove reaction' : 'Add reaction'}
                                {count > 0 && ` (${count})`}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                );
            })}
        </div>
    );
}