import { createClient } from '@supabase/supabase-js';

import { DocumentAnalysis, DocumentType } from '@/types/documents';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Save document analysis result to the database
 */
export async function saveDocumentAnalysisResult(analysisResult: Omit<DocumentAnalysis, 'id'>): Promise<DocumentAnalysis> {
  const { data, error } = await supabase
    .from('document_analyses')
    .insert({
      user_id: analysisResult.userId,
      document_type: analysisResult.documentType,
      file_name: analysisResult.fileName,
      file_url: analysisResult.fileUrl,
      extracted_data: analysisResult.extractedData,
      analysis_date: analysisResult.analysisDate.toISOString(),
      status: analysisResult.status,
      error_message: analysisResult.errorMessage,
      confidence: analysisResult.confidence,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving document analysis result:', error);
    throw new Error(`Failed to save document analysis: ${error.message}`);
  }

  return {
    id: data.id,
    userId: data.user_id,
    documentType: data.document_type as DocumentType,
    fileName: data.file_name,
    fileUrl: data.file_url,
    extractedData: data.extracted_data,
    analysisDate: new Date(data.analysis_date),
    status: data.status,
    errorMessage: data.error_message,
    confidence: data.confidence,
  };
}

/**
 * Get document analysis result by ID
 */
export async function getDocumentAnalysisById(id: string): Promise<DocumentAnalysis | null> {
  const { data, error } = await supabase
    .from('document_analyses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error fetching document analysis:', error);
    throw new Error(`Failed to fetch document analysis: ${error.message}`);
  }

  return {
    id: data.id,
    userId: data.user_id,
    documentType: data.document_type as DocumentType,
    fileName: data.file_name,
    fileUrl: data.file_url,
    extractedData: data.extracted_data,
    analysisDate: new Date(data.analysis_date),
    status: data.status,
    errorMessage: data.error_message,
    confidence: data.confidence,
  };
}

/**
 * Get document analyses by user ID
 */
export async function getDocumentAnalysesByUserId(userId: string): Promise<DocumentAnalysis[]> {
  const { data, error } = await supabase
    .from('document_analyses')
    .select('*')
    .eq('user_id', userId)
    .order('analysis_date', { ascending: false });

  if (error) {
    console.error('Error fetching document analyses:', error);
    throw new Error(`Failed to fetch document analyses: ${error.message}`);
  }

  return data.map(item => ({
    id: item.id,
    userId: item.user_id,
    documentType: item.document_type as DocumentType,
    fileName: item.file_name,
    fileUrl: item.file_url,
    extractedData: item.extracted_data,
    analysisDate: new Date(item.analysis_date),
    status: item.status,
    errorMessage: item.error_message,
    confidence: item.confidence,
  }));
} 