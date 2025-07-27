/**
 * Policy Change Detection Engine
 *
 * AI-powered engine for detecting, categorizing, and analyzing changes in immigration policies.
 * Uses Trigger.dev for real-time processing and AI SDK for intelligent analysis.
 */

import { generateText, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { task, metadata, logger } from "@trigger.dev/sdk/v3";

// Policy change detection schemas
export const PolicyChangeSchema = z.object({
  id: z.string(),
  type: z.enum([
    "requirement_change",
    "fee_change",
    "timeline_change",
    "eligibility_change",
    "process_change",
    "document_change",
    "policy_addition",
    "policy_removal",
    "other",
  ]),
  severity: z.enum(["critical", "high", "medium", "low"]),
  confidence: z.number().min(0).max(1),
  title: z.string(),
  description: z.string(),
  impactedAreas: z.array(z.string()),
  effectiveDate: z.string().optional(),
  previousValue: z.string().optional(),
  newValue: z.string().optional(),
  affectedPopulation: z.array(z.string()),
  estimatedImpact: z.object({
    userCount: z.number().optional(),
    processingTimeChange: z.string().optional(),
    costChange: z.string().optional(),
  }),
  sourceUrl: z.string().url(),
  detectedAt: z.string(),
});

export const PolicyChangeAnalysisSchema = z.object({
  changes: z.array(PolicyChangeSchema),
  summary: z.object({
    totalChanges: z.number(),
    criticalChanges: z.number(),
    highPriorityChanges: z.number(),
    mostImpactedAreas: z.array(z.string()),
    overallImpactLevel: z.enum(["critical", "high", "medium", "low"]),
  }),
  recommendations: z.array(
    z.object({
      action: z.string(),
      priority: z.enum(["urgent", "high", "medium", "low"]),
      description: z.string(),
      affectedUsers: z.array(z.string()),
    }),
  ),
});

export type PolicyChange = z.infer<typeof PolicyChangeSchema>;
export type PolicyChangeAnalysis = z.infer<typeof PolicyChangeAnalysisSchema>;

// Change detection configuration
export interface ChangeDetectionConfig {
  country: string;
  policyType: string;
  currentContent: string;
  previousContent?: string;
  sourceUrl: string;
  language?: string;
  enableSemanticAnalysis?: boolean;
  confidenceThreshold?: number;
}

/**
 * Policy Change Detection Engine
 */
export class PolicyChangeDetectionEngine {
  private supabaseClient: any;
  private aiModel: any;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
    this.aiModel = openai("gpt-4o");
  }

  /**
   * Detect changes between two policy versions
   */
  async detectChanges(
    config: ChangeDetectionConfig,
  ): Promise<PolicyChangeAnalysis> {
    try {
      logger.info("🔍 Starting policy change detection", {
        country: config.country,
        policyType: config.policyType,
        sourceUrl: config.sourceUrl,
      });

      // Step 1: Perform AI-powered change detection
      const changeAnalysis = await this.performAIChangeDetection(config);

      // Step 2: Enhance with semantic analysis if enabled
      if (config.enableSemanticAnalysis) {
        await this.enhanceWithSemanticAnalysis(changeAnalysis, config);
      }

      // Step 3: Filter by confidence threshold
      const filteredAnalysis = this.filterByConfidence(
        changeAnalysis,
        config.confidenceThreshold || 0.7,
      );

      // Step 4: Store detected changes
      await this.storeChanges(filteredAnalysis, config);

      logger.info("✅ Policy change detection completed", {
        totalChanges: filteredAnalysis.changes.length,
        criticalChanges: filteredAnalysis.summary.criticalChanges,
        overallImpact: filteredAnalysis.summary.overallImpactLevel,
      });

      return filteredAnalysis;
    } catch (error: any) {
      logger.error("❌ Policy change detection failed", {
        error: error.message,
        config,
      });
      throw error;
    }
  }

  /**
   * Perform AI-powered change detection using structured output
   */
  private async performAIChangeDetection(
    config: ChangeDetectionConfig,
  ): Promise<PolicyChangeAnalysis> {
    const systemPrompt = `You are an expert immigration policy analyst specializing in detecting and categorizing policy changes.
    
Your task is to analyze immigration policy content and identify specific changes, their impact, and provide actionable recommendations.

Key responsibilities:
1. Identify specific changes in requirements, fees, timelines, eligibility, processes, or documents
2. Categorize the severity and type of each change
3. Assess the confidence level of each detection
4. Estimate the impact on different user populations
5. Provide actionable recommendations

Focus on:
- Concrete, actionable changes that affect users
- Changes in numerical values (fees, timelines, requirements)
- New or removed requirements
- Process modifications
- Eligibility criteria changes

Country: ${config.country}
Policy Type: ${config.policyType}
Language: ${config.language || "English"}`;

    const userPrompt = config.previousContent
      ? `Compare these two versions of the immigration policy and identify all changes:

PREVIOUS VERSION:
${config.previousContent}

CURRENT VERSION:
${config.currentContent}

Identify all differences, changes, additions, and removals. Focus on changes that would impact users applying for immigration.`
      : `Analyze this immigration policy content and identify any recent changes, updates, or modifications that may have occurred:

POLICY CONTENT:
${config.currentContent}

Look for indicators of recent changes such as:
- "Updated on", "Effective from", "New requirement"
- Changes in dates, fees, or timelines
- Modified processes or requirements
- Added or removed sections`;

    try {
      const { object: analysis } = await generateObject({
        model: this.aiModel,
        system: systemPrompt,
        prompt: userPrompt,
        schema: PolicyChangeAnalysisSchema,
        experimental_telemetry: {
          isEnabled: true,
          functionId: "policy-change-detection",
          metadata: {
            country: config.country,
            policyType: config.policyType,
            hasComparison: !!config.previousContent,
          },
        },
      });

      // Add metadata to each change
      const enhancedChanges = analysis.changes.map((change) => ({
        ...change,
        id: `change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sourceUrl: config.sourceUrl,
        detectedAt: new Date().toISOString(),
      }));

      return {
        ...analysis,
        changes: enhancedChanges,
      };
    } catch (error: any) {
      logger.error("❌ AI change detection failed", { error: error.message });
      throw new Error(`AI change detection failed: ${error.message}`);
    }
  }

  /**
   * Enhance analysis with semantic similarity analysis
   */
  private async enhanceWithSemanticAnalysis(
    analysis: PolicyChangeAnalysis,
    config: ChangeDetectionConfig,
  ): Promise<void> {
    if (!config.previousContent) return;

    try {
      logger.info("🧠 Performing semantic analysis");

      // Use AI to perform deeper semantic analysis
      const { text: semanticInsights } = await generateText({
        model: this.aiModel,
        system: `You are performing semantic analysis on immigration policy changes. 
        Provide additional insights about the deeper implications and context of the detected changes.`,
        prompt: `Based on these detected changes, provide semantic insights:
        
        ${JSON.stringify(analysis.changes, null, 2)}
        
        Consider:
        1. Hidden implications of the changes
        2. Interconnected effects between different changes
        3. Historical context and patterns
        4. Potential future implications
        5. User experience impact beyond the obvious changes`,
        maxTokens: 1000,
      });

      // Store semantic insights as metadata
      metadata.set("semanticInsights", semanticInsights);

      logger.info("✅ Semantic analysis completed");
    } catch (error: any) {
      logger.warn("⚠️ Semantic analysis failed, continuing without it", {
        error: error.message,
      });
    }
  }

  /**
   * Filter changes by confidence threshold
   */
  private filterByConfidence(
    analysis: PolicyChangeAnalysis,
    threshold: number,
  ): PolicyChangeAnalysis {
    const filteredChanges = analysis.changes.filter(
      (change) => change.confidence >= threshold,
    );

    // Recalculate summary
    const criticalChanges = filteredChanges.filter(
      (c) => c.severity === "critical",
    ).length;
    const highPriorityChanges = filteredChanges.filter(
      (c) => c.severity === "high",
    ).length;

    // Determine overall impact level
    let overallImpactLevel: "critical" | "high" | "medium" | "low" = "low";
    if (criticalChanges > 0) overallImpactLevel = "critical";
    else if (highPriorityChanges > 0) overallImpactLevel = "high";
    else if (filteredChanges.some((c) => c.severity === "medium"))
      overallImpactLevel = "medium";

    // Get most impacted areas
    const areaCount = new Map<string, number>();
    filteredChanges.forEach((change) => {
      change.impactedAreas.forEach((area) => {
        areaCount.set(area, (areaCount.get(area) || 0) + 1);
      });
    });

    const mostImpactedAreas = Array.from(areaCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([area]) => area);

    return {
      ...analysis,
      changes: filteredChanges,
      summary: {
        totalChanges: filteredChanges.length,
        criticalChanges,
        highPriorityChanges,
        mostImpactedAreas,
        overallImpactLevel,
      },
    };
  }

  /**
   * Store detected changes in the database
   */
  private async storeChanges(
    analysis: PolicyChangeAnalysis,
    config: ChangeDetectionConfig,
  ): Promise<void> {
    try {
      logger.info("💾 Storing policy changes in database");

      // Store individual changes
      for (const change of analysis.changes) {
        await this.supabaseClient.from("policy_changes").insert({
          id: change.id,
          country: config.country,
          policy_type: config.policyType,
          change_type: change.type,
          severity: change.severity,
          confidence: change.confidence,
          title: change.title,
          description: change.description,
          impacted_areas: change.impactedAreas,
          effective_date: change.effectiveDate,
          previous_value: change.previousValue,
          new_value: change.newValue,
          affected_population: change.affectedPopulation,
          estimated_impact: change.estimatedImpact,
          source_url: change.sourceUrl,
          detected_at: change.detectedAt,
          created_at: new Date().toISOString(),
        });
      }

      // Store analysis summary
      await this.supabaseClient.from("policy_change_analyses").insert({
        country: config.country,
        policy_type: config.policyType,
        source_url: config.sourceUrl,
        total_changes: analysis.summary.totalChanges,
        critical_changes: analysis.summary.criticalChanges,
        high_priority_changes: analysis.summary.highPriorityChanges,
        most_impacted_areas: analysis.summary.mostImpactedAreas,
        overall_impact_level: analysis.summary.overallImpactLevel,
        recommendations: analysis.recommendations,
        analyzed_at: new Date().toISOString(),
      });

      logger.info("✅ Policy changes stored successfully");
    } catch (error: any) {
      logger.error("❌ Failed to store policy changes", {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Categorize change impact for user notifications
   */
  async categorizeImpactForUsers(
    changes: PolicyChange[],
    userProfiles: any[],
  ): Promise<Map<string, PolicyChange[]>> {
    const userImpactMap = new Map<string, PolicyChange[]>();

    for (const userProfile of userProfiles) {
      const relevantChanges = changes.filter((change) =>
        this.isChangeRelevantToUser(change, userProfile),
      );

      if (relevantChanges.length > 0) {
        userImpactMap.set(userProfile.id, relevantChanges);
      }
    }

    return userImpactMap;
  }

  /**
   * Check if a change is relevant to a specific user
   */
  private isChangeRelevantToUser(
    change: PolicyChange,
    userProfile: any,
  ): boolean {
    // Check if user's target country matches
    if (userProfile.targetCountry !== change.sourceUrl) return false;

    // Check if user's visa type is affected
    if (change.affectedPopulation.length > 0) {
      const userVisaType = userProfile.visaType || userProfile.immigrationType;
      if (
        !change.affectedPopulation.some((pop) =>
          pop.toLowerCase().includes(userVisaType?.toLowerCase() || ""),
        )
      ) {
        return false;
      }
    }

    // Check severity threshold
    if (
      change.severity === "low" &&
      userProfile.notificationPreferences?.minSeverity !== "low"
    ) {
      return false;
    }

    return true;
  }

  /**
   * Generate user-friendly change explanations
   */
  async generateUserExplanation(
    change: PolicyChange,
    userProfile: any,
  ): Promise<string> {
    try {
      const { text: explanation } = await generateText({
        model: this.aiModel,
        system: `You are a helpful immigration advisor explaining policy changes to users in simple, clear language.
        
        Focus on:
        1. What changed specifically
        2. How it affects the user personally
        3. What actions they need to take
        4. When the change takes effect
        
        Use friendly, supportive tone and avoid legal jargon.`,
        prompt: `Explain this immigration policy change to a user:
        
        Change: ${change.title}
        Description: ${change.description}
        Severity: ${change.severity}
        Type: ${change.type}
        Effective Date: ${change.effectiveDate || "Not specified"}
        
        User Profile:
        - Target Country: ${userProfile.targetCountry}
        - Visa Type: ${userProfile.visaType || "Not specified"}
        - Current Stage: ${userProfile.currentStage || "Not specified"}
        
        Provide a personalized explanation in 2-3 sentences.`,
        maxTokens: 200,
      });

      return explanation;
    } catch (error: any) {
      logger.warn("⚠️ Failed to generate user explanation", {
        error: error.message,
        changeId: change.id,
      });

      // Fallback to basic explanation
      return `${change.title}: ${change.description}`;
    }
  }
}
