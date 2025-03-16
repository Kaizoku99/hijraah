import { redirect } from 'next/navigation';

/**
 * Base URL for the application
 */
export const BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Safe server-side redirect that handles edge cases
 */
export function safeServerRedirect(url: string = '/') {
  // Ensure the URL starts with a slash or has http(s)
  if (!url.startsWith('/') && !url.startsWith('http')) {
    url = `/${url}`;
  }
  
  // If URL is a relative path, make sure it doesn't start with multiple slashes
  if (url.startsWith('//') && !url.startsWith('//www.')) {
    url = url.replace(/^\/+/, '/');
  }
  
  // For security, only allow redirects to same domain or known safe domains
  // if external URL (starts with http)
  if (url.startsWith('http') && !url.startsWith(BASE_URL)) {
    const isSafeDomain = [
      // Add your list of trusted domains here
      'supabase.com',
      'vercel.app',
      'github.com',
    ].some(domain => url.includes(domain));
    
    if (!isSafeDomain) {
      console.warn(`Unsafe redirect prevented to: ${url}`);
      url = '/';
    }
  }
  
  redirect(url);
}

/**
 * Parse JWT token without library
 */
export function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
}

/**
 * Get remaining time of a JWT token in seconds
 */
export function getTokenRemainingTime(token: string): number {
  try {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) return 0;
    
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const remainingTime = Math.max(0, expiryTime - currentTime);
    
    return Math.floor(remainingTime / 1000); // Convert to seconds
  } catch (error) {
    console.error('Failed to get token remaining time:', error);
    return 0;
  }
}

/**
 * Get user's preferred locale from browser or storage
 */
export function getUserLocale(): string {
  if (typeof navigator === 'undefined') return 'en';
  
  return (
    navigator.languages?.[0] ||
    navigator.language ||
    'en'
  );
}

/**
 * Sleep for a specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random string for CSRF protection
 */
export function generateRandomString(length: number = 16): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  
  return result;
} 