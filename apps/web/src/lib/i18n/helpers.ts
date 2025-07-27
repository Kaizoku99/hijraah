import { Redis } from "@upstash/redis";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { locales, defaultLocale, Locale } from "@/i18n";

// Initialize Redis if credentials are available
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Translation cache helper
export const translationCache = {
  async get(key: string): Promise<string | null> {
    try {
      if (!redis) return null;
      return await redis.get(key);
    } catch (error) {
      console.error("Translation cache get error:", error);
      return null;
    }
  },

  async set(
    key: string,
    value: string,
    options?: { ex?: number },
  ): Promise<void> {
    try {
      if (!redis) return;
      await redis.set(key, value, options);
    } catch (error) {
      console.error("Translation cache set error:", error);
    }
  },
};

/**
 * Navigation helpers for internationalized routing
 */
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales,
    localePrefix: "as-needed",
  });

/**
 * Format a message with variable substitution
 */
export function formatMessage(
  message: string,
  variables: Record<string, string | number> = {},
): string {
  return Object.entries(variables).reduce(
    (result, [key, value]) =>
      result.replace(new RegExp(`{{${key}}}`, "g"), String(value)),
    message,
  );
}

/**
 * Load translations for a specific locale
 */
export async function loadTranslations(
  locale: Locale,
): Promise<Record<string, any>> {
  try {
    // Check cache first
    const cacheKey = `translations:${locale}`;
    const cached = await translationCache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    // Dynamic import to load translations
    const translations = await import(`@/_shared/messages/${locale}.json`);

    // Store in cache for future requests
    await translationCache.set(
      cacheKey,
      JSON.stringify(translations.default),
      { ex: 60 * 60 }, // Cache for 1 hour
    );

    return translations.default || {};
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    // Fallback to default locale if requested locale fails
    if (locale !== defaultLocale) {
      console.warn(`Falling back to default locale: ${defaultLocale}`);
      return loadTranslations(defaultLocale);
    }
    return {};
  }
}

/**
 * Get the appropriate text direction for a locale
 */
export function getTextDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * Detect locale from Accept-Language header
 */
export function detectLocaleFromHeader(header: string | null): Locale | null {
  if (!header) return null;

  // Normalize and parse the Accept-Language header
  const acceptedLanguages = header
    .split(",")
    .map((lang) => {
      const [language, qualityStr] = lang.trim().split(";q=");
      const quality = qualityStr ? parseFloat(qualityStr) : 1.0;
      return { language: language.toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Check for exact matches
  for (const { language } of acceptedLanguages) {
    const exactMatch = locales.find(
      (locale) => locale.toLowerCase() === language,
    );
    if (exactMatch) return exactMatch;
  }

  // Check for language matches (ignoring region)
  for (const { language } of acceptedLanguages) {
    const baseLanguage = language.split("-")[0];
    const languageMatch = locales.find(
      (locale) => locale.split("-")[0] === baseLanguage,
    );
    if (languageMatch) return languageMatch;
  }

  return null;
}

/**
 * Extract locale from pathname
 */
export function extractLocaleFromPath(pathname: string): {
  locale: Locale;
  pathname: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Check if the first segment is a valid locale
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    // Remove the locale from the pathname
    const strippedPathname = "/" + segments.slice(1).join("/");
    return {
      locale: firstSegment as Locale,
      pathname: strippedPathname || "/",
    };
  }

  // No locale in path, return default
  return { locale: defaultLocale, pathname };
}

/**
 * Add locale prefix to a path if needed
 */
export function addLocaleToPath(pathname: string, locale: Locale): string {
  // Skip if locale is already in path
  if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
    return pathname;
  }

  // Don't add prefix for default locale
  if (locale === defaultLocale) {
    return pathname;
  }

  // Add locale prefix
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

/**
 * Merge translation objects with deep nesting
 */
export function mergeTranslations(
  base: Record<string, any>,
  override: Record<string, any>,
): Record<string, any> {
  const result = { ...base };

  for (const key in override) {
    if (
      typeof override[key] === "object" &&
      !Array.isArray(override[key]) &&
      override[key] !== null
    ) {
      result[key] = mergeTranslations(result[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }

  return result;
}

/**
 * Find missing translations compared to a reference locale
 */
export function findMissingTranslations(
  reference: Record<string, any>,
  target: Record<string, any>,
  path: string[] = [],
): string[] {
  const missing: string[] = [];

  for (const key in reference) {
    const currentPath = [...path, key];

    if (!(key in target)) {
      missing.push(currentPath.join("."));
    } else if (
      typeof reference[key] === "object" &&
      !Array.isArray(reference[key]) &&
      reference[key] !== null
    ) {
      missing.push(
        ...findMissingTranslations(
          reference[key],
          target[key] || {},
          currentPath,
        ),
      );
    }
  }

  return missing;
}

/**
 * Get translated date format pattern for a locale
 */
export function getDateFormatPattern(locale: Locale): string {
  const formats: Record<Locale, string> = {
    en: "MM/dd/yyyy",
    ar: "dd/MM/yyyy",
    es: "dd/MM/yyyy",
    fr: "dd/MM/yyyy",
  };

  return formats[locale] || formats[defaultLocale];
}
