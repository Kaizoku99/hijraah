import { zValidator } from "@hono/zod-validator";
import { createClient } from "@supabase/supabase-js";
import { Hono, Context } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import pLimit from "p-limit"; // Import p-limit
import { z } from "zod";

import { extractImmigrationData } from "@/lib/ai/extract-immigration-data"; // Assuming this path and function exist
import { summarizeText } from "@/lib/ai/summarize"; // Assuming this path and function exist
import { scrapeUrl as firecrawlScrape } from "@/lib/firecrawl/client"; // Assuming this path and function exist
import { ScraperService } from "@/lib/scrapers/service"; // Assuming service is in this path
import {
  getSourcesDueForScraping,
  recordScrape,
  getScrapingSourceById,
  createScrapingSource,
  updateScrapingSource,
  deleteScrapingSource,
  getScrapingSources,
  addSourceValidation, // <-- Add import for validation function
} from "@/lib/supabase/scraping-sources"; // Assuming this path and functions exist


// Import SourceCategory
import type { SourceCategory } from "@/lib/supabase/scraping-sources";

// Define the Zod enum for SourceCategory
const sourceCategoryZodEnum = z.enum([
  "government",
  "legal",
  "news",
  "blog",
  "forum",
  "other",
]);

// Placeholder for SourceCategory enum - replace with actual import/definition
// type SourceCategory = 'official' | 'news' | 'forum' | 'other'; // REMOVING PLACEHOLDER

// Define types for Hono context variables
type HonoVariables = {
  authType: "apiKey" | "session" | "anonymous";
  session: any; // Replace 'any' with actual Session type from your auth provider
  userId: string | undefined;
};

// Initialize Supabase client (use admin for operations requiring service role)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  { auth: { persistSession: false } } // Recommended for server-side admin client
);

// API Key for cron job authentication
const CRON_API_KEY = process.env.SCRAPING_API_KEY || "your-secure-api-key";

// --- Schemas --- //

const scrapeOptionsSchema = z
  .object({
    waitForNetworkIdle: z.boolean().optional(),
    extractLinks: z.boolean().optional(),
    mobile: z.boolean().optional(),
    waitForSelectors: z.array(z.string()).optional(),
    extractSelectors: z.record(z.string()).optional(),
    timeout: z.number().optional(),
  })
  .optional();

const scrapeSingleSchema = z.object({
  url: z.string().url(),
  options: scrapeOptionsSchema,
  userId: z.string().optional(),
  generateSummary: z.boolean().optional(),
  extractData: z.boolean().optional(),
});

const scrapeBulkSchema = z.object({
  urls: z.array(z.string().url()),
  options: scrapeOptionsSchema,
  userId: z.string().optional(),
  generateSummary: z.boolean().optional(),
  extractData: z.boolean().optional(),
});

const scheduleTriggerSchema = z.object({
  sourceIds: z.array(z.string()).optional(),
});

// Use placeholder SourceCategory enum
// const sourceCategoryEnum = z.enum(['official', 'news', 'forum', 'other']); // REMOVING PLACEHOLDER

const createSourceSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  category: sourceCategoryZodEnum, // Use the Zod enum
  scrape_frequency: z.string(), // Consider enum: 'daily', 'weekly', etc.
  // Add other relevant fields: description, config, country_code, etc.
});

const updateSourceSchema = createSourceSchema.partial(); // Allow partial updates

const trackChangesSchema = z.object({
  url: z.string().url(),
  modes: z
    .array(z.enum(["git-diff", "json"]))
    .optional()
    .default(["git-diff"]),
  jsonSchema: z.record(z.any()).optional(),
});

const sourceValidationSchema = z.object({
  score: z.number().min(0).max(100),
  notes: z.string().optional(),
});

const triggerCountryScrapeSchema = z.object({
  configId: z.string(), // Expecting the ID of the scrape_configurations entry
});

// --- ScraperService Initialization --- //
// Ensure all required environment variables are set
const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const r2Endpoint = process.env.R2_ENDPOINT;
const r2AccountId = process.env.R2_ACCOUNT_ID;
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID;
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const r2BucketName = process.env.R2_BUCKET_NAME;

let scraperServiceInstance: ScraperService | null = null;

