/**
 * Analytics tracking utilities
 * Supports Google Analytics 4 (gtag)
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
    })
  }
}

export function trackCTAClick(location: string, destination: string, label?: string) {
  trackEvent('cta_click', {
    location,
    destination,
    label,
  })
}

export function trackBookingClick(type: string, name: string, category?: string) {
  trackEvent('booking_click', {
    type,
    name,
    category,
  })
}

export function trackSearch(searchTerm: string, resultCount: number) {
  trackEvent('search', {
    search_term: searchTerm,
    result_count: resultCount,
  })
}

export function trackNewsletterSignup(source: string) {
  trackEvent('newsletter_signup', {
    source,
  })
}




