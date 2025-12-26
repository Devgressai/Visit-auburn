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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-gold-600 uppercase tracking-[0.2em] text-sm font-medium mb-3">
              What's Happening
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal-900">
              Events in Auburn
            </h2>
          </div>
          <Link 
            href="/events"
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold mt-4 md:mt-0 transition-colors"
          >
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event, index) => {
            const eventDate = new Date(event.startDate)
            const imageUrl = event.featuredImage ? getImageUrl(event.featuredImage) : null

            return (
              <Link
                key={event._id}
                href={`/events/${event.slug.current}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 event-date-badge">
                    <span className="month">{format(eventDate, 'MMM')}</span>
                    <span className="day">{format(eventDate, 'd')}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  
                  {event.location && (
                    <div className="flex items-center gap-2 text-charcoal-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location.city || 'Auburn'}</span>
                    </div>
                  )}

                  {event.endDate && event.endDate !== event.startDate && (
                    <p className="text-gold-600 text-sm mt-2 font-medium">
                      {format(eventDate, 'MMM d')} - {format(new Date(event.endDate), 'MMM d, yyyy')}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Empty State */}
        {upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-charcoal-500 text-lg">
              Check back soon for upcoming events!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

