/// <reference lib="deno.ns" />

import {
  createClient,
  SupabaseClient,
} from "jsr:@supabase/supabase-js@^2.43.4";

import { corsHeaders } from "../_shared/cors.ts"; // Assuming shared CORS headers

console.log("Document Processor Function Initializing");

// Define the expected structure of the webhook payload (adjust as needed)
// Based on Supabase DB webhooks: https://supabase.com/docs/guides/database/webhooks
interface DocumentWebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record?: Record<string, any>; // The new record data for INSERT/UPDATE
  old_record?: Record<string, any>; // The old record data for UPDATE/DELETE
}

// --- Supabase Client Initialization ---
let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      // Required for service role key
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      // Deno needs fetch explicitly passed sometimes
      fetch: fetch,
    },
  });
  console.log("Supabase client initialized.");
  return supabaseClient;
}

// --- Core Processing Logic ---

async function processDocument(document: Record<string, any>) {
  const supabase = getSupabaseClient();
  const documentId = document.id;
  const filePath = document.file_path;
  const bucket = "documents"; // Assuming the same bucket

  if (!documentId || !filePath) {
    console.error("Invalid document record received:", document);
    throw new Error("Missing document ID or file path in payload.");
  }

  console.log(`Processing document ID: ${documentId}, Path: ${filePath}`);

  // 1. Update status to 'processing'
  try {
    const { error: updateProcessError } = await supabase
      .from("documents")
      .update({ status: "processing" })
      .eq("id", documentId);
    if (updateProcessError) {
      throw new Error(
        `Failed to update status to 'processing': ${updateProcessError.message}`,
      );
    }
    console.log(`Document ${documentId} status set to 'processing'.`);
  } catch (error) {
    console.error(
      `Error updating status to processing for ${documentId}:`,
      error,
    );
    // Don't necessarily stop here, maybe processing can still occur,
    // but log it. If critical, re-throw.
    throw error; // Rethrow if setting processing status is critical
  }

  // 2. Download the file from Storage
  let fileContent: ArrayBuffer;
  try {
    console.log(
      `Downloading file from bucket '${bucket}', path '${filePath}'...`,
    );
    const { data: blob, error: downloadError } = await supabase.storage
      .from(bucket)
      .download(filePath);

    if (downloadError) {
      throw new Error(`Storage download error: ${downloadError.message}`);
    }
    if (!blob) {
      throw new Error("Downloaded file blob is null.");
    }
    fileContent = await blob.arrayBuffer();
    console.log(
      `Successfully downloaded ${fileContent.byteLength} bytes for document ${documentId}.`,
    );
  } catch (error) {
    console.error(`Error downloading file for document ${documentId}:`, error);
    // Update status to 'failed' before throwing
    await supabase
      .from("documents")
      .update({ status: "failed" })
      .eq("id", documentId);
    console.log(
      `Document ${documentId} status set to 'failed' due to download error.`,
    );
    throw error; // Propagate error
  }

  // 3. *** Perform Actual Document Processing Here ***
  //    This is where you'd integrate your OCR library, analysis tools, etc.
  //    Example: const analysisResult = await runOCR(Buffer.from(fileContent));
  let processingResult = {}; // Placeholder for results
  let processingError = null;
  try {
    console.log(
      `Starting placeholder processing for document ${documentId}...`,
    );
    // --- Replace with your actual processing logic ---
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate work
    processingResult = {
      extractedText: "This is placeholder text.",
      pageCount: 1,
    };
    console.log(`Placeholder processing complete for document ${documentId}.`);
    // --------------------------------------------------
  } catch (error) {
    console.error(
      `Error during processing logic for document ${documentId}:`,
      error,
    );
    processingError = error; // Store error to update status later
  }

  // 4. Update status based on processing outcome
  try {
    const finalStatus = processingError ? "failed" : "complete";
    const updatePayload: Record<string, any> = { status: finalStatus };

    // Add processing results if successful (adjust fields based on your schema)
    if (finalStatus === "complete" && processingResult) {
      // Example: Storing extracted text (ensure 'extracted_text' column exists)
      // updatePayload.extracted_text = processingResult.extractedText;
      // updatePayload.metadata = { pageCount: processingResult.pageCount };
    }

    const { error: updateFinalError } = await supabase
      .from("documents")
      .update(updatePayload)
      .eq("id", documentId);

    if (updateFinalError) {
      throw new Error(
        `Failed to update status to '${finalStatus}': ${updateFinalError.message}`,
      );
    }
    console.log(`Document ${documentId} status set to '${finalStatus}'.`);

    // If processing failed, re-throw the original processing error
    if (processingError) {
      throw processingError;
    }
  } catch (error) {
    console.error(
      `Error finalizing status or processing error for document ${documentId}:`,
      error,
    );
    // If updating the final status fails, it's hard to recover state automatically.
    // Log extensively. Manual intervention might be needed.
    throw error; // Propagate error
  }
}

// --- Server Handler ---

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: DocumentWebhookPayload = await req.json();
    console.log("Received webhook payload:", JSON.stringify(payload, null, 2));

    // Process only INSERT or UPDATE events that include a 'record'
    // And specifically when status becomes 'uploaded' (or handle INSERT directly if needed)
    // This logic depends on how your webhook/trigger is configured.
    // Example: Trigger on INSERT or UPDATE when new status is 'uploaded'
    if (
      (payload.type === "INSERT" || payload.type === "UPDATE") &&
      payload.record
    ) {
      // Adapt this condition based on your trigger setup
      const triggerProcessing =
        payload.type === "INSERT" || // Process all new inserts?
        (payload.type === "UPDATE" &&
          payload.record.status === "uploaded" &&
          payload.old_record?.status !== "uploaded"); // Process only when status changes TO uploaded

      if (triggerProcessing) {
        console.log(
          `Trigger condition met for document ID: ${payload.record.id}`,
        );
        await processDocument(payload.record);
        return new Response(
          JSON.stringify({
            message: `Processed document ${payload.record.id}`,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      } else {
        console.log(
          `Skipping processing for document ${payload.record.id} - Condition not met (Type: ${payload.type}, Status: ${payload.record.status})`,
        );
        return new Response(
          JSON.stringify({ message: "Skipped processing - condition not met" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200, // Acknowledge receipt, even if skipped
          },
        );
      }
    } else {
      console.log("Webhook payload type not processed:", payload.type);
      return new Response(
        JSON.stringify({ message: "Payload type not processed" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400, // Bad Request or 200 if simply acknowledging
        },
      );
    }
  } catch (error: any) {
    console.error("Error processing webhook request:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

// Example Usage (for local testing with Deno run --allow-net --allow-env index.ts):
/*
  curl -X POST http://localhost:<PORT> \\
  -H "Content-Type: application/json" \\
  -d '{ \\
    "type": "UPDATE", \\
    "table": "documents", \\
    "schema": "public", \\
    "record": { \\
      "id": "your-document-id", \\
      "file_path": "user_uploads/user-id/your-document-id.pdf", \\
      "status": "uploaded" \\
      /* ... other fields ... * / \\
    }, \\
    "old_record": { \\
        "status": "uploading" \\
        /* ... other old fields ... * / \\
    } \\
  }'
*/
