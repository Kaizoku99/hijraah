/**
 * Complete Integration Example: Trigger.dev v4 + AI SDK v5 MAS
 *
 * This file demonstrates how to use all the components together:
 * - Agent Task Orchestrator
 * - Scheduled Agent Execution
 * - Agent Workflow Chaining
 * - Agent Error Handling
 */

import {
  agentTaskOrchestratorTask,
  scheduledAgentExecutionTask,
  agentWorkflowChainingTask,
} from "../index";
import {
  AgentTaskRequest,
  AgentWorkflowConfig,
  ScheduledAgentExecution,
} from "../types";
import {
  withAgentErrorHandling,
  createAgentRetryStrategy,
} from "../agent-error-handling";
import {
  immigrationCaseProcessingWorkflow,
  policyChangeImpactWorkflow,
} from "../agent-workflow-chaining";

/**
 * Example 1: Single Agent Task Execution
 *
 * Execute a single agent task using the orchestrator
 */
export async function executeSingleAgentTask() {
  const request: AgentTaskRequest = {
    agentType: "immigration_orchestrator",
    taskId: "immigration-case-2024-001",
    caseId: "case-12345",
    userId: "user-67890",
    input: {
      applicant: {
        name: "John Doe",
        nationality: "Indian",
        visaType: "H1B",
        education: "Masters in Computer Science",
        experience: "5 years software engineering",
      },
      documents: [
        {
          type: "passport",
          url: "https://storage.example.com/docs/passport-123.pdf",
          uploadedAt: new Date().toISOString(),
        },
        {
          type: "diploma",
          url: "https://storage.example.com/docs/diploma-123.pdf",
          uploadedAt: new Date().toISOString(),
        },
        {
          type: "employment_letter",
          url: "https://storage.example.com/docs/employment-123.pdf",
          uploadedAt: new Date().toISOString(),
        },
      ],
      caseContext: {
        priority: "standard",
        submissionDate: new Date().toISOString(),
        expectedProcessingTime: "6-8 months",
        specialCircumstances: [],
      },
    },
    context: {
      priority: "high",
      timeout: 600000, // 10 minutes
      maxRetries: 3,
      requiresHumanReview: false,
      metadata: {
        source: "web_application",
        version: "2.1.0",
      },
    },
  };

  try {
    // Execute the task
    const result = await agentTaskOrchestratorTask.trigger(request);

    console.log("Single agent task completed:", {
      taskId: result.output?.taskId || result.id,
      success: result.output?.success || true,
      duration: result.output?.execution?.duration || 0,
      steps: result.output?.execution?.steps?.length || 0,
    });

    return result;
  } catch (error) {
    console.error("Single agent task failed:", error);
    throw error;
  }
}

/**
 * Example 2: Scheduled Agent Execution
 *
 * Set up scheduled execution for policy monitoring
 */
export async function setupScheduledPolicyMonitoring() {
  const scheduledExecution: ScheduledAgentExecution = {
    scheduleId: "policy-monitoring-hourly",
    agentType: "policy_monitoring_agent",
    schedule: {
      cron: "0 * * * *", // Every hour
      timezone: "UTC",
      enabled: true,
    },
    input: {
      sources: [
        "https://www.uscis.gov/news",
        "https://www.canada.ca/en/immigration-refugees-citizenship/news.html",
        "https://www.gov.uk/government/organisations/uk-visas-and-immigration/news",
        "https://immi.homeaffairs.gov.au/news-media/news",
        "https://www.germany.travel/en/ms/german-missions/visa-entry.html",
      ],
      lastCheck: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      monitoringConfig: {
        detectNewPolicies: true,
        detectPolicyUpdates: true,
        detectPolicyRemovals: true,
        impactThreshold: "medium",
        notificationChannels: ["email", "slack", "webhook"],
      },
    },
    constraints: {
      stopWhen: "stepNumber >= 6 && results.summary.totalChanges === 0",
      timeout: 900000, // 15 minutes
    },
    notifications: {
      onSuccess: ["policy-team@hijraah.com"],
      onFailure: ["admin@hijraah.com", "devops@hijraah.com"],
      onTimeout: ["admin@hijraah.com"],
    },
  };

  try {
    // This would be set up in your Trigger.dev configuration
    console.log("Scheduled policy monitoring configured:", {
      scheduleId: scheduledExecution.scheduleId,
      cron: scheduledExecution.schedule.cron,
      enabled: scheduledExecution.schedule.enabled,
    });

    return scheduledExecution;
  } catch (error) {
    console.error("Failed to setup scheduled execution:", error);
    throw error;
  }
}

