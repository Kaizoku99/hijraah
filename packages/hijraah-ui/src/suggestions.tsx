"use client";

import React from "react";
import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChatRequestOptions, CreateMessage, Message } from "ai";

// Context7 - Data-as-Code: Complete type definitions
export interface SuggestionItem {
  id: string;
  title: string;
  label: string;
  action: string;
  category?: string;
  icon?: React.ReactNode;
  priority?: number;
}

export interface SuggestionsData {
  suggestions: SuggestionItem[];
  categories: string[];
  selectedCategory?: string;
  customSuggestions?: SuggestionItem[];
}

export interface SuggestionsConfig {
  maxSuggestions?: number;
  enableCategories?: boolean;
  enableCustomSuggestions?: boolean;
  enableAnimation?: boolean;
  gridCols?: number;
  variant?: "default" | "compact" | "card" | "pills";
  showIcons?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export interface SuggestionsObservability {
  renderTime: number;
  interactionCount: number;
  clickedSuggestions: string[];
  categoryChanges: number;
  customSuggestionsUsed: number;
  performanceMetrics: {
    averageRenderTime: number;
    totalInteractions: number;
    conversionRate: number;
  };
}

export interface SuggestionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  data?: SuggestionsData;
  config?: SuggestionsConfig;
  onSuggestionClick?: (suggestion: SuggestionItem) => void;
  onCategoryChange?: (category: string) => void;
  className?: string;
  disabled?: boolean;
}

// Context7 - Resource Pooling: Performance manager singleton
class SuggestionsPerformanceManager {
  private static instance: SuggestionsPerformanceManager;
  private metrics: Map<string, SuggestionsObservability> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  private constructor() {
    this.cleanupInterval = setInterval(() => {
      // Keep only last 50 suggestions for memory management
      if (this.metrics.size > 50) {
        const entries = Array.from(this.metrics.entries());
        const toDelete = entries.slice(0, entries.length - 50);
        toDelete.forEach(([key]) => this.metrics.delete(key));
      }
    }, 30000);
  }

  static getInstance(): SuggestionsPerformanceManager {
    if (!SuggestionsPerformanceManager.instance) {
      SuggestionsPerformanceManager.instance =
        new SuggestionsPerformanceManager();
    }
    return SuggestionsPerformanceManager.instance;
  }

  getMetrics(chatId: string): SuggestionsObservability {
    return (
      this.metrics.get(chatId) || {
        renderTime: 0,
        interactionCount: 0,
        clickedSuggestions: [],
        categoryChanges: 0,
        customSuggestionsUsed: 0,
        performanceMetrics: {
          averageRenderTime: 0,
          totalInteractions: 0,
          conversionRate: 0,
        },
      }
    );
  }

  updateMetrics(
    chatId: string,
    updates: Partial<SuggestionsObservability>,
  ): void {
    const current = this.getMetrics(chatId);
    this.metrics.set(chatId, { ...current, ...updates });
  }

  recordRenderTime(chatId: string, renderTime: number): void {
    const metrics = this.getMetrics(chatId);
    this.updateMetrics(chatId, {
      renderTime,
      performanceMetrics: {
        ...metrics.performanceMetrics,
        averageRenderTime:
          (metrics.performanceMetrics.averageRenderTime + renderTime) / 2,
      },
    });
  }

  recordInteraction(chatId: string, suggestionId: string): void {
    const metrics = this.getMetrics(chatId);
    this.updateMetrics(chatId, {
      interactionCount: metrics.interactionCount + 1,
      clickedSuggestions: [...metrics.clickedSuggestions, suggestionId],
      performanceMetrics: {
        ...metrics.performanceMetrics,
        totalInteractions: metrics.performanceMetrics.totalInteractions + 1,
        conversionRate:
          (metrics.performanceMetrics.totalInteractions + 1) /
          (metrics.renderTime || 1),
      },
    });
  }

  cleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Context7 - Resource Pooling: Analytics manager singleton
class SuggestionsAnalyticsManager {
  private static instance: SuggestionsAnalyticsManager;
  private analytics: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): SuggestionsAnalyticsManager {
    if (!SuggestionsAnalyticsManager.instance) {
      SuggestionsAnalyticsManager.instance = new SuggestionsAnalyticsManager();
    }
    return SuggestionsAnalyticsManager.instance;
  }

  getAnalyticsData(chatId: string): any {
    return this.analytics.get(chatId);
  }

  trackSuggestionClick(chatId: string, suggestion: SuggestionItem): void {
    console.log(`[Suggestions Analytics] Suggestion clicked:`, {
      chatId,
      suggestionId: suggestion.id,
      title: suggestion.title,
      category: suggestion.category,
      timestamp: new Date().toISOString(),
    });
  }

  trackCategoryChange(chatId: string, category: string): void {
    console.log(`[Suggestions Analytics] Category changed:`, {
      chatId,
      category,
      timestamp: new Date().toISOString(),
    });
  }

  trackCustomSuggestion(chatId: string, suggestion: SuggestionItem): void {
    console.log(`[Suggestions Analytics] Custom suggestion used:`, {
      chatId,
      suggestionId: suggestion.id,
      timestamp: new Date().toISOString(),
    });
  }
}

// Context7 - Provider Isolation: Style provider
export interface SuggestionsStyleConfig {
  variant: "default" | "compact" | "card" | "pills";
  gridCols: number;
  showIcons: boolean;
  enableAnimation: boolean;
}

const SuggestionsStyleContext = React.createContext<SuggestionsStyleConfig>({
  variant: "default",
  gridCols: 2,
  showIcons: false,
  enableAnimation: true,
});

export function SuggestionsStyleProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: SuggestionsStyleConfig;
}) {
  return (
    <SuggestionsStyleContext.Provider value={config}>
      {children}
    </SuggestionsStyleContext.Provider>
  );
}

// Context7 - Provider Isolation: Observability provider
const SuggestionsObservabilityContext = React.createContext<{
  metrics: SuggestionsObservability;
  recordRender: (time: number) => void;
  recordInteraction: (suggestionId: string) => void;
} | null>(null);

export function SuggestionsObservabilityProvider({
  children,
  chatId,
}: {
  children: React.ReactNode;
  chatId: string;
}) {
  const performanceManager = SuggestionsPerformanceManager.getInstance();
  const metrics = performanceManager.getMetrics(chatId);

  const recordRender = useCallback(
    (time: number) => {
      performanceManager.recordRenderTime(chatId, time);
    },
    [chatId],
  );

  const recordInteraction = useCallback(
    (suggestionId: string) => {
      performanceManager.recordInteraction(chatId, suggestionId);
    },
    [chatId],
  );

  return (
    <SuggestionsObservabilityContext.Provider
      value={{
        metrics,
        recordRender,
        recordInteraction,
      }}
    >
      {children}
    </SuggestionsObservabilityContext.Provider>
  );
}

// Context7 - Modularity: Default suggestion sets
const defaultSuggestions: SuggestionItem[] = [
  {
    id: "immigration-visa",
    title: "What are the advantages",
    label: "of different visa types?",
    action: "What are the advantages of different visa types for immigration?",
    category: "immigration",
    priority: 1,
  },
  {
    id: "immigration-process",
    title: "Explain the process",
    label: "for applying for permanent residency",
    action: "Explain the process for applying for permanent residency",
    category: "immigration",
    priority: 2,
  },
  {
    id: "immigration-documents",
    title: "What documents do I need",
    label: "for my immigration application?",
    action: "What documents do I need for my immigration application?",
    category: "immigration",
    priority: 3,
  },
  {
    id: "immigration-timeline",
    title: "How long does it take",
    label: "to process immigration applications?",
    action: "How long does it take to process immigration applications?",
    category: "immigration",
    priority: 4,
  },
];

