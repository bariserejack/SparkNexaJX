#!/usr/bin/env python3
"""SparkNexaJX - Auto Icon Generator
Generates 9 PNG icons for PWA deployment
"""

import os
import sys
from PIL import Image, ImageDraw

project_path = r"C:\Users\UK USED\SparkNexaJX"
icon_dir = os.path.join(project_path, "icons")

# Create icons folder
os.makedirs(icon_dir, exist_ok=True)

# Icon sizes
sizes = [72, 96, 128, 144, 152, 192, 384, 512]
brand_color = (99, 102, 241)  # Purple - SparkNexaJX brand
text_color = (255, 255, 255)   # White

print("Generating PNG icons for SparkNexaJX PWA...")
print()

for size in sizes:
    filename = f"icon-{size}x{size}.png"
    filepath = os.path.join(icon_dir, filename)
    
    try:
        # Create white background image
        img = Image.new('RGB', (size, size), 'white')
        draw = ImageDraw.Draw(img)
        
        # Draw purple circle
        margin = int(size * 0.1)
        circle_bbox = [
            margin,
            margin,
            size - margin,
            size - margin
        ]
        draw.ellipse(circle_bbox, fill=brand_color)
        
        # Draw "S" text
        try:
            from PIL import ImageFont
            font_size = int(size * 0.4)
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            font = ImageFont.load_default()
        
        # Center text
        text = "S"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size - text_width) // 2
        y = (size - text_height) // 2
        
        draw.text((x, y), text, font=font, fill=text_color)
        
        # Save
        img.save(filepath, 'PNG')
        print(f"✓ {filename}")
        
    except Exception as e:
        print(f"✗ {filename}: {e}")

# Create maskable icon
try:
    img_512 = Image.open(os.path.join(icon_dir, "icon-512x512.png"))
    img_512.save(os.path.join(icon_dir, "icon-512x512-maskable.png"), 'PNG')
    print(f"✓ icon-512x512-maskable.png")
except:
    pass

# Verify
icon_count = len([f for f in os.listdir(icon_dir) if f.endswith('.png')])
print()
print(f"Icons created: {icon_count}/9")
print(f"Location: {icon_dir}")
print()
print("Ready for deployment!")
