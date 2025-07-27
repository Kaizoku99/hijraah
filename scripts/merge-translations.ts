/**
 * Translations Consolidation Script
 * 
 * This script:
 * 1. Merges multiple translation files from /messages and /locales
 * 2. Ensures consistent structure across all languages
 * 3. Identifies missing translations compared to the reference locale (en)
 * 4. Outputs merged files to a central location
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { locales, defaultLocale } from '../i18n';

// Determine the project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

// Source and destination paths
const sourceDirectories = [
  path.join(rootDir, 'src/messages'),
  path.join(rootDir, 'src/locales')
];
const destinationDirectory = path.join(rootDir, 'src/translations');

/**
 * Deep merge function for nested objects
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
  const result = { ...target };

  for (const key in source) {
    if (typeof source[key] === 'object' && !Array.isArray(source[key]) && source[key] !== null) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Load JSON file safely
 */
async function loadJsonFile(filePath: string): Promise<Record<string, any>> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Warning: Could not load ${filePath}`, error);
    return {};
  }
}

/**
 * Find missing translation keys compared to a reference
 */
function findMissingKeys(
  reference: Record<string, any>,
  target: Record<string, any>,
  basePath: string = ''
): string[] {
  const missing: string[] = [];

  for (const key in reference) {
    const currentPath = basePath ? `${basePath}.${key}` : key;

    if (!(key in target)) {
      missing.push(currentPath);
    } else if (
      typeof reference[key] === 'object' &&
      !Array.isArray(reference[key]) &&
      reference[key] !== null
    ) {
      missing.push(...findMissingKeys(
        reference[key],
        target[key] || {},
        currentPath
      ));
    }
  }

  return missing;
}

/**
 * Main function to merge and consolidate translations
 */
async function mergeTranslations() {
  try {
    // Ensure destination directory exists
    await fs.mkdir(destinationDirectory, { recursive: true });
    
    // Store the merged translations for each locale
    const mergedTranslations: Record<string, Record<string, any>> = {};
    
    // First pass: load and merge all translations
    for (const locale of locales) {
      mergedTranslations[locale] = {};
      
      // Find all translation files for this locale in all source directories
      for (const sourceDir of sourceDirectories) {
        // Check main file (e.g., en.json)
        const mainFilePath = path.join(sourceDir, `${locale}.json`);
        try {
          const stats = await fs.stat(mainFilePath);
          if (stats.isFile()) {
            const translations = await loadJsonFile(mainFilePath);
            mergedTranslations[locale] = deepMerge(mergedTranslations[locale], translations);
          }
        } catch (error) {
          // File doesn't exist, continue
        }
        
        // Check subdirectory (e.g., messages/en/*)
        const subDirPath = path.join(sourceDir, locale);
        try {
          const stats = await fs.stat(subDirPath);
          if (stats.isDirectory()) {
            const files = await fs.readdir(subDirPath);
            for (const file of files) {
              if (file.endsWith('.json')) {
                const filePath = path.join(subDirPath, file);
                const translations = await loadJsonFile(filePath);
                
                // Use the filename without extension as a namespace
                const namespace = path.basename(file, '.json');
                mergedTranslations[locale][namespace] = deepMerge(
                  mergedTranslations[locale][namespace] || {},
                  translations
                );
              }
            }
          }
        } catch (error) {
          // Subdirectory doesn't exist, continue
        }
      }
    }
    
    // Use the default locale as reference for missing translations
    const referenceTranslations = mergedTranslations[defaultLocale];
    
    // Second pass: check for missing translations and write files
    for (const locale of locales) {
      // Find missing translations compared to reference locale
      const missingKeys = findMissingKeys(referenceTranslations, mergedTranslations[locale]);
      
      if (missingKeys.length > 0) {
        console.warn(`\n[${locale}] Missing ${missingKeys.length} translations:`);
        missingKeys.forEach(key => console.warn(`  - ${key}`));
      }
      
      // Write merged translations to destination file
      const outputPath = path.join(destinationDirectory, `${locale}.json`);
      await fs.writeFile(
        outputPath,
        JSON.stringify(mergedTranslations[locale], null, 2),
        'utf-8'
      );
      
      console.log(`✓ Merged translations for ${locale} written to ${outputPath}`);
    }
    
    console.log('\nTranslation merging completed successfully!');
  } catch (error) {
    console.error('Error merging translations:', error);
    process.exit(1);
  }
}

// Execute the merge function
mergeTranslations(); 