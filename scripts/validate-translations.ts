#!/usr/bin/env ts-node

/**
 * Translation validation script
 * 
 * Usage:
 * - To validate all translations:
 *   npm run validate-translations
 * 
 * - To export missing translations for a specific locale:
 *   npm run validate-translations -- --export ar
 */

import fs from 'fs';
import path from 'path';

import { Locale, locales, defaultLocale } from '../i18n';
import { TranslationValidator } from '../lib/i18n/translation-validator';

// Parse command line arguments
const args = process.argv.slice(2);
const shouldExport = args.includes('--export');
const localeArg = args[args.indexOf('--export') + 1];
const targetLocale = localeArg as Locale;

async function main() {
  try {
    console.log('Initializing translation validator...');
    const validator = new TranslationValidator();
    await validator.init();

    // Generate and display the validation report
    const report = validator.generateReport();
    console.log(report);

    // Export missing translations if requested
    if (shouldExport) {
      if (!locales.includes(targetLocale) || targetLocale === defaultLocale) {
        console.error(`Invalid locale: ${targetLocale}`);
        console.error(`Available locales: ${locales.filter(l => l !== defaultLocale).join(', ')}`);
        process.exit(1);
      }

      console.log(`Exporting missing translations for ${targetLocale}...`);
      const outputDir = path.join(process.cwd(), 'src/scripts/output');
      
      // Create output directory if it doesn't exist
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, `${targetLocale}_missing.json`);
      const result = await validator.exportMissingTranslations(targetLocale, outputPath);
      console.log(result);
    }

    // Exit with error code if validation failed
    const results = validator.validateAll();
    const isValid = Object.values(results).every(r => r.isValid);
    
    if (!isValid) {
      console.error('\nValidation failed. Some translations are missing or have extra keys.');
      process.exit(1);
    }
    
    console.log('\nValidation passed. All translations are in sync.');
  } catch (error) {
    console.error('Error validating translations:', error);
    process.exit(1);
  }
}

main(); 