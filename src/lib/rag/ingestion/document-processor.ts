import { createHash } from "crypto";
import FirecrawlApp from "@mendable/firecrawl-js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document as LangchainDocument } from "langchain/document";
import { openai } from "@/lib/openai";
import { evaluateSourceConfidence } from "@/lib/rag/sources/source-evaluator";
import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { runMistralOCR } from "@/lib/ai/ocr";

interface Document {
  id: string;
  // For remote web sources
  sourceUrl?: string;
  // For uploaded files
  storagePath?: string; // path inside the 'documents' bucket (e.g. userId/docId/filename.pdf)
  fileType?: string; // MIME type hint for OCR
}

export interface RAGProcessedDocumentChunk {
  content: string;
  embedding: number[];
  metadata: {
    sourceUrl: string;
    documentId: string;
    chunkIndex: number;
    confidence: number;
  };
}

export interface RAGProcessedDocument {
  documentId: string;
  sourceUrl: string;
  rawText: string;
  chunks: RAGProcessedDocumentChunk[];
}

export class DocumentProcessor {
  private firecrawl: FirecrawlApp;
  private textSplitter: RecursiveCharacterTextSplitter;
  private supabaseAdmin = createSupabaseClient("service");

  constructor() {
    if (!process.env.FIRECRAWL_API_KEY) {
      throw new Error("FIRECRAWL_API_KEY environment variable is not set.");
    }
    this.firecrawl = new FirecrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY,
    });
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
  }

  async processDocument(document: Document): Promise<RAGProcessedDocument> {
    const rawText = await this.extractText(document);
    const chunkContents = await this.textSplitter.splitText(rawText);

    const chunks: RAGProcessedDocumentChunk[] = await Promise.all(
      chunkContents.map(async (content, index) => {
        const embedding = await this.generateEmbedding(content);
        const confidence = evaluateSourceConfidence(
          document.sourceUrl ?? document.storagePath ?? ""
        );
        const src = document.sourceUrl ?? "uploaded";
        return {
          content,
          embedding,
          metadata: {
            sourceUrl: src,
            documentId: document.id,
            chunkIndex: index,
            confidence,
          },
        };
      })
    );

    console.log(
      `Document ${document.id} processed. ${chunks.length} chunks created.`
    );

    return {
      documentId: document.id,
      sourceUrl: document.sourceUrl ?? document.storagePath ?? "",
      chunks: chunks,
      rawText: rawText,
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
      throw new Error(
        `Failed to scrape URL: ${document.sourceUrl}, Error: ${scrapeResult.error}`
      );
    }

    // Case 2: Uploaded file in Supabase Storage
    if (document.storagePath) {
      const { data, error } = await this.supabaseAdmin.storage
        .from("documents")
        .download(document.storagePath);

      if (error || !data) {
        throw new Error(
          `Failed to download file at ${document.storagePath}: ${error?.message}`
        );
      }

      const fileBuffer = Buffer.from(await data.arrayBuffer());

      console.log(
        `[DocumentProcessor] Running Mistral OCR on storagePath: ${document.storagePath}`
      );

      const text = await runMistralOCR(fileBuffer, document.fileType);
      return text;
    }

    throw new Error("Document lacks both sourceUrl and storagePath");
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });
    return response.data[0].embedding;
  }
}
