import fs from 'fs/promises';
import path from 'path';

import { Locale, defaultLocale } from '@/i18n';

import { LanguineService } from './languine-service';

// Type for translation memory cache
interface TranslationMemory {
  [key: string]: {
    [locale: string]: {
      translation: string;
      lastUsed: number;
    };
  };
}

/**
 * TranslateService - Handles translations for API routes and server components
 */
export class TranslateService {
  private locale: Locale;
  private translations: Record<string, any> = {};
  private languineService: LanguineService | null = null;
  private translationMemory: TranslationMemory = {};
  private memoryEnabled = true;
  private initialized = false;
  private missingKeys: Set<string> = new Set();

  constructor(locale: Locale = defaultLocale, useLanguine: boolean = true) {
    this.locale = locale;
    
    // Initialize Languine service if enabled
    if (useLanguine) {
      this.languineService = new LanguineService({
        sourceLocale: defaultLocale,
        targetLocales: ['ar', 'fr', 'es'] as Locale[],
        syncMode: process.env.NODE_ENV === 'development' ? 'manual' : 'auto',
      });
    }
  }

  /**
   * Initialize the translation service
   */
  async init(): Promise<void> {
    // Load translations for the current locale
    await this.loadTranslations();
    
    // Initialize Languine service if available
    if (this.languineService) {
      await this.languineService.init();
      
      // In development mode, sync translations and extract from code
      if (process.env.NODE_ENV === 'development') {
        // These are async but we don't need to wait
        this.languineService.syncTranslations(false).catch(console.error);
        this.languineService.extractTranslatables().catch(console.error);
      }
    }
    
    // Try to load translation memory if enabled
    if (this.memoryEnabled) {
      await this.loadTranslationMemory();
    }
    
    this.initialized = true;
  }

  /**
   * Load translations for the current locale
   */
  private async loadTranslations(): Promise<void> {
    try {
      // Get the file path for the current locale
      const filePath = path.resolve(process.cwd(), `src/locales/${this.locale}.json`);
      
      // Read the file
      const data = await fs.readFile(filePath, 'utf8');
      
      // Parse the JSON
      this.translations = JSON.parse(data);
    } catch (error) {
      console.error(`Failed to load translations for ${this.locale}:`, error);
      
      // If we failed to load translations for the current locale,
      // try to load the default locale as a fallback
      if (this.locale !== defaultLocale) {
        try {
          const fallbackPath = path.resolve(process.cwd(), `src/locales/${defaultLocale}.json`);
          const fallbackData = await fs.readFile(fallbackPath, 'utf8');
          this.translations = JSON.parse(fallbackData);
        } catch (fallbackError) {
          console.error(`Failed to load fallback translations:`, fallbackError);
          // Initialize with empty translations
          this.translations = {};
        }
      } else {
        // Initialize with empty translations
        this.translations = {};
      }
    }
  }

  /**
   * Load translation memory from disk
   */
  private async loadTranslationMemory(): Promise<void> {
    try {
      const memoryPath = path.resolve(process.cwd(), '.translation-memory.json');
      const data = await fs.readFile(memoryPath, 'utf8');
      this.translationMemory = JSON.parse(data);
      
      // Clean up old memory entries (older than 30 days)
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      for (const key in this.translationMemory) {
        for (const locale in this.translationMemory[key]) {
          if (this.translationMemory[key][locale].lastUsed < thirtyDaysAgo) {
            delete this.translationMemory[key][locale];
          }
        }
        
        // Remove the key if it has no locales
        if (Object.keys(this.translationMemory[key]).length === 0) {
          delete this.translationMemory[key];
        }
      }
    } catch (error) {
      // It's okay if the file doesn't exist yet
      this.translationMemory = {};
    }
  }

  /**
   * Save translation memory to disk
   */
  private async saveTranslationMemory(): Promise<void> {
    if (!this.memoryEnabled) return;
    
    try {
      const memoryPath = path.resolve(process.cwd(), '.translation-memory.json');
      await fs.writeFile(memoryPath, JSON.stringify(this.translationMemory, null, 2));
    } catch (error) {
      console.error('Failed to save translation memory:', error);
    }
  }

