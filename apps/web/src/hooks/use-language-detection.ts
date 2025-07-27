"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { locales, defaultLocale, Locale, localeConfigs } from "@/i18n";

export type DetectionSource =
  | "url"
  | "cookie"
  | "localStorage"
  | "navigator"
  | "htmlLang";

export interface LanguageDetectionOptions {
  /**
   * Order of detection sources
   * @default ['url', 'cookie', 'localStorage', 'navigator', 'htmlLang']
   */
  order?: DetectionSource[];
  /**
   * Cookie name to look for language
   * @default 'NEXT_LOCALE'
   */
  cookieName?: string;
  /**
   * LocalStorage key to look for language
   * @default 'NEXT_LOCALE'
   */
  localStorageKey?: string;
  /**
   * Whether to redirect to localized URL
   * @default true
   */
  redirect?: boolean;
  /**
   * Fallback language
   * @default 'en'
   */
  fallbackLanguage?: Locale;
  /**
   * Debug mode
   * @default false
   */
  debug?: boolean;
}

const DEFAULT_OPTIONS: Required<LanguageDetectionOptions> = {
  order: ["url", "cookie", "localStorage", "navigator", "htmlLang"],
  cookieName: "NEXT_LOCALE",
  localStorageKey: "NEXT_LOCALE",
  redirect: true,
  fallbackLanguage: defaultLocale,
  debug: false,
};

/**
 * Hook for detecting and managing the current language in client components
 */
export function useLanguageDetection(options: LanguageDetectionOptions = {}) {
  const mergedOptions: Required<LanguageDetectionOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set up language detection on mount
  useEffect(() => {
    const detectedLocale = detectLanguage(mergedOptions);
    setCurrentLocale(detectedLocale);
    setIsLoaded(true);

    // Handle redirection to localized URL
    if (mergedOptions.redirect) {
      const currentPath = window.location.pathname;
      const hasLocalePrefix = locales.some(
        (locale) =>
          currentPath === `/${locale}` || currentPath.startsWith(`/${locale}/`),
      );

      // If URL doesn't have locale prefix and detected locale is different from default,
      // redirect to localized URL
      if (!hasLocalePrefix && detectedLocale !== defaultLocale) {
        const newPath = `/${detectedLocale}${currentPath}`;
        router.replace(newPath);
        if (mergedOptions.debug) {
          console.log(`[useLanguageDetection] Redirecting to: ${newPath}`);
        }
      }
    }
  }, [mergedOptions, router]);

  // Function to change the current language
  const changeLanguage = (newLocale: Locale) => {
    if (!locales.includes(newLocale)) {
      console.error(`Invalid locale: ${newLocale}`);
      return;
    }

    // Save the language preference
    try {
      // Save to localStorage
      localStorage.setItem(mergedOptions.localStorageKey, newLocale);

      // Save to cookie
      document.cookie = `${mergedOptions.cookieName}=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;

      // Update HTML dir attribute for RTL support
      document.documentElement.dir = localeConfigs[newLocale].direction;

      // Update HTML lang attribute
      document.documentElement.lang = newLocale;
    } catch (error) {
      console.error("Error saving language preference:", error);
    }

    // Redirect to localized URL
    if (pathname) {
      // Remove current locale prefix if present
      let newPath = pathname;
      for (const locale of locales) {
        if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
          newPath = pathname.substring(locale.length + 1) || "/";
          break;
        }
      }

      // Add new locale prefix (unless it's the default locale and as-needed is configured)
      const redirectPath =
        newLocale === defaultLocale
          ? newPath
          : `/${newLocale}${newPath.startsWith("/") ? newPath : `/${newPath}`}`;

      // Navigate to new path
      router.push(redirectPath);
    }

    setCurrentLocale(newLocale);
  };

  return {
    currentLocale,
    isRTL: localeConfigs[currentLocale].direction === "rtl",
    changeLanguage,
    isLoaded,
  };
}

/**
 * Detect the user's language from various sources
 */
function detectLanguage(options: Required<LanguageDetectionOptions>): Locale {
  let detectedLocale: Locale | null = null;

  // Check each source in the specified order
  for (const source of options.order) {
    if (options.debug) {
      console.log(`[useLanguageDetection] Checking source: ${source}`);
    }

    switch (source) {
      case "url": {
        // Check URL path for locale
        const path = window.location.pathname;
        const match = path.match(/^\/([\w-]+)/);
        if (match) {
          const segment = match[1];
          if (locales.includes(segment as Locale)) {
            detectedLocale = segment as Locale;
            if (options.debug) {
              console.log(
                `[useLanguageDetection] Detected from URL: ${detectedLocale}`,
              );
            }
          }
        }
        break;
      }

      case "cookie": {
        // Check cookies for language preference
        const cookies = document.cookie.split(";").reduce(
          (acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
          },
          {} as Record<string, string>,
        );

        const cookieValue = cookies[options.cookieName];
        if (cookieValue && locales.includes(cookieValue as Locale)) {
          detectedLocale = cookieValue as Locale;
          if (options.debug) {
            console.log(
              `[useLanguageDetection] Detected from cookie: ${detectedLocale}`,
            );
          }
        }
        break;
      }

      case "localStorage": {
        // Check localStorage for language preference
        try {
          const storedLocale = localStorage.getItem(options.localStorageKey);
          if (storedLocale && locales.includes(storedLocale as Locale)) {
            detectedLocale = storedLocale as Locale;
            if (options.debug) {
              console.log(
                `[useLanguageDetection] Detected from localStorage: ${detectedLocale}`,
              );
            }
          }
        } catch (error) {
          // Ignore localStorage errors (e.g., in incognito mode)
          console.error("Error accessing localStorage:", error);
        }
        break;
      }

      case "navigator": {
        // Check browser language preferences
        if (typeof navigator !== "undefined") {
          // Get the user's preferred languages
          const browserLanguages =
            navigator.languages || [navigator.language] || [
              (navigator as any).userLanguage,
            ] ||
            [];

          // Find the first supported language
          for (const browserLang of browserLanguages) {
            const normalizedLang = browserLang.toLowerCase().split("-")[0];

            // Exact match
            if (locales.includes(browserLang as Locale)) {
              detectedLocale = browserLang as Locale;
              break;
            }

            // Language match without region (e.g., 'en-US' matches 'en')
            const match = locales.find((locale) =>
              locale.toLowerCase().startsWith(normalizedLang),
            );

            if (match) {
              detectedLocale = match;
              break;
            }
          }

          if (detectedLocale && options.debug) {
            console.log(
              `[useLanguageDetection] Detected from navigator: ${detectedLocale}`,
            );
          }
        }
        break;
      }

      case "htmlLang": {
        // Check HTML lang attribute
        const htmlLang = document.documentElement.lang;
        if (htmlLang && locales.includes(htmlLang as Locale)) {
          detectedLocale = htmlLang as Locale;
          if (options.debug) {
            console.log(
              `[useLanguageDetection] Detected from HTML lang: ${detectedLocale}`,
            );
          }
        }
        break;
      }
    }

    // Stop checking if we found a locale
    if (detectedLocale) break;
  }

  // Use fallback if no locale detected
  if (!detectedLocale) {
    detectedLocale = options.fallbackLanguage;
    if (options.debug) {
      console.log(`[useLanguageDetection] Using fallback: ${detectedLocale}`);
    }
  }

  return detectedLocale;
}
