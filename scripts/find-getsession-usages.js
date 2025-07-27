#!/usr/bin/env node

/**
 * Script to find getSession() usages and suggest replacements
 * Run with: node scripts/find-getsession-usages.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Directories to exclude from search
const EXCLUDED_DIRS = [
  'node_modules',
  '.next',
  'public',
  'scripts',
  'dist',
  'build',
];

// Files to exclude from search
const EXCLUDED_FILES = [
  '.git',
  '.env',
  'package.json',
  'package-lock.json',
];

// Patterns to search for
const PATTERNS = [
  {
    regex: /supabase\.auth\.getSession\(\)/g,
    suggestion: 'supabase.auth.getUser()',
    description: 'Using getSession() directly without authentication verification',
  },
  {
    regex: /const\s+{\s*data\s*:\s*{\s*session\s*}\s*,?\s*(?:error\s*:?\s*[a-zA-Z]*\s*)?}\s*=\s*await\s+supabase\.auth\.getSession\(\)/g,
    suggestion: 'const { data: { user }, error } = await supabase.auth.getUser()',
    description: 'Destructuring session from getSession() result',
  },
  {
    regex: /session\.user/g,
    suggestion: 'user',
    description: 'Using session.user directly (consider using user object from getUser() instead)',
  },
];

// Gets all files in directory recursively
function getAllFiles(dir, excludedDirs = [], excludedFiles = []) {
  const files = [];
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!excludedDirs.includes(entry.name)) {
        files.push(...getAllFiles(fullPath, excludedDirs, excludedFiles));
      }
    } else if (!excludedFiles.includes(entry.name) && !entry.name.startsWith('.')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Analyze a file for getSession usage
function analyzeFile(file) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const results = [];
    
    for (const pattern of PATTERNS) {
      const matches = content.match(pattern.regex);
      
      if (matches) {
        results.push({
          pattern: pattern.description,
          count: matches.length,
          suggestion: pattern.suggestion,
        });
      }
    }
    
    if (results.length > 0) {
      return {
        file,
        patterns: results,
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error analyzing file ${file}:`, error.message);
    return null;
  }
}

// Main function
async function main() {
  console.log('Searching for getSession() usages...');
  
  // Get all files
  const rootDir = path.resolve(__dirname, '..');
  const allFiles = getAllFiles(rootDir, EXCLUDED_DIRS, EXCLUDED_FILES);
  const results = [];
  
  // Analyze each file
  for (const file of allFiles) {
    const result = analyzeFile(file);
    if (result) {
      results.push(result);
    }
  }
  
  // Print results
  console.log('\n=== getSession() Usage Report ===\n');
  console.log(`Found ${results.length} files with getSession() usage.`);
  
  if (results.length > 0) {
    console.log('\nFiles with getSession() usage:');
    
    results.forEach((result, index) => {
      const relativePath = path.relative(rootDir, result.file);
      
      console.log(`\n${index + 1}. ${relativePath}`);
      result.patterns.forEach(pattern => {
        console.log(`   - ${pattern.count} instances of ${pattern.pattern}`);
        console.log(`     Suggestion: Replace with ${pattern.suggestion}`);
      });
      
      // Show grep for context
      try {
        const grepCommand = `grep -n "getSession" "${result.file}"`;
        const grepResult = execSync(grepCommand, { encoding: 'utf8' });
        console.log('   - Lines:');
        grepResult.split('\n').forEach(line => {
          if (line.trim()) {
            console.log(`     ${line}`);
          }
        });
      } catch (error) {
        console.log('   - Error getting line numbers');
      }
    });
    
    console.log('\nRecommendation:');
    console.log('1. Replace getSession() with getUser() where possible');
    console.log('2. First verify the user with getUser(), then only use getSession() if you specifically need the session token');
    console.log('3. Avoid accessing user properties directly from session.user');
  }
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
}); 