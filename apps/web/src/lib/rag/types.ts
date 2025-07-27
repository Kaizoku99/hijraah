export interface RAGProcessedDocumentChunk {
  content: string;
  embedding: number[];
  metadata: {
    sourceUrl: string;
    documentId: string;
    chunkIndex: number;
  };
}

export interface RAGProcessedDocument {
  documentId: string;
  sourceUrl: string;
  chunks: RAGProcessedDocumentChunk[];
  rawText: string;
}

export interface KGEntity {
  id: string; // Assuming UUID from DB
  name: string;
  type: string;
}

export interface KGRelationship {
  source_entity_name: string;
  target_entity_name: string;
  type: string;
}

export interface KGContext {
  entities: { name: string; type: string }[];
  relationships: KGRelationship[];
}

export interface RetrievalResult {
  chunks: RAGProcessedDocumentChunk[];
  kgContext: KGContext;
  images?: RetrievedImage[];
  userContext?: UserContext | null;
}

export interface RetrievedImage {
  url: string;
  metadata: Record<string, any>;
  score: number;
}

export type UserContext = import("@/types/user").UserProfile;

export interface GeneratedResponse {
  text: string;
  sources: RAGProcessedDocumentChunk[];
  confidence: number;
}
