import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import { requireAuth } from '../middleware/supabase';

// Initialize Supabase client
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseKey);
};

// Create a Hono app for research routes
export const researchRoutes = new Hono();

// Schema for request validation
const startResearchSchema = z.object({
  query: z.string().min(1, "Query cannot be empty"),
  maxDepth: z.number().optional().default(3),
});

// Start a new research session - Protected route
researchRoutes.post(
  '/start',
  requireAuth,
  zValidator('json', startResearchSchema),
  async (c) => {
    try {
      const { query, maxDepth } = c.req.valid('json');
      const user = c.get('user');
      const supabase = c.get('supabase');
      const sessionId = nanoid();

      // Create the research session in Supabase
      const { error } = await supabase
        .from('research_sessions')
        .insert({
          id: sessionId,
          user_id: user.id,
          query: query.trim(),
          status: 'active',
          metadata: {
            source: 'user_initiated',
            depth: maxDepth
          }
        });

      if (error) throw new Error(error.message);

      // Start the research process in the background
      startResearchProcess(sessionId, query, maxDepth, user.id, supabase);

      return c.json({
        success: true,
        message: 'Research session started',
        sessionId,
      });
    } catch (error: any) {
      console.error('Research start API error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Get research session - Protected route
researchRoutes.get(
  '/:sessionId',
  requireAuth,
  async (c) => {
    try {
      const sessionId = c.req.param('sessionId');
      const user = c.get('user');
      const supabase = c.get('supabase');

      // Get research session
      const { data: session, error: sessionError } = await supabase
        .from('research_sessions')
        .select('*')
        .eq('id', sessionId)
        .eq('user_id', user.id) // Ensure user can only access their own sessions
        .single();

      if (sessionError) throw new Error(sessionError.message);

      // Get research sources
      const { data: sources, error: sourcesError } = await supabase
        .from('research_sources')
        .select('*')
        .eq('report_id', sessionId);

      if (sourcesError) throw new Error(sourcesError.message);

      // Get research findings
      const { data: findings, error: findingsError } = await supabase
        .from('research_findings')
        .select('*')
        .eq('report_id', sessionId);

      if (findingsError) throw new Error(findingsError.message);

      return c.json({
        success: true,
        session,
        sources,
        findings,
      });
    } catch (error: any) {
      console.error('Get research session error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Get user's research sessions - Protected route
researchRoutes.get(
  '/user/sessions',
  requireAuth,
  async (c) => {
    try {
      const user = c.get('user');
      const supabase = c.get('supabase');

      // Get user's research sessions
      const { data, error } = await supabase
        .from('research_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);

      return c.json({
        success: true,
        sessions: data,
      });
    } catch (error: any) {
      console.error('Get user research sessions error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Cancel a research session - Protected route
researchRoutes.post(
  '/:sessionId/cancel',
  requireAuth,
  async (c) => {
    try {
      const sessionId = c.req.param('sessionId');
      const user = c.get('user');
      const supabase = c.get('supabase');

      // Update the research session to cancelled
      const { error } = await supabase
        .from('research_sessions')
        .update({
          status: 'cancelled',
          metadata: {
            cancelled_at: new Date().toISOString(),
            cancelled_by: user.id
          }
        })
        .eq('id', sessionId)
        .eq('user_id', user.id); // Ensure user can only cancel their own sessions

      if (error) throw new Error(error.message);

      return c.json({
        success: true,
        message: 'Research session cancelled',
      });
    } catch (error: any) {
      console.error('Cancel research session error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Background process to conduct research
async function startResearchProcess(
  sessionId: string,
  query: string,
  maxDepth: number,
  userId: string,
  supabase: any
) {
  try {
    // Update session to processing
    await supabase
      .from('research_sessions')
      .update({
        status: 'processing',
        metadata: {
          maxDepth,
          startTime: new Date().toISOString(),
        },
      })
      .eq('id', sessionId);

    // Call edge functions to process the research
    // Step 1: Initial search
    const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query, maxResults: 5 }),
    });

    if (!searchResponse.ok) {
      throw new Error('Initial search failed');
    }

    // Further steps would be implemented to complete the research process
    // This is a placeholder for the actual implementation
    console.log(`Research process started for session ${sessionId}`);

    // For now, we'll just mark it as completed
    await supabase
      .from('research_sessions')
      .update({
        status: 'completed',
        metadata: {
          completedAt: new Date().toISOString(),
        },
      })
      .eq('id', sessionId);

  } catch (error: any) {
    console.error('Research process error:', error);
    
    // Update session with error
    await supabase
      .from('research_sessions')
      .update({
        status: 'error',
        metadata: {
          error: error.message || 'Unknown error',
          errorTime: new Date().toISOString(),
        },
      })
      .eq('id', sessionId);
  }
}