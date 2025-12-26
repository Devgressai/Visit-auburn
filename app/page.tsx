import { homepage } from '@/lib/data'
import { CinematicHero } from '@/components/homepage/CinematicHero'
import { CategoryExplorer } from '@/components/homepage/CategoryExplorer'
import { SeasonalTabs } from '@/components/homepage/SeasonalTabs'
import { LodgingShowcase } from '@/components/homepage/LodgingShowcase'
import { EventsShowcase } from '@/components/homepage/EventsShowcase'
import { RespectAuburnBanner } from '@/components/homepage/RespectAuburnBanner'
import { InsiderTips } from '@/components/homepage/InsiderTips'
import { buildMetadata, organizationJsonLd, SITE_URL } from '@/lib/seo'
import { getCurrentSeason } from '@/lib/seasonal'
import { getPlaceholderImage } from '@/lib/images'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Visit Auburn - Discover California\'s Gold Country',
    description: 'Explore Auburn, California - your guide to accommodations, activities, dining, events, and attractions in the heart of Gold Country.',
    canonical: SITE_URL,
  })
}

export default async function HomePage() {
  const homepageData = homepage
  const currentSeason = getCurrentSeason()
  
  // Get hero image URL
  const heroImageUrl = homepageData?.heroImage?.mockUrl || 
                       homepageData?.heroImage?.asset?.url ||
                       getPlaceholderImage('hero')

  const orgSchema = organizationJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Cinematic Hero - Lake Tahoe Style */}
      <CinematicHero
        title="Auburn"
        subtitle="Where Gold Country history meets Sierra Nevada adventure. Discover California's best-kept secret in the heart of the foothills."
        heroImage={heroImageUrl}
        weather={{ temp: 72, condition: 'Sunny' }}
      />

      {/* Category Explorer - Horizontal Scroll Cards */}
      <CategoryExplorer />

      {/* Seasonal Tabs */}
      <SeasonalTabs />

      {/* Events Showcase with Date Badges */}
      <EventsShowcase />

      {/* Lodging Showcase */}
      <LodgingShowcase />

      {/* Respect Auburn Banner - Like "Rules to Lake By" */}
      <RespectAuburnBanner />

      {/* Insider Tips / Blog Articles */}
      <InsiderTips />
    </>
  )
}
