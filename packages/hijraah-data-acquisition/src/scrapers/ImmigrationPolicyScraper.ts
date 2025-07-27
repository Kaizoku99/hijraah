/**
 * Immigration Policy Scraper
 *
 * Specialized scraper for immigration policy documents and requirements.
 * Extracts structured policy data, requirements, and changes.
 */

import {
  GovernmentWebsiteScraper,
  GovernmentScrapingConfigSchema,
  type GovernmentScrapingConfig,
} from "./GovernmentWebsiteScraper";
import { ScrapingResult } from "../interfaces";
import { z } from "zod";
import FirecrawlApp from "@mendable/firecrawl-js";

// Immigration policy scraping configuration schema
export const PolicyScrapingConfigSchema = GovernmentScrapingConfigSchema.extend(
  {
    policyType: z.enum([
      "visa",
      "residency",
      "citizenship",
      "work_permit",
      "student_visa",
      "family_reunification",
      "asylum",
      "other",
    ]),
    trackChanges: z.boolean().default(true),
    extractRequirements: z.boolean().default(true),
    extractTimelines: z.boolean().default(true),
    extractFees: z.boolean().default(true),
    extractEligibility: z.boolean().default(true),
    compareWithPrevious: z.boolean().default(true),
    previousVersionUrl: z.string().url().optional(),
    versionDate: z.string().optional(),
  },
);

export type PolicyScrapingConfig = z.infer<typeof PolicyScrapingConfigSchema>;

// Policy requirement schema
export const PolicyRequirementSchema = z.object({
  id: z.string(),
  description: z.string(),
  category: z.string(),
  mandatory: z.boolean(),
  alternatives: z.array(z.string()).optional(),
  conditions: z.array(z.string()).optional(),
  documentationNeeded: z.array(z.string()).optional(),
});

// Policy timeline step schema
export const PolicyTimelineStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.object({
    min: z.number(),
    max: z.number(),
    unit: z.enum(["days", "weeks", "months", "years"]),
  }),
  prerequisites: z.array(z.string()).optional(),
  responsibleParty: z.string(),
});

// Policy fee schema
export const PolicyFeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  currency: z.string(),
  paymentMethod: z.array(z.string()).optional(),
  refundable: z.boolean(),
  conditions: z.array(z.string()).optional(),
});

// Policy eligibility criterion schema
export const PolicyEligibilityCriterionSchema = z.object({
  id: z.string(),
  description: z.string(),
  category: z.string(),
  alternatives: z.array(z.string()).optional(),
  exceptions: z.array(z.string()).optional(),
});

// Structured policy data schema
export const StructuredPolicyDataSchema = z.object({
  title: z.string(),
  summary: z.string(),
  effectiveDate: z.string().optional(),
  expirationDate: z.string().optional(),
  requirements: z.array(PolicyRequirementSchema),
  timeline: z.array(PolicyTimelineStepSchema),
  fees: z.array(PolicyFeeSchema),
  eligibility: z.array(PolicyEligibilityCriterionSchema),
  relatedPolicies: z.array(z.string()).optional(),
  changes: z
    .array(
      z.object({
        from: z.string(),
        description: z.string(),
        impactLevel: z.enum(["high", "medium", "low"]),
      }),
    )
    .optional(),
});

export type PolicyRequirement = z.infer<typeof PolicyRequirementSchema>;
export type PolicyTimelineStep = z.infer<typeof PolicyTimelineStepSchema>;
export type PolicyFee = z.infer<typeof PolicyFeeSchema>;
export type PolicyEligibilityCriterion = z.infer<
  typeof PolicyEligibilityCriterionSchema
>;
export type StructuredPolicyData = z.infer<typeof StructuredPolicyDataSchema>;

/**
 * Immigration Policy Scraper class
 */
export class ImmigrationPolicyScraper extends GovernmentWebsiteScraper {
  private previousVersionsCache: Map<string, any> = new Map();

