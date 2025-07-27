import { z } from "zod";

// ===== BASE RAG TYPES =====
export interface RAGProcessedDocumentChunk {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    sourceUrl: string;
    documentId: string;
    chunkIndex: number;
    tokenCount?: number;
    chunkSize?: number;
    processingTime?: number;
  };
}

export interface RAGProcessedDocument {
  documentId: string;
  sourceUrl: string;
  chunks: RAGProcessedDocumentChunk[];
  rawText: string;
  metadata: {
    title?: string;
    author?: string;
    language?: string;
    processingTime: number;
    embeddingModel: string;
    chunksGenerated: number;
  };
}

// ===== KNOWLEDGE GRAPH TYPES =====
export interface KGEntity {
  id: string;
  name: string;
  type: string;
  properties?: Record<string, any>;
  confidence?: number;
  documentIds?: string[];
}

export interface KGRelationship {
  id: string;
  sourceEntityId: string;
  targetEntityId: string;
  sourceEntityName: string;
  targetEntityName: string;
  type: string;
  properties?: Record<string, any>;
  strength?: number;
  confidence?: number;
}

export interface KGContext {
  entities: KGEntity[];
  relationships: KGRelationship[];
  pathLength?: number;
  queryRelevance?: number;
}

// ===== RETRIEVAL TYPES =====
export interface RetrievalQuery {
  text: string;
  userId?: string;
  contextId?: string;
  filters?: Record<string, any>;
  limit?: number;
  threshold?: number;
  includeImages?: boolean;
  includeKnowledgeGraph?: boolean;
  includePersonalization?: boolean;
}

export interface RetrievalResult {
  chunks: RAGProcessedDocumentChunk[];
  kgContext: KGContext;
  images?: RetrievedImage[];
  userContext?: UserContext | null;
  totalResults: number;
  processingTime: number;
  confidence: number;
}

export interface RetrievedImage {
  id: string;
  url: string;
  metadata: Record<string, any>;
  score: number;
  relevantChunks?: string[];
}

// ===== USER PERSONALIZATION TYPES =====
export interface UserContext {
  userId: string;
  preferences: {
    language?: string;
    complexity?: "basic" | "intermediate" | "advanced";
    domains?: string[];
    contentTypes?: string[];
  };
  history: {
    queries: string[];
    interactions: UserInteraction[];
    feedback: UserFeedback[];
  };
  profile: {
    expertise?: string[];
    interests?: string[];
    goals?: string[];
  };
}

export interface UserInteraction {
  timestamp: Date;
  type: "query" | "click" | "save" | "share";
  content: string;
  metadata?: Record<string, any>;
}

export interface UserFeedback {
  timestamp: Date;
  type: "thumbs_up" | "thumbs_down" | "rating";
  value: number | boolean;
  comment?: string;
  resultId: string;
}

// ===== GENERATION TYPES =====
export interface GenerationContext {
  query: string;
  retrievalResult: RetrievalResult;
  userContext?: UserContext;
  conversationHistory?: ConversationMessage[];
  generationOptions?: GenerationOptions;
}

export interface GenerationOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
  includeSourceCitations?: boolean;
  format?: "text" | "markdown" | "html";
  tone?: "professional" | "casual" | "academic";
}

export interface GeneratedResponse {
  text: string;
  sources: RAGProcessedDocumentChunk[];
  confidence: number;
  metadata: {
    model: string;
    tokensUsed: number;
    processingTime: number;
    sourcesUsed: number;
    citationsIncluded: boolean;
  };
}

