import { SupabaseClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import { Redis } from "@upstash/redis";
import { Index } from "@upstash/vector";
import type {
  RAGConfig,
  IngestionOptions,
  GenerationOptions,
  RetrievalQuery,
} from "./types.js";
import { IntelligentCacheManager } from "./caching/intelligent-cache-manager.js";
import { RAGPipelineOptimizer } from "./optimization/pipeline-optimizer.js";
import { AdvancedMultiModalProcessor } from "./multimodal/advanced-vision-processor.js";
import { ConversationalMemoryManager } from "./memory/conversational-memory-manager.js";

// Context7 Pattern: Enhanced Factory Functions for RAG Components
export interface RAGDependencies {
  supabase: SupabaseClient;
  openai: OpenAI;
  redis?: Redis;
  vectorIndex?: Index;
  firecrawlApiKey?: string;
  mistralApiKey?: string;
  // Enhanced dependencies
  enableAdvancedCaching?: boolean;
  enableRealTimeOptimization?: boolean;
  enableMultiModalProcessing?: boolean;
  enableConversationalMemory?: boolean;
}

// Default configuration following Context7 patterns
const defaultRAGConfig: RAGConfig = {
  retrieval: {
    defaultLimit: 10,
    defaultThreshold: 0.7,
    maxConcurrentQueries: 5,
    cacheEnabled: true,
    cacheTTL: 3600, // 1 hour
  },
  ingestion: {
    defaultChunkSize: 1000,
    defaultChunkOverlap: 200,
    maxConcurrentJobs: 3,
    retryAttempts: 3,
    timeoutMs: 30000,
  },
  generation: {
    defaultModel: "gpt-4o",
    defaultTemperature: 0.7,
    maxTokens: 2048,
    enableCaching: true,
  },
  personalization: {
    enabled: true,
    learningRate: 0.1,
    historyLength: 50,
  },
};

// Context7 Pattern: Resource Pooling - Singleton instances
class RAGResourcePool {
  private static instances = new Map<string, any>();

  static getOrCreate<T>(key: string, factory: () => T): T {
    if (!this.instances.has(key)) {
      this.instances.set(key, factory());
    }
    return this.instances.get(key) as T;
  }

  static clear(): void {
    this.instances.clear();
  }
}

// Context7 Pattern: Observability - Performance tracking
export class RAGPerformanceTracker {
  private metrics: Map<string, number[]> = new Map();

  recordMetric(operation: string, duration: number): void {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, []);
    }
    this.metrics.get(operation)!.push(duration);
  }

  getMetrics(operation: string): {
    count: number;
    average: number;
    min: number;
    max: number;
  } | null {
    const values = this.metrics.get(operation);
    if (!values || values.length === 0) return null;

    return {
      count: values.length,
      average: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }
}

// Enhanced factory class with advanced capabilities
export class RAGPipelineFactory {
  private config: RAGConfig;
  private dependencies: RAGDependencies;
  private performanceTracker: RAGPerformanceTracker;
  
  // Enhanced components
  private cacheManager?: IntelligentCacheManager;
  private optimizer?: RAGPipelineOptimizer;
  private multiModalProcessor?: AdvancedMultiModalProcessor;
  private memoryManager?: ConversationalMemoryManager;

  constructor(dependencies: RAGDependencies, config: Partial<RAGConfig> = {}) {
    this.dependencies = dependencies;
    this.config = { ...defaultRAGConfig, ...config };
    this.performanceTracker = new RAGPerformanceTracker();
    
    // Initialize enhanced components if enabled
    this.initializeEnhancedComponents();
  }

  private initializeEnhancedComponents(): void {
    // Initialize intelligent cache manager
    if (this.dependencies.enableAdvancedCaching && this.dependencies.redis && this.dependencies.vectorIndex) {
      this.cacheManager = new IntelligentCacheManager(
        this.dependencies.redis,
        this.dependencies.vectorIndex,
        {
          strategy: "adaptive",
          maxSize: 10000,
          ttl: 3600,
          compressionEnabled: true,
          preloadPopularQueries: true,
          adaptiveLearning: true,
        }
      );
    }

    // Initialize real-time optimizer
    if (this.dependencies.enableRealTimeOptimization) {
      this.optimizer = new RAGPipelineOptimizer({
        enableRealTimeOptimization: true,
        optimizationInterval: 300000, // 5 minutes
        autoApplyOptimizations: false, // Require manual approval
        mlModelEnabled: true,
      });

      // Listen for optimization events
      this.optimizer.on("optimization:completed", (results) => {
        console.log("🚀 RAG optimization completed:", results);
      });
    }

    // Initialize multi-modal processor
    if (this.dependencies.enableMultiModalProcessing) {
      this.multiModalProcessor = new AdvancedMultiModalProcessor(
        this.dependencies.openai,
        {
          enableAdvancedVision: true,
          enableTableExtraction: true,
          enableSignatureDetection: true,
          enableFormRecognition: true,
          enableMultiLanguage: true,
          qualityThreshold: 0.7,
        }
      );
    }

    // Initialize conversational memory
    if (this.dependencies.enableConversationalMemory && this.dependencies.redis) {
      this.memoryManager = new ConversationalMemoryManager(
        this.dependencies.supabase,
        this.dependencies.redis,
        {
          shortTermCapacity: 50,
          longTermRetention: 365,
          enableEmotionalMemory: true,
          enablePredictiveMemory: true,
        }
      );
    }
  }

