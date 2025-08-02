/**
 * Machine Learning Models Types
 * 
 * Type definitions for ML model training, validation, and prediction tasks
 * following the data acquisition strategy requirements.
 */

import { z } from "zod";

// ===== CORE ML TYPES =====

export const ModelTypeSchema = z.enum([
  "success_probability",
  "timeline_prediction", 
  "cost_estimation",
  "risk_assessment",
  "feature_extraction",
]);

export const ModelStatusSchema = z.enum([
  "training",
  "validating", 
  "active",
  "deprecated",
  "failed",
]);

export const PredictionTypeSchema = z.enum([
  "success",
  "timeline",
  "cost", 
  "risk",
]);

export const TrainingStatusSchema = z.enum([
  "pending",
  "in_progress",
  "completed",
  "failed",
  "cancelled",
]);

// ===== FEATURE EXTRACTION TYPES =====

export const FeatureExtractionInputSchema = z.object({
  sourceId: z.string().uuid(),
  sourceType: z.enum(["user_profile", "immigration_case", "document", "policy", "community_data"]),
  sourceData: z.record(z.any()),
  extractionMethod: z.enum(["firecrawl", "ai_sdk", "manual", "automated"]),
  options: z.object({
    includeEmbeddings: z.boolean().default(true),
    featureTypes: z.array(z.string()).optional(),
    confidenceThreshold: z.number().min(0).max(1).default(0.7),
  }).optional(),
});

export const ExtractedFeaturesSchema = z.object({
  id: z.string().uuid(),
  sourceId: z.string().uuid(),
  sourceType: z.string(),
  features: z.record(z.any()),
  featureVector: z.array(z.number()).optional(),
  extractionMethod: z.string(),
  extractorVersion: z.string().optional(),
  confidence: z.number().min(0).max(1),
  completeness: z.number().min(0).max(1),
  reliability: z.number().min(0).max(1),
  metadata: z.record(z.any()).default({}),
  extractedAt: z.date(),
});

// ===== TRAINING TYPES =====

export const TrainingConfigSchema = z.object({
  algorithm: z.enum(["random_forest", "neural_network", "gradient_boosting", "svm", "logistic_regression"]),
  hyperparameters: z.record(z.any()).default({}),
  features: z.array(z.string()),
  targetVariable: z.string(),
  validationStrategy: z.enum(["holdout", "cross_validation", "temporal_split"]).default("holdout"),
  trainingSplit: z.number().min(0).max(1).default(0.7),
  validationSplit: z.number().min(0).max(1).default(0.15),
  testSplit: z.number().min(0).max(1).default(0.15),
  earlyStoppingPatience: z.number().default(10),
  maxEpochs: z.number().default(100),
  batchSize: z.number().default(32),
});

export const TrainingJobInputSchema = z.object({
  modelName: z.string().min(1).max(100),
  modelType: ModelTypeSchema,
  description: z.string().optional(),
  datasetId: z.string().uuid(),
  config: TrainingConfigSchema,
  parentModelId: z.string().uuid().optional(),
  metadata: z.record(z.any()).default({}),
});

export const TrainingProgressSchema = z.object({
  jobId: z.string().uuid(),
  status: TrainingStatusSchema,
  progress: z.number().min(0).max(100),
  currentEpoch: z.number(),
  totalEpochs: z.number(),
  trainingLoss: z.array(z.number()),
  validationLoss: z.array(z.number()),
  metrics: z.record(z.number()),
  estimatedTimeRemaining: z.number().optional(), // seconds
});

// ===== VALIDATION TYPES =====

export const ValidationConfigSchema = z.object({
  validationType: z.enum(["cross_validation", "holdout", "temporal", "bootstrap"]),
  folds: z.number().default(5), // for cross-validation
  testSize: z.number().min(0).max(1).default(0.2), // for holdout
  metrics: z.array(z.enum(["accuracy", "precision", "recall", "f1", "mse", "mae", "r2"])),
  confidenceLevel: z.number().min(0).max(1).default(0.95),
  performanceThresholds: z.object({
    minAccuracy: z.number().min(0).max(1).default(0.8),
    minPrecision: z.number().min(0).max(1).default(0.7),
    minRecall: z.number().min(0).max(1).default(0.7),
    maxMse: z.number().optional(),
    maxMae: z.number().optional(),
  }).optional(),
});

export const ValidationResultSchema = z.object({
  modelId: z.string().uuid(),
  validationType: z.string(),
  overallScore: z.number().min(0).max(1),
  metrics: z.record(z.number()),
  performanceBySegment: z.record(z.record(z.number())).optional(),
  passed: z.boolean(),
  issues: z.array(z.string()),
  recommendations: z.array(z.string()),
  confusionMatrix: z.array(z.array(z.number())).optional(),
  featureImportance: z.record(z.number()).optional(),
});

// ===== PREDICTION TYPES =====

export const PredictionInputSchema = z.object({
  userId: z.string().uuid(),
  caseId: z.string().uuid().optional(),
  modelType: PredictionTypeSchema,
  inputFeatures: z.record(z.any()),
  options: z.object({
    includeExplanation: z.boolean().default(true),
    includeConfidenceInterval: z.boolean().default(true),
    includeFactorAnalysis: z.boolean().default(true),
    cacheResults: z.boolean().default(true),
  }).optional(),
});

export const PredictionResultSchema = z.object({
  id: z.string().uuid(),
  modelId: z.string().uuid(),
  type: PredictionTypeSchema,
  value: z.number(),
  confidence: z.number().min(0).max(1),
  confidenceInterval: z.object({
    lower: z.number(),
    upper: z.number(),
  }).optional(),
  factors: z.array(z.object({
    name: z.string(),
    importance: z.number(),
    value: z.any(),
    impact: z.enum(["positive", "negative", "neutral"]),
  })),
  explanation: z.string().optional(),
  featureImportance: z.record(z.number()).optional(),
  metadata: z.record(z.any()).default({}),
  predictedAt: z.date(),
});

