import { generateObject, generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  ModerationDecisionSchema,
  ModerationFlagSchema,
  ContentSubmissionSchema,
  CommunityValidationConfigSchema,
  type ModerationDecision,
  type ModerationFlag,
  type ContentSubmission,
  type CommunityValidationConfig,
} from "./types.js";

/**
 * Content Moderation Agent using AI SDK v5
 * Manages quality control, spam detection, and automated flagging
 */
export class ContentModerationAgent {
  private config: CommunityValidationConfig;

  constructor(config: Partial<CommunityValidationConfig> = {}) {
    this.config = CommunityValidationConfigSchema.parse(config);
  }

  /**
   * Perform automated content moderation analysis
   */
  async moderateContent(
    content: ContentSubmission,
    moderationContext?: {
      userHistory: Array<{
        contentId: string;
        flags: number;
        violations: number;
        date: string;
      }>;
      communityReports?: Array<{
        reporterId: string;
        reason: string;
        severity: "low" | "medium" | "high";
        date: string;
      }>;
      similarContent: Array<{
        contentId: string;
        similarity: number;
        status: "approved" | "flagged" | "removed";
      }>;
    }
  ): Promise<ModerationDecision> {
    const decisionId = `mod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Define tools for content analysis
    const spamDetectionTool = tool({
      description: "Detect spam patterns and low-quality content",
      parameters: z.object({
        content: z.any(),
        userHistory: z.array(z.any()).optional(),
        similarContent: z.array(z.any()).optional(),
      }),
      execute: async ({
        content,
        userHistory,
        similarContent,
      }: {
        content: any;
        userHistory?: any[];
        similarContent?: any[];
      }) => {
        const flags: any[] = [];

        // Check for spam indicators
        const contentText =
          typeof content.content === "string"
            ? content.content
            : JSON.stringify(content.content);

        // Repetitive content patterns
        const words = contentText.toLowerCase().split(/\s+/);
        const wordFreq = words.reduce(
          (freq: Record<string, number>, word: string) => {
            freq[word] = (freq[word] || 0) + 1;
            return freq;
          },
          {}
        );

        const maxWordFreq = Math.max(...(Object.values(wordFreq) as number[]));
        if (maxWordFreq > words.length * 0.3) {
          flags.push({
            flagId: `spam_${Date.now()}`,
            contentId: content.contentId,
            contentType: "text",
            flagType: "spam",
            severity: "medium",
            confidence: 0.7,
            flaggedBy: "automated",
            reason: "Repetitive content detected",
            evidence: [
              {
                type: "pattern_detection",
                description: "High frequency of repeated words",
                confidence: 0.7,
                data: { maxWordFreq, totalWords: words.length },
              },
            ],
            suggestedAction: "review",
            flagDate: new Date().toISOString(),
          });
        }

        // Check for promotional content
        const promotionalKeywords = [
          "buy",
          "sale",
          "discount",
          "offer",
          "deal",
          "cheap",
          "free",
        ];
        const promotionalCount = promotionalKeywords.filter((keyword) =>
          contentText.toLowerCase().includes(keyword)
        ).length;

        if (promotionalCount >= 3) {
          flags.push({
            flagId: `promo_${Date.now()}`,
            contentId: content.contentId,
            contentType: "text",
            flagType: "spam",
            severity: "high",
            confidence: 0.8,
            flaggedBy: "automated",
            reason: "Promotional content detected",
            evidence: [
              {
                type: "text_analysis",
                description: "Multiple promotional keywords found",
                confidence: 0.8,
                data: { promotionalCount, keywords: promotionalKeywords },
              },
            ],
            suggestedAction: "remove",
            flagDate: new Date().toISOString(),
          });
        }

        // Check for duplicate content
        if (similarContent && similarContent.length > 0) {
          const highSimilarity = similarContent.filter(
            (s: any) => s.similarity > 0.9
          );
          if (highSimilarity.length > 0) {
            flags.push({
              flagId: `dup_${Date.now()}`,
              contentId: content.contentId,
              contentType: "text",
              flagType: "duplicate",
              severity: "medium",
              confidence: 0.9,
              flaggedBy: "automated",
              reason: "Duplicate content detected",
              evidence: [
                {
                  type: "similarity_match",
                  description: "High similarity with existing content",
                  confidence: 0.9,
                  data: { similarContent: highSimilarity },
                },
              ],
              suggestedAction: "review",
              flagDate: new Date().toISOString(),
            });
          }
        }

        return flags;
      },
    });

    const inappropriateContentTool = tool({
      description: "Detect inappropriate or harmful content",
      parameters: z.object({
        content: z.any(),
        sensitivity: z.enum(["low", "medium", "high"]),
      }),
      execute: async ({
        content,
        sensitivity,
      }: {
        content: any;
        sensitivity: "low" | "medium" | "high";
      }) => {
        const flags: any[] = [];
        const contentText =
          typeof content.content === "string"
            ? content.content
            : JSON.stringify(content.content);

        // Check for inappropriate language
        const inappropriateWords = [
          "hate",
          "discrimination",
          "harassment",
          "abuse",
        ];
        const inappropriateCount = inappropriateWords.filter((word) =>
          contentText.toLowerCase().includes(word)
        ).length;

        if (inappropriateCount > 0) {
          const severityLevel =
            inappropriateCount >= 3
              ? "high"
              : inappropriateCount >= 2
                ? "medium"
                : "low";

          if (sensitivity === "high" || severityLevel !== "low") {
            flags.push({
              flagId: `inappropriate_${Date.now()}`,
              contentId: content.contentId,
              contentType: "text",
              flagType: "inappropriate",
              severity: severityLevel,
              confidence: 0.6,
              flaggedBy: "automated",
              reason: "Potentially inappropriate language detected",
              evidence: [
                {
                  type: "text_analysis",
                  description: "Inappropriate language patterns found",
                  confidence: 0.6,
                  data: { inappropriateCount },
                },
              ],
              suggestedAction: severityLevel === "high" ? "remove" : "review",
              flagDate: new Date().toISOString(),
            });
          }
        }

        // Check for misinformation indicators
        const misinformationIndicators = [
          "guaranteed",
          "secret",
          "they don't want you to know",
          "doctors hate this",
          "miracle cure",
          "instant approval",
        ];

        const misinfoCount = misinformationIndicators.filter((indicator) =>
          contentText.toLowerCase().includes(indicator.toLowerCase())
        ).length;

        if (misinfoCount > 0) {
          flags.push({
            flagId: `misinfo_${Date.now()}`,
            contentId: content.contentId,
            contentType: "text",
            flagType: "misinformation",
            severity: "high",
            confidence: 0.7,
            flaggedBy: "automated",
            reason: "Potential misinformation detected",
            evidence: [
              {
                type: "pattern_detection",
                description: "Misinformation indicators found",
                confidence: 0.7,
                data: { misinfoCount },
              },
            ],
            suggestedAction: "review",
            flagDate: new Date().toISOString(),
          });
        }

        return flags;
      },
    });

    const qualityAssessmentTool = tool({
      description: "Assess content quality and completeness",
      parameters: z.object({
        content: z.any(),
        minimumQualityThreshold: z.number().default(0.5),
      }),
      execute: async ({
        content,
        minimumQualityThreshold,
      }: {
        content: any;
        minimumQualityThreshold: number;
      }) => {
        const flags: any[] = [];
        const contentText =
          typeof content.content === "string"
            ? content.content
            : JSON.stringify(content.content);

        // Check content length
        if (contentText.length < 50) {
          flags.push({
            flagId: `quality_${Date.now()}`,
            contentId: content.contentId,
            contentType: "text",
            flagType: "low_quality",
            severity: "low",
            confidence: 0.8,
            flaggedBy: "automated",
            reason: "Content too short to be valuable",
            evidence: [
              {
                type: "text_analysis",
                description: "Content length below minimum threshold",
                confidence: 0.8,
                data: { contentLength: contentText.length, minimum: 50 },
              },
            ],
            suggestedAction: "review",
            flagDate: new Date().toISOString(),
          });
        }

        // Check for lack of sources on factual content
        if (
          content.contentType === "policy_update" ||
          content.contentType === "advice"
        ) {
          if (!content.sources || content.sources.length === 0) {
            flags.push({
              flagId: `sources_${Date.now()}`,
              contentId: content.contentId,
              contentType: "text",
              flagType: "low_quality",
              severity: "medium",
              confidence: 0.7,
              flaggedBy: "automated",
              reason: "Factual content lacks supporting sources",
              evidence: [
                {
                  type: "text_analysis",
                  description: "No sources provided for factual claims",
                  confidence: 0.7,
                  data: { contentType: content.contentType, sourcesCount: 0 },
                },
              ],
              suggestedAction: "review",
              flagDate: new Date().toISOString(),
            });
          }
        }

        // Check for off-topic content
        const immigrationKeywords = [
          "visa",
          "immigration",
          "passport",
          "citizenship",
          "permit",
          "application",
          "embassy",
          "consulate",
          "border",
          "refugee",
          "asylum",
        ];

        const relevantKeywords = immigrationKeywords.filter((keyword) =>
          contentText.toLowerCase().includes(keyword)
        ).length;

        if (relevantKeywords === 0 && contentText.length > 100) {
          flags.push({
            flagId: `offtopic_${Date.now()}`,
            contentId: content.contentId,
            contentType: "text",
            flagType: "off_topic",
            severity: "medium",
            confidence: 0.6,
            flaggedBy: "automated",
            reason: "Content appears to be off-topic for immigration platform",
            evidence: [
              {
                type: "text_analysis",
                description: "No immigration-related keywords found",
                confidence: 0.6,
                data: { relevantKeywords, contentLength: contentText.length },
              },
            ],
            suggestedAction: "review",
            flagDate: new Date().toISOString(),
          });
        }

        return flags;
      },
    });

    const userBehaviorAnalysisTool = tool({
      description: "Analyze user behavior patterns for risk assessment",
      parameters: z.object({
        userHistory: z.array(z.any()).optional(),
        communityReports: z.array(z.any()).optional(),
      }),
      execute: async ({
        userHistory,
        communityReports,
      }: {
        userHistory?: any[];
        communityReports?: any[];
      }) => {
        const flags: any[] = [];

        // Analyze user history for patterns
        if (userHistory && userHistory.length > 0) {
          const recentViolations = userHistory.filter(
            (h: any) =>
              h.violations > 0 &&
              new Date(h.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days
          );

          if (recentViolations.length >= 3) {
            flags.push({
              flagId: `behavior_${Date.now()}`,
              contentId: "user_pattern",
              contentType: "text",
              flagType: "harassment",
              severity: "high",
              confidence: 0.8,
              flaggedBy: "automated",
              reason: "Pattern of violations detected",
              evidence: [
                {
                  type: "pattern_detection",
                  description: "Multiple recent violations by user",
                  confidence: 0.8,
                  data: { recentViolations: recentViolations.length },
                },
              ],
              suggestedAction: "ban_user",
              flagDate: new Date().toISOString(),
            });
          }
        }

        // Analyze community reports
        if (communityReports && communityReports.length > 0) {
          const highSeverityReports = communityReports.filter(
            (r: any) => r.severity === "high"
          );
          if (highSeverityReports.length >= 2) {
            flags.push({
              flagId: `reports_${Date.now()}`,
              contentId: "community_reports",
              contentType: "text",
              flagType: "harassment",
              severity: "high",
              confidence: 0.9,
              flaggedBy: "community",
              reason: "Multiple high-severity community reports",
              evidence: [
                {
                  type: "user_report",
                  description: "Community members reported concerning behavior",
                  confidence: 0.9,
                  data: { highSeverityReports: highSeverityReports.length },
                },
              ],
              suggestedAction: "escalate",
              flagDate: new Date().toISOString(),
            });
          }
        }

        return flags;
      },
    });

    // Generate moderation decision using AI SDK v5
    const { object: decision } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: ModerationDecisionSchema,
      system: `You are an expert content moderation specialist with deep knowledge of community standards, quality control, and automated detection systems.

Your role is to:
1. Analyze content for spam, inappropriate material, and quality issues
2. Detect patterns of problematic behavior and policy violations
3. Make fair and consistent moderation decisions
4. Balance community safety with freedom of expression
5. Provide clear reasoning for all moderation actions
6. Escalate complex cases requiring human review

Use the available tools to conduct comprehensive analysis. Consider:
- Content quality and relevance to immigration topics
- Spam detection and promotional content identification
- Inappropriate language and harmful content detection
- User behavior patterns and violation history
- Community reports and feedback
- Platform policies and community guidelines

Provide clear, justified moderation decisions that maintain community standards while being fair to contributors.`,
      prompt: `Perform comprehensive content moderation analysis:

**Content Submission:**
${JSON.stringify(content, null, 2)}

**Moderation Context:**
${JSON.stringify(moderationContext, null, 2)}

**Moderation Sensitivity:** ${this.config.moderationSensitivity}

**Requirements:**
1. Use the detection tools to identify potential issues
2. Analyze user behavior patterns and community reports
3. Provide a comprehensive moderation decision with:
   - All identified flags with severity and confidence levels
   - Final decision (approve/warn/hide/remove/ban_user/escalate)
   - Clear reasoning for the decision
   - Specific actions to be taken
   - Whether the decision is appealable
   - Escalation requirements for complex cases

**Decision ID:** ${decisionId}

Focus on maintaining community safety and quality while being fair and transparent in moderation decisions.`,
    });

    return {
      ...decision,
      decisionId,
      contentId: content.contentId,
      automatedDecision: true,
      decisionDate: new Date().toISOString(),
    };
  }

  /**
   * Process community reports and flags
   */
  async processCommunityReports(
    contentId: string,
    reports: Array<{
      reporterId: string;
      reason: string;
      evidence?: string;
      severity: "low" | "medium" | "high";
      date: string;
    }>
  ): Promise<{
    consolidatedFlag: ModerationFlag;
    requiresReview: boolean;
    urgencyLevel: "low" | "medium" | "high" | "critical";
    recommendedAction: string;
  }> {
    const { object: analysis } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        consolidatedFlag: ModerationFlagSchema,
        requiresReview: z.boolean(),
        urgencyLevel: z.enum(["low", "medium", "high", "critical"]),
        recommendedAction: z.string(),
      }),
      system: `You are analyzing community reports to determine appropriate moderation response. 
      Consolidate multiple reports into a single assessment with appropriate urgency and actions.`,
      prompt: `Analyze community reports for content ${contentId}:

**Reports:** ${JSON.stringify(reports, null, 2)}

Provide consolidated analysis with urgency assessment and recommended actions.`,
    });

    return analysis;
  }

  /**
   * Appeal moderation decision
   */
  async processAppeal(
    originalDecision: ModerationDecision,
    appeal: {
      appealerId: string;
      reason: string;
      evidence?: string;
      date: string;
    }
  ): Promise<{
    appealId: string;
    decision: "upheld" | "overturned" | "modified" | "escalated";
    newModerationDecision?: ModerationDecision;
    reasoning: string;
    reviewerId?: string;
  }> {
    const appealId = `appeal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const { object: appealResult } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        decision: z.enum(["upheld", "overturned", "modified", "escalated"]),
        reasoning: z.string(),
        newModerationDecision: ModerationDecisionSchema.optional(),
        reviewerId: z.string().optional(),
      }),
      system: `You are reviewing a moderation appeal. Analyze the original decision and appeal reasoning 
      to determine if the decision should be upheld, overturned, modified, or escalated for human review.`,
      prompt: `Review moderation appeal:

**Original Decision:** ${JSON.stringify(originalDecision, null, 2)}
**Appeal:** ${JSON.stringify(appeal, null, 2)}

Provide fair assessment of the appeal with clear reasoning for the decision.`,
    });

    return {
      appealId,
      ...appealResult,
    };
  }

  /**
   * Generate moderation statistics and insights
   */
  async generateModerationInsights(
    timeframe: number, // days
    moderationData: {
      decisions: ModerationDecision[];
      appeals: Array<{ decision: string; originalDecision: string }>;
      communityReports: Array<{ severity: string; resolved: boolean }>;
    }
  ): Promise<{
    statistics: {
      totalDecisions: number;
      decisionBreakdown: Record<string, number>;
      accuracyRate: number;
      appealRate: number;
      communityReportResolution: number;
    };
    trends: {
      flagTypeDistribution: Record<string, number>;
      severityTrends: Record<string, number>;
      automationEffectiveness: number;
    };
    recommendations: string[];
  }> {
    const { object: insights } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        statistics: z.object({
          totalDecisions: z.number(),
          decisionBreakdown: z.record(z.string(), z.number()),
          accuracyRate: z.number(),
          appealRate: z.number(),
          communityReportResolution: z.number(),
        }),
        trends: z.object({
          flagTypeDistribution: z.record(z.string(), z.number()),
          severityTrends: z.record(z.string(), z.number()),
          automationEffectiveness: z.number(),
        }),
        recommendations: z.array(z.string()),
      }),
      system: `You are analyzing moderation performance and generating insights for system improvement. 
      Provide comprehensive statistics, trend analysis, and actionable recommendations.`,
      prompt: `Analyze moderation performance over ${timeframe} days:

**Moderation Data:** ${JSON.stringify(moderationData, null, 2)}

Provide comprehensive insights with statistics, trends, and improvement recommendations.`,
    });

    return insights;
  }
}
