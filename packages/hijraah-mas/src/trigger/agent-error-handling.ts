/**
 * Agent Error Handling using Trigger.dev v4 and AI SDK v5
 *
 * This module implements comprehensive error handling for agents using Trigger.dev's
 * retry mechanisms with AI SDK v5's error recovery and fallback strategies.
 */

import { generateText, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  AgentErrorContext,
  AgentErrorContextSchema,
  AgentTaskRequest,
  AgentTaskResult,
} from "./types";

/**
 * Agent Error Types
 */
export enum AgentErrorType {
  TIMEOUT = "timeout",
  RATE_LIMIT = "rate_limit",
  MODEL_ERROR = "model_error",
  VALIDATION_ERROR = "validation_error",
  NETWORK_ERROR = "network_error",
  AUTHENTICATION_ERROR = "authentication_error",
  RESOURCE_EXHAUSTED = "resource_exhausted",
  INTERNAL_ERROR = "internal_error",
  DEPENDENCY_ERROR = "dependency_error",
  DATA_ERROR = "data_error",
}

/**
 * Error Recovery Strategies
 */
export enum ErrorRecoveryStrategy {
  RETRY = "retry",
  FALLBACK_MODEL = "fallback_model",
  FALLBACK_AGENT = "fallback_agent",
  MANUAL_INTERVENTION = "manual_intervention",
  SKIP_STEP = "skip_step",
  GRACEFUL_DEGRADATION = "graceful_degradation",
}

/**
 * Retry Strategy Configuration
 */
export interface RetryStrategyConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: AgentErrorType[];
  fallbackStrategy?: ErrorRecoveryStrategy;
}

/**
 * Default retry strategy for agents
 */
export const DEFAULT_RETRY_STRATEGY: RetryStrategyConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 30000,
  backoffMultiplier: 2,
  retryableErrors: [
    AgentErrorType.TIMEOUT,
    AgentErrorType.RATE_LIMIT,
    AgentErrorType.NETWORK_ERROR,
    AgentErrorType.MODEL_ERROR,
  ],
  fallbackStrategy: ErrorRecoveryStrategy.FALLBACK_MODEL,
};

/**
 * Agent Error Handler with AI SDK v5 recovery strategies
 */
export class AgentErrorHandler {
  private retryStrategy: RetryStrategyConfig;
  private logger: any;

  constructor(
    retryStrategy: RetryStrategyConfig = DEFAULT_RETRY_STRATEGY,
    logger?: any
  ) {
    this.retryStrategy = retryStrategy;
    this.logger = logger;
  }

  /**
   * Handle agent execution error with recovery strategies
   */
  async handleError(
    error: Error,
    context: AgentErrorContext,
    originalExecution: () => Promise<any>
  ): Promise<any> {
    this.logger?.error("Agent error occurred", {
      taskId: context.taskId,
      agentType: context.agentType,
      error: error.message,
      retryCount: context.context.retryCount,
    });

    // Classify error type
    const errorType = this.classifyError(error);

    // Check if error is retryable
    if (
      !this.isRetryableError(errorType) ||
      context.context.retryCount >= context.context.maxRetries
    ) {
      // Apply fallback strategy
      return await this.applyFallbackStrategy(
        error,
        context,
        originalExecution
      );
    }

    // Calculate retry delay
    const delay = this.calculateRetryDelay(context.context.retryCount);

    this.logger?.info("Retrying agent execution", {
      taskId: context.taskId,
      retryCount: context.context.retryCount + 1,
      delay,
    });

    // Wait before retry
    await this.sleep(delay);

    // Update retry context
    const updatedContext = {
      ...context,
      context: {
        ...context.context,
        retryCount: context.context.retryCount + 1,
        lastAttemptTime: new Date(),
      },
    };

    try {
      // Retry with updated context
      return await originalExecution();
    } catch (retryError) {
      // Recursive error handling
      return await this.handleError(
        retryError as Error,
        updatedContext,
        originalExecution
      );
    }
  }

