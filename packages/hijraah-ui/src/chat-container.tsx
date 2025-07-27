"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Card, CardContent } from "./card";
import { ChatHeader } from "./chat-header";
import { MessageList, type MessageListData } from "./message-list";
import {
  MessageInput,
  type MessageInputData,
  type MessageInputSubmitData,
} from "./message-input";
import { Suggestions } from "./suggestions";
import { cn } from "./styles";

// Context7 Architecture - 7 Pillars Implementation
// 1. Observability - Container-level analytics and session tracking
// 2. Modularity - Factory patterns and composition helpers
// 3. Resumability - Complete session state preservation and recovery
// 4. Tracing - Development-mode debugging and interaction tracking
// 5. Data-as-Code - Type-safe container interfaces and configuration
// 6. Provider Isolation - Dedicated style providers and theme management
// 7. Resource Pooling - Performance optimization and singleton managers

// Core Interfaces - Data-as-Code Pattern
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url?: string;
  }>;
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  model: string;
  visibility: "private" | "public" | "team";
  createdAt: Date;
  updatedAt: Date;
  isArchived?: boolean;
  settings?: Record<string, any>;
}

export interface ChatContainerData {
  session: ChatSession;
  availableModels: Array<{
    id: string;
    name: string;
    provider: string;
    description?: string;
  }>;
  isLoading?: boolean;
  error?: string | null;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface ChatContainerConfig {
  enableRealTimeSync?: boolean;
  enableAutoSave?: boolean;
  enableAnalytics?: boolean;
  enableToolPanels?: boolean;
  enableSuggestions?: boolean;
  enableFileUploads?: boolean;
  maxMessageHistory?: number;
  autoSaveInterval?: number;
  enableDebugMode?: boolean;
  enablePerformanceTracking?: boolean;
  readonlyMode?: boolean;
}

export interface ChatContainerStyleConfig {
  variant?: "default" | "compact" | "fullscreen";
  layout?: "standard" | "sidebar" | "panel";
  theme?: "default" | "minimal" | "professional";
  showHeader?: boolean;
  showSuggestions?: boolean;
  enableAnimations?: boolean;
}

export interface ChatContainerPanels {
  research?: {
    isVisible: boolean;
    onToggle: () => void;
    component?: React.ComponentType<any>;
  };
  documents?: {
    isVisible: boolean;
    onToggle: () => void;
    component?: React.ComponentType<any>;
  };
  analytics?: {
    isVisible: boolean;
    onToggle: () => void;
    component?: React.ComponentType<any>;
  };
  artifacts?: {
    isVisible: boolean;
    onToggle: () => void;
    component?: React.ComponentType<any>;
  };
  webscraper?: {
    isVisible: boolean;
    onToggle: () => void;
    component?: React.ComponentType<any>;
  };
}

export interface ChatContainerObservability {
  onSessionStart?: (session: ChatSession) => void;
  onSessionEnd?: (session: ChatSession, context: ChatSessionContext) => void;
  onMessageSent?: (message: ChatMessage, context: ChatMessageContext) => void;
  onMessageReceived?: (
    message: ChatMessage,
    context: ChatMessageContext,
  ) => void;
  onModelChange?: (modelId: string, context: ChatModelContext) => void;
  onError?: (error: ChatContainerError) => void;
  onPanelToggle?: (panel: string, isVisible: boolean) => void;
  onPerformanceMetric?: (metric: ChatPerformanceMetric) => void;
}

export interface ChatSessionContext {
  totalMessages: number;
  sessionDuration: number;
  tokensUsed: number;
  averageResponseTime: number;
}

export interface ChatMessageContext {
  messageIndex: number;
  sessionMessageCount: number;
  responseTime?: number;
  tokenCount?: number;
}

export interface ChatModelContext {
  previousModel: string;
  modelSwitchCount: number;
  sessionTokenUsage: number;
}

export interface ChatContainerError {
  type: "auth" | "network" | "validation" | "api" | "session";
  message: string;
  details?: any;
  recoverable?: boolean;
}

export interface ChatPerformanceMetric {
  type:
    | "render"
    | "message_send"
    | "message_receive"
    | "model_switch"
    | "panel_toggle";
  duration: number;
  timestamp: number;
  details?: Record<string, any>;
}

export interface ChatContainerState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  sessionStartTime: number;
  totalInteractions: number;
  panelsVisible: string[];
  lastActivity: number;
}

