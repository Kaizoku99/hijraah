import { useLocale as useNextIntlLocale } from "next-intl";

import { Locale, defaultLocale, locales } from "@/i18n";

/**
 * Hook to get the current locale
 * @returns The current locale
 */
export function useLocale(): Locale {
  // Use next-intl's useLocale hook directly, without conditional logic
  const localeFromContext = useNextIntlLocale();

  // Validate that the locale is one of our supported locales
  return locales.includes(localeFromContext as Locale)
    ? (localeFromContext as Locale)
    : defaultLocale;
}
