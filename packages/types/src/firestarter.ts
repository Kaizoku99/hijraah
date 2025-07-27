// Base types
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

type Status = "pending" | "processing" | "completed" | "failed";

export interface WebIndex extends BaseEntity {
  userId: string;
  url: string;
  namespace: string;
  title?: string;
  description?: string;
  pagesCrawled: number;
  totalPages?: number;
  lastCrawlDuration?: number; // in seconds
  metadata: Record<string, any>;
  crawlConfig: CrawlConfig;
  isActive: boolean;
  isPublic: boolean;
  lastCrawledAt?: Date;
}

export interface CrawlJob extends BaseEntity {
  webIndexId: string;
  status: Status;
  firecrawlJobId?: string;
  startedAt?: Date;
  completedAt?: Date;
  errorMessage?: string;
  pagesProcessed: number;
  metadata: Record<string, any>;
}

export interface Document extends BaseEntity {
  userId: string;
  webIndexId?: string;
  title: string;
  content: string;
  contentType: string;
  fileSize?: number;
  checksum?: string;
  source?: string; // URL or file path
  metadata: Record<string, any>;
  isProcessed: boolean;
  vectorId?: string; // Reference to vector database
}

export interface Embedding extends BaseEntity {
  documentId?: string;
  content: string;
  embedding?: string; // JSON string of vector
  chunkIndex: number;
  tokenCount?: number;
  model: string;
  metadata: Record<string, any>;
}

// Crawl configuration
export interface CrawlConfig {
  maxPages?: number;
  maxDepth?: number;
  includePatterns?: string[];
  excludePatterns?: string[];
  respectRobotsTxt?: boolean;
  waitTime?: number; // milliseconds between requests
  userAgent?: string;
  javascript?: boolean;
  followRedirects?: boolean;
  customHeaders?: Record<string, string>;
}

// Firecrawl API types
export interface FirecrawlJobResponse {
  id: string;
  status: "scraping" | "completed" | "failed";
  data?: FirecrawlDocument[];
  error?: string;
  progress?: number;
  total?: number;
}

export interface FirecrawlDocument {
  url: string;
  markdown: string;
  html?: string;
  metadata: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    statusCode?: number;
    error?: string;
  };
}

// Search and indexing types
export interface SearchQuery {
  query: string;
  webIndexId?: string;
  limit?: number;
  threshold?: number;
  filters?: Record<string, any>;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  url?: string;
  score: number;
  metadata: Record<string, any>;
  highlights?: string[];
}

export interface IndexStats {
  webIndexId: string;
  totalDocuments: number;
  totalEmbeddings: number;
  averageScore?: number;
  lastUpdated: Date;
  diskUsage?: number; // bytes
}

// API request/response types
export interface CreateWebIndexRequest {
  url: string;
  namespace: string;
  title?: string;
  description?: string;
  crawlConfig?: Partial<CrawlConfig>;
  isPublic?: boolean;
}

export interface StartCrawlRequest {
  webIndexId: string;
  crawlConfig?: Partial<CrawlConfig>;
}

export interface ProcessEmbeddingsRequest {
  documentIds: string[];
  model?: string;
  chunkSize?: number;
  overlap?: number;
}
