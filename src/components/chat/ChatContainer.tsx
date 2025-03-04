'use client'

import { useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import { useChatStore } from '@/stores/chat'
import { chatService } from '@/services/chat'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { ChatHeader } from './ChatHeader'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useDeepResearch } from '@/hooks/useDeepResearch'
import { DeepResearchComponent } from '@/components/DeepResearch'
import { cn } from '@/lib/utils'

export function ChatContainer({ className }: ChatContainerProps) {
    const { user } = useUser()
    const { toast } = useToast()
    const {
        currentConversation,
        messages,
        isLoading,
        setMessages,
        setLoading,
        setError,
        addMessage,
    } = useChatStore()
    const { state: deepResearchState } = useDeepResearch()

    useEffect(() => {
        if (!currentConversation || !user) return

        setLoading(true)
        chatService
            .getMessages(currentConversation.id)
            .then(setMessages)
            .catch((error) => {
                setError(error)
                toast({
                    title: 'Error loading messages',
                    description: error.message,
                    variant: 'destructive',
                })
            })
            .finally(() => setLoading(false))

        const subscription = chatService.subscribeToMessages(
            currentConversation.id,
            (message) => {
                if (message.userId !== user.id) {
                    addMessage(message)
                }
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [currentConversation, user, setMessages, setLoading, setError, addMessage, toast])

    if (!currentConversation) {
        return (
            <Card className="flex h-full items-center justify-center p-6">
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
            </Card>
        )
    }

    return (
        <div className={cn('flex h-full flex-col', className)}>
            <ChatHeader title="Chat" />
            <MessageList
                messages={messages}
                className="flex-1"
            />
            <MessageInput
                onSendMessage={async (content) => {
                    if (!user) return

                    try {
                        const message = await chatService.sendMessage({
                            content,
                            role: 'user',
                            conversationId: currentConversation.id,
                            userId: user.id,
                        })
                        addMessage(message)
                    } catch (error: any) {
                        toast({
                            title: 'Error sending message',
                            description: error.message,
                            variant: 'destructive',
                        })
                    }
                }}
            />

            {/* Render the Deep Research component floating in the chat */}
            {deepResearchState.isActive && deepResearchState.sources.length > 0 && (
                <DeepResearchComponent isFloating={true} />
            )}
        </div>
    )
}