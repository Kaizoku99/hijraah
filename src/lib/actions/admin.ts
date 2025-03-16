'use server';

import { createClient } from '@/lib/supabase/server';
import { getServiceClient } from '@/lib/supabase/client';
import { cookies } from 'next/headers';

/**
 * Server action to check if a user is an admin
 * This uses the service role key (only on server) to securely check the user's role
 */
export async function checkUserIsAdmin(userId: string | undefined): Promise<{ isAdmin: boolean }> {
  if (!userId) {
    return { isAdmin: false };
  }

  try {
    // Create a Supabase client using the service role for admin access
    const supabase = getServiceClient();
    
    // Verify the user exists and is authenticated using getUser instead of session data
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId);
    
    if (userError || !user) {
      console.error('Error verifying user:', userError);
      return { isAdmin: false };
    }
    
    // Query the admin_users table to check admin status
    const { data, error } = await supabase
      .from('admin_users')
      .select('is_admin')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
      return { isAdmin: false };
    }

    return { isAdmin: !!data?.is_admin };
  } catch (error) {
    console.error('Exception checking admin status:', error);
    return { isAdmin: false };
  }
} 