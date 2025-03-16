# Mistral OCR Integration

This document outlines how to use the Mistral OCR integration in the Hijraah platform for document processing and text extraction.

## Overview

The Mistral OCR API provides advanced optical character recognition capabilities for extracting text from various document formats including PDFs and images. This integration allows you to:

- Process documents via URL or file upload
- Extract text from PDFs and images
- Preserve document formatting and detect tables
- Support for multiple languages

## Setup

1. Ensure you have a Mistral API key in your environment variables:

```
MISTRAL_API_KEY=your-mistral-api-key
```

2. The integration is already set up in the following files:
   - `src/lib/ai/mistral-ocr.ts` - Core functionality for interacting with Mistral OCR API
   - `src/api/hono/routes/ocr.ts` - API routes for OCR processing
   - `src/lib/document/text-extraction.ts` - Utilities for document text extraction

## Using the API

### API Endpoints

The following API endpoints are available under `/api/ocr`:

#### Process Document from URL

```
POST /api/ocr/process-url
{
  "url": "https://example.com/document.pdf",
  "preserveFormatting": true,
  "detectTables": true,
  "language": "en",
  "extractPlainText": true
}
```

#### Process Document from File Upload

```
POST /api/ocr/process-file
Content-Type: multipart/form-data

file: [binary file data]
preserveFormatting: true
detectTables: true
language: en
extractPlainText: true
```

#### Extract Text from PDF

```
POST /api/ocr/extract-pdf-text
{
  "url": "https://example.com/document.pdf"
}
```

#### Extract Text from Image

```
POST /api/ocr/extract-image-text
{
  "url": "https://example.com/document.jpg"
}
```

## Using in Frontend Components

A React component for document uploading and processing is available at `src/components/document/MistralOcrUploader.tsx`. You can import and use this component in your pages:

```tsx
import { MistralOcrUploader } from "@/components/document/MistralOcrUploader";

export default function MyPage() {
  return (
    <div>
      <h1>Document Processing</h1>
      <MistralOcrUploader />
    </div>
  );
}
```

A demo page is available at `/ocr-demo` to showcase the functionality.

## Using Programmatically

You can also use the OCR functionality programmatically in your code:

```typescript
import {
  processMistralOCR,
  extractPlainTextFromOCRResponse,
} from "@/lib/ai/mistral-ocr";

async function processDocument(url: string) {
  try {
    const ocrResponse = await processMistralOCR(url, {
      preserveFormatting: true,
      detectTables: true,
      language: "en",
    });

    // Extract plain text
    const text = extractPlainTextFromOCRResponse(ocrResponse);

    // Use the extracted text
    console.log("Extracted text:", text);

    return text;
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
}
```

## Supported Document Types

- PDF documents (multi-page)
- Images (JPG, PNG, TIFF)

## Options

- `preserveFormatting` (boolean): Preserves document formatting (default: true)
- `detectTables` (boolean): Detects and extracts tables (default: true)
- `language` (string): Specifies document language (optional)
- `extractPlainText` (boolean): Returns plain text in addition to structured data (default: false)

## Response Format

The API returns a JSON response with the following structure:

```json
{
  "success": true,
  "data": {
    "content": [
      {
        "type": "text",
        "text": "Extracted text content",
        "page_number": 1
      },
      {
        "type": "image",
        "image_data": "base64-encoded image data",
        "page_number": 1
      }
    ],
    "meta": {
      "pages": 1,
      "filename": "document.pdf",
      "filesize": 1024
    }
  },
  "text": "Plain text version of the entire document (if extractPlainText is true)"
}
```

## Error Handling

If an error occurs, the API returns an error response:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Limitations

- File size limit: 10MB
- PDF page limit: 50 pages
- Rate limiting applies based on subscription tier