  /**
   * Apply fallback strategy when retries are exhausted
   */
  private async applyFallbackStrategy(
    error: Error,
    context: AgentErrorContext,
    originalExecution: () => Promise<any>
  ): Promise<any> {
    const strategy =
      context.recovery?.strategy || this.retryStrategy.fallbackStrategy;

    this.logger?.info("Applying fallback strategy", {
      taskId: context.taskId,
      strategy,
      error: error.message,
    });

    switch (strategy) {
      case ErrorRecoveryStrategy.FALLBACK_MODEL:
        return await this.executeFallbackModel(context, originalExecution);

      case ErrorRecoveryStrategy.FALLBACK_AGENT:
        return await this.executeFallbackAgent(context);

      case ErrorRecoveryStrategy.GRACEFUL_DEGRADATION:
        return await this.executeGracefulDegradation(context);

      case ErrorRecoveryStrategy.SKIP_STEP:
        return this.createSkippedResult(context, error);

      case ErrorRecoveryStrategy.MANUAL_INTERVENTION:
        return await this.requestManualIntervention(context, error);

      default:
        throw error;
    }
  }

  /**
   * Execute with fallback model using AI SDK v5
   */
  private async executeFallbackModel(
    context: AgentErrorContext,
    originalExecution: () => Promise<any>
  ): Promise<any> {
    this.logger?.info("Executing with fallback model", {
      taskId: context.taskId,
      agentType: context.agentType,
    });

    try {
      // Use a more reliable but potentially less capable model
      const fallbackResult = await generateObject({
        model: openai("gpt-4o-mini"), // Fallback to smaller, more reliable model
        schema: z.object({
          result: z.any(),
          fallbackUsed: z.boolean().default(true),
          originalError: z.string(),
          confidence: z.number().min(0).max(1),
        }),
        system: `You are a fallback agent handling a failed task. Provide the best possible result given the constraints.`,
        prompt: `The original agent failed with error: ${context.error.message}
        
        Task ID: ${context.taskId}
        Agent Type: ${context.agentType}
        Input: ${JSON.stringify(context.context.input)}
        
        Provide a fallback result that addresses the core requirements while acknowledging limitations.`,
      });

      return {
        ...fallbackResult.object,
        metadata: {
          fallbackStrategy: "fallback_model",
          originalError: context.error.message,
          retryCount: context.context.retryCount,
        },
      };
    } catch (fallbackError) {
      this.logger?.error("Fallback model execution failed", {
        taskId: context.taskId,
        fallbackError:
          fallbackError instanceof Error
            ? fallbackError.message
            : String(fallbackError),
      });

      // If fallback model fails, try graceful degradation
      return await this.executeGracefulDegradation(context);
    }
  }

  /**
   * Execute fallback agent
   */
  private async executeFallbackAgent(context: AgentErrorContext): Promise<any> {
    const fallbackAgentType =
      context.recovery?.fallbackAgent || "immigration_orchestrator";

    this.logger?.info("Executing fallback agent", {
      taskId: context.taskId,
      originalAgent: context.agentType,
      fallbackAgent: fallbackAgentType,
    });

    // This would trigger the fallback agent through the orchestrator
    // For now, return a placeholder result
    return {
      result: `Fallback agent ${fallbackAgentType} would handle this task`,
      fallbackUsed: true,
      originalError: context.error.message,
      fallbackAgent: fallbackAgentType,
    };
  }

