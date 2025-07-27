#!/usr/bin/env node

/**
 * Final Auth Migration Script
 *
 * This script updates the remaining imports from auth-migration.ts
 * to directly use the consolidated auth hooks.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Configuration
const rootDir = path.resolve(__dirname, "..");
const migrationPatterns = [
  {
    pattern: /import\s+{([^}]*)}\s+from\s+['"]@\/hooks\/auth-migration['"]/g,
    replacement: "import {$1} from '@/lib/auth/hooks'",
  },
  {
    pattern: /import\s+([^{][^;]*)\s+from\s+['"]@\/hooks\/auth-migration['"]/g,
    replacement: "import $1 from '@/lib/auth/hooks'",
  },
  {
    pattern: /useAuthCompat/g,
    replacement: "useAuth",
  },
  {
    pattern: /useSessionCompat/g,
    replacement: "useSession",
  },
  {
    pattern: /useHasRoleCompat/g,
    replacement: "useHasRole",
  },
  {
    pattern: /useAuthHybrid/g,
    replacement: "useAuth",
  },
];

// Get list of TypeScript files in the project
function getTypeScriptFiles() {
  try {
    // Use git to find all tracked TypeScript/TSX files (excluding node_modules)
    const result = execSync(
      'git ls-files "*.ts" "*.tsx" | grep -v "node_modules"',
      {
        encoding: "utf8",
        cwd: rootDir,
      },
    );

    return result
      .split("\n")
      .filter(Boolean)
      .map((file) => path.join(rootDir, file));
  } catch (error) {
    console.error("Error getting TypeScript files:", error);
    // Fallback to recursive search if git command fails
    return findFilesRecursively(rootDir, [".ts", ".tsx"]);
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
      if (item !== "node_modules" && item !== ".git" && !item.startsWith(".")) {
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
    // Skip the migration file itself
    if (filePath.includes("auth-migration.ts")) {
      return 0;
    }

    let content = fs.readFileSync(filePath, "utf8");
    let originalContent = content;
    let changed = false;

    // Check for import patterns and replace them
    for (const { pattern, replacement } of migrationPatterns) {
      if (pattern.test(content)) {
        changed = true;
        content = content.replace(pattern, replacement);
      }
    }

    // Save changes if the file was modified
    if (changed) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`Updated imports in ${path.relative(rootDir, filePath)}`);
      return 1;
    }

    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return 0;
  }
}

// Main execution
function main() {
  console.log("Searching for files with auth-migration imports...");
  const files = getTypeScriptFiles();
  console.log(`Found ${files.length} TypeScript files to check`);

  let updatedCount = 0;

  for (const file of files) {
    updatedCount += processFile(file);
  }

  console.log(`\nFinished processing ${files.length} files`);
  console.log(`Updated ${updatedCount} files with direct auth hooks imports`);

  if (updatedCount > 0) {
    console.log(
      `\nImportant: The migration is complete. You can now safely delete src/hooks/auth-migration.ts`,
    );
  } else {
    console.log(
      `\nNo files importing from auth-migration.ts were found. You can now safely delete the file.`,
    );
  }
}

main();
