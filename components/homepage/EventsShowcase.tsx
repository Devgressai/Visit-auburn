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
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="section-eyebrow-light">
              What's Happening
            </p>
            <h2 className="section-title-light">
              Events in Auburn
            </h2>
          </div>
          <Link 
            href="/events"
            className="inline-flex items-center gap-2 text-lake-500 hover:text-lake-600 font-semibold mt-4 md:mt-0 transition-colors underline"
          >
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {upcomingEvents.map((event) => {
            const eventDate = new Date(event.startDate)
            const imageUrl = event.featuredImage ? getImageUrl(event.featuredImage) : null

            return (
              <Link
                key={event._id}
                href={`/events/${event.slug.current}`}
                className="group card card-hover"
              >
                {/* Image - Fixed 3:4 ratio */}
                <div className="card-image relative">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-forest text-white font-bold rounded-lg px-3 py-2 flex flex-col items-center justify-center shadow-lg">
                    <span className="text-xs uppercase tracking-wider opacity-90">{format(eventDate, 'MMM')}</span>
                    <span className="text-2xl font-black leading-none">{format(eventDate, 'd')}</span>
                  </div>
                  
                  {/* Title overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="card-title text-white group-hover:text-gold-300 transition-colors">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Meta Row */}
                <div className="p-4">
                  <div className="card-meta">
                    {event.location && (
                      <div className="card-meta-item">
                        <MapPin className="w-4 h-4 text-gold-500" />
                        <span>{event.location.city || 'Auburn'}</span>
                      </div>
                    )}
                    {event.endDate && event.endDate !== event.startDate && (
                      <div className="card-meta-item text-xs text-gold-600">
                        {format(eventDate, 'MMM d')} - {format(new Date(event.endDate), 'MMM d')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold-500/60 transition-colors pointer-events-none" />
              </Link>
            )
          })}
        </div>

        {/* Empty State */}
        {upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-charcoal-600 text-lg">
              Check back soon for upcoming events!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
