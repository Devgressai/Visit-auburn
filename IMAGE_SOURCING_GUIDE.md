# Image Sourcing & Optimization Guide

## Overview

The Visit Auburn website uses a multi-source image strategy with WebP format optimization for modern browsers. This guide outlines how to source images and convert them to WebP format for optimal performance.

---

## Current Image Strategy

### Existing Format Distribution
```
Current images in /public/images/:
- WebP: events-hiking.webp, hero-main.webp, museum-gold-panning.webp
- JPG: dining.jpg, discover.jpg, hero.jpg, Hiking_trails.jpg, panning_gold.jpg, stay.jpg, things-to-do.jpg, etc.
- PNG: hero.png, logo.png (logo kept as PNG for quality)
```

### Best Practice: Use WebP Primarily
- **Primary Format**: WebP (better compression, smaller file sizes)
- **Fallback Format**: JPG (browser compatibility, older systems)
- **Logo/Vector**: PNG (when transparency/vector quality needed)

---

## Image Sources for Wedding Venue Photos (10 needed)

### Option A: Free Open-Source Photography Sites ✅ RECOMMENDED

#### 1. **Unsplash** (Most Popular)
- **URL**: https://unsplash.com
- **License**: Free for commercial use (CC0)
- **Search Terms**: "wedding venue", "garden ceremony", "historic building", etc.
- **Quality**: High-resolution, professional photography
- **Recommendation**: ⭐⭐⭐⭐⭐

**For Auburn Wedding Venue Photos:**
```
1. Park Victorian (historic estate)
   → Search: "historic Victorian mansion" OR "wedding garden estate"
   → Download: Use their API or direct download with credit

2. The Ridge Golf Course & Events
   → Search: "golf course wedding venue" OR "scenic outdoor venue"

3. Auburn Garden Theater
   → Search: "garden ceremony" OR "outdoor theater venue"

4. Auburn Veterans Memorial Building
   → Search: "historic ballroom" OR "elegant event space"

5. Old Town Auburn Historic District
   → Search: "historic downtown" OR "gold rush era buildings"

6. Placer County Fairgrounds
   → Search: "outdoor event venue" OR "fairgrounds wedding"

7. Hidden Falls Regional Park
   → Search: "waterfall venue" OR "scenic outdoor park"

8. Winery Venues
   → Search: "vineyard wedding" OR "wine country venue"

9. Auburn State Theatre
   → Search: "historic theater" OR "art deco venue"

10. Bernhard Museum Complex
    → Search: "historic museum" OR "gold rush era building"
```

#### 2. **Pexels** (High Quality)
- **URL**: https://www.pexels.com
- **License**: Free for commercial use (CC0)
- **Quality**: Professional stock photos
- **Recommendation**: ⭐⭐⭐⭐⭐

#### 3. **Pixabay** (Largest Free Library)
- **URL**: https://pixabay.com
- **License**: Free for commercial use (CC0)
- **Quality**: Large collection, mixed quality
- **Recommendation**: ⭐⭐⭐⭐

#### 4. **Flickr Creative Commons**
- **URL**: https://www.flickr.com/creativecommons/
- **License**: Various CC licenses (check each photo)
- **Search**: "Auburn California wedding" or "California wedding venues"
- **Recommendation**: ⭐⭐⭐⭐

### Option B: Local Auburn Photography
- **Source**: Contact Auburn Chamber of Commerce
- **Cost**: Varies (often free for promotional use)
- **Quality**: Most authentic, location-specific
- **Recommendation**: ⭐⭐⭐⭐⭐ (If available)

### Option C: Stock Photo Services (Paid)
- **Shutterstock**: Premium quality ($)
- **Getty Images**: High quality ($$)
- **Adobe Stock**: Professional library ($)
- **Recommendation**: Use only if free sources don't have suitable images

---

## Image Conversion Process: JPG → WebP

### Method 1: Using ImageMagick (Command Line) ✅ EASIEST

**Installation** (one-time):
```bash
# macOS with Homebrew
brew install imagemagick

# Linux (Ubuntu/Debian)
sudo apt-get install imagemagick

# Windows - Download from https://imagemagick.org/script/download.php
```

