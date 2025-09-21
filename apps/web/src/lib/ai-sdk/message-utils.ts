/**
 * Enhanced AI SDK v5 Message Utilities
 * 
 * Comprehensive message handling following AI SDK v5 patterns with full support
 * for legacy data migration and advanced message features.
 * 
 * Features:
 * - AI SDK v5 compatible message structures
 * - Legacy chat_messages migration support
 * - Rich metadata and attachment handling
 * - Tool call and result processing
 * - Message validation and type safety
 * - Context preservation during migration
 */
import { CoreMessage } from "ai";
import { EnhancedChatRow, MessageRow, ChatMetadata } from "../../_infrastructure/repositories/ai-chat-repository";

// AI SDK v5 Tool Call/Result types following the new structure
export type ToolCall = {
  toolCallId: string;
  toolName: string;
  args: any;
};

export type ToolResult = {
  toolCallId: string;
  toolName: string;
  result: any;
  isError?: boolean;
};

export type ToolInvocation = {
  toolCallId: string;
  toolName: string;
  args: any;
  state: "call" | "result";
  result?: any;
  isError?: boolean;
};

// Enhanced AI SDK v5 message part types
export type MessagePart = 
  | { type: "text"; text: string }
  | { type: "image"; image: string | Uint8Array | URL; alt?: string }
  | { type: "file"; file: { name: string; url: string; mediaType?: string; size?: number } }
  | { type: "tool-call"; toolCallId: string; toolName: string; args: any }
  | { type: "tool-result"; toolCallId: string; result: any; isError?: boolean }
  | { type: "data"; data: any; metadata?: Record<string, any> }
  | { type: "source"; source: { url: string; title?: string; description?: string; relevance?: number } };

export type MessageAttachment = {
  name: string;
  url: string;
  contentType?: string;
  size?: number;
  metadata?: Record<string, any>;
};

// Enhanced message metadata following AI SDK v5 patterns
export interface MessageMetadata {
  createdAt?: number;
  model?: string;
  totalTokens?: number;
  promptTokens?: number;
  completionTokens?: number;
  temperature?: number;
  finishReason?: string;
  responseTime?: number;
  sources?: Array<{
    url: string;
    title?: string;
    relevance?: number;
  }>;
  context?: {
    caseId?: string;
    category?: string;
    priority?: string;
  };
  legacy?: {
    sessionId?: string;
    migrationVersion?: string;
    originalMetadata?: any;
  };
  [key: string]: any;
}

export type UiMessage = {
  id: string;
  chatId: string;
  role: "user" | "assistant" | "system";
  content: string;
  parts?: MessagePart[];
  attachments?: MessageAttachment[];
  toolInvocations?: ToolInvocation[];
  metadata?: MessageMetadata;
  createdAt: Date;
};

/**
 * Convert AI SDK CoreMessage to database format
 */
export function mapCoreMessageToDb(
  message: CoreMessage,
  chatId: string,
  messageId?: string,
  metadata?: MessageMetadata
): Omit<MessageRow, "id" | "createdAt"> {
  // Extract text content and build parts array
  let textContent = "";
  const parts: MessagePart[] = [];
  const attachments: MessageAttachment[] = [];

  if (typeof message.content === "string") {
    textContent = message.content;
    parts.push({ type: "text", text: message.content });
  } else if (Array.isArray(message.content)) {
    // Handle multi-part content following AI SDK v5 specification
    for (const part of message.content) {
      if (part.type === "text") {
        textContent += part.text + " ";
        parts.push({ type: "text", text: part.text });
      } else if (part.type === "image") {
        // Convert the image to proper format for MessagePart
        let imageData: string | Uint8Array | URL;
        if (part.image instanceof URL) {
          imageData = part.image;
        } else if (typeof part.image === "string") {
          imageData = part.image;
        } else if (part.image instanceof ArrayBuffer) {
          imageData = new Uint8Array(part.image);
        } else {
          imageData = part.image as any; // fallback for other types
        }
        
        parts.push({ 
          type: "image", 
          image: imageData,
          alt: (part as any).alt 
        });
      } else if (part.type === "file") {
        const fileData = {
          name: part.filename || "Unknown File",
          url: typeof part.data === "string" ? part.data : URL.createObjectURL(new Blob([part.data as any])),
          mediaType: part.mediaType,
          size: (part as any).size,
        };
        parts.push({ type: "file", file: fileData });
        attachments.push({
          name: fileData.name,
          url: fileData.url,
          contentType: fileData.mediaType,
          size: fileData.size,
        });
      } else if (part.type === "tool-call") {
        parts.push({
          type: "tool-call",
          toolCallId: part.toolCallId,
          toolName: part.toolName,
          args: (part as any).args || {},
        });
      }
    }
    textContent = textContent.trim();
  }

  return {
    chatId,
    role: message.role,
    parts: parts as any, // JSON field
    attachments: attachments as any, // JSON field
  };
}

