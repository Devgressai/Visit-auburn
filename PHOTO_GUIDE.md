# Adding Real Auburn, California Photos to Things To Do Page

## Current Status

The Things To Do page now displays **hero images for each category section** with:
- Image banner at the top of each category
- Category title and description overlaid on the image
- Gradient overlay for text readability
- Responsive sizing

## Images Currently Being Used

The page currently uses existing placeholder images from `/public/images/`:

| Category | Current Image | File Name |
|----------|---------------|-----------|
| **Outdoor Adventures & Nature** | Hiking trails | `Hiking_trails.jpg` |
| **History & Culture** | Gold panning at museum | `museum-gold-panning.webp` |
| **Wine, Food & Markets** | Dining scene | `dining.jpg` |
| **Events & Seasonal Fun** | Outdoor events | `events-hiking.webp` |
| **Active Adventures** | Hiking trails (reused) | `Hiking_trails.jpg` |

---

## How to Add Real Auburn, CA Photos

### Step 1: Source Authentic Photos

#### Recommended Photo Sources:

1. **Official Tourism Sites:**
   - [Placer County Tourism](https://www.visitplacer.com/)
   - [Visit California - Auburn](https://www.visitcalifornia.com/)
   - [Auburn Chamber of Commerce](https://auburnareachamber.net/)

2. **Free Stock Photo Sites** (search for relevant terms):
   - **Unsplash.com** - Free, high-quality images
   - **Pexels.com** - Free stock photos
   - **Pixabay.com** - Free images

3. **Specific Search Terms for Each Category:**

   **Outdoor Adventures & Nature:**
   - "Auburn California Lake Clementine"
   - "American River Auburn California"
   - "Hidden Falls Regional Park"
   - "Sierra foothills hiking trail"
   - "Northern California forest trail"

   **History & Culture:**
   - "Auburn California Old Town"
   - "Gold Rush town California"
   - "Historic courthouse California"
   - "1850s architecture California"
   - "Auburn California clock tower"

   **Wine, Food & Markets:**
   - "Sierra foothills winery"
   - "California farmers market"
   - "Auburn farmers market California"
   - "Placer County winery"
   - "California wine tasting"

   **Events & Seasonal Fun:**
   - "California community festival"
   - "Outdoor concert California"
   - "Gold Rush Days Auburn"
   - "California fall festival"

   **Active Adventures:**
   - "Mountain biking California"
   - "White water rafting American River"
   - "Horseback riding California foothills"
   - "Trail running Sierra Nevada"

---

### Step 2: Image Specifications

**Required Dimensions:**
- **Minimum Width:** 1200px
- **Minimum Height:** 600px
- **Aspect Ratio:** 2:1 (landscape)
- **Format:** JPG or WebP
- **File Size:** Under 500KB (optimized)

**Image Guidelines:**
- High resolution
- Good lighting
- Represents Auburn/Gold Country authentically
- Landscape orientation (horizontal)
- Not overly busy (text will overlay)

---

### Step 3: Add Images to Project

1. **Save images to `/public/images/` directory**

2. **Recommended file names:**
   ```
   /public/images/outdoor-adventures-hero.jpg
   /public/images/history-culture-hero.jpg
   /public/images/wine-food-markets-hero.jpg
   /public/images/events-seasonal-hero.jpg
   /public/images/active-adventures-hero.jpg
   ```

3. **Update the code in `/app/things-to-do/page.tsx`:**

   Find this section (around line 18-28):

   ```typescript
   const categoryImages: Record<string, string> = {
     'outdoor-adventures': '/images/Hiking_trails.jpg',
     'history-culture': '/images/museum-gold-panning.webp',
     'wine-food-markets': '/images/dining.jpg',
     'events-seasonal': '/images/events-hiking.webp',
     'active-adventures': '/images/Hiking_trails.jpg',
   }
   ```

   Replace with your new image paths:

   ```typescript
   const categoryImages: Record<string, string> = {
     'outdoor-adventures': '/images/outdoor-adventures-hero.jpg',
     'history-culture': '/images/history-culture-hero.jpg',
     'wine-food-markets': '/images/wine-food-markets-hero.jpg',
     'events-seasonal': '/images/events-seasonal-hero.jpg',
     'active-adventures': '/images/active-adventures-hero.jpg',
   }
   ```

---

### Step 4: Optimize Images

Before adding to the project, optimize images using:

1. **TinyPNG** (https://tinypng.com/)
   - Drag and drop images
   - Download compressed versions
   - Usually reduces file size by 50-70%

2. **Squoosh** (https://squoosh.app/)
   - More advanced options
   - Can convert to WebP format
   - Better compression control

3. **Command Line (if available):**
   ```bash
   # Convert to WebP
   cwebp -q 85 input.jpg -o output.webp
   ```

---

## Specific Photo Recommendations by Category

### 1. Outdoor Adventures & Nature
**Ideal subjects:**
- Lake Clementine with blue water and cliffs
- American River with kayakers or swimmers
- Hiking trail through oak trees
- Foresthill Bridge
- Waterfall at Hidden Falls Regional Park

**Must avoid:**
- Generic forest photos that could be anywhere
- Photos without clear sky/water elements
- Overly dark or shadowy images

---

### 2. History & Culture
**Ideal subjects:**
- Old Town Auburn street view with historic buildings
- Auburn Courthouse or clock tower
- Placer County Museum exterior
- Historic storefront with vintage signage
- Gold Rush era buildings

**Must avoid:**
- Modern buildings
- Generic "old town" that's not Auburn-specific
- Photos with too many cars/modern elements

---

### 3. Wine, Food & Markets
**Ideal subjects:**
- Vineyard rows in Placer County
- Wine glasses with vineyard background
- Farmers market with fresh produce
- Auburn Old Town dining/cafe scene
- Wine barrel with tasting room

**Must avoid:**
- Generic restaurant interiors
- Stock photos that don't feel local
- Too much food close-up (need scene-setting)

---

### 4. Events & Seasonal Fun
**Ideal subjects:**
- Community festival with crowds and tents
- Outdoor concert or stage
- Seasonal decorations (fall/winter)
- Gold Rush Days event
- People enjoying outdoor activities

**Must avoid:**
- Indoor event spaces
- Too crowded/chaotic scenes
- Events clearly not in Auburn

---

### 5. Active Adventures
**Ideal subjects:**
- Mountain biker on trail
- White water rafting on American River
- Horseback riders on trail
- Rock climbing or outdoor sports
- Trail runners in scenic landscape

**Must avoid:**
- Gym or indoor activities
- Generic sports photos
- Photos without nature/landscape context

---

## Testing After Adding Photos

1. **Visual Check:**
   - View page at https://visit-auburn.vercel.app/things-to-do
   - Ensure images load quickly
   - Check that text overlay is readable
   - Verify images look good on mobile

2. **Performance Check:**
   - Use Lighthouse in Chrome DevTools
   - Check LCP (Largest Contentful Paint) score
   - Ensure images are under 500KB each

3. **Mobile Check:**
   - Test on actual mobile device if possible
   - Check that images crop appropriately
   - Verify text remains readable

---

## Attribution & Legal

**Important:** Ensure you have the right to use any photos!

- **Free stock sites:** Usually free for commercial use, but check license
- **Official tourism sites:** May require attribution or permission
- **Local photographers:** Always get written permission and provide credit

**How to add attribution:**
Add to the website footer or a separate "Credits" page:

```
Photography Credits:
- Outdoor Adventures photo: [Photographer Name] via Unsplash
- History & Culture photo: Courtesy of Placer County Tourism
- etc.
```

---

## Quick Reference Commands

### Add images to project:
```bash
cd /Users/george/Visit-Auburn/public/images
# Copy your optimized images here
```

### Update code:
```bash
# Edit /app/things-to-do/page.tsx
# Update the categoryImages object
```

### Commit changes:
```bash
git add public/images/
git add app/things-to-do/page.tsx
git commit -m "feat: Add real Auburn CA photos to Things To Do category sections"
git push
```

---

## Need Help?

If you need help sourcing specific Auburn photos:

1. Contact **Auburn Chamber of Commerce** for official photos
2. Reach out to **Placer County Tourism** for media assets
3. Check **VisitAuburn.com** media/press section
4. Consider hiring a local photographer for original content

The investment in authentic, high-quality photos will significantly improve user engagement and conversion rates!

