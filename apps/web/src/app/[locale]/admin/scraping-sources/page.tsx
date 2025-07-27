'use client';

import { useParams } from 'next/navigation';
import { redirect } from 'next/navigation'; // Use next-intl redirect later if needed
import { useEffect } from 'react';

import { useIsAdmin } from '@/hooks/useIsAdmin';


export default function AdminScrapingSourcesPage() {
    const params = useParams();
    const locale = params.locale || 'en'; // Fallback locale
    const { isAdmin, isLoading } = useIsAdmin();

    useEffect(() => {
        // Redirect if not admin and not loading
        if (!isLoading && !isAdmin) {
            redirect(`/${locale}/dashboard`); // Redirect to dashboard or an unauthorized page
        }
    }, [isAdmin, isLoading, locale]);

    // Show loading state or null if redirecting
    if (isLoading || !isAdmin) {
        return <div className="p-4">Loading or checking admin status...</div>; // Or a proper loading component
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Admin: Scraping Sources Page</h1>
            <p>Current Locale: {locale.toString()}</p>
            {/* Add actual admin scraping sources content here */}
        </div>
    );
} 