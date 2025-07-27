'use client'

import { type Message } from 'ai'
import { Copy, MoreVertical, ThumbsDown, ThumbsUp, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import remarkGfm from 'remark-gfm'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

import { UnifiedMarkdown } from './UnifiedMarkdown'




interface UnifiedMessageProps {
    message: Message
    isLastMessage?: boolean
    chatId: string
}

export function UnifiedMessage({ message, isLastMessage, chatId }: UnifiedMessageProps) {
    const { toast } = useToast()
    const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null)
    const [isCopied, setIsCopied] = useState(false)
    const isUser = message.role === 'user'

    // Debug message rendering
    useEffect(() => {
        console.log('Rendering message:', message.id, message.content.substring(0, 50))
    }, [message.id, message.content])

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(message.content)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
            toast({
                title: 'Copied to clipboard',
                description: 'Message content copied to clipboard',
            })
        } catch (error) {
            toast({
                title: 'Failed to copy',
                description: 'Could not copy message to clipboard',
                variant: 'destructive',
            })
        }
    }

    const submitFeedback = async (type: 'like' | 'dislike') => {
        try {
            // Only allow feedback on assistant messages
            if (message.role !== 'assistant') return

            const newFeedback = type === 'like' ? 'liked' : 'disliked'

            // Toggle feedback if already selected
            if (feedback === newFeedback) {
                setFeedback(null)
            } else {
                setFeedback(newFeedback)
            }

            const response = await fetch('/api/chat/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messageId: message.id,
                    chatId,
                    type,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit feedback')
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to submit feedback',
                variant: 'destructive',
            })
        }
    }

    return (
        <div
            className={cn(
                'flex w-full gap-3 group relative',
                isUser ? 'flex-row-reverse' : 'flex-row'
            )}
            id={message.id}
        >
            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
                {isUser ? (
                    <Avatar>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                ) : (
                    <Avatar>
                        <AvatarImage src="/bot-avatar.png" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                )}
            </div>

            {/* Message Content */}
            <div className={cn(
                'flex flex-col gap-1 min-w-0 max-w-[calc(100%-4rem)]',
                isUser ? 'items-end' : 'items-start'
            )}>
                <div className={cn(
                    'flex flex-col gap-2 rounded-lg px-4 py-2.5 text-sm',
                    isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}>
                    <UnifiedMarkdown
                        content={message.content}
                        className={isUser ? 'prose-invert' : ''}
                    />
                </div>

                {/* Show action buttons for assistant messages */}
                {!isUser && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                'h-7 w-7',
                                feedback === 'liked' ? 'text-green-500' : 'text-muted-foreground'
                            )}
                            onClick={() => submitFeedback('like')}
                        >
                            <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                'h-7 w-7',
                                feedback === 'disliked' ? 'text-red-500' : 'text-muted-foreground'
                            )}
                            onClick={() => submitFeedback('dislike')}
                        >
                            <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={copyToClipboard}>
                                    {isCopied ? (
                                        <Check className="mr-2 h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="mr-2 h-4 w-4" />
                                    )}
                                    Copy Message
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </div>
        </div>
    )
} 