  /**
   * Perform specialized policy scraping
   */
  protected async performScrape(
    config: PolicyScrapingConfig,
  ): Promise<ScrapingResult> {
    try {
      // Validate and parse the config using Zod
      const policyConfig = PolicyScrapingConfigSchema.parse(config);

      console.log(`📜 Scraping immigration policy: ${policyConfig.url}`);
      console.log(
        `🔍 Policy type: ${policyConfig.policyType}, Country: ${policyConfig.country}`,
      );

      // Step 1: Scrape the website using Firecrawl with policy-specific extraction
      const scrapeOptions = {
        formats: ["markdown", "extract"] as const,
        extract: {
          schema: StructuredPolicyDataSchema,
          prompt: `Extract comprehensive immigration policy information for ${policyConfig.policyType} in ${policyConfig.country}.
          
          Focus on extracting:
          1. Requirements: All mandatory and optional requirements with their categories
          2. Timeline: Step-by-step process with durations and responsible parties
          3. Fees: All costs, payment methods, and refund policies
          4. Eligibility: Criteria, alternatives, and exceptions
          5. Related policies and cross-references
          
          Pay special attention to:
          - Specific dollar amounts and currencies
          - Exact timeframes (days, weeks, months)
          - Required documents and forms
          - Eligibility conditions and exceptions
          - Process steps and their sequence`,
          systemPrompt: `You are an expert immigration policy analyst. Extract structured, actionable information from immigration policy documents. 
          Be precise with numbers, dates, and requirements. Identify mandatory vs optional requirements clearly.
          Focus on information that would help someone understand what they need to do to comply with this policy.`,
        },
        onlyMainContent: true,
        timeout: policyConfig.timeout,
      };

      const scrapeResult = await this.firecrawlClient.scrapeUrl(
        policyConfig.url,
        scrapeOptions,
      );

      if (!scrapeResult.success) {
        throw new Error(
          `Firecrawl policy scraping failed: ${scrapeResult.error}`,
        );
      }

      // Step 2: Extract and validate structured policy data
      const structuredPolicyData = await this.extractPolicyData(
        scrapeResult,
        policyConfig,
      );

      // Step 3: Compare with previous version if requested
      let changes: any[] = [];
      if (policyConfig.compareWithPrevious) {
        changes = await this.detectPolicyChanges(
          structuredPolicyData,
          policyConfig,
        );
      }

      // Step 4: Add the changes to the structured data
      const enrichedData = {
        ...structuredPolicyData,
        changes,
      };

      // Step 5: Store the policy data
      const storageResult = await this.storePolicyData(
        enrichedData,
        policyConfig,
      );

      // Step 6: Return the successful result with structured policy data
      return {
        success: true,
        url: policyConfig.url,
        timestamp: new Date().toISOString(),
        data: enrichedData,
        metadata: {
          country: policyConfig.country,
          agency: policyConfig.agency,
          documentType: policyConfig.documentType,
          policyType: policyConfig.policyType,
          requirementsCount: structuredPolicyData.requirements.length,
          timelineSteps: structuredPolicyData.timeline.length,
          feesCount: structuredPolicyData.fees.length,
          eligibilityCriteria: structuredPolicyData.eligibility.length,
          changesDetected: changes.length,
          storageId: storageResult.id,
          firecrawlMetadata: scrapeResult.metadata,
        },
      };
    } catch (error: any) {
      console.error(`❌ Policy scraping failed for ${config.url}:`, error);

      // Return error result
      return {
        success: false,
        url: config.url,
        timestamp: new Date().toISOString(),
        error: {
          message: error.message,
          code: error.code || "POLICY_SCRAPING_ERROR",
          details: error.details || {},
        },
      };
    }
  }

  /**
   * Extract structured policy data from scraped content
   */
  private async extractPolicyData(
    scrapeResult: any,
    config: PolicyScrapingConfig,
  ): Promise<StructuredPolicyData> {
    console.log("🔄 Extracting structured policy data");

    const extractedData = scrapeResult.data?.extract || {};
    const markdown = scrapeResult.data?.markdown || "";
    const metadata = scrapeResult.data?.metadata || {};

    // Validate and enhance the extracted data
    const structuredData: StructuredPolicyData = {
      title:
        extractedData.title ||
        metadata.title ||
        `${config.policyType} Policy - ${config.country}`,
      summary:
        extractedData.summary || this.generatePolicySummary(markdown, config),
      effectiveDate:
        extractedData.effectiveDate || this.extractEffectiveDate(markdown),
      expirationDate: extractedData.expirationDate,
      requirements: this.processRequirements(
        extractedData.requirements || [],
        markdown,
        config,
      ),
      timeline: this.processTimeline(
        extractedData.timeline || [],
        markdown,
        config,
      ),
      fees: this.processFees(extractedData.fees || [], markdown, config),
      eligibility: this.processEligibility(
        extractedData.eligibility || [],
        markdown,
        config,
      ),
      relatedPolicies:
        extractedData.relatedPolicies || this.extractRelatedPolicies(markdown),
    };

    return structuredData;
  }

