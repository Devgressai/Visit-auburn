# Auburn Travel Site - Complete Page Architecture Audit

## Current Structure Analysis

### ✅ EXISTING Pages:
1. **Homepage** - `/` (exists)
2. **Accommodations** - `/accommodations` (exists, rewritten)
3. **Activities** - `/activities` (exists, alias for things-to-do)
4. **Things to Do** - `/things-to-do` (exists)
5. **Dining** - `/dining` (exists)
6. **Events** - `/events` (exists)
7. **Discover** - `/discover/[slug]` (blog/editorial - dynamic only)
8. **Search** - `/search` (exists)
9. **Special Offers** - `/special-offers` (exists)

### ✅ EXISTING Plan Pages:
1. `/plan/visitor-information` (exists)
2. `/plan/getting-here` (exists)
3. `/plan/maps-guides` (exists)
4. `/plan/faq` (exists)
5. `/plan/respect-auburn` (exists)
6. `/plan/weddings` (exists)
7. `/plan/meetings` (exists)
8. `/plan/venues` (exists)

### ✅ EXISTING Sub-category Pages:
1. `/things-to-do/outdoor-adventures` (route defined, no page file)
2. `/things-to-do/history-culture` (route defined, no page file)
3. `/things-to-do/arts-culture` (route defined, no page file)

---

## ❌ MISSING CRITICAL Pages

### Priority 1: Destination Pillar Pages

#### 1. **Discover Landing Page** ❌
**Route:** `/discover`
**Current Status:** Only has `/discover/[slug]` for individual articles
**Needs:** Landing page showcasing Auburn stories, guides, itineraries

#### 2. **Itineraries Section** ❌
**Route:** `/itineraries` (NEW)
**Current Status:** Doesn't exist
**Needs:** Hub page for trip planning guides

---

### Priority 2: Things to Do Sub-Hubs (Routes Exist, Pages Don't)

#### 3. **Outdoor Adventures** ❌
**Route:** `/things-to-do/outdoor-adventures`
**Current Status:** Route in map, no actual page.tsx
**Needs:** Dedicated page for hiking, biking, water sports

#### 4. **History & Culture** ❌
**Route:** `/things-to-do/history-culture`
**Current Status:** Route in map, no actual page.tsx
**Needs:** Museums, Gold Rush sites, historic tours

#### 5. **Arts & Culture** ❌
**Route:** `/things-to-do/arts-culture`
**Current Status:** Route in map, no actual page.tsx
**Needs:** Galleries, theater, art walks

---

### Priority 3: Itinerary Templates

#### 6. **Weekend Getaway** ❌
**Route:** `/itineraries/weekend-getaway`
**Needs:** 2-3 day Auburn itinerary

#### 7. **Outdoor Adventure** ❌
**Route:** `/itineraries/outdoor-adventure`
**Needs:** Hiking, biking, river activities

#### 8. **Gold Rush History** ❌
**Route:** `/itineraries/gold-rush-history`
**Needs:** Museums, historic sites tour

#### 9. **Family Fun** ❌
**Route:** `/itineraries/family-fun`
**Needs:** Kid-friendly activities

#### 10. **Romantic Escape** ❌
**Route:** `/itineraries/romantic-escape`
**Needs:** Couples-focused itinerary

---

### Priority 4: Enhanced Plan Pages

#### 11. **What's New** ❌
**Route:** `/plan/whats-new`
**Needs:** Recent updates, new openings, seasonal news

#### 12. **Accessibility** ❌
**Route:** `/plan/accessibility`
**Needs:** ADA info, accessible trails, accommodations

---

## 📋 Pages to Create (12 Total)

### IMMEDIATE (Must-Have Pillars) - 5 Pages:
1. ✅ `/discover` - Discover Auburn landing page
2. ✅ `/itineraries` - Trip planning hub
3. ✅ `/things-to-do/outdoor-adventures` - Outdoor activities pillar
4. ✅ `/things-to-do/history-culture` - History pillar
5. ✅ `/things-to-do/arts-culture` - Arts pillar

### IMPORTANT (Itinerary Templates) - 5 Pages:
6. ✅ `/itineraries/weekend-getaway`
7. ✅ `/itineraries/outdoor-adventure`
8. ✅ `/itineraries/gold-rush-history`
9. ✅ `/itineraries/family-fun`
10. ✅ `/itineraries/romantic-escape`

### NICE-TO-HAVE (Enhanced Planning) - 2 Pages:
11. `/plan/whats-new`
12. `/plan/accessibility`

---

## Implementation Plan

### Phase 1: Critical Pillar Pages (Immediate)
Create 5 destination pillar pages with full content

### Phase 2: Itinerary Templates (Important)
Create 5 trip planning guides with day-by-day itineraries

### Phase 3: Enhanced Planning (Nice-to-Have)
Add accessibility and what's new pages

---

