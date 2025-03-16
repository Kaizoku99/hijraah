# PowerShell script to consolidate migrations and clean up redundant files
# This should be run after the new consolidated migrations have been added to the system

# Define the consolidated files that will be kept
$keptMigrations = @(
    "20240901_1.0.0_core_system_setup.sql",
    "20240902_1.1.0_primary_schema.sql",
    "20240903_1.2.0_extensions_and_features.sql",
    "20240920_1.3.0_core_content_tables.sql",
    "20240921_1.4.0_research_system.sql",
    "20240922_1.5.0_user_experience.sql",
    "20240923_1.6.0_performance_infrastructure.sql",
    "20240924_1.7.0_operational_features.sql",
    "20240910_add_profiles_and_avatar.sql", # Keeping the latest migration as it might contain changes not in consolidated files
    "README.md",
    "consolidate-migrations.ps1"
)

# List of migration files to keep (these won't be consolidated)
$keepMigrations = @(
    "20240901_1.0.0_core_system_setup.sql",
    "20240902_1.1.0_primary_schema.sql",
    "20240903_1.2.0_extensions_and_features.sql",
    "20240910_add_profiles_and_avatar.sql",
    "20240920_1.3.0_core_content_tables.sql",
    "20240921_1.4.0_research_system.sql",
    "20240922_1.5.0_user_experience.sql",
    "20240923_1.6.0_performance_infrastructure.sql",
    "20240924_1.7.0_operational_features.sql",
    "20240925_1.8.0_additional_features.sql",
    "20240930_1.9.0_migration_verification.sql",
    "20240931_1.10.0_rollback_system.sql",
    "20240932_1.11.0_environment_config.sql",
    "20240933_1.12.0_storage_policies_fix.sql",
    "20240934_1.13.0_policy_syntax_fix.sql",
    "20240935_1.14.0_fix_admin_column_references.sql"
)

# Additional files to preserve (templates directory, README, etc.)
$preserveFiles = @(
    "README.md",
    "consolidate-migrations.ps1",
    "cleanup-redundant-files.ps1",
    "apply-migrations.ps1",
    "templates/*"
)

# Create a backup directory if it doesn't exist
$backupDir = "consolidated_backups"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Write-Host "Created backup directory: $backupDir" -ForegroundColor Green
}

# Get current datetime for backup archive
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupArchive = Join-Path $backupDir "migration_backup_$timestamp.zip"
$logFile = Join-Path $backupDir "migration_consolidation_$timestamp.log"

# Start logging
"Migration consolidation started at $(Get-Date)" | Out-File -FilePath $logFile

# Get all SQL files in the current directory
$allMigrationFiles = Get-ChildItem -Filter "*.sql" | Select-Object -ExpandProperty Name

# Determine which files to back up and remove
$filesToBackupAndRemove = $allMigrationFiles | Where-Object { $keptMigrations -notcontains $_ }

# Log the list of files that will be removed
"Files to be backed up and removed:" | Out-File -FilePath $logFile -Append
$filesToBackupAndRemove | ForEach-Object { "  - $_" | Out-File -FilePath $logFile -Append }

# Create a temporary directory for files to zip
$tempDir = Join-Path $backupDir "temp_$timestamp"
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files to temp directory
foreach ($file in $filesToBackupAndRemove) {
    Copy-Item $file -Destination $tempDir
    "Copied $file to temporary backup directory" | Out-File -FilePath $logFile -Append
}

# Create zip archive
$compressionLevel = [System.IO.Compression.CompressionLevel]::Optimal
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $backupArchive, $compressionLevel, $false)

# Remove temporary directory
Remove-Item -Recurse -Force $tempDir
"Created backup archive: $backupArchive" | Out-File -FilePath $logFile -Append

# Now remove the original files
$successCount = 0
$failCount = 0

foreach ($file in $filesToBackupAndRemove) {
    try {
        Remove-Item $file -Force
        "Removed original file: $file" | Out-File -FilePath $logFile -Append
        $successCount++
    }
    catch {
        "Failed to remove file: $file - $_" | Out-File -FilePath $logFile -Append
        $failCount++
    }
}

# Log summary
$summary = @"
Migration consolidation completed at $(Get-Date)
Files successfully processed: $successCount
Files failed to remove: $failCount
All processed files were backed up to the archive: $backupArchive
"@

$summary | Out-File -FilePath $logFile -Append
Write-Host $summary -ForegroundColor Green

# Update README.md to reflect the new migration structure
$readmePath = "README.md"
if (Test-Path $readmePath) {
    $readmeContent = Get-Content $readmePath -Raw
    
    # Add consolidation notice
    $consolidationNotice = @"

## Migration Consolidation

The migrations have been consolidated on $(Get-Date -Format "yyyy-MM-dd") to improve maintainability:

1. **20240901_1.0.0_core_system_setup.sql**: Core migration infrastructure and versioning system
2. **20240902_1.1.0_primary_schema.sql**: Primary database schema with core tables
3. **20240903_1.2.0_extensions_and_features.sql**: Extensions and advanced features
4. **20240920_1.3.0_core_content_tables.sql**: Content management system
5. **20240921_1.4.0_research_system.sql**: Research system functionality
6. **20240922_1.5.0_user_experience.sql**: User experience and onboarding
7. **20240923_1.6.0_performance_infrastructure.sql**: Caching and performance features
8. **20240924_1.7.0_operational_features.sql**: Data retention and sharding

Original migrations have been archived in the `consolidated_backups` directory.
"@
    
    $updatedReadme = $readmeContent + $consolidationNotice
    $updatedReadme | Out-File -FilePath $readmePath -Force
    
    "Updated README.md with consolidation notice" | Out-File -FilePath $logFile -Append
    Write-Host "Updated README.md with consolidation notice" -ForegroundColor Cyan
}

# Final message to explain to the user
Write-Host @"

===== MIGRATION CONSOLIDATION COMPLETE =====
The redundant migration files have been backed up and removed. 
They've been consolidated into the following main files:
1. 20240901_1.0.0_core_system_setup.sql - Core infrastructure
2. 20240902_1.1.0_primary_schema.sql - Primary schemas and tables
3. 20240903_1.2.0_extensions_and_features.sql - Advanced features
4. 20240920_1.3.0_core_content_tables.sql - Content management
5. 20240921_1.4.0_research_system.sql - Research system
6. 20240922_1.5.0_user_experience.sql - User experience
7. 20240923_1.6.0_performance_infrastructure.sql - Performance optimization
8. 20240924_1.7.0_operational_features.sql - Operational features

The backup archive is located at: $backupArchive
A log of this consolidation operation has been saved to: $logFile

To restore any files if needed, extract them from the backup archive.
"@ -ForegroundColor Magenta 