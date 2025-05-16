import { useTranslations as useNextIntlTranslations } from 'next-intl';
import { useFormatter } from 'next-intl';
import { useCallback } from 'react';
import type { DateTimeFormatOptions, NumberFormatOptions } from 'next-intl';

/**
 * Enhanced useTranslations hook with type safety and better error handling
 * @param namespace - The translation namespace to use
 * @returns Object with translation and formatting utilities
 */
export function useTranslations(namespace?: string) {
  // Get the base translation function from next-intl
  const baseTranslate = useNextIntlTranslations(namespace);
  const formatter = useFormatter();

  // Create a wrapped translation function with better error handling
  const translate = useCallback((key: string, variables?: Record<string, any>) => {
    try {
      return baseTranslate(key, variables);
    } catch (error) {
      console.warn(`Translation missing: ${namespace ? `${namespace}.` : ''}${key}`);
      // Return key as fallback
      return key.split('.').pop() || key;
    }
  }, [baseTranslate, namespace]);

  // Format a date according to the current locale
  const formatDate = useCallback((date: Date | number | string, options?: DateTimeFormatOptions) => {
    try {
      const dateObj = typeof date === 'string' || typeof date === 'number' 
        ? new Date(date) 
        : date;
      
      return formatter.dateTime(dateObj, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return String(date);
    }
  }, [formatter]);

  // Format a number according to the current locale
  const formatNumber = useCallback((value: number, options?: NumberFormatOptions) => {
    try {
      return formatter.number(value, options);
    } catch (error) {
      console.error('Error formatting number:', error);
      return String(value);
    }
  }, [formatter]);

  // Format a relative time
  const formatRelativeTime = useCallback((value: number, unit: string) => {
    try {
      return formatter.relativeTime(value, unit);
    } catch (error) {
      console.error('Error formatting relative time:', error);
      return `${value} ${unit}`;
    }
  }, [formatter]);

  // Format a list of items
  const formatList = useCallback((items: string[], options?: object) => {
    try {
      return formatter.list(items, options);
    } catch (error) {
      console.error('Error formatting list:', error);
      return items.join(', ');
    }
  }, [formatter]);

  return {
    t: translate,
    translate,
    formatDate,
    formatNumber,
    formatRelativeTime,
    formatList,
    formatter
  };
}

export default useTranslations; 