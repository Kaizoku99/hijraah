import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe sidebar configurations
export type SidebarVariant = "default" | "floating" | "minimal" | "mobile";
export type SidebarSize = "sm" | "md" | "lg" | "xl";
export type SidebarPosition = "left" | "right";
export type SidebarMode = "open" | "closed" | "collapsed" | "auto";

// Context7 Pattern: Data-as-Code - Navigation and content structures
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  children?: NavigationItem[];
  external?: boolean;
  permission?: string;
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
  permission?: string;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  href: string;
  timestamp: Date;
  active?: boolean;
}

// Context7 Pattern: Observability - Sidebar interaction and navigation metrics
interface SidebarObservabilityContext {
  variant: SidebarVariant;
  size: SidebarSize;
  position: SidebarPosition;
  state: SidebarMode;
  isCollapsed: boolean;
  navigationSections: number;
  totalNavigationItems: number;
  chatHistoryCount: number;
  currentActiveItem?: string;
  navigationClicks: number;
  collapseToggleCount: number;
  sessionDuration: number;
  scrollPosition: number;
  timestamp: number;
}

// Context7 Pattern: Tracing - Sidebar lifecycle and navigation events
const createSidebarTrace = (context: SidebarObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Sidebar:Context7:Trace]", {
      component: "Sidebar",
      navigation: {
        structure: `${context.navigationSections} sections, ${context.totalNavigationItems} items`,
        activeItem: context.currentActiveItem || "none",
        chatHistory: `${context.chatHistoryCount} conversations`,
      },
      interaction: {
        navigationEngagement: context.navigationClicks,
        collapseUsage: context.collapseToggleCount,
        sessionDuration: `${(context.sessionDuration / 1000).toFixed(1)}s`,
        scrollMetrics: `${context.scrollPosition}px`,
      },
      layout: {
        state: context.state,
        collapsed: context.isCollapsed,
        position: context.position,
      },
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Sidebar style system abstraction
class SidebarStyleProvider {
  private static readonly VARIANT_STYLES = {
    default: "bg-background border-r border-border",
    floating:
      "bg-background/95 backdrop-blur border border-border rounded-lg shadow-lg m-4",
    minimal: "bg-muted/30 border-r border-border/50",
    mobile: "bg-background border-r border-border md:hidden",
  } as const;

  private static readonly SIZE_STYLES = {
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
    xl: "w-96",
  } as const;

  private static readonly COLLAPSED_STYLES = {
    sm: "w-12",
    md: "w-16",
    lg: "w-20",
    xl: "w-24",
  } as const;

  private static readonly POSITION_STYLES = {
    left: "left-0",
    right: "right-0",
  } as const;

  private static readonly BASE_STYLES =
    "fixed top-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out overflow-hidden";

  static getVariantStyle(variant: SidebarVariant): string {
    return this.VARIANT_STYLES[variant];
  }

  static getSizeStyle(size: SidebarSize, isCollapsed: boolean): string {
    return isCollapsed ? this.COLLAPSED_STYLES[size] : this.SIZE_STYLES[size];
  }

  static getPositionStyle(position: SidebarPosition): string {
    return this.POSITION_STYLES[position];
  }

  static get baseStyles(): string {
    return this.BASE_STYLES;
  }
}

// Context7 Pattern: Resource Pooling - Sidebar navigation state manager
class SidebarNavigationManager {
  private static instance: SidebarNavigationManager;
  private navigationStates = new Map<string, NavigationItem[]>();
  private activeItems = new Map<string, string>();
  private expandedSections = new Map<string, Set<string>>();
  private navigationCallbacks = new Map<
    string,
    (activeItem: string, expandedSections: Set<string>) => void
  >();

  static getInstance(): SidebarNavigationManager {
    if (!SidebarNavigationManager.instance) {
      SidebarNavigationManager.instance = new SidebarNavigationManager();
    }
    return SidebarNavigationManager.instance;
  }

  register(
    sidebarId: string,
    navigation: NavigationItem[],
    callback: (activeItem: string, expandedSections: Set<string>) => void,
  ): void {
    this.navigationStates.set(sidebarId, navigation);
    this.expandedSections.set(sidebarId, new Set());
    this.navigationCallbacks.set(sidebarId, callback);
  }

