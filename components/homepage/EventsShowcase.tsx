'use client'

import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { MapPin, ArrowRight } from 'lucide-react'
import { events } from '@/lib/data'
import { getImageUrl } from '@/lib/images'

export function EventsShowcase() {
  // Get upcoming events sorted by date
  const upcomingEvents = events
    .filter(e => new Date(e.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 4)

  return (
    <section className="py-20 md:py-28 bg-deep-surface">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="section-eyebrow">
              What's Happening
            </p>
            <h2 className="section-title">
              Events in Auburn
            </h2>
          </div>
          <Link 
            href="/events"
            className="inline-flex items-center gap-2 text-pine-400 hover:text-pine-300 font-semibold mt-4 md:mt-0 transition-colors"
          >
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => {
            const eventDate = new Date(event.startDate)
            const imageUrl = event.featuredImage ? getImageUrl(event.featuredImage) : null

            return (
              <Link
                key={event._id}
                href={`/events/${event.slug.current}`}
                className="group relative rounded-2xl overflow-hidden card-hover"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-bg/90 via-deep-bg/40 to-transparent" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 event-date-badge">
                    <span className="month">{format(eventDate, 'MMM')}</span>
                    <span className="day">{format(eventDate, 'd')}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-pine-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  
                  {event.location && (
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <MapPin className="w-4 h-4 text-pine-500" />
                      <span>{event.location.city || 'Auburn'}</span>
                    </div>
                  )}

                  {event.endDate && event.endDate !== event.startDate && (
                    <p className="text-pine-400 text-sm mt-2 font-medium">
                      {format(eventDate, 'MMM d')} - {format(new Date(event.endDate), 'MMM d, yyyy')}
                    </p>
                  )}
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pine-500/40 transition-colors" />
              </Link>
            )
          })}
        </div>

        {/* Empty State */}
        {upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">
              Check back soon for upcoming events!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
