"use client";

import { type Metadata } from "next";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";

// import { AIChatContainer } from '@/components/ui/ai-chat/AIChatContainer'
import { Footer } from "@/components/ui/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { UnifiedChatContainer } from "@/components/ui/unified-chat/UnifiedChatContainer";
import { useSupabaseBrowser } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";
// import { ChatList } from '@/components/ui/chat/chat-list'

export default function SharedChatPage() {
  const params = useParams();
  const chatId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabaseBrowser();

  useEffect(() => {
    async function loadChat() {
      if (!chatId) return;

      try {
        setIsLoading(true);

        // Get the chat
        const { data: chatData, error: chatError } = await supabase
          .from("chat_sessions")
          .select("*")
          .eq("id", chatId)
          .eq("visibility", "public")
          .single();

        if (chatError) {
          throw new Error("Shared chat not found");
        }

        // Set the selected model
        if (chatData.model) {
          setSelectedModel(chatData.model);
        }

        // Get the messages
        const { data: messages, error: messagesError } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("chat_id", chatId)
          .order("created_at", { ascending: true });

        if (messagesError) {
          throw new Error("Failed to load messages");
        }

        // Format messages for the AI chat component
        const formattedMessages = messages.map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          createdAt: message.created_at,
        }));

        setInitialMessages(formattedMessages);
      } catch (error: any) {
        console.error("Error loading shared chat:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadChat();
  }, [chatId, supabase]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
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
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* <AIChatContainer
                id={chatId}
                initialMessages={initialMessages}
                selectedModel={selectedModel}
                isReadonly={true}
            /> */}
      <UnifiedChatContainer
        id={chatId}
        isReadonly={true} // Explicitly set isReadonly for shared chats
      />
    </div>
  );
}
