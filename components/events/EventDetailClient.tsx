'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { MapPin, Calendar, ArrowLeft, Share2, CalendarPlus, AlertTriangle } from 'lucide-react'
import { PortableText } from '@/components/portable-text/PortableText'
import { getImageUrl } from '@/lib/images'
import type { Event } from '@/types'

interface EventDetailClientProps {
  event: Event
  imageUrl: string | null
  isPast: boolean
  upcomingEvents: Event[]
}

export function EventDetailClient({ event, imageUrl, isPast, upcomingEvents }: EventDetailClientProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <article className="min-h-screen bg-cream-50">
      {/* Past Event Banner */}
      {isPast && (
        <div className="bg-gold-100 border-b border-gold-300 py-4">
          <div className="container mx-auto px-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-gold-700" />
            <p className="text-gold-800 font-medium">
              This event has passed. Check out upcoming events below.
            </p>
          </div>
        </div>
      )}

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            priority
            className={`object-cover transition-transform duration-[1.5s] ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-gold-200 to-gold-400" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Back Button */}
        <Link
          href="/events"
          className="absolute top-24 left-4 md:left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="hidden md:inline font-medium">Back to Events</span>
        </Link>

        {/* Date Badge - Large */}
        {event.startDate && (
          <div className="absolute top-24 right-4 md:right-8 z-20 bg-gold-500 text-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-sm uppercase tracking-wider font-medium">
              {format(new Date(event.startDate), 'MMM')}
            </div>
            <div className="text-4xl font-black leading-none">
              {format(new Date(event.startDate), 'd')}
            </div>
            <div className="text-sm font-medium mt-1">
              {format(new Date(event.startDate), 'yyyy')}
            </div>
          </div>
        )}

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12">
          <div className="container mx-auto">
            <h1 
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {event.title}
            </h1>

            <div 
              className={`flex flex-wrap items-center gap-6 text-white/80 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {event.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {format(new Date(event.startDate), 'MMMM d, yyyy')}
                    {event.endDate && event.endDate !== event.startDate && (
                      <> - {format(new Date(event.endDate), 'MMMM d, yyyy')}</>
                    )}
                  </span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location.city || 'Auburn, CA'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {event.excerpt && (
              <p className="text-xl text-charcoal-700 mb-8 leading-relaxed">
                {event.excerpt}
              </p>
            )}

            {event.description && event.description.length > 0 && (
              <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-700 prose-a:text-gold-600 mb-12">
                <PortableText content={event.description} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Event Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card mb-6 sticky top-24">
              <h3 className="text-lg font-bold text-charcoal-900 mb-4">Event Details</h3>

              <div className="space-y-4 mb-6">
                {event.startDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-500">Date</p>
                      <p className="font-semibold text-charcoal-900">
                        {format(new Date(event.startDate), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-500">Location</p>
                      <p className="font-semibold text-charcoal-900">
                        {[event.location.address, event.location.city, event.location.state]
                          .filter(Boolean)
                          .join(', ') || 'Auburn, CA'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-charcoal-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold-500 text-white font-semibold rounded-xl hover:bg-gold-600 transition-colors">
                  <CalendarPlus className="w-4 h-4" />
                  Add to Calendar
                </button>
                <button className="w-12 h-12 flex items-center justify-center border border-charcoal-200 text-charcoal-600 rounded-xl hover:border-gold-400 hover:text-gold-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mt-16 pt-12 border-t border-charcoal-200">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-8">
              {isPast ? 'Upcoming Events' : 'More Events'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((upcomingEvent) => {
                const upcomingImageUrl = upcomingEvent.featuredImage 
                  ? getImageUrl(upcomingEvent.featuredImage) 
                  : null
                const eventDate = new Date(upcomingEvent.startDate)

                return (
                  <Link
                    key={upcomingEvent._id}
                    href={`/events/${upcomingEvent.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-card card-hover">
                      <div className="relative h-48 overflow-hidden">
                        {upcomingImageUrl ? (
                          <Image
                            src={upcomingImageUrl}
                            alt={upcomingEvent.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-gold-100 to-gold-200" />
                        )}
                        
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 event-date-badge">
                          <span className="month">{format(eventDate, 'MMM')}</span>
                          <span className="day">{format(eventDate, 'd')}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors mb-2">
                          {upcomingEvent.title}
                        </h3>
                        {upcomingEvent.location && (
                          <p className="text-sm text-charcoal-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {upcomingEvent.location.city || 'Auburn, CA'}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

