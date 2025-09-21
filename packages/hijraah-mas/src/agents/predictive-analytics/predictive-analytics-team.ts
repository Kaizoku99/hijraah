import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { TimelinePredictionAgent } from "./timeline-prediction-agent.js";
import { SuccessProbabilityAgent } from "./success-probability-agent.js";
import { RiskAssessmentAgent } from "./risk-assessment-agent.js";
import { CostEstimationAgent } from "./cost-estimation-agent.js";
import { RecommendationAgent } from "./recommendation-agent.js";
import {
  UserProfileSchema,
  PredictiveAnalyticsConfigSchema,
  type UserProfile,
  type PredictiveAnalyticsConfig,
  type TimelinePrediction,
  type SuccessProbability,
  type RiskAssessment,
  type CostEstimation,
  type Recommendation,
} from "./types.js";

/**
 * Comprehensive analysis result from the predictive analytics team
 */
export const PredictiveAnalysisResultSchema = z.object({
  analysisId: z.string(),
  caseType: z.string(),
  country: z.string(),
  visaType: z.string(),
  timelinePrediction: z.any(), // TimelinePredictionSchema
  successProbability: z.any(), // SuccessProbabilitySchema
  riskAssessment: z.any(), // RiskAssessmentSchema
  costEstimation: z.any(), // CostEstimationSchema
  recommendations: z.any(), // RecommendationSchema
  overallInsights: z.object({
    keyFindings: z.array(z.string()),
    criticalActions: z.array(z.string()),
    successFactors: z.array(z.string()),
    majorRisks: z.array(z.string()),
    budgetSummary: z.string(),
    timelineSummary: z.string(),
    confidenceLevel: z.number().min(0).max(1),
  }),
  agentCoordination: z.object({
    agentsUsed: z.array(z.string()),
    processingTime: z.number(),
    dataQuality: z.number().min(0).max(1),
    consensusLevel: z.number().min(0).max(1),
  }),
  timestamp: z.string(),
});

export type PredictiveAnalysisResult = z.infer<
  typeof PredictiveAnalysisResultSchema
>;

/**
 * Predictive Analytics Team using AI SDK v5
 * Coordinates multiple specialized agents for comprehensive immigration analysis
 */
export class PredictiveAnalyticsTeam {
  private config: PredictiveAnalyticsConfig;
  private timelineAgent: TimelinePredictionAgent;
  private successAgent: SuccessProbabilityAgent;
  private riskAgent: RiskAssessmentAgent;
  private costAgent: CostEstimationAgent;
  private recommendationAgent: RecommendationAgent;

  constructor(config: Partial<PredictiveAnalyticsConfig> = {}) {
    this.config = PredictiveAnalyticsConfigSchema.parse(config);

    // Initialize specialized agents
    this.timelineAgent = new TimelinePredictionAgent(this.config);
    this.successAgent = new SuccessProbabilityAgent(this.config);
    this.riskAgent = new RiskAssessmentAgent(this.config);
    this.costAgent = new CostEstimationAgent(this.config);
    this.recommendationAgent = new RecommendationAgent(this.config);
  }

