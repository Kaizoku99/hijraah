import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe navigation configurations
export type NavigationVariant =
  | "horizontal"
  | "vertical"
  | "breadcrumb"
  | "tabs";
export type NavigationSize = "sm" | "md" | "lg";
export type NavigationStyle = "default" | "pills" | "underline" | "minimal";

// Context7 Pattern: Data-as-Code - Navigation item structure
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  children?: NavigationItem[];
  metadata?: Record<string, any>;
}

// Context7 Pattern: Observability - Navigation interaction metrics
interface NavigationObservabilityContext {
  variant: NavigationVariant;
  style: NavigationStyle;
  size: NavigationSize;
  itemCount: number;
  activeItemId?: string;
  navigationDepth: number;
  clickCount: number;
  hoverCount: number;
  keyboardNavigationCount: number;
  sessionDuration: number;
  averageItemEngagement: number;
  timestamp: number;
}

// Context7 Pattern: Tracing - Navigation lifecycle and interaction events
const createNavigationTrace = (context: NavigationObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Navigation:Context7:Trace]", {
      component: "Navigation",
      structure: {
        variant: context.variant,
        style: context.style,
        itemCount: context.itemCount,
        depth: context.navigationDepth,
        activeItem: context.activeItemId || "none",
      },
      engagement: {
        totalClicks: context.clickCount,
        hoverInteractions: context.hoverCount,
        keyboardUsage: context.keyboardNavigationCount,
        sessionDuration: `${(context.sessionDuration / 1000).toFixed(1)}s`,
        avgEngagement: context.averageItemEngagement.toFixed(2),
      },
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Navigation style system
class NavigationStyleProvider {
  private static readonly VARIANT_STYLES = {
    horizontal: "flex flex-row space-x-1",
    vertical: "flex flex-col space-y-1",
    breadcrumb: "flex flex-row items-center space-x-2",
    tabs: "flex flex-row border-b border-border",
  } as const;

  private static readonly STYLE_STYLES = {
    default: {
      item: "px-3 py-2 rounded-md text-sm font-medium transition-colors",
      active: "bg-accent text-accent-foreground",
      hover: "hover:bg-accent/50 hover:text-accent-foreground",
    },
    pills: {
      item: "px-4 py-2 rounded-full text-sm font-medium transition-colors",
      active: "bg-primary text-primary-foreground",
      hover: "hover:bg-primary/10 hover:text-primary",
    },
    underline: {
      item: "px-3 py-2 text-sm font-medium transition-colors border-b-2 border-transparent",
      active: "border-primary text-primary",
      hover: "hover:border-primary/50 hover:text-primary",
    },
    minimal: {
      item: "px-2 py-1 text-sm transition-colors",
      active: "text-primary font-medium",
      hover: "hover:text-primary",
    },
  } as const;

  private static readonly SIZE_STYLES = {
    sm: {
      container: "text-xs",
      item: "px-2 py-1",
      icon: "h-3 w-3",
    },
    md: {
      container: "text-sm",
      item: "px-3 py-2",
      icon: "h-4 w-4",
    },
    lg: {
      container: "text-base",
      item: "px-4 py-3",
      icon: "h-5 w-5",
    },
  } as const;

  static getVariantStyle(variant: NavigationVariant): string {
    return this.VARIANT_STYLES[variant];
  }

  static getStyleConfig(
    style: NavigationStyle,
  ): (typeof NavigationStyleProvider.STYLE_STYLES)[NavigationStyle] {
    return this.STYLE_STYLES[style];
  }

  static getSizeConfig(
    size: NavigationSize,
  ): (typeof NavigationStyleProvider.SIZE_STYLES)[NavigationSize] {
    return this.SIZE_STYLES[size];
  }
}

// Context7 Pattern: Resource Pooling - Navigation interaction manager
class NavigationInteractionManager {
  private static instance: NavigationInteractionManager;
  private interactionData = new Map<
    string,
    {
      clickCount: number;
      hoverCount: number;
      keyboardNavigationCount: number;
      sessionStart: number;
      itemEngagements: Map<string, number>;
    }
  >();

  static getInstance(): NavigationInteractionManager {
    if (!NavigationInteractionManager.instance) {
      NavigationInteractionManager.instance =
        new NavigationInteractionManager();
    }
    return NavigationInteractionManager.instance;
  }

  register(navigationId: string): void {
    if (!this.interactionData.has(navigationId)) {
      this.interactionData.set(navigationId, {
        clickCount: 0,
        hoverCount: 0,
        keyboardNavigationCount: 0,
        sessionStart: Date.now(),
        itemEngagements: new Map(),
      });
    }
  }

