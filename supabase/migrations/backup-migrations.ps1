# Supabase Migrations Backup Script
# This script creates a timestamped backup of all migration files

# Set up variables
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = "backup-$timestamp"
$fullBackupPath = Join-Path $PSScriptRoot $backupDir
$logFile = Join-Path $fullBackupPath "backup_log.txt"

# Create backup directory
Write-Host "Creating backup directory: $backupDir" -ForegroundColor Cyan
New-Item -ItemType Directory -Path $fullBackupPath | Out-Null

# Start logging
"Backup started at $(Get-Date)" | Out-File -FilePath $logFile

# Get all SQL files in the migrations directory
$sqlFiles = Get-ChildItem -Path $PSScriptRoot -Filter "*.sql" | Where-Object {
    -not $_.PSIsContainer -and 
    -not $_.Name.StartsWith("backup-") -and
    $_.Name -ne "backup-migrations.ps1"
}

"Found $($sqlFiles.Count) migration files to back up" | Out-File -FilePath $logFile -Append
Write-Host "Found $($sqlFiles.Count) migration files to back up" -ForegroundColor Green

# Copy each file to the backup directory
foreach ($file in $sqlFiles) {
    $destinationPath = Join-Path $fullBackupPath $file.Name
    Copy-Item -Path $file.FullName -Destination $destinationPath
    "Backed up: $($file.Name)" | Out-File -FilePath $logFile -Append
    Write-Host "Backed up: $($file.Name)" -ForegroundColor Green
}

# Create a metadata file with information about the backup
$metadataContent = @"
Supabase Migrations Backup
Created: $(Get-Date)
Number of files: $($sqlFiles.Count)
Backup directory: $fullBackupPath

Files:
$($sqlFiles | ForEach-Object { $_.Name }) 
"@

$metadataFile = Join-Path $fullBackupPath "backup_metadata.txt"
$metadataContent | Out-File -FilePath $metadataFile

# Complete
"Backup completed at $(Get-Date)" | Out-File -FilePath $logFile -Append
Write-Host "Backup completed successfully! Files saved to: $fullBackupPath" -ForegroundColor Cyan
Write-Host "You can now proceed with fixing migration issues." -ForegroundColor Yellow 