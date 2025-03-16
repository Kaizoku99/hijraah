import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import { createClient } from '@supabase/supabase-js';
import type { Context } from 'hono';

/**
 * Authentication routes for user management
 */
export function setupAuthRoutes(app: Hono) {
  // Validation schemas
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
  });

  const resetPasswordSchema = z.object({
    email: z.string().email(),
  });

  // Initialize Supabase client
  const getSupabase = () => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
  };

  // Login route
  app.post('/auth/login', 
    async (c: Context) => {
      try {
        // Manual validation
        const body = await c.req.json();
        const result = loginSchema.safeParse(body);
        
        if (!result.success) {
          throw new HTTPException(400, { message: 'Invalid login credentials' });
        }
        
        const { email, password } = result.data;
        const supabase = getSupabase();
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        return c.json({
          success: true,
          session: data.session,
          user: data.user,
        });
      } catch (error: any) {
        console.error('Login error:', error);
        if (error instanceof HTTPException) {
          throw error;
        }
        throw new HTTPException(401, { message: error.message || 'Login failed' });
      }
    }
  );
  
  // Register route
  app.post('/auth/register', 
    async (c: Context) => {
      try {
        // Manual validation
        const body = await c.req.json();
        const result = registerSchema.safeParse(body);
        
        if (!result.success) {
          throw new HTTPException(400, { message: 'Invalid registration data' });
        }
        
        const { email, password, firstName, lastName } = result.data;
        const supabase = getSupabase();
        
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (authError) throw authError;
        
        if (authData.user && (firstName || lastName)) {
          // Create profile record with additional data
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: authData.user.id,
              first_name: firstName,
              last_name: lastName,
              updated_at: new Date().toISOString(),
            });
            
          if (profileError) throw profileError;
        }
        
        return c.json({
          success: true,
          message: 'Registration successful',
          user: authData.user,
        });
      } catch (error: any) {
        console.error('Registration error:', error);
        if (error instanceof HTTPException) {
          throw error;
        }
        throw new HTTPException(400, { message: error.message || 'Registration failed' });
      }
    }
  );
  
  // Logout route - doesn't need middleware as it just has to invalidate token
  app.post('/auth/logout', async (c: Context) => {
    try {
      const supabase = getSupabase();
      
      const authHeader = c.req.header('Authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        await supabase.auth.signOut({ scope: 'global' });
      }
      
      return c.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      // Always return success even if there's an error
      return c.json({
        success: true,
        message: 'Logged out successfully',
      });
    }
  });
  
  // Password reset request
  app.post('/auth/reset-password', 
    async (c: Context) => {
      try {
        // Manual validation
        const body = await c.req.json();
        const result = resetPasswordSchema.safeParse(body);
        
        if (!result.success) {
          throw new HTTPException(400, { message: 'Invalid email' });
        }
        
        const { email } = result.data;
        const supabase = getSupabase();
        
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
        });
        
        if (error) throw error;
        
        return c.json({
          success: true,
          message: 'Password reset email sent',
        });
      } catch (error: any) {
        console.error('Password reset error:', error);
        // Don't reveal if email exists for security reasons
        return c.json({
          success: true,
          message: 'If the email exists, a password reset link has been sent',
        });
      }
    }
  );

  return app;
}