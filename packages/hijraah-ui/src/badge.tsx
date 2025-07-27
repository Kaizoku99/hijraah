import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe badge variants and sizes
export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "warning";

export type BadgeSize = "sm" | "md" | "lg";

// Context7 Pattern: Observability - Badge metrics for monitoring
interface BadgeObservabilityContext {
  variant: BadgeVariant;
  size: BadgeSize;
  hasIcon: boolean;
  timestamp: number;
}

// Context7 Pattern: Tracing - Badge lifecycle events
const createBadgeTrace = (context: BadgeObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Badge:Context7:Trace]", {
      component: "Badge",
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Style system abstraction
class BadgeStyleProvider {
  private static readonly VARIANT_STYLES = {
    default:
      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline:
      "text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    success:
      "border-transparent bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-100",
    warning:
      "border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-100",
  } as const;

  private static readonly SIZE_STYLES = {
    sm: "text-xs px-2 py-0.5 h-5",
    md: "text-sm px-2.5 py-0.5 h-6",
    lg: "text-base px-3 py-1 h-7",
  } as const;

  static getVariantStyle(variant: BadgeVariant): string {
    return this.VARIANT_STYLES[variant];
  }

  static getSizeStyle(size: BadgeSize): string {
    return this.SIZE_STYLES[size];
  }
}

// Badge component with Context7 patterns
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref,
  ) => {
    // Context7 Pattern: Observability - Track badge rendering
    React.useEffect(() => {
      const hasIcon = React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) &&
          (child.props?.className?.includes("icon") ||
            child.type?.toString().includes("Icon")),
      );

      createBadgeTrace({
        variant,
        size,
        hasIcon,
        timestamp: Date.now(),
      });
    }, [variant, size, children]);

    // Context7 Pattern: Provider Isolation - Style computation
    const badgeStyles = React.useMemo(() => {
      return cn(
        "inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        BadgeStyleProvider.getVariantStyle(variant),
        BadgeStyleProvider.getSizeStyle(size),
        className,
      );
    }, [variant, size, className]);

    return (
      <div ref={ref} className={badgeStyles} {...props}>
        {children}
      </div>
    );
  },
);
Badge.displayName = "Badge";

// Context7 Pattern: Factory Pattern - Badge creation utilities
export const createBadge = {
  status: {
    success: (text: string) => ({
      variant: "success" as const,
      children: text,
    }),
    warning: (text: string) => ({
      variant: "warning" as const,
      children: text,
    }),
    error: (text: string) => ({
      variant: "destructive" as const,
      children: text,
    }),
    info: (text: string) => ({ variant: "default" as const, children: text }),
  },
  size: {
    small: (text: string, variant: BadgeVariant = "default") => ({
      variant,
      size: "sm" as const,
      children: text,
    }),
    medium: (text: string, variant: BadgeVariant = "default") => ({
      variant,
      size: "md" as const,
      children: text,
    }),
    large: (text: string, variant: BadgeVariant = "default") => ({
      variant,
      size: "lg" as const,
      children: text,
    }),
  },
};

// Context7 Pattern: Modularity - Badge composition helpers
export const BadgeComposed = {
  StatusBadge: ({
    status,
    children,
  }: {
    status: "success" | "warning" | "error" | "info";
    children: React.ReactNode;
  }) => (
    <Badge
      variant={
        status === "success"
          ? "success"
          : status === "warning"
            ? "warning"
            : status === "error"
              ? "destructive"
              : "default"
      }
    >
      {children}
    </Badge>
  ),

  CountBadge: ({ count, max = 99 }: { count: number; max?: number }) => (
    <Badge variant="secondary" size="sm">
      {count > max ? `${max}+` : count}
    </Badge>
  ),

  DotBadge: ({ variant = "default" }: { variant?: BadgeVariant }) => (
    <Badge variant={variant} size="sm" className="h-2 w-2 p-0 rounded-full">
      <span className="sr-only">Status indicator</span>
    </Badge>
  ),
};
