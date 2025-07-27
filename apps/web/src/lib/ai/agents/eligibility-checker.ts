import { streamText } from "ai";

import { customModel } from "@/lib/ai/models";
import { generatePersonalizationContext } from "@/lib/ai/personalization/user-history";
import { getSupabaseClient } from "@/lib/supabase/client";
import { ChatMessage } from "@/types/chat";

import { Agent, AgentState, AgentType, StepResult } from "./agent-framework";

interface EligibilityCriteria {
  id: string;
  name: string;
  description: string;
  status: "met" | "not_met" | "unknown";
  details?: string;
}

interface EligibilityResult {
  programId: string;
  programName: string;
  eligible: boolean;
  confidence: number; // 0-100
  criteria: EligibilityCriteria[];
  explanation: string;
  nextSteps?: string[];
}

/**
 * EligibilityCheckerAgent helps users determine if they meet the eligibility
 * requirements for various immigration programs.
 */
export class EligibilityCheckerAgent extends Agent {
  constructor(initialState?: Partial<AgentState>) {
    super(initialState);
    this.type = AgentType.ELIGIBILITY_CHECKER;

    // Initialize eligibility-specific metadata if not present
    if (!this.metadata.eligibilityResults) {
      this.metadata.eligibilityResults = [];
    }

    if (!this.metadata.userProfile) {
      this.metadata.userProfile = {};
    }
  }

  /**
   * Process an incoming message and generate a response
   */
  async processMessage(message: string): Promise<string | ReadableStream> {
    // Update agent status
    await this.setStatus("thinking");

    // Create a message object and add it to the agent's history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      sessionId: this.id,
      createdAt: new Date().toISOString(),
    };
    await this.addMessage(userMessage);

