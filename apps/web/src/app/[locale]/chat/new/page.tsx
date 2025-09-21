"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

import { useChat } from "@/hooks/useChat";
import { ChatModelType } from "@/core/chat";
import { useUser } from "@/lib/auth/hooks";
import { Skeleton } from "@/ui/skeleton";
import { chatPerformanceMonitor } from "@/lib/performance/chat-performance";

export default function NewChatPage() {
  const router = useRouter();
  const locale = useLocale();
  const user = useUser();
  const { createChat, isLoading: isChatLoading } = useChat();

  // Guard against multiple simultaneous chat creation attempts
  const isCreatingRef = useRef(false);
  const hasCreatedRef = useRef(false);

  const isUserLoading = user === undefined || user === null;

  useEffect(() => {
    const initializeNewChat = async () => {
      // Early returns for all guard conditions
      if (!user || isUserLoading || isChatLoading) return;
      if (isCreatingRef.current || hasCreatedRef.current) return;

      // Mark as creating to prevent duplicate calls
      isCreatingRef.current = true;

      // Start performance tracking
      const perfId = `new-chat-${Date.now()}`;
      chatPerformanceMonitor.startTracking(perfId);

      try {
        // Create a new chat using our hook - empty chat per AI SDK v5 best practices
        const chat = await createChat({
          title: "New Chat",
          modelType: ChatModelType.GPT_4,
        });

        if (chat) {
          hasCreatedRef.current = true;
          chatPerformanceMonitor.markChatCreated(chat.id);

          // Redirect to the new chat with proper locale prefix
          router.push(`/${locale}/chat/${chat.id}`);
        }
      } catch (error) {
        console.error("Error creating new chat:", error);
        // Reset creating flag on error so user can retry
        isCreatingRef.current = false;
      }
    };

    // Only run if we haven't created a chat yet
    if (!hasCreatedRef.current) {
      initializeNewChat();
    }
  }, [user, isUserLoading, isChatLoading, router, createChat, locale]);

  const isLoading = isUserLoading || isChatLoading;

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
    // Consider redirecting to login or showing a login prompt component
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <h1 className="text-2xl font-bold mb-4">Sign in required</h1>
        <p className="text-muted-foreground mb-4">
          You need to be signed in to create a new chat.
        </p>
      </div>
    );
  }

  // If we reach here, it means user is loaded but chat creation might be in progress
  // or finished but redirection hasn't happened yet. Showing a loading state is appropriate.
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Creating your new chat...</h1>
        <p className="text-muted-foreground">
          Please wait while we set things up.
        </p>
      </div>
    </div>
  );
}
