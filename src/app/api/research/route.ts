import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { SearchEngine } from '@/lib/scrapers/search'
import { TimelineAnalyzer } from '@/lib/analysis/timeline'
import { CredibilityScorer } from '@/lib/analysis/credibility'
import { CrossReferenceAnalyzer } from '@/lib/analysis/cross-reference'
import { AIModelManager } from '@/lib/ai/models'

// Create a new Hono app
const app = new Hono()

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Define request validation schemas
const searchSchema = z.object({
  query: z.string().min(1).max(500),
  model: z.string().default('gpt-4'),
  options: z.object({
    searchMode: z.enum(['vector', 'firecrawl', 'hybrid']).default('hybrid'),
    rerank: z.boolean().default(true),
    filters: z.record(z.string()).optional()
  }).optional()
})

const analysisSchema = z.object({
  sources: z.array(z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().url(),
    snippet: z.string(),
    content: z.string().optional(),
    relevanceScore: z.number(),
    categories: z.array(z.string()),
    metadata: z.record(z.any()).optional()
  })),
  model: z.string().default('gpt-4'),
  options: z.object({
    timeline: z.object({
      granularity: z.enum(['day', 'week', 'month', 'year']).default('month'),
      includeTrends: z.boolean().default(true)
    }).optional(),
    credibility: z.object({
      minConfidence: z.number().min(0).max(1).default(0.5)
    }).optional(),
    crossReference: z.object({
      minSimilarity: z.number().min(0).max(1).default(0.3),
      maxConnections: z.number().int().positive().default(5)
    }).optional()
  }).optional()
})

// Search endpoint
app.post('/search', zValidator('json', searchSchema), async (c) => {
  try {
    const { query, model, options } = c.req.valid('json')
    
    // Store search query in Supabase for analytics
    await supabase
      .from('search_queries')
      .insert({
        query,
        model,
        options,
        user_id: c.req.header('x-user-id'),
        timestamp: new Date().toISOString()
      })
    
    // Perform search
    const searchEngine = new SearchEngine({
      modelManager: {
        model,
        temperature: 0.3,
        maxTokens: 1000
      }
    })
    
    const results = await searchEngine.search(query, options)
    
    // Return search results
    return c.json({
      success: true,
      results
    })
  } catch (error) {
    console.error('Search error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Analysis endpoint
app.post('/analyze', zValidator('json', analysisSchema), async (c) => {
  try {
    const { sources, model, options } = c.req.valid('json')
    
    // Initialize AI model manager
    const modelManager = new AIModelManager({
      model,
      temperature: 0.3,
      maxTokens: 1000
    })
    
    // Run analyses in parallel
    const [timeline, credibility, crossReferences] = await Promise.all([
      // Timeline analysis
      new TimelineAnalyzer(modelManager).createTimeline(
        sources.map(s => ({
          date: new Date(s.metadata?.date || Date.now()),
          title: s.title,
          description: s.snippet,
          sources: [s.url],
          importance: s.relevanceScore,
          relatedEvents: [],
          confidence: 0.8
        })),
        {
          granularity: options?.timeline?.granularity || 'month',
          includeTrends: options?.timeline?.includeTrends
        }
      ),
      
      // Credibility analysis
      Promise.all(
        sources.map(s =>
          new CredibilityScorer(modelManager).scoreSource(
            s.content || s.snippet,
            {
              domain: new URL(s.url).hostname,
              publishDate: s.metadata?.date ? new Date(s.metadata.date) : undefined,
              citations: s.metadata?.citations,
              backlinks: s.metadata?.backlinks
            }
          )
        )
      ),
      
      // Cross-reference analysis
      new CrossReferenceAnalyzer(modelManager).analyzeSources(
        sources.map(s => ({
          id: s.url,
          content: s.content || s.snippet
        })),
        {
          minSimilarity: options?.crossReference?.minSimilarity,
          maxConnections: options?.crossReference?.maxConnections
        }
      )
    ])
    
    // Store analysis results in Supabase
    await supabase
      .from('analysis_results')
      .insert({
        sources: sources.map(s => s.id),
        model,
        options,
        results: {
          timeline,
          credibility,
          crossReferences
        },
        user_id: c.req.header('x-user-id'),
        timestamp: new Date().toISOString()
      })
    
    // Return analysis results
    return c.json({
      success: true,
      results: {
        timeline,
        credibility,
        crossReferences
      }
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Export Next.js route handler
export const POST = handle(app) 