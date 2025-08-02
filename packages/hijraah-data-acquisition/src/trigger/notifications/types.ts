/**
 * Notification System Types (Task 11.1)
 *
 * Type definitions for the real-time notification and alert system.
 */

import { z } from "zod";

// Notification Types
export const NotificationTypeSchema = z.enum([
  "policy_change",
  "critical_update",
  "deadline_reminder",
  "document_required",
  "status_update",
  "system_alert",
  "personalized_insight",
  "community_update",
]);

export type NotificationType = z.infer<typeof NotificationTypeSchema>;

// Notification Channels
export const NotificationChannelSchema = z.enum([
  "in_app",
  "email",
  "sms",
  "push",
  "webhook",
  "realtime",
]);

export type NotificationChannel = z.infer<typeof NotificationChannelSchema>;

// Notification Priority
export const NotificationPrioritySchema = z.enum([
  "low",
  "medium",
  "high",
  "critical",
  "urgent",
]);

export type NotificationPriority = z.infer<typeof NotificationPrioritySchema>;

// User Preference Schema
export const UserNotificationPreferenceSchema = z.object({
  userId: z.string().uuid(),
  notificationType: NotificationTypeSchema,
  channels: z.array(NotificationChannelSchema),
  enabled: z.boolean().default(true),
  frequency: z.enum(["immediate", "hourly", "daily", "weekly"]).default("immediate"),
  quietHours: z.object({
    enabled: z.boolean().default(false),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:MM format
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    timezone: z.string().default("UTC"),
  }).optional(),
  filters: z.object({
    countries: z.array(z.string()).optional(),
    visaTypes: z.array(z.string()).optional(),
    immigrationTypes: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    excludeKeywords: z.array(z.string()).optional(),
  }).optional(),
  metadata: z.record(z.any()).optional(),
});

export type UserNotificationPreference = z.infer<typeof UserNotificationPreferenceSchema>;

// Policy Change Notification Schema
export const PolicyChangeNotificationSchema = z.object({
  id: z.string().uuid(),
  policyChangeId: z.string().uuid(),
  country: z.string(),
  policyType: z.string(),
  changeType: z.enum(["new", "updated", "removed", "clarification"]),
  impactLevel: z.enum(["critical", "high", "medium", "low"]),
  title: z.string(),
  summary: z.string(),
  details: z.string(),
  effectiveDate: z.string().datetime().optional(),
  sourceUrl: z.string().url(),
  sourceAttribution: z.object({
    agency: z.string(),
    lastUpdated: z.string().datetime(),
    credibilityScore: z.number().min(0).max(1),
  }),
  affectedCategories: z.array(z.string()),
  aiAnalysis: z.object({
    impactAssessment: z.string(),
    actionItems: z.array(z.string()),
    timeline: z.string().optional(),
    riskLevel: z.enum(["low", "medium", "high", "critical"]),
    confidence: z.number().min(0).max(1),
  }),
  firecrawlMetadata: z.object({
    jobId: z.string().optional(),
    sourceReliability: z.number().min(0).max(1),
    lastCrawled: z.string().datetime(),
    changeDetectionMethod: z.enum(["content_diff", "timestamp", "hash", "ai_analysis"]),
  }),
});

export type PolicyChangeNotification = z.infer<typeof PolicyChangeNotificationSchema>;

// Personalized Notification Schema
export const PersonalizedNotificationSchema = z.object({
  userId: z.string().uuid(),
  baseNotification: PolicyChangeNotificationSchema,
  personalization: z.object({
    relevanceScore: z.number().min(0).max(1),
    personalizedTitle: z.string(),
    personalizedMessage: z.string(),
    actionItems: z.array(z.string()),
    urgencyLevel: NotificationPrioritySchema,
    estimatedImpact: z.enum(["none", "minimal", "moderate", "significant", "major"]),
    recommendedActions: z.array(z.object({
      action: z.string(),
      priority: z.enum(["low", "medium", "high"]),
      deadline: z.string().datetime().optional(),
      resources: z.array(z.string()).optional(),
    })),
    contextualInformation: z.object({
      userProfile: z.record(z.any()),
      currentStage: z.string().optional(),
      relatedCases: z.array(z.string()).optional(),
      historicalContext: z.string().optional(),
    }),
  }),
  deliveryChannels: z.array(NotificationChannelSchema),
  scheduledDelivery: z.string().datetime().optional(),
  metadata: z.record(z.any()).optional(),
});