**Batch Convert to WebP** (in /public/images/auburn/weddings/):
```bash
# Convert single file
convert input.jpg -quality 85 output.webp

# Batch convert all JPGs to WebP
cd /public/images/auburn/weddings/
mogrify -format webp -quality 85 *.jpg

# Convert and keep original
for file in *.jpg; do
  convert "$file" -quality 85 "${file%.jpg}.webp"
done
```

### Method 2: Using cwebp (Google's Tool)

**Installation**:
```bash
# macOS
brew install webp

# Linux
sudo apt-get install webp

# Or download from https://developers.google.com/speed/webp/download
```

**Convert Files**:
```bash
# Single file - high quality
cwebp -q 85 input.jpg -o output.webp

# Batch convert
for file in *.jpg; do
  cwebp -q 85 "$file" -o "${file%.jpg}.webp"
done

# With size optimization
cwebp -q 80 input.jpg -o output.webp  # Smaller file size
cwebp -q 90 input.jpg -o output.webp  # Better quality
```

### Method 3: Online Converter (No Installation) ✅ SIMPLEST

Use these free online tools (no software needed):
- **CloudConvert**: https://cloudconvert.com/jpg-to-webp
- **Online-Convert**: https://image.online-convert.com/convert-to-webp
- **Convertio**: https://convertio.co/jpg-webp/

**Steps**:
1. Upload JPG file
2. Select WebP as output format
3. Set quality to 85 (balance of size & quality)
4. Download converted file

### Method 4: Using Node.js Script

**Create script**: `scripts/convert-images.js`
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = './public/images/auburn/weddings/';

fs.readdirSync(imageDir)
  .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'))
  .forEach(file => {
    const inputPath = path.join(imageDir, file);
    const outputPath = path.join(imageDir, file.replace(/\.[^/.]+$/, '.webp'));
    
    sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath)
      .then(() => console.log(`✓ Converted ${file} to WebP`))
      .catch(err => console.error(`✗ Error converting ${file}:`, err));
  });
```

**Install dependency**:
```bash
npm install sharp
```

**Run conversion**:
```bash
node scripts/convert-images.js
```

---

## Image Optimization Best Practices

### Quality Settings
```
Quality 85-90: Large files, best quality (use for hero images)
Quality 75-85: Medium files, good quality (standard use)
Quality 65-75: Smaller files, acceptable quality (thumbnails)
Quality 50-65: Small files, lower quality (not recommended)
```

### Recommended Quality Levels by Use

| Image Type | Quality | File Size | Use Case |
|-----------|---------|-----------|----------|
| Hero images | 85-90 | 200-400KB | Page heroes, banners |
| Card images | 80-85 | 100-200KB | Venue/event cards |
| Thumbnails | 70-75 | 50-100KB | Small previews |
| Fallback images | 75-80 | 80-150KB | Fallback/backup |

### File Size Targets
```
Hero image (1920x1080): < 300KB
Card image (600x400): < 150KB
Thumbnail (300x200): < 80KB

Total page load images: < 2-3MB
```

### Responsive Image Sizes
```javascript
// Next.js Image component automatically handles this
<Image
  src="/images/auburn/weddings/park-victorian.webp"
  alt="Park Victorian wedding venue"
  width={600}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  quality={85}
