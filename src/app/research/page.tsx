'use client';

import { useState } from 'react';
import { DeepResearch } from '@/features/research/components/DeepResearch';
import { ResearchProcessor } from '@/features/research/lib/processor';
import { toast } from 'sonner';

const researchProcessor = new ResearchProcessor(
    process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default function ResearchPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string | null>(null);

    const handleResearch = async (query: string, options: {
        country?: string;
        category?: string;
        depth: 'basic' | 'detailed' | 'comprehensive';
    }) => {
        setIsLoading(true);
        try {
            const research = await researchProcessor.deepResearch(query, options);
            setResults(research);
            toast.success('Research completed successfully');
        } catch (error) {
            console.error('Research error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to complete research');
            setResults('Failed to complete research. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Deep Immigration Research</h1>
            <DeepResearch
                onResearch={handleResearch}
                isLoading={isLoading}
                results={results}
            />
        </div>
    );
} 