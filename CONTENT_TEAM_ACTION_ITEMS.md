# Content Team Action Items - Next Steps

## Overview
All code is complete and deployed. You now need to source images and create PDFs. This is a quick checklist.

---

## What You Need to Do

### ✅ Phase 1: Wedding Venue Photos (10 images)

#### Step 1: Source Images from Unsplash (FREE)
**Time: 2-3 hours**

1. Go to https://unsplash.com
2. Download these (1-2 images per venue):

| Venue | Search Term | Example Keywords |
|-------|------------|------------------|
| Park Victorian | historic Victorian estate | Victorian, wedding, estate |
| Ridge Golf Course | scenic golf course venue | golf, venue, outdoors |
| Garden Theater | outdoor garden ceremony | garden, theater, wedding |
| Veterans Memorial | historic ballroom | ballroom, historic, elegant |
| Old Town Auburn | historic downtown | historic, downtown, architecture |
| Fairgrounds | outdoor event venue | fairgrounds, outdoor, event |
| Hidden Falls | waterfall scenic park | waterfall, park, nature |
| Winery Venue | vineyard wedding | vineyard, wine, wedding |
| State Theatre | historic theater building | theater, historic, venue |
| Bernhard Museum | historic building | museum, historic, gold rush |

#### Step 2: Convert to WebP (15 minutes)

**Option A: Online (Easiest - No Software)**
1. Go to https://image.online-convert.com/convert-to-webp
2. Upload each JPG
3. Set quality to 85
4. Download WebP files

**Option B: Command Line (Fastest)**
```bash
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick
# Windows: https://imagemagick.org/script/download.php

cd /public/images/auburn/weddings/
mogrify -format webp -quality 85 *.jpg
```

#### Step 3: Place Files
```
Copy WebP files to: /public/images/auburn/weddings/
Names should match:
- park-victorian.webp
- ridge-golf-course.webp
- garden-theater.webp
- veterans-memorial.webp
- old-town-auburn-wedding.webp
- fairgrounds.webp
- hidden-falls.webp
- winery-venue.webp
- historic-building.webp (for 3 venues using same image)
- hero-weddings.webp
```

#### Step 4: Test
```bash
npm run dev
# Visit http://localhost:3000/plan/weddings
# Verify all images display correctly
```

---

### ✅ Phase 2: PDF Guides (6 documents)

**Time: 2-4 hours**

#### The 6 PDFs Needed

1. **auburn-visitor-guide.pdf**
   - Content: Hotels, dining, activities, attractions
   - Source: Use existing content from site
   - Pages: 4-8 pages
   - Create in: Word, Google Docs, Canva, Adobe

2. **old-town-walking-map.pdf**
   - Content: Map of historic downtown with shops/restaurants
   - Source: Auburn city maps or create with Google My Maps
   - Pages: 1-2 pages

3. **trail-guide.pdf**
   - Content: Hiking trails, difficulty levels, distances
   - Source: Existing activities data
   - Pages: 3-5 pages

4. **dining-wine-guide.pdf**
   - Content: Restaurants, wineries, breweries
   - Source: Existing dining data
   - Pages: 4-6 pages

5. **events-calendar.pdf**
   - Content: Annual events and festivals
   - Source: Existing events data
   - Pages: 2-3 pages

6. **historic-sites-guide.pdf**
   - Content: Museums, gold rush sites, landmarks
   - Source: Existing activities/history data
   - Pages: 3-5 pages

#### Creation Options

**Easiest: Use Google Docs**
1. Create document in Google Docs
2. Add content from website
3. File → Download → PDF

**Most Professional: Use Canva**
1. Go to https://canva.com
2. Search "PDF guide" templates
3. Edit with your content
4. Download as PDF

**Full Control: Use Adobe InDesign or similar**
1. Design layout
2. Add content
3. Export as PDF

#### File Size Requirements
- Each PDF should be < 2MB
- If larger, compress using: https://www.smallpdf.com/compress-pdf

#### Place Files
```
Copy PDF files to: /public/downloads/
Names must match exactly:
- auburn-visitor-guide.pdf
- old-town-walking-map.pdf
- trail-guide.pdf
- dining-wine-guide.pdf
- events-calendar.pdf
- historic-sites-guide.pdf
```

#### Test
```bash
npm run dev
# Visit http://localhost:3000/plan/maps-guides
# Click each download button
# Verify PDFs download correctly and open properly
```

---

## Quick Timeline

### Minimum (1-2 days)
- Day 1: Source & convert wedding images (3 hrs) + create PDFs (2 hrs)
- Day 2: Test & deploy (1 hr)

### Recommended (2-3 days)
- Day 1: Source images (2-3 hrs), review & convert (1 hr)
- Day 2: Create PDFs (3-4 hrs)
- Day 3: Test everything (1 hr), deploy (30 min)

---

## Common Issues & Solutions

### Images Don't Display
**Check**: File names must match exactly what's in code
```
Code expects: /images/auburn/weddings/park-victorian.webp
File must be: /public/images/auburn/weddings/park-victorian.webp
```

### Conversion Fails
**Solution 1**: Use online converter (no software needed)
**Solution 2**: Ask IT/developer to help with command line

