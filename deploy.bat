@echo off
title Aetheris Vercel Deployment
echo ========================================================
echo       Deploying Aetheris Platform to Vercel
echo ========================================================
echo.
echo If this is your first time, Vercel will ask you to
echo log in via GitHub or Email.
echo.
cd /d "%~dp0"
call npx.cmd vercel@39.3.0
pause
