# Supabase Final Migration Test Script
# This script performs a complete database reset and applies all migrations

# Set up variables
$logFile = Join-Path $PSScriptRoot "final_test.log"
"Final migration test started at $(Get-Date)" | Out-File -FilePath $logFile

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

# Function to execute Supabase CLI commands with proper error handling
function Invoke-SupabaseCommand {
    param (
        [string]$command,
        [string]$description,
        [switch]$captureOutput
    )
    
    Log-Message "Executing: $command" "INFO"
    Log-Message $description "INFO"
    
    try {
        if ($captureOutput) {
            $output = Invoke-Expression $command 2>&1
            return $output
        }
        else {
            Invoke-Expression $command
            if ($LASTEXITCODE -eq 0) {
                Log-Message "Command executed successfully" "SUCCESS"
                return $true
            }
            else {
                Log-Message "Command failed with exit code $LASTEXITCODE" "ERROR"
                return $false
            }
        }
    }
    catch {
        Log-Message "Error executing command: $_" "ERROR"
        return $false
    }
}

# Verify Supabase CLI is installed
function Test-SupabaseCli {
    try {
        $supabaseVersion = & npx supabase --version
        Log-Message "Supabase CLI is installed: $supabaseVersion" "SUCCESS"
        return $true
    }
    catch {
        Log-Message "Supabase CLI is not installed or not in PATH" "ERROR"
        Log-Message "Please install Supabase CLI: https://supabase.com/docs/guides/cli" "ERROR"
        return $false
    }
}

# Verify Supabase is running
function Test-SupabaseRunning {
    try {
        $status = & npx supabase status
        if ($status -match "Database status: online") {
            Log-Message "Supabase database is running" "SUCCESS"
            return $true
        }
        else {
            Log-Message "Supabase database is not running" "WARNING"
            return $false
        }
    }
    catch {
        Log-Message "Error checking Supabase status: $_" "ERROR"
        return $false
    }
}

# Start Supabase if not running
function Start-SupabaseIfNeeded {
    if (-not (Test-SupabaseRunning)) {
        Log-Message "Starting Supabase..." "INFO"
        $result = Invoke-SupabaseCommand "npx supabase start" "Starting Supabase local development environment"
        
        if ($result) {
            Log-Message "Supabase started successfully" "SUCCESS"
            return $true
        }
        else {
            Log-Message "Failed to start Supabase" "ERROR"
            return $false
        }
    }
    
    return $true
}

# Reset database and apply migrations
function Reset-Database {
    Log-Message "Checking database connectivity" "INFO"
    $dbUrl = & npx supabase db ping
    
    if ($dbUrl -match "Connection error") {
        Log-Message "Database connection failed" "ERROR"
        return $false
    }
    
    Log-Message "Resetting database and applying all migrations..." "INFO"
    
    $result = Invoke-SupabaseCommand "npx supabase db reset" "Resetting database and applying all migrations"
    
    if ($result) {
        Log-Message "Database reset completed successfully" "SUCCESS"
        return $true
    }
    else {
        Log-Message "Failed to reset database" "ERROR"
        return $false
    }
}

# Verify migrations were applied correctly
function Test-MigrationsApplied {
    Log-Message "Verifying migrations were applied correctly..." "INFO"
    
    $output = Invoke-SupabaseCommand "npx supabase migration list" "Listing applied migrations" -captureOutput
    
    # Check if there are any pending migrations
    if ($output -match "Pending migrations:") {
        Log-Message "Found pending migrations:" "ERROR"
        $foundPending = $false
        $isPending = $false
        
        foreach ($line in $output) {
            if ($line -match "Pending migrations:") {
                $isPending = $true
                $foundPending = $true
            }
            elseif ($isPending -and $line -match "\s+\d+_") {
                Log-Message "  - $line" "ERROR"
            }
        }
        
        if ($foundPending) {
            return $false
        }
    }
    
    Log-Message "All migrations were applied successfully" "SUCCESS"
    return $true
}

# Main execution
Log-Message "Starting final migration test" "INFO"

# Check prerequisites
if (-not (Test-SupabaseCli)) {
    Log-Message "Supabase CLI is required to run this test" "ERROR"
    exit 1
}

# Start Supabase if needed
if (-not (Start-SupabaseIfNeeded)) {
    Log-Message "Failed to start Supabase - cannot proceed with test" "ERROR"
    exit 1
}

# Ask for confirmation before proceeding
Write-Host ""
Write-Host "WARNING: This script will reset your local database and apply all migrations." -ForegroundColor Red
Write-Host "All data in your local database will be lost." -ForegroundColor Red
Write-Host "This script is intended to verify that all migrations can be applied cleanly from scratch." -ForegroundColor Yellow
Write-Host ""
$confirmation = Read-Host "Do you want to proceed with the database reset? (y/n)"

if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
    # Reset database and apply migrations
    $resetResult = Reset-Database
    
    if (-not $resetResult) {
        Log-Message "Database reset failed - cannot proceed with test" "ERROR"
        exit 1
    }
    
    # Verify migrations
    $migrationResult = Test-MigrationsApplied
    
    # Final summary
    if ($migrationResult) {
        Log-Message "FINAL TEST PASSED: All migrations applied successfully!" "SUCCESS"
        
        Write-Host ""
        Write-Host "=========================== SUCCESS ===========================" -ForegroundColor Green
        Write-Host "All migrations were applied successfully to a clean database." -ForegroundColor Green
        Write-Host "Your migration files are now in a consistent state." -ForegroundColor Green
        Write-Host "==============================================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Commit all changes to version control" -ForegroundColor Cyan
        Write-Host "2. Run 'supabase db push' to apply migrations to your linked project" -ForegroundColor Cyan
    }
    else {
        Log-Message "FINAL TEST FAILED: Some migrations could not be applied" "ERROR"
        
        Write-Host ""
        Write-Host "=========================== FAILURE ===========================" -ForegroundColor Red
        Write-Host "There were issues applying all migrations to a clean database." -ForegroundColor Red
        Write-Host "Review the log file for details: $logFile" -ForegroundColor Red
        Write-Host "==============================================================" -ForegroundColor Red
    }
}
else {
    Log-Message "Test cancelled by user" "INFO"
    Write-Host "Test cancelled. No changes were made to your database." -ForegroundColor Yellow
} 