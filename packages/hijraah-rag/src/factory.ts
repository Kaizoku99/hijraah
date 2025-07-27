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

// Context7 Pattern: Factory Functions for RAG Components
export interface RAGDependencies {
  supabase: SupabaseClient;
  openai: OpenAI;
  redis?: Redis;
  vectorIndex?: Index;
  firecrawlApiKey?: string;
  mistralApiKey?: string;
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

// Main factory class following Context7 patterns
export class RAGPipelineFactory {
  private config: RAGConfig;
  private dependencies: RAGDependencies;
  private performanceTracker: RAGPerformanceTracker;

  constructor(dependencies: RAGDependencies, config: Partial<RAGConfig> = {}) {
    this.dependencies = dependencies;
    this.config = { ...defaultRAGConfig, ...config };
    this.performanceTracker = new RAGPerformanceTracker();
  }

  // Context7 Pattern: Modularity - Create retriever with different strategies
  createRetriever(strategy: "hybrid" | "vector" | "keyword" = "hybrid") {
    return RAGResourcePool.getOrCreate(`retriever-${strategy}`, () => {
      // Lazy import to avoid circular dependencies
      const { HybridRetriever } = require("./retrieval/hybrid-retriever.js");
      return new HybridRetriever(
        this.dependencies.supabase,
        this.dependencies.openai,
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
        this.dependencies.supabase,
      );
    });
  }

  // Context7 Pattern: Provider Isolation - Create complete RAG pipeline
  createPipeline() {
    const retriever = this.createRetriever();
    const processor = this.createDocumentProcessor();
    const generator = this.createContextGenerator();
    const kgBuilder = this.createKnowledgeGraphBuilder();

    return {
      // Ingest documents into the system
      async ingest(document: {
        id: string;
        sourceUrl?: string;
        storagePath?: string;
      }) {
        const startTime = Date.now();
        try {
          // Process document
          const processed = await processor.processDocument(document);

          // Store in retriever
          await retriever.storeDocument(processed);

          // Build knowledge graph
          await kgBuilder.buildFromDocument(processed);

          const duration = Date.now() - startTime;
          this.performanceTracker.recordMetric("ingest", duration);

          return { success: true, processed, duration };
        } catch (error) {
          const duration = Date.now() - startTime;
          this.performanceTracker.recordMetric("ingest-error", duration);
          throw error;
        }
      },

      // Search and generate response
      async query(query: string, options?: Partial<RetrievalQuery>) {
        const startTime = Date.now();
        try {
          // Retrieve relevant context
          const retrievalResult = await retriever.search(query, options);

          // Generate response
          const response = await generator.generate(
            query,
            retrievalResult,
            options?.userId ? await this.getUserContext(options.userId) : null,
          );

          const duration = Date.now() - startTime;
          this.performanceTracker.recordMetric("query", duration);

          return { response, retrievalResult, duration };
        } catch (error) {
          const duration = Date.now() - startTime;
          this.performanceTracker.recordMetric("query-error", duration);
          throw error;
        }
      },

      // Get performance metrics
      getMetrics: () => ({
        ingest: this.performanceTracker.getMetrics("ingest"),
        query: this.performanceTracker.getMetrics("query"),
        errors: {
          ingest: this.performanceTracker.getMetrics("ingest-error"),
          query: this.performanceTracker.getMetrics("query-error"),
        },
      }),
    };
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
