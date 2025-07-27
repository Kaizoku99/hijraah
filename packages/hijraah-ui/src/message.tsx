import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Markdown } from "./markdown";
import { CodeBlock } from "./code-block";
// import { TypingIndicator } from "./typing-indicator"; // Unused import
import { cn } from "./styles";

// Context7 Architecture - 7 Pillars Implementation
// 1. Observability - Message interaction analytics and engagement tracking
// 2. Modularity - Factory patterns and composition helpers
// 3. Resumability - Message state preservation and read status
// 4. Tracing - Development-mode debugging and lifecycle tracking
// 5. Data-as-Code - Type-safe message interfaces and configuration
// 6. Provider Isolation - Dedicated style providers and theme management
// 7. Resource Pooling - Performance optimization and singleton managers

// Core Interfaces - Data-as-Code Pattern
export interface MessageContent {
  type: "text" | "code" | "mixed";
  text?: string;
  code?: string;
  language?: string;
  blocks?: Array<{
    type: "text" | "code";
    content: string;
    language?: string;
  }>;
}

export interface MessageData {
  id: string;
  role: "user" | "assistant" | "system";
  content: MessageContent;
  timestamp: Date;
  status?: "sending" | "sent" | "error" | "read";
  avatar?: string;
  name?: string;
  metadata?: Record<string, any>;
}

export interface MessageAnalytics {
  messageId: string;
  renderTime: number;
  readTime?: number;
  interactionCount: number;
  contentClicks: number;
  codeBlockInteractions: number;
  timestamp: number;
}

export interface MessagePerformanceMetrics {
  renderStartTime: number;
  renderEndTime: number;
  contentParseTime: number;
  componentMountTime: number;
  lastInteractionTime?: number;
}

export interface MessageConfig {
  enableAnalytics: boolean;
  enableContentParsing: boolean;
  enableReadTracking: boolean;
  enableInteractionTracking: boolean;
  maxContentLength: number;
  avatarSize: "sm" | "md" | "lg";
  showTimestamp: boolean;
  showStatus: boolean;
  enableDebugMode: boolean;
}

export interface MessageObservability {
  onRender?: (messageId: string, metrics: MessagePerformanceMetrics) => void;
  onContentClick?: (
    messageId: string,
    contentType: string,
    metadata?: any,
  ) => void;
  onRead?: (messageId: string, readTime: number) => void;
  onInteraction?: (
    messageId: string,
    interactionType: string,
    data?: any,
  ) => void;
  onError?: (messageId: string, error: Error) => void;
}

// Resource Pooling - Singleton Managers
class MessagePerformanceManager {
  private static instance: MessagePerformanceManager;
  private metrics = new Map<string, MessagePerformanceMetrics>();
  private readonly CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes
  private readonly MAX_METRICS = 200;

  static getInstance(): MessagePerformanceManager {
    if (!MessagePerformanceManager.instance) {
      MessagePerformanceManager.instance = new MessagePerformanceManager();
    }
    return MessagePerformanceManager.instance;
  }

  private constructor() {
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  trackRender(messageId: string): void {
    const now = performance.now();
    this.metrics.set(messageId, {
      renderStartTime: now,
      renderEndTime: 0,
      contentParseTime: 0,
      componentMountTime: 0,
    });
  }

  finishRender(messageId: string): void {
    const metric = this.metrics.get(messageId);
    if (metric) {
      metric.renderEndTime = performance.now();
      metric.componentMountTime = metric.renderEndTime - metric.renderStartTime;
    }
  }

  trackContentParse(messageId: string, parseTime: number): void {
    const metric = this.metrics.get(messageId);
    if (metric) {
      metric.contentParseTime = parseTime;
    }
  }

  trackInteraction(messageId: string): void {
    const metric = this.metrics.get(messageId);
    if (metric) {
      metric.lastInteractionTime = performance.now();
    }
  }

  getMetrics(messageId: string): MessagePerformanceMetrics | undefined {
    return this.metrics.get(messageId);
  }

  private cleanup(): void {
    if (this.metrics.size > this.MAX_METRICS) {
      const entries = Array.from(this.metrics.entries());
      entries.sort(
        (a, b) => (b[1].renderStartTime || 0) - (a[1].renderStartTime || 0),
      );
      this.metrics.clear();
      entries.slice(0, this.MAX_METRICS).forEach(([id, metric]) => {
        this.metrics.set(id, metric);
      });
    }
  }
}

class MessageAnalyticsManager {
  private static instance: MessageAnalyticsManager;
  private analytics = new Map<string, MessageAnalytics>();
  private readonly CLEANUP_INTERVAL = 15 * 60 * 1000; // 15 minutes
  private readonly MAX_ANALYTICS = 150;

