/**
 * List of supported locales
 */
export const locales = ['en', 'ar', 'fr', 'es'] as const;

/**
 * Type representing the supported locales
 */
export type Locale = (typeof locales)[number];

/**
 * Default locale when no preference is detected
 */
export const defaultLocale: Locale = 'en';

/**
 * Configuration for each locale
 */
export interface LocaleConfig {
  /** Native name of the language */
  nativeName: string;
  /** English name of the language */
  englishName: string;
  /** Text direction (ltr or rtl) */
  direction: 'ltr' | 'rtl';
  /** Date format pattern */
  dateFormat: string;
  /** Flag emoji or code for the language */
  flag: string;
}

/**
 * Configuration for all supported locales
 */
export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: {
    nativeName: 'English',
    englishName: 'English',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    flag: '🇺🇸',
  },
  ar: {
    nativeName: 'العربية',
    englishName: 'Arabic',
    direction: 'rtl',
    dateFormat: 'DD/MM/YYYY',
    flag: '🇸🇦',
  },
  fr: {
    nativeName: 'Français',
    englishName: 'French',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    flag: '🇫🇷',
  },
  es: {
    nativeName: 'Español',
    englishName: 'Spanish',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    flag: '🇪🇸',
  },
};