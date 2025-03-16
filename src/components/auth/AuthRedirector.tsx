import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useOnboarding } from '@/components/onboarding/OnboardingProvider';

export function AuthRedirector() {
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
    const { onboarding } = useOnboarding();

    useEffect(() => {
        const checkUserAndRedirect = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Check if user has an onboarding record
                const { data, error } = await supabase
                    .from('user_onboarding')
                    .select('is_completed')
                    .eq('user_id', user.id)
                    .single();

                // New user without onboarding record or incomplete onboarding
                if (error || !data || !data.is_completed) {
                    console.log('User needs onboarding, forcing reload for:', user.id);
                    // Force a reload of the onboarding state
                    window.location.href = '/dashboard';  // This forces a full page reload
                }
            }
        };

        checkUserAndRedirect();
    }, [supabase, router]);

    return null;
}
