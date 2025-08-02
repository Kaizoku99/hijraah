/**
 * Data Quality Assurance Types
 * 
 * TypeScript types for data quality validation and monitoring
 */

import type { 
  DataSourceQuality, 
  DataValidationResult, 
  QualityAnomaly, 
  DataFreshness,
  QualityFeedback,
  BatchValidationRequest,
  QualityDashboardMetrics 
} from "../../schemas/data-quality.js";

// Data quality engine configuration
export interface DataQualityConfig {
  firecrawl: {
    apiKey: string;
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  ai: {
    model: string;
    temperature: number;
    maxTokens: number;
  };
  validation: {
    batchSize: number;
    parallelJobs: number;
    timeoutMs: number;
    retryAttempts: number;
  };
  monitoring: {
    checkIntervalMs: number;
    alertThresholds: {
      qualityScore: number;
      errorRate: number;
      stalenessHours: number;
    };
  };
  supabase: {
    url: string;
    serviceKey: string;
  };
}

// Validation context for AI analysis
export interface ValidationContext {
  dataType: string;
  sourceType: string;
  expectedFormat: string;
  businessRules: string[];
  historicalPatterns: Record<string, any>;
  relatedData: Record<string, any>;
}

// Quality assessment request
export interface QualityAssessmentRequest {
  dataId: string;
  sourceId: string;
  data: any;
  context: ValidationContext;
  validationTypes: string[];
  priority: "low" | "medium" | "high" | "critical";
  requestedBy: string;
}

// Quality assessment response
export interface QualityAssessmentResponse {
  dataId: string;
  overallScore: number;
  validationResults: DataValidationResult[];
  anomalies: QualityAnomaly[];
  recommendations: QualityRecommendation[];
  metadata: {
    processingTime: number;
    aiModel: string;
    validationMethods: string[];
    confidence: number;
  };
}

// Quality recommendation
export interface QualityRecommendation {
  type: "improvement" | "fix" | "investigation" | "monitoring";
  priority: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  suggestedActions: string[];
  estimatedImpact: number; // 0-1 scale
  implementationComplexity: "low" | "medium" | "high";
  metadata?: Record<string, any>;
}

// Conflict detection result
export interface ConflictDetectionResult {
  conflictId: string;
  dataIds: string[];
  conflictType: "value" | "format" | "source" | "temporal" | "logical";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  conflictingValues: Array<{
    dataId: string;
    sourceId: string;
    value: any;
    confidence: number;
    timestamp: Date;
  }>;
  suggestedResolution: "manual_review" | "auto_resolve" | "expert_review" | "community_vote";
  confidence: number;
  detectedAt: Date;
  metadata?: Record<string, any>;
}

// Expert review request
export interface ExpertReviewRequest {
  conflictId: string;
  reviewType: "conflict_resolution" | "quality_assessment" | "data_verification";
  priority: "low" | "medium" | "high" | "critical";
  description: string;
  context: {
    dataIds: string[];
    conflictDetails: ConflictDetectionResult;
    aiAnalysis: string;
    communityFeedback?: QualityFeedback[];
  };
  assignedTo?: string;
  deadline?: Date;
  metadata?: Record<string, any>;
}

// Expert review response
export interface ExpertReviewResponse {
  reviewId: string;
  conflictId: string;
  decision: "accept" | "reject" | "modify" | "escalate";
  resolution: {
    correctValue?: any;
    correctSourceId?: string;
    reasoning: string;
    confidence: number;
  };
  recommendations: QualityRecommendation[];
  reviewedBy: string;
  reviewedAt: Date;
  metadata?: Record<string, any>;
}

// Quality monitoring alert
export interface QualityAlert {
  id: string;
  type: "quality_degradation" | "anomaly_detected" | "source_failure" | "staleness_warning";
  severity: "info" | "warning" | "error" | "critical";
  title: string;
  description: string;
  affectedData: {
    dataIds: string[];
    sourceIds: string[];
    count: number;
  };
  metrics: {
    currentScore: number;
    previousScore: number;
    threshold: number;
    trend: "improving" | "stable" | "declining";
  };
  suggestedActions: string[];
  alertedAt: Date;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
  metadata?: Record<string, any>;
}

// Batch processing result
export interface BatchProcessingResult {
  batchId: string;
  totalItems: number;
  processedItems: number;
  successfulItems: number;
  failedItems: number;
  results: QualityAssessmentResponse[];
  errors: Array<{
    dataId: string;
    error: string;
    timestamp: Date;
  }>;
  processingTime: number;
  startedAt: Date;
  completedAt: Date;
  metadata?: Record<string, any>;
}

// Re-export schema types
export type {
  DataSourceQuality,
  DataValidationResult,
  QualityAnomaly,
  DataFreshness,
  QualityFeedback,
  BatchValidationRequest,
  QualityDashboardMetrics,
};