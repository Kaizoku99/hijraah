# Run Migration Tests Script
# This script runs a series of tests on migrations before applying them

# Set up variables
$migrationDir = $PSScriptRoot
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$logFile = Join-Path $migrationDir "migration_test_$timestamp.log"

# Initialize log
"Migration Test Run - $timestamp" | Out-File -FilePath $logFile

# Write log and display message
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

# Step 1: Run syntax tests
Log-Message "STEP 1: Running migration syntax tests" "INFO"
$syntaxResult = & "$migrationDir\test-migrations.ps1"
if ($LASTEXITCODE -ne 0) {
    Log-Message "Syntax tests failed. Fix issues before proceeding." "ERROR"
    exit 1
}
else {
    Log-Message "Syntax tests passed successfully." "SUCCESS"
}

# Step 2: Check for policy reference issues
Log-Message "STEP 2: Checking for policy reference issues" "INFO"
try {
    & "$PSScriptRoot\verify-policy-references-v2.ps1"
    if ($LASTEXITCODE -ne 0) {
        Log-Message "❌ Policy reference check failed. Please fix the issues before proceeding." "ERROR"
        exit 1
    }
    Log-Message "✅ Policy reference check passed." "SUCCESS"
}
catch {
    Log-Message "❌ Error running policy reference check: $_" "ERROR"
    exit 1
}

# Step 3: Verify migration order
Log-Message "STEP 3: Verifying migration execution order" "INFO"

# Get migrations in order
$orderedMigrations = Get-ChildItem -Path $migrationDir -Filter "*.sql" | 
Where-Object { 
    $_.Name -ne "README.md" -and 
    -not $_.Name.StartsWith("template") -and
    -not $_.PSIsContainer
} | Sort-Object Name

Log-Message "Migration execution order:" "INFO"
foreach ($migration in $orderedMigrations) {
    Log-Message "  $($migration.Name)" "INFO"
}

# Step 4: Ask if user wants to apply migrations
Log-Message "All tests passed. Ready to apply migrations." "SUCCESS"
$applyMigrations = Read-Host "Do you want to apply the migrations now? (y/N)"

if ($applyMigrations.ToLower() -eq "y") {
    Log-Message "STEP 4: Applying migrations" "INFO"
    
    # Run the apply-migrations.ps1 script if it exists
    if (Test-Path "$migrationDir\apply-migrations.ps1") {
        $applyResult = & "$migrationDir\apply-migrations.ps1"
        if ($LASTEXITCODE -ne 0) {
            Log-Message "Migration application failed. Check the logs for details." "ERROR"
            exit 1
        }
        else {
            Log-Message "Migrations applied successfully." "SUCCESS"
        }
    }
    else {
        Log-Message "apply-migrations.ps1 script not found. Cannot apply migrations." "ERROR"
        exit 1
    }
}
else {
    Log-Message "Skipping migration application. Run apply-migrations.ps1 manually when ready." "INFO"
}

Log-Message "Migration test process completed. See $logFile for details." "SUCCESS" 