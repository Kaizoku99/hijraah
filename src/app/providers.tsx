"use client";

import { AuthProvider } from '@/contexts/auth';
import { Toaster } from 'sonner';
import { SessionProvider } from '@/components/session-provider';
import { DeepResearchProvider } from '@/lib/deep-research-context';
import { ErrorBoundary } from '@/components/error-boundary';
import { toast } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { SearchProvider } from '@/lib/contexts/search-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      onError={(error) => {
        console.error('Application error:', error);
        toast.error('An unexpected error occurred');
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <SessionProvider>
            <SearchProvider>
              <DeepResearchProvider>
                {children}
                <Toaster />
              </DeepResearchProvider>
            </SearchProvider>
          </SessionProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}