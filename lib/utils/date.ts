/**
 * Date utilities for timezone-aware event handling
 * Uses America/Los_Angeles timezone consistently
 * Handles DST transitions and date-only ISO strings correctly
 */

const DEFAULT_TIMEZONE = 'America/Los_Angeles'

/**
 * Get the date string (YYYY-MM-DD) for a given date in the specified timezone.
 * Uses formatToParts to ensure DST correctness.
 * 
 * @param date - Date object
 * @param tz - Timezone identifier
 * @returns Date string in YYYY-MM-DD format
 */
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

/**
 * Parse an ISO date string and get its date string (YYYY-MM-DD) in the specified timezone.
 * Handles both date-time and date-only ISO strings correctly.
 * 
 * @param dateStr - ISO date string (e.g., "2024-01-15T10:00:00Z" or "2024-01-15")
 * @param tz - Timezone identifier (default: "America/Los_Angeles")
 * @returns Date string in YYYY-MM-DD format for the date in the specified timezone
 */
export function parseISODateToZonedDay(dateStr: string, tz: string = DEFAULT_TIMEZONE): string {
  // Handle date-only strings (YYYY-MM-DD) by appending UTC time component
  // Using 'Z' ensures UTC parsing, avoiding local timezone differences
  const normalizedDateStr = dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00Z`
  const date = new Date(normalizedDateStr)
  
  // Validate the date was parsed correctly
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`)
  }
  
  return getDateKeyInTimezone(date, tz)
}

/**
 * Safe version of parseISODateToZonedDay that returns null for invalid dates.
 * Prevents crashes from malformed date strings in production.
 * 
 * @param dateStr - ISO date string (e.g., "2024-01-15T10:00:00Z" or "2024-01-15")
 * @param tz - Timezone identifier (default: "America/Los_Angeles")
 * @returns Date string in YYYY-MM-DD format, or null if invalid
 */
export function safeParseISODateToZonedDay(
  dateStr: string,
  tz: string = DEFAULT_TIMEZONE
): string | null {
  try {
    // Handle date-only strings (YYYY-MM-DD) by appending UTC time component
    // Using 'Z' ensures UTC parsing, avoiding local timezone differences
    const normalizedDateStr = dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00Z`
    const date = new Date(normalizedDateStr)
    
    // Validate the date was parsed correctly
    if (isNaN(date.getTime())) {
      return null
    }
    
    return getDateKeyInTimezone(date, tz)
  } catch {
    return null
  }
}

/**
 * Get today's date key (YYYY-MM-DD) in the specified timezone.
 * 
 * @param tz - Timezone identifier (default: "America/Los_Angeles")
 * @returns Today's date string in YYYY-MM-DD format
 */
export function getTodayKey(tz: string = DEFAULT_TIMEZONE): string {
  return getDateKeyInTimezone(new Date(), tz)
}

/**
 * Compare two date keys lexicographically.
 * Date keys are in YYYY-MM-DD format, so lexicographic comparison works correctly.
 * 
 * @param aKey - First date key (YYYY-MM-DD)
 * @param bKey - Second date key (YYYY-MM-DD)
 * @returns Negative if aKey < bKey, positive if aKey > bKey, 0 if equal
 */
export function compareDayKeys(aKey: string, bKey: string): number {
  if (aKey < bKey) return -1
  if (aKey > bKey) return 1
  return 0
}

/**
 * Safe comparison of two date keys that handles null/undefined values.
 * Invalid dates are pushed to the end of the sort order.
 * 
 * @param aKey - First date key (YYYY-MM-DD or null/undefined)
 * @param bKey - Second date key (YYYY-MM-DD or null/undefined)
 * @returns Negative if aKey < bKey, positive if aKey > bKey, 0 if equal
 */
export function safeCompareDayKeys(
  aKey: string | null | undefined,
  bKey: string | null | undefined
): number {
  // Both invalid: equal
  if (!aKey && !bKey) return 0
  // First invalid: push to end
  if (!aKey) return 1
  // Second invalid: push to end
  if (!bKey) return -1
  // Both valid: normal comparison
  return compareDayKeys(aKey, bKey)
}

/**
 * Get the event start date key (YYYY-MM-DD) in the specified timezone.
 * Returns '9999-12-31' for invalid dates to push them to the end when sorting.
 * 
 * @param event - Event object with startDate
 * @param tz - Timezone identifier (default: "America/Los_Angeles")
 * @returns Start date key in YYYY-MM-DD format, or '9999-12-31' if invalid
 */
export function getEventStartKey(
  event: { startDate: string },
  tz: string = DEFAULT_TIMEZONE
): string {
  const key = safeParseISODateToZonedDay(event.startDate, tz)
  return key ?? '9999-12-31'
}

/**
 * Check if an event is upcoming (hasn't ended yet).
 * An event is upcoming if its endDate (or startDate if no endDate) is on or after today.
 * Returns false for invalid dates to prevent crashes.
 * 
 * @param event - Event object with startDate and optional endDate
 * @param tz - Timezone identifier (default: "America/Los_Angeles")
 * @returns true if the event is upcoming, false otherwise (including invalid dates)
 */
export function isEventUpcoming(
  event: { startDate: string; endDate?: string },
  tz: string = DEFAULT_TIMEZONE
): boolean {
  // Compute effective date: use endDate if available, otherwise startDate
  const effectiveDate = event.endDate ?? event.startDate
  
  // Convert effective date to day key in the specified timezone (safe parse)
  const effectiveKey = safeParseISODateToZonedDay(effectiveDate, tz)
  
  // Return false if date is invalid
  if (effectiveKey === null) {
    return false
  }
  
  // Get today's key in the specified timezone
  const todayKey = getTodayKey(tz)
  
  // Compare: event is upcoming if effectiveKey >= todayKey
  return effectiveKey >= todayKey
}

/**
 * Format an event date range for display.
 * Handles single-day and multi-day events.
 * Dates are formatted in the specified timezone.
 * 
 * @param startDate - ISO date string for event start
 * @param endDate - Optional ISO date string for event end
 * @param tz - Timezone identifier (default: "America/Los_Angeles")
 * @returns Formatted date string (e.g., "Jan 15" or "Jan 15 - Jan 17")
 */
export function formatEventDateRange(
  startDate: string,
  endDate: string | undefined,
  tz: string = DEFAULT_TIMEZONE
): string {
  // Format dates in the target timezone
  const startDateObj = new Date(startDate)
  const startFormatted = formatDateInTimezone(startDateObj, 'MMM d', tz)
  
  if (!endDate || endDate === startDate) {
    return startFormatted
  }
  
  const endDateObj = new Date(endDate)
  const endFormatted = formatDateInTimezone(endDateObj, 'MMM d', tz)
  
  return `${startFormatted} - ${endFormatted}`
}

/**
 * Format a date in a specific timezone using date-fns format
 * This ensures the date is displayed as it appears in the target timezone
 */
function formatDateInTimezone(date: Date, formatStr: string, tz: string): string {
  // Use Intl to get the date components in the target timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  
  const parts = formatter.formatToParts(date)
  const month = parts.find(p => p.type === 'month')?.value || ''
  const day = parts.find(p => p.type === 'day')?.value || ''
  
  // Return formatted string matching date-fns 'MMM d' format
  return `${month} ${parseInt(day, 10)}`
}
