import { task, logger, schemaTask, tags, metadata } from "@trigger.dev/sdk";
import { z } from "zod";
import { RAGPipelineFactory, RAGDependencies } from "@hijraah/rag";
import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { OpenAI } from "openai";
import { Redis } from "@upstash/redis";
import { Index } from "@upstash/vector";

// Enhanced payload schema with comprehensive validation and descriptive documentation
const RAGDocumentPayloadSchema = z.object({
  id: z.string().uuid().describe("Unique document identifier"),
  storagePath: z.string().describe("Storage path for the document"),
  fileType: z.string().describe("MIME type or file extension"),
  sourceUrl: z.string().url().describe("Source URL of the document"),
  
  // Enhanced options for advanced processing
  processingOptions: z.object({
    enableMultiModal: z.boolean().default(true).describe("Enable advanced multi-modal processing"),
    enableMemory: z.boolean().default(true).describe("Enable conversational memory"),
    enableOptimization: z.boolean().default(true).describe("Enable real-time optimization"),
    enableAdvancedCaching: z.boolean().default(true).describe("Enable intelligent caching"),
    priority: z.enum(["low", "medium", "high", "critical"]).default("medium").describe("Processing priority"),
    userId: z.string().optional().describe("User ID for personalization"),
    sessionId: z.string().optional().describe("Session ID for context"),
  }).default({
    enableMultiModal: true,
    enableMemory: true,
    enableOptimization: true,
    enableAdvancedCaching: true,
    priority: "medium" as const,
  }),
  
  // File processing specific options
  fileBuffer: z.string().optional().describe("Base64 encoded file buffer for multi-modal processing"),
  metadata: z.record(z.string(), z.any()).optional().describe("Additional metadata for the document"),
});

type RAGDocumentPayload = z.infer<typeof RAGDocumentPayloadSchema>;

