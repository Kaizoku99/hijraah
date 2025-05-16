# Supabase Migration Deployment Script
# This script deploys the fixed migration files to the remote Supabase project

# Set up variables
$logFile = Join-Path $PSScriptRoot "deployment.log"
"Migration deployment started at $(Get-Date)" | Out-File -FilePath $logFile

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

# Check if project is linked to Supabase
function Test-ProjectLinked {
    try {
        $status = & npx supabase status
        $projectRef = ($status | Select-String -Pattern "Project ref:\s+(\w+)").Matches.Groups[1].Value
        
        if ([string]::IsNullOrEmpty($projectRef)) {
            Log-Message "Project is not linked to any Supabase project" "ERROR"
            Log-Message "Please run 'npx supabase link --project-ref <your-project-ref>'" "INFO"
            return $false
        }
        
        Log-Message "Project is linked to Supabase project: $projectRef" "SUCCESS"
        return $true
    }
    catch {
        Log-Message "Error checking project link: $_" "ERROR"
        return $false
    }
}

# Push migrations to remote project
function Push-Migrations {
    Log-Message "Pushing migrations to remote project..." "INFO"
    
    # Check if we have projects
    try {
        $projectInfo = & npx supabase projects list
        if ($projectInfo -match "No projects found") {
            Log-Message "No projects found. Please make sure you're logged in with 'npx supabase login'" "ERROR"
            return $false
        }
        
        # Push migrations
        $result = Invoke-SupabaseCommand "npx supabase db push" "Pushing migrations to the remote project"
        
        if ($result) {
            Log-Message "Migrations pushed successfully" "SUCCESS"
            return $true
        }
        else {
            Log-Message "Failed to push migrations" "ERROR"
            return $false
        }
    }
    catch {
        Log-Message "Error pushing migrations: $_" "ERROR"
        return $false
    }
}

# Verify that migrations were applied correctly on remote
function Test-RemoteMigrations {
    Log-Message "Verifying migrations were applied correctly on remote..." "INFO"
    
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
    
    Log-Message "All migrations were applied successfully on remote" "SUCCESS"
    return $true
}

# Main execution
Log-Message "Starting migration deployment" "INFO"

# Check if project is linked
if (-not (Test-ProjectLinked)) {
    Log-Message "Project must be linked to a Supabase project before deployment" "ERROR"
    exit 1
}

# Ask for confirmation before proceeding
Write-Host ""
Write-Host "WARNING: This script will push migration changes to your remote Supabase project." -ForegroundColor Yellow
Write-Host "Make sure you have run all verification tests locally first." -ForegroundColor Yellow
Write-Host "It's recommended to have a backup of your remote database before proceeding." -ForegroundColor Yellow
Write-Host ""
$confirmation = Read-Host "Do you want to proceed with the migration deployment? (y/n)"

if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
    # Push migrations
    $pushResult = Push-Migrations
    
    if (-not $pushResult) {
        Log-Message "Migration push failed - aborting deployment" "ERROR"
        exit 1
    }
    
    # Verify remote migrations
    $verifyResult = Test-RemoteMigrations
    
    # Final summary
    if ($verifyResult) {
        Log-Message "DEPLOYMENT SUCCESSFUL: All migrations applied successfully to the remote project!" "SUCCESS"
        
        Write-Host ""
        Write-Host "=========================== SUCCESS ===========================" -ForegroundColor Green
        Write-Host "All migrations were successfully applied to the remote project." -ForegroundColor Green
        Write-Host "==============================================================" -ForegroundColor Green
    }
    else {
        Log-Message "DEPLOYMENT INCOMPLETE: Some migrations may not have been applied properly" "ERROR"
        
        Write-Host ""
        Write-Host "=========================== WARNING ===========================" -ForegroundColor Yellow
        Write-Host "Some migrations may not have been applied properly to the remote project." -ForegroundColor Yellow
        Write-Host "Please check the migration status with 'npx supabase migration list'" -ForegroundColor Yellow
        Write-Host "==============================================================" -ForegroundColor Yellow
    }
}
else {
    Log-Message "Deployment cancelled by user" "INFO"
    Write-Host "Deployment cancelled. No changes were made to your remote project." -ForegroundColor Yellow
} 