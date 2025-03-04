import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { timing } from 'hono/timing';
import { cache } from 'hono/cache';
import { supabase, getServiceClient } from '@/lib/supabase/client';

// Create Hono app without basePath
const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', timing());
app.use('*', prettyJSON());
app.use(
  '*',
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL || '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'X-Request-Id'],
    maxAge: 600,
    credentials: true,
  }),
);

// Add caching for GET requests
app.use(
  '*',
  cache({
    cacheName: 'api-cache',
    cacheControl: 'max-age=300, stale-while-revalidate=60',
  }),
);

// Error handling middleware
app.onError((err, c) => {
  console.error(`[${c.req.method}] ${c.req.url}:`, err);

  if (err instanceof HTTPException) {
    return c.json(
      {
        error: {
          message: err.message,
          status: err.status,
        },
      },
      err.status,
    );
  }

  return c.json(
    {
      error: {
        message: 'Internal Server Error',
        status: 500,
      },
    },
    500,
  );
});

// Health check
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Protected route middleware
const auth = async (c: any, next: () => Promise<any>) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new HTTPException(401, { message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new HTTPException(401, { message: 'Invalid token' });
    }

    c.set('user', user);
    return next();
  } catch (error) {
    throw new HTTPException(401, { message: 'Authentication failed' });
  }
};

// API Routes
const apiRoutes = app
  .use('/protected/*', auth)
  .get('/protected/user', async (c) => {
    const user = c.get('user');
    return c.json({ user });
  })
  .get('/protected/profile', async (c) => {
    const user = c.get('user');
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      throw new HTTPException(500, { message: error.message });
    }

    return c.json({ profile: data });
  });

// Create handler for Next.js Edge API Routes
const handler = handle(app);

// Export handlers for Next.js Edge API Routes
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
