import { getRequestConfig } from "next-intl/server";

import { locales, defaultLocale } from "./apps/web/src/i18n";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  // Attempt to load from merged translations directory first,
  // then fall back to messages directory
  let messages;
  try {
    messages = (await import(`./translations/${locale}.json`)).default;
  } catch (error) {
    // Fall back to messages directory
    try {
      messages = (await import(`./messages/${locale}.json`)).default;
    } catch (fallbackError) {
      console.error(`Failed to load translations for ${locale}`, fallbackError);
      // Last resort, try to load default locale
      if (locale !== defaultLocale) {
        try {
          messages = (await import(`./messages/${defaultLocale}.json`)).default;
        } catch (e) {
          console.error(`Failed to load default locale translations`, e);
          messages = {};
        }
      } else {
        messages = {};
      }
    }
  }

  return {
    messages,
    timeZone: "UTC",
    now: new Date(),
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
          hour12: false,
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
