@echo off
title Aetheris AI Platform Runner
echo ========================================================
echo       Starting Aetheris Next-Gen AI SaaS Platform
echo ========================================================
echo.
echo URL: http://localhost:3000
echo.
cd /d "%~dp0"
call npm.cmd run start
pause
