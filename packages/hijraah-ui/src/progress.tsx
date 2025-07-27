import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe progress variants and states
export type ProgressVariant = "default" | "success" | "warning" | "destructive";
export type ProgressSize = "sm" | "md" | "lg";

// Context7 Pattern: Observability - Progress metrics for monitoring
interface ProgressObservabilityContext {
  value: number;
  max: number;
  variant: ProgressVariant;
  size: ProgressSize;
  isIndeterminate: boolean;
  timestamp: number;
  changeRate?: number; // Context7 - Track progress velocity
}

// Context7 Pattern: Tracing - Progress lifecycle events
const createProgressTrace = (context: ProgressObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Progress:Context7:Trace]", {
      component: "Progress",
      percentage: ((context.value / context.max) * 100).toFixed(1),
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Style system abstraction
class ProgressStyleProvider {
  private static readonly VARIANT_STYLES = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-orange-500",
    destructive: "bg-destructive",
  } as const;

  private static readonly SIZE_STYLES = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  } as const;

  private static readonly CONTAINER_STYLES =
    "relative h-4 w-full overflow-hidden rounded-full bg-secondary";
  private static readonly INDICATOR_BASE =
    "h-full w-full flex-1 transition-all duration-300 ease-in-out";

  static getVariantStyle(variant: ProgressVariant): string {
    return this.VARIANT_STYLES[variant];
  }

  static getSizeStyle(size: ProgressSize): string {
    return this.SIZE_STYLES[size];
  }

  static get containerStyles(): string {
    return this.CONTAINER_STYLES;
  }

  static get indicatorBaseStyles(): string {
    return this.INDICATOR_BASE;
  }
}

// Context7 Pattern: Resumability - Progress state management
interface ProgressState {
  currentValue: number;
  previousValue: number;
  changeRate: number;
  lastUpdateTime: number;
}

// Progress component with Context7 patterns
interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onProgress"> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  indeterminate?: boolean;
  showPercentage?: boolean;
  label?: string;
  onProgress?: (progress: {
    value: number;
    percentage: number;
    isComplete: boolean;
  }) => void;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      indeterminate = false,
      showPercentage = false,
      label,
      onProgress,
      ...props
    },
    ref,
  ) => {
    // Context7 Pattern: Resumability - State management
    const [progressState, setProgressState] = React.useState<ProgressState>({
      currentValue: value,
      previousValue: value,
      changeRate: 0,
      lastUpdateTime: Date.now(),
    });

    // Context7 Pattern: Observability - Track progress changes
    React.useEffect(() => {
      const now = Date.now();
      const timeDiff = now - progressState.lastUpdateTime;
      const valueDiff = value - progressState.previousValue;
      const changeRate = timeDiff > 0 ? valueDiff / timeDiff : 0;

      setProgressState({
        currentValue: value,
        previousValue: progressState.currentValue,
        changeRate,
        lastUpdateTime: now,
      });

      createProgressTrace({
        value,
        max,
        variant,
        size,
        isIndeterminate: indeterminate,
        timestamp: now,
        changeRate,
      });

      // Context7 Pattern: Event-driven Architecture - Progress callbacks
      if (onProgress) {
        const percentage = (value / max) * 100;
        const isComplete = value >= max;
        onProgress({ value, percentage, isComplete });
      }
    }, [
      value,
      max,
      variant,
      size,
      indeterminate,
      onProgress,
      progressState.currentValue,
      progressState.lastUpdateTime,
    ]);

    // Context7 Pattern: Provider Isolation - Style computation
    const containerStyles = React.useMemo(() => {
      return cn(
        ProgressStyleProvider.containerStyles,
        ProgressStyleProvider.getSizeStyle(size),
        className,
      );
    }, [size, className]);

    const indicatorStyles = React.useMemo(() => {
      return cn(
        ProgressStyleProvider.indicatorBaseStyles,
        ProgressStyleProvider.getVariantStyle(variant),
        indeterminate && "animate-pulse",
      );
    }, [variant, indeterminate]);

    // Context7 Pattern: Data-as-Code - Computed values
    const percentage = React.useMemo(() => {
      return Math.min(Math.max((value / max) * 100, 0), 100);
    }, [value, max]);

    const progressStyle = React.useMemo(() => {
      if (indeterminate) {
        return {
          width: "30%",
          animation: "progress-indeterminate 2s ease-in-out infinite",
        };
      }
      return { width: `${percentage}%` };
    }, [percentage, indeterminate]);

    return (
      <div className="w-full space-y-2">
        {(label || showPercentage) && (
          <div className="flex justify-between text-sm text-muted-foreground">
            {label && <span>{label}</span>}
            {showPercentage && !indeterminate && (
              <span>{percentage.toFixed(0)}%</span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={containerStyles}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-label={label || "Progress"}
          {...props}
        >
          <div className={indicatorStyles} style={progressStyle} />
        </div>
      </div>
    );
  },
);
Progress.displayName = "Progress";

// Context7 Pattern: Factory Pattern - Progress creation utilities
export const createProgress = {
  upload: (progress: number) => ({
    value: progress,
    max: 100,
    variant: "default" as const,
    label: "Uploading...",
    showPercentage: true,
  }),

  loading: () => ({
    indeterminate: true,
    variant: "default" as const,
    label: "Loading...",
  }),

  success: (value: number, max: number = 100) => ({
    value,
    max,
    variant: "success" as const,
    showPercentage: true,
  }),

  warning: (value: number, max: number = 100) => ({
    value,
    max,
    variant: "warning" as const,
    showPercentage: true,
  }),

  error: (value: number, max: number = 100) => ({
    value,
    max,
    variant: "destructive" as const,
    showPercentage: true,
  }),
};

// Context7 Pattern: Modularity - Progress composition helpers
export const ProgressComposed = {
  SteppedProgress: ({
    currentStep,
    totalSteps,
    stepLabels,
  }: {
    currentStep: number;
    totalSteps: number;
    stepLabels?: string[];
  }) => {
    const progress = (currentStep / totalSteps) * 100;
    const currentLabel =
      stepLabels?.[currentStep - 1] || `Step ${currentStep} of ${totalSteps}`;

    return (
      <Progress
        value={progress}
        max={100}
        label={currentLabel}
        showPercentage={false}
        variant={currentStep === totalSteps ? "success" : "default"}
      />
    );
  },

  TimedProgress: ({
    duration,
    onComplete,
  }: {
    duration: number;
    onComplete?: () => void;
  }) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 100 / (duration / 100);
          if (next >= 100) {
            clearInterval(interval);
            onComplete?.();
            return 100;
          }
          return next;
        });
      }, 100);

      return () => clearInterval(interval);
    }, [duration, onComplete]);

    return <Progress value={progress} max={100} showPercentage />;
  },
};
