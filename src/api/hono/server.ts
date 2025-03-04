import { serve } from '@hono/node-server';
import app from './index';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the port from environment variables or use default
const port = process.env.API_PORT || 8000;

// Start the server
console.log(`🚀 Hijraah API server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port: Number(port),
});

console.log(`
✅ Hono API server started
📚 API Documentation: http://localhost:${port}/api-docs
🔍 Health check: http://localhost:${port}/
`);

// Add basic error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

process.on('SIGINT', () => {
  console.log('Server shutting down...');
  process.exit(0);
}); 