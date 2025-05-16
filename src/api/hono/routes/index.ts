import { Hono } from 'hono';
import { languageDetector } from 'hono/language';
import { t, localizedSuccess, localizedError } from '../utils/translation-helper';

// Create the base API with middleware
const api = new Hono()
  // Add language detection middleware to all routes
  .use('*', languageDetector({
    supportedLanguages: ['en', 'ar', 'fr', 'es'],
    fallbackLanguage: 'en',
    debug: process.env.NODE_ENV === 'development',
  }));

// Health check route (not localized)
api.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Example route using translations
api.get('/hello', async (c) => {
  try {
    // Get language from context (set by middleware)
    const language = c.get('language');
    
    // Return localized response
    return await localizedSuccess(c, { 
      language,
      timestamp: new Date().toISOString(),
    }, 'api.hello.success', { 
      language 
    });
  } catch (error) {
    console.error('Error in hello route:', error);
    return await localizedError(c, 500, 'errors.server');
  }
});

// Example route with path parameters
api.get('/users/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    // Example user data (would normally be fetched from a database)
    const user = {
      id,
      name: 'John Doe',
      email: 'john@example.com',
    };
    
    // Return localized success response
    return await localizedSuccess(c, { user }, 'api.users.retrieved', { id });
  } catch (error) {
    console.error('Error fetching user:', error);
    return await localizedError(c, 500, 'errors.users.notFound', { id: c.req.param('id') });
  }
});

// Export the API for use in the Next.js API Route
export default api; 