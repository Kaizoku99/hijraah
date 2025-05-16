import { z } from "zod";

/**
 * Document types supported by the system
 */
export enum DocumentType {
  PASSPORT = "passport",
  VISA = "visa",
  BIRTH_CERTIFICATE = "birth_certificate",
  MARRIAGE_CERTIFICATE = "marriage_certificate",
  EDUCATION_CREDENTIAL = "education_credential",
  EMPLOYMENT_LETTER = "employment_letter",
  BANK_STATEMENT = "bank_statement",
  TAX_DOCUMENT = "tax_document",
  MEDICAL_RECORD = "medical_record",
  POLICE_CLEARANCE = "police_clearance",
  OTHER = "other",
}

/**
 * Analysis result for a document
 */
export interface DocumentAnalysis {
  id: string;
  userId: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  extractedData: Record<string, any>;
  analysisDate: Date;
  status: "completed" | "failed" | "processing";
  errorMessage?: string;
  confidence: number;
}

/**
 * Validation result against a template
 */
export interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
  invalidFields: Record<string, string>;
  confidence: number;
  warnings: string[];
}

/**
 * Schema for document analysis request
 */
export const DocumentAnalysisRequestSchema = z.object({
  documentType: z.nativeEnum(DocumentType),
  fileUrl: z.string().url(),
  fileName: z.string(),
  userId: z.string().uuid(),
  validateAgainstTemplate: z.boolean().optional().default(false),
  callbackUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type DocumentAnalysisRequest = z.infer<
  typeof DocumentAnalysisRequestSchema
>;

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
