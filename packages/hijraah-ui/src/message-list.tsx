import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Message, MessageData, MessageProps } from "./message";
import { TypingIndicator } from "./typing-indicator";
import { cn } from "./styles";

// Context7 Architecture - 7 Pillars Implementation
// 1. Observability - Chat performance analytics and scroll tracking
// 2. Modularity - Factory patterns and composition helpers
// 3. Resumability - Scroll position persistence and message state recovery
// 4. Tracing - Development-mode debugging and lifecycle tracking
// 5. Data-as-Code - Type-safe message list interfaces and configuration
// 6. Provider Isolation - Dedicated style providers and performance management
// 7. Resource Pooling - Virtual scrolling optimization and singleton managers

// Core Interfaces - Data-as-Code Pattern
export interface MessageListData {
  messages: MessageData[];
  isLoading?: boolean;
  isTyping?: boolean;
  typingUsers?: string[];
  hasMoreMessages?: boolean;
  totalMessageCount?: number;
}

export interface MessageListMetrics {
  listId: string;
  totalMessages: number;
  visibleMessages: number;
  renderTime: number;
  scrollPosition: number;
  scrollVelocity: number;
  messageInteractions: number;
  lastScrollTime: number;
  averageFps: number;
  virtualScrollEnabled: boolean;
  memoryUsage: number;
}

export interface MessageListConfig {
  enableVirtualScrolling: boolean;
  enableAnalytics: boolean;
  enableScrollPersistence: boolean;
  enableAutoScroll: boolean;
  enableTypingIndicator: boolean;
  virtualThreshold: number;
  itemHeight: number;
  overscan: number;
  scrollThreshold: number;
  maxMessages: number;
  enableDebugMode: boolean;
  enablePerformanceMonitoring: boolean;
}

export interface MessageListObservability {
  onScroll?: (metrics: MessageListScrollMetrics) => void;
  onMessageVisible?: (messageId: string, index: number) => void;
  onMessageClick?: (messageId: string, index: number) => void;
  onLoadMore?: () => void;
  onScrollToBottom?: () => void;
  onPerformanceUpdate?: (metrics: MessageListMetrics) => void;
  onError?: (error: Error) => void;
}

export interface MessageListScrollMetrics {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  scrollVelocity: number;
  atTop: boolean;
  atBottom: boolean;
  visibleRange: { start: number; end: number };
}

export interface VirtualScrollState {
  startIndex: number;
  endIndex: number;
  offsetY: number;
  totalHeight: number;
  visibleItems: MessageData[];
}

// Resource Pooling - Singleton Managers
class MessageListPerformanceManager {
  private static instance: MessageListPerformanceManager;
  private metrics = new Map<string, MessageListMetrics>();
  private scrollMetrics = new Map<string, MessageListScrollMetrics>();
  private animationFrame: number | null = null;
  private performanceObserver: PerformanceObserver | null = null;
  private readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_METRICS = 100;

  static getInstance(): MessageListPerformanceManager {
    if (!MessageListPerformanceManager.instance) {
      MessageListPerformanceManager.instance =
        new MessageListPerformanceManager();
    }
    return MessageListPerformanceManager.instance;
  }

