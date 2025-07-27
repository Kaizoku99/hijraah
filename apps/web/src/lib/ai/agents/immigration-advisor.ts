import { streamText } from "ai";

import { customModel } from "@/lib/ai/models";
import { generatePersonalizationContext } from "@/lib/ai/personalization/user-history";
import { getSupabaseClient } from "@/lib/supabase/client";
import { ChatMessage } from "@/types/chat";

import { Agent, AgentState, AgentType, StepResult } from "./agent-framework";

/**
 * ImmigrationAdvisorAgent is the top-level agent that can coordinate between
 * specialized agents and provide general immigration advice.
 */
export class ImmigrationAdvisorAgent extends Agent {
  constructor(initialState?: Partial<AgentState>) {
    super(initialState);
    this.type = AgentType.IMMIGRATION_ADVISOR;

    // Initialize advisor-specific metadata
    if (!this.metadata.subagents) {
      this.metadata.subagents = {};
    }

    if (!this.metadata.topics) {
      this.metadata.topics = [];
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
          this.userId
        );
      }

      // Check if we should delegate to a specialized agent
      const delegationResult = await this.shouldDelegateToSpecialist(message);

      if (delegationResult.shouldDelegate) {
        // Record the delegation in metadata
        this.metadata.lastDelegation = {
          agentType: delegationResult.agentType,
          timestamp: new Date().toISOString(),
          query: message,
        };

        // Add a note that we're delegating
        const delegationMessage: ChatMessage = {
          id: Date.now().toString(),
          role: "assistant",
          content: `I'm connecting you with our ${delegationResult.agentType.replace(
            "_",
            " "
          )} specialist who can better help with this specific question.`,
          sessionId: this.id,
          createdAt: new Date().toISOString(),
        };
        await this.addMessage(delegationMessage);

        // We would delegate to specialist agent here in a full implementation
        // For now, we'll just mark that we would delegate
        await this.setStatus("waiting");

        return delegationMessage.content;
      }

      // Prepare the context for the model
      const context = await this.getContext();

      // Get the AI model (prefer a fine-tuned model if available)
      const model = customModel("immigration-fine-tuned");

      // Generate a streaming response using the AI model
      await this.setStatus("executing");

      const systemMessage = `You are the main immigration advisor AI for the Hijraah immigration platform. Your goal is to provide general advice on immigration processes and coordinate more specialized services when needed.
${personalizationContext}
${context}

Guidelines:
1. Provide clear, accurate immigration information
2. Be aware of when a question requires specialized assistance
3. Explain complex immigration concepts in simple terms
4. Be sensitive to the user's personal circumstances
5. Follow up with relevant questions to better understand the user's needs
6. Use [TOPIC:xyz] tags to mark important immigration topics discussed`;

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

      // Process the response using the OpenAI API
      const completion = await model.chat({
        messages: chatMessages.map((msg) => ({
          role: msg.role as any,
          content: msg.content,
        })),
        temperature: 0.7,
        stream: true,
      });

      // Create a new stream and process the completion
      let completeResponse = "";
      const stream = new ReadableStream({
        async start(controller) {
          // Process the streamed response
          for await (const chunk of completion) {
            if (chunk.choices[0]?.delta?.content) {
              const content = chunk.choices[0].delta.content;
              completeResponse += content;
              controller.enqueue(content);
            }
          }

          controller.close();
        },
      });

      // When stream is complete, save the assistant's message
      setTimeout(async () => {
        // Only save if we have a response (avoid empty messages)
        if (completeResponse) {
          const assistantMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "assistant",
            content: completeResponse,
            sessionId: this.id,
            createdAt: new Date().toISOString(),
          };

          await this.addMessage(assistantMessage);

          // Extract topics from the response
          await this.extractTopics(completeResponse);

          // Update status to complete
          await this.setStatus("complete");
        }
      }, 100);

      return stream;
    } catch (error) {
      console.error("Error in ImmigrationAdvisorAgent:", error);

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
   * Determine if the query should be delegated to a specialist agent
   */
  private async shouldDelegateToSpecialist(message: string): Promise<{
    shouldDelegate: boolean;
    agentType?: AgentType;
    confidence?: number;
  }> {
    // Simple rule-based delegation logic
    // In a real system, this would be more sophisticated, possibly using a classifier model

    // Check for visa-related queries
    if (
      message.toLowerCase().includes("visa") ||
      message.toLowerCase().includes("permit") ||
      message.toLowerCase().includes("application status")
    ) {
      return {
        shouldDelegate: true,
        agentType: AgentType.VISA_ASSISTANT,
        confidence: 0.8,
      };
    }

    // Check for document-related queries
    if (
      message.toLowerCase().includes("document") ||
      message.toLowerCase().includes("form") ||
      message.toLowerCase().includes("paperwork") ||
      message.toLowerCase().includes("certificate")
    ) {
      return {
        shouldDelegate: true,
        agentType: AgentType.DOCUMENT_PREPARER,
        confidence: 0.7,
      };
    }

    // Check for eligibility-related queries
    if (
      message.toLowerCase().includes("eligible") ||
      message.toLowerCase().includes("qualify") ||
      message.toLowerCase().includes("requirements") ||
      message.toLowerCase().includes("criteria")
    ) {
      return {
        shouldDelegate: true,
        agentType: AgentType.ELIGIBILITY_CHECKER,
        confidence: 0.9,
      };
    }

    // Default: don't delegate
    return {
      shouldDelegate: false,
    };
  }

  /**
   * Extract topics from the assistant's message
   */
  private async extractTopics(content: string): Promise<void> {
    // Pattern to detect topic mentions
    const topicPattern = /\[TOPIC:(.*?)\]/gi;
    const topicMatches = content.matchAll(topicPattern);

    // Extract topics
    const topics = new Set<string>();
    for (const match of topicMatches) {
      if (match[1]) {
        topics.add(match[1].trim());
      }
    }

    // Add new topics to metadata
    for (const topic of topics) {
      if (!this.metadata.topics.includes(topic)) {
        this.metadata.topics.push(topic);
      }
    }

    // Save updated metadata
    await this.save();
  }

  /**
   * Execute a step in the agent's workflow
   */
  async executeStep(): Promise<StepResult> {
    // The immigration advisor doesn't have a specific workflow
    // It's primarily reactive to user messages
    return {
      output: "Ready to assist with immigration questions.",
      nextAction: "wait_for_user",
    };
  }

  /**
   * Get context for this agent type
   */
  async getContext(): Promise<string> {
    let userContext = "";

    // Get user's recent interactions from Supabase if we have a userId
    if (this.userId) {
      const supabase = getSupabaseClient();
      const { data } = await supabase
        .from("user_interactions")
        .select("*")
        .eq("user_id", this.userId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (data && data.length > 0) {
        userContext = `
Recent user activities:
${data
  .map(
    (interaction: any) =>
      `- ${interaction.interaction_type} (${interaction.category || "general"})`
  )
  .join("\n")}
        `;
      }
    }

    return `
As an immigration advisor, you provide general guidance on immigration processes and refer to specialists when needed.

Your knowledge areas include:
- Immigration system overviews for multiple countries
- General application processes and timelines
- Basic eligibility information
- Common immigration pathways
- Recent immigration policy changes
- Initial assessment of options

You should refer users to specialists for:
- Detailed visa application assistance → Visa Assistant
- Document preparation and organization → Document Preparer
- In-depth eligibility assessments → Eligibility Checker

${userContext}

Important: Use [TOPIC:xyz] tags to mark key immigration topics discussed (e.g., [TOPIC:US Family Immigration]).
    `;
  }
}
