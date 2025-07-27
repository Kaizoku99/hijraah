"use client";

import React, {
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import {
//   oneLight,
//   oneDark,
// } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { cn } from "./styles";

// ============================================================================
// Context7 Pattern 5: Data-as-Code - Type-safe configuration interfaces
// ============================================================================

export interface CodeBlockConfig {
  showLineNumbers?: boolean;
  enableCopy?: boolean;
  enableDownload?: boolean;
  enableShare?: boolean;
  enableAnalytics?: boolean;
  theme?: "light" | "dark" | "auto";
  maxLines?: number;
  wrapLines?: boolean;
  className?: string;
  downloadFilename?: string;
}

export interface CodeBlockMetrics {
  renderTime: number;
  codeLength: number;
  copyActions: number;
  downloadActions: number;
  shareActions: number;
  lineCount: number;
  language: string;
  interactions: number;
}

export interface CodeBlockObservability {
  onRender?: (metrics: Partial<CodeBlockMetrics>) => void;
  onCopy?: (code: string, language: string) => void;
  onDownload?: (code: string, filename: string, language: string) => void;
  onShare?: (code: string, language: string) => void;
  onInteraction?: (action: string, metadata?: any) => void;
}

// ============================================================================
// Context7 Pattern 7: Resource Pooling - Performance optimization singletons
// ============================================================================

class CodeBlockPerformanceManager {
  private static instance: CodeBlockPerformanceManager;
  private highlightCache = new Map<
    string,
    { html: string; timestamp: number }
  >();
  private readonly MAX_CACHE_SIZE = 50;
  private readonly CACHE_TTL = 600000; // 10 minutes

  static getInstance(): CodeBlockPerformanceManager {
    if (!CodeBlockPerformanceManager.instance) {
      CodeBlockPerformanceManager.instance = new CodeBlockPerformanceManager();
    }
    return CodeBlockPerformanceManager.instance;
  }

  getCachedHighlight(cacheKey: string): string | null {
    const cached = this.highlightCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.html;
    }
    return null;
  }

  cacheHighlight(cacheKey: string, html: string): void {
    if (this.highlightCache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.highlightCache.keys().next().value;
      if (firstKey) {
        this.highlightCache.delete(firstKey);
      }
    }
    this.highlightCache.set(cacheKey, { html, timestamp: Date.now() });
  }

  generateCacheKey(code: string, language: string, theme: string): string {
    return `${language}-${theme}-${this.hashCode(code)}`;
  }

  private hashCode(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }
}

class CodeBlockAnalyticsManager {
  private static instance: CodeBlockAnalyticsManager;
  private analytics = new Map<string, CodeBlockMetrics>();

  static getInstance(): CodeBlockAnalyticsManager {
    if (!CodeBlockAnalyticsManager.instance) {
      CodeBlockAnalyticsManager.instance = new CodeBlockAnalyticsManager();
    }
    return CodeBlockAnalyticsManager.instance;
  }

  trackMetric(id: string, metric: Partial<CodeBlockMetrics>): void {
    const existing = this.analytics.get(id) || {
      renderTime: 0,
      codeLength: 0,
      copyActions: 0,
      downloadActions: 0,
      shareActions: 0,
      lineCount: 0,
      language: "",
      interactions: 0,
    };
    this.analytics.set(id, { ...existing, ...metric });
  }

  getMetrics(id: string): CodeBlockMetrics | undefined {
    return this.analytics.get(id);
  }

  getAllMetrics(): Record<string, CodeBlockMetrics> {
    return Object.fromEntries(this.analytics);
  }

  getLanguageStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    for (const metrics of this.analytics.values()) {
      stats[metrics.language] = (stats[metrics.language] || 0) + 1;
    }
    return stats;
  }
}

// ============================================================================
// Context7 Pattern 6: Provider Isolation - Dedicated style providers
// ============================================================================

export interface CodeBlockStyleConfig {
  variant: "default" | "minimal" | "enhanced" | "terminal";
  size: "sm" | "md" | "lg";
  rounded: "none" | "sm" | "md" | "lg";
}

