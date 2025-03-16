"use client";

import { AuthProvider } from '@/contexts/auth';
import { Toaster } from 'sonner';
import { SessionProvider } from '@/components/session-provider';
import { DeepResearchProvider } from '@/lib/deep-research-context';
import { ErrorBoundary } from '@/components/error-boundary';
import { toast } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { SearchProvider } from '@/lib/contexts/search-context';
import { CustomToastProvider } from '@/components/ui/toast';
import { Onboarding } from '@/components/onboarding/Onboarding';
// Import the new auth provider (commented during migration)
// import { AuthProvider as UnifiedAuthProvider } from '@/lib/auth/hooks';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      onError={(error) => {
        console.error('Application error:', error);
        toast.error('An unexpected error occurred');
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* 
          TODO: Phase 1 of Auth Migration
          Replace the current AuthProvider with the new UnifiedAuthProvider
          when ready to switch over. For now, we'll keep both implementations
          available.
          
          <UnifiedAuthProvider>
            {/* Remove SessionProvider once UnifiedAuthProvider is active */}
        <AuthProvider>
          <SessionProvider>
            <SearchProvider>
              <DeepResearchProvider>
                <CustomToastProvider>
                  <Onboarding>
                    {children}
                  </Onboarding>
                </CustomToastProvider>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: { background: 'var(--background)', color: 'var(--foreground)' },
                    className: 'border border-border',
                  }}
                  closeButton
                  richColors
                />
              </DeepResearchProvider>
            </SearchProvider>
          </SessionProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}