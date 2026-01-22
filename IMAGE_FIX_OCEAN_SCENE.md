# URGENT: Ocean Scene Image Fix

## Problem Identified
The file `/public/images/auburn/discover/old-town-street.webp` contains an **incorrect image** showing:
- People on a rocky overlook at sunset
- Ocean/coastal Pacific scene with water view
- **NOT representative of Auburn, CA** (which is 100+ miles inland in the Sierra Nevada foothills)

## Source of Problem
- Unsplash URL: `https://images.unsplash.com/photo-1464207687429-7505649dae38`
- Located in: `scripts/fetch-images.py` line 143
- This image was fetched as a placeholder but is geographically incorrect

## Impact
This image is used for **14+ locations** including:
- Old Town Auburn Historic District (FIXED - now uses clocktower image)
- Placer County Courthouse
- Railroad Depot
- Downtown Lincoln Way
- Art Walk events
- Old Town galleries and theaters
- Shopping/antiques areas
- Walking tours

## Solution Required
Replace with an image showing:
- Historic downtown/main street
- 19th century brick buildings
- Small-town California Gold Rush architecture
- Street-level view of shops and historic buildings
- **NO ocean, NO coastal scenes, NO water views**

## Recommended Replacement Images (Unsplash)
Search for:
1. "historic downtown main street" - brick buildings, small town
2. "gold rush town california" - historic architecture
3. "small town main street america" - vintage storefronts
4. "historic district downtown" - walkable streets with old buildings

Example suitable URLs:
- `https://images.unsplash.com/photo-1477959858617-67f85cf4f1df` - City street with historic buildings
- `https://images.unsplash.com/photo-1519501025264-65ba15a82390` - Downtown historic district
- `https://images.unsplash.com/photo-1449824913935-59a10b8d2000` - Main street with shops

## Files to Update
1. `/scripts/fetch-images.py` - line 143 (change URL)
2. Re-run image fetch to download correct image
3. Verify all usages show appropriate Auburn-like scenes

## Status
- ✅ Old Town Auburn attraction updated to use `hero-old-town-clocktower.webp`
- ✅ Replaced `old-town-street.webp` with correct historic downtown street image
- ✅ Updated fetch-images.py script with correct Unsplash URL
- ✅ All 13+ locations now show appropriate Auburn-like historic downtown scenes

## Changes Made
1. **Updated `/data/attractions.ts`**: Changed Old Town Auburn imageId from `'downtown-lincoln-way'` to `'historic-old-town-clocktower'`
2. **Updated `/scripts/fetch-images.py`**: Changed URL from ocean scene to historic downtown street
3. **Replaced image file**: Downloaded and converted new image to `/public/images/auburn/discover/old-town-street.webp`
4. **New image shows**: Historic downtown street with buildings and urban architecture (NO ocean)

## Verification
- New image file: 192KB WebP
- Created: Jan 20, 2026
- Source: Unsplash photo-1477959858617-67f85cf4f1df
- Content: Historic city street with buildings (geographically appropriate for inland Auburn, CA)
