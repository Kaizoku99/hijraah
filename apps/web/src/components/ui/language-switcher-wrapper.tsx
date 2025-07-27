'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import { Skeleton } from '@/ui/skeleton';

// Dynamically import the LanguageSwitcher component
// This ensures it's only loaded on the client side
const LanguageSwitcher = dynamic(
    () => import('./language-switcher'),
    {
        ssr: false,
        loading: () => (
            <Skeleton
                className="h-9 w-9 rounded-full"
                aria-label="Loading language switcher"
            />
        ),
    }
);

export default function LanguageSwitcherWrapper() {
    return <LanguageSwitcher />;
} 