/**
 * Context7 - Resumable Stream Types
 * 
 * TypeScript type definitions for resumable streaming functionality
 * following Context7 architecture principles and AI SDK v5 patterns.
 */

import type { UIMessage } from '@ai-sdk-tools/store';

/**
 * Context7 - Stream status enumeration
 */
export enum StreamStatus {
  IDLE = 'idle',
  STREAMING = 'streaming', 
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ERROR = 'error',
  RESUMING = 'resuming',
}

/**
 * Context7 - Stream metadata interface
 */
export interface StreamMetadata {
  /** Unique stream identifier */
  streamId: string;
  /** Associated chat session ID */
  chatId: string;
  /** Current stream status */
  status: StreamStatus;
  /** Stream creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
  /** Stream completion timestamp (if completed) */
  completedAt?: Date;
  /** Error information (if error occurred) */
  error?: StreamError;
  /** Current position in stream */
  position?: number;
  /** Total expected stream length (if known) */
  totalLength?: number;
  /** Additional metadata */
  metadata?: Record<string, any>;
}

/**
 * Context7 - Stream error interface
 */
export interface StreamError {
  /** Error code for programmatic handling */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Detailed error information */
  details?: Record<string, any>;
  /** Error timestamp */
  timestamp: Date;
  /** Whether error is retryable */
  retryable: boolean;
  /** Retry count */
  retryCount: number;
}

/**
 * Context7 - Resumable stream configuration
 */
export interface ResumableStreamConfig {
  /** Redis key prefix for stream storage */
  keyPrefix: string;
  /** Stream TTL in seconds */
  ttl: number;
  /** Maximum retry attempts */
  maxRetries: number;
  /** Initial retry delay in milliseconds */
  retryDelay: number;
  /** Retry delay multiplier for exponential backoff */
  retryMultiplier: number;
  /** Maximum retry delay in milliseconds */
  maxRetryDelay: number;
  /** Enable automatic cleanup on completion */
  autoCleanup: boolean;
}

/**
 * Context7 - Resume options
 */
export interface ResumeOptions {
  /** Force resume even if stream appears completed */
  force?: boolean;
  /** Starting position for resume */
  position?: number;
  /** Timeout for resume operation in milliseconds */
  timeout?: number;
  /** Additional context for resume operation */
  context?: Record<string, any>;
}

/**
 * Context7 - Stream event types
 */
export type StreamEventType = 
  | 'start'
  | 'data'
  | 'pause' 
  | 'resume'
  | 'complete'
  | 'error'
  | 'cleanup';

/**
 * Context7 - Stream event interface
 */
export interface StreamEvent {
  /** Event type */
  type: StreamEventType;
  /** Stream ID */
  streamId: string;
  /** Event timestamp */
  timestamp: Date;
  /** Event data (varies by type) */
  data?: any;
  /** Error information (for error events) */
  error?: StreamError;
}

/**
 * Context7 - Stream progress information
 */
export interface StreamProgress {
  /** Current position */
  position: number;
  /** Total length (if known) */
  total?: number;
  /** Progress percentage (0-100) */
  percentage?: number;
  /** Estimated time remaining in milliseconds */
  estimatedTimeRemaining?: number;
}

/**
 * Context7 - Resumable chat hook options
 */
export interface UseResumableChatOptions {
  /** Chat session ID */
  id: string;
  /** Initial messages */
  initialMessages?: UIMessage[];
  /** Enable automatic resume on mount */
  autoResume?: boolean;
  /** Resume timeout in milliseconds */
  resumeTimeout?: number;
  /** Maximum retry attempts */
  maxRetries?: number;
  /** Custom error handler */
  onError?: (error: StreamError) => void;
  /** Custom completion handler */
  onFinish?: (message: UIMessage, allMessages: UIMessage[]) => void;
  /** Custom progress handler */
  onProgress?: (progress: StreamProgress) => void;
  /** Custom stream event handler */
  onStreamEvent?: (event: StreamEvent) => void;
  /** Additional headers for requests */
  headers?: Record<string, string>;
  /** Custom API endpoint */
  api?: string;
}

/**
 * Context7 - Resumable chat hook return type
 */
