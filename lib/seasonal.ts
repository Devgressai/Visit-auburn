/**
 * Seasonal content utilities for surfacing time-relevant content
 */

export type Season = 'spring' | 'summer' | 'fall' | 'winter'

export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1 // 1-12

  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'fall'
  return 'winter'
}

export function isCurrentSeason(startMonth: number, endMonth: number): boolean {
  const currentMonth = new Date().getMonth() + 1
  
  if (startMonth <= endMonth) {
    // Same year range (e.g., June-August)
    return currentMonth >= startMonth && currentMonth <= endMonth
  } else {
    // Cross-year range (e.g., December-February)
    return currentMonth >= startMonth || currentMonth <= endMonth
  }
}

export function getSeasonalMonths(season: Season): { start: number; end: number } {
  switch (season) {
    case 'spring':
      return { start: 3, end: 5 }
    case 'summer':
      return { start: 6, end: 8 }
    case 'fall':
      return { start: 9, end: 11 }
    case 'winter':
      return { start: 12, end: 2 } // Cross-year
    default:
      return { start: 1, end: 12 }
  }
}

export function isUpcomingEvent(eventDate: string, daysAhead: number = 30): boolean {
  const event = new Date(eventDate)
  const today = new Date()
  const futureDate = new Date()
  futureDate.setDate(today.getDate() + daysAhead)
  
  return event >= today && event <= futureDate
}

export function isThisMonth(date: string): boolean {
  const eventDate = new Date(date)
  const today = new Date()
  
  return (
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  )
}



