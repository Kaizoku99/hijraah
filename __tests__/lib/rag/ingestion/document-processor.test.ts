import { DocumentProcessor } from "@/lib/rag/ingestion/document-processor";
import FirecrawlApp from "@mendable/firecrawl-js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document as LangchainDocument } from "langchain/document";

// Mock the dependencies
jest.mock("@mendable/firecrawl-js");
jest.mock("langchain/text_splitter");

describe("DocumentProcessor", () => {
  let processor: DocumentProcessor;
  let mockFirecrawlApp: jest.Mocked<FirecrawlApp>;
  let mockTextSplitter: jest.Mocked<RecursiveCharacterTextSplitter>;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock FirecrawlApp
    const mockScrapeUrl = jest.fn();
    (FirecrawlApp as jest.Mock).mockImplementation(() => ({
      scrapeUrl: mockScrapeUrl,
    }));
    mockFirecrawlApp = new FirecrawlApp({
      apiKey: "test-key",
    }) as jest.Mocked<FirecrawlApp>;

    // Mock RecursiveCharacterTextSplitter
    const mockSplitText = jest.fn();
    (RecursiveCharacterTextSplitter as unknown as jest.Mock).mockImplementation(
      () => ({
        splitText: mockSplitText,
        splitDocuments: jest.fn(), // Keep this if other parts of the code use it
      }),
    );
    mockTextSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    }) as jest.Mocked<RecursiveCharacterTextSplitter>;

    // Instantiate the processor
    processor = new DocumentProcessor();

    // Assign mocked instances to the processor
    (processor as any).firecrawl = mockFirecrawlApp;
    (processor as any).textSplitter = mockTextSplitter;
    (processor as any).generateEmbedding = jest
      .fn()
      .mockResolvedValue([0.1, 0.2, 0.3]);
  });

  it("should process a document, scrape content, and create chunks", async () => {
    const testUrl = "https://example.com/immigration-news";
    const testDoc = { id: "test-id", sourceUrl: testUrl };
    const scrapedMarkdown = `# Big News
This is some important content.
## Details
More details here.`;

    (mockFirecrawlApp.scrapeUrl as jest.Mock).mockResolvedValue({
      success: true,
      markdown: scrapedMarkdown,
    });

    (mockTextSplitter.splitText as jest.Mock).mockResolvedValue([
      "Big News\nThis is some important content.",
      "Details\nMore details here.",
    ]);

    const result = await processor.processDocument(testDoc);

    expect(mockFirecrawlApp.scrapeUrl).toHaveBeenCalledWith(testUrl, {
      formats: ["markdown"],
    });

    expect(mockTextSplitter.splitText).toHaveBeenCalledWith(scrapedMarkdown);
    expect(result).toHaveProperty("documentId");
    expect(result.sourceUrl).toBe(testUrl);
    expect(result.rawText).toBe(scrapedMarkdown);
    expect(result.chunks).toHaveLength(2);
    expect(result.chunks[0].content).toBe(
      "Big News\nThis is some important content.",
    );
    expect(result.chunks[0].metadata.chunkIndex).toBe(0);
    expect(result.chunks[0].metadata.documentId).toBe(result.documentId);
    expect(result.chunks[1].content).toBe("Details\nMore details here.");
  });

  it("should throw an error if scraping fails", async () => {
    const testUrl = "https://example.com/bad-url";
    const testDoc = { id: "test-id", sourceUrl: testUrl };

    (mockFirecrawlApp.scrapeUrl as jest.Mock).mockResolvedValue({
      success: false,
      error: "Failed to scrape",
    });

    await expect(processor.processDocument(testDoc)).rejects.toThrow(
      "Failed to scrape URL: https://example.com/bad-url, Error: Failed to scrape",
    );
  });

  it("should handle empty markdown content gracefully", async () => {
    const testUrl = "https://example.com/empty";
    const testDoc = { id: "test-id-empty", sourceUrl: testUrl };
    const scrapedMarkdown = "";

    (mockFirecrawlApp.scrapeUrl as jest.Mock).mockResolvedValue({
      success: true,
      markdown: scrapedMarkdown,
    });

    (mockTextSplitter.splitText as jest.Mock).mockResolvedValue([]);

    const result = await processor.processDocument(testDoc);

    expect(mockFirecrawlApp.scrapeUrl).toHaveBeenCalledWith(testUrl, {
      formats: ["markdown"],
    });
    expect(mockTextSplitter.splitText).toHaveBeenCalledWith(scrapedMarkdown);
    expect(result.chunks).toHaveLength(0);
    expect(result.rawText).toBe("");
  });

  it("should throw an error if embedding generation fails", async () => {
    const testUrl = "https://example.com/embedding-fail";
    const testDoc = { id: "test-id-fail", sourceUrl: testUrl };
    const scrapedMarkdown = "Some content";

    (mockFirecrawlApp.scrapeUrl as jest.Mock).mockResolvedValue({
      success: true,
      markdown: scrapedMarkdown,
    });

    (mockTextSplitter.splitText as jest.Mock).mockResolvedValue([
      "Some content",
    ]);

    const embeddingError = new Error("Embedding API failed");
    (processor as any).generateEmbedding = jest
      .fn()
      .mockRejectedValue(embeddingError);

    await expect(processor.processDocument(testDoc)).rejects.toThrow(
      "Embedding API failed",
    );
  });
});
