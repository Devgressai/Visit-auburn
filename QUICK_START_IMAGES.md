# Quick Start: Adding More Images

Need to add more images to eliminate repetition in other sections? Here's how:

## Quick Commands

```bash
# 1. Activate virtual environment
cd /Users/george/Visit-Auburn
source .venv/bin/activate

# 2. Edit the image config (add your images)
nano scripts/fetch-images.py

# 3. Run the script
python3 scripts/fetch-images.py

# 4. Verify images downloaded
ls -lh public/images/auburn/[category]/

# 5. Update image mappings
nano data/auburnImages.ts

# 6. Test locally
npm run dev
# Visit: http://localhost:3000
```

## Adding New Images

### Step 1: Find Images on Unsplash
1. Go to https://unsplash.com
2. Search for relevant terms (e.g., "historic building", "museum", "downtown street")
3. Copy the image URL (click "Copy Image URL" or right-click → Copy Image Address)
4. Use the format: `https://images.unsplash.com/photo-XXXXX?w=1200&q=80`

### Step 2: Add to fetch-images.py
```python
{
    "filename": "your-image-name.webp",
    "directory": "auburn/[category]",  # outdoor, historic, dining, etc.
    "url": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
    "description": "Description of the image",
    "category": "category-name"
},
```

### Step 3: Update auburnImages.ts
```typescript
// In specificImageMappings object:
'your-attraction-id': '/images/auburn/[category]/your-image-name.webp',
```

## Categories Available

- `auburn/outdoor/` - Trails, parks, outdoor activities
- `auburn/historic/` - Museums, historic sites
- `auburn/dining/` - Restaurants, breweries, wineries
- `auburn/weddings/` - Venues, events
- `auburn/discover/` - General discovery images
- `auburn/events/` - Festivals, events
- `auburn/` - Hero images

## Example: Adding a Historic Site Image

```python
# In scripts/fetch-images.py, add to IMAGES_CONFIG:
{
    "filename": "placer-courthouse.webp",
    "directory": "auburn/historic",
    "url": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200&q=80",
    "description": "Historic courthouse building",
    "category": "historic"
},
```

```typescript
// In data/auburnImages.ts, add to specificImageMappings:
'historic-placer-courthouse': '/images/auburn/historic/placer-courthouse.webp',
```

## Troubleshooting

### Images not downloading?
```bash
# Check internet connection
ping unsplash.com

# Verify virtual environment is active
which python3  # Should show .venv path

# Reinstall dependencies
pip install -r scripts/requirements.txt
```

### Images not showing on site?
```bash
# Check file exists
ls -lh public/images/auburn/[category]/[filename].webp

# Check image mapping in auburnImages.ts
grep "your-image-id" data/auburnImages.ts

# Restart dev server
# Ctrl+C to stop, then:
npm run dev
```

### Wrong image showing?
1. Check the attraction's `imageId` in `data/attractions.ts`
2. Verify that `imageId` maps correctly in `data/auburnImages.ts` → `specificImageMappings`
3. Clear browser cache (Cmd+Shift+R on Mac)

## Image Requirements

- **Format:** WebP (script auto-converts)
- **Size:** Aim for < 300 KB after conversion
- **Dimensions:** 1200px wide (script handles this)
- **Quality:** 85% (configured in script)
- **Source:** Unsplash.com (royalty-free)

## Need Help?

Check these files:
- `IMAGE_PULL_SUCCESS.md` - Full documentation
- `IMAGE_REPLACEMENT_COMPLETE.md` - Complete solution details
- `scripts/fetch-images.py` - Image fetching script
- `data/auburnImages.ts` - Image mapping system

---

**Quick Reference Created:** January 22, 2026
