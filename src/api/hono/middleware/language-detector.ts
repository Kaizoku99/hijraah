import { MiddlewareHandler } from 'hono';
import { Locale, defaultLocale, locales } from '@/i18n';
import { detectLocaleFromHeader } from '@/lib/i18n/helpers';
import { TranslateService } from '@/lib/i18n/translate-service';

/**
 * Configuration options for the language detection middleware
 */
export interface LanguageDetectorOptions {
  /**
   * Cookie name for storing language preference
   * @default 'NEXT_LOCALE'
   */
  cookieName?: string;
  
  /**
   * Parameter name for language in query string
   * @default 'locale'
   */
  queryParamName?: string;
  
  /**
   * Header name for language
   * @default 'Accept-Language'
   */
  headerName?: string;
  
  /**
   * Whether to cache translations in context
   * @default true
   */
  cacheTranslations?: boolean;
  
  /**
   * Order of detection sources
   * @default ['cookie', 'query', 'header']
   */
  order?: Array<'cookie' | 'query' | 'header'>;
  
  /**
   * Debug mode
   * @default false
   */
  debug?: boolean;
}

/**
 * Language detection middleware for Hono
 * Detects language from various sources and adds it to the context
 * Also loads translations for the detected language
 */
export function languageDetector(options: LanguageDetectorOptions = {}): MiddlewareHandler {
  const {
    cookieName = 'NEXT_LOCALE',
    queryParamName = 'locale',
    headerName = 'Accept-Language',
    cacheTranslations = true,
    order = ['cookie', 'query', 'header'],
    debug = false
  } = options;
  
  return async (c, next) => {
    let detectedLocale: Locale | null = null;
    let detectionSource: string = 'unknown';
    
    // Detect language from different sources in the specified order
    for (const source of order) {
      if (detectedLocale) break;
      
      switch (source) {
        case 'cookie': {
          // Check cookie for language preference
          const cookieValue = c.req.header('cookie');
          if (cookieValue) {
            const cookies = cookieValue.split(';').reduce((acc, cookie) => {
              const [key, value] = cookie.trim().split('=');
              acc[key] = value;
              return acc;
            }, {} as Record<string, string>);
            
            const cookieLocale = cookies[cookieName];
            if (cookieLocale && locales.includes(cookieLocale as Locale)) {
              detectedLocale = cookieLocale as Locale;
              detectionSource = 'cookie';
            }
          }
          break;
        }
        
        case 'query': {
          // Check query parameter for language
          const query = c.req.query();
          const queryLocale = query[queryParamName];
          if (queryLocale && locales.includes(queryLocale as Locale)) {
            detectedLocale = queryLocale as Locale;
            detectionSource = 'query';
          }
          break;
        }
        
        case 'header': {
          // Check Accept-Language header
          const acceptLanguage = c.req.header(headerName);
          const headerLocale = detectLocaleFromHeader(acceptLanguage || null);
          if (headerLocale) {
            detectedLocale = headerLocale;
            detectionSource = 'header';
          }
          break;
        }
      }
    }
    
    // Fallback to default locale if no locale detected
    if (!detectedLocale) {
      detectedLocale = defaultLocale;
      detectionSource = 'default';
    }
    
    // Set detected language in context
    c.set('language', detectedLocale);
    
    // Debug logging
    if (debug) {
      console.log(`[API] Detected language: ${detectedLocale} (from ${detectionSource})`);
    }
    
    // Load and cache translations if enabled
    if (cacheTranslations) {
      try {
        const translator = new TranslateService(detectedLocale);
        await translator.init();
        
        // Cache translations and translator in context
        c.set('translations', translator.getMessages());
        c.set('translator', translator);
        
        if (debug) {
          console.log(`[API] Loaded translations for: ${detectedLocale}`);
        }
      } catch (error) {
        console.error(`[API] Failed to load translations for: ${detectedLocale}`, error);
      }
    }
    
    // Continue to next middleware or route handler
    await next();
  };
} 