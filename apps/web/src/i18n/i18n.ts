/**
 * List of supported locales
 */
export const locales = ['en', 'ar', 'es', 'fr'] as const;

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
  /** HTML lang attribute value */
  htmlLang: string;
  /** Number formatting options */
  number: {
    /** Decimal separator */
    decimal: string;
    /** Thousands separator */
    thousands: string;
  };
  /** Calendar system */
  calendar?: 'gregory' | 'islamic';
  /** Font class for language-specific typography */
  fontClass?: string;
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
    htmlLang: 'en',
    calendar: 'gregory',
    number: {
      decimal: '.',
      thousands: ',',
    }
  },
  ar: {
    nativeName: 'العربية',
    englishName: 'Arabic',
    direction: 'rtl',
    dateFormat: 'DD/MM/YYYY',
    flag: '🇸🇦',
    htmlLang: 'ar',
    calendar: 'islamic',
    fontClass: 'font-arabic',
    number: {
      decimal: '٫',
      thousands: '٬',
    }
  },
  fr: {
    nativeName: 'Français',
    englishName: 'French',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    flag: '🇫🇷',
    htmlLang: 'fr',
    calendar: 'gregory',
    number: {
      decimal: ',',
      thousands: ' ',
    }
  },
  es: {
    nativeName: 'Español',
    englishName: 'Spanish',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    flag: '🇪🇸',
    htmlLang: 'es',
    calendar: 'gregory',
    number: {
      decimal: ',',
      thousands: '.',
    }
  },
};

/**
 * Get configuration for a specific locale
 */
export function getLocaleConfig(locale: Locale | string): LocaleConfig {
  return localeConfigs[locale as Locale] || localeConfigs[defaultLocale];
}

/**
 * Check if a locale is RTL
 */
export function isRTL(locale: Locale | string): boolean {
  return getLocaleConfig(locale).direction === 'rtl';
}

/**
 * Get font class for a locale
 */
export function getLocaleFont(locale: Locale | string): string | undefined {
  return getLocaleConfig(locale).fontClass;
}

/**
 * Get calendar system for a locale
 */
export function getCalendarSystem(locale: Locale | string): 'gregory' | 'islamic' {
  return getLocaleConfig(locale).calendar || 'gregory';
}

/**
 * Get HTML lang attribute value for a locale
 */
export function getHtmlLang(locale: Locale | string): string {
  return getLocaleConfig(locale).htmlLang;
}

/**
 * Get date format for a locale
 */
export function getDateFormat(locale: Locale | string): string {
  return getLocaleConfig(locale).dateFormat;
}