import { mistral } from "@ai-sdk/mistral";
import { zValidator } from "@hono/zod-validator";
import { embed, embedMany } from "ai";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { z } from "zod";

import { recursiveCharacterTextSplitter } from "@/lib/ai/chunking"; // Ensure this utility exists and is compatible

// Ensure these environment variables are set
const internalApiKey = process.env.API_SECRET_KEY;
const mistralApiKey = process.env.MISTRAL_API_KEY;

if (!internalApiKey || !mistralApiKey) {
  console.error("Missing required environment variables for Embedding API");
  // Potentially throw an error or prevent startup in a real application
}

// --- Hono App Setup --- //
const app = new Hono().basePath("/api/embeddings");

// --- Middleware --- //
app.use("*", cors());

// Authentication Middleware
app.use("*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (authHeader !== `Bearer ${internalApiKey}` || !internalApiKey) {
    console.warn("Unauthorized attempt to access internal Embedding API");
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
});

// ---------------- Deprecation Gate (DP-3) ----------------
const legacyApisEnabled =
  process.env.LEGACY_DOC_APIS === undefined ||
  process.env.LEGACY_DOC_APIS.toLowerCase() === "true";

app.use("*", async (c, next) => {
  if (!legacyApisEnabled) {
    c.header("X-Deprecation", "This endpoint is deprecated and disabled");
    c.header("Access-Control-Expose-Headers", "X-Deprecation");
    return c.json({ error: "Endpoint deprecated" }, 410 as any);
  }
  c.header(
    "X-Deprecation",
    "This endpoint is deprecated; migrate to DocumentProcessor inline embedding generation",
  );
  c.header("Access-Control-Expose-Headers", "X-Deprecation");
  await next();
});

// --- Schemas --- //
const EmbeddingRequestSchema = z.object({
  text: z.string().min(1, "Text cannot be empty"),
  documentId: z.string().uuid().optional(), // Optional, for logging/context
  isQuery: z.boolean().optional().default(false), // Differentiate query vs document
});

// --- Embedding Model --- //
// Check for API key presence during model initialization might be redundant
// if the SDK handles it, but kept for clarity.
const embeddingModel = mistralApiKey
  ? mistral.embedding("mistral-embed")
  : null;

// --- Route --- //
app.post("/", zValidator("json", EmbeddingRequestSchema), async (c) => {
  if (!embeddingModel) {
    console.error("Embedding model not initialized due to missing API key.");
    return c.json({ error: "Embedding service not configured" }, 503);
  }

  const { documentId, text, isQuery } = c.req.valid("json");

  try {
    if (isQuery) {
      // --- Handle Single Query Embedding ---
      console.log(`[Embed API] Generating embedding for query`);
      const { embedding, usage } = await embed({
        model: embeddingModel,
        value: text,
      });
      console.log(`[Embed API] Query embedding generated. Usage:`, usage);
      return c.json({ embedding });
    } else {
      // --- Handle Document Chunk Embedding ---
      console.log(
        `[Embed API] Generating embeddings for documentId: ${documentId ?? "N/A"}`,
      );

      // Chunk the text
      const textChunks = recursiveCharacterTextSplitter(text, {
        // Adjust chunkSize/chunkOverlap if needed
        // chunkSize: 1000,
        // chunkOverlap: 100,
      });
      console.log(`[Embed API] Text chunked into ${textChunks.length} pieces.`);

      if (textChunks.length === 0) {
        console.warn(
          `[Embed API] No text chunks generated for documentId: ${documentId ?? "N/A"}.`,
        );
        return c.json({ chunks: [] }); // Return empty if no chunks
      }

      // Generate embeddings for all chunks
      const { embeddings, usage } = await embedMany({
        model: embeddingModel,
        values: textChunks,
      });
      console.log(
        `[Embed API] Batch embedding generated ${embeddings.length} vectors. Usage:`,
        usage,
      );

      // Combine chunks with their embeddings
      const chunksWithEmbeddings = textChunks.map(
        (chunkText: string, index: number) => ({
          index: index,
          text: chunkText,
          embedding: embeddings[index], // Assumes order matches
        }),
      );

      return c.json({ chunks: chunksWithEmbeddings });
    }
  } catch (error) {
    console.error("[Embed API] Error:", error);
    let errorMessage = "Internal server error processing embedding request";
    let statusCode = 500;
    if (error instanceof Error) {
      errorMessage = error.message;
      // Potentially check for specific AI SDK or API errors for better status codes
    }
    return c.json({ error: errorMessage }, statusCode as any);
  }
});

// --- Export Hono App --- //
export const POST = handle(app);
// Removed GET handler logic (moved responsibility elsewhere)

// Optional: Specify runtime (Node.js likely needed for chunking library)
export const runtime = "nodejs";
