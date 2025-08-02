/**
 * Machine Learning Models and Predictions Schema
 * 
 * Database schema definitions for ML models, training data, and predictions
 * following Drizzle ORM patterns and Context7 best practices.
 */

import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  boolean,
  integer,
  varchar,
  index,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { vector } from "pgvector/drizzle-orm";

// ===== ENUMS =====
export const modelTypeEnum = pgEnum("model_type", [
  "success_probability",
  "timeline_prediction", 
  "cost_estimation",
  "risk_assessment",
  "feature_extraction",
]);

export const modelStatusEnum = pgEnum("model_status", [
  "training",
  "validating", 
  "active",
  "deprecated",
  "failed",
]);

export const predictionTypeEnum = pgEnum("prediction_type", [
  "success",
  "timeline",
  "cost", 
  "risk",
]);

export const trainingStatusEnum = pgEnum("training_status", [
  "pending",
  "in_progress",
  "completed",
  "failed",
  "cancelled",
]);

// ===== ML MODELS =====
export const mlModels = pgTable(
  "ml_models",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    type: modelTypeEnum("type").notNull(),
    version: varchar("version", { length: 20 }).notNull(),
    description: text("description"),
    status: modelStatusEnum("status").default("training").notNull(),
    
    // Model configuration
    algorithm: varchar("algorithm", { length: 50 }).notNull(), // random_forest, neural_network, etc.
    hyperparameters: jsonb("hyperparameters").default({}),
    features: jsonb("features").notNull().default([]), // Array of feature names
    
    // Performance metrics
    accuracy: numeric("accuracy", { precision: 5, scale: 4 }), // 0-1
    precision: numeric("precision", { precision: 5, scale: 4 }), // 0-1
    recall: numeric("recall", { precision: 5, scale: 4 }), // 0-1
    f1Score: numeric("f1_score", { precision: 5, scale: 4 }), // 0-1
    mse: numeric("mse", { precision: 10, scale: 6 }), // Mean squared error
    mae: numeric("mae", { precision: 10, scale: 6 }), // Mean absolute error
    
    // Training metadata
    trainingDataSize: integer("training_data_size"),
    validationDataSize: integer("validation_data_size"),
    testDataSize: integer("test_data_size"),
    trainingDuration: integer("training_duration"), // seconds
    
    // Model artifacts
    modelPath: text("model_path"), // Path to serialized model
    featureImportance: jsonb("feature_importance").default({}),
    confusionMatrix: jsonb("confusion_matrix").default({}),
    
    // Versioning and deployment
    parentModelId: uuid("parent_model_id"), // For model lineage
    isActive: boolean("is_active").default(false),
    deployedAt: timestamp("deployed_at"),
    
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    nameIndex: index("ml_models_name_idx").on(table.name),
    typeIndex: index("ml_models_type_idx").on(table.type),
    statusIndex: index("ml_models_status_idx").on(table.status),
    versionIndex: index("ml_models_version_idx").on(table.version),
    isActiveIndex: index("ml_models_is_active_idx").on(table.isActive),
    parentModelIdIndex: index("ml_models_parent_model_id_idx").on(table.parentModelId),
  }),
);

// ===== TRAINING DATASETS =====
export const trainingDatasets = pgTable(
  "training_datasets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    modelType: modelTypeEnum("model_type").notNull(),
    
    // Dataset composition
    totalSamples: integer("total_samples").notNull(),
    positiveExamples: integer("positive_examples"),
    negativeExamples: integer("negative_examples"),
    
    // Data sources
    dataSources: jsonb("data_sources").notNull().default([]), // Array of source identifiers
    collectionPeriod: jsonb("collection_period").notNull(), // {start: date, end: date}
    
    // Quality metrics
    qualityScore: numeric("quality_score", { precision: 3, scale: 2 }), // 0-1
    completenessScore: numeric("completeness_score", { precision: 3, scale: 2 }), // 0-1
    consistencyScore: numeric("consistency_score", { precision: 3, scale: 2 }), // 0-1
    
    // Dataset splits
    trainingSplit: numeric("training_split", { precision: 3, scale: 2 }).default("0.7"), // 0-1
    validationSplit: numeric("validation_split", { precision: 3, scale: 2 }).default("0.15"), // 0-1
    testSplit: numeric("test_split", { precision: 3, scale: 2 }).default("0.15"), // 0-1
    
    // Storage
    dataPath: text("data_path"), // Path to dataset files
    schema: jsonb("schema").notNull(), // Dataset schema definition
    
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    nameIndex: index("training_datasets_name_idx").on(table.name),
    modelTypeIndex: index("training_datasets_model_type_idx").on(table.modelType),
    qualityScoreIndex: index("training_datasets_quality_score_idx").on(table.qualityScore),
  }),
);

