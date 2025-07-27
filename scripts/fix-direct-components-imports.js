/**
 * Fix Direct Component Imports Script
 * 
 * This script finds and updates import statements that use the old direct path pattern
 * @/components/* to the new structure @/shared/ui/* or @/shared/components/*
 */

const fs = require('fs');
const path = require('path');

// Root directory of the src folder
const SHARED_DIR = path.join(process.cwd(), 'src');

// Map of component names to their new directories
const COMPONENT_PATHS = {
  'root-error-boundary': 'ui',
  'error-boundary': 'ui',
  // Add more component mappings as needed
};

// Helper function to find all .tsx files recursively
function findFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recurse into subdirectories
      results = results.concat(findFilesRecursively(filePath));
    } else if (path.extname(filePath) === '.tsx') {
      // Add .tsx files
      results.push(filePath);
    }
  }
  
  return results;
}

// Find all files with a specific pattern
function findFiles(dir, pattern) {
  try {
    // Get all .tsx files
    const allFiles = findFilesRecursively(dir);
    
    // Filter files containing the pattern
    return allFiles.filter(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        return content.includes(pattern);
      } catch (error) {
        console.error(`Error reading file ${file}: ${error.message}`);
        return false;
      }
    });
  } catch (error) {
    console.error(`Error finding files: ${error.message}`);
    return [];
  }
}

function updateFile(filePath) {
  console.log(`Processing ${filePath}...`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    
    // Look for direct import statements from @/components
    const regex = /from ['"]@\/components\/([^/'"]+)['"]/g;
    let match;
    let updated = false;
    
    // Create a new string with replacements
    while ((match = regex.exec(content)) !== null) {
      const componentName = match[1]; // e.g., root-error-boundary, error-boundary
      
      // Determine the right component location (ui or components)
      const componentType = COMPONENT_PATHS[componentName] || 'components';
      
      // Create the replacement string
      const oldImport = `from '@/components/${componentName}'`;
      const newImport = `from '@/shared/${componentType}/${componentName}'`;
      
      // Replace the import
      newContent = newContent.replace(oldImport, newImport);
      
      // Also replace double-quoted version if it exists
      const oldImportDoubleQuotes = `from "@/components/${componentName}"`;
      const newImportDoubleQuotes = `from "@/shared/${componentType}/${componentName}"`;
      newContent = newContent.replace(oldImportDoubleQuotes, newImportDoubleQuotes);
      
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Updated ${filePath}`);
      return true;
    }
    
    console.log(`⚠️ No direct component imports found in ${filePath}`);
    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔍 Finding files with direct @/components imports...');
  
  // Find all files with the old pattern
  const pattern = '@/components/';
  const files = findFiles(SHARED_DIR, pattern);
  
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