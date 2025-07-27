"use client";

import React, {
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./styles";

// ============================================================================
// Context7 Pattern 5: Data-as-Code - Type-safe configuration interfaces
// ============================================================================

export interface MarkdownConfig {
  enableGfm?: boolean;
  enableCopy?: boolean;
  enableAnalytics?: boolean;
  maxRenderTime?: number;
  className?: string;
  remarkPlugins?: any[];
  allowHtml?: boolean;
  linkTarget?: string;
}

export interface MarkdownMetrics {
  renderTime: number;
  contentLength: number;
  linkClicks: number;
  copyActions: number;
  scrollDepth: number;
  readingTime: number; // estimated in seconds
}

export interface MarkdownObservability {
  onRender?: (metrics: Partial<MarkdownMetrics>) => void;
  onLinkClick?: (url: string, text: string) => void;
  onCopy?: (content: string) => void;
  onScroll?: (depth: number) => void;
}

// ============================================================================
// Context7 Pattern 7: Resource Pooling - Performance optimization singletons
// ============================================================================

class MarkdownPerformanceManager {
  private static instance: MarkdownPerformanceManager;
  private renderCache = new Map<string, { html: string; timestamp: number }>();
  private readonly MAX_CACHE_SIZE = 100;
  private readonly CACHE_TTL = 300000; // 5 minutes

  static getInstance(): MarkdownPerformanceManager {
    if (!MarkdownPerformanceManager.instance) {
      MarkdownPerformanceManager.instance = new MarkdownPerformanceManager();
    }
    return MarkdownPerformanceManager.instance;
  }

  getCachedRender(content: string): string | null {
    const cached = this.renderCache.get(content);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.html;
    }
    return null;
  }

  cacheRender(content: string, html: string): void {
    if (this.renderCache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.renderCache.keys().next().value;
      if (firstKey) {
        this.renderCache.delete(firstKey);
      }
    }
    this.renderCache.set(content, { html, timestamp: Date.now() });
  }

  getEstimatedReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute) * 60; // in seconds
  }
}

class MarkdownAnalyticsManager {
  private static instance: MarkdownAnalyticsManager;
  private analytics = new Map<string, MarkdownMetrics>();

  static getInstance(): MarkdownAnalyticsManager {
    if (!MarkdownAnalyticsManager.instance) {
      MarkdownAnalyticsManager.instance = new MarkdownAnalyticsManager();
    }
    return MarkdownAnalyticsManager.instance;
  }

  trackMetric(id: string, metric: Partial<MarkdownMetrics>): void {
    const existing = this.analytics.get(id) || {
      renderTime: 0,
      contentLength: 0,
      linkClicks: 0,
      copyActions: 0,
      scrollDepth: 0,
      readingTime: 0,
    };
    this.analytics.set(id, { ...existing, ...metric });
  }

  getMetrics(id: string): MarkdownMetrics | undefined {
    return this.analytics.get(id);
  }

  getAllMetrics(): Record<string, MarkdownMetrics> {
    return Object.fromEntries(this.analytics);
  }
}

// ============================================================================
// Context7 Pattern 6: Provider Isolation - Dedicated style providers
// ============================================================================

export interface MarkdownStyleConfig {
  theme: "default" | "minimal" | "code" | "documentation";
  size: "sm" | "md" | "lg";
  variant: "default" | "muted" | "accent";
}

const markdownVariants = cva("prose dark:prose-invert max-w-none", {
  variants: {
    theme: {
      default: "prose-slate",
      minimal: "prose-zinc prose-sm",
      code: "prose-neutral font-mono",
      documentation: "prose-blue",
    },
    size: {
      sm: "prose-sm",
      md: "prose-base",
      lg: "prose-lg",
    },
    variant: {
      default: "",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
    },
  },
  defaultVariants: {
    theme: "default",
    size: "md",
    variant: "default",
  },
});

export interface MarkdownStyleProviderProps {
  children: React.ReactNode;
  config: MarkdownStyleConfig;
}

const MarkdownStyleContext = React.createContext<MarkdownStyleConfig>({
  theme: "default",
  size: "md",
  variant: "default",
});

export function MarkdownStyleProvider({
  children,
  config,
}: MarkdownStyleProviderProps) {
  return (
    <MarkdownStyleContext.Provider value={config}>
      {children}
    </MarkdownStyleContext.Provider>
  );
}

