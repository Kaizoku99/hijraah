import { schedules, logger } from "@trigger.dev/sdk/v3";
import { createSupabaseClient } from "@/lib/utils/supabase-client";

export const maintenanceJob = schedules.task({
  id: "rag-performance-maintenance",
  cron: "30 3 * * *", // every day at 03:30 UTC
  run: async (_payload, { ctx }) => {
    logger.info("🏗️ Running RAG maintenance job", { runId: ctx.run.id });

    const supabase = createSupabaseClient("service");

    // Tables to analyze
    const tables = [
      "kg_entities",
      "kg_relationships",
      "document_chunks_enhanced",
      "image_embeddings",
    ];

    for (const table of tables) {
      await supabase.rpc("execute_sql", {
        sql: `ANALYZE VERBOSE public.${table};`,
      });
    }

    // Prewarm vector indexes via pg_prewarm
    await supabase.rpc("execute_sql", {
      sql: `SELECT pg_prewarm(indexrelid) FROM pg_index WHERE indrelid = 'public.kg_entities'::regclass;`,
    });

    logger.info("✅ Maintenance complete", { runId: ctx.run.id });
  },
});
