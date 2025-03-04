'use client'

import { useEffect } from 'react'
import { PlusIcon } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { useChatStore } from '@/stores/chat'
import { chatService } from '@/services/chat'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export function ConversationList() {
    const { user } = useUser()
    const { toast } = useToast()
    const {
        conversations,
        currentConversation,
        setConversations,
        setCurrentConversation,
        setError,
    } = useChatStore()

    useEffect(() => {
        if (!user) return

        chatService
            .getConversations(user.id)
            .then(setConversations)
            .catch((error) => {
                setError(error)
                toast({
                    title: 'Error loading conversations',
                    description: error.message,
                    variant: 'destructive',
                })
            })
    }, [user, setConversations, setError, toast])

    const handleNewConversation = async () => {
        if (!user) return

        try {
            const conversation = await chatService.createConversation(
                'New Conversation',
                user.id
            )
            setConversations([conversation, ...conversations])
            setCurrentConversation(conversation)
        } catch (error: any) {
            toast({
                title: 'Error creating conversation',
                description: error.message,
                variant: 'destructive',
            })
        }
    }

    return (
        <Card className="flex h-full flex-col">
            <div className="border-b p-4">
                <Button
                    variant="default"
                    className="w-full gap-2"
                    onClick={() => void handleNewConversation()}
                >
                    <PlusIcon className="h-4 w-4" />
                    New Conversation
                </Button>
            </div>
            <ScrollArea className="flex-1">
                <div className="space-y-2 p-4">
                    {conversations.map((conversation) => (
                        <Button
                            key={conversation.id}
                            variant={
                                conversation.id === currentConversation?.id ? 'default' : 'ghost'
                            }
                            className="w-full justify-start"
                            onClick={() => setCurrentConversation(conversation)}
                        >
                            <div className="flex flex-1 flex-col items-start gap-1">
                                <span className="font-medium">{conversation.title}</span>
                                {conversation.lastMessage && (
                                    <span className="text-xs text-muted-foreground line-clamp-1">
                                        {conversation.lastMessage.content}
                                    </span>
                                )}
                            </div>
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </Card>
    )
}