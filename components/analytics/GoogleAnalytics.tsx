'use client'

/**
 * Google Analytics 4 component
 * Handles GA4 injection and pageview tracking for App Router
 * Hardened to prevent PII leakage from query parameters
 */

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { trackPageView, trackSearchPageView } from '@/lib/analytics'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track pageviews on route changes with PII protection
  useEffect(() => {
    if (!GA_ID) return

    // Special handling for /search route
    if (pathname === '/search') {
      const queryParam = searchParams?.get('q') || searchParams?.get('query') || searchParams?.get('search')
      const hasQuery = Boolean(queryParam)
      const queryLength = queryParam ? queryParam.length : undefined
      const typeFilter = searchParams?.get('type') || null
      
      trackSearchPageView(hasQuery, queryLength, typeFilter)
    } else {
      // For all other routes, use sanitized pageview tracking
      trackPageView(pathname, searchParams)
    }
  }, [pathname, searchParams])

  if (!GA_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
