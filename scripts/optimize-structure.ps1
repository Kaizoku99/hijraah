# Optimize Project Structure Script
# Created for Hijraah Project
# This script reorganizes the Next.js project structure for better organization

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$srcRoot = Join-Path $projectRoot "src"
$appRoot = Join-Path $srcRoot "app"
$backupDir = Join-Path $projectRoot "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

# Create backup directory
Write-Host "Creating backup directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $backupDir -Force

# Backup current structure
Write-Host "Backing up current structure..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $appRoot "*") -Destination $backupDir -Recurse -Force

# 1. Consolidate Component Structure
Write-Host "Consolidating component structure..." -ForegroundColor Green

# Create new component directories if they don't exist
$componentDirs = @(
    "_components/layouts",
    "_components/ui/atoms",
    "_components/ui/molecules",
    "_components/ui/organisms"
)

foreach ($dir in $componentDirs) {
    $path = Join-Path $appRoot $dir
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force
        Write-Host "Created directory: $dir" -ForegroundColor Cyan
    }
}

# Move DashboardLayout to layouts
$sourcePath = Join-Path $appRoot "_components/layout/DashboardLayout.tsx"
$destPath = Join-Path $appRoot "_components/layouts/DashboardLayout.tsx"
if (Test-Path $sourcePath) {
    Move-Item -Path $sourcePath -Destination $destPath -Force
    Write-Host "Moved DashboardLayout to layouts directory" -ForegroundColor Cyan
}

# 2. Consolidate Types
Write-Host "Consolidating types..." -ForegroundColor Green
$typesPath = Join-Path $appRoot "_types"
if (Test-Path (Join-Path $appRoot "types")) {
    Get-ChildItem -Path (Join-Path $appRoot "types") -Recurse | ForEach-Object {
        $destPath = $_.FullName.Replace((Join-Path $appRoot "types"), $typesPath)
        if (-not (Test-Path $destPath)) {
            Copy-Item -Path $_.FullName -Destination $destPath -Force
        }
    }
    Remove-Item -Path (Join-Path $appRoot "types") -Recurse -Force
    Write-Host "Consolidated types directories" -ForegroundColor Cyan
}

# 3. Consolidate Lib and Contexts
Write-Host "Consolidating lib and contexts..." -ForegroundColor Green
$directories = @{
    "lib" = "_lib"
    "contexts" = "_contexts"
}

foreach ($dir in $directories.GetEnumerator()) {
    $sourcePath = Join-Path $appRoot $dir.Key
    $destPath = Join-Path $appRoot $dir.Value
    if (Test-Path $sourcePath) {
        if (Test-Path $destPath) {
            Get-ChildItem -Path $sourcePath -Recurse | ForEach-Object {
                $newPath = $_.FullName.Replace($sourcePath, $destPath)
                if (-not (Test-Path $newPath)) {
                    Copy-Item -Path $_.FullName -Destination $newPath -Force
                }
            }
        } else {
            Move-Item -Path $sourcePath -Destination $destPath -Force
        }
        Remove-Item -Path $sourcePath -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Consolidated $($dir.Key) to $($dir.Value)" -ForegroundColor Cyan
    }
}

# 4. Move test files to __tests__
Write-Host "Moving test files to __tests__..." -ForegroundColor Green
$testFiles = @(
    "test_script.js",
    "security_tests.js",
    "new_test_example.js"
)

$testsDir = Join-Path $projectRoot "__tests__"
if (-not (Test-Path $testsDir)) {
    New-Item -ItemType Directory -Path $testsDir -Force
}

foreach ($file in $testFiles) {
    $sourcePath = Join-Path $projectRoot $file
    $destPath = Join-Path $testsDir $file
    if (Test-Path $sourcePath) {
        Move-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "Moved $file to __tests__ directory" -ForegroundColor Cyan
    }
}

# 5. Clean up duplicate components
Write-Host "Cleaning up duplicate components..." -ForegroundColor Green
$duplicateDirs = @(
    "_components/organisms/DashboardLayout.tsx",
    "_components/layout"
)

foreach ($dir in $duplicateDirs) {
    $path = Join-Path $appRoot $dir
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force
        Write-Host "Removed duplicate: $dir" -ForegroundColor Cyan
    }
}

Write-Host "`nProject structure optimization complete!" -ForegroundColor Green
Write-Host "Backup created at: $backupDir" -ForegroundColor Yellow
Write-Host "`nPlease verify the changes and test your application." -ForegroundColor Magenta 