  private constructor() {
    this.initPerformanceObserver();
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  private initPerformanceObserver(): void {
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes("message-list")) {
            // Track specific message list performance entries
          }
        });
      });

      this.performanceObserver.observe({
        entryTypes: ["measure", "navigation"],
      });
    }
  }

  trackMetric(listId: string, updates: Partial<MessageListMetrics>): void {
    const existing = this.metrics.get(listId) || {
      listId,
      totalMessages: 0,
      visibleMessages: 0,
      renderTime: 0,
      scrollPosition: 0,
      scrollVelocity: 0,
      messageInteractions: 0,
      lastScrollTime: 0,
      averageFps: 60,
      virtualScrollEnabled: false,
      memoryUsage: 0,
    };

    this.metrics.set(listId, { ...existing, ...updates });
  }

  trackScrollMetrics(listId: string, metrics: MessageListScrollMetrics): void {
    this.scrollMetrics.set(listId, metrics);

    // Update performance metrics
    this.trackMetric(listId, {
      scrollPosition: metrics.scrollTop,
      scrollVelocity: metrics.scrollVelocity,
      lastScrollTime: performance.now(),
    });
  }

  getMetrics(listId: string): MessageListMetrics | undefined {
    return this.metrics.get(listId);
  }

  getScrollMetrics(listId: string): MessageListScrollMetrics | undefined {
    return this.scrollMetrics.get(listId);
  }

  startFpsMonitoring(listId: string): void {
    let lastTime = performance.now();
    let frameCount = 0;
    const fpsWindow = 60; // Calculate FPS over 60 frames

    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();

      if (frameCount >= fpsWindow) {
        const fps = Math.round((fpsWindow * 1000) / (currentTime - lastTime));
        this.trackMetric(listId, { averageFps: fps });
        frameCount = 0;
        lastTime = currentTime;
      }

      this.animationFrame = requestAnimationFrame(measureFps);
    };

    this.animationFrame = requestAnimationFrame(measureFps);
  }

  stopFpsMonitoring(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private cleanup(): void {
    if (this.metrics.size > this.MAX_METRICS) {
      const entries = Array.from(this.metrics.entries());
      entries.sort((a, b) => b[1].lastScrollTime - a[1].lastScrollTime);
      this.metrics.clear();
      this.scrollMetrics.clear();

      entries.slice(0, this.MAX_METRICS).forEach(([id, metric]) => {
        this.metrics.set(id, metric);
      });
    }
  }
}

class MessageListVirtualScrollManager {
  private static instance: MessageListVirtualScrollManager;
  private scrollStates = new Map<string, VirtualScrollState>();
  private scrollPositions = new Map<string, number>();

  static getInstance(): MessageListVirtualScrollManager {
    if (!MessageListVirtualScrollManager.instance) {
      MessageListVirtualScrollManager.instance =
        new MessageListVirtualScrollManager();
    }
    return MessageListVirtualScrollManager.instance;
  }

  calculateVirtualState(
    listId: string,
    messages: MessageData[],
    scrollTop: number,
    containerHeight: number,
    itemHeight: number,
    overscan: number = 5,
  ): VirtualScrollState {
    const totalItems = messages.length;
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan,
    );
    const endIndex = Math.min(
      totalItems - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
    );

    const offsetY = startIndex * itemHeight;
    const totalHeight = totalItems * itemHeight;
    const visibleItems = messages.slice(startIndex, endIndex + 1);

    const state: VirtualScrollState = {
      startIndex,
      endIndex,
      offsetY,
      totalHeight,
      visibleItems,
    };

    this.scrollStates.set(listId, state);
    return state;
  }

  saveScrollPosition(listId: string, position: number): void {
    this.scrollPositions.set(listId, position);
  }

  getScrollPosition(listId: string): number {
    return this.scrollPositions.get(listId) || 0;
  }

  getVirtualState(listId: string): VirtualScrollState | undefined {
    return this.scrollStates.get(listId);
  }
}

// Provider Isolation - Style Provider
export interface MessageListStyleConfig {
  variant: "default" | "compact" | "comfortable" | "chat";
  spacing: "tight" | "normal" | "relaxed";
  showDividers: boolean;
  enableAnimations: boolean;
}

