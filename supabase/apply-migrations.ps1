#!/usr/bin/env pwsh

# Script to apply the consolidated migration to a Supabase project
# Usage: ./apply-migrations.ps1 [remote|local]

param (
    [string]$target = "local"  # Default to local if not specified
)

$ErrorActionPreference = "Stop"
$consolidated_migration = "supabase/migrations/20250717000000_initial_schema.sql"

Write-Host "╔════════════════════════════════════════════════════╗"
Write-Host "║  Hijraah - Applying Consolidated Migration         ║"
Write-Host "╚════════════════════════════════════════════════════╝"
Write-Host "Target: $target"

# Make sure the consolidated migration file exists
if (-Not (Test-Path $consolidated_migration)) {
    Write-Host "Error: Consolidated migration file not found at $consolidated_migration" -ForegroundColor Red
    exit 1
}

if ($target -eq "local") {
    Write-Host "Applying consolidated migration to local Supabase instance..." -ForegroundColor Cyan
    
    # Start the local Supabase instance if not running
    Write-Host "Starting local Supabase..." -ForegroundColor Yellow
    supabase start
    
    # Apply the migration directly
    Write-Host "Applying consolidated migration..." -ForegroundColor Yellow
    $sql_content = Get-Content $consolidated_migration -Raw
    
    # Execute the SQL against the local Supabase instance
    echo $sql_content | supabase db execute
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Migration applied successfully!" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Failed to apply migration" -ForegroundColor Red
        exit 1
    }
}
elseif ($target -eq "remote") {
    Write-Host "Applying consolidated migration to remote Supabase project..." -ForegroundColor Cyan
    
    # Confirm with the user before proceeding
    $confirmation = Read-Host "This will apply the consolidated migration to your REMOTE Supabase project. Continue? (y/n)"
    if ($confirmation -ne "y") {
        Write-Host "Operation canceled." -ForegroundColor Yellow
        exit 0
    }
    
    # Apply the migration via the Supabase CLI
    Write-Host "Applying consolidated migration..." -ForegroundColor Yellow
    supabase db push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Migration applied successfully to remote project!" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Failed to apply migration to remote project" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "Invalid target: $target. Use 'local' or 'remote'." -ForegroundColor Red
    exit 1
}

Write-Host "Migration process completed." -ForegroundColor Green 