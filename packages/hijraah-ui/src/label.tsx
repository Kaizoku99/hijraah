import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe label variants and states
export type LabelVariant =
  | "default"
  | "required"
  | "optional"
  | "error"
  | "success";
export type LabelSize = "sm" | "md" | "lg";

// Context7 Pattern: Observability - Label accessibility metrics
interface LabelObservabilityContext {
  variant: LabelVariant;
  size: LabelSize;
  hasFor: boolean;
  isRequired: boolean;
  hasError: boolean;
  timestamp: number;
}

// Context7 Pattern: Tracing - Label lifecycle events
const createLabelTrace = (context: LabelObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Label:Context7:Trace]", {
      component: "Label",
      accessibility: {
        hasFor: context.hasFor,
        isRequired: context.isRequired,
        hasError: context.hasError,
      },
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Label style system abstraction
class LabelStyleProvider {
  private static readonly VARIANT_STYLES = {
    default: "text-foreground",
    required:
      "text-foreground after:content-['*'] after:text-destructive after:ml-1",
    optional: "text-muted-foreground",
    error: "text-destructive",
    success: "text-green-600 dark:text-green-400",
  } as const;

  private static readonly SIZE_STYLES = {
    sm: "text-xs font-medium",
    md: "text-sm font-medium",
    lg: "text-base font-medium",
  } as const;

  static getVariantStyle(variant: LabelVariant): string {
    return this.VARIANT_STYLES[variant];
  }

  static getSizeStyle(size: LabelSize): string {
    return this.SIZE_STYLES[size];
  }
}

// Context7 Pattern: Resumability - Form field association management
interface LabelContext {
  labelId: string;
  fieldId?: string;
  isAssociated: boolean;
}

// Label component with Context7 patterns
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: LabelVariant;
  size?: LabelSize;
  required?: boolean;
  optional?: boolean;
  error?: string | boolean;
  children: React.ReactNode;
  // Context7 - Form field association
  fieldId?: string;
  onLabelClick?: (context: LabelContext) => void;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      required = false,
      optional = false,
      error = false,
      children,
      fieldId,
      htmlFor,
      onLabelClick,
      ...props
    },
    ref,
  ) => {
    const labelId = React.useId();
    const effectiveVariant = React.useMemo(() => {
      if (error) return "error";
      if (required) return "required";
      if (optional) return "optional";
      return variant;
    }, [variant, required, optional, error]);

    // Context7 Pattern: Observability - Track label rendering and accessibility
    React.useEffect(() => {
      const hasFor = !!(htmlFor || fieldId);
      const hasError = !!error;

      createLabelTrace({
        variant: effectiveVariant,
        size,
        hasFor,
        isRequired: required,
        hasError,
        timestamp: Date.now(),
      });
    }, [effectiveVariant, size, htmlFor, fieldId, required, error]);

    // Context7 Pattern: Event-driven Architecture - Label click handling
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLLabelElement>) => {
        const context: LabelContext = {
          labelId,
          fieldId: htmlFor || fieldId,
          isAssociated: !!(htmlFor || fieldId),
        };

        onLabelClick?.(context);
        props.onClick?.(event);
      },
      [labelId, htmlFor, fieldId, onLabelClick, props],
    );

    // Context7 Pattern: Provider Isolation - Style computation
    const labelStyles = React.useMemo(() => {
      return cn(
        "inline-block leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        LabelStyleProvider.getVariantStyle(effectiveVariant),
        LabelStyleProvider.getSizeStyle(size),
        className,
      );
    }, [effectiveVariant, size, className]);

    return (
      <label
        ref={ref}
        id={labelId}
        htmlFor={htmlFor || fieldId}
        className={labelStyles}
        onClick={handleClick}
        {...props}
      >
        {children}
        {/* Context7 Pattern: Modularity - Error message integration */}
        {typeof error === "string" && error && (
          <span className="block mt-1 text-xs text-destructive">{error}</span>
        )}
      </label>
    );
  },
);
Label.displayName = "Label";

// Context7 Pattern: Factory Pattern - Label creation utilities
export const createLabel = {
  required: (text: string, fieldId?: string) => ({
    variant: "required" as const,
    fieldId,
    children: text,
  }),

  optional: (text: string, fieldId?: string) => ({
    variant: "optional" as const,
    fieldId,
    children: text,
  }),

  error: (text: string, errorMessage: string, fieldId?: string) => ({
    variant: "error" as const,
    error: errorMessage,
    fieldId,
    children: text,
  }),

  success: (text: string, fieldId?: string) => ({
    variant: "success" as const,
    fieldId,
    children: text,
  }),
};

// Context7 Pattern: Modularity - Label composition helpers
export const LabelComposed = {
  FieldLabel: ({
    label,
    required = false,
    error,
    fieldId,
  }: {
    label: string;
    required?: boolean;
    error?: string;
    fieldId: string;
  }) => (
    <Label
      variant={error ? "error" : required ? "required" : "default"}
      error={error}
      fieldId={fieldId}
      required={required}
    >
      {label}
    </Label>
  ),

  FormSection: ({
    title,
    description,
    children,
  }: {
    title: string;
    description?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label size="lg" variant="default">
          {title}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  ),
};