/**
 * Convert database message to UI format
 */
export function mapDbMessageToUi(dbMessage: MessageRow): UiMessage {
  const parts = (dbMessage.parts as MessagePart[]) || [];
  const attachments = (dbMessage.attachments as MessageAttachment[]) || [];

  // Extract text content from parts
  let content = "";
  const toolInvocations: ToolInvocation[] = [];

  for (const part of parts) {
    if (part.type === "text") {
      content += part.text + " ";
    } else if (part.type === "tool-call") {
      toolInvocations.push({
        toolCallId: part.toolCallId,
        toolName: part.toolName,
        args: part.args,
        state: "call",
      });
    } else if (part.type === "tool-result") {
      // Find existing tool call and update it
      const existingTool = toolInvocations.find(
        tool => tool.toolCallId === part.toolCallId
      );
      if (existingTool) {
        existingTool.state = "result";
        existingTool.result = part.result;
        existingTool.isError = part.isError;
      } else {
        // Create a new tool invocation for result-only cases
        toolInvocations.push({
          toolCallId: part.toolCallId,
          toolName: "unknown",
          args: {},
          state: "result",
          result: part.result,
          isError: part.isError,
        });
      }
    }
  }

  return {
    id: dbMessage.id,
    chatId: dbMessage.chatId,
    role: dbMessage.role as "user" | "assistant" | "system",
    content: content.trim(),
    parts,
    attachments,
    toolInvocations: toolInvocations.length > 0 ? toolInvocations : undefined,
    createdAt: new Date(dbMessage.createdAt),
  };
}

/**
 * Convert UI message to AI SDK CoreMessage format
 */
export function mapUiMessageToCore(uiMessage: UiMessage): CoreMessage {
  // Handle simple text content
  if (!uiMessage.parts || uiMessage.parts.length === 1 && uiMessage.parts[0].type === "text") {
    return {
      role: uiMessage.role,
      content: uiMessage.content,
    } as CoreMessage;
  }

  // Handle multi-part content
  const content: any[] = [];
  
  for (const part of uiMessage.parts || []) {
    if (part.type === "text") {
      content.push({ type: "text", text: part.text });
    } else if (part.type === "image") {
      content.push({ 
        type: "image", 
        image: part.image,
        ...(part.alt && { alt: part.alt })
      });
    } else if (part.type === "file") {
      content.push({ 
        type: "file", 
        data: part.file.url, 
        filename: part.file.name,
        mediaType: part.file.mediaType || "application/octet-stream"
      });
    } else if (part.type === "tool-call") {
      content.push({
        type: "tool-call",
        toolCallId: part.toolCallId,
        toolName: part.toolName,
        args: part.args,
      });
    } else if (part.type === "tool-result") {
      // Tool results belong in separate tool messages, not in content
      continue;
    }
  }

  return {
    role: uiMessage.role,
    content: content.length > 0 ? content : uiMessage.content,
  } as CoreMessage;
}

/**
 * Enhanced legacy message migration with full data preservation
 */
