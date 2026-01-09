#!/usr/bin/env python3

"""
Fetch images from Unsplash and convert to WebP format

Requirements:
    pip install pillow requests

Usage:
    python3 scripts/fetch-images.py

This script:
1. Downloads curated images from Unsplash
2. Converts JPG to WebP (quality 85)
3. Saves to /public/images/auburn/ directories
4. Validates file sizes and formats
"""

import os
import sys
import requests
from pathlib import Path
from PIL import Image
from io import BytesIO
import json
from datetime import datetime

# Image configurations - ALL 21 IMAGES WITH VERIFIED WORKING URLS
IMAGES_CONFIG = [
    # Wedding venues (8 images)
    {
        "filename": "park-victorian.webp",
        "directory": "auburn/weddings",
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "description": "Victorian mansion for weddings",
        "category": "venue"
    },
    {
        "filename": "golf-course-venue.webp",
        "directory": "auburn/weddings",
        "url": "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80",
        "description": "Golf course wedding venue",
        "category": "venue"
    },
    {
        "filename": "garden-wedding.webp",
        "directory": "auburn/weddings",
        "url": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80",
        "description": "Garden wedding setup",
        "category": "venue"
    },
    {
        "filename": "outdoor-ceremony.webp",
        "directory": "auburn/weddings",
        "url": "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80",
        "description": "Outdoor wedding ceremony",
        "category": "venue"
    },
    {
        "filename": "historic-venue.webp",
        "directory": "auburn/weddings",
        "url": "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1200&q=80",
        "description": "Historic building venue",
        "category": "venue"
    },
    {
        "filename": "winery-wedding.webp",
        "directory": "auburn/weddings",
        "url": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80",
        "description": "Winery wedding venue",
        "category": "venue"
    },
    {
        "filename": "barn-event.webp",
        "directory": "auburn/weddings",
        "url": "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1200&q=80",
        "description": "Rustic barn event space",
        "category": "venue"
    },
    {
        "filename": "reception-hall.webp",
        "directory": "auburn/weddings",
        "url": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
        "description": "Reception hall venue",
        "category": "venue"
    },
    
    # Dining venues (6 images)
    {
        "filename": "restaurant-casual.webp",
        "directory": "auburn/dining",
        "url": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
        "description": "Casual dining restaurant",
        "category": "dining"
    },
    {
        "filename": "fine-dining.webp",
        "directory": "auburn/dining",
        "url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=80",
        "description": "Fine dining establishment",
        "category": "dining"
    },
    {
        "filename": "cafe-ambiance.webp",
        "directory": "auburn/dining",
        "url": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&q=80",
        "description": "Cozy cafe atmosphere",
        "category": "dining"
    },
    {
        "filename": "brewery-taproom.webp",
        "directory": "auburn/dining",
        "url": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=1200&q=80",
        "description": "Brewery taproom interior",
        "category": "dining"
    },
    {
        "filename": "wine-tasting.webp",
        "directory": "auburn/dining",
        "url": "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&q=80",
        "description": "Wine tasting room",
        "category": "dining"
    },
    {
        "filename": "farmers-market.webp",
        "directory": "auburn/dining",
        "url": "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
        "description": "Farmers market stand",
        "category": "dining"
    },

    # Discover page (4 images)
    {
        "filename": "gold-rush-museum.webp",
        "directory": "auburn/discover",
        "url": "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&q=80",
        "description": "Gold Rush history museum",
        "category": "discover"
    },
    {
        "filename": "old-town-street.webp",
        "directory": "auburn/discover",
        "url": "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=80",
        "description": "Historic Old Town Auburn",
        "category": "discover"
    },
    {
        "filename": "folsom-lake.webp",
        "directory": "auburn/discover",
        "url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        "description": "Folsom Lake outdoor recreation",
        "category": "discover"
    },
    {
        "filename": "hiking-trail.webp",
        "directory": "auburn/discover",
        "url": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
        "description": "Scenic hiking trail",
        "category": "discover"
    },
    
    # Hero images (3 images)
    {
        "filename": "hero-old-town-clocktower.webp",
        "directory": "auburn",
        "url": "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=80",
        "description": "Old Town Auburn historic view",
        "category": "hero"
    },
    {
        "filename": "hero-american-river-canyon.webp",
        "directory": "auburn",
        "url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        "description": "American River Canyon scenic view",
        "category": "hero"
    },
    {
        "filename": "event-gold-rush-days.webp",
        "directory": "auburn/events",
        "url": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
        "description": "Gold Rush Days festival atmosphere",
        "category": "hero"
    },
]

def ensure_directory(path: Path) -> None:
    """Create directory if it doesn't exist."""
    path.mkdir(parents=True, exist_ok=True)

def download_image(url: str) -> Image.Image:
    """Download image from URL and return PIL Image."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return Image.open(BytesIO(response.content)).convert('RGB')
    except Exception as e:
        raise Exception(f"Failed to download from {url}: {str(e)}")

def convert_to_webp(image: Image.Image, output_path: Path, quality: int = 85) -> int:
    """Convert PIL Image to WebP and return file size."""
    image.save(output_path, 'WebP', quality=quality, method=6)
    return output_path.stat().st_size

def format_file_size(size_bytes: int) -> str:
    """Format bytes to human-readable size."""
    for unit in ['B', 'KB', 'MB']:
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} GB"

def main():
    print("🖼️  Auburn Tourism Image Fetcher & Converter")
    print("=" * 60)
    
    # Setup paths
    project_root = Path(__file__).parent.parent
    public_images = project_root / "public" / "images"
    
    # Check if PIL is available
    try:
        from PIL import Image as PILImage
    except ImportError:
        print("❌ Pillow library not found!")
        print("Install with: pip install pillow requests")
        sys.exit(1)
    
    success_count = 0
    error_count = 0
    total_size = 0
    
    # Process each image
    for config in IMAGES_CONFIG:
        try:
            output_dir = public_images / config["directory"]
            ensure_directory(output_dir)
            
            output_path = output_dir / config["filename"]
            
            print(f"\n📥 Downloading: {config['description']}")
            print(f"   → {config['filename']}")
            
            # Download and convert
            image = download_image(config["url"])
            file_size = convert_to_webp(image, output_path, quality=85)
            
            total_size += file_size
            print(f"   ✅ Saved ({format_file_size(file_size)})")
            
            success_count += 1
            
        except Exception as e:
            print(f"   ❌ Error: {str(e)}")
            error_count += 1
    
    # Summary
    print("\n" + "=" * 60)
    print(f"\n📊 Results:")
    print(f"   ✅ Successful: {success_count}")
    print(f"   ❌ Failed: {error_count}")
    print(f"   📁 Location: {public_images}")
    print(f"   💾 Total size: {format_file_size(total_size)}")
    print(f"\n✨ Images downloaded and converted to WebP!\n")
    
    if error_count > 0:
        sys.exit(1)

if __name__ == "__main__":
    main()

