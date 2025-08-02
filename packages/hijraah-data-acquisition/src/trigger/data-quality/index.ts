/**
 * Data Quality Assurance System
 * 
 * Comprehensive data quality validation, monitoring, and conflict resolution
 */

// Export all data quality tasks
export {
  validateDataQualityTask,
  batchValidateDataQualityTask,
  monitorDataFreshnessTask,
} from "./data-quality-engine.js";

export {
  detectDataConflictsTask,
  orchestrateExpertReviewTask,
  processExpertReviewTask,
  qualityFeedbackLoopTask,
} from "./conflict-resolution.js";

// Export types
export type {
  DataQualityConfig,
  QualityAssessmentRequest,
  QualityAssessmentResponse,
  ValidationContext,
  QualityRecommendation,
  ConflictDetectionResult,
  ExpertReviewRequest,
  ExpertReviewResponse,
  QualityAlert,
  BatchProcessingResult,
  DataSourceQuality,
  DataValidationResult,
  QualityAnomaly,
  DataFreshness,
  QualityFeedback,
  BatchValidationRequest,
  QualityDashboardMetrics,
} from "./types.js";

// Task registry for easy access
export const dataQualityTasks = {
  // Core validation tasks (Task 9.1)
  validateDataQuality: validateDataQualityTask,
  batchValidateDataQuality: batchValidateDataQualityTask,
  monitorDataFreshness: monitorDataFreshnessTask,
  
  // Conflict resolution tasks (Task 9.2)
  detectDataConflicts: detectDataConflictsTask,
  orchestrateExpertReview: orchestrateExpertReviewTask,
  processExpertReview: processExpertReviewTask,
  qualityFeedbackLoop: qualityFeedbackLoopTask,
} as const;

// Task metadata
export const dataQualityTaskMetadata = {
  totalTasks: Object.keys(dataQualityTasks).length,
  categories: {
    validation: 3, // validateDataQuality, batchValidateDataQuality, monitorDataFreshness
    conflictResolution: 4, // detectDataConflicts, orchestrateExpertReview, processExpertReview, qualityFeedbackLoop
  },
  features: [
    "Firecrawl source verification",
    "AI-powered quality assessment",
    "Pgvector similarity analysis",
    "Automated anomaly detection",
    "Real-time freshness monitoring",
    "Multi-source conflict detection",
    "Expert review orchestration",
    "Quality improvement feedback loops",
    "Supabase real-time integration",
    "Comprehensive audit trails",
  ],
  integrations: [
    "Firecrawl API for source verification",
    "OpenAI GPT-4o for AI analysis",
    "Supabase for data storage and real-time",
    "Pgvector for similarity analysis",
    "Trigger.dev for task orchestration",
  ],
} as const;

console.log("📊 Data Quality Assurance System loaded");
console.log(`🔧 Total tasks: ${dataQualityTaskMetadata.totalTasks}`);
console.log(`✨ Features: ${dataQualityTaskMetadata.features.length} quality assurance features`);
console.log(`🔗 Integrations: ${dataQualityTaskMetadata.integrations.length} service integrations`);