  unregister(navigationId: string): void {
    this.interactionData.delete(navigationId);
  }

  trackClick(navigationId: string, itemId: string): void {
    const data = this.interactionData.get(navigationId);
    if (data) {
      data.clickCount++;
      const currentEngagement = data.itemEngagements.get(itemId) || 0;
      data.itemEngagements.set(itemId, currentEngagement + 1);
    }
  }

  trackHover(navigationId: string): void {
    const data = this.interactionData.get(navigationId);
    if (data) {
      data.hoverCount++;
    }
  }

  trackKeyboardNavigation(navigationId: string): void {
    const data = this.interactionData.get(navigationId);
    if (data) {
      data.keyboardNavigationCount++;
    }
  }

  getInteractionData(navigationId: string) {
    const data = this.interactionData.get(navigationId);
    if (!data) return null;

    const averageEngagement =
      data.itemEngagements.size > 0
        ? Array.from(data.itemEngagements.values()).reduce(
            (sum, count) => sum + count,
            0,
          ) / data.itemEngagements.size
        : 0;

    return {
      clickCount: data.clickCount,
      hoverCount: data.hoverCount,
      keyboardNavigationCount: data.keyboardNavigationCount,
      sessionDuration: Date.now() - data.sessionStart,
      averageItemEngagement: averageEngagement,
    };
  }
}

// Context7 Pattern: Resumability - Navigation state management
interface NavigationState {
  activeItemId: string | null;
  focusedIndex: number;
  isKeyboardNavigating: boolean;
  lastInteractionTime: number;
}

// Navigation component with Context7 patterns
interface NavigationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  variant?: NavigationVariant;
  style?: NavigationStyle;
  size?: NavigationSize;
  items: NavigationItem[];
  // Context7 - Active state control
  activeItemId?: string;
  defaultActiveItemId?: string;
  // Context7 - Behavior
  allowKeyboardNavigation?: boolean;
  // Context7 - Observability callbacks
  onItemClick?: (
    item: NavigationItem,
    context: NavigationObservabilityContext,
  ) => void;
  onItemHover?: (
    item: NavigationItem,
    context: NavigationObservabilityContext,
  ) => void;
  onActiveChange?: (
    activeItemId: string | null,
    context: NavigationObservabilityContext,
  ) => void;
}

