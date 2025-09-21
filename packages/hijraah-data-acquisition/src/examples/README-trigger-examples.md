# Immigration Data Scraper - Trigger.dev v4 Usage Examples

This directory contains working examples of how to trigger the comprehensive immigration data scraping system built with Trigger.dev v4, Firecrawl v2, Google AI, and Supabase.

## Quick Start

### 1. Basic Usage

```typescript
import { scrapeAllImmigrationData } from "./trigger-immigration-scraper";

// Trigger comprehensive scraping of all sources
const result = await scrapeAllImmigrationData();
console.log("Scraping completed:", result);
```

### 2. Government Sources Only

```typescript
import { scrapeGovernmentSources } from "./trigger-immigration-scraper";

// Focus on critical government sources
const handle = await scrapeGovernmentSources();
console.log("Task ID:", handle.id);
```

### 3. Fast Update

```typescript
import { fastImmigrationUpdate } from "./trigger-immigration-scraper";

// Quick check for changes with minimal processing
const handle = await fastImmigrationUpdate();
```

### 4. Scheduled Monitoring

```typescript
import { scheduledImmigrationCheck } from "./trigger-immigration-scraper";

// Trigger scheduled monitoring (high-priority sources only)
const handle = await scheduledImmigrationCheck();
```

## API Route Example

Create a Next.js API route to expose the scraping functionality:

```typescript
// app/api/scrape-immigration/route.ts
import {
  scrapeAllImmigrationData,
  scrapeGovernmentSources,
} from "@/examples/trigger-immigration-scraper";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    switch (action) {
      case "complete":
        const result = await scrapeAllImmigrationData();
        return NextResponse.json({ success: true, data: result });

      case "government":
        const handle = await scrapeGovernmentSources();
        return NextResponse.json({ success: true, handleId: handle.id });

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

## Environment Variables Required

```bash
# Firecrawl Configuration
FIRECRAWL_API_KEY=your_firecrawl_api_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Configuration (OpenAI for Google AI compatibility)
OPENAI_API_KEY=your_openai_api_key

# Optional: Webhook Configuration
WEBHOOK_URL=https://your-app.com/api/webhooks
```

## What Each Function Does

### `scrapeAllImmigrationData()`

- **Purpose**: Comprehensive scraping of all immigration sources
- **Features**: Change tracking, AI processing, semantic analysis
- **Sources**: Government websites, forums, blogs, visa centers
- **Processing**: Full AI pipeline with entity extraction
- **Use Case**: Complete data refresh, initial setup

### `scrapeGovernmentSources()`

- **Purpose**: Focus on critical government immigration sources
- **Features**: High-priority monitoring, policy change detection
- **Sources**: USCIS, IRCC, Home Office, DHA
- **Processing**: Full AI processing with change tracking
- **Use Case**: Policy monitoring, compliance updates

### `fastImmigrationUpdate()`

- **Purpose**: Quick check for changes with minimal resource usage
- **Features**: Change detection only, no AI processing
- **Sources**: All sources but limited pages per source
- **Processing**: Minimal processing for speed
- **Use Case**: Frequent checks, resource-constrained environments

### `scheduledImmigrationCheck()`

- **Purpose**: Automated monitoring for high-priority sources
- **Features**: Runs automatically every 6 hours
- **Sources**: Critical and high-priority sources only
- **Processing**: Optimized for regular monitoring
- **Use Case**: Continuous monitoring, automated alerts

## Monitoring Task Progress

All functions return a task handle that you can use to monitor progress:

```typescript
const handle = await scrapeAllImmigrationData();

// Monitor progress
let run = await runs.retrieve(handle.id);
while (run.status === "QUEUED" || run.status === "EXECUTING") {
  console.log(`Status: ${run.status}`);
  await new Promise((resolve) => setTimeout(resolve, 10000));
  run = await runs.retrieve(handle.id);
}

if (run.status === "COMPLETED") {
  console.log("Completed:", run.output);
} else {
  console.error("Failed:", run.error);
}
```

## Integration with Existing Systems

The scraped data automatically integrates with:

1. **Supabase Storage**: Results stored in `immigration_scraping_results` table
2. **RAG Pipeline**: Processed data fed into vector search system
3. **Knowledge Graph**: Entities and relationships updated
4. **Webhooks**: Real-time notifications for policy changes

## Error Handling

All functions include comprehensive error handling:

```typescript
try {
  const result = await scrapeAllImmigrationData();
  // Handle success
} catch (error) {
  console.error("Scraping failed:", error);
  // Implement fallback or retry logic
}
```

## Best Practices

1. **Rate Limiting**: Use `fastImmigrationUpdate()` for frequent checks
2. **Resource Management**: Monitor AI processing costs for large-scale scraping
3. **Error Recovery**: Implement retry logic for failed tasks
4. **Progress Monitoring**: Always monitor task progress for long-running operations
5. **Source Prioritization**: Use appropriate functions based on your monitoring needs

## Troubleshooting

### Common Issues

1. **API Key Errors**: Verify all required environment variables are set
2. **Timeout Errors**: Use `fastImmigrationUpdate()` for quicker results
3. **Rate Limits**: Implement delays between multiple calls
4. **Large Payloads**: The system handles payloads up to 10MB automatically

### Debug Mode

Enable detailed logging by setting the log level in your Trigger.dev configuration:

```typescript
// In your trigger configuration
export const scrapeImmigrationDataTask = task({
  id: "scrape-immigration-data",
  // ... other config
  onSuccess: async (payload, output, { ctx }) => {
    console.log("Task completed successfully:", output);
  },
  onFailure: async (payload, error, { ctx }) => {
    console.error("Task failed:", error);
  },
});
```
