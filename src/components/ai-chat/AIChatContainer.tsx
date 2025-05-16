'use client'

import { useState, useEffect } from 'react'
import { useChat } from 'ai/react'
import { useUser } from '@/hooks/useUser'
import { nanoid } from 'nanoid'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { AIChatHeader } from './AIChatHeader'
import { AIMessageList } from './AIMessageList'
import { AIMessageInput } from './AIMessageInput'
import { AISuggestions } from './AISuggestions'
import { AIArtifact } from './AIArtifact'

export interface AIChatContainerProps {
    id?: string
    initialMessages?: any[]
    className?: string
    selectedModel?: string
    isReadonly?: boolean
}

export function AIChatContainer({
    id = nanoid(),
    initialMessages = [],
    className,
    selectedModel = 'gpt-4o',
    isReadonly = false
}: AIChatContainerProps) {
    const { user } = useUser()
    const { toast } = useToast()
    const [attachments, setAttachments] = useState<any[]>([])
    const [isArtifactVisible, setIsArtifactVisible] = useState(false)

    const {
        messages,
        setMessages,
        input,
        setInput,
        handleSubmit,
        append,
        reload,
        stop,
        isLoading,
        error
    } = useChat({
        id,
        body: {
            id,
            selectedChatModel: selectedModel,
            userId: user?.id
        },
        initialMessages,
        api: '/api/ai/chat',
        onError: (err) => {
            toast({
                title: 'Error',
                description: err.message || 'An error occurred while processing your request',
                variant: 'destructive',
            })
        }
    })

    // Handle errors
    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error.message || 'An error occurred while processing your request',
                variant: 'destructive',
            })
        }
    }, [error, toast])

    if (!user && !isReadonly) {
        return (
            <Card className="flex h-full items-center justify-center p-6">
                <p className="text-muted-foreground">Please sign in to start chatting</p>
            </Card>
        )
    }

    return (
        <div className={cn('flex h-full flex-col', className)}>
            <AIChatHeader
                chatId={id}
                selectedModel={selectedModel}
                isReadonly={isReadonly}
            />

            <AIMessageList
                messages={messages}
                isLoading={isLoading}
                className="flex-1"
                isArtifactVisible={isArtifactVisible}
            />

            {!isReadonly && (
                <div className="border-t p-4">
                    <AIMessageInput
                        input={input}
                        setInput={setInput}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        stop={stop}
                        attachments={attachments}
                        setAttachments={setAttachments}
                    />

                    <AISuggestions
                        messages={messages}
                        append={append}
                    />
                </div>
            )}

            <AIArtifact
                chatId={id}
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                stop={stop}
                attachments={attachments}
                setAttachments={setAttachments}
                append={append}
                messages={messages}
                setMessages={setMessages}
                reload={reload}
                isVisible={isArtifactVisible}
                setIsVisible={setIsArtifactVisible}
                isReadonly={isReadonly}
            />
        </div>
    )
} 