/>
```

---

## File Organization Structure

### Required Directory Structure
```
/public/images/
├── auburn/
│   ├── weddings/              ← NEW: For wedding venue photos
│   │   ├── park-victorian.webp
│   │   ├── ridge-golf-course.webp
│   │   ├── garden-theater.webp
│   │   ├── veterans-memorial.webp
│   │   ├── old-town-auburn-wedding.webp
│   │   ├── fairgrounds.webp
│   │   ├── hidden-falls.webp
│   │   ├── winery-venue.webp
│   │   ├── historic-building.webp
│   │   └── hero-weddings.webp
│   └── meetings/              ← Existing
├── downloads/                 ← NEW: For PDF guides (no images)
└── [existing images]
```

### Keep Original JPGs?
- **Option A**: Keep originals in separate folder for future editing
  ```
  /source-images/auburn/weddings/  ← Keep originals here
  /public/images/auburn/weddings/   ← Use WebPs here
  ```
- **Option B**: Only keep WebPs (if file sizes are critical)
  - Pro: Smaller storage
  - Con: Can't re-edit without original

**Recommendation**: Keep originals in source-images for future editing

---

## Step-by-Step Workflow

### Step 1: Source Images (2-3 hours)
```
1. Go to Unsplash.com
2. Search for each venue type
3. Download at least 2-3 options per venue
4. Keep originals in organized folder
```

### Step 2: Select Best Photos (1-2 hours)
```
1. Review all downloaded options
2. Choose the best match for each venue
3. Consider:
   - Image quality and clarity
   - Relevance to venue type
   - Professional appearance
   - Variety (not all similar angles)
```

### Step 3: Convert to WebP (15-30 minutes)
```
# Using ImageMagick (easiest)
cd /public/images/auburn/weddings/
mogrify -format webp -quality 85 *.jpg

# All JPGs converted to WebP in seconds
```

### Step 4: Verify Quality (15 minutes)
```
1. Check file sizes are reasonable (< 200KB each)
2. View in browser to verify quality
3. Delete original JPGs if satisfied
```

### Step 5: Deploy
```
1. Test pages load correctly
2. Verify images display properly
3. Check Lighthouse performance score
4. Deploy to production
```

---

## Next.js Image Component Integration

### Current Implementation
The website already uses Next.js `<Image>` component:

```typescript
import Image from 'next/image'

export default function WeddingCard({ venue }) {
  return (
    <Image
      src={venue.imageSrc}  // e.g., /images/auburn/weddings/park-victorian.webp
      alt={`${venue.name} wedding venue`}
      width={600}
      height={400}
      quality={85}
      priority={false}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  )
}
```

### Automatic WebP Support
Next.js automatically:
- ✅ Serves WebP to modern browsers
- ✅ Falls back to JPG/PNG for older browsers
- ✅ Optimizes on-demand
- ✅ Caches optimized images
- ✅ Resizes for different screen sizes

**No additional configuration needed!**

---

## Download PDFs Handling

### For `/public/downloads/` (6 PDFs needed)
These are **not images**, just documents:
```
/public/downloads/
├── auburn-visitor-guide.pdf
├── old-town-walking-map.pdf
├── trail-guide.pdf
├── dining-wine-guide.pdf
├── events-calendar.pdf
└── historic-sites-guide.pdf
```

### PDF Sources
1. **Create Locally**: Use Adobe InDesign, Canva, or Google Docs
2. **Download from Auburn Tourism**: Official PDFs
3. **Convert from Existing Content**: HTML → PDF using tools like:
   - Puppeteer (Node.js)
   - wkhtmltopdf
   - Adobe PDF services
4. **Use Template Services**: Canva, Figma (create PDFs)

### PDF Format Requirements
- File size: < 5MB each (preferably < 2MB)
- Compression: Moderate (readable but optimized)
- Searchable text: Include if possible
- Pages: Typically 1-8 pages per guide

---

## Performance Monitoring

### Check Image Performance

**Using Lighthouse** (in dev):
```bash
npm run build
npm run start
# Open in browser, run Lighthouse audit
```

**Check file sizes**:
```bash
# macOS/Linux
ls -lh public/images/auburn/weddings/

