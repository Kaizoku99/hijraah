import { nanoid } from "nanoid";

import { getSupabaseClient } from "@/lib/supabase/client";
import { ChatMessage } from "@/types/chat";

import {
  Agent,
  AgentState,
  AgentType,
  createAgentForUser,
  loadAgent,
  listAgentsForUser,
} from "./agent-framework";
import { DocumentPreparerAgent } from "./document-preparer";
import { EligibilityCheckerAgent } from "./eligibility-checker";
import { ImmigrationAdvisorAgent } from "./immigration-advisor";
import { VisaAssistantAgent } from "./visa-assistant";

/**
 * AgentManager coordinates autonomous agents for the immigration platform,
 * handling creation, routing, and management of agent interactions.
 */
export class AgentManager {
  private userId?: string;

  constructor(userId?: string) {
    this.userId = userId;
  }

  /**
   * Create a new agent of the specified type
   */
  async createAgent(agentType: AgentType): Promise<Agent> {
    if (!this.userId) {
      throw new Error("User ID is required to create an agent");
    }

    return createAgentForUser(this.userId, agentType);
  }

  /**
   * Load an existing agent by ID
   */
  async getAgent(agentId: string): Promise<Agent | null> {
    return loadAgent(agentId);
  }

  /**
   * List all agents for the current user
   */
  async listAgents(): Promise<Agent[]> {
    if (!this.userId) {
      return [];
    }

    return listAgentsForUser(this.userId);
  }

  /**
   * Send a message to an agent and get a response
   */
  async sendMessage(
    agentId: string,
    message: string
  ): Promise<string | ReadableStream> {
    const agent = await this.getAgent(agentId);

    if (!agent) {
      throw new Error(`Agent with ID ${agentId} not found`);
    }

    return agent.processMessage(message);
  }

  /**
   * Route a message to the most appropriate agent based on content
   */
  async routeMessage(message: string): Promise<{
    agentId: string;
    response: string | ReadableStream;
    isNewAgent: boolean;
  }> {
    if (!this.userId) {
      throw new Error("User ID is required to route messages");
    }

    // Get existing agents for the user
    const existingAgents = await this.listAgents();

    // Simple intent classifier to determine the appropriate agent type
    const agentType = this.classifyMessageIntent(message);

    // Try to find an existing agent of the appropriate type
    const matchingAgent = existingAgents.find(
      (agent) => agent.type === agentType
    );

    if (matchingAgent) {
      // Use the existing agent
      const response = await matchingAgent.processMessage(message);
      return {
        agentId: matchingAgent.id,
        response,
        isNewAgent: false,
      };
    } else {
      // Create a new agent of the appropriate type
      const newAgent = await this.createAgent(agentType);
      const response = await newAgent.processMessage(message);
      return {
        agentId: newAgent.id,
        response,
        isNewAgent: true,
      };
    }
  }

  /**
   * Archive an agent by ID
   */
  async archiveAgent(agentId: string): Promise<boolean> {
    const agent = await this.getAgent(agentId);

    if (!agent) {
      return false;
    }

    await agent.archive();
    return true;
  }

  /**
   * Execute a step in an agent's workflow
   */
  async executeAgentStep(agentId: string): Promise<any> {
    const agent = await this.getAgent(agentId);

    if (!agent) {
      throw new Error(`Agent with ID ${agentId} not found`);
    }

    return agent.executeStep();
  }

  /**
   * Save agent feedback for improvement
   */
  async saveAgentFeedback(
    agentId: string,
    feedback: {
      rating: number;
      comments?: string;
      wasHelpful: boolean;
    }
  ): Promise<void> {
    if (!this.userId) {
      throw new Error("User ID is required to save feedback");
    }

    const supabase = getSupabaseClient();

    await supabase.from("agent_feedback").insert({
      agent_id: agentId,
      user_id: this.userId,
      rating: feedback.rating,
      comments: feedback.comments,
      was_helpful: feedback.wasHelpful,
      created_at: new Date().toISOString(),
    });
  }

  /**
   * Classify the intent of a message to determine the appropriate agent type
   */
  private classifyMessageIntent(message: string): AgentType {
    // Simple rule-based classification
    // In a real system, this could use a trained ML model

    const lowerMessage = message.toLowerCase();

    // Check for visa-related content
    if (
      lowerMessage.includes("visa") ||
      lowerMessage.includes("permit") ||
      lowerMessage.includes("application status")
    ) {
      return AgentType.VISA_ASSISTANT;
    }

    // Check for document-related content
    if (
      lowerMessage.includes("document") ||
      lowerMessage.includes("form") ||
      lowerMessage.includes("paperwork") ||
      lowerMessage.includes("certificate")
    ) {
      return AgentType.DOCUMENT_PREPARER;
    }

    // Check for eligibility-related content
    if (
      lowerMessage.includes("eligible") ||
      lowerMessage.includes("qualify") ||
      lowerMessage.includes("requirements") ||
      lowerMessage.includes("criteria")
    ) {
      return AgentType.ELIGIBILITY_CHECKER;
    }

    // Default to general immigration advisor
    return AgentType.IMMIGRATION_ADVISOR;
  }
}

// Create a helper function to get an agent manager for a user
export function getAgentManager(userId?: string): AgentManager {
  return new AgentManager(userId);
}
