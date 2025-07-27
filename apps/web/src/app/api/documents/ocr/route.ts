import { mistral } from "@ai-sdk/mistral"; // Import Mistral provider
import { createClient } from "@supabase/supabase-js";
import { generateText } from "ai"; // Import Vercel AI SDK core function
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
// Remove direct Mistral client import
// import { Mistral } from '@mistralai/mistralai'
import { z } from "zod";
import { runMistralOCR } from "@/lib/ai/ocr";

// Define custom interfaces for Mistral OCR API responses - This might not be needed if using generateText simplifies response
// interface MistralOCRResponse { ... } // Keep for now if rawResponse metadata is used

// Initialize Supabase clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);
// Use admin client for accessing potentially restricted buckets like 'documents'
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Internal API Key for protected access
const internalApiKey = process.env.API_SECRET_KEY;

// Create a Hono app
const app = new Hono();

// Add CORS middleware
app.use("*", cors());

// Define schema for the OCR request body - Add filePath and documentId
const ocrRequestSchema = z.object({
  fileId: z.string(), // Used as primary ID for caching/linking
  chatId: z.string().optional(), // Optional, might not be present for all OCR requests
  userId: z.string().optional(),
  fileName: z.string(),
  fileType: z.string(),
  fileUrl: z.string().url().optional(),
  fileContent: z.string().optional(), // Base64 encoded content
  filePath: z.string().min(1).optional(), // Path within Supabase storage (e.g., 'documents' bucket)
  documentId: z.string().uuid().optional(), // Optional alternative ID if needed downstream
});

// Define schema for OCR result (consider if Vercel SDK response structure allows simplification)
const ocrResultSchema = z.object({
  text: z.string(),
  metadata: z
    .object({
      pageCount: z.number().optional(),
      language: z.string().optional(),
      confidence: z.number().optional(),
      processTime: z.number().optional(),
      rawResponse: z.any().optional(), // Keep if detailed response needed
    })
    .optional(),
});