  /**
   * Generate policy summary
   */
  private generatePolicySummary(
    markdown: string,
    config: PolicyScrapingConfig,
  ): string {
    const lines = markdown
      .split("\n")
      .filter(
        (line) =>
          line.trim() &&
          !line.startsWith("#") &&
          !line.startsWith("*") &&
          !line.startsWith("-") &&
          line.length > 50,
      );

    if (lines.length > 0) {
      const summary = lines.slice(0, 3).join(" ").trim();
      return summary.length > 300 ? summary.substring(0, 300) + "..." : summary;
    }

    return `Immigration policy for ${config.policyType} in ${config.country}`;
  }

  /**
   * Process requirements from extracted data
   */
  private processRequirements(
    requirements: any[],
    markdown: string,
    config: PolicyScrapingConfig,
  ): PolicyRequirement[] {
    if (requirements && requirements.length > 0) {
      return requirements.map((req, index) => ({
        id: req.id || `req-${index + 1}`,
        description: req.description || "Requirement not specified",
        category: req.category || "general",
        mandatory: req.mandatory !== false, // Default to true
        alternatives: req.alternatives || [],
        conditions: req.conditions || [],
        documentationNeeded: req.documentationNeeded || [],
      }));
    }

    // Fallback: extract requirements from markdown
    return this.extractRequirementsFromMarkdown(markdown);
  }

  /**
   * Extract requirements from markdown content
   */
  private extractRequirementsFromMarkdown(
    markdown: string,
  ): PolicyRequirement[] {
    const requirements: PolicyRequirement[] = [];
    const lines = markdown.split("\n");

    let inRequirementsSection = false;
    let reqIndex = 1;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check if we're entering a requirements section
      if (
        trimmedLine.toLowerCase().includes("requirement") &&
        trimmedLine.startsWith("#")
      ) {
        inRequirementsSection = true;
        continue;
      }

      // Check if we're leaving the requirements section
      if (
        inRequirementsSection &&
        trimmedLine.startsWith("#") &&
        !trimmedLine.toLowerCase().includes("requirement")
      ) {
        inRequirementsSection = false;
        continue;
      }

      // Extract requirements from list items
      if (
        inRequirementsSection &&
        (trimmedLine.startsWith("*") ||
          trimmedLine.startsWith("-") ||
          trimmedLine.match(/^\d+\./))
      ) {
        const description = trimmedLine.replace(/^[\*\-\d\.]\s*/, "").trim();
        if (description.length > 10) {
          requirements.push({
            id: `req-${reqIndex++}`,
            description,
            category: "general",
            mandatory: !description.toLowerCase().includes("optional"),
            alternatives: [],
            conditions: [],
            documentationNeeded: [],
          });
        }
      }
    }

