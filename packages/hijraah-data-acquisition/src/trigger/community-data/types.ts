/**
 * Types and schemas for community data collection tasks
 */

import { z } from "zod";

// User milestone event schema
export const UserMilestoneEventSchema = z.object({
  userId: z.string().uuid(),
  milestone: z.string(),
  pathway: z.string(),
  targetCountry: z.string().length(3), // ISO country code
  timestamp: z.date(),
  metadata: z.record(z.any()).optional(),
});

export type UserMilestoneEvent = z.infer<typeof UserMilestoneEventSchema>;

// Experience data collection schema
export const ExperienceDataSchema = z.object({
  userId: z.string().uuid(),
  pathway: z.string(),
  targetCountry: z.string().length(3),
  milestone: z.string(),
  actualTimeline: z.number().int().positive(), // days
  actualCost: z.number().positive(),
  difficulty: z.number().int().min(1).max(10),
  success: z.boolean(),
  feedback: z.string().min(10),
  supportingDocuments: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

export type ExperienceData = z.infer<typeof ExperienceDataSchema>;

// Document upload processing schema
export const DocumentUploadSchema = z.object({
  userId: z.string().uuid(),
  experienceId: z.string().uuid().optional(),
  documentType: z.enum(["receipt", "certificate", "timeline_proof", "correspondence", "other"]),
  content: z.string().optional(), // For web content
  fileBuffer: z.instanceof(Buffer).optional(), // For file uploads
  fileName: z.string().optional(),
  url: z.string().url().optional(), // For web documents
  metadata: z.record(z.any()).optional(),
});

export type DocumentUpload = z.infer<typeof DocumentUploadSchema>;

// Quality assessment schema
export const QualityAssessmentSchema = z.object({
  accuracy: z.number().min(0).max(1),
  completeness: z.number().min(0).max(1),
  consistency: z.number().min(0).max(1),
  reliability: z.number().min(0).max(1),
  overall: z.number().min(0).max(1),
  issues: z.array(z.string()).optional(),
  recommendations: z.array(z.string()).optional(),
});

export type QualityAssessment = z.infer<typeof QualityAssessmentSchema>;

// Validation result schema
export const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  confidence: z.number().min(0).max(1),
  qualityScore: z.number().min(0).max(1),
  issues: z.array(z.string()),
  recommendations: z.array(z.string()),
  metadata: z.record(z.any()).optional(),
});

export type ValidationResult = z.infer<typeof ValidationResultSchema>;

// Outlier detection schema
export const OutlierDetectionResultSchema = z.object({
  isOutlier: z.boolean(),
  outlierScore: z.number().min(0).max(1),
  outlierType: z.enum(["statistical", "contextual", "collective"]).optional(),
  reasons: z.array(z.string()),
  similarExperiences: z.array(z.string().uuid()).optional(),
  metadata: z.record(z.any()).optional(),
});

export type OutlierDetectionResult = z.infer<typeof OutlierDetectionResultSchema>;

// Peer review schema
export const PeerReviewSchema = z.object({
  experienceId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  accuracy: z.number().min(0).max(1),
  completeness: z.number().min(0).max(1),
  usefulness: z.number().min(0).max(1),
  feedback: z.string().optional(),
  recommendation: z.enum(["approve", "reject", "needs_revision"]),
  metadata: z.record(z.any()).optional(),
});

export type PeerReview = z.infer<typeof PeerReviewSchema>;

// Reputation calculation schema
export const ReputationUpdateSchema = z.object({
  userId: z.string().uuid(),
  action: z.enum(["contribution", "validation", "peer_review", "quality_improvement"]),
  impact: z.number().min(-1).max(1), // Positive or negative impact
  details: z.record(z.any()).optional(),
});

export type ReputationUpdate = z.infer<typeof ReputationUpdateSchema>;

// Gamification reward schema
export const GamificationRewardSchema = z.object({
  userId: z.string().uuid(),
  rewardType: z.enum(["badge", "points", "level_up", "achievement"]),
  rewardName: z.string(),
  description: z.string().optional(),
  points: z.number().int().default(0),
  metadata: z.record(z.any()).optional(),
});

export type GamificationReward = z.infer<typeof GamificationRewardSchema>;

// Notification schema
export const NotificationSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(["milestone_reminder", "validation_request", "reward_earned", "peer_review_request"]),
  title: z.string(),
  message: z.string(),
  actionUrl: z.string().url().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  metadata: z.record(z.any()).optional(),
});

export type Notification = z.infer<typeof NotificationSchema>;

// Task context for community data operations
export const CommunityTaskContextSchema = z.object({
  taskId: z.string(),
  userId: z.string().uuid().optional(),
  experienceId: z.string().uuid().optional(),
  batchSize: z.number().int().positive().default(10),
  concurrency: z.number().int().positive().default(3),
  retryAttempts: z.number().int().min(0).max(5).default(3),
  metadata: z.record(z.any()).optional(),
});

export type CommunityTaskContext = z.infer<typeof CommunityTaskContextSchema>;