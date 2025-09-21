import type { Document, ProcessedDocument } from "./types";

export const createDocument = (
  content: string,
  type: string,
  metadata?: Record<string, any>
): Document => {
  return {
    id: crypto.randomUUID(),
    content,
    type,
    metadata,
  };
};

export const validateDocument = (doc: Document): boolean => {
  return !!(doc.id && doc.content && doc.type);
};
