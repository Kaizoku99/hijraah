import type {
  DataSource,
  CollectionResult,
  PolicyChange,
  Entity,
  Relationship,
  CommunityExperience,
  TaskContext,
  BatchConfig,
  ScrapingConfig,
  ApiConfig,
  QualityMetrics,
} from "../types/index.js";

/**
 * Core interface for data acquisition orchestration
 */
export interface DataAcquisitionOrchestrator {
  /**
   * Initialize the orchestrator with configuration
   */
  initialize(config: OrchestratorConfig): Promise<void>;

  /**
   * Register a new data source
   */
  registerDataSource(source: DataSource): Promise<void>;

  /**
   * Schedule data collection for a source
   */
  scheduleCollection(sourceId: string, schedule: string): Promise<string>;

  /**
   * Trigger immediate data collection
   */
  triggerCollection(sourceId: string): Promise<CollectionResult>;

  /**
   * Get collection status
   */
  getCollectionStatus(collectionId: string): Promise<CollectionStatus>;

  /**
   * List all registered data sources
   */
  listDataSources(): Promise<DataSource[]>;

  /**
   * Update data source configuration
   */
  updateDataSource(
    sourceId: string,
    updates: Partial<DataSource>,
  ): Promise<void>;

  /**
   * Deactivate a data source
   */
  deactivateDataSource(sourceId: string): Promise<void>;
}

/**
 * Interface for web scraping implementations
 */
export interface WebScraper {
  /**
   * Scrape a single URL
   */
  scrape(config: ScrapingConfig): Promise<ScrapingResult>;

  /**
   * Scrape multiple URLs in batch
   */
  batchScrape(
    configs: ScrapingConfig[],
    batchConfig?: BatchConfig,
  ): Promise<ScrapingResult[]>;

  /**
   * Monitor a URL for changes
   */
  monitorChanges(
    url: string,
    checkInterval: number,
  ): Promise<ChangeDetectionResult>;

  /**
   * Extract structured data from scraped content
   */
  extractStructuredData(
    content: string,
    schema: Record<string, any>,
  ): Promise<any>;

  /**
   * Validate scraping configuration
   */
  validateConfig(config: ScrapingConfig): Promise<ValidationResult>;
}

/**
 * Interface for API client implementations
 */
export interface APIClient {
  /**
   * Make a GET request
   */
  get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<ApiResponse<T>>;

  /**
   * Make a POST request
   */
  post<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>>;

  /**
   * Make a PUT request
   */
  put<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>>;

  /**
   * Make a DELETE request
   */
  delete<T = any>(endpoint: string): Promise<ApiResponse<T>>;

  /**
   * Make a batch of requests
   */
  batchRequest(requests: ApiRequest[]): Promise<ApiResponse[]>;

  /**
   * Get API health status
   */
  healthCheck(): Promise<HealthStatus>;

  /**
   * Get rate limit status
   */
  getRateLimitStatus(): Promise<RateLimitStatus>;
}

/**
 * Interface for policy change detection
 */
export interface PolicyChangeDetector {
  /**
   * Detect changes in policy documents
   */
  detectChanges(
    sourceId: string,
    currentContent: string,
    previousContent?: string,
  ): Promise<PolicyChange[]>;

  /**
   * Classify the impact level of changes
   */
  classifyImpact(changes: PolicyChange[]): Promise<PolicyChange[]>;

  /**
   * Generate notifications for policy changes
   */
  generateNotifications(changes: PolicyChange[]): Promise<NotificationResult[]>;

  /**
   * Track policy change history
   */
  trackChangeHistory(sourceId: string): Promise<PolicyChangeHistory>;
}

/**
 * Interface for knowledge graph construction
 */
export interface KnowledgeGraphBuilder {
  /**
   * Extract entities from content
   */
  extractEntities(content: string, context?: any): Promise<Entity[]>;

  /**
   * Map relationships between entities
   */
  mapRelationships(entities: Entity[]): Promise<Relationship[]>;

  /**
   * Build knowledge graph from entities and relationships
   */
  buildGraph(
    entities: Entity[],
    relationships: Relationship[],
  ): Promise<KnowledgeGraph>;

  /**
   * Query the knowledge graph
   */
  queryGraph(query: GraphQuery): Promise<GraphQueryResult>;

  /**
   * Update graph with new information
   */
  updateGraph(updates: GraphUpdate[]): Promise<void>;

  /**
   * Validate graph consistency
   */
  validateGraph(): Promise<ValidationResult>;
}

/**
 * Interface for community data validation
 */
export interface CommunityDataValidator {
  /**
   * Validate community experience submission
   */
  validateExperience(
    experience: CommunityExperience,
  ): Promise<ValidationResult>;

  /**
   * Detect outliers in community data
   */
  detectOutliers(
    experiences: CommunityExperience[],
  ): Promise<OutlierDetectionResult>;

  /**
   * Calculate reputation scores for contributors
   */
  calculateReputationScores(userId: string): Promise<ReputationScore>;

  /**
   * Orchestrate peer review process
   */
  orchestratePeerReview(submissionId: string): Promise<PeerReviewResult>;

  /**
   * Generate quality metrics for community data
   */
  generateQualityMetrics(
    dataSet: CommunityExperience[],
  ): Promise<QualityMetrics>;
}

/**
 * Interface for predictive analytics
 */