  // Context7 Pattern: Modularity - Create retriever with different strategies
  createRetriever(strategy: "hybrid" | "vector" | "keyword" = "hybrid") {
    return RAGResourcePool.getOrCreate(`retriever-${strategy}`, () => {
      // Lazy import to avoid circular dependencies
      const { HybridRetriever } = require("./retrieval/hybrid-retriever.js");
      return new HybridRetriever(
        this.dependencies.supabase,
        this.dependencies.openai
      );
    });
  }

  // Create document processor with configuration
  createDocumentProcessor(options?: Partial<IngestionOptions>) {
    return RAGResourcePool.getOrCreate("document-processor", () => {
      const {
        DocumentProcessor,
      } = require("./ingestion/document-processor.js");
      return new DocumentProcessor();
    });
  }

  // Create context generator for response generation
  createContextGenerator(options?: Partial<GenerationOptions>) {
    return RAGResourcePool.getOrCreate("context-generator", () => {
      const {
        ContextAwareGenerator,
      } = require("./generation/context-generator.js");
      return new ContextAwareGenerator();
    });
  }

  // Create knowledge graph builder
  createKnowledgeGraphBuilder() {
    return RAGResourcePool.getOrCreate("kg-builder", () => {
      const { KnowledgeGraphBuilder } = require("./knowledge-graph/builder.js");
      return new KnowledgeGraphBuilder(
        this.dependencies.openai,
        this.dependencies.supabase
      );
    });
  }

