import { mistral } from "@ai-sdk/mistral";
import { zValidator } from "@hono/zod-validator";
import { generateObject } from "ai";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { z } from "zod";

// Ensure these environment variables are set
const internalApiKey = process.env.API_SECRET_KEY;
const mistralApiKey = process.env.MISTRAL_API_KEY;

if (!internalApiKey || !mistralApiKey) {
  console.error(
    "Missing required environment variables for Classification API",
  );
}

// --- Schemas --- //
const ClassificationRequestSchema = z.object({
  documentId: z.string().uuid().optional(), // Allow optional for flexibility
  text: z.string().min(10), // Require some minimum text length
});

const IMMIGRATION_CATEGORIES = [
  "visa_application",
  "residency_permit",
  "passport",
  "work_permit",
  "family_reunion",
  "asylum_application",
  "citizenship",
  "immigration_policy",
  "legal_document",
  "personal_identification",
  "travel_document",
  "financial_statement",
  "educational_credential",
  "other",
] as const;

const ClassificationResponseSchema = z.object({
  primary_category: z.enum(IMMIGRATION_CATEGORIES),
  confidence: z.number().min(0).max(1),
  secondary_categories: z
    .array(
      z.object({
        category: z.enum(IMMIGRATION_CATEGORIES),
        confidence: z.number().min(0).max(1),
      }),
    )
    .optional(),
  document_language: z.string().optional(),
  contains_personal_data: z.boolean().optional(),
});

// --- Hono App Setup --- //
// Base path will be determined by how it's mounted in the main documents app
// Or keep it simple here and mount with prefix later.
const app = new Hono();

// --- Middleware --- //
app.use("*", cors());

// Authentication Middleware
app.use("*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (authHeader !== `Bearer ${internalApiKey}` || !internalApiKey) {
    console.warn("Unauthorized attempt to access internal Classification API");
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
});

// ---------------- Deprecation Gate (DP-3) ----------------
const legacyApisEnabled =
  process.env.LEGACY_DOC_APIS === undefined ||
  process.env.LEGACY_DOC_APIS.toLowerCase() === "true";

// Preflight middleware
app.use("*", async (c, next) => {
  if (!legacyApisEnabled) {
    c.header("X-Deprecation", "This endpoint is deprecated and disabled");
    c.header("Access-Control-Expose-Headers", "X-Deprecation");
    return c.json({ error: "Endpoint deprecated" }, 410);
  }
  c.header(
    "X-Deprecation",
    "This endpoint is deprecated; migrate to DocumentProcessor inline classification",
  );
  c.header("Access-Control-Expose-Headers", "X-Deprecation");
  await next();
});

// --- Embedding Model --- //
const classificationModel = mistralApiKey
  ? mistral("mistral-large-latest")
  : null; // Or mistral-small

// --- Route --- //
app.post("/", zValidator("json", ClassificationRequestSchema), async (c) => {
  if (!classificationModel) {
    console.error(
      "Classification model not initialized due to missing API key.",
    );
    return c.json({ error: "Classification service not configured" }, 503);
  }

  const { documentId, text } = c.req.valid("json");
  console.log(
    `[Classify API] Received request for documentId: ${documentId ?? "N/A"}`,
  );

  try {
    const textSample = text.slice(0, 15000); // Limit input text

    const { object: classificationResult, usage } = await generateObject({
      model: classificationModel,
      schema: ClassificationResponseSchema,
      schemaName: "DocumentClassification",
      schemaDescription: "Classification of an immigration-related document.",
      prompt: `Analyze the following document text and classify it according to the provided schema. Identify the primary category, estimate confidence, list any relevant secondary categories, determine the language, and assess if it contains personal data (like names, addresses, ID numbers). Document Text: \n\n---\n${textSample}\n---
`,
      // temperature: 0.2,
    });

    console.log(
      `[Classify API] Successfully classified doc ${documentId ?? "N/A"}. Usage:`,
      usage,
    );

    return c.json({ classification: classificationResult });
  } catch (error) {
    console.error("[Classify API] Error:", error);
    let errorMessage =
      "Internal server error processing classification request";
    let statusCode = 500;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return c.json({ error: errorMessage }, statusCode as any);
  }
});

// --- Export Hono App --- //
// The final export might need adjustment depending on how it integrates
// with the main /api/documents/ route if that also uses Hono.
// For now, export handlers directly.
export const POST = handle(app);

// Optional: Specify runtime
// export const runtime = 'edge';
