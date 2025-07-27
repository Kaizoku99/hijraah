/**
 * Scraping Sources Data Access Layer
 *
 * Provides functions for managing scraping sources including CRUD operations,
 * validation, and history tracking.
 */

import crypto from "crypto";

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Source categories
export type SourceCategory =
  | "government"
  | "legal"
  | "news"
  | "blog"
  | "forum"
  | "other";

// Scraping frequency options
export type ScrapeFrequency =
  | "1 hour"
  | "6 hours"
  | "12 hours"
  | "1 day"
  | "3 days"
  | "1 week"
  | "2 weeks"
  | "manual";

// Scraping source interface
export interface ScrapingSource {
  id: string;
  name: string;
  url: string;
  category: SourceCategory;
  description?: string;
  trust_score: number;
  last_scraped?: string;
  scrape_frequency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

// Source validation interface
export interface SourceValidation {
  id: string;
  source_id: string;
  validator_id?: string;
  score: number;
  notes?: string;
  created_at: string;
}

// Scrape history interface
export interface ScrapeHistory {
  id: string;
  source_id: string;
  artifact_id?: string;
  status: "success" | "error" | "pending";
  error_message?: string;
  content_hash?: string;
  has_changes: boolean;
  change_summary?: string;
  scraped_at: string;
}

// New scraping source data
export interface NewScrapingSource {
  name: string;
  url: string;
  category: SourceCategory;
  description?: string;
  scrape_frequency?: string;
  is_active?: boolean;
  created_by?: string;
}

/**
 * Get all scraping sources
 */
export async function getScrapingSources(): Promise<ScrapingSource[]> {
  const { data, error } = await supabase
    .from("scraping_sources")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching scraping sources:", error);
    throw error;
  }

  return data as ScrapingSource[];
}

/**
 * Get scraping sources by category
 */
export async function getScrapingSourcesByCategory(
  category: SourceCategory,
): Promise<ScrapingSource[]> {
  const { data, error } = await supabase
    .from("scraping_sources")
    .select("*")
    .eq("category", category)
    .order("trust_score", { ascending: false });

  if (error) {
    console.error("Error fetching scraping sources by category:", error);
    throw error;
  }

  return data as ScrapingSource[];
}

/**
 * Get scraping source by ID
 */
export async function getScrapingSourceById(
  id: string,
): Promise<ScrapingSource | null> {
  const { data, error } = await supabase
    .from("scraping_sources")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // No rows returned
    }
    console.error("Error fetching scraping source by ID:", error);
    throw error;
  }

  return data as ScrapingSource;
}

/**
 * Create a new scraping source
 */
export async function createScrapingSource(
  source: NewScrapingSource,
): Promise<ScrapingSource> {
  const { data, error } = await supabase
    .from("scraping_sources")
    .insert(source)
    .select()
    .single();

  if (error) {
    console.error("Error creating scraping source:", error);
    throw error;
  }

  return data as ScrapingSource;
}

/**
 * Update a scraping source
 */
export async function updateScrapingSource(
  id: string,
  updates: Partial<ScrapingSource>,
): Promise<ScrapingSource> {
  // Remove fields that shouldn't be updated directly
  const { created_at, updated_at, trust_score, ...validUpdates } = updates;

  const { data, error } = await supabase
    .from("scraping_sources")
    .update(validUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating scraping source:", error);
    throw error;
  }

  return data as ScrapingSource;
}

/**
 * Delete a scraping source
 */
export async function deleteScrapingSource(id: string): Promise<void> {
  const { error } = await supabase
    .from("scraping_sources")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting scraping source:", error);
    throw error;
  }
}

/**
 * Add a validation to a source
 */
export async function addSourceValidation(
  sourceId: string,
  score: number,
  validatorId?: string,
  notes?: string,
): Promise<SourceValidation> {
  const { data, error } = await supabase
    .from("source_validations")
    .insert({
      source_id: sourceId,
      validator_id: validatorId,
      score,
      notes,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding source validation:", error);
    throw error;
  }

  return data as SourceValidation;
}

/**
 * Get validations for a source
 */
export async function getSourceValidations(
  sourceId: string,
): Promise<SourceValidation[]> {
  const { data, error } = await supabase
    .from("source_validations")
    .select("*")
    .eq("source_id", sourceId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching source validations:", error);
    throw error;
  }

  return data as SourceValidation[];
}

/**
 * Record a scrape in the history
 */
export async function recordScrape(
  sourceId: string,
  status: "success" | "error" | "pending",
  content?: string,
  artifactId?: string,
  errorMessage?: string,
): Promise<ScrapeHistory> {
  // Calculate content hash if content is provided
  let contentHash: string | undefined;
  let hasChanges = false;
  let changeSummary: string | undefined;

  if (content && status === "success") {
    contentHash = crypto.createHash("md5").update(content).digest("hex");

    // Check if content has changed
    const { data: lastScrape } = await supabase
      .from("scrape_history")
      .select("content_hash")
      .eq("source_id", sourceId)
      .eq("status", "success")
      .order("scraped_at", { ascending: false })
      .limit(1);

    if (lastScrape && lastScrape.length > 0 && lastScrape[0].content_hash) {
      hasChanges = lastScrape[0].content_hash !== contentHash;
      if (hasChanges) {
        changeSummary = "Content has changed since last scrape";
      }
    } else {
      // First scrape or no successful scrapes yet
      hasChanges = true;
      changeSummary = "Initial scrape";
    }
  }

  // Update last_scraped timestamp for the source
  await supabase
    .from("scraping_sources")
    .update({ last_scraped: new Date().toISOString() })
    .eq("id", sourceId);

  // Record scrape history
  const { data, error } = await supabase
    .from("scrape_history")
    .insert({
      source_id: sourceId,
      artifact_id: artifactId,
      status,
      error_message: errorMessage,
      content_hash: contentHash,
      has_changes: hasChanges,
      change_summary: changeSummary,
    })
    .select()
    .single();

  if (error) {
    console.error("Error recording scrape history:", error);
    throw error;
  }

  return data as ScrapeHistory;
}

/**
 * Get scrape history for a source
 */
export async function getScrapeHistory(
  sourceId: string,
): Promise<ScrapeHistory[]> {
  const { data, error } = await supabase
    .from("scrape_history")
    .select("*")
    .eq("source_id", sourceId)
    .order("scraped_at", { ascending: false });

  if (error) {
    console.error("Error fetching scrape history:", error);
    throw error;
  }

  return data as ScrapeHistory[];
}

/**
 * Get sources that need to be scraped based on their frequency
 */
export async function getSourcesDueForScraping(): Promise<ScrapingSource[]> {
  const { data, error } = await supabase
    .from("scraping_sources")
    .select("*")
    .eq("is_active", true)
    .or("last_scraped.is.null,last_scraped.lt.now() - scrape_frequency")
    .order("trust_score", { ascending: false });

  if (error) {
    console.error("Error fetching sources due for scraping:", error);
    throw error;
  }

  return data as ScrapingSource[];
}