// ===== TRAINING JOBS =====
export const trainingJobs = pgTable(
  "training_jobs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    modelId: uuid("model_id")
      .notNull()
      .references(() => mlModels.id, { onDelete: "cascade" }),
    datasetId: uuid("dataset_id")
      .notNull()
      .references(() => trainingDatasets.id, { onDelete: "cascade" }),
    
    status: trainingStatusEnum("status").default("pending").notNull(),
    
    // Job configuration
    triggerJobId: text("trigger_job_id"), // Trigger.dev job ID
    config: jsonb("config").notNull().default({}),
    
    // Progress tracking
    progress: integer("progress").default(0), // 0-100
    currentEpoch: integer("current_epoch").default(0),
    totalEpochs: integer("total_epochs"),
    
    // Performance tracking
    trainingLoss: jsonb("training_loss").default([]), // Array of loss values
    validationLoss: jsonb("validation_loss").default([]), // Array of loss values
    metrics: jsonb("metrics").default({}), // Current metrics
    
    // Resource usage
    computeTime: integer("compute_time"), // seconds
    memoryUsage: integer("memory_usage"), // MB
    
    // Error handling
    errorMessage: text("error_message"),
    retryCount: integer("retry_count").default(0),
    
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    modelIdIndex: index("training_jobs_model_id_idx").on(table.modelId),
    datasetIdIndex: index("training_jobs_dataset_id_idx").on(table.datasetId),
    statusIndex: index("training_jobs_status_idx").on(table.status),
    triggerJobIdIndex: index("training_jobs_trigger_job_id_idx").on(table.triggerJobId),
  }),
);

// ===== FEATURE EXTRACTION =====
export const extractedFeatures = pgTable(
  "extracted_features",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id").notNull(), // Reference to source data (user profile, case, etc.)
    sourceType: varchar("source_type", { length: 50 }).notNull(), // user_profile, immigration_case, document, etc.
    
    // Feature vectors
    features: jsonb("features").notNull(), // Feature name-value pairs
    featureVector: vector("feature_vector", { dimensions: 512 }), // Embedding representation
    
    // Extraction metadata
    extractionMethod: varchar("extraction_method", { length: 50 }).notNull(), // firecrawl, ai_sdk, manual
    extractorVersion: varchar("extractor_version", { length: 20 }),
    confidence: numeric("confidence", { precision: 3, scale: 2 }), // 0-1
    
    // Quality metrics
    completeness: numeric("completeness", { precision: 3, scale: 2 }), // 0-1
    reliability: numeric("reliability", { precision: 3, scale: 2 }), // 0-1
    
    metadata: jsonb("metadata").default({}),
    extractedAt: timestamp("extracted_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    sourceIdIndex: index("extracted_features_source_id_idx").on(table.sourceId),
    sourceTypeIndex: index("extracted_features_source_type_idx").on(table.sourceType),
    extractionMethodIndex: index("extracted_features_extraction_method_idx").on(table.extractionMethod),
    confidenceIndex: index("extracted_features_confidence_idx").on(table.confidence),
  }),
);