// Process a document with OCR using Vercel AI SDK + Mistral
app.post("/", async (c) => {
  // Changed route to root '/' relative to /documents/ocr
  try {
    // Check for internal API call authorization first
    const authHeader = c.req.header("Authorization");
    const isInternalCall =
      internalApiKey && authHeader === `Bearer ${internalApiKey}`;

    if (!isInternalCall) {
      // Add checks for external user authentication if needed (e.g., JWT, session)
      // For now, assume external calls are allowed if not explicitly internal
      console.log("[OCR API] Processing external request.");
    } else {
      console.log("[OCR API] Processing internal request.");
    }

    // Parse and validate request body
    const body = await c.req.json();
    const validation = ocrRequestSchema.safeParse(body);

    if (!validation.success) {
      return c.json(
        { error: "Invalid input", details: validation.error.errors },
        400
      );
    }
    const validatedData = validation.data;
    const fileId = validatedData.fileId; // Use fileId consistently

    console.log(`[OCR API] Request received for fileId: ${fileId}`);

    // Check if result is already cached in Supabase
    // Ensure chatId is present for caching key if it's required context
    const { data: cachedResult, error: cacheError } = await supabase
      .from("document_ocr_results")
      .select("result")
      .eq("file_id", fileId)
      // Add .eq('chat_id', validatedData.chatId) if chatId is part of the unique key
      .maybeSingle();

    if (cacheError) {
      console.error(
        `[OCR API] Error checking cache for fileId ${fileId}:`,
        cacheError
      );
      // Decide if this should be fatal or just log and continue
    }

    if (cachedResult) {
      console.log(`[OCR API] Cache hit for fileId: ${fileId}`);
      return c.json(cachedResult.result);
    }
    console.log(`[OCR API] Cache miss for fileId: ${fileId}. Processing...`);

    let fileBuffer: Buffer | null = null;
    let fileSourceDescription = "";

    // --- File Fetching Logic ---
    if (validatedData.fileContent) {
      console.log(
        `[OCR API] Using provided base64 content for fileId: ${fileId}`
      );
      fileBuffer = Buffer.from(validatedData.fileContent, "base64");
      fileSourceDescription = "provided base64 content";
    } else if (validatedData.fileUrl) {
      console.log(`[OCR API] Fetching from URL for fileId: ${fileId}`);
      fileSourceDescription = `URL: ${validatedData.fileUrl}`;
      try {
        const response = await fetch(validatedData.fileUrl);
        if (!response.ok)
          throw new Error(`Failed to fetch from URL: ${response.statusText}`);
        const arrayBuffer = await response.arrayBuffer();
        fileBuffer = Buffer.from(arrayBuffer);
      } catch (fetchError) {
        console.error(
          `[OCR API] Error fetching file from URL ${validatedData.fileUrl} for fileId ${fileId}:`,
          fetchError
        );
        return c.json(
          {
            error: `Failed to fetch file from provided URL: ${(fetchError as Error).message}`,
          },
          500
        );
      }
    } else if (validatedData.filePath) {
      console.log(
        `[OCR API] Fetching from storage path: ${validatedData.filePath} for fileId: ${fileId}`
      );
      fileSourceDescription = `storage path: ${validatedData.filePath}`;
      // Determine bucket based on call type or context if needed
      // Assuming 'documents' bucket for filePath, 'chat-attachments' for chatId based path
      const bucket = validatedData.chatId ? "chat-attachments" : "documents";
      const path = validatedData.chatId
        ? `${validatedData.chatId}/${fileId}`
        : validatedData.filePath;

      console.log(
        `[OCR API] Attempting download from bucket '${bucket}', path '${path}'`
      );

      // Use supabaseAdmin if accessing restricted buckets like 'documents'
      const client = bucket === "documents" ? supabaseAdmin : supabase;
      const { data: fileData, error: downloadError } = await client.storage
        .from(bucket)
        .download(path);

      if (downloadError) {
        console.error(
          `[OCR API] Error downloading file ${path} from bucket ${bucket} for fileId ${fileId}:`,
          downloadError
        );
        return c.json(
          {
            error: `Failed to download document from storage (${bucket}): ${downloadError.message}`,
          },
          500
        );
      }
      if (!fileData) {
        console.error(
          `[OCR API] No file data found for path ${path} in bucket ${bucket}, fileId ${fileId}.`
        );
        return c.json({ error: "Document not found in storage" }, 404);
      }
      fileBuffer = Buffer.from(await fileData.arrayBuffer());
      console.log(
        `[OCR API] Successfully downloaded ${path} from bucket ${bucket}`
      );
    } else {
      console.error(
        `[OCR API] No file content, URL, or path provided for fileId: ${fileId}`
      );
      return c.json({ error: "No file content, URL, or path provided" }, 400);
    }

    if (!fileBuffer) {
      console.error(
        `[OCR API] Failed to obtain file buffer for fileId: ${fileId} from ${fileSourceDescription}`
      );
      return c.json({ error: "Failed to obtain file buffer" }, 500);
    }
    console.log(
      `[OCR API] File buffer obtained (size: ${fileBuffer.length} bytes) for fileId: ${fileId}`
    );

    // --- Call shared OCR util ---
    try {
      console.log(`[OCR API] Running runMistralOCR util for fileId: ${fileId}`);
      const startTime = Date.now();
      const extractedText = await runMistralOCR(
        fileBuffer,
        validatedData.fileType
      );
      const processTime = Date.now() - startTime;
      console.log(
        `[OCR API] OCR completed for fileId: ${fileId} in ${processTime}ms.`
      );

      // Build result compatible with previous schema
      const ocrResult = {
        text: extractedText,
        metadata: {
          language: undefined,
          confidence: undefined,
          processTime,
        },
      } satisfies z.infer<typeof ocrResultSchema>;

      // Cache the result in Supabase
      console.log(`[OCR API] Caching OCR result for fileId: ${fileId}`);
      const { error: upsertError } = await supabase
        .from("document_ocr_results")
        .upsert(
          {
            file_id: fileId,
            chat_id: validatedData.chatId, // Ensure chatId is included if part of the primary key
            user_id: validatedData.userId,
            file_name: validatedData.fileName,
            file_type: validatedData.fileType,
            result: ocrResult, // Cache the standardized result
            created_at: new Date().toISOString(),
          },
          { onConflict: "file_id" }
        ); // Specify conflict resolution if needed

      if (upsertError) {
        console.error(
          `[OCR API] Error caching OCR result for fileId ${fileId}:`,
          upsertError
        );
        // Decide if this should be fatal or just logged
      } else {
        console.log(
          `[OCR API] Successfully cached OCR result for fileId: ${fileId}`
        );
      }

      return c.json(ocrResult);
    } catch (aiError) {
      console.error(
        `[OCR API] Vercel AI SDK/Mistral error for fileId ${fileId}:`,
        aiError
      );
      return c.json(
        {
          error:
            aiError instanceof Error
              ? aiError.message
              : "Failed to process document with AI OCR",
        },
        500 // Use 500 for AI backend errors
      );
    }
  } catch (error) {
    console.error("[OCR API] General error:", error);
    // Distinguish Zod errors for 400 response
    if (error instanceof z.ZodError) {
      return c.json(
        { error: "Invalid request body format", details: error.errors },
        400
      );
    }
    return c.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      500
    );
  }
});

