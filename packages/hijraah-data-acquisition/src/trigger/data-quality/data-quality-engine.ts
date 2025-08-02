/**
 * Data Quality Engine
 * 
 * Core engine for automated data validation using Firecrawl verification and AI SDK
 */

import { task } from "@trigger.dev/sdk/v3";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import FirecrawlApp from "@mendable/firecrawl-js";
import { createClient } from "@supabase/supabase-js";
import {
  dataValidationResultSchema,
  qualityAnomalySchema,
  dataFreshnessSchema,
  batchValidationRequestSchema,
} from "../../schemas/data-quality.js";
import type {
  DataQualityConfig,
  QualityAssessmentRequest,
  QualityAssessmentResponse,
  ValidationContext,
  QualityRecommendation,
  BatchProcessingResult,
} from "./types.js";

// Initialize services
const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Data quality assessment schema for AI
const qualityAssessmentSchema = z.object({
  overallScore: z.number().min(0).max(1).describe("Overall data quality score"),
  dimensions: z.object({
    accuracy: z.number().min(0).max(1).describe("Data accuracy score"),
    completeness: z.number().min(0).max(1).describe("Data completeness score"),
    consistency: z.number().min(0).max(1).describe("Data consistency score"),
    timeliness: z.number().min(0).max(1).describe("Data timeliness score"),
    validity: z.number().min(0).max(1).describe("Data validity score"),
  }),
  issues: z.array(z.object({
    type: z.enum(["error", "warning", "info"]),
    code: z.string(),
    message: z.string(),
    field: z.string().optional(),
    severity: z.enum(["critical", "high", "medium", "low"]),
    suggestion: z.string().optional(),
  })),
  anomalies: z.array(z.object({
    type: z.enum(["outlier", "inconsistency", "staleness", "corruption", "duplication"]),
    severity: z.enum(["critical", "high", "medium", "low"]),
    description: z.string(),
    confidence: z.number().min(0).max(1),
    affectedFields: z.array(z.string()),
    suggestedAction: z.enum(["quarantine", "flag", "auto_fix", "manual_review", "ignore"]),
  })),
  recommendations: z.array(z.object({
    type: z.enum(["improvement", "fix", "investigation", "monitoring"]),
    priority: z.enum(["low", "medium", "high", "critical"]),
    title: z.string(),
    description: z.string(),
    suggestedActions: z.array(z.string()),
    estimatedImpact: z.number().min(0).max(1),
    implementationComplexity: z.enum(["low", "medium", "high"]),
  })),
  confidence: z.number().min(0).max(1).describe("Confidence in the assessment"),
});

/**
 * Task 9.1: Automated Data Validation Engine
 * 
 * Implements comprehensive data validation using Firecrawl verification and AI SDK
 */
