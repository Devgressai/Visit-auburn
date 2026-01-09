'use client'

/**
 * Auburn Data Section - Homepage
 * 
 * Matches the site's light, warm aesthetic with cream/white backgrounds
 * while maintaining sharp, engaging design with the Gold Country palette.
 */

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mountain,
} from 'lucide-react'
import { 
  auburnDataStoryConfig,
  type CityThroughTimeRow,
  type StoryChapter,
} from '@/lib/data/cityThroughTime'
import { cn } from '@/lib/utils'

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER HOOK
// ═══════════════════════════════════════════════════════════════════════════

function useCountUp(end: number, duration: number = 1200, isActive: boolean = true): number {
  const [count, setCount] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isActive) { setCount(0); return }
    if (shouldReduceMotion) { setCount(end); return }

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isActive, shouldReduceMotion])

  return count
}

// ═══════════════════════════════════════════════════════════════════════════
// INTERACTIVE CHART
// ═══════════════════════════════════════════════════════════════════════════

interface ChartProps {
  data: CityThroughTimeRow[]
  activeYear: number
  hoveredYear: number | null
  onYearClick: (year: number) => void
  onYearHover: (year: number | null) => void
}

function InteractiveChart({ data, activeYear, hoveredYear, onYearClick, onYearHover }: ChartProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const maxPop = useMemo(() => Math.max(...data.map(d => d.city)), [data])
  const chartHeight = 220
  const padding = { top: 30, bottom: 40 }
  
  const getY = (value: number) => {
    const ratio = value / maxPop
    return chartHeight - padding.bottom - (ratio * (chartHeight - padding.top - padding.bottom))
  }
  const getX = (index: number) => (index / (data.length - 1)) * 100

  const linePath = useMemo(() => {
    const points = data.map((d, i) => `${getX(i)},${getY(d.city)}`)
    return `M ${points.join(' L ')}`
  }, [data, maxPop])

  const areaPath = useMemo(() => {
    const points = data.map((d, i) => `${getX(i)},${getY(d.city)}`)
    return `M ${points.join(' L ')} L 100,${chartHeight - padding.bottom} L 0,${chartHeight - padding.bottom} Z`
  }, [data, maxPop])

  return (
    <div ref={ref} className="relative w-full" style={{ height: chartHeight }}>
      <svg 
        viewBox={`0 0 100 ${chartHeight}`} 
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Auburn population growth chart 1900-2020"
      >
        <defs>
          <linearGradient id="goldAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0.05" />
          </linearGradient>
          <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            y1={getY(maxPop * ratio)}
            x2="100"
            y2={getY(maxPop * ratio)}
            stroke="#D4A017"
            strokeOpacity="0.12"
            strokeWidth="0.2"
            strokeDasharray="1,2"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#goldAreaGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1, delay: 0.3 }}
        />

        {/* Main line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#D4A017"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.5, ease: "easeOut" }}
        />

        {/* Interactive points */}
        {data.map((row, i) => {
          const x = getX(i)
          const y = getY(row.city)
          const isActive = row.year === activeYear
          const isHovered = row.year === hoveredYear
          const hasMilestone = !!row.milestoneTitle

          return (
            <g key={row.year}>
              <rect
                x={x - 5}
                y={0}
                width={10}
                height={chartHeight}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onYearClick(row.year)}
                onMouseEnter={() => onYearHover(row.year)}
                onMouseLeave={() => onYearHover(null)}
                tabIndex={0}
                role="button"
                aria-label={`${row.year}: ${row.city.toLocaleString()} residents`}
              />

              {(isActive || isHovered) && (
                <line
                  x1={x}
                  y1={padding.top - 10}
                  x2={x}
                  y2={chartHeight - padding.bottom}
                  stroke={isActive ? "#D4A017" : "#B8860B"}
                  strokeWidth="0.3"
                  strokeOpacity={isActive ? 0.6 : 0.3}
                  vectorEffect="non-scaling-stroke"
                />
              )}

              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 2 : isHovered ? 1.5 : hasMilestone ? 1 : 0.6}
                fill={isActive ? "#D4A017" : hasMilestone ? "#B8860B" : "#D4A017"}
                filter={isActive ? "url(#goldGlow)" : undefined}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.5 + i * 0.04, duration: 0.3 }}
              />

              {row.year % 20 === 0 && (
                <text
                  x={x}
                  y={chartHeight - 15}
                  textAnchor="middle"
                  className="fill-charcoal-500 font-sans"
                  style={{ fontSize: '3.5px', fontWeight: 500 }}
                >
                  {row.year}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {(hoveredYear || activeYear) && (
          <motion.div
            key={hoveredYear || activeYear}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            className="absolute pointer-events-none z-10"
            style={{ 
              top: 8,
              left: `${getX(data.findIndex(d => d.year === (hoveredYear || activeYear)))}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="bg-charcoal-900 border-2 border-gold-500 text-white px-3 py-1.5 rounded-lg shadow-xl">
              <div className="text-gold-400 font-display font-bold text-sm">
                {hoveredYear || activeYear}
              </div>
              <div className="text-white text-xs font-medium">
                {data.find(d => d.year === (hoveredYear || activeYear))?.city.toLocaleString()} residents
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// STATS PANEL
// ═══════════════════════════════════════════════════════════════════════════

function StatsPanel({ data, activeYear }: { data: CityThroughTimeRow[], activeYear: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const activeRow = useMemo(() => data.find(d => d.year === activeYear) || data[data.length - 1], [data, activeYear])
  const previousRow = useMemo(() => {
    const idx = data.findIndex(d => d.year === activeYear)
    return idx > 0 ? data[idx - 1] : null
  }, [data, activeYear])

  const population = useCountUp(activeRow?.city || 0, 800, isInView)
  const growth = previousRow ? ((activeRow.city - previousRow.city) / previousRow.city * 100) : null
  const isPositive = growth !== null && growth >= 0

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4">
      {/* Population */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-100 to-gold-50 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-white rounded-xl p-5 border-2 border-gold-200 group-hover:border-gold-400 transition-colors shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-gold-600" />
            <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Population</span>
          </div>
          <div className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 tabular-nums">
            {population.toLocaleString()}
          </div>
          <div className="text-xs text-charcoal-500 mt-1 font-medium">
            Year {activeRow?.year}
          </div>
        </div>
      </div>
      
      {/* Growth */}
      <div className="relative group">
        <div className={cn(
          "absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity",
          isPositive ? "bg-gradient-to-br from-forest-100 to-forest-50" : "bg-gradient-to-br from-rust-100 to-rust-50"
        )} />
        <div className={cn(
          "relative bg-white rounded-xl p-5 border-2 transition-colors shadow-sm",
          isPositive ? "border-forest-200 group-hover:border-forest-400" : "border-rust-200 group-hover:border-rust-400"
        )}>
          <div className="flex items-center gap-2 mb-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-forest-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rust-600" />
            )}
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider",
              isPositive ? "text-forest-600" : "text-rust-600"
            )}>Growth</span>
          </div>
          <div className={cn(
            "text-3xl md:text-4xl font-display font-bold tabular-nums",
            growth === null ? "text-charcoal-400" : isPositive ? "text-forest-600" : "text-rust-600"
          )}>
            {growth !== null ? `${isPositive ? '+' : ''}${growth.toFixed(0)}%` : '—'}
          </div>
          <div className="text-xs text-charcoal-500 mt-1 font-medium">
            {previousRow ? `Since ${previousRow.year}` : 'Baseline'}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CHAPTER SELECTOR
// ═══════════════════════════════════════════════════════════════════════════

function ChapterSelector({ chapters, activeIndex, onSelect }: { chapters: StoryChapter[], activeIndex: number, onSelect: (i: number) => void }) {
  const shouldReduceMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const activeEl = container.children[activeIndex] as HTMLElement
    activeEl?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' })
  }, [activeIndex, shouldReduceMotion])

  return (
    <div 
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-1 px-1"
      role="tablist"
    >
      {chapters.map((chapter, index) => (
        <button
          key={chapter.id}
          onClick={() => onSelect(index)}
          role="tab"
          aria-selected={activeIndex === index}
          className={cn(
            "relative flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap snap-start",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
            activeIndex === index
              ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/20"
              : "bg-cream-100 text-charcoal-700 hover:bg-cream-200 border border-charcoal-200"
          )}
        >
          <span className="opacity-70 mr-1.5">{chapter.startYear}–</span>
          <span>{chapter.title}</span>
        </button>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CHAPTER PANEL
// ═══════════════════════════════════════════════════════════════════════════

function ChapterPanel({ chapter }: { chapter: StoryChapter }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
      className="space-y-4"
    >
      {/* Takeaway */}
      <div className="relative overflow-hidden rounded-xl border-2 border-forest-200 bg-gradient-to-br from-forest-50 to-white p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-charcoal-800 font-medium leading-relaxed">
            {chapter.takeaway}
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {chapter.metricHighlights.slice(0, 2).map((metric, i) => (
          <div 
            key={i}
            className="p-4 rounded-xl bg-gradient-to-br from-cream-100 to-white border-2 border-gold-200 hover:border-gold-400 transition-colors"
          >
            <div className="text-2xl font-display font-bold text-gold-600 mb-1">
              {metric.value}
            </div>
            <div className="text-xs font-bold text-charcoal-700 uppercase tracking-wide">
              {metric.label}
            </div>
            {metric.note && (
              <div className="text-xs text-charcoal-500 mt-1">
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
  
  const [activeChapterIndex, setActiveChapterIndex] = useState(chapters.length - 1)
  const [activeYear, setActiveYear] = useState(chapters[chapters.length - 1].endYear)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  
  const shouldReduceMotion = useReducedMotion()
  const activeChapter = chapters[activeChapterIndex]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleChapterSelect = useCallback((index: number) => {
    setActiveChapterIndex(index)
    setActiveYear(chapters[index].endYear)
  }, [chapters])

  const goToPrevious = () => activeChapterIndex > 0 && handleChapterSelect(activeChapterIndex - 1)
  const goToNext = () => activeChapterIndex < chapters.length - 1 && handleChapterSelect(activeChapterIndex + 1)

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-cream-50"
      aria-labelledby="data-story-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 shadow-lg shadow-gold-500/20">
              <Mountain className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-gold-600 text-sm font-bold uppercase tracking-widest mb-2">
                Gold Country Data
              </p>
              <h2 
                id="data-story-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900"
              >
                {cityName} Through Time
              </h2>
              <p className="text-charcoal-600 mt-2 max-w-lg">
                Interactive population data from 1900–2020. Click any point to explore.
              </p>
            </div>
          </div>
          
          <Link
            href="/discover/auburn-data"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-xl",
              "bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold",
              "hover:from-gold-600 hover:to-gold-700 hover:scale-105 hover:shadow-lg hover:shadow-gold-500/25",
              "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2",
              "transition-all duration-200",
              "group"
            )}
          >
            <span>Explore Full Story</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Main card */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl border-2 border-gold-200 overflow-hidden shadow-xl">
            <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gold-100">
              
              {/* LEFT: Chart & Stats */}
              <div className="lg:col-span-3 p-6 md:p-8 bg-gradient-to-br from-cream-50 to-white">
                <div className="mb-6">
                  <InteractiveChart
                    data={data}
                    activeYear={activeYear}
                    hoveredYear={hoveredYear}
                    onYearClick={setActiveYear}
                    onYearHover={setHoveredYear}
                  />
                </div>
                <StatsPanel data={data} activeYear={activeYear} />
              </div>

              {/* RIGHT: Chapters */}
              <div className="lg:col-span-2 p-6 md:p-8 bg-white">
                {/* Nav header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-600" />
                    <span className="text-sm font-bold text-charcoal-700">
                      Era {activeChapterIndex + 1} of {chapters.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={goToPrevious}
                      disabled={activeChapterIndex === 0}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-gold-500",
                        activeChapterIndex === 0
                          ? "text-charcoal-300 cursor-not-allowed"
                          : "text-charcoal-600 hover:text-charcoal-900 hover:bg-cream-100"
                      )}
                      aria-label="Previous era"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={activeChapterIndex === chapters.length - 1}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-gold-500",
                        activeChapterIndex === chapters.length - 1
                          ? "text-charcoal-300 cursor-not-allowed"
                          : "text-charcoal-600 hover:text-charcoal-900 hover:bg-cream-100"
                      )}
                      aria-label="Next era"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Chapter tabs */}
                <div className="mb-6">
                  <ChapterSelector
                    chapters={chapters}
                    activeIndex={activeChapterIndex}
                    onSelect={handleChapterSelect}
                  />
                </div>

                {/* Chapter title */}
                <div className="mb-5">
                  <div className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-1">
                    {activeChapter.startYear}–{activeChapter.endYear}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-charcoal-900">
                    {activeChapter.title}
                  </h3>
                </div>

                {/* Chapter content */}
                <AnimatePresence mode="wait">
                  <ChapterPanel key={activeChapter.id} chapter={activeChapter} />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Source attribution */}
        <motion.p 
          className="text-center text-xs text-charcoal-500 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          Data sources: U.S. Census Bureau • California Department of Finance
        </motion.p>
      </div>
    </section>
  )
}
