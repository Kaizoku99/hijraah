import { processDocumentRun } from "@/jobs/process-document";
import { DocumentProcessor } from "@/lib/rag/ingestion/document-processor";
import { HybridRetriever } from "@/lib/rag/retrieval/hybrid-retriever";
import { KnowledgeGraphBuilder } from "@/lib/rag/knowledge-graph/builder";

// Mock the core RAG components
jest.mock("@/lib/rag/ingestion/document-processor");
jest.mock("@/lib/rag/retrieval/hybrid-retriever");
jest.mock("@/lib/rag/knowledge-graph/builder");

describe("RAG Pipeline Integration Test", () => {
  let mockProcessDocument: jest.Mock;
  let mockStoreDocument: jest.Mock;
  let mockBuildFromDocument: jest.Mock;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup mock implementations for the class methods
    mockProcessDocument = jest.fn();
    mockStoreDocument = jest.fn();
    mockBuildFromDocument = jest.fn();

    (DocumentProcessor as jest.Mock).mockImplementation(() => {
      return {
        processDocument: mockProcessDocument,
      };
    });

    (HybridRetriever as jest.Mock).mockImplementation(() => {
      return {
        storeDocument: mockStoreDocument,
      };
    });

    (KnowledgeGraphBuilder as jest.Mock).mockImplementation(() => {
      return {
        buildFromDocument: mockBuildFromDocument,
      };
    });
  });

  it("should orchestrate the entire RAG pipeline in the correct order", async () => {
    // Arrange
    const testUrl = "https://example.com/immigration-article";
    const jobPayload = { url: testUrl };
    const jobContext = {
      run: { id: "test-run-123" },
    };

    // Mock the return value of the first step in the pipeline
    const mockProcessedDoc = {
      documentId: "mock-doc-id",
      sourceUrl: testUrl,
      rawText: "Some text",
      chunks: [{ content: "chunk1", embedding: [], metadata: {} }],
    };
    mockProcessDocument.mockResolvedValue(mockProcessedDoc);
    mockStoreDocument.mockResolvedValue(undefined);
    mockBuildFromDocument.mockResolvedValue(undefined);

    // Act
    await processDocumentRun(jobPayload, jobContext as any);

    // Assert
    // 1. Verify DocumentProcessor was called first
    expect(mockProcessDocument).toHaveBeenCalledTimes(1);
    const processorArg = mockProcessDocument.mock.calls[0][0];
    expect(processorArg).toHaveProperty("sourceUrl", testUrl);
    expect(processorArg).toHaveProperty("id");

    // 2. Verify HybridRetriever was called second with the result of the first step
    expect(mockStoreDocument).toHaveBeenCalledTimes(1);
    expect(mockStoreDocument).toHaveBeenCalledWith(mockProcessedDoc);

    // 3. Verify KnowledgeGraphBuilder was called last with the same result
    expect(mockBuildFromDocument).toHaveBeenCalledTimes(1);
    expect(mockBuildFromDocument).toHaveBeenCalledWith(mockProcessedDoc);

    // Ensure they were called in order
    const processOrder = mockProcessDocument.mock.invocationCallOrder[0];
    const storeOrder = mockStoreDocument.mock.invocationCallOrder[0];
    const buildOrder = mockBuildFromDocument.mock.invocationCallOrder[0];

    expect(processOrder).toBeLessThan(storeOrder);
    expect(storeOrder).toBeLessThan(buildOrder);
  });

  it("should throw an error if any step in the pipeline fails", async () => {
    // Arrange
    const testUrl = "https://example.com/failing-article";
    const jobPayload = { url: testUrl };
    const jobContext = {
      run: { id: "test-run-fail" },
    };
    const errorMessage = "Scraping failed";
    mockProcessDocument.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(
      processDocumentRun(jobPayload, jobContext as any)
    ).rejects.toThrow(errorMessage);

    // Ensure subsequent steps were not called
    expect(mockStoreDocument).not.toHaveBeenCalled();
    expect(mockBuildFromDocument).not.toHaveBeenCalled();
  });
});
