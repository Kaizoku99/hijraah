# Test Migration Order Script
# This script helps verify that migrations can be applied in the correct order
# It's a simplified version of apply-migrations.ps1 focused on testing

# Parameters
param (
    [string]$connectionString = "postgresql://postgres:postgres@localhost:54322/postgres",
    [switch]$resetDb = $false,
    [switch]$testMode = $true
)

# Settings
$migrationDir = $PSScriptRoot
$logFile = Join-Path $migrationDir "migration_test_log_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"
$successCount = 0
$failCount = 0
$migrations = @()

# Initialize log
"Migration test started at $(Get-Date)" | Out-File -FilePath $logFile

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

function Get-MigrationFiles {
    # Get all SQL migration files and sort them by name (which should follow the versioning convention)
    Get-ChildItem -Path $migrationDir -Filter "*.sql" | Where-Object { 
        $_.Name -ne "README.md" -and 
        -not $_.Name.StartsWith("template") -and
        -not $_.PSIsContainer
    } | Sort-Object Name
}

function Test-Migrations {
    Log-Message "Starting migration test in DRY RUN mode" "INFO"
    
    # Get all migration files
    $migrationFiles = Get-MigrationFiles
    
    Log-Message "Found $($migrationFiles.Count) migration files to test" "INFO"
    
    # Parse each migration file to check for syntax errors
    foreach ($file in $migrationFiles) {
        Log-Message "Testing migration file: $($file.Name)" "INFO"
        
        # Read the content
        $content = Get-Content $file.FullName -Raw
        
        # Simple syntax check - look for obvious issues
        $errorFound = $false
        
        # Check for unmatched BEGIN/END blocks
        $beginCount = ([regex]::Matches($content, "\bBEGIN\b")).Count
        $endCount = ([regex]::Matches($content, "\bEND\b")).Count
        
        if ($beginCount -ne $endCount) {
            Log-Message "Syntax error in $($file.Name): Unmatched BEGIN/END blocks ($beginCount vs $endCount)" "ERROR"
            $errorFound = $true
            $failCount++
        }
        
        # Check for unmatched DO/END blocks
        $doCount = ([regex]::Matches($content, "\bDO\s+\$\$")).Count
        $endDollarCount = ([regex]::Matches($content, "\$\$\s*(;|LANGUAGE)")).Count
        
        if ($doCount -ne $endDollarCount) {
            Log-Message "Syntax error in $($file.Name): Unmatched DO $$ blocks ($doCount vs $endDollarCount)" "ERROR"
            $errorFound = $true
            $failCount++
        }
        
        # Check for common policy syntax errors
        if ($content -match "CREATE\s+POLICY.*WHERE\s+") {
            Log-Message "Possible syntax error in $($file.Name): Policies should use USING instead of WHERE" "WARNING"
        }
        
        # Check column references to ensure id vs user_id is used correctly
        if ($content -match "profiles.*user_id\s+=\s+auth\.uid\(\)") {
            Log-Message "Policy error in $($file.Name): Profiles table column reference should use id, not user_id" "ERROR"
            $errorFound = $true
            $failCount++
        }
        
        if (-not $errorFound) {
            Log-Message "Migration file passed initial syntax check: $($file.Name)" "SUCCESS"
            $successCount++
        }
    }
    
    # Print summary
    Log-Message "Migration test completed. Success: $successCount, Failed: $failCount" "INFO"
    
    if ($failCount -gt 0) {
        Log-Message "Migration test found issues. Please check the log file: $logFile" "ERROR"
        return $false
    }
    else {
        Log-Message "All migrations passed the syntax check." "SUCCESS"
        return $true
    }
}

# Main execution
Log-Message "Starting migration test in test mode" "INFO"
$testResult = Test-Migrations

if ($testResult) {
    # If you have a Supabase instance running, this would execute the migrations
    if (-not $testMode) {
        Log-Message "Tests passed! Would now execute migrations against the database..." "SUCCESS"
        # This is where you'd call apply-migrations.ps1 or run the migrations directly
    }
    else {
        Log-Message "Tests passed! Use apply-migrations.ps1 to apply these migrations to a real database." "SUCCESS"
    }
}
else {
    Log-Message "Tests failed. Please fix the issues before applying migrations." "ERROR"
}

# Return success/failure for any calling script
if ($failCount -gt 0) { exit 1 } else { exit 0 } 