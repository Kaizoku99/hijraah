'use client'

import { type Message } from '@/types/chat'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { FileIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface MessageBubbleProps {
    message: Message
    isOwn?: boolean
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
    const hasAttachments = message.attachments && message.attachments.length > 0

    return (
        <div
            className={cn('flex max-w-[80%] flex-col gap-2', {
                'ml-auto': isOwn,
            })}
        >
            <Card
                className={cn('px-4 py-3', {
                    'bg-primary text-primary-foreground': isOwn,
                    'bg-muted': !isOwn,
                })}
            >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                {hasAttachments && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {message.attachments.map((attachment) => (
                            <Button
                                key={attachment.id}
                                variant="secondary"
                                size="sm"
                                className="gap-2"
                                asChild
                            >
                                <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                                    <FileIcon className="h-4 w-4" />
                                    {attachment.name}
                                </a>
                            </Button>
                        ))}
                    </div>
                )}
            </Card>
            <p
                className={cn('text-xs text-muted-foreground', {
                    'text-right': isOwn,
                })}
            >
                {format(message.createdAt, 'HH:mm')}
            </p>
        </div>
    )
}