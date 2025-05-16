# Supabase Migration Naming Standardization Script
# This script renames migration files to follow a consistent naming pattern

# Set up variables
$logFile = Join-Path $PSScriptRoot "naming_standardization.log"
"Migration naming standardization started at $(Get-Date)" | Out-File -FilePath $logFile
$renamedCount = 0

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

# Get all SQL files, excluding backups and templates
$sqlFiles = Get-ChildItem -Path $PSScriptRoot -Filter "*.sql" | Where-Object {
    -not $_.PSIsContainer -and
    -not $_.FullName.Contains("backup") -and
    -not $_.Name.StartsWith("template") -and
    -not $_.Name.EndsWith(".redundant.sql") -and
    -not $_.Name.EndsWith(".consolidated.sql")
}

Log-Message "Found $($sqlFiles.Count) migration files to process"

# Extract information for mapping log
$mappingContent = "Original Name,New Name`n"

# Process each file
foreach ($file in $sqlFiles) {
    $fileName = $file.Name
    $newName = $fileName
    $renamed = $false
    
    # Skip files that already follow the pattern: YYYYMMDD_Major.Minor.Patch_description.sql
    if ($fileName -match "^\d{8}_\d+\.\d+\.\d+_.*\.sql$") {
        Log-Message "File already follows standard naming convention: $fileName" "SUCCESS"
        continue
    }
    
    # Process sequential numbering format (0001_, 0002_, etc.)
    if ($fileName -match "^(\d{4})_(.*)\.sql$") {
        $sequence = $Matches[1]
        $description = $Matches[2]
        
        # Generate timestamp (use file creation date as base)
        $fileDate = $file.CreationTime
        $timestamp = Get-Date $fileDate -Format "yyyyMMdd"
        
        # Assign a sequential version number based on the sequence
        $sequenceNum = [int]$sequence
        $major = 1
        $minor = 0
        $patch = $sequenceNum
        
        $newName = "${timestamp}_${major}.${minor}.${patch}_${description}.sql"
        $renamed = $true
    }
    # Process other formats
    elseif ($fileName -match "^(\d+)_(.*)\.sql$") {
        $number = $Matches[1]
        $description = $Matches[2]
        
        # If it has a version in description, extract it
        if ($description -match "(\d+\.\d+\.\d+)_(.*)") {
            $version = $Matches[1]
            $description = $Matches[2]
        }
        else {
            # Assign default version
            $version = "1.0.0"
        }
        
        # Generate timestamp (use file creation date as base)
        $fileDate = $file.CreationTime
        $timestamp = Get-Date $fileDate -Format "yyyyMMdd"
        
        $newName = "${timestamp}_${version}_${description}.sql"
        $renamed = $true
    }
    # Process simple named files
    elseif ($fileName -match "^([^_]+)\.sql$" -and -not $fileName.StartsWith("fix-")) {
        $description = $Matches[1]
        
        # Generate timestamp (use file creation date as base)
        $fileDate = $file.CreationTime
        $timestamp = Get-Date $fileDate -Format "yyyyMMdd"
        
        # Assign default version
        $version = "1.0.0"
        
        $newName = "${timestamp}_${version}_${description}.sql"
        $renamed = $true
    }
    
    # Rename the file if needed
    if ($renamed) {
        $sourcePath = Join-Path $PSScriptRoot $fileName
        $destinationPath = Join-Path $PSScriptRoot $newName
        
        # Check if destination file already exists
        if (Test-Path $destinationPath) {
            $timestamp = Get-Date -Format "yyyyMMddHHmmss"
            $newName = $newName -replace "\.sql$", "_${timestamp}.sql"
            $destinationPath = Join-Path $PSScriptRoot $newName
        }
        
        try {
            Rename-Item -Path $sourcePath -NewName $newName
            Log-Message "Renamed: $fileName -> $newName" "SUCCESS"
            $renamedCount++
            
            # Add to mapping log
            $mappingContent += "$fileName,$newName`n"
        }
        catch {
            Log-Message "Failed to rename $fileName : $_" "ERROR"
        }
    }
}

# Save mapping file for reference
$mappingFile = Join-Path $PSScriptRoot "migration_filename_mapping.csv"
Set-Content -Path $mappingFile -Value $mappingContent
Log-Message "Created migration filename mapping file: $mappingFile" "INFO"

# Final summary
Log-Message "Migration naming standardization completed. Renamed $renamedCount files." "INFO"
Write-Host ""
Write-Host "Next step: Run ./repair-migration-history.ps1 to repair the migration history in the database" -ForegroundColor Yellow 