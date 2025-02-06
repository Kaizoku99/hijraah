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
  },
  ar: {
    direction: 'rtl',
  },
  es: {
    direction: 'ltr',
  },
  fr: {
    direction: 'ltr',
  },
} as const;