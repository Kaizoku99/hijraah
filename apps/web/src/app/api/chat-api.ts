import { ChatModelType } from "@/core/chat";

/**
 * API client for interacting with chat-related endpoints
 */
export class ChatAPI {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  /**
   * Get all chats for the current user
   */
  static async getUserChats(options?: {
    limit?: number;
    offset?: number;
    orderBy?: string;
    caseId?: string;
  }): Promise<any> {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (options?.limit) params.append("limit", options.limit.toString());
      if (options?.offset) params.append("offset", options.offset.toString());
      if (options?.orderBy) params.append("orderBy", options.orderBy);
      if (options?.caseId) params.append("caseId", options.caseId);

      const queryString = params.toString() ? `?${params.toString()}` : "";

      const response = await fetch(`${this.baseUrl}/chat${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch chats: ${response.statusText}`);
      }

      const data = await response.json();
      return data.chats;
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  }

  /**
   * Create a new chat
   */
  static async createChat(data: {
    title?: string;
    description?: string;
    modelType?: ChatModelType;
    caseId?: string;
    initialMessage?: string;
    countryCode?: string;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create chat: ${response.statusText}`);
      }

      const result = await response.json();
      return result.chat;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  /**
   * Get a chat by ID
   */
  static async getChatById(chatId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/chats/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch chat: ${response.statusText}`);
      }

      const data = await response.json();
      return data.chat;
    } catch (error) {
      console.error("Error fetching chat:", error);
      throw error;
    }
  }

  /**
   * Update a chat
   */
  static async updateChat(
    chatId: string,
    updates: {
      title?: string;
      description?: string | null;
      modelType?: ChatModelType;
      caseId?: string | null;
    }
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/chats/${chatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update chat: ${response.statusText}`);
      }

      const data = await response.json();
      return data.chat;
    } catch (error) {
      console.error("Error updating chat:", error);
      throw error;
    }
  }

  /**
   * Delete a chat
   */
  static async deleteChat(chatId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/chats/${chatId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete chat: ${response.statusText}`);
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw error;
    }
  }

  /**
   * Send a message to a chat
   */
  static async sendMessage(
    chatId: string,
    message: string,
    attachments: Array<{
      type: "image" | "document" | "link";
      fileId?: string;
      url?: string;
      name: string;
      contentType?: string;
      size?: number;
    }> = []
  ): Promise<{ userMessageId: string; assistantMessageId: string | null }> {
    try {
      const response = await fetch(`${this.baseUrl}/chats/${chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message, attachments }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        userMessageId: data.userMessageId,
        assistantMessageId: data.assistantMessageId,
      };
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  /**
   * Generate a title for a chat
   */
  static async generateChatTitle(chatId: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/chats/${chatId}/generate-title`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to generate chat title: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.title;
    } catch (error) {
      console.error("Error generating chat title:", error);
      throw error;
    }
  }
}
