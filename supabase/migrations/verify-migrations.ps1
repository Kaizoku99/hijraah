# Supabase Migration Verification Script
# This script thoroughly tests all migration files

# Set up variables
$logFile = Join-Path $PSScriptRoot "migration_verification.log"
"Migration verification started at $(Get-Date)" | Out-File -FilePath $logFile
$passedCount = 0
$failedCount = 0

# Function to log messages
function Log-Message {
    param (
        [string]$message,
        [string]$type = "INFO",
        [string]$file = ""
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = if ($file -ne "") { "[$timestamp] [$type] [$file] $message" } else { "[$timestamp] [$type] $message" }
    
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

# Get all SQL files, excluding backups, templates, and repair scripts
$sqlFiles = Get-ChildItem -Path $PSScriptRoot -Filter "*.sql" | Where-Object {
    -not $_.PSIsContainer -and
    -not $_.FullName.Contains("backup") -and
    -not $_.Name.StartsWith("template") -and
    -not $_.Name.StartsWith("migration_repair") -and
    -not $_.Name.EndsWith(".redundant.sql") -and
    -not $_.Name.EndsWith(".consolidated.sql")
} | Sort-Object Name

Log-Message "Found $($sqlFiles.Count) migration files to verify"

# Verify SQL syntax and balance of BEGIN/END blocks
function Test-SqlSyntax {
    param (
        [string]$filePath,
        [string]$fileName
    )
    
    $content = Get-Content $filePath -Raw
    $issues = @()
    
    # Check for balanced BEGIN/END blocks
    $beginCount = ([regex]::Matches($content, "\bBEGIN\b")).Count
    $endCount = ([regex]::Matches($content, "\bEND\b")).Count
    
    if ($beginCount -ne $endCount) {
        $issues += "Unbalanced BEGIN/END blocks ($beginCount vs $endCount)"
    }
    
    # Check for balanced DO $$ blocks
    $doCount = ([regex]::Matches($content, "\bDO\s+\$\$")).Count
    $endDollarCount = ([regex]::Matches($content, "\$\$\s*(;|LANGUAGE)")).Count
    
    if ($doCount -ne $endDollarCount) {
        $issues += "Unbalanced DO $$ blocks ($doCount vs $endDollarCount)"
    }
    
    # Check for policy references using user_id instead of id
    if ($content -match "profiles.*?WHERE.*?user_id\s*=\s*auth\.uid\(\)") {
        $issues += "Policy reference using 'user_id = auth.uid()' instead of 'id = auth.uid()'"
    }
    
    # Check for missing semicolons after statements
    $statements = $content -split ";" | Where-Object { $_.Trim() -ne "" }
    foreach ($stmt in $statements) {
        if ($stmt -match "CREATE\s+(OR\s+REPLACE\s+)?(TABLE|FUNCTION|POLICY|INDEX|TRIGGER).*?[^\s;]$") {
            $issues += "Possible missing semicolon after CREATE statement"
            break
        }
    }
    
    # Check for standard migration versioning
    $hasVersioning = $content -match "register_migration|migration_meta"
    if (-not $hasVersioning -and -not $fileName.StartsWith("0_")) {
        $issues += "Missing migration registration call (register_migration)"
    }
    
    # Check for missing transactions
    $hasTransaction = $beginCount -gt 0 -or ($content -match "BEGIN;")
    if (-not $hasTransaction -and -not $fileName.StartsWith("0_") -and -not $fileName.StartsWith("fix-")) {
        $issues += "Missing transaction block (BEGIN;...COMMIT;)"
    }
    
    return $issues
}

# Verify all migrations
foreach ($file in $sqlFiles) {
    $fileName = $file.Name
    Log-Message "Verifying file: $fileName" "INFO" $fileName
    
    $issues = Test-SqlSyntax -filePath $file.FullName -fileName $fileName
    
    if ($issues.Count -eq 0) {
        Log-Message "Passed all checks" "SUCCESS" $fileName
        $passedCount++
    }
    else {
        Log-Message "Found $($issues.Count) issues:" "ERROR" $fileName
        foreach ($issue in $issues) {
            Log-Message "  - $issue" "ERROR" $fileName
        }
        $failedCount++
    }
}

# Function to check database conflicts
function Test-DatabaseConflicts {
    try {
        # Check if we can connect to the database
        $dbPing = & npx supabase db ping
        if ($dbPing -match "Connection error") {
            Log-Message "Database connectivity failed - skipping database conflict check" "WARNING"
            return
        }
        
        # Query the schema_migrations table to check for conflicts
        $query = @"
SELECT version, COUNT(*) as count
FROM supabase_migrations.schema_migrations
GROUP BY version
HAVING COUNT(*) > 1
"@
        
        $result = & npx supabase db execute "$query" --csv
        
        if ($result -and $result.Count -gt 1) {
            # Skip the header line
            $conflicts = $result | Select-Object -Skip 1
            
            if ($conflicts.Count -gt 0) {
                Log-Message "Found migration conflicts in the database:" "ERROR"
                foreach ($conflict in $conflicts) {
                    $parts = $conflict.Split(',')
                    Log-Message "  - Version $($parts[0]) appears $($parts[1]) times" "ERROR"
                }
            }
            else {
                Log-Message "No migration conflicts found in the database" "SUCCESS"
            }
        }
        else {
            Log-Message "No migration conflicts found in the database" "SUCCESS"
        }
    }
    catch {
        Log-Message "Error checking database conflicts: $_" "ERROR"
    }
}

# Verify migration ordering
function Test-MigrationOrdering {
    Log-Message "Checking migration file ordering..."
    
    $versions = @()
    $orderingIssues = @()
    
    foreach ($file in $sqlFiles) {
        $fileName = $file.Name
        
        # Extract version from the filename
        if ($fileName -match "^\d{8}_(\d+\.\d+\.\d+)_.*\.sql$") {
            $version = $Matches[1]
            $semver = $version -split "\."
            if ($semver.Count -eq 3) {
                $versionObj = @{
                    FileName = $fileName
                    Version  = $version
                    Major    = [int]$semver[0]
                    Minor    = [int]$semver[1]
                    Patch    = [int]$semver[2]
                }
                $versions += $versionObj
            }
        }
    }
    
    # Sort versions by semantic versioning
    $sortedVersions = $versions | Sort-Object -Property Major, Minor, Patch
    
    # Check for ordering issues
    for ($i = 1; $i -lt $sortedVersions.Count; $i++) {
        $prev = $sortedVersions[$i - 1]
        $curr = $sortedVersions[$i]
        
        # Compare file order with version order
        $prevFileIndex = $sqlFiles.Name.IndexOf($prev.FileName)
        $currFileIndex = $sqlFiles.Name.IndexOf($curr.FileName)
        
        if ($prevFileIndex -gt $currFileIndex) {
            $issue = "Migration ordering issue: $($curr.FileName) (v$($curr.Version)) appears before $($prev.FileName) (v$($prev.Version))"
            $orderingIssues += $issue
            Log-Message $issue "WARNING"
        }
    }
    
    return $orderingIssues.Count -eq 0
}

# Run database-level tests
$dbConflicts = Test-DatabaseConflicts
$orderingOk = Test-MigrationOrdering

# Generate summary
$totalCount = $sqlFiles.Count
$summary = @"
===============================================================
MIGRATION VERIFICATION SUMMARY
===============================================================
Total migration files tested: $totalCount
Passed: $passedCount
Failed: $failedCount
"@

if ($null -ne $dbConflicts) {
    $conflictStatus = if ($dbConflicts) { "No conflicts found" } else { "CONFLICTS DETECTED" }
    $summary += "`nDatabase migration conflicts: $conflictStatus"
}

$orderingStatus = if ($orderingOk) { "Correct" } else { "ISSUES DETECTED" }
$summary += "`nMigration ordering: $orderingStatus"

$summary += "`n==============================================================="

# Output summary
Log-Message $summary "INFO"
Write-Host $summary -ForegroundColor Cyan

# Overall result
$success = ($failedCount -eq 0) -and ($dbConflicts -ne $false) -and $orderingOk

if ($success) {
    Write-Host "All migration verifications passed!" -ForegroundColor Green
    Write-Host "Next step: Run ./final-test.ps1 to execute a local database reset test" -ForegroundColor Yellow
}
else {
    Write-Host "Migration verification identified issues that need to be fixed." -ForegroundColor Red
    Write-Host "Review the log file for details: $logFile" -ForegroundColor Yellow
} 