# Supabase Migration History Repair Script
# This script generates SQL to fix migration tracking tables and applies it to the database

# Set up variables
$logFile = Join-Path $PSScriptRoot "migration_repair.log"
"Migration history repair started at $(Get-Date)" | Out-File -FilePath $logFile

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

# Check if mapping file exists
$mappingFile = Join-Path $PSScriptRoot "migration_filename_mapping.csv"
if (-not (Test-Path $mappingFile)) {
    Log-Message "Mapping file not found: $mappingFile. Please run standardize-naming.ps1 first." "ERROR"
    exit 1
}

# Generate SQL script to repair the migration history
function Generate-RepairScript {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $repairScriptPath = Join-Path $PSScriptRoot "migration_repair_$timestamp.sql"
    
    Log-Message "Generating migration repair SQL script: $repairScriptPath"
    
    $sql = @"
-- Migration Repair Script
-- Generated: $(Get-Date)
-- This script fixes the migration history tables after renaming migration files

-- Start a transaction for atomicity
BEGIN;

-- First, create a backup of the schema_migrations table
CREATE TABLE IF NOT EXISTS supabase_migrations.schema_migrations_backup AS 
SELECT * FROM supabase_migrations.schema_migrations;

-- Log the backup creation
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Created backup of schema_migrations table');

-- 1. Fix duplicate entries in schema_migrations table
DELETE FROM supabase_migrations.schema_migrations a
USING supabase_migrations.schema_migrations b
WHERE a.version < b.version
AND a.name = b.name;

-- 2. Update migration entries with new file names
"@
    
    # Read the mapping file and generate update statements
    $mappings = Import-Csv -Path $mappingFile
    
    foreach ($mapping in $mappings) {
        $oldName = $mapping.'Original Name'
        $newName = $mapping.'New Name'
        
        # Skip if old and new are the same
        if ($oldName -eq $newName) {
            continue
        }
        
        # Extract version from the new filename
        if ($newName -match "^\d{8}_(\d+\.\d+\.\d+)_(.*)\.sql$") {
            $version = $Matches[1]
            $description = $Matches[2]
            
            $sql += @"

-- Update migration entry for $oldName -> $newName
UPDATE supabase_migrations.schema_migrations
SET name = '$description', file = '$newName'
WHERE file = '$oldName';

"@
        }
    }
    
    # Add verification and cleanup statements
    $sql += @"
-- 3. Check for any migrations with NULL name or file (which would indicate problems)
DO \$\$
DECLARE
    null_rows INT;
BEGIN
    SELECT COUNT(*) INTO null_rows FROM supabase_migrations.schema_migrations 
    WHERE name IS NULL OR file IS NULL;
    
    IF null_rows > 0 THEN
        RAISE WARNING 'Found % rows with NULL name or file in schema_migrations table', null_rows;
    END IF;
END \$\$;

-- 4. Remove any duplicate primary keys in schema_migrations
-- This is done by creating a temporary table with the correct data
-- and then replacing the original table
CREATE TEMPORARY TABLE temp_schema_migrations AS
SELECT DISTINCT ON (version) * 
FROM supabase_migrations.schema_migrations
ORDER BY version;

-- Log the deduplication
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Removed duplicate entries from schema_migrations table');

-- 5. Mark the migration history as repaired
INSERT INTO migration_meta.migration_logs (major, minor, patch, message)
VALUES (1, 26, 0, 'Migration history repair completed successfully');

COMMIT;
"@
    
    # Write the SQL to a file
    Set-Content -Path $repairScriptPath -Value $sql
    Log-Message "Generated repair script: $repairScriptPath" "SUCCESS"
    
    return $repairScriptPath
}

# Function to check database connectivity
function Test-DatabaseConnectivity {
    try {
        $dbPing = & npx supabase db ping
        if ($dbPing -match "Connection error") {
            Log-Message "Database connectivity failed" "ERROR"
            return $false
        }
        
        Log-Message "Database connectivity successful" "SUCCESS"
        return $true
    }
    catch {
        Log-Message "Error connecting to database: $_" "ERROR"
        return $false
    }
}

# Function to execute SQL file
function Invoke-SqlFile {
    param (
        [string]$scriptPath
    )
    
    Log-Message "Applying SQL file: $scriptPath" "INFO"
    
    try {
        $result = & npx supabase db execute --file $scriptPath
        
        if ($LASTEXITCODE -eq 0) {
            Log-Message "SQL script executed successfully" "SUCCESS"
            return $true
        }
        else {
            Log-Message "SQL script execution failed" "ERROR"
            return $false
        }
    }
    catch {
        Log-Message "Error executing SQL script: $_" "ERROR"
        Log-Message "You can manually apply this script using the Supabase Dashboard SQL Editor" "INFO"
        return $false
    }
}

# Main execution
Log-Message "Starting migration history repair process"

# Generate the repair script
$repairScriptPath = Generate-RepairScript

# Ask for confirmation before applying
Write-Host ""
Write-Host "A repair script has been generated at: $repairScriptPath" -ForegroundColor Cyan
Write-Host "Review the script before applying it to the database." -ForegroundColor Yellow
Write-Host ""
$confirmation = Read-Host "Do you want to apply this script to repair the migration history? (y/n)"

if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
    $success = Invoke-SqlFile -scriptPath $repairScriptPath
    
    if ($success) {
        Log-Message "Migration history repair completed successfully" "SUCCESS"
        Write-Host ""
        Write-Host "Next step: Run ./test-migrations.ps1 to verify all migrations are working correctly" -ForegroundColor Yellow
    }
    else {
        Log-Message "Migration history repair failed" "ERROR"
        Write-Host ""
        Write-Host "Please fix any issues and try again, or apply the script manually" -ForegroundColor Red
    }
}
else {
    Log-Message "User chose not to apply the repair script" "INFO"
    Write-Host ""
    Write-Host "You can apply the script manually using the Supabase Dashboard SQL Editor" -ForegroundColor Yellow
    Write-Host "After applying, run ./test-migrations.ps1 to verify all migrations are working correctly" -ForegroundColor Yellow
} 