    try {
      // If personalization is enabled and we have a user ID
      let personalizationContext = "";
      if (this.userId) {
        personalizationContext = await generatePersonalizationContext(
          this.userId,
        );
      }

      // Check if the message contains information about the user's profile
      await this.extractUserProfileInfo(message);

      // Prepare the context for the model
      const context = await this.getContext();

      // Get the AI model
      const model = customModel("immigration-fine-tuned");

      // Generate a streaming response using the AI model
      await this.setStatus("executing");

      const systemMessage = `You are an eligibility checker assistant for the Hijraah immigration platform. Your goal is to help users determine if they meet the requirements for various immigration programs.
${personalizationContext}
${context}

Guidelines:
1. Ask clarifying questions to gather necessary information
2. Be specific about eligibility criteria for each program
3. Provide clear yes/no answers about eligibility when possible
4. Explain why users meet or don't meet specific criteria
5. Suggest alternative programs if a user isn't eligible for their desired program
6. Use the [PROGRAM:...] and [CRITERIA:...] markers to help the system track your analysis

Current user profile information:
${JSON.stringify(this.metadata.userProfile, null, 2)}`;

      // Create system message for the conversation
      const chatMessages: ChatMessage[] = [
        {
          id: "system",
          role: "system",
          content: systemMessage,
          sessionId: this.id,
          createdAt: this.createdAt,
        },
        ...this.messages,
      ];

      // Process the message to check for eligibility if we have enough information
      if (this.hasEnoughInformation()) {
        await this.checkEligibility();
      }

      // Use OpenAI to generate a response
      const modelResponse = await model.invoke({
        messages: chatMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: 0.7,
      });

      // Get the response content
      const responseContent =
        typeof modelResponse === "string"
          ? modelResponse
          : modelResponse.content;

      // Create a stream from the response
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(responseContent);
          controller.close();
        },
      });

      // Save the assistant's response
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
        sessionId: this.id,
        createdAt: new Date().toISOString(),
      };

      await this.addMessage(assistantMessage);

      // Extract program and criteria mentions
      await this.extractProgramAndCriteriaMentions(responseContent);

      // Update status to complete
      await this.setStatus("complete");

      return stream;
    } catch (error) {
      console.error("Error in EligibilityCheckerAgent:", error);

      // Update status to error
      await this.setStatus("error");

      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "I encountered an error while processing your request. Please try again.",
        sessionId: this.id,
        createdAt: new Date().toISOString(),
      };
      await this.addMessage(errorMessage);

      return "I encountered an error while processing your request. Please try again.";
    }
  }

  /**
   * Execute a step in the agent's workflow
   */
  async executeStep(): Promise<StepResult> {
    // Get the current step from metadata
    const currentStep = this.metadata.currentStep || "gather_information";

    try {
      switch (currentStep) {
        case "gather_information":
          // Determine what information we still need
          const missingInfo = this.identifyMissingInformation();

          if (missingInfo.length === 0) {
            this.metadata.currentStep = "check_eligibility";
            return {
              output: "All required information collected",
              nextAction: "check_eligibility",
            };
          }

          return {
            output: missingInfo,
            nextAction: "ask_user",
          };

        case "check_eligibility":
          // Check eligibility for programs
          const eligibilityResults = await this.checkEligibility();
          this.metadata.eligibilityResults = eligibilityResults;
          this.metadata.currentStep = "present_results";
          return {
            output: eligibilityResults,
            nextAction: "present_results",
          };

        case "present_results":
          // Present eligibility results to the user
          const resultsMessage = this.formatEligibilityResults();
          this.metadata.currentStep = "recommend_next_steps";
          return {
            output: resultsMessage,
            nextAction: "recommend_next_steps",
          };

        case "recommend_next_steps":
          // Recommend next steps based on eligibility
          const recommendations = this.generateRecommendations();
          this.metadata.currentStep = "wait_for_user";
          return {
            output: recommendations,
            nextAction: "wait_for_user",
          };

        default:
          return {
            output: "No action needed at this time.",
            nextAction: "wait_for_user",
          };
      }
    } catch (error) {
      console.error("Error executing step:", error);
      return {
        output: null,
        error: "Failed to execute step: " + (error as Error).message,
        nextAction: "wait_for_user",
      };
    }
  }

  /**
   * Extract user profile information from a message
   */
  private async extractUserProfileInfo(message: string): Promise<void> {
    // Extract age
    const ageMatch = message.match(/(\b[Ii]\s*am|\b[Mm]y\s*age\s*is)\s*(\d+)/);
    if (ageMatch && ageMatch[2]) {
      this.metadata.userProfile.age = parseInt(ageMatch[2]);
    }

    // Extract country of origin
    const originMatch = message.match(
      /(\b[Ii]\s*am\s*from|\b[Mm]y\s*country\s*is)\s*([A-Za-z\s]+)/,
    );
    if (originMatch && originMatch[2]) {
      this.metadata.userProfile.countryOfOrigin = originMatch[2].trim();
    }

    // Extract education level
    const educationMatch = message.match(
      /(\beducation|\bdegree|\bqualification).*?([A-Za-z\s']+)/i,
    );
    if (educationMatch && educationMatch[2]) {
      this.metadata.userProfile.educationLevel = educationMatch[2].trim();
    }

    // Extract work experience
    const experienceMatch = message.match(
      /(\bexperience|\bworked).*?(\d+)\s*(years|year)/i,
    );
    if (experienceMatch && experienceMatch[2]) {
      this.metadata.userProfile.workExperience = parseInt(experienceMatch[2]);
    }

    // Save the updated profile
    await this.save();
  }

  /**
   * Check if we have enough information to determine eligibility
   */
  private hasEnoughInformation(): boolean {
    // Basic check for minimum required information
    const profile = this.metadata.userProfile;
    return !!(profile.age && profile.countryOfOrigin);
  }

  /**
   * Identify what information is still missing
   */
  private identifyMissingInformation(): string[] {
    const missingInfo = [];
    const profile = this.metadata.userProfile;

    if (!profile.age) missingInfo.push("age");
    if (!profile.countryOfOrigin) missingInfo.push("country of origin");
    if (!profile.educationLevel) missingInfo.push("education level");
    if (!profile.workExperience) missingInfo.push("work experience");

    return missingInfo;
  }

  /**
   * Check eligibility for immigration programs
   */
  private async checkEligibility(): Promise<EligibilityResult[]> {
    const profile = this.metadata.userProfile;
    const results: EligibilityResult[] = [];

    // For demo purposes, we'll check eligibility for a couple of programs
    // In a real system, this would query a database of program requirements

    // Skilled Worker Program
    if (profile.age && profile.workExperience) {
      const skilledWorkerResult: EligibilityResult = {
        programId: "skilled-worker",
        programName: "Skilled Worker Program",
        eligible:
          profile.age >= 21 && profile.age <= 45 && profile.workExperience >= 2,
        confidence: 80,
        criteria: [
          {
            id: "age",
            name: "Age",
            description: "Must be between 21 and 45 years old",
            status: profile.age >= 21 && profile.age <= 45 ? "met" : "not_met",
            details: `Age: ${profile.age}`,
          },
          {
            id: "work-experience",
            name: "Work Experience",
            description: "Minimum 2 years of skilled work experience",
            status: profile.workExperience >= 2 ? "met" : "not_met",
            details: `Work experience: ${profile.workExperience || 0} years`,
          },
        ],
        explanation: `Based on your profile, you ${
          profile.age >= 21 && profile.age <= 45 && profile.workExperience >= 2
            ? "are"
            : "are not"
        } eligible for the Skilled Worker Program.`,
      };

      results.push(skilledWorkerResult);
    }

    // Student Visa Program
    if (profile.age) {
      const studentVisaResult: EligibilityResult = {
        programId: "student-visa",
        programName: "Student Visa Program",
        eligible: profile.age >= 18,
        confidence: 70,
        criteria: [
          {
            id: "age",
            name: "Age",
            description: "Must be at least 18 years old",
            status: profile.age >= 18 ? "met" : "not_met",
            details: `Age: ${profile.age}`,
          },
        ],
        explanation: `Based on your profile, you ${
          profile.age >= 18 ? "are" : "are not"
        } eligible for the Student Visa Program.`,
      };

      results.push(studentVisaResult);
    }

    // Save results to metadata
    this.metadata.eligibilityResults = results;
    await this.save();

    return results;
  }

  /**
   * Format eligibility results as a user-friendly message
   */
  private formatEligibilityResults(): string {
    const results = this.metadata.eligibilityResults || [];

    if (results.length === 0) {
      return "I don't have enough information to determine your eligibility yet.";
    }

    const eligiblePrograms = results.filter((r) => r.eligible);
    const ineligiblePrograms = results.filter((r) => !r.eligible);

    let message =
      "Based on the information you've provided, here are your eligibility results:\n\n";

    if (eligiblePrograms.length > 0) {
      message += "**Programs you may be eligible for:**\n";
      eligiblePrograms.forEach((program) => {
        message += `- ${program.programName} (${program.confidence}% confidence)\n`;
      });
      message += "\n";
    }

    if (ineligiblePrograms.length > 0) {
      message += "**Programs you may not be eligible for:**\n";
      ineligiblePrograms.forEach((program) => {
        message += `- ${program.programName}\n`;
      });
      message += "\n";
    }

    // Include detailed breakdown of the first eligible program
    if (eligiblePrograms.length > 0) {
      const program = eligiblePrograms[0];
      message += `**${program.programName} details:**\n`;
      program.criteria.forEach((criterion) => {
        message += `- ${criterion.name}: ${
          criterion.status === "met" ? "✓" : "✗"
        } ${criterion.description} (${criterion.details})\n`;
      });
      message += "\n";
      message += program.explanation;
    }

    return message;
  }

  /**
   * Generate recommendations based on eligibility results
   */
  private generateRecommendations(): string {
    const results = this.metadata.eligibilityResults || [];

    if (results.length === 0) {
      return "I need more information to provide recommendations.";
    }

    const eligiblePrograms = results.filter((r) => r.eligible);
    const ineligiblePrograms = results.filter((r) => !r.eligible);

    let recommendations = "**Next Steps:**\n\n";

    if (eligiblePrograms.length > 0) {
      recommendations += "For programs you're eligible for:\n";
      recommendations += "1. Gather required documentation\n";
      recommendations += "2. Submit formal application\n";
      recommendations += "3. Prepare for potential interviews\n";
      recommendations +=
        "4. Plan for medical examinations and background checks\n\n";
    }

    if (ineligiblePrograms.length > 0) {
      recommendations += "To improve eligibility for other programs:\n";

      // Add specific recommendations based on criteria not met
      const unmetCriteria = new Set<string>();
      ineligiblePrograms.forEach((program) => {
        program.criteria
          .filter((c) => c.status === "not_met")
          .forEach((c) => unmetCriteria.add(c.id));
      });

      if (unmetCriteria.has("age")) {
        recommendations +=
          "- Consider programs without strict age requirements\n";
      }

      if (unmetCriteria.has("work-experience")) {
        recommendations += "- Gain additional work experience in your field\n";
      }

      if (unmetCriteria.has("education")) {
        recommendations += "- Pursue further education or credentials\n";
      }

      if (unmetCriteria.has("language")) {
        recommendations +=
          "- Improve language proficiency and take official tests\n";
      }
    }

    return recommendations;
  }

  /**
   * Extract program and criteria mentions from assistant messages
   */
  private async extractProgramAndCriteriaMentions(
    content: string,
  ): Promise<void> {
    // Pattern to detect program mentions
    const programPattern = /\[PROGRAM:(.*?)\]/gi;
    const programMatches = content.matchAll(programPattern);

    // Extract program names
    const programSet = new Set<string>();
    for (const match of programMatches) {
      if (match[1]) {
        programSet.add(match[1].trim());
      }
    }

    // Pattern to detect criteria mentions
    const criteriaPattern = /\[CRITERIA:(.*?)\]/gi;
    const criteriaMatches = content.matchAll(criteriaPattern);

    // Extract criteria
    const criteriaSet = new Set<string>();
    for (const match of criteriaMatches) {
      if (match[1]) {
        criteriaSet.add(match[1].trim());
      }
    }

    // Save extracted information to metadata
    this.metadata.mentionedPrograms = [...programSet];
    this.metadata.mentionedCriteria = [...criteriaSet];
    await this.save();
  }

  /**
   * Get context for this agent type
   */
  async getContext(): Promise<string> {
    return `
As an eligibility checker, you should determine if users meet the requirements for various immigration programs.

Common Immigration Programs:
- Skilled Worker Program
- Student Visas
- Family Sponsorship
- Business/Investment Programs
- Refugee/Asylum Programs

Key Eligibility Criteria:
- Age
- Education
- Work experience
- Language proficiency
- Financial requirements
- Family connections
- Criminal/medical history

When discussing programs, use the format [PROGRAM:Name of Program] to help the system track your recommendations.
When discussing specific criteria, use the format [CRITERIA:Name of Criteria] to help track requirements.

Your goal is to help users understand which programs they're eligible for and which ones they're not.
For programs they're not eligible for, explain why and suggest ways they might become eligible.
    `;
  }
}
