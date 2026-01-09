/**
 * City Data Story - Main Scrollytelling Component
 * 
 * A scrollytelling visualization section with sticky charts and narrative chapters.
 * Implements intersection-based scroll activation with accessibility features.
 * 
 * Features:
 * - Desktop: Two-column layout (scrollable chapters + sticky visualization)
 * - Mobile: Stacked layout (visualization first, then accordion chapters)
 * - Intersection Observer for chapter activation
 * - Keyboard navigation (Tab, Enter, Space, Arrow keys)
 * - Respects prefers-reduced-motion
 * - WCAG 2.1 AA compliant
 */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Users, 
  Calendar,
  MapPin,
  Info,
} from 'lucide-react'
import { StoryStoreProvider, useStoryStore, type CompareMode } from './storyStore'
import { PopulationChart } from './PopulationChart'
import { StatsPanel } from './StatsPanel'
import { 
  auburnThroughTimeData, 
  auburnStoryChapters,
  auburnConfig,
  type StoryChapter,
} from '@/lib/data/cityThroughTime'
import { cn } from '@/lib/utils'

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT (with Provider)
// ═══════════════════════════════════════════════════════════════════════════

interface CityDataStoryProps {
  /** Optional: override default data */
  data?: typeof auburnThroughTimeData
  /** Optional: override default chapters */
  chapters?: typeof auburnStoryChapters
  /** Optional: city configuration */
  config?: typeof auburnConfig
  /** Optional: initial chapter to show */
  initialChapterIndex?: number
}