if (
  firecrawlApiKey &&
  supabaseUrl &&
  supabaseServiceKey &&
  r2Endpoint &&
  r2AccountId &&
  r2AccessKeyId &&
  r2SecretAccessKey &&
  r2BucketName
) {
  scraperServiceInstance = new ScraperService(
    firecrawlApiKey,
    supabaseUrl,
    supabaseServiceKey,
    r2Endpoint,
    r2AccountId,
    r2AccessKeyId,
    r2SecretAccessKey,
    r2BucketName
  );
  console.log("[Scraping API] ScraperService initialized successfully.");
} else {
  console.error(
    "[Scraping API] Failed to initialize ScraperService: Missing one or more environment variables for Firecrawl, Supabase, or R2."
  );
  // Depending on how critical this is, you might throw an error or handle routes differently
}

// --- Hono App Setup --- //

// Explicitly type the Hono app with the variables
const app = new Hono<{ Variables: HonoVariables }>().basePath("/api/scraping");

// --- Middleware --- //
app.use("*", cors());

// Updated Authentication Middleware
const authMiddleware = async (
  c: Context<{ Variables: HonoVariables }>,
  next: () => Promise<void>
) => {
  let authType: HonoVariables["authType"] = "anonymous";
  let sessionData: HonoVariables["session"] = null; // Renamed from 'session' to avoid conflict with c.session
  let userId: HonoVariables["userId"] = undefined;

  const authHeader = c.req.header("Authorization");
  const apiKeyQuery = c.req.query("apiKey");

  // 1. Check for API key (for /schedule GET and POST)
  if (
    c.req.path === "/schedule" && // API Key primarily for /schedule
    ((authHeader && authHeader === `Bearer ${CRON_API_KEY}`) ||
      (apiKeyQuery && apiKeyQuery === CRON_API_KEY))
  ) {
    authType = "apiKey";
    c.set("authType", authType);
    c.set("session", null); // Explicitly set session to null for apiKey auth
    c.set("userId", undefined); // No userId for apiKey auth
    console.log(
      "[Auth Middleware] API Key authentication successful for /schedule"
    );
    await next();
    return;
  }

  // 2. Check for user session (Bearer token)
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const {
          data: { user },
          error,
        } = await supabaseAdmin.auth.getUser(token);
        if (error) {
          console.warn(
            "[Auth Middleware] Supabase token validation error:",
            error.message
          );
          // Potentially distinguish between expired/invalid token and other errors
          // For now, treat as anonymous if token is invalid
        } else if (user) {
          authType = "session";
          sessionData = user; // Store the Supabase user object as sessionData
          userId = user.id;
          console.log(
            `[Auth Middleware] User session authenticated: ${userId}`
          );
        }
      } catch (e) {
        console.error(
          "[Auth Middleware] Exception during Supabase token validation:",
          e
        );
      }
    } else {
      console.warn("[Auth Middleware] Bearer token malformed or empty.");
    }
  }

  c.set("authType", authType);
  c.set("session", sessionData); // Set the fetched user object (or null)
  c.set("userId", userId);

  // Protect routes that require session authentication
  // /admin/* routes and POST to /schedule require a valid user session.
  const path = c.req.path;
  const method = c.req.method;

  const requiresSessionAuth =
    path.startsWith("/admin") || (path === "/schedule" && method === "POST");

  if (requiresSessionAuth && authType !== "session") {
    console.warn(
      `[Auth Middleware] Unauthorized attempt to access ${method} ${path}`
    );
    return c.json({ error: "Unauthorized: User session required" }, 401);
  }

  // Role Check for Admin routes (example, needs actual role from sessionData)
  // if (path.startsWith("/admin") && sessionData?.app_metadata?.role !== 'admin') { // Adjust based on how roles are stored
  //   return c.json({ error: "Forbidden: Admin access required" }, 403);
  // }

  await next();
};

// Apply auth middleware globally
app.use("*", authMiddleware);

// --- Core Scraping Routes --- //

