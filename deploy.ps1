Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "       Deploying Aetheris Platform to Vercel           " -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Authenticating and deploying to your Vercel account..." -ForegroundColor Green
Write-Host ""

Set-Location $PSScriptRoot

npx.cmd vercel@39.3.0