  unregister(sidebarId: string): void {
    this.navigationStates.delete(sidebarId);
    this.activeItems.delete(sidebarId);
    this.expandedSections.delete(sidebarId);
    this.navigationCallbacks.delete(sidebarId);
  }

  setActiveItem(sidebarId: string, itemId: string): void {
    this.activeItems.set(sidebarId, itemId);
    this.notifyStateChange(sidebarId);
  }

  toggleSection(sidebarId: string, sectionId: string): void {
    const expanded = this.expandedSections.get(sidebarId);
    if (expanded) {
      if (expanded.has(sectionId)) {
        expanded.delete(sectionId);
      } else {
        expanded.add(sectionId);
      }
      this.notifyStateChange(sidebarId);
    }
  }

  getActiveItem(sidebarId: string): string | undefined {
    return this.activeItems.get(sidebarId);
  }

  getExpandedSections(sidebarId: string): Set<string> {
    return this.expandedSections.get(sidebarId) || new Set();
  }

  private notifyStateChange(sidebarId: string): void {
    const callback = this.navigationCallbacks.get(sidebarId);
    const activeItem = this.getActiveItem(sidebarId) || "";
    const expandedSections = this.getExpandedSections(sidebarId);
    callback?.(activeItem, expandedSections);
  }
}

// Context7 Pattern: Resource Pooling - Sidebar scroll position manager
class SidebarScrollManager {
  private static instance: SidebarScrollManager;
  private scrollPositions = new Map<string, number>();
  private scrollCallbacks = new Map<string, (position: number) => void>();

  static getInstance(): SidebarScrollManager {
    if (!SidebarScrollManager.instance) {
      SidebarScrollManager.instance = new SidebarScrollManager();
    }
    return SidebarScrollManager.instance;
  }

  register(
    sidebarId: string,
    element: HTMLElement,
    callback: (position: number) => void,
  ): void {
    this.scrollCallbacks.set(sidebarId, callback);
    this.scrollPositions.set(sidebarId, 0);

    const handleScroll = () => {
      const position = element.scrollTop;
      this.scrollPositions.set(sidebarId, position);
      callback(position);
    };

    element.addEventListener("scroll", handleScroll, { passive: true });
  }

  unregister(sidebarId: string): void {
    this.scrollCallbacks.delete(sidebarId);
    this.scrollPositions.delete(sidebarId);
  }

  getScrollPosition(sidebarId: string): number {
    return this.scrollPositions.get(sidebarId) || 0;
  }
}

// Context7 Pattern: Resumability - Sidebar state management
interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  activeNavigationItem: string | null;
  expandedSections: Set<string>;
  scrollPosition: number;
  navigationClicks: number;
  collapseToggleCount: number;
  sessionStartTime: number;
  lastInteractionTime: number;
}

