import { createDocumentTool } from "./create-document";
import { extractTool } from "./extract";
import { scrapeTool } from "./scrape";
import { searchTool } from "./search";
import { updateDocumentTool } from "./update-document";

// Export all tools
export {
  searchTool,
  extractTool,
  scrapeTool,
  createDocumentTool,
  updateDocumentTool,
};

// Export unified tools object
export const tools = {
  search: searchTool,
  extract: extractTool,
  scrape: scrapeTool,
  createDocument: createDocumentTool,
  updateDocument: updateDocumentTool,
};
