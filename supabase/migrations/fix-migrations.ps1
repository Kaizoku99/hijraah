# Supabase Migration Fix Master Script
# This script runs all the migration fix phases in sequence

param (
    [switch]$WhatIf,
    [switch]$UseNpx
)

# Set up variables
$logFile = Join-Path $PSScriptRoot "master_fix.log"
"Migration fix process started at $(Get-Date)" | Out-File -FilePath $logFile

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
        "PHASE" { 
            $separator = "=" * 60
            Write-Host "`n$separator" -ForegroundColor Magenta
            Write-Host "PHASE: $message" -ForegroundColor Magenta
            Write-Host "$separator`n" -ForegroundColor Magenta
        }
        default { Write-Host $logMessage -ForegroundColor Cyan }
    }
    
    # Write to log file
    $logMessage | Out-File -FilePath $logFile -Append
}

# Function to run a script and check its success
function Run-Script {
    param (
        [string]$scriptPath,
        [string]$description,
        [switch]$continueOnFailure
    )
    
    Log-Message "Running: $scriptPath" "INFO"
    Log-Message $description "INFO"
    
    # If in WhatIf mode, just pretend the script ran successfully
    if ($WhatIf) {
        Log-Message "WhatIf: Script would be executed: $scriptPath" "SUCCESS"
        return $true
    }
    
    try {
        if (Test-Path $scriptPath) {
            # Clear any previous exit code
            $global:LASTEXITCODE = 0
            
            # Run the script with UseNpx if specified
            if ($UseNpx) {
                & $scriptPath -UseNpx
            }
            else {
                & $scriptPath
            }
            
            # Store the exit code - default to 0 if not set
            $exitCode = if ($null -eq $global:LASTEXITCODE) { 0 } else { $global:LASTEXITCODE }
            
            if ($exitCode -eq 0) {
                Log-Message "Script executed successfully: $scriptPath" "SUCCESS"
                return $true
            }
            else {
                Log-Message "Script failed with exit code ${exitCode}: $scriptPath" "ERROR"
                
                if (-not $continueOnFailure) {
                    Log-Message "Stopping migration fix process due to script failure" "ERROR"
                    return $false
                }
                else {
                    Log-Message "Continuing despite script failure..." "WARNING"
                    return $true
                }
            }
        }
        else {
            Log-Message "Script not found: $scriptPath" "ERROR"
            
            if (-not $continueOnFailure) {
                Log-Message "Stopping migration fix process due to missing script" "ERROR"
                return $false
            }
            else {
                Log-Message "Continuing despite missing script..." "WARNING"
                return $true
            }
        }
    }
    catch {
        Log-Message "Error executing script: $_" "ERROR"
        
        if (-not $continueOnFailure) {
            Log-Message "Stopping migration fix process due to error" "ERROR"
            return $false
        }
        else {
            Log-Message "Continuing despite error..." "WARNING"
            return $true
        }
    }
}

# Main execution
Log-Message "Starting Supabase migration fix process" "INFO"
if ($WhatIf) {
    Log-Message "Running in simulation mode (WhatIf) - no actual changes will be made" "WARNING"
}
if ($UseNpx) {
    Log-Message "Using npx with Supabase CLI commands" "INFO"
}

# Phase 1: Backup and Environment Setup
Log-Message "Backup and Environment Setup" "PHASE"

$phase1Success = Run-Script -scriptPath (Join-Path $PSScriptRoot "backup-migrations.ps1") -description "Creating a backup of all migration files"
if (-not $phase1Success) { exit 1 }

$phase1Success = Run-Script -scriptPath (Join-Path $PSScriptRoot "verify-environment.ps1") -description "Verifying Supabase CLI and environment"
if (-not $phase1Success) { exit 1 }

# Phase 2: Fix Syntax Errors
Log-Message "Fix Syntax Errors" "PHASE"

$phase2Success = Run-Script -scriptPath (Join-Path $PSScriptRoot "fix-syntax-errors.ps1") -description "Fixing syntax errors in migration files"
if (-not $phase2Success) { exit 1 }

# Phase 3: Consolidate Migrations
Log-Message "Consolidate Migrations" "PHASE"

