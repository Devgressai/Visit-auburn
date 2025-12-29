# Auburn, CA Attraction Photos Guide

## Overview

This guide provides specific instructions for sourcing and adding **real Auburn, California photos** for each attraction on the Things To Do page.

Each attraction now displays an image card. Currently using placeholder images that need to be replaced with authentic Auburn-specific photos.

---

## How Photos Are Currently Organized

### File Location
Images are stored in: `/public/images/`

### Code Location
Image mappings are in: `/app/things-to-do/page.tsx` (lines 18-51)

```typescript
const attractionImages: Record<string, string> = {
  'lake-clementine': '/images/lake-clementine.jpg',
  // ... etc
}
```

---

## Image Specifications

**Required for ALL attraction photos:**
- **Dimensions:** 800×600px minimum (4:3 aspect ratio)
- **Format:** JPG or WebP
- **File Size:** Under 300KB (optimized)
- **Orientation:** Landscape (horizontal)
- **Quality:** High resolution, well-lit, professional

---

## Where to Find Auburn, CA Photos

### 1. **Official Sources** (Best Quality, May Require Permission)

- **Placer County Tourism**: https://www.visitplacer.com/media/
- **Auburn Chamber of Commerce**: https://auburnareachamber.net/
- **City of Auburn**: https://www.auburn.ca.gov/
- **Placer County Parks**: https://www.placer.ca.gov/Facilities

### 2. **Free Stock Photo Sites**

- **Unsplash**: https://unsplash.com/
- **Pexels**: https://www.pexels.com/
- **Pixabay**: https://pixabay.com/

### 3. **User-Generated Content** (With Permission)

- **Instagram**: Search `#AuburnCA`, `#VisitAuburn`, `#AuburnCalifornia`
- **Flickr**: Creative Commons licensed photos
- **Google Images**: Filter by "Labeled for reuse"

### 4. **Hire Local Photographer**

For best results, consider hiring an Auburn-based photographer to capture authentic, high-quality images of all attractions.

---

## Attraction-Specific Photo Requirements

## 🏔️ Outdoor Adventures & Nature

### 1. Lake Clementine Trail
**Current:** `/images/Hiking_trails.jpg`  
**Needs:** Photo of Lake Clementine with blue water, North Fork Dam, or trail views

**Search Terms:**
- "Lake Clementine Auburn California"
- "North Fork Dam Auburn"
- "Lake Clementine trail"

**Ideal Shot:**
- Lake with canyon walls
- Hikers on trail with water view
- Dam structure with lake

