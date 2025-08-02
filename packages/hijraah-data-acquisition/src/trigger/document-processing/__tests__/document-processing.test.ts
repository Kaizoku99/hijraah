/**
 * Document Processing Tasks Tests
 * 
 * Task 7.1: Test multi-format document processing using Firecrawl, Mistral OCR, and Trigger.dev orchestration
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { 
  processDocumentsTask,
  performOCRTask,
  classifyDocumentTask,
  extractStructuredDataTask,
  type DocumentProcessingInput,
  type DocumentClassification,
  type OCRResult,
  type StructuredData
} from "../index.js";

// Mock AI SDK
vi.mock("ai", () => ({
  generateText: vi.fn(),
  generateObject: vi.fn(),
  tool: vi.fn(),
}));

// Mock Mistral provider
vi.mock("@ai-sdk/mistral", () => ({
  mistral: vi.fn(() => "mocked-mistral-model"),
}));

// Mock Trigger.dev SDK
vi.mock("@trigger.dev/sdk/v3", () => ({
  task: vi.fn((config) => {
    return {
      id: config.id,
      run: config.run,
      triggerAndWait: vi.fn().mockResolvedValue({ ok: true, output: {} }),
    };
  }),
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("Document Processing Tasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("processDocumentsTask", () => {
    it("should process web documents successfully", async () => {
      const mockInput: DocumentProcessingInput = {
        id: "test-doc-1",
        userId: "user-123",
        type: "web",
        source: "https://example.com/document",
        processingOptions: {
          enableOCR: false,
          enableClassification: true,
          enableStructuredExtraction: true,
          enableChunking: false,
        },
      };

      // Mock the task run function directly
      const result = await processDocumentsTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.id).toBe(mockInput.id);
      expect(result.originalDocument.type).toBe("web");
      expect(result.extractedContent).toContain("Web Content from");
    });

    it("should process file documents with OCR", async () => {
      const mockFileBuffer = Buffer.from("mock file content").toString("base64");
      const mockInput: DocumentProcessingInput = {
        id: "test-doc-2",
        userId: "user-123",
        type: "file",
        source: "uploaded-file.pdf",
        fileName: "passport.pdf",
        fileBuffer: mockFileBuffer,
        processingOptions: {
          enableOCR: true,
          enableClassification: true,
          enableStructuredExtraction: true,
        },
      };

      // Mock generateText for OCR
      const { generateText } = await import("ai");
      vi.mocked(generateText).mockResolvedValue({
        text: "PASSPORT\nJohn Doe\nDate of Birth: 01/01/1990\nPassport No: A1234567",
        usage: { totalTokens: 100 },
      });

      const result = await processDocumentsTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.id).toBe(mockInput.id);
      expect(result.originalDocument.type).toBe("file");
      expect(result.ocrResult).toBeDefined();
      expect(result.ocrResult?.processingMethod).toBe("mistral_vision");
    });

    it("should handle processing errors gracefully", async () => {
      const mockInput: DocumentProcessingInput = {
        id: "test-doc-3",
        userId: "user-123",
        type: "file",
        source: "invalid-file.pdf",
        // Missing fileBuffer should cause an error
      };

      const result = await processDocumentsTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.status).toBe("failed");
      expect(result.metadata.errors).toHaveLength(1);
    });

    it("should create document chunks when enabled", async () => {
      const mockInput: DocumentProcessingInput = {
        id: "test-doc-4",
        userId: "user-123",
        type: "text",
        source: "This is a long document content that should be chunked into smaller pieces for better processing and embedding generation. ".repeat(20),
        processingOptions: {
          enableChunking: true,
          chunkSize: 200,
          chunkOverlap: 50,
        },
      };

      const result = await processDocumentsTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.chunks).toBeDefined();
      expect(result.chunks!.length).toBeGreaterThan(1);
      expect(result.chunks![0].chunkIndex).toBe(0);
    });
  });

  describe("performOCRTask", () => {
    it("should perform OCR on document images", async () => {
      const mockFileBuffer = Buffer.from("mock image data").toString("base64");
      const mockInput = {
        documentId: "doc-123",
        fileBuffer: mockFileBuffer,
        fileName: "passport.jpg",
        documentType: "passport" as const,
      };

      // Mock generateText for OCR
      const { generateText } = await import("ai");
      vi.mocked(generateText).mockResolvedValue({
        text: "PASSPORT\nUnited States of America\nJohn Doe\nDate of Birth: 01 JAN 1990\nPassport No: 123456789",
        usage: { totalTokens: 150 },
      });

      const result = await performOCRTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.extractedText).toContain("PASSPORT");
      expect(result.extractedText).toContain("John Doe");
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.processingMethod).toBe("mistral_vision");
    });

    it("should adjust confidence based on text quality", async () => {
      const mockFileBuffer = Buffer.from("mock image data").toString("base64");
      const mockInput = {
        documentId: "doc-124",
        fileBuffer: mockFileBuffer,
        fileName: "poor-quality.jpg",
      };

      // Mock generateText with poor quality text
      const { generateText } = await import("ai");
      vi.mocked(generateText).mockResolvedValue({
        text: "P@$$P0RT   UN1T3D   $T@T3$   0F   @M3R1C@", // OCR artifacts
        usage: { totalTokens: 50 },
      });

      const result = await performOCRTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.confidence).toBeLessThan(0.9); // Should be lower due to artifacts
    });
  });

  describe("classifyDocumentTask", () => {
    it("should classify immigration documents correctly", async () => {
      const mockInput = {
        documentId: "doc-125",
        content: "PASSPORT\nUnited States of America\nThis passport is valid for travel to all countries unless otherwise endorsed.",
        fileName: "passport.pdf",
      };

      // Mock generateObject for classification
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          primaryCategory: "passport",
          confidence: 0.95,
          language: "en",
          documentType: "official",
          isImmigrationRelated: true,
          urgencyLevel: "high",
          processingComplexity: "moderate",
        },
        usage: { totalTokens: 200 },
      });

      const result = await classifyDocumentTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.primaryCategory).toBe("passport");
      expect(result.isImmigrationRelated).toBe(true);
      expect(result.urgencyLevel).toBe("high");
      expect(result.requiredActions).toContain("Verify passport validity");
    });

    it("should handle non-immigration documents", async () => {
      const mockInput = {
        documentId: "doc-126",
        content: "INVOICE\nABC Company\nDate: 2024-01-15\nAmount: $500.00",
        fileName: "invoice.pdf",
      };

      // Mock generateObject for classification
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          primaryCategory: "other",
          confidence: 0.85,
          language: "en",
          documentType: "commercial",
          isImmigrationRelated: false,
          urgencyLevel: "low",
          processingComplexity: "simple",
        },
        usage: { totalTokens: 100 },
      });

      const result = await classifyDocumentTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.primaryCategory).toBe("other");
      expect(result.isImmigrationRelated).toBe(false);
      expect(result.urgencyLevel).toBe("low");
    });
  });

  describe("extractStructuredDataTask", () => {
    it("should extract structured data from passport documents", async () => {
      const mockInput = {
        documentId: "doc-127",
        content: `PASSPORT
        United States of America
        Surname: DOE
        Given Names: JOHN MICHAEL
        Nationality: USA
        Date of Birth: 01 JAN 1990
        Place of Birth: NEW YORK, NY, USA
        Date of Issue: 15 MAR 2020
        Date of Expiry: 14 MAR 2030
        Passport No: 123456789
        Authority: U.S. DEPARTMENT OF STATE`,
        classification: {
          primaryCategory: "passport",
          documentType: "official",
          isImmigrationRelated: true,
          language: "en",
        },
      };

      // Mock generateObject for structured extraction
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          personalInfo: {
            fullName: "JOHN MICHAEL DOE",
            firstName: "JOHN",
            lastName: "DOE",
            middleName: "MICHAEL",
            dateOfBirth: "01 JAN 1990",
            placeOfBirth: "NEW YORK, NY, USA",
            nationality: "USA",
          },
          documentInfo: {
            documentNumber: "123456789",
            documentType: "passport",
            issueDate: "15 MAR 2020",
            expiryDate: "14 MAR 2030",
            issuingAuthority: "U.S. DEPARTMENT OF STATE",
            issuingCountry: "USA",
          },
        },
        usage: { totalTokens: 300 },
      });

      const result = await extractStructuredDataTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.personalInfo?.fullName).toBe("JOHN MICHAEL DOE");
      expect(result.documentInfo?.documentNumber).toBe("123456789");
      expect(result.extractionMetadata?.confidence).toBeGreaterThan(0.5);
      expect(result.extractionMetadata?.extractedFields).toContain("personalInfo.fullName");
    });

    it("should handle missing information gracefully", async () => {
      const mockInput = {
        documentId: "doc-128",
        content: "Incomplete document with minimal information",
        classification: {
          primaryCategory: "other",
          documentType: "personal",
          isImmigrationRelated: false,
        },
      };

      // Mock generateObject with minimal data
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          personalInfo: {
            fullName: null,
          },
        },
        usage: { totalTokens: 50 },
      });

      const result = await extractStructuredDataTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.extractionMetadata?.confidence).toBeLessThanOrEqual(0.5);
      expect(result.extractionMetadata?.extractedFields).toHaveLength(0);
    });
  });

  describe("Integration Tests", () => {
    it("should process a complete document workflow", async () => {
      const mockFileBuffer = Buffer.from("mock passport image").toString("base64");
      
      // Step 1: Process document
      const processInput: DocumentProcessingInput = {
        id: "integration-test-1",
        userId: "user-123",
        type: "file",
        source: "passport.jpg",
        fileName: "passport.jpg",
        fileBuffer: mockFileBuffer,
        processingOptions: {
          enableOCR: true,
          enableClassification: true,
          enableStructuredExtraction: true,
          enableChunking: false,
        },
      };

      // Mock all AI calls
      const { generateText, generateObject } = await import("ai");
      
      vi.mocked(generateText).mockResolvedValue({
        text: "PASSPORT United States of America JOHN DOE Date of Birth: 01/01/1990 Passport No: A1234567",
        usage: { totalTokens: 100 },
      });

      vi.mocked(generateObject)
        .mockResolvedValueOnce({
          object: {
            primaryCategory: "passport",
            confidence: 0.95,
            language: "en",
            documentType: "official",
            isImmigrationRelated: true,
          },
          usage: { totalTokens: 150 },
        })
        .mockResolvedValueOnce({
          object: {
            personalInfo: {
              fullName: "JOHN DOE",
              dateOfBirth: "01/01/1990",
            },
            documentInfo: {
              documentNumber: "A1234567",
              documentType: "passport",
            },
          },
          usage: { totalTokens: 200 },
        });

      const result = await processDocumentsTask.run(processInput);

      expect(result).toBeDefined();
      expect(result.status).toBe("success");
      expect(result.ocrResult).toBeDefined();
      expect(result.classification).toBeDefined();
      expect(result.structuredData).toBeDefined();
      expect(result.classification?.primaryCategory).toBe("passport");
      expect(result.structuredData?.personalInfo?.fullName).toBe("JOHN DOE");
    });
  });

  describe("Error Handling", () => {
    it("should handle AI service failures gracefully", async () => {
      const mockInput: DocumentProcessingInput = {
        id: "error-test-1",
        userId: "user-123",
        type: "text",
        source: "Test content",
      };

      // Mock AI service failure
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockRejectedValue(new Error("AI service unavailable"));

      const result = await processDocumentsTask.run(mockInput);

      expect(result).toBeDefined();
      expect(result.status).toBe("failed");
      expect(result.metadata.errors).toContain("AI service unavailable");
    });

    it("should validate input schemas", async () => {
      const invalidInput = {
        // Missing required fields
        type: "invalid",
      } as any;

      const result = await processDocumentsTask.run(invalidInput);

      expect(result).toBeDefined();
      expect(result.status).toBe("failed");
      expect(result.metadata.errors.length).toBeGreaterThan(0);
    });
  });

  describe("Performance Tests", () => {
    it("should complete processing within time limits", async () => {
      const mockInput: DocumentProcessingInput = {
        id: "perf-test-1",
        userId: "user-123",
        type: "text",
        source: "Quick test content",
        processingOptions: {
          enableOCR: false,
          enableClassification: false,
          enableStructuredExtraction: false,
          enableChunking: false,
        },
      };

      const startTime = Date.now();
      const result = await processDocumentsTask.run(mockInput);
      const endTime = Date.now();

      expect(result).toBeDefined();
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds for simple processing
    });
  });
});