/**
 * Import Path Update Script
 *
 * This script helps update import paths throughout the codebase to match
 * the new project structure. It scans TypeScript and React files and updates
 * imports according to the defined mapping.
 */

import fs from "fs";
import path from "path";

import { glob } from "glob";

// Define mappings from old to new import paths
const importMappings = [
  // Domain
  { from: "@/domain/entities/", to: "@/core/" },
  { from: "@/domain/services/", to: "@/core/" },
  { from: "@/domain/", to: "@/core/" },

  // Application
  { from: "@/application/", to: "@/application/" },

  // Infrastructure
  { from: "@/infrastructure/", to: "@/infrastructure/" },

  // Core module fixes
  { from: "@/core/document", to: "@/core/documents/entities/document" },
  {
    from: "@/core/document-service",
    to: "@/core/documents/services/document-service",
  },
  { from: "@/core/chat-service", to: "@/core/chat/services/chat-service" },
  { from: "@/core/research/types", to: "@/core/research/lib/types" },
  {
    from: "@/core/documents/processor",
    to: "@/core/documents/services/processor",
  },

  // Types fixes
  { from: "@/types/database", to: "@/types/supabase" },
  { from: "@/types/database.types", to: "@/types/supabase" },
  { from: "./database", to: "./supabase" },
  { from: "@/types/rbac", to: "@/types/auth" },

  // Repositories
  { from: "./base-repository", to: "../base-repository" },
  {
    from: "../../domain/entities/roadmap",
    to: "@/core/immigration/entities/roadmap",
  },

  // Shared UI fixes
  {
    from: "@/shared/ui/create-artifact",
    to: "@/artifacts/components/create-artifact",
  },
  { from: "@/shared/ui/code-editor", to: "@/components/ui/code-editor" },
  { from: "@/shared/ui/console", to: "@/components/ui/console" },
  { from: "@/shared/ui/icons", to: "@/components/ui/icons" },
  { from: "@/shared/ui/atoms/button", to: "@/components/ui/button" },
  { from: "@/shared/ui/atoms/input", to: "@/components/ui/input" },
  { from: "@/shared/ui/atoms/card", to: "@/components/ui/card" },
  { from: "@/shared/ui/atoms/separator", to: "@/components/ui/separator" },
  { from: "@/shared/ui/atoms/badge", to: "@/components/ui/badge" },
  { from: "@/shared/ui/atoms/textarea", to: "@/components/ui/textarea" },
  { from: "@/shared/ui/atoms/select", to: "@/components/ui/select" },
  { from: "@/shared/ui/atoms/label", to: "@/components/ui/label" },
  { from: "@/shared/ui/ui/tooltip", to: "@/components/ui/tooltip" },
  { from: "@/shared/ui/ui/form", to: "@/components/ui/form" },
  { from: "@/shared/ui/ui/file-upload", to: "@/components/ui/file-upload" },
  { from: "@/shared/ui/ui/skeleton", to: "@/components/ui/skeleton" },
  { from: "@/shared/ui/ui/toast", to: "@/components/ui/toast" },
  { from: "@/shared/ui/ui/use-toast", to: "@/components/ui/use-toast" },
  { from: "@/shared/ui/ui/dropdown-menu", to: "@/components/ui/dropdown-menu" },
  { from: "@/shared/ui/ui/calendar", to: "@/components/ui/calendar" },
  { from: "@/shared/ui/ui/popover", to: "@/components/ui/popover" },
  { from: "@/shared/ui/ui/sheet", to: "@/components/ui/sheet" },
  { from: "@/shared/ui/ui/collapsible", to: "@/components/ui/collapsible" },
  { from: "@/shared/ui/ui/table", to: "@/components/ui/table" },
  { from: "@/shared/components/ui/tabs", to: "@/components/ui/tabs" },

  // Context fixes
  {
    from: "@/shared/contexts/artifact-context",
    to: "@/lib/contexts/artifact-context",
  },
  { from: "@/contexts/chat", to: "@/lib/contexts/chat" },
  { from: "@/contexts/auth", to: "@/lib/contexts/auth" },

  // Components
  { from: "./ui/button", to: "@/components/ui/button" },
  { from: "./ui/tooltip", to: "@/components/ui/tooltip" },
  { from: "./ui/input", to: "@/components/ui/input" },
  { from: "./ui/label", to: "@/components/ui/label" },
  {
    from: "@/components/chat/ChatMessage",
    to: "@/components/ui/unified-chat/ChatMessage",
  },
  {
    from: "@/components/documents/DocumentAnalyzer",
    to: "@/components/ui/documents/analyze/DocumentAnalyzer",
  },
  {
    from: "@/components/documents/AnalysisHistory",
    to: "@/components/ui/documents/analyze/AnalysisHistory",
  },

  // Service fixes
  { from: "@/services/chat.ts", to: "@/lib/services/chat" },

  // Hooks
  { from: "@/shared/hooks/use-artifact", to: "@/hooks/use-artifact" },
  { from: "@/shared/hooks/use-translations", to: "@/hooks/use-translations" },
  { from: "@/hooks/useUser", to: "@/auth/hooks/useUser" },
  { from: "@/hooks/useChat", to: "@/chat/hooks/useChat" },
  { from: "@/hooks/use-debounce", to: "@/shared/hooks/use-debounce" },
  { from: "@/lib/hooks/useHijarahApi", to: "@/hooks/useHijarahApi" },

  // Lib fixes
  { from: "@/shared/lib/utils", to: "@/lib/utils" },
  { from: "@/shared/lib/auth", to: "@/lib/auth" },
  { from: "@/shared/lib/apollo-client", to: "@/lib/apollo-client" },
  { from: "../lib/openai", to: "@/lib/openai" },
  {
    from: "../lib/i18n/translation-validator",
    to: "@/lib/i18n/translation-validator",
  },
  { from: "../i18n", to: "@/i18n" },
  { from: "./i18n", to: "@/lib/i18n" },
  {
    from: "@/lib/document/document-comparison",
    to: "@/lib/document/comparison",
  },
  { from: "./index.types", to: "./types" },
  { from: "./sentry", to: "@/lib/sentry" },
  { from: "@/lib/db/schema", to: "@/lib/db/models" },
  { from: "@/lib/db/queries", to: "@/lib/db/operations" },
  { from: "../../lib/logger", to: "@/lib/logger" },
  { from: "./routes/auth", to: "@/api/routes/auth" },

  // Shared types
  { from: "@/shared/types/artifact", to: "@/types/artifact" },
  { from: "@/shared/types/cases", to: "@/types/cases" },
  { from: "@/shared/types/documents", to: "@/types/documents" },

  // External modules
  { from: "@apollo/client", to: "react-query" }, // This might need manual fixing
  { from: "cloudflare:test", to: "jest" }, // This might need manual fixing
];