/**
 * Example 3: Complex Workflow Execution
 *
 * Execute a complete immigration case processing workflow
 */
export async function executeImmigrationCaseWorkflow() {
  // Use the pre-defined immigration case processing workflow
  const workflowInput = {
    documents: [
      {
        id: "doc-001",
        type: "passport",
        url: "https://storage.example.com/case-789/passport.pdf",
        metadata: { pages: 32, language: "english" },
      },
      {
        id: "doc-002",
        type: "diploma",
        url: "https://storage.example.com/case-789/diploma.pdf",
        metadata: { institution: "MIT", degree: "MS Computer Science" },
      },
      {
        id: "doc-003",
        type: "employment_verification",
        url: "https://storage.example.com/case-789/employment.pdf",
        metadata: { employer: "Tech Corp", position: "Senior Engineer" },
      },
    ],
    caseContext: {
      caseId: "case-789",
      applicantId: "applicant-456",
      visaType: "EB-1",
      priority: "expedited",
      submissionDate: new Date().toISOString(),
    },
    application: {
      personalInfo: {
        name: "Dr. Sarah Chen",
        nationality: "Chinese",
        dateOfBirth: "1985-03-15",
        passportNumber: "E12345678",
      },
      professionalInfo: {
        occupation: "Research Scientist",
        employer: "BioTech Innovations",
        salary: 150000,
        experience: "8 years",
      },
      immigrationHistory: {
        previousVisas: ["F-1", "H1B"],
        currentStatus: "H1B",
        expirationDate: "2025-06-30",
      },
    },
    recentPolicyChanges: [
      {
        type: "policy_update",
        title: "EB-1 Processing Time Reduction",
        description: "New expedited processing for EB-1 applications",
        effectiveDate: "2024-01-01",
        impact: "positive",
      },
    ],
    applicants: [
      {
        id: "applicant-456",
        email: "sarah.chen@email.com",
        phone: "+1-555-0123",
        preferredLanguage: "english",
        notificationPreferences: ["email", "sms"],
      },
    ],
  };

  try {
    // Execute the complete workflow
    const result = await agentWorkflowChainingTask.trigger({
      ...immigrationCaseProcessingWorkflow,
      // Override input with our specific case data
      steps: immigrationCaseProcessingWorkflow.steps.map((step) => ({
        ...step,
        input: {
          ...step.input,
          // Replace template variables with actual data
          documents: workflowInput.documents,
          caseContext: workflowInput.caseContext,
          application: workflowInput.application,
          recentPolicyChanges: workflowInput.recentPolicyChanges,
          applicants: workflowInput.applicants,
        },
      })),
    });

    console.log("Immigration case workflow completed:", {
      workflowId: result.output?.workflowId || result.id,
      success: result.output?.success || true,
      completedSteps: result.output?.result?.completedSteps || 0,
      totalSteps: result.output?.result?.totalSteps || 0,
      duration: result.output?.execution?.duration || 0,
    });

    return result;
  } catch (error) {
    console.error("Immigration case workflow failed:", error);
    throw error;
  }
}

/**
 * Example 4: Policy Change Impact Analysis Workflow
 *
 * Execute policy change monitoring and impact analysis
 */
