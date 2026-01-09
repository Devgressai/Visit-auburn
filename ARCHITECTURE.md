# Visit Auburn - Architecture Documentation

## Overview

Visit Auburn is a destination marketing website built with Next.js 16 (App Router), React Server Components, Tailwind CSS, and Sanity CMS. The architecture is designed to mirror the structural patterns of Visit Lake Tahoe while maintaining unique branding and content.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity
- **Deployment**: Optimized for SSG/ISR (Static Site Generation with Incremental Static Regeneration)

## Architecture Patterns

### 1. Hub → Directory → Detail Hierarchy

The site follows a three-level content hierarchy:

- **Hub (Homepage)**: `/` - Aggregates featured content from all categories
- **Directory Pages**: `/accommodations`, `/activities`, `/dining`, `/events` - Category listings with filtering
- **Detail Pages**: `/accommodations/[slug]`, `/activities/[slug]`, etc. - Individual item pages with full content

This structure:
- Creates clear information architecture
- Supports SEO through internal linking
- Provides intuitive user navigation
- Enables content discovery

### 2. SEO-First Architecture

#### Static Generation (SSG/ISR)
- All pages use `generateStaticParams` for pre-rendering
- Revalidation set to 3600 seconds (1 hour) for fresh content
- Enables fast page loads and optimal SEO

#### Structured Data
- Organization schema on all pages
- Breadcrumb schema on detail pages
- LocalBusiness schema for accommodations and dining
- Event schema for events
- Article schema for editorial content

#### Metadata & Open Graph
- Dynamic metadata generation per page
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs

#### Sitemap & Robots
- Dynamic sitemap generation (`/sitemap.xml`)
- Robots.txt with proper directives
- All content types included in sitemap

### 3. Mega Navigation

The navigation system provides:
- Desktop: Hover-based mega menus with descriptions
- Mobile: Accordion-style mobile menu
- Categories: Stay, Things to Do, Food & Drink, Events, Plan Your Visit
- Deep linking to category filters

### 4. Content Blending

- Editorial content can be mixed with listings
- Homepage sections blend featured items with descriptions
- Related content on detail pages encourages exploration
- Internal linking strategy throughout

### 5. Seasonal Surfacing

- Utility functions for season detection
- Event filtering by season
- Support for "This Month" and "Seasonal" filters
- Framework for seasonal content prioritization in CMS

## File Structure

```
/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with navigation/footer
│   ├── page.tsx                 # Homepage
│   ├── accommodations/          # Accommodations directory
│   │   ├── page.tsx            # Directory page
│   │   └── [slug]/             # Detail pages
│   ├── activities/              # Activities directory
│   ├── dining/                  # Dining directory
│   ├── events/                  # Events directory
│   ├── plan/                    # Plan Your Visit pages
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # Robots.txt
│   └── not-found.tsx           # 404 page
├── components/                   # React components
│   ├── navigation/             # Mega navigation
│   ├── footer/                 # Site footer
│   ├── homepage/               # Homepage sections
│   ├── listings/               # Listing grids and cards
│   └── portable-text/          # Sanity content rendering
├── lib/                         # Utilities and configuration
│   ├── sanity.ts               # Sanity client
│   ├── sanity.queries.ts       # GROQ queries
│   ├── seo.ts                  # SEO utilities
│   ├── seasonal.ts             # Seasonal content utilities
│   └── utils.ts                # General utilities
├── types/                       # TypeScript types
│   └── index.ts                # Type definitions
└── sanity/                      # Sanity configuration
    ├── sanity.config.ts        # Sanity Studio config
    └── SANITY_SCHEMAS.md       # Schema documentation
```

## Data Flow

1. **Content Creation**: Content editors use Sanity Studio
2. **Content Storage**: Content stored in Sanity Cloud
3. **Data Fetching**: Next.js Server Components fetch via Sanity Client
4. **Pre-rendering**: Pages statically generated at build time
5. **Revalidation**: ISR updates pages on-demand or schedule
6. **Serving**: Static HTML served with optimal performance

## Key Features

### Internal Linking Strategy
- Related items on detail pages
- Category links in navigation
- Breadcrumb navigation
- Cross-category recommendations

### Performance Optimizations
- Server Components for zero JavaScript on initial load
- Image optimization via Next.js Image component
- Static generation for fast page loads
- CDN-ready architecture

### Scalability Considerations
- Modular component structure
- Reusable query patterns
- Type-safe TypeScript throughout
- Flexible schema structure

## Development Workflow

1. **Content**: Add/edit content in Sanity Studio
2. **Development**: `npm run dev` for local development
3. **Build**: `npm run build` generates static site
4. **Deploy**: Deploy static files or use Next.js hosting

## Environment Variables

Required environment variables (see `.env.example`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

## Future Enhancements

Potential additions:
- Search functionality
- User accounts/favorites
- Booking integrations
- Analytics integration
- Multi-language support
- Advanced filtering and sorting
- Map integration
- Review/rating system




