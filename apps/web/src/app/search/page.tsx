'use client';

import { SearchDocuments } from '@/ui/SearchDocuments';

export default function SearchPage() {
    return (
        <div className="container py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Semantic Document Search</h1>
                <p className="text-muted-foreground mb-8">
                    Search for documents using natural language. Our AI-powered search understands the meaning behind your query.
                </p>

                <SearchDocuments />
            </div>
        </div>
    );
} 