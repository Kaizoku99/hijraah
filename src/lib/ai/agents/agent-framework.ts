import { nanoid } from 'nanoid';
import { z } from 'zod';
import { ChatMessage } from '@/types/chat';
import { getSupabaseClient } from '@/lib/supabase/client';
import { customModel } from '@/lib/ai/models';
import { tools as aiTools } from '@/lib/ai/tools';
import { 
  generatePersonalizationContext, 
  getUserPersonalizationProfile 
} from '@/lib/ai/personalization/user-history';

// Define the agent state schema
export const AgentStateSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  messages: z.array(z.any()),
  metadata: z.record(z.any()).optional(),
  status: z.enum(['idle', 'thinking', 'executing', 'waiting', 'complete', 'error']),
  createdAt: z.string(),
  updatedAt: z.string(),
  isArchived: z.boolean().default(false),
});

export type AgentState = z.infer<typeof AgentStateSchema>;

// Supported agent types
export enum AgentType {
  VISA_ASSISTANT = 'visa_assistant',
  DOCUMENT_PREPARER = 'document_preparer',
  ELIGIBILITY_CHECKER = 'eligibility_checker',
  IMMIGRATION_ADVISOR = 'immigration_advisor',
}

// Agent execution step result
export interface StepResult {
  output: any;
  error?: string;
  nextAction?: string;
}

// Base agent class
export abstract class Agent {
  id: string;
  userId?: string;
  messages: ChatMessage[];
  metadata: Record<string, any>;
  status: AgentState['status'];
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  type: AgentType;

  constructor(initialState?: Partial<AgentState>) {
    this.id = initialState?.id || nanoid();
    this.userId = initialState?.userId;
    this.messages = initialState?.messages || [];
    this.metadata = initialState?.metadata || {};
    this.status = initialState?.status || 'idle';
    this.createdAt = initialState?.createdAt || new Date().toISOString();
    this.updatedAt = initialState?.updatedAt || new Date().toISOString();
    this.isArchived = initialState?.isArchived || false;
    this.type = AgentType.IMMIGRATION_ADVISOR; // Default type
  }

  // Convert agent to state object for persistence
  toState(): AgentState {
    return {
      id: this.id,
      userId: this.userId,
      messages: this.messages,
      metadata: this.metadata,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: new Date().toISOString(),
      isArchived: this.isArchived,
    };
  }

  // Save agent state to database
  async save(): Promise<void> {
    const supabase = getSupabaseClient();
    const state = this.toState();
    
    const { error } = await supabase
      .from('agents')
      .upsert({
        id: state.id,
        user_id: state.userId,
        messages: state.messages,
        metadata: state.metadata,
        status: state.status,
        created_at: state.createdAt,
        updated_at: state.updatedAt,
        is_archived: state.isArchived,
        agent_type: this.type,
      });

    if (error) {
      console.error('Failed to save agent state:', error);
      throw new Error(`Failed to save agent state: ${error.message}`);
    }
  }

  // Add a message to the agent's history
  async addMessage(message: ChatMessage): Promise<void> {
    this.messages.push(message);
    this.updatedAt = new Date().toISOString();
    await this.save();
  }

  // Set the agent's status
  async setStatus(status: AgentState['status']): Promise<void> {
    this.status = status;
    this.updatedAt = new Date().toISOString();
    await this.save();
  }

  // Archive the agent
  async archive(): Promise<void> {
    this.isArchived = true;
    this.updatedAt = new Date().toISOString();
    await this.save();
  }

  // Abstract methods to be implemented by specific agent types
  abstract processMessage(message: string): Promise<string | ReadableStream>;
  abstract executeStep(): Promise<StepResult>;
  abstract getContext(): Promise<string>;
}

// Helper function to load an agent from the database
export async function loadAgent(agentId: string): Promise<Agent | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('id', agentId)
    .single();

  if (error || !data) {
    console.error('Failed to load agent:', error);
    return null;
  }

  // Factory pattern to create the appropriate agent type
  return createAgentFromData(data);
}

// Helper function to create a new agent for a user
export async function createAgentForUser(
  userId: string, 
  type: AgentType,
  initialMessages: ChatMessage[] = []
): Promise<Agent> {
  const agent = createAgentByType(type, {
    userId,
    messages: initialMessages,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  
  await agent.save();
  return agent;
}

// Factory function to create an agent by type
function createAgentByType(type: AgentType, initialState?: Partial<AgentState>): Agent {
  switch (type) {
    case AgentType.VISA_ASSISTANT:
      return new VisaAssistantAgent(initialState);
    case AgentType.DOCUMENT_PREPARER:
      return new DocumentPreparerAgent(initialState);
    case AgentType.ELIGIBILITY_CHECKER:
      return new EligibilityCheckerAgent(initialState);
    case AgentType.IMMIGRATION_ADVISOR:
    default:
      return new ImmigrationAdvisorAgent(initialState);
  }
}

// Factory function to create an agent from database data
function createAgentFromData(data: any): Agent {
  const agentType = data.agent_type as AgentType;
  
  const initialState: Partial<AgentState> = {
    id: data.id,
    userId: data.user_id,
    messages: data.messages,
    metadata: data.metadata,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    isArchived: data.is_archived,
  };
  
  return createAgentByType(agentType, initialState);
}

// List all agents for a user
export async function listAgentsForUser(userId: string): Promise<Agent[]> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('user_id', userId)
    .eq('is_archived', false)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Failed to list agents:', error);
    return [];
  }

  // Create agent instances from data
  return data.map(createAgentFromData);
}

// Specific agent implementations will be defined in separate files 