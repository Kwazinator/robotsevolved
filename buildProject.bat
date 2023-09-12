@echo off

:: Navigate to the react-frontend directory and run the npm build command without waiting
cd C:\Users\kwasi\OneDrive\Documents\GitHub\robitz\react-frontend
start cmd /c npm run-script build

:: Wait for a few seconds to ensure the above process starts
timeout /T 30

:: Navigate to the robitz directory and run the flask run command
cd C:\Users\kwasi\OneDrive\Documents\GitHub\robitz
flask run

pause