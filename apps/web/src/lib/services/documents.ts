import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type DocumentInsert =
  Database["public"]["Tables"]["documents"]["Insert"];
export type DocumentUpdate =
  Database["public"]["Tables"]["documents"]["Update"];

export const documentsService = {
  async getDocuments(caseId?: string) {
    const supabase = createClient();
    const query = supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (caseId) {
      query.eq("case_id", caseId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getDocumentById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async uploadDocument(file: File, caseId: string) {
    const supabase = createClient();

    // Upload file to storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${caseId}/${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("documents").getPublicUrl(fileName);

    // Create document record
    const { data, error } = await supabase
      .from("documents")
      .insert({
        case_id: caseId,
        name: file.name,
        type: file.type,
        size: file.size,
        url: publicUrl,
        path: fileName,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteDocument(id: string) {
    const supabase = createClient();

    // Get document to delete file from storage
    const { data: document, error: fetchError } = await supabase
      .from("documents")
      .select("path")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Delete file from storage
    if (document?.path) {
      const { error: storageError } = await supabase.storage
        .from("documents")
        .remove([document.path]);

      if (storageError) throw storageError;
    }

    // Delete document record
    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) throw error;
  },
};

// Export aliases for backward compatibility
export const documentService = documentsService;
export const DocumentService = documentsService;