export const Navigation = React.forwardRef<HTMLDivElement, NavigationProps>(
  (
    {
      className,
      variant = "horizontal",
      style = "default",
      size = "md",
      items,
      activeItemId,
      defaultActiveItemId,
      allowKeyboardNavigation = true,
      onItemClick,
      onItemHover,
      onActiveChange,
      ...props
    },
    ref,
  ) => {
    const navigationRef = React.useRef<HTMLDivElement>(null);
    const interactionManagerRef = React.useRef(
      NavigationInteractionManager.getInstance(),
    );
    const componentId = React.useRef(
      `navigation-${Math.random().toString(36).substr(2, 9)}`,
    );

    // Context7 Pattern: Resumability - State management
    const [navigationState, setNavigationState] =
      React.useState<NavigationState>({
        activeItemId: activeItemId || defaultActiveItemId || null,
        focusedIndex: -1,
        isKeyboardNavigating: false,
        lastInteractionTime: Date.now(),
      });

    const isControlled = activeItemId !== undefined;
    const currentActiveItemId = isControlled
      ? activeItemId
      : navigationState.activeItemId;

    // Context7 Pattern: Data-as-Code - Calculate metrics
    const navigationDepth = React.useMemo(() => {
      const calculateDepth = (items: NavigationItem[], depth = 1): number => {
        return Math.max(
          depth,
          ...items.map((item) =>
            item.children ? calculateDepth(item.children, depth + 1) : depth,
          ),
        );
      };
      return calculateDepth(items);
    }, [items]);

    // Context7 Pattern: Resource management - Interaction tracking setup
    React.useEffect(() => {
      interactionManagerRef.current.register(componentId.current);
      return () => {
        interactionManagerRef.current.unregister(componentId.current);
      };
    }, []);

    // Context7 Pattern: Observability - Create context for callbacks
    const createObservabilityContext =
      React.useCallback((): NavigationObservabilityContext => {
        const interactionData =
          interactionManagerRef.current.getInteractionData(componentId.current);

        return {
          variant,
          style,
          size,
          itemCount: items.length,
          activeItemId: currentActiveItemId || undefined,
          navigationDepth,
          clickCount: interactionData?.clickCount || 0,
          hoverCount: interactionData?.hoverCount || 0,
          keyboardNavigationCount:
            interactionData?.keyboardNavigationCount || 0,
          sessionDuration: interactionData?.sessionDuration || 0,
          averageItemEngagement: interactionData?.averageItemEngagement || 0,
          timestamp: Date.now(),
        };
      }, [
        variant,
        style,
        size,
        items.length,
        currentActiveItemId,
        navigationDepth,
      ]);

    // Context7 Pattern: Event-driven Architecture - Item click handling
    const handleItemClick = React.useCallback(
      (item: NavigationItem, event: React.MouseEvent) => {
        if (item.disabled) {
          event.preventDefault();
          return;
        }

        interactionManagerRef.current.trackClick(componentId.current, item.id);

        if (!isControlled) {
          setNavigationState((prev) => ({
            ...prev,
            activeItemId: item.id,
            lastInteractionTime: Date.now(),
          }));
        }

        const context = createObservabilityContext();
        onItemClick?.(item, context);
        onActiveChange?.(item.id, context);
        createNavigationTrace(context);

        if (item.external) {
          window.open(item.href, "_blank", "noopener,noreferrer");
          event.preventDefault();
        }
      },
      [isControlled, createObservabilityContext, onItemClick, onActiveChange],
    );

    // Context7 Pattern: Event-driven Architecture - Item hover handling
    const handleItemHover = React.useCallback(
      (item: NavigationItem) => {
        interactionManagerRef.current.trackHover(componentId.current);

        const context = createObservabilityContext();
        onItemHover?.(item, context);
      },
      [createObservabilityContext, onItemHover],
    );

    // Context7 Pattern: Event-driven Architecture - Keyboard navigation
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (!allowKeyboardNavigation) return;

        interactionManagerRef.current.trackKeyboardNavigation(
          componentId.current,
        );

        switch (event.key) {
          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault();
            setNavigationState((prev) => ({
              ...prev,
              focusedIndex: Math.min(prev.focusedIndex + 1, items.length - 1),
              isKeyboardNavigating: true,
            }));
            break;

          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault();
            setNavigationState((prev) => ({
              ...prev,
              focusedIndex: Math.max(prev.focusedIndex - 1, 0),
              isKeyboardNavigating: true,
            }));
            break;

          case "Enter":
          case " ":
            event.preventDefault();
            if (navigationState.focusedIndex >= 0) {
              const item = items[navigationState.focusedIndex];
              if (item && !item.disabled) {
                handleItemClick(item, event as any);
              }
            }
            break;

          case "Escape":
            setNavigationState((prev) => ({
              ...prev,
              focusedIndex: -1,
              isKeyboardNavigating: false,
            }));
            break;
        }
      },
      [
        allowKeyboardNavigation,
        items,
        navigationState.focusedIndex,
        handleItemClick,
      ],
    );

    // Context7 Pattern: Provider Isolation - Style computation
    const styleConfig = NavigationStyleProvider.getStyleConfig(style);
    const sizeConfig = NavigationStyleProvider.getSizeConfig(size);
    const containerStyles = React.useMemo(() => {
      return cn(
        NavigationStyleProvider.getVariantStyle(variant),
        sizeConfig.container,
        className,
      );
    }, [variant, sizeConfig.container, className]);

    // Context7 Pattern: Modularity - Render navigation item
    const renderNavigationItem = React.useCallback(
      (item: NavigationItem, index: number) => {
        const isActive = item.active || item.id === currentActiveItemId;
        const isFocused =
          index === navigationState.focusedIndex &&
          navigationState.isKeyboardNavigating;

        const itemStyles = cn(
          styleConfig.item,
          sizeConfig.item,
          isActive && styleConfig.active,
          !item.disabled && styleConfig.hover,
          item.disabled && "opacity-50 cursor-not-allowed",
          isFocused && "ring-2 ring-ring ring-offset-2",
        );

        if (variant === "breadcrumb" && index > 0) {
          return (
            <React.Fragment key={item.id}>
              <span className="text-muted-foreground">/</span>
              {renderItemContent(item, itemStyles)}
            </React.Fragment>
          );
        }

        return renderItemContent(item, itemStyles);
      },
      [
        currentActiveItemId,
        navigationState.focusedIndex,
        navigationState.isKeyboardNavigating,
        styleConfig,
        sizeConfig,
        variant,
      ],
    );

    const renderItemContent = React.useCallback(
      (item: NavigationItem, itemStyles: string) => {
        const content = (
          <span className="flex items-center gap-2">
            {item.icon && <span className={sizeConfig.icon}>{item.icon}</span>}
            <span>{item.label}</span>
          </span>
        );

        if (item.external || item.disabled) {
          return (
            <span
              key={item.id}
              className={itemStyles}
              onMouseEnter={() => handleItemHover(item)}
              tabIndex={item.disabled ? -1 : 0}
            >
              {content}
            </span>
          );
        }

        return (
          <a
            key={item.id}
            href={item.href}
            className={itemStyles}
            onClick={(e) => handleItemClick(item, e)}
            onMouseEnter={() => handleItemHover(item)}
            tabIndex={0}
          >
            {content}
          </a>
        );
      },
      [sizeConfig.icon, handleItemHover, handleItemClick],
    );

    return (
      <nav
        ref={(element) => {
          if (navigationRef.current !== element) {
            (
              navigationRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = element as HTMLDivElement | null;
          }
          if (typeof ref === "function") {
            ref(element as HTMLDivElement | null);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              element as HTMLDivElement | null;
          }
        }}
        className={containerStyles}
        onKeyDown={handleKeyDown}
        data-variant={variant}
        data-style={style}
        data-size={size}
        role="navigation"
        tabIndex={allowKeyboardNavigation ? 0 : -1}
        {...props}
      >
        {items.map(renderNavigationItem)}
      </nav>
    );
  },
);
Navigation.displayName = "Navigation";