  /**
   * Perform comprehensive predictive analysis using coordinated agents
   */
  async performComprehensiveAnalysis(
    userProfile: UserProfile,
    caseData: {
      caseType: string;
      country: string;
      visaType: string;
      applicationStage?: string;
      urgency?: "low" | "medium" | "high" | "critical";
      familyMembers?: number;
      expeditedProcessing?: boolean;
    },
    preferences?: {
      riskTolerance?: "conservative" | "moderate" | "aggressive";
      budgetConstraints?: number;
      timeConstraints?: string;
      priorities?: string[];
      currency?: string;
      includeLegalFees?: boolean;
      includeOptionalServices?: boolean;
    },
    contextData?: {
      currentPolicies?: string[];
      recentChanges?: string[];
      processingBacklogs?: boolean;
      seasonalFactors?: string[];
      historicalData?: any;
    }
  ): Promise<PredictiveAnalysisResult> {
    const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    try {
      // Step 1: Parallel execution of core analytical agents
      console.log("🔄 Starting parallel agent execution...");

      const [
        timelinePrediction,
        successProbability,
        riskAssessment,
        costEstimation,
      ] = await Promise.all([
        this.timelineAgent.predictTimeline(
          userProfile,
          caseData,
          contextData?.historicalData?.timeline
        ),
        this.successAgent.calculateSuccessProbability(
          userProfile,
          caseData,
          contextData?.historicalData?.success
        ),
        this.riskAgent.assessRisks(userProfile, caseData, contextData),
        this.costAgent.estimateCosts(userProfile, caseData, preferences),
      ]);

      console.log("✅ Core analysis completed");

      // Step 2: Generate comprehensive recommendations based on all analyses
      console.log("🔄 Generating recommendations...");

      const recommendations =
        await this.recommendationAgent.generateRecommendations(
          userProfile,
          caseData,
          {
            timelinePrediction,
            successProbability,
            riskAssessment,
            costEstimation,
          },
          preferences
        );

      console.log("✅ Recommendations generated");

      // Step 3: Generate overall insights using AI SDK v5 orchestrator
      console.log("🔄 Synthesizing overall insights...");

      const { object: overallInsights } = await generateObject({
        model: openai(this.config.model),
        temperature: this.config.temperature,
        schema: z.object({
          keyFindings: z.array(z.string()),
          criticalActions: z.array(z.string()),
          successFactors: z.array(z.string()),
          majorRisks: z.array(z.string()),
          budgetSummary: z.string(),
          timelineSummary: z.string(),
          confidenceLevel: z.number().min(0).max(1),
        }),
        system: `You are an expert immigration analysis synthesizer. Your role is to analyze the results from multiple specialized agents and provide comprehensive insights.

Synthesize the findings from:
1. Timeline Prediction Agent - Processing time estimates and milestones
2. Success Probability Agent - Approval likelihood and improvement factors
3. Risk Assessment Agent - Potential risks and mitigation strategies
4. Cost Estimation Agent - Comprehensive cost breakdown and budget planning
5. Recommendation Agent - Personalized action plans and strategies

Provide clear, actionable insights that help users understand their immigration prospects and next steps.`,
        prompt: `Synthesize the following comprehensive immigration analysis:

**Timeline Prediction:**
- Estimated Days: ${timelinePrediction.estimatedDays}
- Confidence: ${timelinePrediction.confidenceInterval.confidence}
- Risk Factors: ${timelinePrediction.riskFactors.join(", ")}

**Success Probability:**
- Success Rate: ${(successProbability.successProbability * 100).toFixed(1)}%
- Risk Level: ${successProbability.riskLevel}
- Key Factors: ${successProbability.factors.map((f) => f.factor).join(", ")}

**Risk Assessment:**
- Overall Risk Score: ${riskAssessment.overallRiskScore}/100
- Risk Level: ${riskAssessment.riskLevel}
- Major Risks: ${riskAssessment.riskFactors.map((r) => r.factor).join(", ")}

**Cost Estimation:**
- Total Cost: ${costEstimation.totalEstimatedCost} ${costEstimation.currency}
- Major Categories: ${Object.keys(costEstimation.costCategories).join(", ")}

**Recommendations:**
- Strategy: ${recommendations.overallStrategy}
- Action Items: ${recommendations.actionPlan.length} actions
- Priority Actions: ${recommendations.actionPlan.filter((a) => a.priority === "critical").length} critical

Provide comprehensive insights that synthesize all this information into actionable guidance.`,
      });

      const processingTime = Date.now() - startTime;

      console.log("✅ Analysis synthesis completed");

      // Calculate agent coordination metrics
      const agentCoordination = {
        agentsUsed: ["timeline", "success", "risk", "cost", "recommendation"],
        processingTime,
        dataQuality: this.calculateDataQuality(userProfile, caseData),
        consensusLevel: this.calculateConsensusLevel([
          timelinePrediction,
          successProbability,
          riskAssessment,
          costEstimation,
          recommendations,
        ]),
      };

      const result: PredictiveAnalysisResult = {
        analysisId,
        caseType: caseData.caseType,
        country: caseData.country,
        visaType: caseData.visaType,
        timelinePrediction,
        successProbability,
        riskAssessment,
        costEstimation,
        recommendations,
        overallInsights,
        agentCoordination,
        timestamp: new Date().toISOString(),
      };

      console.log(`🎉 Comprehensive analysis completed in ${processingTime}ms`);
      return result;
    } catch (error) {
      console.error("❌ Error in comprehensive analysis:", error);
      throw new Error(
        `Predictive analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Perform quick analysis with essential insights only
   */
  async performQuickAnalysis(
    userProfile: UserProfile,
    caseData: {
      caseType: string;
      country: string;
      visaType: string;
    }
  ): Promise<{
    successProbability: number;
    estimatedTimeline: number;
    majorRisks: string[];
    estimatedCost: number;
    topRecommendations: string[];
  }> {
    console.log("🔄 Starting quick analysis...");

    // Run essential analyses in parallel
    const [successResult, timelineResult, riskResult] = await Promise.all([
      this.successAgent.calculateSuccessProbability(userProfile, caseData),
      this.timelineAgent.predictTimeline(userProfile, caseData),
      this.riskAgent.assessRisks(userProfile, caseData),
    ]);

    // Quick cost estimation
    const costResult = await this.costAgent.estimateCosts(
      userProfile,
      caseData
    );

    // Generate quick recommendations
    const { text: quickRecommendations } = await generateText({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      system:
        "Provide top 3 immigration recommendations based on analysis results.",
      prompt: `Based on the analysis results, provide the top 3 most important recommendations:
      
Success Probability: ${(successResult.successProbability * 100).toFixed(1)}%
Timeline: ${timelineResult.estimatedDays} days
Major Risks: ${riskResult.riskFactors
        .slice(0, 3)
        .map((r) => r.factor)
        .join(", ")}
Cost: ${costResult.totalEstimatedCost} ${costResult.currency}`,
    });

    console.log("✅ Quick analysis completed");

    return {
      successProbability: successResult.successProbability,
      estimatedTimeline: timelineResult.estimatedDays,
      majorRisks: riskResult.riskFactors.slice(0, 3).map((r) => r.factor),
      estimatedCost: costResult.totalEstimatedCost,
      topRecommendations: quickRecommendations
        .split("\n")
        .filter((line) => line.trim())
        .slice(0, 3),
    };
  }

  /**
   * Update existing analysis with new information
   */
  async updateAnalysis(
    existingAnalysis: PredictiveAnalysisResult,
    updates: {
      profileUpdates?: Partial<UserProfile>;
      caseUpdates?: Record<string, any>;
      completedActions?: string[];
      newCircumstances?: Record<string, any>;
    }
  ): Promise<PredictiveAnalysisResult> {
    console.log("🔄 Updating existing analysis...");

    // For now, return the existing analysis with updated timestamp
    // In a full implementation, this would selectively update relevant analyses
    const updatedAnalysis = {
      ...existingAnalysis,
      timestamp: new Date().toISOString(),
    };

    console.log("✅ Analysis updated");
    return updatedAnalysis;
  }

  private calculateDataQuality(
    userProfile: UserProfile,
    caseData: any
  ): number {
    let qualityScore = 0;
    let totalFactors = 0;

    // Check profile completeness
    const profileFields = [
      userProfile.demographics?.nationality,
      userProfile.demographics?.currentCountry,
      userProfile.education?.level,
      userProfile.employment?.status,
      userProfile.language?.native,
      userProfile.immigration?.visaType,
      userProfile.financial?.savings,
    ];

    profileFields.forEach((field) => {
      totalFactors++;
      if (field !== undefined && field !== null) {
        qualityScore++;
      }
    });

    // Check case data completeness
    const caseFields = [caseData.caseType, caseData.country, caseData.visaType];
    caseFields.forEach((field) => {
      totalFactors++;
      if (field) {
        qualityScore++;
      }
    });

    return totalFactors > 0 ? qualityScore / totalFactors : 0;
  }

  private calculateConsensusLevel(analyses: any[]): number {
    // Simple consensus calculation based on confidence levels
    // In a full implementation, this would analyze agreement between agents
    const confidenceLevels = analyses
      .map((analysis) => {
        if (analysis.confidence) return analysis.confidence;
        if (analysis.confidenceInterval)
          return analysis.confidenceInterval.confidence;
        return 0.8; // Default confidence
      })
      .filter((conf) => conf > 0);

    return confidenceLevels.length > 0
      ? confidenceLevels.reduce((sum, conf) => sum + conf, 0) /
          confidenceLevels.length
      : 0.8;
  }
}
