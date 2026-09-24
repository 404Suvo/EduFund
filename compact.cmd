@echo off
REM Compact compiler wrapper for Windows forwarding to WSL compact toolchain
wsl -d Ubuntu -- bash -c "export PATH=\"$HOME/.local/bin:$PATH\" && compact %*"
