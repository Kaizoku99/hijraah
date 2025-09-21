// Export document-related functionality
export * from "./types";
export * from "./utils";

// Document processing functionality
export const processDocument = (content: string) => {
  return {
    content,
    processed: true,
    timestamp: new Date().toISOString(),
  };
};

// Main document processor factory
export const createHijraahDocumentProcessor = (config?: any) => {
  return {
    process: processDocument,
    config,
  };
};
