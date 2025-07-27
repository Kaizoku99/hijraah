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
import {
  Copy,
  Share2,
  Lock,
  Globe,
  Users,
  ChevronDown,
  Search,
  Globe2,
  PlusCircle,
  Settings2,
  BarChartHorizontal,
  Pencil,
  Download,
  Check,
  X,
  FileText,
} from "lucide-react";
import { cn } from "./styles";

// Context7 Architecture - 7 Pillars Implementation
// 1. Observability - Header interaction analytics and model usage tracking
// 2. Modularity - Factory patterns and composition helpers
// 3. Resumability - Header state preservation and session management
// 4. Tracing - Development-mode debugging and interaction tracking
// 5. Data-as-Code - Type-safe header interfaces and configuration
// 6. Provider Isolation - Dedicated style providers and theme management
// 7. Resource Pooling - Performance optimization and singleton managers

// Core Interfaces - Data-as-Code Pattern
export interface ChatHeaderModel {
  id: string;
  name: string;
  provider: string;
  description?: string;
  isAvailable?: boolean;
  maxTokens?: number;
  costPerToken?: number;
}

export interface ChatHeaderVisibilityOption {
  value: "private" | "public" | "team";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export interface ChatHeaderSession {
  id: string;
  title: string;
  lastModified: Date;
  messageCount: number;
  isArchived?: boolean;
}

export interface ChatHeaderData {
  chatId: string;
  title: string;
  selectedModel: string;
  selectedVisibility: "private" | "public" | "team";
  availableModels: ChatHeaderModel[];
  visibilityOptions: ChatHeaderVisibilityOption[];
  sessions?: ChatHeaderSession[];
  isArchived?: boolean;
  canEdit?: boolean;
}

export interface ChatHeaderConfig {
  enableModelSelection?: boolean;
  enableVisibilityControls?: boolean;
  enableTitleEditing?: boolean;
  enableSessionManagement?: boolean;
  enableSharing?: boolean;
  enableArchiving?: boolean;
  enableAnalytics?: boolean;
  enableToolPanels?: boolean;
  autoSaveTitle?: boolean;
  sessionLimit?: number;
  enableDebugMode?: boolean;
  enablePerformanceTracking?: boolean;
}

export interface ChatHeaderStyleConfig {
  variant?: "default" | "compact" | "minimal";
  size?: "sm" | "md" | "lg";
  theme?: "default" | "gradient" | "minimal";
  showModelBadge?: boolean;
  showVisibilityIcon?: boolean;
  showSessionCount?: boolean;
  enableAnimations?: boolean;
}

export interface ChatHeaderObservability {
  onModelChange?: (
    model: ChatHeaderModel,
    context: ChatHeaderModelContext,
  ) => void;
  onVisibilityChange?: (
    visibility: string,
    context: ChatHeaderVisibilityContext,
  ) => void;
  onTitleChange?: (title: string, context: ChatHeaderTitleContext) => void;
  onSessionChange?: (
    sessionId: string,
    context: ChatHeaderSessionContext,
  ) => void;
  onToolToggle?: (
    tool: string,
    isVisible: boolean,
    context: ChatHeaderToolContext,
  ) => void;
  onShare?: (shareData: ChatHeaderShareData) => void;
  onArchive?: (chatId: string) => void;
  onDelete?: (chatId: string) => void;
}

export interface ChatHeaderModelContext {
  previousModel: string;
  modelSwitchCount: number;
  sessionDuration: number;
  averageTokensUsed: number;
}

export interface ChatHeaderVisibilityContext {
  previousVisibility: string;
  visibilityChangeCount: number;
  shareCount: number;
}

export interface ChatHeaderTitleContext {
  previousTitle: string;
  titleEditCount: number;
  characterCount: number;
  editDuration: number;
}

export interface ChatHeaderSessionContext {
  totalSessions: number;
  activeSessionDuration: number;
  sessionSwitchCount: number;
}

export interface ChatHeaderToolContext {
  toolUsageCount: number;
  sessionToolUsage: string[];
  averageToolDuration: number;
}

export interface ChatHeaderShareData {
  chatId: string;
  title: string;
  visibility: string;
  shareMethod: "link" | "export" | "embed";
  timestamp: number;
}

export interface ChatHeaderPerformanceMetrics {
  renderTime: number;
  titleEditTime: number;
  modelSwitchTime: number;
  shareTime: number;
  totalInteractions: number;
  toolToggleCount: number;
}

// Context7 Pattern: Resource Pooling - Performance Management
class ChatHeaderPerformanceManager {
  private static instance: ChatHeaderPerformanceManager;
  private metrics: Map<string, ChatHeaderPerformanceMetrics> = new Map();

