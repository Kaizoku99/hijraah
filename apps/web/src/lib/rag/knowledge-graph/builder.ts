import OpenAI from "openai";
import { z } from "zod";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { RAGProcessedDocument } from "../ingestion/document-processor";
import { generateEmbedding } from "../../ai/openai";

// Entity and relationship schemas
const EntitySchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  name: z.string(),
  documentId: z.string().uuid(),
  attributes: z.record(z.any()).optional(),
});

const RelationshipSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  sourceEntityId: z.string().uuid(),
  targetEntityId: z.string().uuid(),
  documentId: z.string().uuid(),
  attributes: z.record(z.any()).optional(),
});

export type Entity = z.infer<typeof EntitySchema>;
export type Relationship = z.infer<typeof RelationshipSchema>;

export class KnowledgeGraphBuilder {
  private openai: OpenAI;
  private supabase: SupabaseClient;

  constructor(openaiClient: OpenAI, supabaseClient: SupabaseClient) {
    this.openai = openaiClient;
    this.supabase = supabaseClient;
  }

  async buildFromDocument(document: RAGProcessedDocument): Promise<{
    entities: Entity[];
    relationships: Relationship[];
  }> {
    // 1. Extract entities & relationships from document
    const extractedEntities = await this.extractEntities(document);
    const extractedRelationships = await this.extractRelationships(
      document,
      extractedEntities
    );

    // 2. Upsert entities and relationships into KG
    const entities: Entity[] = [];
    for (const entity of extractedEntities) {
      const upserted = await this.upsertEntity(entity);
      entities.push(upserted);
    }

    const relationships: Relationship[] = [];
    for (const rel of extractedRelationships) {
      const created = await this.createRelationship(rel);
      if (created) relationships.push(created);
    }

    // 3. Update temporal information (stub)
    await this.updateTemporalData(document, entities);

    // 4. (Optional) recalc graph metrics – TBD

    console.log(
      `Built and stored graph for document ${document.documentId}: ${entities.length} entities, ${relationships.length} relationships`
    );

    return {
      entities,
      relationships,
    };
  }

  private async storeGraphData(
    entities: Entity[],
    relationships: Relationship[]
  ): Promise<void> {
    if (entities.length > 0) {
      const entityRecords = entities.map((e) => ({
        id: e.id,
        entity_type: e.type,
        entity_name: e.name,
        properties: e.attributes,
        source_references: [e.documentId],
      }));

      const { error } = await this.supabase
        .from("kg_entities")
        .upsert(entityRecords);
      if (error) {
        console.error("Error storing entities:", error);
        throw new Error(`Failed to store entities: ${error.message}`);
      }
    }

    if (relationships.length > 0) {
      const relationshipRecords = relationships.map((r) => ({
        id: r.id,
        source_entity_id: r.sourceEntityId,
        target_entity_id: r.targetEntityId,
        relationship_type: r.type,
        properties: r.attributes,
        source_references: [r.documentId],
      }));

      const { error } = await this.supabase
        .from("kg_relationships")
        .upsert(relationshipRecords);
      if (error) {
        console.error("Error storing relationships:", error);
        throw new Error(`Failed to store relationships: ${error.message}`);
      }
    }
  }

  private async extractEntities(
    document: RAGProcessedDocument
  ): Promise<Entity[]> {
    const entities: Entity[] = [];

    try {
      for (const chunk of document.chunks) {
        const prompt = `
        Extract key entities from the following text. Focus on: People, Organizations, Locations, Dates, and Immigration terms.
        For each entity, provide its type and name.
        Format your response as a JSON object with a single key "entities" containing an array of objects, where each object has "type" and "name".
        
        Text:
        ${chunk}
        `;

        const response = await this.openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are a specialized entity extraction system for immigration documents.",
            },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
        });

