"use client";

import {
  useFormatter,
  useLocale,
  useNow,
  useTimeZone,
  useTranslations,
} from "next-intl";

import { getLocaleConfig, Locale } from "@/i18n/i18n";

/**
 * Extended hook for i18n utilities combining multiple next-intl hooks
 * @returns Various i18n utilities for use in client components
 */
export function useI18n() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const format = useFormatter();
  const timeZone = useTimeZone();
  const now = useNow();

  // Get locale configuration
  const config = getLocaleConfig(locale);

  // Direction utility
  const direction = config.direction;
  const isRtl = direction === "rtl";

  // Date formatting helper using locale preferences
  const formatDate = (date: Date | number, options?: any) => {
    return format.dateTime(date, options);
  };

  // Relative time formatting
  const formatRelativeTime = (date: Date | number) => {
    return format.relativeTime(date);
  };

  // Currency formatting with locale preferences
  const formatCurrency = (value: number, currency = "USD") => {
    return format.number(value, {
      style: "currency",
      currency,
    } as any);
  };

  // Number formatting according to locale
  const formatNumber = (value: number, options?: any) => {
    return format.number(value, options);
  };

  return {
    // Original hooks
    t,
    format,
    locale,
    timeZone,
    now,

    // Derived utilities
    config,
    direction,
    isRtl,

    // Helper functions
    formatDate,
    formatRelativeTime,
    formatCurrency,
    formatNumber,
  };
}

/**
 * Hook to access translations for a specific namespace
 * @param namespace The translation namespace
 * @returns Translation function for the specified namespace
 */
export function useTranslate(namespace: string) {
  return useTranslations(namespace);
}

/**
 * Hook to access global translations (no namespace)
 * @returns Translation function for the global namespace
 */
export function useGlobalTranslate() {
  return useTranslations();
}
