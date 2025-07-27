import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe layout configurations
export type HeaderVariant = "default" | "sticky" | "floating" | "minimal";
export type HeaderSize = "sm" | "md" | "lg";
export type BreakpointSize = "mobile" | "tablet" | "desktop" | "ultrawide";

// Context7 Pattern: Observability - Header layout and interaction metrics
interface HeaderObservabilityContext {
  variant: HeaderVariant;
  size: HeaderSize;
  currentBreakpoint: BreakpointSize;
  isSticky: boolean;
  isScrolled: boolean;
  scrollPosition: number;
  isAuthenticated: boolean;
  isMobileMenuOpen: boolean;
  navigationClicks: number;
  interactionVelocity: number;
  timestamp: number;
}

// Context7 Pattern: Tracing - Header lifecycle and responsive events
const createHeaderTrace = (context: HeaderObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Header:Context7:Trace]", {
      component: "Header",
      layout: {
        responsiveState: `${context.currentBreakpoint} (${context.size})`,
        stickyBehavior: context.isSticky ? "active" : "disabled",
        scrollMetrics: `${context.scrollPosition}px (scrolled: ${context.isScrolled})`,
      },
      interaction: {
        navigationEngagement: context.navigationClicks,
        userType: context.isAuthenticated ? "authenticated" : "guest",
        mobileMenuUsage: context.isMobileMenuOpen,
      },
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Header style system abstraction
class HeaderStyleProvider {
  private static readonly VARIANT_STYLES = {
    default: "bg-background border-b border-border",
    sticky:
      "sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border supports-[backdrop-filter]:bg-background/60",
    floating:
      "fixed top-4 left-4 right-4 z-50 bg-background/95 backdrop-blur rounded-lg border border-border shadow-lg",
    minimal: "bg-transparent border-b border-transparent",
  } as const;

  private static readonly SIZE_STYLES = {
    sm: "h-12 px-4",
    md: "h-14 px-6",
    lg: "h-16 px-8",
  } as const;

  private static readonly BREAKPOINT_STYLES = {
    mobile: "max-w-full",
    tablet: "max-w-4xl mx-auto",
    desktop: "max-w-6xl mx-auto",
    ultrawide: "max-w-7xl mx-auto",
  } as const;

  private static readonly BASE_STYLES =
    "w-full transition-all duration-300 ease-in-out";

  static getVariantStyle(variant: HeaderVariant): string {
    return this.VARIANT_STYLES[variant];
  }

  static getSizeStyle(size: HeaderSize): string {
    return this.SIZE_STYLES[size];
  }

  static getBreakpointStyle(breakpoint: BreakpointSize): string {
    return this.BREAKPOINT_STYLES[breakpoint];
  }

  static get baseStyles(): string {
    return this.BASE_STYLES;
  }
}

// Context7 Pattern: Resource Pooling - Responsive breakpoint manager
class HeaderBreakpointManager {
  private static instance: HeaderBreakpointManager;
  private breakpointObserver: ResizeObserver;
  private managedHeaders = new Map<string, HTMLElement>();
  private breakpointCallbacks = new Map<
    string,
    (breakpoint: BreakpointSize) => void
  >();
  private currentBreakpoints = new Map<string, BreakpointSize>();

