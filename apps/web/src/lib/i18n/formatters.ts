import { type Locale } from "@/i18n";

/**
 * Format a date according to the locale's conventions
 */
export function formatDate(
  date: Date | string | number,
  locale: Locale,
  format: "short" | "long" | "time" = "short",
): string {
  const dateObj = new Date(date);

  const formatOptions = {
    short: {
      day: "2-digit" as const,
      month: "2-digit" as const,
      year: "numeric" as const,
    },
    long: {
      day: "numeric" as const,
      month: "long" as const,
      year: "numeric" as const,
    },
    time: {
      hour: "2-digit" as const,
      minute: "2-digit" as const,
      hour12: locale !== "fr", // Use 24-hour format for French
    },
  };

  return new Intl.DateTimeFormat(locale, formatOptions[format]).format(dateObj);
}

/**
 * Format a number according to the locale's conventions
 */
export function formatNumber(
  number: number,
  locale: Locale,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * Format currency according to the locale's conventions
 */
export function formatCurrency(
  amount: number,
  locale: Locale,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  }).format(amount);
}

/**
 * Format a percentage according to the locale's conventions
 */
export function formatPercent(
  number: number,
  locale: Locale,
  decimals: number = 0,
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
}

/**
 * Format a file size in bytes to a human-readable string
 */
export function formatFileSize(bytes: number, locale: Locale): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${formatNumber(bytes / Math.pow(k, i), locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })} ${sizes[i]}`;
}

/**
 * Format a relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale: Locale,
): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor(
    (targetDate.getTime() - now.getTime()) / 1000,
  );

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(Math.floor(diffInSeconds), "seconds");
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, "minutes");
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, "hours");
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (Math.abs(diffInDays) < 30) {
    return rtf.format(diffInDays, "days");
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (Math.abs(diffInMonths) < 12) {
    return rtf.format(diffInMonths, "months");
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return rtf.format(diffInYears, "years");
}

/**
 * Format a list of items according to the locale's conventions
 */
export function formatList(
  items: string[],
  locale: Locale,
  type: "conjunction" | "disjunction" = "conjunction",
): string {
  return new Intl.ListFormat(locale, { type, style: "long" }).format(items);
}

/**
 * Get the writing direction for a locale
 */
export function getDirection(locale: Locale): "ltr" | "rtl" {
  // Add more RTL locales as needed
  const rtlLocales = ["ar", "fa", "he", "ur"];
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

/**
 * Format a phone number according to the locale's conventions
 */
export function formatPhoneNumber(phoneNumber: string, locale: Locale): string {
  try {
    const cleaned = phoneNumber.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1,3})?(\d{3})(\d{3})(\d{4})$/);

    if (!match) return phoneNumber;

    const [, countryCode, areaCode, middle, last] = match;

    if (!countryCode) {
      return locale === "fr"
        ? `${areaCode} ${middle} ${last}`
        : `(${areaCode}) ${middle}-${last}`;
    }

    return locale === "fr"
      ? `+${countryCode} ${areaCode} ${middle} ${last}`
      : `+${countryCode} (${areaCode}) ${middle}-${last}`;
  } catch (err) {
    return phoneNumber;
  }
}
