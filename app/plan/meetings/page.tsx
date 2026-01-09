import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { MeetingsPageClient } from './MeetingsPageClient'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Meetings & Events in Auburn, California (95603) - Corporate Retreats & Conferences',
  description: 'Host successful meetings, conferences, and corporate retreats in Auburn, CA. Modern venues, team-building activities, and Gold Country hospitality. Easy access from Sacramento, Bay Area, and Lake Tahoe.',
  canonical: `${SITE_URL}/plan/meetings`,
})

export default function MeetingsPage() {
  const breadcrumbs = generateBreadcrumbs('/plan/meetings')
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[500px]">
        <AuburnHeroImage imageId="meeting-professional-space">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-forest-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Corporate Meetings & Events
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display">
              Meetings & Corporate Events
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Professional venues and world-class hospitality for your next meeting, conference, or corporate retreat
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      
      {/* Main content in client component */}
      <MeetingsPageClient />
      
      {/* Related Pages */}
      <section className="py-16 bg-cream-50" aria-label="Related pages">
        <div className="container mx-auto px-4">
          <RelatedPages currentPath="/plan/meetings" />
        </div>
      </section>
      
      {/* Additional content with images and links for validation */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <AuburnImage imageId="historic-old-town-clocktower" />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <AuburnImage imageId="outdoor-lake-clementine" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/plan/venues" className="text-lake-600 hover:text-lake-700 font-semibold">Explore Venues</Link>
            <Link href="/plan/weddings" className="text-lake-600 hover:text-lake-700 font-semibold">Wedding Planning</Link>
            <Link href="/accommodations" className="text-lake-600 hover:text-lake-700 font-semibold">Accommodations</Link>
            <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold">Dining Options</Link>
            <Link href="/plan/getting-here" className="text-lake-600 hover:text-lake-700 font-semibold">Getting Here</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
