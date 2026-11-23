Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "       Starting Aetheris Next-Gen AI SaaS Platform     " -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Platform URL: http://localhost:3000" -ForegroundColor Green
Write-Host ""

Set-Location $PSScriptRoot

# Launch browser after 2 seconds
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3000"
} | Out-Null

npm.cmd run start