        try {
          const content = response.choices[0]?.message?.content || "";
          const extractedData = JSON.parse(content);

          if (Array.isArray(extractedData.entities)) {
            for (const entityData of extractedData.entities) {
              const entity: Entity = {
                id: crypto.randomUUID(),
                type: entityData.type,
                name: entityData.name,
                documentId: document.documentId,
                attributes: entityData.attributes || {},
              };
              entities.push(entity);
            }
          }
        } catch (err) {
          console.error("Failed to parse entity extraction response:", err);
        }
      }
    } catch (err) {
      console.error("Error in entity extraction:", err);
    }

    return entities;
  }

  private async extractRelationships(
    document: RAGProcessedDocument,
    entities: Entity[]
  ): Promise<Relationship[]> {
    const relationships: Relationship[] = [];

    if (entities.length < 2) {
      return relationships;
    }

    try {
      const entityMap = new Map<string, string>();
      entities.forEach((entity) => {
        entityMap.set(entity.name.toLowerCase(), entity.id);
      });

      const entityNames = entities
        .map((e) => `${e.name} (${e.type})`)
        .join(", ");

      const prompt = `
      Identify relationships between these entities: ${entityNames}
      From this text: ${document.rawText.slice(0, 4000)}
      For each relationship, specify the source entity, target entity, and relationship type (e.g., 'works for', 'located in', 'requires').
      Format your response as a JSON object with a single key "relationships" containing an array of objects, where each object has "source", "target", and "type".
      ONLY include relationships and entities explicitly mentioned in the text and from the provided list.
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a specialized relationship extraction system for immigration documents.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      });

      try {
        const content = response.choices[0]?.message?.content || "";
        const extractedData = JSON.parse(content);

        if (Array.isArray(extractedData.relationships)) {
          for (const relData of extractedData.relationships) {
            const sourceId = entityMap.get(relData.source?.toLowerCase());
            const targetId = entityMap.get(relData.target?.toLowerCase());

            if (sourceId && targetId) {
              const relationship: Relationship = {
                id: crypto.randomUUID(),
                type: relData.type,
                sourceEntityId: sourceId,
                targetEntityId: targetId,
                documentId: document.documentId,
                attributes: relData.attributes || {},
              };
              relationships.push(relationship);
            }
          }
        }
      } catch (err) {
        console.error("Failed to parse relationship extraction response:", err);
      }
    } catch (err) {
      console.error("Error in relationship extraction:", err);
    }

    return relationships;
  }

  async queryPath(
    startEntity: string,
    endEntity: string,
    maxDepth: number = 3
  ): Promise<{ path: string[]; relationships: string[] }[]> {
    // Resolve entity IDs
    const start = await this.getEntityByName(startEntity);
    const end = await this.getEntityByName(endEntity);
    if (!start || !end) {
      return [];
    }

    interface QueueItem {
      entityId: string;
      path: string[];
      relPath: string[];
    }

    const results: { path: string[]; relationships: string[] }[] = [];
    const visited = new Set<string>();
    const queue: QueueItem[] = [
      { entityId: start.id, path: [start.entity_name], relPath: [] },
    ];

    while (queue.length > 0) {
      const { entityId, path, relPath } = queue.shift()!;
      if (path.length > maxDepth + 1) continue;
      if (entityId === end.id) {
        results.push({ path, relationships: relPath });
        continue;
      }

      const neighbors = await this.getNeighbors(entityId);
      for (const n of neighbors) {
        if (visited.has(`${entityId}-${n.targetId}`)) continue;
        visited.add(`${entityId}-${n.targetId}`);
        queue.push({
          entityId: n.targetId,
          path: [...path, n.targetName],
          relPath: [...relPath, n.type],
        });
      }
    }

    return results;
  }

  private async getEntityByName(name: string) {
    const { data, error } = await this.supabase
      .from("kg_entities")
      .select("id, entity_name, properties")
      .ilike("entity_name", name)
      .maybeSingle();
    if (error) return null;
    return data;
  }

  private async getNeighbors(entityId: string) {
    const { data, error } = await this.supabase
      .from("kg_relationships")
      .select(
        "target_entity_id, relationship_type, target:target_entity_id ( entity_name )"
      )
      .eq("source_entity_id", entityId);
    if (error) return [];
    return (data || []).map((row: any) => ({
      targetId: row.target_entity_id,
      targetName: row.target?.entity_name ?? "",
      type: row.relationship_type,
    }));
  }

  // ---------------------- UPSERT HELPERS ----------------------

  /**
   * Upsert an entity: if an entity with the same name (case-insensitive)
   * already exists, merge attributes ; otherwise insert a new row.
   */
  private async upsertEntity(entity: Entity): Promise<Entity> {
    // 1. Attempt case-insensitive exact match
    const { data: existing } = await this.supabase
      .from("kg_entities")
      .select("id, entity_name, properties, confidence_score")
      .ilike("entity_name", entity.name)
      .maybeSingle();

    if (existing) {
      // merge attributes
      const mergedProps = {
        ...(existing.properties || {}),
        ...entity.attributes,
      };
      await this.supabase
        .from("kg_entities")
        .update({
          properties: mergedProps,
          updated_at: new Date().toISOString(),
          confidence_score: this.adjustConfidence(
            existing.confidence_score ?? 0.8,
            1
          ),
        })
        .eq("id", existing.id);

      return { ...entity, id: existing.id, attributes: mergedProps };
    }

    // No match – insert new row with embedding
    const embedding = await generateEmbedding(entity.name);
    await this.supabase.from("kg_entities").insert({
      id: entity.id,
      entity_type: entity.type,
      entity_name: entity.name,
      properties: entity.attributes,
      embedding,
      source_references: [entity.documentId],
      confidence_score: 0.8,
    });
    return entity;
  }

  /**
   * Create relationship if not exists.
   */
  private async createRelationship(
    rel: Relationship
  ): Promise<Relationship | null> {
    const { data: existing } = await this.supabase
      .from("kg_relationships")
      .select("id, strength")
      .eq("source_entity_id", rel.sourceEntityId)
      .eq("target_entity_id", rel.targetEntityId)
      .eq("relationship_type", rel.type)
      .maybeSingle();

    if (existing) {
      // update strength / properties maybe in future
      return null;
    }

    await this.supabase.from("kg_relationships").insert({
      id: rel.id,
      source_entity_id: rel.sourceEntityId,
      target_entity_id: rel.targetEntityId,
      relationship_type: rel.type,
      properties: rel.attributes,
      source_references: [rel.documentId],
      strength: 1,
    });
    return rel;
  }

  /**
   * Placeholder for temporal data processing – updates policy timeline etc.
   */
  private async updateTemporalData(
    document: RAGProcessedDocument,
    entities: Entity[]
  ) {
    const text = document.rawText;

    // Very simple date regex patterns (YYYY-MM-DD or DD Month YYYY)
    const isoDateRegex = /\b(20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/g;
    const longDateRegex =
      /\b(0?[1-9]|[12]\d|3[01])\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}\b/gi;

    const effectiveMatches = [
      ...text.matchAll(/effective\s+(from|on)?\s+([^\.\n]+)/gi),
    ];

    for (const match of effectiveMatches) {
      const datePart = match[2];
      let dateStr: string | null = null;
      const iso = isoDateRegex.exec(datePart);
      if (iso) dateStr = iso[0];
      if (!dateStr) {
        const long = longDateRegex.exec(datePart);
        if (long) dateStr = long[0];
      }

      if (dateStr) {
        const effectiveDate = new Date(dateStr);
        if (!isNaN(effectiveDate.getTime())) {
          for (const entity of entities) {
            await this.supabase.from("policy_timeline").insert({
              entity_id: entity.id,
              policy_type: "unspecified",
              effective_date: effectiveDate.toISOString().split("T")[0],
              description: `Detected policy change mention in document ${document.documentId}`,
              source_url: document.sourceUrl,
            });
          }
        }
      }
    }
  }

  /** Adjust confidence/strength using simple additive smoothing */
  private adjustConfidence(current: number, increment: number) {
    const newScore = Math.min(current + increment * 0.05, 1);
    return newScore;
  }
}
