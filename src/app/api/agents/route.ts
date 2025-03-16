import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { getAuthenticatedUser } from '@/lib/auth/nextjs';
import { getAgentManager } from '@/lib/ai/agents/agent-manager';
import { AgentType } from '@/lib/ai/agents/agent-framework';
import { getSupabaseClient } from '@/lib/supabase/client';

// Runtime configuration for edge deployment
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 second timeout

// Schema for creating a new agent
const CreateAgentSchema = z.object({
  agentType: z.enum([
    AgentType.VISA_ASSISTANT,
    AgentType.DOCUMENT_PREPARER,
    AgentType.ELIGIBILITY_CHECKER,
    AgentType.IMMIGRATION_ADVISOR,
  ]),
});

// Schema for sending a message to an agent
const MessageSchema = z.object({
  agentId: z.string(),
  message: z.string(),
});

// Schema for automatic routing
const RouteMessageSchema = z.object({
  message: z.string(),
});

// Schema for agent feedback
const FeedbackSchema = z.object({
  agentId: z.string(),
  rating: z.number().min(1).max(5),
  comments: z.string().optional(),
  wasHelpful: z.boolean(),
});

/**
 * GET - List agents for the current user
 */
export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user
    const user = await getAuthenticatedUser(request);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the agent manager
    const agentManager = getAgentManager(user.id);
    
    // List agents
    const agents = await agentManager.listAgents();
    
    return NextResponse.json({ agents });
  } catch (error) {
    console.error('Error listing agents:', error);
    return NextResponse.json(
      { error: 'Failed to list agents' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create a new agent or send a message to an agent
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const user = await getAuthenticatedUser(request);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Check which action to perform
    if (body.action === 'create') {
      // Create a new agent
      const { agentType } = CreateAgentSchema.parse(body);
      
      const agentManager = getAgentManager(user.id);
      const agent = await agentManager.createAgent(agentType);
      
      return NextResponse.json({ agentId: agent.id });
    } else if (body.action === 'message') {
      // Send a message to an agent
      const { agentId, message } = MessageSchema.parse(body);
      
      const agentManager = getAgentManager(user.id);
      
      // Track the interaction in the database
      const supabase = getSupabaseClient();
      await supabase.from('user_interactions').insert({
        user_id: user.id,
        interaction_type: 'agent_message',
        content: message,
        created_at: new Date().toISOString(),
      });
      
      // Get the response as a stream
      const responseStream = await agentManager.sendMessage(agentId, message);
      
      // If it's a string, return it directly
      if (typeof responseStream === 'string') {
        return NextResponse.json({ response: responseStream });
      }
      
      // Otherwise, create a streamed response
      return new Response(responseStream);
    } else if (body.action === 'route') {
      // Route a message to the most appropriate agent
      const { message } = RouteMessageSchema.parse(body);
      
      const agentManager = getAgentManager(user.id);
      const result = await agentManager.routeMessage(message);
      
      // If the response is a string, return it directly
      if (typeof result.response === 'string') {
        return NextResponse.json({
          agentId: result.agentId,
          response: result.response,
          isNewAgent: result.isNewAgent,
        });
      }
      
      // Otherwise, include the agent ID in the stream's metadata
      const encoder = new TextEncoder();
      const metadataChunk = encoder.encode(
        `data: ${JSON.stringify({ agentId: result.agentId, isNewAgent: result.isNewAgent })}\n\n`
      );
      
      // Create a new stream that includes the metadata
      const metadataStream = new ReadableStream({
        start(controller) {
          controller.enqueue(metadataChunk);
        }
      });
      
      // Combine the metadata stream with the response stream
      const combinedStream = new ReadableStream({
        async start(controller) {
          const metadataReader = metadataStream.getReader();
          const responseReader = result.response.getReader();
          
          // First, enqueue the metadata
          const { value, done } = await metadataReader.read();
          if (!done) {
            controller.enqueue(value);
          }
          
          // Then, stream the response
          while (true) {
            const { value, done } = await responseReader.read();
            if (done) break;
            controller.enqueue(value);
          }
          
          controller.close();
        }
      });
      
      return new Response(combinedStream);
    } else if (body.action === 'feedback') {
      // Save feedback for an agent
      const feedback = FeedbackSchema.parse(body);
      
      const agentManager = getAgentManager(user.id);
      await agentManager.saveAgentFeedback(feedback.agentId, {
        rating: feedback.rating,
        comments: feedback.comments,
        wasHelpful: feedback.wasHelpful,
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing agent request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Archive an agent
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get the authenticated user
    const user = await getAuthenticatedUser(request);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse the URL to get the agent ID
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');
    
    if (!agentId) {
      return NextResponse.json(
        { error: 'Agent ID is required' },
        { status: 400 }
      );
    }
    
    // Archive the agent
    const agentManager = getAgentManager(user.id);
    const success = await agentManager.archiveAgent(agentId);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Agent not found or could not be archived' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error archiving agent:', error);
    return NextResponse.json(
      { error: 'Failed to archive agent' },
      { status: 500 }
    );
  }
} 