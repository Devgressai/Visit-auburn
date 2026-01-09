import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { format } from 'date-fns'

interface RelatedEvent {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: any
  startDate: string
  endDate?: string
  category?: string
  location?: {
    name?: string
    address?: string
    city?: string
  }
}

interface RelatedEventsProps {
  events: RelatedEvent[]
  currentEventId?: string
  title?: string
}

export function RelatedEvents({
  events,
  currentEventId,
  title = 'Related Events',
}: RelatedEventsProps) {
  if (!events || events.length === 0) {
    return null
  }

  // Filter out current event if provided and only show upcoming events
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filteredEvents = events
    .filter((event) => {
      // Exclude current event
      if (currentEventId && event._id === currentEventId) return false
      // Only show upcoming events
      if (event.startDate) {
        const eventDate = new Date(event.startDate)
        return eventDate >= today
      }
      return true
    })
    .sort((a, b) => {
      // Sort by startDate ascending
      if (a.startDate && b.startDate) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      }
      return 0
    })

  if (filteredEvents.length === 0) {
    return null
  }

  return (
    <section className="border-t border-gray-200 pt-12 mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.slice(0, 3).map((event) => (
          <Link
            key={event._id}
            href={`/events/${event.slug?.current || ''}`}
            className="block group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              {event.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={urlFor(event.featuredImage).width(600).height(400).url()}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                {event.excerpt && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.excerpt}</p>
                )}
                {event.startDate && (
                  <p className="text-xs text-gray-500 mt-2">
                    {format(new Date(event.startDate), 'MMM d, yyyy')}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}




