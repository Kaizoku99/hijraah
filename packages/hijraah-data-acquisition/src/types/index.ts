import { z } from "zod";

// Core data source configuration
export const DataSourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["government", "api", "community", "document"]),
  url: z.string().url().optional(),
  apiEndpoint: z.string().url().optional(),
  credibilityScore: z.number().min(0).max(1),
  updateFrequency: z.string(), // cron expression
  lastUpdated: z.date().optional(),
  metadata: z.record(z.any()).optional(),
  isActive: z.boolean().default(true),
  rateLimits: z
    .object({
      requestsPerMinute: z.number().default(60),
      requestsPerHour: z.number().default(1000),
      requestsPerDay: z.number().default(10000),
    })
    .optional(),
});

export type DataSource = z.infer<typeof DataSourceSchema>;

// Collection result from data acquisition
export const CollectionResultSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  status: z.enum(["success", "partial", "failed"]),
  collectedAt: z.date(),
  data: z.any(),
  metadata: z.object({
    itemsCollected: z.number(),
    processingTimeMs: z.number(),
    errors: z.array(z.string()).optional(),
    warnings: z.array(z.string()).optional(),
  }),
  nextCollectionAt: z.date().optional(),
});

export type CollectionResult = z.infer<typeof CollectionResultSchema>;

// Policy change detection
export const PolicyChangeSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  country: z.string(),
  changeType: z.enum([
    "new",
    "amendment",
    "clarification",
    "temporary",
    "permanent",
  ]),
  impactLevel: z.enum([
    "critical",
    "major",
    "moderate",
    "minor",
    "informational",
  ]),
  title: z.string(),
  description: z.string(),
  effectiveDate: z.date().optional(),
  detectedAt: z.date(),
  affectedCategories: z.array(z.string()),
  sourceUrl: z.string().url(),
  confidence: z.number().min(0).max(1),
  reviewStatus: z
    .enum(["pending", "reviewed", "verified", "disputed"])
    .default("pending"),
});

export type PolicyChange = z.infer<typeof PolicyChangeSchema>;

// Entity extraction for knowledge graph
export const EntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum([
    "country",
    "visa_type",
    "requirement",
    "document",
    "process",
    "fee",
    "timeline",
  ]),
  properties: z.record(z.any()),
  confidence: z.number().min(0).max(1),
  sources: z.array(z.string()),
  embedding: z.array(z.number()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Entity = z.infer<typeof EntitySchema>;

// Relationship between entities
export const RelationshipSchema = z.object({
  id: z.string(),
  sourceEntityId: z.string(),
  targetEntityId: z.string(),
  type: z.enum([
    "requires",
    "includes",
    "excludes",
    "replaces",
    "depends_on",
    "part_of",
  ]),
  strength: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1),
  temporalValidity: z.object({
    validFrom: z.date(),
    validTo: z.date().optional(),
  }),
  properties: z.record(z.any()).optional(),
  createdAt: z.date(),
});

export type Relationship = z.infer<typeof RelationshipSchema>;

// Community experience data
export const CommunityExperienceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  pathway: z.string(),
  targetCountry: z.string(),
  milestone: z.string(),
  actualTimeline: z.number(), // days
  actualCost: z.number(),
  difficulty: z.number().min(1).max(10),
  success: z.boolean(),
  feedback: z.string(),
  verificationStatus: z
    .enum(["pending", "verified", "disputed"])
    .default("pending"),
  qualityScore: z.number().min(0).max(1).optional(),
  submittedAt: z.date(),
  verifiedAt: z.date().optional(),
});

export type CommunityExperience = z.infer<typeof CommunityExperienceSchema>;

// Task execution context
export const TaskContextSchema = z.object({
  taskId: z.string(),
  runId: z.string(),
  attempt: z.number(),
  timestamp: z.date(),
  environment: z.enum(["development", "staging", "production"]),
  userId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export type TaskContext = z.infer<typeof TaskContextSchema>;

// Batch processing configuration
export const BatchConfigSchema = z.object({
  batchSize: z.number().min(1).max(1000).default(100),
  concurrency: z.number().min(1).max(50).default(5),
  retryAttempts: z.number().min(0).max(10).default(3),
  retryDelay: z.number().min(100).max(60000).default(1000), // ms
  timeout: z.number().min(1000).max(300000).default(30000), // ms
});

export type BatchConfig = z.infer<typeof BatchConfigSchema>;

// Scraping configuration
export const ScrapingConfigSchema = z.object({
  url: z.string().url(),
  selectors: z.record(z.string()).optional(),
  extractSchema: z.record(z.any()).optional(),
  waitFor: z.number().optional(),
  timeout: z.number().default(30000),
  userAgent: z.string().optional(),
  headers: z.record(z.string()).optional(),
  javascript: z.boolean().default(true),
  followRedirects: z.boolean().default(true),
  maxRedirects: z.number().default(5),
});

export type ScrapingConfig = z.infer<typeof ScrapingConfigSchema>;

// API client configuration
export const ApiConfigSchema = z.object({
  baseUrl: z.string().url(),
  apiKey: z.string().optional(),
  headers: z.record(z.string()).optional(),
  timeout: z.number().default(30000),
  retryAttempts: z.number().min(0).max(10).default(3),
  retryDelay: z.number().min(100).max(60000).default(1000),
  rateLimits: z
    .object({
      requestsPerSecond: z.number().default(10),
      requestsPerMinute: z.number().default(600),
      requestsPerHour: z.number().default(10000),
    })
    .optional(),
});

export type ApiConfig = z.infer<typeof ApiConfigSchema>;

// Quality metrics
export const QualityMetricsSchema = z.object({
  accuracy: z.number().min(0).max(1),
  completeness: z.number().min(0).max(1),
  consistency: z.number().min(0).max(1),
  timeliness: z.number().min(0).max(1),
  reliability: z.number().min(0).max(1),
  overall: z.number().min(0).max(1),
  lastCalculated: z.date(),
});

export type QualityMetrics = z.infer<typeof QualityMetricsSchema>;

// Export all schemas for validation
export const Schemas = {
  DataSource: DataSourceSchema,
  CollectionResult: CollectionResultSchema,
  PolicyChange: PolicyChangeSchema,
  Entity: EntitySchema,
  Relationship: RelationshipSchema,
  CommunityExperience: CommunityExperienceSchema,
  TaskContext: TaskContextSchema,
  BatchConfig: BatchConfigSchema,
  ScrapingConfig: ScrapingConfigSchema,
  ApiConfig: ApiConfigSchema,
  QualityMetrics: QualityMetricsSchema,
} as const;
