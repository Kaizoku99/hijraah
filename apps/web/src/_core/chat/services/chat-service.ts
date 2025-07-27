import { Chat, ChatModelType, ChatMessage } from "../entities/chat";

/**
 * Chat Service handles domain logic for chat operations
 */
export class ChatService {
  /**
   * Validate if the chat data is correct
   */
  validateChat(chat: Chat): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic validation
    if (!chat.title || chat.title.trim().length === 0) {
      errors.push("Chat title is required");
    }

    if (!chat.userId || chat.userId.trim().length === 0) {
      errors.push("User ID is required");
    }

    if (
      !chat.modelType ||
      !Object.values(ChatModelType).includes(chat.modelType)
    ) {
      errors.push("Valid model type is required");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate a system prompt for immigration context
   */
  generateImmigrationSystemPrompt(countryCode?: string): string {
    const basePrompt = `You are an AI assistant specialized in immigration matters. 
Your goal is to provide accurate, helpful information about immigration processes, requirements, and regulations.
Always clarify that you're providing general guidance and not legal advice.
When you don't know something specific, acknowledge it and suggest reliable sources for more information.`;

    // Add country-specific guidance if provided
    if (countryCode) {
      return `${basePrompt}
      
Since the user is interested in immigration to ${this.getCountryName(countryCode)}, focus your knowledge on this country's immigration procedures, visa types, residency requirements, citizenship processes, and related information.`;
    }

    return basePrompt;
  }

  /**
   * Convert country code to name
   */
  private getCountryName(countryCode: string): string {
    const countries: Record<string, string> = {
      US: "the United States",
      CA: "Canada",
      UK: "the United Kingdom",
      AU: "Australia",
      NZ: "New Zealand",
      DE: "Germany",
      FR: "France",
      ES: "Spain",
      IT: "Italy",
      JP: "Japan",
      SG: "Singapore",
      AE: "the United Arab Emirates",
      // Add more countries as needed
    };

    return countries[countryCode] || countryCode;
  }

  /**
   * Validate a message before adding it to a chat
   */
  validateChatMessage(message: Omit<ChatMessage, "chatId">): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!message.id || message.id.trim().length === 0) {
      errors.push("Message ID is required");
    }

    if (!["user", "assistant", "system"].includes(message.role)) {
      errors.push("Invalid message role");
    }

    if (!message.content || message.content.trim().length === 0) {
      errors.push("Message content is required");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Calculate token estimation for a given text
   * This is a rough estimation: ~4 chars per token for English text
   */
  estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Check if the chat exceeds model token limits
   */
  exceedsTokenLimit(chat: Chat): boolean {
    // Get token limits based on model
    const tokenLimit = this.getModelTokenLimit(chat.modelType);

    // Estimate tokens in all messages
    const totalTokens = chat.messages.reduce((total, message) => {
      return total + this.estimateTokens(message.content);
    }, 0);

    return totalTokens > tokenLimit;
  }

  /**
   * Get token limit for a model
   */
  private getModelTokenLimit(modelType: ChatModelType): number {
    const tokenLimits: Record<ChatModelType, number> = {
      [ChatModelType.GPT_3_5]: 16385,
      [ChatModelType.GPT_4]: 8192,
      [ChatModelType.GPT_4_VISION]: 128000,
      [ChatModelType.CLAUDE_3_HAIKU]: 200000,
      [ChatModelType.CLAUDE_3_SONNET]: 200000,
      [ChatModelType.CLAUDE_3_OPUS]: 200000,
    };

    return tokenLimits[modelType] || 8000;
  }

  /**
   * Truncate chat history to fit within token limits
   * Keeps most recent messages and removes oldest ones when needed
   */
  truncateChatHistory(chat: Chat, reserveTokens: number = 1000): Chat {
    const tokenLimit = this.getModelTokenLimit(chat.modelType) - reserveTokens;

    if (chat.messages.length <= 2) {
      return chat; // Keep at least the system prompt and last user message
    }

    // Sort messages by creation date (newest first)
    const sortedMessages = [...chat.messages].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    let totalTokens = 0;
    const messagesToKeep: ChatMessage[] = [];

    // Always keep system prompts
    const systemPrompts = sortedMessages.filter((m) => m.role === "system");
    systemPrompts.forEach((message) => {
      totalTokens += this.estimateTokens(message.content);
      messagesToKeep.push(message);
    });

    // Add messages from newest to oldest until we reach the limit
    for (const message of sortedMessages) {
      if (message.role === "system") continue; // Already added

      const messageTokens = this.estimateTokens(message.content);
      if (totalTokens + messageTokens <= tokenLimit) {
        totalTokens += messageTokens;
        messagesToKeep.push(message);
      } else {
        // Stop adding messages once we hit the limit
        break;
      }
    }

    // Resort messages by creation date (oldest first)
    messagesToKeep.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );

    // Create a truncated copy of the chat
    return new Chat({
      ...chat,
      messages: messagesToKeep,
    });
  }

  /**
   * Generate a title for a chat based on the first user message
   */
  generateChatTitle(userMessage: string): string {
    // Truncate the message if it's too long
    const maxLength = 50;
    let title = userMessage.substring(0, maxLength).trim();

    if (title.length === maxLength) {
      title += "...";
    }

    return title || "New Immigration Chat";
  }
}
