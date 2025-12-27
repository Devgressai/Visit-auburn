import { homepage } from '@/lib/data'
import { CinematicHero } from '@/components/homepage/CinematicHero'
import { CategoryExplorer } from '@/components/homepage/CategoryExplorer'
import { SeasonalTabs } from '@/components/homepage/SeasonalTabs'
import { LodgingShowcase } from '@/components/homepage/LodgingShowcase'
import { EventsShowcase } from '@/components/homepage/EventsShowcase'
import { RespectAuburnBanner } from '@/components/homepage/RespectAuburnBanner'
import { InsiderTips } from '@/components/homepage/InsiderTips'
import { buildMetadata, organizationJsonLd, SITE_URL } from '@/lib/seo'
import { MapPin, Trees, Utensils, Calendar } from 'lucide-react'
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
          SECTION 1: Cinematic Hero
          Full viewport, local hero image with deep blue cinematic overlay
          ═══════════════════════════════════════════════════════════════════ */}
      <CinematicHero
        title="Auburn"
        subtitle="Where Gold Country history meets Sierra Nevada adventure. Discover California's best-kept secret in the heart of the foothills."
        heroImage="/images/things-to-do.jpg"
        weather={{ temp: 72, condition: 'Sunny' }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: Editorial Intro Panel
          Deep surface background with two-column editorial layout
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="editorial-panel">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="section-eyebrow">Welcome to Auburn</p>
            <h2 className="section-title mb-6">
              Explore Gold Country
            </h2>
            <div className="pine-divider mx-auto" />
          </div>

          {/* Two Column Editorial */}
          <div className="editorial-two-col max-w-5xl mx-auto mb-16">
            <div className="editorial-text">
              <p className="mb-6">
                Nestled in the Sierra Nevada foothills, Auburn is where California's 
                legendary Gold Rush began. Today, this vibrant community blends rich 
                history with outdoor adventure, world-class dining, and authentic 
                small-town charm.
              </p>
              <p>
                From hiking the rugged trails of the American River Canyon to exploring 
                our historic Old Town district, Auburn offers experiences that create 
                lasting memories for every type of traveler.
              </p>
            </div>
            <div className="editorial-text">
              <p className="mb-6">
                With over 300 days of sunshine, Auburn is your year-round gateway to 
                adventure. Whether you're seeking world-class trail running, boutique 
                wineries, or simply a peaceful escape from the everyday, you'll find 
                it here.
              </p>
              <p>
                Discover why visitors and locals alike call Auburn one of California's 
                best-kept secrets—a place where every season brings new reasons to explore.
              </p>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: MapPin, label: 'Miles from Sacramento', value: '35' },
              { icon: Trees, label: 'Miles of Trails', value: '100+' },
              { icon: Utensils, label: 'Local Restaurants', value: '50+' },
              { icon: Calendar, label: 'Annual Events', value: '40+' },
            ].map((stat) => (
              <div 
                key={stat.label}
                className="text-center p-6 rounded-xl border border-border-subtle bg-white/[0.02]"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-pine-500" />
                <div className="text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: Category Explorer
          Image-led horizontal scroll cards
          ═══════════════════════════════════════════════════════════════════ */}
      <CategoryExplorer />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: Seasonal Tabs
          What to do in each season
          ═══════════════════════════════════════════════════════════════════ */}
      <SeasonalTabs />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: Events Showcase
          Upcoming events with date badges
          ═══════════════════════════════════════════════════════════════════ */}
      <EventsShowcase />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: Lodging Showcase
          Where to stay horizontal scroll
          ═══════════════════════════════════════════════════════════════════ */}
      <LodgingShowcase />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: Respect Auburn Banner
          Responsible tourism message
          ═══════════════════════════════════════════════════════════════════ */}
      <RespectAuburnBanner />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: Insider Tips / Blog
          Editorial articles carousel
          ═══════════════════════════════════════════════════════════════════ */}
      <InsiderTips />
    </>
  )
}
