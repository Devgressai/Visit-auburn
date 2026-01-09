/**
 * Story Chapters - Scrollytelling Navigation Component
 * 
 * A card-based navigation system for the City Data Story scrollytelling experience.
 * Each chapter card represents a thematic time period with:
 * - Visual hierarchy (title, year range, takeaway, details)
 * - Interactive states (hover, active, focus)
 * - IntersectionObserver integration for scroll-based activation
 * - Click-to-navigate functionality
 * - Metric highlight chips
 * 
 * BEHAVIOR:
 * - Clicking a card sets activeYear to chapter.endYear
 * - When a card enters viewport (via IntersectionObserver), it becomes active
 * - Manual scrubbing (clicking) temporarily disables auto-activation
 * - "Reset to start" control returns to initial state
 * 
 * ACCESSIBILITY:
 * - Keyboard navigable (tab, enter, space)
 * - Clear focus indicators
 * - ARIA labels and roles
 * - Semantic HTML structure
 */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useStoryStore } from './storyStore'
import type { StoryChapter, CityDataStoryConfig } from '@/lib/data/cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

interface StoryChaptersProps {
  /** Complete city configuration (includes chapters and city name) */
  config: CityDataStoryConfig
  
  /** Whether to enable IntersectionObserver auto-activation (default: true) */
  enableAutoActivation?: boolean
  
  /** Intersection threshold (0-1, default: 0.5) */
  intersectionThreshold?: number
  
  /** Root margin for intersection observer (default: '-20% 0px -20% 0px') */
  intersectionRootMargin?: string
  
  /** Callback when a chapter is activated */
  onChapterActivate?: (chapter: StoryChapter) => void
  
  /** Custom className for container */
  className?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function StoryChapters({
  config,
  enableAutoActivation = true,
  intersectionThreshold = 0.5,
  intersectionRootMargin = '-20% 0px -20% 0px',
  onChapterActivate,
  className = '',
}: StoryChaptersProps) {
  const { chapters, cityName = 'City' } = config
  const { activeYear, setActiveYear, reset } = useStoryStore()
  
  // Track if user is manually scrubbing (disables auto-activation temporarily)
  const [isManualScrubbing, setIsManualScrubbing] = useState(false)
  const manualScrubbingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Refs for each chapter card (for IntersectionObserver)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())

  // ─────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Handle card click - set active year and enable manual scrubbing mode
   */
  const handleCardClick = useCallback((chapter: StoryChapter) => {
    // Set active year to the end of this chapter
    setActiveYear(chapter.endYear)
    
    // Enable manual scrubbing mode (disables auto-activation for 2 seconds)
    setIsManualScrubbing(true)
    
    // Clear existing timeout
    if (manualScrubbingTimeoutRef.current) {
      clearTimeout(manualScrubbingTimeoutRef.current)
    }
    
    // Re-enable auto-activation after 2 seconds
    manualScrubbingTimeoutRef.current = setTimeout(() => {
      setIsManualScrubbing(false)
    }, 2000)
    
    // Callback
    if (onChapterActivate) {
      onChapterActivate(chapter)
    }
  }, [setActiveYear, onChapterActivate])

