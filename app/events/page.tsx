import { events } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { ListingGrid } from '@/components/listings/ListingGrid'
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

  return (
    <div className="min-h-screen bg-cream-50">
      <PageHero
        title="Events & Festivals"
        subtitle="From Gold Rush celebrations to farmers markets, there's always something happening in Auburn"
        badge="What's Happening"
        backgroundImage="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80"
        size="md"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Intro Text */}
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
              Experience Auburn's Community Spirit
            </h2>
            <p className="text-charcoal-600 text-lg">
              Join us for annual traditions, seasonal celebrations, and special events that 
              bring our Gold Country community together throughout the year.
            </p>
          </div>

          <ListingGrid
            items={filteredEvents}
            itemType="events"
            showFilters={true}
          />
        </div>
      </section>
    </div>
  )
}
