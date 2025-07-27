export interface SourceInfo {
  url: string;
}

export function evaluateSourceConfidence(url: string): number {
  const hostname = new URL(url).hostname.toLowerCase();

  // Explicit whitelist
  const highTrust = [
    "www.canada.ca",
    "ircc.canada.ca",
    "uscis.gov",
    "www.gov.uk",
  ];
  if (highTrust.some((d) => hostname.endsWith(d))) return 0.95;

  // Social groups / blogs lower confidence
  if (hostname.includes("facebook.com")) return 0.4;
  if (hostname.includes("medium.com") || hostname.includes("blog")) return 0.6;

  // Default medium confidence
  return 0.7;
}
