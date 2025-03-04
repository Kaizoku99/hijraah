'use client';

import React, { createContext, useContext, useState } from 'react';
import { useCompletion } from 'ai/react';
import { useRouter } from 'next/navigation';

// Define available routes as a simple string array
const VALID_ROUTES = [
    '/',
    '/documents',
    '/chat',
    '/requirements',
    '/calculator',
    '/notifications',
    '/profile',
    '/settings',
] as const;

interface SearchContextType {
    query: string;
    setQuery: (query: string) => void;
    isLoading: boolean;
    suggestions: string[];
    aiSuggestions: string[];
    handleSearch: (e: React.FormEvent) => Promise<void>;
    clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const { completion, complete, isLoading } = useCompletion({
        api: '/api/search',
        onResponse: (response) => {
            // Handle streaming response
            console.log('AI response:', response);
        },
    });

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            // Get AI suggestions
            const aiResponse = await complete(query);

            // Validate and navigate if it's a valid route
            if (aiResponse && VALID_ROUTES.includes(aiResponse as typeof VALID_ROUTES[number])) {
                // Using window.location for direct navigation
                window.location.href = aiResponse;
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setSuggestions([]);
    };

    const value = {
        query,
        setQuery,
        isLoading,
        suggestions,
        aiSuggestions: completion ? [completion] : [],
        handleSearch,
        clearSearch,
    };

    return (
        <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
    );
}

export function useSearchContext() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
}