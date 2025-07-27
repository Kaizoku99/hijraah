"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useChat } from "@/hooks/useChat";
import { ChatModelType } from "@/core/chat";
import { useUser } from "@/lib/auth/hooks";
import { Skeleton } from "@/ui/skeleton";

export default function NewChatPage() {
  const router = useRouter();
  const user = useUser();
  const { createChat, isLoading: isChatLoading } = useChat();

  const isUserLoading = user === undefined || user === null;

  useEffect(() => {
    const initializeNewChat = async () => {
      if (!user) return;

      try {
        // Create a new chat using our hook
        const chat = await createChat({
          title: "New Chat",
          modelType: ChatModelType.GPT_4,
          initialMessage: "Hello, I need help with immigration.",
        });

        if (chat) {
          // Redirect to the new chat within the consolidated structure
          router.push(`/ai-unified/chat/${chat.id}`); // <-- Updated redirect path
        }
      } catch (error) {
        console.error("Error creating new chat:", error);
        // Optionally: Add user feedback, e.g., using toast
      }
    };

    if (user && !isChatLoading) {
      // Ensure user exists and we aren't already creating
      initializeNewChat();
    }
  }, [user, router, createChat, isChatLoading]);

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
