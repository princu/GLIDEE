@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Glide needs Node.js. Install Node.js, then reopen this launcher.
  pause
  exit /b 1
)
node server.cjs --open
pause
