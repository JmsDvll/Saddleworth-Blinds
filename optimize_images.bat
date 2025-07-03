@echo off
echo Saddleworth Blinds Image Optimization
echo =====================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

REM Install requirements if needed
echo Installing requirements...
pip install -r requirements.txt

echo.
echo Starting image optimization...
echo.

REM Run the optimization script
python optimize_images.py

echo.
echo Image optimization complete!
echo Check the 'images/optimized' folder for your new images.
echo.
pause 