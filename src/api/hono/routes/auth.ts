import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { setCookie, deleteCookie } from 'hono/cookie';
import { requireAuth } from '../middleware/supabase';

// Create a Hono app for auth routes
export const authRoutes = new Hono();

// Schema for sign up validation
const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

// Schema for sign in validation
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Sign up endpoint
authRoutes.post(
  '/signup',
  zValidator('json', signUpSchema),
  async (c) => {
    try {
      const { email, password, firstName, lastName } = c.req.valid('json');
      const supabase = c.get('supabase');

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (authError) throw new Error(authError.message);

      // Create user profile in database
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authData.user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            created_at: new Date().toISOString(),
          });

        if (profileError) {
          // Roll back user creation if profile creation fails
          await supabase.auth.admin.deleteUser(authData.user.id);
          throw new Error(profileError.message);
        }
      }

      return c.json({
        success: true,
        message: 'User created successfully. Please check your email for confirmation.',
        user: authData.user,
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Sign in endpoint
authRoutes.post(
  '/signin',
  zValidator('json', signInSchema),
  async (c) => {
    try {
      const { email, password } = c.req.valid('json');
      const supabase = c.get('supabase');

      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      // Set auth cookies
      if (data.session) {
        setCookie(c, 'access_token', data.session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          maxAge: data.session.expires_in,
          path: '/',
        });

        setCookie(c, 'refresh_token', data.session.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        });
      }

      return c.json({
        success: true,
        user: data.user,
        session: {
          ...data.session,
          // Include only needed session data for client
          access_token: data.session?.access_token,
          expires_at: data.session?.expires_at,
        }
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      return c.json({
        success: false,
        error: error.message || 'An unknown error occurred',
      }, 500);
    }
  }
);

// Sign out endpoint
authRoutes.post('/signout', async (c) => {
  try {
    const supabase = c.get('supabase');
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Sign out from Supabase Auth
    const { error } = token 
      ? await supabase.auth.signOut({ scope: 'global' })
      : await supabase.auth.signOut();
      
    if (error) throw new Error(error.message);

    // Clear auth cookies
    deleteCookie(c, 'access_token');
    deleteCookie(c, 'refresh_token');

    return c.json({
      success: true,
      message: 'User signed out successfully',
    });
  } catch (error: any) {
    console.error('Sign out error:', error);
    return c.json({
      success: false,
      error: error.message || 'An unknown error occurred',
    }, 500);
  }
});

// Get user profile endpoint - Protected route
authRoutes.get('/profile', requireAuth, async (c) => {
  try {
    const supabase = c.get('supabase');
    const user = c.get('user');

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw new Error(profileError.message);

    return c.json({
      success: true,
      user,
      profile,
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    return c.json({
      success: false,
      error: error.message || 'An unknown error occurred',
    }, 500);
  }
});

// Update user profile endpoint - Protected route
authRoutes.put('/profile', requireAuth, async (c) => {
  try {
    const supabase = c.get('supabase');
    const user = c.get('user');
    const body = await c.req.json();

    // Update user profile in database
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .update({
        first_name: body.firstName,
        last_name: body.lastName,
        avatar_url: body.avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single();

    if (profileError) throw new Error(profileError.message);

    return c.json({
      success: true,
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return c.json({
      success: false,
      error: error.message || 'An unknown error occurred',
    }, 500);
  }
}); 