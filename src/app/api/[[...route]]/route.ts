import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { timing } from 'hono/timing';
import { cache } from 'hono/cache';
import { supabase } from '@/lib/supabase/client';
import { rateLimit } from '@/lib/api/rate-limit';
import type { Context } from 'hono';

// Import route handlers
// These will be created progressively as needed
import { setupDocumentRoutes } from '@/lib/api/routes/documents';
import { setupAuthRoutes } from '@/lib/api/routes/auth';
import { setupProfileRoutes } from '@/lib/api/routes/profile';
import { setupImmigrationRoutes } from '@/lib/api/routes/immigration';
import { setupAdminRoutes } from '@/lib/api/routes/admin';

// Create Hono app without basePath
const app = new Hono();

// -----------------------------
// Middleware
// -----------------------------
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

// Add rate limiting
app.use('*', rateLimit({
  max: 100,              // 100 requests
  windowMs: 60 * 1000,   // per minute
}));

// Add caching for GET requests
app.use(
  '*',
  cache({
    cacheName: 'api-cache',
    cacheControl: 'max-age=300, stale-while-revalidate=60',
  }),
);

// -----------------------------
// Error handling middleware
// -----------------------------
app.onError((err, c) => {
  console.error(`[${c.req.method}] ${c.req.url}:`, err);

  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
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
      success: false,
      error: {
        message: process.env.NODE_ENV === 'development' 
          ? err.message || 'Internal Server Error'
          : 'Internal Server Error',
        status: 500,
      },
    },
    500,
  );
});

// -----------------------------
// Health check & public routes
// -----------------------------
app.get('/', (c) => {
  return c.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  });
});

// -----------------------------
// Auth middleware
// -----------------------------
const auth = async (c: Context, next: () => Promise<any>) => {
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

    // Add user to context
    c.set('user', user);
    return next();
  } catch (error) {
    throw new HTTPException(401, { message: 'Authentication failed' });
  }
};

// Admin middleware - checks if user has admin role
const adminOnly = async (c: Context, next: () => Promise<any>) => {
  const user = c.get('user');
  if (!user) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }

  // Get user roles from the database
  // This will be implemented when user roles functionality is added
  const isAdmin = true; // Placeholder - will be replaced with actual check
  
  if (!isAdmin) {
    throw new HTTPException(403, { message: 'Forbidden: Admin access required' });
  }

  return next();
};

// -----------------------------
// Configure routes
// -----------------------------
// Apply auth middleware to protected routes
app.use('/protected/*', auth);
app.use('/admin/*', auth, adminOnly);

// Set up route groups
setupAuthRoutes(app);
setupDocumentRoutes(app);
setupProfileRoutes(app);
setupImmigrationRoutes(app);
setupAdminRoutes(app);

// -----------------------------
// Export handlers
// -----------------------------
// Create handler for Next.js Edge API Routes
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const handler = handle(app);

// Export handlers for Next.js Edge API Routes
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
