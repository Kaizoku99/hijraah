#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { Command } from 'commander';

import { LanguineService } from '../src/lib/i18n/languine-service';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

// Initialize the program
const program = new Command();
program
  .name('languine')
  .description('Manage translations with Languine')
  .version('0.1.0');

// Initialize the Languine service
const languineService = new LanguineService();

// Extract command
program
  .command('extract')
  .description('Extract translatable strings from code')
  .option('-d, --dir <directory>', 'Directory to scan', 'src')
  .action(async (options) => {
    await languineService.init();
    console.log(`Extracting translations from ${options.dir}...`);
    const extracted = await languineService.extractTranslatables(options.dir);
    console.log(`Done! Found ${extracted} new translatable strings.`);
  });

// Sync command
program
  .command('sync')
  .description('Sync translations with Languine server')
  .option('-f, --force', 'Force sync even without API key', false)
  .action(async (options) => {
    await languineService.init();
    console.log('Syncing translations...');
    const success = await languineService.syncTranslations(options.force);
    if (success) {
      console.log('Sync completed successfully!');
    } else {
      console.error('Sync failed. Check logs for details.');
      process.exit(1);
    }
  });

// Translate missing command
program
  .command('translate-missing')
  .description('Translate missing keys using AI')
  .action(async () => {
    await languineService.init();
    console.log('Translating missing keys...');
    const translated = await languineService.translateMissingKeys();
    console.log(`Done! Translated ${translated} missing keys.`);
  });

// Deploy command
program
  .command('deploy')
  .description('Deploy translations to production')
  .action(async () => {
    await languineService.init();
    console.log('Deploying translations...');
    const success = await languineService.deployTranslations();
    if (success) {
      console.log('Deployment completed successfully!');
    } else {
      console.error('Deployment failed. Check logs for details.');
      process.exit(1);
    }
  });

// Stats command
program
  .command('stats')
  .description('Show translation statistics')
  .action(async () => {
    console.log('Calculating translation statistics...');
    
    try {
      // Get all locale files
      const localesDir = path.resolve(ROOT_DIR, 'src/locales');
      const files = await fs.readdir(localesDir);
      const localeFiles = files.filter(file => file.endsWith('.json'));
      
      // Load each locale file
      const stats: Record<string, any> = {};
      for (const file of localeFiles) {
        const locale = file.replace('.json', '');
        const filePath = path.resolve(localesDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const translations = JSON.parse(content);
        
        // Count keys (flattened)
        const keys = flattenKeys(translations);
        stats[locale] = {
          totalKeys: keys.length,
          size: content.length,
          lastModified: new Date((await fs.stat(filePath)).mtime).toISOString(),
        };
      }
      
      // Display stats
      console.log('\nTranslation Statistics:');
      console.log('-----------------------');
      for (const locale in stats) {
        console.log(`\n${locale.toUpperCase()}`);
        console.log(`  Total keys: ${stats[locale].totalKeys}`);
        console.log(`  File size: ${(stats[locale].size / 1024).toFixed(2)} KB`);
        console.log(`  Last modified: ${new Date(stats[locale].lastModified).toLocaleString()}`);
      }
      
      // Check completeness compared to the primary locale
      if (stats['en']) {
        console.log('\nCompleteness:');
        const primaryLocale = 'en';
        const primaryCount = stats[primaryLocale].totalKeys;
        
        for (const locale in stats) {
          if (locale === primaryLocale) continue;
          const percentage = (stats[locale].totalKeys / primaryCount * 100).toFixed(1);
          console.log(`  ${locale}: ${percentage}% (${stats[locale].totalKeys}/${primaryCount} keys)`);
        }
      }
      
    } catch (error) {
      console.error('Error calculating stats:', error);
      process.exit(1);
    }
  });

// Helper function to flatten nested keys
function flattenKeys(obj: Record<string, any>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = [...keys, ...flattenKeys(obj[key], newKey)];
    } else {
      keys.push(newKey);
    }
  }
  return keys;
}

// Run the program
program.parse(process.argv); 