/**
 * Quality Monitoring and Automated QA Tasks
 * 
 * Task 7.2: Set up extraction quality monitoring using existing RAGProcessedDocument patterns and automated quality assurance
 * 
 * This module implements quality monitoring systems that integrate with the existing RAG pipeline
 * and provide automated quality assurance for document processing workflows.
 * 
 * Requirements: 6.2, 6.3, 6.4, 6.5
 */

import { task, logger } from "@trigger.dev/sdk/v3";
import { mistral } from "@ai-sdk/mistral";
import { openai } from "@ai-sdk/openai";
import { generateObject, embed } from "ai";
import { z } from "zod";
import { 
  DocumentProcessingResult,
  QualityValidation,
  type StructuredData
} from "./types.js";

// Quality monitoring input schema
const QualityMonitoringInputSchema = z.object({
  monitoringId: z.string(),
  timeRange: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  documentTypes: z.array(z.string()).optional(),
  qualityThresholds: z.object({
    minimumConfidence: z.number().min(0).max(1).default(0.8),
    maximumErrorRate: z.number().min(0).max(1).default(0.1),
    minimumCompleteness: z.number().min(0).max(1).default(0.7),
  }).optional(),
  monitoringOptions: z.object({
    enableTrendAnalysis: z.boolean().default(true),
    enableAnomalyDetection: z.boolean().default(true),
    enablePerformanceTracking: z.boolean().default(true),
    alertThresholds: z.object({
      criticalErrorRate: z.number().default(0.2),
      lowConfidenceRate: z.number().default(0.3),
      processingDelayMinutes: z.number().default(30),
    }).optional(),
  }).optional(),
});

type QualityMonitoringInput = z.infer<typeof QualityMonitoringInputSchema>;

