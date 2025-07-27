/**
 * Document Text Extraction Utilities
 *
 * Provides functions to extract text from various document formats including PDFs and images.
 */

import { OpenAI } from "openai";

import {
  processMistralOCR,
  processMistralOCRWithFileUpload,
  extractPlainTextFromOCRResponse,
} from "@/lib/ai/mistral-ocr";
import { createPresignedUrl } from "@/lib/supabase/storage";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Extract text from a PDF document
 */
export async function extractTextFromPdf(documentUrl: string): Promise<string> {
  try {
    // Generate a presigned URL if it's a Supabase URL
    let accessibleUrl = documentUrl;
    if (documentUrl.includes("supabase")) {
      const bucket = "documents";
      const path = documentUrl.split("/").pop() || "";
      accessibleUrl = await createPresignedUrl(bucket, path);
    }

    // Call PDF extraction API - in a real implementation, you would use a PDF parsing library
    // such as pdf.js, pdf-parse, or a document understanding API

    // For demonstration, we'll use a simplified approach with OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all text content from this PDF document, preserving structure as much as possible.",
            },
            {
              type: "image_url",
              image_url: {
                url: accessibleUrl,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 4096,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("PDF text extraction error:", error);
    throw new Error(
      `Failed to extract text from PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Extract text from an image document
 */
export async function extractTextFromImage(
  imageUrl: string,
): Promise<{ text: string; buffer: Buffer }> {
  try {
    // Generate a presigned URL if it's a Supabase URL
    let accessibleUrl = imageUrl;
    if (imageUrl.includes("supabase")) {
      const bucket = "documents";
      const path = imageUrl.split("/").pop() || "";
      accessibleUrl = await createPresignedUrl(bucket, path);
    }

    // Fetch the image
    const response = await fetch(accessibleUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Convert to buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Use OpenAI Vision API to extract text
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all text content from this document image, preserving structure as much as possible.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${buffer.toString("base64")}`,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 4096,
    });

    return {
      text: aiResponse.choices[0].message.content || "",
      buffer,
    };
  } catch (error) {
    console.error("Image text extraction error:", error);
    throw new Error(
      `Failed to extract text from image: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Extract text from a PDF document using Mistral OCR
 */
export async function extractTextFromPdfWithMistralOCR(
  documentUrl: string,
): Promise<string> {
  try {
    const ocrResponse = await processMistralOCR(documentUrl, {
      preserveFormatting: true,
      detectTables: true,
    });

    return extractPlainTextFromOCRResponse(ocrResponse);
  } catch (error) {
    console.error("PDF text extraction error with Mistral OCR:", error);
    throw new Error(
      `Failed to extract text from PDF with Mistral OCR: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Extract text from an image document using Mistral OCR
 */
export async function extractTextFromImageWithMistralOCR(
  imageUrl: string,
): Promise<{ text: string; buffer: Buffer }> {
  try {
    // Generate a presigned URL if it's a Supabase URL
    let accessibleUrl = imageUrl;
    if (imageUrl.includes("supabase")) {
      const bucket = "documents";
      const path = imageUrl.split("/").pop() || "";
      accessibleUrl = await createPresignedUrl(bucket, path);
    }

    // Fetch the image
    const response = await fetch(accessibleUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Convert to buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get filename from URL
    const filename = imageUrl.split("/").pop() || "image.jpg";

    // Process with Mistral OCR
    const ocrResponse = await processMistralOCRWithFileUpload(
      buffer,
      filename,
      {
        preserveFormatting: true,
        detectTables: true,
      },
    );

    return {
      text: extractPlainTextFromOCRResponse(ocrResponse),
      buffer,
    };
  } catch (error) {
    console.error("Image text extraction error with Mistral OCR:", error);
    throw new Error(
      `Failed to extract text from image with Mistral OCR: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Create a base64 data URL for an image
 */
export function createImageDataUrl(
  buffer: Buffer,
  mimeType: string = "image/jpeg",
): string {
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}
