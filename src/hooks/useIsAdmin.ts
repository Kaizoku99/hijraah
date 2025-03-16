import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { checkUserIsAdmin } from '@/lib/actions/admin';

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
        // Use the server action to check admin status
        const { isAdmin: adminStatus } = await checkUserIsAdmin(user.id);
        setIsAdmin(adminStatus);
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