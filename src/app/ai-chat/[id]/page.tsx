'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AIChatContainer } from '@/components/ai-chat/AIChatContainer'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useUser } from '@/hooks/useUser'
import { Skeleton } from '@/components/ui/skeleton'

export default function ChatPage() {
    const params = useParams()
    const chatId = params.id as string
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(true)
    const [initialMessages, setInitialMessages] = useState<any[]>([])
    const [selectedModel, setSelectedModel] = useState('gpt-4o')
    const [isReadonly, setIsReadonly] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadChat() {
            if (!chatId) return

            try {
                setIsLoading(true)
                const supabase = getSupabaseClient()

                // Get the chat
                const { data: chat, error: chatError } = await supabase
                    .from('chats')
                    .select('*')
                    .eq('id', chatId)
                    .single()

                if (chatError) {
                    throw new Error('Chat not found')
                }

                // Check if the user owns the chat or if it's shared
                if (chat.user_id !== user?.id && !chat.is_shared) {
                    setIsReadonly(true)
                }

                // Set the selected model
                if (chat.model) {
                    setSelectedModel(chat.model)
                }

                // Get the messages
                const { data: messages, error: messagesError } = await supabase
                    .from('chat_messages')
                    .select('*')
                    .eq('chat_id', chatId)
                    .order('created_at', { ascending: true })

                if (messagesError) {
                    throw new Error('Failed to load messages')
                }

                // Format messages for the AI chat component
                const formattedMessages = messages.map((message) => ({
                    id: message.id,
                    role: message.role,
                    content: message.content,
                    createdAt: message.created_at
                }))

                setInitialMessages(formattedMessages)
            } catch (error: any) {
                console.error('Error loading chat:', error)
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadChat()
    }, [chatId, user?.id])

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Error</h2>
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex h-screen flex-col">
                <div className="flex h-14 items-center justify-between border-b px-4">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-8 w-32" />
                </div>
                <div className="flex-1 p-4 space-y-6">
                    <Skeleton className="h-16 w-2/3" />
                    <Skeleton className="h-16 w-2/3 ml-auto" />
                    <Skeleton className="h-16 w-2/3" />
                </div>
                <div className="border-t p-4">
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen flex-col">
            <AIChatContainer
                id={chatId}
                initialMessages={initialMessages}
                selectedModel={selectedModel}
                isReadonly={isReadonly}
            />
        </div>
    )
} 