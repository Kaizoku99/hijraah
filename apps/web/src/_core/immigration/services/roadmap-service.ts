import { Case, CaseType } from "../entities/case";
import { Roadmap, RoadmapPhase, RoadmapMilestone } from "../entities/roadmap";

import { CaseService } from "./case-service";

/**
 * Roadmap Service domain service
 *
 * Handles roadmap-related business logic for generating and managing
 * personalized immigration roadmaps
 */
export class RoadmapService {
  private caseService: CaseService;

  constructor(caseService: CaseService) {
    this.caseService = caseService;
  }

  /**
   * Generate a personalized roadmap based on case type and user data
   */
  generateRoadmap(
    caseInstance: Case,
    userId: string,
    customizationParams?: {
      urgency?: "normal" | "expedited";
      complexity?: "simple" | "standard" | "complex";
      priorityDocuments?: string[];
    },
  ): Roadmap {
    // Set defaults for customization parameters
    const params = {
      urgency: customizationParams?.urgency || "normal",
      complexity: customizationParams?.complexity || "standard",
      priorityDocuments: customizationParams?.priorityDocuments || [],
    };

    // Generate roadmap phases based on case type
    const phases = this.generatePhases(caseInstance.caseType, params);

    // Calculate timeline
    const { startDate, targetEndDate, estimatedEndDate } =
      this.calculateTimeline(caseInstance.caseType, phases, params);

    // Create roadmap instance
    return new Roadmap({
      id: crypto.randomUUID(),
      title: `${this.getRoadmapTitle(caseInstance.caseType)} - ${caseInstance.caseNumber}`,
      description: this.getRoadmapDescription(caseInstance.caseType),
      caseId: caseInstance.id,
      caseType: caseInstance.caseType,
      userId,
      phases,
      startDate,
      targetEndDate,
      estimatedEndDate,
      completionPercentage: 0,
      lastUpdated: new Date(),
      metadata: {
        customizationParams: params,
        generated: true,
      },
    });
  }

  /**
   * Get roadmap title based on case type
   */
  private getRoadmapTitle(caseType: CaseType): string {
    switch (caseType) {
      case CaseType.ASYLUM:
        return "Asylum Application Roadmap";
      case CaseType.VISA_APPLICATION:
        return "Visa Application Roadmap";
      case CaseType.WORK_PERMIT:
        return "Work Permit Roadmap";
      case CaseType.FAMILY_SPONSORSHIP:
        return "Family Sponsorship Roadmap";
      case CaseType.CITIZENSHIP:
        return "Citizenship Application Roadmap";
      case CaseType.RESIDENCY:
        return "Residency Application Roadmap";
      case CaseType.REFUGEE:
        return "Refugee Application Roadmap";
      case CaseType.OTHER:
        return "Immigration Process Roadmap";
      default:
        return "Immigration Process Roadmap";
    }
  }

  /**
   * Get roadmap description based on case type
   */
  private getRoadmapDescription(caseType: CaseType): string {
    switch (caseType) {
      case CaseType.ASYLUM:
        return "Step-by-step timeline for your asylum application process. Follow this roadmap to navigate through application preparation, filing, interview, and decision phases.";
      case CaseType.VISA_APPLICATION:
        return "Personalized timeline for your visa application. This roadmap outlines document preparation, submission, interview, and approval phases.";
      case CaseType.WORK_PERMIT:
        return "Detailed roadmap for your work permit application. Follow these steps to prepare, file, and obtain your employment authorization.";
      case CaseType.FAMILY_SPONSORSHIP:
        return "Comprehensive timeline for your family sponsorship process. This roadmap guides you through petition filing, documentation, interview, and approval phases.";
      case CaseType.CITIZENSHIP:
        return "Step-by-step guide for your citizenship application. Follow this roadmap to navigate through application, biometrics, interview, test, and oath ceremony.";
      case CaseType.RESIDENCY:
        return "Detailed timeline for your permanent residency application. This roadmap outlines the process from petition to green card approval.";
      case CaseType.REFUGEE:
        return "Personalized roadmap for your refugee application process. Follow these steps from initial screening to final settlement.";
      case CaseType.OTHER:
        return "Customized timeline for your immigration process. This roadmap provides a step-by-step guide to navigate through your specific case.";
      default:
        return "Personalized timeline for your immigration process. Follow this roadmap to navigate through all phases efficiently.";
    }
  }

