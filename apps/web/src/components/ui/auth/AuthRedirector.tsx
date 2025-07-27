"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useOnboarding } from "@/components/ui/onboarding/OnboardingProvider";
import { useAuth } from "@/lib/auth/hooks";
import { createClient } from "@/lib/supabase/client";

export function AuthRedirector() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();
  const { onboarding } = useOnboarding();

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      if (user) {
        // Check if user has an onboarding record
        const { data, error } = await supabase
          .from("user_onboarding")
          .select("is_completed")
          .eq("user_id", user.id)
          .single();

        // New user without onboarding record or incomplete onboarding
        if (error || !data || !data.is_completed) {
          console.log("User needs onboarding, forcing reload for:", user.id);
          // Force a reload of the onboarding state
          window.location.href = "/dashboard"; // This forces a full page reload
        }
      }
    };

    checkUserAndRedirect();
  }, [user, supabase, router]);

  return null;
}
