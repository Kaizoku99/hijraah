import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { ImmigrationAIProcessor } from '@/lib/ai/processor';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { timing } from 'hono/timing';
import { cache } from 'hono/cache';
import { getSupabaseClient } from '@/lib/supabase/client';
import { rateLimit } from '@/lib/api/rate-limit';
import { HTTPException } from 'hono/http-exception';

const app = new Hono().basePath('/api');

// Add global middleware
app.use('/*', cors({
  origin: ['http://localhost:3000', 'https://hijraah.vercel.app'],
  credentials: true,
}));
app.use('/*', logger());
app.use('/*', timing());
app.use('/*', rateLimit({
  max: 60,
  windowMs: 60 * 1000, // 1 minute
}));

// Add error handling middleware
app.onError((err, c) => {
  console.error(`[${c.req.method}] ${c.req.url}:`, err);
  
  if (err instanceof z.ZodError) {
    return c.json({
      success: false,
      error: 'Validation error',
      details: err.errors,
    }, 400);
  }

  if (err instanceof HTTPException) {
    return c.json({
      success: false,
      error: err.message,
      status: err.status,
    }, err.status);
  }

  return c.json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  }, 500);
});

// Auth middleware with proper typing
async function authMiddleware(c: any, next: () => Promise<void>) {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new HTTPException(401, { message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const supabase = getSupabaseClient();

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      throw new HTTPException(401, { message: 'Invalid token' });
    }

    c.set('user', user);
    await next();
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    throw new HTTPException(500, { message: 'Authentication error' });
  }
}

// Schema definitions
const querySchema = z.object({
  query: z.string().min(1, 'Query cannot be empty').max(1000),
  filters: z.object({
    country: z.string().optional(),
    category: z.string().optional(),
    language: z.string().optional(),
  }).optional(),
});

const compareSchema = z.object({
  countries: z.array(z.string()).min(2).max(5),
  category: z.string(),
  language: z.string().optional(),
});

// Routes with proper error handling and validation
app.post('/ai/chat', 
  authMiddleware,
  zValidator('json', querySchema),
  cache({
    cacheName: 'ai-chat',
    cacheControl: 'max-age=3600',
  }),
  async (c) => {
    const { query, filters } = c.req.valid('json');
    const user = c.get('user');

    try {
      const processor = new ImmigrationAIProcessor(
        process.env.OPENAI_API_KEY!,
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const response = await processor.processQuery(query, filters);
      return response;
    } catch (error) {
      console.error('AI processing error:', error);
      throw new HTTPException(500, { message: 'AI processing failed' });
    }
  }
);

app.post('/ai/compare',
  authMiddleware,
  zValidator('json', compareSchema),
  cache({
    cacheName: 'ai-compare',
    cacheControl: 'max-age=3600',
  }),
  async (c) => {
    const { countries, category } = c.req.valid('json');
    const user = c.get('user');

    try {
      const processor = new ImmigrationAIProcessor(
        process.env.OPENAI_API_KEY!,
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const response = await processor.compareCountries(countries, category);
      return c.json({ success: true, data: response });
    } catch (error) {
      console.error('AI comparison error:', error);
      throw new HTTPException(500, { message: 'Comparison failed' });
    }
  }
);

// Comparison endpoint
app.post('/compare', 
  zValidator('json', compareSchema),
  cache({
    cacheName: 'immigration-compare',
    cacheControl: 'public, max-age=3600',
  }),
  async (c) => {
    const { countries, category } = c.req.valid('json');
    
    try {
      const processor = new ImmigrationAIProcessor(
        process.env.OPENAI_API_KEY!,
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const comparison = await processor.compareCountries(countries, category);
      return c.json({ success: true, data: comparison });
    } catch (error: any) {
      console.error('Comparison error:', error);
      return c.json({ 
        success: false, 
        error: 'Failed to generate comparison',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, 500);
    }
  }
);

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export const GET = handle(app);
export const POST = handle(app); 