  static getInstance(): MessageAnalyticsManager {
    if (!MessageAnalyticsManager.instance) {
      MessageAnalyticsManager.instance = new MessageAnalyticsManager();
    }
    return MessageAnalyticsManager.instance;
  }

  private constructor() {
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  trackMetric(messageId: string, updates: Partial<MessageAnalytics>): void {
    const existing = this.analytics.get(messageId) || {
      messageId,
      renderTime: 0,
      interactionCount: 0,
      contentClicks: 0,
      codeBlockInteractions: 0,
      timestamp: Date.now(),
    };

    this.analytics.set(messageId, { ...existing, ...updates });
  }

  getAnalytics(messageId: string): MessageAnalytics | undefined {
    return this.analytics.get(messageId);
  }

  getAllAnalytics(): MessageAnalytics[] {
    return Array.from(this.analytics.values());
  }

  private cleanup(): void {
    if (this.analytics.size > this.MAX_ANALYTICS) {
      const entries = Array.from(this.analytics.entries());
      entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
      this.analytics.clear();
      entries.slice(0, this.MAX_ANALYTICS).forEach(([id, analytics]) => {
        this.analytics.set(id, analytics);
      });
    }
  }
}

// Provider Isolation - Style Provider
export interface MessageStyleProviderProps {
  themes?: {
    user?: string;
    assistant?: string;
    system?: string;
  };
  animations?: {
    enabled?: boolean;
    duration?: number;
  };
  spacing?: {
    message?: string;
    content?: string;
    avatar?: string;
  };
}

const MessageStyleProvider: React.FC<{
  children: React.ReactNode;
  config?: MessageStyleProviderProps;
}> = ({ children }) => {
  return (
    <div data-message-style-provider className={cn("message-provider-scope")}>
      {children}
    </div>
  );
};

// Provider Isolation - Observability Provider
export interface MessageObservabilityProviderProps {
  onMessageRender?: (
    messageId: string,
    metrics: MessagePerformanceMetrics,
  ) => void;
  onMessageInteraction?: (messageId: string, type: string, data?: any) => void;
  onMessageRead?: (messageId: string, readTime: number) => void;
  enableGlobalAnalytics?: boolean;
}

const MessageObservabilityProvider: React.FC<{
  children: React.ReactNode;
  config?: MessageObservabilityProviderProps;
}> = ({ children }) => {
  return (
    <div
      data-message-observability-provider
      className={cn("message-observability-scope")}
    >
      {children}
    </div>
  );
};

// Component Variants - CVA Pattern
const messageVariants = cva(
  "relative flex gap-3 p-4 transition-all duration-200 hover:bg-gray-50/50 dark:hover:bg-gray-900/50",
  {
    variants: {
      role: {
        user: "justify-end bg-blue-50/30 dark:bg-blue-950/30 rounded-lg",
        assistant:
          "justify-start bg-white dark:bg-gray-950 rounded-lg shadow-sm border",
        system:
          "justify-center bg-yellow-50/30 dark:bg-yellow-950/30 rounded-lg text-center",
      },
      status: {
        sending: "opacity-70 animate-pulse",
        sent: "opacity-100",
        error:
          "bg-red-50/30 dark:bg-red-950/30 border-red-200 dark:border-red-800",
        read: "opacity-100 bg-green-50/20 dark:bg-green-950/20",
      },
      size: {
        sm: "text-sm gap-2 p-2",
        md: "text-base gap-3 p-4",
        lg: "text-lg gap-4 p-6",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-md transition-shadow",
        false: "",
      },
    },
    defaultVariants: {
      role: "assistant",
      status: "sent",
      size: "md",
      interactive: false,
    },
  },
);

const messageContentVariants = cva("flex-1 min-w-0 space-y-2", {
  variants: {
    role: {
      user: "text-right",
      assistant: "text-left",
      system: "text-center",
    },
  },
  defaultVariants: {
    role: "assistant",
  },
});

// Core Component Props
export interface MessageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role">,
    VariantProps<typeof messageVariants> {
  message: MessageData;
  config?: Partial<MessageConfig>;
  observability?: MessageObservability;
  onContentClick?: (
    messageId: string,
    contentType: string,
    metadata?: any,
  ) => void;
  onMessageRead?: (messageId: string, readTime: number) => void;
  enableInteractionTracking?: boolean;
}

// Content Parsing Utility
const parseMessageContent = (content: MessageContent): MessageContent => {
  if (content.type === "text" && content.text) {
    // Simple code block detection
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const blocks: MessageContent["blocks"] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content.text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textContent = content.text.slice(lastIndex, match.index).trim();
        if (textContent) {
          blocks.push({
            type: "text",
            content: textContent,
          });
        }
      }

      // Add code block
      blocks.push({
        type: "code",
        content: match[2],
        language: match[1] || "text",
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.text.length) {
      const textContent = content.text.slice(lastIndex).trim();
      if (textContent) {
        blocks.push({
          type: "text",
          content: textContent,
        });
      }
    }

    if (blocks.length > 1) {
      return {
        type: "mixed",
        blocks,
      };
    }
  }

  return content;
};

// Core Message Component
export const Message = forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      message,
      config = {},
      observability = {},
      onContentClick,
      onMessageRead,
      enableInteractionTracking = true,
      className,
      role,
      status,
      size,
      interactive,
      ...props
    },
    _ref,
  ) => {
    // State Management - Resumability Pattern
    const [renderMetrics, setRenderMetrics] =
      useState<MessagePerformanceMetrics | null>(null);
    const [readTime, setReadTime] = useState<number | null>(null);
    const [isRead, setIsRead] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Refs for measurements
    const messageRef = useRef<HTMLDivElement>(null);
    const intersectionRef = useRef<IntersectionObserver | null>(null);

    // Resource Pooling - Singleton Managers
    const performanceManager = useMemo(
      () => MessagePerformanceManager.getInstance(),
      [],
    );
    const analyticsManager = useMemo(
      () => MessageAnalyticsManager.getInstance(),
      [],
    );

    // Configuration with defaults
    const finalConfig: MessageConfig = useMemo(
      () => ({
        enableAnalytics: true,
        enableContentParsing: true,
        enableReadTracking: true,
        enableInteractionTracking: true,
        maxContentLength: 10000,
        avatarSize: "md",
        showTimestamp: true,
        showStatus: true,
        enableDebugMode: process.env.NODE_ENV === "development",
        ...config,
      }),
      [config],
    );

    // Observability with defaults
    const finalObservability: MessageObservability = useMemo(
      () => ({
        onRender: () => {},
        onContentClick: () => {},
        onRead: () => {},
        onInteraction: () => {},
        onError: () => {},
        ...observability,
      }),
      [observability],
    );

    // Development mode detection
    const isDevelopment = finalConfig.enableDebugMode;

    // Content parsing with performance tracking
    const parsedContent = useMemo(() => {
      if (!finalConfig.enableContentParsing) return message.content;

      const parseStartTime = performance.now();
      const parsed = parseMessageContent(message.content);
      const parseTime = performance.now() - parseStartTime;

      performanceManager.trackContentParse(message.id, parseTime);

      if (isDevelopment) {
        console.log(
          `[Message:${message.id}] Content parsed in ${parseTime.toFixed(2)}ms`,
        );
      }

      return parsed;
    }, [
      message.content,
      message.id,
      finalConfig.enableContentParsing,
      performanceManager,
      isDevelopment,
    ]);

    // Read tracking with Intersection Observer
    useEffect(() => {
      if (!finalConfig.enableReadTracking || !messageRef.current) return;

      const readStartTime = Date.now();

      intersectionRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isRead) {
            const currentReadTime = Date.now() - readStartTime;
            setReadTime(currentReadTime);
            setIsRead(true);

            finalObservability.onRead?.(message.id, currentReadTime);
            onMessageRead?.(message.id, currentReadTime);

            if (finalConfig.enableAnalytics) {
              analyticsManager.trackMetric(message.id, {
                readTime: currentReadTime,
              });
            }

            if (isDevelopment) {
              console.log(
                `[Message:${message.id}] Read in ${currentReadTime}ms`,
              );
            }
          }
        },
        { threshold: 0.5 },
      );

      intersectionRef.current.observe(messageRef.current);

      return () => {
        intersectionRef.current?.disconnect();
      };
    }, [
      message.id,
      finalConfig.enableReadTracking,
      finalConfig.enableAnalytics,
      isRead,
      finalObservability,
      onMessageRead,
      analyticsManager,
      isDevelopment,
    ]);

    // Performance tracking
    useEffect(() => {
      performanceManager.trackRender(message.id);

      const metrics = performanceManager.getMetrics(message.id);
      if (metrics) {
        setRenderMetrics(metrics);
        finalObservability.onRender?.(message.id, metrics);

        if (finalConfig.enableAnalytics) {
          analyticsManager.trackMetric(message.id, {
            renderTime: metrics.componentMountTime,
          });
        }
      }

      return () => {
        performanceManager.finishRender(message.id);
      };
    }, [
      message.id,
      performanceManager,
      finalObservability,
      finalConfig.enableAnalytics,
      analyticsManager,
    ]);

    // Content click handler
    const handleContentClick = useCallback(
      (contentType: string, metadata?: any) => {
        if (!enableInteractionTracking) return;

        performanceManager.trackInteraction(message.id);

        const interactionCount =
          (renderMetrics?.lastInteractionTime ? 1 : 0) + 1;
        const contentClicks = contentType === "text" ? 1 : 0;
        const codeBlockInteractions = contentType === "code" ? 1 : 0;

        if (finalConfig.enableAnalytics) {
          analyticsManager.trackMetric(message.id, {
            interactionCount,
            contentClicks,
            codeBlockInteractions,
          });
        }

        finalObservability.onContentClick?.(message.id, contentType, metadata);
        onContentClick?.(message.id, contentType, metadata);
        finalObservability.onInteraction?.(message.id, "content-click", {
          contentType,
          metadata,
        });

        if (isDevelopment) {
          console.log(`[Message:${message.id}] Content clicked`, {
            contentType,
            metadata,
          });
        }
      },
      [
        enableInteractionTracking,
        message.id,
        performanceManager,
        renderMetrics,
        finalConfig.enableAnalytics,
        analyticsManager,
        finalObservability,
        onContentClick,
        isDevelopment,
      ],
    );

    // Error handling
    const handleError = useCallback(
      (error: Error) => {
        setHasError(true);
        finalObservability.onError?.(message.id, error);

        if (isDevelopment) {
          console.error(`[Message:${message.id}] Error:`, error);
        }
      },
      [message.id, finalObservability, isDevelopment],
    );

    // Render content based on type
    const renderContent = () => {
      try {
        if (parsedContent.type === "code") {
          return (
            <CodeBlock
              code={parsedContent.code || ""}
              language={parsedContent.language || "text"}
              observability={{
                onCopy: () => handleContentClick("code", { action: "copy" }),
              }}
              config={{ enableAnalytics: finalConfig.enableAnalytics }}
            />
          );
        }

        if (parsedContent.type === "mixed" && parsedContent.blocks) {
          return (
            <div className="space-y-3">
              {parsedContent.blocks.map((block, index) => (
                <div key={index}>
                  {block.type === "text" ? (
                    <Markdown
                      content={block.content}
                      observability={{
                        onLinkClick: (url: string, text: string) =>
                          handleContentClick("text", {
                            action: "link",
                            url,
                            text,
                          }),
                      }}
                      config={{ enableAnalytics: finalConfig.enableAnalytics }}
                    />
                  ) : (
                    <CodeBlock
                      code={block.content}
                      language={block.language || "text"}
                      observability={{
                        onCopy: () =>
                          handleContentClick("code", {
                            action: "copy",
                            blockIndex: index,
                          }),
                      }}
                      config={{ enableAnalytics: finalConfig.enableAnalytics }}
                    />
                  )}
                </div>
              ))}
            </div>
          );
        }

        // Default text content
        return (
          <Markdown
            content={parsedContent.text || ""}
            observability={{
              onLinkClick: (url: string, text: string) =>
                handleContentClick("text", { action: "link", url, text }),
            }}
            config={{ enableAnalytics: finalConfig.enableAnalytics }}
          />
        );
      } catch (error) {
        handleError(error as Error);
        return (
          <div className="text-red-500 bg-red-50 dark:bg-red-950/20 p-2 rounded">
            <p className="text-sm">Error rendering message content</p>
            {isDevelopment && (
              <p className="text-xs mt-1 text-red-400">
                {(error as Error).message}
              </p>
            )}
          </div>
        );
      }
    };

    // Status component
    const renderStatus = () => {
      if (!finalConfig.showStatus) return null;

      const messageStatus = status || message.status || "sent";

      return (
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          {messageStatus === "sending" && <span>Sending...</span>}
          {messageStatus === "sent" && <span>✓</span>}
          {messageStatus === "error" && <span className="text-red-500">✗</span>}
          {messageStatus === "read" && (
            <span className="text-green-500">✓✓</span>
          )}
          {finalConfig.showTimestamp && (
            <span>{message.timestamp.toLocaleTimeString()}</span>
          )}
        </div>
      );
    };

    return (
      <MessageStyleProvider>
        <MessageObservabilityProvider>
          <div
            ref={messageRef}
            className={cn(
              messageVariants({
                role: role || message.role,
                status: (status || message.status) as any,
                size,
                interactive,
              }),
              hasError && "border-red-300 dark:border-red-700",
              className,
            )}
            {...props}
          >
            {/* Avatar */}
            {message.role !== "system" && (
              <Avatar
                className={cn(
                  finalConfig.avatarSize === "sm" && "w-6 h-6",
                  finalConfig.avatarSize === "md" && "w-8 h-8",
                  finalConfig.avatarSize === "lg" && "w-10 h-10",
                )}
              >
                <AvatarImage src={message.avatar} />
                <AvatarFallback>
                  {message.role === "user" ? "U" : "AI"}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Message Content */}
            <div className={cn(messageContentVariants({ role: message.role }))}>
              {/* Header */}
              {(message.name || message.role === "system") && (
                <div className="flex items-center gap-2 mb-1">
                  {message.name && (
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {message.name}
                    </span>
                  )}
                  <Badge
                    variant={
                      message.role === "system" ? "secondary" : "default"
                    }
                    className="text-xs"
                  >
                    {message.role}
                  </Badge>
                </div>
              )}

              {/* Content */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {renderContent()}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-2">
                {renderStatus()}

                {/* Development Debug Info */}
                {isDevelopment && renderMetrics && (
                  <div className="text-xs text-gray-400 space-x-2">
                    <span>
                      Render: {renderMetrics.componentMountTime.toFixed(1)}ms
                    </span>
                    {readTime && <span>Read: {readTime}ms</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </MessageObservabilityProvider>
      </MessageStyleProvider>
    );
  },
);

Message.displayName = "Message";

// Factory Patterns - Modularity
export const createMessage = {
  user: (content: string, options?: Partial<MessageData>): MessageData => ({
    id: crypto.randomUUID(),
    role: "user",
    content: { type: "text", text: content },
    timestamp: new Date(),
    status: "sent",
    ...options,
  }),

  assistant: (
    content: string,
    options?: Partial<MessageData>,
  ): MessageData => ({
    id: crypto.randomUUID(),
    role: "assistant",
    content: { type: "text", text: content },
    timestamp: new Date(),
    status: "sent",
    ...options,
  }),

  system: (content: string, options?: Partial<MessageData>): MessageData => ({
    id: crypto.randomUUID(),
    role: "system",
    content: { type: "text", text: content },
    timestamp: new Date(),
    status: "sent",
    ...options,
  }),

  code: (
    code: string,
    language: string,
    role: "user" | "assistant" = "assistant",
    options?: Partial<MessageData>,
  ): MessageData => ({
    id: crypto.randomUUID(),
    role,
    content: { type: "code", code, language },
    timestamp: new Date(),
    status: "sent",
    ...options,
  }),

  mixed: (
    blocks: MessageContent["blocks"],
    role: "user" | "assistant" = "assistant",
    options?: Partial<MessageData>,
  ): MessageData => ({
    id: crypto.randomUUID(),
    role,
    content: { type: "mixed", blocks },
    timestamp: new Date(),
    status: "sent",
    ...options,
  }),
};

// Composition Helpers - Modularity
export const MessageComposed = {
  UserMessage: forwardRef<
    HTMLDivElement,
    Omit<MessageProps, "message"> & { content: string; name?: string }
  >(({ content, name, ...props }, ref) => (
    <Message
      ref={ref}
      message={createMessage.user(content, { name })}
      {...props}
    />
  )),

  AssistantMessage: forwardRef<
    HTMLDivElement,
    Omit<MessageProps, "message"> & { content: string; name?: string }
  >(({ content, name, ...props }, ref) => (
    <Message
      ref={ref}
      message={createMessage.assistant(content, { name })}
      {...props}
    />
  )),

  SystemMessage: forwardRef<
    HTMLDivElement,
    Omit<MessageProps, "message"> & { content: string }
  >(({ content, ...props }, ref) => (
    <Message ref={ref} message={createMessage.system(content)} {...props} />
  )),

  CodeMessage: forwardRef<
    HTMLDivElement,
    Omit<MessageProps, "message"> & {
      code: string;
      language: string;
      role?: "user" | "assistant";
    }
  >(({ code, language, role = "assistant", ...props }, ref) => (
    <Message
      ref={ref}
      message={createMessage.code(code, language, role)}
      {...props}
    />
  )),
};

// Set display names
MessageComposed.UserMessage.displayName = "MessageComposed.UserMessage";
MessageComposed.AssistantMessage.displayName =
  "MessageComposed.AssistantMessage";
MessageComposed.SystemMessage.displayName = "MessageComposed.SystemMessage";
MessageComposed.CodeMessage.displayName = "MessageComposed.CodeMessage";

// Development Debugging Utilities - Tracing
export const MessageDebug = {
  getPerformanceMetrics: (messageId: string) => {
    return MessagePerformanceManager.getInstance().getMetrics(messageId);
  },

  getAnalytics: (messageId: string) => {
    return MessageAnalyticsManager.getInstance().getAnalytics(messageId);
  },

  getAllAnalytics: () => {
    return MessageAnalyticsManager.getInstance().getAllAnalytics();
  },

  enableGlobalDebugging: () => {
    if (typeof window !== "undefined") {
      (window as any).__MESSAGE_DEBUG__ = {
        performanceManager: MessagePerformanceManager.getInstance(),
        analyticsManager: MessageAnalyticsManager.getInstance(),
        getMetrics: MessageDebug.getPerformanceMetrics,
        getAnalytics: MessageDebug.getAnalytics,
        getAllAnalytics: MessageDebug.getAllAnalytics,
      };
      console.log(
        "Message debugging enabled. Access via window.__MESSAGE_DEBUG__",
      );
    }
  },
};

// Default export
export default Message;

// Types are exported inline above