  static getInstance(): ChatHeaderPerformanceManager {
    if (!ChatHeaderPerformanceManager.instance) {
      ChatHeaderPerformanceManager.instance =
        new ChatHeaderPerformanceManager();
    }
    return ChatHeaderPerformanceManager.instance;
  }

  recordRenderTime(headerId: string, renderTime: number): void {
    const existing = this.metrics.get(headerId) || this.createDefaultMetrics();
    this.metrics.set(headerId, { ...existing, renderTime });
  }

  recordTitleEdit(headerId: string, editTime: number): void {
    const existing = this.metrics.get(headerId) || this.createDefaultMetrics();
    this.metrics.set(headerId, { ...existing, titleEditTime: editTime });
  }

  recordModelSwitch(headerId: string, switchTime: number): void {
    const existing = this.metrics.get(headerId) || this.createDefaultMetrics();
    this.metrics.set(headerId, { ...existing, modelSwitchTime: switchTime });
  }

  recordInteraction(headerId: string): void {
    const existing = this.metrics.get(headerId) || this.createDefaultMetrics();
    this.metrics.set(headerId, {
      ...existing,
      totalInteractions: existing.totalInteractions + 1,
    });
  }

  recordToolToggle(headerId: string): void {
    const existing = this.metrics.get(headerId) || this.createDefaultMetrics();
    this.metrics.set(headerId, {
      ...existing,
      toolToggleCount: existing.toolToggleCount + 1,
    });
  }

  getMetrics(headerId: string): ChatHeaderPerformanceMetrics | null {
    return this.metrics.get(headerId) || null;
  }

  private createDefaultMetrics(): ChatHeaderPerformanceMetrics {
    return {
      renderTime: 0,
      titleEditTime: 0,
      modelSwitchTime: 0,
      shareTime: 0,
      totalInteractions: 0,
      toolToggleCount: 0,
    };
  }
}

// Context7 Pattern: Resource Pooling - Session Management
class ChatHeaderSessionManager {
  private static instance: ChatHeaderSessionManager;
  private sessions: Map<string, ChatHeaderSession[]> = new Map();

  static getInstance(): ChatHeaderSessionManager {
    if (!ChatHeaderSessionManager.instance) {
      ChatHeaderSessionManager.instance = new ChatHeaderSessionManager();
    }
    return ChatHeaderSessionManager.instance;
  }

  getSessions(userId: string): ChatHeaderSession[] {
    return this.sessions.get(userId) || [];
  }

  addSession(userId: string, session: ChatHeaderSession): void {
    const existing = this.getSessions(userId);
    this.sessions.set(userId, [session, ...existing]);
  }

  updateSession(
    userId: string,
    sessionId: string,
    updates: Partial<ChatHeaderSession>,
  ): void {
    const sessions = this.getSessions(userId);
    const updated = sessions.map((session) =>
      session.id === sessionId ? { ...session, ...updates } : session,
    );
    this.sessions.set(userId, updated);
  }

  removeSession(userId: string, sessionId: string): void {
    const sessions = this.getSessions(userId);
    this.sessions.set(
      userId,
      sessions.filter((s) => s.id !== sessionId),
    );
  }
}

// Default Data
const defaultModels: ChatHeaderModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4 Omni",
    provider: "OpenAI",
    description: "Latest GPT-4 model with vision and reasoning",
    isAvailable: true,
    maxTokens: 128000,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4 Omni Mini",
    provider: "OpenAI",
    description: "Faster, cost-effective GPT-4 variant",
    isAvailable: true,
    maxTokens: 128000,
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Advanced reasoning and analysis",
    isAvailable: true,
    maxTokens: 200000,
  },
];

