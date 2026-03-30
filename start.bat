@echo off
echo Starting AI Placement Predictor...
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo Servers are starting up...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5174
echo.
echo Press any key to exit...
pause > nul