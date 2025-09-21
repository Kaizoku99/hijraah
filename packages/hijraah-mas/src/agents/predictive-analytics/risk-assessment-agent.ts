import { generateObject, generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  RiskAssessmentSchema,
  UserProfileSchema,
  PredictiveAnalyticsConfigSchema,
  type RiskAssessment,
  type UserProfile,
  type PredictiveAnalyticsConfig,
} from "./types.js";

/**
 * Risk Assessment Agent using AI SDK v5
 * Analyzes potential risks and generates mitigation strategies for immigration cases
 */
export class RiskAssessmentAgent {
  private config: PredictiveAnalyticsConfig;

  constructor(config: Partial<PredictiveAnalyticsConfig> = {}) {
    this.config = PredictiveAnalyticsConfigSchema.parse(config);
  }

  /**
   * Perform comprehensive risk assessment for immigration case
   */
  async assessRisks(
    userProfile: UserProfile,
    caseData: {
      caseType: string;
      country: string;
      visaType: string;
      applicationStage?: string;
      timeline?: string;
    },
    contextData?: {
      currentPolicies: string[];
      recentChanges: string[];
      processingBacklogs: boolean;
      seasonalFactors: string[];
    }
  ): Promise<RiskAssessment> {
    const assessmentId = `risk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Define tools for risk analysis
    const documentationRiskTool = tool({
      description: "Analyze documentation-related risks",
      parameters: z.object({
        documentsReady: z.number().min(0).max(1),
        translationsNeeded: z.boolean(),
        authenticationsNeeded: z.boolean(),
        visaType: z.string(),
      }),
      execute: async ({
        documentsReady,
        translationsNeeded,
        authenticationsNeeded,
        visaType,
      }) => {
        const risks: any[] = [];

        if (documentsReady < 0.7) {
          risks.push({
            category: "documentation",
            factor: "Incomplete Documentation",
            severity: documentsReady < 0.5 ? "critical" : "high",
            probability: 0.8,
            impact: 0.7,
            description:
              "Missing or incomplete documents can lead to application delays or rejection",
            mitigation: {
              strategy:
                "Complete all required documents and obtain certified copies",
              effectiveness: 0.9,
              timeRequired: "2-4 weeks",
              cost: "medium",
              difficulty: "easy",
            },
          });
        }

        if (translationsNeeded) {
          risks.push({
            category: "documentation",
            factor: "Translation Requirements",
            severity: "medium",
            probability: 0.6,
            impact: 0.4,
            description:
              "Documents in foreign languages require certified translations",
            mitigation: {
              strategy:
                "Obtain certified translations from approved translators",
              effectiveness: 0.95,
              timeRequired: "1-2 weeks",
              cost: "medium",
              difficulty: "easy",
            },
          });
        }

        if (authenticationsNeeded) {
          risks.push({
            category: "documentation",
            factor: "Authentication Requirements",
            severity: "medium",
            probability: 0.7,
            impact: 0.5,
            description:
              "Documents may require apostille or embassy authentication",
            mitigation: {
              strategy:
                "Obtain required authentications through proper channels",
              effectiveness: 0.9,
              timeRequired: "2-6 weeks",
              cost: "high",
              difficulty: "medium",
            },
          });
        }

        return risks;
      },
    });

    const eligibilityRiskTool = tool({
      description: "Analyze eligibility-related risks",
      parameters: z.object({
        userProfile: z.any(),
        visaType: z.string(),
        country: z.string(),
      }),
      execute: async ({ userProfile, visaType, country }) => {
        const risks: any[] = [];

        // Age-related risks
        if (
          userProfile.demographics?.age &&
          userProfile.demographics.age > 45 &&
          visaType === "skilled_worker"
        ) {
          risks.push({
            category: "eligibility",
            factor: "Age Factor",
            severity: "medium",
            probability: 0.5,
            impact: 0.3,
            description: "Age may affect points-based immigration systems",
            mitigation: {
              strategy: "Emphasize experience and skills to offset age factor",
              effectiveness: 0.6,
              timeRequired: "Ongoing",
              cost: "low",
              difficulty: "medium",
            },
          });
        }

        // Education risks
        if (
          !userProfile.education?.level ||
          userProfile.education.level === "high_school"
        ) {
          risks.push({
            category: "eligibility",
            factor: "Limited Education Credentials",
            severity: "high",
            probability: 0.7,
            impact: 0.6,
            description:
              "Insufficient education may not meet minimum requirements",
            mitigation: {
              strategy:
                "Pursue additional education or professional certifications",
              effectiveness: 0.8,
              timeRequired: "6-24 months",
              cost: "high",
              difficulty: "hard",
            },
          });
        }

        // Language proficiency risks
        const languageLevel = userProfile.language?.proficiency?.[country];
        if (!languageLevel || languageLevel === "basic") {
          risks.push({
            category: "eligibility",
            factor: "Language Proficiency",
            severity: "high",
            probability: 0.8,
            impact: 0.7,
            description:
              "Insufficient language skills may not meet requirements",
            mitigation: {
              strategy: "Take language courses and official proficiency tests",
              effectiveness: 0.85,
              timeRequired: "3-12 months",
              cost: "medium",
              difficulty: "medium",
            },
          });
        }

        // Employment risks
        if (
          userProfile.employment?.status === "unemployed" &&
          visaType === "work_visa"
        ) {
          risks.push({
            category: "eligibility",
            factor: "Employment Status",
            severity: "critical",
            probability: 0.9,
            impact: 0.8,
            description: "Unemployment may disqualify work visa applications",
            mitigation: {
              strategy: "Secure job offer or demonstrate employability",
              effectiveness: 0.9,
              timeRequired: "1-6 months",
              cost: "low",
              difficulty: "hard",
            },
          });
        }

        return risks;
      },
    });

    const financialRiskTool = tool({
      description: "Analyze financial-related risks",
      parameters: z.object({
        savings: z.number().optional(),
        income: z.number().optional(),
        debts: z.number().optional(),
        sponsorship: z.boolean().optional(),
        visaType: z.string(),
      }),
      execute: async ({ savings, income, debts, sponsorship, visaType }) => {
        const risks: any[] = [];

        // Insufficient funds risk
        const requiredFunds = this.getRequiredFunds(visaType);
        if (!savings || savings < requiredFunds) {
          risks.push({
            category: "financial",
            factor: "Insufficient Funds",
            severity: "high",
            probability: 0.8,
            impact: 0.7,
            description: `Insufficient funds to meet minimum requirements (${requiredFunds} required)`,
            mitigation: {
              strategy: "Build savings or secure financial sponsorship",
              effectiveness: 0.9,
              timeRequired: "3-12 months",
              cost: "none",
              difficulty: "medium",
            },
          });
        }

        // High debt-to-income ratio
        if (debts && income && debts / income > 0.4) {
          risks.push({
            category: "financial",
            factor: "High Debt-to-Income Ratio",
            severity: "medium",
            probability: 0.6,
            impact: 0.5,
            description: "High debt levels may indicate financial instability",
            mitigation: {
              strategy: "Reduce debt or increase income before application",
              effectiveness: 0.7,
              timeRequired: "6-18 months",
              cost: "none",
              difficulty: "hard",
            },
          });
        }

        // Lack of income documentation
        if (!income && !sponsorship) {
          risks.push({
            category: "financial",
            factor: "No Income Documentation",
            severity: "high",
            probability: 0.7,
            impact: 0.6,
            description: "Unable to demonstrate financial stability",
            mitigation: {
              strategy: "Secure employment or financial sponsorship",
              effectiveness: 0.8,
              timeRequired: "1-6 months",
              cost: "low",
              difficulty: "medium",
            },
          });
        }

        return risks;
      },
    });

    const policyRiskTool = tool({
      description: "Analyze policy and timing-related risks",
      parameters: z.object({
        currentPolicies: z.array(z.string()).optional(),
        recentChanges: z.array(z.string()).optional(),
        processingBacklogs: z.boolean().optional(),
        visaType: z.string(),
        country: z.string(),
      }),
      execute: async ({
        currentPolicies,
        recentChanges,
        processingBacklogs,
        visaType,
        country,
      }) => {
        const risks: any[] = [];

        // Policy change risks
        if (recentChanges && recentChanges.length > 0) {
          risks.push({
            category: "policy",
            factor: "Recent Policy Changes",
            severity: "medium",
            probability: 0.4,
            impact: 0.6,
            description:
              "Recent policy changes may affect application processing",
            mitigation: {
              strategy:
                "Stay updated on policy changes and adjust application accordingly",
              effectiveness: 0.7,
              timeRequired: "Ongoing",
              cost: "low",
              difficulty: "easy",
            },
          });
        }

        // Processing backlog risks
        if (processingBacklogs) {
          risks.push({
            category: "timing",
            factor: "Processing Backlogs",
            severity: "medium",
            probability: 0.8,
            impact: 0.4,
            description: "Current backlogs may significantly delay processing",
            mitigation: {
              strategy:
                "Submit complete application early and consider expedited processing",
              effectiveness: 0.5,
              timeRequired: "N/A",
              cost: "medium",
              difficulty: "easy",
            },
          });
        }

        // Quota limitations
        if (visaType === "work_visa" || visaType === "skilled_worker") {
          risks.push({
            category: "policy",
            factor: "Annual Quota Limitations",
            severity: "high",
            probability: 0.6,
            impact: 0.8,
            description:
              "Annual visa quotas may be reached before application processing",
            mitigation: {
              strategy:
                "Apply early in the fiscal year and have backup options",
              effectiveness: 0.6,
              timeRequired: "Timing dependent",
              cost: "low",
              difficulty: "medium",
            },
          });
        }

        return risks;
      },
    });

    // Generate comprehensive risk assessment using AI SDK v5
    const { object: assessment } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      tools: {
        analyzeDocumentationRisks: documentationRiskTool,
        analyzeEligibilityRisks: eligibilityRiskTool,
        analyzeFinancialRisks: financialRiskTool,
        analyzePolicyRisks: policyRiskTool,
      },
      schema: RiskAssessmentSchema,
      system: `You are an expert immigration risk assessment analyst with deep knowledge of application risks, policy impacts, and mitigation strategies.

Your role is to:
1. Identify and analyze potential risks across all categories (documentation, eligibility, financial, policy, timing, legal, personal)
2. Assess the probability and impact of each risk factor
3. Categorize risks by severity and likelihood
4. Develop comprehensive mitigation strategies for each identified risk
5. Create monitoring plans to track risk factors over time
6. Provide actionable recommendations to minimize application risks

Use the available tools to analyze different risk categories. Consider:
- Documentation completeness and quality
- Eligibility requirements and profile gaps
- Financial stability and fund requirements
- Current policy environment and recent changes
- Timing factors and processing backlogs
- Legal complications and previous application history
- Personal circumstances that may affect the application

Provide detailed risk analysis with practical mitigation strategies and monitoring recommendations.`,
      prompt: `Perform a comprehensive risk assessment for the following immigration case:

**User Profile:**
${JSON.stringify(userProfile, null, 2)}

**Case Details:**
- Case Type: ${caseData.caseType}
- Country: ${caseData.country}
- Visa Type: ${caseData.visaType}
- Application Stage: ${caseData.applicationStage || "Preparation"}
- Timeline: ${caseData.timeline || "Not specified"}

**Context Data:**
${JSON.stringify(contextData, null, 2)}

**Requirements:**
1. Use the risk analysis tools to evaluate different risk categories
2. Provide a comprehensive risk assessment including:
   - Overall risk score and level
   - Detailed analysis of risk factors by category
   - Risk factor categorization by severity and probability
   - Comprehensive mitigation plan with prioritized strategies
   - Monitoring plan for ongoing risk management
   - Risk category breakdown with scores and levels

**Assessment ID:** ${assessmentId}

Focus on identifying actionable risks with practical mitigation strategies that can be implemented to improve application success chances.`,
    });

    return {
      ...assessment,
      assessmentId,
      caseType: caseData.caseType,
      country: caseData.country,
      visaType: caseData.visaType,
      modelVersion: this.config.model,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Update risk assessment based on mitigation actions taken
   */
  async updateRiskAssessment(
    existingAssessment: RiskAssessment,
    mitigationActions: Array<{
      riskFactor: string;
      actionTaken: string;
      effectiveness: number;
      completionDate: string;
    }>
  ): Promise<RiskAssessment> {
    const { text: analysis } = await generateText({
      model: openai(this.config.model),
      temperature: this.config.temperature,
      maxSteps: 5,
      system: `You are updating a risk assessment based on mitigation actions taken. 
      Analyze how the actions affect the original risks and provide updated risk scores.`,
      prompt: `Update the following risk assessment based on mitigation actions:

**Original Assessment:**
Overall Risk Score: ${existingAssessment.overallRiskScore}
Risk Level: ${existingAssessment.riskLevel}

**Mitigation Actions Taken:**
${JSON.stringify(mitigationActions, null, 2)}

Analyze how these actions affect the risk profile and provide updated assessments.`,
    });

    // For now, return the existing assessment with updated timestamp
    // In a full implementation, this would recalculate risks based on the analysis
    return {
      ...existingAssessment,
      timestamp: new Date().toISOString(),
    };
  }

  private getRequiredFunds(visaType: string): number {
    // Estimated required funds based on visa type
    const fundRequirements: Record<string, number> = {
      tourist_visa: 5000,
      student_visa: 25000,
      work_visa: 15000,
      family_visa: 20000,
      permanent_residence: 50000,
      citizenship: 10000,
    };

    return fundRequirements[visaType] || 15000;
  }
}
