'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewChatPage() {
    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
        const createNewChat = async () => {
            if (!user) return;

            try {
                const supabase = getSupabaseClient();
                const chatId = uuidv4();

                // Create a new chat in the database
                const { error } = await supabase
                    .from('ai_chats')
                    .insert({
                        id: chatId,
                        user_id: user.id,
                        title: 'New Chat',
                        model: 'gpt-4o',
                        is_shared: false,
                    });

                if (error) {
                    console.error('Error creating new chat:', error);
                    return;
                }

                // Redirect to the new chat
                router.push(`/ai-chat/${chatId}`);
            } catch (error) {
                console.error('Error creating new chat:', error);
            }
        };

        if (user) {
            createNewChat();
        }
    }, [user, router]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                <Skeleton className="h-8 w-64 mb-4" />
                <Skeleton className="h-32 w-full max-w-2xl mb-4" />
                <Skeleton className="h-32 w-full max-w-2xl" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                <h1 className="text-2xl font-bold mb-4">Sign in required</h1>
                <p className="text-muted-foreground mb-4">
                    You need to be signed in to create a new chat.
                </p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">Creating your new chat...</h1>
                <p className="text-muted-foreground">Please wait while we set things up.</p>
            </div>
        </div>
    );
} 