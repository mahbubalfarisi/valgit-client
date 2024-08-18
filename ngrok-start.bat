@echo off

REM Read configuration file
for /f "tokens=1,2 delims==" %%i in (config.txt) do (
    set "%%i=%%j"
)

REM Creating Tunnel
echo.
echo Generating HTTP Tunnel for Port %APP_PORT%...
echo ______________________________________________
echo.
C:/ngrok/ngrok.exe http %APP_PORT%
echo Generate HTTP Tunnel completed.