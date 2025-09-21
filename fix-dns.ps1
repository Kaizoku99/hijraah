# DNS Fix Script for Supabase Connectivity
# This script changes your DNS to Google Public DNS which resolves Supabase domains correctly

Write-Host "🔧 Fixing DNS Settings for Supabase Connectivity..." -ForegroundColor Green

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "⚠️  This script requires Administrator privileges" -ForegroundColor Yellow
    Write-Host "💡 Right-click PowerShell and 'Run as Administrator', then run this script again" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Alternative: Manually change DNS in Network Settings:" -ForegroundColor Yellow
    Write-Host "   1. Go to Network & Internet Settings" -ForegroundColor White
    Write-Host "   2. Change adapter options" -ForegroundColor White
    Write-Host "   3. Right-click your active connection → Properties" -ForegroundColor White
    Write-Host "   4. Select 'Internet Protocol Version 4 (TCP/IPv4)' → Properties" -ForegroundColor White
    Write-Host "   5. Select 'Use the following DNS server addresses'" -ForegroundColor White
    Write-Host "   6. Preferred DNS: 8.8.8.8" -ForegroundColor White
    Write-Host "   7. Alternate DNS: 8.8.4.4" -ForegroundColor White
    Write-Host "   8. Click OK and restart your application" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

try {
    # Get active network adapter
    $ActiveAdapter = Get-NetAdapter | Where-Object { $_.Status -eq "Up" -and $_.InterfaceDescription -notlike "*Loopback*" -and $_.InterfaceDescription -notlike "*VPN*" } | Select-Object -First 1
    
    if (-not $ActiveAdapter) {
        Write-Host "❌ Could not find active network adapter" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "🔍 Active adapter: $($ActiveAdapter.Name)" -ForegroundColor Cyan
    
    # Set Google Public DNS
    Write-Host "🌐 Setting DNS to Google Public DNS (8.8.8.8, 8.8.4.4)..." -ForegroundColor Yellow
    Set-DnsClientServerAddress -InterfaceAlias $ActiveAdapter.Name -ServerAddresses "8.8.8.8", "8.8.4.4"
    
    # Flush DNS cache
    Write-Host "🧹 Flushing DNS cache..." -ForegroundColor Yellow
    Clear-DnsClientCache
    
    # Test DNS resolution
    Write-Host "🧪 Testing DNS resolution..." -ForegroundColor Yellow
    $TestResult = Resolve-DnsName -Name "wlhnmeblyjbdjucwqqtv.supabase.co" -ErrorAction SilentlyContinue
    
    if ($TestResult) {
        Write-Host "✅ DNS fix successful! Supabase domain now resolves to: $($TestResult.IPAddress -join ', ')" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 You can now restart your development server:" -ForegroundColor Cyan
        Write-Host "   npm run dev" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "❌ DNS test failed. Please try manual configuration." -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Error occurred: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Please try manual DNS configuration instead." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Alternative Solutions if DNS change doesn't work:" -ForegroundColor Yellow
Write-Host "   1. Add to hosts file: 104.18.38.10 wlhnmeblyjbdjucwqqtv.supabase.co" -ForegroundColor White
Write-Host "   2. Use mobile hotspot temporarily" -ForegroundColor White
Write-Host "   3. Use VPN to bypass local DNS issues" -ForegroundColor White
Write-Host "   4. Contact network administrator if on corporate network" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
