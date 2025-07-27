"use client";

import React, {
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./styles";

// ============================================================================
// Context7 Pattern 5: Data-as-Code - Type-safe configuration interfaces
// ============================================================================

export interface TypingIndicatorConfig {
  dotCount?: number;
  animationSpeed?: "slow" | "normal" | "fast";
  enableAnalytics?: boolean;
  showLabel?: boolean;
  label?: string;
  autoHide?: boolean;
  autoHideDelay?: number;
  enablePulse?: boolean;
  className?: string;
}

export interface TypingIndicatorMetrics {
  totalDisplayTime: number;
  animationCycles: number;
  userInteractions: number;
  performanceMetrics: {
    averageFps: number;
    frameDrops: number;
    cpuUsage: number;
  };
}

export interface TypingIndicatorObservability {
  onShow?: (metrics?: Partial<TypingIndicatorMetrics>) => void;
  onHide?: (metrics?: Partial<TypingIndicatorMetrics>) => void;
  onAnimationCycle?: (cycle: number) => void;
  onPerformanceUpdate?: (
    metrics: TypingIndicatorMetrics["performanceMetrics"],
  ) => void;
}

// ============================================================================
// Context7 Pattern 7: Resource Pooling - Performance optimization singletons
// ============================================================================

class TypingIndicatorPerformanceManager {
  private static instance: TypingIndicatorPerformanceManager;
  private animationFrames = new Map<string, number>();
  private performanceData = new Map<
    string,
    {
      frameCount: number;
      lastFrameTime: number;
      fps: number[];
      drops: number;
    }
  >();
  private readonly MAX_FPS_SAMPLES = 60;

  static getInstance(): TypingIndicatorPerformanceManager {
    if (!TypingIndicatorPerformanceManager.instance) {
      TypingIndicatorPerformanceManager.instance =
        new TypingIndicatorPerformanceManager();
    }
    return TypingIndicatorPerformanceManager.instance;
  }

  startAnimation(id: string, callback: () => void): void {
    const animate = (currentTime: number) => {
      const perfData = this.performanceData.get(id) || {
        frameCount: 0,
        lastFrameTime: currentTime,
        fps: [],
        drops: 0,
      };

      // Calculate FPS
      if (perfData.lastFrameTime > 0) {
        const timeDelta = currentTime - perfData.lastFrameTime;
        const currentFps = 1000 / timeDelta;

        perfData.fps.push(currentFps);
        if (perfData.fps.length > this.MAX_FPS_SAMPLES) {
          perfData.fps.shift();
        }

        // Detect frame drops (< 55fps for 60fps target)
        if (currentFps < 55) {
          perfData.drops++;
        }
      }

      perfData.frameCount++;
      perfData.lastFrameTime = currentTime;
      this.performanceData.set(id, perfData);

      callback();

      const frameId = requestAnimationFrame(animate);
      this.animationFrames.set(id, frameId);
    };

    const frameId = requestAnimationFrame(animate);
    this.animationFrames.set(id, frameId);
  }

  stopAnimation(id: string): void {
    const frameId = this.animationFrames.get(id);
    if (frameId) {
      cancelAnimationFrame(frameId);
      this.animationFrames.delete(id);
    }
  }

  getPerformanceMetrics(
    id: string,
  ): TypingIndicatorMetrics["performanceMetrics"] {
    const perfData = this.performanceData.get(id);
    if (!perfData) {
      return { averageFps: 0, frameDrops: 0, cpuUsage: 0 };
    }

    const averageFps =
      perfData.fps.length > 0
        ? perfData.fps.reduce((sum, fps) => sum + fps, 0) / perfData.fps.length
        : 0;

    return {
      averageFps: Math.round(averageFps),
      frameDrops: perfData.drops,
      cpuUsage: Math.min(100, Math.max(0, (60 - averageFps) * 2)), // Rough CPU usage estimation
    };
  }

  cleanup(id: string): void {
    this.stopAnimation(id);
    this.performanceData.delete(id);
  }
}

class TypingIndicatorAnalyticsManager {
  private static instance: TypingIndicatorAnalyticsManager;
  private analytics = new Map<string, TypingIndicatorMetrics>();

  static getInstance(): TypingIndicatorAnalyticsManager {
    if (!TypingIndicatorAnalyticsManager.instance) {
      TypingIndicatorAnalyticsManager.instance =
        new TypingIndicatorAnalyticsManager();
    }
    return TypingIndicatorAnalyticsManager.instance;
  }

  trackMetric(id: string, metric: Partial<TypingIndicatorMetrics>): void {
    const existing = this.analytics.get(id) || {
      totalDisplayTime: 0,
      animationCycles: 0,
      userInteractions: 0,
      performanceMetrics: {
        averageFps: 0,
        frameDrops: 0,
        cpuUsage: 0,
      },
    };
    this.analytics.set(id, { ...existing, ...metric });
  }

  getMetrics(id: string): TypingIndicatorMetrics | undefined {
    return this.analytics.get(id);
  }

  getAllMetrics(): Record<string, TypingIndicatorMetrics> {
    return Object.fromEntries(this.analytics);
  }

  getAveragePerformance(): TypingIndicatorMetrics["performanceMetrics"] {
    const allMetrics = Array.from(this.analytics.values());
    if (allMetrics.length === 0) {
      return { averageFps: 0, frameDrops: 0, cpuUsage: 0 };
    }

    const totals = allMetrics.reduce(
      (acc, metrics) => ({
        averageFps: acc.averageFps + metrics.performanceMetrics.averageFps,
        frameDrops: acc.frameDrops + metrics.performanceMetrics.frameDrops,
        cpuUsage: acc.cpuUsage + metrics.performanceMetrics.cpuUsage,
      }),
      { averageFps: 0, frameDrops: 0, cpuUsage: 0 },
    );

    return {
      averageFps: Math.round(totals.averageFps / allMetrics.length),
      frameDrops: Math.round(totals.frameDrops / allMetrics.length),
      cpuUsage: Math.round(totals.cpuUsage / allMetrics.length),
    };
  }
}

// ============================================================================
// Context7 Pattern 6: Provider Isolation - Dedicated style providers
// ============================================================================

export interface TypingIndicatorStyleConfig {
  variant: "default" | "minimal" | "pulse" | "wave" | "bounce";
  size: "sm" | "md" | "lg";
  color: "default" | "primary" | "accent" | "muted";
}

const typingIndicatorVariants = cva("flex items-center space-x-1", {
  variants: {
    variant: {
      default: "animate-pulse",
      minimal: "",
      pulse: "animate-pulse",
      wave: "",
      bounce: "",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    color: {
      default: "text-foreground",
      primary: "text-primary",
      accent: "text-accent-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    color: "muted",
  },
});

const dotVariants = cva("rounded-full", {
  variants: {
    size: {
      sm: "w-1 h-1",
      md: "w-1.5 h-1.5",
      lg: "w-2 h-2",
    },
    color: {
      default: "bg-current",
      primary: "bg-primary",
      accent: "bg-accent",
      muted: "bg-muted-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export interface TypingIndicatorStyleProviderProps {
  children: React.ReactNode;
  config: TypingIndicatorStyleConfig;
}

const TypingIndicatorStyleContext =
  React.createContext<TypingIndicatorStyleConfig>({
    variant: "default",
    size: "md",
    color: "muted",
  });

export function TypingIndicatorStyleProvider({
  children,
  config,
}: TypingIndicatorStyleProviderProps) {
  return (
    <TypingIndicatorStyleContext.Provider value={config}>
      {children}
    </TypingIndicatorStyleContext.Provider>
  );
}

// ============================================================================
// Context7 Pattern 1: Observability - Built-in metrics and analytics
// ============================================================================

const TypingIndicatorObservabilityContext =
  React.createContext<TypingIndicatorObservability>({});

export interface TypingIndicatorObservabilityProviderProps {
  children: React.ReactNode;
  config: TypingIndicatorObservability;
}

export function TypingIndicatorObservabilityProvider({
  children,
  config,
}: TypingIndicatorObservabilityProviderProps) {
  return (
    <TypingIndicatorObservabilityContext.Provider value={config}>
      {children}
    </TypingIndicatorObservabilityContext.Provider>
  );
}

// ============================================================================
// Context7 Pattern 2: Modularity - Factory patterns and composition helpers
// ============================================================================

export interface TypingIndicatorFactoryConfig
  extends TypingIndicatorConfig,
    TypingIndicatorStyleConfig {
  observability?: TypingIndicatorObservability;
}

export const createTypingIndicator = {
  minimal:
    (config?: Partial<TypingIndicatorFactoryConfig>) =>
    (props: Omit<TypingIndicatorProps, "config" | "styleConfig">) => (
      <TypingIndicator
        {...props}
        config={{
          dotCount: 3,
          animationSpeed: "normal",
          enableAnalytics: false,
          showLabel: false,
          autoHide: false,
          enablePulse: false,
          ...config,
        }}
        styleConfig={{
          variant: "minimal",
          size: "sm",
          color: "muted",
          ...config,
        }}
      />
    ),

  enhanced:
    (config?: Partial<TypingIndicatorFactoryConfig>) =>
    (props: Omit<TypingIndicatorProps, "config" | "styleConfig">) => (
      <TypingIndicator
        {...props}
        config={{
          dotCount: 4,
          animationSpeed: "normal",
          enableAnalytics: true,
          showLabel: true,
          label: "AI is thinking...",
          autoHide: true,
          autoHideDelay: 5000,
          enablePulse: true,
          ...config,
        }}
        styleConfig={{
          variant: "wave",
          size: "md",
          color: "primary",
          ...config,
        }}
      />
    ),

  pulse:
    (config?: Partial<TypingIndicatorFactoryConfig>) =>
    (props: Omit<TypingIndicatorProps, "config" | "styleConfig">) => (
      <TypingIndicator
        {...props}
        config={{
          dotCount: 3,
          animationSpeed: "slow",
          enableAnalytics: false,
          showLabel: false,
          enablePulse: true,
          ...config,
        }}
        styleConfig={{
          variant: "pulse",
          size: "md",
          color: "accent",
          ...config,
        }}
      />
    ),

  wave:
    (config?: Partial<TypingIndicatorFactoryConfig>) =>
    (props: Omit<TypingIndicatorProps, "config" | "styleConfig">) => (
      <TypingIndicator
        {...props}
        config={{
          dotCount: 5,
          animationSpeed: "fast",
          enableAnalytics: true,
          showLabel: true,
          label: "Processing...",
          ...config,
        }}
        styleConfig={{
          variant: "wave",
          size: "lg",
          color: "default",
          ...config,
        }}
      />
    ),
};

export const TypingIndicatorComposed = {
  MinimalIndicator: createTypingIndicator.minimal(),
  EnhancedIndicator: createTypingIndicator.enhanced(),
  PulseIndicator: createTypingIndicator.pulse(),
  WaveIndicator: createTypingIndicator.wave(),
};

// ============================================================================
// Main Component
// ============================================================================

export interface TypingIndicatorProps {
  isVisible?: boolean;
  config?: TypingIndicatorConfig;
  styleConfig?: TypingIndicatorStyleConfig;
  observability?: TypingIndicatorObservability;
  className?: string;
  id?: string;
}

export const TypingIndicator = memo(function TypingIndicator({
  isVisible = true,
  config = {},
  styleConfig,
  observability,
  className,
  id = crypto.randomUUID(),
}: TypingIndicatorProps) {
  // Context7 Pattern 6: Provider Isolation
  const contextStyleConfig = useContext(TypingIndicatorStyleContext);
  const contextObservability = useContext(TypingIndicatorObservabilityContext);

  const finalStyleConfig = styleConfig || contextStyleConfig;
  const finalObservability = { ...contextObservability, ...observability };
  const finalConfig = {
    dotCount: 3,
    animationSpeed: "normal" as const,
    enableAnalytics: true,
    showLabel: false,
    label: "Typing...",
    autoHide: false,
    autoHideDelay: 3000,
    enablePulse: false,
    ...config,
  };

  // Context7 Pattern 7: Resource Pooling
  const performanceManager = useMemo(
    () => TypingIndicatorPerformanceManager.getInstance(),
    [],
  );
  const analyticsManager = useMemo(
    () => TypingIndicatorAnalyticsManager.getInstance(),
    [],
  );

  // Context7 Pattern 3: Resumability - State preservation
  const [animationCycles, setAnimationCycles] = useState(0);
  const [isInternallyVisible, setIsInternallyVisible] = useState(isVisible);
  const [displayMetrics, setDisplayMetrics] = useState<
    Partial<TypingIndicatorMetrics>
  >({});
  const startTimeRef = useRef<number>(0);
  const autoHideTimeoutRef = useRef<NodeJS.Timeout>();

  // Context7 Pattern 4: Tracing - Development debugging
  const isDevelopment = process.env.NODE_ENV === "development";

  // Animation speed mapping
  const animationDelays = {
    slow: { delay: 600, stagger: 200 },
    normal: { delay: 400, stagger: 150 },
    fast: { delay: 200, stagger: 100 },
  };

  const delays = animationDelays[finalConfig.animationSpeed];

  useEffect(() => {
    if (isDevelopment) {
      console.log(`[TypingIndicator:${id}] Configuration`, {
        isVisible,
        config: finalConfig,
        styleConfig: finalStyleConfig,
      });
    }
  }, [isVisible, finalConfig, finalStyleConfig, id, isDevelopment]);

  // Context7 Pattern 1: Observability - Performance and visibility tracking
  useEffect(() => {
    if (isVisible && !isInternallyVisible) {
      startTimeRef.current = Date.now();
      setIsInternallyVisible(true);
      setAnimationCycles(0);

      finalObservability.onShow?.(displayMetrics);

      if (isDevelopment) {
        console.log(`[TypingIndicator:${id}] Shown`);
      }

      // Start performance monitoring
      if (finalConfig.enableAnalytics) {
        performanceManager.startAnimation(id, () => {
          setAnimationCycles((prev) => {
            const newCycles = prev + 1;
            if (newCycles % 10 === 0) {
              // Report every 10 cycles
              finalObservability.onAnimationCycle?.(newCycles);

              const perfMetrics = performanceManager.getPerformanceMetrics(id);
              finalObservability.onPerformanceUpdate?.(perfMetrics);

              analyticsManager.trackMetric(id, {
                animationCycles: newCycles,
                performanceMetrics: perfMetrics,
              });
            }
            return newCycles;
          });
        });
      }

      // Auto-hide functionality
      if (finalConfig.autoHide && finalConfig.autoHideDelay > 0) {
        autoHideTimeoutRef.current = setTimeout(() => {
          setIsInternallyVisible(false);
        }, finalConfig.autoHideDelay);
      }
    } else if (!isVisible && isInternallyVisible) {
      setIsInternallyVisible(false);
      const displayTime = Date.now() - startTimeRef.current;

      const finalMetrics: Partial<TypingIndicatorMetrics> = {
        totalDisplayTime: displayTime,
        animationCycles,
        performanceMetrics: performanceManager.getPerformanceMetrics(id),
      };

      setDisplayMetrics(finalMetrics);

      if (finalConfig.enableAnalytics) {
        analyticsManager.trackMetric(id, finalMetrics);
        performanceManager.cleanup(id);
      }

      finalObservability.onHide?.(finalMetrics);

      if (isDevelopment) {
        console.log(`[TypingIndicator:${id}] Hidden`, finalMetrics);
      }

      // Clear auto-hide timeout
      if (autoHideTimeoutRef.current) {
        clearTimeout(autoHideTimeoutRef.current);
      }
    }
  }, [
    isVisible,
    isInternallyVisible,
    finalConfig,
    finalObservability,
    performanceManager,
    analyticsManager,
    animationCycles,
    displayMetrics,
    id,
    isDevelopment,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (finalConfig.enableAnalytics) {
        performanceManager.cleanup(id);
      }
      if (autoHideTimeoutRef.current) {
        clearTimeout(autoHideTimeoutRef.current);
      }
    };
  }, [finalConfig.enableAnalytics, performanceManager, id]);

  if (!isInternallyVisible) {
    return null;
  }

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < finalConfig.dotCount; i++) {
      const animationDelay = `${i * delays.stagger}ms`;
      const animationDuration = `${delays.delay * 3}ms`;

      let animationClasses = "";
      if (finalStyleConfig.variant === "wave") {
        animationClasses = "animate-bounce";
      } else if (finalStyleConfig.variant === "pulse") {
        animationClasses = "animate-pulse";
      } else if (finalStyleConfig.variant === "bounce") {
        animationClasses = "animate-bounce";
      }

      dots.push(
        <div
          key={i}
          className={cn(
            dotVariants({
              size: finalStyleConfig.size,
              color: finalStyleConfig.color,
            }),
            animationClasses,
          )}
          style={{
            animationDelay,
            animationDuration,
            animationIterationCount: "infinite",
          }}
        />,
      );
    }
    return dots;
  };

  return (
    <div
      className={cn(typingIndicatorVariants(finalStyleConfig), className)}
      data-typing-indicator-id={id}
      data-animation-cycles={animationCycles}
    >
      {finalConfig.showLabel && finalConfig.label && (
        <span className="mr-2 text-xs opacity-70">{finalConfig.label}</span>
      )}

      <div className="flex items-center space-x-1">{renderDots()}</div>
    </div>
  );
});

// Re-export for convenience
export { typingIndicatorVariants, dotVariants };
export type TypingIndicatorVariantsProps = VariantProps<
  typeof typingIndicatorVariants
>;
export type DotVariantsProps = VariantProps<typeof dotVariants>;

// Development utilities
if (process.env.NODE_ENV === "development") {
  (globalThis as any).__TypingIndicatorAnalytics =
    TypingIndicatorAnalyticsManager.getInstance();
  (globalThis as any).__TypingIndicatorPerformance =
    TypingIndicatorPerformanceManager.getInstance();
}