// ============================================================================
// Context7 Pattern 1: Observability - Built-in metrics and analytics
// ============================================================================

const MarkdownObservabilityContext = React.createContext<MarkdownObservability>(
  {},
);

export interface MarkdownObservabilityProviderProps {
  children: React.ReactNode;
  config: MarkdownObservability;
}

export function MarkdownObservabilityProvider({
  children,
  config,
}: MarkdownObservabilityProviderProps) {
  return (
    <MarkdownObservabilityContext.Provider value={config}>
      {children}
    </MarkdownObservabilityContext.Provider>
  );
}

// ============================================================================
// Context7 Pattern 2: Modularity - Factory patterns and composition helpers
// ============================================================================

export interface MarkdownFactoryConfig
  extends MarkdownConfig,
    MarkdownStyleConfig {
  observability?: MarkdownObservability;
}

export const createMarkdown = {
  code: (config?: Partial<MarkdownFactoryConfig>) => (props: MarkdownProps) => (
    <Markdown
      {...props}
      config={{
        enableGfm: true,
        enableCopy: true,
        enableAnalytics: true,
        ...config,
      }}
      styleConfig={{
        theme: "code",
        size: "sm",
        variant: "default",
        ...config,
      }}
    />
  ),

  documentation:
    (config?: Partial<MarkdownFactoryConfig>) => (props: MarkdownProps) => (
      <Markdown
        {...props}
        config={{
          enableGfm: true,
          enableAnalytics: true,
          linkTarget: "_blank",
          ...config,
        }}
        styleConfig={{
          theme: "documentation",
          size: "md",
          variant: "default",
          ...config,
        }}
      />
    ),

  chat: (config?: Partial<MarkdownFactoryConfig>) => (props: MarkdownProps) => (
    <Markdown
      {...props}
      config={{
        enableGfm: true,
        enableCopy: false,
        enableAnalytics: true,
        ...config,
      }}
      styleConfig={{
        theme: "minimal",
        size: "sm",
        variant: "default",
        ...config,
      }}
    />
  ),

  minimal:
    (config?: Partial<MarkdownFactoryConfig>) => (props: MarkdownProps) => (
      <Markdown
        {...props}
        config={{
          enableGfm: false,
          enableCopy: false,
          enableAnalytics: false,
          ...config,
        }}
        styleConfig={{
          theme: "minimal",
          size: "sm",
          variant: "muted",
          ...config,
        }}
      />
    ),
};

export const MarkdownComposed = {
  ChatMessage: createMarkdown.chat(),
  CodeDocumentation: createMarkdown.documentation(),
  MinimalPreview: createMarkdown.minimal(),
};

// ============================================================================
// Main Component
// ============================================================================

export interface MarkdownProps {
  content: string;
  config?: MarkdownConfig;
  styleConfig?: MarkdownStyleConfig;
  observability?: MarkdownObservability;
  className?: string;
  id?: string;
}

