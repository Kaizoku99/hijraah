import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate types first to ensure we have the latest
console.log('Generating Supabase types...');
try {
  execSync('npx supabase gen types typescript --local > apps/web/src/types/supabase.ts', { stdio: 'inherit' });
  console.log('✅ Types generated successfully');
} catch (error) {
  console.error('❌ Failed to generate types:', error.message);
  console.log('Continuing with import fixes...');
}

// Remove supabase-generated.ts if it exists (to avoid confusion)
const generatedTypesPath = path.join('src', 'types', 'supabase-generated.ts');
if (fs.existsSync(generatedTypesPath)) {
  fs.unlinkSync(generatedTypesPath);
  console.log('✅ Removed duplicate generated types file');
}

// Function to walk directories recursively
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Directories to search for TypeScript files
const searchDirs = ['src'];

// Count of replacements made
let fileCount = 0;
let replacementCount = 0;

// Process each TypeScript file
searchDirs.forEach(searchDir => {
  walkDir(searchDir, function(filePath) {
    // Only process TypeScript files
    if (!['.ts', '.tsx'].includes(path.extname(filePath))) return;
    
    // Skip the supabase type files themselves
    if (filePath.includes('src/types/supabase')) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let fileChanged = false;
    
    // Fix type imports from "./supabase" to use proper path alias
    // This should apply to files in the src/types directory
    if (filePath.includes('src/types/')) {
      const fixedImports = newContent.replace(
        /import\s+(\{[\s\w,]+\})\s+from\s+['"](\.\/supabase)['"];/g, 
        'import $1 from "$2";'
      );
      
      if (fixedImports !== newContent) {
        newContent = fixedImports;
        fileChanged = true;
        replacementCount++;
      }
    }
    
    // Also fix cases where import is from "../../types/supabase" to "@/types/supabase"
    // This standardizes relative imports to use path aliases
    const relativeImportRegex = /import\s+(\{[\s\w,]+\})\s+from\s+['"](?:\.\.\/)+types\/supabase['"];/g;
    const fixedRelativeImports = newContent.replace(
      relativeImportRegex,
      'import $1 from "@/types/supabase";'
    );
    
    if (fixedRelativeImports !== newContent) {
      newContent = fixedRelativeImports;
      fileChanged = true;
      replacementCount++;
    }
    
    // Write the file back if changes were made
    if (fileChanged) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Fixed imports in ${filePath}`);
      fileCount++;
    }
  });
});

// Update the package.json script to ensure types are generated correctly
try {
  const packageJsonPath = path.join('package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Ensure the supabase:types script is correct
  if (packageJson.scripts && packageJson.scripts['supabase:types']) {
    packageJson.scripts['supabase:types'] = 'supabase gen types typescript --local > apps/web/src/types/supabase.ts';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log('✅ Updated package.json script for generating types');
  }
} catch (error) {
  console.error('❌ Failed to update package.json:', error.message);
}

console.log(`\n🎉 Completed! Fixed imports in ${fileCount} files (${replacementCount} replacements).`);
console.log('\nNext steps:');
console.log('1. Run npm run lint to check for any remaining issues');
console.log('2. If needed, run the following commands:');
console.log('   - npm run supabase:types (to regenerate types)');
console.log('   - node scripts/fix-supabase-imports.js (to fix any new import issues)'); 