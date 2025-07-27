import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { generateEmailHtml } from '@/emails/supabaseEmailHandler';
import type { SupabaseEmailType, SupabaseEmailMetadata } from '@/emails/supabaseEmailHandler';

// Create a Hono app instance
const app = new Hono()
  .post('/api/email/template', async (c) => {
    try {
      const { type, metadata } = await c.req.json() as {
        type: SupabaseEmailType;
        metadata: SupabaseEmailMetadata;
      };

      if (!type || !metadata) {
        return c.json({ error: 'Missing required parameters: type or metadata' }, 400);
      }

      // Generate the email HTML
      const html = generateEmailHtml(type, metadata);

      return c.json({ html });
    } catch (error) {
      console.error('Error generating email:', error);
      return c.json({ error: 'Failed to generate email' }, 500);
    }
  });

// Export the handle function for Vercel integration
export const POST = handle(app);

// For local development
export default app; 