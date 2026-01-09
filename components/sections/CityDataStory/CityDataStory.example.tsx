/**
 * City Data Story - Usage Examples
 * 
 * This file demonstrates how to use the CityDataStory component
 * in various contexts and configurations.
 */

import { CityDataStory } from './CityDataStory'
import { 
  auburnThroughTimeData, 
  auburnStoryChapters,
  auburnConfig,
} from '@/lib/data/cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Basic Usage (Default Configuration)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Simplest usage - uses all defaults
 */
export function BasicCityDataStory() {
  return <CityDataStory />
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: With Custom Initial Chapter
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Start with a specific chapter (e.g., chapter 2)
 */
export function CityDataStoryWithInitialChapter() {
  return (
    <CityDataStory 
      initialChapterIndex={2}  // Start with "The Interstate Era"
    />
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Full Page Implementation
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Complete page with CityDataStory as main content
 * This is how you'd use it in app/data-story/page.tsx
 */
export default function DataStoryPage() {
  return (
    <main>
      {/* Optional: Add a hero section */}
      <section className="relative h-[40vh] bg-gradient-to-br from-charcoal-900 to-charcoal-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="hero-title mb-4">Auburn&apos;s Data Story</h1>
          <p className="hero-subtitle max-w-2xl mx-auto px-4">
            Explore 120 years of growth, change, and resilience through interactive data visualization
          </p>
        </div>
      </section>

      {/* Main CityDataStory component */}
      <CityDataStory />

      {/* Optional: Add a CTA section */}
      <section className="py-16 bg-pine-500 text-white text-center">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Want to Learn More?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Explore our interactive maps, historical archives, and community stories.
          </p>
          <a 
            href="/discover" 
            className="btn-outline-white inline-block"
          >
            Discover Auburn
          </a>
        </div>
      </section>
    </main>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: Embedded in Another Page
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Use as a section within a larger page (e.g., About page)
 */
export function AboutPageWithDataStory() {
  return (
    <main>
      <section className="py-16 bg-cream-50">
        <div className="container">
          <h1 className="section-title-light text-center mb-8">
            About Auburn
          </h1>
          <div className="prose prose-lg max-w-3xl mx-auto">
            <p>
              Auburn, California has a rich history dating back to the Gold Rush era...
            </p>
          </div>
        </div>
      </section>

      {/* Embedded CityDataStory */}
      <CityDataStory />

      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="section-title-light text-center mb-8">
            Our Community Today
          </h2>
          {/* More content */}
        </div>
      </section>
    </main>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: Custom Data (Porting to Another City)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Example of how to use with different city data
 * This shows how portable the component is
 */

// Hypothetical Sacramento data (same structure as Auburn)
const sacramentoData = [
  {
    year: 1900,
    city: 29000,
    county: 45000,
    state: 1485000,
    milestoneTitle: 'State Capital Growth',
    milestoneBody: 'Sacramento solidifies its role as California\'s capital...',
    sources: [{ label: 'US Census 1900' }],
  },
  // ... more data points
]

const sacramentoChapters = [
  {
    id: 'gold-rush',
    title: 'Gold Rush Capital',
    startYear: 1900,
    endYear: 1930,
    takeaway: 'Sacramento emerges as the gateway to Gold Country',
    detail: 'As the state capital and major port...',
    metricHighlights: [
      { label: 'Population Growth', value: '+45%', note: '1900-1930' },
    ],
  },
  // ... more chapters
]

const sacramentoConfig = {
  name: 'Sacramento',
  county: 'Sacramento County',
  state: 'California',
  established: 1850,
  dataStartYear: 1900,
  dataEndYear: 2020,
}

export function SacramentoDataStory() {
  return (
    <CityDataStory 
      data={sacramentoData}
      chapters={sacramentoChapters}
      config={sacramentoConfig}
    />
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: With Custom Styling/Wrapper
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Wrap with custom container or styling
 */
export function StyledCityDataStory() {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-50/30 to-transparent pointer-events-none" />
      
      {/* Component */}
      <div className="relative z-10">
        <CityDataStory />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 7: Next.js App Router Page
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Complete Next.js page with metadata
 * Save as: app/data-story/page.tsx
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auburn Through Time - Data Story',
  description: 'Explore Auburn\'s journey from 1900 to today through interactive data visualizations and historical narratives.',
  openGraph: {
    title: 'Auburn Through Time - Data Story',
    description: 'Interactive data visualization of Auburn\'s 120-year history',
    type: 'website',
  },
}

export function DataStoryPageWithMetadata() {
  return (
    <main>
      <CityDataStory />
    </main>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 8: With Analytics Tracking
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Track user interactions with analytics
 */

'use client'

import { useEffect } from 'react'
import { trackPageView } from '@/lib/analytics'

export function CityDataStoryWithAnalytics() {
  useEffect(() => {
    // Track page view
    trackPageView('/data-story')
  }, [])

  return <CityDataStory />
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 9: Lazy Loaded (Performance Optimization)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Lazy load the component for better initial page load
 */

import dynamic from 'next/dynamic'

const CityDataStoryLazy = dynamic(
  () => import('./CityDataStory').then(mod => ({ default: mod.CityDataStory })),
  {
    loading: () => (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gold-500 border-t-transparent" />
        <p className="mt-4 text-charcoal-600">Loading data story...</p>
      </div>
    ),
    ssr: false, // Optional: disable SSR for this component
  }
)

export function LazyLoadedCityDataStory() {
  return <CityDataStoryLazy />
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 10: With Error Boundary
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Wrap with error boundary for production safety
 */

'use client'

import { Component, type ReactNode } from 'react'

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-charcoal-600 mb-8">
            We couldn&apos;t load the data story. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export function CityDataStoryWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <CityDataStory />
    </ErrorBoundary>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// RECOMMENDED PRODUCTION SETUP
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Recommended setup combining best practices:
 * - Metadata for SEO
 * - Analytics tracking
 * - Error boundary
 * - Lazy loading (optional)
 */

export function ProductionCityDataStory() {
  return (
    <ErrorBoundary>
      <CityDataStoryWithAnalytics />
    </ErrorBoundary>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// USAGE IN NEXT.JS APP ROUTER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * File: app/data-story/page.tsx
 * 
 * import { CityDataStory } from '@/components/sections/CityDataStory'
 * import type { Metadata } from 'next'
 * 
 * export const metadata: Metadata = {
 *   title: 'Auburn Through Time - Data Story',
 *   description: 'Explore Auburn\'s journey through interactive data visualizations',
 * }
 * 
 * export default function DataStoryPage() {
 *   return (
 *     <main>
 *       <CityDataStory />
 *     </main>
 *   )
 * }
 */

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  BasicCityDataStory,
  CityDataStoryWithInitialChapter,
  DataStoryPage,
  AboutPageWithDataStory,
  SacramentoDataStory,
  StyledCityDataStory,
  DataStoryPageWithMetadata,
  CityDataStoryWithAnalytics,
  LazyLoadedCityDataStory,
  CityDataStoryWithErrorBoundary,
  ProductionCityDataStory,
}

