import Link from 'next/link'
import Image from 'next/image'
import { urlFor, isSanityConfigured } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/images'
import { Card } from '@/components/ui'
import type { Event } from '@/types'
import { ArrowRight, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface EventsPreviewProps {
  events: Event[]
}

export function EventsPreview({ events }: EventsPreviewProps) {
  if (!events || events.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for exciting events in Auburn
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {events.slice(0, 6).map((event) => (
            <Link key={event._id} href={`/events/${event.slug.current}`} className="group block">
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                    <Image
                      src={event.featuredImage 
                        ? urlFor(event.featuredImage).width(600).height(400).url() 
                        : getPlaceholderImage('hero')}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        {event.startDate && (
                          <div className="inline-flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                              {format(new Date(event.startDate), 'MMM d, yyyy')}
                              {event.endDate && event.endDate !== event.startDate && (
                                <> - {format(new Date(event.endDate), 'MMM d, yyyy')}</>
                              )}
                            </span>
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h3>
                        {event.excerpt && (
                          <p className="text-gray-600 line-clamp-2">{event.excerpt}</p>
                        )}
                      </div>
                      {event.location && (
                        <div className="text-sm text-gray-500 md:text-right">
                          <p>{event.location.city || 'Auburn, CA'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          >
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