const defaultVisibilityOptions: ChatHeaderVisibilityOption[] = [
  {
    value: "private",
    label: "Private",
    icon: Lock,
    description: "Only you can view this chat",
  },
  {
    value: "public",
    label: "Public",
    icon: Globe,
    description: "Anyone with the link can view this chat",
  },
  {
    value: "team",
    label: "Team",
    icon: Users,
    description: "Your team members can view this chat",
  },
];

// Core Component Props
export interface ChatHeaderProps {
  data?: ChatHeaderData;
  config?: ChatHeaderConfig;
  styleConfig?: ChatHeaderStyleConfig;
  observability?: ChatHeaderObservability;
  onNewSession?: () => void;
  onModelChange?: (modelId: string) => void;
  onVisibilityChange?: (visibility: string) => void;
  onTitleChange?: (title: string) => void;
  onSessionChange?: (sessionId: string) => void;
  toolPanels?: {
    research?: { isVisible: boolean; onToggle: () => void };
    documents?: { isVisible: boolean; onToggle: () => void };
    analytics?: { isVisible: boolean; onToggle: () => void };
    artifacts?: { isVisible: boolean; onToggle: () => void };
    webscraper?: { isVisible: boolean; onToggle: () => void };
  };
  disabled?: boolean;
  className?: string;
  id?: string;
}

// Style Variants
const chatHeaderVariants = cva(
  "flex items-center justify-between border-b bg-background px-4 transition-colors",
  {
    variants: {
      variant: {
        default: "h-14 border-border",
        compact: "h-12 border-border/50 bg-muted/30",
        minimal: "h-10 border-none bg-transparent",
      },
      size: {
        sm: "px-2 gap-1",
        md: "px-4 gap-2",
        lg: "px-6 gap-3",
      },
      theme: {
        default: "",
        gradient: "bg-gradient-to-r from-background to-muted/30",
        minimal: "border-none shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      theme: "default",
    },
  },
);

const titleVariants = cva("font-medium transition-colors", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    editable: {
      true: "cursor-text hover:text-muted-foreground",
      false: "cursor-default",
    },
  },
  defaultVariants: {
    size: "md",
    editable: false,
  },
});

