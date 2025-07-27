/**
 * Utility script to check Supabase connection details
 * Run with: node scripts/check-supabase-config.js
 */

import path from "path";
import { fileURLToPath } from "url";

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl ? "Found" : "Missing");
console.log("Supabase Anon Key:", supabaseKey ? "Found" : "Missing");

if (supabaseUrl && supabaseKey) {
  console.log("\nTrying to connect to Supabase...");

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Simple query to test connection
  supabase
    .from("_placeholder_")
    .select("*")
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        if (error.code === "42P01") {
          console.log(
            "✅ Connected to Supabase successfully (Table does not exist, but connection works)",
          );
        } else {
          console.error("❌ Connection error:", error.message);
        }
      } else {
        console.log("✅ Connected to Supabase successfully");
        console.log("Data:", data);
      }
    })
    .catch((err) => {
      console.error("❌ Connection error:", err.message);
    });
} else {
  console.log("\n❌ Cannot connect to Supabase due to missing configuration.");
  console.log("Please add the following to your .env.local file:");
  console.log("NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key");
}
