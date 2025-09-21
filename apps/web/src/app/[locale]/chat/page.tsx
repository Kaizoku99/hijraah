"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to new chat page when visiting base chat route
    // This prevents the error where UnifiedChatContainer tries to stream
    // from a non-existent chat ID
    router.replace("/en/chat/new");
  }, [router]);

  // Show minimal loading while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
