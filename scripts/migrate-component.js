#!/usr/bin/env node

/**
 * Component Migration Script
 *
 * This script helps automate the process of migrating components from the old structure
 * to the new DDD-based architecture.
 *
 * Usage:
 *   node scripts/migrate-component.js --component=Button --type=atom
 *
 * Options:
 *   --component: Name of the component to migrate
 *   --type: Component type (atom, molecule, organism, template)
 *   --skip-compat: Skip creating the compatibility layer
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split("=");
  const cleanKey = key.replace(/^--/, "");
  acc[cleanKey] = value || true;
  return acc;
}, {});

// Component name is required
if (!args.component) {
  console.error("Error: Component name is required (--component=Button)");
  process.exit(1);
}

// Component type is required
if (!args.type) {
  console.error("Error: Component type is required (--type=atom)");
  process.exit(1);
}

// Validate component type
const validTypes = ["atom", "molecule", "organism", "template"];
if (!validTypes.includes(args.type)) {
  console.error(
    `Error: Invalid component type. Must be one of: ${validTypes.join(", ")}`,
  );
  process.exit(1);
}

// Define paths
const componentName = args.component;
const componentType = args.type + "s"; // pluralize
const srcDir = path.resolve(process.cwd(), "src");
const oldPath = path.join(
  srcDir,
  "components",
  "ui",
  `${componentName.toLowerCase()}.tsx`,
);
const newDirPath = path.join(
  srcDir,
  "presentation",
  "components",
  "ui",
  componentType,
  componentName.toLowerCase(),
);
const newFilePath = path.join(newDirPath, "index.tsx");

// Check if component exists
if (!fs.existsSync(oldPath)) {
  console.error(`Error: Component not found at ${oldPath}`);
  process.exit(1);
}

// Create new directory
fs.mkdirSync(newDirPath, { recursive: true });

// Read original component
const originalContent = fs.readFileSync(oldPath, "utf8");

// Extract imports
const importRegex =
  /import\s+(?:{[^}]+}|\*\s+as\s+[^;]+|[^;]+)\s+from\s+['"][^'"]+['"]/g;
const imports = originalContent.match(importRegex) || [];

// Modify imports to use new paths
const modifiedImports = imports.map((importStr) => {
  // Replace lib/utils with shared/utils
  return importStr.replace(/@\/lib\/utils/, "@/shared/utils/cn");
});

// Replace imports in the content
let newContent = originalContent;
imports.forEach((oldImport, index) => {
  newContent = newContent.replace(oldImport, modifiedImports[index]);
});

// Add JSDoc comments if not present
if (!newContent.includes("/**")) {
  const componentDeclaration = newContent.match(/function\s+(\w+)/);
  if (componentDeclaration && componentDeclaration[1]) {
    const componentFunctionName = componentDeclaration[1];
    const jsdocComment = `
/**
 * ${componentFunctionName} component
 * 
 * @example
 * \`\`\`tsx
 * <${componentFunctionName}>Content</${componentFunctionName}>
 * \`\`\`
 */
`;

    // Insert JSDoc before function declaration
    newContent = newContent.replace(
      new RegExp(`function\\s+${componentFunctionName}`),
      `${jsdocComment}function ${componentFunctionName}`,
    );
  }
}

// Write new component file
fs.writeFileSync(newFilePath, newContent);

// Create compatibility layer if needed
if (!args["skip-compat"]) {
  const compatContent = `/**
 * @deprecated This file is maintained for backward compatibility.
 * Please import from '@/ui/${componentType}/${componentName.toLowerCase()}' instead.
 */

// Re-export from new location
export * from "@/presentation/components/ui/${componentType}/${componentName.toLowerCase()}";
`;
  fs.writeFileSync(oldPath, compatContent);
}

// Create types file
const typesFilePath = path.join(newDirPath, "types.ts");
const typesContent = `import { VariantProps } from "class-variance-authority"
import { ${componentName}Variants } from "."

/**
 * ${componentName} component props interface
 */
export interface ${componentName}Props extends React.ComponentProps<"div">,
  VariantProps<typeof ${componentName}Variants> {
  // Add additional props here
}
`;

// Only create types file if it contains variants
if (newContent.includes("cva(")) {
  fs.writeFileSync(typesFilePath, typesContent);
}

// Create test file
const testFilePath = path.join(newDirPath, `${componentName}.test.tsx`);
const testContent = `import React from 'react'
import { render, screen } from '@testing-library/react'
import { ${componentName} } from '.'

describe('${componentName} Component', () => {
  it('renders correctly', () => {
    render(<${componentName}>Test Content</${componentName}>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
`;

fs.writeFileSync(testFilePath, testContent);

console.log(`✅ Successfully migrated ${componentName} component`);
console.log(`📝 New location: ${newFilePath}`);
console.log(`🧪 Test file created: ${testFilePath}`);

if (!args["skip-compat"]) {
  console.log(`🔗 Compatibility layer created at ${oldPath}`);
}

// Find usages
try {
  console.log("\n📊 Component usage:");

  // Check if running on Windows
  const isWindows = process.platform === "win32";

  if (isWindows) {
    // Use PowerShell's Select-String for Windows
    const psCommand = `powershell -Command "Select-String -Path '${srcDir}\\**\\*.tsx','${srcDir}\\**\\*.ts' -Pattern 'from \\"@/components/ui/${componentName.toLowerCase()}\\"'"`;
    const usages = execSync(psCommand, { encoding: "utf8" });
    console.log(usages || "No usages found");
  } else {
    // Use grep for Unix-based systems
    const grepCommand = `grep -r "from \\"@/components/ui/${componentName.toLowerCase()}\\"" ${srcDir} --include="*.tsx" --include="*.ts"`;
    const usages = execSync(grepCommand, { encoding: "utf8" });
    console.log(usages || "No usages found");
  }
} catch (error) {
  console.log("No usages found or error running search");
}

console.log("\n🚀 Next steps:");
console.log("1. Review the migrated component");
console.log("2. Add additional documentation if needed");
console.log("3. Create a PR with the changes");
