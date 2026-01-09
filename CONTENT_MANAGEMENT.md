# Content Management Guide

This guide explains how to manually update content on the Visit Auburn website.

## Overview

All site content is stored in a single file: `/lib/data/content.ts`

This includes:
- Activities & attractions
- Accommodations
- Restaurants & dining
- Events
- Blog articles (editorials)
- Homepage featured content
- Navigation menu

## Quick Start

1. Open `/lib/data/content.ts` in your code editor
2. Find the section you want to update (e.g., `export const activities`)
3. Make your changes
4. Save the file
5. Rebuild and deploy the site

## Content Types

### Activities

Located in: `export const activities`

Example:
```typescript
{
  _id: 'activity-1',
  _type: 'activity',
  title: 'Lake Clementine Trail',
  slug: createSlug('lake-clementine-trail'),
  excerpt: 'Scenic hiking trail along Lake Clementine...',
  featuredImage: createImage(activityImages['lake-clementine-trail'], 'Lake Clementine Trail'),
  location: {
    address: 'Lake Clementine Access Road',
    city: 'Auburn',
    state: 'CA',
    zip: '95603',
  },
  subHub: 'outdoor-adventures', // Options: 'outdoor-adventures', 'history-culture', 'arts-culture'
  duration: '2-3 hours',
  priceRange: 'Free', // or '$', '$$', '$$$'
  category: 'Hiking',
  seoTitle: 'Lake Clementine Trail - Hiking in Auburn, CA',
  seoDescription: 'Discover the scenic Lake Clementine Trail...',
}
```

### Accommodations

Located in: `export const accommodations`

Example:
```typescript
{
  _id: 'accommodation-1',
  _type: 'accommodation',
  title: 'Historic Auburn Hotel',
  slug: createSlug('historic-auburn-hotel'),
  excerpt: 'Charming historic hotel...',
  featuredImage: createImage('stay', 'Historic Auburn Hotel'),
  location: { /* same as above */ },
  category: 'Hotel', // Options: 'Hotel', 'Motel', 'B&B', 'Vacation Rental'
  priceRange: '$$', // $, $$, $$$, $$$$
  rating: 4.5, // 1-5
  amenities: ['Wi-Fi', 'Parking', 'Breakfast'],
}
```

### Dining

Located in: `export const dining`

Example:
```typescript
{
  _id: 'dining-1',
  _type: 'dining',
  title: 'Mt Vernon Winery',
  slug: createSlug('mt-vernon-winery'),
  excerpt: 'Local winery offering wine tastings...',
  featuredImage: createImage('dining', 'Mt Vernon Winery'),
  location: { /* same as above */ },
  category: 'Winery', // Options: 'Restaurant', 'Cafe', 'Winery', 'Brewery', 'Market'
  cuisine: 'Wine Tasting', // Any cuisine type
  priceRange: '$$',
}
```

### Events

Located in: `export const events`

Example:
```typescript
{
  _id: 'event-1',
  _type: 'event',
  title: 'Gold Rush Days',
  slug: createSlug('gold-rush-days'),
  excerpt: 'Annual festival celebrating Auburn\'s Gold Rush heritage...',
  featuredImage: createImage('hero', 'Gold Rush Days'),
  startDate: '2025-05-15T10:00:00.000Z', // ISO date string
  endDate: '2025-05-17T18:00:00.000Z',   // Optional
  location: { /* same as above */ },
  category: 'Festival', // Any category
}
```

## Common Tasks

### Adding a New Activity

1. Copy an existing activity entry
2. Update `_id` to be unique (e.g., 'activity-14')
3. Update `title`, `slug`, and `excerpt`
4. Update `location` information
5. Choose appropriate `subHub`, `category`, `duration`, and `priceRange`
6. Update SEO fields

### Updating an Image

Images are stored in `/lib/images.ts` and referenced by key. To add a new image:

1. Find an image on Unsplash
2. Add it to the appropriate section in `/lib/images.ts`:

```typescript
export const activityImages = {
  'your-activity-slug': 'https://images.unsplash.com/photo-xxxxx?w=1200&q=80',
  // ... other images
}
```

3. Reference it in `content.ts`:
```typescript
featuredImage: createImage(activityImages['your-activity-slug'], 'Alt text'),
```

### Updating Homepage Featured Content

Located in: `export const homepage`

```typescript
export const homepage = {
  heroTitle: 'Discover Auburn, California',
  heroSubtitle: 'Your gateway to Gold Country...',
  featuredActivities: activities.slice(0, 6), // First 6 activities
  featuredExperiences: [
    activities[0],  // Choose specific items
    activities[1],
    dining[0],
    events[0],
  ],
  // ... more fields
}
```

### Updating Navigation

Located in: `export const navigation`

```typescript
export const navigation = {
  mainNavigation: [
    {
      title: 'Things to Do',
      description: 'Activities and attractions',
      children: [
        {
          title: 'All Activities',
          slug: createSlug('/things-to-do'),
        },
        // ... more items
      ],
    },
    // ... more nav items
  ],
}
```

## Tips

### Creating Slugs
- Use lowercase
- Replace spaces with hyphens
- Remove special characters
- Example: "Lake Clementine Trail" → "lake-clementine-trail"

### SEO Best Practices
- **Title**: 50-60 characters, include location (Auburn, CA)
- **Description**: 150-160 characters, compelling and descriptive

### Price Ranges
- `Free` - No cost
- `$` - Under $20
- `$$` - $20-50
- `$$$` - $50-100
- `$$$$` - Over $100

### Date Format for Events
Use ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.000Z`

Example: `2025-12-25T10:00:00.000Z` for December 25, 2025 at 10 AM

## Building and Deploying

After making content changes:

```bash
# Test locally
npm run dev

# Build for production
npm run build

# Deploy (if using Vercel)
vercel --prod
```

## Troubleshooting

### Build Errors

If you get a build error after updating content:

1. Check for syntax errors (missing commas, brackets, quotes)
2. Ensure all IDs are unique
3. Verify date strings are in ISO format
4. Check that all required fields are present

### TypeScript Errors

Each content type has required fields. Check `/types/index.ts` for the full interface definition.

Required fields for most content types:
- `_id` (string)
- `_type` (string)
- `title` (string)
- `slug` (Slug object)

## Need Help?

- Check existing entries in `content.ts` for examples
- Refer to TypeScript interfaces in `/types/index.ts`
- Contact the development team for technical support

---

Happy editing! 🎉




