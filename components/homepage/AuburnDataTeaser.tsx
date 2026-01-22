'use client'

/**
 * Auburn Data Section - Homepage (Enhanced Interactive)
 * 
 * Rich interactive features with forest green accents matching homepage.
 * Includes milestone markers, decade jumps, timeline progress, and more.
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
  MapPin,
  Info,
  Zap,
  BarChart3,
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
// INTERACTIVE CHART WITH MILESTONES
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
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(containerRef, { once: true })
  
  // Responsive dimensions based on container
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 })
  
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      
      // Responsive sizing: Mobile (full width), Tablet (larger), Desktop (even larger)
      let width: number
      let height: number
      
      if (containerWidth < 640) {
        // Mobile: Full width, compact height
        width = containerWidth
        height = Math.max(280, containerWidth * 0.5)
      } else if (containerWidth < 1024) {
        // Tablet: Larger chart
        width = containerWidth
        height = Math.max(350, containerWidth * 0.45)
      } else {
        // Desktop: Maximum impact
        width = Math.min(containerWidth, 1200)
        height = Math.max(400, Math.min(containerWidth * 0.4, 500))
      }
      
      setDimensions({ width, height })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  
  // Responsive margins
  const margin = useMemo(() => {
    if (dimensions.width < 640) {
      return { top: 20, right: 15, bottom: 40, left: 45 }
    } else if (dimensions.width < 1024) {
      return { top: 25, right: 25, bottom: 45, left: 60 }
    } else {
      return { top: 30, right: 40, bottom: 50, left: 80 }
    }
  }, [dimensions.width])
  
  const chartWidth = dimensions.width - margin.left - margin.right
  const chartHeight = dimensions.height - margin.top - margin.bottom
  
  const maxPop = useMemo(() => Math.max(...data.map(d => d.city)), [data])
  const chartMaxPop = maxPop * 1.1 // Add 10% padding
  
  // Scale functions (pixel-based)
  const getY = (value: number) => {
    return chartHeight - (value / chartMaxPop) * chartHeight
  }
  
  const getX = (index: number) => {
    return (index / (data.length - 1)) * chartWidth
  }
  
  // Format population for Y-axis labels
  const formatPopulation = (value: number) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
    return value.toString()
  }
  
  // Generate Y-axis ticks (5 levels)
  const yTicks = useMemo(() => {
    const tickCount = 5
    const step = chartMaxPop / (tickCount - 1)
    return Array.from({ length: tickCount }, (_, i) => Math.round(step * i))
  }, [chartMaxPop])

  const linePath = useMemo(() => {
    const points = data.map((d, i) => `${getX(i)},${getY(d.city)}`)
    return `M ${points.join(' L ')}`
  }, [data, chartMaxPop])

  const areaPath = useMemo(() => {
    const points = data.map((d, i) => `${getX(i)},${getY(d.city)}`)
    return `M ${points.join(' L ')} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`
  }, [data, chartMaxPop])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden"
      style={{ minHeight: dimensions.height }}
    >
      <svg 
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Auburn population growth chart 1900-2020"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="forestGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D5A27" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#2D5A27" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2D5A27" stopOpacity="0.08" />
          </linearGradient>
          <filter id="forestGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines - bolder for better visibility */}
          {yTicks.map((tick) => (
            <line
              key={tick}
              x1={0}
              y1={getY(tick)}
              x2={chartWidth}
              y2={getY(tick)}
              stroke="#2D5A27"
              strokeOpacity={tick === 0 ? 0.4 : 0.18}
              strokeWidth={tick === 0 ? 2.5 : 1}
              strokeDasharray={tick === 0 ? "0" : "3,4"}
            />
          ))}

          {/* Y-axis labels - larger and bolder */}
          {yTicks.map((tick) => (
            <text
              key={`label-${tick}`}
              x={-12}
              y={getY(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-forest-700 font-bold"
              style={{ 
                fontSize: dimensions.width < 640 ? '11px' : dimensions.width < 1024 ? '13px' : '14px'
              }}
            >
              {formatPopulation(tick)}
            </text>
          ))}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#forestGradient)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1, delay: 0.3 }}
          />

          {/* Main line - much bolder */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#2D5A27"
            strokeWidth={dimensions.width < 640 ? "3" : dimensions.width < 1024 ? "3.5" : "4"}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.5, ease: "easeOut" }}
          />

          {/* Interactive points & milestones */}
          {data.map((row, i) => {
            const x = getX(i)
            const y = getY(row.city)
            const isActive = row.year === activeYear
            const isHovered = row.year === hoveredYear
            const hasMilestone = !!row.milestoneTitle

            return (
              <g key={row.year}>
                {/* Larger hover zone */}
                <rect
                  x={x - 12}
                  y={0}
                  width={24}
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
                  aria-label={`${row.year}: ${row.city.toLocaleString()} residents${hasMilestone ? ` - ${row.milestoneTitle}` : ''}`}
                />

                {/* Vertical indicator line - bolder */}
                {(isActive || isHovered) && (
                  <motion.line
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    x1={x}
                    y1={-10}
                    x2={x}
                    y2={chartHeight + 5}
                    stroke={isActive ? "#2D5A27" : "#47AF7F"}
                    strokeWidth={isActive ? "2.5" : "2"}
                    strokeOpacity={isActive ? 0.9 : 0.6}
                    strokeDasharray={isActive ? "0" : "4,4"}
                  />
                )}

                {/* Glow effect on hover/active */}
                {(isActive || isHovered) && (
                  <motion.circle
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    cx={x}
                    cy={y}
                    r="6"
                    fill={isActive ? "#2D5A27" : "#47AF7F"}
                  />
                )}

                {/* Milestone indicator with pulse */}
                {hasMilestone && !isActive && !isHovered && (
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.7 + i * 0.05 }}
                  >
                    <circle
                      cx={x}
                      cy={y - 8}
                      r="3"
                      fill="#D4A017"
                      stroke="#fff"
                      strokeWidth="1"
                    />
                    <motion.circle
                      cx={x}
                      cy={y - 8}
                      r="5"
                      fill="none"
                      stroke="#D4A017"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.g>
                )}

                {/* Main data point - much larger and bolder */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isActive 
                    ? (dimensions.width < 640 ? 6 : dimensions.width < 1024 ? 7 : 8)
                    : isHovered 
                      ? (dimensions.width < 640 ? 5 : dimensions.width < 1024 ? 6 : 7)
                      : hasMilestone 
                        ? (dimensions.width < 640 ? 4 : dimensions.width < 1024 ? 5 : 6)
                        : (dimensions.width < 640 ? 3.5 : dimensions.width < 1024 ? 4 : 5)
                  }
                  fill={isActive ? "#2D5A27" : isHovered ? "#47AF7F" : hasMilestone ? "#D4A017" : "#47AF7F"}
                  stroke={isActive || isHovered ? "#fff" : "none"}
                  strokeWidth={isActive || isHovered ? (dimensions.width < 640 ? "2" : "2.5") : "0"}
                  filter={isActive ? "url(#forestGlow)" : undefined}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.5 + i * 0.04, duration: 0.3 }}
                  className="transition-all duration-200"
                />

                {/* Year labels - every 10 years with better styling */}
                {row.year % 10 === 0 && (
                  <g>
                    {/* Background for better readability */}
                    {row.year === activeYear && (
                      <rect
                        x={x - 16}
                        y={chartHeight + 6}
                        width={32}
                        height={16}
                        fill="#2D5A27"
                        fillOpacity="0.1"
                        rx="3"
                      />
                    )}
                    <text
                      x={x}
                      y={chartHeight + 20}
                      textAnchor="middle"
                      className={cn(
                        "font-sans transition-all font-bold",
                        row.year === activeYear 
                          ? "fill-forest-700" 
                          : isHovered && row.year === hoveredYear
                            ? "fill-forest-600"
                            : "fill-charcoal-600"
                      )}
                      style={{ 
                        fontSize: row.year === activeYear 
                          ? (dimensions.width < 640 ? '13px' : dimensions.width < 1024 ? '14px' : '15px')
                          : (dimensions.width < 640 ? '11px' : dimensions.width < 1024 ? '12px' : '13px')
                      }}
                    >
                      {row.year}
                    </text>
                  </g>
                )}
              
              {/* Growth indicator arrows for significant changes */}
              {i > 0 && Math.abs(row.city - data[i-1].city) > 1000 && (
                <motion.g
                  initial={{ opacity: 0, y: 5 }}
                  animate={isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 5 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.8 + i * 0.03 }}
                >
                  {row.city > data[i-1].city ? (
                    <path
                      d={`M ${x},${y - 8} L ${x - 1},${y - 6} L ${x + 1},${y - 6} Z`}
                      fill="#2D5A27"
                      opacity="0.5"
                    />
                  ) : (
                    <path
                      d={`M ${x},${y + 8} L ${x - 1},${y + 6} L ${x + 1},${y + 6} Z`}
                      fill="#A0522D"
                      opacity="0.5"
                    />
                  )}
                </motion.g>
              )}
              </g>
            )
          })}
        </g>
      </svg>

      {/* Legend - larger and bolder */}
      <div className="absolute top-3 right-3 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg border-2 border-forest-300 shadow-md">
          <div className="w-3 h-3 rounded-full bg-forest-500" />
          <span className="text-charcoal-700 font-bold" style={{ fontSize: dimensions.width < 640 ? '11px' : '12px' }}>
            Population
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg border-2 border-gold-300 shadow-md">
          <div className="w-3 h-3 rounded-full bg-gold-500" />
          <span className="text-charcoal-700 font-bold" style={{ fontSize: dimensions.width < 640 ? '11px' : '12px' }}>
            Milestone
          </span>
        </div>
      </div>

      {/* Tooltip with milestone */}
      <AnimatePresence>
        {(hoveredYear || activeYear) && (() => {
          const yearIndex = data.findIndex(d => d.year === (hoveredYear || activeYear))
          const xPosition = yearIndex >= 0 ? getX(yearIndex) + margin.left : 0
          const row = data.find(d => d.year === (hoveredYear || activeYear))
          return (
            <motion.div
              key={hoveredYear || activeYear}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
              className="absolute pointer-events-none z-10"
              style={{ 
                top: 10,
                left: `${(xPosition / dimensions.width) * 100}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="bg-forest-900 border-2 border-forest-500 text-white px-3 py-2 rounded-lg shadow-xl max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3 h-3 text-forest-400" />
                  <span className="text-forest-300 font-display font-bold text-sm">
                    {hoveredYear || activeYear}
                  </span>
                </div>
                <div className="text-white text-xs font-semibold mb-1">
                  {row?.city.toLocaleString()} residents
                </div>
                {row?.milestoneTitle && (
                  <div className="text-gold-400 text-xs font-medium border-t border-forest-700 pt-1 mt-1">
                    <Zap className="w-3 h-3 inline mr-1" />
                    {row.milestoneTitle}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// STATS PANEL WITH CONTEXT
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

  // Calculate total growth from start
  const firstRow = data[0]
  const totalGrowth = firstRow ? ((activeRow.city - firstRow.city) / firstRow.city * 100) : null

  return (
    <div ref={ref} className="space-y-4">
      {/* Main stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Population */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-100 to-forest-50 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-white rounded-xl p-5 border-2 border-forest-300 group-hover:border-forest-500 transition-colors shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-forest-600" />
              <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Population</span>
            </div>
            <div className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 tabular-nums">
              {population.toLocaleString()}
            </div>
            <div className="text-xs text-charcoal-500 mt-1 font-medium">
              Year {activeRow?.year}
            </div>
          </div>
        </div>
        
        {/* Period Growth */}
        <div className="relative group">
          <div className={cn(
            "absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity",
            isPositive ? "bg-gradient-to-br from-forest-100 to-forest-50" : "bg-gradient-to-br from-rust-100 to-rust-50"
          )} />
          <div className={cn(
            "relative bg-white rounded-xl p-5 border-2 transition-colors shadow-sm",
            isPositive ? "border-forest-300 group-hover:border-forest-500" : "border-rust-300 group-hover:border-rust-500"
          )}>
            <div className="flex items-center gap-2 mb-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-forest-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rust-600" />
              )}
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider",
                isPositive ? "text-forest-700" : "text-rust-700"
              )}>Period Growth</span>
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

      {/* Historical context card */}
      {activeRow?.milestoneTitle && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-r from-gold-50 to-cream-50 border-2 border-gold-300 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gold-500 rounded-lg">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-charcoal-900 mb-1">
                {activeRow.milestoneTitle}
              </h4>
              {activeRow.milestoneBody && (
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {activeRow.milestoneBody}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Total growth badge */}
      {totalGrowth !== null && (
        <div className="flex items-center justify-center gap-2 p-3 bg-forest-50 border border-forest-200 rounded-lg">
          <MapPin className="w-4 h-4 text-forest-600" />
          <span className="text-sm font-semibold text-forest-900">
            <span className="text-forest-600">+{totalGrowth.toFixed(0)}%</span> total growth since 1900
          </span>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// DECADE JUMP BUTTONS
// ═══════════════════════════════════════════════════════════════════════════

function DecadeJumper({ data, activeYear, onYearSelect }: { data: CityThroughTimeRow[], activeYear: number, onYearSelect: (year: number) => void }) {
  const decades = useMemo(() => data.filter(d => d.year % 10 === 0), [data])
  const scrollRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const activeIndex = decades.findIndex(d => d.year === activeYear)
    const activeEl = container.children[activeIndex] as HTMLElement
    activeEl?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', inline: 'center' })
  }, [activeYear, decades, shouldReduceMotion])

  return (
    <div className="bg-white border-2 border-forest-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-forest-900 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Jump to Decade
        </h4>
        <span className="text-xs text-charcoal-500 font-medium">
          {decades.length} data points
        </span>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
      >
        {decades.map((row) => (
          <button
            key={row.year}
            onClick={() => onYearSelect(row.year)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-lg font-bold text-sm transition-all snap-start",
              "focus:outline-none focus:ring-2 focus:ring-forest-500",
              activeYear === row.year
                ? "bg-gradient-to-r from-forest-500 to-forest-600 text-white shadow-lg shadow-forest-500/25 scale-105"
                : "bg-forest-50 text-forest-700 hover:bg-forest-100 border border-forest-200"
            )}
          >
            {row.year}
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// TIMELINE PROGRESS BAR
// ═══════════════════════════════════════════════════════════════════════════

function TimelineProgress({ data, activeYear }: { data: CityThroughTimeRow[], activeYear: number }) {
  const progress = useMemo(() => {
    const minYear = data[0].year
    const maxYear = data[data.length - 1].year
    return ((activeYear - minYear) / (maxYear - minYear)) * 100
  }, [data, activeYear])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-charcoal-600">
        <span>{data[0].year}</span>
        <span className="text-forest-600">{activeYear}</span>
        <span>{data[data.length - 1].year}</span>
      </div>
      <div className="relative h-2 bg-forest-100 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-forest-500 to-forest-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-forest-600 rounded-full shadow-lg"
          initial={{ left: 0 }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ marginLeft: '-8px' }}
        />
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
            "focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2",
            activeIndex === index
              ? "bg-gradient-to-r from-forest-500 to-forest-600 text-white shadow-lg shadow-forest-500/20"
              : "bg-cream-100 text-charcoal-700 hover:bg-forest-50 border border-charcoal-200 hover:border-forest-300"
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
      <div className="relative overflow-hidden rounded-xl border-2 border-forest-300 bg-gradient-to-br from-forest-50 to-white p-4">
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
            className="p-4 rounded-xl bg-gradient-to-br from-gold-50 to-white border-2 border-gold-200 hover:border-gold-400 transition-colors"
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
  const { data, chapters, cityName, established } = auburnDataStoryConfig
  
  const [activeChapterIndex, setActiveChapterIndex] = useState(chapters.length - 1)
  const [activeYear, setActiveYear] = useState(chapters[chapters.length - 1].endYear)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  
  const shouldReduceMotion = useReducedMotion()
  const activeChapter = chapters[activeChapterIndex]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  // Calculate key stats
  const totalGrowth = useMemo(() => {
    const first = data[0]
    const last = data[data.length - 1]
    return ((last.city - first.city) / first.city * 100).toFixed(0)
  }, [data])
  
  const yearsOfData = data[data.length - 1].year - data[0].year

  const handleChapterSelect = useCallback((index: number) => {
    setActiveChapterIndex(index)
    setActiveYear(chapters[index].endYear)
  }, [chapters])

  const handleYearSelect = useCallback((year: number) => {
    setActiveYear(year)
    // Find chapter that contains this year
    const chapterIndex = chapters.findIndex(c => year >= c.startYear && year <= c.endYear)
    if (chapterIndex !== -1) setActiveChapterIndex(chapterIndex)
  }, [chapters])

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    if (activeChapterIndex > 0) handleChapterSelect(activeChapterIndex - 1)
  }
  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault()
    if (activeChapterIndex < chapters.length - 1) handleChapterSelect(activeChapterIndex + 1)
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-cream-50 via-white to-cream-50"
      aria-labelledby="data-story-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-100 text-forest-700 rounded-full mb-4">
            <Mountain className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Data & Demographics</span>
          </div>
          <h2 
            id="data-story-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-4"
          >
            {cityName} by the Numbers
          </h2>
          <p className="text-lg text-charcoal-600 max-w-3xl mx-auto">
            From Gold Rush origins to modern gateway—explore {yearsOfData} years of growth through interactive data, 
            historical milestones, and civic insights.
          </p>
        </motion.div>

        {/* Introduction Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.1 }}
        >
          {/* Interactive Viz Card */}
          <div className="bg-white rounded-xl border-2 border-forest-200 p-6 hover:border-forest-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-forest-600" />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900 mb-2">
              Interactive Visualizations
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Explore population trends with interactive charts that respond to your clicks and selections.
            </p>
          </div>

          {/* Public Data Card */}
          <div className="bg-white rounded-xl border-2 border-forest-200 p-6 hover:border-forest-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center mb-4">
              <Info className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900 mb-2">
              Public Data Sources
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              All data from U.S. Census Bureau and California Department of Finance records.
            </p>
          </div>

          {/* Accessible Card */}
          <div className="bg-white rounded-xl border-2 border-forest-200 p-6 hover:border-forest-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-lake-100 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-lake-600" />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900 mb-2">
              Accessible Design
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Keyboard navigable, screen reader compatible, and optimized for all abilities.
            </p>
          </div>
        </motion.div>

        {/* Quick Stats Banner */}
        <motion.div 
          className="bg-gradient-to-r from-forest-500 to-forest-600 rounded-2xl p-6 md:p-8 mb-12 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {established}
              </div>
              <div className="text-sm text-white/80 font-medium">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                +{totalGrowth}%
              </div>
              <div className="text-sm text-white/80 font-medium">Total Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {data.length}
              </div>
              <div className="text-sm text-white/80 font-medium">Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {chapters.length}
              </div>
              <div className="text-sm text-white/80 font-medium">Historical Eras</div>
            </div>
          </div>
        </motion.div>

        {/* How to Use Guide */}
        <motion.div 
          className="bg-gradient-to-br from-white to-cream-50 rounded-2xl border-2 border-gold-200 p-6 md:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-gold-100 rounded-lg">
              <Info className="w-5 h-5 text-gold-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-1">
                How to Explore This Data
              </h3>
              <p className="text-sm text-charcoal-600">
                Click any point on the chart • Jump to decades • Navigate through historical eras
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-forest-100 text-forest-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                1
              </div>
              <div>
                <strong className="text-charcoal-800">Click data points</strong>
                <p className="text-charcoal-600 text-xs mt-0.5">
                  See population, growth, and milestones
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-forest-100 text-forest-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                2
              </div>
              <div>
                <strong className="text-charcoal-800">Navigate eras</strong>
                <p className="text-charcoal-600 text-xs mt-0.5">
                  Use arrows to explore each period
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-forest-100 text-forest-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                3
              </div>
              <div>
                <strong className="text-charcoal-800">Jump decades</strong>
                <p className="text-charcoal-600 text-xs mt-0.5">
                  Quick access to specific years
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Divider - Enhanced */}
        <motion.div 
          className="text-center pb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-forest-50 to-gold-50 border-2 border-forest-300 rounded-full shadow-lg">
            <Zap className="w-6 h-6 text-forest-600" />
            <span className="text-base font-bold text-charcoal-900 uppercase tracking-wider">
              Interactive Visualization
            </span>
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
        >
          {/* Timeline progress */}
          <div className="bg-white border-2 border-forest-200 rounded-xl p-4">
            <TimelineProgress data={data} activeYear={activeYear} />
          </div>

          {/* Main data card - enhanced for better visibility */}
          <div className="bg-white rounded-2xl border-2 border-forest-300 overflow-hidden shadow-2xl">
            {/* MOBILE: Stacked layout */}
            <div className="lg:hidden">
              {/* Chart - more padding for breathing room */}
              <div className="p-4 md:p-6 bg-gradient-to-br from-cream-50 to-white border-b-2 border-forest-200">
                <InteractiveChart
                  data={data}
                  activeYear={activeYear}
                  hoveredYear={hoveredYear}
                  onYearClick={handleYearSelect}
                  onYearHover={setHoveredYear}
                />
              </div>
              
              {/* Stats */}
              <div className="p-3 bg-white border-b-2 border-forest-100">
                <StatsPanel data={data} activeYear={activeYear} />
              </div>
              
              {/* Chapters */}
              <div className="p-3 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-forest-600" />
                    <span className="text-sm font-bold text-charcoal-700">
                      Era {activeChapterIndex + 1} of {chapters.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={goToPrevious}
                      disabled={activeChapterIndex === 0}
                      type="button"
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-forest-500",
                        activeChapterIndex === 0
                          ? "text-charcoal-300 cursor-not-allowed"
                          : "text-charcoal-600 hover:text-forest-600 hover:bg-forest-50"
                      )}
                      aria-label="Previous era"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={activeChapterIndex === chapters.length - 1}
                      type="button"
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-forest-500",
                        activeChapterIndex === chapters.length - 1
                          ? "text-charcoal-300 cursor-not-allowed"
                          : "text-charcoal-600 hover:text-forest-600 hover:bg-forest-50"
                      )}
                      aria-label="Next era"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <ChapterSelector
                    chapters={chapters}
                    activeIndex={activeChapterIndex}
                    onSelect={handleChapterSelect}
                  />
                </div>

                <div className="mb-4">
                  <div className="text-xs font-bold text-forest-600 uppercase tracking-widest mb-1">
                    {activeChapter.startYear}–{activeChapter.endYear}
                  </div>
                  <h3 className="text-xl font-display font-bold text-charcoal-900">
                    {activeChapter.title}
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  <ChapterPanel key={activeChapter.id} chapter={activeChapter} />
                </AnimatePresence>
              </div>
            </div>

            {/* DESKTOP: Side-by-side layout */}
            <div className="hidden lg:grid lg:grid-cols-5 divide-x-2 divide-forest-200">
              
              {/* LEFT: Chart & Stats - more prominent */}
              <div className="lg:col-span-3 p-6 md:p-8 bg-gradient-to-br from-cream-50 to-white">
                <div className="mb-6">
                  <InteractiveChart
                    data={data}
                    activeYear={activeYear}
                    hoveredYear={hoveredYear}
                    onYearClick={handleYearSelect}
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
                    <Calendar className="w-4 h-4 text-forest-600" />
                    <span className="text-sm font-bold text-charcoal-700">
                      Era {activeChapterIndex + 1} of {chapters.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={goToPrevious}
                      disabled={activeChapterIndex === 0}
                      type="button"
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-forest-500",
                        activeChapterIndex === 0
                          ? "text-charcoal-300 cursor-not-allowed"
                          : "text-charcoal-600 hover:text-forest-600 hover:bg-forest-50"
                      )}
                      aria-label="Previous era"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={activeChapterIndex === chapters.length - 1}
                      type="button"
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-forest-500",
                        activeChapterIndex === chapters.length - 1
                          ? "text-charcoal-300 cursor-not-allowed"
                          : "text-charcoal-600 hover:text-forest-600 hover:bg-forest-50"
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
                  <div className="text-xs font-bold text-forest-600 uppercase tracking-widest mb-1">
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

          {/* Decade jumper - hidden on mobile */}
          <div className="hidden md:block">
              <DecadeJumper 
              data={data} 
              activeYear={activeYear} 
              onYearSelect={handleYearSelect}
            />
          </div>
        </motion.div>

        {/* Learn More CTA */}
        <motion.div 
          className="mt-12 bg-white rounded-2xl border-2 border-gold-200 overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <div className="p-8 md:p-10 text-center">
            <Sparkles className="w-12 h-12 text-gold-500 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-display font-bold text-charcoal-900 mb-3">
              Want the Full Story?
            </h3>
            <p className="text-charcoal-600 mb-6 max-w-2xl mx-auto">
              Dive deeper into Auburn's demographic evolution with detailed methodology, 
              data sources, accessibility information, and expanded historical context.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/discover/auburn-data"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
                  "bg-gradient-to-r from-forest-500 to-forest-600 text-white font-bold",
                  "hover:from-forest-600 hover:to-forest-700 hover:scale-105 hover:shadow-xl hover:shadow-forest-500/25",
                  "focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2",
                  "transition-all duration-200",
                  "group"
                )}
              >
                <span>Explore Full Data Story</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/discover"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
                  "border-2 border-forest-300 text-forest-700 font-bold",
                  "hover:bg-forest-50 hover:border-forest-500",
                  "focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2",
                  "transition-all duration-200"
                )}
              >
                <span>Discover Auburn</span>
              </Link>
            </div>
          </div>
          
          {/* Footer with data sources */}
          <div className="bg-cream-50 px-8 py-4 border-t border-gold-200">
            <p className="text-center text-xs text-charcoal-500">
              <strong className="text-charcoal-700">Data Sources:</strong> U.S. Census Bureau • California Department of Finance • Placer County Records
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
