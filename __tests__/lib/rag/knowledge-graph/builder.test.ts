import { KnowledgeGraphBuilder } from "@/lib/rag/knowledge-graph/builder";
import { RAGProcessedDocument } from "@/lib/rag/ingestion/document-processor";
import { SupabaseClient } from "@supabase/supabase-js";
import OpenAI from "openai";

// Mock crypto.randomUUID
jest.spyOn(global.crypto, "randomUUID").mockReturnValue("mocked-uuid");

const mockUpsert = jest.fn();
const mockSupabase = {
  from: jest.fn().mockReturnValue({ upsert: mockUpsert }),
};

describe("KnowledgeGraphBuilder", () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    mockSupabase.from.mockClear();
    mockUpsert.mockClear();
    mockUpsert.mockResolvedValue({ error: null });
    fetchSpy = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("should extract entities and relationships and save them to the database", async () => {
    // Arrange
    const mockDocument: RAGProcessedDocument = {
      documentId: "doc-123",
      sourceUrl: "https://example.com",
      rawText: "Canada announced a new Express Entry draw for tech workers.",
      chunks: [
        {
          content:
            "Canada announced a new Express Entry draw for tech workers.",
          embedding: [],
          metadata: {
            documentId: "doc-123",
            sourceUrl: "https://example.com",
            chunkIndex: 0,
          },
        },
      ],
    };

    const mockEntityAPIResponse = {
      id: "chatcmpl-123",
      object: "chat.completion",
      created: 1677652288,
      model: "gpt-4o",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: JSON.stringify({
              entities: [
                { name: "Canada", type: "Country" },
                { name: "Express Entry", type: "Program" },
              ],
            }),
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 9,
        completion_tokens: 12,
        total_tokens: 21,
      },
    };

    const mockRelationshipAPIResponse = {
      id: "chatcmpl-456",
      object: "chat.completion",
      created: 1677652289,
      model: "gpt-4o",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: JSON.stringify({
              relationships: [
                {
                  source: "Express Entry",
                  target: "Canada",
                  type: "BELONGS_TO",
                },
              ],
            }),
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 9,
        completion_tokens: 12,
        total_tokens: 21,
      },
    };

    // Mock the fetch calls made by the OpenAI SDK
    fetchSpy
      .mockResolvedValueOnce(
        new Response(JSON.stringify(mockEntityAPIResponse)),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify(mockRelationshipAPIResponse)),
      );

    const builder = new KnowledgeGraphBuilder(
      new OpenAI({ apiKey: "test-key" }),
      mockSupabase as any,
    );

    // Act
    await builder.buildFromDocument(mockDocument);

    // Assert
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(mockSupabase.from).toHaveBeenCalledWith("kg_entities");
    expect(mockSupabase.from).toHaveBeenCalledWith("kg_relationships");
    expect(mockUpsert).toHaveBeenCalledTimes(2);
  });

  it("should do nothing if no entities are extracted", async () => {
    // Arrange
    const mockDocument: RAGProcessedDocument = {
      documentId: "doc-123",
      sourceUrl: "https://example.com",
      rawText: "Some generic text with no specific entities.",
      chunks: [
        {
          content: "Some generic text with no specific entities.",
          embedding: [],
          metadata: {
            documentId: "doc-123",
            sourceUrl: "https://example.com",
            chunkIndex: 0,
          },
        },
      ],
    };

    const mockEmptyAPIResponse = {
      id: "chatcmpl-789",
      object: "chat.completion",
      created: 1677652290,
      model: "gpt-4o",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: JSON.stringify({ entities: [] }),
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 9,
        completion_tokens: 12,
        total_tokens: 21,
      },
    };

    fetchSpy.mockResolvedValue(
      new Response(JSON.stringify(mockEmptyAPIResponse)),
    );

    const builder = new KnowledgeGraphBuilder(
      new OpenAI({ apiKey: "test-key" }),
      mockSupabase as any,
    );

    // Act
    await builder.buildFromDocument(mockDocument);

    // Assert
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(mockUpsert).not.toHaveBeenCalled();
  });
});
