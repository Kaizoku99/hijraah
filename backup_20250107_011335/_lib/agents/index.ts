import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';
import { logger } from '@/lib/logger';
import { getSession } from 'next-auth/react';

// Base agent class
abstract class ImmigrationAgent {
  protected model: OpenAI;
  protected chain!: LLMChain;

  constructor() {
    this.model = new OpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.7,
      maxTokens: 1000,
    });
  }

  abstract analyze(input: string): Promise<string>;
}

// Visa specialist agent
export class VisaSpecialistAgent extends ImmigrationAgent {
  constructor() {
    super();
    const template = `You are a visa specialist AI assistant. Analyze the following query and provide expert guidance on visa requirements and processes:

Query: {input}

Please provide detailed information about:
1. Visa eligibility requirements
2. Required documents
3. Application process
4. Processing times
5. Important considerations

Response:`;

    this.chain = new LLMChain({
      llm: this.model,
      prompt: new PromptTemplate({
        template,
        inputVariables: ['input'],
      }),
    });
  }

  async analyze(input: string): Promise<string> {
    try {
      const response = await this.chain.call({ input }) as { text: string };
      return response.text;
    } catch (error) {
      logger.error('Error in VisaSpecialistAgent:', error as Record<string, unknown>);
      throw error;
    }
  }
}

// Document expert agent
export class DocumentExpertAgent extends ImmigrationAgent {
  constructor() {
    super();
    const template = `You are a document expert AI assistant. Analyze the following query and provide guidance on document requirements and preparation:

Query: {input}

Please provide information about:
1. Required documents
2. Document specifications
3. Authentication requirements
4. Translation requirements
5. Common mistakes to avoid

Response:`;

    this.chain = new LLMChain({
      llm: this.model,
      prompt: new PromptTemplate({
        template,
        inputVariables: ['input'],
      }),
    });
  }

  async analyze(input: string): Promise<string> {
    try {
      const response = await this.chain.call({ input }) as { text: string };
      return response.text;
    } catch (error) {
      logger.error('Error in DocumentExpertAgent:', error as Record<string, unknown>);
      throw error;
    }
  }
}

// Timeline planning agent
export class TimelinePlanningAgent extends ImmigrationAgent {
  constructor() {
    super();
    const template = `You are a timeline planning AI assistant. Create a detailed immigration timeline based on the following information:

Information: {input}

Please provide:
1. Key milestones and deadlines
2. Estimated duration for each step
3. Dependencies between steps
4. Critical path activities
5. Recommended buffer times

Timeline:`;

    this.chain = new LLMChain({
      llm: this.model,
      prompt: new PromptTemplate({
        template,
        inputVariables: ['input'],
      }),
    });
  }

  async analyze(input: string): Promise<string> {
    try {
      const response = await this.chain.call({ input }) as { text: string };
      return response.text;
    } catch (error) {
      logger.error('Error in TimelinePlanningAgent:', error as Record<string, unknown>);
      throw error;
    }
  }
}

// Cost estimation agent
export class CostEstimationAgent extends ImmigrationAgent {
  constructor() {
    super();
    const template = `You are a cost estimation AI assistant. Analyze the following immigration scenario and provide detailed cost estimates:

Scenario: {input}

Please provide estimates for:
1. Application fees
2. Document preparation costs
3. Translation and authentication fees
4. Travel expenses
5. Settlement costs
6. Additional expenses to consider

Cost Breakdown:`;

    this.chain = new LLMChain({
      llm: this.model,
      prompt: new PromptTemplate({
        template,
        inputVariables: ['input'],
      }),
    });
  }

  async analyze(input: string): Promise<string> {
    try {
      const response = await this.chain.call({ input }) as { text: string };
      return response.text;
    } catch (error) {
      logger.error('Error in CostEstimationAgent:', error as Record<string, unknown>);
      throw error;
    }
  }
}

// Agent factory
export class AgentFactory {
  static createAgent(type: string): ImmigrationAgent {
    switch (type) {
      case 'visa':
        return new VisaSpecialistAgent();
      case 'document':
        return new DocumentExpertAgent();
      case 'timeline':
        return new TimelinePlanningAgent();
      case 'cost':
        return new CostEstimationAgent();
      default:
        throw new Error(`Unknown agent type: ${type}`);
    }
  }
}

export async function getChatSession() {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized - Please sign in');
  }
  return session;
}

export async function createNewSession() {
  try {
    const session = await fetch('/api/chat/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());
    
    return session;
  } catch (error) {
    logger.error('Failed to create new chat session:', {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    throw new Error('Failed to initialize chat session. Please try again.');
  }
}

export async function sendMessage(message: string, sessionId: string) {
  try {
    // Create and send the message
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    logger.error('Failed to send chat message:', {
      error: error instanceof Error ? error.message : String(error),
      sessionId,
      timestamp: new Date().toISOString(),
    });
    throw new Error('Failed to send message. Please try again.');
  }
}