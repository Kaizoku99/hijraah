import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { locales, defaultLocale, getLocaleConfig } from "@/i18n/i18n";

// Define error handler functions outside the config to avoid serialization issues
const handleError = (error: any) => {
  if (error.code === "MISSING_MESSAGE") {
    // Only log missing messages in development, not in production
    if (process.env.NODE_ENV === "development") {
      console.warn(`Translation warning: ${error.message}`);
    }
  } else {
    // Log other errors normally
    console.error("Translation error:", error);
  }
};

const getMessageFallback = ({
  namespace,
  key,
  error,
}: {
  namespace?: string;
  key: string;
  error: any;
}) => {
  // Return a reasonable fallback based on the key
  const fallback =
    key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");

  // Log the missing translation in development
  if (process.env.NODE_ENV === "development") {
    console.warn(
      `Missing translation: ${namespace ? `${namespace}.${key}` : key}`,
      error
    );
  }

  // Format namespace.key for clearer missing translation indicators
  if (namespace) {
    return `${fallback}`;
  }

  return fallback;
};

export default getRequestConfig(async () => {
  // Get headers asynchronously
  const headersList = await headers();
  const currentPath = headersList.get("x-current-path") || "";

  // Extract locale from path
  const pathSegments = currentPath.split("/").filter(Boolean);
  const localeFromPath = pathSegments[0];

  // Validate that the incoming locale is supported
  const resolvedLocale = locales.includes(localeFromPath as any)
    ? localeFromPath
    : defaultLocale;

  let messages;
  try {
    switch (resolvedLocale) {
      case "en":
        messages = (await import(`@/i18n/locales/en.json`)).default;
        break;
      case "ar":
        messages = (await import(`@/i18n/locales/ar.json`)).default;
        break;
      case "es":
        messages = (await import(`@/i18n/locales/es.json`)).default;
        break;
      case "fr":
        messages = (await import(`@/i18n/locales/fr.json`)).default;
        break;
      default:
        // Fallback to defaultLocale messages if resolvedLocale is somehow unexpected
        // (should ideally be caught by locales.includes check earlier)
        console.warn(
          `Unexpected resolvedLocale: ${resolvedLocale}, loading default ${defaultLocale} messages.`
        );
        messages = (await import(`@/i18n/locales/${defaultLocale}.json`))
          .default;
    }
  } catch (error) {
    console.error(
      `Failed to load translations for ${resolvedLocale}, falling back to default. Error:`,
      error
    );
    // Fallback to default locale messages on any error
    try {
      messages = (await import(`@/i18n/locales/${defaultLocale}.json`)).default;
    } catch (fallbackError) {
      console.error(
        `Failed to load default locale messages for ${defaultLocale}:`,
        fallbackError
      );
      messages = {
        common: { loading: "Loading...", error: "An error occurred" },
      }; // Absolute fallback
    }
  }

  // Get locale configuration
  const localeConfig = getLocaleConfig(resolvedLocale);

  return {
    locale: resolvedLocale,
    messages,
    timeZone: "UTC",
    now: new Date(),
    // Note: These functions are handled client-side for client components
    // Server-side components will use these configurations
    onError: handleError,
    getMessageFallback,
    formats: {
      dateTime: {
        short: {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        },
        medium: {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
        long: {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
        full: {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        },
        time: {
          hour: "2-digit",
          minute: "2-digit",
          hour12: localeConfig.htmlLang === "en",
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        },
        compact: {
          notation: "compact",
        },
        percent: {
          style: "percent",
          maximumFractionDigits: 2,
        },
        currency: {
          style: "currency",
          currency: "USD",
        },
      },
      list: {
        enumeration: {
          style: "long",
          type: "conjunction",
        },
        or: {
          style: "long",
          type: "disjunction",
        },
      },
      relative: {
        days: {
          style: "long",
        },
        quarters: {
          style: "long",
        },
        months: {
          style: "long",
        },
        years: {
          style: "long",
        },
      },
    },
  };
});