// POST / - Scrape a single URL
app.post("/", zValidator("json", scrapeSingleSchema), async (c) => {
  const data = c.req.valid("json");
  const userId = c.get("userId"); // Get userId set by middleware

  console.log(
    `[Scraping API] POST / request for URL: ${data.url}, User: ${userId || "anonymous"}`
  );

  try {
    // 1. Call firecrawlScrape
    const scrapedContent = await firecrawlScrape(data.url, data.options || {});
    const result: any = {
      url: data.url,
      title: scrapedContent?.title || `Content from ${data.url}`,
      content: scrapedContent?.content, // Or markdown, check firecrawl lib response
      status: 200, // Assuming success if no error
      contentType: "text/html", // Adjust if known
    };

    // 2. Optional: Summarize
    if (data.generateSummary && result.content) {
      try {
        result.summary = await summarizeText(result.content, {
          maxTokens: 500,
        });
      } catch (e) {
        console.error("Summary failed:", e);
        result.summaryError = (e as Error).message;
      }
    }
    // 3. Optional: Extract Immigration Data
    if (data.extractData && result.content) {
      try {
        result.immigrationData = await extractImmigrationData(
          result.content,
          data.url
        );
      } catch (e) {
        console.error("Extraction failed:", e);
        result.extractionError = (e as Error).message;
      }
    }
    // 4. Optional: Save to `scraper_results` if authenticated user
    if (userId) {
      // Check if userId exists (i.e., authenticated)
      try {
        const { error } = await supabaseAdmin.from("scraper_results").insert({
          url: data.url,
          user_id: userId,
        });
        if (error) throw error;
        result.saved = true;
      } catch (e) {
        console.error("Failed to save scrape result:", e);
        result.saveError = (e as Error).message;
      }
    }
    // 5. Log scrape to `scrape_queries`
    try {
      await supabaseAdmin.from("scrape_queries").insert({
        url: data.url,
        user_id: userId,
      });
    } catch (e) {
      console.error("Failed to log scrape query:", e);
    }

    return c.json(result);
  } catch (error) {
    console.error(`[Scraping API] Error scraping URL ${data.url}:`, error);
    return c.json(
      { error: "Failed to scrape URL", details: (error as Error).message },
      500
    );
  }
});

// POST /bulk - Scrape multiple URLs
app.post("/bulk", zValidator("json", scrapeBulkSchema), async (c) => {
  const data = c.req.valid("json");
  const userId = c.get("userId");
  const results: any[] = [];

  console.log(
    `[Scraping API] POST /bulk request for ${data.urls.length} URLs, User: ${userId || "anonymous"}`
  );

  const concurrencyLimit = 5; // Make this configurable if needed
  const limit = pLimit(concurrencyLimit);

  const scrapePromises = data.urls.map((url) =>
    limit(async () => {
      let singleResult: any = { url, success: false };
      try {
        const scrapedContent = await firecrawlScrape(url, data.options || {});
        singleResult.title = scrapedContent?.title || `Content from ${url}`;
        singleResult.content = scrapedContent?.content;

        if (data.generateSummary && singleResult.content) {
          try {
            singleResult.summary = await summarizeText(singleResult.content);
          } catch (e: any) {
            singleResult.summaryError = e.message;
          }
        }
        if (data.extractData && singleResult.content) {
          try {
            singleResult.immigrationData = await extractImmigrationData(
              singleResult.content,
              url
            );
          } catch (e: any) {
            singleResult.extractionError = e.message;
          }
        }
        if (userId) {
          try {
            await supabaseAdmin.from("scraper_results").insert({
              url: url,
              user_id: userId,
            });
            // No need to set singleResult.saved = true here as it's per URL
          } catch (e: any) {
            singleResult.saveError = e.message; // Log save error for this specific URL
            console.error(
              `[Scraping API] Failed to save scrape result for ${url}:`,
              e
            );
          }
        }
        try {
          await supabaseAdmin.from("scrape_queries").insert({
            url: url,
            user_id: userId,
          });
        } catch (e) {
          console.error(
            `[Scraping API] Failed to log bulk scrape query for ${url}:`,
            e
          );
          // This error is not specific to singleResult, so not attaching it there
        }
        singleResult.success = true;
      } catch (error: any) {
        console.error(`[Scraping API] Error scraping bulk URL ${url}:`, error);
        singleResult.error = error.message;
      }
      // The delay inside the loop is removed as p-limit handles concurrency.
      // A small delay might still be useful if hammering the same domain,
      // but p-limit primarily controls concurrent *outgoing* requests.
      return singleResult; // Return the result for this URL
    })
  );

  // Wait for all limited promises to resolve
  const settledResults = await Promise.all(scrapePromises);
  results.push(...settledResults); // Add all results to the main results array

  return c.json({ results });
});

