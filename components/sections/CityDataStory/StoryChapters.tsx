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
import type { StoryChapter } from '@/lib/data/cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

interface StoryChaptersProps {
  /** Array of story chapters to display */
  chapters: StoryChapter[]
  
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
  chapters,
  enableAutoActivation = true,
  intersectionThreshold = 0.5,
  intersectionRootMargin = '-20% 0px -20% 0px',
  onChapterActivate,
  className = '',
}: StoryChaptersProps) {
  const { activeYear, setActiveYear, reset } = useStoryStore()
  
  // Track if user is manually scrubbing (disables auto-activation temporarily)
  const [isManualScrubbing, setIsManualScrubbing] = useState(false)
  const manualScrubbingTimeoutRef = useRef<NodeJS.Timeout>()
  
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
        if (mostVisibleEntry) {
          const chapterId = mostVisibleEntry.target.getAttribute('data-chapter-id')
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white font-display">
            Auburn Through Time
          </h3>
          <p className="text-sm text-text-muted mt-1">
            Explore chapters in our city&apos;s story
          </p>
        </div>
        
        <button
          onClick={handleReset}
          className="
            px-4 py-2 rounded-full
            bg-white/5 border border-white/20
            text-sm font-medium text-white
            hover:bg-white/10 hover:border-white/30
            focus:outline-none focus:ring-2 focus:ring-pine-500 focus:ring-offset-2 focus:ring-offset-charcoal-800
            transition-all duration-200
            min-h-[40px]
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
                p-6 rounded-2xl
                border-2 transition-all duration-300
                cursor-pointer
                
                ${isActive 
                  ? 'bg-pine-500/10 border-pine-500 shadow-glow-pine' 
                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                }
                
                focus:outline-none focus:ring-2 focus:ring-pine-400 focus:ring-offset-2 focus:ring-offset-charcoal-800
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
              <div className={`${isActive ? 'pl-4' : ''}`}>
                {/* Header: Title + Year Range */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className={`
                    font-display font-bold text-2xl
                    transition-colors duration-200
                    ${isActive ? 'text-pine-400' : 'text-white group-hover:text-pine-300'}
                  `}>
                    {chapter.title}
                  </h4>
                  
                  <div className={`
                    flex-shrink-0 px-3 py-1 rounded-full
                    text-xs font-medium tracking-wide
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-pine-500/20 text-pine-300 border border-pine-500/30' 
                      : 'bg-white/10 text-text-muted border border-white/10'
                    }
                  `}>
                    {chapter.startYear}–{chapter.endYear}
                  </div>
                </div>

                {/* Takeaway (Bold) */}
                <p className={`
                  text-base font-semibold mb-3
                  transition-colors duration-200
                  ${isActive ? 'text-white' : 'text-text-primary group-hover:text-white'}
                `}>
                  {chapter.takeaway}
                </p>

                {/* Detail Text */}
                <p className={`
                  text-sm leading-relaxed mb-4
                  transition-colors duration-200
                  ${isActive ? 'text-text-muted' : 'text-text-subtle group-hover:text-text-muted'}
                `}>
                  {chapter.detail}
                </p>

                {/* Metric Highlights (Chips) */}
                {chapter.metricHighlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {chapter.metricHighlights.map((metric, index) => (
                      <div
                        key={index}
                        className={`
                          px-3 py-1.5 rounded-full
                          text-xs font-medium
                          transition-all duration-200
                          ${isActive
                            ? 'bg-pine-500/15 text-pine-300 border border-pine-500/30'
                            : 'bg-white/5 text-text-muted border border-white/10 group-hover:bg-white/10 group-hover:border-white/20'
                          }
                        `}
                        title={metric.note}
                      >
                        <span className="font-semibold">{metric.label}:</span>{' '}
                        {metric.value}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover Indicator (Arrow) */}
              <div className={`
                absolute right-6 top-1/2 -translate-y-1/2
                transition-all duration-200
                ${isActive 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'
                }
              `}>
                <svg 
                  className="w-6 h-6 text-pine-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
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