export const Markdown = memo(function Markdown({
  content,
  config = {},
  styleConfig,
  observability,
  className,
  id = crypto.randomUUID(),
}: MarkdownProps) {
  // Context7 Pattern 6: Provider Isolation
  const contextStyleConfig = useContext(MarkdownStyleContext);
  const contextObservability = useContext(MarkdownObservabilityContext);

  const finalStyleConfig = styleConfig || contextStyleConfig;
  const finalObservability = { ...contextObservability, ...observability };
  const finalConfig = {
    enableGfm: true,
    enableCopy: false,
    enableAnalytics: true,
    maxRenderTime: 1000,
    allowHtml: false,
    linkTarget: "_self",
    ...config,
  };

  // Context7 Pattern 7: Resource Pooling
  const performanceManager = useMemo(
    () => MarkdownPerformanceManager.getInstance(),
    [],
  );
  const analyticsManager = useMemo(
    () => MarkdownAnalyticsManager.getInstance(),
    [],
  );

  // Context7 Pattern 3: Resumability - State preservation
  const [renderMetrics, setRenderMetrics] = useState<Partial<MarkdownMetrics>>(
    {},
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const renderStartTime = useRef<number>(0);

  // Context7 Pattern 4: Tracing - Development debugging
  const isDevelopment = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (isDevelopment) {
      console.log(`[Markdown:${id}] Rendering content`, {
        contentLength: content.length,
        config: finalConfig,
        styleConfig: finalStyleConfig,
      });
    }
  }, [content, finalConfig, finalStyleConfig, id, isDevelopment]);

  // Context7 Pattern 1: Observability - Performance tracking
  useEffect(() => {
    renderStartTime.current = performance.now();

    return () => {
      const renderTime = performance.now() - renderStartTime.current;
      const readingTime = performanceManager.getEstimatedReadingTime(content);

      const metrics: Partial<MarkdownMetrics> = {
        renderTime,
        contentLength: content.length,
        readingTime,
      };

      setRenderMetrics(metrics);

      if (finalConfig.enableAnalytics) {
        analyticsManager.trackMetric(id, metrics);
      }

      finalObservability.onRender?.(metrics);

      if (isDevelopment) {
        console.log(`[Markdown:${id}] Render completed`, metrics);
      }
    };
  }, [
    content,
    finalConfig.enableAnalytics,
    finalObservability,
    analyticsManager,
    performanceManager,
    id,
    isDevelopment,
  ]);

  // Event handlers with observability
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const url = event.currentTarget.href;
    const text = event.currentTarget.textContent || "";

    if (finalConfig.enableAnalytics) {
      analyticsManager.trackMetric(id, {
        linkClicks: (renderMetrics.linkClicks || 0) + 1,
      });
    }

    finalObservability.onLinkClick?.(url, text);

    if (isDevelopment) {
      console.log(`[Markdown:${id}] Link clicked`, { url, text });
    }
  };

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);

      if (finalConfig.enableAnalytics) {
        analyticsManager.trackMetric(id, {
          copyActions: (renderMetrics.copyActions || 0) + 1,
        });
      }

      finalObservability.onCopy?.(textToCopy);

      if (isDevelopment) {
        console.log(`[Markdown:${id}] Content copied`, {
          length: textToCopy.length,
        });
      }
    } catch (error) {
      console.error("Failed to copy content:", error);
    }
  };

  // Custom components with observability
  const components = useMemo(
    () => ({
      a: ({ href, children, ...props }: any) => (
        <a
          href={href}
          target={finalConfig.linkTarget}
          rel={
            finalConfig.linkTarget === "_blank"
              ? "noopener noreferrer"
              : undefined
          }
          onClick={handleLinkClick}
          {...props}
        >
          {children}
        </a>
      ),

      pre: ({ children, ...props }: any) => (
        <div className="relative group">
          <pre {...props} className={cn("overflow-x-auto", props.className)}>
            {children}
          </pre>
          {finalConfig.enableCopy && (
            <button
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded px-2 py-1 text-xs"
              onClick={() => {
                const code = props.children?.props?.children || "";
                handleCopy(String(code));
              }}
            >
              Copy
            </button>
          )}
        </div>
      ),

      code: ({ className, children, ...props }: any) => {
        const isInline = !className;
        return (
          <code
            className={cn(
              isInline
                ? "rounded-md bg-muted px-1 py-0.5 font-mono text-sm"
                : "block rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto",
              className,
            )}
            {...props}
          >
            {children}
          </code>
        );
      },
    }),
    [finalConfig.enableCopy, finalConfig.linkTarget, handleLinkClick],
  );

  const remarkPlugins = useMemo(() => {
    const plugins = [];
    if (finalConfig.enableGfm) {
      plugins.push(remarkGfm);
    }
    if (finalConfig.remarkPlugins) {
      plugins.push(...finalConfig.remarkPlugins);
    }
    return plugins;
  }, [finalConfig.enableGfm, finalConfig.remarkPlugins]);

  if (!content) {
    if (isDevelopment) {
      console.warn(`[Markdown:${id}] Empty content provided`);
    }
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        markdownVariants(finalStyleConfig),
        finalConfig.className,
        className,
      )}
      data-markdown-id={id}
    >
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        components={components}
        allowedElements={
          finalConfig.allowHtml
            ? undefined
            : [
                "p",
                "br",
                "strong",
                "em",
                "ul",
                "ol",
                "li",
                "a",
                "code",
                "pre",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "blockquote",
              ]
        }
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

// Re-export for convenience
export { markdownVariants };
export type MarkdownVariantsProps = VariantProps<typeof markdownVariants>;

// Development utilities
if (process.env.NODE_ENV === "development") {
  (globalThis as any).__MarkdownAnalytics =
    MarkdownAnalyticsManager.getInstance();
  (globalThis as any).__MarkdownPerformance =
    MarkdownPerformanceManager.getInstance();
}
