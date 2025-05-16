'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useUser } from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageSquare, Plus, Trash2, Share2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Chat {
    id: string
    title: string
    model: string
    created_at: string
    is_shared: boolean
    message_count: number
}

export default function ChatHistoryPage() {
    const router = useRouter()
    const { user } = useUser()
    const [chats, setChats] = useState<Chat[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadChats() {
            if (!user) return

            try {
                setIsLoading(true)
                const supabase = getSupabaseClient()

                // Get all chats for the user
                const { data, error } = await supabase
                    .from('chats')
                    .select(`
            id,
            title,
            model,
            created_at,
            is_shared,
            chat_messages(count)
          `)
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })

                if (error) {
                    throw error
                }

                // Format the chats
                const formattedChats = data.map((chat) => ({
                    id: chat.id,
                    title: chat.title,
                    model: chat.model,
                    created_at: chat.created_at,
                    is_shared: chat.is_shared,
                    message_count: chat.chat_messages[0].count
                }))

                setChats(formattedChats)
            } catch (error) {
                console.error('Error loading chats:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadChats()
    }, [user])

    const handleNewChat = () => {
        router.push('/ai-chat')
    }

    const handleDeleteChat = async (id: string) => {
        try {
            const supabase = getSupabaseClient()

            // Delete the chat
            await fetch(`/api/ai/chat?id=${id}`, {
                method: 'DELETE',
            })

            // Remove from the list
            setChats(chats.filter((chat) => chat.id !== id))
        } catch (error) {
            console.error('Error deleting chat:', error)
        }
    }

    const handleShareChat = async (id: string) => {
        try {
            const supabase = getSupabaseClient()

            // Update the chat to be shared
            const { error } = await supabase
                .from('chats')
                .update({ is_shared: true })
                .eq('id', id)

            if (error) {
                throw error
            }

            // Update the local state
            setChats(
                chats.map((chat) =>
                    chat.id === id ? { ...chat, is_shared: true } : chat
                )
            )

            // Copy the share link to clipboard
            const shareUrl = `${window.location.origin}/ai-chat/shared/${id}`
            navigator.clipboard.writeText(shareUrl)
            alert('Share link copied to clipboard!')
        } catch (error) {
            console.error('Error sharing chat:', error)
        }
    }

    if (!user) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Chat History</h1>
                    <p className="text-muted-foreground mt-2">
                        Please sign in to view your chat history
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Chat History</h1>
                <Button onClick={handleNewChat}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Chat
                </Button>
            </div>

            {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-9 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : chats.length === 0 ? (
                <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-lg font-semibold">No chats yet</h2>
                    <p className="text-muted-foreground mt-2">
                        Start a new conversation with our AI assistant
                    </p>
                    <Button className="mt-4" onClick={handleNewChat}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Chat
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {chats.map((chat) => (
                        <Card key={chat.id}>
                            <CardHeader>
                                <CardTitle className="truncate">{chat.title}</CardTitle>
                                <CardDescription>
                                    {formatDistanceToNow(new Date(chat.created_at), {
                                        addSuffix: true,
                                    })}
                                    {' • '}
                                    {chat.model}
                                    {' • '}
                                    {chat.message_count} messages
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {chat.is_shared ? (
                                        <span className="text-green-500">Shared</span>
                                    ) : (
                                        'Private'
                                    )}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" asChild>
                                    <Link href={`/ai-chat/${chat.id}`}>View</Link>
                                </Button>
                                <div className="flex gap-2">
                                    {!chat.is_shared && (
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleShareChat(chat.id)}
                                        >
                                            <Share2 className="h-4 w-4" />
                                            <span className="sr-only">Share</span>
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive"
                                        onClick={() => handleDeleteChat(chat.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
} 