export interface PredictiveAnalytics {
  /**
   * Train machine learning models
   */
  trainModels(
    trainingData: any[],
    modelConfig: ModelConfig,
  ): Promise<TrainedModel>;

  /**
   * Generate predictions
   */
  generatePredictions(input: any, modelId: string): Promise<PredictionResult>;

  /**
   * Evaluate model performance
   */
  evaluateModel(modelId: string, testData: any[]): Promise<ModelEvaluation>;

  /**
   * Update model with new data
   */
  updateModel(modelId: string, newData: any[]): Promise<void>;

  /**
   * Get model metadata
   */
  getModelMetadata(modelId: string): Promise<ModelMetadata>;
}

// Supporting types and interfaces

export interface OrchestratorConfig {
  supabaseUrl: string;
  supabaseKey: string;
  firecrawlApiKey: string;
  openaiApiKey: string;
  defaultBatchConfig: BatchConfig;
  rateLimits: {
    global: number;
    perSource: number;
  };
  retryConfig: {
    maxAttempts: number;
    backoffFactor: number;
    maxDelay: number;
  };
}

export interface CollectionStatus {
  id: string;
  status: "pending" | "running" | "completed" | "failed";
  progress: number; // 0-100
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  metadata: Record<string, any>;
}

export interface ScrapingResult {
  success: boolean;
  data: any;
  metadata: {
    url: string;
    scrapedAt: Date;
    processingTime: number;
    contentLength: number;
    statusCode: number;
  };
  errors?: string[];
  warnings?: string[];
}

export interface ChangeDetectionResult {
  hasChanges: boolean;
  changes: Array<{
    type: "added" | "removed" | "modified";
    path: string;
    oldValue?: any;
    newValue?: any;
    confidence: number;
  }>;
  metadata: {
    checkedAt: Date;
    previousCheck?: Date;
    changeScore: number;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number; // 0-1
  metadata: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  status: number;
  headers: Record<string, string>;
  metadata: {
    requestId: string;
    timestamp: Date;
    processingTime: number;
  };
}

export interface ApiRequest {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  checks: Array<{
    name: string;
    status: "pass" | "fail";
    message?: string;
    responseTime?: number;
  }>;
  timestamp: Date;
}

export interface RateLimitStatus {
  remaining: number;
  limit: number;
  resetAt: Date;
  retryAfter?: number;
}

export interface NotificationResult {
  id: string;
  type: "email" | "webhook" | "push";
  recipient: string;
  status: "sent" | "failed" | "pending";
  sentAt?: Date;
  error?: string;
}

export interface PolicyChangeHistory {
  sourceId: string;
  changes: PolicyChange[];
  totalChanges: number;
  timeRange: {
    from: Date;
    to: Date;
  };
  statistics: {
    byImpactLevel: Record<string, number>;
    byChangeType: Record<string, number>;
    averageConfidence: number;
  };
}

export interface KnowledgeGraph {
  entities: Entity[];
  relationships: Relationship[];
  metadata: {
    version: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    relationshipCount: number;
  };
}

export interface GraphQuery {
  type: "entity" | "relationship" | "path" | "subgraph";
  parameters: Record<string, any>;
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
}

export interface GraphQueryResult {
  results: any[];
  totalCount: number;
  executionTime: number;
  metadata: Record<string, any>;
}

export interface GraphUpdate {
  type: "add" | "update" | "delete";
  target: "entity" | "relationship";
  data: any;
}

export interface OutlierDetectionResult {
  outliers: Array<{
    id: string;
    type: "statistical" | "contextual" | "collective";
    score: number;
    reasons: string[];
    data: any;
  }>;
  statistics: {
    totalItems: number;
    outliersFound: number;
    averageScore: number;
    threshold: number;
  };
}

export interface ReputationScore {
  userId: string;
  score: number; // 0-100
  level: "novice" | "contributor" | "expert" | "authority";
  factors: {
    accuracy: number;
    completeness: number;
    consistency: number;
    helpfulness: number;
  };
  history: Array<{
    date: Date;
    score: number;
    change: number;
    reason: string;
  }>;
}

export interface PeerReviewResult {
  submissionId: string;
  reviewers: string[];
  consensus: "approved" | "rejected" | "needs_revision";
  scores: {
    accuracy: number;
    completeness: number;
    usefulness: number;
    overall: number;
  };
  feedback: string[];
  completedAt: Date;
}

export interface ModelConfig {
  type: "classification" | "regression" | "clustering";
  algorithm: string;
  hyperparameters: Record<string, any>;
  features: string[];
  target?: string;
  validationSplit: number;
}

export interface TrainedModel {
  id: string;
  config: ModelConfig;
  performance: ModelEvaluation;
  createdAt: Date;
  version: string;
}

export interface PredictionResult {
  prediction: any;
  confidence: number;
  features: Record<string, any>;
  modelId: string;
  timestamp: Date;
}

export interface ModelEvaluation {
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  rmse?: number;
  mae?: number;
  r2Score?: number;
  confusionMatrix?: number[][];
  metadata: Record<string, any>;
}

export interface ModelMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  config: ModelConfig;
  performance: ModelEvaluation;
  createdAt: Date;
  updatedAt: Date;
  status: "training" | "ready" | "deprecated";
}

// Re-export the types from types/index.ts that are needed
export type { TaskContext, ApiConfig } from "../types/index.js";
