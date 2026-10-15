@echo off
setlocal

REM Usage: build_pdf.bat <input.html> [output.pdf]
REM Requires node_modules with playwright + pdf-lib

set "SCRIPT_DIR=%~dp0"

if "%~1"=="" (
    echo Usage: build_pdf.bat ^<input.html^> [output.pdf]
    echo.
    echo Example: build_pdf.bat my_presentation.html
    exit /b 1
)

node "%SCRIPT_DIR%build_pdf.mjs" %*
