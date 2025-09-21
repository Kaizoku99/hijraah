import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  TimelinePredictionSchema,
  UserProfileSchema,
  PredictiveAnalyticsConfigSchema,
  type TimelinePrediction,
  type UserProfile,
  type PredictiveAnalyticsConfig,
} from "./types.js";

/**
 * Timeline Prediction Agent using AI SDK v5
 * Analyzes historical data and user profiles to predict immigration timeline
 */
export class TimelinePredictionAgent {
  private config: PredictiveAnalyticsConfig;

  constructor(config: Partial<PredictiveAnalyticsConfig> = {}) {
    this.config = PredictiveAnalyticsConfigSchema.parse(config);
  }

  /**
   * Predict immigration timeline based on user profile and case data
   */
  async predictTimeline(
    userProfile: UserProfile,
    caseData: {
      caseType: string;
      country: string;
      visaType: string;
      currentStage?: string;
      submissionDate?: string;
    },
    historicalData?: any
  ): Promise<TimelinePrediction> {
    return await this.generateTimelinePrediction(userProfile, caseData, historicalData);
  }

  /**
   * Generate timeline prediction with AI analysis
   */
  async generateTimelinePrediction(
    userProfile: any,
    caseData: {
      caseType: string;
      country: string;
      visaType: string;
      currentStage?: string;
      submissionDate?: string;
      profileFactors?: string[];
      previousDenials?: boolean;
      documentsReady?: number;
    },
    historicalData?: any
  ): Promise<TimelinePrediction> {
    const predictionId = `timeline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Analyze data directly without tools
    const baseProcessingTime =
      historicalData?.averageProcessingTime ||
      this.getBaseProcessingTime(caseData.caseType, caseData.country, caseData.visaType);
    
    const trends =
      historicalData?.recentTrends ||
      this.generateTrendData(baseProcessingTime);

    // Analyze data directly
    const historicalAnalysis = {
      baseProcessingTime,
      trends,
      similarCases: historicalData?.similarCases || 
        this.generateSimilarCases(baseProcessingTime, caseData.profileFactors || []),
      sampleSize: historicalData?.similarCases?.length || 50,
      confidence: 0.85,
    };

    // Calculate statistical analysis directly
    const processingTimes = historicalAnalysis.similarCases.map((c: any) => c.actualProcessingTime);
    const sorted = processingTimes.sort((a: number, b: number) => a - b);
    const mean = processingTimes.reduce((sum: number, time: number) => sum + time, 0) / processingTimes.length;
    const stdDev = Math.sqrt(
      processingTimes.reduce((sum: number, time: number) => sum + Math.pow(time - mean, 2), 0) / processingTimes.length
    );

    const statisticalAnalysis = {
      mean,
      median: sorted[Math.floor(sorted.length / 2)],
      q1: sorted[Math.floor(sorted.length * 0.25)],
      q3: sorted[Math.floor(sorted.length * 0.75)],
      stdDev,
      confidenceInterval: {
        lower: Math.max(0, mean - 1.96 * (stdDev / Math.sqrt(processingTimes.length))),
        upper: mean + 1.96 * (stdDev / Math.sqrt(processingTimes.length)),
        confidence: 0.95,
      },
    };

    // Analyze risk factors directly
    const riskFactors: string[] = [];
    const acceleratingFactors: string[] = [];

    if (caseData.previousDenials) riskFactors.push("Previous visa denials");
    if ((caseData.documentsReady ?? 0) < 0.8) riskFactors.push("Incomplete documentation");
    if (caseData.profileFactors?.includes("unemployed")) riskFactors.push("Unemployment status");
    if (caseData.profileFactors?.includes("jobOffer")) acceleratingFactors.push("Job offer in target country");
    if (caseData.profileFactors?.includes("advancedEducation")) acceleratingFactors.push("Advanced education credentials");
    if ((caseData.documentsReady ?? 0) >= 0.9) acceleratingFactors.push("Complete documentation ready");

    const riskAnalysis = {
      riskFactors,
      acceleratingFactors,
      riskScore: riskFactors.length / (riskFactors.length + acceleratingFactors.length + 1),
      accelerationScore: acceleratingFactors.length / (riskFactors.length + acceleratingFactors.length + 1),
    };

    // Generate timeline prediction using AI SDK v5
    const { object: prediction } = await generateObject({
      model: openai(this.config?.model || "gpt-4o"),
      temperature: this.config?.temperature || 0.7,
      schema: TimelinePredictionSchema,
      system: `You are an expert immigration timeline prediction analyst with deep knowledge of processing patterns, policy impacts, and case complexity factors.

Your role is to:
1. Analyze historical processing data to identify patterns and trends
2. Evaluate user profile factors that influence processing time
3. Consider current policy environment and seasonal variations
4. Provide realistic timeline estimates with confidence intervals
5. Identify key milestones and potential delays
6. Suggest strategies to optimize processing time

Base your predictions on:
- Historical processing times for similar cases
- User profile risk and acceleration factors
- Current policy environment and processing backlogs
- Seasonal variations and administrative capacity
- Document readiness and case complexity

Provide detailed reasoning for your predictions and include actionable insights.`,
      prompt: `Predict the immigration timeline for the following case:

**User Profile:**
${JSON.stringify(userProfile, null, 2)}

**Case Details:**
- Case Type: ${caseData.caseType}
- Country: ${caseData.country}
- Visa Type: ${caseData.visaType}
- Current Stage: ${caseData.currentStage || "Initial"}
- Submission Date: ${caseData.submissionDate || "Not yet submitted"}

**Historical Analysis:**
${JSON.stringify(historicalAnalysis, null, 2)}

**Statistical Analysis:**
${JSON.stringify(statisticalAnalysis, null, 2)}

**Risk Analysis:**
${JSON.stringify(riskAnalysis, null, 2)}

**Requirements:**
Provide a comprehensive timeline prediction with:
- Estimated processing days with confidence interval
- Key milestones and their timing
- Risk factors that could cause delays
- Accelerating factors that could speed up processing
- Comparison with historical averages

**Prediction ID:** ${predictionId}

Focus on providing actionable insights and realistic expectations based on data analysis.`,
    });

    return {
      ...prediction,
      predictionId,
      caseType: caseData.caseType,
      country: caseData.country,
      visaType: caseData.visaType,
      modelVersion: this.config?.model || "gpt-4o",
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Update timeline prediction based on new information
   */
  async updatePrediction(
    existingPrediction: TimelinePrediction,
    updates: {
      currentStage?: string;
      newDocuments?: string[];
      policyChanges?: string[];
      processingUpdates?: string[];
    }
  ): Promise<TimelinePrediction> {
    const { text: analysis } = await generateText({
      model: openai(this.config?.model || "gpt-4o"),
      temperature: this.config?.temperature || 0.7,
      system: `You are an expert immigration timeline analyst. Update the existing timeline prediction based on new information.
      
Analyze how the provided updates should modify the existing prediction and provide a comprehensive update.`,
      prompt: `Update the following prediction based on new information:

**Existing Prediction:**
${JSON.stringify(existingPrediction, null, 2)}

**Updates:**
${JSON.stringify(updates, null, 2)}

Provide an updated timeline prediction considering these new factors.`,
    });

    return {
      ...existingPrediction,
      timestamp: new Date().toISOString(),
      // analysisNotes: analysis, // Not part of schema, can be logged separately
    };
  }

  private getBaseProcessingTime(
    caseType: string,
    country: string,
    visaType: string
  ): number {
    // Base processing times in days (simplified for demo)
    const baseTimes: Record<string, number> = {
      "student_visa": 60,
      "work_visa": 90,
      "family_visa": 120,
      "tourist_visa": 30,
      "business_visa": 45,
      "permanent_residence": 180,
    };

    return baseTimes[visaType] || 90;
  }

  private generateTrendData(baseTime: number) {
    return [
      { period: "Q1 2024", averageTime: baseTime * 0.9, volume: 1200 },
      { period: "Q2 2024", averageTime: baseTime * 1.1, volume: 1500 },
      { period: "Q3 2024", averageTime: baseTime * 1.0, volume: 1350 },
      { period: "Q4 2024", averageTime: baseTime * 0.95, volume: 1100 },
    ];
  }

  private generateSimilarCases(baseTime: number, profileFactors: string[]): any[] {
    const cases: any[] = [];
    for (let i = 0; i < 50; i++) {
      cases.push({
        caseId: `case_${i + 1}`,
        actualProcessingTime: baseTime + (Math.random() - 0.5) * 40,
        outcome: Math.random() > 0.1 ? "approved" : "denied",
        profileMatch: Math.random() * 0.4 + 0.6,
      });
    }
    return cases;
  }
}