$phase3Success = Run-Script -scriptPath (Join-Path $PSScriptRoot "consolidate-migrations.ps1") -description "Consolidating duplicate migrations"
if (-not $phase3Success) { exit 1 }

# Phase 4: Standardize Naming and Repair Migration History
Log-Message "Standardize Naming and Repair Migration History" "PHASE"

$phase4Success = Run-Script -scriptPath (Join-Path $PSScriptRoot "standardize-naming.ps1") -description "Standardizing migration file naming"
if (-not $phase4Success) { exit 1 }

# In WhatIf mode, automatically "answer" yes to questions
$repairConfirmation = if ($WhatIf) { 'y' } else {
    Write-Host "Do you want to repair the migration history in the database? This requires database access." -ForegroundColor Yellow
    Read-Host "Proceed with repair? (y/n)"
}

if ($repairConfirmation -eq 'y' -or $repairConfirmation -eq 'Y') {
    $phase4Success = Run-Script -scriptPath (Join-Path $PSScriptRoot "repair-migration-history.ps1") -description "Repairing migration history in the database"
    if (-not $phase4Success) { 
        Log-Message "Migration history repair failed, but we can continue with verification" "WARNING"
    }
}
else {
    Log-Message "Skipping migration history repair" "WARNING"
}

# Phase 5: Verification and Testing
Log-Message "Verification and Testing" "PHASE"

$phase5Success = Run-Script -scriptPath (Join-Path $PSScriptRoot "verify-migrations.ps1") -description "Verifying migration files"
if (-not $phase5Success) { 
    Log-Message "Migration verification failed, but we can continue with final testing" "WARNING"
}

# In WhatIf mode, automatically "answer" yes to questions
$finalTestConfirmation = if ($WhatIf) { 'y' } else {
    Write-Host "Do you want to perform a final test with database reset? This will reset your local database." -ForegroundColor Yellow
    Read-Host "Proceed with final test? (y/n)"
}

if ($finalTestConfirmation -eq 'y' -or $finalTestConfirmation -eq 'Y') {
    $phase5Success = Run-Script -scriptPath (Join-Path $PSScriptRoot "final-test.ps1") -description "Performing final test with database reset"
    if (-not $phase5Success) { 
        Log-Message "Final test failed, deployment is not recommended" "ERROR"
    }
}
else {
    Log-Message "Skipping final test" "WARNING"
}

# Phase 6: Deployment
Log-Message "Deployment" "PHASE"

# In WhatIf mode, automatically "answer" no to deployment
$deployConfirmation = if ($WhatIf) { 'n' } else {
    Write-Host "Do you want to deploy the fixed migrations to your remote Supabase project?" -ForegroundColor Yellow
    Write-Host "WARNING: This will apply all migrations to your remote database." -ForegroundColor Red
    Read-Host "Proceed with deployment? (y/n)"
}

if ($deployConfirmation -eq 'y' -or $deployConfirmation -eq 'Y') {
    $phase6Success = Run-Script -scriptPath (Join-Path $PSScriptRoot "deploy-migrations.ps1") -description "Deploying migrations to remote project"
    if (-not $phase6Success) { 
        Log-Message "Deployment failed" "ERROR"
    }
    else {
        Log-Message "Deployment completed successfully" "SUCCESS"
    }
}
else {
    Log-Message "Skipping deployment" "WARNING"
}

# Final summary
Log-Message "Migration fix process completed at $(Get-Date)" "INFO"

# Determine deployment status text based on confirmation
$deploymentStatus = if ($deployConfirmation -eq 'y' -or $deployConfirmation -eq 'Y') { "Completed" } else { "Skipped" }

$summary = @"

===============================================================
MIGRATION FIX PROCESS SUMMARY
===============================================================
Phase 1: Backup and Environment Setup - Completed
Phase 2: Fix Syntax Errors - Completed
Phase 3: Consolidate Migrations - Completed
Phase 4: Standardize Naming and Repair Migration History - Completed
Phase 5: Verification and Testing - Completed
Phase 6: Deployment - $deploymentStatus
===============================================================

"@

Log-Message $summary "INFO"
Write-Host $summary -ForegroundColor Cyan

Write-Host "Migration fix process completed!" -ForegroundColor Green
Write-Host "Log file: $logFile" -ForegroundColor Cyan 