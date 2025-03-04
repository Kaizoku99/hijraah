export const locales = ['en', 'ar', 'es', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'en' as const;

export const localeNames = {
  en: 'English',
  ar: 'العربية',
  es: 'Español',
  fr: 'Français',
} as const;

export const localeConfigs = {
  en: {
    direction: 'ltr',
    htmlLang: 'en',
    dateFormat: 'MM/DD/YYYY',
  },
  ar: {
    direction: 'rtl',
    htmlLang: 'ar',
    dateFormat: 'DD/MM/YYYY',
  },
  es: {
    direction: 'ltr',
    htmlLang: 'es',
    dateFormat: 'DD/MM/YYYY',
  },
  fr: {
    direction: 'ltr',
    htmlLang: 'fr',
    dateFormat: 'DD/MM/YYYY',
  },
} as const;
