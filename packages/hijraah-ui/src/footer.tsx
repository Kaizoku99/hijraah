import * as React from "react";
import { cn } from "./styles";

// Context7 Pattern: Data-as-Code - Type-safe footer configurations
export type FooterVariant = "default" | "minimal" | "detailed" | "sticky";
export type FooterTheme = "light" | "dark" | "accent";
export type FooterSize = "sm" | "md" | "lg";

// Context7 Pattern: Observability - Footer interaction and visibility metrics
interface FooterObservabilityContext {
  variant: FooterVariant;
  theme: FooterTheme;
  size: FooterSize;
  sectionCount: number;
  linkCount: number;
  isVisible: boolean;
  scrolledIntoView: boolean;
  linkClicks: number;
  socialEngagement: number;
  newsletterInteractions: number;
  timestamp: number;
}

// Context7 Pattern: Tracing - Footer lifecycle and interaction events
const createFooterTrace = (context: FooterObservabilityContext) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.debug("[Footer:Context7:Trace]", {
      component: "Footer",
      layout: {
        variant: context.variant,
        theme: context.theme,
        contentStructure: `${context.sectionCount} sections, ${context.linkCount} links`,
      },
      engagement: {
        linkClicks: context.linkClicks,
        socialEngagement: context.socialEngagement,
        newsletterInteractions: context.newsletterInteractions,
        visibilityRate: context.isVisible ? "visible" : "hidden",
      },
      ...context,
    });
  }
};

// Context7 Pattern: Provider Isolation - Footer style system abstraction
class FooterStyleProvider {
  private static readonly VARIANT_STYLES = {
    default: "bg-background border-t border-border",
    minimal: "bg-muted/30 border-t border-border/50",
    detailed: "bg-secondary/5 border-t border-border",
    sticky:
      "sticky bottom-0 bg-background/95 backdrop-blur border-t border-border shadow-sm",
  } as const;

  private static readonly THEME_STYLES = {
    light: "text-foreground",
    dark: "bg-slate-900 text-slate-100 border-slate-800",
    accent: "bg-primary/5 text-primary-foreground border-primary/20",
  } as const;

  private static readonly SIZE_STYLES = {
    sm: "py-4 px-4",
    md: "py-8 px-6",
    lg: "py-12 px-8",
  } as const;

  private static readonly BASE_STYLES =
    "w-full transition-all duration-300 ease-in-out";

  static getVariantStyle(variant: FooterVariant): string {
    return this.VARIANT_STYLES[variant];
  }

  static getThemeStyle(theme: FooterTheme): string {
    return this.THEME_STYLES[theme];
  }

  static getSizeStyle(size: FooterSize): string {
    return this.SIZE_STYLES[size];
  }

  static get baseStyles(): string {
    return this.BASE_STYLES;
  }
}

// Context7 Pattern: Resource Pooling - Footer visibility manager
class FooterVisibilityManager {
  private static instance: FooterVisibilityManager;
  private intersectionObserver: IntersectionObserver;
  private managedFooters = new Map<string, HTMLElement>();
  private visibilityCallbacks = new Map<
    string,
    (isVisible: boolean, scrolledIntoView: boolean) => void
  >();

  constructor() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const footerId = this.getFooterId(entry.target as HTMLElement);
          if (footerId) {
            const isVisible = entry.isIntersecting;
            const scrolledIntoView = entry.intersectionRatio > 0.5;
            const callback = this.visibilityCallbacks.get(footerId);
            callback?.(isVisible, scrolledIntoView);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
  }

  static getInstance(): FooterVisibilityManager {
    if (!FooterVisibilityManager.instance) {
      FooterVisibilityManager.instance = new FooterVisibilityManager();
    }
    return FooterVisibilityManager.instance;
  }

  register(
    footerId: string,
    element: HTMLElement,
    callback: (isVisible: boolean, scrolledIntoView: boolean) => void,
  ): void {
    this.managedFooters.set(footerId, element);
    this.visibilityCallbacks.set(footerId, callback);
    this.intersectionObserver.observe(element);
  }

  unregister(footerId: string): void {
    const element = this.managedFooters.get(footerId);
    if (element) {
      this.intersectionObserver.unobserve(element);
      this.managedFooters.delete(footerId);
      this.visibilityCallbacks.delete(footerId);
    }
  }

  private getFooterId(element: HTMLElement): string | null {
    for (const [id, footerElement] of this.managedFooters.entries()) {
      if (footerElement === element) return id;
    }
    return null;
  }
}

// Context7 Pattern: Data-as-Code - Footer content structure types
export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
  label: string;
}

