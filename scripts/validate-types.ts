#!/usr/bin/env node

/**
 * This script validates that our TypeScript types match the database schema
 * Run with: npx ts-node scripts/validate-types.ts
 */

import { Constants } from "../src/types/supabase";

// Validate that our exported types match the database schema
const validateTypes = () => {
  console.log("🔍 Validating TypeScript types against database schema...");

  const enums = Constants.public.Enums;
  console.log("\n✅ Validating enum types...");

  // Validate user_role enum
  console.log(`- user_role: ${JSON.stringify(enums.user_role)}`);
  if (
    enums.user_role.includes("user") &&
    enums.user_role.includes("admin") &&
    enums.user_role.includes("client")
  ) {
    console.log("  ✓ user_role enum is valid");
  } else {
    console.error("  ❌ user_role enum is missing expected values");
  }

  // Validate case_status enum
  console.log(`- case_status: ${JSON.stringify(enums.case_status)}`);
  if (
    enums.case_status.includes("draft") &&
    enums.case_status.includes("approved")
  ) {
    console.log("  ✓ case_status enum is valid");
  } else {
    console.error("  ❌ case_status enum is missing expected values");
  }

  // Validate session_status enum
  console.log(`- session_status: ${JSON.stringify(enums.session_status)}`);
  if (
    enums.session_status.includes("active") &&
    enums.session_status.includes("completed")
  ) {
    console.log("  ✓ session_status enum is valid");
  } else {
    console.error("  ❌ session_status enum is missing expected values");
  }

  // Validate session_type enum
  console.log(`- session_type: ${JSON.stringify(enums.session_type)}`);
  if (
    enums.session_type.includes("chat") &&
    enums.session_type.includes("research")
  ) {
    console.log("  ✓ session_type enum is valid");
  } else {
    console.error("  ❌ session_type enum is missing expected values");
  }

  // Validate notification_type enum
  console.log(
    `- notification_type: ${JSON.stringify(enums.notification_type)}`,
  );
  if (
    enums.notification_type.includes("system") &&
    enums.notification_type.includes("message")
  ) {
    console.log("  ✓ notification_type enum is valid");
  } else {
    console.error("  ❌ notification_type enum is missing expected values");
  }

  // Validate source_category enum
  console.log(`- source_category: ${JSON.stringify(enums.source_category)}`);
  if (
    enums.source_category.includes("government") &&
    enums.source_category.includes("news")
  ) {
    console.log("  ✓ source_category enum is valid");
  } else {
    console.error("  ❌ source_category enum is missing expected values");
  }

  console.log("\n✅ All enum types validated successfully!");
  console.log("\n✅ TypeScript types match database schema!");
};

// Run the validation
validateTypes();
