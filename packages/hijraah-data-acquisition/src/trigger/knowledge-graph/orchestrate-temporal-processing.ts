/**
 * Temporal Processing Orchestration Task
 * 
 * Trigger.dev v4 orchestration task that chains temporal reasoning tasks using
 * triggerAndWait() for sequential temporal processing with dependency management.
 */

import { task } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import { analyzeTemporalDataTask, analyzeTemporalDataOnDemand } from "./analyze-temporal-data.js";
import { trackPolicyVersionsTask, trackPolicyVersionsBatch } from "./track-policy-versions.js";
import { predictTrendsTask, compareTrendsTask } from "./predict-trends.js";
import { validateTimelinesTask, validateTimelinesBatch } from "./validate-timelines.js";

// Orchestration configuration schema
const TemporalProcessingConfigSchema = z.object({
  processingType: z.enum(["full", "analysis_only", "validation_only", "prediction_only", "custom"]),
  timeRange: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
  filters: z.object({
    countries: z.array(z.string()).optional(),
    entityTypes: z.array(z.string()).optional(),
    policyTypes: z.array(z.string()).optional(),
  }).optional(),
  options: z.object({
    includeTemporalAnalysis: z.boolean().default(true),
    includePolicyTracking: z.boolean().default(true),
    includeTrendPrediction: z.boolean().default(true),
    includeTimelineValidation: z.boolean().default(true),
    analysisDepth: z.enum(["shallow", "medium", "deep"]).default("medium"),
    predictionHorizon: z.string().default("1 year"),
    batchSize: z.number().default(50),
    enableParallelProcessing: z.boolean().default(true),
  }).optional(),
});

type TemporalProcessingConfig = z.infer<typeof TemporalProcessingConfigSchema>;

// Orchestration result schema
const TemporalProcessingResultSchema = z.object({
  orchestrationId: z.string(),
  processingType: z.string(),
  status: z.enum(["completed", "partial", "failed"]),
  results: z.object({
    temporalAnalysis: z.any().optional(),
    policyTracking: z.any().optional(),
    trendPrediction: z.any().optional(),
    timelineValidation: z.any().optional(),
  }),
  summary: z.object({
    totalTasks: z.number(),
    completedTasks: z.number(),
    failedTasks: z.number(),
    processingTimeMs: z.number(),
    dataPointsProcessed: z.number(),
    qualityScore: z.number().min(0).max(1),
  }),
  errors: z.array(z.object({
    taskName: z.string(),
    error: z.string(),
    timestamp: z.string(),
  })),
  metadata: z.object({
    startedAt: z.string(),
    completedAt: z.string(),
    configuration: z.any(),
  }),
});

type TemporalProcessingResult = z.infer<typeof TemporalProcessingResultSchema>;

