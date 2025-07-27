import { createClient } from "@supabase/supabase-js";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { z } from "zod";

import { researchService } from "@/lib/services/research-service"; // Assuming this path is correct

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
);

// Create a Hono app
const app = new Hono();

// Add CORS middleware
app.use("*", cors());

// Define schema for the start research request body
const startResearchSchema = z.object({
  query: z.string().min(1, "Query cannot be empty"),
  userId: z.string().optional(),
  maxDepth: z.number().min(1).max(5).default(3).optional(), // Allow optional override
  // Add other parameters if needed by researchService (e.g., model preference)
});

// Define schema for source data (matching deep-research structure)
const sourceSchema = z.object({
  id: z.string().uuid(),
  session_id: z.string().uuid(),
  url: z.string().url().nullable(),
  title: z.string().nullable(),
  relevance: z.number().nullable(),
  metadata: z.any().nullable(),
  created_at: z.string(),
});

// Define schema for finding/activity data (matching deep-research structure)
const findingSchema = z.object({
  id: z.string().uuid(),
  session_id: z.string().uuid(),
  type: z.string(), // e.g., 'search', 'extract', 'analyze', 'synthesis', 'error'
  content: z.string(),
  depth: z.number(),
  metadata: z.any().nullable(),
  created_at: z.string(),
});

// Define schema for session data (matching deep-research structure)
const sessionSchema = z.object({
  id: z.string().uuid(),
  query: z.string(),
  status: z.enum(["in_progress", "completed", "failed"]),
  metadata: z.any().nullable(), // Contains depth, progress etc.
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.string().uuid().nullable(),
  // Add results field if researchService stores final summary here
  // results: z.any().nullable(),
});

// Define schema for GET request response
const researchStatusResponseSchema = sessionSchema.extend({
  sources: z.array(sourceSchema),
  findings: z.array(findingSchema),
});

// Helper function to create a new research session (adapted from deep-research)
async function createResearchSession(
  query: string,
  maxDepth: number,
  userId?: string,
) {
  const { data, error } = await supabase
    .from("research_sessions")
    .insert({
      // Let Supabase generate UUID for id
      query,
      user_id: userId,
      status: "in_progress",
      metadata: {
        max_depth: maxDepth,
        current_depth: 0,
        progress: 0,
      },
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating research session in DB:", error);
    throw new Error(`Failed to create research session: ${error.message}`);
  }

  console.log(
    `[Research API] Created session ${data.id} for query: "${query}"`,
  );
  return data;
}

// Helper function to get a research session and its details (adapted from deep-research)
async function getResearchSessionDetails(sessionId: string) {
  console.log(`[Research API] Fetching details for session ${sessionId}`);
  // Get the session
  const { data: session, error: sessionError } = await supabase
    .from("research_sessions")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (sessionError || !session) {
    console.error(
      `[Research API] Error fetching session ${sessionId}:`,
      sessionError,
    );
    // Throw specific error if not found
    if (sessionError?.code === "PGRST116") {
      // PostgREST code for no rows found
      throw new Error(`Research session not found: ${sessionId}`);
    }
    throw new Error(
      `Failed to fetch research session ${sessionId}: ${sessionError?.message || "Unknown error"}`,
    );
  }

  // Get the sources for this session
  const { data: sources, error: sourcesError } = await supabase
    .from("research_sources")
    .select("*")
    .eq("session_id", sessionId);

  if (sourcesError) {
    console.warn(
      `[Research API] Error fetching sources for session ${sessionId}:`,
      sourcesError,
    );
    // Continue but log warning
  }

  // Get the findings/activities for this session
  const { data: findings, error: findingsError } = await supabase
    .from("research_findings")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (findingsError) {
    console.warn(
      `[Research API] Error fetching findings for session ${sessionId}:`,
      findingsError,
    );
    // Continue but log warning
  }

  console.log(
    `[Research API] Successfully fetched details for session ${sessionId}`,
  );
  return {
    ...session,
    sources: sources || [],
    findings: findings || [],
  };
}

// --- API Routes --- //

// POST / - Start a new research task (asynchronous)
app.post("/", async (c) => {
  try {
    // Parse and validate request body
    const body = await c.req.json();
    const validation = startResearchSchema.safeParse(body);

    if (!validation.success) {
      return c.json(
        { error: "Invalid input", details: validation.error.errors },
        400,
      );
    }
    const { query, userId, maxDepth = 3 } = validation.data;

    console.log(
      `[Research API] Received request to start research on: "${query}"`,
    );

    // Create the session record
    const session = await createResearchSession(query, maxDepth, userId);

    // Trigger the background research process (fire-and-forget)
    // IMPORTANT: This `void` approach might not be reliable on all serverless platforms
    // for long-running tasks. Consider using a dedicated background job queue
    // (e.g., Trigger.dev, QStash, Vercel Background Functions) for production.
    // void researchService.performResearch(query, maxDepth, session.id)
    //   .then(() => console.log(`[Research API] Background research process completed for session ${session.id}`))
    //   .catch(err => console.error(`[Research API] Background research process failed for session ${session.id}:`, err));

    // Wrap the call in an anonymous async function to handle potential linter issues
    // and clearly signal a detached process.
    (async () => {
      try {
        await researchService.performResearch(query, maxDepth, session.id);
        console.log(
          `[Research API] Background research process completed for session ${session.id}`,
        );
      } catch (err) {
        console.error(
          `[Research API] Background research process failed for session ${session.id}:`,
          err,
        );
        // Optionally update session status to 'failed' here if the service doesn't handle it
      }
    })(); // Immediately invoke the async function

    console.log(
      `[Research API] Background process triggered for session ${session.id}. Returning 202.`,
    );

    // Return 202 Accepted with the session ID
    return c.json(
      {
        sessionId: session.id,
        message:
          "Research session started. Check status using GET /api/research/:sessionId",
      },
      202,
    );
  } catch (error) {
    console.error("[Research API] Error starting research:", error);
    if (error instanceof z.ZodError) {
      return c.json(
        { error: "Invalid request body format", details: error.errors },
        400,
      );
    }
    return c.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error starting research",
      },
      500,
    );
  }
});

// GET /:sessionId - Get the status and results of a research task
app.get("/:sessionId", async (c) => {
  try {
    const sessionId = c.req.param("sessionId");
    // Basic validation for sessionId format (e.g., UUID)
    if (
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        sessionId,
      )
    ) {
      return c.json({ error: "Invalid Session ID format" }, { status: 400 });
    }

    console.log(
      `[Research API] Received request to get status for session: ${sessionId}`,
    );

    // Get the research session data including sources and findings
    const sessionDetails = await getResearchSessionDetails(sessionId);

    // Validate the output structure (optional)
    // const validatedResponse = researchStatusResponseSchema.parse(sessionDetails);

    return c.json(sessionDetails); // Return the combined session, sources, and findings
  } catch (error) {
    console.error(
      `[Research API] Error fetching research session ${c.req.param("sessionId")}:`,
      error,
    );
    // Handle specific error for not found
    if (
      error instanceof Error &&
      error.message.startsWith("Research session not found")
    ) {
      return c.json({ error: error.message }, { status: 404 });
    }
    return c.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error fetching research status",
      },
      { status: 500 },
    );
  }
});

// Remove old routes from the previous implementation
// app.post('/research/:sessionId/update', ...)
// app.post('/research/:sessionId/sources', ...)

// Export the app handle for Vercel/Next.js
export const GET = handle(app);
export const POST = handle(app);
// Add PUT, DELETE etc. if needed later
// export const PUT = handle(app)
// export const DELETE = handle(app)
