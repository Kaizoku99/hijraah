import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, defaultLocale, Locale } from '@/i18n';
import { translationCache } from '@/lib/redis';

/**
 * Navigation helpers for internationalized routing
 */
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ 
  locales, 
  localePrefix: 'as-needed' 
});

/**
 * Format a message with variable substitution
 */
export function formatMessage(message: string, variables: Record<string, string | number> = {}): string {
  return Object.entries(variables).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
    message
  );
}

/**
 * Load translations for a specific locale
 */
export async function loadTranslations(locale: Locale): Promise<Record<string, any>> {
  try {
    // Dynamic import to load translations
    const translations = await import(`@/locales/${locale}.json`);
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
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Parse Accept-Language header and find the best matching locale
 */
export function detectLocaleFromHeader(acceptLanguageHeader: string | null): Locale | null {
  if (!acceptLanguageHeader) return null;

  // Parse the Accept-Language header
  const languages = acceptLanguageHeader
    .split(',')
    .map(lang => {
      // Parse language and quality value (q)
      const [language, qValue] = lang.trim().split(';q=');
      // Extract base language code (e.g., 'en' from 'en-US')
      const baseLanguage = language.split('-')[0].toLowerCase();
      // Parse quality value (defaults to 1 if not specified)
      const quality = qValue ? parseFloat(qValue) : 1.0;
      
      return { language, baseLanguage, quality };
    })
    // Sort by quality value in descending order
    .sort((a, b) => b.quality - a.quality);

  // Try to find an exact match first
  for (const { language } of languages) {
    const normalizedLang = language.toLowerCase();
    
    // Check for exact match
    if (locales.includes(normalizedLang as Locale)) {
      return normalizedLang as Locale;
    }
  }

  // If no exact match, try matching base language codes
  for (const { baseLanguage } of languages) {
    // Find the first locale that starts with the base language
    const matchingLocale = locales.find(locale => 
      locale.toLowerCase().startsWith(baseLanguage)
    ) as Locale | undefined;
    
    if (matchingLocale) {
      return matchingLocale;
    }
  }

  // No match found
  return null;
}

/**
 * Extract locale from pathname
 */
export function extractLocaleFromPath(pathname: string): { locale: Locale; pathname: string } {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // Check if the first segment is a valid locale
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    // Remove the locale from the pathname
    const strippedPathname = '/' + segments.slice(1).join('/');
    return { 
      locale: firstSegment as Locale, 
      pathname: strippedPathname || '/' 
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
  return `/${locale}${pathname === '/' ? '' : pathname}`;
}

/**
 * Get translated date format pattern for a locale
 */
export function getDateFormatPattern(locale: Locale): string {
  const formats: Record<Locale, string> = {
    en: 'MM/dd/yyyy',
    ar: 'dd/MM/yyyy',
    es: 'dd/MM/yyyy',
    fr: 'dd/MM/yyyy'
  };

  return formats[locale] || formats[defaultLocale];
} 