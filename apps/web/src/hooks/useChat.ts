import { useState, useCallback } from "react";
import { useAuth } from "@/lib/auth/hooks";

import { useToast } from "@/components/ui/use-toast";
import { ChatModelType } from "@/_core/chat/entities/chat";
import { generateId } from "@/shared/utils/id-generator";

export type Chat = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  modelType: ChatModelType;
  caseId: string | null;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  latestMessage: Message | null;
  metadata?: {
    shared?: boolean;
    [key: string]: any;
  };
};

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  attachments?: Attachment[];
  createdAt: string;
};

export type Attachment = {
  id: string;
  type: "image" | "document" | "link";
  fileId?: string;
  url?: string;
  name: string;
  contentType?: string;
  size?: number;
};

export type ChatOptions = {
  title?: string;
  description?: string;
  modelType?: ChatModelType;
  caseId?: string;
  initialMessage?: string;
  countryCode?: string;
};

export function useChat() {
  const { toast } = useToast();
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const authHeaders: Record<string, string> = session?.access_token
    ? { Authorization: `Bearer ${session.access_token}` }
    : {};

  // Create a new chat
  const createChat = useCallback(
    async (options: ChatOptions = {}): Promise<Chat | null> => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders,
          },
          body: JSON.stringify(options),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create chat");
        }

        const data = await response.json();
        const newChat = data.chat;

        setChats((prevChats) => [newChat, ...prevChats]);
        setCurrentChat(newChat);

        return newChat;
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to create chat",
          variant: "destructive",
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [toast, authHeaders],
  );

  // Get user's chats
  const getChats = useCallback(
    async (
      options: {
        limit?: number;
        offset?: number;
        caseId?: string;
      } = {},
    ): Promise<Chat[]> => {
      try {
        setIsLoading(true);

        // Build query string
        const queryParams = new URLSearchParams();
        if (options.limit)
          queryParams.append("limit", options.limit.toString());
        if (options.offset)
          queryParams.append("offset", options.offset.toString());
        if (options.caseId) queryParams.append("caseId", options.caseId);

        const response = await fetch(`/api/chat?${queryParams.toString()}`, {
          headers: {
            ...authHeaders,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to fetch chats");
        }

        const data = await response.json();
        setChats(data.chats);

        return data.chats;
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch chats",
          variant: "destructive",
        });
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [toast, authHeaders],
  );

  // Get a specific chat
  const getChat = useCallback(
    async (chatId: string): Promise<Chat | null> => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/chat/${chatId}`, {
          headers: {
            ...authHeaders,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to fetch chat");
        }

        const data = await response.json();
        setCurrentChat(data.chat);

        return data.chat;
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch chat",
          variant: "destructive",
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [toast, authHeaders],
  );

  // Send a message to a chat
  const sendMessage = useCallback(
    async (
      chatId: string,
      content: string,
      attachments: Omit<Attachment, "id">[] = [],
    ): Promise<{
      userMessageId: string;
      assistantMessageId: string | null;
    } | null> => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/chat/${chatId}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders,
          },
          body: JSON.stringify({
            message: content,
            attachments: attachments,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to send message");
        }

        const data = await response.json();

        // Update current chat with new messages
        await getChat(chatId);

        return {
          userMessageId: data.userMessageId,
          assistantMessageId: data.assistantMessageId,
        };
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to send message",
          variant: "destructive",
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [toast, authHeaders, getChat],
  );

  // Update chat details
  const updateChat = useCallback(
    async (
      chatId: string,
      updates: {
        title?: string;
        description?: string | null;
        modelType?: ChatModelType;
        caseId?: string | null;
        metadata?: {
          shared?: boolean;
          [key: string]: any;
        };
      },
    ): Promise<Chat | null> => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/chat/${chatId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders,
          },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to update chat");
        }

        const data = await response.json();

        setCurrentChat(data.chat);
        setChats((prevChats) =>
          prevChats.map((chat) => (chat.id === chatId ? data.chat : chat)),
        );

        return data.chat;
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to update chat",
          variant: "destructive",
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [toast, authHeaders],
  );

  // Delete a chat
  const deleteChat = useCallback(
    async (chatId: string): Promise<boolean> => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/chat/${chatId}`, {
          method: "DELETE",
          headers: {
            ...authHeaders,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to delete chat");
        }

        setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
        if (currentChat?.id === chatId) {
          setCurrentChat(null);
        }

        return true;
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete chat",
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [toast, authHeaders, currentChat],
  );

  // Generate a title for a chat
  const generateChatTitle = useCallback(
    async (chatId: string): Promise<string | null> => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/chat/${chatId}/generate-title`, {
          method: "POST",
          headers: {
            ...authHeaders,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to generate chat title");
        }

        const data = await response.json();

        // Update chat with new title
        if (currentChat?.id === chatId) {
          setCurrentChat((prev) =>
            prev ? { ...prev, title: data.title } : null,
          );
        }

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === chatId ? { ...chat, title: data.title } : chat,
          ),
        );

        return data.title;
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to generate chat title",
          variant: "destructive",
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [toast, authHeaders, currentChat],
  );

  return {
    isLoading,
    chats,
    currentChat,
    createChat,
    getChats,
    getChat,
    sendMessage,
    updateChat,
    deleteChat,
    generateChatTitle,
  };
}
