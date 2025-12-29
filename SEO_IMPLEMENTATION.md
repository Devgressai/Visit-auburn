# Auburn Travel Site - Comprehensive SEO Implementation

## Overview
This document outlines the complete SEO metadata and structured data implementation for the Visit Auburn website.

---

## 1. Next.js Metadata API Implementation

### Global Metadata (app/layout.tsx)
```typescript
export const metadata: Metadata = {
  title: {
    default: 'Visit Auburn - Discover California\'s Gold Country',
    template: '%s | Visit Auburn',
  },
  description: 'Explore Auburn, California - your guide to accommodations, activities, dining, events, and attractions in the heart of Gold Country.',
  keywords: ['Auburn California', 'Gold Country', 'travel', 'tourism', ...],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://visit-auburn.com',
    siteName: 'Visit Auburn',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@visitauburn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### Per-Page Metadata Pattern
Every route uses `buildMetadata()` helper:

```typescript
import { buildMetadata, SITE_URL } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Page Title - Auburn, California',
    description: '150-160 character description with Auburn, CA keywords...',
    canonical: `${SITE_URL}/route-path`,
    ogImage: '/images/page-og.jpg', // Optional
  })
}
```

---

## 2. JSON-LD Structured Data

### Site-Wide Schemas (app/layout.tsx)

#### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Visit Auburn",
  "url": "https://visit-auburn.com",
  "logo": "https://visit-auburn.com/logo.png",
  "description": "Official tourism guide for Auburn, California...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Auburn",
    "addressRegion": "CA",
    "addressCountry": "US",
    "postalCode": "95603"
  },
  "sameAs": [
    "https://www.facebook.com/VisitAuburnCA",
    "https://www.instagram.com/visitauburnca",
    "https://twitter.com/visitauburn"
  ]
}
```

#### TouristDestination Schema
```json
{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Auburn, California",
  "description": "Auburn is California's premier Gold Country destination...",
  "url": "https://visit-auburn.com",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "38.8966",
    "longitude": "-121.0770"
  },
  "touristType": [
    "Outdoor Enthusiasts",
    "History Buffs",
    "Families",
    "Couples",
    "Cultural Travelers"
  ]
}
```

