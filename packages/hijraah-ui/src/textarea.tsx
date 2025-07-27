import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe textarea variants and states
export type TextareaVariant = "default" | "error" | "success" | "warning";
export type TextareaSize = "sm" | "md" | "lg";

// Context7 Pattern: Observability - Textarea interaction metrics
interface TextareaObservabilityContext {
  variant: TextareaVariant;
  size: TextareaSize;
  valueLength: number;
  maxLength?: number;
  isAutoResize: boolean;
  rowCount: number;
  hasError: boolean;
  isFocused: boolean;
  timestamp: number;
}

// Context7 Pattern: Tracing - Textarea lifecycle events
const createTextareaTrace = (context: TextareaObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Textarea:Context7:Trace]", {
      component: "Textarea",
      metrics: {
        characterUsage: context.maxLength
          ? `${context.valueLength}/${context.maxLength}`
          : context.valueLength,
        utilizationRate: context.maxLength
          ? ((context.valueLength / context.maxLength) * 100).toFixed(1) + "%"
          : "unlimited",
      },
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Textarea style system abstraction
class TextareaStyleProvider {
  private static readonly VARIANT_STYLES = {
    default: "border-input bg-background focus-visible:ring-ring",
    error: "border-destructive bg-background focus-visible:ring-destructive",
    success: "border-green-500 bg-background focus-visible:ring-green-500",
    warning: "border-orange-500 bg-background focus-visible:ring-orange-500",
  } as const;

  private static readonly SIZE_STYLES = {
    sm: "min-h-[80px] px-3 py-2 text-sm",
    md: "min-h-[100px] px-3 py-2 text-sm",
    lg: "min-h-[120px] px-4 py-3 text-base",
  } as const;

  private static readonly BASE_STYLES =
    "flex w-full rounded-md border placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200";

  static getVariantStyle(variant: TextareaVariant): string {
    return this.VARIANT_STYLES[variant];
  }

  static getSizeStyle(size: TextareaSize): string {
    return this.SIZE_STYLES[size];
  }

  static get baseStyles(): string {
    return this.BASE_STYLES;
  }
}

// Context7 Pattern: Resumability - Textarea state management
interface TextareaState {
  value: string;
  rowCount: number;
  isFocused: boolean;
  lastChangeTime: number;
  changeVelocity: number;
}

// Context7 Pattern: Resource Pooling - Auto-resize management
class TextareaResizeManager {
  private static instance: TextareaResizeManager;
  private resizeObserver: ResizeObserver;
  private managedElements = new Map<string, HTMLTextAreaElement>();

  constructor() {
    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLTextAreaElement;
        this.adjustHeight(element);
      });
    });
  }

  static getInstance(): TextareaResizeManager {
    if (!TextareaResizeManager.instance) {
      TextareaResizeManager.instance = new TextareaResizeManager();
    }
    return TextareaResizeManager.instance;
  }

  register(id: string, element: HTMLTextAreaElement): void {
    this.managedElements.set(id, element);
    this.resizeObserver.observe(element);
    this.adjustHeight(element);
  }

  unregister(id: string): void {
    const element = this.managedElements.get(id);
    if (element) {
      this.resizeObserver.unobserve(element);
      this.managedElements.delete(id);
    }
  }

  private adjustHeight(element: HTMLTextAreaElement): void {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }
}

