import { Severity } from '@/types/monitoring';
import * as Sentry from '@sentry/nextjs';
import { datadogRum } from '@datadog/browser-rum';

interface ErrorContext {
  error: Error;
  context?: Record<string, unknown>;
  severity?: Severity;
  userId?: string;
}

interface PerformanceMetric {
  name: string;
  duration: number;
  metadata?: Record<string, unknown>;
}

class Monitoring {
  private static instance: Monitoring;

  private constructor() {
    this.initializeServices();
  }

  public static getInstance(): Monitoring {
    if (!Monitoring.instance) {
      Monitoring.instance = new Monitoring();
    }
    return Monitoring.instance;
  }

  private initializeServices() {
    // Initialize Sentry
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: 1.0,
      });
    }
    
    // Initialize Datadog RUM
    if (process.env.NEXT_PUBLIC_DATADOG_APP_ID) {
      datadogRum.init({
        applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID,
        clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
        site: 'datadoghq.com',
        service: 'hijraah',
        env: process.env.NODE_ENV,
        version: '1.0.0',
        sampleRate: 100,
        trackInteractions: true,
      });
    }
  }

  public recordError({ error, context, severity = 'medium', userId }: ErrorContext): void {
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      severity,
      userId,
      timestamp: new Date().toISOString(),
    };

    console.error('[Error]', errorData);

    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, {
        level: severity === 'critical' ? 'fatal' : severity,
        user: userId ? { id: userId } : undefined,
        extra: context,
      });
    }
  }

  public recordAPIPerformance(path: string, duration: number, status: number): void {
    this.recordPerformanceMetric({
      name: 'api_request',
      duration,
      metadata: {
        path,
        status,
      },
    });
  }

  public recordPerformanceMetric({ name, duration, metadata }: PerformanceMetric): void {
    const metricData = {
      name,
      duration,
      metadata,
      timestamp: new Date().toISOString(),
    };

    console.info('[Performance]', metricData);

    if (process.env.NODE_ENV === 'production') {
      datadogRum.addTiming(name, duration);
      if (metadata) {
        datadogRum.addAction('performance_metric', metricData);
      }
    }
  }

  public recordUserAction(action: string, metadata?: Record<string, unknown>): void {
    const actionData = {
      action,
      metadata,
      timestamp: new Date().toISOString(),
    };

    console.info('[UserAction]', actionData);

    if (process.env.NODE_ENV === 'production') {
      datadogRum.addAction('custom_action', actionData);
    }
  }

  public startTransaction(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      this.recordPerformanceMetric({
        name,
        duration,
      });
    };
  }
}

export const monitoring = Monitoring.getInstance();