// Context7 Pattern: Resource Pooling - Session Management
class ChatContainerSessionManager {
  private static instance: ChatContainerSessionManager;
  private sessions: Map<string, ChatSession> = new Map();
  private autoSaveTimers: Map<string, NodeJS.Timeout> = new Map();

  static getInstance(): ChatContainerSessionManager {
    if (!ChatContainerSessionManager.instance) {
      ChatContainerSessionManager.instance = new ChatContainerSessionManager();
    }
    return ChatContainerSessionManager.instance;
  }

  getSession(sessionId: string): ChatSession | null {
    return this.sessions.get(sessionId) || null;
  }

  saveSession(session: ChatSession): void {
    this.sessions.set(session.id, { ...session, updatedAt: new Date() });
  }

  scheduleAutoSave(
    sessionId: string,
    interval: number,
    callback: () => void,
  ): void {
    this.clearAutoSave(sessionId);
    const timer = setInterval(callback, interval);
    this.autoSaveTimers.set(sessionId, timer);
  }

  clearAutoSave(sessionId: string): void {
    const timer = this.autoSaveTimers.get(sessionId);
    if (timer) {
      clearInterval(timer);
      this.autoSaveTimers.delete(sessionId);
    }
  }

  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
    this.clearAutoSave(sessionId);
  }
}

// Context7 Pattern: Resource Pooling - Performance Tracking
class ChatContainerPerformanceManager {
  private static instance: ChatContainerPerformanceManager;
  private metrics: Map<string, ChatPerformanceMetric[]> = new Map();

  static getInstance(): ChatContainerPerformanceManager {
    if (!ChatContainerPerformanceManager.instance) {
      ChatContainerPerformanceManager.instance =
        new ChatContainerPerformanceManager();
    }
    return ChatContainerPerformanceManager.instance;
  }

  recordMetric(containerId: string, metric: ChatPerformanceMetric): void {
    const existing = this.metrics.get(containerId) || [];
    existing.push(metric);

    // Keep only last 100 metrics per container
    if (existing.length > 100) {
      existing.splice(0, existing.length - 100);
    }

    this.metrics.set(containerId, existing);
  }

  getMetrics(containerId: string): ChatPerformanceMetric[] {
    return this.metrics.get(containerId) || [];
  }

  getAverageMetric(
    containerId: string,
    type: ChatPerformanceMetric["type"],
  ): number {
    const metrics = this.getMetrics(containerId).filter((m) => m.type === type);
    if (metrics.length === 0) return 0;
    return metrics.reduce((sum, m) => sum + m.duration, 0) / metrics.length;
  }
}

// Core Component Props
export interface ChatContainerProps {
  data?: ChatContainerData;
  config?: ChatContainerConfig;
  styleConfig?: ChatContainerStyleConfig;
  observability?: ChatContainerObservability;
  panels?: ChatContainerPanels;
  onSessionChange?: (session: ChatSession) => void;
  onMessageSend?: (message: ChatMessage) => Promise<void>;
  onModelChange?: (modelId: string) => void;
  onVisibilityChange?: (visibility: string) => void;
  className?: string;
  id?: string;
}

// Style Variants
const chatContainerVariants = cva(
  "flex flex-col bg-background transition-colors relative",
  {
    variants: {
      variant: {
        default: "h-full border border-border rounded-lg",
        compact: "h-full border border-border/50 rounded-md",
        fullscreen: "h-screen w-screen border-none rounded-none",
      },
      layout: {
        standard: "max-w-none",
        sidebar: "max-w-4xl mx-auto",
        panel: "max-w-6xl mx-auto",
      },
      theme: {
        default: "",
        minimal: "border-none shadow-none bg-transparent",
        professional: "border-2 shadow-lg bg-card",
      },
    },
    defaultVariants: {
      variant: "default",
      layout: "standard",
      theme: "default",
    },
  },
);

