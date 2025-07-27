#!/usr/bin/env node

/**
 * Auth Import Migration Script
 * 
 * This script updates import references from old auth implementations
 * to the new unified auth helper implementation.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const rootDir = path.resolve(__dirname, '..');
const oldImportPatterns = [
  { 
    pattern: /import .*from ['"]@\/contexts\/auth['"]/g,
    replacement: "import { useAuthCompat as useAuth } from '@/hooks/auth-migration'"
  },
  { 
    pattern: /import .*from ['"]@\/lib\/auth['"]/g, 
    replacement: "import { getAuthUser, requirePermission, signOut } from '@/lib/auth-config'"
  },
  { 
    pattern: /import .*from ['"]@\/components\/session-provider['"]/g,
    replacement: "import { useSessionCompat as useSession } from '@/hooks/auth-migration'"
  }
];

// Get list of TypeScript files in the project
function getTypeScriptFiles() {
  try {
    // Use git to find all tracked TypeScript/TSX files (excluding node_modules)
    const result = execSync('git ls-files "*.ts" "*.tsx" | grep -v "node_modules"', { 
      encoding: 'utf8',
      cwd: rootDir
    });
    
    return result.split('\n').filter(Boolean).map(file => path.join(rootDir, file));
  } catch (error) {
    console.error('Error getting TypeScript files:', error);
    // Fallback to recursive search if git command fails
    return findFilesRecursively(rootDir, ['.ts', '.tsx']);
  }
}

// Fallback: Recursively find files with given extensions
function findFilesRecursively(dir, extensions) {
  let results = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && !item.startsWith('.')) {
        results = results.concat(findFilesRecursively(itemPath, extensions));
      }
    } else {
      const ext = path.extname(item);
      if (extensions.includes(ext)) {
        results.push(itemPath);
      }
    }
  }
  
  return results;
}

// Process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let changed = false;
    
    // Check for old import patterns and replace them
    for (const { pattern, replacement } of oldImportPatterns) {
      if (pattern.test(content)) {
        changed = true;
        content = content.replace(pattern, replacement);
      }
    }
    
    // Save changes if the file was modified
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated imports in ${path.relative(rootDir, filePath)}`);
      return 1;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

// Main execution
function main() {
  console.log('🔍 Searching for files with old auth imports...');
  const files = getTypeScriptFiles();
  console.log(`Found ${files.length} TypeScript files to check`);
  
  let updatedCount = 0;
  
  for (const file of files) {
    updatedCount += processFile(file);
  }
  
  console.log(`\n🎉 Finished processing ${files.length} files`);
  console.log(`📊 Updated ${updatedCount} files with new auth imports`);
  
  if (updatedCount > 0) {
    console.log(`\n⚠️  Important: Review the changes and test your application!`);
    console.log(`   Some manual adjustments may be needed for complex import patterns.`);
  }
}

main(); 