/**
 * Content Extraction Utilities
 *
 * This file contains utilities for extracting structured immigration-related data
 * from web content.
 */

/**
 * Extracts important information from content using AI
 *
 * @param content Content to extract information from
 * @returns Extracted structured data related to immigration
 */
export async function extractImportantInfo(
  content: string,
): Promise<ExtractedInfo> {
  try {
    const response = await fetch("/api/ai/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to extract information");
    }

    const data = await response.json();
    return data.extractedInfo || {};
  } catch (error: any) {
    console.error("Error extracting information:", error);
    // Return empty object on error rather than failing
    return {};
  }
}

/**
 * Extracts specific visa information from content
 *
 * @param content Content to extract visa information from
 * @returns Structured visa information
 */
export async function extractVisaInfo(content: string): Promise<VisaInfo[]> {
  try {
    const response = await fetch("/api/ai/extract-visa-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to extract visa information");
    }

    const data = await response.json();
    return data.visaInfo || [];
  } catch (error: any) {
    console.error("Error extracting visa information:", error);
    return [];
  }
}

/**
 * Extracts immigration requirements from content
 *
 * @param content Content to extract requirements from
 * @returns Structured immigration requirements
 */
export async function extractRequirements(
  content: string,
): Promise<Requirement[]> {
  try {
    const response = await fetch("/api/ai/extract-requirements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to extract requirements");
    }

    const data = await response.json();
    return data.requirements || [];
  } catch (error: any) {
    console.error("Error extracting requirements:", error);
    return [];
  }
}

/**
 * Extracts deadlines and timelines from content
 *
 * @param content Content to extract deadlines from
 * @returns Structured deadline information
 */
export async function extractDeadlines(content: string): Promise<Deadline[]> {
  try {
    const response = await fetch("/api/ai/extract-deadlines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to extract deadlines");
    }

    const data = await response.json();
    return data.deadlines || [];
  } catch (error: any) {
    console.error("Error extracting deadlines:", error);
    return [];
  }
}

/**
 * Interface for extracted information
 */
export interface ExtractedInfo {
  visaTypes?: VisaInfo[];
  requirements?: Requirement[];
  deadlines?: Deadline[];
  contactInfo?: ContactInfo[];
  legalUpdates?: LegalUpdate[];
  fees?: Fee[];
}

/**
 * Interface for visa information
 */
export interface VisaInfo {
  type: string;
  eligibility?: string;
  duration?: string;
  processingTime?: string;
  restrictions?: string[];
  notes?: string;
}

/**
 * Interface for immigration requirements
 */
export interface Requirement {
  description: string;
  category?: "document" | "financial" | "background" | "medical" | "other";
  isRequired: boolean;
  details?: string;
}

/**
 * Interface for deadlines
 */
export interface Deadline {
  description: string;
  date?: string;
  timeframe?: string;
  consequences?: string;
}

/**
 * Interface for contact information
 */
export interface ContactInfo {
  name?: string;
  organization: string;
  role?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
}

/**
 * Interface for legal updates
 */
export interface LegalUpdate {
  title: string;
  description: string;
  effectiveDate?: string;
  source?: string;
}

/**
 * Interface for fees
 */
export interface Fee {
  description: string;
  amount?: string;
  currency?: string;
  paymentMethod?: string[];
}
