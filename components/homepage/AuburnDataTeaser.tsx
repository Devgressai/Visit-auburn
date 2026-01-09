'use client'

/**
 * Auburn Data Section - Homepage (Compact Mode)
 * 
 * A self-contained, single-viewport interactive data experience for the homepage.
 * Uses the same data and state management as CityDataStory but in a compact layout
 * optimized for embedding without scroll-driven storytelling.
 * 
 * Features:
 * - Interactive SVG population chart with hover/click
 * - Chapter navigation via tabs (not scroll)
 * - Stats panel with animated counters
 * - Comparison mode toggle (City/County/State)
 * - Fully keyboard accessible
 * - Respects prefers-reduced-motion
 */

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react'
import { 
  auburnDataStoryConfig,
  type CityThroughTimeRow,
  type StoryChapter,
} from '@/lib/data/cityThroughTime'
import { cn } from '@/lib/utils'

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

type CompareMode = 'city' | 'county' | 'state'

// ═══════════════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════════════

function useCountUp(end: number, duration: number = 1500, isActive: boolean = true): number {
  const [count, setCount] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isActive) {
      setCount(0)
      return
    }
    if (shouldReduceMotion) {
      setCount(end)
      return
    }

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isActive, shouldReduceMotion])

  return count
}

// ═══════════════════════════════════════════════════════════════════════════
// MINI CHART COMPONENT (Interactive SVG)
// ═══════════════════════════════════════════════════════════════════════════

interface MiniChartProps {
  data: CityThroughTimeRow[]
  activeYear: number
  hoveredYear: number | null
  compareMode: CompareMode
  onYearClick: (year: number) => void
  onYearHover: (year: number | null) => void
}