export function migrateLegacyMessage(
  legacyMessage: {
    id: string;
    session_id: string;
    role: string;
    content: string;
    tool_calls?: any;
    sources?: any;
    metadata?: any;
    tokens?: number;
    created_at: string;
    updated_at?: string;
    user_id?: string;
  },
  chatId: string
): Omit<MessageRow, "id" | "createdAt"> {
  const parts: MessagePart[] = [
    { type: "text", text: legacyMessage.content }
  ];

  // Convert tool calls if present
  if (legacyMessage.tool_calls && Array.isArray(legacyMessage.tool_calls)) {
    for (const toolCall of legacyMessage.tool_calls) {
      parts.push({
        type: "tool-call",
        toolCallId: toolCall.id || `tool_${Date.now()}_${Math.random()}`,
        toolName: toolCall.function?.name || toolCall.name || "unknown",
        args: toolCall.function?.arguments || toolCall.arguments || {},
      });
    }
  }

  const attachments: MessageAttachment[] = [];

  // Convert sources to both parts and attachments
  if (legacyMessage.sources && Array.isArray(legacyMessage.sources)) {
    for (const source of legacyMessage.sources) {
      if (source.url) {
        // Add as source part
        parts.push({
          type: "source",
          source: {
            url: source.url,
            title: source.title,
            description: source.description,
            relevance: source.relevance || source.credibility_score,
          },
        });

        // Also add as attachment for backwards compatibility
        attachments.push({
          name: source.title || source.url,
          url: source.url,
          contentType: "text/html",
          metadata: {
            type: "source",
            relevance: source.relevance || source.credibility_score,
            description: source.description,
          },
        });
      }
    }
  }

  return {
    chatId,
    role: legacyMessage.role,
    parts: parts as any,
    attachments: attachments as any,
  };
}

/**
 * Migrate legacy chat session to enhanced chat format
 */
export function migrateLegacyChat(
  legacyChat: {
    id: string;
    user_id: string;
    title: string | null;
    context: string | null;
    prompt: string | null;
    model: string | null;
    system_prompt: string | null;
    agent_config: any;
    case_id: string | null;
    last_message_at: string | null;
    metadata: any;
    visibility: string;
    created_at: string | null;
    updated_at: string | null;
  }
): {
  id: string;
  userId: string;
  title: string;
  visibility: string;
  model?: string;
  systemPrompt?: string;
  caseId?: string;
  metadata: ChatMetadata;
  createdAt: string;
  updatedAt?: string;
  lastMessageAt?: string;
} {
  // Build enhanced metadata preserving all legacy data
  const metadata: ChatMetadata = {
    // Preserve agent configuration
    agentConfig: legacyChat.agent_config || {},
    
    // Preserve chat settings
    settings: {
      autoSave: true,
      streamingEnabled: true,
      contextWindow: 4096,
    },
    
    // Add business context
    context: {
      purpose: legacyChat.context || undefined,
      category: "migrated",
      tags: ["legacy-migration"],
    },
    
    // Store legacy data for reference
    legacyData: {
      originalPrompt: legacyChat.prompt || undefined,
      migrationVersion: "1.0",
      originalMetadata: legacyChat.metadata,
      originalContext: legacyChat.context,
    },
    
    // Preserve original metadata if it exists
    ...(legacyChat.metadata || {}),
  };

  return {
    id: legacyChat.id,
    userId: legacyChat.user_id,
    title: legacyChat.title || "Untitled Chat",
    visibility: legacyChat.visibility || "private",
    model: legacyChat.model || undefined,
    systemPrompt: legacyChat.system_prompt || undefined,
    caseId: legacyChat.case_id || undefined,
    metadata,
    createdAt: legacyChat.created_at || new Date().toISOString(),
    updatedAt: legacyChat.updated_at || undefined,
    lastMessageAt: legacyChat.last_message_at || undefined,
  };
}

/**
 * Validate message structure with enhanced checks
 */
export function validateMessage(message: Partial<UiMessage>): string[] {
  const errors: string[] = [];

  if (!message.chatId) errors.push("Missing chatId");
  if (!message.role) errors.push("Missing role");
  if (!["user", "assistant", "system"].includes(message.role!)) {
    errors.push("Invalid role");
  }
  if (!message.content && !message.parts?.length) {
    errors.push("Missing content or parts");
  }

  // Validate parts structure
  if (message.parts) {
    for (let i = 0; i < message.parts.length; i++) {
      const part = message.parts[i];
      if (!part.type) {
        errors.push(`Part ${i}: Missing type`);
      }
      
      if (part.type === "text" && !part.text) {
        errors.push(`Part ${i}: Text part missing text content`);
      }
      
      if (part.type === "file" && (!part.file || !part.file.url)) {
        errors.push(`Part ${i}: File part missing file data or URL`);
      }
      
      if (part.type === "tool-call" && (!part.toolCallId || !part.toolName)) {
        errors.push(`Part ${i}: Tool call part missing required fields`);
      }
    }
  }

  // Validate attachments
  if (message.attachments) {
    for (let i = 0; i < message.attachments.length; i++) {
      const attachment = message.attachments[i];
      if (!attachment.name || !attachment.url) {
        errors.push(`Attachment ${i}: Missing name or URL`);
      }
    }
  }

  return errors;
}

