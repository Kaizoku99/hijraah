import { Loader2, AlertCircle, Search, Plus, Info } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useHijraahApi } from "@/hooks/useHijarahApi";
import { EmbeddingResult } from "@/types/api";

export function VectorSearchComponent() {
  const [query, setQuery] = useState("");
  const [threshold, setThreshold] = useState(0.7);
  const [limit, setLimit] = useState(10);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<EmbeddingResult[]>([]);
  const { vectorSearch } = useHijraahApi();
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setError(null);
    setResults([]);

    try {
      const { data, error } = await vectorSearch.search(
        query,
        limit,
        threshold,
      );

      if (error) {
        throw new Error(error);
      }

      if (data?.results) {
        setResults(data.results);

        if (data.results.length === 0) {
          toast({
            title: "No results",
            description:
              "No matching results found. Try adjusting the similarity threshold or your query.",
            variant: "default",
          });
        }
      }
    } catch (err: any) {
      setError(err.message || "Search failed");
      toast({
        title: "Error",
        description: err.message || "Failed to perform vector search",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vector Search</CardTitle>
        <CardDescription>
          Search for semantic similarity across your stored content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="query">Search Query</Label>
          <Textarea
            id="query"
            placeholder="Enter your semantic search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="threshold">Similarity Threshold</Label>
              <span className="text-sm text-muted-foreground">
                {threshold.toFixed(2)}
              </span>
            </div>
            <Slider
              id="threshold"
              min={0.5}
              max={0.95}
              step={0.01}
              defaultValue={[threshold]}
              onValueChange={(values) => setThreshold(values[0])}
            />
            <p className="text-xs text-muted-foreground">
              Higher values require closer matches
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="limit">Result Limit</Label>
              <span className="text-sm text-muted-foreground">{limit}</span>
            </div>
            <Slider
              id="limit"
              min={1}
              max={50}
              step={1}
              defaultValue={[limit]}
              onValueChange={(values) => setLimit(values[0])}
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of results to return
            </p>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="w-full"
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Search Results</h3>
            <div className="grid gap-3">
              {results.map((result) => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ResultCardProps {
  result: EmbeddingResult;
}

function ResultCard({ result }: ResultCardProps) {
  const truncateContent = (content: string, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">
            {result.metadata?.title || "Untitled Content"}
          </CardTitle>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {(result.similarity * 100).toFixed(1)}% Match
          </span>
        </div>
        <CardDescription className="text-xs">
          {result.metadata?.source || "Unknown source"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">
          {truncateContent(result.content)}
        </p>
      </CardContent>
    </Card>
  );
}

export function ContentEmbedder() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [collection, setCollection] = useState("default");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { vectorSearch } = useHijraahApi();
  const { toast } = useToast();

  const handleCreateEmbedding = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to embed",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const metadata = {
        title: title || "Untitled",
        source: "manual-entry",
        createdAt: new Date().toISOString(),
      };

      const { data, error } = await vectorSearch.createEmbedding(
        content,
        metadata,
        collection,
      );

      if (error) {
        throw new Error(error);
      }

      setSuccess(`Content successfully embedded with ID: ${data?.embeddingId}`);
      toast({
        title: "Success",
        description: "Content was successfully embedded for vector search",
        variant: "default",
      });

      // Clear form
      setContent("");
      setTitle("");
    } catch (err: any) {
      setError(err.message || "Failed to create embedding");
      toast({
        title: "Error",
        description: err.message || "Failed to embed content",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Content for Vector Search</CardTitle>
        <CardDescription>
          Create embeddings from text content for semantic search
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Content Title</Label>
          <Input
            id="title"
            placeholder="Give your content a descriptive title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content to Embed</Label>
          <Textarea
            id="content"
            placeholder="Enter the text content you want to make searchable..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="collection">Collection ID (Optional)</Label>
          <Input
            id="collection"
            placeholder="default"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          />
          <div className="text-sm text-muted-foreground mb-4">
            <p>
              Collections help organize your embeddings. Leave as
              &quot;default&quot; unless you need separation.
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleCreateEmbedding}
          disabled={isSubmitting || !content.trim()}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create Embedding
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
