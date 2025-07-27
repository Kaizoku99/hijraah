import { HybridRetriever } from "@/lib/rag/retrieval/hybrid-retriever";
import { RAGProcessedDocumentChunk, KGContext } from "@/lib/rag/types";
import { SupabaseClient } from "@supabase/supabase-js";
import OpenAI from "openai";

// Mock data and clients
const mockOpenAI = {
  embeddings: {
    create: jest.fn(),
  },
  chat: {
    completions: {
      create: jest.fn(),
    },
  },
};

const mockSupabase = {
  rpc: jest.fn(),
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  or: jest.fn(),
};

describe("HybridRetriever", () => {
  let retriever: HybridRetriever;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Instantiate retriever with mock clients
    retriever = new HybridRetriever(mockSupabase as any, mockOpenAI as any);
  });

  it("should successfully perform a search and return combined results", async () => {
    // Arrange: Mock all external dependencies
    const mockQuery = "What are the requirements for a Canadian work visa?";

    // Mock OpenAI embeddings
    mockOpenAI.embeddings.create.mockResolvedValue({
      data: [{ embedding: [0.1, 0.2, 0.3] }],
    });

    // Mock OpenAI chat completions for understandQuery and extractEntitiesFromQuery
    mockOpenAI.chat.completions.create
      .mockResolvedValueOnce({
        // For understandQuery
        choices: [
          {
            message: {
              content: JSON.stringify({
                embedding_query: "Canadian work visa application requirements",
                full_text_query: "Canada | work | visa | requirements",
              }),
            },
          },
        ],
      })
      .mockResolvedValueOnce({
        // For extractEntitiesFromQuery
        choices: [
          {
            message: {
              content: JSON.stringify({
                entities: [
                  { name: "Canada", type: "Country" },
                  { name: "work visa", type: "Visa/Program" },
                ],
              }),
            },
          },
        ],
      });

    // Mock Supabase RPC for hybrid chunk search
    const mockChunksData: RAGProcessedDocumentChunk[] = [
      {
        content: "The first step for a Canadian work visa is to...",
        metadata: { documentId: "doc1", sourceUrl: "url1", chunkIndex: 0 },
        embedding: [],
      },
    ];
    mockSupabase.rpc.mockResolvedValue({
      data: mockChunksData,
      error: null,
    });

    // Mock Supabase query for knowledge graph search
    const mockKgData = {
      entities: [{ name: "Canada", type: "Country" }],
      relationships: [
        {
          source_entity_name: "work visa",
          type: "requires",
          target_entity_name: "Job Offer",
        },
      ],
    };
    mockSupabase.or.mockResolvedValue({
      data: mockKgData.relationships,
      error: null,
    });
    (mockSupabase.from as jest.Mock).mockReturnThis();
    (mockSupabase.select as jest.Mock).mockReturnThis();

    // Act: Call the search method
    const result = await retriever.search(mockQuery);

    // Assert: Verify the results
    // Check if Supabase RPC was called correctly
    expect(mockSupabase.rpc).toHaveBeenCalledWith("search_rag_hybrid", {
      p_query_embedding: [0.1, 0.2, 0.3],
      p_query_text: "Canada | work | visa | requirements",
      p_match_count: 10,
      p_similarity_threshold: 0.7,
    });

    // Check if KG search was performed
    expect(mockSupabase.from).toHaveBeenCalledWith("kg_relationships");
    expect(mockSupabase.select).toHaveBeenCalled();
    expect(mockSupabase.or).toHaveBeenCalled();

    // Check the final returned shape
    expect(result).toHaveProperty("chunks");
    expect(result).toHaveProperty("kgContext");
    expect(result.chunks.length).toBe(1);
    expect(result.chunks[0].content).toBe(
      "The first step for a Canadian work visa is to..."
    );
    expect(result.kgContext.relationships.length).toBe(1);
    expect(result.kgContext.relationships[0].source_entity_name).toBe(
      "work visa"
    );
  });

  it("should handle errors from Supabase during chunk search", async () => {
    // Arrange
    const mockQuery = "Query that causes an error";
    mockOpenAI.embeddings.create.mockResolvedValue({
      data: [{ embedding: [0.1, 0.2, 0.3] }],
    });
    mockOpenAI.chat.completions.create.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify({
              embedding_query: "q",
              full_text_query: "q",
            }),
          },
        },
      ],
    });

    // Mock Supabase RPC to return an error
    mockSupabase.rpc.mockResolvedValue({
      data: null,
      error: { message: "Database connection failed" },
    });

    // Act & Assert
    await expect(retriever.search(mockQuery)).rejects.toThrow(
      "Search error: Database connection failed"
    );
  });
});
