'use client'

import { formatDistanceToNow } from 'date-fns'
import { Archive, ArrowLeft, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/auth/hooks'


interface ArchivedChat {
    id: string
    title: string
    created_at: string
    updated_at: string
}

export default function ArchivedChatsPage() {
    const router = useRouter()
    const { user } = useAuth()
    const { toast } = useToast()
    const [chats, setChats] = useState<ArchivedChat[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadArchivedChats() {
            if (!user) return

            try {
                setIsLoading(true)
                const response = await fetch('/api/chat/archived')

                if (!response.ok) {
                    throw new Error('Failed to fetch archived chats')
                }

                const data = await response.json()
                setChats(data)
            } catch (error: any) {
                console.error('Error loading archived chats:', error)
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to load archived chats',
                    variant: 'destructive'
                })
            } finally {
                setIsLoading(false)
            }
        }

        loadArchivedChats()
    }, [user, toast])

    const handleUnarchiveChat = async (id: string) => {
        try {
            const response = await fetch(`/api/chat/${id}/unarchive`, {
                method: 'PUT'
            })

            if (!response.ok) {
                throw new Error('Failed to unarchive chat')
            }

            // Remove from list
            setChats(chats.filter(chat => chat.id !== id))

            toast({
                title: 'Chat unarchived',
                description: 'The chat has been restored to your history'
            })
        } catch (error: any) {
            console.error('Error unarchiving chat:', error)
            toast({
                title: 'Error',
                description: error.message || 'Failed to unarchive chat',
                variant: 'destructive'
            })
        }
    }

    if (!user) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Archived Chats</h1>
                    <p className="text-muted-foreground mt-2">
                        Please sign in to view your archived chats
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Archived Chats</h1>
                <Button variant="outline" onClick={() => router.push('/ai-chat/history')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to History
                </Button>
            </div>

            {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
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
                    <Archive className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-lg font-semibold">No archived chats</h2>
                    <p className="text-muted-foreground mt-2">
                        When you archive chats, they will appear here
                    </p>
                    <Button className="mt-4" variant="outline" onClick={() => router.push('/ai-chat/history')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to History
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {chats.map((chat) => (
                        <Card key={chat.id}>
                            <CardHeader>
                                <CardTitle className="truncate">{chat.title || `Chat (${chat.id.substring(0, 6)}...)`}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Archived {formatDistanceToNow(new Date(chat.updated_at), {
                                        addSuffix: true,
                                    })}
                                </p>
                            </CardHeader>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" asChild>
                                    <Link href={`/ai-chat/${chat.id}`}>View</Link>
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleUnarchiveChat(chat.id)}
                                >
                                    <Archive className="mr-2 h-4 w-4" />
                                    Unarchive
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
} 