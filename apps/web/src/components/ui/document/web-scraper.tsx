"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Globe,
  LinkIcon,
  Eye,
  Brain,
  BookOpen,
  DatabaseIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Textarea } from "@/ui/textarea";
import { useToast } from "@/ui/use-toast";

// Form schema for web scraper
const webScraperFormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  waitForNetworkIdle: z.boolean().default(true),
  extractLinks: z.boolean().default(true),
  mobile: z.boolean().default(false),
  waitForSelectors: z.string().optional(),
  extractSelectors: z.string().optional(),
  generateSummary: z.boolean().default(true),
  extractData: z.boolean().default(true),
});

type WebScraperFormValues = z.infer<typeof webScraperFormSchema>;

export function WebScraper() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("url");
  const [scrapedContent, setScrapedContent] = useState<any>(null);

  // Initialize form
  const form = useForm<WebScraperFormValues>({
    resolver: zodResolver(webScraperFormSchema),
    defaultValues: {
      url: "",
      waitForNetworkIdle: true,
      extractLinks: true,
      mobile: false,
      waitForSelectors: "",
      extractSelectors: "",
      generateSummary: true,
      extractData: true,
    },
  });

  const onSubmit = async (data: WebScraperFormValues) => {
    setIsLoading(true);
    setScrapedContent(null);

    try {
      // Get user ID from local storage
      const userData = localStorage.getItem("user-data");
      const userId = userData ? JSON.parse(userData).id : null;

      // Parse optional selectors
      const waitForSelectors = data.waitForSelectors
        ? data.waitForSelectors.split(",").map((s) => s.trim())
        : undefined;

      // Parse extract selectors if provided
      let extractSelectors: Record<string, string> | undefined = undefined;
      if (data.extractSelectors) {
        try {
          extractSelectors = JSON.parse(data.extractSelectors) as Record<
            string,
            string
          >;
        } catch (error) {
          // If not valid JSON, try parsing as CSV
          const pairs = data.extractSelectors.split(",");
          extractSelectors = {};
          for (const pair of pairs) {
            const [key, value] = pair.split(":").map((s) => s.trim());
            if (key && value) {
              extractSelectors[key] = value;
            }
          }
        }
      }

      // Prepare options for scraping
      const options = {
        waitForNetworkIdle: data.waitForNetworkIdle,
        extractLinks: data.extractLinks,
        mobile: data.mobile,
        waitForSelectors,
        extractSelectors,
        timeout: 30000, // 30 seconds timeout
      };

      // Call scraper API
      const response = await fetch("/api/scraper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: data.url,
          options,
          userId,
          generateSummary: data.generateSummary,
          extractData: data.extractData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to scrape URL");
      }

      const result = await response.json();
      setScrapedContent(result);
      setActiveTab("preview");

      if (result.saved) {
        toast({
          title: "Content saved successfully",
          description: "The scraped content has been saved to your documents.",
        });

        // Attempt to refresh artifacts list if a refresh function exists in context
        try {
          // Use optional chaining to safely access any refreshArtifacts function
          const contextData = (window as any).__ARTIFACT_CONTEXT__;
          if (contextData?.refreshArtifacts) {
            contextData.refreshArtifacts();
          }
        } catch (err) {
          console.log("Could not refresh artifacts list");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to scrape URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Globe className="h-6 w-6" />
            Web Scraper
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="url" onClick={() => setActiveTab("url")}>
                <LinkIcon className="h-4 w-4 mr-2" />
                URL Input
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                disabled={!scrapedContent}
                onClick={() => setActiveTab("preview")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Content Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Options</h3>

                    <FormField
                      control={form.control}
                      name="waitForNetworkIdle"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <FormLabel>Wait for network idle</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="extractLinks"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <FormLabel>Extract links</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <FormLabel>Mobile emulation</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI Features</h3>

                    <FormField
                      control={form.control}
                      name="generateSummary"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <div>
                            <FormLabel className="flex items-center">
                              <Brain className="h-4 w-4 mr-2" />
                              Generate AI Summary
                            </FormLabel>
                            <p className="text-sm text-gray-500">
                              Create a concise summary of the content
                            </p>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="extractData"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <div>
                            <FormLabel className="flex items-center">
                              <DatabaseIcon className="h-4 w-4 mr-2" />
                              Extract Immigration Data
                            </FormLabel>
                            <p className="text-sm text-gray-500">
                              Extract structured immigration information
                            </p>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced">
                    <AccordionTrigger>Advanced Options</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <FormField
                          control={form.control}
                          name="waitForSelectors"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Wait for selectors (comma separated)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="#main-content, .article-body"
                                  {...field}
                                />
                              </FormControl>
                              <p className="text-sm text-gray-500">
                                CSS selectors to wait for before scraping
                              </p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="extractSelectors"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Extract selectors (JSON or key:value format)
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder='{"title": "h1", "content": ".article-body"}'
                                  {...field}
                                />
                              </FormControl>
                              <p className="text-sm text-gray-500">
                                CSS selectors to extract specific content
                              </p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scraping...
                    </>
                  ) : (
                    <>Scrape</>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="preview">
              {scrapedContent && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {scrapedContent.title || "Scraped Content"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Source:{" "}
                      <a
                        href={scrapedContent.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {scrapedContent.url}
                      </a>
                    </p>
                  </div>

                  {scrapedContent.summary && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <Brain className="h-5 w-5" />
                          AI Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose max-w-none">
                          {scrapedContent.summary
                            .split("\n")
                            .map((paragraph: string, i: number) => (
                              <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {scrapedContent.immigrationData && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <DatabaseIcon className="h-5 w-5" />
                          Immigration Data
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {scrapedContent.immigrationData.documentType && (
                            <div>
                              <h4 className="font-medium">Document Type</h4>
                              <p>
                                {scrapedContent.immigrationData.documentType}
                              </p>
                            </div>
                          )}

                          {scrapedContent.immigrationData.sourceType && (
                            <div>
                              <h4 className="font-medium">Source Type</h4>
                              <p>{scrapedContent.immigrationData.sourceType}</p>
                            </div>
                          )}

                          {scrapedContent.immigrationData.credibilityScore && (
                            <div>
                              <h4 className="font-medium">Credibility Score</h4>
                              <p>
                                {
                                  scrapedContent.immigrationData
                                    .credibilityScore
                                }
                                /100
                              </p>
                            </div>
                          )}

                          {scrapedContent.immigrationData.countries &&
                            scrapedContent.immigrationData.countries.length >
                              0 && (
                              <div>
                                <h4 className="font-medium">Countries</h4>
                                <p>
                                  {scrapedContent.immigrationData.countries.join(
                                    ", ",
                                  )}
                                </p>
                              </div>
                            )}

                          {scrapedContent.immigrationData.visaTypes &&
                            scrapedContent.immigrationData.visaTypes.length >
                              0 && (
                              <div className="col-span-2">
                                <h4 className="font-medium">Visa Types</h4>
                                <p>
                                  {scrapedContent.immigrationData.visaTypes.join(
                                    ", ",
                                  )}
                                </p>
                              </div>
                            )}

                          {scrapedContent.immigrationData.requirements &&
                            scrapedContent.immigrationData.requirements.length >
                              0 && (
                              <div className="col-span-2">
                                <h4 className="font-medium">Requirements</h4>
                                <ul className="list-disc pl-5">
                                  {scrapedContent.immigrationData.requirements.map(
                                    (req: string, i: number) => (
                                      <li key={i}>{req}</li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            )}

                          {scrapedContent.immigrationData.keyPoints &&
                            scrapedContent.immigrationData.keyPoints.length >
                              0 && (
                              <div className="col-span-2">
                                <h4 className="font-medium">Key Points</h4>
                                <ul className="list-disc pl-5">
                                  {scrapedContent.immigrationData.keyPoints.map(
                                    (point: string, i: number) => (
                                      <li key={i}>{point}</li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Original Content
                    </h3>
                    <div className="max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                      <pre className="whitespace-pre-wrap text-sm">
                        {scrapedContent.content}
                      </pre>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("url")}
                    >
                      Back to URL Input
                    </Button>

                    <Button onClick={() => router.push("/documents")}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Go to Documents
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
