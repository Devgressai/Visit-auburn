'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { MapPin, ArrowRight } from 'lucide-react'
import { events } from '@/lib/data'
import { getImageUrl } from '@/lib/images'
import { MicroLabel } from '@/components/ui/MicroLabel'
import { 
  isEventUpcoming, 
  formatEventDateRange, 
  getEventStartKey, 
  compareDayKeys,
  getTodayKey,
  parseISODateToZonedDay,
  compareDayKeys as compareDates
} from '@/lib/utils/date'
import { trackEventsFilterClick, trackEventClick } from '@/lib/analytics'

type FilterType = 'today' | 'weekend' | 'month' | 'all'

const DEFAULT_TIMEZONE = 'America/Los_Angeles'

// Get Friday-Sunday range for "This Weekend" in target timezone
function getWeekendRange(tz: string = DEFAULT_TIMEZONE): { start: string; end: string } {
  const now = new Date()
  
  // Get current date components in target timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'long', // Full weekday name
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  
  const parts = formatter.formatToParts(now)
  const weekday = parts.find(p => p.type === 'weekday')?.value || 'Monday'
  const year = parts.find(p => p.type === 'year')?.value || '2024'
  const month = parts.find(p => p.type === 'month')?.value || '01'
  const day = parts.find(p => p.type === 'day')?.value || '01'
  
  // Create a date object representing today in the target timezone
  // We'll use UTC to avoid local timezone conversion issues
  const todayInTz = new Date(`${year}-${month}-${day}T12:00:00Z`)
  
  // Calculate days until Friday
  // ISO weekday: Monday=1, Tuesday=2, ..., Friday=5, Saturday=6, Sunday=7
  const weekdayMap: Record<string, number> = {
    'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4,
    'Friday': 5, 'Saturday': 6, 'Sunday': 7
  }
  const currentWeekday = weekdayMap[weekday] || 1
  
  let daysUntilFriday = 0
  if (currentWeekday < 5) {
    // Monday-Thursday: calculate days until this Friday
    daysUntilFriday = 5 - currentWeekday
  } else if (currentWeekday >= 5) {
    // Friday-Sunday: we're already in the weekend, use current weekend
    daysUntilFriday = 0
  }
  
  const friday = new Date(todayInTz)
  friday.setUTCDate(friday.getUTCDate() + daysUntilFriday)
  
  const sunday = new Date(friday)
  sunday.setUTCDate(sunday.getUTCDate() + 2)
  
  return {
    start: getDateKeyInTimezone(friday, tz),
    end: getDateKeyInTimezone(sunday, tz),
  }
}

function getDateKeyInTimezone(date: Date, tz: string): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  
  const parts = formatter.formatToParts(date)
  const year = parts.find(p => p.type === 'year')?.value || '0000'
  const month = parts.find(p => p.type === 'month')?.value || '01'
  const day = parts.find(p => p.type === 'day')?.value || '01'
  
  return `${year}-${month}-${day}`
}

export function EventsShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  
  // Get all upcoming events sorted by date
  const allUpcomingEvents = useMemo(() => {
    return events
      .filter(e => isEventUpcoming(e))
      .sort((a, b) => {
        try {
          return compareDayKeys(getEventStartKey(a), getEventStartKey(b))
        } catch {
          return 0
        }
      })
  }, [])
  
  // Filter events based on active filter
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') {
      return allUpcomingEvents.slice(0, 4)
    }
    
    const todayKey = getTodayKey(DEFAULT_TIMEZONE)
    const filtered: typeof allUpcomingEvents = []
    
    for (const event of allUpcomingEvents) {
      const eventStartKey = getEventStartKey(event)
      const eventEndKey = event.endDate 
        ? parseISODateToZonedDay(event.endDate, DEFAULT_TIMEZONE)
        : eventStartKey
      
      if (activeFilter === 'today') {
        if (eventStartKey === todayKey || (eventStartKey <= todayKey && eventEndKey >= todayKey)) {
          filtered.push(event)
        }
      } else if (activeFilter === 'weekend') {
        const weekend = getWeekendRange(DEFAULT_TIMEZONE)
        // Event overlaps with weekend if it starts before/on Sunday and ends on/after Friday
        if (eventStartKey <= weekend.end && eventEndKey >= weekend.start) {
          filtered.push(event)
        }
      } else if (activeFilter === 'month') {
        const thirtyDaysFromNow = new Date()
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
        const futureKey = getDateKeyInTimezone(thirtyDaysFromNow, DEFAULT_TIMEZONE)
        if (eventStartKey <= futureKey) {
          filtered.push(event)
        }
      }
    }
    
    return filtered.slice(0, 4)
  }, [allUpcomingEvents, activeFilter])
  
  const upcomingEvents = filteredEvents

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <p className="section-eyebrow-light mb-0">
                What's Happening
              </p>
              <MicroLabel tone="neutral" size="xs" aria-label="Content updated regularly">
                Updated regularly
              </MicroLabel>
            </div>
            <h2 className="section-title-light">
              This Week in Auburn
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
        
        {/* Filter Chips */}
        <div 
          className="flex flex-wrap gap-2 mb-8"
          role="group"
          aria-label="Filter events by time period"
        >
          {[
            { key: 'today' as FilterType, label: 'Today' },
            { key: 'weekend' as FilterType, label: 'This Weekend' },
            { key: 'month' as FilterType, label: 'Next 30 Days' },
            { key: 'all' as FilterType, label: 'All Upcoming' },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key)
                trackEventsFilterClick(filter.key)
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? 'bg-forest-500 text-white shadow-sm'
                  : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
              }`}
              aria-pressed={activeFilter === filter.key}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid #2563eb'
                e.currentTarget.style.outlineOffset = '2px'
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none'
              }}
            >
              {filter.label}
            </button>
          ))}
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
                onClick={() => trackEventClick(event.slug.current)}
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
                        {formatEventDateRange(event.startDate, event.endDate)}
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

        {/* Empty State with Fallback */}
        {upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-charcoal-600 text-lg mb-6">
              No big events in this window — here are 3 timeless Auburn experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Link
                href="/things-to-do/history-culture"
                className="px-6 py-3 bg-forest-500 text-white rounded-lg font-semibold hover:bg-forest-600 transition-colors"
              >
                Explore Gold Rush History
              </Link>
              <Link
                href="/things-to-do/outdoor-adventures"
                className="px-6 py-3 bg-forest-500 text-white rounded-lg font-semibold hover:bg-forest-600 transition-colors"
              >
                Hit the Trails
              </Link>
              <Link
                href="/things-to-do/history-culture/placer-county-museum"
                className="px-6 py-3 bg-forest-500 text-white rounded-lg font-semibold hover:bg-forest-600 transition-colors"
              >
                Visit Gold Country Museum
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
