# Visit Auburn - Static Site

A Next.js-powered tourism website for Auburn, California. Now runs as a fully static site with manual content management.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- ⚡ Optimized performance with Next.js 16
- 🔍 SEO-optimized
- 📊 Structured data (JSON-LD)
- 🌐 Static site generation
- 📝 Manual content management

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Search**: FlexSearch
- **Email**: SendGrid
- **Language**: TypeScript

## Project Structure

```
/app                    # Next.js app router pages
/components             # React components
  /homepage            # Homepage-specific components
  /listings            # Listing grid and filters
  /navigation          # Navigation components
  /ui                  # Reusable UI components
/lib                    # Utilities and configuration
  /data                # Static content data
    /content.ts        # All site content (activities, dining, events, etc.)
  /seo                 # SEO utilities
  /image-utils.ts      # Image handling
/public                # Static assets
/types                 # TypeScript types
```

## Content Management

All content is managed in `/lib/data/content.ts`. This file contains:

- **Activities**: Things to do in Auburn
- **Accommodations**: Places to stay
- **Dining**: Restaurants, cafes, wineries
- **Events**: Upcoming events and festivals
- **Editorials**: Blog posts and articles
- **Homepage**: Hero content and featured items
- **Navigation**: Site navigation structure

### Updating Content

1. Open `/lib/data/content.ts`
2. Find the relevant export (e.g., `activities`, `dining`, `events`)
3. Add, edit, or remove items as needed
4. Each item should follow the TypeScript interface defined in `/types/index.ts`

### Adding Images

Images use Unsplash URLs. To add or update images:

1. Find a suitable image on [Unsplash](https://unsplash.com)
2. Copy the image URL with size parameters (e.g., `?w=1200&q=80`)
3. Use the `createImage()` function in `content.ts`:

```typescript
featuredImage: createImage('https://images.unsplash.com/photo-xxxxx?w=1200&q=80', 'Alt text')
```

### Content Structure Example

```typescript
{
  _id: 'unique-id',
  _type: 'activity',
  title: 'Activity Name',
  slug: createSlug('activity-slug'),
  excerpt: 'Brief description',
  featuredImage: createImage('image-url', 'Alt text'),
  location: {
    address: '123 Main St',
    city: 'Auburn',
    state: 'CA',
    zip: '95603',
  },
  category: 'Hiking',
  duration: '2-3 hours',
  priceRange: 'Free',
  seoTitle: 'SEO-optimized title',
  seoDescription: 'SEO-optimized description',
}
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://visitauburn.com
NEXT_PUBLIC_SITE_NAME=Visit Auburn

# SendGrid (optional, for newsletter)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@visitauburn.com
```

## Deployment

The site is optimized for deployment on:

- **Vercel** (recommended)
- **Netlify**
- Any static hosting platform

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Development

### Adding New Pages

1. Create a new route in `/app`
2. Add content to `/lib/data/content.ts`
3. Update navigation in `/lib/data/content.ts` if needed
4. Build and test

### Modifying Styles

- Global styles: `/app/globals.css`
- Tailwind config: `/tailwind.config.ts`
- Component-specific styles: Use Tailwind classes

### Adding New Components

1. Create component in `/components`
2. Export from `/components/ui/index.ts` if reusable
3. Import and use in pages

## SEO

The site includes comprehensive SEO features:

- Dynamic meta tags
- Open Graph tags
- Twitter Cards
- JSON-LD structured data
- Sitemap generation
- Robots.txt

Update SEO defaults in `/lib/seo/site.ts`

## Performance

- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Next.js Image component with Unsplash CDN
- **Code Splitting**: Automatic with Next.js
- **CSS Optimization**: Tailwind CSS purging

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a private project for Visit Auburn. For updates or changes, contact the development team.

## License

Proprietary - All rights reserved

## Support

For technical support or questions, contact the development team.

---

Built with ❤️ for Auburn, California
