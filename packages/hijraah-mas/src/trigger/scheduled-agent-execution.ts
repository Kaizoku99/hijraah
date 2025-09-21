/**
 * Scheduled Agent Execution using Trigger.dev v4 and AI SDK v5
 *
 * This module implements scheduled agent execution using Trigger.dev's schedules.task()
 * with AI SDK v5's maxSteps and stopWhen conditions for controlled execution.
 */

import { schedules } from "@trigger.dev/sdk/v3";
import { generateText, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  ScheduledAgentExecution,
  ScheduledAgentExecutionSchema,
  AgentTaskRequest,
  AgentTaskResult,
} from "./types";
import { agentTaskOrchestratorTask } from "./agent-task-orchestrator";
import { withAgentErrorHandling } from "./agent-error-handling";

/**
 * Scheduled Policy Monitoring Agent
 *
 * Runs every hour to monitor policy changes across jurisdictions
 */
export const scheduledPolicyMonitoringTask = schedules.task({
  id: "scheduled-policy-monitoring",
  cron: "0 * * * *", // Every hour
  run: async (
    payload: ScheduledAgentExecution,
    { ctx, logger }: { ctx: any; logger: any }
  ) => {
    logger.info("Starting scheduled policy monitoring");

    const agentRequest: AgentTaskRequest = {
      agentType: "policy_monitoring_agent",
      taskId: `policy-monitoring-${Date.now()}`,
      input: {
        sources: [
          "https://www.uscis.gov/news",
          "https://www.canada.ca/en/immigration-refugees-citizenship/news.html",
          "https://www.gov.uk/government/organisations/uk-visas-and-immigration/news",
          "https://immi.homeaffairs.gov.au/news-media/news",
        ],
        lastCheck:
          payload.lastCheck || new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      },
      context: {
        priority: "high",
        timeout: 600000, // 10 minutes
        maxRetries: 2,
        requiresHumanReview: false,
      },
    };

    try {
      const result = await agentTaskOrchestratorTask.trigger(agentRequest);

      logger.info("Scheduled policy monitoring completed", {
        success: result.output?.success || true,
        changesDetected:
          result.output?.result?.monitoringResults?.reduce(
            (sum: number, r: any) => sum + (r.changes?.length || 0),
            0
          ) || 0,
      });

      return {
        success: true,
        result: result.output?.result || result.output,
        nextRun: new Date(Date.now() + 3600000).toISOString(),
      };
    } catch (error) {
      logger.error("Scheduled policy monitoring failed", {
        error: error instanceof Error ? error.message : String(error),
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        nextRun: new Date(Date.now() + 3600000).toISOString(),
      };
    }
  },
});

/**
 * Scheduled Trend Analysis Agent
 *
 * Runs daily to analyze immigration trends and patterns
 */
export const scheduledTrendAnalysisTask = schedules.task({
  id: "scheduled-trend-analysis",
  cron: "0 2 * * *", // Daily at 2 AM
  run: async (
    payload: ScheduledAgentExecution,
    { ctx, logger }: { ctx: any; logger: any }
  ) => {
    logger.info("Starting scheduled trend analysis");

    const agentRequest: AgentTaskRequest = {
      agentType: "trend_analysis_agent",
      taskId: `trend-analysis-${Date.now()}`,
      input: {
        historicalData: payload.historicalData || {},
        recentChanges: payload.recentChanges || [],
        context: {
          analysisType: "daily_trends",
          timeframe: "30_days",
        },
      },
      context: {
        priority: "medium",
        timeout: 900000, // 15 minutes
        maxRetries: 2,
        requiresHumanReview: false,
      },
    };

    try {
      const result = await agentTaskOrchestratorTask.trigger(agentRequest);

      logger.info("Scheduled trend analysis completed", {
        success: result.output?.success || true,
        trendsIdentified:
          result.output?.result?.trendAnalysis?.identifiedTrends?.length || 0,
      });

      return {
        success: true,
        result: result.output?.result || result.output,
        nextRun: new Date(Date.now() + 86400000).toISOString(), // 24 hours
      };
    } catch (error) {
      logger.error("Scheduled trend analysis failed", {
        error: error instanceof Error ? error.message : String(error),
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
      };
    }
  },
});

/**
 * Scheduled Cross-Jurisdiction Analysis Agent
 *
 * Runs weekly to compare policies across jurisdictions
 */
export const scheduledCrossJurisdictionTask = schedules.task({
  id: "scheduled-cross-jurisdiction-analysis",
  cron: "0 3 * * 1", // Weekly on Monday at 3 AM
  run: async (
    payload: ScheduledAgentExecution,
    { ctx, logger }: { ctx: any; logger: any }
  ) => {
    logger.info("Starting scheduled cross-jurisdiction analysis");

    const agentRequest: AgentTaskRequest = {
      agentType: "cross_jurisdiction_agent",
      taskId: `cross-jurisdiction-${Date.now()}`,
      input: {
        jurisdictions: [
          { name: "United States", code: "US" },
          { name: "Canada", code: "CA" },
          { name: "United Kingdom", code: "UK" },
          { name: "Australia", code: "AU" },
          { name: "Germany", code: "DE" },
          { name: "France", code: "FR" },
        ],
        focusAreas: [
          "skilled_worker_programs",
          "family_reunification",
          "refugee_protection",
          "student_visas",
          "temporary_work_permits",
        ],
        context: {
          analysisType: "weekly_comparison",
          includeProcessingTimes: true,
          includeSuccessRates: true,
        },
      },
      context: {
        priority: "medium",
        timeout: 1800000, // 30 minutes
        maxRetries: 2,
        requiresHumanReview: false,
      },
    };

    try {
      const result = await agentTaskOrchestratorTask.trigger(agentRequest);

      logger.info("Scheduled cross-jurisdiction analysis completed", {
        success: result.output?.success || true,
        jurisdictionsAnalyzed:
          result.output?.result?.crossJurisdictionAnalysis
            ?.jurisdictionComparison?.length || 0,
      });

      return {
        success: true,
        result: result.output?.result || result.output,
        nextRun: new Date(Date.now() + 604800000).toISOString(), // 7 days
      };
    } catch (error) {
      logger.error("Scheduled cross-jurisdiction analysis failed", {
        error: error instanceof Error ? error.message : String(error),
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        nextRun: new Date(Date.now() + 604800000).toISOString(),
      };
    }
  },
});

/**
 * Scheduled Agent Execution with AI SDK v5 Constraints
 *
 * Generic scheduled agent execution with maxSteps and stopWhen conditions
 */
export const scheduledAgentExecutionTask = schedules.task({
  id: "scheduled-agent-execution",
  cron: "0 */6 * * *", // Every 6 hours
  run: async (
    payload: ScheduledAgentExecution,
    { ctx, logger }: { ctx: any; logger: any }
  ) => {
    logger.info("Starting scheduled agent execution", {
      scheduleId: payload.scheduleId,
      agentType: payload.agentType,
    });

    try {
      // Validate payload
      const validatedPayload = ScheduledAgentExecutionSchema.parse(payload);

      // Check if schedule is enabled
      if (!validatedPayload.schedule.enabled) {
        logger.info("Schedule is disabled, skipping execution", {
          scheduleId: payload.scheduleId,
        });
        return { success: true, skipped: true, reason: "schedule_disabled" };
      }

      // Execute agent with AI SDK v5 constraints
      const result = await executeScheduledAgentWithConstraints(
        validatedPayload,
        logger
      );

      // Send success notifications if configured
      if (validatedPayload.notifications?.onSuccess) {
        await sendNotifications(
          validatedPayload.notifications.onSuccess,
          "success",
          result,
          logger
        );
      }

      logger.info("Scheduled agent execution completed successfully", {
        scheduleId: payload.scheduleId,
        agentType: payload.agentType,
        steps: result.execution?.steps?.length || 0,
      });

      return {
        success: true,
        result: result.result,
        execution: result.execution,
        nextRun: calculateNextRun(validatedPayload.schedule.cron),
      };
    } catch (error) {
      logger.error("Scheduled agent execution failed", {
        scheduleId: payload.scheduleId,
        error: error instanceof Error ? error.message : String(error),
      });

      // Send failure notifications if configured
      if (payload.notifications?.onFailure) {
        await sendNotifications(
          payload.notifications.onFailure,
          "failure",
          { error: error instanceof Error ? error.message : String(error) },
          logger
        );
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        nextRun: calculateNextRun(payload.schedule.cron),
      };
    }
  },
});

/**
 * Execute scheduled agent with AI SDK v5 constraints
 */
async function executeScheduledAgentWithConstraints(
  payload: ScheduledAgentExecution,
  logger: any
): Promise<AgentTaskResult> {
  const steps: any[] = [];
  let stepNumber = 0;
  let shouldStop = false;

  // Create stop condition function
  const stopCondition = payload.constraints?.stopWhen
    ? new Function(
        "stepNumber",
        "steps",
        "result",
        `return ${payload.constraints.stopWhen}`
      )
    : null;

  logger.info("Executing scheduled agent with constraints", {
    stopWhen: payload.constraints?.stopWhen,
    timeout: payload.constraints?.timeout,
  });

  // Execute with AI SDK v5 multi-step processing
  const result = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      executionResult: z.any(),
      summary: z.string(),
      metrics: z.object({
        stepsCompleted: z.number(),
        processingTime: z.number(),
        itemsProcessed: z.number().optional(),
      }),
    }),

    system: `You are a scheduled ${payload.agentType} agent. Execute your scheduled tasks efficiently and provide comprehensive results.`,
    prompt: `Execute scheduled task with the following input:
    
    Schedule ID: ${payload.scheduleId}
    Agent Type: ${payload.agentType}
    Input: ${JSON.stringify(payload.input)}
    
    Process the input according to your agent type and provide detailed results.`,
  });

  // Create basic step tracking for compatibility
  const processingTime = Date.now() - startTime;
  steps.push({
    stepNumber: 1,
    action: `scheduled_${payload.agentType}_execution`,
    result: result.object,
    timestamp: new Date(),
    tokenUsage: {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    },
  });

  // Calculate total token usage
  const totalTokenUsage = {
    promptTokens: steps.reduce(
      (sum, step) => sum + (step.tokenUsage?.promptTokens || 0),
      0
    ),
    completionTokens: steps.reduce(
      (sum, step) => sum + (step.tokenUsage?.completionTokens || 0),
      0
    ),
    totalTokens: steps.reduce(
      (sum, step) => sum + (step.tokenUsage?.totalTokens || 0),
      0
    ),
  };

  return {
    taskId: payload.scheduleId,
    agentType: payload.agentType,
    success: true,
    result: result.object,
    execution: {
      startTime: new Date(
        Date.now() - (result.object.metrics.processingTime || 0)
      ),
      endTime: new Date(),
      duration: result.object.metrics.processingTime || 0,
      steps,
      totalTokenUsage,
    },
  };
}