    return requirements;
  }

  /**
   * Process timeline from extracted data
   */
  private processTimeline(
    timeline: any[],
    markdown: string,
    config: PolicyScrapingConfig,
  ): PolicyTimelineStep[] {
    if (timeline && timeline.length > 0) {
      return timeline.map((step, index) => ({
        id: step.id || `step-${index + 1}`,
        name: step.name || `Step ${index + 1}`,
        description: step.description || "",
        duration: step.duration || { min: 1, max: 1, unit: "days" as const },
        prerequisites: step.prerequisites || [],
        responsibleParty: step.responsibleParty || "Applicant",
      }));
    }

    // Fallback: create basic timeline
    return this.createBasicTimeline(config);
  }

  /**
   * Create basic timeline for policy
   */
  private createBasicTimeline(
    config: PolicyScrapingConfig,
  ): PolicyTimelineStep[] {
    const basicSteps: PolicyTimelineStep[] = [
      {
        id: "step-1",
        name: "Application Preparation",
        description: "Gather required documents and complete application forms",
        duration: { min: 1, max: 7, unit: "days" },
        prerequisites: [],
        responsibleParty: "Applicant",
      },
      {
        id: "step-2",
        name: "Application Submission",
        description: "Submit application with all required documents and fees",
        duration: { min: 1, max: 1, unit: "days" },
        prerequisites: ["step-1"],
        responsibleParty: "Applicant",
      },
      {
        id: "step-3",
        name: "Initial Review",
        description: "Administrative review of application completeness",
        duration: { min: 1, max: 4, unit: "weeks" },
        prerequisites: ["step-2"],
        responsibleParty: config.agency,
      },
      {
        id: "step-4",
        name: "Decision",
        description: "Final decision on application",
        duration: { min: 1, max: 6, unit: "months" },
        prerequisites: ["step-3"],
        responsibleParty: config.agency,
      },
    ];

    return basicSteps;
  }

  /**
   * Process fees from extracted data
   */
  private processFees(
    fees: any[],
    markdown: string,
    config: PolicyScrapingConfig,
  ): PolicyFee[] {
    if (fees && fees.length > 0) {
      return fees.map((fee, index) => ({
        id: fee.id || `fee-${index + 1}`,
        name: fee.name || "Application Fee",
        amount: fee.amount || 0,
        currency: fee.currency || "USD",
        paymentMethod: fee.paymentMethod || ["Credit Card", "Bank Transfer"],
        refundable: fee.refundable || false,
        conditions: fee.conditions || [],
      }));
    }

    // Fallback: extract fees from markdown
    return this.extractFeesFromMarkdown(markdown);
  }

  /**
   * Extract fees from markdown content
   */
  private extractFeesFromMarkdown(markdown: string): PolicyFee[] {
    const fees: PolicyFee[] = [];
    const feePatterns = [
      /(\$[\d,]+(?:\.\d{2})?)/g,
      /([\d,]+(?:\.\d{2})?\s*(?:USD|EUR|GBP|CAD))/gi,
      /fee[:\s]*(\$?[\d,]+(?:\.\d{2})?)/gi,
    ];

    let feeIndex = 1;
    for (const pattern of feePatterns) {
      const matches = markdown.match(pattern);
      if (matches) {
        for (const match of matches) {
          const amount = parseFloat(match.replace(/[$,\s]/g, ""));
          if (amount > 0) {
            fees.push({
              id: `fee-${feeIndex++}`,
              name: "Application Fee",
              amount,
              currency: "USD",
              paymentMethod: ["Credit Card", "Bank Transfer"],
              refundable: false,
              conditions: [],
            });
          }
        }
      }
    }

    return fees.length > 0
      ? fees
      : [
          {
            id: "fee-1",
            name: "Application Fee",
            amount: 0,
            currency: "USD",
            paymentMethod: ["Credit Card", "Bank Transfer"],
            refundable: false,
            conditions: ["Amount to be determined"],
          },
        ];
  }

  /**
   * Process eligibility from extracted data
   */
  private processEligibility(
    eligibility: any[],
    markdown: string,
    config: PolicyScrapingConfig,
  ): PolicyEligibilityCriterion[] {
    if (eligibility && eligibility.length > 0) {
      return eligibility.map((criterion, index) => ({
        id: criterion.id || `elig-${index + 1}`,
        description: criterion.description || "Eligibility criterion",
        category: criterion.category || "general",
        alternatives: criterion.alternatives || [],
        exceptions: criterion.exceptions || [],
      }));
    }

    // Fallback: extract eligibility from markdown
    return this.extractEligibilityFromMarkdown(markdown);
  }

  /**
   * Extract eligibility from markdown content
   */
  private extractEligibilityFromMarkdown(
    markdown: string,
  ): PolicyEligibilityCriterion[] {
    const eligibility: PolicyEligibilityCriterion[] = [];
    const lines = markdown.split("\n");

    let inEligibilitySection = false;
    let eligIndex = 1;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check if we're entering an eligibility section
      if (
        trimmedLine.toLowerCase().includes("eligib") &&
        trimmedLine.startsWith("#")
      ) {
        inEligibilitySection = true;
        continue;
      }

      // Check if we're leaving the eligibility section
      if (
        inEligibilitySection &&
        trimmedLine.startsWith("#") &&
        !trimmedLine.toLowerCase().includes("eligib")
      ) {
        inEligibilitySection = false;
        continue;
      }

      // Extract eligibility from list items
      if (
        inEligibilitySection &&
        (trimmedLine.startsWith("*") ||
          trimmedLine.startsWith("-") ||
          trimmedLine.match(/^\d+\./))
      ) {
        const description = trimmedLine.replace(/^[\*\-\d\.]\s*/, "").trim();
        if (description.length > 10) {
          eligibility.push({
            id: `elig-${eligIndex++}`,
            description,
            category: "general",
            alternatives: [],
            exceptions: [],
          });
        }
      }
    }

    return eligibility.length > 0
      ? eligibility
      : [
          {
            id: "elig-1",
            description: "Must meet general immigration requirements",
            category: "general",
            alternatives: [],
            exceptions: [],
          },
        ];
  }

  /**
   * Extract related policies from markdown
   */
  private extractRelatedPolicies(markdown: string): string[] {
    const relatedPolicies: string[] = [];
    const policyPatterns = [
      /related\s+polic(?:y|ies)[:\s]*([^\n]+)/gi,
      /see\s+also[:\s]*([^\n]+)/gi,
      /additional\s+information[:\s]*([^\n]+)/gi,
    ];

    for (const pattern of policyPatterns) {
      const matches = markdown.match(pattern);
      if (matches) {
        for (const match of matches) {
          const policies = match
            .split(/[,;]/)
            .map((p) => p.trim())
            .filter((p) => p.length > 5);
          relatedPolicies.push(...policies);
        }
      }
    }

    return [...new Set(relatedPolicies)]; // Remove duplicates
  }

  /**
   * Detect changes between current and previous policy versions
   */
  private async detectPolicyChanges(
    currentPolicy: StructuredPolicyData,
    config: PolicyScrapingConfig,
  ): Promise<any[]> {
    console.log("🔄 Detecting policy changes");

    // Get previous version
    let previousPolicy: StructuredPolicyData | null = null;

    if (config.previousVersionUrl) {
      // Check cache first
      if (this.previousVersionsCache.has(config.previousVersionUrl)) {
        previousPolicy = this.previousVersionsCache.get(
          config.previousVersionUrl,
        );
      } else {
        // Fetch previous version
        try {
          const previousConfig = {
            ...config,
            url: config.previousVersionUrl,
            compareWithPrevious: false, // Prevent infinite recursion
          };

          const previousResult = await this.performScrape(previousConfig);

          if (previousResult.success) {
            previousPolicy = previousResult.data;
            // Cache the result
            this.previousVersionsCache.set(
              config.previousVersionUrl,
              previousPolicy,
            );
          }
        } catch (error) {
          console.error("Failed to fetch previous policy version:", error);
        }
      }
    }

    // If we couldn't get a previous version, return empty changes
    if (!previousPolicy) {
      return [];
    }

    // Compare and detect changes
    const changes = [];

    // Check for new requirements
    const newRequirements = currentPolicy.requirements.filter(
      (current) =>
        !previousPolicy!.requirements.some(
          (prev) => prev.description === current.description,
        ),
    );

    if (newRequirements.length > 0) {
      changes.push({
        from: "requirements",
        description: `Added ${newRequirements.length} new requirements`,
        impactLevel: "high",
      });
    }

    // Check for fee changes
    for (const currentFee of currentPolicy.fees) {
      const previousFee = previousPolicy.fees.find(
        (fee) => fee.name === currentFee.name,
      );

      if (previousFee && previousFee.amount !== currentFee.amount) {
        changes.push({
          from: "fees",
          description: `Changed ${currentFee.name} from ${previousFee.amount} to ${currentFee.amount} ${currentFee.currency}`,
          impactLevel: "medium",
        });
      }
    }

    // Check for timeline changes
    for (const currentStep of currentPolicy.timeline) {
      const previousStep = previousPolicy.timeline.find(
        (step) => step.name === currentStep.name,
      );

      if (previousStep) {
        if (
          previousStep.duration.min !== currentStep.duration.min ||
          previousStep.duration.max !== currentStep.duration.max
        ) {
          changes.push({
            from: "timeline",
            description: `Changed duration for ${currentStep.name}`,
            impactLevel: "medium",
          });
        }
      }
    }

    return changes;
  }

  /**
   * Store policy data in the database
   */
  private async storePolicyData(
    policyData: StructuredPolicyData,
    config: PolicyScrapingConfig,
  ): Promise<any> {
    console.log("💾 Storing policy data");

    try {
      // Store in policy_changes table if changes were detected
      if (policyData.changes && policyData.changes.length > 0) {
        for (const change of policyData.changes) {
          await this.supabaseClient.from("policy_changes").insert({
            country: config.country,
            change_type: change.from,
            impact_level: change.impactLevel,
            title: `Change in ${config.policyType} policy for ${config.country}`,
            description: change.description,
            effective_date: policyData.effectiveDate,
            source_url: config.url,
            confidence: 0.9, // High confidence since we detected it programmatically
          });
        }
      }

      // Store the full policy data
      const { data, error } = await this.supabaseClient
        .from("collection_results")
        .insert({
          status: "success",
          data: policyData,
          metadata: {
            url: config.url,
            country: config.country,
            agency: config.agency,
            documentType: config.documentType,
            policyType: config.policyType,
            language: config.language,
            changesDetected: policyData.changes?.length || 0,
            requirementsCount: policyData.requirements.length,
            timelineSteps: policyData.timeline.length,
            feesCount: policyData.fees.length,
            eligibilityCriteria: policyData.eligibility.length,
          },
          items_collected: 1,
        })
        .select("id")
        .single();

      if (error) throw error;

      return { id: data.id };
    } catch (error) {
      console.error("Failed to store policy data:", error);
      return { id: null, error };
    }
  }
}
