# Verify Policy References Script (Version 2)
# This script checks all SQL files for incorrect policy references with more specific patterns

# Set up basic variables
$migrationDir = $PSScriptRoot
$logFile = Join-Path $migrationDir "policy_check_v2.log"
$issuesFound = 0

# Clear previous log file if exists
if (Test-Path $logFile) {
    Remove-Item $logFile -Force
}

# Initialize log
"POLICY REFERENCE CHECK V2 - $(Get-Date)" | Out-File -FilePath $logFile

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
    
    # Check for specific problematic patterns with more context
    # Look for CREATE POLICY statements on profiles table that use user_id = auth.uid()
    if ($content -match "CREATE\s+POLICY.*?ON\s+(?:public\.)?profiles.*?USING\s*\(.*?user_id\s*=\s*auth\.uid\(\)") {
        "[$fileName] Issue: Found policy on profiles table using 'user_id = auth.uid()' - should use 'id' instead of 'user_id'" | Out-File -FilePath $logFile -Append
        $fileIssues++
    }
    
    # Look for is_admin function that uses user_id = auth.uid()
    if ($content -match "CREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION\s+(?:public\.)?is_admin.*?WHERE\s+user_id\s*=\s*auth\.uid\(\)") {
        "[$fileName] Issue: Found is_admin function using 'user_id = auth.uid()' - should use 'id' instead of 'user_id'" | Out-File -FilePath $logFile -Append
        $fileIssues++
    }
    
    # Look for profiles table with user_id = auth.uid() AND is_admin
    if ($content -match "profiles.*?WHERE.*?user_id\s*=\s*auth\.uid\(\)\s+AND\s+is_admin") {
        "[$fileName] Issue: Found 'profiles WHERE user_id = auth.uid() AND is_admin' - should use 'id' instead of 'user_id'" | Out-File -FilePath $logFile -Append
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