  /**
   * Generate phases for the roadmap based on case type
   */
  private generatePhases(
    caseType: CaseType,
    params: {
      urgency: "normal" | "expedited";
      complexity: "simple" | "standard" | "complex";
      priorityDocuments: string[];
    },
  ): RoadmapPhase[] {
    // Get phase configuration based on case type
    const phaseConfig = this.getPhaseConfiguration(caseType);

    // Adjust phase timing based on urgency and complexity
    const adjustedPhases = this.adjustPhaseTimings(phaseConfig, params);

    // Generate milestones for each phase
    return adjustedPhases.map((phase) => {
      const milestones = this.generateMilestones(
        phase.id,
        phase.milestoneTypes,
        phase.startDate,
        phase.endDate,
        caseType,
        params,
      );

      return {
        id: phase.id,
        title: phase.title,
        description: phase.description,
        startDate: phase.startDate,
        endDate: phase.endDate,
        status: "not_started",
        completionPercentage: 0,
        milestones,
        metadata: phase.metadata || {},
      };
    });
  }

  /**
   * Get the standard phase configuration based on case type
   */
  private getPhaseConfiguration(caseType: CaseType): Array<{
    id: string;
    title: string;
    description: string;
    milestoneTypes: string[];
    startDate: Date;
    endDate: Date;
    metadata?: Record<string, any>;
  }> {
    const today = new Date();
    const phases: Array<{
      id: string;
      title: string;
      description: string;
      milestoneTypes: string[];
      startDate: Date;
      endDate: Date;
      metadata?: Record<string, any>;
    }> = [];

    // Common phase structure with case-specific customizations
    switch (caseType) {
      case CaseType.ASYLUM:
        phases.push(
          {
            id: crypto.randomUUID(),
            title: "Preparation",
            description:
              "Gather all necessary documents and evidence for your asylum application.",
            milestoneTypes: [
              "document_collection",
              "document_translation",
              "form_preparation",
            ],
            startDate: today,
            endDate: this.addDays(today, 30),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Application Filing",
            description:
              "Complete and submit your asylum application (Form I-589).",
            milestoneTypes: [
              "application_review",
              "application_submission",
              "receipt_notice",
            ],
            startDate: this.addDays(today, 31),
            endDate: this.addDays(today, 45),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Biometrics and Interview",
            description: "Attend biometrics appointment and asylum interview.",
            milestoneTypes: [
              "biometrics_appointment",
              "interview_preparation",
              "interview",
            ],
            startDate: this.addDays(today, 46),
            endDate: this.addDays(today, 180),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Decision and Next Steps",
            description:
              "Receive decision on your asylum application and take appropriate next steps.",
            milestoneTypes: [
              "decision_waiting",
              "decision_response",
              "post_decision_steps",
            ],
            startDate: this.addDays(today, 181),
            endDate: this.addDays(today, 365),
            metadata: { importance: "critical" },
          },
        );
        break;

      case CaseType.VISA_APPLICATION:
        phases.push(
          {
            id: crypto.randomUUID(),
            title: "Preparation",
            description:
              "Gather all necessary documents for your visa application.",
            milestoneTypes: [
              "document_collection",
              "document_verification",
              "form_preparation",
            ],
            startDate: today,
            endDate: this.addDays(today, 15),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Application Submission",
            description: "Complete and submit your visa application.",
            milestoneTypes: [
              "application_review",
              "fee_payment",
              "application_submission",
            ],
            startDate: this.addDays(today, 16),
            endDate: this.addDays(today, 30),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Interview and Processing",
            description: "Prepare for and attend visa interview.",
            milestoneTypes: [
              "interview_preparation",
              "interview",
              "additional_processing",
            ],
            startDate: this.addDays(today, 31),
            endDate: this.addDays(today, 90),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Decision and Travel",
            description: "Receive visa decision and prepare for travel.",
            milestoneTypes: [
              "decision_waiting",
              "visa_issuance",
              "travel_preparation",
            ],
            startDate: this.addDays(today, 91),
            endDate: this.addDays(today, 120),
            metadata: { importance: "critical" },
          },
        );
        break;

      case CaseType.CITIZENSHIP:
        phases.push(
          {
            id: crypto.randomUUID(),
            title: "Preparation",
            description:
              "Gather all necessary documents for your citizenship application.",
            milestoneTypes: [
              "eligibility_verification",
              "document_collection",
              "form_preparation",
            ],
            startDate: today,
            endDate: this.addDays(today, 30),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Application Filing",
            description:
              "Complete and submit your naturalization application (Form N-400).",
            milestoneTypes: [
              "application_review",
              "fee_payment",
              "application_submission",
            ],
            startDate: this.addDays(today, 31),
            endDate: this.addDays(today, 45),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Biometrics and Processing",
            description:
              "Attend biometrics appointment and wait for application processing.",
            milestoneTypes: [
              "biometrics_appointment",
              "background_check",
              "processing_updates",
            ],
            startDate: this.addDays(today, 46),
            endDate: this.addDays(today, 180),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Interview and Test",
            description:
              "Prepare for and attend citizenship interview and test.",
            milestoneTypes: [
              "interview_preparation",
              "interview",
              "civics_test",
            ],
            startDate: this.addDays(today, 181),
            endDate: this.addDays(today, 270),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Oath Ceremony and Certificate",
            description:
              "Attend oath ceremony and receive certificate of naturalization.",
            milestoneTypes: [
              "ceremony_scheduling",
              "oath_ceremony",
              "certificate_issuance",
            ],
            startDate: this.addDays(today, 271),
            endDate: this.addDays(today, 300),
            metadata: { importance: "critical" },
          },
        );
        break;

      // Add more case types with their specific phases...

      default:
        // Default generic phases for any other case type
        phases.push(
          {
            id: crypto.randomUUID(),
            title: "Preparation",
            description: "Gather all necessary documents for your application.",
            milestoneTypes: [
              "document_collection",
              "document_verification",
              "form_preparation",
            ],
            startDate: today,
            endDate: this.addDays(today, 30),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Application Filing",
            description: "Complete and submit your application.",
            milestoneTypes: [
              "application_review",
              "fee_payment",
              "application_submission",
            ],
            startDate: this.addDays(today, 31),
            endDate: this.addDays(today, 60),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Processing and Review",
            description: "Application processing and review by authorities.",
            milestoneTypes: [
              "processing_updates",
              "additional_documents",
              "status_checks",
            ],
            startDate: this.addDays(today, 61),
            endDate: this.addDays(today, 150),
            metadata: { importance: "critical" },
          },
          {
            id: crypto.randomUUID(),
            title: "Decision and Next Steps",
            description: "Receive decision and take appropriate next steps.",
            milestoneTypes: [
              "decision_waiting",
              "decision_response",
              "post_decision_steps",
            ],
            startDate: this.addDays(today, 151),
            endDate: this.addDays(today, 180),
            metadata: { importance: "critical" },
          },
        );
        break;
    }

    return phases;
  }

