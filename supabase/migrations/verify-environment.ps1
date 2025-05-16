# Supabase Environment Verification Script
# This script verifies that the Supabase CLI is installed and the project is linked

# Set up logging
$logFile = Join-Path $PSScriptRoot "environment_check.log"
"Environment check started at $(Get-Date)" | Out-File -FilePath $logFile

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

# Check if Supabase CLI is installed
Log-Message "Checking if Supabase CLI is installed..."
try {
    $supabaseVersion = & npx supabase --version
    Log-Message "Supabase CLI is installed: $supabaseVersion" "SUCCESS"
}
catch {
    Log-Message "Supabase CLI is not installed or not in PATH" "ERROR"
    Log-Message "Please install Supabase CLI: https://supabase.com/docs/guides/cli" "ERROR"
    exit 1
}

# Check if the project is linked to Supabase
Log-Message "Checking if project is linked to Supabase..."
try {
    $projectInfo = & npx supabase projects list
    if ($projectInfo -match "No projects found") {
        Log-Message "No Supabase projects found. Please create a project first." "WARNING"
        exit 0
    }
    
    Log-Message "Supabase projects found" "SUCCESS"
    
    # Check if this project is linked
    $linkInfo = & npx supabase status
    $projectRef = ($linkInfo | Select-String -Pattern "Project ref:\s+(\w+)").Matches.Groups[1].Value
    
    if ([string]::IsNullOrEmpty($projectRef)) {
        Log-Message "Project is not linked to any Supabase project" "WARNING"
        Log-Message "Please link your project using: npx supabase link --project-ref <your-project-ref>" "INFO"
        exit 0
    }
    else {
        Log-Message "Project is linked to Supabase project: $projectRef" "SUCCESS"
    }
}
catch {
    Log-Message "Error checking project link: $_" "ERROR"
    exit 1
}

# Check database connectivity
Log-Message "Checking database connectivity..."
try {
    $dbPing = & npx supabase db ping
    if ($dbPing -match "Connection error") {
        Log-Message "Database connectivity failed" "ERROR"
        exit 1
    }
    
    Log-Message "Database connectivity successful" "SUCCESS"
}
catch {
    Log-Message "Error connecting to database: $_" "ERROR"
    exit 1
}

Log-Message "Environment check completed" "SUCCESS"
exit 0 