### Per-Page BreadcrumbList Schema
Every page with breadcrumbs automatically generates:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://visit-auburn.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Things to Do",
      "item": "https://visit-auburn.com/things-to-do"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Outdoor Adventures",
      "item": "https://visit-auburn.com/things-to-do/outdoor-adventures"
    }
  ]
}
```

---

## 3. Sample Metadata Output (3 Pages)

### Sample 1: Homepage (/)
```html
<title>Visit Auburn - Discover California's Gold Country | Visit Auburn</title>
<meta name="description" content="Explore Auburn, California - your guide to accommodations, activities, dining, events, and attractions in the heart of Gold Country.">
<link rel="canonical" href="https://visit-auburn.com">
<meta property="og:title" content="Visit Auburn - Discover California's Gold Country">
<meta property="og:description" content="Explore Auburn, California - your guide to accommodations, activities, dining, events, and attractions in the heart of Gold Country.">
<meta property="og:url" content="https://visit-auburn.com">
<meta property="og:site_name" content="Visit Auburn">
<meta property="og:type" content="website">
<meta property="og:image" content="https://visit-auburn.com/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Visit Auburn - Discover California's Gold Country">
<meta name="twitter:description" content="Explore Auburn, California - your guide to accommodations, activities, dining, events, and attractions in the heart of Gold Country.">
<meta name="twitter:image" content="https://visit-auburn.com/og-image.jpg">
```

### Sample 2: Outdoor Adventures (/things-to-do/outdoor-adventures)
```html
<title>Outdoor Adventures in Auburn, California - Hiking, Biking & Water Sports | Visit Auburn</title>
<meta name="description" content="Discover outdoor recreation in Auburn, CA. Hike Lake Clementine Trail, explore Hidden Falls Regional Park, mountain bike Western States Trail, and swim the American River in Gold Country.">
<link rel="canonical" href="https://visit-auburn.com/things-to-do/outdoor-adventures">
<meta property="og:title" content="Outdoor Adventures in Auburn, California - Hiking, Biking & Water Sports">
<meta property="og:description" content="Discover outdoor recreation in Auburn, CA. Hike Lake Clementine Trail, explore Hidden Falls Regional Park, mountain bike Western States Trail, and swim the American River in Gold Country.">
<meta property="og:url" content="https://visit-auburn.com/things-to-do/outdoor-adventures">
<meta property="og:site_name" content="Visit Auburn">
<meta property="og:type" content="website">
<meta property="og:image" content="https://visit-auburn.com/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Outdoor Adventures in Auburn, California - Hiking, Biking & Water Sports">
<meta name="twitter:description" content="Discover outdoor recreation in Auburn, CA. Hike Lake Clementine Trail, explore Hidden Falls Regional Park, mountain bike Western States Trail, and swim the American River in Gold Country.">
```

### Sample 3: Weekend Getaway Itinerary (/itineraries/weekend-getaway)
```html
<title>Auburn Weekend Getaway Itinerary - 2-3 Day Gold Country Trip | Visit Auburn</title>
<meta name="description" content="Perfect Auburn, CA weekend: Lake Clementine hiking, Old Town dining, Gold Rush museums, and American River canyon views. Complete day-by-day itinerary with timing and tips.">
<link rel="canonical" href="https://visit-auburn.com/itineraries/weekend-getaway">
<meta property="og:title" content="Auburn Weekend Getaway Itinerary - 2-3 Day Gold Country Trip">
<meta property="og:description" content="Perfect Auburn, CA weekend: Lake Clementine hiking, Old Town dining, Gold Rush museums, and American River canyon views. Complete day-by-day itinerary with timing and tips.">
<meta property="og:url" content="https://visit-auburn.com/itineraries/weekend-getaway">
<meta property="og:site_name" content="Visit Auburn">
<meta property="og:type" content="website">
<meta property="og:image" content="https://visit-auburn.com/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Auburn Weekend Getaway Itinerary - 2-3 Day Gold Country Trip">
<meta name="twitter:description" content="Perfect Auburn, CA weekend: Lake Clementine hiking, Old Town dining, Gold Rush museums, and American River canyon views. Complete day-by-day itinerary with timing and tips.">
```

---

## 4. Route Metadata Verification

### All Routes with Metadata ✅

| Route | Title | Has Canonical | Has OG | Has Twitter |
|-------|-------|---------------|--------|-------------|
| `/` | Visit Auburn - Discover California's Gold Country | ✅ | ✅ | ✅ |
| `/accommodations` | Where to Stay in Auburn, California | ✅ | ✅ | ✅ |
| `/things-to-do` | Things to Do in Auburn, California | ✅ | ✅ | ✅ |
| `/things-to-do/outdoor-adventures` | Outdoor Adventures in Auburn, California | ✅ | ✅ | ✅ |
| `/things-to-do/history-culture` | Gold Rush History & Culture in Auburn, California | ✅ | ✅ | ✅ |
| `/things-to-do/arts-culture` | Arts & Culture in Auburn, California | ✅ | ✅ | ✅ |
| `/dining` | Dining in Auburn, California | ✅ | ✅ | ✅ |
| `/events` | Events in Auburn, California | ✅ | ✅ | ✅ |
| `/discover` | Discover Auburn, California | ✅ | ✅ | ✅ |
| `/itineraries` | Auburn Itineraries | ✅ | ✅ | ✅ |
| `/itineraries/weekend-getaway` | Auburn Weekend Getaway Itinerary | ✅ | ✅ | ✅ |
| `/itineraries/outdoor-adventure` | Auburn Outdoor Adventure Itinerary | ✅ | ✅ | ✅ |
| `/itineraries/gold-rush-history` | Gold Rush History Itinerary | ✅ | ✅ | ✅ |
| `/itineraries/family-fun` | Family Fun in Auburn | ✅ | ✅ | ✅ |
| `/itineraries/romantic-escape` | Romantic Escape to Auburn | ✅ | ✅ | ✅ |
| `/plan/visitor-information` | Visitor Information | ✅ | ✅ | ✅ |
| `/plan/getting-here` | Getting to Auburn | ✅ | ✅ | ✅ |
| `/plan/maps-guides` | Maps & Guides | ✅ | ✅ | ✅ |
| `/plan/faq` | FAQ | ✅ | ✅ | ✅ |
| `/plan/weddings` | Weddings in Auburn | ✅ | ✅ | ✅ |
| `/plan/meetings` | Meetings & Groups | ✅ | ✅ | ✅ |
| `/plan/venues` | Venues | ✅ | ✅ | ✅ |
| `/plan/respect-auburn` | Respect Auburn | ✅ | ✅ | ✅ |
| `/special-offers` | Special Offers | ✅ | ✅ | ✅ |
| `/search` | Search | ✅ | ✅ | ✅ |

---

## 5. Internal Linking Structure

### Topical Cluster Pattern
Each page links to:
1. **Pillar Page** - Parent topic hub
2. **2 Sibling Pages** - Related subtopics
3. **2 Cross-Topic Pages** - Complementary categories

### Example: Outdoor Adventures Page Links
```
Pillar: /things-to-do
Siblings: /things-to-do/history-culture, /things-to-do/arts-culture
Cross-Topic: /accommodations, /dining
Related: /itineraries/outdoor-adventure, /plan/maps-guides
```

### Link Implementation
- **Breadcrumbs Component**: Links to parent hierarchy
- **RelatedPages Component**: 6 contextual links from route map
- **Body Content**: 8-12 contextual internal links

---

## 6. Sitemap Configuration

### File: app/sitemap.ts
Generates sitemap.xml with:
- All static routes from route map
- Dynamic activity pages
- Dynamic event pages
- Dynamic editorial pages

### Priority Levels
- Homepage: 1.0
- Main pillars (things-to-do, accommodations, dining, events): 0.9
- Sub-hubs and itineraries: 0.85
- Plan pages: 0.7
- Dynamic content: 0.7-0.8

### Change Frequency
- Homepage: daily
- Events: daily
- Pillars: weekly
- Plan pages: monthly

---

## 7. Robots.txt Configuration

### File: app/robots.ts
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
    ],
    sitemap: 'https://visit-auburn.com/sitemap.xml',
  }
}
```

