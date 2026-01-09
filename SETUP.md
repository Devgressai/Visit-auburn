# Visit Auburn - Setup Guide

## Prerequisites

- Node.js 18+ and npm
- A Sanity account (create one at https://sanity.io)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_sanity_read_token
NEXT_PUBLIC_SITE_URL=https://visitauburn.com
```

## Sanity Setup

1. **Initialize Sanity** (if not already done):
```bash
npm install -g @sanity/cli
sanity init
```

2. **Create your Sanity schemas**:
   - Reference `sanity/SANITY_SCHEMAS.md` for required schema structure
   - Create schemas in your Sanity Studio for:
     - homepage
     - accommodation
     - activity
     - dining
     - event
     - editorial
     - navigation
     - author

3. **Get your project ID and token**:
   - Project ID: Found in your Sanity project settings
   - Read Token: Create in Sanity project API settings

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

Build the production site:
```bash
npm run build
npm start
```

The site uses Static Site Generation (SSG) with Incremental Static Regeneration (ISR) for optimal performance and SEO.

## Sanity Studio

Run Sanity Studio locally:
```bash
npm run sanity:studio
```

Or access it at: `https://your-project.sanity.studio`

## Project Structure

See `ARCHITECTURE.md` for detailed architecture documentation.

## Next Steps

1. Set up your Sanity project and schemas
2. Add content through Sanity Studio
3. Configure environment variables
4. Deploy your site
5. Set up monitoring and analytics

## Troubleshooting

### Build errors related to Sanity
- Ensure all environment variables are set correctly
- Verify your Sanity project ID and dataset name
- Check that your API token has read permissions

### TypeScript errors
- Run `npm run build` to see detailed error messages
- Ensure all dependencies are installed: `npm install`

### Images not loading
- Verify Sanity image CDN configuration
- Check that image assets are uploaded to Sanity
- Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly




