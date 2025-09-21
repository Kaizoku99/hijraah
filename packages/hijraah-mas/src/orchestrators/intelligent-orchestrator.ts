import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { getModelForTask } from "../utils";
import { z } from "zod";
import {
  CaseData,
  ProcessedCaseData,
  AgentExecution,
  CaseDataSchema,
} from "../types";
import {
  logAgentExecution,
  cacheAgentResult,
  getCachedAgentResult,
  withAgentErrorHandling,
  monitorAgentPerformance,
  generateCacheKey,
} from "../utils";

// Agent specialization schema
const AgentSpecializationSchema = z.object({
  agentType: z.string(),
  specializations: z.array(z.string()),
  performanceMetrics: z.object({
    averageSuccessRate: z.number().min(0).max(1),
    averageResponseTime: z.number(),
    averageQualityScore: z.number().min(0).max(100),
    totalExecutions: z.number(),
    lastUpdated: z.date(),
  }),
  capabilities: z.array(
    z.object({
      capability: z.string(),
      proficiency: z.number().min(0).max(100),
      lastAssessed: z.date(),
    })
  ),
});

type AgentSpecialization = z.infer<typeof AgentSpecializationSchema>;

// Dynamic team composition schema
const TeamCompositionSchema = z.object({
  teamId: z.string(),
  caseComplexity: z.enum(["low", "medium", "high", "critical"]),
  requiredCapabilities: z.array(z.string()),
  selectedAgents: z.array(
    z.object({
      agentType: z.string(),
      role: z.string(),
      priority: z.number(),
      estimatedContribution: z.number().min(0).max(100),
      selectionReason: z.string(),
    })
  ),
  collaborationPattern: z.enum([
    "sequential",
    "parallel",
    "hierarchical",
    "mesh",
  ]),
  estimatedDuration: z.number(),
  confidenceScore: z.number().min(0).max(100),
});

type TeamComposition = z.infer<typeof TeamCompositionSchema>;

// Workflow optimization schema
const WorkflowOptimizationSchema = z.object({
  workflowId: z.string(),
  originalSteps: z.array(
    z.object({
      stepId: z.string(),
      agentType: z.string(),
      estimatedDuration: z.number(),
      dependencies: z.array(z.string()),
    })
  ),
  optimizedSteps: z.array(
    z.object({
      stepId: z.string(),
      agentType: z.string(),
      estimatedDuration: z.number(),
      dependencies: z.array(z.string()),
      optimizationReason: z.string(),
    })
  ),
  improvementMetrics: z.object({
    timeReduction: z.number(),
    costReduction: z.number(),
    qualityImprovement: z.number(),
    riskReduction: z.number(),
  }),
  confidence: z.number().min(0).max(100),
});

type WorkflowOptimization = z.infer<typeof WorkflowOptimizationSchema>;

// Agent learning schema
const AgentLearningSchema = z.object({
  agentType: z.string(),
  learningSession: z.object({
    sessionId: z.string(),
    startTime: z.date(),
    endTime: z.date(),
    feedbackSources: z.array(
      z.enum([
        "user_feedback",
        "outcome_data",
        "peer_review",
        "automated_assessment",
      ])
    ),
  }),
  insights: z.array(
    z.object({
      insight: z.string(),
      confidence: z.number().min(0).max(100),
      applicability: z.array(z.string()), // scenarios where this applies
      evidence: z.array(z.string()),
    })
  ),
  improvements: z.array(
    z.object({
      area: z.string(),
      currentPerformance: z.number(),
      targetPerformance: z.number(),
      actionPlan: z.string(),
      timeline: z.string(),
    })
  ),
  updatedCapabilities: z.array(
    z.object({
      capability: z.string(),
      previousProficiency: z.number(),
      newProficiency: z.number(),
      improvementReason: z.string(),
    })
  ),
});

type AgentLearning = z.infer<typeof AgentLearningSchema>;