const messageListVariants = cva(
  "flex flex-col w-full overflow-hidden bg-background",
  {
    variants: {
      variant: {
        default: "border rounded-lg shadow-sm",
        compact: "space-y-1",
        comfortable: "space-y-4 p-4",
        chat: "h-full max-h-screen bg-transparent",
      },
      spacing: {
        tight: "space-y-1",
        normal: "space-y-2",
        relaxed: "space-y-4",
      },
      animated: {
        true: "transition-all duration-200 ease-in-out",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "normal",
      animated: true,
    },
  },
);

export interface MessageListStyleProviderProps {
  children: React.ReactNode;
  config?: MessageListStyleConfig;
}

const MessageListStyleProvider: React.FC<MessageListStyleProviderProps> = ({
  children,
}) => {
  return (
    <div
      data-message-list-style-provider
      className={cn("message-list-provider-scope")}
    >
      {children}
    </div>
  );
};

// Provider Isolation - Observability Provider
export interface MessageListObservabilityProviderProps {
  children: React.ReactNode;
  config?: MessageListObservability;
}

const MessageListObservabilityProvider: React.FC<
  MessageListObservabilityProviderProps
> = ({ children }) => {
  return (
    <div
      data-message-list-observability-provider
      className={cn("message-list-observability-scope")}
    >
      {children}
    </div>
  );
};

// Component Props
export interface MessageListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onScroll">,
    VariantProps<typeof messageListVariants> {
  data: MessageListData;
  config?: Partial<MessageListConfig>;
  styleConfig?: MessageListStyleConfig;
  observability?: MessageListObservability;
  messageProps?: Partial<MessageProps>;
  onMessageClick?: (message: MessageData, index: number) => void;
  onLoadMore?: () => void;
  className?: string;
  id?: string;
}

export interface MessageListRef {
  scrollToBottom: () => void;
  scrollToTop: () => void;
  scrollToMessage: (messageId: string) => void;
  getScrollMetrics: () => MessageListScrollMetrics | undefined;
  getPerformanceMetrics: () => MessageListMetrics | undefined;
}

// Core MessageList Component
export const MessageList = forwardRef<MessageListRef, MessageListProps>(
  (
    {
      data,
      config = {},
      styleConfig,
      observability = {},
      messageProps = {},
      onMessageClick,
      onLoadMore,
      className,
      id = crypto.randomUUID(),
      variant,
      spacing,
      animated,
      ...props
    },
    ref,
  ) => {
    // Configuration with defaults
    const finalConfig: MessageListConfig = useMemo(
      () => ({
        enableVirtualScrolling: data.messages.length > 50,
        enableAnalytics: true,
        enableScrollPersistence: true,
        enableAutoScroll: true,
        enableTypingIndicator: true,
        virtualThreshold: 50,
        itemHeight: 120,
        overscan: 5,
        scrollThreshold: 100,
        maxMessages: 1000,
        enableDebugMode: process.env.NODE_ENV === "development",
        enablePerformanceMonitoring: true,
        ...config,
      }),
      [config, data.messages.length],
    );

    const finalStyleConfig: MessageListStyleConfig = useMemo(
      () => ({
        variant: "chat",
        spacing: "normal",
        showDividers: false,
        enableAnimations: true,
        ...styleConfig,
      }),
      [styleConfig],
    );

    // Context7 - Tracing: Log style configuration in development
    if (process.env.NODE_ENV === "development" && finalStyleConfig) {
      console.log(
        `[MessageList Context7] Style config applied:`,
        finalStyleConfig,
      );
    }

    // State Management - Resumability Pattern
    const [scrollMetrics, setScrollMetrics] =
      useState<MessageListScrollMetrics | null>(null);
    const [virtualState, setVirtualState] = useState<VirtualScrollState | null>(
      null,
    );
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const [performanceMetrics, setPerformanceMetrics] =
      useState<MessageListMetrics | null>(null);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastScrollTop = useRef<number>(0);
    const lastScrollTime = useRef<number>(0);

    // Resource Pooling - Singleton Managers
    const performanceManager = useMemo(
      () => MessageListPerformanceManager.getInstance(),
      [],
    );
    const virtualScrollManager = useMemo(
      () => MessageListVirtualScrollManager.getInstance(),
      [],
    );

    // Development mode detection
    const isDevelopment = finalConfig.enableDebugMode;

    // Virtual scrolling calculation
    const visibleMessages = useMemo(() => {
      if (!finalConfig.enableVirtualScrolling || !scrollMetrics) {
        return data.messages;
      }

      const containerHeight = containerRef.current?.clientHeight || 400;
      const newVirtualState = virtualScrollManager.calculateVirtualState(
        id,
        data.messages,
        scrollMetrics.scrollTop,
        containerHeight,
        finalConfig.itemHeight,
        finalConfig.overscan,
      );

      setVirtualState(newVirtualState);
      return newVirtualState.visibleItems;
    }, [
      data.messages,
      scrollMetrics,
      finalConfig.enableVirtualScrolling,
      finalConfig.itemHeight,
      finalConfig.overscan,
      virtualScrollManager,
      id,
    ]);

    // Scroll handler with performance tracking
    const handleScroll = useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const currentTime = performance.now();
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        // Calculate scroll velocity
        const timeDelta = currentTime - lastScrollTime.current;
        const scrollDelta = scrollTop - lastScrollTop.current;
        const scrollVelocity =
          timeDelta > 0 ? Math.abs(scrollDelta / timeDelta) : 0;

        // Update refs
        lastScrollTop.current = scrollTop;
        lastScrollTime.current = currentTime;

        // Calculate scroll position states
        const atTop = scrollTop <= finalConfig.scrollThreshold;
        const atBottom =
          scrollTop + clientHeight >=
          scrollHeight - finalConfig.scrollThreshold;

        // Calculate visible range for virtual scrolling
        const visibleRange = virtualState
          ? { start: virtualState.startIndex, end: virtualState.endIndex }
          : { start: 0, end: data.messages.length - 1 };

        const newScrollMetrics: MessageListScrollMetrics = {
          scrollTop,
          scrollHeight,
          clientHeight,
          scrollVelocity,
          atTop,
          atBottom,
          visibleRange,
        };

        setScrollMetrics(newScrollMetrics);
        performanceManager.trackScrollMetrics(id, newScrollMetrics);

        // Observability callbacks
        observability.onScroll?.(newScrollMetrics);

        if (atTop && onLoadMore) {
          observability.onLoadMore?.();
          onLoadMore();
        }

        if (atBottom) {
          observability.onScrollToBottom?.();
        }

        // User scrolling detection
        setIsUserScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsUserScrolling(false);
        }, 150);

        if (isDevelopment) {
          console.log(`[MessageList:${id}] Scroll metrics`, newScrollMetrics);
        }
      },
      [
        finalConfig.scrollThreshold,
        virtualState,
        data.messages.length,
        performanceManager,
        id,
        observability,
        onLoadMore,
        isDevelopment,
      ],
    );

    // Auto-scroll to bottom on new messages
    useEffect(() => {
      if (
        finalConfig.enableAutoScroll &&
        !isUserScrolling &&
        scrollMetrics?.atBottom !== false
      ) {
        const timer = setTimeout(() => {
          containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);

        return () => clearTimeout(timer);
      }
    }, [
      data.messages.length,
      finalConfig.enableAutoScroll,
      isUserScrolling,
      scrollMetrics,
    ]);

    // Performance monitoring
    useEffect(() => {
      if (finalConfig.enablePerformanceMonitoring) {
        performanceManager.startFpsMonitoring(id);

        const updateMetrics = () => {
          const metrics: Partial<MessageListMetrics> = {
            totalMessages: data.messages.length,
            visibleMessages: visibleMessages.length,
            virtualScrollEnabled: finalConfig.enableVirtualScrolling,
            memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
          };

          performanceManager.trackMetric(id, metrics);
          setPerformanceMetrics(performanceManager.getMetrics(id) || null);
          observability.onPerformanceUpdate?.(
            performanceManager.getMetrics(id) as MessageListMetrics,
          );
        };

        const interval = setInterval(updateMetrics, 1000);

        return () => {
          clearInterval(interval);
          performanceManager.stopFpsMonitoring();
        };
      }
    }, [
      finalConfig.enablePerformanceMonitoring,
      data.messages.length,
      visibleMessages.length,
      finalConfig.enableVirtualScrolling,
      performanceManager,
      id,
      observability,
    ]);

    // Scroll position persistence
    useEffect(() => {
      if (finalConfig.enableScrollPersistence) {
        const savedPosition = virtualScrollManager.getScrollPosition(id);
        if (savedPosition > 0 && containerRef.current) {
          containerRef.current.scrollTop = savedPosition;
        }
      }
    }, [finalConfig.enableScrollPersistence, virtualScrollManager, id]);

    // Save scroll position on unmount
    useEffect(() => {
      return () => {
        if (finalConfig.enableScrollPersistence && scrollMetrics) {
          virtualScrollManager.saveScrollPosition(id, scrollMetrics.scrollTop);
        }
      };
    }, [
      finalConfig.enableScrollPersistence,
      scrollMetrics,
      virtualScrollManager,
      id,
    ]);

    // Message click handler
    const handleMessageClick = useCallback(
      (message: MessageData, index: number) => {
        performanceManager.trackMetric(id, {
          messageInteractions:
            (performanceMetrics?.messageInteractions || 0) + 1,
        });

        observability.onMessageClick?.(message.id, index);
        onMessageClick?.(message, index);

        if (isDevelopment) {
          console.log(`[MessageList:${id}] Message clicked`, {
            messageId: message.id,
            index,
          });
        }
      },
      [
        performanceManager,
        id,
        performanceMetrics,
        observability,
        onMessageClick,
        isDevelopment,
      ],
    );

    // Imperative methods via ref
    useImperativeHandle(
      ref,
      () => ({
        scrollToBottom: () => {
          containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
          });
        },
        scrollToTop: () => {
          containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        },
        scrollToMessage: (messageId: string) => {
          const messageIndex = data.messages.findIndex(
            (msg) => msg.id === messageId,
          );
          if (messageIndex !== -1) {
            const scrollTop = messageIndex * finalConfig.itemHeight;
            containerRef.current?.scrollTo({
              top: scrollTop,
              behavior: "smooth",
            });
          }
        },
        getScrollMetrics: () => scrollMetrics || undefined,
        getPerformanceMetrics: () => performanceManager.getMetrics(id),
      }),
      [
        scrollMetrics,
        data.messages,
        finalConfig.itemHeight,
        performanceManager,
        id,
      ],
    );

    // Render virtual scrolling container
    const renderVirtualContent = () => {
      if (!finalConfig.enableVirtualScrolling || !virtualState) {
        return null;
      }

      return (
        <>
          {/* Top spacer */}
          <div style={{ height: virtualState.offsetY }} />

          {/* Visible messages */}
          <div>
            {visibleMessages.map((message, index) => (
              <div
                key={message.id}
                style={{ height: finalConfig.itemHeight }}
                className="flex-shrink-0"
              >
                <Message
                  message={message}
                  onClick={() =>
                    handleMessageClick(message, virtualState.startIndex + index)
                  }
                  observability={{
                    onRender: (messageId) => {
                      observability.onMessageVisible?.(
                        messageId,
                        virtualState.startIndex + index,
                      );
                    },
                  }}
                  {...messageProps}
                />
              </div>
            ))}
          </div>

          {/* Bottom spacer */}
          <div
            style={{
              height:
                virtualState.totalHeight -
                virtualState.offsetY -
                visibleMessages.length * finalConfig.itemHeight,
            }}
          />
        </>
      );
    };

    // Render regular content
    const renderRegularContent = () => {
      return data.messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          onClick={() => handleMessageClick(message, index)}
          observability={{
            onRender: (messageId) => {
              observability.onMessageVisible?.(messageId, index);
            },
          }}
          {...messageProps}
        />
      ));
    };

    // Loading indicator
    const renderLoading = () => {
      if (!data.isLoading) return null;

      return (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          <span className="ml-2 text-sm text-muted-foreground">
            Loading messages...
          </span>
        </div>
      );
    };

    // Typing indicator
    const renderTypingIndicator = () => {
      if (!finalConfig.enableTypingIndicator || !data.isTyping) return null;

      return (
        <div className="px-4 py-2">
          <TypingIndicator
            isVisible={true}
            config={{ dotCount: 3, animationSpeed: "normal" }}
            observability={{
              onAnimationCycle: (cycle) => {
                if (isDevelopment) {
                  console.log(`[MessageList:${id}] Typing indicator cycle`, {
                    cycle,
                  });
                }
              },
            }}
          />
          {data.typingUsers && data.typingUsers.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {data.typingUsers.join(", ")}{" "}
              {data.typingUsers.length === 1 ? "is" : "are"} typing...
            </p>
          )}
        </div>
      );
    };

    if (data.messages.length === 0 && !data.isLoading) {
      return (
        <MessageListStyleProvider>
          <MessageListObservabilityProvider>
            <div
              className={cn(
                messageListVariants({ variant, spacing, animated }),
                className,
              )}
              {...props}
            >
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                <p>No messages yet. Start a conversation!</p>
              </div>
            </div>
          </MessageListObservabilityProvider>
        </MessageListStyleProvider>
      );
    }

    return (
      <MessageListStyleProvider>
        <MessageListObservabilityProvider>
          <div
            className={cn(
              messageListVariants({ variant, spacing, animated }),
              className,
            )}
            {...props}
          >
            {/* Main message container */}
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto scroll-smooth"
              onScroll={handleScroll}
              style={{
                height: finalConfig.enableVirtualScrolling
                  ? virtualState?.totalHeight
                  : "auto",
              }}
            >
              <div ref={listRef} className="space-y-2 p-4">
                {/* Loading indicator at top */}
                {renderLoading()}

                {/* Messages */}
                {finalConfig.enableVirtualScrolling
                  ? renderVirtualContent()
                  : renderRegularContent()}

                {/* Typing indicator */}
                {renderTypingIndicator()}
              </div>
            </div>

            {/* Development debug info */}
            {isDevelopment && performanceMetrics && (
              <div className="bg-gray-100 dark:bg-gray-800 p-2 text-xs space-y-1">
                <div>
                  Messages: {performanceMetrics.totalMessages} / Visible:{" "}
                  {performanceMetrics.visibleMessages}
                </div>
                <div>
                  FPS: {performanceMetrics.averageFps} / Virtual:{" "}
                  {performanceMetrics.virtualScrollEnabled ? "ON" : "OFF"}
                </div>
                <div>
                  Scroll: {scrollMetrics?.scrollTop}px / Velocity:{" "}
                  {scrollMetrics?.scrollVelocity.toFixed(2)}
                </div>
                <div>
                  Memory:{" "}
                  {(performanceMetrics.memoryUsage / 1024 / 1024).toFixed(1)}MB
                </div>
              </div>
            )}
          </div>
        </MessageListObservabilityProvider>
      </MessageListStyleProvider>
    );
  },
);

