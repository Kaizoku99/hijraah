'use client'

import { useEffect, useRef } from 'react'
import { Message } from 'ai'
import { cn } from '@/lib/utils'
import { UnifiedMessage } from './UnifiedMessage'
import { UnifiedTypingIndicator } from './UnifiedTypingIndicator'

interface UnifiedMessageListProps {
    messages: Message[]
    isLoading?: boolean
    className?: string
    isArtifactVisible?: boolean
    chatId: string
}

export function UnifiedMessageList({
    messages,
    isLoading = false,
    className,
    isArtifactVisible = false,
    chatId
}: UnifiedMessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Log messages for debugging
    useEffect(() => {
        console.log('Messages in MessageList:', messages)
    }, [messages])

    // Scroll to bottom when new messages arrive or when loading state changes
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isLoading])

    // When artifact panel visibility changes, we need to scroll to see the latest message
    useEffect(() => {
        if (messagesEndRef.current) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }, [isArtifactVisible])

    return (
        <div
            className={cn(
                'flex flex-col gap-4 overflow-y-auto p-4',
                isArtifactVisible ? 'md:pr-[calc(30vw+1rem)]' : '',
                className
            )}
        >
            {messages.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
                    <h3 className="text-lg font-semibold">Welcome to AI Chat</h3>
                    <p className="text-sm text-muted-foreground">
                        Ask anything, from complex topics to creative ideas
                    </p>
                </div>
            ) : (
                messages.map((message, index) => (
                    <div key={message.id || index} className="message-wrapper">
                        <UnifiedMessage
                            message={message}
                            isLastMessage={index === messages.length - 1}
                            chatId={chatId}
                        />
                    </div>
                ))
            )}

            {isLoading && <UnifiedTypingIndicator />}

            {/* Anchor for scrolling to the latest message */}
            <div ref={messagesEndRef} />
        </div>
    )
} 