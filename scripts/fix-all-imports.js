/**
 * Comprehensive Import Fixer Script
 * 
 * This script finds and updates all import statements that use old path patterns
 * to match the new layered architecture structure.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory to use with path.join when needed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root directory of the src folder
const SRC_DIR = path.join(path.dirname(__dirname), 'src');

// Map of old import paths to their new locations
const PATH_MAPPINGS = [
  // Direct component imports
  { 
    pattern: /from ['"]@\/components\/([^/'"\r\n]+)['"]/g,
    getNewPath: (match) => {
      const componentName = match[1];
      // Common UI components typically go to ui directory
      return `from '@/shared/ui/${componentName}'`;
    }
  },
  // Component UI imports
  { 
    pattern: /from ['"]@\/components\/ui\/([^/'"\r\n]+)['"]/g,
    getNewPath: (match) => {
      const componentName = match[1];
      // UI components based on type
      if (['button', 'card', 'checkbox', 'input', 'label', 'separator', 'progress', 'switch', 'badge', 'avatar', 'textarea'].includes(componentName)) {
        return `from '@/shared/ui/atoms/${componentName}'`;
      } else {
        return `from '@/shared/ui/ui/${componentName}'`;
      }
    }
  },
  // Context imports
  { 
    pattern: /from ['"]@\/contexts\/([^/'"\r\n]+)['"]/g,
    getNewPath: (match) => {
      const contextName = match[1];
      return `from '@/shared/contexts/${contextName}'`;
    }
  },
  // Hook imports
  { 
    pattern: /from ['"]@\/hooks\/([^/'"\r\n]+)['"]/g,
    getNewPath: (match) => {
      const hookName = match[1];
      return `from '@/shared/hooks/${hookName}'`;
    }
  },
  // Lib imports
  { 
    pattern: /from ['"]@\/lib\/([^/'"\r\n]+)['"]/g,
    getNewPath: (match) => {
      const libName = match[1];
      return `from '@/shared/lib/${libName}'`;
    }
  },
  // Util imports
  { 
    pattern: /from ['"]@\/utils\/([^/'"\r\n]+)['"]/g,
    getNewPath: (match) => {
      const utilName = match[1];
      return `from '@/shared/utils/${utilName}'`;
    }
  },
  // Config imports
  { 
    pattern: /from ['"]@\/config\/([^/'"\r\n]+)['"]/g,
    getNewPath: (match) => {
      const configName = match[1];
      return `from '@/shared/config/${configName}'`;
    }
  },
  // Direct atoms imports
  { 
    pattern: /from ['"]@\/atoms\/([^/'"\r\n]+)['"]/g,
    getNewPath: (match) => {
      const atomName = match[1];
      return `from '@/shared/ui/atoms/${atomName}'`;
    }
  }
];

// Helper function to find all relevant files recursively
function findFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recurse into subdirectories
      results = results.concat(findFilesRecursively(filePath));
    } else if (['.tsx', '.ts', '.jsx', '.js'].includes(path.extname(filePath))) {
      // Add relevant files
      results.push(filePath);
    }
  }
  
  return results;
}

// Helper function to check if a file contains any of our patterns
function fileContainsPatterns(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return PATH_MAPPINGS.some(mapping => {
      // Reset the lastIndex before each test
      mapping.pattern.lastIndex = 0;
      return mapping.pattern.test(content);
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return false;
  }
}

// Find all files with our import patterns
function findFiles(dir) {
  try {
    // Get all relevant files
    const allFiles = findFilesRecursively(dir);
    
    // Filter files containing any of our patterns
    return allFiles.filter(file => fileContainsPatterns(file));
  } catch (error) {
    console.error(`Error finding files: ${error.message}`);
    return [];
  }
}

function updateFile(filePath) {
  console.log(`Processing ${filePath}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let updated = false;
    
    // Apply each pattern replacement
    for (const mapping of PATH_MAPPINGS) {
      // Reset the lastIndex to start from the beginning
      mapping.pattern.lastIndex = 0;
      
      let match;
      // Need to create a new content after each replacement to keep proper indices
      while ((match = mapping.pattern.exec(newContent)) !== null) {
        const oldImport = match[0];
        const newImport = mapping.getNewPath(match);
        
        // Replace the specific occurrence
        newContent = newContent.replace(oldImport, newImport);
        updated = true;
        
        // Reset the lastIndex since we've changed the content
        mapping.pattern.lastIndex = 0;
      }
    }
    
    if (updated) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Updated ${filePath}`);
      return true;
    }
    
    console.log(`⚠️ No patterns matched in ${filePath}`);
    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔍 Finding files with old import patterns...');
  
  // Find all files with our patterns
  const files = findFiles(SRC_DIR);
  
  console.log(`Found ${files.length} files to update.`);
  
  // Update each file
  let updatedCount = 0;
  
  for (const file of files) {
    if (updateFile(file)) {
      updatedCount++;
    }
  }
  
  console.log(`\n✨ Done! Updated ${updatedCount} out of ${files.length} files.`);
}

main(); 