  /**
   * Adjust phase timings based on urgency and complexity
   */
  private adjustPhaseTimings(
    phases: Array<{
      id: string;
      title: string;
      description: string;
      milestoneTypes: string[];
      startDate: Date;
      endDate: Date;
      metadata?: Record<string, any>;
    }>,
    params: {
      urgency: "normal" | "expedited";
      complexity: "simple" | "standard" | "complex";
    },
  ): Array<{
    id: string;
    title: string;
    description: string;
    milestoneTypes: string[];
    startDate: Date;
    endDate: Date;
    metadata?: Record<string, any>;
  }> {
    // Apply timing adjustments based on urgency
    const urgencyMultiplier = params.urgency === "expedited" ? 0.7 : 1.0;

    // Apply timing adjustments based on complexity
    const complexityMultiplier =
      params.complexity === "simple"
        ? 0.8
        : params.complexity === "complex"
          ? 1.3
          : 1.0;

    // Combined multiplier
    const timeMultiplier = urgencyMultiplier * complexityMultiplier;

    // Adjust each phase's timing
    let currentStartDate = new Date();
    return phases.map((phase, index) => {
      // Calculate the original duration in days
      const originalDuration = this.daysBetween(phase.startDate, phase.endDate);

      // Apply the multiplier to get the adjusted duration
      const adjustedDuration = Math.round(originalDuration * timeMultiplier);

      // For the first phase, start date is today
      const startDate = index === 0 ? currentStartDate : currentStartDate;

      // Calculate the end date based on adjusted duration
      const endDate = this.addDays(startDate, adjustedDuration);

      // Update the current start date for the next phase
      currentStartDate = this.addDays(endDate, 1);

      // Return the phase with adjusted dates
      return {
        ...phase,
        startDate,
        endDate,
      };
    });
  }