// Textarea component with Context7 patterns
interface TextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "onFocus" | "onBlur"
  > {
  variant?: TextareaVariant;
  size?: TextareaSize;
  error?: string | boolean;
  autoResize?: boolean;
  showCharCount?: boolean;
  onChange?: (value: string, context: TextareaObservabilityContext) => void;
  onFocus?: (context: TextareaObservabilityContext) => void;
  onBlur?: (context: TextareaObservabilityContext) => void;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      error = false,
      autoResize = false,
      showCharCount = false,
      value: controlledValue,
      defaultValue,
      maxLength,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const resizeManagerRef = React.useRef(TextareaResizeManager.getInstance());
    const componentId = React.useRef(
      `textarea-${Math.random().toString(36).substr(2, 9)}`,
    );

    // Context7 Pattern: Resumability - Internal state management
    const [textareaState, setTextareaState] = React.useState<TextareaState>({
      value: (controlledValue || defaultValue || "") as string,
      rowCount: 1,
      isFocused: false,
      lastChangeTime: Date.now(),
      changeVelocity: 0,
    });

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled
      ? (controlledValue as string)
      : textareaState.value;
    const effectiveVariant = error ? "error" : variant;

    // Context7 Pattern: Resource management - Auto-resize setup
    React.useEffect(() => {
      const element = textareaRef.current;
      if (autoResize && element) {
        resizeManagerRef.current.register(componentId.current, element);
        return () => {
          resizeManagerRef.current.unregister(componentId.current);
        };
      }
    }, [autoResize]);

    // Context7 Pattern: Observability - Value change tracking
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        const now = Date.now();
        const timeDiff = now - textareaState.lastChangeTime;
        const changeVelocity = timeDiff > 0 ? 1 / timeDiff : 0;

        const newState = {
          value: newValue,
          rowCount: newValue.split("\n").length,
          isFocused: textareaState.isFocused,
          lastChangeTime: now,
          changeVelocity,
        };

        if (!isControlled) {
          setTextareaState(newState);
        }

        const context: TextareaObservabilityContext = {
          variant: effectiveVariant,
          size,
          valueLength: newValue.length,
          maxLength,
          isAutoResize: autoResize,
          rowCount: newState.rowCount,
          hasError: !!error,
          isFocused: textareaState.isFocused,
          timestamp: now,
        };

        createTextareaTrace(context);
        onChange?.(newValue, context);
      },
      [
        effectiveVariant,
        size,
        maxLength,
        autoResize,
        error,
        textareaState,
        isControlled,
        onChange,
      ],
    );

    // Context7 Pattern: Event-driven Architecture - Focus/blur handling
    const handleFocus = React.useCallback(
      (_event: React.FocusEvent<HTMLTextAreaElement>) => {
        setTextareaState((prev) => ({ ...prev, isFocused: true }));

        const context: TextareaObservabilityContext = {
          variant: effectiveVariant,
          size,
          valueLength: currentValue.length,
          maxLength,
          isAutoResize: autoResize,
          rowCount: textareaState.rowCount,
          hasError: !!error,
          isFocused: true,
          timestamp: Date.now(),
        };

        onFocus?.(context);
      },
      [
        effectiveVariant,
        size,
        currentValue.length,
        maxLength,
        autoResize,
        textareaState.rowCount,
        error,
        onFocus,
      ],
    );

    const handleBlur = React.useCallback(
      (_event: React.FocusEvent<HTMLTextAreaElement>) => {
        setTextareaState((prev) => ({ ...prev, isFocused: false }));

        const context: TextareaObservabilityContext = {
          variant: effectiveVariant,
          size,
          valueLength: currentValue.length,
          maxLength,
          isAutoResize: autoResize,
          rowCount: textareaState.rowCount,
          hasError: !!error,
          isFocused: false,
          timestamp: Date.now(),
        };

        onBlur?.(context);
      },
      [
        effectiveVariant,
        size,
        currentValue.length,
        maxLength,
        autoResize,
        textareaState.rowCount,
        error,
        onBlur,
      ],
    );

    // Context7 Pattern: Provider Isolation - Style computation
    const textareaStyles = React.useMemo(() => {
      return cn(
        TextareaStyleProvider.baseStyles,
        TextareaStyleProvider.getVariantStyle(effectiveVariant),
        TextareaStyleProvider.getSizeStyle(size),
        autoResize && "overflow-hidden",
        className,
      );
    }, [effectiveVariant, size, autoResize, className]);

    // Context7 Pattern: Data-as-Code - Character count calculation
    const characterInfo = React.useMemo(() => {
      const length = currentValue.length;
      const isOverLimit = maxLength ? length > maxLength : false;
      const percentage = maxLength ? (length / maxLength) * 100 : 0;

      return {
        current: length,
        max: maxLength,
        remaining: maxLength ? Math.max(0, maxLength - length) : 0,
        isOverLimit,
        percentage: Math.min(percentage, 100),
        variant: isOverLimit
          ? "error"
          : percentage > 80
            ? "warning"
            : "default",
      };
    }, [currentValue.length, maxLength]);

    return (
      <div className="w-full space-y-2">
        <textarea
          ref={(element) => {
            if (textareaRef.current !== element) {
              (
                textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>
              ).current = element;
            }
            if (typeof ref === "function") {
              ref(element);
            } else if (ref) {
              (
                ref as React.MutableRefObject<HTMLTextAreaElement | null>
              ).current = element;
            }
          }}
          className={textareaStyles}
          value={currentValue}
          maxLength={maxLength}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Context7 Pattern: Modularity - Character count and error display */}
        {(showCharCount || error) && (
          <div className="flex justify-between items-center text-xs">
            {typeof error === "string" && error && (
              <span className="text-destructive font-medium">{error}</span>
            )}
            {showCharCount && maxLength && (
              <span
                className={cn(
                  "font-medium",
                  characterInfo.variant === "error" && "text-destructive",
                  characterInfo.variant === "warning" && "text-orange-500",
                  characterInfo.variant === "default" &&
                    "text-muted-foreground",
                )}
              >
                {characterInfo.current}/{characterInfo.max}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

// Context7 Pattern: Factory Pattern - Textarea creation utilities
export const createTextarea = {
  comment: (placeholder: string = "Add your comment...") => ({
    placeholder,
    rows: 3,
    variant: "default" as const,
    autoResize: true,
  }),

  description: (placeholder: string = "Enter description...") => ({
    placeholder,
    rows: 4,
    variant: "default" as const,
    autoResize: true,
    showCharCount: true,
    maxLength: 500,
  }),

  message: (placeholder: string = "Type your message...") => ({
    placeholder,
    rows: 2,
    variant: "default" as const,
    autoResize: true,
    maxLength: 1000,
    showCharCount: true,
  }),

  feedback: (placeholder: string = "Share your feedback...") => ({
    placeholder,
    rows: 5,
    variant: "default" as const,
    autoResize: false,
    maxLength: 2000,
    showCharCount: true,
  }),
};

// Context7 Pattern: Modularity - Textarea composition helpers
export const TextareaComposed = {
  FieldTextarea: ({
    label,
    error,
    required = false,
    ...textareaProps
  }: TextareaProps & {
    label: string;
    required?: boolean;
  }) => {
    const fieldId = React.useId();

    return (
      <div className="space-y-2">
        <label
          htmlFor={fieldId}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            required && "after:content-['*'] after:text-destructive after:ml-1",
            error && "text-destructive",
          )}
        >
          {label}
        </label>
        <Textarea id={fieldId} error={error} {...textareaProps} />
      </div>
    );
  },

  AutoExpandingTextarea: (props: TextareaProps) => (
    <Textarea autoResize showCharCount variant="default" {...props} />
  ),
};