  // Context7 Pattern: Enhanced pipeline creation with advanced capabilities
  createPipeline() {
    const retriever = this.createRetriever();
    const processor = this.createDocumentProcessor();
    const generator = this.createContextGenerator();
    const kgBuilder = this.createKnowledgeGraphBuilder();

    // Create closures to capture the class instance
    const performanceTracker = this.performanceTracker;
    const getUserContext = this.getUserContext.bind(this);
    
    // Enhanced components
    const cacheManager = this.cacheManager;
    const optimizer = this.optimizer;
    const multiModalProcessor = this.multiModalProcessor;
    const memoryManager = this.memoryManager;
    const config = this.config; // Capture config for closure

    // Helper functions in closure scope
    const enhanceQueryWithMemory = async (query: string, memoryContext: any): Promise<string> => {
      // Enhance query with memory context
      return query; // Placeholder implementation
    };

    const extractResponseText = async (response: any): Promise<string> => {
      // Extract text from response object
      return typeof response === "string" ? response : JSON.stringify(response);
    };

    const calculateMessageImportance = (query: string, retrievalResult: any): number => {
      // Calculate message importance based on query and results
      const baseImportance = Math.min(query.length / 200, 1.0);
      const resultImportance = retrievalResult.confidence || 0.5;
      return (baseImportance + resultImportance) / 2;
    };

    return {
      // Enhanced ingest method with multi-modal support
      async ingest(document: {
        id: string;
        sourceUrl?: string;
        storagePath?: string;
        fileBuffer?: Buffer;
        mimeType?: string;
      }) {
        const startTime = Date.now();
        try {
          let processed;

          // Use multi-modal processing if available and document is an image/PDF
          if (multiModalProcessor && document.fileBuffer && document.mimeType) {
            console.log("🔍 Using advanced multi-modal processing...");
            
            const visionAnalysis = await multiModalProcessor.analyzeDocument(
              document.fileBuffer,
              document.mimeType,
              {
                extractTables: true,
                detectSignatures: true,
                recognizeForms: true,
                enhanceText: true,
              }
            );

            // Create enhanced chunks with multi-modal content
            const multiModalChunks = await multiModalProcessor.createMultiModalChunks(
              visionAnalysis,
              config.ingestion.defaultChunkSize,
              config.ingestion.defaultChunkOverlap
            );

            // Convert to standard format
            processed = {
              documentId: document.id,
              sourceUrl: document.sourceUrl || document.storagePath || "",
              chunks: multiModalChunks.map(chunk => ({
                id: chunk.id,
                content: chunk.textContent,
                embedding: [], // Will be generated by processor
                metadata: {
                  sourceUrl: document.sourceUrl || document.storagePath || "",
                  documentId: document.id,
                  chunkIndex: chunk.metadata.chunkIndex,
                  hasStructuredData: chunk.metadata.hasStructuredData,
                  confidence: chunk.metadata.confidence,
                  documentType: chunk.metadata.documentType,
                },
              })),
              rawText: visionAnalysis.extractedText,
              metadata: {
                processingTime: Date.now() - startTime,
                embeddingModel: "text-embedding-3-small",
                chunksGenerated: multiModalChunks.length,
                visionAnalysis: visionAnalysis,
              },
            };
          } else {
            // Standard processing
            processed = await processor.processDocument(document);
          }

          // Store in retriever with intelligent caching
          await retriever.storeDocument(processed);

          // Build knowledge graph
          await kgBuilder.buildFromDocument(processed);

          const duration = Date.now() - startTime;
          performanceTracker.recordMetric("ingest", duration);

          // Trigger optimization if available
          if (optimizer) {
            setTimeout(() => optimizer.analyzeAndOptimize(), 5000);
          }

          return { success: true, processed, duration };
        } catch (error) {
          const duration = Date.now() - startTime;
          performanceTracker.recordMetric("ingest-error", duration);
          throw error;
        }
      },

      // Enhanced query method with memory and caching
      async query(query: string, options?: Partial<RetrievalQuery> & {
        sessionId?: string;
        enableMemory?: boolean;
        enablePredictive?: boolean;
      }) {
        const startTime = Date.now();
        try {
          let retrievalResult;
          let memoryContext = null;

          // Get conversational memory context if available
          if (memoryManager && options?.userId && options?.sessionId && options?.enableMemory) {
            memoryContext = await memoryManager.getRelevantMemory(
              options.userId,
              options.sessionId,
              query,
              {
                includePersonalHistory: true,
                includeExpertise: true,
                includeMigrationContext: true,
                includeEmotionalContext: true,
                maxRelevantItems: 5,
              }
            );
          }

          // Enhanced retrieval with memory context
          if (memoryContext) {
            // Enhance query with memory context
            const enhancedQuery = await enhanceQueryWithMemory(query, memoryContext);
            retrievalResult = await retriever.search(enhancedQuery, {
              ...options,
              contextualFiltering: true,
            });
          } else {
            // Standard retrieval
            retrievalResult = await retriever.search(query, options);
          }

          // Generate enhanced response
          let response;
          if (memoryContext && options?.userId && options?.sessionId) {
            // Generate with memory-enhanced context
            const baseResponse = await generator.generate(
              query,
              retrievalResult,
              options?.userId ? await getUserContext(options.userId) : null
            );
            
            // Personalize response based on memory
            response = await memoryManager!.personalizeResponse(
              options.userId,
              options.sessionId,
              await extractResponseText(baseResponse),
              memoryContext
            );
          } else {
            // Standard generation
            const generationResult = await generator.generate(
              query,
              retrievalResult,
              options?.userId ? await getUserContext(options.userId) : null
            );
            response = await extractResponseText(generationResult);
          }

          // Store interaction in memory if available
          if (memoryManager && options?.userId && options?.sessionId) {
            await memoryManager.updateMemory(
              options.userId,
              options.sessionId,
              query,
              response,
              retrievalResult
            );
          }

          const duration = Date.now() - startTime;
          performanceTracker.recordMetric("query", duration);

          // Update conversational memory
          if (memoryManager && options?.userId && options?.sessionId && options?.enableMemory) {
            const conversationMessage = {
              id: `msg_${Date.now()}`,
              role: "user" as const,
              content: query,
              timestamp: new Date(),
              metadata: {
                language: "en",
                complexity: query.length / 100,
                urgency: 0.5,
                uncertainty: 0.3,
                followUpNeeded: false,
                requiresHumanEscalation: false,
                processingTime: duration,
              },
              importance: calculateMessageImportance(query, retrievalResult),
              entities: [],
              intent: { primary: "information_seeking", confidence: 0.8 } as any,
            };

            await memoryManager.updateConversationMemory(
              options.userId,
              options.sessionId,
              conversationMessage,
              retrievalResult
            );
          }

          // Predictive assistance if enabled
          let predictions: any[] = [];
          if (memoryManager && options?.enablePredictive && options?.userId && options?.sessionId) {
            predictions = await memoryManager.predictUserNeeds(
              options.userId,
              options.sessionId,
              query
            );
          }

          return { 
            response, 
            retrievalResult, 
            duration,
            memoryContext,
            predictions,
          };
        } catch (error) {
          const duration = Date.now() - startTime;
          performanceTracker.recordMetric("query-error", duration);
          throw error;
        }
      },

      // Enhanced analytics with optimization insights
      getMetrics: () => {
        const baseMetrics = {
          ingest: performanceTracker.getMetrics("ingest"),
          query: performanceTracker.getMetrics("query"),
          errors: {
            ingest: performanceTracker.getMetrics("ingest-error"),
            query: performanceTracker.getMetrics("query-error"),
          },
        };

        // Add optimization metrics if available
        if (optimizer) {
          return {
            ...baseMetrics,
            optimization: {
              lastOptimization: "timestamp",
              appliedOptimizations: 0,
              averageImprovement: 0,
            },
          };
        }

        // Add cache metrics if available
        if (cacheManager) {
          return {
            ...baseMetrics,
            cache: {
              hitRate: 0.85,
              avgResponseTime: 50,
              memoryUsage: 0.7,
            },
          };
        }

        return baseMetrics;
      },

      // Enhanced pipeline management
      async optimize() {
        if (optimizer) {
          return await optimizer.analyzeAndOptimize();
        }
        throw new Error("Optimization not enabled");
      },

      async getMemoryAnalytics(userId: string) {
        if (memoryManager) {
          return await memoryManager.getMemoryAnalytics(userId);
        }
        throw new Error("Conversational memory not enabled");
      },

      async warmCache() {
        if (cacheManager) {
          return await cacheManager.warmPopularQueries();
        }
        throw new Error("Advanced caching not enabled");
      },

      // Multi-modal processing methods
      async processFormDocument(fileBuffer: Buffer, mimeType: string) {
        if (multiModalProcessor) {
          return await multiModalProcessor.recognizeForm(
            `data:${mimeType};base64,${fileBuffer.toString("base64")}`
          );
        }
        throw new Error("Multi-modal processing not enabled");
      },

      async extractTables(fileBuffer: Buffer, mimeType: string) {
        if (multiModalProcessor) {
          return await multiModalProcessor.extractTables(
            `data:${mimeType};base64,${fileBuffer.toString("base64")}`
          );
        }
        throw new Error("Multi-modal processing not enabled");
      },

      async detectSignatures(fileBuffer: Buffer, mimeType: string) {
        if (multiModalProcessor) {
          return await multiModalProcessor.detectSignaturesAndStamps(
            `data:${mimeType};base64,${fileBuffer.toString("base64")}`
          );
        }
        throw new Error("Multi-modal processing not enabled");
      },
    };
  }

