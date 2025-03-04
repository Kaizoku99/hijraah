import { createDataStreamResponse, streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import type { ChatMessage, StreamData, ToolCallResult } from '@/types/chat';
import { customModel } from '@/lib/ai/models';
import { getSupabaseClient } from '@/lib/supabase/client';
import { tools as aiTools } from '@/lib/ai/tools';

// Runtime configuration for edge deployment
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 second timeout

// Define the tool names
type ToolName = 'search' | 'extract' | 'scrape' | 'createDocument' | 'updateDocument' | 'deepResearch' | 'checkEligibility';

// Define the active tools
const activeTools: ToolName[] = [
  'search',
  'extract',
  'scrape',
  'createDocument',
  'updateDocument',
  'deepResearch',
  'checkEligibility'
];

// Combine existing tools with our new tools
const tools = {
  ...aiTools,
  
  checkEligibility: tool({
    description: 'Check user eligibility for immigration programs',
    parameters: z.object({
      userProfile: z.object({
        age: z.number().optional(),
        education: z.string().optional(),
        workExperience: z.number().optional(),
        languageProficiency: z.record(z.string(), z.number()).optional(),
        nationality: z.string().optional(),
        qualifications: z.array(z.string()).optional(),
        familyConnections: z.array(z.string()).optional(),
        previousVisits: z.array(z.string()).optional()
      }),
      programType: z.string().min(1)
    }),
    execute: async ({ userProfile, programType }: { 
      userProfile: {
        age?: number;
        education?: string;
        workExperience?: number;
        languageProficiency?: Record<string, number>;
        nationality?: string;
        qualifications?: string[];
        familyConnections?: string[];
        previousVisits?: string[];
      }, 
      programType: string 
    }) => {
      try {
        // Call the eligibility-checker edge function
        const response = await fetch(`${process.env.SUPABASE_URL}/functions/v1/eligibility-checker`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({ userProfile, programType })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Eligibility check failed');
        }
        
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('Eligibility check error:', error);
        return { 
          eligible: false, 
          missing: ['Could not complete eligibility check'], 
          recommendations: ['Please try again later or contact support'],
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
  }),
  
  // Add deep research tool for comprehensive research
  deepResearch: tool({
    description: 'Perform deep research on a topic using multiple sources and provide a comprehensive analysis',
    parameters: z.object({
      topic: z.string().describe('The topic to research in detail'),
      maxDepth: z.number().optional().describe('Maximum depth of research (default: 3)'),
    }),
    execute: async ({ topic, maxDepth = 3 }: { topic: string; maxDepth?: number }) => {
      // Create a unique ID for this research session
      const researchId = nanoid();
      
      // Log the research request in Supabase
      try {
        const supabase = getSupabaseClient();
        await supabase.from('research_sessions').insert({
          id: researchId,
          topic,
          max_depth: maxDepth,
          status: 'started',
          created_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Failed to log research session:', error);
      }
      
      // Perform research by making API calls to our search and extract endpoints
      try {
        // Step 1: Initial search to find relevant sources
        const searchResponse = await fetch('/api/ai/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: topic, maxResults: 5 }),
        });
        
        if (!searchResponse.ok) {
          throw new Error('Initial search failed');
        }
        
        const searchResults = await searchResponse.json();
        const urls = searchResults.data.map((result: any) => result.url);
        
        // Step 2: Extract detailed information from each source
        const extractPromises = urls.map(async (url: string) => {
          const extractResponse = await fetch('/api/ai/extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              urls: [url],
              prompt: `Extract detailed information about ${topic}. Include facts, statistics, expert opinions, and comprehensive analysis.`,
            }),
          });
          
          if (!extractResponse.ok) {
            return { url, error: 'Extraction failed' };
          }
          
          const extractResult = await extractResponse.json();
          return { url, data: extractResult.data };
        });
        
        const extractResults = await Promise.all(extractPromises);
        
        // Step 3: Synthesize the findings into a comprehensive analysis
        const synthesis = {
          topic,
          sources: urls,
          findings: extractResults,
          summary: `Comprehensive research on ${topic} based on ${urls.length} sources.`,
        };
        
        // Update the research session in Supabase
        try {
          const supabase = getSupabaseClient();
          await supabase.from('research_sessions').update({
            status: 'completed',
            results: synthesis,
            completed_at: new Date().toISOString(),
          }).eq('id', researchId);
        } catch (error) {
          console.error('Failed to update research session:', error);
        }
        
        return synthesis;
      } catch (error) {
        console.error('Deep research error:', error);
        
        // Log the error in Supabase
        try {
          const supabase = getSupabaseClient();
          await supabase.from('research_sessions').update({
            status: 'failed',
            error_message: error instanceof Error ? error.message : 'Unknown error',
            completed_at: new Date().toISOString(),
          }).eq('id', researchId);
        } catch (logError) {
          console.error('Failed to log research error:', logError);
        }
        
        return {
          topic,
          error: error instanceof Error ? error.message : 'Research failed',
          partial_results: [],
        };
      }
    }
  }),
} as const;

export async function POST(req: Request) {
  return createDataStreamResponse({
    execute: async (dataStream) => {
      try {
        const { 
          messages, 
          sessionId, 
          modelId = 'gpt-4o-mini',
          reasoningModelId = 'gpt-4-turbo',
          experimental_deepResearch = false 
        } = await req.json();
        
        // Write status update to data stream
        dataStream.writeData({
          type: 'status',
          value: { status: 'processing' }
        });

        // Create the appropriate model instance
        const model = customModel(modelId, false);
        
        // Determine which tools to enable based on request
        const enabledTools: ToolName[] = experimental_deepResearch 
          ? [...activeTools]  // Create a new array to avoid readonly issues
          : activeTools.filter(t => t !== 'deepResearch');
        
        // Create streaming response using Vercel AI SDK
        const result = await streamText({
          model: openai(model),
          messages,
          maxTokens: 8000,
          temperature: 0.7,
          experimental_activeTools: enabledTools,
          tools,
        });

        // Merge the streaming result into the data stream
        result.mergeIntoDataStream(dataStream);
        
        // Try to save chat session
        try {
          const supabase = getSupabaseClient();
          
          // Check if chat exists
          const { data: existingChat } = await supabase
            .from('chats')
            .select('id')
            .eq('id', sessionId)
            .single();
            
          if (!existingChat) {
            // Generate title from first user message
            const userMessage = messages.find((m: any) => m.role === 'user');
            let title = 'New Chat';
            
            if (userMessage) {
              // Generate a title based on the first user message (simplified)
              const titleContent = userMessage.content.substring(0, 50);
              title = titleContent + (titleContent.length >= 50 ? '...' : '');
            }
            
            // Save the chat session - we'll let Supabase RLS handle permissions
            await supabase.from('chats').insert({
              id: sessionId,
              title,
              created_at: new Date().toISOString(),
              model: modelId,
            });
          }
        } catch (error) {
          console.error('Failed to save chat session:', error);
          // Non-fatal error, continue execution
        }
      } catch (error) {
        // Handle errors in the data stream
        dataStream.writeData({
          type: 'error',
          value: { 
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        });
      }
    }
  });
}