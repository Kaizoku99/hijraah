"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster, toast } from "sonner";

import { Onboarding } from "@/components/ui/onboarding/Onboarding";
import { AuthProvider } from "@/lib/auth/hooks";
import { DeepResearchProvider } from "@/lib/contexts/deep-research-context";
import { SearchProvider } from "@/lib/contexts/search-context";
import { CustomToastProvider } from "@/ui/toast";
import { TooltipProvider } from "@/ui/tooltip";

// Simple fallback component for errors
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800">
    <h2 className="text-lg font-bold">Something went wrong</h2>
    <p>{error.message}</p>
  </div>
);

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SearchProvider>
              <DeepResearchProvider>
                <CustomToastProvider>
                  <Onboarding>{children}</Onboarding>
                </CustomToastProvider>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: "var(--background)",
                      color: "var(--foreground)",
                    },
                    className: "border border-border",
                  }}
                  closeButton
                  richColors
                />
              </DeepResearchProvider>
            </SearchProvider>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
