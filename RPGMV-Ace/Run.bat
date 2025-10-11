taskkill /im python.exe /f >nul
start python -m http.server 8000
timeout /t 2 /nobreak >nul
start "" "http://localhost:8000/index.html"