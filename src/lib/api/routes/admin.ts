import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import { getServiceClient } from '@/lib/supabase/client';

/**
 * Admin routes for platform administration
 * All routes here should be behind the adminOnly middleware
 */
export function setupAdminRoutes(app: Hono) {
  // Validation schemas
  const userUpdateSchema = z.object({
    userId: z.string().uuid(),
    role: z.enum(['user', 'admin', 'moderator']).optional(),
    isActive: z.boolean().optional(),
    subscriptionTier: z.enum(['free', 'basic', 'premium', 'enterprise']).optional(),
  });

  const bulkUserSchema = z.object({
    userIds: z.array(z.string().uuid()).min(1),
    action: z.enum(['activate', 'deactivate', 'delete']),
  });

  // Get all users with pagination
  app.get(
    '/admin/users',
    async (c) => {
      const page = Number(c.req.query('page') || '1');
      const limit = Number(c.req.query('limit') || '50');
      const offset = (page - 1) * limit;
      
      try {
        const supabase = getServiceClient();
        
        // Get users with count
        const { data, error, count } = await supabase
          .from('users')
          .select('*, profiles(*)', { count: 'exact' })
          .range(offset, offset + limit - 1);
        
        if (error) throw error;
        
        return c.json({
          success: true,
          users: data,
          pagination: {
            total: count || 0,
            page,
            limit,
            totalPages: count ? Math.ceil(count / limit) : 0,
          },
        });
      } catch (error: any) {
        console.error('Admin users fetch error:', error);
        throw new HTTPException(500, { message: 'Failed to fetch users' });
      }
    }
  );
  
  // Update a user
  app.patch(
    '/admin/users',
    zValidator('json', userUpdateSchema),
    async (c) => {
      const { userId, role, isActive, subscriptionTier } = c.req.valid('json');
      
      try {
        const supabase = getServiceClient();
        
        // Update user roles if provided
        if (role) {
          const { error: roleError } = await supabase
            .from('user_roles')
            .upsert({
              user_id: userId,
              role,
              updated_at: new Date().toISOString(),
            });
          
          if (roleError) throw roleError;
        }
        
        // Update user status if provided
        if (isActive !== undefined) {
          const { error: statusError } = await supabase
            .from('users')
            .update({
              is_active: isActive,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
          
          if (statusError) throw statusError;
        }
        
        // Update subscription tier if provided
        if (subscriptionTier) {
          const { error: subscriptionError } = await supabase
            .from('subscriptions')
            .upsert({
              user_id: userId,
              tier: subscriptionTier,
              updated_at: new Date().toISOString(),
            });
          
          if (subscriptionError) throw subscriptionError;
        }
        
        return c.json({
          success: true,
          message: 'User updated successfully',
        });
      } catch (error: any) {
        console.error('Admin user update error:', error);
        throw new HTTPException(500, { message: 'Failed to update user' });
      }
    }
  );
  
  // Bulk user actions
  app.post(
    '/admin/users/bulk',
    zValidator('json', bulkUserSchema),
    async (c) => {
      const { userIds, action } = c.req.valid('json');
      
      try {
        const supabase = getServiceClient();
        
        if (action === 'activate' || action === 'deactivate') {
          const { error } = await supabase
            .from('users')
            .update({
              is_active: action === 'activate',
              updated_at: new Date().toISOString(),
            })
            .in('id', userIds);
          
          if (error) throw error;
        } else if (action === 'delete') {
          // Soft delete users
          const { error } = await supabase
            .from('users')
            .update({
              deleted_at: new Date().toISOString(),
              is_active: false,
            })
            .in('id', userIds);
          
          if (error) throw error;
        }
        
        return c.json({
          success: true,
          message: `Bulk action '${action}' completed successfully`,
          affected: userIds.length,
        });
      } catch (error: any) {
        console.error('Admin bulk action error:', error);
        throw new HTTPException(500, { message: 'Failed to perform bulk action' });
      }
    }
  );
  
  // Get system stats
  app.get(
    '/admin/stats',
    async (c) => {
      try {
        const supabase = getServiceClient();
        
        // Get user count
        const { count: userCount, error: userError } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });
        
        // Get document count
        const { count: documentCount, error: documentError } = await supabase
          .from('documents')
          .select('*', { count: 'exact', head: true });
        
        // Get active subscriptions count
        const { count: subscriptionCount, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');
        
        if (userError || documentError || subscriptionError) {
          throw userError || documentError || subscriptionError;
        }
        
        return c.json({
          success: true,
          stats: {
            users: userCount || 0,
            documents: documentCount || 0,
            activeSubscriptions: subscriptionCount || 0,
          },
        });
      } catch (error: any) {
        console.error('Admin stats error:', error);
        throw new HTTPException(500, { message: 'Failed to fetch admin stats' });
      }
    }
  );

  return app;
} 