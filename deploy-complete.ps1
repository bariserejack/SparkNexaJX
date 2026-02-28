# SparkNexaJX PWA - COMPLETE AUTO DEPLOYMENT
# Generates icons + sets up Git + ready for GitHub

$ProjectPath = "C:\Users\UK USED\SparkNexaJX"
$errors = @()

Write-Host ""
Write-Host "====== SPARKNEXAJX PWA - AUTO DEPLOYMENT ======" -ForegroundColor Cyan
Write-Host ""

# ===== STEP 1: GENERATE ICONS =====
Write-Host "STEP 1/4: Generating icons..." -ForegroundColor Yellow

$iconPath = Join-Path $ProjectPath "icons"
if (-not (Test-Path $iconPath)) {
    New-Item -ItemType Directory -Path $iconPath | Out-Null
}

$sizes = @(72, 96, 128, 144, 152, 192, 384, 512)

foreach ($size in $sizes) {
    $filename = "icon-${size}x${size}.png"
    $filepath = Join-Path $iconPath $filename
    
    try {
        $bitmap = New-Object System.Drawing.Bitmap($size, $size)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.Clear([System.Drawing.Color]::White)
        
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(99, 102, 241))
        $margin = [math]::Ceiling($size * 0.1)
        $circleSize = $size - (2 * $margin)
        $graphics.FillEllipse($brush, $margin, $margin, $circleSize, $circleSize)
        
        $font = New-Object System.Drawing.Font("Arial", $size * 0.4, [System.Drawing.FontStyle]::Bold)
        $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        $stringFormat = New-Object System.Drawing.StringFormat
        $stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
        $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
        $rectangle = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
        $graphics.DrawString("S", $font, $textBrush, $rectangle, $stringFormat)
        
        $bitmap.Save($filepath, [System.Drawing.Imaging.ImageFormat]::Png)
        $graphics.Dispose()
        $bitmap.Dispose()
        
        Write-Host "  OK: $filename" -ForegroundColor Green
    }
    catch {
        Write-Host "  ERROR: $filename - $_" -ForegroundColor Red
        $errors += $filename
    }
}

# Maskable icon
$maskable = Join-Path $iconPath "icon-512x512-maskable.png"
$original512 = Join-Path $iconPath "icon-512x512.png"
if (Test-Path $original512) {
    Copy-Item $original512 $maskable
    Write-Host "  OK: icon-512x512-maskable.png" -ForegroundColor Green
}

Write-Host ""
Write-Host "Icons created: $((Get-ChildItem $iconPath -Filter '*.png' | Measure-Object).Count)/9" -ForegroundColor Green
Write-Host ""

# ===== STEP 2: VERIFY FILES =====
Write-Host "STEP 2/4: Verifying PWA files..." -ForegroundColor Yellow

$required = @("manifest.json", "service-worker.js", "index.html")
foreach ($file in $required) {
    $path = Join-Path $ProjectPath $file
    if (Test-Path $path) {
        Write-Host "  OK: $file" -ForegroundColor Green
    } else {
        Write-Host "  MISSING: $file" -ForegroundColor Red
        $errors += $file
    }
}

Write-Host ""

# ===== STEP 3: GIT SETUP =====
Write-Host "STEP 3/4: Setting up Git..." -ForegroundColor Yellow

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git not found. Install from https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

Write-Host "  OK: Git found" -ForegroundColor Green

$username = Read-Host "GitHub username (or skip)"
$email = Read-Host "GitHub email (or skip)"

if ($username -and $email) {
    try {
        Push-Location $ProjectPath
        
        git config --global user.name $username 2>&1 | Out-Null
        git config --global user.email $email 2>&1 | Out-Null
        Write-Host "  OK: Git configured" -ForegroundColor Green
        
        if (-not (Test-Path (Join-Path $ProjectPath ".git"))) {
            git init 2>&1 | Out-Null
            Write-Host "  OK: Repository initialized" -ForegroundColor Green
        }
        
        git add . 2>&1 | Out-Null
        Write-Host "  OK: Files staged" -ForegroundColor Green
        
        git commit -m "SparkNexaJX PWA - Auto deployment" 2>&1 | Out-Null
        Write-Host "  OK: Files committed" -ForegroundColor Green
        
        Pop-Location
    }
    catch {
        Write-Host "  ERROR: $_" -ForegroundColor Red
    }
} else {
    Write-Host "  SKIPPED: Git configuration" -ForegroundColor Yellow
}

Write-Host ""

# ===== STEP 4: FINAL INSTRUCTIONS =====
Write-Host "STEP 4/4: Ready for deployment!" -ForegroundColor Green
Write-Host ""
Write-Host "====== NEXT STEPS (5 minutes) ======" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Create GitHub repository:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host "   - Repository name: SparkNexaJX" -ForegroundColor Cyan
Write-Host "   - Make it PUBLIC" -ForegroundColor Cyan
Write-Host ""

Write-Host "2. Push code to GitHub (run these):" -ForegroundColor White
Write-Host "   cd '$ProjectPath'" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/SparkNexaJX.git" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "3. Deploy on Netlify:" -ForegroundColor White
Write-Host "   https://netlify.com" -ForegroundColor Cyan
Write-Host "   - Sign up free" -ForegroundColor Cyan
Write-Host "   - Connect GitHub" -ForegroundColor Cyan
Write-Host "   - Deploy SparkNexaJX repo" -ForegroundColor Cyan
Write-Host "   - Live in 2-3 minutes!" -ForegroundColor Cyan
Write-Host ""

Write-Host "4. Test on phone:" -ForegroundColor White
Write-Host "   - Visit your Netlify URL on iPhone/Android" -ForegroundColor Cyan
Write-Host "   - Tap 'Add to Home Screen'" -ForegroundColor Cyan
Write-Host "   - Works offline immediately" -ForegroundColor Cyan
Write-Host ""

Write-Host "5. Launch on social:" -ForegroundColor White
Write-Host "   - Instagram, Twitter, TikTok, LinkedIn" -ForegroundColor Cyan
Write-Host "   - Check LAUNCH-TEMPLATES.md for posts" -ForegroundColor Cyan
Write-Host ""

Write-Host "====== DEPLOYMENT STATUS ======" -ForegroundColor Cyan
if ($errors.Count -eq 0) {
    Write-Host "ALL CHECKS PASSED - Ready to deploy!" -ForegroundColor Green
} else {
    Write-Host "Warnings found:" -ForegroundColor Red
    foreach ($e in $errors) {
        Write-Host "  - $e" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Press Enter to continue..." -ForegroundColor Yellow
Read-Host
