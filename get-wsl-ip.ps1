# Get WSL2 IP Address
$wslOutput = wsl -- ip addr show eth0
$ipLine = $wslOutput | Select-String "inet " | Select-Object -First 1
if ($ipLine) {
    # Extract IP from line like: "    inet 172.20.205.241/20 brd 172.20.207.255 scope global eth0"
    $ip = ($ipLine.ToString().Trim() -split '\s+')[1] -replace '/.*'
    Write-Output $ip
} else {
    Write-Error "Could not find WSL2 IP"
}
