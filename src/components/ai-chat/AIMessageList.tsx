'use client'

import { useRef, useEffect } from 'react'
import { Message } from 'ai'
import { cn } from '@/lib/utils'
import { AIMessage } from './AIMessage'
import { Skeleton } from '@/components/ui/skeleton'

interface AIMessageListProps {
    messages: Message[]
    isLoading?: boolean
    className?: string
    isArtifactVisible?: boolean
}

export function AIMessageList({
    messages,
    isLoading = false,
    className,
    isArtifactVisible = false
}: AIMessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Scroll to bottom when messages change or when loading
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isLoading])

    return (
        <div
            className={cn(
                'flex flex-col gap-6 overflow-y-auto p-4',
                isArtifactVisible ? 'md:mr-[350px]' : '',
                className
            )}
        >
            {messages.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <p className="text-lg font-medium">Welcome to AI Chat</p>
                    <p className="text-sm text-muted-foreground">
                        Ask me anything about immigration, document processing, or eligibility requirements.
                    </p>
                </div>
            ) : (
                messages.map((message, index) => (
                    <AIMessage
                        key={message.id || index}
                        message={message}
                        isLastMessage={index === messages.length - 1}
                    />
                ))
            )}

            {isLoading && (
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground">
                        <span className="text-xs">AI</span>
                    </div>
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    )
} 