// Core ChatContainer Component
export const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  (
    {
      data = {
        session: {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
          model: "gpt-4o",
          visibility: "private",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        availableModels: [
          { id: "gpt-4o", name: "GPT-4 Omni", provider: "OpenAI" },
          {
            id: "claude-3-5-sonnet",
            name: "Claude 3.5 Sonnet",
            provider: "Anthropic",
          },
        ],
      },
      config = {},
      styleConfig = {},
      observability = {},
      panels = {},
      onSessionChange,
      onMessageSend,
      onModelChange,
      onVisibilityChange,
      className,
      id = crypto.randomUUID(),
      ...props
    },
    ref,
  ) => {
    // Configuration with defaults
    const finalConfig: ChatContainerConfig = useMemo(
      () => ({
        enableRealTimeSync: false, // Simplified for UI package
        enableAutoSave: true,
        enableAnalytics: true,
        enableToolPanels: true,
        enableSuggestions: true,
        enableFileUploads: true,
        maxMessageHistory: 1000,
        autoSaveInterval: 30000, // 30 seconds
        enableDebugMode: process.env.NODE_ENV === "development",
        enablePerformanceTracking: true,
        readonlyMode: false,
        ...config,
      }),
      [config],
    );

    const finalStyleConfig: ChatContainerStyleConfig = useMemo(
      () => ({
        variant: "default",
        layout: "standard",
        theme: "default",
        showHeader: true,
        showSuggestions: true,
        enableAnimations: true,
        ...styleConfig,
      }),
      [styleConfig],
    );

    // State Management - Resumability Pattern
    const [containerState, setContainerState] = useState<ChatContainerState>({
      isLoading: data.isLoading || false,
      error: data.error || null,
      isAuthenticated: !!data.user,
      sessionStartTime: Date.now(),
      totalInteractions: 0,
      panelsVisible: [],
      lastActivity: Date.now(),
    });

    const [currentSession, setCurrentSession] = useState<ChatSession>(
      data.session,
    );
    const [inputValue, setInputValue] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    // Refs for performance tracking
    const renderStartTime = useRef(Date.now());

    // Resource Pooling - Singleton Managers
    const sessionManager = useMemo(
      () => ChatContainerSessionManager.getInstance(),
      [],
    );
    const performanceManager = useMemo(
      () => ChatContainerPerformanceManager.getInstance(),
      [],
    );

    // Context7 - Tracing: Component render tracking
    useEffect(() => {
      if (finalConfig.enablePerformanceTracking) {
        const renderTime = Date.now() - renderStartTime.current;
        performanceManager.recordMetric(id, {
          type: "render",
          duration: renderTime,
          timestamp: Date.now(),
          details: { sessionId: currentSession.id },
        });

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(`[ChatContainer Context7] Rendered in ${renderTime}ms`, {
            id,
            sessionId: currentSession.id,
            messageCount: currentSession.messages.length,
          });
        }
      }
    }, [
      id,
      currentSession.id,
      currentSession.messages.length,
      finalConfig,
      performanceManager,
    ]);

    // Context7 - Resumability: Auto-save functionality
    useEffect(() => {
      if (finalConfig.enableAutoSave) {
        sessionManager.scheduleAutoSave(
          currentSession.id,
          finalConfig.autoSaveInterval!,
          () => {
            sessionManager.saveSession(currentSession);
            if (finalConfig.enableDebugMode) {
              console.log(
                `[ChatContainer Context7] Auto-saved session ${currentSession.id}`,
              );
            }
          },
        );

        return () => {
          sessionManager.clearAutoSave(currentSession.id);
        };
      }
    }, [currentSession, finalConfig, sessionManager]);

    // Context7 - Observability: Session analytics
    useEffect(() => {
      observability.onSessionStart?.(currentSession);

      return () => {
        const sessionContext: ChatSessionContext = {
          totalMessages: currentSession.messages.length,
          sessionDuration: Date.now() - containerState.sessionStartTime,
          tokensUsed: 0, // Would be calculated from actual usage
          averageResponseTime: performanceManager.getAverageMetric(
            id,
            "message_receive",
          ),
        };
        observability.onSessionEnd?.(currentSession, sessionContext);
      };
    }, [currentSession.id]); // Only run when session ID changes

    // Context7 - Modularity: Message submission
    const handleMessageSubmit = useCallback(
      async (submitData: MessageInputSubmitData) => {
        if (finalConfig.readonlyMode) return;

        const sendStartTime = Date.now();
        setIsGenerating(true);
        setContainerState((prev) => ({
          ...prev,
          totalInteractions: prev.totalInteractions + 1,
          lastActivity: Date.now(),
        }));

        try {
          // Create user message
          const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: submitData.text,
            timestamp: new Date(),
            attachments: submitData.attachments
              ?.filter((att) => att.url)
              .map((att) => ({
                id: att.id,
                name: att.name,
                type: att.type,
                url: att.url!,
              })),
          };

          // Add to session
          const updatedSession = {
            ...currentSession,
            messages: [...currentSession.messages, userMessage],
            updatedAt: new Date(),
          };
          setCurrentSession(updatedSession);

          // Context7 - Observability: Message tracking
          const messageContext: ChatMessageContext = {
            messageIndex: updatedSession.messages.length - 1,
            sessionMessageCount: updatedSession.messages.length,
          };
          observability.onMessageSent?.(userMessage, messageContext);

          // Performance tracking
          if (finalConfig.enablePerformanceTracking) {
            performanceManager.recordMetric(id, {
              type: "message_send",
              duration: Date.now() - sendStartTime,
              timestamp: Date.now(),
              details: { messageLength: submitData.text.length },
            });
          }

          // Call external handler
          await onMessageSend?.(userMessage);

          // Simulate AI response (in real implementation, this would come from API)
          setTimeout(
            () => {
              const responseStartTime = Date.now();
              const aiMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: `This is a simulated response to: "${submitData.text.substring(0, 50)}${submitData.text.length > 50 ? "..." : ""}"`,
                timestamp: new Date(),
              };

              setCurrentSession((prev) => ({
                ...prev,
                messages: [...prev.messages, aiMessage],
                updatedAt: new Date(),
              }));

              // Context7 - Observability: Response tracking
              const responseContext: ChatMessageContext = {
                messageIndex: updatedSession.messages.length,
                sessionMessageCount: updatedSession.messages.length + 1,
                responseTime: Date.now() - sendStartTime,
              };
              observability.onMessageReceived?.(aiMessage, responseContext);

              // Performance tracking
              if (finalConfig.enablePerformanceTracking) {
                performanceManager.recordMetric(id, {
                  type: "message_receive",
                  duration: Date.now() - responseStartTime,
                  timestamp: Date.now(),
                  details: { responseLength: aiMessage.content.length },
                });
              }

              setIsGenerating(false);

              // Context7 - Tracing: Development debugging
              if (finalConfig.enableDebugMode) {
                console.log(
                  `[ChatContainer Context7] Message exchange completed`,
                  {
                    userMessage,
                    aiMessage,
                    totalTime: Date.now() - sendStartTime,
                  },
                );
              }
            },
            1000 + Math.random() * 2000,
          ); // Simulate response delay
        } catch (error) {
          setIsGenerating(false);
          const errorObj: ChatContainerError = {
            type: "api",
            message: "Failed to send message",
            details: error,
            recoverable: true,
          };
          setContainerState((prev) => ({ ...prev, error: errorObj.message }));
          observability.onError?.(errorObj);

          if (finalConfig.enableDebugMode) {
            console.error(
              `[ChatContainer Context7] Message send error:`,
              errorObj,
            );
          }
        }
      },
      [
        finalConfig,
        currentSession,
        onMessageSend,
        observability,
        id,
        performanceManager,
      ],
    );

    // Context7 - Modularity: Panel toggle handling
    const handlePanelToggle = useCallback(
      (
        panelName: string,
        panelConfig: ChatContainerPanels[keyof ChatContainerPanels],
      ) => {
        if (!panelConfig) return;

        const toggleStartTime = Date.now();
        panelConfig.onToggle();

        setContainerState((prev) => ({
          ...prev,
          panelsVisible: panelConfig.isVisible
            ? prev.panelsVisible.filter((name) => name !== panelName)
            : [...prev.panelsVisible, panelName],
        }));

        observability.onPanelToggle?.(panelName, !panelConfig.isVisible);

        // Performance tracking
        if (finalConfig.enablePerformanceTracking) {
          performanceManager.recordMetric(id, {
            type: "panel_toggle",
            duration: Date.now() - toggleStartTime,
            timestamp: Date.now(),
            details: { panel: panelName, nowVisible: !panelConfig.isVisible },
          });
        }

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(`[ChatContainer Context7] Panel toggled:`, {
            panel: panelName,
            wasVisible: panelConfig.isVisible,
            nowVisible: !panelConfig.isVisible,
          });
        }
      },
      [observability, finalConfig, id, performanceManager],
    );

    // Context7 - Modularity: Model change handling
    const handleModelChange = useCallback(
      (modelId: string) => {
        const switchStartTime = Date.now();
        const previousModel = currentSession.model;

        setCurrentSession((prev) => ({
          ...prev,
          model: modelId,
          updatedAt: new Date(),
        }));

        onModelChange?.(modelId);

        // Context7 - Observability: Model change tracking
        const modelContext: ChatModelContext = {
          previousModel,
          modelSwitchCount: 1,
          sessionTokenUsage: 0, // Would be calculated from actual usage
        };
        observability.onModelChange?.(modelId, modelContext);

        // Performance tracking
        if (finalConfig.enablePerformanceTracking) {
          performanceManager.recordMetric(id, {
            type: "model_switch",
            duration: Date.now() - switchStartTime,
            timestamp: Date.now(),
            details: { from: previousModel, to: modelId },
          });
        }

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(`[ChatContainer Context7] Model changed:`, {
            from: previousModel,
            to: modelId,
            context: modelContext,
          });
        }
      },
      [
        currentSession.model,
        onModelChange,
        observability,
        finalConfig,
        id,
        performanceManager,
      ],
    );

    // Context7 - Modularity: New session handling
    const handleNewSession = useCallback(() => {
      const newSession: ChatSession = {
        id: crypto.randomUUID(),
        title: "New Chat",
        messages: [],
        model: currentSession.model,
        visibility: currentSession.visibility,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setCurrentSession(newSession);
      setInputValue("");
      setContainerState((prev) => ({
        ...prev,
        sessionStartTime: Date.now(),
        totalInteractions: 0,
        error: null,
      }));

      onSessionChange?.(newSession);

      // Context7 - Tracing: Development debugging
      if (finalConfig.enableDebugMode) {
        console.log(
          `[ChatContainer Context7] New session created:`,
          newSession,
        );
      }
    }, [
      currentSession.model,
      currentSession.visibility,
      onSessionChange,
      finalConfig,
    ]);

    // Prepare data for child components
    const messageListData: MessageListData = {
      messages: currentSession.messages.map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: { type: "text", text: msg.content },
        timestamp: msg.timestamp,
        attachments: msg.attachments,
      })),
      isLoading: isGenerating,
    };

    const messageInputData: MessageInputData = {
      value: inputValue,
      attachments: [],
      isLoading: isGenerating,
      placeholder: finalConfig.readonlyMode
        ? "This chat is read-only"
        : "Type your message...",
      chatId: currentSession.id,
    };

    const chatHeaderData = {
      chatId: currentSession.id,
      title: currentSession.title,
      selectedModel: currentSession.model,
      selectedVisibility: currentSession.visibility,
      availableModels: data.availableModels.map((model) => ({
        id: model.id,
        name: model.name,
        provider: model.provider,
        description: model.description,
        isAvailable: true,
      })),
      visibilityOptions: [
        {
          value: "private" as const,
          label: "Private",
          icon: () => null,
          description: "Only you can view",
        },
        {
          value: "public" as const,
          label: "Public",
          icon: () => null,
          description: "Anyone can view",
        },
        {
          value: "team" as const,
          label: "Team",
          icon: () => null,
          description: "Team members can view",
        },
      ],
      canEdit: !finalConfig.readonlyMode,
    };

    // Style classes
    const containerClasses = chatContainerVariants({
      variant: finalStyleConfig.variant,
      layout: finalStyleConfig.layout,
      theme: finalStyleConfig.theme,
    });

    // Render auth prompt if not authenticated and not readonly
    if (!containerState.isAuthenticated && !finalConfig.readonlyMode) {
      return (
        <Card className="flex h-full items-center justify-center">
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Please sign in to start chatting
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              Sign In
            </button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div ref={ref} className={cn(containerClasses, className)} {...props}>
        {/* Header */}
        {finalStyleConfig.showHeader && (
          <ChatHeader
            data={chatHeaderData}
            config={{
              enableModelSelection: !finalConfig.readonlyMode,
              enableTitleEditing: !finalConfig.readonlyMode,
              enableToolPanels: finalConfig.enableToolPanels,
            }}
            onModelChange={handleModelChange}
            onVisibilityChange={onVisibilityChange}
            onNewSession={handleNewSession}
            toolPanels={{
              research: panels.research
                ? {
                    isVisible: panels.research.isVisible,
                    onToggle: () =>
                      handlePanelToggle("research", panels.research),
                  }
                : undefined,
              documents: panels.documents
                ? {
                    isVisible: panels.documents.isVisible,
                    onToggle: () =>
                      handlePanelToggle("documents", panels.documents),
                  }
                : undefined,
              analytics: panels.analytics
                ? {
                    isVisible: panels.analytics.isVisible,
                    onToggle: () =>
                      handlePanelToggle("analytics", panels.analytics),
                  }
                : undefined,
              webscraper: panels.webscraper
                ? {
                    isVisible: panels.webscraper.isVisible,
                    onToggle: () =>
                      handlePanelToggle("webscraper", panels.webscraper),
                  }
                : undefined,
            }}
            disabled={finalConfig.readonlyMode}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden flex relative">
          {/* Chat Messages Area */}
          <div
            className={cn(
              "flex-1 flex flex-col",
              Object.values(panels).some((panel) => panel?.isVisible) &&
                "mr-80",
            )}
          >
            {/* Message List */}
            <div className="flex-1 overflow-y-auto">
              <MessageList
                data={messageListData}
                config={{
                  enableVirtualScrolling: currentSession.messages.length > 50,
                  enableAutoScroll: true,
                  enableAnalytics: finalConfig.enableAnalytics,
                }}
                className="h-full"
              />
            </div>

            {/* Suggestions */}
            {finalStyleConfig.showSuggestions &&
              finalConfig.enableSuggestions &&
              currentSession.messages.length === 0 && (
                <div className="p-4 border-t">
                  <Suggestions
                    chatId={currentSession.id}
                    append={async (message) => {
                      await handleMessageSubmit({
                        text: message.content,
                        attachments: [],
                        timestamp: Date.now(),
                        chatId: currentSession.id,
                      });
                      return null;
                    }}
                  />
                </div>
              )}

            {/* Message Input */}
            <MessageInput
              data={messageInputData}
              config={{
                enableFileUploads: finalConfig.enableFileUploads,
                enableAnalytics: finalConfig.enableAnalytics,
              }}
              onSubmit={handleMessageSubmit}
              onInputChange={setInputValue}
              disabled={finalConfig.readonlyMode || isGenerating}
            />
          </div>

          {/* Side Panels */}
          {Object.entries(panels).map(([panelName, panel]) => {
            if (!panel?.isVisible || !panel.component) return null;

            const PanelComponent = panel.component;
            return (
              <div
                key={panelName}
                className="w-80 border-l bg-muted/30 flex-shrink-0"
              >
                <PanelComponent
                  chatId={currentSession.id}
                  session={currentSession}
                  onClose={() => handlePanelToggle(panelName, panel)}
                />
              </div>
            );
          })}
        </div>

        {/* Error Display */}
        {containerState.error && (
          <div className="p-4 bg-destructive/10 border-t border-destructive/30 text-destructive text-sm">
            {containerState.error}
            <button
              onClick={() =>
                setContainerState((prev) => ({ ...prev, error: null }))
              }
              className="ml-2 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Performance Metrics (Development) */}
        {finalConfig.enableDebugMode && (
          <div className="absolute bottom-0 left-0 right-0 bg-muted/90 border-t p-2 text-xs text-muted-foreground">
            <div className="flex gap-4">
              <span>Messages: {currentSession.messages.length}</span>
              <span>Interactions: {containerState.totalInteractions}</span>
              <span>Panels: {containerState.panelsVisible.length}</span>
              <span>
                Avg Response:{" "}
                {performanceManager
                  .getAverageMetric(id, "message_receive")
                  .toFixed(0)}
                ms
              </span>
            </div>
          </div>
        )}
      </div>
    );
  },
);

ChatContainer.displayName = "ChatContainer";

// Context7 Pattern: Modularity - Factory Functions
export const createChatContainer = {
  simple: (): ChatContainerProps => ({
    config: {
      enableToolPanels: false,
      enableSuggestions: false,
      enableFileUploads: false,
      enableAnalytics: false,
    },
    styleConfig: {
      variant: "compact",
      theme: "minimal",
      showSuggestions: false,
    },
  }),

  chat: (sessionId?: string): ChatContainerProps => ({
    data: {
      session: {
        id: sessionId || crypto.randomUUID(),
        title: "New Chat",
        messages: [],
        model: "gpt-4o",
        visibility: "private",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      availableModels: [
        { id: "gpt-4o", name: "GPT-4 Omni", provider: "OpenAI" },
        {
          id: "claude-3-5-sonnet",
          name: "Claude 3.5 Sonnet",
          provider: "Anthropic",
        },
      ],
    },
    config: {
      enableToolPanels: true,
      enableSuggestions: true,
      enableFileUploads: true,
      enableAnalytics: true,
    },
    styleConfig: {
      variant: "default",
      showHeader: true,
      showSuggestions: true,
    },
  }),

  professional: (): ChatContainerProps => ({
    config: {
      enableToolPanels: true,
      enableSuggestions: true,
      enableFileUploads: true,
      enableAnalytics: true,
      enableAutoSave: true,
    },
    styleConfig: {
      variant: "default",
      layout: "panel",
      theme: "professional",
      showHeader: true,
      showSuggestions: true,
    },
  }),

  readonly: (session: ChatSession): ChatContainerProps => ({
    data: {
      session,
      availableModels: [],
    },
    config: {
      readonlyMode: true,
      enableToolPanels: false,
      enableSuggestions: false,
      enableFileUploads: false,
      enableAutoSave: false,
    },
    styleConfig: {
      variant: "compact",
      theme: "minimal",
      showSuggestions: false,
    },
  }),
};

// Context7 Pattern: Modularity - Composition Helpers
export const ChatContainerComposed = {
  SimpleChat: createChatContainer.simple(),
  FullChat: createChatContainer.chat(),
  ProfessionalChat: createChatContainer.professional(),
};

export type ChatContainerVariantProps = VariantProps<
  typeof chatContainerVariants
>;
export type ChatContainerRef = HTMLDivElement;
