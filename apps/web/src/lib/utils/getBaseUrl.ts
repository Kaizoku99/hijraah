import "server-only"; // Ensure this runs only on the server

/**
 * Gets the base URL for the application, essential for server-side API calls.
 * Prefers VERCEL_URL if available (including protocol), otherwise falls back to localhost.
 */
export function getBaseUrl(): string {
  // 1. Check for Vercel deployment URL (includes https://)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 2. Check for explicit NEXT_PUBLIC_APP_URL (used by frontend, might be set)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // 3. Fallback for local development
  return "http://localhost:3000"; // Default to port 3000
}
