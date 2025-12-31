import { events } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { ListingGrid } from '@/components/listings/ListingGrid'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import { isThisMonth, isUpcomingEvent, getCurrentSeason } from '@/lib/seasonal'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Event } from '@/types'

export const revalidate = 3600

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

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

function groupEventsByMonth(eventsList: Event[]) {
  const grouped: Record<string, Event[]> = {}
  
  eventsList.forEach((event) => {
    if (!event.startDate) return
    const date = new Date(event.startDate)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthName = monthNames[date.getMonth()]
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = []
    }
    grouped[monthKey].push(event)
  })
  
  // Convert to array and sort by date
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, events]) => {
      const [year, month] = key.split('-')
      return {
        monthKey: key,
        monthName: monthNames[parseInt(month) - 1],
        year: parseInt(year),
        month: parseInt(month),
        events,
      }
    })
}

function getFeaturedAnnualEvents(eventsList: Event[]) {
  // Annual events are typically festivals or recurring events
  // Filter for events with "Days", "Festival", "Celebration" in title or category
  return eventsList.filter((event) => {
    const title = event.title.toLowerCase()
    const category = event.category?.toLowerCase() || ''
    return (
      title.includes('days') ||
      title.includes('festival') ||
      title.includes('celebration') ||
      category === 'festival' ||
      event.featured === true
    )
  })
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
  const monthlyGroups = groupEventsByMonth(filteredEvents)
  const featuredAnnualEvents = getFeaturedAnnualEvents(events)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Auburn Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="event-gold-rush-days">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-gold-500/90 text-white text-sm font-semibold rounded-full mb-4">
              What's Happening
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display">
              Events & Festivals
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              From Gold Rush celebrations to farmers markets, there's always something happening in Auburn
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Intro with Auburn Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4 font-display">
                Experience Auburn's Community Spirit
              </h2>
              <p className="text-charcoal-600 text-lg mb-6 leading-relaxed">
                Join us for annual traditions, seasonal celebrations, and special events that 
                bring our Gold Country community together throughout the year. Auburn's event 
                calendar reflects the city's rich heritage, vibrant arts scene, and strong 
                community bonds that make this Gold Country destination special.
              </p>
              <p className="text-charcoal-600 mb-6 leading-relaxed">
                From the historic Gold Rush Days festival to summer concerts and art walks, 
                Auburn's calendar is packed with authentic experiences. Whether you're interested 
                in <Link href="/things-to-do/history-culture" className="text-lake-600 hover:text-lake-700 font-semibold underline">history and culture</Link>, 
                outdoor recreation, or <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold underline">culinary experiences</Link>, 
                you'll find events that celebrate what makes Auburn unique.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Many events take place in Auburn's beautiful outdoor settings, from the American 
                River Canyon to historic Old Town. The city's mild climate makes it ideal for 
                year-round outdoor events, while indoor venues like theaters and community centers 
                host cultural performances and gatherings during all seasons.
              </p>
            </div>
            <div>
              <AuburnImage 
                imageId="event-concerts-amphitheater"
                className="rounded-lg w-full h-[300px] object-cover"
              />
            </div>
          </div>

          {/* Featured Annual Events Section */}
          {featuredAnnualEvents.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <p className="section-eyebrow-light">Annual Traditions</p>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
                  Featured Annual Events
                </h2>
                <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
                  Don't miss these signature Auburn celebrations that happen year after year
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAnnualEvents.slice(0, 6).map((event) => (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug.current}`}
                    className="bg-cream-50 rounded-xl overflow-hidden border border-charcoal-100 hover:shadow-lg transition-all group"
                  >
                    {event.featuredImage && (
                      <div className="relative h-48">
                        <AuburnImage
                          imageId="event-gold-rush-days"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors font-display">
                        {event.title}
                      </h3>
                      {event.excerpt && (
                        <p className="text-charcoal-600 text-sm mb-3 line-clamp-2">
                          {event.excerpt}
                        </p>
                      )}
                      {event.startDate && (
                        <p className="text-sm text-charcoal-500">
                          {new Date(event.startDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Additional Event Image */}
          <div className="mb-12">
            <AuburnImage 
              imageId="event-art-walk"
              className="rounded-lg w-full h-[400px] object-cover"
            />
          </div>
          
          {/* Expanded Content Section */}
          <div className="bg-cream-50 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-charcoal-900 mb-4 font-display">
              Year-Round Events in Auburn
            </h3>
            <div className="space-y-4 text-charcoal-700 leading-relaxed">
              <p>
                Auburn's event calendar offers something for everyone, with activities that showcase 
                the best of Gold Country culture, natural beauty, and community spirit. Spring brings 
                wildflower festivals and outdoor markets, while summer features concerts, art walks, 
                and outdoor recreation events that take advantage of the warm weather and long days.
              </p>
              <p>
                Fall is particularly vibrant in Auburn, with harvest festivals, wine tasting events, 
                and celebrations of the region's agricultural heritage. The changing colors of the 
                Sierra foothills provide a stunning backdrop for outdoor events, and many activities 
                are designed to help visitors experience the natural beauty of the area.
              </p>
              <p>
                Winter events focus on community gatherings, holiday celebrations, and indoor cultural 
                activities. Despite the cooler temperatures, Auburn's location in the Sierra foothills 
                means winters are generally mild, allowing for outdoor events throughout the season. 
                Many winter activities celebrate the region's Gold Rush history and provide opportunities 
                to learn about Auburn's past while enjoying contemporary community events.
              </p>
              <p>
                Throughout the year, Auburn hosts regular farmers markets, art walks, and community 
                gatherings that bring residents and visitors together. These recurring events create 
                a sense of community and provide consistent opportunities to experience local culture, 
                cuisine, and crafts. For those planning a visit, checking the <Link href="/plan/visitor-information" className="text-lake-600 hover:text-lake-700 font-semibold underline">visitor information</Link> 
                page or contacting the Auburn Area Chamber of Commerce can help you discover events 
                happening during your stay.
              </p>
            </div>
          </div>

          {/* Monthly Grouping */}
          {monthlyGroups.length > 0 && !params.filter && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <p className="section-eyebrow-light">Upcoming Events</p>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
                  Events by Month
                </h2>
              </div>
              <div className="space-y-12">
                {monthlyGroups.map((group) => (
                  <div key={group.monthKey}>
                    <h3 className="text-2xl font-bold text-charcoal-900 mb-6 font-display border-b border-charcoal-200 pb-2">
                      {group.monthName} {group.year}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.events.map((event) => (
                        <Link
                          key={event._id}
                          href={`/events/${event.slug.current}`}
                          className="bg-white rounded-xl border border-charcoal-100 hover:border-lake-500 hover:shadow-lg transition-all p-6 group"
                        >
                          <h4 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                            {event.title}
                          </h4>
                          {event.excerpt && (
                            <p className="text-charcoal-600 text-sm mb-3 line-clamp-2">
                              {event.excerpt}
                            </p>
                          )}
                          {event.startDate && (
                            <p className="text-sm text-charcoal-500">
                              {new Date(event.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                              {event.endDate && (
                                <> - {new Date(event.endDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}</>
                              )}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All Events Grid (when filtered) */}
          {params.filter && (
            <section>
              <ListingGrid
                items={filteredEvents}
                itemType="events"
                showFilters={true}
              />
            </section>
          )}
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/events" />
    </div>
  )
}