// POST /country/:configId - Trigger a specific country/config scrape
app.post(
  "/country/:configId",
  zValidator("param", z.object({ configId: z.string() })),
  async (c) => {
    const { configId } = c.req.valid("param");
    const userId = c.get("userId");

    if (!scraperServiceInstance) {
      console.error(
        "[Scraping API] /country/:configId - ScraperService not initialized."
      );
      return c.json(
        { error: "ScraperService not available due to missing configuration." },
        503
      );
    }

    const session = c.get("session");
    const isAdmin =
      session?.app_metadata?.claims?.app_role === "admin" ||
      session?.user_metadata?.role === "admin";
    if (!isAdmin) {
      return c.json(
        {
          error: "Forbidden: Admin access required to trigger country scrape.",
        },
        403
      );
    }

    console.log(
      `[Scraping API] POST /country/${configId} request by User: ${userId || "admin_trigger"}`
    );

    try {
      const config = await scraperServiceInstance.getScrapeConfigById(configId);
      if (!config) {
        console.warn(
          `[Scraping API] /country/:configId - Configuration ${configId} not found.`
        );
        return c.json(
          { error: `Configuration with ID ${configId} not found.` },
          404
        );
      }

      // Intentionally not awaiting processScrapeConfig to allow the API to respond quickly.
      // The actual scraping will run in the background.
      scraperServiceInstance
        .processScrapeConfig(config)
        .then(() => {
          console.log(
            `[Scraping API] Background processing of scrape config ${configId} completed.`
          );
        })
        .catch((error) => {
          console.error(
            `[Scraping API] Background error processing scrape config ${configId}:`,
            error
          );
          // Consider logging this to a more persistent error tracking system
        });

      return c.json({
        message: `Scraping process for configuration ${configId} (${config.name}) initiated in background.`,
      });
    } catch (error: any) {
      console.error(
        `[Scraping API] Error initiating /country/${configId} scrape:`,
        error
      );
      return c.json(
        {
          error: "Failed to initiate country scrape process",
          details: error.message,
        },
        500
      );
    }
  }
);