// Context7 - Modularity: Factory patterns
export const createSuggestions = {
  immigration: (customSuggestions?: SuggestionItem[]): SuggestionsData => ({
    suggestions: customSuggestions || defaultSuggestions,
    categories: ["immigration", "visa", "documents", "process"],
    selectedCategory: "immigration",
  }),

  general: (customSuggestions?: SuggestionItem[]): SuggestionsData => ({
    suggestions: customSuggestions || [
      {
        id: "general-help",
        title: "How can you help me",
        label: "with my questions?",
        action: "How can you help me with my questions?",
        category: "general",
        priority: 1,
      },
      {
        id: "general-features",
        title: "What features",
        label: "are available on this platform?",
        action: "What features are available on this platform?",
        category: "general",
        priority: 2,
      },
    ],
    categories: ["general", "help", "features"],
    selectedCategory: "general",
  }),

  custom: (
    suggestions: SuggestionItem[],
    categories: string[],
  ): SuggestionsData => ({
    suggestions,
    categories,
    customSuggestions: suggestions,
  }),
};

// Main component implementation
function PureSuggestions({
  chatId,
  append,
  data = createSuggestions.immigration(),
  config = {},
  onSuggestionClick,
  onCategoryChange: _onCategoryChange, // Preserved for future category UI feature
  className = "",
  disabled = false,
}: SuggestionsProps) {
  // Context7 - Observability: Performance tracking
  const renderStartTime = useRef(Date.now());
  const performanceManager = SuggestionsPerformanceManager.getInstance();
  const analyticsManager = SuggestionsAnalyticsManager.getInstance();

  // Context7 - Resumability: Component state management
  const [selectedCategory] = useState(data.selectedCategory); // setSelectedCategory removed (future category UI feature)
  const [visibleCount, setVisibleCount] = useState(config.maxSuggestions || 4);

  // Context7 - Modularity: Default config
  const finalConfig = useMemo(
    () => ({
      maxSuggestions: 4,
      enableCategories: false,
      enableCustomSuggestions: false,
      enableAnimation: true,
      gridCols: 2,
      variant: "default" as const,
      showIcons: false,
      autoHide: false,
      autoHideDelay: 5000,
      ...config,
    }),
    [config],
  );

  // Context7 - Data-as-Code: Filtered suggestions
  const filteredSuggestions = useMemo(() => {
    let suggestions = data.suggestions;

    if (selectedCategory && finalConfig.enableCategories) {
      suggestions = suggestions.filter((s) => s.category === selectedCategory);
    }

    return suggestions
      .sort((a, b) => (a.priority || 999) - (b.priority || 999))
      .slice(0, finalConfig.maxSuggestions);
  }, [
    data.suggestions,
    selectedCategory,
    finalConfig.enableCategories,
    finalConfig.maxSuggestions,
  ]);

  // Context7 - Observability: Render time tracking
  useEffect(() => {
    const renderTime = Date.now() - renderStartTime.current;
    performanceManager.recordRenderTime(chatId, renderTime);

    // Context7 - Tracing: Development debugging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Suggestions Context7] Rendered in ${renderTime}ms`, {
        chatId,
        suggestionsCount: filteredSuggestions.length,
        config: finalConfig,
      });
    }
  }, [chatId, filteredSuggestions.length, finalConfig]);

  // Context7 - Resumability: Auto-hide functionality
  useEffect(() => {
    if (finalConfig.autoHide) {
      const timer = setTimeout(() => {
        setVisibleCount(0);
      }, finalConfig.autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [finalConfig.autoHide, finalConfig.autoHideDelay]);

  // Context7 - Modularity: Suggestion click handler
  const handleSuggestionClick = useCallback(
    async (suggestion: SuggestionItem) => {
      if (disabled) return;

      // Context7 - Observability: Track interaction
      performanceManager.recordInteraction(chatId, suggestion.id);
      analyticsManager.trackSuggestionClick(chatId, suggestion);

      // Context7 - Tracing: Development debugging
      if (process.env.NODE_ENV === "development") {
        console.log(`[Suggestions Context7] Suggestion clicked:`, suggestion);
      }

      // Call custom handler if provided
      onSuggestionClick?.(suggestion);

      // Navigate and append message
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", `/chat/${chatId}`);
      }

      await append({
        role: "user",
        content: suggestion.action,
      });
    },
    [chatId, append, onSuggestionClick, disabled],
  );

  // Context7 - Modularity: Category change handler (for future category UI feature)
  // Note: Currently unused as category selection UI is not implemented yet
  // const handleCategoryChange = useCallback(
  //   (category: string) => {
  //     setSelectedCategory(category);
  //     onCategoryChange?.(category);
  //     analyticsManager.trackCategoryChange(chatId, category);
  //   },
  //   [chatId, onCategoryChange]
  // );

  // Context7 - Modularity: Grid classes based on config
  const gridClasses = useMemo(() => {
    const cols = finalConfig.gridCols;
    const colsClass =
      cols === 1
        ? "grid-cols-1"
        : cols === 3
          ? "sm:grid-cols-3"
          : cols === 4
            ? "sm:grid-cols-4"
            : "sm:grid-cols-2";
    return `grid ${colsClass} gap-2 w-full`;
  }, [finalConfig.gridCols]);

  // Context7 - Modularity: Button variant classes
  const buttonClasses = useMemo(() => {
    const base =
      "text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 w-full h-auto justify-start items-start";

    switch (finalConfig.variant) {
      case "compact":
        return `${base} py-2 px-3`;
      case "card":
        return `${base} border-2 shadow-sm hover:shadow-md`;
      case "pills":
        return `${base} rounded-full py-2`;
      default:
        return `${base} sm:flex-col`;
    }
  }, [finalConfig.variant]);

  if (visibleCount === 0 || filteredSuggestions.length === 0) {
    return null;
  }

  return (
    <div data-testid="suggestions" className={`${gridClasses} ${className}`}>
      {filteredSuggestions.map((suggestion, index) => (
        <motion.div
          key={`suggestion-${suggestion.id}-${index}`}
          initial={finalConfig.enableAnimation ? { opacity: 0, y: 20 } : {}}
          animate={finalConfig.enableAnimation ? { opacity: 1, y: 0 } : {}}
          exit={finalConfig.enableAnimation ? { opacity: 0, y: 20 } : {}}
          transition={{ delay: finalConfig.enableAnimation ? 0.05 * index : 0 }}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <button
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={disabled}
            className={`${buttonClasses} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground"}`}
          >
            <div className="flex items-center gap-2">
              {finalConfig.showIcons && suggestion.icon && suggestion.icon}
              <span className="font-medium">{suggestion.title}</span>
            </div>
            <span className="text-muted-foreground">{suggestion.label}</span>
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// Context7 - Modularity: Memoized export
export const Suggestions = memo(PureSuggestions, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.disabled === nextProps.disabled &&
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.config) === JSON.stringify(nextProps.config)
  );
});

// Context7 - Modularity: Composition helpers
export const SuggestionsComposed = {
  ImmigrationSuggestions: (props: Omit<SuggestionsProps, "data">) => (
    <Suggestions
      {...props}
      data={createSuggestions.immigration()}
      config={{ enableCategories: true, ...props.config }}
    />
  ),

  GeneralSuggestions: (props: Omit<SuggestionsProps, "data">) => (
    <Suggestions {...props} data={createSuggestions.general()} />
  ),

  CompactSuggestions: (props: SuggestionsProps) => (
    <Suggestions
      {...props}
      config={{ variant: "compact", gridCols: 4, ...props.config }}
    />
  ),

  CardSuggestions: (props: SuggestionsProps) => (
    <Suggestions
      {...props}
      config={{ variant: "card", showIcons: true, ...props.config }}
    />
  ),
};

// Context7 - Observability: Export performance manager for external access
export { SuggestionsPerformanceManager, SuggestionsAnalyticsManager };

// Default export
export default Suggestions;