export async function executePolicyChangeAnalysis() {
  const workflowInput = {
    sources: [
      "https://www.uscis.gov/news",
      "https://www.canada.ca/en/immigration-refugees-citizenship/news.html",
      "https://www.gov.uk/government/organisations/uk-visas-and-immigration/news",
    ],
    lastCheck: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
    context: {
      analysisType: "comprehensive",
      includeHistoricalTrends: true,
      generatePredictions: true,
    },
    jurisdictions: [
      { name: "United States", code: "US", priority: "high" },
      { name: "Canada", code: "CA", priority: "high" },
      { name: "United Kingdom", code: "UK", priority: "medium" },
    ],
    historicalData: {
      timeframe: "12_months",
      includeSeasonalPatterns: true,
      includePolicyCorrelations: true,
    },
    stakeholders: [
      {
        id: "policy-team",
        email: "policy-team@hijraah.com",
        role: "policy_analyst",
        notificationLevel: "all_changes",
      },
      {
        id: "legal-team",
        email: "legal-team@hijraah.com",
        role: "legal_counsel",
        notificationLevel: "critical_changes",
      },
      {
        id: "client-services",
        email: "client-services@hijraah.com",
        role: "client_manager",
        notificationLevel: "client_impacting",
      },
    ],
  };

  try {
    // Execute the policy change impact workflow
    const result = await agentWorkflowChainingTask.trigger({
      ...policyChangeImpactWorkflow,
      // Override input with our specific data
      steps: policyChangeImpactWorkflow.steps.map((step) => ({
        ...step,
        input: {
          ...step.input,
          sources: workflowInput.sources,
          lastCheck: workflowInput.lastCheck,
          context: workflowInput.context,
          jurisdictions: workflowInput.jurisdictions,
          historicalData: workflowInput.historicalData,
          stakeholders: workflowInput.stakeholders,
        },
      })),
    });

    console.log("Policy change analysis workflow completed:", {
      workflowId: result.output?.workflowId || result.id,
      success: result.output?.success || true,
      changesDetected:
        result.output?.result?.finalResult?.workflowSummary?.keyResults
          ?.length || 0,
      duration: result.output?.execution?.duration || 0,
    });

    return result;
  } catch (error) {
    console.error("Policy change analysis workflow failed:", error);
    throw error;
  }
}

/**
 * Example 5: Error Handling and Recovery
 *
 * Demonstrate robust error handling with fallback strategies
 */
export async function demonstrateErrorHandling() {
  // Create a task that might fail
  const riskyAgentExecution = async () => {
    // Simulate various types of failures
    const failureTypes = [
      "timeout",
      "rate_limit",
      "model_error",
      "validation_error",
    ];
    const randomFailure =
      failureTypes[Math.floor(Math.random() * failureTypes.length)];

    if (Math.random() < 0.7) {
      // 70% chance of failure for demonstration
      switch (randomFailure) {
        case "timeout":
          throw new Error("Request timed out after 30 seconds");
        case "rate_limit":
          throw new Error("Rate limit exceeded: too many requests");
        case "model_error":
          throw new Error("OpenAI model error: service unavailable");
        case "validation_error":
          throw new Error("Validation error: invalid schema");
        default:
          throw new Error("Unknown error occurred");
      }
    }

    // Success case
    return {
      result: "Task completed successfully",
      confidence: 0.95,
      processingTime: 5000,
    };
  };

  try {
    // Wrap the risky execution with error handling
    const result = await withAgentErrorHandling(riskyAgentExecution, {
      taskId: "error-handling-demo",
      agentType: "document_processing_team",
      maxRetries: 3,
      logger: console,
      retryStrategy: createAgentRetryStrategy("document_processing_team"),
    });

    console.log("Error handling demo completed:", {
      success: true,
      result: result.result || result,
      fallbackUsed: result.fallbackUsed || false,
      degraded: result.degraded || false,
    });

    return result;
  } catch (error) {
    console.error("Error handling demo failed completely:", error);

    // Even in complete failure, we can provide some response
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      fallbackResult: "Manual intervention required",
    };
  }
}

/**
 * Example 6: Performance Monitoring and Metrics
 *
 * Demonstrate how to monitor agent performance
 */
