'use client';

import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layouts/main-layout';

export default function HomePage() {
    // Use a try-catch to handle potential missing translations
    let title = 'Welcome to Hijraah';
    let description = 'Compare immigration policies across countries with AI-powered insights';

    try {
        const t = useTranslations('Home');
        title = t('title');
        description = t('description');
    } catch (error) {
        console.error('Translation error:', error);
        // Fallback values are already set
    }

    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="mt-3 text-xl">{description}</p>
            </div>
        </MainLayout>
    );
}