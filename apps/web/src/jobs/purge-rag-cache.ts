import { schedules, logger } from "@trigger.dev/sdk/v3";
import { createSupabaseClient } from "@/lib/utils/supabase-client";
import { WebClient } from "@slack/web-api";

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export const purgeRagCacheJob = schedules.task({
  id: "purge-rag-cache",
  // Declarative cron schedule: every hour (UTC)
  cron: "0 * * * *",
  run: async (_payload, { ctx }) => {
    logger.info("🧹 Starting RAG cache purge job", {
      runId: ctx.run.id,
    });

    const supabase = createSupabaseClient("service");

    // Delete expired rows and return the number deleted
    const { data, error } = await supabase
      .from("rag_query_cache")
      .delete()
      .lte("expires_at", new Date().toISOString())
      .select("id");

    if (error) {
      logger.error("🔥 Purge rag_query_cache failed", {
        error: error.message,
        stack: error.stack,
      });
      return { deleted: 0, error: error.message };
    }

    const deletedCount = data?.length ?? 0;

    const now = new Date();

    // Table name for metadata (ensure this table exists with columns: id text PK, last_purged_at timestamptz)
    const META_TABLE = "rag_cache_meta";
    const META_ID = "purge_rag_cache";

    // Fetch existing metadata
    const { data: metaData } = await supabase
      .from(META_TABLE)
      .select("last_purged_at")
      .eq("id", META_ID)
      .maybeSingle();

    const lastPurgedAt = metaData?.last_purged_at
      ? new Date(metaData.last_purged_at)
      : undefined;

    if (deletedCount > 0) {
      // Update last_purged_at whenever we successfully delete rows
      await supabase
        .from(META_TABLE)
        .upsert({ id: META_ID, last_purged_at: now.toISOString() });
    } else {
      const hoursSinceLastPurge = lastPurgedAt
        ? (now.getTime() - lastPurgedAt.getTime()) / 36e5 // ms to hours
        : Infinity;

      // Send alert if no purge for >24h
      if (hoursSinceLastPurge > 24) {
        const alertText = `⚠️ RAG cache purge job has not removed any rows for ${hoursSinceLastPurge.toFixed(1)} hours.`;

        logger.warn(alertText, { runId: ctx.run.id });

        try {
          await slack.chat.postMessage({
            channel: process.env.SLACK_ALERT_CHANNEL || "alerts",
            text: alertText,
          });
        } catch (slackErr: any) {
          logger.error("Failed to send Slack alert", {
            error: slackErr?.message,
          });
        }
      }
    }

    logger.info("✅ Purged expired RAG cache rows", {
      deleted: deletedCount,
      runId: ctx.run.id,
    });

    return { status: "completed", deleted: deletedCount };
  },
});