export async function monitorAgentPerformance() {
  const performanceMetrics = {
    startTime: new Date(),
    tasksExecuted: 0,
    successfulTasks: 0,
    failedTasks: 0,
    totalTokenUsage: 0,
    averageResponseTime: 0,
  };

  // Execute multiple tasks to gather metrics
  const tasks = [
    {
      agentType: "policy_monitoring_agent",
      input: { sources: ["https://example.com"] },
    },
    { agentType: "trend_analysis_agent", input: { data: "sample_data" } },
    { agentType: "impact_assessment_agent", input: { changes: [] } },
  ];

  for (const [index, taskConfig] of tasks.entries()) {
    const taskStartTime = Date.now();

    try {
      const request: AgentTaskRequest = {
        agentType: taskConfig.agentType as any,
        taskId: `performance-test-${index}`,
        input: taskConfig.input,
      };

      const result = await agentTaskOrchestratorTask.trigger(request);

      performanceMetrics.tasksExecuted++;
      performanceMetrics.successfulTasks++;
      performanceMetrics.totalTokenUsage +=
        result.execution.totalTokenUsage?.totalTokens || 0;

      const responseTime = Date.now() - taskStartTime;
      performanceMetrics.averageResponseTime =
        (performanceMetrics.averageResponseTime *
          (performanceMetrics.tasksExecuted - 1) +
          responseTime) /
        performanceMetrics.tasksExecuted;
    } catch (error) {
      performanceMetrics.tasksExecuted++;
      performanceMetrics.failedTasks++;

      console.error(`Task ${index} failed:`, error);
    }
  }

  const totalDuration = Date.now() - performanceMetrics.startTime.getTime();

  console.log("Performance monitoring results:", {
    ...performanceMetrics,
    totalDuration,
    successRate:
      (performanceMetrics.successfulTasks / performanceMetrics.tasksExecuted) *
      100,
    averageTokensPerTask:
      performanceMetrics.totalTokenUsage / performanceMetrics.tasksExecuted,
  });

  return performanceMetrics;
}

/**
 * Example 7: Complete End-to-End Integration
 *
 * Demonstrate a complete real-world scenario
 */
export async function completeEndToEndExample() {
  console.log("Starting complete end-to-end integration example...");

  try {
    // Step 1: Execute single agent task
    console.log("Step 1: Executing single agent task...");
    const singleTaskResult = await executeSingleAgentTask();

    // Step 2: Set up scheduled monitoring
    console.log("Step 2: Setting up scheduled monitoring...");
    const scheduledConfig = await setupScheduledPolicyMonitoring();

    // Step 3: Execute complex workflow
    console.log("Step 3: Executing immigration case workflow...");
    const workflowResult = await executeImmigrationCaseWorkflow();

    // Step 4: Execute policy analysis
    console.log("Step 4: Executing policy change analysis...");
    const policyAnalysisResult = await executePolicyChangeAnalysis();

    // Step 5: Demonstrate error handling
    console.log("Step 5: Demonstrating error handling...");
    const errorHandlingResult = await demonstrateErrorHandling();

    // Step 6: Monitor performance
    console.log("Step 6: Monitoring performance...");
    const performanceResult = await monitorAgentPerformance();

    console.log("Complete end-to-end example completed successfully!");

    return {
      singleTask: singleTaskResult,
      scheduledConfig,
      workflow: workflowResult,
      policyAnalysis: policyAnalysisResult,
      errorHandling: errorHandlingResult,
      performance: performanceResult,
    };
  } catch (error) {
    console.error("End-to-end example failed:", error);
    throw error;
  }
}

// Export all examples for easy usage
export const examples = {
  executeSingleAgentTask,
  setupScheduledPolicyMonitoring,
  executeImmigrationCaseWorkflow,
  executePolicyChangeAnalysis,
  demonstrateErrorHandling,
  monitorAgentPerformance,
  completeEndToEndExample,
};

// If running this file directly, execute the complete example
if (require.main === module) {
  completeEndToEndExample()
    .then(() => {
      console.log("All examples completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Examples failed:", error);
      process.exit(1);
    });
}