// POST /track-changes - Get change tracking data for a URL
app.post(
  "/track-changes",
  zValidator("json", trackChangesSchema),
  async (c) => {
    const { url, modes, jsonSchema } = c.req.valid("json");
    console.log(`[Scraping API] POST /track-changes for URL: ${url}`);

    try {
      // Set up options for Firecrawl scraping with change tracking
      const options: Record<string, any> = {
        pageOptions: {
          // Nest under pageOptions if firecrawlScrape expects it like this
          formats: ["markdown", "changeTracking"], // Include markdown to ensure scrape happens
          changeTrackingOptions: {
            modes,
          },
        },
      };

      // Add schema for JSON mode if provided
      if (jsonSchema && modes.includes("json")) {
        if (!options.pageOptions.changeTrackingOptions)
          options.pageOptions.changeTrackingOptions = {};
        options.pageOptions.changeTrackingOptions.schema = jsonSchema;
      }

      // Perform the scraping with change tracking
      // Assuming firecrawlScrape is the updated function handling this
      const result = await firecrawlScrape(url, options);

      // Check if we received change tracking data
      if (!result || !result.changeTracking) {
        return c.json(
          {
            success: false,
            error:
              "Change tracking data not available. This might be the first time the URL has been scraped.",
          },
          404
        );
      }

      // Return the change tracking data
      return c.json({
        success: true,
        url,
        changeTracking: result.changeTracking,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error(`[Scraping API] Error tracking changes for ${url}:`, error);
      return c.json(
        {
          success: false,
          error: "Failed to track changes",
          details: error.message,
        },
        500
      );
    }
  }
);

// POST /extract - Placeholder (Logic moved to POST / and POST /track-changes)
app.post("/extract", async (c) => {
  console.warn(
    "[Scraping API] /extract endpoint is deprecated. Use POST / and POST /track-changes."
  );
  return c.json(
    { message: "Endpoint deprecated. Use POST / and POST /track-changes." },
    410
  ); // 410 Gone
});

// --- Scheduled Scraping Route --- //

// GET /schedule - Trigger scheduled scraping
app.get("/schedule", async (c) => {
  if (c.get("authType") !== "apiKey") {
    return c.json({ error: "Unauthorized: API Key required" }, 401);
  }
  console.log("[Scraping API] GET /schedule triggered by API Key");
  try {
    const result = await performScheduledScraping(); // Call helper
    return c.json(result);
  } catch (error) {
    console.error("[Scraping API] Error during GET /schedule:", error);
    return c.json({ error: "Error performing scheduled scraping" }, 500);
  }
});

// POST /schedule - Manually trigger scraping for specific sources
app.post("/schedule", zValidator("json", scheduleTriggerSchema), async (c) => {
  const { sourceIds } = c.req.valid("json");
  console.log(
    `[Scraping API] POST /schedule triggered manually for sources: ${sourceIds?.join(", ") || "all due"}`
  );
  try {
    const result = await performScheduledScraping(sourceIds);
    return c.json(result);
  } catch (error) {
    console.error("[Scraping API] Error during POST /schedule:", error);
    return c.json({ error: "Error performing manual scraping" }, 500);
  }
});

// --- Admin Routes --- //
const adminApp = new Hono<{ Variables: HonoVariables }>(); // Ensure admin app also knows variables

// Apply Admin Auth Middleware (Refined Check - assumes middleware already ran)
adminApp.use("*", async (c, next) => {
  const authType = c.get("authType");
  const session = c.get("session"); // This is the user object from Supabase
  const userId = c.get("userId");

  // Ensure it's a session and user has an admin role
  // Adjust 'session?.app_metadata?.claims?.app_role' to your actual user role path
  const isAdmin =
    session?.app_metadata?.claims?.app_role === "admin" ||
    session?.user_metadata?.role === "admin"; // Example paths

  if (authType !== "session" || !userId || !isAdmin) {
    console.warn(
      `[AdminApp Middleware] Unauthorized access attempt. AuthType: ${authType}, UserId: ${userId}, IsAdmin: ${isAdmin}`
    );
    return c.json({ error: "Forbidden: Admin access required" }, 403);
  }
  await next();
});

// GET /admin/sources - List sources
adminApp.get("/sources", async (c) => {
  try {
    const sources = await getScrapingSources();
    return c.json(sources);
  } catch (error) {
    console.error("Admin GET Sources Error:", error);
    return c.json({ error: "Failed to get sources" }, 500);
  }
});

// POST /admin/sources - Create source
adminApp.post("/sources", zValidator("json", createSourceSchema), async (c) => {
  const data = c.req.valid("json");
  const userId = c.get("userId"); // Get userId from middleware
  if (!userId) return c.json({ error: "User ID not found in session" }, 400);
  try {
    const createdSource = await createScrapingSource({
      ...data,
      created_by: userId,
    });
    return c.json(createdSource, 201);
  } catch (error) {
    console.error("Admin POST Source Error:", error);
    return c.json({ error: "Failed to create source" }, 500);
  }
});

// GET /admin/sources/:id - Get single source
adminApp.get("/sources/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const source = await getScrapingSourceById(id);
    if (!source) return c.json({ error: "Source not found" }, 404);
    return c.json(source);
  } catch (error) {
    console.error("Admin GET Source/:id Error:", error);
    return c.json({ error: "Failed to get source" }, 500);
  }
});

// PUT /admin/sources/:id - Update source
adminApp.put(
  "/sources/:id",
  zValidator("json", updateSourceSchema),
  async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    try {
      // Pass data directly as updateScrapingSource should handle Partial type
      const updatedSource = await updateScrapingSource(id, data);
      if (!updatedSource) return c.json({ error: "Source not found" }, 404);
      return c.json(updatedSource);
    } catch (error) {
      console.error("Admin PUT Source/:id Error:", error);
      return c.json({ error: "Failed to update source" }, 500);
    }
  }
);

// DELETE /admin/sources/:id - Delete source
adminApp.delete("/sources/:id", async (c) => {
  const id = c.req.param("id");
  try {
    // Assume deleteScrapingSource throws if not found or error occurs
    await deleteScrapingSource(id);
    return c.json({ success: true });
  } catch (error: any) {
    console.error("Admin DELETE Source/:id Error:", error);
    // Check if error indicates not found (adjust based on actual function behavior)
    if (error.message?.includes("not found")) {
      // Example check
      return c.json({ error: "Source not found" }, 404);
    }
    return c.json({ error: "Failed to delete source" }, 500);
  }
});

