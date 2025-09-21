import { z } from "zod";
import { TokenUsage, AgentStep } from "../types";

// Agent execution metrics schema
export const AgentExecutionMetricsSchema = z.object({
  agentName: z.string(),
  executionId: z.string(),
  caseId: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  duration: z.number(),
  tokenUsage: z.object({
    // AI SDK v5 standard properties
    inputTokens: z.number().optional(),
    outputTokens: z.number().optional(),
    totalTokens: z.number().optional(),
    reasoningTokens: z.number().optional(),
    cachedInputTokens: z.number().optional(),
    
    // Legacy compatibility
    promptTokens: z.number().optional(),
    completionTokens: z.number().optional(),
    
    // Enhanced tracking
    cost: z.number().optional(),
  }),
  stepCount: z.number(),
  success: z.boolean(),
  errorMessage: z.string().optional(),
  modelUsed: z.string(),
  toolsUsed: z.array(z.string()),
  qualityScore: z.number().min(0).max(100).optional(),
  userFeedback: z.number().min(1).max(5).optional(),
});

export type AgentExecutionMetrics = z.infer<typeof AgentExecutionMetricsSchema>;

// Step-level metrics schema
export const StepMetricsSchema = z.object({
  stepNumber: z.number(),
  stepType: z.enum(["reasoning", "tool_call", "generation", "validation"]),
  duration: z.number(),
  tokenUsage: z.object({
    // AI SDK v5 standard properties
    inputTokens: z.number().optional(),
    outputTokens: z.number().optional(),
    totalTokens: z.number().optional(),
    reasoningTokens: z.number().optional(),
    cachedInputTokens: z.number().optional(),
    
    // Legacy compatibility
    promptTokens: z.number().optional(),
    completionTokens: z.number().optional(),
  }),
  toolCalls: z.array(
    z.object({
      toolName: z.string(),
      duration: z.number(),
      success: z.boolean(),
      errorMessage: z.string().optional(),
    })
  ),
  confidence: z.number().min(0).max(1).optional(),
  qualityIndicators: z.record(z.string(), z.number()).optional(),
});

export type StepMetrics = z.infer<typeof StepMetricsSchema>;

// Performance benchmark schema
export const PerformanceBenchmarkSchema = z.object({
  agentType: z.string(),
  taskType: z.string(),
  benchmarkName: z.string(),
  expectedDuration: z.number(),
  expectedTokenUsage: z.number(),
  expectedSuccessRate: z.number(),
  qualityThreshold: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PerformanceBenchmark = z.infer<typeof PerformanceBenchmarkSchema>;

// A/B test configuration schema
export const ABTestConfigSchema = z.object({
  testId: z.string(),
  name: z.string(),
  description: z.string(),
  agentType: z.string(),
  variants: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      model: z.string(),
      systemPrompt: z.string().optional(),
      temperature: z.number().optional(),
      maxTokens: z.number().optional(),
      tools: z.array(z.string()).optional(),
      weight: z.number().min(0).max(1), // Traffic allocation
    })
  ),
  metrics: z.array(
    z.enum([
      "duration",
      "token_usage",
      "success_rate",
      "quality_score",
      "user_satisfaction",
      "cost_efficiency",
    ])
  ),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["draft", "running", "completed", "paused"]),
  sampleSize: z.number(),
  confidenceLevel: z.number().min(0.8).max(0.99),
});

export type ABTestConfig = z.infer<typeof ABTestConfigSchema>;

// A/B test result schema
export const ABTestResultSchema = z.object({
  testId: z.string(),
  variantId: z.string(),
  executionId: z.string(),
  metrics: z.record(z.string(), z.number()),
  timestamp: z.date(),
});

export type ABTestResult = z.infer<typeof ABTestResultSchema>;