export class IntelligentOrchestrator {
  private performanceMonitor = monitorAgentPerformance(
    "IntelligentOrchestrator"
  );
  private agentSpecializations: Map<string, AgentSpecialization> = new Map();
  private historicalPerformance: Map<string, AgentExecution[]> = new Map();
  private workflowOptimizations: Map<string, WorkflowOptimization> = new Map();

  /**
   * Process case with intelligent agent orchestration
   */
  async processCase(caseData: CaseData): Promise<ProcessedCaseData> {
    const startTime = Date.now();
    const execution: Partial<AgentExecution> = {
      type: "intelligent_orchestration",
      caseId: caseData.id,
      steps: [],
      timestamp: new Date(),
    };

    try {
      // Validate input data
      const validatedCaseData = CaseDataSchema.parse(caseData);

      // Step 1: Analyze case complexity and requirements
      const caseAnalysis = await this.analyzeCaseComplexity(validatedCaseData);

      // Step 2: Compose optimal agent team
      const teamComposition = await this.composeAgentTeam(
        caseAnalysis,
        validatedCaseData
      );

      // Step 3: Optimize workflow based on historical data
      const optimizedWorkflow = await this.optimizeWorkflow(
        teamComposition,
        validatedCaseData
      );

      // Step 4: Execute with intelligent coordination
      const results = await this.executeIntelligentWorkflow(
        optimizedWorkflow,
        validatedCaseData
      );

      // Step 5: Learn from execution and update agent capabilities
      await this.learnFromExecution(
        teamComposition,
        results,
        validatedCaseData
      );

      // Step 6: Synthesize final result
      const finalResult = await this.synthesizeResults(
        validatedCaseData,
        results
      );

      // Log successful execution
      const duration = Date.now() - startTime;
      const completeExecution: AgentExecution = {
        ...(execution as AgentExecution),
        result: finalResult,
        duration,
        success: true,
      };

      await logAgentExecution(completeExecution);
      await this.performanceMonitor(completeExecution);

      return finalResult;
    } catch (error) {
      const duration = Date.now() - startTime;
      const failedExecution: AgentExecution = {
        ...(execution as AgentExecution),
        result: null,
        duration,
        success: false,
      };

      await logAgentExecution(failedExecution);
      throw error;
    }
  }

  /**
   * Analyze case complexity and determine requirements
   */
  private async analyzeCaseComplexity(caseData: CaseData) {
    const { object: analysis } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        complexity: z.enum(["low", "medium", "high", "critical"]),
        complexityFactors: z.array(
          z.object({
            factor: z.string(),
            impact: z.enum(["low", "medium", "high"]),
            description: z.string(),
          })
        ),
        requiredCapabilities: z.array(z.string()),
        estimatedDuration: z.number(),
        riskFactors: z.array(z.string()),
        specialRequirements: z.array(z.string()),
      }),
      system: `You are an expert case complexity analyzer for immigration cases. 
      Analyze cases to determine optimal processing approach and required capabilities.
      
      Consider factors like:
      - Document complexity and volume
      - Legal precedent requirements
      - Multi-jurisdictional issues
      - Time sensitivity
      - Risk factors
      - Special circumstances`,
      prompt: `Analyze the complexity of this immigration case:
      
      Case Type: ${caseData.caseType}
      Country: ${caseData.country}
      Documents: ${caseData.documents.length} documents
      Timeline: ${JSON.stringify(caseData.timeline)}
      Special Circumstances: ${caseData.specialCircumstances || "None"}
      
      Provide detailed complexity analysis and capability requirements.`,
    });

    return analysis;
  }

  /**
   * Compose optimal agent team based on case requirements and agent performance
   */
  private async composeAgentTeam(
    caseAnalysis: any,
    caseData: CaseData
  ): Promise<TeamComposition> {
    // Get current agent specializations and performance metrics
    const availableAgents = await this.getAvailableAgents();
    const performanceHistory = await this.getAgentPerformanceHistory();

    const { object: teamComposition } = await generateObject({
      model: openai("gpt-4o"),
      schema: TeamCompositionSchema,
      system: `You are an intelligent team composition specialist. 
      Select the optimal combination of agents based on:
      - Case requirements and complexity
      - Agent specializations and capabilities
      - Historical performance data
      - Collaboration patterns
      - Resource constraints`,
      prompt: `Compose optimal agent team for this case:
      
      Case Analysis: ${JSON.stringify(caseAnalysis)}
      Available Agents: ${JSON.stringify(availableAgents)}
      Performance History: ${JSON.stringify(performanceHistory)}
      
      Select agents that will maximize success probability while minimizing time and cost.`,
    });

    return teamComposition;
  }

  /**
   * Optimize workflow based on historical performance data
   */
  private async optimizeWorkflow(
    teamComposition: TeamComposition,
    caseData: CaseData
  ): Promise<WorkflowOptimization> {
    const historicalWorkflows = await this.getHistoricalWorkflows(
      caseData.caseType
    );

    const { object: optimization } = await generateObject({
      model: openai("gpt-4o"),
      schema: WorkflowOptimizationSchema,
      system: `You are a workflow optimization specialist. 
      Optimize agent workflows based on:
      - Historical performance data
      - Agent capabilities and load
      - Dependency analysis
      - Parallel execution opportunities
      - Risk mitigation strategies`,
      prompt: `Optimize workflow for this team composition:
      
      Team: ${JSON.stringify(teamComposition)}
      Historical Workflows: ${JSON.stringify(historicalWorkflows)}
      Case Type: ${caseData.caseType}
      
      Create optimized workflow that maximizes efficiency and quality.`,
    });

    // Cache optimization for similar cases
    const cacheKey = generateCacheKey(
      "workflow_optimization",
      caseData.caseType
    );
    await cacheAgentResult(cacheKey, optimization, 7200); // 2 hour cache

    return optimization;
  }

  /**
   * Execute workflow with intelligent coordination
   */
  private async executeIntelligentWorkflow(
    workflow: WorkflowOptimization,
    caseData: CaseData
  ): Promise<Record<string, any>> {
    const results: Record<string, any> = {};
    const executionPlan = this.createExecutionPlan(workflow);

    // Execute steps according to optimized plan
    for (const phase of executionPlan) {
      if (phase.type === "parallel") {
        // Execute parallel steps
        const phaseResults = await Promise.all(
          phase.steps.map((step) => this.executeStep(step, caseData, results))
        );

        // Merge results
        phaseResults.forEach((result, index) => {
          results[phase.steps[index].stepId] = result;
        });
      } else {
        // Execute sequential steps
        for (const step of phase.steps) {
          const stepResult = await this.executeStep(step, caseData, results);
          results[step.stepId] = stepResult;
        }
      }
    }

    return results;
  }

  /**
   * Execute individual workflow step with intelligent agent selection
   */
  private async executeStep(
    step: any,
    caseData: CaseData,
    previousResults: Record<string, any>
  ): Promise<any> {
    const stepExecutor = withAgentErrorHandling(async () => {
      // Select best agent for this step based on current performance
      const selectedAgent = await this.selectBestAgent(
        step.agentType,
        step,
        caseData
      );

      // Execute with selected agent
      return await this.executeWithAgent(
        selectedAgent,
        step,
        caseData,
        previousResults
      );
    });

    return await stepExecutor();
  }

  /**
   * Select best agent based on current performance and specialization
   */
  private async selectBestAgent(
    agentType: string,
    step: any,
    caseData: CaseData
  ): Promise<string> {
    const candidates = await this.getAgentCandidates(agentType);

    const { object: selection } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        selectedAgent: z.string(),
        selectionReason: z.string(),
        confidence: z.number().min(0).max(100),
      }),
      system:
        "You are an agent selection specialist. Choose the best agent for each task based on performance and specialization.",
      prompt: `Select best agent for this step:
      
      Step: ${JSON.stringify(step)}
      Candidates: ${JSON.stringify(candidates)}
      Case Context: ${caseData.caseType} - ${caseData.country}
      
      Choose agent with highest success probability for this specific task.`,
    });

    return selection.selectedAgent;
  }

  /**
   * Execute task with specific agent
   */
  private async executeWithAgent(
    agentId: string,
    step: any,
    caseData: CaseData,
    context: Record<string, any>
  ): Promise<any> {
    // This would integrate with the specific agent implementation
    // For now, we'll simulate the execution
    const { object: result } = await generateObject({
      model: openai(getModelForTask(step.agentType)),
      schema: z.object({
        result: z.any(),
        confidence: z.number().min(0).max(100),
        executionTime: z.number(),
        qualityScore: z.number().min(0).max(100),
      }),
      system: `You are agent ${agentId} executing step ${step.stepId}. 
      Use your specialized capabilities to complete this task effectively.`,
      prompt: `Execute this step:
      
      Step: ${JSON.stringify(step)}
      Case Data: ${JSON.stringify(caseData)}
      Context: ${JSON.stringify(context)}
      
      Complete the task using your specialized knowledge and capabilities.`,
    });

    return result;
  }

  /**
   * Learn from execution and update agent capabilities
   */
  private async learnFromExecution(
    teamComposition: TeamComposition,
    results: Record<string, any>,
    caseData: CaseData
  ): Promise<void> {
    // Analyze execution performance
    const performanceAnalysis = await this.analyzeExecutionPerformance(
      teamComposition,
      results,
      caseData
    );

    // Generate learning insights
    const { object: learning } = await generateObject({
      model: openai("gpt-4o"),
      schema: AgentLearningSchema,
      system: `You are an agent learning specialist. 
      Analyze execution results to generate insights and improvements for agent capabilities.
      
      Focus on:
      - Performance patterns
      - Success factors
      - Failure modes
      - Collaboration effectiveness
      - Capability gaps`,
      prompt: `Analyze this execution for learning opportunities:
      
      Team Composition: ${JSON.stringify(teamComposition)}
      Results: ${JSON.stringify(results)}
      Performance Analysis: ${JSON.stringify(performanceAnalysis)}
      
      Generate actionable insights for improving agent capabilities.`,
    });

    // Update agent specializations based on learning
    await this.updateAgentCapabilities(learning);
  }

  /**
   * Update agent capabilities based on learning insights
   */
  private async updateAgentCapabilities(
    learning: AgentLearning
  ): Promise<void> {
    const currentSpecialization = this.agentSpecializations.get(
      learning.agentType
    );

    if (currentSpecialization) {
      // Update capabilities based on learning
      learning.updatedCapabilities.forEach((update) => {
        const capability = currentSpecialization.capabilities.find(
          (cap) => cap.capability === update.capability
        );

        if (capability) {
          capability.proficiency = update.newProficiency;
          capability.lastAssessed = new Date();
        } else {
          currentSpecialization.capabilities.push({
            capability: update.capability,
            proficiency: update.newProficiency,
            lastAssessed: new Date(),
          });
        }
      });

      // Update performance metrics
      currentSpecialization.performanceMetrics.lastUpdated = new Date();

      this.agentSpecializations.set(learning.agentType, currentSpecialization);
    }
  }

  /**
   * Create execution plan from optimized workflow
   */
  private createExecutionPlan(workflow: WorkflowOptimization): any[] {
    // Analyze dependencies and create phases
    const phases: any[] = [];
    const processedSteps = new Set<string>();

    while (processedSteps.size < workflow.optimizedSteps.length) {
      const parallelSteps = workflow.optimizedSteps.filter(
        (step) =>
          !processedSteps.has(step.stepId) &&
          step.dependencies.every((dep) => processedSteps.has(dep))
      );

      if (parallelSteps.length > 1) {
        phases.push({
          type: "parallel",
          steps: parallelSteps,
        });
      } else if (parallelSteps.length === 1) {
        phases.push({
          type: "sequential",
          steps: parallelSteps,
        });
      }

      parallelSteps.forEach((step) => processedSteps.add(step.stepId));
    }

    return phases;
  }

  /**
   * Synthesize results from intelligent workflow execution
   */
  private async synthesizeResults(
    caseData: CaseData,
    results: Record<string, any>
  ): Promise<ProcessedCaseData> {
    const { text: summary } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an intelligent case synthesis specialist. 
      Combine results from multiple specialized agents into comprehensive recommendations.
      
      Focus on:
      - Coherent narrative
      - Actionable insights
      - Risk mitigation
      - Next steps
      - Quality assurance`,
      prompt: `Synthesize results from intelligent agent orchestration:
      
      Case: ${JSON.stringify(caseData)}
      Agent Results: ${JSON.stringify(results, null, 2)}
      
      Create comprehensive analysis with clear recommendations and next steps.`,
    });

    return {
      caseData,
      documentAnalysis: results.document_analysis || {},
      policyCompliance: results.policy_compliance || {},
      riskAssessment: results.risk_assessment || {},
      recommendations: [summary],
      orchestrationMetadata: {
        workflowType: "intelligent_orchestration",
        agentsUsed: Object.keys(results),
        optimizationApplied: true,
        learningEnabled: true,
      },
    };
  }

  // Helper methods for data access
  private async getAvailableAgents(): Promise<AgentSpecialization[]> {
    return Array.from(this.agentSpecializations.values());
  }

  private async getAgentPerformanceHistory(): Promise<Record<string, any>> {
    const history: Record<string, any> = {};
    this.historicalPerformance.forEach((executions, agentType) => {
      history[agentType] = {
        totalExecutions: executions.length,
        successRate:
          executions.filter((e) => e.success).length / executions.length,
        averageDuration:
          executions.reduce((sum, e) => sum + e.duration, 0) /
          executions.length,
      };
    });
    return history;
  }

  private async getHistoricalWorkflows(
    caseType: string
  ): Promise<WorkflowOptimization[]> {
    return Array.from(this.workflowOptimizations.values()).filter((opt) =>
      opt.workflowId.includes(caseType)
    );
  }

  private async getAgentCandidates(agentType: string): Promise<any[]> {
    return Array.from(this.agentSpecializations.values()).filter(
      (spec) =>
        spec.agentType === agentType || spec.specializations.includes(agentType)
    );
  }

  private async analyzeExecutionPerformance(
    teamComposition: TeamComposition,
    results: Record<string, any>,
    caseData: CaseData
  ): Promise<any> {
    return {
      teamEffectiveness: this.calculateTeamEffectiveness(
        teamComposition,
        results
      ),
      individualPerformance: this.calculateIndividualPerformance(results),
      collaborationQuality: this.assessCollaborationQuality(
        teamComposition,
        results
      ),
      outcomeQuality: this.assessOutcomeQuality(results, caseData),
    };
  }

  private calculateTeamEffectiveness(
    teamComposition: TeamComposition,
    results: Record<string, any>
  ): number {
    // Calculate based on team composition and results
    return 85; // Placeholder
  }

  private calculateIndividualPerformance(
    results: Record<string, any>
  ): Record<string, number> {
    // Calculate individual agent performance scores
    const performance: Record<string, number> = {};
    Object.keys(results).forEach((key) => {
      performance[key] = 80; // Placeholder
    });
    return performance;
  }

  private assessCollaborationQuality(
    teamComposition: TeamComposition,
    results: Record<string, any>
  ): number {
    // Assess how well agents collaborated
    return 90; // Placeholder
  }

  private assessOutcomeQuality(
    results: Record<string, any>,
    caseData: CaseData
  ): number {
    // Assess overall quality of the outcome
    return 88; // Placeholder
  }
}
