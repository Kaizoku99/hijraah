/// <reference lib="deno.ns" />
import { createClient } from "npm:@supabase/supabase-js@2.43.4";

import { ScraperService } from "../../src/lib/scrapers/service.ts"; // Adjust path as needed
import { corsHeaders } from "../_shared/cors.ts";

console.log("Scheduled scraper function booting up...");

// Ensure required environment variables are set
const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const r2Endpoint = Deno.env.get("CLOUDFLARE_R2_ENDPOINT"); // e.g., https://<ACCOUNT_ID>.r2.cloudflarestorage.com
const r2AccountId = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
const r2AccessKeyId = Deno.env.get("CLOUDFLARE_R2_ACCESS_KEY_ID");
const r2SecretAccessKey = Deno.env.get("CLOUDFLARE_R2_SECRET_ACCESS_KEY");
const r2BucketName = Deno.env.get("CLOUDFLARE_R2_BUCKET_NAME"); // e.g., hijraah-autorag-content

if (
  !firecrawlApiKey ||
  !supabaseUrl ||
  !supabaseServiceKey ||
  !r2Endpoint ||
  !r2AccountId ||
  !r2AccessKeyId ||
  !r2SecretAccessKey ||
  !r2BucketName
) {
  console.error("Missing required environment variables for scraper function.");
  throw new Error("Missing required environment variables.");
}

// Instantiate the Scraper Service
const scraperService = new ScraperService(
  firecrawlApiKey,
  supabaseUrl,
  supabaseServiceKey,
  r2Endpoint,
  r2AccountId,
  r2AccessKeyId,
  r2SecretAccessKey,
  r2BucketName,
);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("Invoking scheduled scraper run...");
    // Run the scraper for all active configurations
    await scraperService.runAllActiveScrapers();
    console.log("Scheduled scraper run completed successfully.");

    return new Response(
      JSON.stringify({ message: "Scraping process completed successfully." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error during scheduled scraper run:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

/* 
// --- Deployment Notes ---
// 1. Ensure Deno is installed locally.
// 2. Import Map: You might need an import_map.json if imports get complex, especially for AWS SDK.
//    Example import_map.json:
//    {
//      "imports": {
//        "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2",
//        "@aws-sdk/client-r2": "npm:@aws-sdk/client-r2@3", // Check latest way to import npm modules
//        "crypto": "https://deno.land/std/node/crypto.ts", // For createHash
//        "buffer": "https://deno.land/std/node/buffer.ts" // For Buffer
//      }
//    }
//    Deploy command: supabase functions deploy scheduled-scraper --import-map ./supabase/functions/import_map.json
// 3. Environment Variables: Set all required ENV VARS in the Supabase dashboard (Database -> Functions -> scheduled-scraper -> Environment Variables).
// 4. Cron Job: Set up a Cron Job in Supabase (Database -> Functions -> Cron Jobs) to call this function on your desired schedule (e.g., '0 2 * * *').
*/
