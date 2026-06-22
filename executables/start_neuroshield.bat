@echo off
title NeuroShield AI Launcher
echo Starting NeuroShield AI Services...
echo ===================================

echo Starting FastAPI Backend...
start "NeuroShield Backend" cmd /k "cd ../neuroshield/backend && ..\P1\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000"

echo Starting Next.js Frontend...
start "NeuroShield Frontend" cmd /k "cd ../neuroshield/frontend && npm run dev"

echo Waiting for services to initialize...
timeout /t 5 /nobreak > NUL

echo Opening dashboard in your default browser...
start http://localhost:3000

echo ===================================
echo NeuroShield AI is running!
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo ===================================
echo Keep the backend and frontend command windows open. Press any key to exit launcher wrapper.
pause
