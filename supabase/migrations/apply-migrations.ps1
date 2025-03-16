# Apply Migrations PowerShell Script
# This script helps apply Supabase migrations in the correct order
# Usage: ./apply-migrations.ps1

# Parameters
param (
    [string]$connectionString = "",
    [switch]$resetDb = $false
)

# Settings
$migrationDir = $PSScriptRoot
$logFile = Join-Path $migrationDir "migration_log_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"
$successCount = 0
$failCount = 0
$migrations = @()

# Initialize log
"Migration execution started at $(Get-Date)" | Out-File -FilePath $logFile

# Helper Functions
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

function Test-DatabaseConnection {
    param (
        [string]$connString
    )
    
    try {
        $result = psql -c "SELECT 1 as connection_test;" $connString 2>&1
        return $result -match "connection_test"
    }
    catch {
        return $false
    }
}

function Get-Migrations {
    # Get all SQL migration files and sort them
    $allMigrations = Get-ChildItem -Path $migrationDir -Filter "*.sql" | Where-Object { 
        $_.Name -ne "README.md" -and 
        -not $_.Name.StartsWith("template") -and
        -not $_.PSIsContainer
    } | Sort-Object Name
    
    # Extract migration information
    $migrations = @()
    foreach ($migration in $allMigrations) {
        $match = $migration.Name -match '^(\d+)_?(.*?)\.sql$'
        if ($match) {
            $version = $Matches[1]
            $description = $Matches[2] -replace '_', ' '
            $migrations += [PSCustomObject]@{
                FilePath = $migration.FullName
                FileName = $migration.Name
                Version = $version
                Description = $description
            }
        }
    }
    
    return $migrations
}

