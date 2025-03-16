# Mistral OCR and Document Understanding Integration

This guide explains how to use Mistral AI's OCR and Document Understanding capabilities in the Hijraah platform.

## Overview

Mistral AI provides powerful OCR (Optical Character Recognition) and document understanding features that enable:

1. **Text Extraction**: Extract text from PDFs and images while preserving document structure
2. **Document Understanding**: Ask questions about document content in natural language
3. **Table Detection**: Identify and extract tables from documents
4. **Multi-format Support**: Process PDFs, images, and other document formats

## Setup

### Prerequisites

- Mistral API key (get one from [https://console.mistral.ai/](https://console.mistral.ai/))
- Install the Mistral client library: `npm install @mistralai/mistralai`

### Configuration

1. Add your Mistral API key to your environment variables:

```
MISTRAL_API_KEY=your-mistral-api-key
```

2. Make sure the client is properly initialized in your application:

```typescript
import { Mistral } from "@mistralai/mistralai";

const mistralClient = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});
```

## Using Document OCR

### Processing a Document URL

```typescript
import { processMistralOCR } from "@/lib/ai/mistral-ocr";

// Process a document from a URL
const ocrResponse = await processMistralOCR(
  "https://example.com/document.pdf",
  {
    includeImageBase64: false, // Set to true if you want to get image data in the response
  }
);

// Extract plain text
const plainText = extractPlainTextFromOCRResponse(ocrResponse);
```

### Processing an Uploaded File

```typescript
import { processMistralOCRWithFileUpload } from "@/lib/ai/mistral-ocr";

// Process a file upload (from a form submission)
const formData = await request.formData();
const file = formData.get("file");
const buffer = Buffer.from(await file.arrayBuffer());

const ocrResponse = await processMistralOCRWithFileUpload(buffer, file.name, {
  includeImageBase64: false,
});

// Extract plain text
const plainText = extractPlainTextFromOCRResponse(ocrResponse);
```

### Processing an Image

```typescript
import { processMistralOCRWithImage } from "@/lib/ai/mistral-ocr";

// Process an image from a URL
const ocrResponse = await processMistralOCRWithImage(
  "https://example.com/image.jpg",
  {
    includeImageBase64: true, // Include the base64 image data in the response
  }
);

// Extract plain text
const plainText = extractPlainTextFromOCRResponse(ocrResponse);
```

## Document Understanding

Document understanding allows you to ask questions about document content using natural language:

```typescript
import { askDocumentQuestion } from "@/lib/ai/mistral-ocr";

// Ask a question about a document
const answer = await askDocumentQuestion(
  "https://example.com/document.pdf",
  "What is the main topic of this document?"
);

console.log(answer); // The AI-generated answer based on document content
```

## API Endpoints

The following API endpoints are available for OCR and document understanding:

### OCR Processing

- **POST /api/ocr/process-url**: Process a document from a URL
- **POST /api/ocr/process-file**: Process an uploaded document file
- **POST /api/ocr/process-image**: Process an image from a URL
- **POST /api/ocr/extract-pdf-text**: Extract text from a PDF document
- **POST /api/ocr/extract-image-text**: Extract text from an image

### Document Understanding

- **POST /api/ocr/ask-document-url**: Ask a question about a document from a URL
- **POST /api/ocr/ask-document**: Ask a question about an uploaded document file

## React Components

The application provides React components for easy integration:

### OCR Uploader

`MistralOcrUploader` allows users to upload documents or provide URLs for OCR processing:

```jsx
import { MistralOcrUploader } from "@/components/document/MistralOcrUploader";

export default function MyPage() {
  return (
    <div>
      <h1>Document OCR Processing</h1>
      <MistralOcrUploader />
    </div>
  );
}
```

### Document Understanding

`MistralDocumentUnderstanding` enables users to ask questions about document content:

```jsx
import { MistralDocumentUnderstanding } from "@/components/document/MistralDocumentUnderstanding";

export default function MyPage() {
  return (
    <div>
      <h1>Document Understanding</h1>
      <MistralDocumentUnderstanding />
    </div>
  );
}
```

## Demo Page

A complete demo page is available at `/mistral-document-demo` that showcases both OCR and Document Understanding capabilities.

## Response Structure

### OCR Response

```typescript
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
```

### Document Understanding Response

```typescript
interface DocumentUnderstandingResult {
  success: boolean;
  answer?: string;
  error?: string;
}
```

## Best Practices

1. **Optimize file sizes**: Large files will take longer to process and may exceed API limits
2. **Cache results**: Consider caching OCR results for frequently accessed documents
3. **Handle errors gracefully**: Implement proper error handling for API failures
4. **Limit concurrent requests**: Implement rate limiting to avoid overwhelming the API
5. **Use specific questions**: For document understanding, more specific questions typically yield better results
