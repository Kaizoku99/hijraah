import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe scroll configurations
export type ScrollDirection = "horizontal" | "vertical" | "both";
export type ScrollBarVariant = "default" | "minimal" | "hidden";

// Context7 Pattern: Observability - Scroll metrics for performance monitoring
interface ScrollObservabilityContext {
  direction: ScrollDirection;
  variant: ScrollBarVariant;
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
  isScrolling: boolean;
  timestamp: number;
}

// Context7 Pattern: Tracing - Scroll lifecycle events
const createScrollTrace = (context: Partial<ScrollObservabilityContext>) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[ScrollArea:Context7:Trace]", {
      component: "ScrollArea",
      ...context,
    });
  }
};

// Context7 Pattern: Resource Pooling - Scroll event throttling
class ScrollEventManager {
  private static instance: ScrollEventManager;
  private throttledCallbacks = new Map<string, number>();
  private readonly throttleDelay = 16; // ~60fps

  static getInstance(): ScrollEventManager {
    if (!ScrollEventManager.instance) {
      ScrollEventManager.instance = new ScrollEventManager();
    }
    return ScrollEventManager.instance;
  }

  // Context7 Pattern: Performance optimization - Throttled scroll events
  throttledScroll(
    id: string,
    callback: (event: Event) => void,
  ): (event: Event) => void {
    return (event: Event) => {
      const now = Date.now();
      const lastCall = this.throttledCallbacks.get(id) || 0;

      if (now - lastCall >= this.throttleDelay) {
        this.throttledCallbacks.set(id, now);
        callback(event);
      }
    };
  }

  // Context7 Pattern: Resource cleanup
  cleanup(id: string): void {
    this.throttledCallbacks.delete(id);
  }
}

// Context7 Pattern: Provider Isolation - ScrollBar style abstraction
class ScrollBarStyleProvider {
  private static readonly VARIANT_STYLES = {
    default: {
      track: "bg-border",
      thumb: "bg-border",
      thumbHover: "hover:bg-border/80",
    },
    minimal: {
      track: "bg-transparent",
      thumb: "bg-muted",
      thumbHover: "hover:bg-muted/80",
    },
    hidden: {
      track: "hidden",
      thumb: "hidden",
      thumbHover: "",
    },
  } as const;

  static getVariantStyles(variant: ScrollBarVariant) {
    return this.VARIANT_STYLES[variant];
  }
}

// Context7 Pattern: Resumability - Scroll position state management
interface ScrollState {
  scrollTop: number;
  scrollLeft: number;
  isScrolling: boolean;
  lastScrollTime: number;
}

