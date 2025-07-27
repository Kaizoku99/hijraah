import { createServerClient } from "@supabase/ssr";
import { tasks } from "@trigger.dev/sdk/v3";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { Database } from "@/types/database.types";
import type { ragPipelineTask } from "@/lib/triggers/rag-pipeline";
//     👆 **type-only** import for proper type safety

// Define the expected input schema
const ProcessRequestSchema = z.object({
  documentId: z.string().uuid(),
  filePath: z.string(),
  fileType: z.string(),
});

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

  // 3. Verify User owns the document and get document details
  const { data: docData, error: docError } = await supabase
    .from("documents")
    .select("id, filename, file_path, file_type")
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

  // 4. Trigger RAG Pipeline Task
  try {
    console.log(`Triggering RAG pipeline task for document ${documentId}...`);

    // Trigger the RAG pipeline task with proper type safety
    const handle = await tasks.trigger<typeof ragPipelineTask>(
      "rag-pipeline-orchestrator",
      {
        id: documentId,
        storagePath: filePath,
        fileType: fileType,
        sourceUrl: `file://${docData.file_path || filePath}`, // Create a file:// URL from the document's file path
      }
    );

    console.log(
      `RAG pipeline task triggered successfully for document ${documentId}, Run ID: ${handle.id}`
    );

    return NextResponse.json({
      success: true,
      message: "RAG pipeline task triggered successfully.",
      runId: handle.id,
      publicAccessToken: handle.publicAccessToken,
    });
  } catch (error) {
    console.error(
      `Error triggering RAG pipeline task for document ${documentId}:`,
      error
    );
    let errorMessage = "Failed to initiate document processing.";
    if (error instanceof Error) {
      errorMessage = `Failed to initiate document processing: ${error.message}`;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