MessageList.displayName = "MessageList";

// Factory Patterns - Modularity
export const createMessageList = {
  chat: (config?: Partial<MessageListConfig>) => (props: MessageListProps) => (
    <MessageList
      {...props}
      config={{
        enableVirtualScrolling: true,
        enableAutoScroll: true,
        enableTypingIndicator: true,
        ...config,
      }}
      styleConfig={{
        variant: "chat",
        spacing: "normal",
        enableAnimations: true,
        showDividers: false,
      }}
    />
  ),

  compact:
    (config?: Partial<MessageListConfig>) => (props: MessageListProps) => (
      <MessageList
        {...props}
        config={{
          enableVirtualScrolling: false,
          enableAutoScroll: false,
          itemHeight: 80,
          ...config,
        }}
        styleConfig={{
          variant: "compact",
          spacing: "tight",
          enableAnimations: false,
          showDividers: true,
        }}
      />
    ),

  comfortable:
    (config?: Partial<MessageListConfig>) => (props: MessageListProps) => (
      <MessageList
        {...props}
        config={{
          enableVirtualScrolling: true,
          enableAutoScroll: true,
          itemHeight: 150,
          overscan: 10,
          ...config,
        }}
        styleConfig={{
          variant: "comfortable",
          spacing: "relaxed",
          enableAnimations: true,
          showDividers: false,
        }}
      />
    ),
};

