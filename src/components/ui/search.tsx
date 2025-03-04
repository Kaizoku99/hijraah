'use client';

import * as React from 'react';
import { useSearch } from '@/lib/contexts/search-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, Loader2, XCircleIcon } from 'lucide-react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { useHotkeys } from 'react-hotkeys-hook';
import { cn } from '@/lib/utils';

export function Search() {
    const [open, setOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const {
        query,
        setQuery,
        isLoading,
        suggestions,
        aiSuggestions,
        handleSearch,
        clearSearch,
    } = useSearch();

    // Toggle the command palette with Cmd+K or Ctrl+K
    useHotkeys(['meta+k', 'ctrl+k'], (e) => {
        e.preventDefault();
        setOpen((open) => !open);
    });

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSearch(e);
        inputRef.current?.blur();
    };

    return (
        <>
            <form
                onSubmit={onSubmit}
                className="relative flex w-full max-w-sm items-center space-x-2"
                role="search"
            >
                <Input
                    ref={inputRef}
                    type="search"
                    placeholder="Search documents, requirements..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={cn(
                        'h-9 w-9 rounded-full pl-8 pr-4 focus-visible:w-64 xl:w-64',
                        'transition-all duration-300 ease-in-out',
                        'focus-visible:rounded-md',
                    )}
                    aria-label="Search"
                    aria-expanded={open}
                    aria-controls="search-results"
                    aria-describedby="search-desc"
                />
                <SearchIcon
                    className="absolute left-2.5 h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                />
                {query && !isLoading && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 h-6 w-6"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >
                        <XCircleIcon className="h-4 w-4" />
                    </Button>
                )}
                {isLoading && (
                    <Loader2
                        className="absolute right-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                    />
                )}
                <span className="sr-only" id="search-desc">
                    Press ⌘K to open search
                </span>
            </form>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Type a command or search..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList id="search-results">
                    <CommandEmpty>No results found.</CommandEmpty>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-6">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    ) : (
                        <>
                            {suggestions.length > 0 && (
                                <CommandGroup heading="Quick Links">
                                    {suggestions.map((suggestion) => (
                                        <CommandItem
                                            key={suggestion}
                                            onSelect={() => setQuery(suggestion)}
                                        >
                                            {suggestion}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                            {aiSuggestions.length > 0 && (
                                <>
                                    <CommandSeparator />
                                    <CommandGroup heading="AI Suggestions">
                                        {aiSuggestions.map((suggestion) => (
                                            <CommandItem
                                                key={suggestion}
                                                onSelect={() => setQuery(suggestion)}
                                            >
                                                {suggestion}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </>
                            )}
                        </>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
}