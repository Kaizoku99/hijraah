'use client'

import { useEffect, useRef } from 'react'
import { type Message } from '@/types/chat'
import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/useUser'
import { Avatar } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageBubble } from './MessageBubble'

interface MessageListProps {
    messages: Message[]
    isLoading?: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
    const { user } = useUser()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading messages...</div>
            </div>
        )
    }

    return (
        <ScrollArea ref={scrollRef} className="h-full">
            <div className="flex flex-col gap-4 p-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn('flex items-start gap-3', {
                            'flex-row-reverse': message.userId === user?.id,
                        })}
                    >
                        <Avatar
                            className="h-8 w-8"
                            fallback={message.role === 'assistant' ? 'AI' : 'U'}
                        />
                        <MessageBubble message={message} isOwn={message.userId === user?.id} />
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}