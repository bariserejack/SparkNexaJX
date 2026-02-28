# SparkNexaJX PWA - Automated Deployment Script
# Run this script to deploy to Netlify

Write-Host "🚀 SparkNexaJX PWA - Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if icons folder exists
Write-Host "Step 1: Checking for icons folder..." -ForegroundColor Yellow
if (Test-Path ".\icons") {
    $iconCount = (Get-ChildItem ".\icons" -Filter "*.png" | Measure-Object).Count
    Write-Host "✅ Found $iconCount icon files in /icons/" -ForegroundColor Green
} else {
    Write-Host "⚠️  /icons/ folder not found!" -ForegroundColor Red
    Write-Host "   Create /icons/ folder and add icon PNG files before deploying" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Get icons from: https://realfavicongenerator.net" -ForegroundColor Cyan
    Write-Host ""
}

# Step 2: Check git status
Write-Host "Step 2: Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --short 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git repository found" -ForegroundColor Green
    if ($gitStatus) {
        Write-Host "   You have uncommitted changes:" -ForegroundColor Yellow
        Write-Host $gitStatus
    } else {
        Write-Host "   No uncommitted changes" -ForegroundColor Green
    }
} else {
    Write-Host "❌ Git repository not found!" -ForegroundColor Red
    Write-Host "   Initialize git with: git init" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Step 3: Commit changes
Write-Host "Step 3: Committing changes..." -ForegroundColor Yellow
$commitMessage = "Deploy SparkNexaJX PWA to production"
git add .
$commitResult = git commit -m $commitMessage 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Changes committed" -ForegroundColor Green
} else {
    Write-Host "⚠️  No new changes to commit (that's okay)" -ForegroundColor Yellow
}

Write-Host ""

# Step 4: Check remote
Write-Host "Step 4: Checking GitHub connection..." -ForegroundColor Yellow
$hasRemote = git config --get remote.origin.url 2>$null
if ($hasRemote) {
    Write-Host "✅ GitHub remote found: $hasRemote" -ForegroundColor Green
} else {
    Write-Host "❌ No GitHub remote found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   To add remote:" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/SparkNexaJX.git" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   Then push:" -ForegroundColor Yellow
    Write-Host "   git branch -M main" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

Write-Host ""

# Step 5: Push to GitHub
Write-Host "Step 5: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "   (This may take a minute...)" -ForegroundColor Gray

$pushResult = git push 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Push output: $pushResult" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Go to https://netlify.com" -ForegroundColor White
Write-Host "   (Sign in or create account with GitHub)" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Click 'New site from Git'" -ForegroundColor White
Write-Host ""
Write-Host "3️⃣  Select 'GitHub'" -ForegroundColor White
Write-Host ""
Write-Host "4️⃣  Find and select 'SparkNexaJX' repository" -ForegroundColor White
Write-Host ""
Write-Host "5️⃣  Keep default settings:" -ForegroundColor White
Write-Host "   • Branch: main" -ForegroundColor Gray
Write-Host "   • Build command: (leave empty)" -ForegroundColor Gray
Write-Host "   • Publish directory: . (or root)" -ForegroundColor Gray
Write-Host ""
Write-Host "6️⃣  Click 'Deploy site'" -ForegroundColor White
Write-Host ""
Write-Host "7️⃣  Wait 2-5 minutes for deployment" -ForegroundColor White
Write-Host ""
Write-Host "8️⃣  You'll get a URL like: https://sparknexajx-xxx.netlify.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🎉 Your app will be live in minutes!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
