import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState, useEffect } from "react";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Skeleton } from "@/ui/skeleton";

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
  const [query, setQuery] = useQueryState("q", { defaultValue: "" });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (currentQuery: string) => {
    if (!currentQuery.trim()) {
      setResults([]); // Clear results if query is empty
      setError(null);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(currentQuery)}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Search failed");
      }

      const data = await response.json();
      setResults(data.results);

      if (data.results.length === 0) {
        setError("No documents found matching your query");
      }
    } catch (err: any) {
      console.error("Search error:", err);
      setError(err.message || "An error occurred during search");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    // Perform search if query is not empty.
    // This handles initial load with query param and subsequent query changes.
    if (query.trim()) {
      performSearch(query);
    } else {
      // Optionally, clear results if query becomes empty (e.g., user clears input)
      // setResults([]);
      // setError(null);
    }
  }, [query]); // Rerun effect when query from URL changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // The query state is already updated by the input's onChange.
    // The useEffect will trigger the search.
    // If you want to force a search on submit even if the query hasn't changed
    // (e.g. to re-fetch), you could call performSearch(query) here.
    // For now, relying on useEffect is cleaner.
    if (!query.trim()) {
      // Prevent search if query is empty on submit
      setResults([]);
      setError(null);
    } else {
      // setQuery will update the URL, and useEffect will trigger performSearch
      // If the user presses enter on the same query, it won't re-trigger useEffect
      // unless the `query` value itself changed.
      // To ensure search always happens on submit:
      performSearch(query);
    }
  };

  const handleViewDocument = (id: string) => {
    router.push(`/documents/${id}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search documents semantically..."
          value={query} // query is now a string due to defaultValue
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isSearching}>
          {isSearching ? "Searching..." : <Search className="h-4 w-4 mr-2" />}
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
        <div className="text-center py-8 text-muted-foreground">{error}</div>
      )}

      {!isSearching && results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <Card
              key={result.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleViewDocument(result.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{result.title}</CardTitle>
                  <Badge
                    variant={
                      result.visibility === "public" ? "default" : "outline"
                    }
                  >
                    {result.visibility}
                  </Badge>
                </div>
                <CardDescription>
                  Relevance: {Math.round(result.similarity * 100)}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {result.content?.text?.substring(0, 200) ||
                    "No preview available"}
                  ...
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm">
                  View Document
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
