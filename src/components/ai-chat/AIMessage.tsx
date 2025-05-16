'use client'

import { useState } from 'react'
import { Message } from 'ai'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Copy,
    MoreHorizontal,
    ThumbsDown,
    ThumbsUp,
    Clipboard,
    Check
} from 'lucide-react'
import { Markdown } from '@/components/ui/markdown'

interface AIMessageProps {
    message: Message
    isLastMessage?: boolean
}

export function AIMessage({ message, isLastMessage = false }: AIMessageProps) {
    const [isCopied, setIsCopied] = useState(false)
    const [vote, setVote] = useState<'up' | 'down' | null>(null)

    const isUser = message.role === 'user'
    const isAssistant = message.role === 'assistant'

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    const handleVote = async (type: 'up' | 'down') => {
        if (vote === type) {
            // Remove vote if clicking the same button
            setVote(null)
            // Call API to remove vote
            return
        }

        setVote(type)
        // Call API to save vote
    }

    return (
        <div
            className={cn(
                'group relative flex items-start gap-3',
                isUser ? 'justify-end' : ''
            )}
        >
            {!isUser && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground">
                    <span className="text-xs">AI</span>
                </div>
            )}

            <div
                className={cn(
                    'flex flex-col gap-1 rounded-lg px-3 py-2 text-sm',
                    isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                )}
            >
                {isUser ? (
                    <div>{message.content}</div>
                ) : (
                    <Markdown content={message.content} />
                )}
            </div>

            {isUser && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
                    <span className="text-xs">You</span>
                </div>
            )}

            {isAssistant && (
                <div className="absolute -bottom-5 right-0 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            'h-7 w-7',
                            vote === 'up' ? 'text-green-500' : ''
                        )}
                        onClick={() => handleVote('up')}
                    >
                        <ThumbsUp className="h-4 w-4" />
                        <span className="sr-only">Thumbs up</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            'h-7 w-7',
                            vote === 'down' ? 'text-red-500' : ''
                        )}
                        onClick={() => handleVote('down')}
                    >
                        <ThumbsDown className="h-4 w-4" />
                        <span className="sr-only">Thumbs down</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={handleCopy}
                    >
                        {isCopied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        <span className="sr-only">Copy message</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleCopy}>
                                <Clipboard className="mr-2 h-4 w-4" />
                                Copy
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    )
} 