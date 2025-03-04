import { Context, Next } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { locales, defaultLocale, type Locale } from '../../../../i18n';
import { translationCache } from '@/lib/redis';

interface LanguageDetectionOptions {
  cookieName?: string;
  cookieMaxAge?: number;
  cacheTTL?: number;
}

interface Translations {
  [key: string]: any;
}

const DEFAULT_TRANSLATIONS: Translations = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry'
  }
};

/**
 * Language detection middleware for Hono
 * Integrates with Next.js App Router internationalization
 */
export function languageDetectionMiddleware(options: LanguageDetectionOptions = {}) {
  const {
    cookieName = 'NEXT_LOCALE',
    cookieMaxAge = 365 * 24 * 60 * 60, // 1 year
    cacheTTL = 3600, // 1 hour
  } = options;

  return async (c: Context, next: Next) => {
    let detectedLocale: Locale = defaultLocale;

    try {
      // Helper function to normalize locale
      const normalizeLocale = (locale: string): string => {
        return locale.toLowerCase().replace('_', '-');
      };

      // Helper function to find best matching locale
      const findBestMatch = (userLocale: string): Locale | null => {
        const normalized = normalizeLocale(userLocale);
        
        // Exact match
        if (locales.includes(normalized as Locale)) {
          return normalized as Locale;
        }
        
        // Language match without region
        const language = normalized.split('-')[0];
        const match = locales.find(l => l.startsWith(language));
        if (match) {
          return match as Locale;
        }
        
        return null;
      };

      // 1. Try to get locale from URL path (Next.js convention)
      const url = new URL(c.req.url);
      const pathParts = url.pathname.split('/');
      if (pathParts[1] && pathParts[1].length === 2) {
        const matchedLocale = findBestMatch(pathParts[1]);
        if (matchedLocale) {
          detectedLocale = matchedLocale;
        }
      }

      // 2. Try to get locale from Next.js cookie
      if (detectedLocale === defaultLocale) {
        const cookieLocale = getCookie(c, cookieName);
        if (cookieLocale) {
          const matchedLocale = findBestMatch(cookieLocale);
          if (matchedLocale) {
            detectedLocale = matchedLocale;
          }
        }
      }

      // 3. Try to get locale from Accept-Language header
      if (detectedLocale === defaultLocale) {
        const acceptLanguage = c.req.header('Accept-Language');
        if (acceptLanguage) {
          const preferredLocales = acceptLanguage
            .split(',')
            .map(lang => {
              const [locale, q = '1'] = lang.split(';q=');
              return {
                locale: normalizeLocale(locale),
                q: parseFloat(q)
              };
            })
            .sort((a, b) => b.q - a.q);

          for (const { locale } of preferredLocales) {
            const matchedLocale = findBestMatch(locale);
            if (matchedLocale) {
              detectedLocale = matchedLocale;
              break;
            }
          }
        }
      }

      // Set detected locale in cookie for persistence
      setCookie(c, cookieName, detectedLocale, {
        path: '/',
        maxAge: cookieMaxAge,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      });

      // Try to get translations from cache
      let translations: Translations = { ...DEFAULT_TRANSLATIONS };
      
      // Try to get translations from Upstash Redis cache
      const cachedTranslations = await translationCache.get(detectedLocale);
      
      if (cachedTranslations) {
        translations = { ...translations, ...cachedTranslations };
      } else {
        try {
          // Load translations from file system
          const translationsModule = await import(`../../../../messages/${detectedLocale}.json`);
          translations = { ...translations, ...translationsModule.default };
          
          // Cache translations with TTL
          await translationCache.set(detectedLocale, translations, cacheTTL);
        } catch (error) {
          console.error(`Failed to load translations for ${detectedLocale}:`, error);
          if (detectedLocale !== defaultLocale) {
            // Fallback to default locale
            detectedLocale = defaultLocale;
            try {
              const defaultTranslations = (await import(`../../../../messages/${defaultLocale}.json`)).default;
              translations = { ...translations, ...defaultTranslations };
              
              // Cache default translations
              await translationCache.set(defaultLocale, translations, cacheTTL);
            } catch (fallbackError) {
              console.error('Failed to load default translations:', fallbackError);
            }
          }
        }
      }

      // Add detected locale and translations to context
      c.set('locale', detectedLocale);
      c.set('translations', translations);

      // Add Content-Language header
      c.header('Content-Language', detectedLocale);
      
      // Add Vary header for proper caching
      c.header('Vary', 'Accept-Language, Cookie');

    } catch (error) {
      console.error('Language detection error:', error);
      // Fallback to default locale and translations in case of errors
      c.set('locale', defaultLocale);
      c.set('translations', DEFAULT_TRANSLATIONS);
      c.header('Content-Language', defaultLocale);
    }

    await next();
  };
} 