// Composition Helpers - Modularity
export const MessageListComposed = {
  ChatMessageList: createMessageList.chat(),
  CompactMessageList: createMessageList.compact(),
  ComfortableMessageList: createMessageList.comfortable(),
};

// Development Debugging Utilities - Tracing
export const MessageListDebug = {
  getPerformanceMetrics: (listId: string) => {
    return MessageListPerformanceManager.getInstance().getMetrics(listId);
  },

  getScrollMetrics: (listId: string) => {
    return MessageListPerformanceManager.getInstance().getScrollMetrics(listId);
  },

  getVirtualState: (listId: string) => {
    return MessageListVirtualScrollManager.getInstance().getVirtualState(
      listId,
    );
  },

  enableGlobalDebugging: () => {
    if (typeof window !== "undefined") {
      (window as any).__MESSAGE_LIST_DEBUG__ = {
        performanceManager: MessageListPerformanceManager.getInstance(),
        virtualScrollManager: MessageListVirtualScrollManager.getInstance(),
        getMetrics: MessageListDebug.getPerformanceMetrics,
        getScrollMetrics: MessageListDebug.getScrollMetrics,
        getVirtualState: MessageListDebug.getVirtualState,
      };
      console.log(
        "MessageList debugging enabled. Access via window.__MESSAGE_LIST_DEBUG__",
      );
    }
  },
};

// Default export
export default MessageList;

// Types are exported inline above
