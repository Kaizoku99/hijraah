import { Context, MiddlewareHandler, Next } from "hono";
import { languageDetector as honoLanguageDetector } from "hono/language";
import type { DetectorOptions as HonoDetectorOptions } from "hono/language";
import { Locale, locales, defaultLocale } from "@/i18n";

// Extended options interface to match Hono's underlying implementation
interface DetectorOptions extends HonoDetectorOptions {
  // Add any custom options
}

/**
 * Middleware for language detection in API routes
 */
export function languageDetectionMiddleware(
  options: Partial<DetectorOptions> = {}
): MiddlewareHandler {
  // Set up default options
  const defaultOptions: Partial<DetectorOptions> = {
    order: ["querystring", "cookie", "header", "path"],
    lookupQueryString: "lang",
    lookupCookie: "NEXT_LOCALE",
    lookupFromPathIndex: 0,
    lookupFromHeaderKey: "accept-language",
    ignoreCase: true,
    supportedLanguages: [...locales], // Convert readonly array to mutable array
    fallbackLanguage: defaultLocale,
    caches: false, // Explicitly disable language detector's own caching
    cookieOptions: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 365 * 24 * 60 * 60, // 1 year
      httpOnly: true,
    },
  };

  // Merge options with defaults
  const mergedOptions = { ...defaultOptions, ...options };

  // Apply the Hono language detector
  const detector = honoLanguageDetector(mergedOptions);

  // Wrap the detector to set the locale in Hono context
  return async (c: Context, next: Next) => {
    // Apply the built-in detector
    await detector(c, next);

    // Get the detected language
    const detectedLanguage = c.get("language") as string;

    // Set locale in the context as well (for convenience)
    c.set("locale", detectedLanguage as Locale);

    // Optionally add response headers
    c.header("Content-Language", detectedLanguage);
  };
}
