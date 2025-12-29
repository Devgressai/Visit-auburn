import { events } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { ListingGrid } from '@/components/listings/ListingGrid'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import { isThisMonth, isUpcomingEvent, getCurrentSeason } from '@/lib/seasonal'
import type { Metadata } from 'next'
import type { Event } from '@/types'

export const revalidate = 3600

function getEvents(filter?: string | null) {
  let filtered = [...events]

  if (filter === 'this-month') {
    filtered = events.filter((event) => event.startDate && isThisMonth(event.startDate))
  } else if (filter === 'seasonal') {
    const currentSeason = getCurrentSeason()
    filtered = events.filter((event) => {
      if (!event.startDate) return false
      const eventDate = new Date(event.startDate)
      const month = eventDate.getMonth() + 1
      const seasonMonths: Record<string, number[]> = {
        spring: [3, 4, 5],
        summer: [6, 7, 8],
        fall: [9, 10, 11],
        winter: [12, 1, 2],
      }
      return seasonMonths[currentSeason].includes(month)
    })
  } else {
    // Show all events sorted by date
    filtered = events.sort((a, b) => {
      if (!a.startDate || !b.startDate) return 0
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    })
  }

  return filtered
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Events in Auburn, California',
    description: 'Stay up to date with upcoming events, festivals, and happenings in Auburn, CA. Don\'t miss out on the best events in Gold Country.',
    canonical: `${SITE_URL}/events`,
  })
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const params = await searchParams
  const filteredEvents = getEvents(params.filter)
  const breadcrumbs = generateBreadcrumbs('/events')

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero with Auburn Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="event-gold-rush-days">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-gold-500/90 text-white text-sm font-semibold rounded-full mb-4">
              What's Happening
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Events & Festivals
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              From Gold Rush celebrations to farmers markets, there's always something happening in Auburn
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Intro with Auburn Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
                Experience Auburn's Community Spirit
              </h2>
              <p className="text-charcoal-600 text-lg mb-6">
                Join us for annual traditions, seasonal celebrations, and special events that 
                bring our Gold Country community together throughout the year.
              </p>
              <p className="text-charcoal-600">
                From the historic Gold Rush Days festival to summer concerts and art walks, 
                Auburn's calendar is packed with authentic experiences.
              </p>
            </div>
            <div>
              <AuburnImage 
                imageId="event-concerts-amphitheater"
                className="rounded-lg w-full h-[300px] object-cover"
              />
            </div>
          </div>

          {/* Additional Event Image */}
          <div className="mb-12">
            <AuburnImage 
              imageId="event-art-walk"
              className="rounded-lg w-full h-[400px] object-cover"
            />
          </div>

          <ListingGrid
            items={filteredEvents}
            itemType="events"
            showFilters={true}
          />
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/events" />
    </div>
  )
}
