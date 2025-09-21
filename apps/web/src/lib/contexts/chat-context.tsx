"use client";

import { Message } from "@ai-sdk-tools/store";
import * as React from "react";
import { toast } from "sonner";

import { useRealtime } from "@/hooks/use-realtime";
import { useAuth } from "@/lib/auth/hooks";
import { createClient } from "@/lib/supabase/client";

// Create a ChatService class to handle chat operations
class ChatService {
  private supabase = createClient();

  async createConversation({ title = "New Chat" } = {}) {
    const { data, error } = await this.supabase
      .from("conversations")
      .insert({ title })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getConversation(id: string) {
    const { data, error } = await this.supabase
      .from("conversations")
      .select("*, messages(*)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async addMessage({
    conversationId,
    message,
  }: {
    conversationId: string;
    message: Message;
  }) {
    const { data, error } = await this.supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        role: message.role,
        content: message.content,
        id: message.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async archiveConversation(id: string) {
    const { error } = await this.supabase
      .from("conversations")
      .update({ archived: true })
      .eq("id", id);

    if (error) throw error;
    return true;
  }
}

// Define ChatMessage type
interface ChatMessage {
  id: string;
  role: string;
  content: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => Promise<void>;
  updateMessage: (
    id: string,
    updateFn: (message: Message) => Message
  ) => Promise<void>;
  removeMessage: (id: string) => Promise<void>;
  clearMessages: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  conversationId: string | null;
  createConversation: (title?: string) => Promise<void>;
  loadConversation: (id: string) => Promise<void>;
  archiveConversation: () => Promise<void>;
  activeUsers: { user_id: string; online_at: string; typing?: boolean }[];
  setTyping: (isTyping: boolean) => Promise<void>;
}

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: React.ReactNode;
  initialMessages?: Message[];
  initialConversationId?: string;
}

export function ChatProvider({
  children,
  initialMessages = [],
  initialConversationId,
}: ChatProviderProps) {
  const { user } = useAuth();
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [conversationId, setConversationId] = React.useState<string | null>(
    initialConversationId || null
  );

  const chatService = React.useMemo(() => new ChatService(), []);

  // Setup realtime presence and message updates
  const { presenceState, updatePresence, broadcast } = useRealtime({
    channelName: conversationId ? `chat:${conversationId}` : "chat:lobby",
    onPresenceJoin: (presence) => {
      // Handle user joining
      console.log("User joined:", presence);
    },
    onPresenceLeave: (presence) => {
      // Handle user leaving
      console.log("User left:", presence);
    },
    onMessage: (payload) => {
      // Handle incoming messages
      if (payload.type === "message") {
        setMessages((prev) => [...prev, payload.message]);
      } else if (payload.type === "update") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === payload.message.id ? payload.message : msg
          )
        );
      } else if (payload.type === "delete") {
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== payload.messageId)
        );
      }
    },
  });

  // Convert presence state to array of active users
  const activeUsers = React.useMemo(() => {
    return Object.values(presenceState)
      .flat()
      .map((presence) => ({
        user_id: presence.user_id,
        online_at: presence.online_at,
        typing: presence.typing,
      }));
  }, [presenceState]);

  const createConversation = React.useCallback(
    async (title?: string) => {
      try {
        setIsLoading(true);
        const conversation = await chatService.createConversation({ title });
        setConversationId(conversation.id);
        setMessages([]);
      } catch (error) {
        console.error("Error creating conversation:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [chatService]
  );

  const loadConversation = React.useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const conversation = await chatService.getConversation(id);
        if (!conversation) throw new Error("Conversation not found");

        setConversationId(conversation.id);
        setMessages(
          conversation.messages.map((msg: ChatMessage) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
          }))
        );
      } catch (error) {
        console.error("Error loading conversation:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [chatService]
  );

  const addMessage = React.useCallback(
    async (message: Message) => {
      try {
        if (!conversationId) {
          await createConversation();
        }

        setMessages((prev) => [...prev, message]);

        if (conversationId) {
          await chatService.addMessage({
            conversationId,
            message,
          });

          // Broadcast message to other users
          await broadcast({
            type: "message",
            message,
          });
        }
      } catch (error) {
        console.error("Error adding message:", error);
        setError(error as Error);
        // Rollback optimistic update
        setMessages((prev) => prev.filter((msg) => msg.id !== message.id));
      }
    },
    [broadcast, chatService, conversationId, createConversation]
  );

  const updateMessage = React.useCallback(
    async (id: string, updateFn: (message: Message) => Message) => {
      try {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === id ? updateFn(message) : message
          )
        );

        if (conversationId) {
          const updatedMessage = messages.find((msg) => msg.id === id);
          if (updatedMessage) {
            await chatService.addMessage({
              conversationId,
              message: updatedMessage,
            });

            // Broadcast update to other users
            await broadcast({
              type: "update",
              message: updatedMessage,
            });
          }
        }
      } catch (error) {
        console.error("Error updating message:", error);
        setError(error as Error);
      }
    },
    [broadcast, chatService, conversationId, messages]
  );

  const removeMessage = React.useCallback(
    async (id: string) => {
      try {
        setMessages((prev) => prev.filter((message) => message.id !== id));

        // Broadcast deletion to other users
        if (conversationId) {
          await broadcast({
            type: "delete",
            messageId: id,
          });
        }
      } catch (error) {
        console.error("Error removing message:", error);
        setError(error as Error);
      }
    },
    [broadcast, conversationId]
  );

  const clearMessages = React.useCallback(async () => {
    try {
      setMessages([]);
      if (conversationId) {
        await chatService.archiveConversation(conversationId);
        setConversationId(null);
      }
    } catch (error) {
      console.error("Error clearing messages:", error);
      setError(error as Error);
    }
  }, [chatService, conversationId]);

  const archiveConversation = React.useCallback(async () => {
    try {
      if (conversationId) {
        await chatService.archiveConversation(conversationId);
        setConversationId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error archiving conversation:", error);
      setError(error as Error);
    }
  }, [chatService, conversationId]);

  // Update typing status
  const setTyping = React.useCallback(
    async (isTyping: boolean) => {
      if (!user) return;
      await updatePresence({ typing: isTyping });
    },
    [updatePresence, user]
  );

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const value = React.useMemo(
    () => ({
      messages,
      addMessage,
      updateMessage,
      removeMessage,
      clearMessages,
      isLoading,
      error,
      conversationId,
      createConversation,
      loadConversation,
      archiveConversation,
      activeUsers,
      setTyping,
    }),
    [
      messages,
      addMessage,
      updateMessage,
      removeMessage,
      clearMessages,
      isLoading,
      error,
      conversationId,
      createConversation,
      loadConversation,
      archiveConversation,
      activeUsers,
      setTyping,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
