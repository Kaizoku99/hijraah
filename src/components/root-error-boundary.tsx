'use client';

import { ErrorBoundary } from '@/components/error-boundary';
import { ReactNode } from 'react';

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