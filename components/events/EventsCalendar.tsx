'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Event } from '@/types'

interface EventsCalendarProps {
  events: Event[]
}

export function EventsCalendar({ events }: EventsCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return []
    return events.filter((event) => {
      if (!event.startDate) return false
      const eventDate = new Date(event.startDate)
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      )
    })
  }, [selectedDate, events])

  // Get all dates that have events
  const datesWithEvents = useMemo(() => {
    const dateSet = new Set<string>()
    events.forEach((event) => {
      if (event.startDate) {
        const date = new Date(event.startDate)
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        dateSet.add(key)
      }
    })
    return dateSet
  }, [events])

  const hasEventOnDate = (day: number): boolean => {
    const key = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${day}`
    return datesWithEvents.has(key)
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    setSelectedDate(null)
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
  }

  const days = []
  const totalCells = firstDayOfMonth(currentMonth) + daysInMonth(currentMonth)
  for (let i = 0; i < totalCells; i++) {
    const day = i - firstDayOfMonth(currentMonth) + 1
    if (day < 1 || day > daysInMonth(currentMonth)) {
      days.push(null)
    } else {
      days.push(day)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Calendar */}
      <div className="md:col-span-2">
        <div className="bg-white rounded-2xl border border-charcoal-100 shadow-card p-6">
          {/* Month Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-charcoal-900 font-display">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-cream-50 rounded-lg transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-cream-50 rounded-lg transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-charcoal-600 text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <div key={index}>
                {day ? (
                  <button
                    onClick={() => handleDateClick(day)}
                    className={`w-full aspect-square rounded-lg font-semibold text-sm transition-all relative group ${
                      selectedDate?.getDate() === day &&
                      selectedDate?.getMonth() === currentMonth.getMonth() &&
                      selectedDate?.getFullYear() === currentMonth.getFullYear()
                        ? 'bg-lake-600 text-white'
                        : 'hover:bg-cream-100'
                    } ${hasEventOnDate(day) ? 'border-2 border-gold-500' : 'border border-transparent'}`}
                  >
                    {day}
                    {hasEventOnDate(day) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gold-500 rounded-full" />
                    )}
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-charcoal-100 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-gold-500" />
              <span className="text-xs text-charcoal-600">Events scheduled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Events List for Selected Date */}
      <div>
        <div className="bg-white rounded-2xl border border-charcoal-100 shadow-card p-6 sticky top-24">
          <h3 className="text-xl font-bold text-charcoal-900 mb-4 font-display">
            {selectedDate
              ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
              : 'Select a date'}
          </h3>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <div key={event._id} className="pb-4 border-b border-charcoal-100 last:border-b-0 last:pb-0">
                  <h4 className="font-bold text-charcoal-900 mb-1 hover:text-lake-600 transition-colors">
                    {event.title}
                  </h4>
                  {event.excerpt && (
                    <p className="text-sm text-charcoal-600 mb-2 line-clamp-2">
                      {event.excerpt}
                    </p>
                  )}
                  {event.startDate && (
                    <p className="text-xs text-charcoal-500">
                      {new Date(event.startDate).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <p className="text-charcoal-600 text-sm">No events scheduled for this date.</p>
          ) : (
            <p className="text-charcoal-500 text-sm italic">
              Click a date on the calendar to see events.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

