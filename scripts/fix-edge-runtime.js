#!/usr/bin/env node

/**
 * Fix Edge Runtime in API Routes
 * This script removes or comments out the edge runtime directive in API routes
 * that use Supabase authentication to prevent compatibility issues.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name from the current file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Patterns to look for
const EDGE_RUNTIME_PATTERN = /export\s+const\s+runtime\s*=\s*['"]edge['"]/;
const SUPABASE_AUTH_PATTERN = /supabase\.auth/;

async function findFiles(dir, fileList = []) {
  const files = await fs.promises.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.promises.stat(filePath);
    
    if (stats.isDirectory()) {
      // Skip node_modules and .next
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        fileList = await findFiles(filePath, fileList);
      }
    } else if (
      (file === 'route.ts' || file === 'route.tsx' || file.endsWith('.api.ts') || file.endsWith('.api.tsx')) && 
      (filePath.includes('/api/') || filePath.includes('\\api\\'))
    ) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

async function processFile(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf8');
  
  // Check if file contains both edge runtime and Supabase auth
  if (EDGE_RUNTIME_PATTERN.test(content) && SUPABASE_AUTH_PATTERN.test(content)) {
    console.log(`Found issue in ${filePath}`);
    
    // Replace edge runtime with commented version
    const newContent = content.replace(
      EDGE_RUNTIME_PATTERN,
      '// Disabled edge runtime to fix Supabase auth issues\n// export const runtime = \'edge\''
    );
    
    await fs.promises.writeFile(filePath, newContent, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
    return true;
  }
  
  return false;
}

async function main() {
  try {
    console.log('🔍 Searching for API routes with edge runtime and Supabase auth...');
    const srcDir = path.join(process.cwd(), 'src');
    const apiFiles = await findFiles(srcDir);
    
    console.log(`Found ${apiFiles.length} API route files to check.`);
    
    let fixedCount = 0;
    for (const file of apiFiles) {
      const wasFixed = await processFile(file);
      if (wasFixed) {
        fixedCount++;
      }
    }
    
    console.log(`\n✨ Done! Fixed ${fixedCount} files.`);
    
    if (fixedCount > 0) {
      console.log('\n⚠️ You should restart your dev server for changes to take effect.');
    } else {
      console.log('\n✅ No issues found that needed fixing.');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main(); 