// Core ChatHeader Component
export const ChatHeader = forwardRef<HTMLDivElement, ChatHeaderProps>(
  (
    {
      data = {
        chatId: crypto.randomUUID(),
        title: "New Chat",
        selectedModel: "gpt-4o",
        selectedVisibility: "private",
        availableModels: defaultModels,
        visibilityOptions: defaultVisibilityOptions,
        canEdit: true,
      },
      config = {},
      styleConfig = {},
      observability = {},
      onNewSession,
      onModelChange,
      onVisibilityChange,
      onTitleChange,
      onSessionChange,
      toolPanels = {},
      disabled = false,
      className,
      id = crypto.randomUUID(),
      ...props
    },
    ref,
  ) => {
    // Configuration with defaults
    const finalConfig: ChatHeaderConfig = useMemo(
      () => ({
        enableModelSelection: true,
        enableVisibilityControls: true,
        enableTitleEditing: true,
        enableSessionManagement: true,
        enableSharing: true,
        enableArchiving: false,
        enableAnalytics: true,
        enableToolPanels: true,
        autoSaveTitle: true,
        sessionLimit: 50,
        enableDebugMode: process.env.NODE_ENV === "development",
        enablePerformanceTracking: true,
        ...config,
      }),
      [config],
    );

    const finalStyleConfig: ChatHeaderStyleConfig = useMemo(
      () => ({
        variant: "default",
        size: "md",
        theme: "default",
        showModelBadge: true,
        showVisibilityIcon: true,
        showSessionCount: false,
        enableAnimations: true,
        ...styleConfig,
      }),
      [styleConfig],
    );

    // State Management - Resumability Pattern
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(data.title);
    const [isSavingTitle, setIsSavingTitle] = useState(false);
    const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const [performanceMetrics, setPerformanceMetrics] =
      useState<ChatHeaderPerformanceMetrics | null>(null);

    // Refs
    const titleInputRef = useRef<HTMLInputElement>(null);

    // Resource Pooling - Singleton Managers
    const performanceManager = useMemo(
      () => ChatHeaderPerformanceManager.getInstance(),
      [],
    );

    const sessionManager = useMemo(
      () => ChatHeaderSessionManager.getInstance(),
      [],
    );

    // Context7 - Tracing: Component render tracking
    const renderStartTime = useRef(Date.now());
    useEffect(() => {
      if (finalConfig.enablePerformanceTracking) {
        const renderTime = Date.now() - renderStartTime.current;
        performanceManager.recordRenderTime(id, renderTime);
        setPerformanceMetrics(performanceManager.getMetrics(id));

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(`[ChatHeader Context7] Rendered in ${renderTime}ms`, {
            id,
            chatId: data.chatId,
            config: finalConfig,
            styleConfig: finalStyleConfig,
          });
        }
      }
    }, [id, data.chatId, finalConfig, finalStyleConfig, performanceManager]);

    // Context7 - Resumability: Session restoration on mount
    useEffect(() => {
      if (finalConfig.enableSessionManagement && data.chatId) {
        // In a real implementation, you would restore session data here
        // For now, we'll just ensure the session manager is initialized
        const userId = "current-user"; // This would come from auth context
        const existingSessions = sessionManager.getSessions(userId);

        if (finalConfig.enableDebugMode) {
          console.log(`[ChatHeader Context7] Session restored:`, {
            chatId: data.chatId,
            existingSessionCount: existingSessions.length,
          });
        }
      }
    }, [data.chatId, finalConfig, sessionManager]);

    // Context7 - Modularity: Title editing
    const handleTitleEdit = useCallback(() => {
      if (!finalConfig.enableTitleEditing || !data.canEdit || disabled) return;

      const editStartTime = Date.now();
      setIsEditingTitle(true);
      performanceManager.recordInteraction(id);

      // Focus input after state update
      setTimeout(() => {
        titleInputRef.current?.focus();
        titleInputRef.current?.select();
      }, 0);

      // Context7 - Tracing: Development debugging
      if (finalConfig.enableDebugMode) {
        console.log(`[ChatHeader Context7] Title editing started`, {
          previousTitle: currentTitle,
          editStartTime,
        });
      }
    }, [
      finalConfig,
      data.canEdit,
      disabled,
      id,
      performanceManager,
      currentTitle,
    ]);

    const handleTitleSave = useCallback(async () => {
      if (!currentTitle.trim() || currentTitle === data.title) {
        setCurrentTitle(data.title);
        setIsEditingTitle(false);
        return;
      }

      const editStartTime = Date.now();
      setIsSavingTitle(true);

      try {
        await onTitleChange?.(currentTitle.trim());

        // Context7 - Observability: Title change tracking
        const titleContext: ChatHeaderTitleContext = {
          previousTitle: data.title,
          titleEditCount: 1,
          characterCount: currentTitle.length,
          editDuration: Date.now() - editStartTime,
        };

        observability.onTitleChange?.(currentTitle.trim(), titleContext);

        const editTime = Date.now() - editStartTime;
        performanceManager.recordTitleEdit(id, editTime);

        // Context7 - Resumability: Update session with new title
        if (finalConfig.enableSessionManagement) {
          const userId = "current-user"; // This would come from auth context
          sessionManager.updateSession(userId, data.chatId, {
            title: currentTitle.trim(),
            lastModified: new Date(),
          });
        }

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(`[ChatHeader Context7] Title saved:`, titleContext);
        }
      } catch (error) {
        // Reset on error
        setCurrentTitle(data.title);

        if (finalConfig.enableDebugMode) {
          console.error(`[ChatHeader Context7] Title save error:`, error);
        }
      } finally {
        setIsSavingTitle(false);
        setIsEditingTitle(false);
      }
    }, [
      currentTitle,
      data.title,
      data.chatId,
      onTitleChange,
      observability,
      id,
      performanceManager,
      sessionManager,
      finalConfig,
    ]);

    const handleTitleCancel = useCallback(() => {
      setCurrentTitle(data.title);
      setIsEditingTitle(false);
    }, [data.title]);

    const handleTitleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleTitleSave();
        } else if (e.key === "Escape") {
          handleTitleCancel();
        }
      },
      [handleTitleSave, handleTitleCancel],
    );

    // Context7 - Modularity: Model selection
    const handleModelChange = useCallback(
      (modelId: string) => {
        const switchStartTime = Date.now();
        const previousModel = data.selectedModel;
        const newModel = data.availableModels.find((m) => m.id === modelId);

        if (!newModel || modelId === previousModel) return;

        onModelChange?.(modelId);
        performanceManager.recordInteraction(id);

        // Context7 - Observability: Model change tracking
        const modelContext: ChatHeaderModelContext = {
          previousModel,
          modelSwitchCount: 1,
          sessionDuration: Date.now() - renderStartTime.current,
          averageTokensUsed: 0, // Would be calculated from actual usage
        };

        observability.onModelChange?.(newModel, modelContext);

        const switchTime = Date.now() - switchStartTime;
        performanceManager.recordModelSwitch(id, switchTime);

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(`[ChatHeader Context7] Model changed:`, {
            from: previousModel,
            to: modelId,
            model: newModel,
            context: modelContext,
          });
        }

        setIsModelDropdownOpen(false);
      },
      [
        data.selectedModel,
        data.availableModels,
        onModelChange,
        id,
        performanceManager,
        observability,
        finalConfig,
      ],
    );

    // Note: Visibility controls will be implemented when the UI dropdown is added
    // The handleVisibilityChange logic will be integrated at that time

    // Context7 - Modularity: Tool panel toggles
    const handleToolToggle = useCallback(
      (toolName: string, onToggle: () => void, isVisible: boolean) => {
        onToggle();
        performanceManager.recordToolToggle(id);

        // Context7 - Observability: Tool toggle tracking
        const toolContext: ChatHeaderToolContext = {
          toolUsageCount: 1,
          sessionToolUsage: [toolName],
          averageToolDuration: 0, // Would be calculated from actual usage
        };

        observability.onToolToggle?.(toolName, !isVisible, toolContext);

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(`[ChatHeader Context7] Tool toggled:`, {
            tool: toolName,
            wasVisible: isVisible,
            nowVisible: !isVisible,
            context: toolContext,
          });
        }
      },
      [id, performanceManager, observability, finalConfig],
    );

    // Context7 - Modularity: Share functionality
    const handleShare = useCallback(
      (shareMethod: "link" | "export" | "embed" = "link") => {
        const shareData: ChatHeaderShareData = {
          chatId: data.chatId,
          title: currentTitle,
          visibility: data.selectedVisibility,
          shareMethod,
          timestamp: Date.now(),
        };

        // Copy link to clipboard for link sharing
        if (shareMethod === "link") {
          const shareUrl = `${window.location.origin}/chat/shared/${data.chatId}`;
          navigator.clipboard.writeText(shareUrl);
        }

        observability.onShare?.(shareData);
        performanceManager.recordInteraction(id);

        // Context7 - Tracing: Development debugging
        if (finalConfig.enableDebugMode) {
          console.log(`[ChatHeader Context7] Content shared:`, shareData);
        }

        setIsShareDropdownOpen(false);
      },
      [
        data.chatId,
        data.selectedVisibility,
        currentTitle,
        observability,
        id,
        performanceManager,
        finalConfig,
      ],
    );

    // Current model and visibility option
    const currentModel = data.availableModels.find(
      (m) => m.id === data.selectedModel,
    );
    const currentVisibilityOption = data.visibilityOptions.find(
      (v) => v.value === data.selectedVisibility,
    );

    // Style classes
    const containerClasses = chatHeaderVariants({
      variant: finalStyleConfig.variant,
      size: finalStyleConfig.size,
      theme: finalStyleConfig.theme,
    });

    const titleClasses = titleVariants({
      size: finalStyleConfig.size,
      editable: finalConfig.enableTitleEditing && data.canEdit,
    });

    return (
      <div ref={ref} className={cn(containerClasses, className)} {...props}>
        {/* Left Section - Title and Controls */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Title Section */}
          <div className="flex items-center gap-1 min-w-0">
            {isEditingTitle ? (
              <div className="flex items-center gap-1">
                <input
                  ref={titleInputRef}
                  type="text"
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                  onBlur={handleTitleSave}
                  onKeyDown={handleTitleKeyDown}
                  className="h-8 px-2 text-sm border border-input rounded focus:ring-2 focus:ring-ring flex-grow min-w-0"
                  disabled={isSavingTitle || disabled}
                  placeholder="Chat title"
                />
                <button
                  onClick={handleTitleSave}
                  disabled={
                    isSavingTitle ||
                    currentTitle.trim() === data.title ||
                    !currentTitle.trim() ||
                    disabled
                  }
                  className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <Check className="h-3 w-3" />
                </button>
                <button
                  onClick={handleTitleCancel}
                  disabled={isSavingTitle || disabled}
                  className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <h1
                  className={cn(titleClasses, "truncate max-w-[200px]")}
                  onClick={handleTitleEdit}
                  title={currentTitle}
                >
                  {currentTitle}
                </h1>
                {finalConfig.enableTitleEditing &&
                  data.canEdit &&
                  !disabled && (
                    <button
                      onClick={handleTitleEdit}
                      className="p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                  )}
              </div>
            )}
          </div>

          {/* Model Badge */}
          {finalStyleConfig.showModelBadge && currentModel && (
            <div className="text-xs bg-muted px-2 py-1 rounded-md">
              {currentModel.name}
            </div>
          )}

          {/* Visibility Icon */}
          {finalStyleConfig.showVisibilityIcon && currentVisibilityOption && (
            <currentVisibilityOption.icon className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        {/* Right Section - Actions and Tools */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Model Selection */}
          {finalConfig.enableModelSelection && !disabled && (
            <div className="relative">
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
              >
                <Settings2 className="h-4 w-4" />
                <ChevronDown className="h-3 w-3" />
              </button>
              {isModelDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-background border border-border rounded-md shadow-lg z-50">
                  <div className="p-2 space-y-1">
                    {data.availableModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => handleModelChange(model.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-sm text-sm transition-colors",
                          model.id === data.selectedModel
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                      >
                        <div className="font-medium">{model.name}</div>
                        {model.description && (
                          <div className="text-xs text-muted-foreground">
                            {model.description}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tool Panels */}
          {finalConfig.enableToolPanels && (
            <>
              {toolPanels.research && (
                <button
                  onClick={() =>
                    handleToolToggle(
                      "research",
                      toolPanels.research!.onToggle,
                      toolPanels.research!.isVisible,
                    )
                  }
                  disabled={disabled}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    toolPanels.research.isVisible
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                  title="Research Panel"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
              {toolPanels.documents && (
                <button
                  onClick={() =>
                    handleToolToggle(
                      "documents",
                      toolPanels.documents!.onToggle,
                      toolPanels.documents!.isVisible,
                    )
                  }
                  disabled={disabled}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    toolPanels.documents.isVisible
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                  title="Document Processor"
                >
                  <FileText className="h-4 w-4" />
                </button>
              )}
              {toolPanels.analytics && (
                <button
                  onClick={() =>
                    handleToolToggle(
                      "analytics",
                      toolPanels.analytics!.onToggle,
                      toolPanels.analytics!.isVisible,
                    )
                  }
                  disabled={disabled}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    toolPanels.analytics.isVisible
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                  title="Analytics Panel"
                >
                  <BarChartHorizontal className="h-4 w-4" />
                </button>
              )}
              {toolPanels.webscraper && (
                <button
                  onClick={() =>
                    handleToolToggle(
                      "webscraper",
                      toolPanels.webscraper!.onToggle,
                      toolPanels.webscraper!.isVisible,
                    )
                  }
                  disabled={disabled}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    toolPanels.webscraper.isVisible
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                  title="Web Scraper"
                >
                  <Globe2 className="h-4 w-4" />
                </button>
              )}
            </>
          )}

          {/* Share Button */}
          {finalConfig.enableSharing && (
            <div className="relative">
              <button
                onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
                disabled={disabled}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                title="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              {isShareDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                  <div className="p-1">
                    <button
                      onClick={() => handleShare("link")}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-sm transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Copy className="h-4 w-4" />
                        Copy Link
                      </div>
                    </button>
                    <button
                      onClick={() => handleShare("export")}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-sm transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export Chat
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* New Session Button */}
          {finalConfig.enableSessionManagement && onNewSession && (
            <button
              onClick={onNewSession}
              disabled={disabled}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              title="New Chat"
            >
              <PlusCircle className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Performance metrics in development */}
        {finalConfig.enableDebugMode && performanceMetrics && (
          <div className="absolute top-full left-0 right-0 bg-muted/90 border-b border-border p-2 text-xs text-muted-foreground z-40">
            <div className="flex gap-4">
              <span>Render: {performanceMetrics.renderTime}ms</span>
              <span>Interactions: {performanceMetrics.totalInteractions}</span>
              <span>Tool Toggles: {performanceMetrics.toolToggleCount}</span>
              <span>
                Model Switches: {performanceMetrics.modelSwitchTime}ms
              </span>
            </div>
          </div>
        )}
      </div>
    );
  },
);

ChatHeader.displayName = "ChatHeader";

// Context7 Pattern: Modularity - Factory Functions
export const createChatHeader = {
  simple: (title?: string): ChatHeaderProps => ({
    data: {
      chatId: crypto.randomUUID(),
      title: title || "Simple Chat",
      selectedModel: "gpt-4o-mini",
      selectedVisibility: "private",
      availableModels: defaultModels.slice(0, 2), // Simplified model selection
      visibilityOptions: defaultVisibilityOptions.slice(0, 1), // Private only
      canEdit: false,
    },
    config: {
      enableModelSelection: false,
      enableVisibilityControls: false,
      enableTitleEditing: false,
      enableSharing: false,
      enableToolPanels: false,
    },
    styleConfig: { variant: "compact", theme: "minimal" },
  }),

  chat: (chatId?: string, title?: string): ChatHeaderProps => ({
    data: {
      chatId: chatId || crypto.randomUUID(),
      title: title || "New Chat",
      selectedModel: "gpt-4o",
      selectedVisibility: "private",
      availableModels: defaultModels,
      visibilityOptions: defaultVisibilityOptions,
      canEdit: true,
    },
    config: {
      enableModelSelection: true,
      enableVisibilityControls: true,
      enableTitleEditing: true,
      enableSharing: true,
      enableToolPanels: true,
    },
    styleConfig: { variant: "default", showModelBadge: true },
  }),

  advanced: (chatId?: string): ChatHeaderProps => ({
    data: {
      chatId: chatId || crypto.randomUUID(),
      title: "Advanced Chat",
      selectedModel: "claude-3-5-sonnet",
      selectedVisibility: "team",
      availableModels: defaultModels,
      visibilityOptions: defaultVisibilityOptions,
      canEdit: true,
    },
    config: {
      enableModelSelection: true,
      enableVisibilityControls: true,
      enableTitleEditing: true,
      enableSessionManagement: true,
      enableSharing: true,
      enableArchiving: true,
      enableAnalytics: true,
      enableToolPanels: true,
    },
    styleConfig: {
      variant: "default",
      showModelBadge: true,
      showVisibilityIcon: true,
      showSessionCount: true,
    },
  }),

  minimal: (): ChatHeaderProps => ({
    data: {
      chatId: crypto.randomUUID(),
      title: "Chat",
      selectedModel: "gpt-4o-mini",
      selectedVisibility: "private",
      availableModels: defaultModels.slice(0, 1),
      visibilityOptions: defaultVisibilityOptions.slice(0, 1),
      canEdit: false,
    },
    config: {
      enableModelSelection: false,
      enableVisibilityControls: false,
      enableTitleEditing: false,
      enableSharing: false,
      enableToolPanels: false,
      enableSessionManagement: false,
    },
    styleConfig: { variant: "minimal", size: "sm" },
  }),
};

// Context7 Pattern: Modularity - Composition Helpers
export const ChatHeaderComposed = {
  SimpleChatHeader: createChatHeader.simple(),
  FullChatHeader: createChatHeader.chat(),
  AdvancedChatHeader: createChatHeader.advanced(),
  MinimalChatHeader: createChatHeader.minimal(),
};

export type ChatHeaderVariantProps = VariantProps<typeof chatHeaderVariants>;
export type ChatHeaderRef = HTMLDivElement;
