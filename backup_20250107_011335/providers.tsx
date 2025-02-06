"use client";

import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from './providers/ApolloProvider';
import { AuthProvider } from '@/contexts/auth';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <ApolloProvider>
          {children}
          <Toaster />
        </ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}