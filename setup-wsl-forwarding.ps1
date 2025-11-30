# WSL2 Port Forwarding Setup for ChessEye API
# Run this script as Administrator

Write-Host "Setting up WSL2 port forwarding for ChessEye API..." -ForegroundColor Green

# Get WSL2 IP address
$wslIp = (wsl hostname -I).Trim()
Write-Host "WSL2 IP Address: $wslIp" -ForegroundColor Cyan

# Get Windows external IP
$windowsIp = "10.0.0.4"
Write-Host "Windows External IP: $windowsIp" -ForegroundColor Cyan

# Remove existing port proxy rule if it exists
Write-Host "`nRemoving any existing port proxy rules..." -ForegroundColor Yellow
netsh interface portproxy delete v4tov4 listenport=8081 listenaddress=$windowsIp 2>$null

# Add new port proxy rule
Write-Host "Adding port proxy rule: $windowsIp`:8081 -> $wslIp`:8081" -ForegroundColor Yellow
netsh interface portproxy add v4tov4 listenport=8081 listenaddress=$windowsIp connectport=8081 connectaddress=$wslIp

# Add firewall rule if not exists
Write-Host "`nChecking firewall rules..." -ForegroundColor Yellow
$firewallRule = Get-NetFirewallRule -DisplayName "ChessEye API (Port 8081)" -ErrorAction SilentlyContinue
if (-not $firewallRule) {
    Write-Host "Adding firewall rule..." -ForegroundColor Yellow
    New-NetFirewallRule -DisplayName "ChessEye API (Port 8081)" -Direction Inbound -LocalPort 8081 -Protocol TCP -Action Allow -Profile Private,Public
} else {
    Write-Host "Firewall rule already exists" -ForegroundColor Green
}

# Show current port proxy rules
Write-Host "`nCurrent port proxy rules:" -ForegroundColor Cyan
netsh interface portproxy show v4tov4

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "Test from your phone browser: http://$windowsIp`:8081/health" -ForegroundColor Cyan
