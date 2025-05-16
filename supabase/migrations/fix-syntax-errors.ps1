# Supabase Migration Syntax Fix Script
# This script fixes common syntax errors in migration files

# Set up variables
$logFile = Join-Path $PSScriptRoot "syntax_fix.log"
"Syntax fix started at $(Get-Date)" | Out-File -FilePath $logFile
$fixCount = 0

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
        "FIXED" { Write-Host $logMessage -ForegroundColor Magenta }
        default { Write-Host $logMessage -ForegroundColor Cyan }
    }
    
    # Write to log file
    $logMessage | Out-File -FilePath $logFile -Append
}

# Get all SQL files in the migrations directory, excluding backup files
$sqlFiles = Get-ChildItem -Path $PSScriptRoot -Filter "*.sql" | Where-Object {
    -not $_.PSIsContainer -and
    -not $_.FullName.Contains("backup") -and
    -not $_.Name.StartsWith("fix-")
}

Log-Message "Found $($sqlFiles.Count) migration files to check"

# Process each file
foreach ($file in $sqlFiles) {
    $fileName = $file.Name
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    
    Log-Message "Processing file: $fileName" "INFO" $fileName
    
    # Fix 1: Balance BEGIN/END blocks
    $beginCount = ([regex]::Matches($content, "\bBEGIN\b")).Count
    $endCount = ([regex]::Matches($content, "\bEND\b")).Count
    
    if ($beginCount -ne $endCount) {
        Log-Message "Unbalanced BEGIN/END blocks ($beginCount vs $endCount)" "ERROR" $fileName
        
        # Add missing END statements
        if ($beginCount -gt $endCount) {
            $diff = $beginCount - $endCount
            $content += "`n`n-- Added by syntax fixer script`n"
            for ($i = 0; $i -lt $diff; $i++) {
                $content += "END;`n"
            }
            Log-Message "Added $diff missing END statements" "FIXED" $fileName
            $modified = $true
            $fixCount++
        }
        # Add missing BEGIN statements
        elseif ($endCount -gt $beginCount) {
            $diff = $endCount - $beginCount
            $content = "-- Added by syntax fixer script`n" + ("BEGIN;`n" * $diff) + $content
            Log-Message "Added $diff missing BEGIN statements" "FIXED" $fileName
            $modified = $true
            $fixCount++
        }
    }
    
    # Fix 2: Balance DO $$ blocks
    $doCount = ([regex]::Matches($content, "\bDO\s+\$\$")).Count
    $endDollarCount = ([regex]::Matches($content, "\$\$\s*(;|LANGUAGE)")).Count
    
    if ($doCount -ne $endDollarCount) {
        Log-Message "Unbalanced DO $$ blocks ($doCount vs $endDollarCount)" "ERROR" $fileName
        
        # Add missing $$ closing tags
        if ($doCount -gt $endDollarCount) {
            $diff = $doCount - $endDollarCount
            $content += "`n`n-- Added by syntax fixer script`n"
            for ($i = 0; $i -lt $diff; $i++) {
                $content += "$$ LANGUAGE plpgsql;`n"
            }
            Log-Message "Added $diff missing $$ closing tags" "FIXED" $fileName
            $modified = $true
            $fixCount++
        }
        # This case shouldn't happen, but handle it just in case
        elseif ($endDollarCount -gt $doCount) {
            Log-Message "More closing $$ than opening DO $$ - manual fix required" "WARNING" $fileName
        }
    }
    
    # Fix 3: Fix policy references (user_id vs id)
    if ($content -match "profiles.*?WHERE.*?user_id\s*=\s*auth\.uid\(\)") {
        $newContent = $content -replace "(profiles.*?WHERE.*?)user_id(\s*=\s*auth\.uid\(\))", '$1id$2'
        if ($newContent -ne $content) {
            $content = $newContent
            Log-Message "Fixed policy references: changed 'user_id = auth.uid()' to 'id = auth.uid()'" "FIXED" $fileName
            $modified = $true
            $fixCount++
        }
    }
    
    # Save the modified file
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Log-Message "Saved changes to $fileName" "SUCCESS" $fileName
    }
    else {
        Log-Message "No issues found in $fileName" "SUCCESS" $fileName
    }
}

# Print summary
Log-Message "Syntax fix completed. Fixed $fixCount issues." "INFO"
Write-Host ""
Write-Host "Next step: Run ./consolidate-migrations.ps1 to consolidate duplicate migrations" -ForegroundColor Yellow 