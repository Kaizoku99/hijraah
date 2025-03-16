import { DocumentAnalysis, DocumentType } from '@/types/documents';
import { getSupabaseClient } from '@/lib/supabase/client';

export async function saveDocumentAnalysisResult(
  documentId: string,
  userId: string,
  documentType: DocumentType,
  analysis: DocumentAnalysis,
  fileUrl: string
): Promise<string> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('document_analysis_results')
      .insert({
        document_id: documentId,
        user_id: userId,
        document_type: documentType,
        is_valid: analysis.isValid,
        extracted_data: analysis.extractedData,
        format_errors: analysis.formatErrors,
        content_errors: analysis.contentErrors,
        completeness_score: analysis.completeness,
        language: analysis.languageDetection.primary,
        file_url: fileUrl,
        created_at: new Date().toISOString()
      })
      .select('id')
      .single();
    
    if (error) {
      console.error('Error saving analysis result:', error);
      throw new Error(`Failed to save analysis result: ${error.message}`);
    }
    
    return data.id;
  } catch (error) {
    console.error('Analysis storage error:', error);
    throw new Error(`Failed to store analysis result: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getDocumentAnalysisHistory(
  documentId: string
): Promise<any[]> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('document_analysis_results')
      .select('*')
      .eq('document_id', documentId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching analysis history:', error);
      throw new Error(`Failed to fetch analysis history: ${error.message}`);
    }
    
    return data || [];
  } catch (error) {
    console.error('Analysis history fetch error:', error);
    return [];
  }
}
