#!/usr/bin/env node

/**
 * Fix Translation Keys
 * This script compares all locale files and makes sure they have the same structure/keys
 * to prevent "MISSING_MESSAGE" errors.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name from the current file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the locales directory
const LOCALES_DIR = path.join(process.cwd(), 'src', '_shared', 'i18n', 'locales');
const DEFAULT_LOCALE = 'en';

// Helper function to get all keys in an object (recursively)
function getAllKeys(obj, prefix = '', result = new Set()) {
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    result.add(newKey);
    
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      getAllKeys(obj[key], newKey, result);
    }
  }
  return result;
}

// Helper function to get value at path
function getValueByPath(obj, path) {
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  
  return current;
}

// Helper function to set value at path
function setValueByPath(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== 'object') {
      current[part] = {};
    }
    current = current[part];
  }
  
  const lastPart = parts[parts.length - 1];
  current[lastPart] = value;
}

async function main() {
  try {
    console.log('🔍 Analyzing locale files...');
    
    // Get all locale files
    const localeFiles = await fs.promises.readdir(LOCALES_DIR);
    const locales = localeFiles
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    
    if (!locales.includes(DEFAULT_LOCALE)) {
      console.error(`❌ Default locale "${DEFAULT_LOCALE}" not found in locale files.`);
      process.exit(1);
    }
    
    console.log(`Found ${locales.length} locale files: ${locales.join(', ')}`);
    
    // Load the default locale as reference
    const defaultLocaleFile = path.join(LOCALES_DIR, `${DEFAULT_LOCALE}.json`);
    const defaultLocaleContent = JSON.parse(
      await fs.promises.readFile(defaultLocaleFile, 'utf8')
    );
    
    // Get all keys from the default locale
    const allKeys = getAllKeys(defaultLocaleContent);
    console.log(`Found ${allKeys.size} translation keys in default locale.`);
    
    // Check and fix each locale
    let totalMissingKeys = 0;
    let fixedFiles = 0;
    
    for (const locale of locales) {
      if (locale === DEFAULT_LOCALE) continue;
      
      const localeFile = path.join(LOCALES_DIR, `${locale}.json`);
      const localeContent = JSON.parse(
        await fs.promises.readFile(localeFile, 'utf8')
      );
      
      let missingKeys = 0;
      let modified = false;
      
      // Check for missing keys
      for (const key of allKeys) {
        const defaultValue = getValueByPath(defaultLocaleContent, key);
        const localeValue = getValueByPath(localeContent, key);
        
        // Skip if it's an object (we only care about leaf nodes)
        if (typeof defaultValue === 'object' && defaultValue !== null) continue;
        
        // If the key is missing or empty
        if (localeValue === undefined || localeValue === '') {
          console.log(`Missing key in ${locale}: ${key}`);
          missingKeys++;
          totalMissingKeys++;
          
          // Add the key with a value indicating it needs translation
          // This will prevent MISSING_MESSAGE errors while indicating it needs proper translation
          setValueByPath(
            localeContent, 
            key, 
            `[${DEFAULT_LOCALE}: ${defaultValue}]`
          );
          modified = true;
        }
      }
      
      // Save the updated locale file if modified
      if (modified) {
        await fs.promises.writeFile(
          localeFile, 
          JSON.stringify(localeContent, null, 2),
          'utf8'
        );
        console.log(`✅ Fixed ${missingKeys} missing keys in ${locale}`);
        fixedFiles++;
      } else {
        console.log(`✅ No missing keys in ${locale}`);
      }
    }
    
    console.log(`\n✨ Done! Fixed ${totalMissingKeys} missing keys across ${fixedFiles} files.`);
    
    if (totalMissingKeys > 0) {
      console.log('\n⚠️ You should restart your dev server for changes to take effect.');
      console.log('⚠️ Review the added keys and provide proper translations.');
    } else {
      console.log('\n✅ All locale files have consistent keys!');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main(); 