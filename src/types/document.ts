export interface Document {
  id: string;
  title: string;
  content: string;
  url: string;
  country: string;
  category: string;
  lastUpdated?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
} 