### PDFs Won't Download
**Check**: Files must be in `/public/downloads/` folder
**Check**: File names must be exactly as in code
**Check**: File isn't corrupted (try opening it yourself)

### File Size Too Large
**Solution**: Compress PDFs at https://www.smallpdf.com/compress-pdf

---

## Success Criteria

### ✅ Phase 1 Complete When:
- [ ] 10 WebP files in `/public/images/auburn/weddings/`
- [ ] All files < 200KB each
- [ ] All images display on /plan/weddings page
- [ ] No 404 errors in browser console

### ✅ Phase 2 Complete When:
- [ ] 6 PDF files in `/public/downloads/`
- [ ] All files < 2MB each
- [ ] All download links work on /plan/maps-guides
- [ ] PDFs open correctly when downloaded

---

## Tools You'll Need

| Task | Tool | Cost | Difficulty |
|------|------|------|-----------|
| Source images | Unsplash.com | FREE | Very Easy |
| Convert JPG→WebP | ImageMagick or Online-Convert | FREE | Easy |
| Create PDFs | Google Docs or Canva | FREE | Easy |
| Compress PDFs | SmallPDF.com | FREE | Very Easy |
| Test locally | npm run dev | FREE | Moderate |

---

## Example Workflow

### Day 1 Morning (2 hours)
1. Open Unsplash in browser
2. Search for first venue type
3. Download 2-3 best images
4. Repeat for all 10 venues
5. You now have 20-30 image files

### Day 1 Afternoon (1 hour)
1. Open Online-Convert.com
2. Upload all JPGs
3. Convert to WebP (quality 85)
4. Download all WebP files
5. Place in `/public/images/auburn/weddings/`

### Day 2 Morning (3 hours)
1. Open Google Docs
2. Create first PDF (visitor guide)
3. Add content from website
4. Download as PDF
5. Repeat for remaining 5 PDFs

### Day 2 Afternoon (1 hour)
1. Run `npm run dev`
2. Visit /plan/weddings - verify images
3. Visit /plan/maps-guides - verify downloads
4. Check browser console for errors
5. Test on mobile phone

### Day 3 (30 minutes)
1. Confirm everything works
2. Let developer know you're done
3. Developer commits and deploys
4. Done! 🎉

---

## Getting Help

### If You're Stuck

**For image sourcing questions:**
- Unsplash has tutorials: https://unsplash.com/napi/users/unsplash/portfolio

**For conversion help:**
- ImageMagick docs: https://imagemagick.org/Usage/
- Online-Convert FAQs: https://image.online-convert.com

**For PDF creation:**
- Google Docs help: https://support.google.com/docs
- Canva tutorials: https://www.canva.com/designschool/tutorials/pdf

**For technical issues:**
- Ask the development team
- Check IMAGE_SOURCING_GUIDE.md in the repo

---

## What NOT to Do

❌ Don't: Use PNG format (too large)
✅ Do: Use WebP format (smaller, modern)

❌ Don't: Use JPEG format for web (less efficient than WebP)
✅ Do: Use WebP for best performance

❌ Don't: Use low-quality images (quality < 75)
✅ Do: Use quality 85 for good balance

❌ Don't: Forget to convert to WebP
✅ Do: Always convert to WebP for web

❌ Don't: Leave JPGs in public folder
✅ Do: Delete original JPGs after conversion (optional)

❌ Don't: Upload files to wrong location
✅ Do: Double-check folder paths

---

## Checklist to Complete

### Wedding Images
- [ ] Opened Unsplash.com
- [ ] Searched and downloaded images for each venue
- [ ] Converted all to WebP format
- [ ] Placed 10 WebP files in `/public/images/auburn/weddings/`
- [ ] Tested on /plan/weddings page
- [ ] All images display correctly

### PDF Guides
- [ ] Created 6 PDF documents
- [ ] Saved files with correct names
- [ ] Placed 6 PDF files in `/public/downloads/`
- [ ] Tested on /plan/maps-guides page
- [ ] All downloads work correctly

### Testing
- [ ] Run `npm run dev`
- [ ] Check /plan/weddings page
- [ ] Check /plan/maps-guides page
- [ ] Test on mobile phone
- [ ] No console errors
- [ ] Notify developer when complete

---

## Estimated Costs

| Resource | Cost |
|----------|------|
| Wedding venue images (from Unsplash) | $0 |
| Conversion tool (ImageMagick) | $0 |
| PDF creation (Google Docs) | $0 |
| PDF creation (Canva premium) | $13/month (optional) |
| **Total** | **$0** |

**You can complete this entire task with FREE tools!**

---

## Time Estimate

| Task | Time |
|------|------|
| Source images | 2-3 hours |
| Convert to WebP | 15 minutes |
| Create PDFs | 2-4 hours |
| Test | 30 minutes - 1 hour |
| **Total** | **5-8 hours** |

**Can be done in 1-2 days of work**

---

## Questions?

- See: `IMAGE_SOURCING_GUIDE.md` for detailed instructions
- Ask: Development team for help with technical issues
- Reference: `TESTING_CHECKLIST.md` for verification steps

---

**Status**: Ready to start  
**Start Date**: ASAP  
**Deadline**: ASAP (blocking deployment)  
**Estimated Completion**: 1-2 days

