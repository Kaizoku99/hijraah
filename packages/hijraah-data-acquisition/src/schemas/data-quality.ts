/**
 * Data Quality Assurance Schemas
 * 
 * Zod schemas for data quality validation, scoring, and monitoring
 */

import { z } from "zod";

// Data source quality metrics
export const dataSourceQualitySchema = z.object({
  sourceId: z.string(),
  sourceName: z.string(),
  sourceType: z.enum(["government", "api", "community", "document"]),
  url: z.string().url().optional(),
  credibilityScore: z.number().min(0).max(1),
  reliabilityScore: z.number().min(0).max(1),
  freshnessScore: z.number().min(0).max(1),
  completenessScore: z.number().min(0).max(1),
  consistencyScore: z.number().min(0).max(1),
  overallQualityScore: z.number().min(0).max(1),
  lastValidated: z.date(),
  validationCount: z.number().int().min(0),
  errorCount: z.number().int().min(0),
  metadata: z.record(z.any()).optional(),
});

// Data validation result
export const dataValidationResultSchema = z.object({
  dataId: z.string(),
  sourceId: z.string(),
  validationType: z.enum(["structure", "content", "freshness", "consistency", "completeness"]),
  isValid: z.boolean(),
  confidenceScore: z.number().min(0).max(1),
  qualityScore: z.number().min(0).max(1),
  issues: z.array(z.object({
    type: z.enum(["error", "warning", "info"]),
    code: z.string(),
    message: z.string(),
    field: z.string().optional(),
    severity: z.enum(["critical", "high", "medium", "low"]),
    suggestion: z.string().optional(),
  })),
  metrics: z.object({
    accuracy: z.number().min(0).max(1),
    completeness: z.number().min(0).max(1),
    consistency: z.number().min(0).max(1),
    timeliness: z.number().min(0).max(1),
    validity: z.number().min(0).max(1),
  }),
  validatedAt: z.date(),
  validatedBy: z.enum(["system", "ai", "human", "community"]),
  metadata: z.record(z.any()).optional(),
});

// Quality anomaly detection
export const qualityAnomalySchema = z.object({
  id: z.string(),
  dataId: z.string(),
  sourceId: z.string(),
  anomalyType: z.enum(["outlier", "inconsistency", "staleness", "corruption", "duplication"]),
  severity: z.enum(["critical", "high", "medium", "low"]),
  description: z.string(),
  detectedAt: z.date(),
  detectionMethod: z.enum(["statistical", "ai", "rule_based", "community_report"]),
  confidence: z.number().min(0).max(1),
  affectedFields: z.array(z.string()),
  suggestedAction: z.enum(["quarantine", "flag", "auto_fix", "manual_review", "ignore"]),
  status: z.enum(["detected", "investigating", "resolved", "false_positive"]),
  metadata: z.record(z.any()).optional(),
});

// Data freshness monitoring
export const dataFreshnessSchema = z.object({
  dataId: z.string(),
  sourceId: z.string(),
  dataType: z.string(),
  lastUpdated: z.date(),
  expectedUpdateFrequency: z.string(), // cron expression
  actualUpdateFrequency: z.string().optional(),
  freshnessScore: z.number().min(0).max(1),
  isStale: z.boolean(),
  stalenessThreshold: z.number().int().min(0), // hours
  timesSinceUpdate: z.number().int().min(0), // hours
  alertThreshold: z.number().int().min(0), // hours
  shouldAlert: z.boolean(),
  metadata: z.record(z.any()).optional(),
});

// Quality improvement feedback
export const qualityFeedbackSchema = z.object({
  id: z.string(),
  dataId: z.string(),
  sourceId: z.string(),
  feedbackType: z.enum(["accuracy", "completeness", "timeliness", "relevance", "format"]),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  suggestedImprovement: z.string().optional(),
  reportedBy: z.string(), // user ID
  reportedAt: z.date(),
  status: z.enum(["pending", "reviewed", "implemented", "rejected"]),
  reviewedBy: z.string().optional(),
  reviewedAt: z.date().optional(),
  reviewNotes: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

// Batch validation request
export const batchValidationRequestSchema = z.object({
  dataIds: z.array(z.string()),
  validationTypes: z.array(z.enum(["structure", "content", "freshness", "consistency", "completeness"])),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  requestedBy: z.string(),
  requestedAt: z.date(),
  metadata: z.record(z.any()).optional(),
});

// Quality dashboard metrics
export const qualityDashboardMetricsSchema = z.object({
  period: z.enum(["hour", "day", "week", "month"]),
  startDate: z.date(),
  endDate: z.date(),
  totalDataPoints: z.number().int().min(0),
  validDataPoints: z.number().int().min(0),
  invalidDataPoints: z.number().int().min(0),
  averageQualityScore: z.number().min(0).max(1),
  qualityTrend: z.enum(["improving", "stable", "declining"]),
  topIssues: z.array(z.object({
    type: z.string(),
    count: z.number().int().min(0),
    percentage: z.number().min(0).max(100),
  })),
  sourceQuality: z.array(z.object({
    sourceId: z.string(),
    sourceName: z.string(),
    qualityScore: z.number().min(0).max(1),
    dataCount: z.number().int().min(0),
  })),
  anomaliesDetected: z.number().int().min(0),
  anomaliesResolved: z.number().int().min(0),
  metadata: z.record(z.any()).optional(),
});

// Export types
export type DataSourceQuality = z.infer<typeof dataSourceQualitySchema>;
export type DataValidationResult = z.infer<typeof dataValidationResultSchema>;
export type QualityAnomaly = z.infer<typeof qualityAnomalySchema>;
export type DataFreshness = z.infer<typeof dataFreshnessSchema>;
export type QualityFeedback = z.infer<typeof qualityFeedbackSchema>;
export type BatchValidationRequest = z.infer<typeof batchValidationRequestSchema>;
export type QualityDashboardMetrics = z.infer<typeof qualityDashboardMetricsSchema>;