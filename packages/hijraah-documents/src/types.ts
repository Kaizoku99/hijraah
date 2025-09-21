export interface Document {
  id: string;
  content: string;
  type: string;
  metadata?: Record<string, any>;
}

export interface ProcessedDocument extends Document {
  processed: boolean;
  timestamp: string;
}
