import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { nanoid } from "nanoid";
import { z } from "zod";

import {
  analyzeDocument,
  validateAgainstTemplate,
} from "@/lib/ai/document-analyzer";
import { saveDocumentAnalysisResult } from "@/lib/document/analysis-storage";
import { DocumentAnalysisRequestSchema } from "@/types/domain/documents"; // Assuming this defines POST input

// --- Hono App Setup --- //
const app = new Hono();

// --- Middleware --- //
app.use("*", cors());
// TODO: Add user authentication middleware

// --- Schemas --- //
// POST request schema is imported: DocumentAnalysisRequestSchema

// PUT request schema for validation
const ValidationRequestSchema = z.object({
  documentType: z.string(),
  extractedData: z.record(z.any()),
  targetCountry: z.string().optional(),
});

// Response Schema (optional, but good practice)
const AnalysisResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  documentId: z.string().uuid().optional(), // Include documentId if generated
});

// --- Routes --- //

// POST / - Analyze a document
app.post("/", zValidator("json", DocumentAnalysisRequestSchema), async (c) => {
  // TODO: Get userId from authenticated session via middleware
  // const userId = c.get('userId');
  // if (!userId) return c.json({ error: "Unauthorized" }, 401);
  const userId = "placeholder-user-id"; // Placeholder

  const {
    documentType,
    fileUrl,
    // documentId is handled below
  } = c.req.valid("json");
  const requestBody = await c.req.json(); // Get raw body to check for existing documentId
  const documentId = requestBody.documentId || nanoid();

  try {
    console.log(
      `[Doc Analysis API] Analyzing doc type: ${documentType}, URL: ${fileUrl}`
    );
    const analysisResult = await analyzeDocument(fileUrl, documentType);

    // Save analysis result (using placeholder userId)
    await saveDocumentAnalysisResult({
      userId,
      documentType,
      analysisResult,
      fileUrl,
    });

    console.info(
      `[Doc Analysis API] Analysis saved for doc: ${documentId}, user: ${userId}`
    );

    return c.json({
      success: true,
      data: analysisResult,
      documentId,
    });
  } catch (error) {
    console.error("[Doc Analysis API] POST Error:", error);
    let status = 500;
    let message = "An unknown error occurred during analysis";
    if (error instanceof Error && error.message.includes("not found")) {
      status = 404;
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return c.json({ success: false, error: message }, { status });
  }
});

// PUT / - Validate extracted data against a template
app.put(
  "/validate", // Changed path to be more specific
  zValidator("json", ValidationRequestSchema),
  async (c) => {
    // TODO: Add authentication if needed

    const { documentType, extractedData, targetCountry } = c.req.valid("json");

    try {
      console.log(
        `[Doc Analysis API] Validating data for type: ${documentType}`
      );
      const validationResult = await validateAgainstTemplate(
        documentType,
        extractedData,
        targetCountry
      );

      return c.json({
        success: true,
        data: validationResult,
      });
    } catch (error) {
      console.error("[Doc Analysis API] PUT /validate Error:", error);
      let status = 500;
      let message = "An unknown error occurred during validation";
      if (error instanceof Error) {
        message = error.message;
      }
      return c.json({ success: false, error: message }, { status });
    }
  }
);

// --- Export Hono App --- //
export const POST = handle(app);
export const PUT = handle(app);

// Set runtime preference
export const runtime = "edge";