export const validateDataQualityTask = task({
  id: "validate-data-quality",
  description: "Validate data quality using Firecrawl verification and AI analysis",
  run: async (payload: QualityAssessmentRequest) => {
    const startTime = Date.now();
    
    try {
      // Step 1: Firecrawl source verification (if URL-based data)
      let sourceVerification = null;
      if (payload.context.sourceType === "web" && payload.data.url) {
        try {
          const scrapeResult = await firecrawl.scrapeUrl(payload.data.url, {
            formats: ["markdown", "html"],
            onlyMainContent: true,
            timeout: 30000,
          });
          
          sourceVerification = {
            isAccessible: scrapeResult.success,
            contentLength: scrapeResult.markdown?.length || 0,
            lastModified: scrapeResult.metadata?.lastModified,
            statusCode: scrapeResult.metadata?.statusCode,
            confidence: scrapeResult.success ? 0.9 : 0.1,
          };
        } catch (error) {
          sourceVerification = {
            isAccessible: false,
            error: error instanceof Error ? error.message : "Unknown error",
            confidence: 0.0,
          };
        }
      }

      // Step 2: AI-powered quality assessment
      const { object: assessment } = await generateObject({
        model: openai("gpt-4o"),
        schema: qualityAssessmentSchema,
        system: `You are a data quality expert specializing in immigration data validation.
        
        Analyze the provided data for:
        1. Accuracy - Is the data correct and error-free?
        2. Completeness - Are all required fields present?
        3. Consistency - Is the data consistent with expected formats and patterns?
        4. Timeliness - Is the data current and up-to-date?
        5. Validity - Does the data conform to business rules and constraints?
        
        Consider the data type: ${payload.context.dataType}
        Source type: ${payload.context.sourceType}
        Expected format: ${payload.context.expectedFormat}
        Business rules: ${payload.context.businessRules.join(", ")}
        
        Provide detailed analysis with specific issues, anomalies, and actionable recommendations.`,
        prompt: `Assess the quality of this data:
        
        Data: ${JSON.stringify(payload.data, null, 2)}
        
        Context: ${JSON.stringify(payload.context, null, 2)}
        
        Source verification: ${JSON.stringify(sourceVerification, null, 2)}
        
        Historical patterns: ${JSON.stringify(payload.context.historicalPatterns, null, 2)}`,
      });

      // Step 3: Pgvector similarity analysis for consistency checking
      let similarityAnalysis = null;
      if (payload.context.relatedData && Object.keys(payload.context.relatedData).length > 0) {
        try {
          // Generate embedding for current data
          const { object: embedding } = await generateObject({
            model: openai("text-embedding-3-small"),
            schema: z.object({
              embedding: z.array(z.number()),
            }),
            prompt: `Generate embedding for: ${JSON.stringify(payload.data)}`,
          });

          // Query similar data from database
          const { data: similarData } = await supabase.rpc('match_similar_data', {
            query_embedding: embedding.embedding,
            match_threshold: 0.8,
            match_count: 5,
          });

          similarityAnalysis = {
            similarDataFound: similarData?.length || 0,
            averageSimilarity: similarData?.reduce((acc: number, item: any) => acc + item.similarity, 0) / (similarData?.length || 1),
            consistencyScore: similarData?.length > 0 ? 0.9 : 0.5,
          };
        } catch (error) {
          console.warn("Similarity analysis failed:", error);
          similarityAnalysis = { error: "Similarity analysis unavailable" };
        }
      }

      // Step 4: Compile validation results
      const validationResults = assessment.dimensions;
      const processingTime = Date.now() - startTime;

      // Step 5: Store results in database
      const validationResult = {
        dataId: payload.dataId,
        sourceId: payload.sourceId,
        validationType: "comprehensive",
        isValid: assessment.overallScore >= 0.7,
        confidenceScore: assessment.confidence,
        qualityScore: assessment.overallScore,
        issues: assessment.issues,
        metrics: validationResults,
        validatedAt: new Date(),
        validatedBy: "ai" as const,
        metadata: {
          processingTime,
          aiModel: "gpt-4o",
          sourceVerification,
          similarityAnalysis,
        },
      };

      // Store in database
      await supabase.from('data_validation_results').insert(validationResult);

      // Step 6: Create anomaly records if needed
      if (assessment.anomalies.length > 0) {
        const anomalyRecords = assessment.anomalies.map(anomaly => ({
          id: `${payload.dataId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          dataId: payload.dataId,
          sourceId: payload.sourceId,
          anomalyType: anomaly.type,
          severity: anomaly.severity,
          description: anomaly.description,
          detectedAt: new Date(),
          detectionMethod: "ai" as const,
          confidence: anomaly.confidence,
          affectedFields: anomaly.affectedFields,
          suggestedAction: anomaly.suggestedAction,
          status: "detected" as const,
          metadata: { aiAssessment: assessment },
        }));

        await supabase.from('quality_anomalies').insert(anomalyRecords);
      }

      // Step 7: Update source quality metrics
      await updateSourceQualityMetrics(payload.sourceId, assessment.overallScore);

      const response: QualityAssessmentResponse = {
        dataId: payload.dataId,
        overallScore: assessment.overallScore,
        validationResults: [validationResult],
        anomalies: assessment.anomalies.map(a => ({
          id: `${payload.dataId}-${Date.now()}`,
          dataId: payload.dataId,
          sourceId: payload.sourceId,
          anomalyType: a.type,
          severity: a.severity,
          description: a.description,
          detectedAt: new Date(),
          detectionMethod: "ai" as const,
          confidence: a.confidence,
          affectedFields: a.affectedFields,
          suggestedAction: a.suggestedAction,
          status: "detected" as const,
        })),
        recommendations: assessment.recommendations,
        metadata: {
          processingTime,
          aiModel: "gpt-4o",
          validationMethods: ["ai_analysis", "source_verification", "similarity_check"],
          confidence: assessment.confidence,
        },
      };

      return response;

    } catch (error) {
      console.error("Data quality validation failed:", error);
      
      // Create error validation result
      const errorResult = {
        dataId: payload.dataId,
        sourceId: payload.sourceId,
        validationType: "error",
        isValid: false,
        confidenceScore: 0,
        qualityScore: 0,
        issues: [{
          type: "error" as const,
          code: "VALIDATION_FAILED",
          message: error instanceof Error ? error.message : "Unknown validation error",
          severity: "critical" as const,
        }],
        metrics: {
          accuracy: 0,
          completeness: 0,
          consistency: 0,
          timeliness: 0,
          validity: 0,
        },
        validatedAt: new Date(),
        validatedBy: "system" as const,
        metadata: { error: error instanceof Error ? error.message : "Unknown error" },
      };

      return {
        dataId: payload.dataId,
        overallScore: 0,
        validationResults: [errorResult],
        anomalies: [],
        recommendations: [{
          type: "investigation" as const,
          priority: "critical" as const,
          title: "Validation System Error",
          description: "Data validation failed due to system error",
          suggestedActions: ["Check system logs", "Retry validation", "Manual review"],
          estimatedImpact: 0.9,
          implementationComplexity: "medium" as const,
        }],
        metadata: {
          processingTime: Date.now() - startTime,
          aiModel: "error",
          validationMethods: ["error_handling"],
          confidence: 0,
        },
      };
    }
  },
});

/**
 * Batch Data Quality Validation Task
 * 
 * Processes multiple data items in parallel for efficiency
 */
export const batchValidateDataQualityTask = task({
  id: "batch-validate-data-quality",
  description: "Batch validate multiple data items for quality",
  run: async (payload: { requests: QualityAssessmentRequest[] }) => {
    const startTime = Date.now();
    const batchId = `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Process in parallel with concurrency limit
      const BATCH_SIZE = 5;
      const results: QualityAssessmentResponse[] = [];
      const errors: Array<{ dataId: string; error: string; timestamp: Date }> = [];

      for (let i = 0; i < payload.requests.length; i += BATCH_SIZE) {
        const batch = payload.requests.slice(i, i + BATCH_SIZE);
        
        const batchPromises = batch.map(async (request) => {
          try {
            return await validateDataQualityTask.trigger(request);
          } catch (error) {
            errors.push({
              dataId: request.dataId,
              error: error instanceof Error ? error.message : "Unknown error",
              timestamp: new Date(),
            });
            return null;
          }
        });

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults.filter(r => r !== null) as QualityAssessmentResponse[]);
      }

      const processingTime = Date.now() - startTime;
      
      const batchResult: BatchProcessingResult = {
        batchId,
        totalItems: payload.requests.length,
        processedItems: results.length + errors.length,
        successfulItems: results.length,
        failedItems: errors.length,
        results,
        errors,
        processingTime,
        startedAt: new Date(startTime),
        completedAt: new Date(),
      };

      // Store batch result
      await supabase.from('batch_processing_results').insert({
        batch_id: batchId,
        batch_type: 'data_quality_validation',
        total_items: batchResult.totalItems,
        successful_items: batchResult.successfulItems,
        failed_items: batchResult.failedItems,
        processing_time_ms: processingTime,
        started_at: batchResult.startedAt,
        completed_at: batchResult.completedAt,
        metadata: { results: batchResult },
      });

      return batchResult;

    } catch (error) {
      console.error("Batch validation failed:", error);
      throw error;
    }
  },
});

/**
 * Helper function to update source quality metrics
 */
async function updateSourceQualityMetrics(sourceId: string, qualityScore: number) {
  try {
    // Get current source metrics
    const { data: currentMetrics } = await supabase
      .from('data_source_quality')
      .select('*')
      .eq('source_id', sourceId)
      .single();

    if (currentMetrics) {
      // Update existing metrics with weighted average
      const newValidationCount = currentMetrics.validation_count + 1;
      const newOverallScore = (
        (currentMetrics.overall_quality_score * currentMetrics.validation_count) + qualityScore
      ) / newValidationCount;

      await supabase
        .from('data_source_quality')
        .update({
          overall_quality_score: newOverallScore,
          validation_count: newValidationCount,
          last_validated: new Date().toISOString(),
        })
        .eq('source_id', sourceId);
    } else {
      // Create new metrics record
      await supabase.from('data_source_quality').insert({
        source_id: sourceId,
        overall_quality_score: qualityScore,
        validation_count: 1,
        error_count: qualityScore < 0.5 ? 1 : 0,
        last_validated: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.warn("Failed to update source quality metrics:", error);
  }
}

/**
 * Data Freshness Monitoring Task
 * 
 * Monitors data freshness using Firecrawl real-time scraping and Supabase subscriptions
 */
export const monitorDataFreshnessTask = task({
  id: "monitor-data-freshness",
  description: "Monitor data freshness and detect stale data",
  run: async (payload: { sourceIds?: string[]; checkAll?: boolean }) => {
    try {
      // Get sources to check
      let query = supabase.from('data_sources').select('*');
      
      if (payload.sourceIds && payload.sourceIds.length > 0) {
        query = query.in('id', payload.sourceIds);
      }

      const { data: sources } = await query;
      
      if (!sources || sources.length === 0) {
        return { message: "No sources to check", checkedSources: 0 };
      }

      const freshnessResults = [];

      for (const source of sources) {
        try {
          // Check if source has URL for freshness verification
          if (source.url) {
            const scrapeResult = await firecrawl.scrapeUrl(source.url, {
              formats: ["metadata"],
              timeout: 10000,
            });

            const lastModified = scrapeResult.metadata?.lastModified 
              ? new Date(scrapeResult.metadata.lastModified)
              : null;

            const now = new Date();
            const hoursSinceUpdate = lastModified 
              ? (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60)
              : null;

            // Calculate freshness score based on expected update frequency
            const expectedFrequencyHours = parseFrequency(source.update_frequency || "0 0 * * *"); // daily default
            const freshnessScore = hoursSinceUpdate !== null 
              ? Math.max(0, 1 - (hoursSinceUpdate / (expectedFrequencyHours * 2)))
              : 0.5;

            const isStale = hoursSinceUpdate !== null && hoursSinceUpdate > expectedFrequencyHours * 1.5;

            const freshnessData = {
              dataId: source.id,
              sourceId: source.id,
              dataType: source.type,
              lastUpdated: lastModified || source.updated_at,
              expectedUpdateFrequency: source.update_frequency,
              freshnessScore,
              isStale,
              stalenessThreshold: expectedFrequencyHours * 1.5,
              timesSinceUpdate: hoursSinceUpdate || 0,
              alertThreshold: expectedFrequencyHours * 2,
              shouldAlert: isStale && freshnessScore < 0.3,
              metadata: {
                scrapeSuccess: scrapeResult.success,
                lastModifiedFromSource: lastModified?.toISOString(),
              },
            };

            // Store freshness data
            await supabase.from('data_freshness').upsert({
              data_id: freshnessData.dataId,
              source_id: freshnessData.sourceId,
              data_type: freshnessData.dataType,
              last_updated: freshnessData.lastUpdated,
              expected_update_frequency: freshnessData.expectedUpdateFrequency,
              freshness_score: freshnessData.freshnessScore,
              is_stale: freshnessData.isStale,
              staleness_threshold_hours: freshnessData.stalenessThreshold,
              hours_since_update: freshnessData.timesSinceUpdate,
              alert_threshold_hours: freshnessData.alertThreshold,
              should_alert: freshnessData.shouldAlert,
              metadata: freshnessData.metadata,
            });

            freshnessResults.push(freshnessData);

            // Create alert if needed
            if (freshnessData.shouldAlert) {
              await createFreshnessAlert(source, freshnessData);
            }

          } else {
            // For non-URL sources, check database timestamps
            const { data: recentData } = await supabase
              .from('scraped_data')
              .select('updated_at')
              .eq('source_id', source.id)
              .order('updated_at', { ascending: false })
              .limit(1);

            if (recentData && recentData.length > 0) {
              const lastUpdate = new Date(recentData[0].updated_at);
              const hoursSinceUpdate = (new Date().getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
              const expectedFrequencyHours = parseFrequency(source.update_frequency || "0 0 * * *");
              const freshnessScore = Math.max(0, 1 - (hoursSinceUpdate / (expectedFrequencyHours * 2)));
              const isStale = hoursSinceUpdate > expectedFrequencyHours * 1.5;

              const freshnessData = {
                dataId: source.id,
                sourceId: source.id,
                dataType: source.type,
                lastUpdated: lastUpdate,
                expectedUpdateFrequency: source.update_frequency,
                freshnessScore,
                isStale,
                stalenessThreshold: expectedFrequencyHours * 1.5,
                timesSinceUpdate: hoursSinceUpdate,
                alertThreshold: expectedFrequencyHours * 2,
                shouldAlert: isStale && freshnessScore < 0.3,
                metadata: { checkType: "database_timestamp" },
              };

              await supabase.from('data_freshness').upsert({
                data_id: freshnessData.dataId,
                source_id: freshnessData.sourceId,
                data_type: freshnessData.dataType,
                last_updated: freshnessData.lastUpdated,
                expected_update_frequency: freshnessData.expectedUpdateFrequency,
                freshness_score: freshnessData.freshnessScore,
                is_stale: freshnessData.isStale,
                staleness_threshold_hours: freshnessData.stalenessThreshold,
                hours_since_update: freshnessData.timesSinceUpdate,
                alert_threshold_hours: freshnessData.alertThreshold,
                should_alert: freshnessData.shouldAlert,
                metadata: freshnessData.metadata,
              });

              freshnessResults.push(freshnessData);

              if (freshnessData.shouldAlert) {
                await createFreshnessAlert(source, freshnessData);
              }
            }
          }
        } catch (error) {
          console.error(`Freshness check failed for source ${source.id}:`, error);
        }
      }

      return {
        checkedSources: sources.length,
        staleDataFound: freshnessResults.filter(r => r.isStale).length,
        averageFreshnessScore: freshnessResults.reduce((acc, r) => acc + r.freshnessScore, 0) / freshnessResults.length,
        alertsCreated: freshnessResults.filter(r => r.shouldAlert).length,
        results: freshnessResults,
      };

    } catch (error) {
      console.error("Data freshness monitoring failed:", error);
      throw error;
    }
  },
});

/**
 * Helper function to parse cron frequency to hours
 */
function parseFrequency(cronExpression: string): number {
  // Simple parsing for common patterns
  // This is a simplified version - in production, use a proper cron parser
  if (cronExpression.includes("* * * * *")) return 1/60; // every minute
  if (cronExpression.includes("0 * * * *")) return 1; // hourly
  if (cronExpression.includes("0 0 * * *")) return 24; // daily
  if (cronExpression.includes("0 0 * * 0")) return 24 * 7; // weekly
  if (cronExpression.includes("0 0 1 * *")) return 24 * 30; // monthly
  
  return 24; // default to daily
}

/**
 * Helper function to create freshness alerts
 */
async function createFreshnessAlert(source: any, freshnessData: any) {
  const alert = {
    id: `freshness-${source.id}-${Date.now()}`,
    type: "staleness_warning",
    severity: freshnessData.freshnessScore < 0.1 ? "critical" : "warning",
    title: `Stale Data Detected: ${source.name}`,
    description: `Data source "${source.name}" has not been updated for ${Math.round(freshnessData.timesSinceUpdate)} hours, exceeding the expected frequency.`,
    affected_data: {
      dataIds: [source.id],
      sourceIds: [source.id],
      count: 1,
    },
    metrics: {
      currentScore: freshnessData.freshnessScore,
      previousScore: 1.0,
      threshold: 0.3,
      trend: "declining",
    },
    suggested_actions: [
      "Check source availability",
      "Verify scraping configuration",
      "Update data collection schedule",
      "Investigate source changes",
    ],
    alerted_at: new Date(),
    metadata: {
      sourceType: source.type,
      lastUpdate: freshnessData.lastUpdated,
      expectedFrequency: freshnessData.expectedUpdateFrequency,
    },
  };

  await supabase.from('quality_alerts').insert(alert);
}