  constructor() {
    this.breakpointObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const headerId = this.getHeaderId(element);
        if (headerId) {
          const newBreakpoint = this.calculateBreakpoint(
            entry.contentRect.width,
          );
          const currentBreakpoint = this.currentBreakpoints.get(headerId);

          if (newBreakpoint !== currentBreakpoint) {
            this.currentBreakpoints.set(headerId, newBreakpoint);
            const callback = this.breakpointCallbacks.get(headerId);
            callback?.(newBreakpoint);
          }
        }
      });
    });
  }

  static getInstance(): HeaderBreakpointManager {
    if (!HeaderBreakpointManager.instance) {
      HeaderBreakpointManager.instance = new HeaderBreakpointManager();
    }
    return HeaderBreakpointManager.instance;
  }

  register(
    headerId: string,
    element: HTMLElement,
    callback: (breakpoint: BreakpointSize) => void,
  ): void {
    this.managedHeaders.set(headerId, element);
    this.breakpointCallbacks.set(headerId, callback);
    this.breakpointObserver.observe(element);

    // Set initial breakpoint
    const initialBreakpoint = this.calculateBreakpoint(element.clientWidth);
    this.currentBreakpoints.set(headerId, initialBreakpoint);
    callback(initialBreakpoint);
  }

  unregister(headerId: string): void {
    const element = this.managedHeaders.get(headerId);
    if (element) {
      this.breakpointObserver.unobserve(element);
      this.managedHeaders.delete(headerId);
      this.breakpointCallbacks.delete(headerId);
      this.currentBreakpoints.delete(headerId);
    }
  }

  getCurrentBreakpoint(headerId: string): BreakpointSize {
    return this.currentBreakpoints.get(headerId) || "desktop";
  }

  private getHeaderId(element: HTMLElement): string | null {
    for (const [id, headerElement] of this.managedHeaders.entries()) {
      if (headerElement === element) return id;
    }
    return null;
  }

  private calculateBreakpoint(width: number): BreakpointSize {
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    if (width < 1920) return "desktop";
    return "ultrawide";
  }
}

// Context7 Pattern: Resource Pooling - Scroll position manager
class HeaderScrollManager {
  private static instance: HeaderScrollManager;
  private scrollCallbacks = new Map<
    string,
    (scrollData: {
      position: number;
      isScrolled: boolean;
      direction: "up" | "down";
    }) => void
  >();
  private lastScrollPositions = new Map<string, number>();
  private throttledCallbacks = new Map<string, number>();

  static getInstance(): HeaderScrollManager {
    if (!HeaderScrollManager.instance) {
      HeaderScrollManager.instance = new HeaderScrollManager();
    }
    return HeaderScrollManager.instance;
  }

  register(
    headerId: string,
    callback: (scrollData: {
      position: number;
      isScrolled: boolean;
      direction: "up" | "down";
    }) => void,
  ): void {
    this.scrollCallbacks.set(headerId, callback);
    this.lastScrollPositions.set(headerId, 0);

    // Add scroll listener if first registration
    if (this.scrollCallbacks.size === 1) {
      window.addEventListener("scroll", this.handleScroll, { passive: true });
    }
  }