// v4 Pattern: Use schemaTask for automatic validation and better type safety
export const ragPipelineTask = schemaTask({
  id: "rag-pipeline-orchestrator",
  description: "Processes documents through the unified RAG pipeline using Context7 patterns",
  schema: RAGDocumentPayloadSchema,
  // Configure machine for resource-intensive RAG operations
  machine: "medium-1x", // 1 vCPU, 2 GB RAM
  // Set longer timeout for RAG processing
  maxDuration: 1800, // 30 minutes for complex document processing
  // Enhanced retry configuration for RAG operations
  retry: {
    maxAttempts: 5,
    factor: 1.8,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 60000,
    randomize: true,
  },
  // v4 Pattern: Global error handling
  catchError: async ({ error, ctx }) => {
    logger.error("❌ RAG Pipeline Task Error", {
      taskId: ctx.task.id,
      runId: ctx.run.id,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Determine if error is retryable
    if (error instanceof Error) {
      // Don't retry validation errors or critical failures
      if (error.message.includes("validation") || error.message.includes("FATAL")) {
        throw error; // Will not retry
      }
    }

    // Allow retry for network/temporary errors
    return { retryAt: new Date(Date.now() + 60000) }; // Retry in 1 minute
  },
  run: async (payload: RAGDocumentPayload, { ctx }) => {
    // v4 Pattern: Enhanced logging with structured data and comprehensive context
    logger.info("🚀 Enhanced RAG Pipeline Task Started", {
      documentId: payload.id,
      runId: ctx.run.id,
      taskId: ctx.task.id,
      sourceUrl: payload.sourceUrl,
      fileType: payload.fileType,
      processingOptions: payload.processingOptions,
      timestamp: new Date().toISOString(),
    });

    // v4 Pattern: Add tags for better organization and filtering
    await tags.add(`document_${payload.id}`);
    await tags.add(`type_${payload.fileType.replace(/[^a-zA-Z0-9]/g, "_")}`);
    await tags.add(`priority_${payload.processingOptions.priority}`);
    if (payload.processingOptions.userId) {
      await tags.add(`user_${payload.processingOptions.userId}`);
    }

    // v4 Pattern: Set initial metadata for tracking
    await metadata.set("document_id", payload.id);
    await metadata.set("processing_stage", "initializing");
    await metadata.set("start_time", Date.now());

    try {
      // Context7 Pattern: Create enhanced RAG dependencies with all features enabled
      const supabase = createSupabaseClient("service");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
      
      // Enhanced dependencies with Redis and Vector index for advanced features
      const ragDependencies: RAGDependencies = {
        supabase: supabase as any,
        openai: openai as any,
        redis: process.env.UPSTASH_REDIS_REST_URL ? new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL!,
          token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        }) : undefined,
        vectorIndex: process.env.UPSTASH_VECTOR_REST_URL ? new Index({
          url: process.env.UPSTASH_VECTOR_REST_URL!,
          token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
        }) : undefined,
        firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
        mistralApiKey: process.env.MISTRAL_API_KEY,
      };

      // Create enhanced factory with feature flags (will be handled internally)
      const ragFactory = new RAGPipelineFactory(ragDependencies);
      const pipeline = ragFactory.createPipeline();

      // v4 Pattern: Use trace for detailed operation monitoring with enhanced attributes
      const result = await logger.trace(
        "enhanced-rag-document-ingestion",
        async (span) => {
          // Add comprehensive trace attributes for monitoring
          span.setAttribute("document.id", payload.id);
          span.setAttribute("document.type", payload.fileType);
          span.setAttribute("document.source", payload.sourceUrl);
          span.setAttribute("pipeline.factory", "EnhancedRAGPipelineFactory");
          span.setAttribute("processing.multimodal", payload.processingOptions.enableMultiModal);
          span.setAttribute("processing.memory", payload.processingOptions.enableMemory);
          span.setAttribute("processing.optimization", payload.processingOptions.enableOptimization);
          span.setAttribute("processing.caching", payload.processingOptions.enableAdvancedCaching);
          span.setAttribute("processing.priority", payload.processingOptions.priority);

          await metadata.set("processing_stage", "ingesting");

          // Context7 Pattern: Enhanced ingest with multi-modal and file buffer support
          logger.info("📄 Processing document with advanced features...", { 
            documentId: payload.id,
            operation: "pipeline.ingest",
            multiModal: payload.processingOptions.enableMultiModal,
            hasFileBuffer: !!payload.fileBuffer,
          });
          
          // Prepare enhanced document object for ingestion
          const documentToIngest = {
            id: payload.id,
            sourceUrl: payload.sourceUrl,
            storagePath: payload.storagePath,
            ...(payload.fileBuffer && {
              fileBuffer: Buffer.from(payload.fileBuffer, 'base64'),
              mimeType: payload.fileType,
            }),
            ...(payload.metadata && { documentMetadata: payload.metadata }),
          };

          const ingestResult = await pipeline.ingest(documentToIngest);

          // Add enhanced result attributes to trace
          span.setAttribute("ingest.success", ingestResult.success);
          span.setAttribute("ingest.duration", ingestResult.duration || 0);
          span.setAttribute("ingest.chunks_generated", ingestResult.processed?.chunks?.length || 0);
          span.setAttribute("ingest.multimodal_processed", !!ingestResult.processed?.metadata?.visionAnalysis);
          
          await metadata.set("processing_stage", "completed");
          await metadata.set("chunks_generated", ingestResult.processed?.chunks?.length || 0);

          return ingestResult;
        }
      );

      // v4 Pattern: Trigger optimization if enabled
      if (payload.processingOptions.enableOptimization) {
        logger.info("🔧 Triggering pipeline optimization...", { documentId: payload.id });
        
        // Trigger optimization in background (non-blocking)
        setTimeout(async () => {
          try {
            // Type assertion needed due to TypeScript limitations with dynamic pipeline creation
            const optimizablePipeline = pipeline as any;
            if (optimizablePipeline.optimize) {
              await optimizablePipeline.optimize();
              logger.info("✅ Pipeline optimization completed", { documentId: payload.id });
            } else {
              logger.warn("⚠️ Optimization not available (missing optimizer dependency)", { documentId: payload.id });
            }
          } catch (error) {
            logger.warn("⚠️ Pipeline optimization failed", { 
              documentId: payload.id, 
              error: error instanceof Error ? error.message : String(error) 
            });
          }
        }, 5000);
      }

      // v4 Pattern: Warm cache if enabled
      if (payload.processingOptions.enableAdvancedCaching) {
        logger.info("💾 Warming intelligent cache...", { documentId: payload.id });
        
        setTimeout(async () => {
          try {
            // Type assertion needed due to TypeScript limitations with dynamic pipeline creation
            const cacheablePipeline = pipeline as any;
            if (cacheablePipeline.warmCache) {
              await cacheablePipeline.warmCache();
              logger.info("✅ Cache warming completed", { documentId: payload.id });
            } else {
              logger.warn("⚠️ Cache warming not available (missing cache manager dependency)", { documentId: payload.id });
            }
          } catch (error) {
            logger.warn("⚠️ Cache warming failed", { 
              documentId: payload.id, 
              error: error instanceof Error ? error.message : String(error) 
            });
          }
        }, 2000);
      }

      // v4 Pattern: Enhanced success logging with comprehensive metrics
      logger.info("✅ Enhanced RAG Pipeline Task Completed Successfully", {
        documentId: payload.id,
        runId: ctx.run.id,
        taskId: ctx.task.id,
        processingTime: result.duration,
        success: result.success,
        ingestStats: {
          hasProcessedData: !!result.processed,
          chunksGenerated: result.processed?.chunks?.length || 0,
          hasMultiModalData: !!result.processed?.metadata?.visionAnalysis,
          processingDuration: result.duration,
          ingestedAt: new Date().toISOString(),
        },
        featuresUsed: {
          multiModal: payload.processingOptions.enableMultiModal,
          memory: payload.processingOptions.enableMemory,
          optimization: payload.processingOptions.enableOptimization,
          advancedCaching: payload.processingOptions.enableAdvancedCaching,
        },
        resourcesAvailable: {
          redis: !!ragDependencies.redis,
          vectorIndex: !!ragDependencies.vectorIndex,
          firecrawl: !!ragDependencies.firecrawlApiKey,
          mistral: !!ragDependencies.mistralApiKey,
        },
      });

      // v4 Pattern: Update final metadata
      await metadata.set("processing_stage", "success");
      await metadata.set("end_time", Date.now());
      await metadata.set("total_processing_time", result.duration || 0);

      // v4 Pattern: Return enhanced structured result
      return {
        status: "success" as const,
        documentId: payload.id,
        processingTime: result.duration,
        ingestResult: result,
        timestamp: new Date().toISOString(),
        
        // Enhanced result data
        featuresUsed: {
          multiModal: payload.processingOptions.enableMultiModal && !!result.processed?.metadata?.visionAnalysis,
          memory: payload.processingOptions.enableMemory,
          optimization: payload.processingOptions.enableOptimization,
          advancedCaching: payload.processingOptions.enableAdvancedCaching,
        },
        
        performance: {
          chunksGenerated: result.processed?.chunks?.length || 0,
          processingDuration: result.duration || 0,
          hasMultiModalContent: !!result.processed?.metadata?.visionAnalysis,
        },
        
        resourceUtilization: {
          redisAvailable: !!ragDependencies.redis,
          vectorIndexAvailable: !!ragDependencies.vectorIndex,
          firecrawlAvailable: !!ragDependencies.firecrawlApiKey,
          mistralAvailable: !!ragDependencies.mistralApiKey,
        },
      };

    } catch (error) {
      // v4 Pattern: Enhanced error handling with comprehensive context
      await metadata.set("processing_stage", "error");
      await metadata.set("error_message", error instanceof Error ? error.message : String(error));
      
      logger.error("❌ Enhanced RAG Pipeline Task Failed", {
        documentId: payload.id,
        runId: ctx.run.id,
        taskId: ctx.task.id,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        processingOptions: payload.processingOptions,
        timestamp: new Date().toISOString(),
      });

      throw error; // Re-throw for proper error handling
    }
  },
}) as any; // Type assertion to work around SDK type inference issues