// ===== DATA COLLECTION TYPES =====

export const DataCollectionConfigSchema = z.object({
  sources: z.array(z.object({
    type: z.enum(["firecrawl", "supabase", "api", "file"]),
    config: z.record(z.any()),
    weight: z.number().min(0).max(1).default(1),
  })),
  filters: z.object({
    dateRange: z.object({
      start: z.date(),
      end: z.date(),
    }).optional(),
    countries: z.array(z.string()).optional(),
    visaTypes: z.array(z.string()).optional(),
    minQualityScore: z.number().min(0).max(1).default(0.7),
  }).optional(),
  sampling: z.object({
    strategy: z.enum(["random", "stratified", "temporal"]).default("random"),
    sampleSize: z.number().optional(),
    balanceClasses: z.boolean().default(true),
  }).optional(),
});

export const CollectedDataSchema = z.object({
  id: z.string().uuid(),
  source: z.string(),
  sourceType: z.string(),
  data: z.record(z.any()),
  qualityScore: z.number().min(0).max(1),
  metadata: z.record(z.any()).default({}),
  collectedAt: z.date(),
});

// ===== MODEL DEPLOYMENT TYPES =====

export const ModelDeploymentConfigSchema = z.object({
  modelId: z.string().uuid(),
  environment: z.enum(["development", "staging", "production"]),
  scalingConfig: z.object({
    minInstances: z.number().default(1),
    maxInstances: z.number().default(10),
    targetConcurrency: z.number().default(100),
  }).optional(),
  monitoringConfig: z.object({
    enableMetrics: z.boolean().default(true),
    enableLogging: z.boolean().default(true),
    alertThresholds: z.record(z.number()).optional(),
  }).optional(),
});

// ===== ERROR TYPES =====

export const MLErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.any()).optional(),
  retryable: z.boolean().default(false),
  timestamp: z.date(),
});

// ===== TASK PAYLOAD TYPES =====

export const TrainMLModelsPayloadSchema = z.object({
  trainingJobId: z.string().uuid(),
  config: TrainingJobInputSchema,
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export const ExtractFeaturesPayloadSchema = z.object({
  sources: z.array(FeatureExtractionInputSchema),
  batchSize: z.number().default(100),
  parallel: z.boolean().default(true),
});

export const ValidateModelsPayloadSchema = z.object({
  modelId: z.string().uuid(),
  config: ValidationConfigSchema,
  testDatasetId: z.string().uuid().optional(),
});

export const RetrainModelsPayloadSchema = z.object({
  modelId: z.string().uuid(),
  reason: z.enum(["scheduled", "performance_degradation", "new_data", "manual"]),
  config: TrainingConfigSchema.partial().optional(),
});

// ===== EXPORT TYPES =====

export type ModelType = z.infer<typeof ModelTypeSchema>;
export type ModelStatus = z.infer<typeof ModelStatusSchema>;
export type PredictionType = z.infer<typeof PredictionTypeSchema>;
export type TrainingStatus = z.infer<typeof TrainingStatusSchema>;

export type FeatureExtractionInput = z.infer<typeof FeatureExtractionInputSchema>;
export type ExtractedFeatures = z.infer<typeof ExtractedFeaturesSchema>;

export type TrainingConfig = z.infer<typeof TrainingConfigSchema>;
export type TrainingJobInput = z.infer<typeof TrainingJobInputSchema>;
export type TrainingProgress = z.infer<typeof TrainingProgressSchema>;

export type ValidationConfig = z.infer<typeof ValidationConfigSchema>;
export type ValidationResult = z.infer<typeof ValidationResultSchema>;

export type PredictionInput = z.infer<typeof PredictionInputSchema>;
export type PredictionResult = z.infer<typeof PredictionResultSchema>;

export type DataCollectionConfig = z.infer<typeof DataCollectionConfigSchema>;
export type CollectedData = z.infer<typeof CollectedDataSchema>;

export type ModelDeploymentConfig = z.infer<typeof ModelDeploymentConfigSchema>;
export type MLError = z.infer<typeof MLErrorSchema>;

export type TrainMLModelsPayload = z.infer<typeof TrainMLModelsPayloadSchema>;
export type ExtractFeaturesPayload = z.infer<typeof ExtractFeaturesPayloadSchema>;
export type ValidateModelsPayload = z.infer<typeof ValidateModelsPayloadSchema>;
export type RetrainModelsPayload = z.infer<typeof RetrainModelsPayloadSchema>;

// ===== CONSTANTS =====

export const ML_CONSTANTS = {
  DEFAULT_CONFIDENCE_THRESHOLD: 0.7,
  MIN_TRAINING_SAMPLES: 100,
  MAX_FEATURES: 1000,
  DEFAULT_VALIDATION_SPLIT: 0.15,
  DEFAULT_TEST_SPLIT: 0.15,
  MAX_TRAINING_TIME: 3600, // 1 hour in seconds
  FEATURE_VECTOR_DIMENSIONS: 512,
  PREDICTION_CACHE_TTL: 3600, // 1 hour in seconds
} as const;

export const SUPPORTED_ALGORITHMS = [
  "random_forest",
  "neural_network", 
  "gradient_boosting",
  "svm",
  "logistic_regression",
] as const;

export const PERFORMANCE_METRICS = [
  "accuracy",
  "precision", 
  "recall",
  "f1",
  "mse",
  "mae",
  "r2",
] as const;