# Hosts File Fix for Supabase Connectivity
# This script adds the Supabase domain to your hosts file as a workaround

Write-Host "🔧 Adding Supabase domain to hosts file..." -ForegroundColor Green

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "⚠️  This script requires Administrator privileges" -ForegroundColor Yellow
    Write-Host "💡 Right-click PowerShell and 'Run as Administrator', then run this script again" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Alternative: Manually edit hosts file:" -ForegroundColor Yellow
    Write-Host "   1. Open Notepad as Administrator" -ForegroundColor White
    Write-Host "   2. Open: C:\Windows\System32\drivers\etc\hosts" -ForegroundColor White
    Write-Host "   3. Add this line at the end:" -ForegroundColor White
    Write-Host "      104.18.38.10 wlhnmeblyjbdjucwqqtv.supabase.co" -ForegroundColor Cyan
    Write-Host "   4. Save and restart your application" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

try {
    $HostsFile = "$env:SystemRoot\System32\drivers\etc\hosts"
    $SupabaseEntry = "104.18.38.10 wlhnmeblyjbdjucwqqtv.supabase.co"
    
    # Check if entry already exists
    $CurrentContent = Get-Content $HostsFile -ErrorAction SilentlyContinue
    
    if ($CurrentContent -contains $SupabaseEntry) {
        Write-Host "✅ Supabase entry already exists in hosts file" -ForegroundColor Green
    } else {
        # Add entry to hosts file
        Write-Host "📝 Adding entry to hosts file..." -ForegroundColor Yellow
        Add-Content -Path $HostsFile -Value "`n# Supabase DNS Fix - Added $(Get-Date)"
        Add-Content -Path $HostsFile -Value $SupabaseEntry
        Write-Host "✅ Successfully added to hosts file" -ForegroundColor Green
    }
    
    # Flush DNS cache
    Write-Host "🧹 Flushing DNS cache..." -ForegroundColor Yellow
    Clear-DnsClientCache
    
    # Test resolution
    Write-Host "🧪 Testing domain resolution..." -ForegroundColor Yellow
    $TestResult = Resolve-DnsName -Name "wlhnmeblyjbdjucwqqtv.supabase.co" -ErrorAction SilentlyContinue
    
    if ($TestResult) {
        Write-Host "✅ Hosts file fix successful! Domain now resolves." -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 You can now restart your development server:" -ForegroundColor Cyan
        Write-Host "   npm run dev" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "❌ Test failed. Please check hosts file manually." -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Error occurred: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 To remove this fix later:" -ForegroundColor Yellow
Write-Host "   Edit $HostsFile and remove the Supabase line" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
