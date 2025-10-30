@echo off
echo Stopping any running Python server...
taskkill /im python.exe /f >nul 2>&1

echo Closing Microsoft Edge...
taskkill /im msedge.exe /f >nul 2>&1

echo Waiting for processes to close...
timeout /t 1 /nobreak >nul

echo Starting Python HTTP Server on port 8000...
start /min python -m http.server 8000

echo Waiting for server to start...
timeout /t 3 /nobreak >nul

echo Opening browser with cache disabled...
start msedge -inprivate "http://localhost:8000/index.html?nocache=%random%"

echo.
echo Server is running. Press Ctrl+C in the Python window to stop.
echo Browser opened with cache disabled and random query parameter.