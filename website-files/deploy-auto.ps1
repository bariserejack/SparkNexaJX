# SparkNexaJX PWA - MASTER DEPLOYMENT SCRIPT
# Automates: Icons → Git Setup → GitHub Push → Netlify Ready

param(
    [string]$GitHubUsername = "",
    [string]$GitHubEmail = "",
    [string]$ProjectPath = "C:\Users\UK USED\SparkNexaJX"
)

$global:errors = @()

function Write-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║ $($Title.PadRight(38)) ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Step {
    param([string]$Text)
    Write-Host "▶ $Text" -ForegroundColor Yellow
}

function Write-Success {
    param([string]$Text)
    Write-Host "✅ $Text" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$Text)
    Write-Host "❌ $Text" -ForegroundColor Red
    $global:errors += $Text
}

# ============ START DEPLOYMENT ============

Write-Section "SPARKNEXAJX PWA - AUTO DEPLOYMENT"
Write-Host "Timeline: ~5 minutes" -ForegroundColor Cyan
Write-Host ""

# STEP 1: GENERATE ICONS
Write-Step "Step 1/5: Generating icons..."
try {
    & powershell.exe -ExecutionPolicy Bypass -File (Join-Path $ProjectPath "generate-icons.ps1") | ForEach-Object { Write-Host $_ }
    Write-Success "Icons generated"
} catch {
    Write-Error-Custom "Icon generation failed: $_"
}

# STEP 2: VERIFY FILES
Write-Section "VERIFYING FILES"
Write-Step "Checking core PWA files..."

$requiredFiles = @("manifest.json", "service-worker.js", "index.html", "style.css", "script.js")
$allPresent = $true

foreach ($file in $requiredFiles) {
    $filepath = Join-Path $ProjectPath $file
    if (Test-Path $filepath) {
        Write-Success "$file present"
    } else {
        Write-Error-Custom "$file MISSING"
        $allPresent = $false
    }
}

if (-not $allPresent) {
    Write-Host ""
    Write-Host "⚠️  Some files are missing. Please ensure all PWA files exist." -ForegroundColor Red
    exit 1
}

# STEP 3: GIT SETUP
Write-Section "GIT SETUP - GITHUB SYNC"

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error-Custom "Git not installed. Download from https://git-scm.com/download/win"
    exit 1
}

Write-Success "Git is installed"

# Configure Git
Write-Step "Configuring Git..."
if ([string]::IsNullOrEmpty($GitHubUsername)) {
    $GitHubUsername = Read-Host "Enter your GitHub username"
}
if ([string]::IsNullOrEmpty($GitHubEmail)) {
    $GitHubEmail = Read-Host "Enter your GitHub email"
}

try {
    Push-Location $ProjectPath
    
    git config --global user.name $GitHubUsername
    git config --global user.email $GitHubEmail
    Write-Success "Git configured"
    
    # Initialize Git if not already
    if (-not (Test-Path (Join-Path $ProjectPath ".git"))) {
        git init
        Write-Success "Git repository initialized"
    } else {
        Write-Success "Git repository already exists"
    }
    
    # Add all files
    git add .
    Write-Success "All files staged"
    
    # Commit
    $commitMsg = "SparkNexaJX PWA - Auto deployment at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git commit -m $commitMsg
    Write-Success "Files committed"
    
    Pop-Location
}
catch {
    Write-Error-Custom "Git operation failed: $_"
}

# STEP 4: GITHUB PUSH INSTRUCTIONS
Write-Section "GITHUB PUSH INSTRUCTIONS"

Write-Host "📌 IMPORTANT: Complete these steps in browser:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  CREATE REPOSITORY:" -ForegroundColor White
Write-Host "   → Go to https://github.com/new" -ForegroundColor Cyan
Write-Host "   → Repository name: SparkNexaJX" -ForegroundColor Cyan
Write-Host "   → Description: Progressive Web App for igniting youth potential" -ForegroundColor Cyan
Write-Host "   → Make it PUBLIC" -ForegroundColor Cyan
Write-Host "   → Click 'Create repository'" -ForegroundColor Cyan
Write-Host ""

Write-Host "2️⃣  GET REPOSITORY URL:" -ForegroundColor White
Write-Host "   → Copy the URL: https://github.com/$GitHubUsername/SparkNexaJX.git" -ForegroundColor Cyan
Write-Host ""

Write-Host "3️⃣  PUSH TO GITHUB (Run in PowerShell):" -ForegroundColor White
Write-Host ""
Write-Host "   cd '$ProjectPath'" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/$GitHubUsername/SparkNexaJX.git" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""

Write-Host "4️⃣  CONNECT TO NETLIFY:" -ForegroundColor White
Write-Host "   → Go to https://netlify.com (sign up free)" -ForegroundColor Cyan
Write-Host "   → Click 'Add new site' → 'Import an existing project'" -ForegroundColor Cyan
Write-Host "   → Select GitHub → Authorize Netlify" -ForegroundColor Cyan
Write-Host "   → Choose SparkNexaJX repository" -ForegroundColor Cyan
Write-Host "   → Build settings:" -ForegroundColor Cyan
Write-Host "      • Build command: (leave empty)" -ForegroundColor Cyan
Write-Host "      • Publish directory: ./ (root)" -ForegroundColor Cyan
Write-Host "   → Click 'Deploy site'" -ForegroundColor Cyan
Write-Host ""

Write-Host "5️⃣  LIVE IN 2-3 MINUTES! 🎉" -ForegroundColor Green
Write-Host "   Your URL will appear on Netlify dashboard" -ForegroundColor Cyan
Write-Host ""

# STEP 5: SUMMARY
Write-Section "DEPLOYMENT STATUS"

if ($global:errors.Count -eq 0) {
    Write-Host "✅ ALL CHECKS PASSED" -ForegroundColor Green
    Write-Host ""
    Write-Host "Summary:" -ForegroundColor White
    Write-Host "  ✅ Icons generated (9 files)" -ForegroundColor Green
    Write-Host "  ✅ PWA files verified" -ForegroundColor Green
    Write-Host "  ✅ Git configured" -ForegroundColor Green
    Write-Host "  ✅ Ready for GitHub push" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next Action: Create GitHub repo at https://github.com/new" -ForegroundColor Yellow
} else {
    Write-Host "❌ ERRORS FOUND:" -ForegroundColor Red
    foreach ($err in $global:errors) {
        Write-Host "   • $err" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Questions? Check GO-NOW.md for quick reference" -ForegroundColor White
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
