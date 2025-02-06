import { init } from '@sentry/nextjs'
import { ProfilingIntegration } from '@sentry/profiling-node'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

export function register() {
  if (SENTRY_DSN) {
    init({
      dsn: SENTRY_DSN,
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      integrations: [new ProfilingIntegration()],
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
    })
  }
} 