  unregister(headerId: string): void {
    this.scrollCallbacks.delete(headerId);
    this.lastScrollPositions.delete(headerId);

    if (this.throttledCallbacks.has(headerId)) {
      clearTimeout(this.throttledCallbacks.get(headerId));
      this.throttledCallbacks.delete(headerId);
    }

    // Remove scroll listener if no more registrations
    if (this.scrollCallbacks.size === 0) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  private handleScroll = () => {
    const scrollPosition = window.scrollY;

    this.scrollCallbacks.forEach((callback, headerId) => {
      const lastPosition = this.lastScrollPositions.get(headerId) || 0;
      const direction = scrollPosition > lastPosition ? "down" : "up";
      const isScrolled = scrollPosition > 50; // Consider scrolled after 50px

      // Throttle to 60fps
      if (this.throttledCallbacks.has(headerId)) {
        clearTimeout(this.throttledCallbacks.get(headerId));
      }

      const timeoutId = window.setTimeout(() => {
        callback({ position: scrollPosition, isScrolled, direction });
        this.lastScrollPositions.set(headerId, scrollPosition);
        this.throttledCallbacks.delete(headerId);
      }, 16); // ~60fps

      this.throttledCallbacks.set(headerId, timeoutId);
    });
  };
}

// Context7 Pattern: Resumability - Header state management
interface HeaderState {
  isScrolled: boolean;
  scrollPosition: number;
  scrollDirection: "up" | "down";
  currentBreakpoint: BreakpointSize;
  isMobileMenuOpen: boolean;
  navigationClicks: number;
  interactionVelocity: number;
  lastInteractionTime: number;
}

// Header component with Context7 patterns
interface HeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onScroll"> {
  variant?: HeaderVariant;
  size?: HeaderSize;
  children?: React.ReactNode;
  // Context7 - Authentication integration
  isAuthenticated?: boolean;
  // Context7 - Mobile behavior
  showMobileMenu?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
  // Context7 - Observability callbacks
  onBreakpointChange?: (
    breakpoint: BreakpointSize,
    context: HeaderObservabilityContext,
  ) => void;
  onScroll?: (
    scrollData: {
      position: number;
      isScrolled: boolean;
      direction: "up" | "down";
    },
    context: HeaderObservabilityContext,
  ) => void;
  onNavigationClick?: (context: HeaderObservabilityContext) => void;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      children,
      isAuthenticated = false,
      showMobileMenu = false,
      onMobileMenuToggle,
      onBreakpointChange,
      onScroll,
      onNavigationClick,
      ...props
    },
    ref,
  ) => {
    const headerRef = React.useRef<HTMLElement>(null);
    const breakpointManagerRef = React.useRef(
      HeaderBreakpointManager.getInstance(),
    );
    const scrollManagerRef = React.useRef(HeaderScrollManager.getInstance());
    const componentId = React.useRef(
      `header-${Math.random().toString(36).substr(2, 9)}`,
    );

    // Context7 Pattern: Resumability - State management
    const [headerState, setHeaderState] = React.useState<HeaderState>({
      isScrolled: false,
      scrollPosition: 0,
      scrollDirection: "down",
      currentBreakpoint: "desktop",
      isMobileMenuOpen: showMobileMenu,
      navigationClicks: 0,
      interactionVelocity: 0,
      lastInteractionTime: Date.now(),
    });

    // Context7 Pattern: Observability - Create context for callbacks
    const createObservabilityContext = React.useCallback(
      (): HeaderObservabilityContext => ({
        variant,
        size,
        currentBreakpoint: headerState.currentBreakpoint,
        isSticky: variant === "sticky" || variant === "floating",
        isScrolled: headerState.isScrolled,
        scrollPosition: headerState.scrollPosition,
        isAuthenticated,
        isMobileMenuOpen: headerState.isMobileMenuOpen,
        navigationClicks: headerState.navigationClicks,
        interactionVelocity: headerState.interactionVelocity,
        timestamp: Date.now(),
      }),
      [variant, size, headerState, isAuthenticated],
    );

    // Context7 Pattern: Resource management - Breakpoint and scroll setup
    React.useEffect(() => {
      const element = headerRef.current;
      if (!element) return;

      const handleBreakpointChange = (breakpoint: BreakpointSize) => {
        setHeaderState((prev) => ({ ...prev, currentBreakpoint: breakpoint }));
        const context = createObservabilityContext();
        onBreakpointChange?.(breakpoint, {
          ...context,
          currentBreakpoint: breakpoint,
        });
        createHeaderTrace({ ...context, currentBreakpoint: breakpoint });
      };

      const handleScrollChange = (scrollData: {
        position: number;
        isScrolled: boolean;
        direction: "up" | "down";
      }) => {
        setHeaderState((prev) => ({
          ...prev,
          isScrolled: scrollData.isScrolled,
          scrollPosition: scrollData.position,
          scrollDirection: scrollData.direction,
        }));
        const context = createObservabilityContext();
        onScroll?.(scrollData, context);
        createHeaderTrace(context);
      };

      breakpointManagerRef.current.register(
        componentId.current,
        element,
        handleBreakpointChange,
      );
      scrollManagerRef.current.register(
        componentId.current,
        handleScrollChange,
      );

      return () => {
        breakpointManagerRef.current.unregister(componentId.current);
        scrollManagerRef.current.unregister(componentId.current);
      };
    }, [createObservabilityContext, onBreakpointChange, onScroll]);

    // Context7 Pattern: Event-driven Architecture - Mobile menu toggle
    React.useEffect(() => {
      setHeaderState((prev) => ({ ...prev, isMobileMenuOpen: showMobileMenu }));
    }, [showMobileMenu]);

    // Context7 Pattern: Event-driven Architecture - Navigation click tracking
    const handleNavigationClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        const now = Date.now();
        const timeDiff = now - headerState.lastInteractionTime;
        const velocity = timeDiff > 0 ? 1 / timeDiff : 0;

        setHeaderState((prev) => ({
          ...prev,
          navigationClicks: prev.navigationClicks + 1,
          interactionVelocity: velocity,
          lastInteractionTime: now,
        }));

        const context = createObservabilityContext();
        onNavigationClick?.(context);
        createHeaderTrace(context);

        props.onClick?.(event);
      },
      [
        headerState.lastInteractionTime,
        createObservabilityContext,
        onNavigationClick,
        props,
      ],
    );

    // Context7 Pattern: Provider Isolation - Style computation
    const headerStyles = React.useMemo(() => {
      return cn(
        HeaderStyleProvider.baseStyles,
        HeaderStyleProvider.getVariantStyle(variant),
        HeaderStyleProvider.getSizeStyle(size),
        HeaderStyleProvider.getBreakpointStyle(headerState.currentBreakpoint),
        // Dynamic sticky behavior based on scroll state
        variant === "sticky" && headerState.isScrolled && "shadow-sm",
        variant === "minimal" &&
          headerState.isScrolled &&
          "bg-background/95 backdrop-blur border-b border-border",
        className,
      );
    }, [
      variant,
      size,
      headerState.currentBreakpoint,
      headerState.isScrolled,
      className,
    ]);

    return (
      <header
        ref={(element) => {
          if (headerRef.current !== element) {
            (headerRef as React.MutableRefObject<HTMLElement | null>).current =
              element;
          }
          if (typeof ref === "function") {
            ref(element);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLElement | null>).current =
              element;
          }
        }}
        className={headerStyles}
        onClick={handleNavigationClick}
        data-breakpoint={headerState.currentBreakpoint}
        data-scrolled={headerState.isScrolled}
        data-mobile-menu={headerState.isMobileMenuOpen}
        {...props}
      >
        <div className="flex items-center justify-between w-full">
          {children}
        </div>
      </header>
    );
  },
);
Header.displayName = "Header";

