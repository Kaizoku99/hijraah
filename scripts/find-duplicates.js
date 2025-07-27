// Find duplicate files and code in the project
// Usage: node scripts/find-duplicates.js

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const glob = require("glob");

// Configuration
const config = {
  // Directories to scan
  includeDirs: ["src"],
  // File extensions to check
  extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"],
  // Minimum similarity threshold for partial duplication (0-1)
  similarityThreshold: 0.8,
  // Minimum file size to check for duplicates (in bytes)
  minFileSize: 100,
  // Maximum file size to check for duplicates (in bytes)
  maxFileSize: 500000, // 500KB
  // Files to ignore
  ignorePatterns: [
    "**/node_modules/**",
    "**/.next/**",
    "**/dist/**",
    "**/build/**",
    "**/*.d.ts",
    "**/*.test.*",
    "**/*.spec.*",
    "**/generated/**",
  ],
};

// Helper function to get file hash
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  return crypto.createHash("md5").update(content).digest("hex");
}

// Find exact file duplicates
function findExactDuplicates() {
  console.log("Searching for exact file duplicates...");

  const fileMap = new Map(); // hash -> [paths]
  let foundDuplicates = false;

  // Get all files
  const files = [];
  config.includeDirs.forEach((dir) => {
    config.extensions.forEach((ext) => {
      const globPattern = path.join(dir, `**/*${ext}`);
      const matches = glob.sync(globPattern, { ignore: config.ignorePatterns });
      files.push(...matches);
    });
  });

  // Check files
  files.forEach((filePath) => {
    const stats = fs.statSync(filePath);

    // Skip files that are too small or too large
    if (stats.size < config.minFileSize || stats.size > config.maxFileSize) {
      return;
    }

    const hash = getFileHash(filePath);

    if (!fileMap.has(hash)) {
      fileMap.set(hash, [filePath]);
    } else {
      fileMap.get(hash).push(filePath);
    }
  });

  // Display results
  for (const [hash, filePaths] of fileMap.entries()) {
    if (filePaths.length > 1) {
      foundDuplicates = true;
      console.log(
        `\n🔍 Found ${filePaths.length} duplicate files with hash ${hash}:`,
      );
      filePaths.forEach((file) => console.log(`  - ${file}`));
    }
  }

  if (!foundDuplicates) {
    console.log("✅ No exact file duplicates found!");
  } else {
    console.log(
      "\nConsider reviewing and removing these duplicate files to optimize your project.",
    );
  }

  return fileMap;
}

// Find similar files (partial duplication)
function findSimilarFiles() {
  console.log("\nSearching for similar files (potential code duplication)...");

  // Get all non-duplicate files
  const fileMap = findExactDuplicates();
  const uniqueFiles = [];

  for (const [_, filePaths] of fileMap.entries()) {
    // Only add the first instance of exact duplicates
    uniqueFiles.push(filePaths[0]);
  }

  // Compare files for similarity
  let foundSimilarities = false;

  for (let i = 0; i < uniqueFiles.length; i++) {
    const fileA = uniqueFiles[i];
    const contentA = fs.readFileSync(fileA, "utf8");
    const linesA = contentA.split("\n").filter((line) => line.trim() !== "");

    for (let j = i + 1; j < uniqueFiles.length; j++) {
      const fileB = uniqueFiles[j];

      // Skip comparing different file types
      if (path.extname(fileA) !== path.extname(fileB)) {
        continue;
      }

      const contentB = fs.readFileSync(fileB, "utf8");
      const linesB = contentB.split("\n").filter((line) => line.trim() !== "");

      // Check for similar content
      const similarity = calculateSimilarity(linesA, linesB);

      if (similarity >= config.similarityThreshold) {
        foundSimilarities = true;
        console.log(
          `\n🔍 Files with ${Math.round(similarity * 100)}% similarity:`,
        );
        console.log(`  - ${fileA}`);
        console.log(`  - ${fileB}`);
      }
    }
  }

  if (!foundSimilarities) {
    console.log("✅ No significant code duplication found!");
  } else {
    console.log(
      "\nConsider reviewing these similar files and extracting common functionality into shared modules.",
    );
  }
}

// Calculate similarity between two arrays of lines
function calculateSimilarity(linesA, linesB) {
  // Simple Jaccard similarity
  const setA = new Set(linesA);
  const setB = new Set(linesB);

  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return intersection.size / union.size;
}

// Main function
function main() {
  console.log("======================================");
  console.log("🔍 Duplicate File and Code Detector 🔍");
  console.log("======================================\n");

  // Find exact duplicates
  findExactDuplicates();

  // Find similar files
  findSimilarFiles();

  console.log("\n======================================");
}

// Run the script
main();
