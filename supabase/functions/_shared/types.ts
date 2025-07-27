export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface ImmigrationUpdate {
  id: string;
  type: string;
  content: string;
  affectedVisaTypes: string[];
  effectiveDate: string;
  country: string;
}

export interface UserProfile {
  id: string;
  nationality: string;
  currentVisaType?: string;
  intendedVisaType?: string;
  qualifications: string[];
  workExperience: number;
}

export interface EligibilityResult {
  eligible: boolean;
  missing: string[];
  recommendations: string[];
}

export interface QueryAnalysis {
  requiresLegalExpertise: boolean;
  isDocumentRelated: boolean;
  complexity: "low" | "medium" | "high";
}

export interface ImmigrationRules {
  program_type: string;
  required_qualifications: string[];
  minimum_work_experience: number;
  restricted_nationalities?: string[];
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: string;
  current: number;
  maximum: number;
  resetAfter: number;
}

// Cache options interface
export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  useMemory?: boolean; // Whether to use memory cache
  useDb?: boolean; // Whether to use database cache
  useKv?: boolean; // Whether to use KV store cache
}