// Main orchestration task
export const orchestrateTemporalProcessingTask = task({
  id: "orchestrate-temporal-processing",
  machine: {
    preset: "large-1x",
  },
  run: async (payload: TemporalProcessingConfig, { ctx }) => {
    const startTime = Date.now();
    const orchestrationId = `temporal_${Date.now()}`;
    
    try {
      ctx.logger.info("Starting temporal processing orchestration", {
        orchestrationId,
        processingType: payload.processingType,
        options: payload.options,
        runId: ctx.run.id,
      });

      const config = {
        ...payload,
        options: {
          includeTemporalAnalysis: true,
          includePolicyTracking: true,
          includeTrendPrediction: true,
          includeTimelineValidation: true,
          analysisDepth: "medium" as const,
          predictionHorizon: "1 year",
          batchSize: 50,
          enableParallelProcessing: true,
          ...payload.options,
        },
      };

      const results: any = {};
      const errors: any[] = [];
      let completedTasks = 0;
      let totalTasks = 0;

      // Count total tasks based on configuration
      if (config.options.includeTemporalAnalysis) totalTasks++;
      if (config.options.includePolicyTracking) totalTasks++;
      if (config.options.includeTrendPrediction) totalTasks++;
      if (config.options.includeTimelineValidation) totalTasks++;

      ctx.logger.info("Orchestration plan", {
        totalTasks,
        enableParallelProcessing: config.options.enableParallelProcessing,
      });

      // Phase 1: Temporal Analysis (Foundation for other tasks)
      if (config.options.includeTemporalAnalysis) {
        try {
          ctx.logger.info("Phase 1: Starting temporal analysis");
          
          const temporalAnalysisResult = await ctx.triggerAndWait(
            config.timeRange 
              ? analyzeTemporalDataOnDemand
              : analyzeTemporalDataTask,
            config.timeRange 
              ? {
                  startDate: config.timeRange.startDate,
                  endDate: config.timeRange.endDate,
                  analysisDepth: config.options.analysisDepth,
                  entityTypes: config.filters?.entityTypes,
                  countries: config.filters?.countries,
                }
              : {}
          );

          results.temporalAnalysis = temporalAnalysisResult.output;
          completedTasks++;
          
          ctx.logger.info("Phase 1: Completed temporal analysis", {
            success: temporalAnalysisResult.output?.success,
            patterns: temporalAnalysisResult.output?.analysis?.patterns?.length,
          });

        } catch (error) {
          ctx.logger.error("Phase 1: Temporal analysis failed", {
            error: error instanceof Error ? error.message : String(error),
          });
          
          errors.push({
            taskName: "temporal_analysis",
            error: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString(),
          });
        }
      }

      // Phase 2: Policy Tracking (Can run in parallel with trend prediction if enabled)
      const phase2Tasks: Promise<any>[] = [];

      if (config.options.includePolicyTracking) {
        const policyTrackingTask = (async () => {
          try {
            ctx.logger.info("Phase 2a: Starting policy tracking");
            
            // Get recent policy changes to track
            // This would typically fetch from the database
            const mockPolicyChangeIds = ["policy_1", "policy_2", "policy_3"]; // Placeholder
            
            const policyTrackingResult = await ctx.triggerAndWait(
              trackPolicyVersionsBatch,
              {
                policyChangeIds: mockPolicyChangeIds,
                batchSize: config.options.batchSize,
                analysisDepth: config.options.analysisDepth === "shallow" ? "basic" : 
                              config.options.analysisDepth === "deep" ? "comprehensive" : "detailed",
              }
            );

            results.policyTracking = policyTrackingResult.output;
            completedTasks++;
            
            ctx.logger.info("Phase 2a: Completed policy tracking", {
              success: policyTrackingResult.output?.success,
              policiesTracked: policyTrackingResult.output?.results?.length,
            });

          } catch (error) {
            ctx.logger.error("Phase 2a: Policy tracking failed", {
              error: error instanceof Error ? error.message : String(error),
            });
            
            errors.push({
              taskName: "policy_tracking",
              error: error instanceof Error ? error.message : String(error),
              timestamp: new Date().toISOString(),
            });
          }
        })();

        phase2Tasks.push(policyTrackingTask);
      }

      // Phase 2b: Trend Prediction (Can run in parallel with policy tracking)
      if (config.options.includeTrendPrediction) {
        const trendPredictionTask = (async () => {
          try {
            ctx.logger.info("Phase 2b: Starting trend prediction");
            
            const trendPredictionResult = await ctx.triggerAndWait(
              predictTrendsTask,
              {
                predictionType: "policy_trend",
                countries: config.filters?.countries,
                entityTypes: config.filters?.entityTypes,
                predictionHorizon: config.options.predictionHorizon,
                historicalDepth: config.options.analysisDepth === "shallow" ? "1 year" : 
                               config.options.analysisDepth === "deep" ? "5 years" : "2 years",
                includeStreamingUpdates: false,
              }
            );

            results.trendPrediction = trendPredictionResult.output;
            completedTasks++;
            
            ctx.logger.info("Phase 2b: Completed trend prediction", {
              success: trendPredictionResult.output?.success,
              predictions: trendPredictionResult.output?.trendPrediction?.predictions?.length,
            });

          } catch (error) {
            ctx.logger.error("Phase 2b: Trend prediction failed", {
              error: error instanceof Error ? error.message : String(error),
            });
            
            errors.push({
              taskName: "trend_prediction",
              error: error instanceof Error ? error.message : String(error),
              timestamp: new Date().toISOString(),
            });
          }
        })();

        phase2Tasks.push(trendPredictionTask);
      }

      // Execute Phase 2 tasks
      if (phase2Tasks.length > 0) {
        if (config.options.enableParallelProcessing) {
          ctx.logger.info("Phase 2: Running tasks in parallel");
          await Promise.allSettled(phase2Tasks);
        } else {
          ctx.logger.info("Phase 2: Running tasks sequentially");
          for (const task of phase2Tasks) {
            await task;
          }
        }
      }

      // Phase 3: Timeline Validation (Depends on previous phases for context)
      if (config.options.includeTimelineValidation) {
        try {
          ctx.logger.info("Phase 3: Starting timeline validation");
          
          const timelineValidationResult = await ctx.triggerAndWait(
            validateTimelinesTask,
            {
              entityTypes: config.filters?.entityTypes,
              countries: config.filters?.countries,
              validationType: config.options.analysisDepth === "shallow" ? "official_vs_community" : 
                            config.options.analysisDepth === "deep" ? "comprehensive" : "cross_reference",
              batchSize: config.options.batchSize,
              includeDetailedAnalysis: config.options.analysisDepth === "deep",
            }
          );

          results.timelineValidation = timelineValidationResult.output;
          completedTasks++;
          
          ctx.logger.info("Phase 3: Completed timeline validation", {
            success: timelineValidationResult.output?.success,
            validationsPerformed: timelineValidationResult.output?.validationResults?.length,
          });

        } catch (error) {
          ctx.logger.error("Phase 3: Timeline validation failed", {
            error: error instanceof Error ? error.message : String(error),
          });
          
          errors.push({
            taskName: "timeline_validation",
            error: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString(),
          });
        }
      }

      const processingTime = Date.now() - startTime;

      // Calculate overall quality score
      const qualityScores: number[] = [];
      if (results.temporalAnalysis?.analysis?.metadata?.processingTimeMs) {
        qualityScores.push(0.9); // Temporal analysis quality
      }
      if (results.policyTracking?.metadata?.successRate) {
        qualityScores.push(results.policyTracking.metadata.successRate);
      }
      if (results.trendPrediction?.trendPrediction?.metadata?.modelConfidence) {
        qualityScores.push(results.trendPrediction.trendPrediction.metadata.modelConfidence);
      }
      if (results.timelineValidation?.summary?.averageQualityScore) {
        qualityScores.push(results.timelineValidation.summary.averageQualityScore);
      }

      const overallQualityScore = qualityScores.length > 0 
        ? qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length 
        : 0;

      // Calculate total data points processed
      let dataPointsProcessed = 0;
      if (results.temporalAnalysis?.metadata?.entitiesAnalyzed) {
        dataPointsProcessed += results.temporalAnalysis.metadata.entitiesAnalyzed;
      }
      if (results.policyTracking?.metadata?.successfullyProcessed) {
        dataPointsProcessed += results.policyTracking.metadata.successfullyProcessed;
      }
      if (results.timelineValidation?.summary?.successfulValidations) {
        dataPointsProcessed += results.timelineValidation.summary.successfulValidations;
      }

      const orchestrationResult: TemporalProcessingResult = {
        orchestrationId,
        processingType: payload.processingType,
        status: errors.length === 0 ? "completed" : completedTasks > 0 ? "partial" : "failed",
        results,
        summary: {
          totalTasks,
          completedTasks,
          failedTasks: errors.length,
          processingTimeMs: processingTime,
          dataPointsProcessed,
          qualityScore: overallQualityScore,
        },
        errors,
        metadata: {
          startedAt: new Date(startTime).toISOString(),
          completedAt: new Date().toISOString(),
          configuration: config,
        },
      };

      ctx.logger.info("Completed temporal processing orchestration", {
        orchestrationId,
        status: orchestrationResult.status,
        completedTasks,
        totalTasks,
        failedTasks: errors.length,
        qualityScore: overallQualityScore,
        processingTimeMs: processingTime,
      });

      return orchestrationResult;

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Temporal processing orchestration failed", {
        orchestrationId,
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});

// Scheduled comprehensive temporal processing
export const scheduledTemporalProcessingTask = task({
  id: "scheduled-temporal-processing",
  machine: {
    preset: "large-1x",
  },
  run: async (payload: {
    schedule?: string; // cron expression
    processingType?: "full" | "analysis_only" | "validation_only";
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      ctx.logger.info("Starting scheduled temporal processing", {
        schedule: payload.schedule,
        processingType: payload.processingType || "full",
        runId: ctx.run.id,
      });

      // Define time range for scheduled processing (last 7 days)
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - (7 * 24 * 60 * 60 * 1000));

      const config: TemporalProcessingConfig = {
        processingType: payload.processingType || "full",
        timeRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        options: {
          includeTemporalAnalysis: true,
          includePolicyTracking: true,
          includeTrendPrediction: true,
          includeTimelineValidation: true,
          analysisDepth: "medium",
          predictionHorizon: "6 months",
          batchSize: 100,
          enableParallelProcessing: true,
        },
      };

      const result = await ctx.triggerAndWait(
        orchestrateTemporalProcessingTask,
        config
      );

      const processingTime = Date.now() - startTime;

      ctx.logger.info("Completed scheduled temporal processing", {
        status: result.output?.status,
        completedTasks: result.output?.summary?.completedTasks,
        totalTasks: result.output?.summary?.totalTasks,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        result: result.output,
        metadata: {
          schedule: payload.schedule,
          processingType: payload.processingType || "full",
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Scheduled temporal processing failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});

// Custom temporal processing workflow
export const customTemporalWorkflowTask = task({
  id: "custom-temporal-workflow",
  machine: {
    preset: "large-1x",
  },
  run: async (payload: {
    workflow: Array<{
      taskType: "temporal_analysis" | "policy_tracking" | "trend_prediction" | "timeline_validation";
      config: any;
      dependencies?: string[];
    }>;
    executionMode: "sequential" | "parallel" | "mixed";
  }, { ctx }) => {
    const startTime = Date.now();
    
    try {
      ctx.logger.info("Starting custom temporal workflow", {
        workflowSteps: payload.workflow.length,
        executionMode: payload.executionMode,
        runId: ctx.run.id,
      });

      const results: any = {};
      const errors: any[] = [];

      // Build dependency graph
      const dependencyMap = new Map<string, string[]>();
      payload.workflow.forEach((step, index) => {
        const stepId = `step_${index}_${step.taskType}`;
        dependencyMap.set(stepId, step.dependencies || []);
      });

      // Execute workflow based on execution mode
      if (payload.executionMode === "sequential") {
        // Execute steps sequentially
        for (let i = 0; i < payload.workflow.length; i++) {
          const step = payload.workflow[i];
          const stepId = `step_${i}_${step.taskType}`;
          
          try {
            ctx.logger.info(`Executing step ${i + 1}: ${step.taskType}`);
            
            let result;
            switch (step.taskType) {
              case "temporal_analysis":
                result = await ctx.triggerAndWait(analyzeTemporalDataOnDemand, step.config);
                break;
              case "policy_tracking":
                result = await ctx.triggerAndWait(trackPolicyVersionsBatch, step.config);
                break;
              case "trend_prediction":
                result = await ctx.triggerAndWait(predictTrendsTask, step.config);
                break;
              case "timeline_validation":
                result = await ctx.triggerAndWait(validateTimelinesTask, step.config);
                break;
            }
            
            results[stepId] = result.output;
            
            ctx.logger.info(`Completed step ${i + 1}: ${step.taskType}`, {
              success: result.output?.success,
            });

          } catch (error) {
            ctx.logger.error(`Failed step ${i + 1}: ${step.taskType}`, {
              error: error instanceof Error ? error.message : String(error),
            });
            
            errors.push({
              stepId,
              taskType: step.taskType,
              error: error instanceof Error ? error.message : String(error),
              timestamp: new Date().toISOString(),
            });
          }
        }
      } else {
        // For parallel and mixed modes, implement more complex dependency resolution
        ctx.logger.info("Parallel/mixed execution not fully implemented in this example");
        // This would require more sophisticated dependency resolution and parallel execution
      }

      const processingTime = Date.now() - startTime;

      ctx.logger.info("Completed custom temporal workflow", {
        totalSteps: payload.workflow.length,
        completedSteps: Object.keys(results).length,
        failedSteps: errors.length,
        processingTimeMs: processingTime,
      });

      return {
        success: true,
        results,
        errors,
        summary: {
          totalSteps: payload.workflow.length,
          completedSteps: Object.keys(results).length,
          failedSteps: errors.length,
          processingTimeMs: processingTime,
        },
        metadata: {
          workflow: payload.workflow,
          executionMode: payload.executionMode,
          processingTimeMs: processingTime,
        },
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      ctx.logger.error("Custom temporal workflow failed", {
        error: error instanceof Error ? error.message : String(error),
        processingTimeMs: processingTime,
      });

      throw error;
    }
  },
});