import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { getModelForTask } from "../utils";
import { z } from "zod";
import { Application, Policy, ApplicationSchema, PolicySchema } from "../types";
import { withAgentErrorHandling, logAgentStep } from "../utils";
import {
  policyQueryTool,
  requirementCheckTool,
  eligibilityTool,
} from "../tools";

// Compliance check result schema
const ComplianceSchema = z.object({
  overallCompliance: z.enum(["compliant", "non_compliant", "requires_review"]),
  complianceScore: z.number().min(0).max(100),
  policyChecks: z.array(
    z.object({
      policyId: z.string(),
      policyTitle: z.string(),
      compliant: z.boolean(),
      requirements: z.array(
        z.object({
          requirement: z.string(),
          met: z.boolean(),
          evidence: z.string(),
          notes: z.string().optional(),
        })
      ),
      violations: z.array(
        z.object({
          violation: z.string(),
          severity: z.enum(["low", "medium", "high", "critical"]),
          description: z.string(),
          remedy: z.string(),
        })
      ),
    })
  ),
  recommendations: z.array(z.string()),
  nextSteps: z.array(z.string()),
});

// Policy analysis schema
const PolicyAnalysisSchema = z.object({
  applicablePolicies: z.array(z.string()),
  keyRequirements: z.array(z.string()),
  criticalFactors: z.array(z.string()),
  riskAreas: z.array(z.string()),
  processingNotes: z.array(z.string()),
});

export class PolicyComplianceTeam {
  /**
   * Main compliance checking method
   */
  async checkCompliance(application: Application, currentPolicies: Policy[]) {
    const checkCompliance = withAgentErrorHandling(async () => {
      // Step 1: Analyze applicable policies
      const policyAnalysis = await this.analyzePolicies(
        application,
        currentPolicies
      );

      logAgentStep({
        stepNumber: 1,
        text: `Analyzed ${currentPolicies.length} policies, found ${policyAnalysis.applicablePolicies.length} applicable`,
        toolCalls: [],
        toolResults: [],
        finishReason: "completed",
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      });

      // Step 2: Perform detailed compliance check
      const complianceResult = await this.performComplianceCheck(
        application,
        currentPolicies.filter((p) =>
          policyAnalysis.applicablePolicies.includes(p.id)
        )
      );

      logAgentStep({
        stepNumber: 2,
        text: `Compliance check completed: ${complianceResult.overallCompliance} (Score: ${complianceResult.complianceScore})`,
        toolCalls: [],
        toolResults: [],
        finishReason: "completed",
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      });

      return {
        policyAnalysis,
        complianceResult,
      };
    });

    return await checkCompliance();
  }

  /**
   * Analyze which policies apply to the application
   */
  private async analyzePolicies(application: Application, policies: Policy[]) {
    const { object: analysis } = await generateObject({
      model: openai(getModelForTask("policy_compliance")),
      schema: PolicyAnalysisSchema,
      system: `You are an immigration policy analyst. Determine which policies apply to applications and identify key requirements.
      
      Consider:
      - Application type and category
      - Applicant country and destination
      - Document types and requirements
      - Current policy versions and updates
      - Special circumstances or exceptions`,
      prompt: `Analyze which policies apply to this immigration application:
      
      Application: ${JSON.stringify(application)}
      
      Available Policies:
      ${policies.map((p) => `- ${p.id}: ${p.title} (${p.category}, ${p.country})`).join("\n")}
      
      Identify applicable policies and key requirements.`,
    });

    return analysis;
  }

  /**
   * Perform detailed compliance checking
   */
  private async performComplianceCheck(
    application: Application,
    applicablePolicies: Policy[]
  ) {
    const { object: complianceCheck } = await generateObject({
      model: openai(getModelForTask("policy_compliance")),
      schema: ComplianceSchema,
      system: `You are an immigration policy compliance expert. Perform thorough compliance checking against current policies.
      
      Your process:
      1. Query policy database for latest requirements
      2. Check each requirement against application
      3. Validate eligibility criteria
      4. Identify violations and remedies
      5. Provide compliance score and recommendations
      
      Be thorough and accurate in your assessment.`,
      prompt: `Check compliance for this immigration application:
      
      Application: ${JSON.stringify(application)}
      
      Applicable Policies:
      ${applicablePolicies.map((p) => `${p.title}: ${p.requirements.join(", ")}`).join("\n")}
      
      Perform comprehensive compliance checking using available tools.`,
    });

    return complianceCheck;
  }

