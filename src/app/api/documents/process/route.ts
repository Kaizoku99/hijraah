import { createServerClient } from "@supabase/ssr";
import { TriggerClient } from "@trigger.dev/sdk";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Import createServerClient directly from @supabase/ssr
import { z } from "zod";

import type { Database } from "@/types/supabase"; // Import Database type

// We will import the task definition later to trigger it
//import { documentProcessingTask } from "@/lib/triggers/document-pipeline";
// Import TriggerClient directly from SDK

// Define the expected input schema
const ProcessRequestSchema = z.object({
  documentId: z.string().uuid(),
  filePath: z.string(),
  fileType: z.string(),
});

// Ensure API Key is available for TriggerClient initialization
// Check specifically for the public API key needed to send events
if (!process.env.TRIGGER_API_KEY) {
  console.error(
    "Missing TRIGGER_API_KEY - TriggerClient cannot be initialized to send events."
  );
  // Consider throwing an error here in production environments
  // throw new Error("Server configuration error: Missing TRIGGER_API_KEY");
}

export async function POST(request: NextRequest) {
  // Explicitly await cookies() to satisfy the linter's type expectation
  const cookieStore = await cookies();

  // Create Supabase client directly using @supabase/ssr
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Server Actions/Route Handlers need set/remove to manage session
        set(name: string, value: string, options) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Handle readonly errors if needed
          }
        },
        remove(name: string, options) {
          try {
            cookieStore.set(name, "", options);
          } catch (error) {
            // Handle readonly errors if needed
          }
        },
      },
    }
  );

  // 1. Check Authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Auth error in /api/documents/process:", authError);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Validate Input
  let validatedData;
  try {
    const body = await request.json();
    validatedData = ProcessRequestSchema.parse(body);
  } catch (error) {
    console.error("Invalid request body:", error);
    return NextResponse.json(
      {
        error: "Invalid request body",
        details: error instanceof z.ZodError ? error.errors : null,
      },
      { status: 400 }
    );
  }

  const { documentId, filePath, fileType } = validatedData;

  // 3. Verify User owns the document (optional but recommended)
  const { data: docData, error: docError } = await supabase
    .from("documents")
    .select("id")
    .eq("id", documentId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (docError || !docData) {
    console.error(
      `Document verification failed for user ${user.id} and document ${documentId}:`,
      docError
    );
    return NextResponse.json(
      { error: "Document not found or access denied" },
      { status: 404 }
    );
  }

  // 4. Send Trigger Event
  try {
    // Initialize TriggerClient inside the handler using only the public API key
    const client = new TriggerClient({
      id: "hijraah-api", // Choose a unique ID for this client instance
      // Use the public API key for sending events
      apiKey: process.env.TRIGGER_API_KEY,
      // Only include apiUrl if necessary (self-hosting, specific env)
      apiUrl: process.env.TRIGGER_API_URL,
    });

    console.log(
      `Sending 'rag-pipeline-orchestrator' event for document ${documentId}...`
    );
    // Use client.sendEvent in v3
    const event = await client.sendEvent({
      name: "rag-pipeline-orchestrator",
      payload: {
        id: documentId,
        storagePath: filePath,
        fileType: fileType,
        sourceUrl: "",
      },
    });

    console.log(
      `'rag-pipeline-orchestrator' event sent successfully for document ${documentId}, Event ID: ${event.id}`
    );

    return NextResponse.json({
      success: true,
      message: "Document processing event sent.",
      eventId: event.id,
    });
  } catch (error) {
    console.error(
      `Error sending Trigger.dev event for document ${documentId}:`,
      error
    );
    // Attempt to get more specific error details
    let errorMessage = "Failed to initiate document processing.";
    if (error instanceof Error) {
      errorMessage = `Failed to initiate document processing: ${error.message}`;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
