import { Session } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { z } from "zod";

import { getSupabaseClient } from "@/lib/supabase/client";

// Define a DataStream interface to match the expected structure
interface DataStream {
  writeData: (data: any) => void;
}

/**
 * Factory function that creates a document update tool
 * This enables the AI to update existing documents
 */
export function updateDocumentTool({
  session,
  dataStream,
}: {
  session: Session | null;
  dataStream?: DataStream;
}) {
  return {
    description: "Update an existing document with new content or changes.",
    parameters: z.object({
      id: z.string().describe("ID of the document to update"),
      title: z.string().optional().describe("New title for the document"),
      content: z
        .string()
        .describe("New content or changes to make to the document"),
      appendOnly: z
        .boolean()
        .optional()
        .default(false)
        .describe("If true, append content instead of replacing it"),
    }),
    execute: async ({
      id,
      title,
      content,
      appendOnly = false,
    }: {
      id: string;
      title?: string;
      content: string;
      appendOnly?: boolean;
    }) => {
      try {
        if (!session?.user?.id) {
          throw new Error("User is not authenticated");
        }

        // Emit a notification event through the data stream if available
        if (dataStream) {
          dataStream.writeData({
            type: "document-update",
            content: {
              id,
              title,
              status: "pending",
            },
          });
        }

        // Get the current document to check ownership and possibly append
        const supabase = getSupabaseClient();
        const { data: existingDoc, error: fetchError } = await supabase
          .from("documents")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError || !existingDoc) {
          throw new Error("Document not found or access denied");
        }

        // Verify ownership
        if (existingDoc.user_id !== session.user.id) {
          throw new Error("You do not have permission to update this document");
        }

        // Prepare the update data
        const updateData: Record<string, any> = {
          updated_at: new Date().toISOString(),
        };

        // Update title if provided
        if (title) {
          updateData.title = title;
        }

        // Update content based on appendOnly flag
        if (appendOnly) {
          updateData.content = existingDoc.content + "\n\n" + content;
        } else {
          updateData.content = content;
        }

        // Update the document
        const { data, error } = await supabase
          .from("documents")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        // Emit a notification event through the data stream if available
        if (dataStream) {
          dataStream.writeData({
            type: "document-update",
            content: {
              id,
              title: data.title,
              status: "completed",
            },
          });
        }

        return {
          success: true,
          document: data,
        };
      } catch (error) {
        console.error("Document update error:", error);

        // Emit error notification through the data stream if available
        if (dataStream) {
          dataStream.writeData({
            type: "document-update",
            content: {
              id,
              status: "error",
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to update document",
            },
          });
        }

        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to update document",
        };
      }
    },
  };
}
