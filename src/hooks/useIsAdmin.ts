import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { getSupabaseClient } from '@/lib/supabase/client';

export function useIsAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from('auth.users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }

      setIsLoading(false);
    }

    checkAdminStatus();
  }, [user]);

  return { isAdmin, isLoading };
} 