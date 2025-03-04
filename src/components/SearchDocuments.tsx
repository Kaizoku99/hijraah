import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
    id: string;
    title: string;
    content: any;
    type: string;
    visibility: string;
    similarity: number;
}

export function SearchDocuments() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!query.trim()) return;

        setIsSearching(true);
        setError(null);

        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Search failed');
            }

            const data = await response.json();
            setResults(data.results);

            if (data.results.length === 0) {
                setError('No documents found matching your query');
            }
        } catch (err: any) {
            console.error('Search error:', err);
            setError(err.message || 'An error occurred during search');
        } finally {
            setIsSearching(false);
        }
    };

    const handleViewDocument = (id: string) => {
        router.push(`/documents/${id}`);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <Input
                    type="text"
                    placeholder="Search documents semantically..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" disabled={isSearching}>
                    {isSearching ? 'Searching...' : <Search className="h-4 w-4 mr-2" />}
                    Search
                </Button>
            </form>

            {isSearching && (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="pb-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-3 w-full mb-2" />
                                <Skeleton className="h-3 w-full mb-2" />
                                <Skeleton className="h-3 w-2/3" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {error && !isSearching && (
                <div className="text-center py-8 text-muted-foreground">
                    {error}
                </div>
            )}

            {!isSearching && results.length > 0 && (
                <div className="space-y-4">
                    {results.map((result) => (
                        <Card key={result.id} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleViewDocument(result.id)}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{result.title}</CardTitle>
                                    <Badge variant={result.visibility === 'public' ? 'default' : 'outline'}>
                                        {result.visibility}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    Relevance: {Math.round(result.similarity * 100)}%
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {result.content?.text?.substring(0, 200) || 'No preview available'}...
                                </p>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="ghost" size="sm">View Document</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
} 