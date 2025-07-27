import { StorageError } from "@supabase/storage-js";
import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";

/**
 * Response from file upload operations
 */
export interface FileUploadResult {
  path: string;
  url: string;
  size: number;
}

/**
 * Storage service for file operations
 */
export class StorageService {
  private supabase: SupabaseClient<Database>;
  private bucketName: string;

  /**
   * Create a new storage service
   * @param supabase Supabase client instance
   * @param bucketName Storage bucket name
   */
  constructor(supabase: SupabaseClient<Database>, bucketName = "documents") {
    this.supabase = supabase;
    this.bucketName = bucketName;
  }

  /**
   * Upload a file to storage
   */
  async uploadFile({
    path,
    content,
    contentType,
    metadata = {},
  }: {
    path: string;
    content: Blob | Buffer;
    contentType: string;
    metadata?: Record<string, any>;
  }): Promise<FileUploadResult> {
    try {
      // Ensure the bucket exists
      await this.ensureBucketExists();

      // Upload the file
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload(path, content, {
          contentType,
          upsert: true,
          metadata,
        });

      if (error) {
        console.error("Error uploading file:", error);
        throw new Error(`Failed to upload file: ${error.message}`);
      }

      if (!data) {
        throw new Error("Failed to upload file: No data returned");
      }

      // Get the public URL
      const { data: urlData } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(data.path);

      return {
        path: data.path,
        url: urlData.publicUrl,
        size:
          typeof content === "string"
            ? Buffer.from(content).length
            : content.size,
      };
    } catch (error: any) {
      console.error("Error in uploadFile:", error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Download a file from storage
   */
  async downloadFile(path: string): Promise<Blob> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .download(path);

      if (error) {
        console.error("Error downloading file:", error);
        throw new Error(`Failed to download file: ${error.message}`);
      }

      if (!data) {
        throw new Error("Failed to download file: No data returned");
      }

      return data;
    } catch (error: any) {
      console.error("Error in downloadFile:", error);
      throw new Error(`Failed to download file: ${error.message}`);
    }
  }

  /**
   * Delete a file from storage
   */
  async deleteFile(path: string): Promise<void> {
    try {
      const { error } = await this.supabase.storage
        .from(this.bucketName)
        .remove([path]);

      if (error) {
        console.error("Error deleting file:", error);
        throw new Error(`Failed to delete file: ${error.message}`);
      }
    } catch (error: any) {
      console.error("Error in deleteFile:", error);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(path: string): Promise<Record<string, any>> {
    try {
      // This is a workaround since Supabase doesn't provide a direct method to get metadata
      // We're using the list method with a specific path instead
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .list(path.split("/").slice(0, -1).join("/"), {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.error("Error getting file metadata:", error);
        throw new Error(`Failed to get file metadata: ${error.message}`);
      }

      if (!data) {
        throw new Error("Failed to get file metadata: No data returned");
      }

      const fileName = path.split("/").pop();
      const fileData = data.find((item) => item.name === fileName);

      if (!fileData) {
        throw new Error(`File not found: ${path}`);
      }

      return fileData.metadata || {};
    } catch (error: any) {
      console.error("Error in getFileMetadata:", error);
      throw new Error(`Failed to get file metadata: ${error.message}`);
    }
  }

  /**
   * Check if a file exists
   */
  async fileExists(path: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .list(path.split("/").slice(0, -1).join("/"), {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.error("Error checking if file exists:", error);
        throw new Error(`Failed to check if file exists: ${error.message}`);
      }

      if (!data) {
        return false;
      }

      const fileName = path.split("/").pop();
      return data.some((item) => item.name === fileName);
    } catch (error: any) {
      console.error("Error in fileExists:", error);
      throw new Error(`Failed to check if file exists: ${error.message}`);
    }
  }

  /**
   * Move a file to a new location
   */
  async moveFile(fromPath: string, toPath: string): Promise<FileUploadResult> {
    try {
      // Ensure the destination bucket exists
      await this.ensureBucketExists();

      // First check if the source file exists
      const fileExists = await this.fileExists(fromPath);
      if (!fileExists) {
        throw new Error(`Source file not found: ${fromPath}`);
      }

      // Copy the file to the new location
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .copy(fromPath, toPath);

      if (error) {
        console.error("Error moving file (copy step):", error);
        throw new Error(`Failed to move file: ${error.message}`);
      }

      if (!data) {
        throw new Error(
          "Failed to move file: No data returned from copy operation",
        );
      }

      // Delete the original file
      await this.deleteFile(fromPath);

      // Get the public URL for the new file
      const { data: urlData } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(toPath);

      // Get approximate size (we can't get it directly after move)
      const fileBlob = await this.downloadFile(toPath);

      return {
        path: toPath,
        url: urlData.publicUrl,
        size: fileBlob.size,
      };
    } catch (error: any) {
      console.error("Error in moveFile:", error);
      throw new Error(`Failed to move file: ${error.message}`);
    }
  }

  /**
   * List files in a directory
   */
  async listFiles(
    dirPath: string,
    options: {
      limit?: number;
      offset?: number;
      sortBy?: {
        column: "name" | "created_at" | "updated_at";
        order: "asc" | "desc";
      };
    } = {},
  ): Promise<
    {
      name: string;
      size: number;
      created_at: string;
      updated_at: string;
      metadata: Record<string, any>;
    }[]
  > {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .list(dirPath, {
          limit: options.limit || 100,
          offset: options.offset || 0,
          sortBy: options.sortBy || { column: "name", order: "asc" },
        });

      if (error) {
        console.error("Error listing files:", error);
        throw new Error(`Failed to list files: ${error.message}`);
      }

      return data || [];
    } catch (error: any) {
      console.error("Error in listFiles:", error);
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  /**
   * Create a signed URL for temporary access to a file
   */
  async createSignedUrl(path: string, expiresIn = 60): Promise<string> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .createSignedUrl(path, expiresIn);

      if (error) {
        console.error("Error creating signed URL:", error);
        throw new Error(`Failed to create signed URL: ${error.message}`);
      }

      if (!data || !data.signedUrl) {
        throw new Error("Failed to create signed URL: No URL returned");
      }

      return data.signedUrl;
    } catch (error: any) {
      console.error("Error in createSignedUrl:", error);
      throw new Error(`Failed to create signed URL: ${error.message}`);
    }
  }

  /**
   * Ensure the storage bucket exists
   */
  private async ensureBucketExists(): Promise<void> {
    try {
      // First check if the bucket exists
      const { data: buckets, error: listError } =
        await this.supabase.storage.listBuckets();

      if (listError) {
        console.error("Error listing buckets:", listError);
        throw new Error(`Failed to list buckets: ${listError.message}`);
      }

      const bucketExists = buckets?.some(
        (bucket) => bucket.name === this.bucketName,
      );

      if (!bucketExists) {
        // Create the bucket if it doesn't exist
        const { error: createError } = await this.supabase.storage.createBucket(
          this.bucketName,
          {
            public: false, // Not publicly accessible by default
            allowedMimeTypes: [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "image/jpeg",
              "image/png",
              "image/heic",
              "application/vnd.ms-excel",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "text/plain",
              "application/zip",
            ],
            fileSizeLimit: 20971520, // 20MB
          },
        );

        if (createError) {
          console.error("Error creating bucket:", createError);
          throw new Error(`Failed to create bucket: ${createError.message}`);
        }
      }
    } catch (error: any) {
      console.error("Error in ensureBucketExists:", error);
      throw new Error(`Failed to ensure bucket exists: ${error.message}`);
    }
  }

  /**
   * Update file metadata
   */
  async updateMetadata(
    path: string,
    metadata: Record<string, any>,
  ): Promise<void> {
    try {
      // Currently, Supabase does not provide a direct method to update metadata
      // The workaround is to download the file, then re-upload it with new metadata
      const fileBlob = await this.downloadFile(path);

      // Get existing metadata to merge with new metadata
      const existingMetadata = await this.getFileMetadata(path);
      const mergedMetadata = { ...existingMetadata, ...metadata };

      // Re-upload with new metadata
      await this.uploadFile({
        path,
        content: fileBlob,
        contentType: fileBlob.type,
        metadata: mergedMetadata,
      });
    } catch (error: any) {
      console.error("Error in updateMetadata:", error);
      throw new Error(`Failed to update metadata: ${error.message}`);
    }
  }
}
