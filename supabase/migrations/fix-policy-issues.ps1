# Fix Policy Issues in Supabase
# This script detects and fixes all issues with admin function references
# Usage: ./fix-policy-issues.ps1

# Parameters
param (
    [string]$connectionString = "postgresql://postgres:postgres@localhost:54322/postgres"
)

# Initialize variables
$logFile = "policy_fix_log_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt"

function Write-ColorLog {
    param (
        [string]$message,
        [string]$level = "INFO"
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$level] $message"
    
    # Write to console with color
    switch ($level) {
        "ERROR" { Write-Host $logMessage -ForegroundColor Red }
        "WARNING" { Write-Host $logMessage -ForegroundColor Yellow }
        "SUCCESS" { Write-Host $logMessage -ForegroundColor Green }
        default { Write-Host $logMessage -ForegroundColor Cyan }
    }
    
    # Write to log file
    Add-Content -Path $logFile -Value $logMessage
}

# Initialize log file
"# Supabase Policy Fix Log - $(Get-Date)" | Out-File -FilePath $logFile
Write-ColorLog "Starting Supabase policy fixes script"

# Check connection
Write-ColorLog "Testing database connection..."
try {
    $testResult = psql -c "SELECT 1 as test;" $connectionString 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-ColorLog "Failed to connect to the database" "ERROR"
        Write-ColorLog "Connection string: $connectionString" "ERROR"
        exit 1
    }
    Write-ColorLog "Database connection successful" "SUCCESS"
}
catch {
    Write-ColorLog "Error connecting to database: $_" "ERROR"
    exit 1
}

# 1. Apply all the migration fixes
Write-ColorLog "Applying migration fixes in order..."

$fixMigrations = @(
    "20240933_1.12.0_storage_policies_fix.sql",
    "20240934_1.13.0_policy_syntax_fix.sql", 
    "20240935_1.14.0_fix_admin_column_references.sql"
)

$success = $true

foreach ($migration in $fixMigrations) {
    $migrationPath = Join-Path $PSScriptRoot $migration
    
    if (Test-Path $migrationPath) {
        Write-ColorLog "Applying migration: $migration"
        try {
            $result = psql -v ON_ERROR_STOP=1 -f $migrationPath $connectionString 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-ColorLog "Successfully applied migration: $migration" "SUCCESS"
            }
            else {
                Write-ColorLog "Failed to apply migration: $migration" "ERROR"
                Write-ColorLog "Error: $result" "ERROR"
                $success = $false
            }
        }
        catch {
            Write-ColorLog "Error applying migration $migration: $_" "ERROR"
            $success = $false
        }
    }
    else {
        Write-ColorLog "Migration file not found: $migrationPath" "WARNING"
    }
}

# 2. Verify is_admin function exists
Write-ColorLog "Verifying is_admin function exists..."

$checkFuncSql = "SELECT COUNT(*) FROM pg_proc WHERE proname = 'is_admin' AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');"
$funcExists = (psql -t -c $checkFuncSql $connectionString).Trim()

if ($funcExists -eq "0") {
    Write-ColorLog "is_admin function does not exist, creating it..." "WARNING"
    
    # Create function - avoiding $$ in the script by using a file
    $tempFuncFile = [System.IO.Path]::GetTempFileName()
    
    # Write the function definition to the temp file
    $functionDef = @"
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS \$\$
DECLARE
    is_admin_user BOOLEAN;
BEGIN
    -- Check if the current user has admin privileges
    SELECT p.is_admin INTO is_admin_user
    FROM public.profiles p
    WHERE p.id = auth.uid();
    
    -- Return false if no profile found or not admin
    RETURN COALESCE(is_admin_user, false);
END;
\$\$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.is_admin() IS 'Checks if the current user has admin privileges';
"@

    [System.IO.File]::WriteAllText($tempFuncFile, $functionDef)
    
    $result = psql -f $tempFuncFile $connectionString 2>&1
    Remove-Item -Path $tempFuncFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorLog "Successfully created is_admin function" "SUCCESS"
    }
    else {
        Write-ColorLog "Failed to create is_admin function: $result" "ERROR"
        $success = $false
    }
}
else {
    Write-ColorLog "is_admin function already exists" "SUCCESS"
}

# 3. Check for profiles table and is_admin column
Write-ColorLog "Checking profiles table and is_admin column..."

$checkProfilesSql = "SELECT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles');"
$profilesExist = (psql -t -c $checkProfilesSql $connectionString).Trim()

if ($profilesExist -eq "t") {
    $checkColumnSql = "SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'is_admin');"
    $columnExists = (psql -t -c $checkColumnSql $connectionString).Trim()
    
    if ($columnExists -eq "f") {
        Write-ColorLog "is_admin column does not exist in profiles table, adding it..." "WARNING"
        
        $addColumnSql = "ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;"
        $result = psql -c $addColumnSql $connectionString 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-ColorLog "Successfully added is_admin column to profiles table" "SUCCESS"
        }
        else {
            Write-ColorLog "Failed to add is_admin column: $result" "ERROR"
            $success = $false
        }
    }
    else {
        Write-ColorLog "is_admin column already exists in profiles table" "SUCCESS"
    }
}
else {
    Write-ColorLog "profiles table does not exist, migration should create it" "WARNING"
}

# Final summary
if ($success) {
    Write-ColorLog "All policy fixes have been applied successfully!" "SUCCESS"
}
else {
    Write-ColorLog "Some fixes failed. Please check the log for details." "WARNING"
}

Write-ColorLog "Script execution completed"
Write-ColorLog "Log file saved to: $logFile"

Write-Host "`nPress any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 