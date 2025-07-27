import { createHash } from "crypto";
import FirecrawlApp from "@mendable/firecrawl-js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import { generateObject } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { z } from "zod";
import { evaluateSourceConfidence } from "../sources/source-evaluator.js";
import {
  RAGProcessedDocument,
  RAGProcessedDocumentChunk,
  IngestionError,
} from "../types.js";

interface Document {
  id: string;
  // For remote web sources
  sourceUrl?: string;
  // For uploaded files
  storagePath?: string; // path inside the 'documents' bucket (e.g. userId/docId/filename.pdf)
  fileType?: string; // MIME type hint for OCR
}

// ---------------- Classification Schema ------------------

const IMMIGRATION_CATEGORIES = [
  "visa_application",
  "residency_permit",
  "passport",
  "work_permit",
  "family_reunion",
  "asylum_application",
  "citizenship",
  "immigration_policy",
  "legal_document",
  "personal_identification",
  "travel_document",
  "financial_statement",
  "educational_credential",
  "other",
] as const;

const ClassificationResponseSchema = z.object({
  primary_category: z.enum(IMMIGRATION_CATEGORIES),
  confidence: z.number().min(0).max(1),
  secondary_categories: z
    .array(
      z.object({
        category: z.enum(IMMIGRATION_CATEGORIES),
        confidence: z.number().min(0).max(1),
      }),
    )
    .optional(),
  document_language: z.string().optional(),
  contains_personal_data: z.boolean().optional(),
});

type ClassificationResult = z.infer<typeof ClassificationResponseSchema>;

export class DocumentProcessor {
  private firecrawl: FirecrawlApp;
  private textSplitter: RecursiveCharacterTextSplitter;
  private supabaseAdmin;
  private openai: OpenAI;

  constructor() {
    if (!process.env.FIRECRAWL_API_KEY) {
      throw new IngestionError(
        "FIRECRAWL_API_KEY environment variable is not set.",
      );
    }
    this.firecrawl = new FirecrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY,
    });
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    // Initialize Supabase admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!supabaseUrl || !supabaseKey) {
      throw new IngestionError("Supabase credentials not configured");
    }

    this.supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    // Initialize OpenAI
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async processDocument(document: Document): Promise<RAGProcessedDocument> {
    const rawText = await this.extractText(document);

    // ---------- Classification Step (DP-2) ------------
    let classification: ClassificationResult | undefined;
    try {
      classification = await this.classifyText(rawText);
      console.log(
        `[DocumentProcessor] Classification complete for doc ${document.id}:`,
        classification?.primary_category,
      );
    } catch (err) {
      console.warn(
        `[DocumentProcessor] Classification failed for doc ${document.id}:`,
        (err as Error).message,
      );
    }

    const chunkContents = await this.textSplitter.splitText(rawText);

    const chunks: RAGProcessedDocumentChunk[] = await Promise.all(
      chunkContents.map(async (content, index) => {
        const embedding = await this.generateEmbedding(content);
        const confidence = evaluateSourceConfidence(
          document.sourceUrl ?? document.storagePath ?? "",
        );
        const src = document.sourceUrl ?? document.storagePath ?? "uploaded";
        return {
          id: `${document.id}_chunk_${index}`,
          content,
          embedding,
          metadata: {
            sourceUrl: src,
            documentId: document.id,
            chunkIndex: index,
            confidence,
          },
        };
      }),
    );

    console.log(
      `Document ${document.id} processed. ${chunks.length} chunks created.`,
    );

    return {
      documentId: document.id,
      sourceUrl: document.sourceUrl ?? document.storagePath ?? "",
      chunks: chunks,
      rawText: rawText,
      metadata: classification
        ? {
            classification: classification.primary_category,
            confidence: classification.confidence,
            language: classification.document_language,
            containsPersonalData: classification.contains_personal_data,
          }
        : undefined,
    };
  }

  private async extractText(document: Document): Promise<string> {
    // Case 1: URL-based document (web scrape)
    if (document.sourceUrl) {
      console.log(`[DocumentProcessor] Scraping URL: ${document.sourceUrl}`);
      const scrapeResult = await this.firecrawl.scrapeUrl(document.sourceUrl, {
        formats: ["markdown"],
      });

      if (scrapeResult.success && scrapeResult.markdown !== undefined) {
        return scrapeResult.markdown;
      }
      throw new IngestionError(
        `Failed to scrape URL: ${document.sourceUrl}, Error: ${scrapeResult.error}`,
      );
    }

    // Case 2: Uploaded file in Supabase Storage
    if (document.storagePath) {
      const { data, error } = await this.supabaseAdmin.storage
        .from("documents")
        .download(document.storagePath);

      if (error || !data) {
        throw new IngestionError(
          `Failed to download file at ${document.storagePath}: ${error?.message}`,
        );
      }

      const fileBuffer = Buffer.from(await data.arrayBuffer());

      console.log(
        `[DocumentProcessor] Running Mistral OCR on storagePath: ${document.storagePath}`,
      );

      const text = await this.runMistralOCR(fileBuffer, document.fileType);
      return text;
    }

    throw new IngestionError("Document lacks both sourceUrl and storagePath");
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });
    return response.data[0].embedding;
  }

  private async classifyText(text: string): Promise<ClassificationResult> {
    // Use first 15k chars to keep token limit reasonable
    const textSample = text.slice(0, 15000);

    const { object: classificationResult } = await generateObject({
      model: mistral("mistral-large-latest"),
      schema: ClassificationResponseSchema,
      schemaName: "DocumentClassification",
      schemaDescription: "Classification of an immigration-related document.",
      prompt: `Analyze the following document text and classify it according to the provided schema. Identify the primary category, estimate confidence, list any relevant secondary categories, determine the language, and assess if it contains personal data (like names, addresses, ID numbers). Document Text: \n\n---\n${textSample}\n---`,
      temperature: 0.2,
    });

    return classificationResult;
  }

  private async runMistralOCR(
    fileBuffer: Buffer,
    fileType?: string,
  ): Promise<string> {
    // This is a simplified version - in production, you'd want to handle
    // different file types appropriately
    if (!process.env.MISTRAL_API_KEY) {
      throw new IngestionError("MISTRAL_API_KEY not configured for OCR");
    }

    // For now, return a placeholder - implement actual OCR logic as needed
    console.warn("OCR not fully implemented, returning placeholder text");
    return `[OCR content for file type: ${fileType || "unknown"}]`;
  }

  // Context7 Pattern: Batch processing for efficiency
  async processBatch(documents: Document[]): Promise<RAGProcessedDocument[]> {
    const batchSize = 5; // Process 5 documents concurrently
    const results: RAGProcessedDocument[] = [];

    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((doc) => this.processDocument(doc)),
      );
      results.push(...batchResults);
    }

    return results;
  }
}
