/**
 * Export all i18n functionality from the shared location
 */
export * from "./i18n";

/**
 * Export navigation helpers for Next.js routes
 */
export * from "./navigation";

/**
 * Export hooks for client-side i18n usage
 */
export * from "./hooks";

/**
 * Re-export request configuration for server components only
 * Note: This should not be imported in client components
 */
// Export this from a separate file to avoid client components
// importing server-only code
export { default as getI18nConfig } from "./server";
