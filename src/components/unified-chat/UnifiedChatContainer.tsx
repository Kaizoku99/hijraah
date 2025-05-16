'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useChat } from 'ai/react'
import { useAuth } from '@/contexts/auth'
import { nanoid } from 'nanoid'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { UnifiedChatHeader, chatVisibilityOptions } from '@/components/unified-chat/UnifiedChatHeader'
import { UnifiedMessageList } from '@/components/unified-chat/UnifiedMessageList'
import { UnifiedMessageInput } from '@/components/unified-chat/UnifiedMessageInput'
import { UnifiedSuggestions } from '@/components/unified-chat/UnifiedSuggestions'
import { UnifiedArtifact } from '@/components/unified-chat/UnifiedArtifact'
import { UnifiedResearchContainer } from '@/components/unified-chat/UnifiedResearchContainer'
import { UnifiedDocumentProcessor } from '@/components/unified-chat/UnifiedDocumentProcessor'
import { UnifiedWebScraper } from '@/components/unified-chat/UnifiedWebScraper'
import type { Attachment, Message } from 'ai'
import { useSWRConfig } from 'swr'

// Extend the Attachment type to include the id property
interface ExtendedAttachment extends Attachment {
    id: string;
}

export interface UnifiedChatContainerProps {
    id?: string
    initialMessages?: Message[]
    className?: string
    selectedModel?: string
    selectedVisibility?: string
    isReadonly?: boolean
}

export function UnifiedChatContainer({
    id = nanoid(),
    initialMessages = [],
    className,
    selectedModel = 'gpt-4o',
    selectedVisibility = 'private',
    isReadonly = false
}: UnifiedChatContainerProps) {
    const { user } = useAuth()
    const { toast } = useToast()
    const { mutate } = useSWRConfig()
    const [attachments, setAttachments] = useState<ExtendedAttachment[]>([])
    const [isArtifactVisible, setIsArtifactVisible] = useState(false)
    const [isResearchVisible, setIsResearchVisible] = useState(false)
    const [isDocumentProcessorVisible, setIsDocumentProcessorVisible] = useState(false)
    const [isWebScraperVisible, setIsWebScraperVisible] = useState(false)

    const {
        messages,
        setMessages,
        input,
        setInput,
        handleSubmit: aiHandleSubmit,
        append: aiAppend,
        reload: aiReload,
        stop,
        isLoading,
        error
    } = useChat({
        id,
        body: {
            id,
            selectedChatModel: selectedModel,
            userId: user?.id,
            visibility: selectedVisibility
        },
        initialMessages,
        api: '/api/ai/chat',
        onResponse: (response) => {
            console.log('Response received from API:', response.status)
        },
        onFinish: (message) => {
            // Refresh chat history
            mutate('/api/chat/history')
            // Clear attachments after message is sent
            setAttachments([])
            console.log('Message finished:', message)

            // Force a state update to ensure UI refreshes
            setMessages(currentMessages => [...currentMessages])
        },
        onError: (err) => {
            console.error('Chat error:', err)
            toast({
                title: 'Error',
                description: err.message || 'An error occurred while processing your request',
                variant: 'destructive',
            })
        }
    })

    // Wrapper functions to handle typings
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Form submitted', input, attachments)

        if (!input.trim() && attachments.length === 0) {
            console.log('No input or attachments to send')
            return Promise.resolve()
        }

        // Pass attachments through to the AI SDK
        aiHandleSubmit(e as any, {
            experimental_attachments: attachments.length > 0 ? attachments : undefined
        })

        return Promise.resolve()
    }

    const append = async (message: Message | Message[]) => {
        if (Array.isArray(message)) {
            for (const m of message) {
                await aiAppend(m as any)
            }
        } else {
            await aiAppend(message as any)
        }
        return Promise.resolve()
    }

    const reload = async () => {
        await aiReload()
        return Promise.resolve()
    }

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

    // Toggle visibility of different panels
    const toggleArtifact = () => {
        setIsArtifactVisible(!isArtifactVisible)
        // Close other panels when opening this one
        if (!isArtifactVisible) {
            setIsResearchVisible(false)
            setIsDocumentProcessorVisible(false)
            setIsWebScraperVisible(false)
        }
    }

    const toggleResearch = () => {
        setIsResearchVisible(!isResearchVisible)
        // Close other panels when opening this one
        if (!isResearchVisible) {
            setIsArtifactVisible(false)
            setIsDocumentProcessorVisible(false)
            setIsWebScraperVisible(false)
        }
    }

    const toggleDocumentProcessor = () => {
        setIsDocumentProcessorVisible(!isDocumentProcessorVisible)
        // Close other panels when opening this one
        if (!isDocumentProcessorVisible) {
            setIsArtifactVisible(false)
            setIsResearchVisible(false)
            setIsWebScraperVisible(false)
        }
    }

    const toggleWebScraper = () => {
        setIsWebScraperVisible(!isWebScraperVisible)
        // Close other panels when opening this one
        if (!isWebScraperVisible) {
            setIsArtifactVisible(false)
            setIsResearchVisible(false)
            setIsDocumentProcessorVisible(false)
        }
    }

    // Handle user authentication check
    if (!user && !isReadonly) {
        return (
            <Card className="flex h-full items-center justify-center p-6">
                <p className="text-muted-foreground">Please sign in to start chatting</p>
            </Card>
        )
    }

    return (
        <div className={cn('flex h-full flex-col', className)}>
            <UnifiedChatHeader
                chatId={id}
                selectedModel={selectedModel}
                selectedVisibility={selectedVisibility}
                isReadonly={isReadonly}
                toggleArtifact={toggleArtifact}
                isArtifactVisible={isArtifactVisible}
                toggleResearch={toggleResearch}
                isResearchVisible={isResearchVisible}
                toggleDocumentProcessor={toggleDocumentProcessor}
                isDocumentProcessorVisible={isDocumentProcessorVisible}
                toggleWebScraper={toggleWebScraper}
                isWebScraperVisible={isWebScraperVisible}
            />

            <UnifiedMessageList
                messages={messages}
                isLoading={isLoading}
                className="flex-1"
                isArtifactVisible={isArtifactVisible || isResearchVisible || isDocumentProcessorVisible || isWebScraperVisible}
                chatId={id}
            />

            {!isReadonly && (
                <div className="border-t p-4">
                    <UnifiedSuggestions
                        messages={messages}
                        append={append}
                    />

                    <UnifiedMessageInput
                        input={input}
                        setInput={setInput}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        stop={stop}
                        attachments={attachments}
                        setAttachments={setAttachments}
                        chatId={id}
                    />
                </div>
            )}

            <UnifiedArtifact
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

            <UnifiedResearchContainer
                chatId={id}
                messages={messages}
                append={append}
                isLoading={isLoading}
                isVisible={isResearchVisible}
            />

            <UnifiedDocumentProcessor
                chatId={id}
                attachments={attachments}
                append={append}
                isLoading={isLoading}
                isVisible={isDocumentProcessorVisible}
            />

            <UnifiedWebScraper
                chatId={id}
                append={append}
                isLoading={isLoading}
                isVisible={isWebScraperVisible}
            />
        </div>
    )
} 