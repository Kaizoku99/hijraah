import { Loader2, AlertCircle, Link, ExternalLink, Info } from "lucide-react";
import NextLink from "next/link";
import React, { useState, useCallback } from "react";

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
import { DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHijraahApi } from "@/hooks/useHijarahApi";
import { ScrapeHistoryEntry } from "@/types/api";
import { useToast } from "@/ui/use-toast";

export function WebScraper() {
  const [url, setUrl] = useState("");
  const [bulkUrls, setBulkUrls] = useState("");
  const [selector, setSelector] = useState("");
  const [saveToStorage, setSaveToStorage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { scraping } = useHijraahApi();

  const handleSingleScrape = async () => {
    if (!url) {
      setError("Please enter a URL to scrape");
      return;
    }

    setIsLoading(true);
    setError(null);
    setContent(null);

    try {
      const { data, error } = await scraping.scrapeUrl(
        url,
        selector,
        saveToStorage,
      );

      if (error) {
        throw new Error(error);
      }

      if (data) {
        setContent(data.content);
      }
    } catch (err: any) {
      setError(err.message || "Failed to scrape URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkScrape = async () => {
    if (!bulkUrls.trim()) {
      setError("Please enter URLs to scrape");
      return;
    }

    const urls = bulkUrls
      .split(/[\n,]/)
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (urls.length === 0) {
      setError("No valid URLs found");
      return;
    }

    setIsLoading(true);
    setError(null);
    setContent(null);

    try {
      const { data, error } = await scraping.bulkScrape(
        urls,
        selector,
        saveToStorage,
      );

      if (error) {
        throw new Error(error);
      }

      if (data) {
        // Format the results as a summary
        const successCount = data.results.filter((r) => r.success).length;
        const failureCount = data.results.length - successCount;

        const summary = `
# Scraping Results

Successfully scraped ${successCount} of ${data.results.length} URLs.
${failureCount > 0 ? `Failed to scrape ${failureCount} URLs.` : ""}

## Details

${data.results
  .map(
    (result, index) => `
### URL ${index + 1}: ${result.url}
Status: ${result.success ? "✅ Success" : "❌ Failed"}
${result.error ? `Error: ${result.error}` : ""}
${result.storageUrl ? `Storage URL: ${result.storageUrl}` : ""}
`,
  )
  .join("\n")}
`;

        setContent(summary);
      }
    } catch (err: any) {
      setError(err.message || "Failed to scrape URLs");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Web Scraper</CardTitle>
        <CardDescription>
          Extract content from websites for your research
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="single">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single URL</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Scraping</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL to Scrape</Label>
              <div className="flex items-center">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/page-to-scrape"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground ml-1 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Enter the full URL (e.g., https://example.com/article).
                      Don&apos;t use shortlinks.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="selector">CSS Selector (Optional)</Label>
              <Input
                id="selector"
                placeholder="article, .content, #main-content"
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Target a specific element on the page. Leave empty to extract
                all content.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="save-storage"
                checked={saveToStorage}
                onCheckedChange={setSaveToStorage}
              />
              <Label htmlFor="save-storage">
                Save to storage for later use
              </Label>
            </div>

            <Button
              onClick={handleSingleScrape}
              disabled={isLoading || !url}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Scrape URL
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="bulk-urls">
                URLs to Scrape (one per line or comma-separated)
              </Label>
              <Textarea
                id="bulk-urls"
                placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bulk-selector">CSS Selector (Optional)</Label>
              <Input
                id="bulk-selector"
                placeholder="article, .content, #main-content"
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="bulk-save-storage"
                checked={saveToStorage}
                onCheckedChange={setSaveToStorage}
              />
              <Label htmlFor="bulk-save-storage">
                Save to storage for later use
              </Label>
            </div>

            <Button
              onClick={handleBulkScrape}
              disabled={isLoading || !bulkUrls.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scraping URLs...
                </>
              ) : (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Scrape All URLs
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {content && (
          <div className="mt-4">
            <Alert>
              <div className="flex justify-between items-center w-full">
                <AlertTitle>Content Scraped Successfully</AlertTitle>
              </div>
            </Alert>
            <div className="mt-2 p-4 bg-gray-50 rounded-md border overflow-auto max-h-[400px]">
              <pre className="whitespace-pre-wrap text-sm">{content}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ScrapingHistory() {
  const [history, setHistory] = useState<ScrapeHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { scraping } = useHijraahApi();

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await scraping.getHistory();

      if (error) {
        throw new Error(error);
      }

      if (data?.history) {
        setHistory(data.history);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load scraping history");
    } finally {
      setIsLoading(false);
    }
  }, [scraping]);

  // Load history on component mount
  React.useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleDeleteEntry = async (id: string) => {
    try {
      const { error } = await scraping.deleteHistoryEntry(id);

      if (error) {
        throw new Error(error);
      }

      // Remove the deleted entry from state
      setHistory(history.filter((entry) => entry.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete history entry");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (history.length === 0) {
    return (
      <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No History</AlertTitle>
        <AlertDescription>
          You haven&apos;t scraped any content yet.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Scraping History</h3>
        <Button variant="outline" size="sm" onClick={loadHistory}>
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {history.map((entry) => (
          <Card key={entry.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base truncate">
                  {entry.title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  <span className="sr-only">Delete</span>
                  <AlertCircle className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="truncate">
                {entry.url}
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-2 flex justify-between">
              <span className="text-xs text-muted-foreground">
                {new Date(entry.created_at).toLocaleString()}
              </span>
              {entry.public_url && (
                <NextLink href={entry.public_url} passHref legacyBehavior>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex items-center"
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Content
                    </a>
                  </Button>
                </NextLink>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
