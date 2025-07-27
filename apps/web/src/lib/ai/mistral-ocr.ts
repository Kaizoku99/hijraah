/**
 * Mistral OCR API Integration
 *
 * This file provides functions to interact with the Mistral OCR API for document processing
 * and text extraction from images and PDFs.
 */

import fs from "fs";

import { Mistral } from "@mistralai/mistralai";

import { createPresignedUrl } from "@/lib/supabase/storage";

// Initialize Mistral client
const mistralClient = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

interface MistralOCROptions {
  preserveFormatting?: boolean;
  language?: string;
  detectTables?: boolean;
  includeImageBase64?: boolean;
}

interface MistralOCRResponse {
  content: Array<{
    type: "text" | "image";
    text?: string;
    image_data?: string;
    page_number?: number;
  }>;
  meta?: {
    pages: number;
    filename?: string;
    filesize?: number;
  };
}

/**
 * Process a document with Mistral OCR API
 *
 * @param documentUrl URL of the document to process
 * @param options Processing options
 * @returns Structured content from the document
 */
export async function processMistralOCR(
  documentUrl: string,
  options: MistralOCROptions = {},
): Promise<MistralOCRResponse> {
  try {
    // Generate a presigned URL if it's a Supabase URL
    let accessibleUrl = documentUrl;
    if (documentUrl.includes("supabase")) {
      const bucket = "documents";
      const path = documentUrl.split("/").pop() || "";
      accessibleUrl = await createPresignedUrl(bucket, path);
    }

    // Process with Mistral OCR using the official client
    const ocrResponse = await mistralClient.ocr.process({
      model: "mistral-ocr-latest",
      document: {
        type: "document_url",
        documentUrl: accessibleUrl,
      },
      include_image_base64: options.includeImageBase64 ?? false,
    });

    return ocrResponse as unknown as MistralOCRResponse;
  } catch (error) {
    console.error("Mistral OCR processing error:", error);
    throw new Error(
      `Failed to process document with Mistral OCR: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Process a document with Mistral OCR API using file upload
 *
 * @param file File buffer to process
 * @param filename Original filename
 * @param options Processing options
 * @returns Structured content from the document
 */
export async function processMistralOCRWithFileUpload(
  file: Buffer,
  filename: string,
  options: MistralOCROptions = {},
): Promise<MistralOCRResponse> {
  try {
    // First upload the file to Mistral
    const uploadedFile = await mistralClient.files.upload({
      file: {
        fileName: filename,
        content: file,
      },
      purpose: "ocr",
    });

    // Get a signed URL to process the file
    const signedUrl = await mistralClient.files.getSignedUrl({
      fileId: uploadedFile.id,
    });

    // Process the uploaded file with Mistral OCR
    const ocrResponse = await mistralClient.ocr.process({
      model: "mistral-ocr-latest",
      document: {
        type: "document_url",
        documentUrl: signedUrl.url,
      },
      include_image_base64: options.includeImageBase64 ?? false,
    });

    return ocrResponse as unknown as MistralOCRResponse;
  } catch (error) {
    console.error("Mistral OCR processing error:", error);
    throw new Error(
      `Failed to process document with Mistral OCR: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Process an image with Mistral OCR API
 *
 * @param imageUrl URL of the image to process
 * @param options Processing options
 * @returns Structured content from the image
 */
export async function processMistralOCRWithImage(
  imageUrl: string,
  options: MistralOCROptions = {},
): Promise<MistralOCRResponse> {
  try {
    // Generate a presigned URL if it's a Supabase URL
    let accessibleUrl = imageUrl;
    if (imageUrl.includes("supabase")) {
      const bucket = "documents";
      const path = imageUrl.split("/").pop() || "";
      accessibleUrl = await createPresignedUrl(bucket, path);
    }

    // Process with Mistral OCR using the official client
    const ocrResponse = await mistralClient.ocr.process({
      model: "mistral-ocr-latest",
      document: {
        type: "image_url",
        imageUrl: accessibleUrl,
      },
      include_image_base64: options.includeImageBase64 ?? false,
    });

    return ocrResponse as unknown as MistralOCRResponse;
  } catch (error) {
    console.error("Mistral OCR processing error:", error);
    throw new Error(
      `Failed to process image with Mistral OCR: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Document understanding with Mistral
 * Ask questions about document content
 *
 * @param documentUrl URL of the document to process
 * @param question Question to ask about the document
 * @returns Answer to the question based on document content
 */
export async function askDocumentQuestion(
  documentUrl: string,
  question: string,
): Promise<string> {
  try {
    // Generate a presigned URL if it's a Supabase URL
    let accessibleUrl = documentUrl;
    if (documentUrl.includes("supabase")) {
      const bucket = "documents";
      const path = documentUrl.split("/").pop() || "";
      accessibleUrl = await createPresignedUrl(bucket, path);
    }

    // Use chat completion to ask a question about the document
    const chatResponse = await mistralClient.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: question,
            },
            {
              type: "document_url",
              documentUrl: accessibleUrl,
            },
          ],
        },
      ],
    });

    return chatResponse.choices[0].message.content;
  } catch (error) {
    console.error("Document understanding error:", error);
    throw new Error(
      `Failed to process document question: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Extract plain text from Mistral OCR response
 *
 * @param ocrResponse Response from Mistral OCR API
 * @returns Plain text content from the document
 */
export function extractPlainTextFromOCRResponse(
  ocrResponse: MistralOCRResponse,
): string {
  return ocrResponse.content
    .filter((item) => item.type === "text" && item.text)
    .map((item) => item.text)
    .join("\n");
}

/**
 * Get content type based on file extension
 */
function getContentType(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return "application/pdf";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "tiff":
    case "tif":
      return "image/tiff";
    default:
      return "application/octet-stream";
  }
}