**Official Source:** [Placer County Parks](https://www.placer.ca.gov/1392/Lake-Clementine)

---

### 2. Hidden Falls Regional Park
**Current:** `/images/Hiking_trails.jpg`  
**Needs:** Waterfall or trail through oak woodlands

**Search Terms:**
- "Hidden Falls Auburn California"
- "Hidden Falls Regional Park waterfall"
- "Auburn California hiking trails"

**Ideal Shot:**
- Seasonal waterfall (best Feb-April)
- Oak woodland trail
- Hikers or mountain bikers on trail

**Official Source:** [Placer County Parks](https://www.placer.ca.gov/1594/Hidden-Falls-Regional-Park)

---

### 3. Overlook Park
**Current:** `/images/hero-main.webp` (bridge photo)  
**Needs:** Panoramic canyon overlook view

**Search Terms:**
- "Overlook Park Auburn California"
- "American River Canyon Auburn"
- "Auburn Ravine overlook"

**Ideal Shot:**
- Sweeping canyon vista
- Sunset from overlook
- American River Canyon view

---

### 4. Railhead Park
**Current:** `/images/Hiking_trails.jpg`  
**Needs:** Urban park with historic railroad elements

**Search Terms:**
- "Railhead Park Auburn"
- "Auburn California railroad park"
- "Downtown Auburn parks"

**Ideal Shot:**
- Park pathway with trees
- Historic railroad features
- Family-friendly green space

---

### 5. Ashford Park
**Current:** `/images/Hiking_trails.jpg`  
**Needs:** Neighborhood park with playground

**Search Terms:**
- "Ashford Park Auburn California"
- "Auburn neighborhood park"

**Ideal Shot:**
- Playground equipment
- Walking trails
- Open green space

---

### 6. Black Hole of Calcutta Falls
**Current:** `/images/Hiking_trails.jpg`  
**Needs:** Waterfall or swimming hole in canyon

**Search Terms:**
- "Black Hole of Calcutta Falls Auburn"
- "Quarry Road Trail Auburn"
- "Auburn swimming hole waterfall"

**Ideal Shot:**
- Waterfall cascading into pool
- Swimming hole with rocks
- Secluded canyon setting

---

### 7. Auburn Swim Hole (American River)
**Current:** `/images/Hiking_trails.jpg`  
**Needs:** American River swimming spot with sandy beach

**Search Terms:**
- "Auburn California American River swimming"
- "Auburn swim hole"
- "American River Auburn beach"

**Ideal Shot:**
- People swimming in river
- Sandy beach area
- Natural pools with rocks

---

## 🏛️ History & Culture

### 8. Placer County Museum
**Current:** `/images/museum-gold-panning.webp`  
**Needs:** Historic 1851 courthouse building exterior

**Search Terms:**
- "Placer County Museum Auburn"
- "Auburn courthouse 1851"
- "Placer County courthouse California"

**Ideal Shot:**
- Historic courthouse facade
- Museum entrance
- Gold Rush exhibits inside

**Official Source:** Museum website for permission

---

### 9. Gold Country Museum
**Current:** `/images/museum-gold-panning.webp` ✓ (Keep if shows gold panning)  
**Needs:** Mine tunnel, stamp mill, or gold panning activity

**Search Terms:**
- "Gold Country Museum Auburn"
- "Auburn gold panning"
- "Gold Rush mine tunnel California"

**Ideal Shot:**
- Recreated mine tunnel
- Working stamp mill
- Kids gold panning

---

### 10. Bernhard Museum Complex
**Current:** `/images/museum-gold-panning.webp`  
**Needs:** Historic 1851 Traveler's Rest Hotel building

**Search Terms:**
- "Bernhard Museum Auburn"
- "Traveler's Rest Hotel Auburn"
- "Bernhard House Auburn California"

**Ideal Shot:**
- Victorian-era hotel exterior
- Historic ranch buildings
- Period furnishings interior

**Official Source:** Placer County Museums

---

### 11. Old Town Auburn
**Current:** `/images/hero-main.webp` ✓ (Shows clock tower)  
**Needs:** Historic downtown street view with 1850s buildings

**Search Terms:**
- "Old Town Auburn California"
- "Auburn California historic downtown"
- "Auburn clock tower"

**Ideal Shot:**
- Clock tower (current is good)
- Historic street with shops
- Preserved Gold Rush architecture

---

### 12. Old Town Auburn Walking Tour
**Current:** `/images/hero-main.webp`  
**Needs:** People walking tour or historic street scene

**Search Terms:**
- "Old Town Auburn walking tour"
- "Auburn California historic walking"

**Ideal Shot:**
- Group on walking tour
- Historic buildings close-up
- Interpretive signs/markers

---

### 13. Auburn Firehouse Clock Tower
**Current:** `/images/hero-main.webp` ✓ (Shows clock tower)  
**Needs:** Close-up of 1891 clock tower

**Search Terms:**
- "Auburn Firehouse clock tower"
- "Auburn California clock tower"
- "Old Town Auburn clock"

**Ideal Shot:**
- Clock tower detail
- Firehouse building
- Nighttime illuminated

---

### 14. Foresthill Bridge
**Current:** `/images/hero-main.webp`  
**Needs:** High bridge spanning North Fork American River Canyon

**Search Terms:**
- "Foresthill Bridge Auburn California"
- "Foresthill Bridge 730 feet"
- "Auburn California bridge canyon"

**Ideal Shot:**
- Full bridge span from distance
- View from bridge looking down
- Canyon with river below

**Note:** One of the highest bridges in CA (730 feet) - dramatic photo opportunity!

---

## 🍷 Wine, Food & Markets

### 15. Mt. Vernon Winery
**Current:** `/images/dining.jpg`  
**Needs:** Vineyard rows or wine tasting room

**Search Terms:**
- "Mt Vernon Winery Auburn"
- "Auburn California winery"
- "Sierra foothills vineyard"

**Ideal Shot:**
- Vineyard rows with mountains
- Wine tasting room
- Wine glasses with vineyard view

**Official Source:** Contact winery for photos

---

### 16. Auburn Old Town Farmers Market
**Current:** `/images/dining.jpg`  
**Needs:** Farmers market with produce stalls and vendors

**Search Terms:**
- "Auburn Old Town Farmers Market"
- "Auburn California farmers market"
- "Saturday farmers market Auburn"

**Ideal Shot:**
- Colorful produce displays
- Vendor tents
- Shoppers browsing market

**Best Time:** Saturday morning during market hours

---

### 17. Out of Order Arcade Bar
**Current:** `/images/dining.jpg`  
**Needs:** Retro arcade games and bar atmosphere

**Search Terms:**
- "Out of Order Arcade Bar Auburn"
- "Auburn California arcade bar"

**Ideal Shot:**
- Classic arcade machines
- Interior with games and bar
- Retro neon lighting

**Official Source:** Contact business for photos

---

### 18. Old Town Auburn Restaurants & Cafes
**Current:** `/images/dining.jpg`  
**Needs:** Outdoor dining or restaurant street scene

**Search Terms:**
- "Auburn California restaurants"
- "Old Town Auburn dining"
- "Auburn outdoor dining"

**Ideal Shot:**
- Outdoor cafe seating
- Restaurant in historic building
- Diverse dining options

---

## 🎉 Events & Seasonal Fun

### 19. Auburn Festivals & Community Events
**Current:** `/images/events-hiking.webp`  
**Needs:** Festival crowd, stage, or event activities

**Search Terms:**
- "Auburn California Gold Rush Days"
- "Auburn community festival"
- "Auburn California events"

**Ideal Shot:**
- Festival tents and crowds
- Stage with performers
- Gold Rush Days parade

---

### 20. Pumpkin Nights
**Current:** `/images/events-hiking.webp`  
**Needs:** Illuminated carved pumpkins display

**Search Terms:**
- "Pumpkin Nights Gold Country Fairgrounds"
- "Auburn California pumpkin festival"
- "Pumpkin Nights Auburn"

**Ideal Shot:**
- Thousands of lit pumpkins
- Themed pumpkin displays
- Families viewing displays

**Seasonal:** Fall only (Sept-Oct)

---

### 21. Mandarin Festival
**Current:** `/images/events-hiking.webp`  
**Needs:** Mandarin oranges, vendors, winter festival

**Search Terms:**
- "Mandarin Festival Auburn California"
- "Placer County Mandarin Festival"
- "Auburn citrus festival"

**Ideal Shot:**
- Fresh mandarins on display
- Festival tents
- Families enjoying event

**Seasonal:** Winter only (Jan-Feb)

---

## 🚴 Active Adventures

### 22. Bicycle Emporium
**Current:** `/images/Hiking_trails.jpg`  
**Needs:** Bike shop exterior or bikes on display

**Search Terms:**
- "Bicycle Emporium Auburn"
- "Auburn California bike shop"

**Ideal Shot:**
- Shop storefront
- Bikes displayed
- Mountain bikes on trails

**Official Source:** Contact shop for photos

---

### 23. Rafting, Mountain Biking & Horseback Riding
**Current:** `/images/Hiking_trails.jpg`  
**Needs:** Action shot of rafting, biking, or horseback riding

**Search Terms:**
- "American River rafting Auburn"
- "Auburn California mountain biking"
- "Auburn horseback riding"

**Ideal Shot:**
- White water rafting on American River
- Mountain biker on trail
- Horseback riders in foothills

---

## Step-by-Step: Adding Photos to the Site

### 1. Download and Optimize Images

```bash
# Use TinyPNG or Squoosh to compress
# Target: Under 300KB per image
```

### 2. Name Files Correctly

```
lake-clementine.jpg
hidden-falls.jpg
overlook-park.jpg
# ... etc (match the imageKey from data)
```

### 3. Add to Project

```bash
# Copy images to project
cp ~/Downloads/*.jpg /Users/george/Visit-Auburn/public/images/
```

### 4. Update Code

Edit `/app/things-to-do/page.tsx`:

```typescript
const attractionImages: Record<string, string> = {
  // Update each line with new image path
  'lake-clementine': '/images/lake-clementine.jpg',
  'hidden-falls': '/images/hidden-falls.jpg',
  // ... etc
}
```

### 5. Test Locally

```bash
npm run dev
# Visit http://localhost:3000/things-to-do
```

### 6. Commit and Deploy

```bash
git add public/images/
git add app/things-to-do/page.tsx
git commit -m "feat: Add real Auburn CA photos to attraction cards"
git push
```

---

## Photo Attribution

**Important:** Always provide proper attribution!

### Add to Footer or Credits Page:

```markdown
## Photography Credits

- Lake Clementine Trail: [Photographer] via [Source]
- Hidden Falls: Courtesy of Placer County Parks
- Old Town Auburn: [Photographer] via Unsplash
- etc.
```

---

## Priority Order for Photo Replacement

**High Priority (Most Visible):**
1. Old Town Auburn (clock tower) - ✓ Already good
2. Lake Clementine Trail
3. Hidden Falls Regional Park
4. Mt. Vernon Winery
5. Auburn Farmers Market

**Medium Priority:**
6. Foresthill Bridge
7. Placer County Museum
8. Gold Country Museum
9. Overlook Park
10. Bernhard Museum

**Lower Priority:**
11-23. Remaining attractions

---

## Quick Reference: Search Strategy

1. **Start with Official Sources**
   - Contact tourism boards directly
   - Often have media kits available

2. **Use Specific Location Names**
   - Always include "Auburn California"
   - Use exact attraction names

3. **Check License Terms**
   - Verify commercial use allowed
   - Note attribution requirements

4. **Optimize Before Adding**
   - Compress images
   - Convert to WebP if possible
   - Maintain aspect ratio

5. **Test on Mobile**
   - Images should load quickly
   - Look good at small sizes
   - Text remains readable

---

## Contact Information

**For Permission to Use Official Photos:**

- **Placer County Tourism**: media@visitplacer.com
- **Auburn Chamber**: info@auburnareachamber.net
- **City of Auburn**: webmaster@auburn.ca.gov

---

## Budget Option

If hiring a photographer or sourcing individual photos is too time-consuming, consider:

1. Purchase a **stock photo subscription** (Shutterstock, Adobe Stock)
2. Search for "Gold Country California" themed photos
3. Use similar-looking locations that match the vibe
4. Gradually replace with authentic Auburn photos over time

---

## Final Checklist

Before going live with new photos:

- [ ] All images under 300KB
- [ ] All images 800×600px minimum
- [ ] All images landscape orientation
- [ ] Attribution documented
- [ ] Licenses verified
- [ ] Mobile display tested
- [ ] Load time acceptable (<3 seconds)
- [ ] Images look good on cards
- [ ] No pixelation or blur

---

**Need help?** Contact Auburn Chamber of Commerce or Placer County Tourism for media assistance!

