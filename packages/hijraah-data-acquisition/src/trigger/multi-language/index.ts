/**
 * Multi-Language Processing Tasks
 *
 * Main export file for all multi-language data processing tasks.
 */

export * from "./types";
export * from "./multilingual-scraping";
export * from "./translation-pipeline";
export * from "./cross-language-entity-linking";

// Re-export all tasks for easy access
export { multilingualScrapingTasks } from "./multilingual-scraping";
export { translationPipelineTasks } from "./translation-pipeline";
export { crossLanguageEntityLinkingTasks } from "./cross-language-entity-linking";

// Combined export of all multi-language tasks
export const multiLanguageTasks = {
  // Multilingual scraping tasks
  scrapeMultilingualContent: () => import("./multilingual-scraping").then(m => m.scrapeMultilingualContent),
  detectLanguagesBatch: () => import("./multilingual-scraping").then(m => m.detectLanguagesBatch),
  monitorMultilingualSources: () => import("./multilingual-scraping").then(m => m.monitorMultilingualSources),
  dailyMultilingualMonitoring: () => import("./multilingual-scraping").then(m => m.dailyMultilingualMonitoring),

  // Translation pipeline tasks
  runTranslationPipeline: () => import("./translation-pipeline").then(m => m.runTranslationPipeline),
  runLocalizationAutomation: () => import("./translation-pipeline").then(m => m.runLocalizationAutomation),
  weeklyLocalizationAutomation: () => import("./translation-pipeline").then(m => m.weeklyLocalizationAutomation),

  // Cross-language entity linking tasks
  linkEntitiesAcrossLanguages: () => import("./cross-language-entity-linking").then(m => m.linkEntitiesAcrossLanguages),
  buildMultilingualKnowledgeGraph: () => import("./cross-language-entity-linking").then(m => m.buildMultilingualKnowledgeGraph),
  updateCrossLanguageLinks: () => import("./cross-language-entity-linking").then(m => m.updateCrossLanguageLinks),
  weeklyKnowledgeGraphMaintenance: () => import("./cross-language-entity-linking").then(m => m.weeklyKnowledgeGraphMaintenance),
};