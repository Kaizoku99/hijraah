interface PageView {
  path: string;
  timestamp: number;
  duration?: number;
  referrer?: string;
}

interface Event {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}

class Analytics {
  private static instance: Analytics;
  private pageViews: PageView[] = [];
  private events: Event[] = [];
  private sessionStartTime: number;

  private constructor() {
    this.sessionStartTime = Date.now();
    if (typeof window !== 'undefined') {
      // Track page views
      this.trackPageView();
      // Track session duration
      window.addEventListener('beforeunload', () => {
        this.trackSessionDuration();
      });
    }
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  // Track page view
  private trackPageView() {
    const pageView: PageView = {
      path: window.location.pathname,
      timestamp: Date.now(),
      referrer: document.referrer,
    };
    this.pageViews.push(pageView);

    // Send to Vercel Analytics
    if (process.env.NODE_ENV === 'production') {
      // Vercel Analytics is automatically configured
    }
  }

  // Track event
  trackEvent(name: string, properties?: Record<string, any>) {
    const event: Event = {
      name,
      properties,
      timestamp: Date.now(),
    };
    this.events.push(event);

    // Send to Vercel Analytics
    if (process.env.NODE_ENV === 'production') {
      // Vercel Analytics is automatically configured
    }
  }

  // Track session duration
  private trackSessionDuration() {
    const duration = Date.now() - this.sessionStartTime;
    this.trackEvent('session_ended', { duration });
  }

  // Get all page views
  getPageViews(): PageView[] {
    return this.pageViews;
  }

  // Get all events
  getEvents(): Event[] {
    return this.events;
  }
}

export const analytics = Analytics.getInstance();