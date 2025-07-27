import { datadogRum } from '@datadog/browser-rum';

import { cache } from '../cache';
import { getSupabaseClient } from '../supabase/client';

const EVENT_BATCH_SIZE = 50;
const EVENT_BATCH_INTERVAL = 5000; // 5 seconds
const PERFORMANCE_SAMPLE_RATE = 0.1; // 10% of requests

// Event queue for batching
let eventQueue: AnalyticsEvent[] = [];
let batchTimeout: NodeJS.Timeout | null = null;

// Initialize monitoring
export function initializeMonitoring() {
  if (process.env.NEXT_PUBLIC_DATADOG_APP_ID && process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN) {
    datadogRum.init({
      applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID,
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
      site: 'datadoghq.com',
      service: 'hijraah',
      env: process.env.NODE_ENV,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
      allowedTracingUrls: [
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'https://hijraah.vercel.app',
      ],
    });
  }

  // Start event batch processing
  processBatchedEvents();
}

// Analytics event types
export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, unknown>;
  userId?: string;
  timestamp?: string;
  sessionId?: string;
};

// Process batched events
async function processBatchedEvents() {
  if (batchTimeout) {
    clearTimeout(batchTimeout);
  }

  if (eventQueue.length === 0) {
    batchTimeout = setTimeout(processBatchedEvents, EVENT_BATCH_INTERVAL);
    return;
  }

  const events = eventQueue.splice(0, EVENT_BATCH_SIZE);
  
  try {
    const supabase = await getSupabaseClient();
    await supabase.from('analytics_events').insert(
      events.map(event => ({
        event_name: event.name,
        properties: event.properties,
        user_id: event.userId,
        timestamp: event.timestamp || new Date().toISOString(),
        session_id: event.sessionId,
      }))
    );
  } catch (error) {
    console.error('Failed to process event batch:', error);
    // Re-queue failed events
    eventQueue = [...events, ...eventQueue];
  }

  batchTimeout = setTimeout(processBatchedEvents, EVENT_BATCH_INTERVAL);
}

// Track analytics event
export async function trackEvent(event: AnalyticsEvent) {
  try {
    const context = datadogRum.getInternalContext();
    // Add to Datadog
    if (context) {
      datadogRum.addAction(event.name, {
        ...event.properties,
        timestamp: event.timestamp,
        session_id: event.sessionId,
      });
    }

    // Add to batch queue
    eventQueue.push({
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
      sessionId: event.sessionId || context?.session_id,
    });

    // Process immediately if queue is full
    if (eventQueue.length >= EVENT_BATCH_SIZE) {
      processBatchedEvents();
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

// Performance monitoring with sampling
export function startPerformanceTracking(name: string, options: {
  sampleRate?: number;
  threshold?: number;
} = {}): () => void {
  const shouldTrack = Math.random() < (options.sampleRate || PERFORMANCE_SAMPLE_RATE);
  if (!shouldTrack) return () => {};

  const startTime = performance.now();
  const threshold = options.threshold || 1000; // 1 second default threshold

  return () => {
    const duration = performance.now() - startTime;
    const context = datadogRum.getInternalContext();
    
    if (context) {
      datadogRum.addTiming(name, duration);
      
      // Track slow operations
      if (duration > threshold) {
        trackEvent({
          name: 'slow_operation',
          properties: {
            operation: name,
            duration,
            threshold,
          },
        });
      }
    }

    // Cache performance metrics
    try {
      const cacheKey = `perf:${name}:${new Date().toISOString().split('T')[0]}`;
      cache.get(cacheKey).then(existing => {
        const metrics = existing ? JSON.parse(existing) : { count: 0, total: 0, max: 0 };
        metrics.count++;
        metrics.total += duration;
        metrics.max = Math.max(metrics.max, duration);
        cache.set(cacheKey, JSON.stringify(metrics), 86400); // 24 hours
      });
    } catch (error) {
      console.error('Failed to cache performance metrics:', error);
    }
  };
}

// Enhanced error tracking
export function trackError(error: Error, context?: Record<string, unknown>) {
  console.error(error);
  const rumContext = datadogRum.getInternalContext();
  
  const errorContext = {
    ...context,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    session_id: rumContext?.session_id,
  };
  
  if (rumContext) {
    datadogRum.addError(error, errorContext);
  }

  // Track in analytics
  trackEvent({
    name: 'error',
    properties: {
      error_name: error.name,
      error_message: error.message,
      ...errorContext,
    },
  });
}

// User session tracking with persistence
export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  const context = datadogRum.getInternalContext();
  if (context) {
    const sessionId = context.session_id;
    
    datadogRum.setUser({
      id: userId,
      session_id: sessionId,
      ...traits,
    });

    // Track user identification
    trackEvent({
      name: 'user_identified',
      userId,
      sessionId,
      properties: traits,
    });
  }
}

// Enhanced page view tracking
export function trackPageView(path: string, properties?: Record<string, unknown>) {
  const startTime = performance.now();
  
  trackEvent({
    name: 'page_view',
    properties: {
      path,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      screen_size: `${window.innerWidth}x${window.innerHeight}`,
      ...properties,
    },
  });

  // Track page load performance
  return () => {
    const duration = performance.now() - startTime;
    trackEvent({
      name: 'page_load_complete',
      properties: {
        path,
        duration,
        ...properties,
      },
    });
  };
}

// Feature usage tracking with metadata
export function trackFeatureUsage(featureName: string, properties?: Record<string, unknown>) {
  const context = datadogRum.getInternalContext();
  trackEvent({
    name: 'feature_used',
    properties: {
      feature: featureName,
      timestamp: new Date().toISOString(),
      session_id: context?.session_id,
      ...properties,
    },
  });
} 