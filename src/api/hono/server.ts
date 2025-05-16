import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { prettyJSON } from 'hono/pretty-json';
import { languageDetector } from 'hono/language';
import { getRateLimiter } from '@/lib/rate-limit';
import { routeNotFound } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import { authMiddleware } from './middleware/auth';
import { locales, defaultLocale } from '@/i18n';

// Import routes
import { userRoutes } from './routes/user.route';
import { authRoutes } from './routes/auth.route';
import { chatRoutes } from './routes/chat.route';
import { immigrationRoutes } from './routes/immigration.route';
import { documentRoutes } from './routes/document.route';
import { countryRoutes } from './routes/country.route';

// Create the Hono app
const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', secureHeaders());
app.use(
  '*',
  cors({
    origin: [
      'http://localhost:3000',
      'https://hijraah.com',
      'https://www.hijraah.com',
      new RegExp('^https://.*\\.hijraah\\.com$'),
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
    exposeHeaders: ['Content-Length', 'Content-Language'],
    credentials: true,
    maxAge: 86400,
  })
);

// Add language detection middleware
app.use('*', languageDetector({
  supportedLanguages: Array.from(locales),
  fallbackLanguage: defaultLocale,
  order: ['path', 'querystring', 'cookie', 'header'],
  lookupCookie: 'NEXT_LOCALE',
  lookupQueryString: 'locale',
  caches: ['cookie'],
  debug: process.env.NODE_ENV === 'development',
}));

// Rate limiting middleware
const rateLimiter = getRateLimiter({
  uniqueTokenPerInterval: 500,
  interval: 60 * 1000, // 1 minute
});

app.use('*', async (c, next) => {
  const ip = c.req.header('x-forwarded-for') || 'unknown';
  try {
    await rateLimiter.limit(`${ip}-${c.req.method}-${c.req.path}`);
    await next();
  } catch (error) {
    return c.json(
      { 
        error: 'Too Many Requests', 
        message: 'Rate limit exceeded. Please try again later.' 
      },
      429
    );
  }
});

// Routes
app.route('/auth', authRoutes);
app.route('/user', userRoutes);
app.route('/chat', chatRoutes);
app.route('/immigration', immigrationRoutes);
app.route('/documents', documentRoutes);
app.route('/countries', countryRoutes);

// Static files
app.use('/static/*', serveStatic({ root: './public' }));

// Basic route
app.get('/', (c) => {
  const language = c.get('language') || defaultLocale;
  const greeting = 
    language === 'ar' ? 'مرحبًا بك في واجهة برمجة تطبيقات هجرة!' :
    language === 'fr' ? 'Bienvenue à l\'API Hijraah !' :
    language === 'es' ? '¡Bienvenido a la API de Hijraah!' :
    'Welcome to the Hijraah API!';

  return c.json({
    status: 'ok',
    message: greeting,
    version: 'v1.0.0',
    language
  });
});

// 404 handler
app.notFound(routeNotFound);

// Error handler
app.onError(errorHandler);

// Start the server if not imported
if (import.meta.url === import.meta.main) {
  const port = process.env.PORT || 8000;
  console.log(`🚀 Server running on http://localhost:${port}`);
  
  serve({
    fetch: app.fetch,
    port: Number(port),
  });
}

export default app; 