  /**
   * Handle reset button click
   */
  const handleReset = useCallback(() => {
    reset()
    setIsManualScrubbing(false)
    
    // Clear any pending timeouts
    if (manualScrubbingTimeoutRef.current) {
      clearTimeout(manualScrubbingTimeoutRef.current)
    }
  }, [reset])

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((
    e: React.KeyboardEvent,
    chapter: StoryChapter
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick(chapter)
    }
  }, [handleCardClick])

  // ─────────────────────────────────────────────────────────────────────────
  // INTERSECTION OBSERVER
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!enableAutoActivation) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Only process if not manually scrubbing
        if (isManualScrubbing) return

        // Find the most visible card
        let mostVisibleEntry: IntersectionObserverEntry | null = null
        let maxRatio = 0

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            mostVisibleEntry = entry
          }
        })

        // Activate the most visible chapter
        if (mostVisibleEntry !== null) {
          const entry = mostVisibleEntry as IntersectionObserverEntry
          const chapterId = entry.target.getAttribute('data-chapter-id')
          const chapter = chapters.find(c => c.id === chapterId)
          
          if (chapter) {
            setActiveYear(chapter.endYear)
            
            if (onChapterActivate) {
              onChapterActivate(chapter)
            }
          }
        }
      },
      {
        threshold: intersectionThreshold,
        rootMargin: intersectionRootMargin,
      }
    )

    // Observe all cards
    cardRefs.current.forEach((element) => {
      observer.observe(element)
    })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [
    chapters,
    enableAutoActivation,
    isManualScrubbing,
    intersectionThreshold,
    intersectionRootMargin,
    setActiveYear,
    onChapterActivate,
  ])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (manualScrubbingTimeoutRef.current) {
        clearTimeout(manualScrubbingTimeoutRef.current)
      }
    }
  }, [])

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER HELPERS
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Check if a chapter is currently active
   */
  const isChapterActive = (chapter: StoryChapter): boolean => {
    if (activeYear === null) return false
    return activeYear >= chapter.startYear && activeYear <= chapter.endYear
  }

  /**
   * Set card ref for IntersectionObserver
   */
  const setCardRef = (id: string, element: HTMLElement | null) => {
    if (element) {
      cardRefs.current.set(id, element)
    } else {
      cardRefs.current.delete(id)
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Reset Control */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-white font-display tracking-tight">
            {cityName} Through Time
          </h3>
          <p className="text-sm text-white/70 mt-1.5">
            Explore chapters in {cityName}&apos;s story
          </p>
        </div>
        
        <button
          onClick={handleReset}
          className="
            flex-shrink-0
            px-5 py-2.5 rounded-full
            bg-white/5 border-2 border-white/20
            text-sm font-semibold text-white
            hover:bg-white/10 hover:border-white/30 hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-pine-400 focus:ring-offset-2 focus:ring-offset-charcoal-900
            active:scale-95
            transition-all duration-200
            min-h-[44px] min-w-[120px]
          "
          aria-label="Reset to start of story"
        >
          Reset to Start
        </button>
      </div>

      {/* Chapter Cards */}
      <div className="space-y-4" role="list">
        {chapters.map((chapter) => {
          const isActive = isChapterActive(chapter)
          
          return (
            <article
              key={chapter.id}
              ref={(el) => setCardRef(chapter.id, el)}
              data-chapter-id={chapter.id}
              onClick={() => handleCardClick(chapter)}
              onKeyDown={(e) => handleKeyDown(e, chapter)}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              aria-label={`${chapter.title}, ${chapter.startYear} to ${chapter.endYear}`}
              className={`
                group relative
                p-6 md:p-8 rounded-2xl
                border-2 transition-all duration-300 ease-out
                cursor-pointer
                
                ${isActive 
                  ? 'bg-pine-500/10 border-pine-500 shadow-glow-pine ring-2 ring-pine-500/30' 
                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-lg'
                }
                
                focus:outline-none focus:ring-2 focus:ring-pine-400 focus:ring-offset-2 focus:ring-offset-charcoal-900
                active:scale-[0.99]
              `}
            >
              {/* Active Indicator */}
              {isActive && (
                <div 
                  className="absolute left-0 top-6 bottom-6 w-1 bg-pine-500 rounded-r-full"
                  aria-hidden="true"
                />
              )}

              {/* Content */}
              <div className={`transition-all duration-300 ${isActive ? 'pl-4' : ''}`}>
                {/* Header: Title + Year Range */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h4 className={`
                    font-display font-bold text-2xl md:text-3xl leading-tight
                    transition-colors duration-200
                    ${isActive ? 'text-pine-300' : 'text-white group-hover:text-pine-200'}
                  `}>
                    {chapter.title}
                  </h4>
                  
                  <div className={`
                    flex-shrink-0 px-3 py-1.5 rounded-full
                    text-xs font-semibold tracking-wider uppercase
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-pine-500/25 text-pine-200 border-2 border-pine-400/40 shadow-lg' 
                      : 'bg-white/10 text-white/60 border border-white/20 group-hover:bg-white/15 group-hover:border-white/30'
                    }
                  `}>
                    {chapter.startYear}–{chapter.endYear}
                  </div>
                </div>

                {/* Takeaway (Bold) */}
                <p className={`
                  text-base md:text-lg font-bold mb-3 leading-snug
                  transition-colors duration-200
                  ${isActive ? 'text-white' : 'text-white/90 group-hover:text-white'}
                `}>
                  {chapter.takeaway}
                </p>

                {/* Detail Text */}
                <p className={`
                  text-sm md:text-base leading-relaxed mb-5
                  transition-colors duration-200
                  ${isActive ? 'text-white/70' : 'text-white/60 group-hover:text-white/70'}
                `}>
                  {chapter.detail}
                </p>

                {/* Metric Highlights (Chips) */}
                {chapter.metricHighlights.length > 0 && (
                  <div className="flex flex-wrap gap-2.5">
                    {chapter.metricHighlights.map((metric, index) => (
                      <div
                        key={index}
                        className={`
                          px-3.5 py-2 rounded-full
                          text-xs font-semibold
                          transition-all duration-200
                          ${isActive
                            ? 'bg-pine-500/20 text-pine-200 border-2 border-pine-400/40 shadow-md'
                            : 'bg-white/[0.08] text-white/70 border border-white/20 group-hover:bg-white/[0.12] group-hover:border-white/30 group-hover:text-white/80'
                          }
                        `}
                        title={metric.note}
                      >
                        <span className="font-bold">{metric.label}:</span>{' '}
                        <span className="font-medium">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active/Hover Indicator (Arrow) */}
              <div className={`
                absolute right-6 md:right-8 top-1/2 -translate-y-1/2
                transition-all duration-300 ease-out
                ${isActive 
                  ? 'opacity-100 translate-x-0 scale-110' 
                  : 'opacity-0 translate-x-3 scale-90 group-hover:opacity-40 group-hover:translate-x-0 group-hover:scale-100'
                }
              `}>
                <svg 
                  className={`w-7 h-7 transition-colors duration-200 ${isActive ? 'text-pine-300' : 'text-white'}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </article>
          )
        })}
      </div>

      {/* Screen Reader Status */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {activeYear && `Currently viewing year ${activeYear}`}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export default StoryChapters

