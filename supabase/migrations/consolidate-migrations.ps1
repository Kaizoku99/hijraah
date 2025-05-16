# Supabase Migration Consolidation Script
# This script identifies and consolidates duplicate migrations

# Set up variables
$timestamp = Get-Date -Format "yyyyMMdd"
$consolidatedVersion = "1.26.0"
$consolidatedFile = "${timestamp}_${consolidatedVersion}_consolidated_fixes.sql"
$logFile = Join-Path $PSScriptRoot "consolidation.log"
"Migration consolidation started at $(Get-Date)" | Out-File -FilePath $logFile

# Function to log messages
function Log-Message {
    param (
        [string]$message,
        [string]$type = "INFO"
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$type] $message"
    
    # Write to console with color
    switch ($type) {
        "ERROR" { Write-Host $logMessage -ForegroundColor Red }
        "WARNING" { Write-Host $logMessage -ForegroundColor Yellow }
        "SUCCESS" { Write-Host $logMessage -ForegroundColor Green }
        default { Write-Host $logMessage -ForegroundColor Cyan }
    }
    
    # Write to log file
    $logMessage | Out-File -FilePath $logFile -Append
}

# Identify duplicate migrations and fix files
function Find-DuplicateMigrations {
    # Group files by version pattern
    $versionGroups = @{}
    $fixFiles = @()
    
    # Get all SQL files
    $sqlFiles = Get-ChildItem -Path $PSScriptRoot -Filter "*.sql" | Where-Object {
        -not $_.PSIsContainer -and
        -not $_.FullName.Contains("backup") -and
        -not $_.Name.StartsWith("template") -and
        $_.Name -ne $consolidatedFile
    }
    
    foreach ($file in $sqlFiles) {
        $fileName = $file.Name
        
        # Identify fix files
        if ($fileName -match "_fix_|fixed_|fixes" -or $fileName -match "fix-.*\.sql") {
            $fixFiles += $file
            Log-Message "Identified fix file: $fileName"
            continue
        }
        
        # Extract version number
        if ($fileName -match "\d+\.\d+\.\d+") {
            $version = $Matches[0]
            
            if (-not $versionGroups.ContainsKey($version)) {
                $versionGroups[$version] = @()
            }
            
            $versionGroups[$version] += $file
        }
    }
    
    # Find duplicate versions
    $duplicates = $versionGroups.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }
    
    return @{
        Duplicates = $duplicates
        FixFiles   = $fixFiles
    }
}

# Create a consolidated migration file
function Create-ConsolidatedMigration {
    param (
        [hashtable]$migrationData
    )
    
    $duplicates = $migrationData.Duplicates
    $fixFiles = $migrationData.FixFiles
    
    # If no duplicates or fix files, no need to consolidate
    if ($duplicates.Count -eq 0 -and $fixFiles.Count -eq 0) {
        Log-Message "No duplicates or fix files found. No consolidation needed." "SUCCESS"
        return
    }
    
    Log-Message "Creating consolidated migration file: $consolidatedFile"
    
    # Create the header for the consolidated file
    $header = @"
-- Migration: $consolidatedFile
-- Description: Consolidated fixes and duplicate migrations resolution
-- Created: $(Get-Date)

-- Begin transaction for atomicity
BEGIN;

-- Register this migration
DO `$`$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'register_migration') THEN
        PERFORM migration_meta.register_migration(
            1, 26, 0,
            'Consolidated fixes and duplicate migrations resolution',
            '$consolidatedFile'
        );
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Failed to register migration metadata: %', SQLERRM;
END `$`$;

-- Log the start of the migration
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Starting consolidated fixes migration');

