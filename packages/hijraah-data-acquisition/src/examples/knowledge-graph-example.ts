/**
 * Knowledge Graph Construction Example
 * 
 * Demonstrates how to use the knowledge graph tasks for entity extraction,
 * relationship mapping, and confidence scoring with real immigration content.
 */

import { orchestrateEntityProcessing } from "../trigger/knowledge-graph";

// Example immigration policy content
const sampleImmigrationContent = `
Express Entry is Canada's main immigration system for skilled workers. The system manages applications for three federal economic immigration programs:

1. Federal Skilled Worker Program (FSWP)
2. Canadian Experience Class (CEC) 
3. Federal Skilled Trades Program (FSTP)

To be eligible for Express Entry, candidates must:
- Meet the minimum requirements for one of the three programs
- Submit an online profile and receive a Comprehensive Ranking System (CRS) score
- Receive an Invitation to Apply (ITA) during regular draws
- Submit a complete application within 60 days of receiving an ITA

Language Requirements:
- IELTS General Training with minimum scores: Listening 6.0, Reading 6.0, Writing 6.0, Speaking 6.0
- Or equivalent scores in CELPIP, TEF Canada, or TCF Canada

Education Requirements:
- Educational Credential Assessment (ECA) from a designated organization
- Minimum high school diploma or equivalent

Work Experience:
- At least one year of continuous full-time work experience (or equivalent part-time)
- Work experience must be in a skilled occupation (NOC TEER 0, 1, 2, or 3)

Processing Times:
- Express Entry profile processing: Immediate
- Complete application processing: 6 months or less
- Biometrics appointment: Within 30 days

Fees:
- Principal applicant: CAD $1,365
- Spouse or partner: CAD $1,365  
- Dependent child: CAD $230
- Biometrics fee: CAD $85 per person

The system uses the Comprehensive Ranking System (CRS) to rank candidates based on:
- Core human capital factors (age, education, language, work experience)
- Spouse or partner factors
- Skill transferability factors
- Additional points (Canadian education, arranged employment, provincial nomination, French language skills, siblings in Canada)

Maximum CRS score is 1,200 points. Recent draw cut-offs have ranged from 481-500 points.
`;

/**
 * Example: Process immigration policy document
 */
export async function processImmigrationPolicy() {
  console.log("🚀 Starting knowledge graph construction example...");
  
  try {
    // Process the sample content through the complete pipeline
    const result = await orchestrateEntityProcessing.run({
      content: sampleImmigrationContent,
      sourceId: "example-canada-express-entry-2024",
      country: "CA",
      documentType: "policy_guide",
      enableRelationshipMapping: true,
      enableConfidenceScoring: true,
      enableEntityResolution: true,
      metadata: {
        source: "IRCC Official Website",
        lastUpdated: "2024-01-15",
        language: "en",
        documentVersion: "2024.1"
      }
    });

    console.log("✅ Knowledge graph construction completed!");
    console.log("\n📊 Processing Summary:");
    console.log(`- Entities extracted: ${result.summary.entitiesExtracted}`);
    console.log(`- Relationships mapped: ${result.summary.relationshipsMapped}`);
    console.log(`- Confidence scores updated: ${result.summary.confidenceScored}`);
    console.log(`- Entities resolved: ${result.summary.entitiesResolved}`);
    console.log(`- Duplicates removed: ${result.summary.duplicatesRemoved}`);
    console.log(`- Processing time: ${result.metadata.processingTime}ms`);

    console.log("\n🔍 Pipeline Steps Executed:");
    Object.entries(result.pipelineSteps).forEach(([step, executed]) => {
      console.log(`- ${step}: ${executed ? '✅' : '❌'}`);
    });

    console.log("\n📋 Detailed Results:");
    console.log("Extraction Result:", JSON.stringify(result.results.extractionResult, null, 2));
    
    if (result.results.relationshipResult) {
      console.log("Relationship Result:", JSON.stringify(result.results.relationshipResult, null, 2));
    }
    
    if (result.results.confidenceResults.length > 0) {
      console.log("Confidence Results:", JSON.stringify(result.results.confidenceResults, null, 2));
    }
    
    if (result.results.resolutionResult) {
      console.log("Resolution Result:", JSON.stringify(result.results.resolutionResult, null, 2));
    }

    return result;

  } catch (error) {
    console.error("❌ Knowledge graph construction failed:", error);
    throw error;
  }
}

/**
 * Example: Extract entities only
 */
