// Firecrawl client stub
// TODO: Implement actual Firecrawl integration after migration

export interface ScrapeResult {
  success: boolean;
  data?: {
    content: string;
    metadata: Record<string, any>;
  };
  error?: string;
}

export async function scrapeUrl(url: string): Promise<ScrapeResult> {
  // Stub implementation
  console.log(`Firecrawl scrapeUrl called for: ${url}`);

  return {
    success: true,
    data: {
      content: `Stubbed content for ${url} - Firecrawl integration temporarily disabled during migration`,
      metadata: {
        url,
        title: "Stubbed Title",
        timestamp: new Date().toISOString(),
      },
    },
  };
}

export default { scrapeUrl };