// Context7 Pattern: Resumability - Footer state management
interface FooterState {
  isVisible: boolean;
  scrolledIntoView: boolean;
  linkClicks: number;
  socialEngagement: number;
  newsletterInteractions: number;
  lastInteractionTime: number;
}

// Footer component with Context7 patterns
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: FooterVariant;
  theme?: FooterTheme;
  size?: FooterSize;
  children?: React.ReactNode;
  // Context7 - Content structure
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  showNewsletter?: boolean;
  showBackToTop?: boolean;
  // Context7 - Observability callbacks
  onLinkClick?: (link: FooterLink, context: FooterObservabilityContext) => void;
  onSocialClick?: (
    social: SocialLink,
    context: FooterObservabilityContext,
  ) => void;
  onNewsletterInteraction?: (
    action: "subscribe" | "focus" | "blur",
    context: FooterObservabilityContext,
  ) => void;
  onVisibilityChange?: (
    isVisible: boolean,
    context: FooterObservabilityContext,
  ) => void;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      variant = "default",
      theme = "light",
      size = "md",
      children,
      sections = [],
      socialLinks = [],
      showNewsletter = false,
      showBackToTop = false,
      onLinkClick,
      onSocialClick,
      onNewsletterInteraction,
      onVisibilityChange,
      ...props
    },
    ref,
  ) => {
    const footerRef = React.useRef<HTMLElement>(null);
    const visibilityManagerRef = React.useRef(
      FooterVisibilityManager.getInstance(),
    );
    const componentId = React.useRef(
      `footer-${Math.random().toString(36).substr(2, 9)}`,
    );

    // Context7 Pattern: Resumability - State management
    const [footerState, setFooterState] = React.useState<FooterState>({
      isVisible: false,
      scrolledIntoView: false,
      linkClicks: 0,
      socialEngagement: 0,
      newsletterInteractions: 0,
      lastInteractionTime: Date.now(),
    });

    // Context7 Pattern: Data-as-Code - Calculate metrics
    const sectionCount = sections.length;
    const linkCount =
      sections.reduce((total, section) => total + section.links.length, 0) +
      socialLinks.length;

    // Context7 Pattern: Observability - Create context for callbacks
    const createObservabilityContext = React.useCallback(
      (): FooterObservabilityContext => ({
        variant,
        theme,
        size,
        sectionCount,
        linkCount,
        isVisible: footerState.isVisible,
        scrolledIntoView: footerState.scrolledIntoView,
        linkClicks: footerState.linkClicks,
        socialEngagement: footerState.socialEngagement,
        newsletterInteractions: footerState.newsletterInteractions,
        timestamp: Date.now(),
      }),
      [variant, theme, size, sectionCount, linkCount, footerState],
    );

    // Context7 Pattern: Resource management - Visibility tracking setup
    React.useEffect(() => {
      const element = footerRef.current;
      if (!element) return;

      const handleVisibilityChange = (
        isVisible: boolean,
        scrolledIntoView: boolean,
      ) => {
        setFooterState((prev) => ({ ...prev, isVisible, scrolledIntoView }));
        const context = createObservabilityContext();
        onVisibilityChange?.(isVisible, {
          ...context,
          isVisible,
          scrolledIntoView,
        });
        createFooterTrace({ ...context, isVisible, scrolledIntoView });
      };

      visibilityManagerRef.current.register(
        componentId.current,
        element,
        handleVisibilityChange,
      );

      return () => {
        visibilityManagerRef.current.unregister(componentId.current);
      };
    }, [createObservabilityContext, onVisibilityChange]);

    // Context7 Pattern: Event-driven Architecture - Link click tracking
    const handleLinkClick = React.useCallback(
      (link: FooterLink) => {
        setFooterState((prev) => ({
          ...prev,
          linkClicks: prev.linkClicks + 1,
          lastInteractionTime: Date.now(),
        }));

        const context = createObservabilityContext();
        onLinkClick?.(link, context);
        createFooterTrace(context);
      },
      [createObservabilityContext, onLinkClick],
    );

    // Context7 Pattern: Event-driven Architecture - Social click tracking
    const handleSocialClick = React.useCallback(
      (social: SocialLink) => {
        setFooterState((prev) => ({
          ...prev,
          socialEngagement: prev.socialEngagement + 1,
          lastInteractionTime: Date.now(),
        }));

        const context = createObservabilityContext();
        onSocialClick?.(social, context);
        createFooterTrace(context);
      },
      [createObservabilityContext, onSocialClick],
    );

    // Context7 Pattern: Event-driven Architecture - Newsletter interaction tracking
    const handleNewsletterInteraction = React.useCallback(
      (action: "subscribe" | "focus" | "blur") => {
        setFooterState((prev) => ({
          ...prev,
          newsletterInteractions: prev.newsletterInteractions + 1,
          lastInteractionTime: Date.now(),
        }));

        const context = createObservabilityContext();
        onNewsletterInteraction?.(action, context);
        createFooterTrace(context);
      },
      [createObservabilityContext, onNewsletterInteraction],
    );

    // Context7 Pattern: Event-driven Architecture - Back to top handler
    const handleBackToTop = React.useCallback(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleLinkClick({ label: "Back to Top", href: "#top" });
    }, [handleLinkClick]);

    // Context7 Pattern: Provider Isolation - Style computation
    const footerStyles = React.useMemo(() => {
      return cn(
        FooterStyleProvider.baseStyles,
        FooterStyleProvider.getVariantStyle(variant),
        FooterStyleProvider.getThemeStyle(theme),
        FooterStyleProvider.getSizeStyle(size),
        className,
      );
    }, [variant, theme, size, className]);

    return (
      <footer
        ref={(element) => {
          if (footerRef.current !== element) {
            (footerRef as React.MutableRefObject<HTMLElement | null>).current =
              element;
          }
          if (typeof ref === "function") {
            ref(element);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLElement | null>).current =
              element;
          }
        }}
        className={footerStyles}
        data-variant={variant}
        data-theme={theme}
        data-visible={footerState.isVisible}
        {...props}
      >
        <div className="container mx-auto">
          {/* Custom children or structured content */}
          {children || (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Footer sections */}
              {sections.map((section, _sectionIndex) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          onClick={() => handleLinkClick(link)}
                        >
                          {link.icon}
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Newsletter section */}
              {showNewsletter && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Stay Updated</h3>
                  <p className="text-muted-foreground text-sm">
                    Subscribe to our newsletter for immigration updates
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      onFocus={() => handleNewsletterInteraction("focus")}
                      onBlur={() => handleNewsletterInteraction("blur")}
                    />
                    <button
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      onClick={() => handleNewsletterInteraction("subscribe")}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer bottom section */}
          <div
            className={cn(
              "flex flex-col md:flex-row justify-between items-center gap-4",
              (sections.length > 0 || children) &&
                "mt-8 pt-8 border-t border-border",
            )}
          >
            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    onClick={() => handleSocialClick(social)}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Hijraah. All rights reserved.
            </div>

            {/* Back to top button */}
            {showBackToTop && (
              <button
                onClick={handleBackToTop}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to Top ↑
              </button>
            )}
          </div>
        </div>
      </footer>
    );
  },
);
Footer.displayName = "Footer";

