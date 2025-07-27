import { useTranslations as useNextIntlTranslations , useFormatter } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { useLocale } from './use-locale';

import type { DateTimeFormatOptions, NumberFormatOptions } from 'next-intl';

interface TranslationHookResult {
  /**
   * Translate a key with optional variable substitution
   */
  translate: (key: string, variables?: Record<string, any>) => string;
  /**
   * Alias for translate function
   */
  t: (key: string, variables?: Record<string, any>) => string;
  /**
   * Format a date according to the current locale
   */
  formatDate: (date: Date | number | string, options?: DateTimeFormatOptions) => string;
  /**
   * Format a date as a relative time (e.g., "2 days ago")
   */
  formatRelativeTime: (date: Date | number | string) => string;
  /**
   * Format a number according to the current locale
   */
  formatNumber: (value: number, options?: NumberFormatOptions) => string;
  /**
   * Format a currency amount
   */
  formatCurrency: (value: number, currency?: string, options?: Omit<NumberFormatOptions, 'style' | 'currency'>) => string;
  /**
   * Format a percentage
   */
  formatPercent: (value: number, options?: Omit<NumberFormatOptions, 'style'>) => string;
  /**
   * Format a list of items
   */
  formatList: (items: string[], options?: { type?: 'conjunction' | 'disjunction' }) => string;
  /**
   * Current locale
   */
  locale: string;
}

/**
 * Enhanced useTranslations hook with type safety and better error handling
 * @param namespace - The translation namespace to use
 * @returns Object with translation and formatting utilities
 */
export function useTranslations(namespace?: string): TranslationHookResult {
  // Get the base translation function from next-intl
  const baseTranslate = useNextIntlTranslations(namespace);
  const formatter = useFormatter();
  const locale = useLocale();

  // Create a wrapped translation function with better error handling
  const translate = useCallback((key: string, variables?: Record<string, any>): string => {
    try {
      return baseTranslate(key, variables);
    } catch (error) {
      console.warn(`Translation missing: ${namespace ? `${namespace}.` : ''}${key}`);
      // Return key as fallback
      return key.split('.').pop() || key;
    }
  }, [baseTranslate, namespace]);

  // Format a date according to the current locale
  const formatDate = useCallback((date: Date | number | string, options?: DateTimeFormatOptions): string => {
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

  // Format a date as a relative time
  const formatRelativeTime = useCallback((date: Date | number | string): string => {
    try {
      const dateObj = typeof date === 'string' || typeof date === 'number' 
        ? new Date(date) 
        : date;
        
      return formatter.relativeTime(dateObj);
    } catch (error) {
      console.error('Error formatting relative time:', error);
      return String(date);
    }
  }, [formatter]);

  // Format a number according to the current locale
  const formatNumber = useCallback((value: number, options?: NumberFormatOptions): string => {
    try {
      return formatter.number(value, options);
    } catch (error) {
      console.error('Error formatting number:', error);
      return String(value);
    }
  }, [formatter]);

  // Format a currency amount
  const formatCurrency = useCallback((
    value: number, 
    currency: string = 'USD', 
    options?: Omit<NumberFormatOptions, 'style' | 'currency'>
  ): string => {
    try {
      return formatter.number(value, {
        style: 'currency',
        currency,
        ...options
      });
    } catch (error) {
      console.error('Error formatting currency:', error);
      return String(value);
    }
  }, [formatter]);

  // Format a percentage
  const formatPercent = useCallback((
    value: number,
    options?: Omit<NumberFormatOptions, 'style'>
  ): string => {
    try {
      return formatter.number(value, {
        style: 'percent',
        ...options
      });
    } catch (error) {
      console.error('Error formatting percentage:', error);
      return `${value * 100}%`;
    }
  }, [formatter]);

  // Format a list of items
  const formatList = useCallback((
    items: string[], 
    options?: { type?: 'conjunction' | 'disjunction' }
  ): string => {
    try {
      return formatter.list(items, {
        type: options?.type || 'conjunction',
        style: 'long'
      });
    } catch (error) {
      console.error('Error formatting list:', error);
      return items.join(', ');
    }
  }, [formatter]);

  return useMemo(() => ({
    translate,
    t: translate,
    formatDate,
    formatRelativeTime,
    formatNumber,
    formatCurrency,
    formatPercent,
    formatList,
    locale
  }), [
    translate, 
    formatDate, 
    formatRelativeTime, 
    formatNumber, 
    formatCurrency, 
    formatPercent, 
    formatList,
    locale
  ]);
}

export default useTranslations; 