// Context7 Pattern: Factory Pattern - Navigation creation utilities
export const createNavigation = {
  horizontalMenu: (items: NavigationItem[]) => ({
    variant: "horizontal" as const,
    style: "default" as const,
    size: "md" as const,
    items,
    allowKeyboardNavigation: true,
  }),

  verticalSidebar: (items: NavigationItem[]) => ({
    variant: "vertical" as const,
    style: "default" as const,
    size: "md" as const,
    items,
    allowKeyboardNavigation: true,
  }),

  breadcrumbTrail: (items: NavigationItem[]) => ({
    variant: "breadcrumb" as const,
    style: "minimal" as const,
    size: "sm" as const,
    items,
    allowKeyboardNavigation: false,
  }),

  tabNavigation: (items: NavigationItem[]) => ({
    variant: "tabs" as const,
    style: "underline" as const,
    size: "md" as const,
    items,
    allowKeyboardNavigation: true,
  }),

  pillNavigation: (items: NavigationItem[]) => ({
    variant: "horizontal" as const,
    style: "pills" as const,
    size: "md" as const,
    items,
    allowKeyboardNavigation: true,
  }),
};

// Context7 Pattern: Modularity - Navigation composition helpers
export const NavigationComposed = {
  ResponsiveNavigation: ({
    mobileItems = [],
    desktopItems = [],
    ...navigationProps
  }: NavigationProps & {
    mobileItems?: NavigationItem[];
    desktopItems?: NavigationItem[];
  }) => (
    <>
      {/* Mobile Navigation */}
      <Navigation
        variant="vertical"
        style="default"
        size="sm"
        className={cn("md:hidden", navigationProps.className)}
        {...navigationProps}
        items={mobileItems.length > 0 ? mobileItems : navigationProps.items}
      />

      {/* Desktop Navigation */}
      <Navigation
        variant="horizontal"
        style="default"
        size="md"
        className={cn("hidden md:flex", navigationProps.className)}
        {...navigationProps}
        items={desktopItems.length > 0 ? desktopItems : navigationProps.items}
      />
    </>
  ),

  BreadcrumbNavigation: ({
    items = [],
    maxItems = 3,
    ...navigationProps
  }: NavigationProps & {
    maxItems?: number;
  }) => {
    const displayItems =
      items.length > maxItems
        ? [
            items[0],
            { id: "ellipsis", label: "...", href: "#", disabled: true },
            ...items.slice(-maxItems + 2),
          ]
        : items;

    return (
      <Navigation
        variant="breadcrumb"
        style="minimal"
        size="sm"
        items={displayItems}
        allowKeyboardNavigation={false}
        {...navigationProps}
      />
    );
  },

  TabNavigation: ({ items = [], ...navigationProps }: NavigationProps) => (
    <Navigation
      variant="tabs"
      style="underline"
      size="md"
      items={items}
      {...navigationProps}
    />
  ),
};
