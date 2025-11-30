# Fix WSL2 Port Forwarding for ChessEye API
# Run this script as Administrator

Write-Host "Fixing WSL2 port forwarding..." -ForegroundColor Green

# Get WSL2 IP
Write-Host "Getting WSL2 IP address..." -ForegroundColor Yellow
$wslOutput = wsl -- ip addr show eth0
$ipLine = $wslOutput | Select-String "inet " | Select-Object -First 1
$wslIp = ($ipLine.ToString().Trim() -split '\s+')[1] -replace '/.*'
Write-Host "WSL2 IP: $wslIp" -ForegroundColor Cyan

# Windows external IP
$windowsIp = "10.0.0.4"
Write-Host "Windows IP: $windowsIp" -ForegroundColor Cyan

# Delete old rule
Write-Host "`nDeleting old port proxy rule..." -ForegroundColor Yellow
netsh interface portproxy delete v4tov4 listenport=8081 listenaddress=$windowsIp 2>$null

# Add correct rule
Write-Host "Adding new port proxy rule: $windowsIp`:8081 -> $wslIp`:8081" -ForegroundColor Yellow
netsh interface portproxy add v4tov4 listenport=8081 listenaddress=$windowsIp connectport=8081 connectaddress=$wslIp

# Show result
Write-Host "`nCurrent port proxy configuration:" -ForegroundColor Cyan
netsh interface portproxy show v4tov4

Write-Host "`n✅ Done! Test from phone browser: http://$windowsIp`:8081/health" -ForegroundColor Green