## Content Requirements Per Page:

### Discover Landing (`/discover`)
- Hero: showcase Auburn storytelling
- Featured editorials (pull from `/discover/[slug]`)
- Categories: Outdoor, History, Food, Events
- Word count: 600-800
- Images: 1 hero + 2 inline
- Links: things-to-do, events, dining

### Itineraries Hub (`/itineraries`)
- Hero: trip planning intro
- 5 itinerary cards (weekend, adventure, history, family, romantic)
- Planning tips
- Word count: 500-700
- Images: 1 hero + 1 inline
- Links: accommodations, dining, things-to-do

### Outdoor Adventures (`/things-to-do/outdoor-adventures`)
- Hero: Auburn trails and recreation
- Specific activities: hiking, biking, water sports
- Trail highlights: Lake Clementine, Hidden Falls, Western States
- Word count: 800-1000
- Images: 1 hero + 3 activity images
- Links: accommodations, dining, itineraries/outdoor-adventure

### History & Culture (`/things-to-do/history-culture`)
- Hero: Gold Rush heritage
- Museums: Gold Country, Placer County, Bernhard
- Historic sites: Courthouse, Old Town, railroad
- Word count: 800-1000
- Images: 1 hero + 3 historic images
- Links: accommodations, discover, itineraries/gold-rush-history

### Arts & Culture (`/things-to-do/arts-culture`)
- Hero: Auburn arts scene
- Galleries, theater, music venues
- Art walks, festivals
- Word count: 600-800
- Images: 1 hero + 2 culture images
- Links: events, dining, accommodations

### Each Itinerary Page:
- Day-by-day schedule
- Morning, afternoon, evening activities
- Dining recommendations
- Where to stay
- Practical tips
- Word count: 600-900
- Images: 1 hero + 2-3 activity images
- Links: specific activities, restaurants, hotels

---

## File Structure to Create:

```
app/
├── discover/
│   └── page.tsx (NEW)
├── itineraries/
│   ├── page.tsx (NEW)
│   ├── weekend-getaway/
│   │   └── page.tsx (NEW)
│   ├── outdoor-adventure/
│   │   └── page.tsx (NEW)
│   ├── gold-rush-history/
│   │   └── page.tsx (NEW)
│   ├── family-fun/
│   │   └── page.tsx (NEW)
│   └── romantic-escape/
│       └── page.tsx (NEW)
└── things-to-do/
    ├── outdoor-adventures/
    │   └── page.tsx (NEW)
    ├── history-culture/
    │   └── page.tsx (NEW)
    └── arts-culture/
        └── page.tsx (NEW)
```

---

## Route Map Additions Needed:

All 12 new pages need entries in `/lib/routes.ts` with:
- path
- breadcrumbLabel
- parentSection (if applicable)
- relatedPages (min 5)
- photoRequired: true
- blurb (Auburn-specific, 1 sentence)

---

## Priority Order for Creation:

1. **Outdoor Adventures** - Most important sub-hub
2. **History & Culture** - Second most important sub-hub  
3. **Discover Landing** - Missing pillar
4. **Itineraries Hub** - New section
5. **Arts & Culture** - Third sub-hub
6. **Weekend Getaway Itinerary** - Most popular
7. **Outdoor Adventure Itinerary** - Aligns with outdoor hub
8. **Gold Rush History Itinerary** - Aligns with history hub
9. **Family Fun Itinerary** - Broad appeal
10. **Romantic Escape Itinerary** - Niche appeal

---

## Images Available from auburnImages.ts:

### For Outdoor Adventures:
- `hero-american-river-canyon`
- `hero-lake-clementine`
- `outdoor-quarry-ponds`
- `outdoor-hidden-falls`
- `outdoor-mountain-biking`
- `outdoor-river-swimming`
- `outdoor-overlook-park`

### For History & Culture:
- `hero-old-town-clocktower`
- `historic-courthouse`
- `historic-firehouse-tower`
- `historic-gold-country-museum`
- `historic-bernhard-museum`
- `historic-railroad-depot`

### For Arts & Culture:
- `hero-downtown-autumn`
- `culture-gallery`
- `culture-theater`
- `downtown-night`
- `event-art-walk`

### For Discover:
- `hero-foresthill-bridge`
- `downtown-lincoln-way`
- `nature-wildflowers-spring`
- `nature-sunset-hills`

### For Itineraries:
- Mix from all categories based on itinerary theme
- Use hero images for main itinerary pages
- Use activity-specific images for day-by-day sections

---

## Next Steps:

1. Create file structure (12 new page.tsx files)
2. Add route map entries for all 12 pages
3. Write Auburn-specific content for each page
4. Add required images using AuburnImage component
5. Add breadcrumbs and related pages to each
6. Add metadata (title, description, OG)
7. Cross-link between related pages
8. Update validation to include new pages
9. Test all navigation flows
10. Deploy

