import { SourceEvaluation, EvaluationCriteria } from "../types.js";

export interface SourceInfo {
  url: string;
}

export function evaluateSourceConfidence(url: string): number {
  try {
    const hostname = new URL(url).hostname.toLowerCase();

    // Explicit whitelist of high-trust immigration sources
    const highTrust = [
      "www.canada.ca",
      "ircc.canada.ca",
      "uscis.gov",
      "www.gov.uk",
      "travel.state.gov",
      "www.immigration.gov.au",
      "immi.gov.au",
      "immigration.govt.nz",
      "ind.nl", // Netherlands immigration
      "migrationsverket.se", // Sweden immigration
    ];
    if (highTrust.some((d) => hostname.endsWith(d))) return 0.95;

    // Government domains generally
    if (hostname.endsWith(".gov") || hostname.endsWith(".gc.ca")) return 0.9;

    // Educational institutions
    if (hostname.endsWith(".edu")) return 0.8;

    // International organizations
    const internationalOrgs = [
      "un.org",
      "iom.int", // International Organization for Migration
      "unhcr.org",
      "europa.eu",
    ];
    if (internationalOrgs.some((d) => hostname.endsWith(d))) return 0.85;

    // Social groups / blogs lower confidence
    if (hostname.includes("facebook.com") || hostname.includes("reddit.com"))
      return 0.4;
    if (hostname.includes("medium.com") || hostname.includes("blog"))
      return 0.6;

    // Default medium confidence
    return 0.7;
  } catch (error) {
    // If URL parsing fails, return low confidence
    console.warn(
      `Failed to parse URL for confidence evaluation: ${url}`,
      error,
    );
    return 0.5;
  }
}

// Context7 Pattern: Comprehensive source evaluation
export async function evaluateSource(
  url: string,
  criteria?: EvaluationCriteria,
): Promise<SourceEvaluation> {
  const confidence = evaluateSourceConfidence(url);

  // Basic evaluation for now - can be enhanced with actual checks
  const evaluation: SourceEvaluation = {
    sourceUrl: url,
    credibility: confidence,
    relevance: 0.8, // Default relevance
    recency: 0.7, // Would need to check actual dates
    authority: confidence, // Use confidence as authority proxy
    bias: 0.5, // Neutral bias score
    factualAccuracy: confidence * 0.9, // Slightly lower than credibility
    metadata: {
      domain: new URL(url).hostname,
      // Other metadata would be extracted from actual page content
    },
  };

  // Apply criteria filters if provided
  if (criteria) {
    if (criteria.domainBlacklist?.some((d) => url.includes(d))) {
      evaluation.credibility = 0;
      evaluation.authority = 0;
    }

    if (
      criteria.domainWhitelist &&
      !criteria.domainWhitelist.some((d) => url.includes(d))
    ) {
      evaluation.credibility *= 0.5;
      evaluation.authority *= 0.5;
    }

    if (
      criteria.minCredibilityScore &&
      evaluation.credibility < criteria.minCredibilityScore
    ) {
      // Mark as failing criteria
      evaluation.metadata.failsCriteria = true;
    }
  }

  return evaluation;
}

// Context7 Pattern: Batch evaluation for efficiency
export async function evaluateSources(
  urls: string[],
  criteria?: EvaluationCriteria,
): Promise<SourceEvaluation[]> {
  return Promise.all(urls.map((url) => evaluateSource(url, criteria)));
}

// Context7 Pattern: Source ranking
export function rankSources(
  evaluations: SourceEvaluation[],
): SourceEvaluation[] {
  return evaluations.sort((a, b) => {
    // Composite score calculation
    const scoreA =
      a.credibility * 0.4 +
      a.relevance * 0.3 +
      a.recency * 0.2 +
      a.authority * 0.1;
    const scoreB =
      b.credibility * 0.4 +
      b.relevance * 0.3 +
      b.recency * 0.2 +
      b.authority * 0.1;
    return scoreB - scoreA;
  });
}