export interface ConversationMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// ===== INGESTION TYPES =====
export interface IngestionJob {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  sourceUrl?: string;
  sourceType: "url" | "file" | "text";
  options: IngestionOptions;
  result?: IngestionResult;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IngestionOptions {
  chunkSize?: number;
  chunkOverlap?: number;
  embeddingModel?: string;
  extractEntities?: boolean;
  extractRelationships?: boolean;
  enablePersonalization?: boolean;
  language?: string;
}

export interface IngestionResult {
  documentsProcessed: number;
  chunksGenerated: number;
  embeddingsCreated: number;
  entitiesExtracted: number;
  relationshipsCreated: number;
  processingTime: number;
  storageSize: number;
}

// ===== SOURCE EVALUATION TYPES =====
export interface SourceEvaluation {
  sourceUrl: string;
  credibility: number;
  relevance: number;
  recency: number;
  authority: number;
  bias?: number;
  factualAccuracy?: number;
  metadata: {
    domain: string;
    author?: string;
    publicationDate?: Date;
    lastUpdated?: Date;
    citations?: number;
  };
}

export interface EvaluationCriteria {
  domainWhitelist?: string[];
  domainBlacklist?: string[];
  minCredibilityScore?: number;
  maxAge?: number; // days
  requireAuthor?: boolean;
  requireCitations?: boolean;
}

// ===== ZOD VALIDATION SCHEMAS =====
export const RetrievalQuerySchema = z.object({
  text: z.string().min(1),
  userId: z.string().optional(),
  contextId: z.string().optional(),
  filters: z.record(z.any()).optional(),
  limit: z.number().min(1).max(100).default(10),
  threshold: z.number().min(0).max(1).default(0.7),
  includeImages: z.boolean().default(false),
  includeKnowledgeGraph: z.boolean().default(true),
  includePersonalization: z.boolean().default(true),
});

export const IngestionOptionsSchema = z.object({
  chunkSize: z.number().min(100).max(8000).default(1000),
  chunkOverlap: z.number().min(0).max(500).default(200),
  embeddingModel: z.string().default("text-embedding-3-small"),
  extractEntities: z.boolean().default(true),
  extractRelationships: z.boolean().default(true),
  enablePersonalization: z.boolean().default(true),
  language: z.string().default("en"),
});

export const GenerationOptionsSchema = z.object({
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().min(1).max(8192).default(2048),
  model: z.string().default("gpt-4o-mini"),
  includeSourceCitations: z.boolean().default(true),
  format: z.enum(["text", "markdown", "html"]).default("markdown"),
  tone: z.enum(["professional", "casual", "academic"]).default("professional"),
});

// ===== ERROR TYPES =====
export class RAGError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any,
  ) {
    super(message);
    this.name = "RAGError";
  }
}

export class RetrievalError extends RAGError {
  constructor(message: string, details?: any) {
    super(message, "RETRIEVAL_ERROR", details);
    this.name = "RetrievalError";
  }
}

export class IngestionError extends RAGError {
  constructor(message: string, details?: any) {
    super(message, "INGESTION_ERROR", details);
    this.name = "IngestionError";
  }
}

export class GenerationError extends RAGError {
  constructor(message: string, details?: any) {
    super(message, "GENERATION_ERROR", details);
    this.name = "GenerationError";
  }
}

// ===== UTILITY TYPES =====
export type RAGPipelineStep =
  | "ingestion"
  | "chunking"
  | "embedding"
  | "indexing"
  | "retrieval"
  | "generation";

export interface RAGPipelineMetrics {
  step: RAGPipelineStep;
  duration: number;
  itemsProcessed: number;
  memoryUsage?: number;
  error?: string;
}

export interface RAGConfig {
  retrieval: {
    defaultLimit: number;
    defaultThreshold: number;
    maxConcurrentQueries: number;
    cacheEnabled: boolean;
    cacheTTL: number;
  };
  ingestion: {
    defaultChunkSize: number;
    defaultChunkOverlap: number;
    maxConcurrentJobs: number;
    retryAttempts: number;
    timeoutMs: number;
  };
  generation: {
    defaultModel: string;
    defaultTemperature: number;
    maxTokens: number;
    enableCaching: boolean;
  };
  personalization: {
    enabled: boolean;
    learningRate: number;
    historyLength: number;
  };
}

// Type guards
export function isRAGProcessedDocument(obj: any): obj is RAGProcessedDocument {
  return (
    obj &&
    typeof obj.documentId === "string" &&
    typeof obj.sourceUrl === "string" &&
    Array.isArray(obj.chunks) &&
    typeof obj.rawText === "string"
  );
}

export function isRetrievalResult(obj: any): obj is RetrievalResult {
  return (
    obj &&
    Array.isArray(obj.chunks) &&
    obj.kgContext &&
    typeof obj.totalResults === "number" &&
    typeof obj.processingTime === "number" &&
    typeof obj.confidence === "number"
  );
}
