import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { createSupabaseClient } from "../src/lib/utils/supabase-client";

(async () => {
  try {
    const args = process.argv.slice(2);
    const importFile = args.find((a) => a.startsWith("--file="))?.split("=")[1];

    const supabase = createSupabaseClient("service");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 1. Build a set of candidate URLs
    const candidates = new Set<string>();

    if (importFile) {
      const abs = path.resolve(importFile);
      if (!fs.existsSync(abs)) {
        console.error(`File not found: ${abs}`);
        process.exit(1);
      }
      const content = fs.readFileSync(abs, "utf8");
      content
        .split(/\r?\n/) // split lines
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
        .forEach((l) => candidates.add(l));
    }

    // 2. Insert any new URLs (embedding = null)
    if (candidates.size > 0) {
      const { data: existing } = await supabase
        .from("image_embeddings")
        .select("image_url");
      const existingSet = new Set(existing?.map((r: any) => r.image_url) || []);
      const toInsert = Array.from(candidates).filter(
        (url) => !existingSet.has(url),
      );
      if (toInsert.length) {
        await supabase
          .from("image_embeddings")
          .insert(toInsert.map((url) => ({ image_url: url })));
        console.log(`Inserted ${toInsert.length} new placeholder rows.`);
      }
    }

    // 3. Fetch rows that need embeddings
    const { data: pending, error } = await supabase
      .from("image_embeddings")
      .select("id, image_url")
      .is("embedding", null);

    if (error) throw error;
    if (!pending || pending.length === 0) {
      console.log("No image rows need embeddings. Exiting.");
      return;
    }

    console.log(`Embedding ${pending.length} images...`);

    for (const row of pending) {
      try {
        const embedding = (
          await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: row.image_url, // simple embedding on URL text; replace with caption/alt if available
          })
        ).data[0].embedding;

        await supabase
          .from("image_embeddings")
          .update({ embedding })
          .eq("id", row.id);
        console.log(`✓ embedded ${row.image_url}`);
      } catch (err) {
        console.warn(
          `✗ failed to embed ${row.image_url}:`,
          (err as Error).message,
        );
      }
    }

    console.log("Backfill complete.");
  } catch (err) {
    console.error("Backfill script failed:", err);
    process.exit(1);
  }
})();