// v4 Pattern: Enhanced RAG Query Task with Memory and Personalization  
export const enhancedRagQueryTask = schemaTask({
  id: "enhanced-rag-query",
  description: "Performs enhanced RAG queries with memory, personalization, and predictive assistance",
  schema: z.object({
    query: z.string().min(1).describe("The user's query"),
    userId: z.string().optional().describe("User ID for personalization"),
    sessionId: z.string().optional().describe("Session ID for conversational memory"),
    options: z.object({
      enableMemory: z.boolean().default(true).describe("Enable conversational memory"),
      enablePredictive: z.boolean().default(true).describe("Enable predictive assistance"),
      enablePersonalization: z.boolean().default(true).describe("Enable response personalization"),
      includeMultiModal: z.boolean().default(false).describe("Include multi-modal content in results"),
      maxResults: z.number().min(1).max(50).default(10).describe("Maximum number of results"),
      threshold: z.number().min(0).max(1).default(0.7).describe("Similarity threshold"),
    }).default({
      enableMemory: true,
      enablePredictive: true,
      enablePersonalization: true,
      includeMultiModal: false,
      maxResults: 10,
      threshold: 0.7,
    }),
  }),
  machine: "medium-1x", // Optimized for query processing
  maxDuration: 300, // 5 minutes for complex queries
  retry: {
    maxAttempts: 3,
    factor: 1.5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30000,
    randomize: true,
  },
  catchError: async ({ error, ctx }) => {
    logger.error("❌ Enhanced RAG Query Task Error", {
      taskId: ctx.task.id,
      runId: ctx.run.id,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof Error && (
      error.message.includes("validation") || 
      error.message.includes("FATAL") ||
      error.message.includes("authentication")
    )) {
      throw error; // Don't retry validation or auth errors
    }

    return { retryAt: new Date(Date.now() + 30000) }; // Retry in 30 seconds
  },
  run: async (payload, { ctx }) => {
    // Enhanced logging with query context
    logger.info("🔍 Enhanced RAG Query Started", {
      runId: ctx.run.id,
      taskId: ctx.task.id,
      query: payload.query.substring(0, 100) + (payload.query.length > 100 ? "..." : ""),
      userId: payload.userId,
      sessionId: payload.sessionId,
      options: payload.options,
      timestamp: new Date().toISOString(),
    });

    // Add query-specific tags
    await tags.add("query_type_enhanced");
    await tags.add(`has_user_${!!payload.userId}`);
    await tags.add(`has_session_${!!payload.sessionId}`);
    await tags.add(`memory_enabled_${payload.options.enableMemory}`);
    await tags.add(`predictive_enabled_${payload.options.enablePredictive}`);
    
    if (payload.userId) {
      await tags.add(`user_${payload.userId}`);
    }

    // Set query metadata
    await metadata.set("query_type", "enhanced_rag");
    await metadata.set("query_length", payload.query.length);
    await metadata.set("start_time", Date.now());

    try {
      // Setup enhanced RAG dependencies
      const supabase = createSupabaseClient("service");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
      
      const ragDependencies: RAGDependencies = {
        supabase: supabase as any,
        openai: openai as any,
        redis: process.env.UPSTASH_REDIS_REST_URL ? new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL!,
          token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        }) : undefined,
        vectorIndex: process.env.UPSTASH_VECTOR_REST_URL ? new Index({
          url: process.env.UPSTASH_VECTOR_REST_URL!,
          token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
        }) : undefined,
        firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
        mistralApiKey: process.env.MISTRAL_API_KEY,
      };

      const ragFactory = new RAGPipelineFactory(ragDependencies);
      const pipeline = ragFactory.createPipeline();

      // Enhanced query execution with tracing
      const result = await logger.trace(
        "enhanced-rag-query-execution",
        async (span) => {
          span.setAttribute("query.text", payload.query);
          span.setAttribute("query.userId", payload.userId || "anonymous");
          span.setAttribute("query.sessionId", payload.sessionId || "no-session");
          span.setAttribute("options.memory", payload.options.enableMemory);
          span.setAttribute("options.predictive", payload.options.enablePredictive);
          span.setAttribute("options.personalization", payload.options.enablePersonalization);
          span.setAttribute("options.multimodal", payload.options.includeMultiModal);

          await metadata.set("processing_stage", "querying");

          // Enhanced query with all options
          const queryOptions = {
            limit: payload.options.maxResults,
            threshold: payload.options.threshold,
            includeImages: payload.options.includeMultiModal,
            includeKnowledgeGraph: true,
            includePersonalization: payload.options.enablePersonalization,
            userId: payload.userId,
            sessionId: payload.sessionId,
            enableMemory: payload.options.enableMemory,
            enablePredictive: payload.options.enablePredictive,
          };

          logger.info("🧠 Executing enhanced RAG query...", {
            query: payload.query.substring(0, 50) + "...",
            options: queryOptions,
          });

          // Type assertion for enhanced pipeline methods
          const enhancedPipeline = pipeline as any;
          const queryResult = await enhancedPipeline.query(payload.query, queryOptions);

          // Extract comprehensive result data
          span.setAttribute("result.responseLength", queryResult.response?.length || 0);
          span.setAttribute("result.chunksRetrieved", queryResult.retrievalResult?.chunks?.length || 0);
          span.setAttribute("result.confidence", queryResult.retrievalResult?.confidence || 0);
          span.setAttribute("result.hasMemoryContext", !!queryResult.memoryContext);
          span.setAttribute("result.predictionsCount", queryResult.predictions?.length || 0);

          await metadata.set("processing_stage", "completed");
          await metadata.set("chunks_retrieved", queryResult.retrievalResult?.chunks?.length || 0);
          await metadata.set("response_length", queryResult.response?.length || 0);

          return queryResult;
        }
      );

      // Get memory analytics if available
      let memoryAnalytics = null;
      if (payload.userId && payload.options.enableMemory) {
        try {
          const enhancedPipeline = pipeline as any;
          if (enhancedPipeline.getMemoryAnalytics) {
            memoryAnalytics = await enhancedPipeline.getMemoryAnalytics(payload.userId);
            logger.info("📊 Memory analytics retrieved", { 
              userId: payload.userId,
              analytics: memoryAnalytics 
            });
          }
        } catch (error) {
          logger.warn("⚠️ Failed to retrieve memory analytics", { 
            userId: payload.userId,
            error: error instanceof Error ? error.message : String(error) 
          });
        }
      }

      // Enhanced success logging
      logger.info("✅ Enhanced RAG Query Completed", {
        runId: ctx.run.id,
        taskId: ctx.task.id,
        processingTime: result.duration,
        queryStats: {
          responseLength: result.response?.length || 0,
          chunksRetrieved: result.retrievalResult?.chunks?.length || 0,
          confidence: result.retrievalResult?.confidence || 0,
          hasMemoryContext: !!result.memoryContext,
          predictionsCount: result.predictions?.length || 0,
        },
        featuresUsed: {
          memory: payload.options.enableMemory && !!result.memoryContext,
          predictive: payload.options.enablePredictive && result.predictions?.length > 0,
          personalization: payload.options.enablePersonalization,
          multiModal: payload.options.includeMultiModal,
        },
        resourcesAvailable: {
          redis: !!ragDependencies.redis,
          vectorIndex: !!ragDependencies.vectorIndex,
          memoryAnalytics: !!memoryAnalytics,
        },
      });

      // Final metadata updates
      await metadata.set("processing_stage", "success");
      await metadata.set("end_time", Date.now());
      await metadata.set("total_processing_time", result.duration || 0);

      // Return enhanced result
      return {
        status: "success" as const,
        query: payload.query,
        response: result.response,
        retrievalResult: result.retrievalResult,
        memoryContext: result.memoryContext,
        predictions: result.predictions || [],
        memoryAnalytics,
        processingTime: result.duration,
        timestamp: new Date().toISOString(),
        
        featuresUsed: {
          memory: payload.options.enableMemory && !!result.memoryContext,
          predictive: payload.options.enablePredictive && result.predictions?.length > 0,
          personalization: payload.options.enablePersonalization,
          multiModal: payload.options.includeMultiModal,
        },
        
        performance: {
          queryDuration: result.duration || 0,
          chunksRetrieved: result.retrievalResult?.chunks?.length || 0,
          responseLength: result.response?.length || 0,
          confidence: result.retrievalResult?.confidence || 0,
        },
      };

    } catch (error) {
      await metadata.set("processing_stage", "error");
      await metadata.set("error_message", error instanceof Error ? error.message : String(error));
      
      logger.error("❌ Enhanced RAG Query Failed", {
        runId: ctx.run.id,
        taskId: ctx.task.id,
        query: payload.query.substring(0, 100) + "...",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        options: payload.options,
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  },
}) as any; // Type assertion for SDK compatibility

// Export enhanced type for the task result with comprehensive feature tracking
export type EnhancedRAGPipelineResult = {
  status: "success";
  documentId: string;
  processingTime: number;
  ingestResult: {
    success: boolean;
    processed: any;
    duration: number;
  };
  timestamp: string;
  
  // Enhanced result data
  featuresUsed: {
    multiModal: boolean;
    memory: boolean;
    optimization: boolean;
    advancedCaching: boolean;
  };
  
  performance: {
    chunksGenerated: number;
    processingDuration: number;
    hasMultiModalContent: boolean;
  };
  
  resourceUtilization: {
    redisAvailable: boolean;
    vectorIndexAvailable: boolean;
    firecrawlAvailable: boolean;
    mistralAvailable: boolean;
  };
};

// Export type for enhanced query result
export type EnhancedRAGQueryResult = {
  status: "success";
  query: string;
  response: string;
  retrievalResult: any;
  memoryContext?: any;
  predictions: any[];
  memoryAnalytics?: any;
  processingTime: number;
  timestamp: string;
  
  featuresUsed: {
    memory: boolean;
    predictive: boolean;
    personalization: boolean;
    multiModal: boolean;
  };
  
  performance: {
    queryDuration: number;
    chunksRetrieved: number;
    responseLength: number;
    confidence: number;
  };
};
