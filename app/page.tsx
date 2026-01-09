import { homepage } from '@/lib/data'
import { CinematicHero } from '@/components/homepage/CinematicHero'
import { StickyActionBar } from '@/components/homepage/StickyActionBar'
import { ProofChips } from '@/components/homepage/ProofChips'
import { CategoryExplorer } from '@/components/homepage/CategoryExplorer'
import { SeasonalTabs } from '@/components/homepage/SeasonalTabs'
import { LodgingShowcase } from '@/components/homepage/LodgingShowcase'
import { EventsShowcase } from '@/components/homepage/EventsShowcase'
import { RespectAuburnBanner } from '@/components/homepage/RespectAuburnBanner'
import { InsiderTips } from '@/components/homepage/InsiderTips'
import { AuburnDataTeaser } from '@/components/homepage/AuburnDataTeaser'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { buildMetadata, organizationJsonLd, SITE_URL } from '@/lib/seo'
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
  const orgSchema = organizationJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: Cinematic Hero (Mobile Optimized)
          Refactored with localized text backdrop, anchored layout, conversion-focused CTAs
          ═══════════════════════════════════════════════════════════════════ */}
      <CinematicHero
        title="Visit Auburn, California"
        subtitle="Experience Gold Country's best-kept secret"
        heroImage="/images/hero-main.webp"
        weather={{ temp: 72, condition: 'Sunny' }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: Sticky Bottom Action Bar (Mobile Only)
          Appears after hero scroll, hides on scroll down, shows on scroll up
          ═══════════════════════════════════════════════════════════════════ */}
      <StickyActionBar />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: Proof Chips (Mobile Only - Replaces duplicate stats)
          Single unified stats row with horizontal scroll and snap
          ═══════════════════════════════════════════════════════════════════ */}
      <ProofChips />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: Category Explorer (Mobile: 2x2 Grid)
          Mobile shows 4 categories + "View all", Desktop horizontal scroll
          ═══════════════════════════════════════════════════════════════════ */}
      <CategoryExplorer />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: Seasonal Content (Mobile: Accordion)
          Mobile accordion, Desktop tabs - progressive disclosure
          ═══════════════════════════════════════════════════════════════════ */}
      <SeasonalTabs />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: Events Showcase (Mobile Optimized Cards)
          Fixed 3:4 image ratio, 2-line title clamp, consistent meta row
          ═══════════════════════════════════════════════════════════════════ */}
      <EventsShowcase />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: Lodging Showcase (Mobile Optimized Cards)
          Horizontal scroll, 280px max width, fixed ratio
          ═══════════════════════════════════════════════════════════════════ */}
      <LodgingShowcase />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: Auburn By The Numbers (Interactive Data Teaser)
          Animated stats with link to full data story
          ═══════════════════════════════════════════════════════════════════ */}
      <AuburnDataTeaser />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 9: Respect Auburn Banner (Simplified Mobile)
          Responsive tourism message
          ═══════════════════════════════════════════════════════════════════ */}
      <RespectAuburnBanner />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 10: Insider Tips / Blog
          Editorial articles carousel (unchanged)
          ═══════════════════════════════════════════════════════════════════ */}
      <InsiderTips />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 11: Related Auburn Pages
          Contextual navigation to key site sections
          ═══════════════════════════════════════════════════════════════════ */}
      <RelatedPages currentPath="/" title="Start Exploring Auburn" />
    </>
  )
}
