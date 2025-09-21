#!/usr/bin/env tsx

/**
 * Chat Migration Execution Script
 * 
 * This script executes the comprehensive chat migration from legacy tables
 * to the enhanced AI SDK v5 compatible schema.
 * 
 * Usage:
 *   # Dry run
 *   pnpm exec tsx scripts/run-migration.ts --dry-run
 * 
 *   # Actual migration
 *   MIGRATION_CONFIRM=true pnpm exec tsx scripts/run-migration.ts
 * 
 *   # Migrate specific user
 *   MIGRATION_CONFIRM=true pnpm exec tsx scripts/run-migration.ts --user-id=user123
 * 
 *   # Migrate specific chat
 *   MIGRATION_CONFIRM=true pnpm exec tsx scripts/run-migration.ts --chat-id=chat123
 */

import { ComprehensiveChatMigrationService } from "./comprehensive-chat-migration";

interface CLIOptions {
  dryRun: boolean;
  userId?: string;
  chatId?: string;
  batchSize: number;
  skipValidation: boolean;
  preserveLegacy: boolean;
  help: boolean;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {
    dryRun: false,
    batchSize: 50,
    skipValidation: false,
    preserveLegacy: true,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--user-id':
        options.userId = args[++i];
        break;
      case '--chat-id':
        options.chatId = args[++i];
        break;
      case '--batch-size':
        options.batchSize = parseInt(args[++i], 10) || 50;
        break;
      case '--skip-validation':
        options.skipValidation = true;
        break;
      case '--delete-legacy':
        options.preserveLegacy = false;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
      default:
        if (arg.startsWith('--user-id=')) {
          options.userId = arg.split('=')[1];
        } else if (arg.startsWith('--chat-id=')) {
          options.chatId = arg.split('=')[1];
        } else if (arg.startsWith('--batch-size=')) {
          options.batchSize = parseInt(arg.split('=')[1], 10) || 50;
        }
    }
  }

  return options;
}

function printHelp(): void {
  console.log(`
🔄 Hijraah Chat Migration Tool

This tool migrates legacy chat_sessions and chat_messages tables to the new
enhanced AI SDK v5 compatible Chat and Message tables.

USAGE:
  pnpm exec tsx scripts/run-migration.ts [OPTIONS]

OPTIONS:
  --dry-run              Run analysis without making changes
  --user-id=<id>         Migrate chats for specific user only
  --chat-id=<id>         Migrate specific chat only
  --batch-size=<num>     Number of chats to process per batch (default: 50)
  --skip-validation      Skip post-migration validation
  --delete-legacy        Delete legacy tables after migration (dangerous!)
  --help, -h             Show this help message

ENVIRONMENT VARIABLES:
  MIGRATION_CONFIRM=true Required for actual migration (safety check)

EXAMPLES:
  # Analyze what would be migrated
  pnpm exec tsx scripts/run-migration.ts --dry-run

  # Migrate all data
  MIGRATION_CONFIRM=true pnpm exec tsx scripts/run-migration.ts

  # Migrate specific user's chats
  MIGRATION_CONFIRM=true pnpm exec tsx scripts/run-migration.ts --user-id=user123

  # Migrate with custom batch size
  MIGRATION_CONFIRM=true pnpm exec tsx scripts/run-migration.ts --batch-size=25

SAFETY:
  - Always run --dry-run first to analyze the migration
  - Legacy tables are preserved by default for safety
  - Set MIGRATION_CONFIRM=true to proceed with actual migration
  - Create database backups before running production migrations

`);
}

async function main(): Promise<void> {
  const options = parseArgs();

  if (options.help) {
    printHelp();
    return;
  }

  console.log("🚀 Hijraah Chat Migration Tool");
  console.log("===============================");

  // Validate environment
  if (!options.dryRun && process.env.MIGRATION_CONFIRM !== "true") {
    console.log("❌ Safety check: Set MIGRATION_CONFIRM=true to proceed with actual migration");
    console.log("💡 Run with --dry-run first to analyze what would be migrated");
    process.exit(1);
  }

  // Validate options
  if (options.userId && options.chatId) {
    console.log("❌ Cannot specify both --user-id and --chat-id");
    process.exit(1);
  }

  if (options.batchSize < 1 || options.batchSize > 1000) {
    console.log("❌ Batch size must be between 1 and 1000");
    process.exit(1);
  }

  console.log("📋 Migration Configuration:");
  console.log(`   Mode: ${options.dryRun ? "DRY RUN" : "ACTUAL MIGRATION"}`);
  console.log(`   Batch Size: ${options.batchSize}`);
  console.log(`   User Filter: ${options.userId || "All users"}`);
  console.log(`   Chat Filter: ${options.chatId || "All chats"}`);
  console.log(`   Skip Validation: ${options.skipValidation}`);
  console.log(`   Preserve Legacy: ${options.preserveLegacy}`);
  console.log("");

  try {
    const migration = new ComprehensiveChatMigrationService();

    // Create backup before migration (for non-dry runs)
    if (!options.dryRun) {
      console.log("💾 Creating backup...");
      const backupId = await migration.createBackup();
      console.log(`✅ Backup created: ${backupId}\n`);
    }

    // Execute migration
    const result = await migration.executeMigration({
      dryRun: options.dryRun,
      batchSize: options.batchSize,
      userId: options.userId,
      chatId: options.chatId,
      skipValidation: options.skipValidation,
      preserveLegacyTables: options.preserveLegacy,
    });

    // Report results
    console.log("\n🎯 Migration Results:");
    console.log(`   Duration: ${Math.round(result.duration / 1000)}s`);
    console.log(`   Success Rate: ${Math.round((result.migratedChats / Math.max(result.totalChats, 1)) * 100)}%`);
    console.log(`   Errors: ${result.errors.length}`);
    console.log(`   Warnings: ${result.warnings.length}`);

    if (options.dryRun) {
      console.log("\n💡 This was a dry run. Set MIGRATION_CONFIRM=true to execute the actual migration.");
    } else if (result.errors.length === 0) {
      console.log("\n🎉 Migration completed successfully!");
      if (options.preserveLegacy) {
        console.log("💡 Legacy tables preserved. You can remove them manually after verification.");
      }
    } else {
      console.log("\n⚠️  Migration completed with errors. Please review the error details above.");
      process.exit(1);
    }

  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n⏹️  Migration interrupted by user');
  process.exit(0);
});

// Handle unhandled errors
process.on('unhandledRejection', (error) => {
  console.error('\n❌ Unhandled error:', error);
  process.exit(1);
});

// Run the migration
main().catch((error) => {
  console.error('❌ Failed to run migration:', error);
  process.exit(1);
});
