/**
 * Immigration Data Scraper - Working Trigger.dev v4 Examples
 *
 * This file demonstrates how to properly trigger the comprehensive immigration
 * data scraping system using Trigger.dev v4 correct API patterns.
 */

import { tasks, runs } from "@trigger.dev/sdk";

/**
 * Complete Immigration Data Scraping
 * Triggers comprehensive scraping of all immigration sources with AI processing
 */
export async function scrapeAllImmigrationData(): Promise<any> {
  console.log("🚀 Starting comprehensive immigration data scraping...");

  const handle = await tasks.trigger("scrape-immigration-data", {
    forceFullCrawl: false,
    includeChangeTracking: true,
    includeSemanticAnalysis: true,
    maxPagesPerSource: 20,
    aiProcessingEnabled: true,
  });

  console.log("✅ Task triggered with ID:", handle.id);

  // Monitor progress
  let run = await runs.retrieve(handle.id);
  while (run.status === "QUEUED" || run.status === "EXECUTING") {
    console.log(`📊 Status: ${run.status}`);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    run = await runs.retrieve(handle.id);
  }

  if (run.status === "COMPLETED") {
    console.log("🎉 Scraping completed:", run.output);
    return run.output;
  } else {
    console.error("❌ Scraping failed:", run.error);
    throw new Error(`Scraping failed: ${run.error}`);
  }
}

/**
 * Government Sources Only
 * Focus on critical government immigration websites
 */
export async function scrapeGovernmentSources(): Promise<any> {
  console.log("🏛️ Scraping government immigration sources...");

  const handle = await tasks.trigger("scrape-immigration-data", {
    sources: [
      {
        name: "USCIS",
        url: "https://www.uscis.gov",
        category: "government",
        country: "US",
        type: "official",
        priority: "critical",
        changeSensitivity: "high",
      },
      {
        name: "Canada IRCC",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
        category: "government",
        country: "CA",
        type: "official",
        priority: "critical",
        changeSensitivity: "high",
      },
    ],
    forceFullCrawl: false,
    includeChangeTracking: true,
    aiProcessingEnabled: true,
  });

  console.log("✅ Government sources scraping triggered:", handle.id);
  return handle;
}

/**
 * Fast Update - Minimal Processing
 * Quick check for changes with minimal resource usage
 */
export async function fastImmigrationUpdate(): Promise<any> {
  console.log("⚡ Performing fast immigration update...");

  const handle = await tasks.trigger("scrape-immigration-data", {
    forceFullCrawl: false,
    includeChangeTracking: true,
    includeSemanticAnalysis: false,
    maxPagesPerSource: 5,
    aiProcessingEnabled: false,
  });

  console.log("✅ Fast update triggered:", handle.id);
  return handle;
}

/**
 * Scheduled Immigration Monitoring
 * This would typically be set up as a scheduled task in Trigger.dev
 */
export async function scheduledImmigrationCheck(): Promise<any> {
  console.log("🕐 Running scheduled immigration monitoring...");

  // Only monitor high-priority sources for scheduled runs
  const handle = await tasks.trigger("scheduled-immigration-scraping", {});

  console.log("✅ Scheduled monitoring triggered:", handle.id);
  return handle;
}

// Example usage in a Next.js API route
export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    switch (action) {
      case "complete":
        return Response.json(await scrapeAllImmigrationData());

      case "government":
        const govHandle = await scrapeGovernmentSources();
        return Response.json({ handleId: govHandle.id });

      case "fast":
        const fastHandle = await fastImmigrationUpdate();
        return Response.json({ handleId: fastHandle.id });

      case "scheduled":
        const scheduledHandle = await scheduledImmigrationCheck();
        return Response.json({ handleId: scheduledHandle.id });

      default:
        return Response.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