  /**
   * Generate milestones for a phase
   */
  private generateMilestones(
    phaseId: string,
    milestoneTypes: string[],
    phaseStartDate: Date,
    phaseEndDate: Date,
    caseType: CaseType,
    params: {
      priorityDocuments: string[];
    },
  ): RoadmapMilestone[] {
    // Get required documents for the case type
    const requiredDocuments = this.caseService.getRequiredDocuments(caseType);

    // Calculate even distribution of milestone dates within the phase
    const phaseDuration = this.daysBetween(phaseStartDate, phaseEndDate);
    const milestoneCount = milestoneTypes.length;
    const daysPerMilestone = Math.floor(phaseDuration / milestoneCount);

    return milestoneTypes.map((type, index) => {
      // Calculate milestone start and end dates
      const startDate = this.addDays(phaseStartDate, index * daysPerMilestone);
      const endDate =
        index === milestoneCount - 1
          ? phaseEndDate
          : this.addDays(phaseStartDate, (index + 1) * daysPerMilestone - 1);

      // Get milestone details based on type
      const { title, description, isCritical } = this.getMilestoneDetails(
        type,
        caseType,
      );

      // Determine which documents are required for this milestone
      const milestoneDocuments = this.getDocumentsForMilestone(
        type,
        requiredDocuments,
        params.priorityDocuments,
      );

      // Determine dependencies
      const dependsOn = index > 0 ? [crypto.randomUUID()] : []; // Placeholder for actual dependencies

      return {
        id: crypto.randomUUID(),
        title,
        description,
        startDate,
        endDate,
        status: "not_started",
        completionPercentage: 0,
        requiredDocuments: milestoneDocuments,
        dependsOn,
        isCritical,
        metadata: {
          type,
          phaseId,
        },
      };
    });
  }

  /**
   * Get milestone details based on milestone type
   */
  private getMilestoneDetails(
    milestoneType: string,
    caseType: CaseType,
  ): {
    title: string;
    description: string;
    isCritical: boolean;
  } {
    // Define milestone details based on type and case type
    const milestoneDetails: Record<
      string,
      {
        title: string;
        description: string;
        isCritical: boolean;
      }
    > = {
      // Document collection milestones
      document_collection: {
        title: "Gather Required Documents",
        description: "Collect all required documents for your application.",
        isCritical: true,
      },
      document_translation: {
        title: "Translate Documents",
        description:
          "Translate any non-English documents with certified translations.",
        isCritical: true,
      },
      document_verification: {
        title: "Verify Document Authenticity",
        description:
          "Ensure all documents are authentic and properly certified.",
        isCritical: true,
      },

      // Form preparation milestones
      form_preparation: {
        title: "Complete Application Forms",
        description: "Fill out all required application forms accurately.",
        isCritical: true,
      },
      application_review: {
        title: "Review Application Package",
        description:
          "Review your complete application package before submission.",
        isCritical: true,
      },
      fee_payment: {
        title: "Pay Application Fees",
        description: "Pay all required application and processing fees.",
        isCritical: true,
      },

      // Submission milestones
      application_submission: {
        title: "Submit Application",
        description:
          "Submit your complete application package to the appropriate authority.",
        isCritical: true,
      },
      receipt_notice: {
        title: "Receive Receipt Notice",
        description:
          "Receive confirmation that your application has been received.",
        isCritical: false,
      },

      // Biometrics and background check milestones
      biometrics_appointment: {
        title: "Attend Biometrics Appointment",
        description: "Attend appointment for fingerprinting and photos.",
        isCritical: true,
      },
      background_check: {
        title: "Background Check Processing",
        description: "Your background check is being processed.",
        isCritical: false,
      },

      // Interview milestones
      interview_preparation: {
        title: "Prepare for Interview",
        description:
          "Prepare documents and practice for your upcoming interview.",
        isCritical: true,
      },
      interview: {
        title: "Attend Interview",
        description:
          "Attend your scheduled interview with all required documents.",
        isCritical: true,
      },
      civics_test: {
        title: "Complete Civics Test",
        description: "Complete the U.S. civics and English language tests.",
        isCritical: true,
      },

      // Processing milestones
      processing_updates: {
        title: "Check Application Status",
        description: "Regularly check for updates on your application status.",
        isCritical: false,
      },
      additional_documents: {
        title: "Submit Additional Documents",
        description:
          "Respond to any requests for additional evidence or documentation.",
        isCritical: true,
      },
      status_checks: {
        title: "Regular Status Checks",
        description: "Perform regular checks on your application status.",
        isCritical: false,
      },

      // Decision milestones
      decision_waiting: {
        title: "Wait for Decision",
        description: "Your application is under review for a final decision.",
        isCritical: false,
      },
      decision_response: {
        title: "Receive Decision",
        description: "Receive the decision on your application.",
        isCritical: true,
      },
      post_decision_steps: {
        title: "Complete Post-Decision Steps",
        description:
          "Complete any required steps after receiving your decision.",
        isCritical: true,
      },

      // Oath and certificate milestones (for citizenship)
      ceremony_scheduling: {
        title: "Oath Ceremony Scheduling",
        description: "Receive your oath ceremony scheduling notice.",
        isCritical: false,
      },
      oath_ceremony: {
        title: "Attend Oath Ceremony",
        description:
          "Attend your oath ceremony to complete the naturalization process.",
        isCritical: true,
      },
      certificate_issuance: {
        title: "Receive Certificate",
        description: "Receive your official certificate.",
        isCritical: true,
      },

      // Travel milestones (for visa)
      visa_issuance: {
        title: "Receive Visa",
        description: "Receive your approved visa in your passport.",
        isCritical: true,
      },
      travel_preparation: {
        title: "Prepare for Travel",
        description: "Make necessary travel arrangements and preparations.",
        isCritical: true,
      },
    };

    // Return the milestone details or a generic placeholder if not found
    return (
      milestoneDetails[milestoneType] || {
        title: this.toTitleCase(milestoneType.replace(/_/g, " ")),
        description: `Complete the ${milestoneType.replace(/_/g, " ")} step in your application process.`,
        isCritical: false,
      }
    );
  }

