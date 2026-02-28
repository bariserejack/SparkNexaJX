# Download and install Git
$GitInstallerUrl = "https://github.com/git-for-windows/git/releases/download/v2.45.0.windows.1/Git-2.45.0-64-bit.exe"
$InstallerPath = "$env:TEMP\GitInstaller.exe"

Write-Host "Downloading Git..." -ForegroundColor Yellow
try {
    (New-Object System.Net.WebClient).DownloadFile($GitInstallerUrl, $InstallerPath)
    Write-Host "Installing Git..." -ForegroundColor Yellow
    & $InstallerPath /SILENT /COMPONENTS="icons,ext\reg\shellhere,assoc,assoc_sh"
    Write-Host "Git installed!" -ForegroundColor Green
} catch {
    Write-Host "Could not auto-install Git" -ForegroundColor Red
    Write-Host "Manual option: Download from https://git-scm.com/download/win" -ForegroundColor Yellow
}