// Sidebar component with Context7 patterns
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SidebarVariant;
  size?: SidebarSize;
  position?: SidebarPosition;
  // Context7 - State control
  open?: boolean;
  collapsed?: boolean;
  collapsible?: boolean;
  // Context7 - Content
  navigationSections?: NavigationSection[];
  chatHistory?: ChatHistoryItem[];
  children?: React.ReactNode;
  // Context7 - Behavior
  autoCollapse?: boolean;
  persistState?: boolean;
  // Context7 - Observability callbacks
  onStateChange?: (
    state: SidebarState,
    context: SidebarObservabilityContext,
  ) => void;
  onNavigationClick?: (
    item: NavigationItem,
    context: SidebarObservabilityContext,
  ) => void;
  onChatClick?: (
    chat: ChatHistoryItem,
    context: SidebarObservabilityContext,
  ) => void;
  onToggle?: (isOpen: boolean, context: SidebarObservabilityContext) => void;
  onCollapse?: (
    isCollapsed: boolean,
    context: SidebarObservabilityContext,
  ) => void;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      position = "left",
      open = true,
      collapsed = false,
      collapsible = true,
      navigationSections = [],
      chatHistory = [],
      children,
      autoCollapse = false,
      persistState = true,
      onStateChange,
      onNavigationClick,
      onChatClick,
      onToggle,
      onCollapse,
      ...props
    },
    ref,
  ) => {
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const navigationManagerRef = React.useRef(
      SidebarNavigationManager.getInstance(),
    );
    const scrollManagerRef = React.useRef(SidebarScrollManager.getInstance());
    const componentId = React.useRef(
      `sidebar-${Math.random().toString(36).substr(2, 9)}`,
    );

    // Context7 Pattern: Resumability - State management
    const [sidebarState, setSidebarState] = React.useState<SidebarState>({
      isOpen: open,
      isCollapsed: collapsed,
      activeNavigationItem: null,
      expandedSections: new Set(),
      scrollPosition: 0,
      navigationClicks: 0,
      collapseToggleCount: 0,
      sessionStartTime: Date.now(),
      lastInteractionTime: Date.now(),
    });

    // Context7 Pattern: Data-as-Code - Calculate metrics
    const totalNavigationItems = React.useMemo(() => {
      return navigationSections.reduce((total, section) => {
        return (
          total +
          section.items.length +
          section.items.reduce((subTotal, item) => {
            return subTotal + (item.children?.length || 0);
          }, 0)
        );
      }, 0);
    }, [navigationSections]);

    // Context7 Pattern: Observability - Create context for callbacks
    const createObservabilityContext = React.useCallback(
      (): SidebarObservabilityContext => ({
        variant,
        size,
        position,
        state: (sidebarState.isOpen
          ? sidebarState.isCollapsed
            ? "collapsed"
            : "open"
          : "closed") as SidebarMode,
        isCollapsed: sidebarState.isCollapsed,
        navigationSections: navigationSections.length,
        totalNavigationItems,
        chatHistoryCount: chatHistory.length,
        currentActiveItem: sidebarState.activeNavigationItem || undefined,
        navigationClicks: sidebarState.navigationClicks,
        collapseToggleCount: sidebarState.collapseToggleCount,
        sessionDuration: Date.now() - sidebarState.sessionStartTime,
        scrollPosition: sidebarState.scrollPosition,
        timestamp: Date.now(),
      }),
      [
        variant,
        size,
        position,
        sidebarState,
        navigationSections.length,
        totalNavigationItems,
        chatHistory.length,
      ],
    );

    // Context7 Pattern: Resource management - Navigation and scroll setup
    React.useEffect(() => {
      const element = contentRef.current;
      if (!element) return;

      const flattenedNavigation = navigationSections.flatMap(
        (section) => section.items,
      );

      const handleNavigationStateChange = (
        activeItem: string,
        expandedSections: Set<string>,
      ) => {
        setSidebarState((prev) => ({
          ...prev,
          activeNavigationItem: activeItem,
          expandedSections,
        }));
      };

      const handleScrollChange = (position: number) => {
        setSidebarState((prev) => ({ ...prev, scrollPosition: position }));
      };

      navigationManagerRef.current.register(
        componentId.current,
        flattenedNavigation,
        handleNavigationStateChange,
      );
      scrollManagerRef.current.register(
        componentId.current,
        element,
        handleScrollChange,
      );

      return () => {
        navigationManagerRef.current.unregister(componentId.current);
        scrollManagerRef.current.unregister(componentId.current);
      };
    }, [navigationSections]);

    // Context7 Pattern: Event-driven Architecture - State synchronization
    React.useEffect(() => {
      setSidebarState((prev) => ({
        ...prev,
        isOpen: open,
        isCollapsed: collapsed,
      }));
    }, [open, collapsed]);

    // Context7 Pattern: Event-driven Architecture - Navigation click handling
    const handleNavigationClick = React.useCallback(
      (item: NavigationItem) => {
        setSidebarState((prev) => ({
          ...prev,
          navigationClicks: prev.navigationClicks + 1,
          lastInteractionTime: Date.now(),
        }));

        navigationManagerRef.current.setActiveItem(
          componentId.current,
          item.id,
        );

        const context = createObservabilityContext();
        onNavigationClick?.(item, context);
        createSidebarTrace(context);
      },
      [createObservabilityContext, onNavigationClick],
    );

    // Context7 Pattern: Event-driven Architecture - Chat click handling
    const handleChatClick = React.useCallback(
      (chat: ChatHistoryItem) => {
        setSidebarState((prev) => ({
          ...prev,
          navigationClicks: prev.navigationClicks + 1,
          lastInteractionTime: Date.now(),
        }));

        const context = createObservabilityContext();
        onChatClick?.(chat, context);
        createSidebarTrace(context);
      },
      [createObservabilityContext, onChatClick],
    );

    // Context7 Pattern: Event-driven Architecture - Toggle handling
    const handleToggle = React.useCallback(() => {
      const newIsOpen = !sidebarState.isOpen;
      setSidebarState((prev) => ({ ...prev, isOpen: newIsOpen }));

      const context = createObservabilityContext();
      onToggle?.(newIsOpen, {
        ...context,
        state: (newIsOpen ? "open" : "closed") as SidebarMode,
      });
      createSidebarTrace({
        ...context,
        state: (newIsOpen ? "open" : "closed") as SidebarMode,
      });
    }, [sidebarState.isOpen, createObservabilityContext, onToggle]);

    // Context7 Pattern: Event-driven Architecture - Collapse handling
    const handleCollapse = React.useCallback(() => {
      if (!collapsible) return;

      const newIsCollapsed = !sidebarState.isCollapsed;
      setSidebarState((prev) => ({
        ...prev,
        isCollapsed: newIsCollapsed,
        collapseToggleCount: prev.collapseToggleCount + 1,
      }));

      const context = createObservabilityContext();
      onCollapse?.(newIsCollapsed, { ...context, isCollapsed: newIsCollapsed });
      createSidebarTrace({ ...context, isCollapsed: newIsCollapsed });
    }, [
      collapsible,
      sidebarState.isCollapsed,
      createObservabilityContext,
      onCollapse,
    ]);

    // Context7 Pattern: Event-driven Architecture - Section toggle
    const handleSectionToggle = React.useCallback((sectionId: string) => {
      navigationManagerRef.current.toggleSection(
        componentId.current,
        sectionId,
      );
    }, []);

    // Context7 Pattern: Observability - State change tracking
    React.useEffect(() => {
      const context = createObservabilityContext();
      onStateChange?.(sidebarState, context);
    }, [sidebarState, createObservabilityContext, onStateChange]);

    // Context7 Pattern: Provider Isolation - Style computation
    const sidebarStyles = React.useMemo(() => {
      return cn(
        SidebarStyleProvider.baseStyles,
        SidebarStyleProvider.getVariantStyle(variant),
        SidebarStyleProvider.getSizeStyle(size, sidebarState.isCollapsed),
        SidebarStyleProvider.getPositionStyle(position),
        !sidebarState.isOpen && "translate-x-full",
        position === "right" && !sidebarState.isOpen && "-translate-x-full",
        className,
      );
    }, [
      variant,
      size,
      position,
      sidebarState.isCollapsed,
      sidebarState.isOpen,
      className,
    ]);

    // Context7 Pattern: Modularity - Render navigation section
    const renderNavigationSection = React.useCallback(
      (section: NavigationSection) => {
        const isExpanded = sidebarState.expandedSections.has(section.id);

        return (
          <div key={section.id} className="space-y-2">
            <div
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => handleSectionToggle(section.id)}
            >
              <span className={cn(sidebarState.isCollapsed && "sr-only")}>
                {section.title}
              </span>
              {section.collapsible && !sidebarState.isCollapsed && (
                <svg
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded && "rotate-90",
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </div>

            {(!section.collapsible || isExpanded) && (
              <div className="space-y-1">
                {section.items.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      item.active && "bg-accent text-accent-foreground",
                      sidebarState.isCollapsed && "justify-center px-2",
                    )}
                    onClick={() => handleNavigationClick(item)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.icon && (
                      <span className="h-4 w-4 shrink-0">{item.icon}</span>
                    )}
                    <span className={cn(sidebarState.isCollapsed && "sr-only")}>
                      {item.label}
                    </span>
                    {item.badge && !sidebarState.isCollapsed && (
                      <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      },
      [
        sidebarState.expandedSections,
        sidebarState.isCollapsed,
        handleSectionToggle,
        handleNavigationClick,
      ],
    );

    return (
      <div
        ref={(element) => {
          if (sidebarRef.current !== element) {
            (
              sidebarRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = element;
          }
          if (typeof ref === "function") {
            ref(element);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              element;
          }
        }}
        className={sidebarStyles}
        data-variant={variant}
        data-position={position}
        data-state={
          sidebarState.isOpen
            ? sidebarState.isCollapsed
              ? "collapsed"
              : "open"
            : "closed"
        }
        {...props}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2
            className={cn(
              "text-lg font-semibold",
              sidebarState.isCollapsed && "sr-only",
            )}
          >
            Navigation
          </h2>
          {collapsible && (
            <button
              onClick={handleCollapse}
              className="p-1 rounded-md hover:bg-accent hover:text-accent-foreground"
              aria-label={
                sidebarState.isCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    sidebarState.isCollapsed
                      ? "M9 5l7 7-7 7"
                      : "M15 19l-7-7 7-7"
                  }
                />
              </svg>
            </button>
          )}
        </div>

        {/* Sidebar Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto overflow-x-hidden"
        >
          {children || (
            <div className="p-4 space-y-6">
              {/* Chat History Section */}
              {chatHistory.length > 0 && (
                <div className="space-y-2">
                  <h3
                    className={cn(
                      "text-sm font-medium text-muted-foreground px-3",
                      sidebarState.isCollapsed && "sr-only",
                    )}
                  >
                    Recent Conversations
                  </h3>
                  <div className="space-y-1">
                    {chatHistory
                      .slice(0, sidebarState.isCollapsed ? 3 : 10)
                      .map((chat) => (
                        <a
                          key={chat.id}
                          href={chat.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-md transition-colors truncate",
                            "hover:bg-accent hover:text-accent-foreground",
                            chat.active && "bg-accent text-accent-foreground",
                            sidebarState.isCollapsed && "px-2 text-center",
                          )}
                          onClick={() => handleChatClick(chat)}
                          title={
                            sidebarState.isCollapsed ? chat.title : undefined
                          }
                        >
                          {sidebarState.isCollapsed ? "💬" : chat.title}
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* Navigation Sections */}
              {navigationSections.map(renderNavigationSection)}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleToggle}
            className={cn(
              "w-full px-3 py-2 text-sm bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors",
              sidebarState.isCollapsed && "px-2",
            )}
          >
            {sidebarState.isCollapsed ? "←" : "Close"}
          </button>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

// Context7 Pattern: Factory Pattern - Sidebar creation utilities
export const createSidebar = {
  navigation: (sections: NavigationSection[]) => ({
    variant: "default" as const,
    size: "md" as const,
    navigationSections: sections,
    collapsible: true,
  }),

  chat: (chatHistory: ChatHistoryItem[]) => ({
    variant: "default" as const,
    size: "sm" as const,
    chatHistory,
    collapsible: true,
  }),

  dashboard: (
    sections: NavigationSection[],
    chatHistory: ChatHistoryItem[],
  ) => ({
    variant: "default" as const,
    size: "lg" as const,
    navigationSections: sections,
    chatHistory,
    collapsible: true,
    persistState: true,
  }),

  mobile: () => ({
    variant: "mobile" as const,
    size: "md" as const,
    position: "left" as const,
    autoCollapse: true,
  }),
};

// Context7 Pattern: Modularity - Sidebar composition helpers
export const SidebarComposed = {
  AppSidebar: ({
    user,
    navigationSections = [],
    chatHistory = [],
    ...sidebarProps
  }: SidebarProps & {
    user?: { name: string; email: string; avatar?: string };
  }) => (
    <Sidebar
      variant="default"
      size="lg"
      navigationSections={navigationSections}
      chatHistory={chatHistory}
      collapsible={true}
      persistState={true}
      {...sidebarProps}
    >
      <div className="p-4 space-y-6">
        {/* User Profile Section */}
        {user && (
          <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}

        {/* Default sidebar content will be rendered here */}
      </div>
    </Sidebar>
  ),

  MobileSidebar: ({
    isOpen,
    onClose,
    ...sidebarProps
  }: SidebarProps & {
    isOpen: boolean;
    onClose: () => void;
  }) => (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <Sidebar
        variant="mobile"
        size="md"
        open={isOpen}
        onToggle={onClose}
        {...sidebarProps}
      />
    </>
  ),
};