  /**
   * Determine which documents are required for a specific milestone
   */
  private getDocumentsForMilestone(
    milestoneType: string,
    allRequiredDocuments: string[],
    priorityDocuments: string[],
  ): string[] {
    // Define which document types are associated with which milestone types
    const milestoneDocumentMap: Record<string, string[]> = {
      document_collection: allRequiredDocuments,
      document_translation: allRequiredDocuments.filter(
        (doc) =>
          doc.includes("Birth") ||
          doc.includes("Marriage") ||
          doc.includes("Certificate") ||
          doc.includes("Court") ||
          doc.includes("Foreign"),
      ),
      document_verification: allRequiredDocuments.filter(
        (doc) =>
          doc.includes("Identity") ||
          doc.includes("Passport") ||
          doc.includes("Certificate"),
      ),
      form_preparation: [],
      application_review: allRequiredDocuments,
      application_submission: allRequiredDocuments,
      interview: allRequiredDocuments,
      additional_documents: priorityDocuments,
    };

    // Return the associated documents or empty array if none defined
    return milestoneDocumentMap[milestoneType] || [];
  }

  /**
   * Calculate timeline dates based on case type, phases, and parameters
   */
  private calculateTimeline(
    caseType: CaseType,
    phases: RoadmapPhase[],
    params: {
      urgency: "normal" | "expedited";
      complexity: "simple" | "standard" | "complex";
    },
  ): {
    startDate: Date;
    targetEndDate: Date;
    estimatedEndDate: Date;
  } {
    // Start date is today
    const startDate = new Date();

    // Target end date is the end date of the last phase
    const lastPhase = phases[phases.length - 1];
    const targetEndDate = lastPhase.endDate;

    // Estimated end date might differ from target based on processing times
    const processingTimeEstimate =
      this.caseService.estimateProcessingTime(caseType);

    // Apply urgency and complexity factors to the estimated processing time
    const urgencyFactor = params.urgency === "expedited" ? 0.8 : 1.0;
    const complexityFactor =
      params.complexity === "simple"
        ? 0.9
        : params.complexity === "complex"
          ? 1.2
          : 1.0;

    // Calculate estimated processing time with factors applied
    const adjustedProcessingDays = Math.round(
      processingTimeEstimate.averageDays * urgencyFactor * complexityFactor,
    );

    // Calculate estimated end date
    const estimatedEndDate = this.addDays(startDate, adjustedProcessingDays);

    return {
      startDate,
      targetEndDate,
      estimatedEndDate,
    };
  }

  /**
   * Add days to a date
   */
  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Calculate days between two dates
   */
  private daysBetween(startDate: Date, endDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    return Math.round((endDate.getTime() - startDate.getTime()) / oneDay);
  }

  /**
   * Convert a string to title case
   */
  private toTitleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
    );
  }
}
