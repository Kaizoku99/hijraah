# PowerShell script to clean up redundant migration files after consolidation
# This should be run after the consolidation migrations have been applied to the database

# Define the list of migrations that have been consolidated
$consolidatedMigrations = @(
    "20240318000000_create_cases_tables.sql",
    "20240318000000_create_chat_tables.sql",
    "20240318000000_create_sessions.sql",
    "20240318000000_create_notifications.sql"
)

# Create a backup directory if it doesn't exist
$backupDir = "consolidated_backups"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Write-Host "Created backup directory: $backupDir" -ForegroundColor Green
}

# Get current datetime for backup filename
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$logFile = Join-Path $backupDir "migration_cleanup_$timestamp.log"

# Start logging
"Migration cleanup started at $(Get-Date)" | Out-File -FilePath $logFile

# Function to backup and remove a file
function Backup-And-Remove {
    param (
        [string]$filename
    )
    
    if (Test-Path $filename) {
        # Create backup
        $backupFile = Join-Path $backupDir "$filename.bak"
        Copy-Item $filename $backupFile
        
        # Log the backup
        "Backed up $filename to $backupFile" | Out-File -FilePath $logFile -Append
        Write-Host "Backed up $filename" -ForegroundColor Cyan
        
        # Remove original after successful backup
        Remove-Item $filename
        
        # Log the removal
        "Removed original file: $filename" | Out-File -FilePath $logFile -Append
        Write-Host "Removed $filename" -ForegroundColor Yellow
        
        return $true
    }
    else {
        # Log file not found
        "File not found: $filename" | Out-File -FilePath $logFile -Append
        Write-Host "File not found: $filename" -ForegroundColor Red
        return $false
    }
}

# Process each consolidated migration
$successCount = 0
$failCount = 0

foreach ($migration in $consolidatedMigrations) {
    Write-Host "Processing $migration..." -ForegroundColor Blue
    
    if (Backup-And-Remove $migration) {
        $successCount++
    }
    else {
        $failCount++
    }
}

# Log summary
$summary = @"
Migration cleanup completed at $(Get-Date)
Files successfully processed: $successCount
Files not found or failed: $failCount
All processed files were backed up to the '$backupDir' directory.
"@

$summary | Out-File -FilePath $logFile -Append
Write-Host $summary -ForegroundColor Green

# Final message to explain to the user
Write-Host @"

===== IMPORTANT INFORMATION =====
The redundant migration files have been backed up and removed. 
They've been consolidated into '20240901_0.3.0_consolidated_migrations.sql'.
The migration history in the database has been updated to mark these migrations as consolidated.

To restore any files if needed, check the backup directory: $backupDir
A log of this cleanup operation has been saved to: $logFile
"@ -ForegroundColor Magenta 