  /**
   * Execute graceful degradation
   */
  private async executeGracefulDegradation(
    context: AgentErrorContext
  ): Promise<any> {
    this.logger?.info("Executing graceful degradation", {
      taskId: context.taskId,
      agentType: context.agentType,
    });

    // Provide a minimal but functional result
    const degradedResult = await generateText({
      model: openai("gpt-4o-mini"),

      system: `You are providing a gracefully degraded response for a failed agent task. Provide minimal but useful information.`,
      prompt: `Task failed: ${context.error.message}
      
      Agent: ${context.agentType}
      Task: ${context.taskId}
      
      Provide a brief, helpful response acknowledging the limitation and suggesting next steps.`,
    });

    return {
      result: degradedResult.text,
      degraded: true,
      originalError: context.error.message,
      confidence: 0.3,
      recommendation: "Manual review recommended due to system limitations",
    };
  }

  /**
   * Create result for skipped step
   */
  private createSkippedResult(context: AgentErrorContext, error: Error): any {
    return {
      result: null,
      skipped: true,
      reason: "step_skipped_due_to_error",
      originalError: error.message,
      taskId: context.taskId,
      agentType: context.agentType,
    };
  }

  /**
   * Request manual intervention
   */
  private async requestManualIntervention(
    context: AgentErrorContext,
    error: Error
  ): Promise<any> {
    this.logger?.warn("Manual intervention requested", {
      taskId: context.taskId,
      agentType: context.agentType,
      error: error.message,
    });

    // In a real implementation, this would create a ticket or alert
    return {
      result: null,
      manualInterventionRequired: true,
      error: error.message,
      taskId: context.taskId,
      agentType: context.agentType,
      timestamp: new Date(),
      priority: "high",
    };
  }

