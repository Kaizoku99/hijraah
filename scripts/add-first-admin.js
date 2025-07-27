#!/usr/bin/env node
/**
 * This script adds the first admin user to the admin_users table
 * Usage: node scripts/add-first-admin.js <user_email>
 */

require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Validate command-line arguments
if (process.argv.length < 3) {
  console.error("Usage: node scripts/add-first-admin.js <user_email>");
  process.exit(1);
}

const userEmail = process.argv[2];

// Create a Supabase client with the service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

async function addFirstAdmin() {
  try {
    // First, get the user ID from the email
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", userEmail)
      .single();

    if (userError) {
      console.error("Error finding user:", userError.message);
      process.exit(1);
    }

    if (!userData) {
      console.error(`User with email ${userEmail} not found.`);
      process.exit(1);
    }

    // Insert the user into the admin_users table
    const { data, error } = await supabase
      .from("admin_users")
      .insert({
        user_id: userData.id,
        is_admin: true,
      })
      .select();

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        console.log(`User ${userEmail} is already an admin.`);
      } else {
        console.error("Error adding admin:", error.message);
        process.exit(1);
      }
    } else {
      console.log(`Successfully added ${userEmail} as an admin.`);
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
    process.exit(1);
  }
}

addFirstAdmin();
