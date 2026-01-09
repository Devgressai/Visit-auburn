import { events } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage } from '@/components/ui/AuburnImage'
import { EventsCalendar } from '@/components/events/EventsCalendar'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Event } from '@/types'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Events in Auburn, California',
    description: 'Stay up to date with upcoming events, festivals, and happenings in Auburn, CA. Don\'t miss out on the best events in Gold Country.',
    canonical: `${SITE_URL}/events`,
  })
}

export default async function EventsPage() {
  const breadcrumbs = generateBreadcrumbs('/events')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Auburn Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="event-gold-rush-days">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-gold-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Plan Your Visit
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display">
              Auburn Events Calendar
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover festivals, concerts, markets, and celebrations throughout the year
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Brief Intro */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p className="text-lg text-charcoal-600 leading-relaxed">
              Auburn's calendar is filled with authentic Gold Country experiences. 
              Use the calendar below to find events happening during your visit—festivals, concerts, 
              farmers markets, art walks, and more.
            </p>
          </div>

          {/* Events Calendar */}
          <div className="mb-12">
            <EventsCalendar events={events} />
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/events" />
    </div>
  )
}
