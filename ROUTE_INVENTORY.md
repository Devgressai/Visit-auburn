# Visit Auburn - Route Inventory & Backlog
**Date:** December 29, 2025  
**Status:** LOOP 1 Complete - Starting LOOP 2

## Route Inventory

### Scoring Criteria (0-10 scale)
- **Content Depth**: Sections, word count, unique local entities
- **Template Risk**: Generic copy, icon-only blocks, repeated patterns
- **Realness**: Real Auburn places/entities, honest labels
- **Media**: Real Auburn images wired + alt text
- **UX**: CTA clarity, breadcrumbs, navigation continuity, not orphaned
- **SEO**: Unique title/description, single H1, heading structure
- **Accessibility**: Semantic structure, labels, focus, contrast
- **Performance**: Next/Image sizing, priority usage, CLS

---

## HIGH PRIORITY (Fix Immediately)

### `/plan/meetings` - Score: 6.5/10
**Issues:**
- ✅ Good content depth (8 venues, team building, getting here)
- ⚠️ Venue count: 8 venues (target: 8-12) - needs 4 more
- ✅ No placeholder contact info in UI (form-only)
- ⚠️ Images: Uses auburnImages system but needs verification
- ✅ Good palette rhythm (white → blue → white → cream)
- ✅ Breadcrumbs present
- ✅ Real Auburn content

**Action Items:**
1. Expand venue list to 12 entries
2. Verify all images exist in /public/images/auburn/meetings/
3. Ensure all venues labeled correctly (Auburn vs Near Auburn)

---

### `/plan/weddings` - Score: 7/10
**Issues:**
- ✅ Good content depth (8 venues, weekend itinerary, photo spots, seasonal tips)
- ⚠️ Venue count: 8 venues (target: 8-12) - needs 4 more
- ✅ No placeholder contact info (form-only)
- ⚠️ Images: References wedding images that may not exist
- ✅ Excellent content sections (6+ sections)
- ✅ Good internal linking
- ✅ Breadcrumbs present

**Action Items:**
1. Expand venue list to 12 entries
2. Verify/create wedding images in /public/images/auburn/weddings/
3. Ensure all venues labeled correctly

---

### `/plan/venues` - Score: 4/10
**Issues:**
- ❌ Only 3 example venues (target: 12-20)
- ❌ Uses exampleVenues mock data
- ❌ No filters implemented
- ⚠️ Palette: Uses indigo/purple gradient (not homepage palette)
- ✅ Breadcrumbs present
- ⚠️ Images: Uses placeholder system

**Action Items:**
1. Expand to 12-20 real venues
2. Add category filters (indoor/outdoor/historic/modern)
3. Fix palette to match homepage (white → blue accent → white)
4. Add map links for all venues
5. Label "Near Auburn" venues correctly

---

### `/events` - Score: 6/10
**Issues:**
- ✅ Good content structure
- ⚠️ No monthly grouping
- ⚠️ No featured annual events section
- ✅ Uses real Auburn images
- ✅ Good SEO metadata
- ✅ Breadcrumbs present

**Action Items:**
1. Add monthly event grouping
2. Add "Featured Annual Events" section
3. Ensure no fake dates if using sample data

---

### `/search` - Score: 3/10
**Issues:**
- ❌ Basic mock results only
- ❌ No featured categories
- ❌ No popular directories
- ❌ Weak empty-state content
- ⚠️ Palette: Uses blue/purple gradient (not homepage palette)
- ✅ Basic search functionality

**Action Items:**
1. Add featured search categories
2. Add popular directories section
3. Improve empty-state content
4. Fix palette to match homepage
5. Add real search implementation or better mock data

---

### Legal Pages (Missing)
**Issues:**
- ❌ `/privacy` - Does not exist
- ❌ `/terms` - Does not exist
- ❌ `/accessibility` - Does not exist
- ⚠️ Footer links to these pages but they don't exist

**Action Items:**
1. Create /app/privacy/page.tsx
2. Create /app/terms/page.tsx
3. Create /app/accessibility/page.tsx
4. Ensure footer links work

---

## MEDIUM PRIORITY

### `/` (Homepage) - Score: 9/10
**Status:** ✅ Excellent - Do not modify per requirements
- ✅ Excellent content depth
- ✅ Real Auburn images
- ✅ Perfect palette rhythm
- ✅ Strong SEO
- ✅ Great UX

---

### `/accommodations` - Score: 8/10
**Issues:**
- ✅ Excellent content depth
- ✅ Real Auburn-specific copy
- ✅ Good images
- ✅ Breadcrumbs present
- ⚠️ Could add more directory entries

**Action Items:**
1. Ensure 12+ accommodation entries
2. Add seasonal booking tips

---

### `/dining` - Score: 8/10
**Issues:**
- ✅ Good content depth
- ✅ Real Auburn images
- ✅ Breadcrumbs present
- ⚠️ Could expand directory entries

**Action Items:**
1. Ensure 12+ dining entries
2. Add "Best for" categories

---

### `/things-to-do` - Score: 7/10
**Issues:**
- ✅ Good structure
- ⚠️ Could add more depth
- ✅ Breadcrumbs present

**Action Items:**
1. Add more category pages
2. Expand content depth

---

### `/itineraries` - Score: 7/10
**Issues:**
- ✅ Good itinerary pages
- ⚠️ Could add more itineraries
- ✅ Real Auburn content

**Action Items:**
1. Add seasonal itineraries
2. Add "best for" filters

---

### `/plan/faq` - Score: 7/10
**Issues:**
- ⚠️ Contains `info@visitauburn.com` (placeholder email)
- ✅ Good FAQ content
- ✅ Breadcrumbs present

**Action Items:**
1. Remove placeholder email or replace with form-only contact
2. Verify phone number is real

---

### `/plan/visitor-information` - Score: 7/10
**Issues:**
- ⚠️ Contains `info@visitauburn.com` (placeholder email)
- ✅ Good content
- ✅ Real phone number (530) 885-5616

**Action Items:**
1. Remove placeholder email or replace with form-only contact

---

## LOW PRIORITY

### Detail Pages (`/accommodations/[slug]`, `/dining/[slug]`, etc.)
**Status:** Review individually as needed
- Most detail pages follow good patterns
- Some may need image verification

---

## Global Issues

### Canonical URLs
**Status:** ✅ Correct
- SITE_URL = 'https://visit-auburn.com' (correct)
- Need to verify all pages use this

### Placeholder Contact Info
**Found:**
- `info@visitauburn.com` in:
  - `/app/plan/faq/page.tsx` (line 24)
  - `/app/plan/visitor-information/page.tsx` (line 213)
  - `/lib/seo/jsonld.ts` (line 24) - in schema only, OK

**Action Items:**
1. Remove or replace with form-only contact
2. Create `npm run check:placeholders` script

---

## Summary

**HIGH Priority Routes:** 6
- `/plan/meetings` - Expand venues
- `/plan/weddings` - Expand venues  
- `/plan/venues` - Major expansion needed
- `/events` - Add grouping
- `/search` - Major enhancement needed
- Legal pages - Create 3 pages

**MED Priority Routes:** 6
- Various improvements needed

**LOW Priority Routes:** Detail pages (review as needed)

**Global Fixes:**
- Remove placeholder emails
- Verify canonical URLs
- Create placeholder check script
- Global accessibility pass

---

## Next Steps

1. ✅ Complete LOOP 1 (this document)
2. 🔄 Start LOOP 2: Fix HIGH priority pages
3. ⏳ LOOP 3: Scale MED pages
4. ⏳ LOOP 4: Global quality passes