// RAG integration schema for processed documents
const RAGProcessedDocumentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  documentType: z.string(),
  processingResult: z.object({
    status: z.enum(["success", "partial", "failed"]),
    confidence: z.number(),
    extractedContent: z.string(),
    structuredData: z.record(z.any()).optional(),
    qualityMetrics: z.object({
      overallConfidence: z.number(),
      textQuality: z.number(),
      structureQuality: z.number(),
      completeness: z.number(),
    }),
  }),
  ragMetadata: z.object({
    chunkCount: z.number(),
    embeddingModel: z.string(),
    indexedAt: z.date(),
    searchableFields: z.array(z.string()),
    vectorSimilarityScore: z.number().optional(),
  }),
  qualityAssessment: z.object({
    automatedScore: z.number(),
    manualReviewRequired: z.boolean(),
    issues: z.array(z.string()),
    lastReviewedAt: z.date().optional(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type RAGProcessedDocument = z.infer<typeof RAGProcessedDocumentSchema>;

/**
 * Monitor extraction quality across all processed documents
 * Integrates with existing RAGProcessedDocument patterns
 */
export const monitorExtractionQualityTask = task({
  id: "monitor-extraction-quality",
  maxDuration: 600, // 10 minutes
  retry: {
    maxAttempts: 3,
    factor: 1.5,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: QualityMonitoringInput): Promise<{
    monitoringId: string;
    summary: {
      totalDocuments: number;
      successfulProcessing: number;
      failedProcessing: number;
      averageConfidence: number;
      averageCompleteness: number;
      errorRate: number;
    };
    qualityTrends: {
      confidenceTrend: "improving" | "declining" | "stable";
      errorRateTrend: "improving" | "declining" | "stable";
      processingTimeTrend: "improving" | "declining" | "stable";
    };
    anomalies: Array<{
      type: string;
      severity: "low" | "medium" | "high" | "critical";
      description: string;
      affectedDocuments: number;
      recommendedAction: string;
    }>;
    recommendations: string[];
    alerts: Array<{
      type: string;
      severity: "warning" | "error" | "critical";
      message: string;
      timestamp: Date;
    }>;
  }> => {
    const startTime = Date.now();
    logger.info("Starting extraction quality monitoring", {
      monitoringId: payload.monitoringId,
      timeRange: payload.timeRange,
      documentTypes: payload.documentTypes
    });

    try {
      const validatedInput = QualityMonitoringInputSchema.parse(payload);
      
      // Simulate fetching processed documents from RAG system
      const processedDocuments = await fetchRAGProcessedDocuments(validatedInput);
      
      // Calculate quality metrics
      const summary = calculateQualitySummary(processedDocuments);
      
      // Analyze quality trends
      const qualityTrends = await analyzeQualityTrends(processedDocuments, validatedInput);
      
      // Detect anomalies
      const anomalies = await detectQualityAnomalies(processedDocuments, validatedInput);
      
      // Generate recommendations
      const recommendations = generateQualityRecommendations(summary, qualityTrends, anomalies);
      
      // Check for alerts
      const alerts = checkQualityAlerts(summary, validatedInput);
      
      const result = {
        monitoringId: validatedInput.monitoringId,
        summary,
        qualityTrends,
        anomalies,
        recommendations,
        alerts,
      };

      const processingTime = Date.now() - startTime;
      logger.info("Extraction quality monitoring completed", {
        monitoringId: validatedInput.monitoringId,
        totalDocuments: summary.totalDocuments,
        errorRate: summary.errorRate,
        anomalyCount: anomalies.length,
        alertCount: alerts.length,
        processingTimeMs: processingTime
      });

      return result;

    } catch (error) {
      const processingTime = Date.now() - startTime;
      logger.error("Extraction quality monitoring failed", {
        monitoringId: payload.monitoringId,
        error: error instanceof Error ? error.message : "Unknown error",
        processingTimeMs: processingTime
      });
      throw error;
    }
  },
});

/**
 * Automated quality assurance task for continuous monitoring
 * Runs on a schedule to ensure consistent quality standards
 */
export const automatedQualityAssuranceTask = task({
  id: "automated-quality-assurance",
  maxDuration: 900, // 15 minutes
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 60000,
  },
  run: async (payload: {
    qaId: string;
    batchSize: number;
    qualityStandards: {
      minimumConfidence: number;
      requiredFields: string[];
      validationRules: Record<string, any>;
    };
    actions: {
      autoReprocess: boolean;
      flagForReview: boolean;
      notifyAdministrators: boolean;
    };
  }): Promise<{
    qaId: string;
    processedDocuments: number;
    qualityIssuesFound: number;
    actionsPerformed: {
      reprocessed: number;
      flaggedForReview: number;
      notificationsSent: number;
    };
    qualityReport: {
      overallScore: number;
      categoryScores: Record<string, number>;
      improvementAreas: string[];
    };
  }> => {
    logger.info("Starting automated quality assurance", {
      qaId: payload.qaId,
      batchSize: payload.batchSize
    });

    try {
      // Fetch documents that need quality assurance
      const documentsToCheck = await fetchDocumentsForQA(payload.batchSize);
      
      let qualityIssuesFound = 0;
      let reprocessed = 0;
      let flaggedForReview = 0;
      let notificationsSent = 0;
      
      const categoryScores: Record<string, number> = {};
      const improvementAreas: string[] = [];

      // Process each document for quality assurance
      for (const doc of documentsToCheck) {
        const qualityAssessment = await performQualityAssessment(doc, payload.qualityStandards);
        
        if (qualityAssessment.hasIssues) {
          qualityIssuesFound++;
          
          // Perform automated actions based on configuration
          if (payload.actions.autoReprocess && qualityAssessment.canReprocess) {
            await triggerReprocessing(doc.id);
            reprocessed++;
          }
          
          if (payload.actions.flagForReview) {
            await flagDocumentForReview(doc.id, qualityAssessment.issues);
            flaggedForReview++;
          }
          
          if (payload.actions.notifyAdministrators && qualityAssessment.severity === "critical") {
            await sendQualityAlert(doc.id, qualityAssessment);
            notificationsSent++;
          }
        }
        
        // Update category scores
        for (const [category, score] of Object.entries(qualityAssessment.categoryScores)) {
          categoryScores[category] = (categoryScores[category] || 0) + score;
        }
      }

      // Calculate overall quality score
      const overallScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 
                          (Object.keys(categoryScores).length * documentsToCheck.length);

      // Identify improvement areas
      for (const [category, totalScore] of Object.entries(categoryScores)) {
        const averageScore = totalScore / documentsToCheck.length;
        if (averageScore < 0.8) {
          improvementAreas.push(`${category} quality needs improvement (${(averageScore * 100).toFixed(1)}%)`);
        }
      }

      const result = {
        qaId: payload.qaId,
        processedDocuments: documentsToCheck.length,
        qualityIssuesFound,
        actionsPerformed: {
          reprocessed,
          flaggedForReview,
          notificationsSent,
        },
        qualityReport: {
          overallScore,
          categoryScores: Object.fromEntries(
            Object.entries(categoryScores).map(([k, v]) => [k, v / documentsToCheck.length])
          ),
          improvementAreas,
        },
      };

      logger.info("Automated quality assurance completed", {
        qaId: payload.qaId,
        processedDocuments: result.processedDocuments,
        qualityIssuesFound: result.qualityIssuesFound,
        overallScore: result.qualityReport.overallScore
      });

      return result;

    } catch (error) {
      logger.error("Automated quality assurance failed", {
        qaId: payload.qaId,
        error: error instanceof Error ? error.message : "Unknown error"
      });
      throw error;
    }
  },
});

/**
 * RAG integration task for quality-enhanced document indexing
 * Ensures only high-quality documents are indexed in the RAG system
 */
export const ragQualityIntegrationTask = task({
  id: "rag-quality-integration",
  maxDuration: 300, // 5 minutes
  retry: {
    maxAttempts: 3,
    factor: 1.5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 20000,
  },
  run: async (payload: {
    documentId: string;
    processingResult: DocumentProcessingResult;
    qualityValidation: QualityValidation;
    ragOptions: {
      chunkSize: number;
      chunkOverlap: number;
      embeddingModel: string;
      qualityThreshold: number;
    };
  }): Promise<RAGProcessedDocument> => {
    logger.info("Starting RAG quality integration", {
      documentId: payload.documentId,
      qualityScore: payload.qualityValidation.qualityScore
    });

    try {
      // Only proceed if document meets quality threshold
      if (payload.qualityValidation.qualityScore < payload.ragOptions.qualityThreshold) {
        throw new Error(`Document quality score ${payload.qualityValidation.qualityScore} below threshold ${payload.ragOptions.qualityThreshold}`);
      }

      // Generate embeddings for the processed content
      const { embedding } = await embed({
        model: openai.textEmbeddingModel(payload.ragOptions.embeddingModel as any),
        value: payload.processingResult.extractedContent,
      });

      // Create chunks if they don't exist
      const chunks = payload.processingResult.chunks || (await createQualityChunks(
        payload.processingResult.extractedContent,
        payload.ragOptions.chunkSize,
        payload.ragOptions.chunkOverlap
      ));

      // Generate embeddings for each chunk
      const chunkEmbeddings = await Promise.all(
        chunks.map(async (chunk) => {
          const { embedding: chunkEmbedding } = await embed({
            model: openai.textEmbeddingModel(payload.ragOptions.embeddingModel as any),
            value: chunk.content,
          });
          return { ...chunk, embedding: chunkEmbedding };
        })
      );

      // Create searchable fields from structured data
      const searchableFields = payload.processingResult.structuredData 
        ? Object.keys(payload.processingResult.structuredData).filter(key => 
            payload.processingResult.structuredData![key] !== null &&
            payload.processingResult.structuredData![key] !== undefined
          )
        : [];

      // Calculate vector similarity score (mock implementation)
      const vectorSimilarityScore = calculateVectorSimilarity(embedding);

      const ragDocument: RAGProcessedDocument = {
        id: payload.documentId,
        userId: payload.processingResult.originalDocument.source, // Mock user ID
        documentType: payload.processingResult.classification?.primaryCategory || "unknown",
        processingResult: {
          status: payload.processingResult.status,
          confidence: payload.processingResult.qualityMetrics.overallConfidence,
          extractedContent: payload.processingResult.extractedContent,
          structuredData: payload.processingResult.structuredData,
          qualityMetrics: payload.processingResult.qualityMetrics,
        },
        ragMetadata: {
          chunkCount: chunks.length,
          embeddingModel: payload.ragOptions.embeddingModel,
          indexedAt: new Date(),
          searchableFields,
          vectorSimilarityScore,
        },
        qualityAssessment: {
          automatedScore: payload.qualityValidation.qualityScore,
          manualReviewRequired: payload.qualityValidation.requiresManualReview,
          issues: payload.qualityValidation.issues.map(issue => issue.description),
          lastReviewedAt: new Date(),
        },
        createdAt: payload.processingResult.processedAt,
        updatedAt: new Date(),
      };

      // In a real implementation, this would:
      // 1. Store the document in the RAG database
      // 2. Index the chunks with their embeddings
      // 3. Update search indices
      // 4. Create metadata for retrieval

      logger.info("RAG quality integration completed", {
        documentId: payload.documentId,
        chunkCount: chunks.length,
        searchableFields: searchableFields.length,
        vectorSimilarityScore
      });

      return ragDocument;

    } catch (error) {
      logger.error("RAG quality integration failed", {
        documentId: payload.documentId,
        error: error instanceof Error ? error.message : "Unknown error"
      });
      throw error;
    }
  },
});

// Helper functions

async function fetchRAGProcessedDocuments(input: QualityMonitoringInput): Promise<RAGProcessedDocument[]> {
  // Mock implementation - in real system, query the RAG database
  logger.info("Fetching RAG processed documents", {
    timeRange: input.timeRange,
    documentTypes: input.documentTypes
  });
  
  // Return mock data for demonstration
  return [
    {
      id: "doc-1",
      userId: "user-1",
      documentType: "passport",
      processingResult: {
        status: "success",
        confidence: 0.95,
        extractedContent: "Mock passport content",
        qualityMetrics: {
          overallConfidence: 0.95,
          textQuality: 0.9,
          structureQuality: 0.95,
          completeness: 1.0,
        },
      },
      ragMetadata: {
        chunkCount: 5,
        embeddingModel: "text-embedding-3-small",
        indexedAt: new Date(),
        searchableFields: ["fullName", "passportNumber", "nationality"],
        vectorSimilarityScore: 0.92,
      },
      qualityAssessment: {
        automatedScore: 0.95,
        manualReviewRequired: false,
        issues: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more mock documents as needed
  ];
}

function calculateQualitySummary(documents: RAGProcessedDocument[]) {
  const totalDocuments = documents.length;
  const successfulProcessing = documents.filter(d => d.processingResult.status === "success").length;
  const failedProcessing = documents.filter(d => d.processingResult.status === "failed").length;
  
  const averageConfidence = documents.reduce((sum, doc) => sum + doc.processingResult.confidence, 0) / totalDocuments;
  const averageCompleteness = documents.reduce((sum, doc) => sum + doc.processingResult.qualityMetrics.completeness, 0) / totalDocuments;
  const errorRate = failedProcessing / totalDocuments;

  return {
    totalDocuments,
    successfulProcessing,
    failedProcessing,
    averageConfidence,
    averageCompleteness,
    errorRate,
  };
}

async function analyzeQualityTrends(documents: RAGProcessedDocument[], input: QualityMonitoringInput) {
  // Mock trend analysis - in real implementation, compare with historical data
  return {
    confidenceTrend: "stable" as const,
    errorRateTrend: "improving" as const,
    processingTimeTrend: "stable" as const,
  };
}

async function detectQualityAnomalies(documents: RAGProcessedDocument[], input: QualityMonitoringInput) {
  const anomalies = [];
  
  // Check for confidence anomalies
  const lowConfidenceCount = documents.filter(d => d.processingResult.confidence < 0.7).length;
  if (lowConfidenceCount > documents.length * 0.2) {
    anomalies.push({
      type: "low_confidence_spike",
      severity: "high" as const,
      description: `${lowConfidenceCount} documents have confidence below 70%`,
      affectedDocuments: lowConfidenceCount,
      recommendedAction: "Review processing pipeline and model performance",
    });
  }

  // Check for processing failures
  const failureCount = documents.filter(d => d.processingResult.status === "failed").length;
  if (failureCount > documents.length * 0.1) {
    anomalies.push({
      type: "high_failure_rate",
      severity: "critical" as const,
      description: `${failureCount} documents failed processing`,
      affectedDocuments: failureCount,
      recommendedAction: "Investigate processing pipeline issues immediately",
    });
  }

  return anomalies;
}

function generateQualityRecommendations(summary: any, trends: any, anomalies: any[]): string[] {
  const recommendations = [];

  if (summary.errorRate > 0.1) {
    recommendations.push("Error rate is above 10% - investigate processing pipeline");
  }

  if (summary.averageConfidence < 0.8) {
    recommendations.push("Average confidence is below 80% - consider model retraining");
  }

  if (anomalies.some(a => a.severity === "critical")) {
    recommendations.push("Critical anomalies detected - immediate attention required");
  }

  if (trends.confidenceTrend === "declining") {
    recommendations.push("Confidence trend is declining - monitor model performance");
  }

  return recommendations;
}

function checkQualityAlerts(summary: any, input: QualityMonitoringInput) {
  const alerts = [];
  const thresholds = input.monitoringOptions?.alertThresholds;

  if (thresholds?.criticalErrorRate && summary.errorRate > thresholds.criticalErrorRate) {
    alerts.push({
      type: "critical_error_rate",
      severity: "critical" as const,
      message: `Error rate ${(summary.errorRate * 100).toFixed(1)}% exceeds critical threshold ${(thresholds.criticalErrorRate * 100).toFixed(1)}%`,
      timestamp: new Date(),
    });
  }

  if (thresholds?.lowConfidenceRate && summary.averageConfidence < (1 - thresholds.lowConfidenceRate)) {
    alerts.push({
      type: "low_confidence",
      severity: "warning" as const,
      message: `Average confidence ${(summary.averageConfidence * 100).toFixed(1)}% is below acceptable threshold`,
      timestamp: new Date(),
    });
  }

  return alerts;
}

async function fetchDocumentsForQA(batchSize: number): Promise<RAGProcessedDocument[]> {
  // Mock implementation - fetch documents that need QA
  return [];
}

async function performQualityAssessment(doc: RAGProcessedDocument, standards: any) {
  // Mock quality assessment
  return {
    hasIssues: false,
    canReprocess: true,
    issues: [],
    severity: "low" as const,
    categoryScores: {
      accuracy: 0.9,
      completeness: 0.85,
      consistency: 0.92,
    },
  };
}

async function triggerReprocessing(documentId: string) {
  logger.info("Triggering document reprocessing", { documentId });
}

async function flagDocumentForReview(documentId: string, issues: string[]) {
  logger.info("Flagging document for manual review", { documentId, issues });
}

async function sendQualityAlert(documentId: string, assessment: any) {
  logger.info("Sending quality alert", { documentId, assessment });
}

async function createQualityChunks(content: string, chunkSize: number, overlap: number) {
  // Mock chunking implementation
  const words = content.split(/\s+/);
  const chunks = [];
  const wordsPerChunk = Math.floor(chunkSize / 4);
  const overlapWords = Math.floor(overlap / 4);

  for (let i = 0; i < words.length; i += wordsPerChunk - overlapWords) {
    const chunkWords = words.slice(i, i + wordsPerChunk);
    const chunkContent = chunkWords.join(' ');
    
    if (chunkContent.trim().length > 0) {
      chunks.push({
        id: `chunk-${chunks.length}`,
        content: chunkContent,
        chunkIndex: chunks.length,
        tokenCount: chunkWords.length,
        metadata: {
          startIndex: i,
          endIndex: Math.min(i + wordsPerChunk, words.length),
        }
      });
    }
  }

  return chunks;
}

function calculateVectorSimilarity(embedding: number[]): number {
  // Mock similarity calculation
  return 0.85 + Math.random() * 0.1; // Random score between 0.85-0.95
}