// ===== PREDICTIONS =====
export const predictions = pgTable(
  "predictions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    modelId: uuid("model_id")
      .notNull()
      .references(() => mlModels.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    caseId: uuid("case_id"), // Optional reference to specific immigration case
    
    type: predictionTypeEnum("type").notNull(),
    
    // Prediction results
    value: numeric("value", { precision: 10, scale: 4 }).notNull(), // Main prediction value
    confidence: numeric("confidence", { precision: 3, scale: 2 }).notNull(), // 0-1
    confidenceInterval: jsonb("confidence_interval"), // {lower: number, upper: number}
    
    // Supporting data
    factors: jsonb("factors").notNull().default([]), // Array of contributing factors
    featureImportance: jsonb("feature_importance").default({}),
    explanation: text("explanation"), // Human-readable explanation
    
    // Input data
    inputFeatures: jsonb("input_features").notNull(),
    inputHash: varchar("input_hash", { length: 64 }), // Hash of input for caching
    
    // Validation and feedback
    actualOutcome: numeric("actual_outcome", { precision: 10, scale: 4 }), // For model validation
    feedbackScore: integer("feedback_score"), // User feedback 1-5
    isValidated: boolean("is_validated").default(false),
    
    metadata: jsonb("metadata").default({}),
    predictedAt: timestamp("predicted_at").defaultNow().notNull(),
    validatedAt: timestamp("validated_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    modelIdIndex: index("predictions_model_id_idx").on(table.modelId),
    userIdIndex: index("predictions_user_id_idx").on(table.userId),
    caseIdIndex: index("predictions_case_id_idx").on(table.caseId),
    typeIndex: index("predictions_type_idx").on(table.type),
    inputHashIndex: index("predictions_input_hash_idx").on(table.inputHash),
    confidenceIndex: index("predictions_confidence_idx").on(table.confidence),
    predictedAtIndex: index("predictions_predicted_at_idx").on(table.predictedAt),
  }),
);

// ===== MODEL VALIDATION =====
export const modelValidations = pgTable(
  "model_validations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    modelId: uuid("model_id")
      .notNull()
      .references(() => mlModels.id, { onDelete: "cascade" }),
    validationType: varchar("validation_type", { length: 50 }).notNull(), // cross_validation, holdout, temporal
    
    // Validation results
    overallScore: numeric("overall_score", { precision: 5, scale: 4 }).notNull(), // 0-1
    metrics: jsonb("metrics").notNull(), // Detailed validation metrics
    
    // Test data
    testDatasetId: uuid("test_dataset_id").references(() => trainingDatasets.id),
    testSampleCount: integer("test_sample_count"),
    
    // Performance by segment
    performanceBySegment: jsonb("performance_by_segment").default({}),
    
    // Validation configuration
    validationConfig: jsonb("validation_config").notNull(),
    
    // Results
    passed: boolean("passed").notNull(),
    issues: jsonb("issues").default([]), // Array of validation issues
    recommendations: jsonb("recommendations").default([]),
    
    validatedAt: timestamp("validated_at").defaultNow().notNull(),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    modelIdIndex: index("model_validations_model_id_idx").on(table.modelId),
    validationTypeIndex: index("model_validations_validation_type_idx").on(table.validationType),
    overallScoreIndex: index("model_validations_overall_score_idx").on(table.overallScore),
    passedIndex: index("model_validations_passed_idx").on(table.passed),
  }),
);

// ===== PREDICTION CACHE =====
export const predictionCache = pgTable(
  "prediction_cache",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cacheKey: varchar("cache_key", { length: 255 }).notNull().unique(),
    predictionType: predictionTypeEnum("prediction_type").notNull(),
    
    // Cached prediction data
    predictionData: jsonb("prediction_data").notNull(),
    inputHash: varchar("input_hash", { length: 64 }).notNull(),
    
    // Cache metadata
    hitCount: integer("hit_count").default(0),
    lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
    ttl: integer("ttl").notNull(), // Time to live in seconds
    
    // Quality metrics
    confidence: numeric("confidence", { precision: 3, scale: 2 }).notNull(),
    freshness: numeric("freshness", { precision: 3, scale: 2 }).default("1.0"), // 0-1
    
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
  },
  (table) => ({
    cacheKeyIndex: index("prediction_cache_cache_key_idx").on(table.cacheKey),
    predictionTypeIndex: index("prediction_cache_prediction_type_idx").on(table.predictionType),
    inputHashIndex: index("prediction_cache_input_hash_idx").on(table.inputHash),
    expiresAtIndex: index("prediction_cache_expires_at_idx").on(table.expiresAt),
    lastAccessedIndex: index("prediction_cache_last_accessed_idx").on(table.lastAccessed),
  }),
);

