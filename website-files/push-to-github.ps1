# SparkNexaJX - Git Push Script
# Run this after you create your GitHub repository

param(
    [string]$GitHubUsername = ""
)

$ProjectPath = "C:\Users\UK USED\SparkNexaJX"

if ([string]::IsNullOrEmpty($GitHubUsername)) {
    Write-Host ""
    Write-Host "Git Push to GitHub" -ForegroundColor Cyan
    Write-Host "==================" -ForegroundColor Cyan
    Write-Host ""
    $GitHubUsername = Read-Host "Enter your GitHub username"
}

if ([string]::IsNullOrEmpty($GitHubUsername)) {
    Write-Host "Username required!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Preparing to push to GitHub..." -ForegroundColor Yellow
Write-Host ""

try {
    cd $ProjectPath
    
    Write-Host "Initializing Git repository..." -ForegroundColor White
    git init
    
    Write-Host "Configuring Git..." -ForegroundColor White
    git config user.name $GitHubUsername
    git config user.email "$GitHubUsername@users.noreply.github.com"
    
    Write-Host "Staging all files..." -ForegroundColor White
    git add .
    
    Write-Host "Committing..." -ForegroundColor White
    git commit -m "SparkNexaJX PWA - Launch"
    
    Write-Host "Setting main branch..." -ForegroundColor White
    git branch -M main
    
    Write-Host "Adding remote..." -ForegroundColor White
    git remote add origin "https://github.com/$GitHubUsername/SparkNexaJX.git"
    
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Green
    Write-Host "Now run this command to push to GitHub:" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "git push -u origin main" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then deploy on Netlify:" -ForegroundColor Cyan
    Write-Host "https://netlify.com" -ForegroundColor Cyan
    Write-Host ""
}
catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
}