// Answer a question about a document using Mistral AI (Leveraging cached OCR)
// Keep this route as it provides distinct Q&A functionality
app.post("/question", async (c) => {
  try {
    const body = await c.req.json();
    // Add validation for this request body
    const { fileId, question, chatId, userId } = body;

    if (!fileId || !question) {
      return c.json({ error: "Missing fileId or question" }, 400);
    }

    console.log(`[OCR Q&A] Request received for fileId: ${fileId}`);

    // Fetch OCR result from Supabase
    const { data: ocrData, error: ocrError } = await supabase
      .from("document_ocr_results")
      .select("result")
      .eq("file_id", fileId)
      // Add .eq('chat_id', chatId) if needed
      .maybeSingle(); // Use maybeSingle to handle null gracefully

    if (ocrError || !ocrData || !ocrData.result?.text) {
      console.error(
        `[OCR Q&A] Error fetching cached OCR result for fileId ${fileId}:`,
        ocrError || "Not Found"
      );
      return c.json(
        { error: "Failed to fetch or parse OCR result for Q&A" },
        404
      ); // 404 if not found/processed
    }
    console.log(`[OCR Q&A] Found cached OCR text for fileId: ${fileId}`);

    // Generate an answer using Mistral AI SDK via generateText
    try {
      console.log(
        `[OCR Q&A] Sending Q&A request to Mistral via Vercel AI SDK for fileId: ${fileId}`
      );
      const startTime = Date.now();
      const {
        text: answer,
        usage,
        finishReason,
      } = await generateText({
        model: mistral("mistral-large-latest"), // Can use the same model instance
        messages: [
          {
            role: "system",
            content:
              "You are a helpful document analysis assistant. Answer questions based *only* on the provided document content accurately and concisely. If the answer is not in the text, say so.",
          },
          {
            role: "user",
            content: `Document content:

${ocrData.result.text}

---

Question: ${question}`,
          },
        ],
        // maxTokens: 1024 // Adjust if needed
      });
      const processTime = Date.now() - startTime;
      console.log(
        `[OCR Q&A] Received answer from Mistral via Vercel AI SDK for fileId: ${fileId}. Time: ${processTime}ms. Reason: ${finishReason}. Usage: ${JSON.stringify(usage)}`
      );

      const finalAnswer =
        answer || "Unable to answer this question based on the provided text.";

      // Store the Q&A history in Supabase
      const { error: historyError } = await supabase
        .from("document_qa_history")
        .insert({
          file_id: fileId,
          chat_id: chatId,
          user_id: userId,
          question,
          answer: finalAnswer,
          created_at: new Date().toISOString(),
        });

      if (historyError) {
        console.error(
          `[OCR Q&A] Error saving Q&A history for fileId ${fileId}:`,
          historyError
        );
        // Log error but likely still return the answer
      }

      return c.json({ answer: finalAnswer });
    } catch (mistralError) {
      console.error(
        `[OCR Q&A] Vercel AI SDK/Mistral chat error for fileId ${fileId}:`,
        mistralError
      );
      return c.json(
        {
          error:
            (mistralError as Error).message ||
            "Failed to process question with Mistral AI",
        },
        500 // Use 500 for AI backend errors
      );
    }
  } catch (error) {
    console.error("[OCR Q&A] General error:", error);
    return c.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error in Q&A",
      },
      500
    );
  }
});

// Get document question history (Keep as is)
app.get("/:fileId/history", async (c) => {
  try {
    const fileId = c.req.param("fileId");
    // Add validation for fileId if needed

    console.log(`[OCR History] Request received for fileId: ${fileId}`);

    // Fetch question history from Supabase
    const { data, error } = await supabase
      .from("document_qa_history")
      .select("question, answer, created_at")
      .eq("file_id", fileId)
      .order("created_at", { ascending: false }); // Example ordering

    if (error) {
      console.error(
        `[OCR History] Error fetching history for fileId ${fileId}:`,
        error
      );
      return c.json({ error: "Failed to fetch question history" }, 500);
    }

    return c.json(data || []);
  } catch (error) {
    console.error("[OCR History] General error:", error);
    return c.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error fetching history",
      },
      500
    );
  }
});

// Export the app handle for Vercel/Next.js
export const GET = handle(app);
export const POST = handle(app);
// Add PUT, DELETE etc. if needed later
// export const PUT = handle(app)
// export const DELETE = handle(app)

// Add runtime export if necessary (Node.js often better for Buffer operations)
// export const runtime = 'nodejs'; // or 'edge'

// export const runtime = 'nodejs'; // or 'edge'
