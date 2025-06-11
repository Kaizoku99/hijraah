import { task, logger } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import {
  DocumentProcessor,
  RAGProcessedDocument,
} from "@/lib/rag/ingestion/document-processor";
import { KnowledgeGraphBuilder } from "@/lib/rag/knowledge-graph/builder";
import { HybridRetriever } from "@/lib/rag/retrieval/hybrid-retriever";
import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { OpenAI } from "openai";

// Define the event schema that triggers this RAG pipeline task
const RAGDocumentPayloadSchema = z.object({
  id: z.string().uuid(),
  storagePath: z.string(),
  fileType: z.string(),
  sourceUrl: z.string().url(),
});

export const ragPipelineTask = task({
  id: "rag-pipeline-orchestrator",
  run: async (payload: z.infer<typeof RAGDocumentPayloadSchema>, { ctx }) => {
    logger.info("🚀 RAG Pipeline Task Started", {
      documentId: payload.id,
      runId: ctx.run.id,
    });

    // Shared clients
    const supabase = createSupabaseClient("service");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    const documentProcessor = new DocumentProcessor();
    const knowledgeGraphBuilder = new KnowledgeGraphBuilder(openai, supabase);
    const retriever = new HybridRetriever(supabase, openai);

    try {
      // Step 1: Process the document (scrape, chunk)
      logger.info("Step 1: Processing document...", { documentId: payload.id });
      const processedDocument: RAGProcessedDocument =
        await documentProcessor.processDocument({
          id: payload.id,
          sourceUrl: payload.sourceUrl,
          storagePath: payload.storagePath,
          fileType: payload.fileType,
        });
      logger.info("Document processed successfully", {
        documentId: processedDocument.documentId,
        chunkCount: processedDocument.chunks.length,
      });

      // Step 2: Store document chunks and embeddings for retrieval
      logger.info("Step 2: Storing document for retrieval...", {
        documentId: processedDocument.documentId,
      });
      await retriever.storeDocument(processedDocument);
      logger.info("Document stored for retrieval successfully", {
        documentId: processedDocument.documentId,
      });

      // Step 3: Build and store the knowledge graph from the processed document
      logger.info("Step 3: Building knowledge graph...", {
        documentId: processedDocument.documentId,
      });
      const { entities, relationships } =
        await knowledgeGraphBuilder.buildFromDocument(processedDocument);
      logger.info("Knowledge graph built successfully", {
        documentId: processedDocument.documentId,
        entityCount: entities.length,
        relationshipCount: relationships.length,
      });

      logger.info("✅ RAG Pipeline Task Completed Successfully", {
        documentId: payload.id,
        runId: ctx.run.id,
      });

      return { status: "success", documentId: payload.id };
    } catch (error: any) {
      logger.error("❌ RAG Pipeline Task Failed", {
        documentId: payload.id,
        error: error.message,
        runId: ctx.run.id,
        stack: error.stack,
      });
      // Rethrow the error to ensure the task run is marked as failed
      throw error;
    }
  },
});