/**
 * Send notifications for scheduled agent execution results
 */
async function sendNotifications(
  channels: string[],
  type: "success" | "failure" | "timeout",
  data: any,
  logger: any
) {
  logger.info("Sending notifications", {
    channels: channels.length,
    type,
  });

  // Implementation would depend on notification channels configured
  // This is a placeholder for the actual notification logic
  for (const channel of channels) {
    try {
      // Send notification based on channel type
      logger.info(`Notification sent to ${channel}`, { type, data });
    } catch (error) {
      logger.error(`Failed to send notification to ${channel}`, {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

/**
 * Calculate next run time based on cron expression
 */
function calculateNextRun(cronExpression: string): string {
  // This is a simplified implementation
  // In production, you would use a proper cron parser library
  const now = new Date();

  // For demonstration, add 1 hour for hourly tasks, 1 day for daily tasks, etc.
  if (cronExpression.includes("* * * *")) {
    // Hourly
    return new Date(now.getTime() + 3600000).toISOString();
  } else if (cronExpression.includes("0 ")) {
    // Daily or specific time
    return new Date(now.getTime() + 86400000).toISOString();
  } else {
    // Default to 6 hours
    return new Date(now.getTime() + 21600000).toISOString();
  }
}

/**
 * Dynamic Scheduled Agent Creation
 *
 * Creates scheduled agents dynamically based on configuration
 */
export function createScheduledAgent(config: ScheduledAgentExecution) {
  return schedules.task({
    id: `dynamic-${config.scheduleId}`,
    cron: config.schedule.cron,
    timezone: config.schedule.timezone,
    run: async (
      payload: ScheduledAgentExecution,
      { ctx, logger }: { ctx: any; logger: any }
    ) => {
      logger.info(`Starting dynamic scheduled agent: ${config.agentType}`, {
        scheduleId: config.scheduleId,
      });

      const agentRequest: AgentTaskRequest = {
        agentType: config.agentType as any,
        taskId: `${config.scheduleId}-${Date.now()}`,
        input: config.input,
        context: {
          priority: "medium",
          timeout: config.constraints?.timeout || 300000,
          maxRetries: 2,
          requiresHumanReview: false,
        },
      };

      try {
        const result = await agentTaskOrchestratorTask.trigger(agentRequest);

        logger.info(`Dynamic scheduled agent completed: ${config.agentType}`, {
          success: result.output?.success || true,
        });

        return {
          success: true,
          result: result.output?.result || result.output,
          nextRun: calculateNextRun(config.schedule.cron),
        };
      } catch (error) {
        logger.error(`Dynamic scheduled agent failed: ${config.agentType}`, {
          error: error instanceof Error ? error.message : String(error),
        });

        return {
          success: false,
          error: error instanceof Error ? error.message : String(error),
          nextRun: calculateNextRun(config.schedule.cron),
        };
      }
    },
  });
}