  /**
   * Check specific policy requirements
   */
  async checkSpecificRequirements(
    application: Application,
    requirements: string[]
  ) {
    const checkRequirements = withAgentErrorHandling(async () => {
      const { object: requirementCheck } = await generateObject({
        model: openai("gpt-4o"),
        schema: z.object({
          requirementResults: z.array(
            z.object({
              requirement: z.string(),
              met: z.boolean(),
              confidence: z.number().min(0).max(100),
              evidence: z.string(),
              gaps: z.array(z.string()),
              recommendations: z.array(z.string()),
            })
          ),
          overallCompliance: z.boolean(),
          criticalGaps: z.array(z.string()),
          nextSteps: z.array(z.string()),
        }),


        system:
          "You are a requirements verification specialist. Check applications against specific requirements.",
        prompt: `Check if this application meets these specific requirements:
        
        Application: ${JSON.stringify(application)}
        Requirements to check: ${requirements.join(", ")}
        
        Verify each requirement and provide detailed assessment.`,
      });

      return requirementCheck;
    });

    return await checkRequirements();
  }

  /**
   * Validate eligibility criteria
   */
  async validateEligibility(
    application: Application,
    eligibilityCriteria: string[]
  ) {
    const validateEligibility = withAgentErrorHandling(async () => {
      const { object: eligibilityCheck } = await generateObject({
        model: openai("gpt-4o"),
        schema: z.object({
          eligible: z.boolean(),
          confidence: z.number().min(0).max(100),
          criteriaResults: z.array(
            z.object({
              criterion: z.string(),
              met: z.boolean(),
              evidence: z.string(),
              notes: z.string().optional(),
            })
          ),
          disqualifyingFactors: z.array(z.string()),
          recommendations: z.array(z.string()),
        }),


        system:
          "You are an immigration eligibility specialist. Determine if applicants meet eligibility criteria.",
        prompt: `Validate eligibility for this immigration application:
        
        Application: ${JSON.stringify(application)}
        Eligibility Criteria: ${eligibilityCriteria.join(", ")}
        
        Check each criterion and determine overall eligibility.`,
      });

      return eligibilityCheck;
    });

    return await validateEligibility();
  }

  /**
   * Get policy updates and changes
   */
  async getPolicyUpdates(country: string, category: string, since?: Date) {
    const getPolicyUpdates = withAgentErrorHandling(async () => {
      const { object: updates } = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: z.object({
          updates: z.array(
            z.object({
              policyId: z.string(),
              title: z.string(),
              changeType: z.enum(["new", "modified", "deprecated"]),
              effectiveDate: z.string(),
              summary: z.string(),
              impact: z.enum(["low", "medium", "high"]),
              affectedApplications: z.array(z.string()),
            })
          ),
          summary: z.string(),
          actionRequired: z.array(z.string()),
        }),
        system:
          "You are a policy monitoring specialist. Track policy changes and their impacts.",
        prompt: `Get policy updates for:
        
        Country: ${country}
        Category: ${category}
        Since: ${since?.toISOString() || "last 30 days"}
        
        Identify recent changes and their impact on applications.`,
      });

      return updates;
    });

    return await getPolicyUpdates();
  }

  /**
   * Generate compliance report
   */
  async generateComplianceReport(
    application: Application,
    complianceResults: any
  ) {
    const generateReport = withAgentErrorHandling(async () => {
      const { object: report } = await generateObject({
        model: openai("gpt-4o"),
        schema: z.object({
          executiveSummary: z.string(),
          complianceStatus: z.enum([
            "compliant",
            "non_compliant",
            "requires_review",
          ]),
          keyFindings: z.array(z.string()),
          violations: z.array(
            z.object({
              description: z.string(),
              severity: z.enum(["low", "medium", "high", "critical"]),
              remedy: z.string(),
              timeline: z.string(),
            })
          ),
          recommendations: z.array(z.string()),
          nextSteps: z.array(
            z.object({
              action: z.string(),
              priority: z.enum(["low", "medium", "high"]),
              timeline: z.string(),
              responsible: z.string(),
            })
          ),
          riskAssessment: z.string(),
        }),
        system:
          "You are a compliance reporting specialist. Generate comprehensive compliance reports.",
        prompt: `Generate a compliance report for this immigration application:
        
        Application: ${JSON.stringify(application)}
        Compliance Results: ${JSON.stringify(complianceResults)}
        
        Create a detailed report with findings, recommendations, and next steps.`,
      });

      return report;
    });

    return await generateReport();
  }
}