export async function extractEntitiesOnly() {
  console.log("🔍 Extracting entities from immigration content...");
  
  const { extractEntities } = await import("../trigger/knowledge-graph");
  
  try {
    const result = await extractEntities.run({
      content: sampleImmigrationContent,
      sourceId: "example-extraction-only",
      country: "CA",
      documentType: "policy_guide"
    });

    console.log("✅ Entity extraction completed!");
    console.log(`Extracted ${result.entitiesExtracted} entities:`);
    
    result.entities.forEach((entity, index) => {
      console.log(`${index + 1}. ${entity.name} (${entity.type}) - Confidence: ${entity.confidence}`);
    });

    return result;

  } catch (error) {
    console.error("❌ Entity extraction failed:", error);
    throw error;
  }
}

/**
 * Example: Map relationships between specific entities
 */
export async function mapEntityRelationships(entityIds: string[]) {
  console.log(`🔗 Mapping relationships between ${entityIds.length} entities...`);
  
  const { mapRelationships } = await import("../trigger/knowledge-graph");
  
  try {
    const result = await mapRelationships.run({
      entityIds: entityIds,
      content: sampleImmigrationContent,
      sourceId: "example-relationship-mapping",
      context: {
        domain: "immigration",
        country: "CA",
        system: "express_entry"
      }
    });

    console.log("✅ Relationship mapping completed!");
    console.log(`Mapped ${result.relationshipsMapped} relationships:`);
    
    result.relationships.forEach((rel, index) => {
      console.log(`${index + 1}. ${rel.type} - Strength: ${rel.strength}, Confidence: ${rel.confidence}`);
    });

    return result;

  } catch (error) {
    console.error("❌ Relationship mapping failed:", error);
    throw error;
  }
}

/**
 * Example: Score confidence for specific entity
 */
export async function scoreEntityConfidence(entityId: string) {
  console.log(`📊 Scoring confidence for entity: ${entityId}`);
  
  const { scoreConfidence } = await import("../trigger/knowledge-graph");
  
  try {
    const result = await scoreConfidence.run({
      entityId: entityId,
      validationContext: "Express Entry system validation context",
      similarityThreshold: 0.8
    });

    console.log("✅ Confidence scoring completed!");
    console.log(`Previous confidence: ${result.previousConfidence}`);
    console.log(`New confidence: ${result.newConfidence}`);
    console.log(`Confidence change: ${result.confidenceChange > 0 ? '+' : ''}${result.confidenceChange}`);
    
    console.log("\nConfidence factors:");
    result.factors.forEach((factor, index) => {
      console.log(`${index + 1}. ${factor.factor}: ${factor.score} (weight: ${factor.weight})`);
    });

    console.log(`\nReasoning: ${result.reasoning}`);

    return result;

  } catch (error) {
    console.error("❌ Confidence scoring failed:", error);
    throw error;
  }
}

/**
 * Example: Resolve duplicate entities
 */
export async function resolveDuplicateEntities(entityIds: string[]) {
  console.log(`🔄 Resolving ${entityIds.length} entities for duplicates...`);
  
  const { resolveEntities } = await import("../trigger/knowledge-graph");
  
  try {
    const result = await resolveEntities.run({
      entityIds: entityIds,
      resolutionStrategy: "merge",
      batchSize: 10
    });

    console.log("✅ Entity resolution completed!");
    console.log(`Entities processed: ${result.entitiesProcessed}`);
    console.log(`Entities resolved: ${result.entitiesResolved}`);
    console.log(`Entities merged: ${result.entitiesMerged}`);
    console.log(`Duplicates removed: ${result.duplicatesRemoved}`);

    return result;

  } catch (error) {
    console.error("❌ Entity resolution failed:", error);
    throw error;
  }
}

// Export example functions
export const knowledgeGraphExamples = {
  processImmigrationPolicy,
  extractEntitiesOnly,
  mapEntityRelationships,
  scoreEntityConfidence,
  resolveDuplicateEntities,
};

// Example usage (commented out to prevent auto-execution)
/*
async function runExamples() {
  try {
    // Run complete pipeline
    await processImmigrationPolicy();
    
    // Or run individual steps
    const extractionResult = await extractEntitiesOnly();
    const entityIds = extractionResult.entities.map(e => e.id);
    
    if (entityIds.length > 1) {
      await mapEntityRelationships(entityIds);
    }
    
    if (entityIds.length > 0) {
      await scoreEntityConfidence(entityIds[0]);
    }
    
    if (entityIds.length > 1) {
      await resolveDuplicateEntities(entityIds);
    }
    
  } catch (error) {
    console.error("Example execution failed:", error);
  }
}

// Uncomment to run examples
// runExamples();
*/