// POST /admin/sources/:id/validate - Add validation score/notes for a source
adminApp.post(
  "/sources/:id/validate",
  zValidator("json", sourceValidationSchema),
  async (c) => {
    const id = c.req.param("id");
    const { score, notes } = c.req.valid("json");
    const userId = c.get("userId"); // Get admin user ID from middleware
    const session = c.get("session"); // Get session data

    // Enhanced check for admin user
    // This relies on your Supabase user object having a way to identify admins,
    // e.g., via app_metadata.role or a separate 'roles' table.
    // Placeholder: assuming 'admin' role is in app_metadata.claims.app_role or similar
    // Adjust 'session?.app_metadata?.claims?.app_role' to your actual user role path
    const isAdmin =
      session?.app_metadata?.claims?.app_role === "admin" ||
      session?.user_metadata?.role === "admin"; // Example paths

    if (!userId || !isAdmin) {
      // Also check if the user is an admin
      console.warn(
        `[Admin Validate] Unauthorized attempt by user: ${userId}, session:`,
        session
      );
      return c.json({ error: "Forbidden: Admin access required" }, 403);
    }

    try {
      // Verify source exists (optional, addSourceValidation might handle this)
      const source = await getScrapingSourceById(id);
      if (!source) {
        return c.json({ error: "Source not found" }, 404);
      }

      // Add validation record
      await addSourceValidation(id, score, userId, notes);
      console.log(
        `[Scraping Admin] Validation added for source ${id} by user ${userId}`
      );
      return c.json({ success: true });
    } catch (error: any) {
      console.error(`[Scraping Admin] Error validating source ${id}:`, error);
      return c.json(
        { error: "Failed to add validation", details: error.message },
        500
      );
    }
  }
);

// GET /admin/logs - Get logs
adminApp.get("/logs", async (c) => {
  const page = parseInt(c.req.query("page") || "1", 10);
  const PAGE_SIZE = 20;
  const offset = (page - 1) * PAGE_SIZE;
  try {
    const {
      data: logs,
      count,
      error,
    } = await supabaseAdmin
      .from("scraping_logs")
      .select("*", { count: "exact" })
      .order("triggered_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);
    if (error) throw error;
    const totalPages = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE));
    return c.json({ logs, page, totalPages, totalCount: count });
  } catch (error) {
    console.error("Admin GET Logs Error:", error);
    return c.json({ error: "Failed to get logs" }, 500);
  }
});

// GET /admin/history - Get history
adminApp.get("/history", async (c) => {
  const page = parseInt(c.req.query("page") || "1", 10);
  const sourceId = c.req.query("sourceId");
  const PAGE_SIZE = 20;
  const offset = (page - 1) * PAGE_SIZE;
  try {
    let query = supabaseAdmin
      .from("scrape_history")
      .select(`*, scraping_sources:source_id (name, url)`, { count: "exact" });
    if (sourceId) query = query.eq("source_id", sourceId);
    const { data, count, error } = await query
      .order("scraped_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);
    if (error) throw error;
    const totalPages = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE));
    // Transform data (optional, maybe do on client)
    // const history = data.map(...)
    return c.json({ history: data, page, totalPages, totalCount: count });
  } catch (error) {
    console.error("Admin GET History Error:", error);
    return c.json({ error: "Failed to get history" }, 500);
  }
});

// Mount the admin sub-app
app.route("/admin", adminApp);

// --- Helper Functions (Implementation Required) --- //

