'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchContext } from '@/lib/contexts/search-context';

export function SearchBar() {
    const { query, setQuery, handleSearch, isLoading } = useSearchContext();

    return (
        <form onSubmit={handleSearch} className="relative hidden md:block w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full bg-background pl-8 md:w-60 lg:w-72"
            />
            {isLoading && (
                <div className="absolute right-2.5 top-2.5">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                </div>
            )}
        </form>
    );
} 