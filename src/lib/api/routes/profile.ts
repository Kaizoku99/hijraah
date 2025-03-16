import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import { getServiceClient } from '@/lib/supabase/client';
import type { Context } from 'hono';

interface ProfileUpdate {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
  timezone?: string;
  language?: string;
  countryOfResidence?: string;
  countryOfInterest?: string;
}

/**
 * Profile routes for user profile management
 */
export function setupProfileRoutes(app: Hono) {
  // Validation schema for profile updates
  const profileUpdateSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    bio: z.string().max(500).optional(),
    avatarUrl: z.string().url().optional(),
    timezone: z.string().optional(),
    language: z.string().optional(),
    countryOfResidence: z.string().optional(),
    countryOfInterest: z.string().optional(),
  });

  // Get user profile
  app.get('/protected/profile', async (c: Context) => {
    const user = c.get('user');
    
    if (!user) {
      throw new HTTPException(401, { message: 'Unauthorized: User not found' });
    }
    
    try {
      const supabase = getServiceClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      return c.json({
        success: true,
        profile: data,
      });
    } catch (error: any) {
      console.error('Profile fetch error:', error);
      throw new HTTPException(500, { message: 'Failed to fetch profile' });
    }
  });
  
  // Update user profile
  app.patch(
    '/protected/profile',
    async (c: Context) => {
      const user = c.get('user');
      
      if (!user) {
        throw new HTTPException(401, { message: 'Unauthorized: User not found' });
      }
      
      // Validate the request body manually for now
      const body = await c.req.json();
      
      try {
        // Validate the body against our schema
        const result = profileUpdateSchema.safeParse(body);
        if (!result.success) {
          throw new HTTPException(400, { message: 'Invalid profile data' });
        }
        
        const updates = result.data;
        const supabase = getServiceClient();
        
        const { error } = await supabase
          .from('profiles')
          .update({
            ...(updates.firstName !== undefined && { first_name: updates.firstName }),
            ...(updates.lastName !== undefined && { last_name: updates.lastName }),
            ...(updates.bio !== undefined && { bio: updates.bio }),
            ...(updates.avatarUrl !== undefined && { avatar_url: updates.avatarUrl }),
            ...(updates.timezone !== undefined && { timezone: updates.timezone }),
            ...(updates.language !== undefined && { language: updates.language }),
            ...(updates.countryOfResidence !== undefined && { country_of_residence: updates.countryOfResidence }),
            ...(updates.countryOfInterest !== undefined && { country_of_interest: updates.countryOfInterest }),
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        if (error) throw error;
        
        return c.json({
          success: true,
          message: 'Profile updated successfully',
        });
      } catch (error: any) {
        console.error('Profile update error:', error);
        if (error instanceof HTTPException) {
          throw error;
        }
        throw new HTTPException(500, { message: 'Failed to update profile' });
      }
    }
  );
  
  // Get user documents count for dashboard stats
  app.get('/protected/profile/stats', async (c: Context) => {
    const user = c.get('user');
    
    if (!user) {
      throw new HTTPException(401, { message: 'Unauthorized: User not found' });
    }
    
    try {
      const supabase = getServiceClient();
      
      // Get count of user's documents
      const { count: documentsCount, error: documentsError } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      // Get count of user's applications
      const { count: applicationsCount, error: applicationsError } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      if (documentsError || applicationsError) {
        throw documentsError || applicationsError;
      }
      
      return c.json({
        success: true,
        stats: {
          documentsCount: documentsCount || 0,
          applicationsCount: applicationsCount || 0,
        },
      });
    } catch (error: any) {
      console.error('Stats fetch error:', error);
      throw new HTTPException(500, { message: 'Failed to fetch user stats' });
    }
  });

  return app;
} 