async function performScheduledScraping(specificSourceIds?: string[]) {
  console.log(
    `[Scheduler] Performing scraping for sources: ${specificSourceIds ? specificSourceIds.join(", ") : "all due"}`
  );

  let sourcesToScrape: any[] = []; // Ideally, this would be strongly typed based on getScrapingSourceById/getSourcesDueForScraping return type
  let fetchError = null;

  try {
    if (specificSourceIds && specificSourceIds.length > 0) {
      const sourcePromises = specificSourceIds.map((id) =>
        getScrapingSourceById(id)
      );
      sourcesToScrape = (await Promise.all(sourcePromises)).filter(
        (source) => source !== null
      ) as any[]; // Type assertion after filter
      console.log(
        `[Scheduler] Fetched ${sourcesToScrape.length} specific sources by ID.`
      );
    } else {
      sourcesToScrape = await getSourcesDueForScraping();
      console.log(
        `[Scheduler] Fetched ${sourcesToScrape.length} sources due for scraping.`
      );
    }
  } catch (error: any) {
    console.error("[Scheduler] Error fetching sources:", error);
    fetchError = error.message;
    // Do not return here, proceed to report fetch error if any
  }

  const results = {
    totalFetched: sourcesToScrape.length,
    processed: 0,
    successful: 0,
    failed: 0,
    fetchError: fetchError,
    details: [] as Array<{
      sourceId: string;
      sourceName?: string;
      url: string;
      status: "success" | "failure" | "skipped";
      message?: string;
      summary?: string;
      extractedData?: any;
      error?: string;
    }>,
  };

  if (fetchError && sourcesToScrape.length === 0) {
    // If fetch failed and no sources were loaded (e.g. specific IDs not found and errored)
    return {
      message: "Scheduled scraping could not fetch sources.",
      results,
    };
  }
  if (sourcesToScrape.length === 0 && !fetchError) {
    return {
      message: "No sources due for scraping or found for the given IDs.",
      results,
    };
  }

  for (const source of sourcesToScrape) {
    if (!source || !source.id || !source.url) {
      console.warn("[Scheduler] Skipping invalid source object:", source);
      results.details.push({
        sourceId: source?.id || "unknown",
        sourceName: source?.name,
        url: source?.url || "unknown",
        status: "skipped",
        message: "Invalid source data provided.",
      });
      continue;
    }

    results.processed++;
    let scrapeDetail: (typeof results.details)[0] = {
      sourceId: source.id,
      sourceName: source.name,
      url: source.url,
      status: "failure", // Default to failure
    };

    try {
      console.log(
        `[Scheduler] Scraping URL: ${source.url} for source ID: ${source.id}`
      );
      // TODO: Incorporate source-specific scrape options if available (e.g., from source.config)
      const scrapedContent = await firecrawlScrape(source.url, {
        /* options */
      });

      if (scrapedContent && scrapedContent.content) {
        scrapeDetail.message = "Scraped successfully.";

        // Optional: Summarize (configurable per source in future?)
        try {
          scrapeDetail.summary = await summarizeText(scrapedContent.content, {
            maxTokens: 200,
          });
        } catch (e: any) {
          console.warn(
            `[Scheduler] Summarization failed for ${source.url}:`,
            e.message
          );
          scrapeDetail.summary = "Summarization failed: " + e.message;
        }

        // Optional: Extract Data (configurable per source in future?)
        try {
          scrapeDetail.extractedData = await extractImmigrationData(
            scrapedContent.content,
            source.url
          );
        } catch (e: any) {
          console.warn(
            `[Scheduler] Extraction failed for ${source.url}:`,
            e.message
          );
          scrapeDetail.extractedData = {
            error: "Extraction failed: " + e.message,
          };
        }

        // TODO: Decide on artifact storage for scheduled scrapes if needed beyond logging
        // e.g., save to a specific Supabase table or R2 bucket if content is significant.

        // Pass a meaningful string to the 'content' parameter of recordScrape
        const recordContent =
          scrapeDetail.summary ||
          scrapedContent.title ||
          "Scraped content available";
        await recordScrape(source.id, "success", recordContent);
        scrapeDetail.status = "success";
        results.successful++;
      } else {
        // If scrape was technically successful but no content was returned (or scrapedContent itself is nullish)
        const errorMessage = scrapedContent
          ? "No content returned from scrape."
          : "Scraping did not return data.";
        console.warn(`[Scheduler] ${errorMessage} ${source.url}`);
        scrapeDetail.message = errorMessage;
        scrapeDetail.error = errorMessage;
        await recordScrape(
          source.id,
          "error",
          undefined,
          undefined,
          errorMessage
        );
        results.failed++;
      }
    } catch (error: any) {
      console.error(
        `[Scheduler] Error scraping ${source.url} (ID: ${source.id}):`,
        error
      );
      scrapeDetail.error = error.message;
      scrapeDetail.message = "Scraping process threw an exception.";
      await recordScrape(
        source.id,
        "error",
        undefined,
        undefined,
        error.message
      );
      results.failed++;
    }
    results.details.push(scrapeDetail);

    // Add a small delay between requests to be respectful to servers
    // This could be configurable per source in the future.
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  }

  console.log(
    `[Scheduler] Finished. Total: ${results.totalFetched}, Processed: ${results.processed}, Successful: ${results.successful}, Failed: ${results.failed}`
  );
  return {
    message: `Scheduled scraping finished. Processed ${results.processed} of ${results.totalFetched} sources. Success: ${results.successful}, Failures: ${results.failed}.`,
    results,
  };
}

// --- Export Hono App --- //
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

// Optional: Specify runtime if needed (Node.js often better for scraping tasks)
export const runtime = "nodejs";