  /**
   * Classify error type
   */
  private classifyError(error: Error): AgentErrorType {
    const message = error.message.toLowerCase();

    if (message.includes("timeout") || message.includes("timed out")) {
      return AgentErrorType.TIMEOUT;
    }
    if (
      message.includes("rate limit") ||
      message.includes("too many requests")
    ) {
      return AgentErrorType.RATE_LIMIT;
    }
    if (
      message.includes("model") ||
      message.includes("ai") ||
      message.includes("openai")
    ) {
      return AgentErrorType.MODEL_ERROR;
    }
    if (message.includes("validation") || message.includes("schema")) {
      return AgentErrorType.VALIDATION_ERROR;
    }
    if (
      message.includes("network") ||
      message.includes("connection") ||
      message.includes("fetch")
    ) {
      return AgentErrorType.NETWORK_ERROR;
    }
    if (
      message.includes("auth") ||
      message.includes("unauthorized") ||
      message.includes("forbidden")
    ) {
      return AgentErrorType.AUTHENTICATION_ERROR;
    }
    if (
      message.includes("resource") ||
      message.includes("memory") ||
      message.includes("cpu")
    ) {
      return AgentErrorType.RESOURCE_EXHAUSTED;
    }
    if (
      message.includes("dependency") ||
      message.includes("service unavailable")
    ) {
      return AgentErrorType.DEPENDENCY_ERROR;
    }
    if (
      message.includes("data") ||
      message.includes("parse") ||
      message.includes("format")
    ) {
      return AgentErrorType.DATA_ERROR;
    }

    return AgentErrorType.INTERNAL_ERROR;
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(errorType: AgentErrorType): boolean {
    return this.retryStrategy.retryableErrors.includes(errorType);
  }

  /**
   * Calculate retry delay with exponential backoff
   */
  private calculateRetryDelay(retryCount: number): number {
    const delay =
      this.retryStrategy.baseDelay *
      Math.pow(this.retryStrategy.backoffMultiplier, retryCount);
    return Math.min(delay, this.retryStrategy.maxDelay);
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Higher-order function to wrap agent execution with error handling
 */
export function withAgentErrorHandling<T>(
  agentExecution: () => Promise<T>,
  options: {
    taskId: string;
    agentType: string;
    maxRetries?: number;
    logger?: any;
    retryStrategy?: Partial<RetryStrategyConfig>;
  }
): Promise<T> {
  const retryStrategy = { ...DEFAULT_RETRY_STRATEGY, ...options.retryStrategy };
  const errorHandler = new AgentErrorHandler(retryStrategy, options.logger);

  const errorContext: AgentErrorContext = {
    taskId: options.taskId,
    agentType: options.agentType,
    error: {
      type: "unknown",
      message: "",
      code: "",
    },
    context: {
      input: {},
      retryCount: 0,
      maxRetries: options.maxRetries || retryStrategy.maxRetries,
      lastAttemptTime: new Date(),
      totalDuration: 0,
    },
  };

  return agentExecution().catch(async (error: Error) => {
    const updatedContext = {
      ...errorContext,
      error: {
        type: error.constructor.name,
        message: error.message,
        stack: error.stack,
        code: (error as any).code || "unknown",
      },
    };

    return await errorHandler.handleError(
      error,
      updatedContext,
      agentExecution
    );
  });
}

/**
 * Create retry strategy for specific agent types
 */
export function createAgentRetryStrategy(
  agentType: string
): RetryStrategyConfig {
  const baseStrategy = { ...DEFAULT_RETRY_STRATEGY };

  switch (agentType) {
    case "policy_monitoring_agent":
      return {
        ...baseStrategy,
        maxRetries: 5,
        baseDelay: 2000,
        maxDelay: 60000,
        retryableErrors: [
          AgentErrorType.TIMEOUT,
          AgentErrorType.RATE_LIMIT,
          AgentErrorType.NETWORK_ERROR,
        ],
      };

    case "document_processing_team":
      return {
        ...baseStrategy,
        maxRetries: 2,
        baseDelay: 5000,
        maxDelay: 30000,
        fallbackStrategy: ErrorRecoveryStrategy.MANUAL_INTERVENTION,
      };

    case "case_decision_team":
      return {
        ...baseStrategy,
        maxRetries: 1,
        baseDelay: 10000,
        fallbackStrategy: ErrorRecoveryStrategy.MANUAL_INTERVENTION,
        retryableErrors: [AgentErrorType.TIMEOUT, AgentErrorType.NETWORK_ERROR],
      };

    case "immigration_orchestrator":
      return {
        ...baseStrategy,
        maxRetries: 3,
        baseDelay: 3000,
        maxDelay: 45000,
        fallbackStrategy: ErrorRecoveryStrategy.GRACEFUL_DEGRADATION,
      };

    default:
      return baseStrategy;
  }
}

/**
 * Error metrics collection
 */
export class AgentErrorMetrics {
  private errorCounts: Map<string, number> = new Map();
  private errorTypes: Map<AgentErrorType, number> = new Map();
  private recoveryStrategies: Map<ErrorRecoveryStrategy, number> = new Map();

  recordError(
    agentType: string,
    errorType: AgentErrorType,
    recoveryStrategy?: ErrorRecoveryStrategy
  ) {
    // Count errors by agent type
    const currentCount = this.errorCounts.get(agentType) || 0;
    this.errorCounts.set(agentType, currentCount + 1);

    // Count errors by type
    const currentTypeCount = this.errorTypes.get(errorType) || 0;
    this.errorTypes.set(errorType, currentTypeCount + 1);

    // Count recovery strategies
    if (recoveryStrategy) {
      const currentStrategyCount =
        this.recoveryStrategies.get(recoveryStrategy) || 0;
      this.recoveryStrategies.set(recoveryStrategy, currentStrategyCount + 1);
    }
  }

  getMetrics() {
    return {
      errorsByAgent: Object.fromEntries(this.errorCounts),
      errorsByType: Object.fromEntries(this.errorTypes),
      recoveryStrategiesUsed: Object.fromEntries(this.recoveryStrategies),
      totalErrors: Array.from(this.errorCounts.values()).reduce(
        (sum, count) => sum + count,
        0
      ),
    };
  }

  reset() {
    this.errorCounts.clear();
    this.errorTypes.clear();
    this.recoveryStrategies.clear();
  }
}
