import { AIModelManager } from "@/lib/ai/models";
import { KnowledgeBase } from "@/shared/lib/knowledge";

interface CrossReference {
  sourceA: string;
  sourceB: string;
  similarity: number;
  connections: Array<{
    topic: string;
    confidence: number;
    context: {
      textA: string;
      textB: string;
    };
  }>;
}

interface CrossReferenceOptions {
  minSimilarity?: number;
  maxConnections?: number;
  contextWindow?: number;
}

export class CrossReferenceAnalyzer {
  private modelManager: AIModelManager;
  private knowledgeBase: KnowledgeBase;

  constructor(modelManager: AIModelManager, knowledgeBase: KnowledgeBase) {
    this.modelManager = modelManager;
    this.knowledgeBase = knowledgeBase;
  }

  async analyzeSources(
    sources: Array<{ id: string; content: string }>,
    options: CrossReferenceOptions = {},
  ): Promise<CrossReference[]> {
    const {
      minSimilarity = 0.3,
      maxConnections = 5,
      contextWindow = 200,
    } = options;

    const references: CrossReference[] = [];

    // Generate embeddings for all sources
    const embeddings = await Promise.all(
      sources.map((source) =>
        this.modelManager.generateEmbedding(source.content),
      ),
    );

    // Compare each pair of sources
    for (let i = 0; i < sources.length; i++) {
      for (let j = i + 1; j < sources.length; j++) {
        const similarity = this.cosineSimilarity(embeddings[i], embeddings[j]);

        if (similarity >= minSimilarity) {
          // Analyze connections between the sources
          const connections = await this.findConnections(
            sources[i].content,
            sources[j].content,
            maxConnections,
            contextWindow,
          );

          if (connections.length > 0) {
            references.push({
              sourceA: sources[i].id,
              sourceB: sources[j].id,
              similarity,
              connections,
            });
          }
        }
      }
    }

    return references;
  }

  private async findConnections(
    textA: string,
    textB: string,
    maxConnections: number,
    contextWindow: number,
  ): Promise<
    Array<{
      topic: string;
      confidence: number;
      context: { textA: string; textB: string };
    }>
  > {
    const prompt = `Analyze the following two texts and identify up to ${maxConnections} key topics or claims that are discussed in both. For each connection, provide:
1. The topic or claim
2. Your confidence in the connection (0-1)
3. The relevant context from both texts

Text A:
${textA}

Text B:
${textB}`;

    const result = await this.modelManager.generateText(
      "gpt-4",
      [
        {
          role: "system",
          content:
            "You are a research analysis assistant specialized in identifying connections between texts. Provide output in JSON format.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      {
        temperature: 0.3,
        maxTokens: 2000,
      },
    );

    return JSON.parse(result);
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}
