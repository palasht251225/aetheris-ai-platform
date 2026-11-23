@echo off
title Aetheris Test Suite
echo ========================================================
echo       Running Aetheris Automated Integration Tests
echo ========================================================
echo.
cd /d "%~dp0"
call npm.cmd run test:api
pause
