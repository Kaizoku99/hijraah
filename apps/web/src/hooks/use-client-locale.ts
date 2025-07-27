"use client";

import { usePathname } from "next/navigation";

import { locales, defaultLocale, Locale } from "@/i18n/i18n";

/**
 * Client-safe hook to get the current locale based on the URL pathname.
 * It avoids server-only APIs like `next/headers`.
 * @returns The detected locale or the default locale.
 */
export function useClientLocale(): Locale {
  const pathname = usePathname();

  // Extract locale from URL path, checking for exact match or path prefix
  const pathnameLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Return the detected locale, or the default locale if none is found in the path
  return pathnameLocale || defaultLocale;
}
