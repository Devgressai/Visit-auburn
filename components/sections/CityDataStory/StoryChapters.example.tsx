/**
 * Story Chapters - Usage Examples
 * 
 * Demonstrates various ways to use the StoryChapters component
 * for scrollytelling experiences.
 */

'use client'

import { StoryChapters } from './StoryChapters'
import { StoryStoreProvider } from './storyStore'
import { auburnStoryChapters } from '@/lib/data/cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Basic Usage
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Simplest implementation - just render the chapters
 */
export function BasicStoryChapters() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <StoryChapters chapters={auburnStoryChapters} />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: With Callback
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Track chapter activation with callback
 */
export function StoryChaptersWithCallback() {
  const handleChapterActivate = (chapter: typeof auburnStoryChapters[0]) => {
    console.log('Chapter activated:', chapter.title)
    console.log('Year range:', chapter.startYear, '-', chapter.endYear)
  }

  return (
    <StoryStoreProvider initialYear={1900}>
      <StoryChapters 
        chapters={auburnStoryChapters}
        onChapterActivate={handleChapterActivate}
      />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Custom Intersection Settings
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Customize IntersectionObserver behavior
 */
export function StoryChaptersCustomIntersection() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <StoryChapters 
        chapters={auburnStoryChapters}
        intersectionThreshold={0.6}
        intersectionRootMargin="-10% 0px -10% 0px"
      />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: Disable Auto-Activation
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Manual control only - no scroll-based activation
 */
export function StoryChaptersManualOnly() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <StoryChapters 
        chapters={auburnStoryChapters}
        enableAutoActivation={false}
      />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: Scrollytelling Layout (Side-by-Side)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Classic scrollytelling layout with sticky visualization
 */
export function ScrollytellingLayout() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left: Sticky Visualization */}
        <div className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:items-center">
          <div className="w-full aspect-square bg-white/5 rounded-2xl border border-white/10 p-8">
            <p className="text-text-muted text-center">
              Your chart/visualization goes here
            </p>
          </div>
        </div>

        {/* Right: Scrolling Chapters */}
        <div className="py-8">
          <StoryChapters chapters={auburnStoryChapters} />
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: With Population Chart Integration
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Full integration with PopulationChart
 */
export function StoryChaptersWithChart() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <div className="bg-charcoal-800 py-16">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Sticky Chart */}
            <div className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:items-center">
              <div className="w-full">
                <h2 className="text-3xl font-bold text-white font-display mb-6">
                  Population Growth
                </h2>
                <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 p-8">
                  {/* Import and use PopulationChart here */}
                  <p className="text-text-muted text-center">
                    PopulationChart component
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Scrolling Chapters */}
            <div className="py-8">
              <StoryChapters chapters={auburnStoryChapters} />
            </div>
          </div>
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 7: Custom Styling
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Override default styling with custom className
 */
export function StoryChaptersCustomStyle() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <StoryChapters 
        chapters={auburnStoryChapters}
        className="max-w-2xl mx-auto"
      />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 8: Filtered Chapters
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Show only specific chapters
 */
export function StoryChaptersFiltered() {
  // Show only modern chapters (1950+)
  const modernChapters = auburnStoryChapters.filter(
    chapter => chapter.startYear >= 1950
  )

  return (
    <StoryStoreProvider initialYear={1950}>
      <StoryChapters chapters={modernChapters} />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 9: With Analytics Tracking
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Track chapter interactions for analytics
 */
export function StoryChaptersWithAnalytics() {
  const handleChapterActivate = (chapter: typeof auburnStoryChapters[0]) => {
    // Track with your analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chapter_view', {
        chapter_id: chapter.id,
        chapter_title: chapter.title,
        year_range: `${chapter.startYear}-${chapter.endYear}`,
      })
    }
  }

  return (
    <StoryStoreProvider initialYear={1900}>
      <StoryChapters 
        chapters={auburnStoryChapters}
        onChapterActivate={handleChapterActivate}
      />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 10: Mobile-Optimized Layout
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Responsive layout that works great on mobile
 */
export function StoryChaptersMobileOptimized() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <div className="bg-charcoal-800 py-8 md:py-16">
        <div className="container mx-auto px-4">
          {/* Mobile: Stacked, Desktop: Side-by-side */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-16">
            {/* Visualization */}
            <div className="order-2 lg:order-1 lg:sticky lg:top-24 lg:h-screen lg:flex lg:items-center">
              <div className="w-full aspect-video lg:aspect-square bg-white/5 rounded-2xl border border-white/10 p-4 md:p-8">
                <p className="text-text-muted text-center text-sm md:text-base">
                  Chart visualization
                </p>
              </div>
            </div>

            {/* Chapters */}
            <div className="order-1 lg:order-2 py-4 lg:py-8">
              <StoryChapters chapters={auburnStoryChapters} />
            </div>
          </div>
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 11: With State Debugging
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Show current state for debugging
 */
export function StoryChaptersWithDebug() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <div className="space-y-6">
        {/* Debug Panel */}
        <DebugPanel />
        
        {/* Chapters */}
        <StoryChapters chapters={auburnStoryChapters} />
      </div>
    </StoryStoreProvider>
  )
}

function DebugPanel() {
  const { activeYear, hoveredYear, compareMode } = useStoryStore()
  
  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10 font-mono text-xs">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <span className="text-text-muted">activeYear:</span>{' '}
          <span className="text-pine-400">{activeYear ?? 'null'}</span>
        </div>
        <div>
          <span className="text-text-muted">hoveredYear:</span>{' '}
          <span className="text-pine-400">{hoveredYear ?? 'null'}</span>
        </div>
        <div>
          <span className="text-text-muted">compareMode:</span>{' '}
          <span className="text-pine-400">{compareMode}</span>
        </div>
      </div>
    </div>
  )
}

// Import for debug panel
import { useStoryStore } from './storyStore'

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 12: Full Page Implementation
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Complete page implementation with header and footer
 */
export function FullPageStoryChapters() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <div className="min-h-screen bg-charcoal-800">
        {/* Header */}
        <header className="bg-charcoal-900 border-b border-white/10 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-2">
              Auburn Through Time
            </h1>
            <p className="text-lg text-text-muted">
              Explore the story of Auburn&apos;s growth from Gold Rush town to modern destination
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Sticky Visualization */}
              <div className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:items-center">
                <div className="w-full aspect-square bg-white/5 rounded-2xl border border-white/10 p-8">
                  <p className="text-text-muted text-center">
                    Your visualization here
                  </p>
                </div>
              </div>

              {/* Scrolling Chapters */}
              <div className="py-8">
                <StoryChapters chapters={auburnStoryChapters} />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-charcoal-900 border-t border-white/10 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-text-muted text-sm">
            <p>Data sources: U.S. Census Bureau, California Department of Finance</p>
          </div>
        </footer>
      </div>
    </StoryStoreProvider>
  )
}