export function CityDataStory({
  data = auburnThroughTimeData,
  chapters = auburnStoryChapters,
  config = auburnConfig,
  initialChapterIndex = 0,
}: CityDataStoryProps) {
  const initialChapter = chapters[initialChapterIndex]
  const initialYear = initialChapter?.endYear || data[data.length - 1]?.year || null

  return (
    <StoryStoreProvider initialYear={initialYear} initialCompareMode="city">
      <CityDataStoryContent 
        data={data} 
        chapters={chapters} 
        config={config}
        initialChapterIndex={initialChapterIndex}
      />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN CONTENT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function CityDataStoryContent({
  data,
  chapters,
  config,
  initialChapterIndex,
}: Required<CityDataStoryProps>) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(initialChapterIndex)
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([initialChapterIndex]))
  const shouldReduceMotion = useReducedMotion()
  
  const chapterRefs = useRef<(HTMLElement | null)[]>([])
  const { setActiveYear } = useStoryStore()

  // ─────────────────────────────────────────────────────────────────────────
  // INTERSECTION OBSERVER - Detect active chapter
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    chapterRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveChapterIndex(index)
              setActiveYear(chapters[index].endYear)
              
              // Auto-expand on mobile
              if (window.innerWidth < 768) {
                setExpandedChapters(prev => new Set(prev).add(index))
              }
            }
          })
        },
        {
          threshold: [0.5],
          rootMargin: '-20% 0px -20% 0px',
        }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [chapters, setActiveYear])

  // ─────────────────────────────────────────────────────────────────────────
  // KEYBOARD NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────

  const handleChapterKeyDown = useCallback((
    e: React.KeyboardEvent,
    index: number
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveChapterIndex(index)
      setActiveYear(chapters[index].endYear)
      chapterRefs.current[index]?.scrollIntoView({ 
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'center',
      })
    } else if (e.key === 'ArrowDown' && index < chapters.length - 1) {
      e.preventDefault()
      chapterRefs.current[index + 1]?.focus()
    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault()
      chapterRefs.current[index - 1]?.focus()
    }
  }, [chapters, setActiveYear, shouldReduceMotion])

  // ─────────────────────────────────────────────────────────────────────────
  // MOBILE ACCORDION TOGGLE
  // ─────────────────────────────────────────────────────────────────────────

  const toggleChapter = (index: number) => {
    setExpandedChapters(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section 
      className="py-12 md:py-20 lg:py-28 bg-gradient-cream"
      aria-labelledby="data-story-title"
    >
      <div className="container">
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* HEADER */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <header className="text-center mb-12 md:mb-16">
          <p className="section-eyebrow-light">
            Data-Driven Storytelling
          </p>
          <h1 
            id="data-story-title" 
            className="section-title-light mb-6"
          >
            {config.name} Through Time
          </h1>
          <p className="text-lg md:text-xl text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            Explore {config.name}&apos;s journey from {config.established} to today through 
            interactive data visualizations and historical narratives.
          </p>
        </header>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* CONTROLS */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="mb-8 md:mb-12">
          <ComparisonControls />
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* MOBILE LAYOUT: Visualization first, then accordion chapters */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="md:hidden">
          {/* Sticky Visualization on Mobile */}
          <div className="sticky top-16 z-10 mb-8 bg-white rounded-2xl shadow-card p-6">
            <VisualizationPanel data={data} chapters={chapters} />
          </div>

          {/* Accordion Chapters */}
          <nav aria-label="Story chapters">
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <article
                  key={chapter.id}
                  ref={el => { chapterRefs.current[index] = el }}
                  className={cn(
                    'bg-white rounded-xl shadow-card overflow-hidden transition-all',
                    activeChapterIndex === index && 'ring-2 ring-gold-500'
                  )}
                >
                  <button
                    onClick={() => toggleChapter(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                    aria-expanded={expandedChapters.has(index)}
                    aria-controls={`chapter-${index}-content`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-medium text-gold-600">
                          {chapter.startYear}–{chapter.endYear}
                        </span>
                        {activeChapterIndex === index && (
                          <span className="px-2 py-0.5 bg-gold-100 text-gold-700 text-xs font-medium rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold text-charcoal-900">
                        {chapter.title}
                      </h3>
                    </div>
                    {expandedChapters.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-charcoal-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-charcoal-400" />
                    )}
                  </button>

                  {expandedChapters.has(index) && (
                    <div 
                      id={`chapter-${index}-content`}
                      className="px-6 pb-6 border-t border-charcoal-100"
                    >
                      <ChapterContent chapter={chapter} />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </nav>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* DESKTOP LAYOUT: Two columns (chapters + sticky viz) */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* LEFT: Scrollable Chapter Cards */}
          <nav aria-label="Story chapters">
            <div className="space-y-8">
              {chapters.map((chapter, index) => (
                <article
                  key={chapter.id}
                  ref={el => { chapterRefs.current[index] = el }}
                  tabIndex={0}
                  role="button"
                  onClick={() => {
                    setActiveChapterIndex(index)
                    setActiveYear(chapter.endYear)
                  }}
                  onKeyDown={(e) => handleChapterKeyDown(e, index)}
                  className={cn(
                    'bg-white rounded-2xl shadow-card p-8 transition-all duration-300 cursor-pointer',
                    'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2',
                    'hover:shadow-card-hover hover:-translate-y-1',
                    activeChapterIndex === index 
                      ? 'ring-2 ring-gold-500 shadow-glow' 
                      : 'opacity-75 hover:opacity-100'
                  )}
                  aria-current={activeChapterIndex === index ? 'true' : undefined}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gold-100 text-gold-700 text-sm font-semibold rounded-full">
                      {chapter.startYear}–{chapter.endYear}
                    </span>
                    {activeChapterIndex === index && (
                      <span className="px-3 py-1 bg-pine-500 text-white text-sm font-semibold rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-charcoal-900 mb-4">
                    {chapter.title}
                  </h3>

                  <ChapterContent chapter={chapter} />
                </article>
              ))}
            </div>
          </nav>

          {/* RIGHT: Sticky Visualization Panel */}
          <div className="sticky top-24 self-start">
            <div className="bg-white rounded-2xl shadow-card p-8">
              <VisualizationPanel data={data} chapters={chapters} />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* YEAR SCRUBBER (Optional - Desktop only) */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:block mt-12">
          <YearScrubber data={data} />
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CHAPTER CONTENT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function ChapterContent({ chapter }: { chapter: StoryChapter }) {
  return (
    <>
      {/* Takeaway */}
      <div className="mb-6 p-4 bg-pine-50 border-l-4 border-pine-500 rounded-r-lg">
        <p className="text-pine-900 font-semibold">
          <Info className="w-4 h-4 inline mr-2" />
          {chapter.takeaway}
        </p>
      </div>

      {/* Detail */}
      <p className="text-charcoal-700 leading-relaxed mb-6">
        {chapter.detail}
      </p>

      {/* Metric Highlights */}
      <div className="grid grid-cols-2 gap-4">
        {chapter.metricHighlights.map((metric, i) => (
          <div 
            key={i}
            className="p-4 bg-gradient-to-br from-gold-50 to-cream-100 rounded-lg border border-gold-200"
          >
            <div className="text-2xl font-black text-gold-600 mb-1">
              {metric.value}
            </div>
            <div className="text-sm font-semibold text-charcoal-800 mb-1">
              {metric.label}
            </div>
            {metric.note && (
              <div className="text-xs text-charcoal-600">
                {metric.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// VISUALIZATION PANEL (Placeholder for charts)
// ═══════════════════════════════════════════════════════════════════════════

function VisualizationPanel({ 
  data, 
  chapters 
}: { 
  data: typeof auburnThroughTimeData
  chapters: typeof auburnStoryChapters
}) {
  const { 
    activeYear, 
    compareMode, 
    getActiveRow, 
    formatPopulation,
    getYearRange,
  } = useStoryStore()
  
  const activeRow = getActiveRow(data)
  const yearRange = getYearRange(data)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-charcoal-900 mb-2">
          Population Over Time
        </h2>
        <p className="text-sm text-charcoal-600">
          {yearRange && `${yearRange.min}–${yearRange.max}`}
        </p>
      </div>

      {/* Population Chart */}
      <div className="mb-6">
        <PopulationChart 
          data={data} 
          height={300}
          showLegend={false}
          showGrid={true}
          showAxes={true}
        />
      </div>

      {/* Stats Panel */}
      <StatsPanel 
        data={data}
        showSources={true}
        showMilestone={true}
        showGrowth={true}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PLACEHOLDER CHART (To be replaced with Recharts)
// ═══════════════════════════════════════════════════════════════════════════

function PlaceholderChart({ 
  data, 
  compareMode 
}: { 
  data: typeof auburnThroughTimeData
  compareMode: CompareMode
}) {
  const { activeYear, hoveredYear, setHoveredYear } = useStoryStore()
  const maxPopulation = Math.max(...data.map(d => d.city))

  return (
    <div className="relative h-64" role="img" aria-label="Population chart">
      <svg width="100%" height="100%" className="overflow-visible">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1="0"
            y1={`${ratio * 100}%`}
            x2="100%"
            y2={`${ratio * 100}%`}
            stroke="#E5E5E5"
            strokeWidth="1"
          />
        ))}

        {/* Data points */}
        {data.map((row, i) => {
          const x = (i / (data.length - 1)) * 100
          const y = 100 - (row.city / maxPopulation) * 80
          const isActive = row.year === activeYear
          const isHovered = row.year === hoveredYear

          return (
            <g key={row.year}>
              {/* Line segment */}
              {i < data.length - 1 && (
                <line
                  x1={`${x}%`}
                  y1={`${y}%`}
                  x2={`${((i + 1) / (data.length - 1)) * 100}%`}
                  y2={`${100 - (data[i + 1].city / maxPopulation) * 80}%`}
                  stroke="#2D5A27"
                  strokeWidth="2"
                  className="transition-all"
                />
              )}

              {/* Data point */}
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r={isActive ? 8 : isHovered ? 6 : 4}
                fill={isActive ? '#D4A017' : '#2D5A27'}
                className="transition-all cursor-pointer"
                onMouseEnter={() => setHoveredYear(row.year)}
                onMouseLeave={() => setHoveredYear(null)}
              >
                <title>{`${row.year}: ${row.city.toLocaleString()}`}</title>
              </circle>

              {/* Year label (every other point) */}
              {i % 2 === 0 && (
                <text
                  x={`${x}%`}
                  y="100%"
                  textAnchor="middle"
                  className="text-xs fill-charcoal-600"
                >
                  {row.year}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="absolute top-2 right-2 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-forest-500" />
          <span className="text-charcoal-600">City</span>
        </div>
        {compareMode !== 'city' && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-lake-400" />
            <span className="text-charcoal-600">County</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPARISON CONTROLS
// ═══════════════════════════════════════════════════════════════════════════

function ComparisonControls() {
  const { compareMode, setCompareMode } = useStoryStore()

  const modes: Array<{ value: CompareMode; label: string; icon: typeof TrendingUp }> = [
    { value: 'city', label: 'City Only', icon: MapPin },
    { value: 'county', label: '+ County', icon: TrendingUp },
    { value: 'state', label: '+ State', icon: Users },
  ]

  return (
    <div 
      role="group" 
      aria-label="Comparison mode"
      className="flex justify-center"
    >
      <div className="inline-flex bg-white rounded-full shadow-md p-1 border border-charcoal-200">
        {modes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setCompareMode(value)}
            className={cn(
              'px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all',
              'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2',
              'flex items-center gap-2',
              compareMode === value
                ? 'bg-gradient-gold text-white shadow-md'
                : 'text-charcoal-700 hover:bg-charcoal-50'
            )}
            aria-pressed={compareMode === value}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{value === 'city' ? 'City' : value === 'county' ? 'County' : 'State'}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// YEAR SCRUBBER (Optional decade buttons)
// ═══════════════════════════════════════════════════════════════════════════

function YearScrubber({ data }: { data: typeof auburnThroughTimeData }) {
  const { activeYear, setActiveYear } = useStoryStore()
  
  // Get decade markers
  const decades = data.filter(d => d.year % 10 === 0)

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <h3 className="font-display text-lg font-bold text-charcoal-900 mb-4 text-center">
        Jump to Decade
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {decades.map(row => (
          <button
            key={row.year}
            onClick={() => setActiveYear(row.year)}
            className={cn(
              'px-4 py-2 rounded-lg font-semibold text-sm transition-all',
              'focus:outline-none focus:ring-2 focus:ring-gold-500',
              activeYear === row.year
                ? 'bg-gold-500 text-white shadow-md'
                : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
            )}
            aria-pressed={activeYear === row.year}
          >
            {row.year}
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  VisualizationPanel,
  ChapterContent,
  ComparisonControls,
  YearScrubber,
  PlaceholderChart,
}

