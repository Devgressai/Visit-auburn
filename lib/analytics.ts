/**
 * Analytics tracking utilities
 * Supports Google Analytics 4 (gtag)
 * All functions are safe no-ops if GA is not configured
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

/**
 * Check if GA is configured and available
 */
function isGAAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

/**
 * Core event tracking function - safe no-op if GA not configured
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
): void {
  if (isGAAvailable() && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

/**
 * Keys that should be removed from search params (PII protection)
 */
const SENSITIVE_PARAM_KEYS = new Set(['q', 'query', 'search', 'email', 'phone'])

/**
 * Safe allowlist of param keys that can be included in analytics
 */
const SAFE_PARAM_ALLOWLIST = new Set(['type', 'filter', 'page', 'category', 'season'])

/**
 * Sanitize search params to remove PII and only keep safe allowlisted params
 */
export function sanitizeSearchParams(searchParams: URLSearchParams): string {
  const sanitized: string[] = []
  
  for (const [key, value] of searchParams.entries()) {
    // Skip sensitive keys
    if (SENSITIVE_PARAM_KEYS.has(key.toLowerCase())) {
      continue
    }
    
    // Only include allowlisted keys
    if (SAFE_PARAM_ALLOWLIST.has(key.toLowerCase())) {
      sanitized.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }
  
  return sanitized.length > 0 ? `?${sanitized.join('&')}` : ''
}

/**
 * Track pageview - safe no-op if GA not configured
 * Automatically sanitizes search params to prevent PII leakage
 */
export function trackPageView(pathname: string, searchParams?: URLSearchParams | null): void {
  if (isGAAvailable() && window.gtag) {
    const sanitizedParams = searchParams ? sanitizeSearchParams(searchParams) : ''
    const pagePath = pathname + sanitizedParams
    
    window.gtag('event', 'page_view', {
      page_path: pagePath,
    })
  }
}

/**
 * Track search page view with metadata (no query text)
 */
export function trackSearchPageView(
  hasQuery: boolean,
  queryLength?: number,
  typeFilter?: string | null
): void {
  if (isGAAvailable() && window.gtag) {
    const properties: Record<string, any> = {
      page_path: '/search',
      has_query: hasQuery,
    }
    
    if (queryLength !== undefined) {
      properties.query_length = queryLength
    }
    
    if (typeFilter) {
      properties.type_filter = typeFilter
    }
    
    window.gtag('event', 'search_page_view', properties)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTION TRACKING
// ═══════════════════════════════════════════════════════════════════════════

type HeroPrimaryAction = 'build_weekend' | 'things_to_do' | 'events_this_week'

export function trackHeroPrimaryClick(action: HeroPrimaryAction): void {
  trackEvent('hero_primary_click', {
    action,
  })
}

type HeroVibe = 'adventure' | 'family' | 'food_wine' | 'history' | 'relaxed'

export function trackHeroVibeClick(vibe: HeroVibe): void {
  trackEvent('hero_vibe_click', {
    vibe,
  })
}

type HeroQuickPlan = '1_day' | '2_days' | 'family_weekend' | 'adventure_weekend'

export function trackHeroQuickPlanClick(plan: HeroQuickPlan): void {
  trackEvent('hero_quick_plan_click', {
    plan,
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// SEARCH TRACKING
// ═══════════════════════════════════════════════════════════════════════════

type SearchType = 'activity' | 'accommodation' | 'dining' | 'event' | 'editorial' | 'attraction' | 'venue'

/**
 * Track search submission
 * Note: Only tracks query length, not the actual query text (PII protection)
 */
export function trackSearchSubmit(queryLength: number, type?: 'full' | 'typeahead'): void {
  trackEvent('search_submit', {
    query_length: queryLength,
    search_type: type || 'full',
  })
}

/**
 * Track typeahead suggestion selection
 */
export function trackSearchTypeaheadSelect(type: SearchType, href: string): void {
  trackEvent('search_typeahead_select', {
    result_type: type,
    destination: href,
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// EVENTS SHOWCASE TRACKING
// ═══════════════════════════════════════════════════════════════════════════

type EventsFilter = 'today' | 'weekend' | 'month' | 'all'

export function trackEventsFilterClick(filter: EventsFilter): void {
  trackEvent('events_filter_click', {
    filter,
  })
}

/**
 * Track event card click
 */
export function trackEventClick(slug: string): void {
  trackEvent('event_click', {
    event_slug: slug,
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// LEGACY FUNCTIONS (kept for backward compatibility)
// ═══════════════════════════════════════════════════════════════════════════

export function trackCTAClick(location: string, destination: string, label?: string): void {
  trackEvent('cta_click', {
    location,
    destination,
    label,
  })
}

export function trackBookingClick(type: string, name: string, category?: string): void {
  trackEvent('booking_click', {
    type,
    name,
    category,
  })
}

export function trackSearch(searchTerm: string, resultCount: number): void {
  // Note: This function tracks the search term, which may contain PII
  // Consider using trackSearchSubmit with queryLength instead
  trackEvent('search', {
    search_term: searchTerm,
    result_count: resultCount,
  })
}

export function trackNewsletterSignup(source: string): void {
  trackEvent('newsletter_signup', {
    source,
  })
}




