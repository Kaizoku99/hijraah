import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe alert variants
export type AlertVariant = "default" | "destructive" | "warning" | "success";

// Context7 Pattern: Observability - Alert events for monitoring
interface AlertObservabilityContext {
  variant: AlertVariant;
  hasTitle: boolean;
  hasDescription: boolean;
  timestamp: number;
}

// Context7 Pattern: Tracing - Alert lifecycle events
const createAlertTrace = (context: AlertObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Alert:Context7:Trace]", {
      component: "Alert",
      ...context,
    });
  }
};

// Alert root component with Context7 patterns
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  children: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    // Context7 Pattern: Observability - Track alert rendering
    React.useEffect(() => {
      const hasTitle = React.Children.toArray(children).some(
        (child) => React.isValidElement(child) && child.type === AlertTitle,
      );
      const hasDescription = React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) && child.type === AlertDescription,
      );

      createAlertTrace({
        variant,
        hasTitle,
        hasDescription,
        timestamp: Date.now(),
      });
    }, [variant, children]);

    // Context7 Pattern: Provider Isolation - Variant styles abstraction
    const variantStyles = React.useMemo(() => {
      const variants = {
        default: "bg-background text-foreground border",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning:
          "border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-100 [&>svg]:text-orange-600",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100 [&>svg]:text-green-600",
      };
      return variants[variant];
    }, [variant]);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
          variantStyles,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Alert.displayName = "Alert";

// Alert Title with Context7 modularity
interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  AlertTitleProps
>(({ className, children, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </h5>
));
AlertTitle.displayName = "AlertTitle";

// Alert Description with Context7 modularity
interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  >
    {children}
  </div>
));
AlertDescription.displayName = "AlertDescription";

// Context7 Pattern: Factory Pattern - Alert creation utilities
export const createAlert = {
  success: (title: string, description?: string) => ({
    variant: "success" as const,
    title,
    description,
  }),
  warning: (title: string, description?: string) => ({
    variant: "warning" as const,
    title,
    description,
  }),
  error: (title: string, description?: string) => ({
    variant: "destructive" as const,
    title,
    description,
  }),
  info: (title: string, description?: string) => ({
    variant: "default" as const,
    title,
    description,
  }),
};
