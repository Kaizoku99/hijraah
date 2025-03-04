import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { Context } from 'hono';

// Initialize Sentry based on environment variables
let sentryInitialized = false;

/**
 * Initialize Sentry client
 */
export function initSentry(): void {
  // Skip if already initialized or if DSN is not configured
  if (sentryInitialized || !process.env.SENTRY_DSN) {
    return;
  }

  try {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      release: process.env.SENTRY_RELEASE || process.env.npm_package_version || 'dev',
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,
      integrations: [
        new ProfilingIntegration(),
      ],
      // Performance settings
      autoSessionTracking: true,
      // Add debugging info in non-prod environments
      debug: process.env.NODE_ENV !== 'production',
    });

    console.log('Sentry initialized successfully');
    sentryInitialized = true;
  } catch (error) {
    console.error('Failed to initialize Sentry:', error);
  }
}

/**
 * Check if Sentry is initialized
 */
export function isSentryEnabled(): boolean {
  return sentryInitialized;
}

/**
 * Capture exception with Sentry
 */
export function captureException(error: Error, context?: Record<string, any>): string | null {
  if (!isSentryEnabled()) {
    console.error('Error (Sentry disabled):', error, context);
    return null;
  }

  return Sentry.captureException(error, { 
    extra: context,
  });
}

/**
 * Capture message with Sentry
 */
export function captureMessage(
  message: string, 
  level: Sentry.SeverityLevel = 'info',
  context?: Record<string, any>
): string | null {
  if (!isSentryEnabled()) {
    console.log(`${level.toUpperCase()} (Sentry disabled):`, message, context);
    return null;
  }

  return Sentry.captureMessage(message, {
    level,
    extra: context,
  });
}

/**
 * Add breadcrumb to current Sentry scope
 */
export function addBreadcrumb(
  breadcrumb: Sentry.Breadcrumb
): void {
  if (isSentryEnabled()) {
    Sentry.addBreadcrumb(breadcrumb);
  }
}

/**
 * Start a performance transaction
 */
export function startTransaction(
  name: string, 
  op: string
): Sentry.Transaction | null {
  if (!isSentryEnabled()) {
    return null;
  }

  return Sentry.startTransaction({
    name,
    op,
  });
}

/**
 * Set up user context in Sentry (for tracking user-related information)
 */
export function setUser(
  user: { id: string; [key: string]: any } | null
): void {
  if (isSentryEnabled()) {
    Sentry.setUser(user);
  }
}

/**
 * Add context to Sentry (for additional tagging and filtering)
 */
export function setContext(
  name: string,
  context: Record<string, any>
): void {
  if (isSentryEnabled()) {
    Sentry.setContext(name, context);
  }
}

/**
 * Extract useful request data for Sentry context
 */
export function getRequestData(c: Context): Record<string, any> {
  return {
    url: c.req.url,
    method: c.req.method,
    headers: Object.fromEntries(c.req.raw.headers.entries()),
    ip: c.req.header('x-forwarded-for') || c.req.header('x-real-ip'),
    userAgent: c.req.header('user-agent'),
    path: c.req.path,
    query: Object.fromEntries(new URL(c.req.url).searchParams.entries()),
    userId: c.get('user')?.id,
    requestId: c.get('requestId') || null,
  };
}

/**
 * Close Sentry and flush events before app shutdown
 */
export async function closeSentry(): Promise<boolean> {
  if (!isSentryEnabled()) {
    return true;
  }

  try {
    await Sentry.close(2000); // Wait for 2s max
    return true;
  } catch (error) {
    console.error('Error closing Sentry:', error);
    return false;
  }
} 