"use client";

import { Message } from "ai";
import {
  Search,
  Link as LinkIcon,
  Loader2,
  X,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { UnifiedMarkdown } from "./UnifiedMarkdown";

interface ScrapingResult {
  url: string;
  title: string;
  content: string;
  timestamp: number;
  metadata?: {
    status: number;
    contentType: string;
    immigrationData?: {
      documentType?: string;
      sourceType?: string;
      credibilityScore?: number;
      countries?: string[];
      visaTypes?: string[];
      requirements?: string[];
      keyPoints?: string[];
    };
  };
}

interface UnifiedWebScraperProps {
  chatId: string;
  append: (message: Message | Message[]) => Promise<void>;
  isLoading: boolean;
  isVisible: boolean;
  className?: string;
}

export function UnifiedWebScraper({
  chatId,
  append,
  isLoading,
  isVisible,
  className,
}: UnifiedWebScraperProps) {
  const [url, setUrl] = useState("");
  const [bulkUrls, setBulkUrls] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrapingResults, setScrapingResults] = useState<ScrapingResult[]>([]);
  const [extractImmigrationData, setExtractImmigrationData] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeView, setActiveView] = useState<"form" | "results">("form");

  const handleSingleScrape = async () => {
    if (!url.trim()) {
      setError("Please enter a URL to scrape");
      return;
    }

    setIsScraping(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 500);

      // In a real implementation, this would be an API call to your backend
      // For now, we'll simulate the API response
      await new Promise((resolve) => setTimeout(resolve, 3000));

      clearInterval(progressInterval);
      setProgress(100);

      // Mock successful scrape
      const newResult: ScrapingResult = {
        url,
        title: `Content from ${url}`,
        content: `This is scraped content from ${url}. In a real implementation, this would contain actual content from the webpage.`,
        timestamp: Date.now(),
        metadata: {
          status: 200,
          contentType: "text/html",
          immigrationData: extractImmigrationData
            ? {
                documentType: "Government Website",
                sourceType: "Official",
                credibilityScore: 95,
                countries: ["United States", "Canada"],
                visaTypes: ["H-1B", "EB-5", "Student Visa"],
                requirements: [
                  "Valid passport",
                  "Completed application form",
                  "Application fee payment",
                  "Supporting documents",
                ],
                keyPoints: [
                  "Processing time: 3-6 months",
                  "Fees vary by visa type",
                  "Medical examination may be required",
                  "Interviews are scheduled after application review",
                ],
              }
            : undefined,
        },
      };

      setScrapingResults((prev) => [newResult, ...prev]);
      setActiveView("results");

      // Create a message to add to the chat
      const message: Message = {
        id: `scrape-${Date.now()}`,
        role: "assistant",
        content: `### Web Scraping Results for ${url}

I've analyzed the content from this URL and found the following information:

${
  extractImmigrationData
    ? `
#### Immigration Data
- Document Type: ${newResult.metadata?.immigrationData?.documentType}
- Source Type: ${newResult.metadata?.immigrationData?.sourceType}
- Credibility Score: ${newResult.metadata?.immigrationData?.credibilityScore}/100
- Countries: ${newResult.metadata?.immigrationData?.countries?.join(", ")}
- Visa Types: ${newResult.metadata?.immigrationData?.visaTypes?.join(", ")}

#### Key Requirements
${newResult.metadata?.immigrationData?.requirements?.map((req) => `- ${req}`).join("\n")}

#### Key Points
${newResult.metadata?.immigrationData?.keyPoints?.map((point) => `- ${point}`).join("\n")}
`
    : newResult.content
}

Would you like me to extract specific information from this content?`,
      };

      await append(message);
      setUrl("");
    } catch (err: any) {
      setError(err.message || "Failed to scrape URL");
    } finally {
      setIsScraping(false);
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

    setIsScraping(true);
    setError(null);
    setProgress(0);

    try {
      let completedCount = 0;
      const results: ScrapingResult[] = [];

      for (const url of urls) {
        // Update progress
        setProgress((completedCount / urls.length) * 100);

        // Simulate API call for each URL
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock successful scrape
        results.push({
          url,
          title: `Content from ${url}`,
          content: `This is scraped content from ${url}. In a real implementation, this would contain actual content from the webpage.`,
          timestamp: Date.now(),
          metadata: {
            status: 200,
            contentType: "text/html",
            immigrationData: extractImmigrationData
              ? {
                  documentType: "Immigration Resource",
                  sourceType: "Information Portal",
                  credibilityScore: 85,
                  countries: ["United States", "Canada"],
                  visaTypes: ["Work Visa", "Student Visa"],
                  requirements: [
                    "Valid passport",
                    "Completed application form",
                    "Application fee payment",
                  ],
                  keyPoints: [
                    "Processing time varies by visa type",
                    "Fees are non-refundable",
                    "Online application preferred",
                  ],
                }
              : undefined,
          },
        });

        completedCount++;
      }

      setProgress(100);
      setScrapingResults((prev) => [...results, ...prev]);
      setActiveView("results");

      // Create a message to add to the chat
      const message: Message = {
        id: `bulk-scrape-${Date.now()}`,
        role: "assistant",
        content: `### Bulk Web Scraping Results

I've analyzed content from ${urls.length} URLs and found the following information:

${results
  .map(
    (result, index) => `
#### URL ${index + 1}: ${result.url}
${
  extractImmigrationData && result.metadata?.immigrationData
    ? `
- Document Type: ${result.metadata.immigrationData.documentType}
- Source Type: ${result.metadata.immigrationData.sourceType}
- Credibility Score: ${result.metadata.immigrationData.credibilityScore}/100
- Visa Types: ${result.metadata.immigrationData.visaTypes?.join(", ")}
`
    : `- Content length: ${result.content.length} characters`
}
`,
  )
  .join("\n")}

Would you like me to analyze this information further?`,
      };

      await append(message);
      setBulkUrls("");
    } catch (err: any) {
      setError(err.message || "Failed to scrape URLs");
    } finally {
      setIsScraping(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`h-full border-l bg-background overflow-auto ${className}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Search className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">Web Scraper</h3>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setActiveView(activeView === "form" ? "results" : "form")
            }
          >
            {activeView === "form" ? "View Results" : "New Scrape"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() =>
              document.dispatchEvent(new CustomEvent("toggle-web-scraper"))
            }
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      {activeView === "form" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Extract Web Content</CardTitle>
            <CardDescription>
              Scrape websites for immigration information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">URL to Scrape</Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/immigration-info"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isScraping}
                  />
                  <Button
                    onClick={handleSingleScrape}
                    disabled={isScraping || !url.trim()}
                  >
                    {isScraping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Scrape"
                    )}
                  </Button>
                </div>
              </div>

              <div className="pt-2 border-t">
                <Label htmlFor="bulk-urls" className="block mb-2">
                  Bulk URLs (one per line)
                </Label>
                <Textarea
                  id="bulk-urls"
                  placeholder="https://example1.com/immigration-info&#10;https://example2.com/visa-info"
                  value={bulkUrls}
                  onChange={(e) => setBulkUrls(e.target.value)}
                  disabled={isScraping}
                  rows={5}
                  className="mb-2"
                />
                <Button
                  onClick={handleBulkScrape}
                  disabled={isScraping || !bulkUrls.trim()}
                  className="w-full"
                >
                  {isScraping ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {isScraping ? "Processing..." : "Scrape All URLs"}
                </Button>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="extract-data"
                  checked={extractImmigrationData}
                  onCheckedChange={setExtractImmigrationData}
                  disabled={isScraping}
                />
                <Label htmlFor="extract-data">Extract immigration data</Label>
              </div>
            </div>

            {isScraping && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Scraping in progress...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <h3 className="font-medium">
            Scraping Results ({scrapingResults.length})
          </h3>

          {scrapingResults.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              No results yet. Start scraping to see content here.
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-120px)]">
              <div className="space-y-4 pr-4">
                {scrapingResults.map((result, index) => (
                  <Card
                    key={`${result.url}-${index}`}
                    className="overflow-hidden"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline overflow-hidden text-ellipsis"
                        >
                          {result.url}
                        </a>
                      </CardTitle>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {new Date(result.timestamp).toLocaleString()}
                        </Badge>
                        {result.metadata?.immigrationData && (
                          <Badge variant="secondary" className="text-xs">
                            Score:{" "}
                            {result.metadata.immigrationData.credibilityScore}%
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      {result.metadata?.immigrationData ? (
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium">Type:</span>{" "}
                            {result.metadata.immigrationData.documentType} (
                            {result.metadata.immigrationData.sourceType})
                          </div>
                          {result.metadata.immigrationData.countries && (
                            <div>
                              <span className="font-medium">Countries:</span>{" "}
                              {result.metadata.immigrationData.countries.join(
                                ", ",
                              )}
                            </div>
                          )}
                          {result.metadata.immigrationData.visaTypes && (
                            <div>
                              <span className="font-medium">Visa Types:</span>{" "}
                              {result.metadata.immigrationData.visaTypes.join(
                                ", ",
                              )}
                            </div>
                          )}
                          {result.metadata.immigrationData.requirements && (
                            <div>
                              <span className="font-medium">Requirements:</span>
                              <ul className="list-disc pl-5">
                                {result.metadata.immigrationData.requirements.map(
                                  (req, i) => (
                                    <li key={i}>{req}</li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <UnifiedMarkdown
                          content={result.content.substring(0, 200) + "..."}
                        />
                      )}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-xs mt-2"
                        onClick={() => {
                          // Add this result to the chat
                          const message: Message = {
                            id: `result-${Date.now()}`,
                            role: "assistant",
                            content: `I've added the content from ${result.url} to our conversation. Would you like me to summarize the key points?`,
                          };
                          append(message);
                        }}
                      >
                        Add to chat
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      )}
    </div>
  );
}
