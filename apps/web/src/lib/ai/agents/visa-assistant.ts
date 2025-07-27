import { streamText } from 'ai';

import { customModel } from '@/lib/ai/models';
import { generatePersonalizationContext } from '@/lib/ai/personalization/user-history';
import { ChatMessage } from '@/types/chat';

import { Agent, AgentState, AgentType, StepResult } from './agent-framework';

/**
 * VisaAssistantAgent specializes in helping users navigate visa application processes,
 * providing guidance on requirements, timelines, and best practices.
 */
export class VisaAssistantAgent extends Agent {
  constructor(initialState?: Partial<AgentState>) {
    super(initialState);
    this.type = AgentType.VISA_ASSISTANT;
  }

  /**
   * Process an incoming message and generate a response
   */
  async processMessage(message: string): Promise<string | ReadableStream> {
    // Update agent status
    await this.setStatus('thinking');

    // Create a message object and add it to the agent's history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
    };
    await this.addMessage(userMessage);

    try {
      // If personalization is enabled and we have a user ID
      let personalizationContext = '';
      if (this.userId) {
        personalizationContext = await generatePersonalizationContext(this.userId);
      }

      // Prepare the context for the model
      const context = await this.getContext();
      
      // Get the AI model
      const model = customModel('immigration-fine-tuned');
      
      // Generate a streaming response using the AI model
      await this.setStatus('executing');
      
      const systemMessage = `You are an expert visa assistant AI for the Hijraah immigration platform. Your goal is to help users navigate visa application processes for different countries.
${personalizationContext}
${context}

Guidelines:
1. Always provide accurate information about visa requirements
2. If you're unsure, acknowledge your limitations and suggest consulting official sources
3. Be specific about documentation required for visa applications
4. Consider the user's personal circumstances in your responses
5. Provide step-by-step guidance when explaining processes`;

      // Create system message for the conversation
      const chatMessages: ChatMessage[] = [
        { id: 'system', role: 'system', content: systemMessage },
        ...this.messages,
      ];
      
      // Stream the response
      const stream = await model.chat({
        messages: chatMessages,
        temperature: 0.7,
      });
      
      // Save the assistant's message once streaming is complete
      streamText(stream, async (chunk) => {
        if (chunk === 'DONE') {
          const assistantMessageContent = this.metadata.currentResponse || '';
          const assistantMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: assistantMessageContent,
          };
          
          // Clear the current response from metadata
          this.metadata.currentResponse = '';
          
          // Add the message to history
          await this.addMessage(assistantMessage);
          
          // Update status to complete
          await this.setStatus('complete');
        } else {
          // Append the chunk to the current response
          this.metadata.currentResponse = (this.metadata.currentResponse || '') + chunk;
        }
      });
      
      return stream;
    } catch (error) {
      console.error('Error in VisaAssistantAgent:', error);
      
      // Update status to error
      await this.setStatus('error');
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again.',
      };
      await this.addMessage(errorMessage);
      
      return 'I encountered an error while processing your request. Please try again.';
    }
  }

  /**
   * Execute a step in the agent's workflow
   */
  async executeStep(): Promise<StepResult> {
    // No complex workflow for this agent yet
    // In the future, this could handle multi-step visa application guidance
    return {
      output: 'Step completed successfully',
      nextAction: 'wait_for_user',
    };
  }

  /**
   * Get context for this agent type
   */
  async getContext(): Promise<string> {
    // The visa assistant needs knowledge of visa requirements for different countries
    return `
As a visa assistant, you have access to information about various visa types:
- Tourist/Visitor visas
- Work visas
- Student visas
- Family reunification visas
- Business visas
- Transit visas
- Diplomatic visas

For each visa application, you should help users understand:
1. Required documentation
2. Application timelines and processes
3. Common reasons for rejection
4. Tips for a successful application
5. Interview preparation if applicable
6. Post-approval steps

Your responses should be tailored to the specific needs of the user and the country they are applying to.
    `;
  }
} 