// Define file patterns to search
const filePatterns = [
  "./src/**/*.ts",
  "./src/**/*.tsx",
  "./src/**/*.js",
  "./src/**/*.jsx",
];

// Get all files matching the patterns
const getFiles = () => {
  let allFiles = [];
  filePatterns.forEach((pattern) => {
    const files = glob.sync(pattern, {
      ignore: ["node_modules/**", "dist/**"],
    });
    allFiles = [...allFiles, ...files];
  });
  return allFiles;
};

// Update imports in a file
const updateImportsInFile = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let originalContent = content;
    let hasChanges = false;

    // Look for import statements
    const importRegex =
      /import\s+(?:{[^}]*}|\*\s+as\s+[^,]+|[^,{]*)\s+from\s+['"]([^'"]+)['"]/g;

    // Replace imports according to mappings
    content = content.replace(importRegex, (fullMatch, importPath) => {
      for (const mapping of importMappings) {
        if (importPath.startsWith(mapping.from)) {
          hasChanges = true;
          const newPath = importPath.replace(mapping.from, mapping.to);
          return fullMatch.replace(importPath, newPath);
        }
      }
      return fullMatch;
    });

    // Only write file if changes were made
    if (hasChanges) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`Updated imports in: ${filePath}`);
      return 1;
    }
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return 0;
  }
};

// Main function
const main = () => {
  console.log("Starting import path updates...");
  const files = getFiles();
  console.log(`Found ${files.length} files to scan`);

  let updatedCount = 0;
  files.forEach((file) => {
    updatedCount += updateImportsInFile(file);
  });

  console.log(`Update complete! Modified ${updatedCount} files.`);

  if (updatedCount > 0) {
    console.log(
      "\nIMPORTANT: Please review the changes to ensure correctness.",
    );
    console.log(
      "You may need to manually adjust some imports that were not automatically updated.",
    );
  }
};

// Run the script
main();