# See WebP vs JPG size comparison
ls -lh public/images/*.webp public/images/*.jpg
```

### Expected Results
- WebP files: 30-50% smaller than JPG
- Lighthouse score: 85+ (Performance)
- Page load time: < 3 seconds for all image-heavy pages

---

## Troubleshooting

### WebP Not Displaying
**Solution**: Ensure `next.config.js` includes image remotes:
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
}
```

### Images Too Large
**Solution**: Reduce quality or use smaller dimensions
```bash
cwebp -q 75 large-image.jpg -o optimized.webp
```

### Images Look Blurry
**Solution**: Increase quality setting
```bash
cwebp -q 90 image.jpg -o sharp.webp
```

### Conversion Takes Too Long
**Solution**: Use batch processing or online tools for quick conversions

---

## Recommended Tools Summary

### For Most Users
1. **Method**: Online-Convert.com (no software)
2. **Steps**: Upload → Select WebP → Download
3. **Time**: 2 minutes per image × 16 images = 30 minutes

### For Technical Users
1. **Tool**: ImageMagick (batch processing)
2. **Command**: `mogrify -format webp -quality 85 *.jpg`
3. **Time**: 1 minute for all images

### For Node.js Projects
1. **Tool**: sharp npm package
2. **Script**: Run automated conversion
3. **Time**: 30 seconds for all images

---

## Cost Breakdown

| Source | Cost | Quality | Recommended |
|--------|------|---------|------------|
| Unsplash | FREE | ⭐⭐⭐⭐⭐ | YES |
| Pexels | FREE | ⭐⭐⭐⭐⭐ | YES |
| Pixabay | FREE | ⭐⭐⭐⭐ | YES |
| Flickr CC | FREE | ⭐⭐⭐⭐ | Maybe |
| Local Photos | FREE-$ | ⭐⭐⭐⭐⭐ | Best |
| Shutterstock | $$$$ | ⭐⭐⭐⭐⭐ | If free not enough |
| Getty Images | $$$$ | ⭐⭐⭐⭐⭐ | If free not enough |

**Total Cost**: $0 (using free sources) to $500+ (using paid stock photos)

---

## Timeline

### Quick Deployment (1 day)
1. **Source images** (2-3 hours)
   - Use Unsplash with specific searches
   - Download best matches
2. **Convert to WebP** (15 minutes)
   - Use ImageMagick batch conversion
3. **Deploy** (30 minutes)
   - Push to production
   - Verify display

### Thorough Deployment (2-3 days)
1. **Source images** (4-6 hours)
   - Download 2-3 options per venue
   - Get client approval if needed
2. **Select and edit** (2-4 hours)
   - Choose best photo per venue
   - Minor edits if needed (crop, brightness)
3. **Optimize and convert** (1 hour)
   - Resize to appropriate dimensions
   - Convert to WebP with quality settings
4. **Test** (1-2 hours)
   - Load test all pages
   - Verify on mobile devices
   - Run Lighthouse audit
5. **Deploy** (1 hour)

---

## Checklist for Content Team

- [ ] **Source Images**
  - [ ] Visit Unsplash.com
  - [ ] Search for each venue type
  - [ ] Download 2-3 options per venue
  - [ ] Organize in local folder

- [ ] **Select Best Photos**
  - [ ] Review all options
  - [ ] Choose one per venue
  - [ ] Ensure variety in angles/styles

- [ ] **Optimize**
  - [ ] Install ImageMagick or use online converter
  - [ ] Convert JPGs to WebP
  - [ ] Verify file sizes (< 200KB each)

- [ ] **Verify Quality**
  - [ ] Check display in browser
  - [ ] Test on mobile
  - [ ] Verify Lighthouse score > 85

- [ ] **Deploy**
  - [ ] Place WebP files in `/public/images/auburn/weddings/`
  - [ ] Update code if image names differ
  - [ ] Test all wedding pages
  - [ ] Commit and merge

---

## Summary

### For Wedding Venue Photos:
1. **Source**: Unsplash.com (FREE, highest quality)
2. **Format**: WebP (Next.js handles automatically)
3. **Quality Setting**: 85 (good balance)
4. **File Size Target**: 100-200KB per image
5. **Conversion Tool**: ImageMagick batch (or online tool)
6. **Time**: 2-4 hours total

### For PDF Guides:
1. **Source**: Create locally or use existing documents
2. **Tool**: PDF creation tools (Adobe, Canva, etc.)
3. **Size Target**: < 2MB per PDF
4. **Optimization**: Compress PDFs if needed

**Total estimated time for all assets: 4-6 hours**

---

**Status**: ✅ Ready for implementation  
**Next Step**: Start sourcing images from Unsplash  
**Recommendation**: Use ImageMagick for batch conversion (fastest)