  /**
   * Update translation memory with a new translation
   */
  private updateMemory(key: string, translation: string): void {
    if (!this.memoryEnabled) return;
    
    if (!this.translationMemory[key]) {
      this.translationMemory[key] = {};
    }
    
    this.translationMemory[key][this.locale] = {
      translation,
      lastUsed: Date.now(),
    };
    
    // Save memory every 100 updates
    if (Math.random() < 0.01) {
      this.saveTranslationMemory().catch(console.error);
    }
  }

  /**
   * Translate a key into the current locale
   * @param key The key to translate (dot notation supported)
   * @param variables Variables to interpolate into the translation
   * @returns The translated string or the key if not found
   */
  translate(key: string, variables: Record<string, any> = {}): string {
    if (!this.initialized) {
      console.warn('TranslateService not initialized, returning key');
      return key;
    }
    
    // First check translation memory
    if (this.memoryEnabled && 
        this.translationMemory[key]?.[this.locale]) {
      const memoryEntry = this.translationMemory[key][this.locale];
      memoryEntry.lastUsed = Date.now();
      return this.interpolateVariables(memoryEntry.translation, variables);
    }
    
    // Split the key by dots to access nested properties
    const parts = key.split('.');
    let value: any = this.translations;
    
    // Navigate through the nested structure
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        // Track missing keys for potential AI translation later
        if (this.languineService) {
          this.missingKeys.add(key);
          
          // Trigger AI translation of missing keys periodically
          if (this.missingKeys.size >= 10 && Math.random() < 0.5) {
            this.languineService.translateMissingKeys().catch(console.error);
            this.missingKeys.clear();
          }
        }
        
        // Key not found, return the key itself
        return key;
      }
    }
    
    // If the value is not a string, return the key
    if (typeof value !== 'string') {
      return key;
    }
    
    // Update translation memory
    this.updateMemory(key, value);
    
    // Process variables and return
    return this.interpolateVariables(value, variables);
  }

  /**
   * Interpolate variables into a translation string
   */
  private interpolateVariables(text: string, variables: Record<string, any>): string {
    return Object.entries(variables).reduce(
      (result, [key, value]) => result.replace(
        new RegExp(`{{\\s*${key}\\s*}}`, 'g'), 
        String(value)
      ),
      text
    );
  }

  /**
   * Format a date according to the current locale
   */
  formatDate(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
    return new Intl.DateTimeFormat(this.locale, options).format(date);
  }

  /**
   * Format a number according to the current locale
   */
  formatNumber(number: number, options: Intl.NumberFormatOptions = {}): string {
    return new Intl.NumberFormat(this.locale, options).format(number);
  }

  /**
   * Format currency according to the current locale
   */
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Format a relative time (e.g., "2 days ago")
   */
  formatRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit): string {
    return new Intl.RelativeTimeFormat(this.locale, {
      numeric: 'auto',
      style: 'long',
    }).format(value, unit);
  }

  /**
   * Get the current locale
   */
  getLocale(): Locale {
    return this.locale;
  }

  /**
   * Get all loaded translation messages
   */
  getMessages(): Record<string, any> {
    if (!this.initialized) {
      console.warn('TranslateService not initialized, returning empty messages');
      return {};
    }
    return this.translations;
  }

  /**
   * Set the current locale and reload translations
   */
  async setLocale(locale: Locale): Promise<void> {
    this.locale = locale;
    await this.loadTranslations();
  }

  /**
   * Get text direction for the current locale (RTL or LTR)
   */
  getDirection(): 'rtl' | 'ltr' {
    return ['ar', 'he', 'fa', 'ur'].includes(this.locale) ? 'rtl' : 'ltr';
  }
}

// Create a singleton instance for easy import
let translateServiceInstance: TranslateService | null = null;

/**
 * Get the singleton translate service instance
 */
export function getTranslateService(locale?: Locale): TranslateService {
  if (!translateServiceInstance) {
    translateServiceInstance = new TranslateService(locale);
  } else if (locale && locale !== translateServiceInstance.getLocale()) {
    // If locale changes, update the instance
    translateServiceInstance.setLocale(locale);
  }
  
  return translateServiceInstance;
} 