// Context7 Pattern: Factory Pattern - Footer creation utilities
export const createFooter = {
  simple: () => ({
    variant: "minimal" as const,
    size: "sm" as const,
    showBackToTop: true,
  }),

  detailed: (sections: FooterSection[]) => ({
    variant: "detailed" as const,
    size: "lg" as const,
    sections,
    showNewsletter: true,
    showBackToTop: true,
  }),

  marketing: (sections: FooterSection[], socialLinks: SocialLink[]) => ({
    variant: "default" as const,
    size: "md" as const,
    sections,
    socialLinks,
    showNewsletter: true,
    showBackToTop: true,
  }),

  sticky: () => ({
    variant: "sticky" as const,
    size: "sm" as const,
    theme: "accent" as const,
  }),
};

// Context7 Pattern: Modularity - Footer composition helpers
export const FooterComposed = {
  ImmigrationFooter: (props: FooterProps) => {
    const immigrationSections: FooterSection[] = [
      {
        title: "Services",
        links: [
          { label: "Visa Applications", href: "/services/visas" },
          { label: "Work Permits", href: "/services/work-permits" },
          { label: "Residency", href: "/services/residency" },
          { label: "Citizenship", href: "/services/citizenship" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Country Information", href: "/resources/countries" },
          { label: "Immigration News", href: "/resources/news" },
          { label: "Legal Requirements", href: "/resources/legal" },
          { label: "FAQs", href: "/resources/faqs" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Chat Support", href: "/chat" },
          { label: "Schedule Consultation", href: "/support/schedule" },
          { label: "Knowledge Base", href: "/support/knowledge" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
    ];

    return (
      <Footer
        variant="detailed"
        size="lg"
        sections={immigrationSections}
        showNewsletter={true}
        showBackToTop={true}
        {...props}
      />
    );
  },

  SimpleFooter: (props: FooterProps) => (
    <Footer variant="minimal" size="sm" showBackToTop={true} {...props} />
  ),

  StickyFooter: ({
    actions,
    ...props
  }: FooterProps & { actions?: React.ReactNode }) => (
    <Footer variant="sticky" size="sm" theme="accent" {...props}>
      <div className="flex items-center justify-between w-full">
        <div className="text-sm">Stay connected with immigration updates</div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </Footer>
  ),
};