function MiniChart({ 
  data, 
  activeYear, 
  hoveredYear, 
  compareMode,
  onYearClick,
  onYearHover,
}: MiniChartProps) {
  const shouldReduceMotion = useReducedMotion()
  
  // Calculate scales
  const maxPop = useMemo(() => {
    if (compareMode === 'state') return Math.max(...data.map(d => d.state || 0))
    if (compareMode === 'county') return Math.max(...data.map(d => d.county || 0))
    return Math.max(...data.map(d => d.city))
  }, [data, compareMode])
  
  const chartHeight = 200
  const chartWidth = 100 // percentage
  const padding = { top: 20, bottom: 30, left: 0, right: 0 }

  const getY = (value: number) => {
    const ratio = value / maxPop
    return chartHeight - padding.bottom - (ratio * (chartHeight - padding.top - padding.bottom))
  }

  const getX = (index: number) => {
    return (index / (data.length - 1)) * 100
  }

  // Generate path for area chart
  const cityPath = useMemo(() => {
    const points = data.map((d, i) => `${getX(i)},${getY(d.city)}`)
    const baseline = `${getX(data.length - 1)},${chartHeight - padding.bottom} ${getX(0)},${chartHeight - padding.bottom}`
    return `M ${points.join(' L ')} L ${baseline} Z`
  }, [data, maxPop])

  const cityLinePath = useMemo(() => {
    const points = data.map((d, i) => `${getX(i)},${getY(d.city)}`)
    return `M ${points.join(' L ')}`
  }, [data, maxPop])

  return (
    <div className="relative w-full" style={{ height: chartHeight }}>
      <svg 
        viewBox={`0 0 100 ${chartHeight}`} 
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Auburn population chart from 1900 to 2020"
      >
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            y1={getY(maxPop * ratio)}
            x2="100"
            y2={getY(maxPop * ratio)}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Area fill */}
        <motion.path
          d={cityPath}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
        />

        {/* Line */}
        <motion.path
          d={cityLinePath}
          fill="none"
          stroke="#D4A017"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
        />

        {/* Data points */}
        {data.map((row, i) => {
          const x = getX(i)
          const y = getY(row.city)
          const isActive = row.year === activeYear
          const isHovered = row.year === hoveredYear

          return (
            <g key={row.year}>
              {/* Clickable area */}
              <rect
                x={x - 4}
                y={0}
                width={8}
                height={chartHeight}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onYearClick(row.year)}
                onMouseEnter={() => onYearHover(row.year)}
                onMouseLeave={() => onYearHover(null)}
                onFocus={() => onYearHover(row.year)}
                onBlur={() => onYearHover(null)}
                tabIndex={0}
                role="button"
                aria-label={`Year ${row.year}: ${row.city.toLocaleString()} residents`}
              />

              {/* Active/hover indicator line */}
              {(isActive || isHovered) && (
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={chartHeight - padding.bottom}
                  stroke={isActive ? "#D4A017" : "rgba(255,255,255,0.3)"}
                  strokeWidth="0.3"
                  strokeDasharray={isActive ? "0" : "1,1"}
                  vectorEffect="non-scaling-stroke"
                />
              )}

              {/* Data point */}
              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 1.5 : isHovered ? 1.2 : 0.8}
                fill={isActive ? "#D4A017" : isHovered ? "#fff" : "rgba(255,255,255,0.6)"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: shouldReduceMotion ? 0 : i * 0.05, 
                  duration: shouldReduceMotion ? 0 : 0.3 
                }}
              />

              {/* Year label (every 20 years) */}
              {row.year % 20 === 0 && (
                <text
                  x={x}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  className="text-[3px] fill-white/50 font-medium"
                  style={{ fontSize: '3px' }}
                >
                  {row.year}
                </text>
              )}
            </g>
          )
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredYear && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ 
              left: `${getX(data.findIndex(d => d.year === hoveredYear))}%` 
            }}
          >
            <div className="bg-charcoal-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap border border-white/10">
              <span className="font-bold text-gold-400">{hoveredYear}</span>
              <span className="mx-1">·</span>
              <span>{data.find(d => d.year === hoveredYear)?.city.toLocaleString()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CHAPTER TABS (Compact navigation)
// ═══════════════════════════════════════════════════════════════════════════

interface ChapterTabsProps {
  chapters: StoryChapter[]
  activeIndex: number
  onSelect: (index: number) => void
}

function ChapterTabs({ chapters, activeIndex, onSelect }: ChapterTabsProps) {
  const shouldReduceMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll active tab into view
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const activeTab = container.children[activeIndex] as HTMLElement
    if (activeTab) {
      activeTab.scrollIntoView({ 
        behavior: shouldReduceMotion ? 'auto' : 'smooth', 
        inline: 'center', 
        block: 'nearest' 
      })
    }
  }, [activeIndex, shouldReduceMotion])

  return (
    <div 
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
      role="tablist"
      aria-label="Historical chapters"
    >
      {chapters.map((chapter, index) => (
        <button
          key={chapter.id}
          onClick={() => onSelect(index)}
          role="tab"
          aria-selected={activeIndex === index}
          aria-controls={`chapter-panel-${index}`}
          className={cn(
            "flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap snap-start",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-charcoal-900",
            activeIndex === index
              ? "bg-gold-500 text-charcoal-900 shadow-lg"
              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white",
            shouldReduceMotion && "transition-none"
          )}
        >
          <span className="text-xs opacity-70 mr-2">{chapter.startYear}–{chapter.endYear}</span>
          <span>{chapter.title}</span>
        </button>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// STATS PANEL (Compact)
// ═══════════════════════════════════════════════════════════════════════════

interface StatsPanelProps {
  data: CityThroughTimeRow[]
  activeYear: number
  compareMode: CompareMode
}

function StatsPanel({ data, activeYear, compareMode }: StatsPanelProps) {
  const activeRow = useMemo(() => 
    data.find(d => d.year === activeYear) || data[data.length - 1],
    [data, activeYear]
  )
  
  const previousRow = useMemo(() => {
    const currentIndex = data.findIndex(d => d.year === activeYear)
    return currentIndex > 0 ? data[currentIndex - 1] : null
  }, [data, activeYear])

  const population = useCountUp(activeRow?.city || 0, 800, true)
  
  const growth = useMemo(() => {
    if (!previousRow || !activeRow) return null
    return ((activeRow.city - previousRow.city) / previousRow.city * 100)
  }, [activeRow, previousRow])

  const isPositiveGrowth = growth !== null && growth >= 0

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Population */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
          <Users className="w-3.5 h-3.5" />
          <span>Population</span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white font-display tabular-nums">
          {population.toLocaleString()}
        </div>
        <div className="text-xs text-white/40 mt-1">
          {activeRow?.year}
        </div>
      </div>
      
      {/* Growth */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
          {isPositiveGrowth ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>Period Growth</span>
        </div>
        <div className={cn(
          "text-2xl md:text-3xl font-bold font-display tabular-nums",
          growth === null ? "text-white/40" : isPositiveGrowth ? "text-pine-400" : "text-red-400"
        )}>
          {growth !== null ? (
            <>
              {isPositiveGrowth ? '+' : ''}{growth.toFixed(0)}%
            </>
          ) : (
            '—'
          )}
        </div>
        <div className="text-xs text-white/40 mt-1">
          {previousRow ? `Since ${previousRow.year}` : 'Baseline year'}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CHAPTER CONTENT PANEL
// ═══════════════════════════════════════════════════════════════════════════

interface ChapterPanelProps {
  chapter: StoryChapter
  index: number
}

function ChapterPanel({ chapter, index }: ChapterPanelProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      id={`chapter-panel-${index}`}
      role="tabpanel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
      className="space-y-4"
    >
      {/* Takeaway */}
      <div className="flex items-start gap-3 p-4 bg-pine-500/20 border border-pine-500/30 rounded-xl">
        <Info className="w-5 h-5 text-pine-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white font-medium leading-relaxed">
          {chapter.takeaway}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {chapter.metricHighlights.slice(0, 2).map((metric, i) => (
          <div 
            key={i}
            className="p-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="text-xl font-bold text-gold-400 mb-0.5">
              {metric.value}
            </div>
            <div className="text-xs font-medium text-white/80">
              {metric.label}
            </div>
            {metric.note && (
              <div className="text-xs text-white/50 mt-0.5">
                {metric.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function AuburnDataTeaser() {
  const { data, chapters, cityName } = auburnDataStoryConfig
  
  // State
  const [activeChapterIndex, setActiveChapterIndex] = useState(chapters.length - 1)
  const [activeYear, setActiveYear] = useState(chapters[chapters.length - 1].endYear)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const [compareMode, setCompareMode] = useState<CompareMode>('city')
  
  const shouldReduceMotion = useReducedMotion()
  const activeChapter = chapters[activeChapterIndex]

  // When chapter changes, update active year
  const handleChapterSelect = useCallback((index: number) => {
    setActiveChapterIndex(index)
    setActiveYear(chapters[index].endYear)
  }, [chapters])

  // Navigation
  const goToPrevious = () => {
    if (activeChapterIndex > 0) {
      handleChapterSelect(activeChapterIndex - 1)
    }
  }

  const goToNext = () => {
    if (activeChapterIndex < chapters.length - 1) {
      handleChapterSelect(activeChapterIndex + 1)
    }
  }

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    }
  }, [activeChapterIndex, chapters.length])

  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      aria-labelledby="data-story-heading"
      onKeyDown={handleKeyDown}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-pine-900" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pine-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-500/20 border border-gold-500/30">
              <BarChart3 className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h2 
                id="data-story-heading"
                className="text-2xl md:text-3xl font-display font-bold text-white"
              >
                {cityName} Through Time
              </h2>
              <p className="text-sm text-white/60 mt-0.5">
                Interactive population data • 1900–2020
              </p>
            </div>
          </div>
          
          <Link
            href="/discover/auburn-data"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg",
              "bg-gold-500 text-charcoal-900 font-semibold text-sm",
              "hover:bg-gold-400 hover:scale-105",
              "focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-charcoal-900",
              "transition-all duration-200",
              "group"
            )}
          >
            <span>Full Data Story</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-charcoal-800/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-5 gap-0">
            
            {/* LEFT: Chart & Stats (3 cols) */}
            <div className="lg:col-span-3 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Chart */}
              <div className="mb-6">
                <MiniChart
                  data={data}
                  activeYear={activeYear}
                  hoveredYear={hoveredYear}
                  compareMode={compareMode}
                  onYearClick={setActiveYear}
                  onYearHover={setHoveredYear}
                />
              </div>

              {/* Stats */}
              <StatsPanel 
                data={data}
                activeYear={activeYear}
                compareMode={compareMode}
              />
            </div>

            {/* RIGHT: Chapters (2 cols) */}
            <div className="lg:col-span-2 p-6 md:p-8 flex flex-col">
              {/* Chapter navigation header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span className="text-sm font-medium text-white/70">
                    Chapter {activeChapterIndex + 1} of {chapters.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={goToPrevious}
                    disabled={activeChapterIndex === 0}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-gold-400",
                      activeChapterIndex === 0
                        ? "text-white/20 cursor-not-allowed"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    )}
                    aria-label="Previous chapter"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={activeChapterIndex === chapters.length - 1}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-gold-400",
                      activeChapterIndex === chapters.length - 1
                        ? "text-white/20 cursor-not-allowed"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    )}
                    aria-label="Next chapter"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chapter tabs (scrollable) */}
              <div className="mb-5">
                <ChapterTabs
                  chapters={chapters}
                  activeIndex={activeChapterIndex}
                  onSelect={handleChapterSelect}
                />
              </div>

              {/* Chapter title */}
              <div className="mb-4">
                <div className="text-xs font-medium text-gold-400/80 mb-1">
                  {activeChapter.startYear}–{activeChapter.endYear}
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                  {activeChapter.title}
                </h3>
              </div>

              {/* Chapter content */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <ChapterPanel 
                    key={activeChapter.id}
                    chapter={activeChapter} 
                    index={activeChapterIndex}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Source attribution */}
        <p className="text-center text-xs text-white/40 mt-6">
          Data sources: U.S. Census Bureau, California Department of Finance
        </p>
      </div>
    </section>
  )
}
