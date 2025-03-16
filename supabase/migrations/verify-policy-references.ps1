# Verify Policy References Script
# This script checks all SQL files for incorrect policy references

# Set up basic variables
$migrationDir = $PSScriptRoot
$logFile = Join-Path $migrationDir "policy_check.log"
$issuesFound = 0

# Clear previous log file if exists
if (Test-Path $logFile) {
    Remove-Item $logFile -Force
}

# Initialize log
"POLICY REFERENCE CHECK - $(Get-Date)" | Out-File -FilePath $logFile

# Get all SQL files excluding backup directory
$sqlFiles = Get-ChildItem -Path $migrationDir -Filter "*.sql" -Recurse | 
Where-Object { 
    -not $_.PSIsContainer -and 
    -not $_.FullName.Contains("backup") 
}

"Found $($sqlFiles.Count) SQL files to check" | Out-File -FilePath $logFile -Append
Write-Host "Found $($sqlFiles.Count) SQL files to check" -ForegroundColor Cyan

# Check each file
foreach ($file in $sqlFiles) {
    $fileName = $file.Name
    $content = Get-Content $file.FullName -Raw
    
    $fileIssues = 0
    
    # Check for specific problematic patterns using simple string contains
    if ($content.Contains("profiles WHERE user_id = auth.uid()")) {
        "[$fileName] Issue: Found 'profiles WHERE user_id = auth.uid()' - should use 'id' instead of 'user_id'" | Out-File -FilePath $logFile -Append
        $fileIssues++
    }
    
    if ($content.Contains("user_id = auth.uid() AND is_admin")) {
        "[$fileName] Issue: Found 'user_id = auth.uid() AND is_admin' - should use 'id' instead of 'user_id'" | Out-File -FilePath $logFile -Append
        $fileIssues++
    }
    
    # More targeted checks
    if ($content.Contains("CREATE POLICY") -and $content.Contains("profiles") -and $content.Contains("user_id =")) {
        "[$fileName] Issue: Policy on profiles table may be using 'user_id =' instead of 'id ='" | Out-File -FilePath $logFile -Append
        $fileIssues++
    }
    
    # Report file status
    if ($fileIssues -gt 0) {
        Write-Host "Found $fileIssues issues in $fileName" -ForegroundColor Red
        $issuesFound += $fileIssues
    }
    else {
        Write-Host "No issues found in $fileName" -ForegroundColor Green
    }
}

# Print summary
"Total issues found: $issuesFound" | Out-File -FilePath $logFile -Append
if ($issuesFound -gt 0) {
    Write-Host "Completed with $issuesFound issues found. See $logFile for details." -ForegroundColor Red
    Write-Host "Please fix these issues before applying migrations." -ForegroundColor Yellow
}
else {
    Write-Host "No policy reference issues found!" -ForegroundColor Green
}

# Return success/failure for any calling script
if ($issuesFound -gt 0) { exit 1 } else { exit 0 }
