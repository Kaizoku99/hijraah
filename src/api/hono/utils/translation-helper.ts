import { Context } from 'hono';
import { Locale, defaultLocale } from '@/i18n';
import { TranslateService } from '@/lib/i18n/translate-service';

/**
 * Get a TranslateService instance for the current request
 * Uses the language detected by the language detector middleware
 */
export async function getTranslator(c: Context): Promise<TranslateService> {
  // Get the detected language from the context
  const language = c.get('language') as Locale || defaultLocale;
  
  // Create and initialize a translation service
  const translator = new TranslateService(language);
  await translator.init();
  
  // Cache the translator in context for reuse
  c.set('translator', translator);
  
  return translator;
}

/**
 * Simple translation helper that doesn't require initialization
 * Good for quickly translating simple messages
 * For more complex or nested translations, use the full TranslateService
 */
export async function t(c: Context, key: string, variables: Record<string, any> = {}): Promise<string> {
  // Check if we already have a translator instance in the context
  let translator = c.get('translator') as TranslateService | undefined;
  
  // If no translator cached, create one
  if (!translator) {
    translator = await getTranslator(c);
  }
  
  // Use the translator to get the translation
  return translator.translate(key, variables);
}

/**
 * Format a date according to the current locale
 */
export async function formatDate(c: Context, date: Date, options: Intl.DateTimeFormatOptions = {}): Promise<string> {
  const translator = c.get('translator') as TranslateService || await getTranslator(c);
  return translator.formatDate(date, options);
}

/**
 * Format a number according to the current locale
 */
export async function formatNumber(c: Context, number: number, options: Intl.NumberFormatOptions = {}): Promise<string> {
  const translator = c.get('translator') as TranslateService || await getTranslator(c);
  return translator.formatNumber(number, options);
}

/**
 * Format currency according to the current locale
 */
export async function formatCurrency(c: Context, amount: number, currency: string = 'USD'): Promise<string> {
  const translator = c.get('translator') as TranslateService || await getTranslator(c);
  return translator.formatCurrency(amount, currency);
}

/**
 * Generate a localized error response
 */
export async function localizedError(
  c: Context, 
  status: 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500, 
  key: string = 'errors.generic',
  variables: Record<string, any> = {}
) {
  const message = await t(c, key, variables);
  
  return c.json(
    { 
      error: true, 
      message,
      status,
    },
    status
  );
}

/**
 * Generate a localized success response
 */
export async function localizedSuccess(
  c: Context, 
  data: any,
  key: string = 'success.generic',
  variables: Record<string, any> = {}
) {
  const message = await t(c, key, variables);
  
  return c.json({
    data,
    message,
    success: true
  });
} 