// Agent debugging session schema
export const DebuggingSessionSchema = z.object({
  sessionId: z.string(),
  agentName: z.string(),
  executionId: z.string(),
  steps: z.array(
    z.object({
      stepNumber: z.number(),
      timestamp: z.date(),
      input: z.record(z.string(), z.any()),
      output: z.record(z.string(), z.any()),
      reasoning: z.string().optional(),
      toolCalls: z.array(
        z.object({
          toolName: z.string(),
          parameters: z.record(z.string(), z.any()),
          result: z.any(),
          duration: z.number(),
          success: z.boolean(),
        })
      ),
      modelResponse: z.object({
        model: z.string(),
        temperature: z.number().optional(),
        maxTokens: z.number().optional(),
        finishReason: z.string(),
        usage: z.object({
          // AI SDK v5 standard properties
          inputTokens: z.number().optional(),
          outputTokens: z.number().optional(),
          totalTokens: z.number().optional(),
          reasoningTokens: z.number().optional(),
          cachedInputTokens: z.number().optional(),
          
          // Legacy compatibility
          promptTokens: z.number().optional(),
          completionTokens: z.number().optional(),
        }),
      }),
      performance: z.object({
        duration: z.number(),
        memoryUsage: z.number().optional(),
        cpuUsage: z.number().optional(),
      }),
      issues: z
        .array(
          z.object({
            type: z.enum(["warning", "error", "performance", "quality"]),
            message: z.string(),
            suggestion: z.string().optional(),
          })
        )
        .optional(),
    })
  ),
  summary: z.object({
    totalDuration: z.number(),
    totalTokenUsage: z.number(),
    successRate: z.number(),
    issueCount: z.number(),
    recommendations: z.array(z.string()),
  }),
  createdAt: z.date(),
});

export type DebuggingSession = z.infer<typeof DebuggingSessionSchema>;

// Dashboard configuration schema
export const DashboardConfigSchema = z.object({
  userId: z.string(),
  dashboardId: z.string(),
  name: z.string(),
  widgets: z.array(
    z.object({
      id: z.string(),
      type: z.enum([
        "agent_performance_chart",
        "token_usage_chart",
        "success_rate_gauge",
        "cost_analysis_chart",
        "quality_metrics_chart",
        "ab_test_results",
        "error_log_table",
        "real_time_metrics",
      ]),
      position: z.object({
        x: z.number(),
        y: z.number(),
        width: z.number(),
        height: z.number(),
      }),
      config: z.record(z.string(), z.any()),
      refreshInterval: z.number().optional(), // in seconds
    })
  ),
  filters: z
    .object({
      agentTypes: z.array(z.string()).optional(),
      timeRange: z
        .object({
          start: z.date(),
          end: z.date(),
        })
        .optional(),
      caseTypes: z.array(z.string()).optional(),
      successOnly: z.boolean().optional(),
    })
    .optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type DashboardConfig = z.infer<typeof DashboardConfigSchema>;

// Real-time metrics schema
export const RealTimeMetricsSchema = z.object({
  timestamp: z.date(),
  activeAgents: z.number(),
  queuedTasks: z.number(),
  averageResponseTime: z.number(),
  tokensPerMinute: z.number(),
  successRate: z.number(),
  errorRate: z.number(),
  costPerHour: z.number(),
  systemHealth: z.object({
    cpu: z.number(),
    memory: z.number(),
    disk: z.number(),
    network: z.number(),
  }),
});

export type RealTimeMetrics = z.infer<typeof RealTimeMetricsSchema>;

// Quality assessment schema
export const QualityAssessmentSchema = z.object({
  executionId: z.string(),
  agentName: z.string(),
  assessmentType: z.enum(["automated", "human", "hybrid"]),
  criteria: z.array(
    z.object({
      name: z.string(),
      weight: z.number(),
      score: z.number().min(0).max(100),
      feedback: z.string().optional(),
    })
  ),
  overallScore: z.number().min(0).max(100),
  assessorId: z.string().optional(),
  timestamp: z.date(),
  recommendations: z.array(z.string()).optional(),
});

export type QualityAssessment = z.infer<typeof QualityAssessmentSchema>;

// Cost analysis schema
export const CostAnalysisSchema = z.object({
  period: z.object({
    start: z.date(),
    end: z.date(),
  }),
  agentType: z.string().optional(),
  breakdown: z.object({
    modelCosts: z.record(z.string(), z.number()), // model -> cost
    toolCosts: z.record(z.string(), z.number()), // tool -> cost
    infrastructureCosts: z.number(),
    totalCost: z.number(),
  }),
  usage: z.object({
    totalExecutions: z.number(),
    totalTokens: z.number(),
    averageCostPerExecution: z.number(),
    averageCostPerToken: z.number(),
  }),
  trends: z.object({
    costTrend: z.enum(["increasing", "decreasing", "stable"]),
    usageTrend: z.enum(["increasing", "decreasing", "stable"]),
    efficiencyTrend: z.enum(["improving", "declining", "stable"]),
  }),
  recommendations: z.array(z.string()),
});

export type CostAnalysis = z.infer<typeof CostAnalysisSchema>;
