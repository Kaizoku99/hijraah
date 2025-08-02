/**
 * API Endpoints Index
 * 
 * Centralized exports for all API endpoint functions including
 * standard and MAS-enhanced endpoints.
 */

// Standard endpoints
export { createDataExtractionEndpoints } from "./data-extraction.js";
export { createPolicySearchEndpoints } from "./policy-search.js";
export { createWebhookEndpoints } from "./webhooks.js";

// MAS-Enhanced endpoints
export { createMasEnhancedDataExtractionEndpoints } from "./mas-enhanced-data-extraction.js";
export { createMasEnhancedPolicySearchEndpoints } from "./mas-enhanced-policy-search.js";
export { createMasEnhancedWebhookEndpoints } from "./mas-enhanced-webhooks.js";

// Enhanced MAS endpoints with full agent integration
export { createEnhancedMasEndpoints } from "./mas-enhanced-endpoints.js";