---

## 8. SEO Helper Functions

### Location: lib/seo/

#### buildMetadata(options)
Creates complete Next.js Metadata object:
- title
- description
- canonical URL
- OpenGraph tags
- Twitter cards
- robots directives

#### organizationJsonLd()
Returns Organization schema for site-wide use.

#### touristDestinationJsonLd()
Returns TouristDestination schema for Auburn.

#### breadcrumbJsonLd(items)
Generates BreadcrumbList schema from breadcrumb items.

#### localBusinessJsonLd(place)
Creates LocalBusiness schema for accommodations/dining.

#### touristAttractionJsonLd(activity)
Creates TouristAttraction schema for activities.

#### eventJsonLd(event)
Creates Event schema for events.

#### articleJsonLd(editorial)
Creates Article schema for discover/editorial content.

---

## 9. Implementation Checklist

### ✅ Completed
- [x] Global metadata in layout.tsx
- [x] Per-page generateMetadata() on all routes
- [x] Organization JSON-LD (site-wide)
- [x] TouristDestination JSON-LD (site-wide)
- [x] BreadcrumbList JSON-LD helper
- [x] Canonical URLs on all pages
- [x] OpenGraph tags on all pages
- [x] Twitter cards on all pages
- [x] Dynamic sitemap.xml
- [x] robots.txt configuration
- [x] Internal linking via RelatedPages
- [x] Breadcrumb navigation

### Schema Types Used
- Organization ✅
- TouristDestination ✅
- BreadcrumbList ✅
- LocalBusiness (accommodations/dining)
- TouristAttraction (activities)
- Event (events)
- Article (editorials)

---

## 10. Testing & Validation

### Tools for Validation
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console**: Monitor indexing and errors
4. **Screaming Frog**: Crawl site for SEO issues

### Key Metrics to Monitor
- Pages indexed in Google
- Rich results eligibility
- Core Web Vitals
- Click-through rates from SERPs
- Canonical URL errors
- Structured data warnings

---

## Summary

The Visit Auburn site now has comprehensive SEO implementation:

1. **Metadata API**: Every route has title, description, canonical, OG, Twitter
2. **JSON-LD**: Organization + TouristDestination site-wide, BreadcrumbList per page
3. **Sitemap**: Dynamic, includes all static and dynamic routes
4. **Robots.txt**: Properly configured for crawling
5. **Internal Linking**: Topical clusters via RelatedPages + breadcrumbs

Total Routes with Full SEO: **25+ static pages** + dynamic content pages

