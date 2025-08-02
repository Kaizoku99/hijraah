/**
 * Real-time Notification and Alert System (Task 11.1)
 *
 * Implements policy change notification engine using:
 * - Firecrawl change detection and monitoring
 * - Supabase real-time subscriptions and postgres_changes events
 * - AI SDK intelligent message generation and personalization
 * - Multi-channel delivery with Supabase Edge Functions
 * - User preference management with Drizzle ORM and RLS
 * - pgvector preference matching for personalized notifications
 */

// Export all notification tasks
export * from "./policy-change-notifications.js";
export * from "./user-preference-management.js";
export * from "./multi-channel-delivery.js";
export * from "./notification-personalization.js";
export * from "./types.js";