const codeBlockVariants = cva("relative font-mono text-sm overflow-hidden", {
  variants: {
    variant: {
      default: "border bg-muted",
      minimal: "bg-muted/50",
      enhanced: "border-2 bg-gradient-to-br from-muted to-muted/80 shadow-lg",
      terminal: "bg-black text-green-400 border border-green-400/30",
    },
    size: {
      sm: "text-xs p-2",
      md: "text-sm p-4",
      lg: "text-base p-6",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    rounded: "md",
  },
});

export interface CodeBlockStyleProviderProps {
  children: React.ReactNode;
  config: CodeBlockStyleConfig;
}

const CodeBlockStyleContext = React.createContext<CodeBlockStyleConfig>({
  variant: "default",
  size: "md",
  rounded: "md",
});

export function CodeBlockStyleProvider({
  children,
  config,
}: CodeBlockStyleProviderProps) {
  return (
    <CodeBlockStyleContext.Provider value={config}>
      {children}
    </CodeBlockStyleContext.Provider>
  );
}

// ============================================================================
// Context7 Pattern 1: Observability - Built-in metrics and analytics
// ============================================================================

const CodeBlockObservabilityContext =
  React.createContext<CodeBlockObservability>({});

export interface CodeBlockObservabilityProviderProps {
  children: React.ReactNode;
  config: CodeBlockObservability;
}

export function CodeBlockObservabilityProvider({
  children,
  config,
}: CodeBlockObservabilityProviderProps) {
  return (
    <CodeBlockObservabilityContext.Provider value={config}>
      {children}
    </CodeBlockObservabilityContext.Provider>
  );
}

// ============================================================================
// Context7 Pattern 2: Modularity - Factory patterns and composition helpers
// ============================================================================

export interface CodeBlockFactoryConfig
  extends CodeBlockConfig,
    CodeBlockStyleConfig {
  observability?: CodeBlockObservability;
}

export const createCodeBlock = {
  simple:
    (config?: Partial<CodeBlockFactoryConfig>) => (props: CodeBlockProps) => (
      <CodeBlock
        {...props}
        config={{
          showLineNumbers: false,
          enableCopy: true,
          enableDownload: false,
          enableShare: false,
          enableAnalytics: false,
          ...config,
        }}
        styleConfig={{
          variant: "minimal",
          size: "sm",
          rounded: "sm",
          ...config,
        }}
      />
    ),

  enhanced:
    (config?: Partial<CodeBlockFactoryConfig>) => (props: CodeBlockProps) => (
      <CodeBlock
        {...props}
        config={{
          showLineNumbers: true,
          enableCopy: true,
          enableDownload: true,
          enableShare: true,
          enableAnalytics: true,
          ...config,
        }}
        styleConfig={{
          variant: "enhanced",
          size: "md",
          rounded: "md",
          ...config,
        }}
      />
    ),

  terminal:
    (config?: Partial<CodeBlockFactoryConfig>) => (props: CodeBlockProps) => (
      <CodeBlock
        {...props}
        config={{
          showLineNumbers: false,
          enableCopy: true,
          enableDownload: false,
          enableShare: false,
          theme: "dark",
          ...config,
        }}
        styleConfig={{
          variant: "terminal",
          size: "md",
          rounded: "none",
          ...config,
        }}
      />
    ),

  documentation:
    (config?: Partial<CodeBlockFactoryConfig>) => (props: CodeBlockProps) => (
      <CodeBlock
        {...props}
        config={{
          showLineNumbers: true,
          enableCopy: true,
          enableDownload: true,
          enableShare: false,
          enableAnalytics: true,
          ...config,
        }}
        styleConfig={{
          variant: "default",
          size: "md",
          rounded: "md",
          ...config,
        }}
      />
    ),
};

export const CodeBlockComposed = {
  SimpleCode: createCodeBlock.simple(),
  EnhancedCode: createCodeBlock.enhanced(),
  TerminalCode: createCodeBlock.terminal(),
  DocumentationCode: createCodeBlock.documentation(),
};

// ============================================================================
// Main Component
// ============================================================================

export interface CodeBlockProps {
  code: string;
  language: string;
  config?: CodeBlockConfig;
  styleConfig?: CodeBlockStyleConfig;
  observability?: CodeBlockObservability;
  className?: string;
  id?: string;
  title?: string;
}

export const CodeBlock = memo(function CodeBlock({
  code,
  language,
  config = {},
  styleConfig,
  observability,
  className,
  id = crypto.randomUUID(),
  title,
}: CodeBlockProps) {
  // Context7 Pattern 6: Provider Isolation
  const contextStyleConfig = useContext(CodeBlockStyleContext);
  const contextObservability = useContext(CodeBlockObservabilityContext);

  const finalStyleConfig = styleConfig || contextStyleConfig;
  const finalObservability = { ...contextObservability, ...observability };
  const finalConfig = {
    showLineNumbers: true,
    enableCopy: true,
    enableDownload: false,
    enableShare: false,
    enableAnalytics: true,
    theme: "auto" as const,
    maxLines: 500,
    wrapLines: false,
    downloadFilename: `code.${language}`,
    ...config,
  };

  // Context7 Pattern 7: Resource Pooling
  const analyticsManager = useMemo(
    () => CodeBlockAnalyticsManager.getInstance(),
    [],
  );

  // Context7 Pattern 3: Resumability - State preservation
  const [isCopied, setIsCopied] = useState(false);
  const [renderMetrics, setRenderMetrics] = useState<Partial<CodeBlockMetrics>>(
    {},
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const renderStartTime = useRef<number>(0);

  // Context7 Pattern 4: Tracing - Development debugging
  const isDevelopment = process.env.NODE_ENV === "development";

  // Determine theme - commented out for now
  // const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  // useEffect(() => {
  //   if (finalConfig.theme === "auto") {
  //     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  //     setCurrentTheme(mediaQuery.matches ? "dark" : "light");

  //     const handleChange = (e: MediaQueryListEvent) => {
  //       setCurrentTheme(e.matches ? "dark" : "light");
  //     };

  //     mediaQuery.addListener(handleChange);
  //     return () => mediaQuery.removeListener(handleChange);
  //   } else {
  //     setCurrentTheme(finalConfig.theme);
  //   }
  // }, [finalConfig.theme]);

  useEffect(() => {
    if (isDevelopment) {
      console.log(`[CodeBlock:${id}] Rendering code`, {
        language,
        codeLength: code.length,
        lineCount: code.split("\n").length,
        config: finalConfig,
        styleConfig: finalStyleConfig,
      });
    }
  }, [code, language, finalConfig, finalStyleConfig, id, isDevelopment]);

  // Context7 Pattern 1: Observability - Performance tracking
  useEffect(() => {
    renderStartTime.current = performance.now();

    return () => {
      const renderTime = performance.now() - renderStartTime.current;
      const lineCount = code.split("\n").length;

      const metrics: Partial<CodeBlockMetrics> = {
        renderTime,
        codeLength: code.length,
        lineCount,
        language,
      };

      setRenderMetrics((prev) => ({ ...prev, ...metrics }));

      if (finalConfig.enableAnalytics) {
        analyticsManager.trackMetric(id, metrics);
      }

      finalObservability.onRender?.(metrics);

      if (isDevelopment) {
        console.log(`[CodeBlock:${id}] Render completed`, metrics);
      }
    };
  }, [
    code,
    language,
    finalConfig.enableAnalytics,
    finalObservability,
    analyticsManager,
    id,
    isDevelopment,
  ]);

  // Event handlers with observability
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      const interactions = (renderMetrics.interactions || 0) + 1;
      const copyActions = (renderMetrics.copyActions || 0) + 1;

      setRenderMetrics((prev) => ({ ...prev, interactions, copyActions }));

      if (finalConfig.enableAnalytics) {
        analyticsManager.trackMetric(id, { copyActions, interactions });
      }

      finalObservability.onCopy?.(code, language);
      finalObservability.onInteraction?.("copy", {
        language,
        codeLength: code.length,
      });

      if (isDevelopment) {
        console.log(`[CodeBlock:${id}] Code copied`, {
          language,
          length: code.length,
        });
      }
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }, [
    code,
    language,
    renderMetrics,
    finalConfig.enableAnalytics,
    finalObservability,
    analyticsManager,
    id,
    isDevelopment,
  ]);

  const handleDownload = useCallback(() => {
    const filename = finalConfig.downloadFilename || `code.${language}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const interactions = (renderMetrics.interactions || 0) + 1;
    const downloadActions = (renderMetrics.downloadActions || 0) + 1;

    setRenderMetrics((prev) => ({ ...prev, interactions, downloadActions }));

    if (finalConfig.enableAnalytics) {
      analyticsManager.trackMetric(id, { downloadActions, interactions });
    }

    finalObservability.onDownload?.(code, filename, language);
    finalObservability.onInteraction?.("download", {
      filename,
      language,
      codeLength: code.length,
    });

    if (isDevelopment) {
      console.log(`[CodeBlock:${id}] Code downloaded`, { filename, language });
    }
  }, [
    code,
    language,
    finalConfig.downloadFilename,
    renderMetrics,
    finalConfig.enableAnalytics,
    finalObservability,
    analyticsManager,
    id,
    isDevelopment,
  ]);

  // handleShare functionality temporarily commented out due to TypeScript issues
  // const handleShare = useCallback(async () => {
  //   if (typeof navigator !== "undefined" && "share" in navigator) {
  //     try {
  //       await navigator.share({
  //         title: title || `${language} code`,
  //         text: code,
  //       });

  //       const interactions = (renderMetrics.interactions || 0) + 1;
  //       const shareActions = (renderMetrics.shareActions || 0) + 1;

  //       setRenderMetrics((prev) => ({ ...prev, interactions, shareActions }));

  //       if (finalConfig.enableAnalytics) {
  //         analyticsManager.trackMetric(id, { shareActions, interactions });
  //       }

  //       finalObservability.onShare?.(code, language);
  //       finalObservability.onInteraction?.("share", {
  //         language,
  //         codeLength: code.length,
  //       });

  //       if (isDevelopment) {
  //         console.log(`[CodeBlock:${id}] Code shared`, { language });
  //       }
  //     } catch (error) {
  //       console.error("Failed to share code:", error);
  //     }
  //   }
  // }, [
  //   code,
  //   language,
  //   title,
  //   renderMetrics,
  //   finalConfig.enableAnalytics,
  //   finalObservability,
  //   analyticsManager,
  //   id,
  //   isDevelopment,
  // ]);

  // const syntaxHighlighterStyle = currentTheme === "dark" ? oneDark : oneLight;
  const syntaxHighlighterStyle = {}; // Temporary fix

  if (!code) {
    if (isDevelopment) {
      console.warn(`[CodeBlock:${id}] Empty code provided`);
    }
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(codeBlockVariants(finalStyleConfig), className)}
      data-code-block-id={id}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase">
            {language}
          </span>
          {title && (
            <span className="text-xs text-muted-foreground">• {title}</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {finalConfig.enableCopy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-muted transition-colors"
              title="Copy code"
            >
              {isCopied ? (
                <CheckIcon className="h-3 w-3 text-green-500" />
              ) : (
                <CopyIcon className="h-3 w-3" />
              )}
              {isCopied ? "Copied!" : "Copy"}
            </button>
          )}

          {finalConfig.enableDownload && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-muted transition-colors"
              title="Download code"
            >
              <DownloadIcon className="h-3 w-3" />
              Download
            </button>
          )}

          {/* Share button temporarily disabled due to TypeScript issues */}
          {/* {finalConfig.enableShare &&
            typeof navigator !== "undefined" &&
            navigator.share && (
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-muted transition-colors"
                title="Share code"
              >
                <ShareIcon className="h-3 w-3" />
                Share
              </button>
            )} */}
        </div>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={syntaxHighlighterStyle}
          showLineNumbers={finalConfig.showLineNumbers}
          wrapLines={finalConfig.wrapLines}
          customStyle={{
            margin: 0,
            background: "transparent",
            fontSize: "inherit",
            fontFamily: "inherit",
          }}
          codeTagProps={{
            style: {
              fontSize: "inherit",
              fontFamily: "inherit",
            },
          }}
        >
          {code.length > finalConfig.maxLines
            ? code.split("\n").slice(0, finalConfig.maxLines).join("\n") +
              "\n// ... truncated"
            : code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
});

// Re-export for convenience
export { codeBlockVariants };
export type CodeBlockVariantsProps = VariantProps<typeof codeBlockVariants>;

// Development utilities
if (process.env.NODE_ENV === "development") {
  (globalThis as any).__CodeBlockAnalytics =
    CodeBlockAnalyticsManager.getInstance();
  (globalThis as any).__CodeBlockPerformance =
    CodeBlockPerformanceManager.getInstance();
}
