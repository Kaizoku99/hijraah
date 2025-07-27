import fs from 'fs';
import path from 'path';

import { locales, defaultLocale, Locale } from '@/i18n';

interface ValidationResult {
  missingKeys: string[];
  extraKeys: string[];
  locale: Locale;
  isValid: boolean;
}

export class TranslationValidator {
  private translationsPath: string;
  private defaultTranslations: Record<string, any> = {};
  private localeTranslations: Record<Locale, Record<string, any>> = {} as Record<Locale, Record<string, any>>;

  constructor(translationsPath = path.join(process.cwd(), 'src/messages')) {
    this.translationsPath = translationsPath;
  }

  /**
   * Initialize the validator by loading all translations
   */
  async init(): Promise<void> {
    try {
      // Load default translations
      this.defaultTranslations = await this.loadTranslations(defaultLocale);

      // Load all locale translations
      for (const locale of locales) {
        if (locale !== defaultLocale) {
          this.localeTranslations[locale] = await this.loadTranslations(locale);
        }
      }
    } catch (error) {
      console.error('Failed to initialize translation validator:', error);
    }
  }

  /**
   * Load translations for a specific locale
   */
  private async loadTranslations(locale: string): Promise<Record<string, any>> {
    try {
      const filePath = path.join(this.translationsPath, `${locale}.json`);
      const fileContent = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
      return {};
    }
  }

  /**
   * Flatten a nested object into key-value pairs with dot notation
   * Example: { a: { b: 'c' } } -> { 'a.b': 'c' }
   */
  private flattenObject(obj: Record<string, any>, prefix = ''): Record<string, string> {
    return Object.keys(obj).reduce((acc: Record<string, string>, key) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, this.flattenObject(obj[key], prefixedKey));
      } else {
        acc[prefixedKey] = obj[key];
      }
      
      return acc;
    }, {});
  }

  /**
   * Validate translations for a specific locale against the default locale
   */
  validateLocale(locale: Locale): ValidationResult {
    if (locale === defaultLocale) {
      return {
        missingKeys: [],
        extraKeys: [],
        locale,
        isValid: true
      };
    }

    const flattenedDefault = this.flattenObject(this.defaultTranslations);
    const flattenedLocale = this.flattenObject(this.localeTranslations[locale] || {});

    const defaultKeys = Object.keys(flattenedDefault);
    const localeKeys = Object.keys(flattenedLocale);

    // Find keys in default but missing in locale
    const missingKeys = defaultKeys.filter(key => !localeKeys.includes(key));
    
    // Find extra keys in locale not in default
    const extraKeys = localeKeys.filter(key => !defaultKeys.includes(key));

    return {
      missingKeys,
      extraKeys,
      locale,
      isValid: missingKeys.length === 0 && extraKeys.length === 0
    };
  }

  /**
   * Validate all locales against the default locale
   */
  validateAll(): Record<Locale, ValidationResult> {
    const results: Record<Locale, ValidationResult> = {} as Record<Locale, ValidationResult>;
    
    for (const locale of locales) {
      results[locale] = this.validateLocale(locale);
    }
    
    return results;
  }

  /**
   * Generate a report of translation status
   */
  generateReport(): string {
    const results = this.validateAll();
    let report = 'Translation Validation Report\n';
    report += '==============================\n\n';
    
    let isValid = true;
    
    for (const locale of locales) {
      if (locale === defaultLocale) continue;
      
      const result = results[locale];
      report += `Locale: ${locale}\n`;
      report += `- Missing keys: ${result.missingKeys.length}\n`;
      report += `- Extra keys: ${result.extraKeys.length}\n`;
      report += `- Valid: ${result.isValid}\n\n`;
      
      if (result.missingKeys.length > 0) {
        report += 'Missing keys:\n';
        result.missingKeys.forEach(key => {
          report += `  - ${key}\n`;
        });
        report += '\n';
      }
      
      if (result.extraKeys.length > 0) {
        report += 'Extra keys:\n';
        result.extraKeys.forEach(key => {
          report += `  - ${key}\n`;
        });
        report += '\n';
      }
      
      isValid = isValid && result.isValid;
    }
    
    report += `Overall status: ${isValid ? 'VALID' : 'INVALID'}\n`;
    
    return report;
  }

  /**
   * Find missing translations with their default values
   */
  getMissingTranslations(locale: Locale): Record<string, string> {
    if (locale === defaultLocale) {
      return {};
    }

    const flattenedDefault = this.flattenObject(this.defaultTranslations);
    const flattenedLocale = this.flattenObject(this.localeTranslations[locale] || {});
    const defaultKeys = Object.keys(flattenedDefault);
    
    return defaultKeys.reduce((acc: Record<string, string>, key) => {
      if (!Object.keys(flattenedLocale).includes(key)) {
        acc[key] = flattenedDefault[key];
      }
      return acc;
    }, {});
  }

  /**
   * Export missing translations for a specific locale to a JSON file
   */
  async exportMissingTranslations(locale: Locale, outputPath?: string): Promise<string> {
    const missingTranslations = this.getMissingTranslations(locale);
    
    if (Object.keys(missingTranslations).length === 0) {
      return `No missing translations found for ${locale}`;
    }
    
    const exportPath = outputPath || path.join(this.translationsPath, `${locale}_missing.json`);
    
    // Convert flat object back to nested structure
    const nestedTranslations = Object.entries(missingTranslations).reduce((acc: Record<string, any>, [key, value]) => {
      const parts = key.split('.');
      let current = acc;
      
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
      
      current[parts[parts.length - 1]] = value;
      
      return acc;
    }, {});
    
    // Write to file
    await fs.promises.writeFile(
      exportPath,
      JSON.stringify(nestedTranslations, null, 2),
      'utf-8'
    );
    
    return `Missing translations exported to ${exportPath}`;
  }
} 