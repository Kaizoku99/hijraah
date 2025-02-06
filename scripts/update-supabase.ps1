# Update Supabase Auth Helpers Script
$ErrorActionPreference = "Stop"
$projectRoot = $PWD.Path
$srcRoot = Join-Path $projectRoot "src"

# Install new package
Write-Host "Installing @supabase/ssr..." -ForegroundColor Yellow
npm uninstall @supabase/auth-helpers-nextjs
npm install @supabase/ssr

# Update imports in all TypeScript/JavaScript files
Write-Host "Updating imports..." -ForegroundColor Green
$files = Get-ChildItem -Path $srcRoot -Recurse -Include "*.ts","*.tsx","*.js","*.jsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Update imports
    $content = $content -replace "@supabase/auth-helpers-nextjs", "@supabase/ssr"
    
    # Update specific function names if needed
    $content = $content -replace "createClientComponentClient", "createBrowserClient"
    $content = $content -replace "createServerComponentClient", "createServerClient"
    
    # Save changes
    $content | Set-Content $file.FullName -NoNewline
    Write-Host "Updated imports in: $($file.Name)" -ForegroundColor Cyan
}

Write-Host "`nSupabase auth helpers have been updated!" -ForegroundColor Green
Write-Host "Please verify your application still works as expected." -ForegroundColor Yellow 