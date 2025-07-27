'use client';

import { ReactNode } from 'react';

import { ErrorBoundary } from '@/components/ui/error-boundary';

interface RootErrorBoundaryProps {
    children: ReactNode;
}

export function RootErrorBoundary({ children }: RootErrorBoundaryProps) {
    return (
        <ErrorBoundary
            onError={(error, errorInfo) => {
                // Log error to monitoring service
                console.error('Root error boundary caught error:', error, errorInfo);
            }}
        >
            {children}
        </ErrorBoundary>
    );
} 