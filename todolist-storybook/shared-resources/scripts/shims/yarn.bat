@echo off
setlocal

:: [YARN SHIM] Entrypoint for executing Yarn using a local Node.js setup
set projectRoot=%~dp0\..\..\..\

:: Create logs folder if missing
if not exist "%projectRoot%\logs" (
    mkdir "%projectRoot%\logs"
)

:: Log usage
echo [YARN SHIM] Using local Yarn: %~dp0yarn-1.22.19.cjs
echo [YARN SHIM] Args: %*
echo [%DATE% %TIME%] yarn %* >> "%projectRoot%\logs\yarn-shim.log"

:: Intercept unsupported Yarn v1 command: yarn npm info ...
if "%1"=="npm" (
    if "%2"=="info" (
        shift
        shift
        set args=%*

        :: Silence known noisy queries
        if "%args%"=="storybook --fields version --json" (
            echo {}
            exit /b 0
        )

        :: Redirect to npm info
        echo [YARN SHIM] Redirecting to npm info npm info %args%
        npm info %args%
        exit /b 0
    )
)

:: Execute via node
node "%~dp0yarn-1.22.19.cjs" %*

:: Propagate exit code
exit /b %ERRORLEVEL%