// ===== RELATIONS =====
export const mlModelsRelations = relations(mlModels, ({ many, one }) => ({
  trainingJobs: many(trainingJobs),
  predictions: many(predictions),
  validations: many(modelValidations),
  parentModel: one(mlModels, {
    fields: [mlModels.parentModelId],
    references: [mlModels.id],
  }),
  childModels: many(mlModels),
}));

export const trainingDatasetsRelations = relations(trainingDatasets, ({ many }) => ({
  trainingJobs: many(trainingJobs),
  validations: many(modelValidations),
}));

export const trainingJobsRelations = relations(trainingJobs, ({ one }) => ({
  model: one(mlModels, {
    fields: [trainingJobs.modelId],
    references: [mlModels.id],
  }),
  dataset: one(trainingDatasets, {
    fields: [trainingJobs.datasetId],
    references: [trainingDatasets.id],
  }),
}));

export const predictionsRelations = relations(predictions, ({ one }) => ({
  model: one(mlModels, {
    fields: [predictions.modelId],
    references: [mlModels.id],
  }),
}));

export const modelValidationsRelations = relations(modelValidations, ({ one }) => ({
  model: one(mlModels, {
    fields: [modelValidations.modelId],
    references: [mlModels.id],
  }),
  testDataset: one(trainingDatasets, {
    fields: [modelValidations.testDatasetId],
    references: [trainingDatasets.id],
  }),
}));

// ===== ZOD SCHEMAS =====
export const insertMLModelSchema = createInsertSchema(mlModels);
export const selectMLModelSchema = createSelectSchema(mlModels);

export const insertTrainingDatasetSchema = createInsertSchema(trainingDatasets);
export const selectTrainingDatasetSchema = createSelectSchema(trainingDatasets);

export const insertTrainingJobSchema = createInsertSchema(trainingJobs);
export const selectTrainingJobSchema = createSelectSchema(trainingJobs);

export const insertExtractedFeaturesSchema = createInsertSchema(extractedFeatures);
export const selectExtractedFeaturesSchema = createSelectSchema(extractedFeatures);

export const insertPredictionSchema = createInsertSchema(predictions);
export const selectPredictionSchema = createSelectSchema(predictions);

export const insertModelValidationSchema = createInsertSchema(modelValidations);
export const selectModelValidationSchema = createSelectSchema(modelValidations);

export const insertPredictionCacheSchema = createInsertSchema(predictionCache);
export const selectPredictionCacheSchema = createSelectSchema(predictionCache);

// ===== TYPES =====
export type MLModel = typeof mlModels.$inferSelect;
export type NewMLModel = typeof mlModels.$inferInsert;

export type TrainingDataset = typeof trainingDatasets.$inferSelect;
export type NewTrainingDataset = typeof trainingDatasets.$inferInsert;

export type TrainingJob = typeof trainingJobs.$inferSelect;
export type NewTrainingJob = typeof trainingJobs.$inferInsert;

export type ExtractedFeatures = typeof extractedFeatures.$inferSelect;
export type NewExtractedFeatures = typeof extractedFeatures.$inferInsert;

export type Prediction = typeof predictions.$inferSelect;
export type NewPrediction = typeof predictions.$inferInsert;

export type ModelValidation = typeof modelValidations.$inferSelect;
export type NewModelValidation = typeof modelValidations.$inferInsert;

export type PredictionCache = typeof predictionCache.$inferSelect;
export type NewPredictionCache = typeof predictionCache.$inferInsert;