export interface UseResumableChatResult {
  /** Current messages */
  messages: UIMessage[];
  /** Current input value */
  input: string;
  /** Set input value */
  setInput: (input: string) => void;
  /** Submit message */
  handleSubmit: (e: React.FormEvent) => void;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error?: StreamError;
  /** Current stream metadata */
  streamMetadata?: StreamMetadata;
  /** Resume interrupted stream */
  resume: (options?: ResumeOptions) => Promise<void>;
  /** Stop current stream */
  stop: () => void;
  /** Reload chat */
  reload: () => void;
  /** Clear messages */
  clear: () => void;
}

/**
 * Context7 - Redis stream data structure
 */
export interface RedisStreamData {
  /** Stream content chunks */
  chunks: string[];
  /** Stream metadata */
  metadata: StreamMetadata;
  /** Creation timestamp */
  created: string;
  /** Last update timestamp */
  updated: string;
}

/**
 * Context7 - Supabase stream record
 */
export interface SupabaseStreamRecord {
  /** Primary key */
  id: string;
  /** Associated chat session */
  chat_session_id: string;
  /** Stream ID */
  stream_id: string;
  /** Current status */
  status: StreamStatus;
  /** Stream metadata as JSON */
  metadata: Record<string, any>;
  /** Creation timestamp */
  created_at: string;
  /** Last update timestamp */
  updated_at: string;
  /** Completion timestamp */
  completed_at?: string;
}

/**
 * Context7 - API request/response types
 */
export namespace ResumableStreamAPI {
  export interface CreateStreamRequest {
    chatId: string;
    message: string;
    options?: Record<string, any>;
  }

  export interface CreateStreamResponse {
    streamId: string;
    status: StreamStatus;
    metadata: StreamMetadata;
  }

  export interface GetStreamRequest {
    streamId: string;
  }

  export interface GetStreamResponse {
    streamId: string;
    status: StreamStatus;
    metadata: StreamMetadata;
    chunks?: string[];
  }

  export interface ResumeStreamRequest {
    streamId: string;
    options?: ResumeOptions;
  }

  export interface ResumeStreamResponse {
    streamId: string;
    status: StreamStatus;
    position: number;
    metadata: StreamMetadata;
  }

  export interface DeleteStreamRequest {
    streamId: string;
  }

  export interface DeleteStreamResponse {
    success: boolean;
    streamId: string;
  }
}

/**
 * Context7 - Utility type guards
 */
export namespace StreamTypeGuards {
  export function isStreamError(error: any): error is StreamError {
    return error && typeof error.code === 'string' && typeof error.message === 'string';
  }

  export function isStreamMetadata(data: any): data is StreamMetadata {
    return data && 
           typeof data.streamId === 'string' && 
           typeof data.chatId === 'string' &&
           Object.values(StreamStatus).includes(data.status);
  }

  export function isStreamEvent(event: any): event is StreamEvent {
    return event && 
           typeof event.streamId === 'string' &&
           ['start', 'data', 'pause', 'resume', 'complete', 'error', 'cleanup'].includes(event.type);
  }
}

/**
 * Context7 - Default configuration constants
 */
export const DEFAULT_RESUMABLE_CONFIG: ResumableStreamConfig = {
  keyPrefix: 'resumable:stream:',
  ttl: 3600, // 1 hour
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryMultiplier: 2,
  maxRetryDelay: 10000, // 10 seconds
  autoCleanup: true,
};

/**
 * Context7 - Stream status helpers
 */
export namespace StreamStatusHelpers {
  export function isActive(status: StreamStatus): boolean {
    return [StreamStatus.STREAMING, StreamStatus.RESUMING].includes(status);
  }

  export function isComplete(status: StreamStatus): boolean {
    return [StreamStatus.COMPLETED, StreamStatus.ERROR].includes(status);
  }

  export function canResume(status: StreamStatus): boolean {
    return [StreamStatus.PAUSED, StreamStatus.ERROR].includes(status);
  }

  export function shouldCleanup(status: StreamStatus): boolean {
    return [StreamStatus.COMPLETED, StreamStatus.ERROR].includes(status);
  }
}