"@
    
    # Create the consolidated content
    $consolidatedContent = $header
    
    # Process duplicate migrations
    if ($duplicates.Count -gt 0) {
        $consolidatedContent += @"

-- =====================================================
-- 1. CONSOLIDATED DUPLICATE MIGRATIONS
-- =====================================================

"@
        
        foreach ($duplicate in $duplicates.GetEnumerator()) {
            $version = $duplicate.Key
            $files = $duplicate.Value
            
            $consolidatedContent += @"

-- -----------------------------------------------------
-- Consolidated version $version from the following files:
-- $($files | ForEach-Object { $_.Name } | Join-String -Separator "`n-- ")
-- -----------------------------------------------------

"@
            
            # Keep only the latest file's content
            $latestFile = $files | Sort-Object LastWriteTime -Descending | Select-Object -First 1
            $otherFiles = $files | Where-Object { $_.FullName -ne $latestFile.FullName }
            
            Log-Message "For version $version, keeping content from: $($latestFile.Name)" "INFO"
            
            $fileContent = Get-Content $latestFile.FullName -Raw
            
            # Remove BEGIN/COMMIT transaction markers and add to consolidated content
            $fileContent = $fileContent -replace "BEGIN;|COMMIT;", "-- Transaction markers removed during consolidation"
            $consolidatedContent += $fileContent + "`n`n"
            
            # Mark the other files as redundant
            foreach ($file in $otherFiles) {
                $backupFileName = $file.Name -replace "\.sql$", ".redundant.sql"
                Rename-Item -Path $file.FullName -NewName $backupFileName
                Log-Message "Marked as redundant: $($file.Name) -> $backupFileName" "WARNING"
            }
        }
    }
    
    # Process fix files
    if ($fixFiles.Count -gt 0) {
        $consolidatedContent += @"

-- =====================================================
-- 2. CONSOLIDATED FIX FILES
-- =====================================================

"@
        
        foreach ($file in $fixFiles) {
            $consolidatedContent += @"

-- -----------------------------------------------------
-- Consolidated from fix file: $($file.Name)
-- -----------------------------------------------------

"@
            
            $fileContent = Get-Content $file.FullName -Raw
            
            # Remove BEGIN/COMMIT transaction markers and add to consolidated content
            $fileContent = $fileContent -replace "BEGIN;|COMMIT;", "-- Transaction markers removed during consolidation"
            $consolidatedContent += $fileContent + "`n`n"
            
            # Mark the fix file as consolidated
            $backupFileName = $file.Name -replace "\.sql$", ".consolidated.sql"
            Rename-Item -Path $file.FullName -NewName $backupFileName
            Log-Message "Consolidated fix file: $($file.Name) -> $backupFileName" "INFO"
        }
    }
    
    # Add closing transaction
    $consolidatedContent += @"
-- Log the completion of the migration
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Completed consolidated fixes migration');

COMMIT;
"@
    
    # Write the consolidated file
    Set-Content -Path (Join-Path $PSScriptRoot $consolidatedFile) -Value $consolidatedContent
    Log-Message "Created consolidated migration file: $consolidatedFile" "SUCCESS"
}

# Main execution
Log-Message "Starting migration consolidation process"

$migrationData = Find-DuplicateMigrations
$duplicateCount = $migrationData.Duplicates.Count
$fixCount = $migrationData.FixFiles.Count

Log-Message "Found $duplicateCount duplicate migration versions and $fixCount fix files"

if ($duplicateCount -gt 0 -or $fixCount -gt 0) {
    Create-ConsolidatedMigration -migrationData $migrationData
    Log-Message "Consolidation completed successfully" "SUCCESS"
    
    Write-Host ""
    Write-Host "Next step: Run ./standardize-naming.ps1 to standardize migration file naming" -ForegroundColor Yellow
}
else {
    Log-Message "No duplicates or fix files found. Skipping consolidation." "SUCCESS"
    
    Write-Host ""
    Write-Host "No consolidation needed. You can proceed to the next step." -ForegroundColor Yellow
    Write-Host "Next step: Run ./standardize-naming.ps1 to standardize migration file naming" -ForegroundColor Yellow
} 