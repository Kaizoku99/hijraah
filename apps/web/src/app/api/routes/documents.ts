import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cache } from "hono/cache";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase/client";

import type { Context } from "hono";

/**
 * Document routes for immigration document management
 */
export function setupDocumentRoutes(app: Hono) {
  // Document validation schema
  const documentSchema = z.object({
    title: z.string().min(3).max(100),
    type: z.enum([
      "passport",
      "visa",
      "birth_certificate",
      "marriage_certificate",
      "identification",
      "other",
    ]),
    expiryDate: z.string().optional(),
    countryOfIssue: z.string().optional(),
    description: z.string().optional(),
    fileKey: z.string().optional(),
    fileType: z.string().optional(),
    fileSize: z.number().optional(),
    metadata: z.record(z.any()).optional(),
  });

  // Create document
  app.post("/protected/documents", async (c: Context) => {
    const user = c.get("user");

    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized: User not found" });
    }

    try {
      // Manual validation
      const body = await c.req.json();
      const result = documentSchema.safeParse(body);

      if (!result.success) {
        console.error("Validation error:", result.error.format());
        throw new HTTPException(400, { message: "Invalid document data" });
      }

      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          title: result.data.title,
          type: result.data.type,
          expiry_date: result.data.expiryDate,
          country_of_issue: result.data.countryOfIssue,
          description: result.data.description,
          file_key: result.data.fileKey,
          file_type: result.data.fileType,
          file_size: result.data.fileSize,
          metadata: result.data.metadata,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      return c.json({
        success: true,
        document: data,
      });
    } catch (error: any) {
      console.error("Document creation error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, { message: "Failed to create document" });
    }
  });

  // Get all documents for user
  app.get(
    "/protected/documents",
    cache({
      cacheName: "user-documents",
      cacheControl: "private, max-age=60", // 1 minute
    }),
    async (c: Context) => {
      const user = c.get("user");

      if (!user) {
        throw new HTTPException(401, {
          message: "Unauthorized: User not found",
        });
      }

      const page = Number(c.req.query("page") || "1");
      const limit = Number(c.req.query("limit") || "20");
      const offset = (page - 1) * limit;
      const type = c.req.query("type");

      try {
        const supabase = createServiceClient();
        let query = supabase
          .from("documents")
          .select("*", { count: "exact" })
          .eq("user_id", user.id);

        // Add type filter if specified
        if (type) {
          query = query.eq("type", type);
        }

        // Add pagination
        query = query.range(offset, offset + limit - 1);

        const { data, error, count } = await query;

        if (error) throw error;

        return c.json({
          success: true,
          documents: data || [],
          pagination: {
            total: count || 0,
            page,
            limit,
            totalPages: count ? Math.ceil(count / limit) : 0,
          },
        });
      } catch (error: any) {
        console.error("Documents fetch error:", error);
        throw new HTTPException(500, { message: "Failed to fetch documents" });
      }
    },
  );

  // Get a specific document
  app.get("/protected/documents/:id", async (c: Context) => {
    const user = c.get("user");

    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized: User not found" });
    }

    const documentId = c.req.param("id");

    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", documentId)
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          throw new HTTPException(404, { message: "Document not found" });
        }
        throw error;
      }

      return c.json({
        success: true,
        document: data,
      });
    } catch (error: any) {
      console.error("Document fetch error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, { message: "Failed to fetch document" });
    }
  });

  // Update a document
  app.patch("/protected/documents/:id", async (c: Context) => {
    const user = c.get("user");

    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized: User not found" });
    }

    const documentId = c.req.param("id");

    try {
      // Manual validation
      const body = await c.req.json();
      const result = documentSchema.partial().safeParse(body);

      if (!result.success) {
        console.error("Validation error:", result.error.format());
        throw new HTTPException(400, { message: "Invalid document data" });
      }

      // First check if document exists and belongs to user
      const supabase = createServiceClient();
      const { data: existing, error: fetchError } = await supabase
        .from("documents")
        .select("id")
        .eq("id", documentId)
        .eq("user_id", user.id)
        .single();

      if (fetchError || !existing) {
        throw new HTTPException(404, {
          message: "Document not found or access denied",
        });
      }

      // Process the update data - convert camelCase to snake_case
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };

      if (result.data.title !== undefined) updateData.title = result.data.title;
      if (result.data.type !== undefined) updateData.type = result.data.type;
      if (result.data.expiryDate !== undefined)
        updateData.expiry_date = result.data.expiryDate;
      if (result.data.countryOfIssue !== undefined)
        updateData.country_of_issue = result.data.countryOfIssue;
      if (result.data.description !== undefined)
        updateData.description = result.data.description;
      if (result.data.fileKey !== undefined)
        updateData.file_key = result.data.fileKey;
      if (result.data.fileType !== undefined)
        updateData.file_type = result.data.fileType;
      if (result.data.fileSize !== undefined)
        updateData.file_size = result.data.fileSize;
      if (result.data.metadata !== undefined)
        updateData.metadata = result.data.metadata;

      // Update the document
      const { error: updateError } = await supabase
        .from("documents")
        .update(updateData)
        .eq("id", documentId)
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      return c.json({
        success: true,
        message: "Document updated successfully",
      });
    } catch (error: any) {
      console.error("Document update error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, { message: "Failed to update document" });
    }
  });

  // Delete a document
  app.delete("/protected/documents/:id", async (c: Context) => {
    const user = c.get("user");

    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized: User not found" });
    }

    const documentId = c.req.param("id");

    try {
      const supabase = createServiceClient();

      // First check if document exists and belongs to user
      const { data: existing, error: fetchError } = await supabase
        .from("documents")
        .select("id, file_key")
        .eq("id", documentId)
        .eq("user_id", user.id)
        .single();

      if (fetchError || !existing) {
        throw new HTTPException(404, {
          message: "Document not found or access denied",
        });
      }

      // If document has a file, delete it from storage
      if (existing.file_key) {
        const { error: storageError } = await supabase.storage
          .from("documents")
          .remove([existing.file_key]);

        if (storageError) {
          console.error("Error deleting file from storage:", storageError);
          // Continue with database deletion even if storage deletion fails
        }
      }

      // Delete the document from the database
      const { error: deleteError } = await supabase
        .from("documents")
        .delete()
        .eq("id", documentId)
        .eq("user_id", user.id);

      if (deleteError) throw deleteError;

      return c.json({
        success: true,
        message: "Document deleted successfully",
      });
    } catch (error: any) {
      console.error("Document deletion error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, { message: "Failed to delete document" });
    }
  });

  return app;
}