export type PersonalizedNotification = z.infer<typeof PersonalizedNotificationSchema>;

// Multi-Channel Delivery Schema
export const MultiChannelDeliverySchema = z.object({
  notificationId: z.string().uuid(),
  userId: z.string().uuid(),
  channels: z.array(z.object({
    channel: NotificationChannelSchema,
    status: z.enum(["pending", "sent", "delivered", "failed", "bounced"]),
    sentAt: z.string().datetime().optional(),
    deliveredAt: z.string().datetime().optional(),
    failureReason: z.string().optional(),
    retryCount: z.number().default(0),
    metadata: z.record(z.any()).optional(),
  })),
  aggregatedStatus: z.enum(["pending", "partial", "complete", "failed"]),
  totalChannels: z.number(),
  successfulChannels: z.number(),
  failedChannels: z.number(),
});

export type MultiChannelDelivery = z.infer<typeof MultiChannelDeliverySchema>;

// Firecrawl Change Detection Schema
export const FirecrawlChangeDetectionSchema = z.object({
  sourceId: z.string().uuid(),
  url: z.string().url(),
  country: z.string(),
  agency: z.string(),
  changeDetected: z.boolean(),
  changeType: z.enum(["content", "structure", "metadata", "availability"]),
  changeDetails: z.object({
    previousHash: z.string().optional(),
    currentHash: z.string().optional(),
    contentDiff: z.string().optional(),
    structuralChanges: z.array(z.string()).optional(),
    metadataChanges: z.record(z.any()).optional(),
  }),
  firecrawlJobId: z.string(),
  crawledAt: z.string().datetime(),
  confidence: z.number().min(0).max(1),
  metadata: z.record(z.any()).optional(),
});

export type FirecrawlChangeDetection = z.infer<typeof FirecrawlChangeDetectionSchema>;

// Notification Analytics Schema
export const NotificationAnalyticsSchema = z.object({
  notificationId: z.string().uuid(),
  userId: z.string().uuid(),
  type: NotificationTypeSchema,
  priority: NotificationPrioritySchema,
  channels: z.array(NotificationChannelSchema),
  metrics: z.object({
    sentAt: z.string().datetime(),
    deliveredAt: z.string().datetime().optional(),
    readAt: z.string().datetime().optional(),
    clickedAt: z.string().datetime().optional(),
    actionTakenAt: z.string().datetime().optional(),
    deliveryTime: z.number().optional(), // milliseconds
    readTime: z.number().optional(), // milliseconds from delivery
    engagementScore: z.number().min(0).max(1).optional(),
  }),
  userFeedback: z.object({
    rating: z.number().min(1).max(5).optional(),
    helpful: z.boolean().optional(),
    comment: z.string().optional(),
    reportedAt: z.string().datetime().optional(),
  }).optional(),
  metadata: z.record(z.any()).optional(),
});

export type NotificationAnalytics = z.infer<typeof NotificationAnalyticsSchema>;

// Batch Notification Processing Schema
export const BatchNotificationProcessingSchema = z.object({
  batchId: z.string().uuid(),
  policyChangeId: z.string().uuid(),
  totalUsers: z.number(),
  processedUsers: z.number(),
  successfulNotifications: z.number(),
  failedNotifications: z.number(),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
  estimatedCompletion: z.string().datetime().optional(),
  status: z.enum(["pending", "processing", "completed", "failed", "cancelled"]),
  errors: z.array(z.object({
    userId: z.string().uuid(),
    error: z.string(),
    timestamp: z.string().datetime(),
  })).optional(),
  metadata: z.record(z.any()).optional(),
});

export type BatchNotificationProcessing = z.infer<typeof BatchNotificationProcessingSchema>;

// Export all schemas for validation
export const NotificationSchemas = {
  NotificationTypeSchema,
  NotificationChannelSchema,
  NotificationPrioritySchema,
  UserNotificationPreferenceSchema,
  PolicyChangeNotificationSchema,
  PersonalizedNotificationSchema,
  MultiChannelDeliverySchema,
  FirecrawlChangeDetectionSchema,
  NotificationAnalyticsSchema,
  BatchNotificationProcessingSchema,
} as const;