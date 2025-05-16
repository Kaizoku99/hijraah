import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'
import { OpenAI } from 'openai'
import { Anthropic } from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { Firecrawl } from '@firecrawl/node'
import { z } from 'zod'

// Initialize clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY
})

// Create a Hono app
const app = new Hono()

// Add CORS middleware
app.use('*', cors())

// Define schema for the request body
const researchRequestSchema = z.object({
  query: z.string().min(1),
  userId: z.string().optional(),
  sessionId: z.string(),
  model: z.enum(['gpt-4o', 'claude-3-opus', 'claude-3-sonnet', 'gemini-pro']).default('gpt-4o'),
  maxSources: z.number().min(1).max(10).default(5),
  maxDepth: z.number().min(1).max(3).default(2)
})

// Define schema for source data
const sourceSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  description: z.string(),
  type: z.enum(['web', 'pdf', 'document', 'database']),
  relevance: z.number().min(0).max(1)
})

// Define schema for activity data
const activitySchema = z.object({
  type: z.enum(['search', 'extract', 'analyze', 'reasoning', 'synthesis', 'thought']),
  message: z.string(),
  status: z.enum(['pending', 'complete', 'error']),
  depth: z.number().min(0),
  timestamp: z.number()
})

// Define schema for finding data
const findingSchema = z.object({
  content: z.string(),
  confidence: z.number().min(0).max(1),
  sources: z.array(z.string()),
  timestamp: z.number()
})

// Define schema for research response
const researchResponseSchema = z.object({
  sources: z.array(sourceSchema),
  activities: z.array(activitySchema),
  findings: z.array(findingSchema),
  depth: z.object({
    current: z.number(),
    max: z.number()
  }),
  progress: z.object({
    completedSteps: z.number(),
    totalSteps: z.number()
  })
})

// Handle research request
app.post('/research', async (c) => {
  try {
    // Parse and validate request body
    const body = await c.req.json()
    const validatedData = researchRequestSchema.parse(body)
    
    // Start a research session in Supabase
    const { data: session, error: sessionError } = await supabase
      .from('research_sessions')
      .upsert({
        id: validatedData.sessionId,
        user_id: validatedData.userId,
        query: validatedData.query,
        model: validatedData.model,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'in_progress'
      })
      .select()
      .single()
    
    if (sessionError) {
      console.error('Error creating research session:', sessionError)
      return c.json({ error: 'Failed to create research session' }, 500)
    }
    
    // Initialize research data
    const researchData = {
      sources: [],
      activities: [
        {
          type: 'search',
          message: `Starting research on: ${validatedData.query}`,
          status: 'pending',
          depth: 1,
          timestamp: Date.now()
        }
      ],
      findings: [],
      depth: { current: 1, max: validatedData.maxDepth },
      progress: { completedSteps: 0, totalSteps: 5 * validatedData.maxDepth }
    }
    
    // Store initial research data
    await supabase
      .from('research_data')
      .upsert({
        session_id: validatedData.sessionId,
        data: researchData,
        updated_at: new Date().toISOString()
      })
    
    // Return the initial research data
    return c.json(researchData)
  } catch (error) {
    console.error('Research API error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Handle research update
app.post('/research/:sessionId/update', async (c) => {
  try {
    const sessionId = c.req.param('sessionId')
    const body = await c.req.json()
    
    // Update research data in Supabase
    const { error } = await supabase
      .from('research_data')
      .upsert({
        session_id: sessionId,
        data: body,
        updated_at: new Date().toISOString()
      })
    
    if (error) {
      console.error('Error updating research data:', error)
      return c.json({ error: 'Failed to update research data' }, 500)
    }
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Research update API error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Handle research sources fetch (Firecrawl integration)
app.post('/research/:sessionId/sources', async (c) => {
  try {
    const sessionId = c.req.param('sessionId')
    const body = await c.req.json()
    const { query } = body
    
    // Get research results using Firecrawl
    const searchResults = await firecrawl.search(query, {
      limit: 5,
      extractContent: true
    })
    
    // Format the search results
    const sources = searchResults.map(result => ({
      url: result.url,
      title: result.title || 'Unknown Title',
      description: result.description || 'No description available',
      type: 'web',
      relevance: result.score || 0.5
    }))
    
    // Update the research data with the new sources
    const { data: researchData, error: fetchError } = await supabase
      .from('research_data')
      .select('data')
      .eq('session_id', sessionId)
      .single()
    
    if (fetchError) {
      console.error('Error fetching research data:', fetchError)
      return c.json({ error: 'Failed to fetch research data' }, 500)
    }
    
    const updatedData = {
      ...researchData.data,
      sources: [...researchData.data.sources, ...sources],
      activities: [
        ...researchData.data.activities,
        {
          type: 'search',
          message: `Found ${sources.length} sources for: ${query}`,
          status: 'complete',
          depth: 1,
          timestamp: Date.now()
        }
      ],
      progress: {
        ...researchData.data.progress,
        completedSteps: researchData.data.progress.completedSteps + 1
      }
    }
    
    // Save the updated data
    const { error: updateError } = await supabase
      .from('research_data')
      .upsert({
        session_id: sessionId,
        data: updatedData,
        updated_at: new Date().toISOString()
      })
    
    if (updateError) {
      console.error('Error updating research data with sources:', updateError)
      return c.json({ error: 'Failed to update research data with sources' }, 500)
    }
    
    return c.json(sources)
  } catch (error) {
    console.error('Research sources API error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Export Hono app using Vercel adapter
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app) 