function Initialize-MigrationTable {
    param (
        [string]$connString
    )
    
    $createTableSql = @"
CREATE TABLE IF NOT EXISTS _migration_history (
    id SERIAL PRIMARY KEY,
    version TEXT NOT NULL,
    name TEXT NOT NULL,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN NOT NULL,
    execution_time_ms INTEGER,
    log TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS migration_version_idx ON _migration_history(version);
"@
    
    try {
        $output = psql -c "$createTableSql" $connString 2>&1
        if ($LASTEXITCODE -eq 0) {
            Log-Message "Migration history table initialized successfully" "SUCCESS"
            return $true
        }
        else {
            Log-Message "Failed to initialize migration history table: $output" "ERROR"
            return $false
        }
    }
    catch {
        Log-Message "Error initializing migration history table: $_" "ERROR"
        return $false
    }
}

function Get-AppliedMigrations {
    param (
        [string]$connString
    )
    
    try {
        $output = psql -c "SELECT version FROM _migration_history WHERE success = true ORDER BY applied_at;" $connString 2>&1
        if ($LASTEXITCODE -eq 0) {
            return $output -split "`n" | Where-Object { $_ -match '^\d+$' }
        }
        else {
            Log-Message "Failed to get applied migrations: $output" "ERROR"
            return @()
        }
    }
    catch {
        Log-Message "Error getting applied migrations: $_" "ERROR"
        return @()
    }
}

function Apply-Migration {
    param (
        [PSCustomObject]$migration,
        [string]$connString
    )
    
    $startTime = Get-Date
    $migrationSql = Get-Content -Path $migration.FilePath -Raw
    
    # Log start of migration
    Log-Message "Applying migration: $($migration.FileName)" "INFO"
    
    # Apply the migration
    try {
        $tempLogFile = [System.IO.Path]::GetTempFileName()
        $output = psql -v ON_ERROR_STOP=1 -f $migration.FilePath $connString 2>&1 | Tee-Object -FilePath $tempLogFile
        $log = Get-Content -Path $tempLogFile -Raw
        Remove-Item -Path $tempLogFile
        
        $endTime = Get-Date
        $executionTime = [math]::Round(($endTime - $startTime).TotalMilliseconds)
        
        if ($LASTEXITCODE -eq 0) {
            # Register successful migration
            $escapedLog = $log -replace "'", "''" # Escape single quotes for SQL
            $recordSql = "INSERT INTO _migration_history (version, name, success, execution_time_ms, log) VALUES ('$($migration.Version)', '$($migration.Description)', true, $executionTime, '$escapedLog') ON CONFLICT (version) DO UPDATE SET applied_at = CURRENT_TIMESTAMP, success = true, execution_time_ms = $executionTime, log = '$escapedLog';"
            $recordOutput = psql -c "$recordSql" $connString 2>&1
            
            Log-Message "Migration $($migration.FileName) applied successfully (${executionTime}ms)" "SUCCESS"
            return $true
        }
        else {
            # Register failed migration
            $escapedLog = $log -replace "'", "''" # Escape single quotes for SQL
            $recordSql = "INSERT INTO _migration_history (version, name, success, execution_time_ms, log) VALUES ('$($migration.Version)', '$($migration.Description)', false, $executionTime, '$escapedLog') ON CONFLICT (version) DO UPDATE SET applied_at = CURRENT_TIMESTAMP, success = false, execution_time_ms = $executionTime, log = '$escapedLog';"
            $recordOutput = psql -c "$recordSql" $connString 2>&1
            
            Log-Message "Migration $($migration.FileName) failed: $output" "ERROR"
            return $false
        }
    }
    catch {
        $endTime = Get-Date
        $executionTime = [math]::Round(($endTime - $startTime).TotalMilliseconds)
        
        # Register failed migration
        $escapedLog = $_.Exception.Message -replace "'", "''" # Escape single quotes for SQL
        $recordSql = "INSERT INTO _migration_history (version, name, success, execution_time_ms, log) VALUES ('$($migration.Version)', '$($migration.Description)', false, $executionTime, '$escapedLog') ON CONFLICT (version) DO UPDATE SET applied_at = CURRENT_TIMESTAMP, success = false, execution_time_ms = $executionTime, log = '$escapedLog';"
        $recordOutput = psql -c "$recordSql" $connString 2>&1
        
        Log-Message "Error applying migration $($migration.FileName): $_" "ERROR"
        return $false
    }
}

function Reset-Database {
    param (
        [string]$connString
    )
    
    Log-Message "Resetting database..." "WARNING"
    
    # Drop all tables in public schema
    try {
        $dropTablesSql = @"
DO \$\$
DECLARE
    r RECORD;
BEGIN
    -- Disable triggers
    EXECUTE 'SET session_replication_role = replica';
    
    -- Drop tables in public schema
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
    
    -- Drop schemas (except public, auth, pg_*)
    FOR r IN (SELECT nspname FROM pg_namespace 
              WHERE nspname NOT LIKE 'pg_%' 
              AND nspname != 'public' 
              AND nspname != 'auth'
              AND nspname != 'information_schema') LOOP
        EXECUTE 'DROP SCHEMA IF EXISTS ' || quote_ident(r.nspname) || ' CASCADE';
    END LOOP;
    
    -- Reset the migration history table
    DROP TABLE IF EXISTS _migration_history;
    
    -- Reset triggers
    EXECUTE 'SET session_replication_role = DEFAULT';
END \$\$;
"@
        
        $output = psql -c "$dropTablesSql" $connString 2>&1
        if ($LASTEXITCODE -eq 0) {
            Log-Message "Database reset successful" "SUCCESS"
            return $true
        }
        else {
            Log-Message "Database reset failed: $output" "ERROR"
            return $false
        }
    }
    catch {
        Log-Message "Error resetting database: $_" "ERROR"
        return $false
    }
}

function Show-MigrationMenu {
    Clear-Host
    Write-Host "============================================" -ForegroundColor Blue
    Write-Host "      SUPABASE MIGRATION UTILITY MENU       " -ForegroundColor Blue
    Write-Host "============================================" -ForegroundColor Blue
    Write-Host
    Write-Host "1. Reset DB and Apply All Migrations" -ForegroundColor Yellow
    Write-Host "2. Apply Only New Migrations" -ForegroundColor Green
    Write-Host "3. Apply Specific Migration" -ForegroundColor Cyan
    Write-Host "4. Show Migration Status" -ForegroundColor Magenta
    Write-Host "5. Exit" -ForegroundColor Red
    Write-Host
    Write-Host "Enter your choice (1-5): " -ForegroundColor White -NoNewline
    
    $choice = Read-Host
    return $choice
}

function Show-MigrationStatus {
    param (
        [string]$connString,
        [array]$allMigrations
    )
    
    Clear-Host
    Write-Host "======================================================" -ForegroundColor Blue
    Write-Host "                MIGRATION STATUS                      " -ForegroundColor Blue
    Write-Host "======================================================" -ForegroundColor Blue
    Write-Host
    
    # Get applied migrations
    $appliedMigrations = Get-AppliedMigrations -connString $connString
    
    # Show status of each migration
    foreach ($migration in $allMigrations) {
        $isApplied = $appliedMigrations -contains $migration.Version
        $status = if ($isApplied) { "APPLIED" } else { "PENDING" }
        $color = if ($isApplied) { "Green" } else { "Yellow" }
        
        Write-Host "$($migration.Version): " -NoNewline
        Write-Host "$($migration.Description)" -NoNewline -ForegroundColor Cyan
        Write-Host " - " -NoNewline
        Write-Host "$status" -ForegroundColor $color
    }
    
    Write-Host
    Write-Host "Press any key to return to the menu..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

function Select-Migration {
    param (
        [array]$allMigrations
    )
    
    Clear-Host
    Write-Host "======================================================" -ForegroundColor Blue
    Write-Host "               SELECT MIGRATION TO APPLY              " -ForegroundColor Blue
    Write-Host "======================================================" -ForegroundColor Blue
    Write-Host
    
    # List all migrations
    for ($i = 0; $i -lt $allMigrations.Count; $i++) {
        Write-Host "$($i+1). $($allMigrations[$i].Version): $($allMigrations[$i].Description)" -ForegroundColor Cyan
    }
    
    Write-Host
    Write-Host "Enter the number of the migration to apply (1-$($allMigrations.Count)):" -NoNewline
    $selection = Read-Host
    
    # Validate input
    $migrationIndex = 0
    if ([int]::TryParse($selection, [ref]$migrationIndex) -and $migrationIndex -ge 1 -and $migrationIndex -le $allMigrations.Count) {
        return $allMigrations[$migrationIndex-1]
    }
    else {
        Write-Host "Invalid selection. Press any key to return..." -ForegroundColor Red
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        return $null
    }
}

# Main Execution
Clear-Host
Write-Host "Supabase Migration Utility" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Check for Supabase connection
if ([string]::IsNullOrEmpty($connectionString)) {
    $connectionString = $env:SUPABASE_CONNECTION_STRING
    
    if ([string]::IsNullOrEmpty($connectionString)) {
        # Check for default local connection
        $connectionString = "postgresql://postgres:postgres@localhost:54322/postgres"
    }
}

# Verify connection
Log-Message "Testing database connection..." "INFO"
if (-not (Test-DatabaseConnection -connString $connectionString)) {
    Log-Message "Cannot connect to the database. Please check your connection settings." "ERROR"
    Log-Message "Using connection string: $connectionString" "INFO"
    Log-Message "Migration process aborted." "ERROR"
    exit 1
}
Log-Message "Database connection successful" "SUCCESS"

# Get all migrations
$migrations = Get-Migrations
Log-Message "Found $($migrations.Count) migrations" "INFO"

# Main menu loop
$running = $true
while ($running) {
    $choice = Show-MigrationMenu
    
    switch ($choice) {
        "1" { # Reset and apply all
            Log-Message "Resetting database and applying all migrations" "WARNING"
            $confirmation = Read-Host "This will RESET your database and apply ALL migrations. Continue? (y/N)"
            if ($confirmation -eq "y" -or $confirmation -eq "Y") {
                if (Reset-Database -connString $connectionString) {
                    # Initialize migration table
                    Initialize-MigrationTable -connString $connectionString
                    
                    # Apply all migrations
                    $successCount = 0
                    $failCount = 0
                    foreach ($migration in $migrations) {
                        if (Apply-Migration -migration $migration -connString $connectionString) {
                            $successCount++
                        }
                        else {
                            $failCount++
                            # Ask if we should continue after failure
                            $continueAfterError = Read-Host "Migration failed. Continue with remaining migrations? (y/N)"
                            if ($continueAfterError -ne "y" -and $continueAfterError -ne "Y") {
                                break
                            }
                        }
                    }
                    
                    Log-Message "Migration completed: $successCount succeeded, $failCount failed" $(if ($failCount -eq 0) { "SUCCESS" } else { "WARNING" })
                }
            }
            else {
                Log-Message "Database reset canceled" "INFO"
            }
        }
        "2" { # Apply only new migrations
            Log-Message "Applying only new migrations" "INFO"
            
            # Initialize migration table if it doesn't exist
            Initialize-MigrationTable -connString $connectionString
            
            # Get applied migrations
            $appliedMigrations = Get-AppliedMigrations -connString $connectionString
            Log-Message "Found $($appliedMigrations.Count) previously applied migrations" "INFO"
            
            # Apply new migrations
            $successCount = 0
            $failCount = 0
            $newMigrations = $migrations | Where-Object { $appliedMigrations -notcontains $_.Version }
            
            if ($newMigrations.Count -eq 0) {
                Log-Message "No new migrations to apply" "INFO"
            }
            else {
                Log-Message "Found $($newMigrations.Count) new migrations to apply" "INFO"
                
                foreach ($migration in $newMigrations) {
                    if (Apply-Migration -migration $migration -connString $connectionString) {
                        $successCount++
                    }
                    else {
                        $failCount++
                        # Ask if we should continue after failure
                        $continueAfterError = Read-Host "Migration failed. Continue with remaining migrations? (y/N)"
                        if ($continueAfterError -ne "y" -and $continueAfterError -ne "Y") {
                            break
                        }
                    }
                }
                
                Log-Message "Migration completed: $successCount succeeded, $failCount failed" $(if ($failCount -eq 0) { "SUCCESS" } else { "WARNING" })
            }
        }
        "3" { # Apply specific migration
            # Initialize migration table if it doesn't exist
            Initialize-MigrationTable -connString $connectionString
            
            # Select migration
            $selectedMigration = Select-Migration -allMigrations $migrations
            
            if ($selectedMigration -ne $null) {
                Log-Message "Applying selected migration: $($selectedMigration.FileName)" "INFO"
                
                if (Apply-Migration -migration $selectedMigration -connString $connectionString) {
                    Log-Message "Migration applied successfully" "SUCCESS"
                }
                else {
                    Log-Message "Migration failed" "ERROR"
                }
            }
        }
        "4" { # Show migration status
            Show-MigrationStatus -connString $connectionString -allMigrations $migrations
        }
        "5" { # Exit
            $running = $false
            Log-Message "Exiting migration utility" "INFO"
        }
        default {
            Write-Host "Invalid option. Please try again." -ForegroundColor Red
            Start-Sleep -Seconds 1
        }
    }
}

Log-Message "Migration script completed at $(Get-Date)" "INFO"
Log-Message "Log saved to: $logFile" "INFO" 