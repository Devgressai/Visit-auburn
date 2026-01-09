'use client'

/**
 * Auburn Data Section - Homepage (Expert Level)
 * 
 * A visually striking, interactive data experience using the
 * Sierra Gold Country color palette. Sharp design with proper
 * contrast, engaging microinteractions, and expert-level polish.
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

  // Generate smooth curve path
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
          {/* Gold gradient for area fill */}
          <linearGradient id="goldAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D4A017" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
          </linearGradient>
          
          {/* Glow filter for active point */}
          <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal grid lines with labels */}
        {[0.25, 0.5, 0.75, 1].map((ratio) => (
          <g key={ratio}>
            <line
              x1="0"
              y1={getY(maxPop * ratio)}
              x2="100"
              y2={getY(maxPop * ratio)}
              stroke="#D4A017"
              strokeOpacity="0.15"
              strokeWidth="0.2"
              strokeDasharray="1,2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}

        {/* Animated area fill */}
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
          strokeWidth="0.6"
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
              {/* Hover zone */}
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

              {/* Vertical indicator on hover/active */}
              {(isActive || isHovered) && (
                <line
                  x1={x}
                  y1={padding.top - 10}
                  x2={x}
                  y2={chartHeight - padding.bottom}
                  stroke={isActive ? "#D4A017" : "#B8860B"}
                  strokeWidth="0.3"
                  strokeOpacity={isActive ? 0.8 : 0.4}
                  vectorEffect="non-scaling-stroke"
                />
              )}

              {/* Data point */}
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

              {/* Year labels */}
              {row.year % 20 === 0 && (
                <text
                  x={x}
                  y={chartHeight - 15}
                  textAnchor="middle"
                  className="fill-charcoal-400 font-sans"
                  style={{ fontSize: '3.5px', fontWeight: 500 }}
                >
                  {row.year}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Floating tooltip */}
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
            <div className="bg-charcoal-800 border border-gold-500/30 text-white px-3 py-1.5 rounded-lg shadow-lg shadow-gold-500/10">
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

interface StatsPanelProps {
  data: CityThroughTimeRow[]
  activeYear: number
}

function StatsPanel({ data, activeYear }: StatsPanelProps) {
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
      {/* Population stat */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-gold-600/10 rounded-xl blur-sm group-hover:blur-md transition-all" />
        <div className="relative bg-charcoal-800/80 backdrop-blur-sm rounded-xl p-5 border border-gold-500/20 group-hover:border-gold-500/40 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-medium text-gold-400/80 uppercase tracking-wider">Population</span>
          </div>
          <div className="text-3xl md:text-4xl font-display font-bold text-white tabular-nums">
            {population.toLocaleString()}
          </div>
          <div className="text-xs text-charcoal-400 mt-1 font-medium">
            Year {activeRow?.year}
          </div>
        </div>
      </div>
      
      {/* Growth stat */}
      <div className="relative group">
        <div className={cn(
          "absolute inset-0 rounded-xl blur-sm group-hover:blur-md transition-all",
          isPositive ? "bg-gradient-to-br from-forest-500/20 to-forest-600/10" : "bg-gradient-to-br from-rust-500/20 to-rust-600/10"
        )} />
        <div className={cn(
          "relative bg-charcoal-800/80 backdrop-blur-sm rounded-xl p-5 border transition-colors",
          isPositive ? "border-forest-500/20 group-hover:border-forest-500/40" : "border-rust-500/20 group-hover:border-rust-500/40"
        )}>
          <div className="flex items-center gap-2 mb-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-forest-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rust-400" />
            )}
            <span className={cn(
              "text-xs font-medium uppercase tracking-wider",
              isPositive ? "text-forest-400/80" : "text-rust-400/80"
            )}>Growth</span>
          </div>
          <div className={cn(
            "text-3xl md:text-4xl font-display font-bold tabular-nums",
            growth === null ? "text-charcoal-500" : isPositive ? "text-forest-400" : "text-rust-400"
          )}>
            {growth !== null ? `${isPositive ? '+' : ''}${growth.toFixed(0)}%` : '—'}
          </div>
          <div className="text-xs text-charcoal-400 mt-1 font-medium">
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

interface ChapterSelectorProps {
  chapters: StoryChapter[]
  activeIndex: number
  onSelect: (index: number) => void
}

function ChapterSelector({ chapters, activeIndex, onSelect }: ChapterSelectorProps) {
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
            "focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-charcoal-900",
            activeIndex === index
              ? "bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-900 shadow-lg shadow-gold-500/25"
              : "bg-charcoal-700/50 text-charcoal-300 hover:bg-charcoal-700 hover:text-white border border-charcoal-600/50"
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
      {/* Takeaway callout */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-500/20 to-transparent rounded-xl" />
        <div className="relative flex items-start gap-3 p-4 border border-forest-500/30 rounded-xl bg-charcoal-800/50">
          <Sparkles className="w-5 h-5 text-forest-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/90 font-medium leading-relaxed">
            {chapter.takeaway}
          </p>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3">
        {chapter.metricHighlights.slice(0, 2).map((metric, i) => (
          <div 
            key={i}
            className="p-4 rounded-xl bg-charcoal-700/50 border border-charcoal-600/50 hover:border-gold-500/30 transition-colors"
          >
            <div className="text-2xl font-display font-bold text-gold-400 mb-1">
              {metric.value}
            </div>
            <div className="text-xs font-semibold text-white/80 uppercase tracking-wide">
              {metric.label}
            </div>
            {metric.note && (
              <div className="text-xs text-charcoal-400 mt-1">
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
      className="relative py-20 md:py-28 overflow-hidden"
      aria-labelledby="data-story-heading"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-charcoal-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-forest-900/30" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg, #D4A017 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Glowing orbs */}
        <motion.div 
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-forest-500/10 rounded-full blur-3xl"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 shadow-lg shadow-gold-500/25">
              <Mountain className="w-7 h-7 text-charcoal-900" />
            </div>
            <div>
              <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-2">
                Gold Country Data
              </p>
              <h2 
                id="data-story-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white"
              >
                {cityName} Through Time
              </h2>
              <p className="text-charcoal-400 mt-2 max-w-lg">
                Interactive population data from 1900–2020. Click any point to explore.
              </p>
            </div>
          </div>
          
          <Link
            href="/discover/auburn-data"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-xl",
              "bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-900 font-bold",
              "hover:from-gold-400 hover:to-gold-500 hover:scale-105 hover:shadow-lg hover:shadow-gold-500/25",
              "focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-charcoal-900",
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
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 via-transparent to-forest-500/20 rounded-3xl blur-xl opacity-50" />
          
          <div className="relative bg-charcoal-800/90 backdrop-blur-xl rounded-2xl border border-charcoal-700/50 overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-charcoal-700/50">
              
              {/* LEFT: Chart & Stats */}
              <div className="lg:col-span-3 p-6 md:p-8">
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
              <div className="lg:col-span-2 p-6 md:p-8 bg-charcoal-800/50">
                {/* Chapter nav header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-500" />
                    <span className="text-sm font-semibold text-charcoal-300">
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
                          ? "text-charcoal-600 cursor-not-allowed"
                          : "text-charcoal-400 hover:text-white hover:bg-charcoal-700"
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
                          ? "text-charcoal-600 cursor-not-allowed"
                          : "text-charcoal-400 hover:text-white hover:bg-charcoal-700"
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
                  <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-1">
                    {activeChapter.startYear}–{activeChapter.endYear}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
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