/**
 * Create a simple text message
 */
export function createTextMessage(
  chatId: string,
  role: "user" | "assistant" | "system",
  text: string,
  metadata?: MessageMetadata
): Omit<MessageRow, "id" | "createdAt"> {
  return {
    chatId,
    role,
    parts: [{ type: "text", text }] as any,
    attachments: [] as any,
  };
}

/**
 * Create a message with attachments
 */
export function createMessageWithAttachments(
  chatId: string,
  role: "user" | "assistant" | "system",
  text: string,
  attachments: MessageAttachment[],
  metadata?: MessageMetadata
): Omit<MessageRow, "id" | "createdAt"> {
  const parts: MessagePart[] = [{ type: "text", text }];
  
  // Add file parts for attachments
  for (const attachment of attachments) {
    parts.push({
      type: "file",
      file: {
        name: attachment.name,
        url: attachment.url,
        mediaType: attachment.contentType,
        size: attachment.size,
      },
    });
  }

  return {
    chatId,
    role,
    parts: parts as any,
    attachments: attachments as any,
  };
}

/**
 * Create a message with tool calls
 */
export function createMessageWithToolCalls(
  chatId: string,
  role: "assistant",
  text: string,
  toolCalls: Array<{
    id: string;
    name: string;
    args: any;
    result?: any;
    isError?: boolean;
  }>,
  metadata?: MessageMetadata
): Omit<MessageRow, "id" | "createdAt"> {
  const parts: MessagePart[] = [{ type: "text", text }];
  
  // Add tool call and result parts
  for (const tool of toolCalls) {
    parts.push({
      type: "tool-call",
      toolCallId: tool.id,
      toolName: tool.name,
      args: tool.args,
    });
    
    if (tool.result !== undefined) {
      parts.push({
        type: "tool-result",
        toolCallId: tool.id,
        result: tool.result,
        isError: tool.isError,
      });
    }
  }

  return {
    chatId,
    role,
    parts: parts as any,
    attachments: [] as any,
  };
}

/**
 * Extract text content from message parts
 */
export function extractTextFromParts(parts: MessagePart[]): string {
  return parts
    .filter(part => part.type === "text")
    .map(part => part.text)
    .join(" ");
}

/**
 * Extract sources from message parts
 */
export function extractSourcesFromParts(parts: MessagePart[]): Array<{
  url: string;
  title?: string;
  description?: string;
  relevance?: number;
}> {
  return parts
    .filter(part => part.type === "source")
    .map(part => part.source);
}

/**
 * Extract tool calls from message parts
 */
export function extractToolCallsFromParts(parts: MessagePart[]): Array<{
  id: string;
  name: string;
  args: any;
  result?: any;
  isError?: boolean;
}> {
  const toolCalls: Record<string, any> = {};
  
  for (const part of parts) {
    if (part.type === "tool-call") {
      toolCalls[part.toolCallId] = {
        id: part.toolCallId,
        name: part.toolName,
        args: part.args,
      };
    } else if (part.type === "tool-result") {
      if (toolCalls[part.toolCallId]) {
        toolCalls[part.toolCallId].result = part.result;
        toolCalls[part.toolCallId].isError = part.isError;
      }
    }
  }
  
  return Object.values(toolCalls);
}

/**
 * Get message statistics
 */
export function getMessageStats(message: UiMessage): {
  textLength: number;
  partCount: number;
  attachmentCount: number;
  toolCallCount: number;
  hasImages: boolean;
  hasFiles: boolean;
} {
  const parts = message.parts || [];
  
  return {
    textLength: message.content.length,
    partCount: parts.length,
    attachmentCount: message.attachments?.length || 0,
    toolCallCount: parts.filter(p => p.type === "tool-call").length,
    hasImages: parts.some(p => p.type === "image"),
    hasFiles: parts.some(p => p.type === "file"),
  };
}
