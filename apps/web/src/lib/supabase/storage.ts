/**
 * Supabase Storage Utilities
 * 
 * Provides functions to interact with Supabase Storage for document management
 * and file operations.
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Default bucket for document storage
const DEFAULT_BUCKET = 'documents';

/**
 * Upload a file to Supabase Storage
 * 
 * @param file File buffer to upload
 * @param filename Original filename
 * @param bucket Storage bucket (defaults to 'documents')
 * @param metadata Optional metadata to store with the file
 * @returns Path to the uploaded file
 */
export async function uploadFile(
  file: Buffer,
  filename: string,
  bucket: string = DEFAULT_BUCKET,
  metadata?: Record<string, string>
): Promise<string> {
  try {
    // Generate a unique path to avoid collisions
    const timestamp = Date.now();
    const uniqueId = Math.random().toString(36).substring(2, 10);
    const safeName = encodeURIComponent(filename.replace(/[^a-zA-Z0-9.-]/g, '_'));
    const path = `${timestamp}_${uniqueId}_${safeName}`;

    // Upload the file to Supabase Storage
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(path, file, {
        contentType: getContentType(filename),
        upsert: false,
        ...(metadata ? { metadata } : {})
      });

    if (error) {
      console.error('Supabase Storage upload error:', error);
      throw new Error(`Failed to upload file to Supabase Storage: ${error.message}`);
    }

    if (!data || !data.path) {
      throw new Error('Failed to upload file: No path returned');
    }

    return data.path;
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error(`File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get a file from Supabase Storage
 * 
 * @param path Path to the file in storage
 * @param bucket Storage bucket (defaults to 'documents')
 * @returns File buffer
 */
export async function getFile(
  path: string,
  bucket: string = DEFAULT_BUCKET
): Promise<Buffer> {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .download(path);

    if (error) {
      console.error('Supabase Storage download error:', error);
      throw new Error(`Failed to download file from Supabase Storage: ${error.message}`);
    }

    if (!data) {
      throw new Error('Failed to download file: No data returned');
    }

    // Convert blob to buffer
    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('File download error:', error);
    throw new Error(`File download failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Delete a file from Supabase Storage
 * 
 * @param path Path to the file in storage
 * @param bucket Storage bucket (defaults to 'documents')
 * @returns Success status
 */
export async function deleteFile(
  path: string,
  bucket: string = DEFAULT_BUCKET
): Promise<boolean> {
  try {
    const { error } = await supabase
      .storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Supabase Storage delete error:', error);
      throw new Error(`Failed to delete file from Supabase Storage: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('File deletion error:', error);
    throw new Error(`File deletion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Create a presigned URL for a file in Supabase Storage
 * 
 * @param path Path to the file in storage
 * @param bucket Storage bucket (defaults to 'documents')
 * @param expiresIn Expiration time in seconds (defaults to 3600 = 1 hour)
 * @returns Presigned URL
 */
export async function createPresignedUrl(
  path: string,
  bucket: string = DEFAULT_BUCKET,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      console.error('Supabase Storage signed URL creation error:', error);
      throw new Error(`Failed to create signed URL: ${error.message}`);
    }

    if (!data || !data.signedUrl) {
      throw new Error('Failed to create signed URL: No URL returned');
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Signed URL creation error:', error);
    throw new Error(`Signed URL creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get a public URL for a file in Supabase Storage
 * 
 * @param path Path to the file in storage
 * @param bucket Storage bucket (defaults to 'documents')
 * @returns Public URL
 */
export function getPublicUrl(
  path: string,
  bucket: string = DEFAULT_BUCKET
): string {
  const { data } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * List files in a Supabase Storage bucket
 * 
 * @param folder Folder path (optional)
 * @param bucket Storage bucket (defaults to 'documents')
 * @returns List of files
 */
export async function listFiles(
  folder?: string,
  bucket: string = DEFAULT_BUCKET
): Promise<Array<{ name: string; path: string; size: number; created_at: string }>> {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .list(folder || '');

    if (error) {
      console.error('Supabase Storage list error:', error);
      throw new Error(`Failed to list files: ${error.message}`);
    }

    if (!data) {
      return [];
    }

    return data.map(item => ({
      name: item.name,
      path: folder ? `${folder}/${item.name}` : item.name,
      size: item.metadata?.size || 0,
      created_at: item.created_at || new Date().toISOString()
    }));
  } catch (error) {
    console.error('File listing error:', error);
    throw new Error(`File listing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get content type based on file extension
 */
function getContentType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'tiff':
    case 'tif':
      return 'image/tiff';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'ppt':
      return 'application/vnd.ms-powerpoint';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    default:
      return 'application/octet-stream';
  }
} 