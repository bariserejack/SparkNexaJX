# SparkNexaJX PWA - Auto Icon Generator
# Generates 9 PNG icon files automatically

param(
    [string]$ProjectPath = "C:\Users\UK USED\SparkNexaJX"
)

Write-Host "🎨 SparkNexaJX - Auto Icon Generator" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Create icons folder
$iconPath = Join-Path $ProjectPath "icons"
if (-not (Test-Path $iconPath)) {
    New-Item -ItemType Directory -Path $iconPath | Out-Null
    Write-Host "✅ Created /icons/ folder" -ForegroundColor Green
} else {
    Write-Host "✅ /icons/ folder already exists" -ForegroundColor Green
}

# Define icon sizes
$sizes = @(72, 96, 128, 144, 152, 192, 384, 512)
$colors = @{
    R = 99
    G = 102
    B = 241
}

Write-Host ""
Write-Host "Generating PNG icons..." -ForegroundColor Yellow

# Generate each icon size
foreach ($size in $sizes) {
    $filename = "icon-${size}x${size}.png"
    $filepath = Join-Path $iconPath $filename
    
    try {
        # Create bitmap
        $bitmap = New-Object System.Drawing.Bitmap($size, $size)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        
        # Fill background with white
        $graphics.Clear([System.Drawing.Color]::White)
        
        # Draw purple circle (SparkNexaJX brand color)
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($colors.R, $colors.G, $colors.B))
        $margin = [math]::Ceiling($size * 0.1)
        $circleSize = $size - (2 * $margin)
        $graphics.FillEllipse($brush, $margin, $margin, $circleSize, $circleSize)
        
        # Draw "S" text for SparkNexaJX
        $font = New-Object System.Drawing.Font("Arial", $size * 0.4, [System.Drawing.FontStyle]::Bold)
        $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        $stringFormat = New-Object System.Drawing.StringFormat
        $stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
        $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
        $rectangle = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
        $graphics.DrawString("S", $font, $textBrush, $rectangle, $stringFormat)
        
        # Save
        $bitmap.Save($filepath, [System.Drawing.Imaging.ImageFormat]::Png)
        $graphics.Dispose()
        $bitmap.Dispose()
        
        Write-Host "  ✅ $filename (${size}x${size})" -ForegroundColor Green
    }
    catch {
        Write-Host "  ❌ Failed to create $filename : $_" -ForegroundColor Red
    }
}

# Create maskable icon (same as 512x512)
$maskableFile = "icon-512x512-maskable.png"
$maskableFilepath = Join-Path $iconPath $maskableFile
if (Test-Path (Join-Path $iconPath "icon-512x512.png")) {
    Copy-Item (Join-Path $iconPath "icon-512x512.png") $maskableFilepath
    Write-Host "  ✅ $maskableFile (adaptive icon)" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ ICONS GENERATED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verify
$pngCount = (Get-ChildItem $iconPath -Filter "*.png" | Measure-Object).Count
Write-Host "📊 Total icons created: $pngCount/9" -ForegroundColor Yellow
Write-Host ""
Write-Host "Icons location:" -ForegroundColor White
Write-Host "$iconPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ready for deployment! 🚀" -ForegroundColor Green
