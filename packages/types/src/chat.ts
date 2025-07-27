// Base types
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

type Role = "system" | "user" | "assistant" | "tool";
type VoteType = "up" | "down";
type Visibility = "private" | "public" | "shared";

export interface ChatSession extends BaseEntity {
  userId: string;
  title?: string;
  visibility: Visibility;
  model: string;
  systemPrompt?: string;
  webIndexId?: string;
  metadata: Record<string, any>;
}

export interface ChatMessage extends BaseEntity {
  chatId: string;
  role: Role;
  content: string;
  toolCalls?: ToolCall[];
  attachments?: Attachment[];
  artifacts?: string[]; // Array of artifact IDs
  metadata: Record<string, any>;
}

export interface ChatMessageVote extends BaseEntity {
  messageId: string;
  userId: string;
  voteType: VoteType;
  feedback?: string;
}

export interface Artifact extends BaseEntity {
  messageId?: string;
  userId: string;
  title: string;
  type: ArtifactType;
  language?: string;
  content: string;
  metadata: Record<string, any>;
  isPublic: boolean;
  version: number;
}

export interface Suggestion extends BaseEntity {
  chatId?: string;
  messageId?: string;
  content: string;
  isUsed: boolean;
  metadata: Record<string, any>;
}

export interface Stream extends BaseEntity {
  chatId: string;
  content?: string;
  isFinished: boolean;
  metadata: Record<string, any>;
}

// Tool types
export interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface ToolResult {
  id: string;
  result: any;
  error?: string;
}

// Attachment types
export interface Attachment {
  type: "image" | "file" | "url";
  url?: string;
  name?: string;
  size?: number;
  mimeType?: string;
  content?: string; // For inline content
}

// Artifact types
export type ArtifactType =
  | "code"
  | "text"
  | "image"
  | "sheet"
  | "html"
  | "json"
  | "markdown";

// Chat API types
export interface CreateChatRequest {
  title?: string;
  model?: string;
  systemPrompt?: string;
  webIndexId?: string;
  visibility?: Visibility;
}

export interface SendMessageRequest {
  content: string;
  role?: Role;
  attachments?: Attachment[];
  toolCalls?: ToolCall[];
}

export interface ChatCompletionChunk {
  id: string;
  choices: Array<{
    delta: {
      content?: string;
      role?: Role;
      tool_calls?: ToolCall[];
    };
    finish_reason?: "stop" | "length" | "tool_calls" | null;
  }>;
  created: number;
  model: string;
}
