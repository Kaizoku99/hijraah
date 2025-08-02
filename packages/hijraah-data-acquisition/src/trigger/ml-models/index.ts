/**
 * ML Models Tasks Index
 * 
 * Exports all machine learning model tasks for Task 5.1 implementation.
 * Includes feature extraction, model training, and validation tasks.
 */

// Export task implementations
export { extractFeaturesTask } from "./feature-extraction.js";
export { trainMLModelsTask, retrainModelsTask } from "./model-training.js";
export { validateModelsTask } from "./model-validation.js";

// Export prediction engine tasks (Task 5.2)
export { 
  generatePredictionsTask,
  estimateTimelinesTask,
  calculateCostsTask,
  assessRisksTask,
} from "./prediction-engine.js";

// Export prediction optimization tasks (Task 5.2)
export {
  optimizePredictionCacheTask,
  warmPredictionCacheTask,
  managePredictionCacheTask,
} from "./prediction-optimization.js";

// Export types
export type {
  ModelType,
  ModelStatus,
  PredictionType,
  TrainingStatus,
  FeatureExtractionInput,
  ExtractedFeatures,
  TrainingConfig,
  TrainingJobInput,
  TrainingProgress,
  ValidationConfig,
  ValidationResult,
  PredictionInput,
  PredictionResult,
  DataCollectionConfig,
  CollectedData,
  ModelDeploymentConfig,
  MLError,
  TrainMLModelsPayload,
  ExtractFeaturesPayload,
  ValidateModelsPayload,
  RetrainModelsPayload,
} from "./types.js";

// Export schemas
export {
  ModelTypeSchema,
  ModelStatusSchema,
  PredictionTypeSchema,
  TrainingStatusSchema,
  FeatureExtractionInputSchema,
  ExtractedFeaturesSchema,
  TrainingConfigSchema,
  TrainingJobInputSchema,
  TrainingProgressSchema,
  ValidationConfigSchema,
  ValidationResultSchema,
  PredictionInputSchema,
  PredictionResultSchema,
  DataCollectionConfigSchema,
  CollectedDataSchema,
  ModelDeploymentConfigSchema,
  MLErrorSchema,
  TrainMLModelsPayloadSchema,
  ExtractFeaturesPayloadSchema,
  ValidateModelsPayloadSchema,
  RetrainModelsPayloadSchema,
  ML_CONSTANTS,
  SUPPORTED_ALGORITHMS,
  PERFORMANCE_METRICS,
} from "./types.js";

// Export database schemas
export {
  mlModels,
  trainingDatasets,
  trainingJobs,
  extractedFeatures,
  predictions,
  modelValidations,
  type MLModel,
  type NewMLModel,
  type TrainingDataset,
  type NewTrainingDataset,
  type TrainingJob,
  type NewTrainingJob,
  type ExtractedFeatures as ExtractedFeaturesDB,
  type NewExtractedFeatures,
  type Prediction,
  type NewPrediction,
  type ModelValidation,
  type NewModelValidation,
} from "../../schemas/ml-models.js";

// Task metadata
export const mlTasksMetadata = {
  implemented: {
    // Task 5.1 - ML Model Training Pipeline
    "extractFeatures": {
      id: "extract-features",
      description: "Extract features using Firecrawl's batchScrapeUrls() for data collection and pgvector embeddings",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    "trainMLModels": {
      id: "train-ml-models", 
      description: "Train ML models using Trigger.dev's long-running capabilities and AI SDK feature engineering",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    "retrainModels": {
      id: "retrain-models-scheduled",
      description: "Scheduled model retraining using Firecrawl's continuous data collection and AI SDK batch processing",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    "validateModels": {
      id: "validate-models",
      description: "Validate ML models using AI SDK confidence scoring and structured validation schemas",
      status: "implemented", 
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    
    // Task 5.2 - Prediction Engine
    "generatePredictions": {
      id: "generate-predictions",
      description: "Generate predictions using Firecrawl's real-time scraping capabilities and AI SDK's streamText for progressive insights",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    "estimateTimelines": {
      id: "estimate-timelines",
      description: "Estimate immigration timelines using AI SDK reasoning with historical data from Firecrawl and Trigger.dev processing",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    "calculateCosts": {
      id: "calculate-costs",
      description: "Calculate immigration costs using Firecrawl's structured data extraction and AI SDK generateObject() for cost analysis",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    "assessRisks": {
      id: "assess-risks",
      description: "Assess immigration risks using Trigger.dev's parallel processing and pgvector similarity analysis with OpenAI embeddings",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    
    // Task 5.2 - Prediction Optimization
    "optimizePredictionCache": {
      id: "optimize-prediction-cache",
      description: "Optimize prediction caching using Trigger.dev's built-in caching mechanisms and Redis integration",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    "warmPredictionCache": {
      id: "warm-prediction-cache",
      description: "Pre-warm prediction cache with commonly requested predictions for improved performance",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
    "managePredictionCache": {
      id: "manage-prediction-cache",
      description: "Manage prediction cache lifecycle including eviction and refresh policies",
      status: "implemented",
      requirements: ["7.1", "7.2", "7.3", "7.4"],
    },
  },
  totalTasks: 11,
  completedTasks: 11,
  phase: "Task 5.1 & 5.2 - ML Model Training Pipeline & Prediction Engine",
  nextPhase: "Task 9.1 - Data Quality Assurance",
} as const;

console.log("🤖 ML Models tasks loaded");
console.log(`📊 Task 5.1 implementation: ${mlTasksMetadata.completedTasks}/${mlTasksMetadata.totalTasks} tasks completed`);
console.log(`🎯 Next phase: ${mlTasksMetadata.nextPhase}`);