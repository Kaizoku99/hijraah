import { generateObject, generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  CostEstimationSchema,
  UserProfileSchema,
  PredictiveAnalyticsConfigSchema,
  type CostEstimation,
  type UserProfile,
  type PredictiveAnalyticsConfig,
} from "./types.js";

/**
 * Cost Estimation Agent using AI SDK v5
 * Analyzes and estimates comprehensive costs for immigration processes
 */
export class CostEstimationAgent {
  private config: PredictiveAnalyticsConfig;

  constructor(config: Partial<PredictiveAnalyticsConfig> = {}) {
    this.config = PredictiveAnalyticsConfigSchema.parse(config);
  }

  /**
   * Estimate comprehensive costs for immigration case
   */
  async estimateCosts(
    userProfile: UserProfile,
    caseData: {
      caseType: string;
      country: string;
      visaType: string;
      applicationStage?: string;
      familyMembers?: number;
      expeditedProcessing?: boolean;
    },
    preferences?: {
      currency: string;
      includeLegalFees: boolean;
      includeOptionalServices: boolean;
      budgetConstraints?: number;
    }
  ): Promise<CostEstimation> {
    const estimationId = `cost_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const currency = preferences?.currency || "USD";

    // Define tools for cost analysis
    const governmentFeesTool = tool({
      description: "Calculate government fees and official costs",
      parameters: z.object({
        visaType: z.string(),
        country: z.string(),
        familyMembers: z.number().default(0),
        expeditedProcessing: z.boolean().default(false),
      }),
      execute: async ({
        visaType,
        country,
        familyMembers,
        expeditedProcessing,
      }) => {
        const baseFees = this.getGovernmentFees(visaType, country);
        const expeditedFee = expeditedProcessing
          ? baseFees.application * 0.5
          : 0;
        const familyFees = familyMembers * baseFees.dependent;

        const costs = [
          {
            category: "government_fees",
            item: "Application Fee",
            estimatedCost: baseFees.application,
            currency,
            confidence: 0.95,
            required: true,
            timing: "At application submission",
            notes: "Non-refundable government processing fee",
          },
          {
            category: "government_fees",
            item: "Biometric Fee",
            estimatedCost: baseFees.biometric,
            currency,
            confidence: 0.9,
            required: true,
            timing: "After application acceptance",
            notes: "Required for fingerprinting and photo",
          },
        ];

        if (expeditedFee > 0) {
          costs.push({
            category: "government_fees",
            item: "Expedited Processing Fee",
            estimatedCost: expeditedFee,
            currency,
            confidence: 0.9,
            required: false,
            timing: "With application submission",
            notes: "Optional fee for faster processing",
          });
        }

        if (familyFees > 0) {
          costs.push({
            category: "government_fees",
            item: "Dependent Family Members",
            estimatedCost: familyFees,
            currency,
            confidence: 0.9,
            required: true,
            timing: "With main application",
            notes: `Fees for ${familyMembers} family member(s)`,
          });
        }

        return costs;
      },
    });

    const legalFeesTool = tool({
      description: "Calculate legal and professional service fees",
      parameters: z.object({
        visaType: z.string(),
        caseComplexity: z.enum([
          "simple",
          "moderate",
          "complex",
          "very_complex",
        ]),
        includeLegalFees: z.boolean(),
        country: z.string(),
      }),
      execute: async ({
        visaType,
        caseComplexity,
        includeLegalFees,
        country,
      }) => {
        if (!includeLegalFees) return [];

        const baseLegalFee = this.getLegalFees(
          visaType,
          caseComplexity,
          country
        );
        const complexityMultiplier = {
          simple: 1.0,
          moderate: 1.3,
          complex: 1.7,
          very_complex: 2.2,
        }[caseComplexity];

        const costs = [
          {
            category: "legal_fees",
            item: "Immigration Attorney Consultation",
            estimatedCost: 300,
            currency,
            confidence: 0.8,
            required: false,
            timing: "Before application preparation",
            notes: "Initial consultation to assess case",
          },
          {
            category: "legal_fees",
            item: "Legal Representation",
            estimatedCost: baseLegalFee * complexityMultiplier,
            currency,
            confidence: 0.75,
            required: false,
            timing: "Throughout process",
            notes: `Full legal representation for ${caseComplexity} case`,
          },
          {
            category: "legal_fees",
            item: "Document Review and Preparation",
            estimatedCost: 800,
            currency,
            confidence: 0.85,
            required: false,
            timing: "During application preparation",
            notes: "Professional review and preparation of documents",
          },
        ];

        return costs;
      },
    });

    const documentFeesTool = tool({
      description: "Calculate document-related costs",
      parameters: z.object({
        userProfile: z.any(),
        visaType: z.string(),
        country: z.string(),
      }),
      execute: async ({ userProfile, visaType, country }) => {
        const costs: any[] = [];

        // Translation costs
        if (userProfile.documents?.translationsNeeded) {
          costs.push({
            category: "document_fees",
            item: "Certified Translations",
            estimatedCost: 150,
            currency,
            confidence: 0.8,
            required: true,
            timing: "Before application submission",
            notes: "Per document translation by certified translator",
          });
        }

        // Authentication costs
        if (userProfile.documents?.authenticationsNeeded) {
          costs.push({
            category: "document_fees",
            item: "Document Authentication/Apostille",
            estimatedCost: 100,
            currency,
            confidence: 0.85,
            required: true,
            timing: "Before application submission",
            notes: "Per document authentication",
          });
        }

        // Educational credential evaluation
        if (
          userProfile.education?.level &&
          ["bachelor", "master", "phd"].includes(userProfile.education.level)
        ) {
          costs.push({
            category: "document_fees",
            item: "Educational Credential Evaluation",
            estimatedCost: 200,
            currency,
            confidence: 0.9,
            required: true,
            timing: "Before application submission",
            notes: "Required evaluation of foreign education credentials",
          });
        }

        // Police clearance certificates
        costs.push({
          category: "document_fees",
          item: "Police Clearance Certificates",
          estimatedCost: 50,
          currency,
          confidence: 0.9,
          required: true,
          timing: "Before application submission",
          notes: "From all countries of residence",
        });

        return costs;
      },
    });

    const medicalExamTool = tool({
      description: "Calculate medical examination costs",
      parameters: z.object({
        visaType: z.string(),
        country: z.string(),
        age: z.number().optional(),
        familyMembers: z.number().default(0),
      }),
      execute: async ({ visaType, country, age, familyMembers }) => {
        const costs: any[] = [];

        // Medical examination is typically required for permanent visas
        if (
          ["permanent_residence", "family_visa", "work_visa"].includes(visaType)
        ) {
          const baseMedicalCost = 400;
          const familyCost = familyMembers * 350;

          costs.push({
            category: "medical_exams",
            item: "Immigration Medical Examination",
            estimatedCost: baseMedicalCost,
            currency,
            confidence: 0.85,
            required: true,
            timing: "After initial application approval",
            notes: "Required medical exam by panel physician",
          });

          if (familyCost > 0) {
            costs.push({
              category: "medical_exams",
              item: "Family Members Medical Exams",
              estimatedCost: familyCost,
              currency,
              confidence: 0.85,
              required: true,
              timing: "After initial application approval",
              notes: `Medical exams for ${familyMembers} family member(s)`,
            });
          }

          // Additional tests for older applicants
          if (age && age > 50) {
            costs.push({
              category: "medical_exams",
              item: "Additional Medical Tests",
              estimatedCost: 200,
              currency,
              confidence: 0.7,
              required: false,
              timing: "With medical examination",
              notes: "Additional tests may be required for older applicants",
            });
          }
        }

        return costs;
      },
    });

    const travelCostsTool = tool({
      description: "Calculate travel and miscellaneous costs",
      parameters: z.object({
        currentCountry: z.string(),
        targetCountry: z.string(),
        visaType: z.string(),
        includeOptionalServices: z.boolean(),
      }),
      execute: async ({
        currentCountry,
        targetCountry,
        visaType,
        includeOptionalServices,
      }) => {
        const costs: any[] = [];

        // Visa interview travel (if required)
        if (visaType !== "tourist_visa") {
          costs.push({
            category: "travel",
            item: "Travel to Visa Interview",
            estimatedCost: 500,
            currency,
            confidence: 0.6,
            required: false,
            timing: "When interview is scheduled",
            notes: "Travel costs to embassy/consulate for interview",
          });
        }

        // Relocation costs (for permanent visas)
        if (["permanent_residence", "work_visa"].includes(visaType)) {
          costs.push({
            category: "travel",
            item: "Relocation Expenses",
            estimatedCost: 5000,
            currency,
            confidence: 0.5,
            required: false,
            timing: "After visa approval",
            notes: "Estimated costs for moving to new country",
          });
        }

        // Optional services
        if (includeOptionalServices) {
          costs.push({
            category: "miscellaneous",
            item: "Application Tracking Service",
            estimatedCost: 50,
            currency,
            confidence: 0.9,
            required: false,
            timing: "With application submission",
            notes: "Premium tracking and notification service",
          });

          costs.push({
            category: "miscellaneous",
            item: "Document Courier Service",
            estimatedCost: 100,
            currency,
            confidence: 0.8,
            required: false,
            timing: "For document submission",
            notes: "Secure courier service for important documents",
          });
        }

        return costs;
      },
    });

    // Generate comprehensive cost estimation using AI SDK v5
    const { object: estimation } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      tools: {
        calculateGovernmentFees: governmentFeesTool,
        calculateLegalFees: legalFeesTool,
        calculateDocumentFees: documentFeesTool,
        calculateMedicalExams: medicalExamTool,
        calculateTravelCosts: travelCostsTool,
      },
      schema: CostEstimationSchema,
      system: `You are an expert immigration cost estimation analyst with comprehensive knowledge of fees, expenses, and budget planning for immigration processes.

Your role is to:
1. Calculate accurate government fees and official costs
2. Estimate professional service fees (legal, document preparation)
3. Assess document-related expenses (translations, authentications)
4. Factor in medical examination and testing costs
5. Consider travel and relocation expenses
6. Provide budget planning with payment schedules
7. Suggest cost optimization strategies
8. Compare with historical cost data

Use the available tools to calculate different cost categories. Consider:
- Government fees (application, biometric, expedited processing)
- Legal and professional service fees
- Document preparation costs (translations, authentications, evaluations)
- Medical examination requirements
- Travel costs for interviews and relocation
- Miscellaneous expenses and optional services
- Currency conversion and regional variations
- Payment timing and budget planning

Provide detailed cost breakdown with confidence intervals and optimization suggestions.`,
      prompt: `Estimate comprehensive costs for the following immigration case:

**User Profile:**
${JSON.stringify(userProfile, null, 2)}

**Case Details:**
- Case Type: ${caseData.caseType}
- Country: ${caseData.country}
- Visa Type: ${caseData.visaType}
- Application Stage: ${caseData.applicationStage || "Preparation"}
- Family Members: ${caseData.familyMembers || 0}
- Expedited Processing: ${caseData.expeditedProcessing || false}

**Preferences:**
- Currency: ${currency}
- Include Legal Fees: ${preferences?.includeLegalFees || false}
- Include Optional Services: ${preferences?.includeOptionalServices || false}
- Budget Constraints: ${preferences?.budgetConstraints || "None specified"}

**Requirements:**
1. Use the cost calculation tools to estimate different expense categories
2. Provide a comprehensive cost estimation including:
   - Total estimated cost with confidence interval
   - Detailed cost breakdown by category and item
   - Cost category analysis with percentages
   - Budget planning with upfront, ongoing, and contingency costs
   - Payment schedule aligned with application timeline
   - Cost optimization suggestions
   - Historical cost comparison for context

**Estimation ID:** ${estimationId}

Focus on providing accurate, actionable cost information that helps with budget planning and financial preparation.`,
    });

    return {
      ...estimation,
      estimationId,
      caseType: caseData.caseType,
      country: caseData.country,
      visaType: caseData.visaType,
      currency,
      modelVersion: this.config.model,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Update cost estimation based on changed circumstances
   */
  async updateCostEstimation(
    existingEstimation: CostEstimation,
    updates: {
      exchangeRates?: Record<string, number>;
      feeChanges?: Array<{ category: string; item: string; newCost: number }>;
      additionalServices?: string[];
      removedServices?: string[];
    }
  ): Promise<CostEstimation> {
    const { text: analysis } = await generateText({
      model: openai(this.config.model),
      temperature: this.config.temperature,
      maxSteps: 5,
      system: `You are updating a cost estimation based on changed circumstances. 
      Analyze how the updates affect the original costs and provide revised estimates.`,
      prompt: `Update the following cost estimation based on changes:

**Original Estimation:**
Total Cost: ${existingEstimation.totalEstimatedCost} ${existingEstimation.currency}

**Updates:**
${JSON.stringify(updates, null, 2)}

Analyze how these changes affect the cost estimation and provide updated totals.`,
    });

    // For now, return the existing estimation with updated timestamp
    // In a full implementation, this would recalculate based on the analysis
    return {
      ...existingEstimation,
      timestamp: new Date().toISOString(),
    };
  }

  private getGovernmentFees(visaType: string, country: string) {
    // Realistic government fee estimates based on common visa types
    const feeStructures: Record<
      string,
      { application: number; biometric: number; dependent: number }
    > = {
      tourist_visa: { application: 160, biometric: 85, dependent: 160 },
      student_visa: { application: 350, biometric: 85, dependent: 350 },
      work_visa: { application: 460, biometric: 85, dependent: 460 },
      family_visa: { application: 535, biometric: 85, dependent: 535 },
      permanent_residence: {
        application: 1140,
        biometric: 85,
        dependent: 1140,
      },
      citizenship: { application: 725, biometric: 85, dependent: 0 },
    };

    return (
      feeStructures[visaType] || {
        application: 400,
        biometric: 85,
        dependent: 400,
      }
    );
  }

  private getLegalFees(
    visaType: string,
    complexity: string,
    country: string
  ): number {
    // Base legal fee estimates
    const baseFees: Record<string, number> = {
      tourist_visa: 1000,
      student_visa: 2000,
      work_visa: 3500,
      family_visa: 3000,
      permanent_residence: 5000,
      citizenship: 2500,
    };

    return baseFees[visaType] || 3000;
  }
}
