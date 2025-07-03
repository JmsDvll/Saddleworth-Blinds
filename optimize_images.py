#!/usr/bin/env python3
"""
Image Optimization Script for Saddleworth Blinds Website
=========================================================

This script processes all images in the source folders and creates optimized web versions
matching the existing format: 400px, 800px, and 1600px versions in both JPG and WebP formats.

Requirements:
    pip install Pillow

Usage:
    python optimize_images.py
"""

import os
import sys
from PIL import Image, ImageOps
import re
from pathlib import Path

# Configuration
QUALITY_JPG = 85  # JPEG quality (1-100)
QUALITY_WEBP = 80  # WebP quality (1-100)
SIZES = [400, 800, 1600]  # Target widths
SOURCE_DIRS = [
    "images/UK-LL_2025_Roller-Photography_Web",
    "images/UK-LL_2025_Vertical-Photography_Web", 
    "images/UK_LL_Perfect-Fit-Next-Generation_HR",
    "images/UK-LL_2025_Allusion-Photography_Web",
    "images/LL_2022_Cellular_Pleated_Photography_Mail",
    "images/2023_Vision_Photography_Mail/2023_Vision_Photography_Mail",
    "images/LL_Urban_Shutters_Photography-LR/LR",
    "images/LL_Conservatory_Photography_HiRes_Mail",
    "images/2023_WeTransfer_Motorised_Photography_Mail"
]
OUTPUT_DIR = "images/optimized"

def smart_rename(filename):
    """Intelligently rename files based on content analysis"""
    name = os.path.splitext(filename)[0].lower()
    
    # Mapping of keywords to clean names
    mappings = {
        'zen_kiwi': 'roller-zen-kiwi',
        'kiwi': 'roller-zen-kiwi',
        'carnival_bubblegum': 'roller-carnival-bubblegum',
        'tropical_palm': 'roller-tropical-palm',
        'pop_white': 'roller-pop-white',
        'petal_white': 'roller-petal-white',
        'paradise_palm': 'roller-paradise-palm',
        'montego_mushroom': 'roller-montego-mushroom',
        'kaleidoscope': 'roller-kaleidoscope-colour',
        'fiji_sand': 'roller-fiji-sand',
        'birdsong': 'roller-birdsong-colour',
        'dunham_terracotta': 'roller-dunham-terracotta',
        'daisy_pink': 'roller-daisy-pink',
        'bugs_life': 'roller-bugs-life',
        
        'capri_concrete': 'vision-capri-concrete',
        'ferrara_anthracite': 'vision-ferrara-anthracite',
        'viale_mauve': 'vision-viale-mauve',
        'viale_linen': 'vision-viale-linen',
        'trento_beige': 'vision-trento-beige',
        'setosa_ivory': 'vision-setosa-ivory',
        'setosa_pewter': 'vision-setosa-pewter',
        'rimini_frost': 'vision-rimini-frost',
        'palermo_silver': 'vision-palermo-silver',
        'palermo_graphite': 'vision-palermo-graphite',
        'nola_grey': 'vision-nola-grey',
        'modina_storm': 'vision-modina-storm',
        'lusso_pebble': 'vision-lusso-pebble',
        'linoso_luna': 'vision-linoso-luna',
        'floreale_rosa': 'vision-floreale-rosa',
        'firenze_walnut': 'vision-firenze-walnut',
        
        'cotton_white': 'shutters-cotton-white',
        'arctic_white': 'shutters-arctic-white',
        'cotton_89mm': 'shutters-cotton-89mm',
        'cotton_63mm': 'shutters-cotton-63mm',
        
        'monet_flower': 'perfectfit-monet-flower',
        
        'starwood': 'venetian-starwood',
        'grey': 'vertical-grey'
    }
    
    # Check for direct matches
    for keyword, clean_name in mappings.items():
        if keyword in name:
            return clean_name
    
    # Extract product type and create basic name
    if 'roller' in name:
        return 'roller-blind-modern'
    elif 'vision' in name:
        return 'vision-blind-contemporary'
    elif 'shutters' in name:
        return 'shutters-white-classic'
    elif 'venetian' in name:
        return 'venetian-wood-natural'
    elif 'vertical' in name:
        return 'vertical-blind-grey'
    elif 'perfect' in name or 'fit' in name:
        return 'perfectfit-blind-white'
    elif 'conservatory' in name:
        return 'conservatory-vision'
    elif 'motorised' in name:
        return 'motorised-celeste'
    else:
        return 'blind-sample'

def optimize_image(input_path, output_base_name, sizes=SIZES):
    """Optimize a single image to multiple sizes and formats"""
    try:
        print(f"Processing: {input_path}")
        
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Auto-orient based on EXIF data
            img = ImageOps.exif_transpose(img)
            
            original_width, original_height = img.size
            print(f"  Original size: {original_width}x{original_height}")
            
            # Process each target size
            for target_width in sizes:
                if original_width < target_width:
                    print(f"  Skipping {target_width}px (original too small)")
                    continue
                
                # Calculate new height maintaining aspect ratio
                aspect_ratio = original_height / original_width
                target_height = int(target_width * aspect_ratio)
                
                # Resize image
                resized = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
                
                # Save as JPEG
                jpg_path = os.path.join(OUTPUT_DIR, f"{output_base_name}-{target_width}.jpg")
                resized.save(jpg_path, 'JPEG', quality=QUALITY_JPG, optimize=True)
                jpg_size = os.path.getsize(jpg_path) // 1024
                print(f"  Saved: {jpg_path} ({jpg_size}KB)")
                
                # Save as WebP
                webp_path = os.path.join(OUTPUT_DIR, f"{output_base_name}-{target_width}.webp")
                resized.save(webp_path, 'WebP', quality=QUALITY_WEBP, optimize=True)
                webp_size = os.path.getsize(webp_path) // 1024
                print(f"  Saved: {webp_path} ({webp_size}KB)")
                
    except Exception as e:
        print(f"  Error processing {input_path}: {str(e)}")

def process_directory(source_dir):
    """Process all images in a source directory"""
    if not os.path.exists(source_dir):
        print(f"Directory not found: {source_dir}")
        return
    
    print(f"\nProcessing directory: {source_dir}")
    image_extensions = {'.jpg', '.jpeg', '.png', '.tiff', '.tif', '.bmp'}
    
    processed_count = 0
    for root, dirs, files in os.walk(source_dir):
        # Skip __MACOSX directories
        dirs[:] = [d for d in dirs if not d.startswith('__MACOSX')]
        
        for file in files:
            if any(file.lower().endswith(ext) for ext in image_extensions):
                if not file.startswith('.'):  # Skip hidden files
                    input_path = os.path.join(root, file)
                    output_name = smart_rename(file)
                    optimize_image(input_path, output_name)
                    processed_count += 1
    
    print(f"Processed {processed_count} images from {source_dir}")

def main():
    """Main function to run the optimization process"""
    print("Saddleworth Blinds Image Optimization Script")
    print("=" * 50)
    
    # Check if PIL is available
    try:
        from PIL import Image
        print("✓ PIL (Pillow) is available")
    except ImportError:
        print("✗ PIL (Pillow) not found. Please install it:")
        print("  pip install Pillow")
        sys.exit(1)
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR}")
    
    # Process each source directory
    for source_dir in SOURCE_DIRS:
        if os.path.exists(source_dir):
            process_directory(source_dir)
        else:
            print(f"Skipping missing directory: {source_dir}")
    
    print(f"\n✓ Image optimization complete!")
    print(f"Check the '{OUTPUT_DIR}' folder for your optimized images.")

if __name__ == "__main__":
    main() 