// ScrollArea component with Context7 patterns
interface ScrollAreaProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onScroll"> {
  direction?: ScrollDirection;
  variant?: ScrollBarVariant;
  onScroll?: (context: ScrollObservabilityContext) => void;
  scrollHideDelay?: number;
  children: React.ReactNode;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      direction = "vertical",
      variant = "default",
      onScroll,
      scrollHideDelay = 1000,
      children,
      ...props
    },
    ref,
  ) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const scrollManagerRef = React.useRef(ScrollEventManager.getInstance());
    const componentId = React.useRef(
      `scroll-${Math.random().toString(36).substr(2, 9)}`,
    );

    // Context7 Pattern: Resumability - Scroll state management
    const [scrollState, setScrollState] = React.useState<ScrollState>({
      scrollTop: 0,
      scrollLeft: 0,
      isScrolling: false,
      lastScrollTime: 0,
    });

    // Context7 Pattern: Resource pooling - Scroll hide timer
    const scrollHideTimer = React.useRef<NodeJS.Timeout>();

    // Context7 Pattern: Observability - Scroll event handling
    const handleScroll = React.useCallback(
      (event: Event) => {
        const target = event.target as HTMLDivElement;
        if (!target) return;

        const now = Date.now();
        const context: ScrollObservabilityContext = {
          direction,
          variant,
          scrollTop: target.scrollTop,
          scrollLeft: target.scrollLeft,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          clientHeight: target.clientHeight,
          clientWidth: target.clientWidth,
          isScrolling: true,
          timestamp: now,
        };

        setScrollState({
          scrollTop: target.scrollTop,
          scrollLeft: target.scrollLeft,
          isScrolling: true,
          lastScrollTime: now,
        });

        createScrollTrace(context);
        onScroll?.(context);

        // Context7 Pattern: Resumability - Auto-hide scrollbars
        if (scrollHideTimer.current) {
          clearTimeout(scrollHideTimer.current);
        }

        scrollHideTimer.current = setTimeout(() => {
          setScrollState((prev) => ({ ...prev, isScrolling: false }));
        }, scrollHideDelay);
      },
      [direction, variant, onScroll, scrollHideDelay],
    );

    // Context7 Pattern: Resource management - Event listener setup
    React.useEffect(() => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;

      const throttledHandler = scrollManagerRef.current.throttledScroll(
        componentId.current,
        handleScroll,
      );

      scrollElement.addEventListener("scroll", throttledHandler, {
        passive: true,
      });

      return () => {
        scrollElement.removeEventListener("scroll", throttledHandler);
        scrollManagerRef.current.cleanup(componentId.current);
        if (scrollHideTimer.current) {
          clearTimeout(scrollHideTimer.current);
        }
      };
    }, [handleScroll]);

    // Context7 Pattern: Provider Isolation - Style computation
    const scrollAreaStyles = React.useMemo(() => {
      const directionClasses = {
        horizontal: "overflow-x-auto overflow-y-hidden",
        vertical: "overflow-y-auto overflow-x-hidden",
        both: "overflow-auto",
      };

      return cn("relative", directionClasses[direction], className);
    }, [direction, className]);

    const scrollBarStyles = React.useMemo(() => {
      const variantStyles = ScrollBarStyleProvider.getVariantStyles(variant);

      return {
        scrollbarWidth:
          variant === "hidden" ? ("none" as const) : ("thin" as const),
        scrollbarColor:
          variant === "hidden"
            ? "transparent transparent"
            : `${variantStyles.thumb.replace("bg-", "")} ${variantStyles.track.replace("bg-", "")}`,
        msOverflowStyle:
          variant === "hidden" ? ("none" as const) : ("auto" as const),
        ...(variant === "hidden" && {
          WebkitScrollbarWidth: "0px",
          WebkitScrollbarBackground: "transparent",
        }),
      } as React.CSSProperties;
    }, [variant]);

    return (
      <div ref={ref} className={scrollAreaStyles} {...props}>
        <div ref={scrollRef} className="h-full w-full" style={scrollBarStyles}>
          {children}
        </div>

        {/* Context7 Pattern: Modularity - Custom scrollbar indicators */}
        {variant !== "hidden" && direction !== "horizontal" && (
          <div
            className={cn(
              "absolute right-0 top-0 w-2 h-full transition-opacity duration-300",
              scrollState.isScrolling ? "opacity-100" : "opacity-0",
            )}
          >
            <div
              className={cn(
                "w-full rounded bg-muted transition-colors",
                ScrollBarStyleProvider.getVariantStyles(variant).thumb,
                ScrollBarStyleProvider.getVariantStyles(variant).thumbHover,
              )}
              style={{
                height: `${((scrollRef.current?.clientHeight || 0) / (scrollRef.current?.scrollHeight || 1)) * 100}%`,
                transform: `translateY(${(scrollState.scrollTop / ((scrollRef.current?.scrollHeight || 1) - (scrollRef.current?.clientHeight || 0))) * 100}%)`,
              }}
            />
          </div>
        )}

        {variant !== "hidden" && direction !== "vertical" && (
          <div
            className={cn(
              "absolute bottom-0 left-0 h-2 w-full transition-opacity duration-300",
              scrollState.isScrolling ? "opacity-100" : "opacity-0",
            )}
          >
            <div
              className={cn(
                "h-full rounded bg-muted transition-colors",
                ScrollBarStyleProvider.getVariantStyles(variant).thumb,
                ScrollBarStyleProvider.getVariantStyles(variant).thumbHover,
              )}
              style={{
                width: `${((scrollRef.current?.clientWidth || 0) / (scrollRef.current?.scrollWidth || 1)) * 100}%`,
                transform: `translateX(${(scrollState.scrollLeft / ((scrollRef.current?.scrollWidth || 1) - (scrollRef.current?.clientWidth || 0))) * 100}%)`,
              }}
            />
          </div>
        )}
      </div>
    );
  },
);
ScrollArea.displayName = "ScrollArea";

// Context7 Pattern: Factory Pattern - ScrollArea creation utilities
export const createScrollArea = {
  chat: () => ({
    direction: "vertical" as const,
    variant: "minimal" as const,
    className: "flex-1 p-4",
  }),

  sidebar: () => ({
    direction: "vertical" as const,
    variant: "default" as const,
    className: "h-full",
  }),

  table: () => ({
    direction: "both" as const,
    variant: "default" as const,
    className: "border rounded-md",
  }),

  code: () => ({
    direction: "both" as const,
    variant: "minimal" as const,
    className: "font-mono text-sm",
  }),
};

// Context7 Pattern: Modularity - ScrollArea composition helpers
export const ScrollAreaComposed = {
  VirtualizedList: ({
    items,
    renderItem,
    itemHeight = 40,
    containerHeight = 400,
  }: {
    items: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
    itemHeight?: number;
    containerHeight?: number;
  }) => {
    const [scrollTop, setScrollTop] = React.useState(0);

    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length,
    );

    const visibleItems = items.slice(startIndex, endIndex);

    return (
      <ScrollArea
        className="relative"
        style={{ height: containerHeight }}
        onScroll={(context) => setScrollTop(context.scrollTop)}
      >
        <div
          style={{ height: items.length * itemHeight, position: "relative" }}
        >
          <div
            style={{
              transform: `translateY(${startIndex * itemHeight}px)`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map((item, index) => (
              <div key={startIndex + index} style={{ height: itemHeight }}>
                {renderItem(item, startIndex + index)}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    );
  },
};