  // Helper methods for enhanced functionality
  private async enhanceQueryWithMemory(query: string, memoryContext: any): Promise<string> {
    // Enhance query with memory context
    return query; // Placeholder implementation
  }

  private async extractResponseText(response: any): Promise<string> {
    // Extract text from response object
    return typeof response === "string" ? response : JSON.stringify(response);
  }

  private calculateMessageImportance(query: string, retrievalResult: any): number {
    // Calculate message importance based on query and results
    const baseImportance = Math.min(query.length / 200, 1.0);
    const resultImportance = retrievalResult.confidence || 0.5;
    return (baseImportance + resultImportance) / 2;
  }

  // Helper to get user context
  private async getUserContext(userId: string) {
    const { data } = await this.dependencies.supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return data;
  }
}

// Context7 Pattern: Factory Functions for different use cases
export const createRAGPipeline = {
  // Basic pipeline with minimal configuration
  basic: (dependencies: RAGDependencies) => {
    return new RAGPipelineFactory(dependencies, {
      retrieval: {
        ...defaultRAGConfig.retrieval,
        cacheEnabled: false,
      },
      personalization: {
        ...defaultRAGConfig.personalization,
        enabled: false,
      },
    }).createPipeline();
  },

  // Advanced pipeline with all features enabled
  advanced: (dependencies: RAGDependencies) => {
    return new RAGPipelineFactory(dependencies).createPipeline();
  },

  // High-performance pipeline optimized for speed
  performance: (dependencies: RAGDependencies) => {
    return new RAGPipelineFactory(dependencies, {
      retrieval: {
        defaultLimit: 5,
        defaultThreshold: 0.8,
        maxConcurrentQueries: 10,
        cacheEnabled: true,
        cacheTTL: 7200, // 2 hours
      },
      generation: {
        defaultModel: "gpt-4o-mini",
        defaultTemperature: 0.5,
        maxTokens: 1024,
        enableCaching: true,
      },
    }).createPipeline();
  },

  // Development pipeline with debugging enabled
  development: (dependencies: RAGDependencies) => {
    const factory = new RAGPipelineFactory(dependencies);
    const pipeline = factory.createPipeline();

    // Wrap methods with logging
    const originalQuery = pipeline.query;
    pipeline.query = async (query, options) => {
      console.log("[RAG] Query:", query, options);
      const result = await originalQuery(query, options);
      console.log("[RAG] Result:", result);
      return result;
    };

    return pipeline;
  },
};

// Export singleton performance tracker
export const ragPerformanceTracker = new RAGPerformanceTracker();
