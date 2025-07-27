"use client";

import { useChat, type Message } from "@ai-sdk/react"; // New import
import { nanoid } from "nanoid"; // Import nanoid for generateId
import * as React from "react";
// import { useChat as useVercelChat } from 'ai/react'; // Old import
import { toast } from "sonner";
// import { Message } from 'ai'; // Message type now comes from @ai-sdk/react

interface UseChatQueryProps {
  id?: string;
  initialMessages?: Message[];
  selectedChatModel?: string;
  visibility?: "public" | "private";
  onResponse?: (response: {
    content: string;
    sources?: { title: string; url: string }[];
  }) => void;
  onFinish?: (message: Message) => void; // Added onFinish prop
  filters?: {
    country?: string;
    category?: string;
    language?: string;
  };
}

export function useChatQuery({
  id,
  initialMessages,
  selectedChatModel,
  visibility = "private",
  onResponse, // Keep original onResponse handling for now
  onFinish, // Destructure new onFinish prop
  filters,
}: UseChatQueryProps) {
  const [isTyping, setIsTyping] = React.useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
    append, // Add append if needed later
    reload, // Add reload if needed later
    stop, // Add stop if needed later
  } = useChat({
    // Changed from useVercelChat
    id,
    api: "/api/ai/chat",
    initialMessages,
    body: {
      // Keep sending these in the body
      selectedChatModel: selectedChatModel,
      visibility: visibility,
      filters,
    },
    // Keep original onResponse handling for now
    // onResponse: (response) => {
    //   setIsTyping(false);
    //   if (response.ok) {
    //     const reader = response.body?.getReader();
    //     if (reader) {
    //       onResponse?.({
    //         content: 'Streaming response...',
    //       });
    //     } else {
    //       toast.error('Failed to get response from AI');
    //     }
    //   }
    // },
    generateId: () => nanoid(), // Add message ID generation
    onFinish: (message) => {
      // Use the new onFinish
      setIsTyping(false);
      onFinish?.(message); // Call the passed-in onFinish callback
      // Example: Trigger SWR mutation like in ai-chatbot if needed
      // mutate(unstable_serialize(getChatHistoryPaginationKey));
    },
    onError: (err) => {
      // Add error handling
      setIsTyping(false);
      toast.error(err.message || "An error occurred during the chat request.");
      console.error("Chat error:", err);
    },
  });

  // Keep handleFormSubmit wrapper
  const handleFormSubmit = React.useCallback(
    async (
      e: React.FormEvent<HTMLFormElement>,
      options?: { data?: Record<string, any> },
    ) => {
      try {
        e.preventDefault();
        setIsTyping(true);
        // Pass options through if they exist (for data like attachments)
        await handleSubmit(e, options);
      } catch (error) {
        console.error("Error submitting message:", error);
        toast.error("Failed to send message");
        setIsTyping(false);
      } finally {
        // Might want to set isTyping false here too, although onFinish/onError should cover it
      }
    },
    [handleSubmit],
  );

  const clearMessages = React.useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  // Error handling is now primarily in onError callback
  // React.useEffect(() => {
  //   if (error) {
  //     toast.error(error.message);
  //   }
  // }, [error]);

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleFormSubmit,
    isLoading: isLoading || isTyping, // Combine isLoading and isTyping
    isTyping, // Keep isTyping if needed separately
    error,
    setMessages,
    clearMessages,
    append,
    reload,
    stop,
  };
}
