import { supabaseClient } from '@/lib/supabase/client';
import { Document, DocumentUpload } from '@/types/documents';
import { Database } from '@/types/database';

type Tables = Database['public']['Tables'];
type DocumentRow = Tables['documents']['Row'];
type DocumentInsert = Tables['documents']['Insert'];
type DocumentUpdate = Tables['documents']['Update'];
type DocumentShareInsert = Tables['document_shares']['Insert'];

export class DocumentService {
  private supabase = supabaseClient;

  async getDocument(id: string, userId: string): Promise<Document | null> {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data as Document | null;
  }

  async getDocuments(userId: string): Promise<Document[]> {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Document[];
  }

  async getDocumentsByCase(caseId: string, userId: string): Promise<Document[]> {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('case_id', caseId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Document[];
  }

  async getDocumentsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Document[]> {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Document[];
  }

  async createDocument(documentData: DocumentUpload): Promise<Document> {
    const { file, ...data } = documentData;
    
    // Upload file to storage
    const fileExt = file.name.split('.').pop();
    const filePath = `${data.user_id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await this.supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Create document record
    const { data: document, error } = await this.supabase
      .from('documents')
      .insert({
        ...data,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        status: 'processing',
        metadata: data.metadata || {},
      } as DocumentInsert)
      .select()
      .single();

    if (error) throw error;
    return document as Document;
  }

  async updateDocument(
    id: string,
    userId: string,
    updates: Partial<DocumentUpdate>
  ): Promise<Document> {
    const { data, error } = await this.supabase
      .from('documents')
      .update(updates as DocumentUpdate)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as Document;
  }

  async deleteDocument(id: string, userId: string): Promise<void> {
    // Get document to find file path
    const document = await this.getDocument(id, userId);
    if (!document) throw new Error('Document not found');

    // Delete file from storage
    const { error: storageError } = await this.supabase.storage
      .from('documents')
      .remove([document.file_path]);

    if (storageError) throw storageError;

    // Delete document record
    const { error } = await this.supabase
      .from('documents')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }

  async downloadDocument(document: Document): Promise<Blob> {
    const { data, error } = await this.supabase.storage
      .from('documents')
      .download(document.file_path);

    if (error) throw error;
    if (!data) throw new Error('No data received');
    
    return data;
  }

  async getUserByEmail(email: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  }

  async shareDocument(
    documentId: string, 
    ownerId: string, 
    userId: string, 
    permissions: { view: boolean; edit: boolean; share: boolean }
  ) {
    const { data, error } = await this.supabase
      .from('document_shares')
      .insert({
        document_id: documentId,
        owner_id: ownerId,
        user_id: userId,
        permissions,
        status: 'active'
      } as DocumentShareInsert)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const documentService = new DocumentService(); 