import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useOnboarding } from "./OnboardingProvider";

export function OnboardingDebug() {
  const { onboarding, resetOnboarding } = useOnboarding();
  const [isVisible, setIsVisible] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  );

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  if (!isVisible) {
    return (
      <button
        className="fixed bottom-4 right-4 bg-yellow-500 p-2 rounded z-50 text-xs"
        onClick={() => setIsVisible(true)}
      >
        Debug Onboarding
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card border shadow-lg p-4 rounded z-50 max-w-md">
      <h3 className="font-medium mb-2">Onboarding Debug</h3>
      <pre className="text-xs overflow-auto max-h-96">
        {JSON.stringify(onboarding, null, 2)}
      </pre>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-destructive text-destructive-foreground p-1 rounded text-xs"
          onClick={resetOnboarding}
        >
          Reset Onboarding
        </button>
        <button
          className="bg-muted p-1 rounded text-xs"
          onClick={() => setIsVisible(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