// Context7 Pattern: Factory Pattern - Header creation utilities
export const createHeader = {
  navbar: () => ({
    variant: "sticky" as const,
    size: "md" as const,
  }),

  hero: () => ({
    variant: "minimal" as const,
    size: "lg" as const,
  }),

  dashboard: () => ({
    variant: "default" as const,
    size: "md" as const,
  }),

  mobile: () => ({
    variant: "floating" as const,
    size: "sm" as const,
  }),
};

// Context7 Pattern: Modularity - Header composition helpers
export const HeaderComposed = {
  NavbarHeader: ({
    logo,
    navigation,
    actions,
    isAuthenticated = false,
    ...headerProps
  }: HeaderProps & {
    logo?: React.ReactNode;
    navigation?: React.ReactNode;
    actions?: React.ReactNode;
  }) => (
    <Header
      variant="sticky"
      size="md"
      isAuthenticated={isAuthenticated}
      {...headerProps}
    >
      <div className="flex items-center space-x-4">
        {logo}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation}
        </nav>
      </div>
      <div className="flex items-center space-x-2">{actions}</div>
    </Header>
  ),

  MobileHeader: ({
    logo,
    menuButton,
    isMobileMenuOpen = false,
    onMobileMenuToggle,
    ...headerProps
  }: HeaderProps & {
    logo?: React.ReactNode;
    menuButton?: React.ReactNode;
    isMobileMenuOpen?: boolean;
  }) => (
    <Header
      variant="sticky"
      size="sm"
      showMobileMenu={isMobileMenuOpen}
      onMobileMenuToggle={onMobileMenuToggle}
      {...headerProps}
    >
      <div className="flex items-center space-x-3">
        {menuButton}
        {logo}
      </div>
    </Header>
  ),
};
