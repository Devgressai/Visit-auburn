'use client'

/**
 * Auburn Data Visualization - Top 1% Showcase Experience
 * 
 * A cinematic, premium data visualization that tells Auburn's story through
 * interactive charts, smooth animations, and immersive storytelling.
 * 
 * Features:
 * - D3.js-powered advanced visualizations
 * - GSAP cinematic animations
 * - Scroll-triggered narrative reveals
 * - Premium, trustworthy design
 * - Mobile-first responsive
 * - Fully accessible
 */

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  TrendingUp,
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
  Clock,
} from 'lucide-react'
import * as d3 from 'd3'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  auburnDataStoryConfig,
  type CityThroughTimeRow,
  type StoryChapter,
} from '@/lib/data/cityThroughTime'
import { cn } from '@/lib/utils'
import { 
  colors, 
  spacing, 
  typography, 
  elevation, 
  depth, 
  motion as motionTokens, 
  interaction, 
  breakpoints,
  blur,
  borders,
  grid,
} from '@/lib/designTokens'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  try {
    gsap.registerPlugin(ScrollTrigger)
  } catch (e) {
    // ScrollTrigger not available, continue without it
    console.warn('ScrollTrigger not available, scroll animations disabled')
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER HOOK
// ═══════════════════════════════════════════════════════════════════════════

function useCountUp(end: number, duration: number = motionTokens.duration.verySlow, isActive: boolean = true): number {
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
// PREMIUM D3.JS CHART COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ChartProps {
  data: CityThroughTimeRow[]
  activeYear: number
  hoveredYear: number | null
  onYearClick: (year: number) => void
  onYearHover: (year: number | null) => void
}

function PremiumChart({ data, activeYear, hoveredYear, onYearClick, onYearHover }: ChartProps) {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 })
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    let rafId: number | null = null
    
    const updateDimensions = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const containerWidth = rect.width
      
      let width: number
      let height: number
      
      if (containerWidth < breakpoints.sm) {
        width = Math.max(containerWidth - spacing[2], breakpoints.xs)
        height = Math.max(300, width * 0.6)
      } else if (containerWidth < breakpoints.lg) {
        width = Math.max(containerWidth - spacing[2], breakpoints.sm)
        height = Math.max(380, width * 0.5)
      } else {
        width = Math.min(containerWidth - spacing[2], grid.container['2xl'])
        height = Math.max(450, Math.min(width * 0.45, 550))
      }
      
      setDimensions({ width, height })
    }
    
    // Throttle resize with RAF for better performance
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateDimensions)
    }
    
    updateDimensions()
    const resizeObserver = new ResizeObserver(() => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateDimensions)
    })
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])
  
  const margin = useMemo(() => {
    if (dimensions.width < breakpoints.sm) {
      return { 
        top: spacing[8] - spacing[2], 
        right: spacing[5], 
        bottom: spacing[12] + spacing[2], 
        left: spacing[12] + spacing[2] 
      }
    } else if (dimensions.width < breakpoints.lg) {
      return { 
        top: spacing[8] + spacing[3], 
        right: spacing[8] - spacing[2], 
        bottom: spacing[12] + spacing[5], 
        left: spacing[16] + spacing[6] 
      }
    } else {
      return { 
        top: spacing[10], 
        right: spacing[12] + spacing[2], 
        bottom: spacing[12] + spacing[8], 
        left: spacing[20] + spacing[10] 
      }
    }
  }, [dimensions.width])
  
  const chartWidth = dimensions.width - margin.left - margin.right
  const chartHeight = dimensions.height - margin.top - margin.bottom
  
  // D3 scales
  const xScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([data[0].year, data[data.length - 1].year])
      .range([0, chartWidth])
  }, [data, chartWidth])
  
  const yScale = useMemo(() => {
    const maxPop = Math.max(...data.map(d => d.city)) * 1.15
    return d3.scaleLinear()
      .domain([0, maxPop])
      .range([chartHeight, 0])
  }, [data, chartHeight])
  
  // Line generator
  const line = useMemo(() => {
    return d3.line<CityThroughTimeRow>()
      .x(d => xScale(d.year))
      .y(d => yScale(d.city))
      .curve(d3.curveMonotoneX)
  }, [xScale, yScale])
  
  const area = useMemo(() => {
    return d3.area<CityThroughTimeRow>()
      .x(d => xScale(d.year))
      .y0(chartHeight)
      .y1(d => yScale(d.city))
      .curve(d3.curveMonotoneX)
  }, [xScale, yScale, chartHeight])
  
  const linePath = useMemo(() => line(data) || '', [line, data])
  const areaPath = useMemo(() => area(data) || '', [area, data])
  
  // GSAP animation on mount
  useEffect(() => {
    if (!isInView || shouldReduceMotion || !svgRef.current) return
    
    const path = svgRef.current.querySelector('.main-line') as SVGPathElement
    const areaPathEl = svgRef.current.querySelector('.area-fill') as SVGPathElement
    
    if (path && areaPathEl) {
      const pathLength = path.getTotalLength()
      const areaPathLength = areaPathEl.getTotalLength()
      
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength })
      gsap.set(areaPathEl, { opacity: 0 })
      
      const tl = gsap.timeline({ defaults: { ease: motionTokens.easing.smooth } })
      
      tl.to(areaPathEl, {
        opacity: 1,
        duration: motionTokens.duration.verySlow / 1000
      })
      .to(path, {
        strokeDashoffset: 0,
        duration: motionTokens.duration.slowest / 1000,
        ease: motionTokens.easing.consistent
      }, `-=${motionTokens.duration.slower / 1000}`)
      
      // Animate points
      const points = svgRef.current.querySelectorAll('.data-point')
      gsap.fromTo(points, 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: motionTokens.duration.normal / 1000,
          stagger: motionTokens.delay.short / 1000,
          ease: motionTokens.easing.bounce,
          delay: (motionTokens.duration.verySlow + motionTokens.duration.normal) / 1000
        }
      )
    }
  }, [isInView, shouldReduceMotion])
  
  // Animate active year change
  useEffect(() => {
    if (shouldReduceMotion || !svgRef.current) return
    
    const activePoint = svgRef.current.querySelector(`[data-year="${activeYear}"]`) as SVGCircleElement
    if (activePoint) {
      gsap.to(activePoint, {
        scale: interaction.hover.scaleLg + 0.3,
        duration: motionTokens.duration.normal / 1000,
        ease: motionTokens.easing.bounce,
        force3D: true
      })
      
      const otherPoints = svgRef.current.querySelectorAll(`.data-point:not([data-year="${activeYear}"])`)
      gsap.to(otherPoints, {
        scale: 1,
        duration: motionTokens.duration.fast / 1000,
        ease: motionTokens.easing.natural,
        force3D: true
      })
    }
  }, [activeYear, shouldReduceMotion])
  
  const formatPopulation = (value: number) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
    return value.toString()
  }
  
  const yTicks = useMemo(() => {
    const maxPop = Math.max(...data.map(d => d.city)) * 1.15
    const tickCount = 5
    const step = maxPop / (tickCount - 1)
    return Array.from({ length: tickCount }, (_, i) => Math.round(step * i))
  }, [data])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ minHeight: dimensions.height }}
    >
      <svg 
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-auto"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        role="img"
        aria-label="Auburn population growth chart 1900-2020"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        <defs>
          <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.forest[500]} stopOpacity="0.5" />
            <stop offset="50%" stopColor={colors.forest[500]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colors.forest[500]} stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {yTicks.map((tick) => (
            <line
              key={tick}
              x1={0}
              y1={yScale(tick)}
              x2={chartWidth}
              y2={yScale(tick)}
              stroke={colors.forest[500]}
              strokeOpacity={tick === 0 ? 0.3 : 0.1}
              strokeWidth={tick === 0 ? borders.width.medium : borders.width.thin}
              strokeDasharray={tick === 0 ? "0" : "4,4"}
            />
          ))}

          {/* Y-axis labels */}
          {yTicks.map((tick) => (
            <text
              key={`label-${tick}`}
              x={-15}
              y={yScale(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              style={{ 
                fill: colors.forest[700],
                fontWeight: typography.fontWeight.bold,
                fontSize: dimensions.width < breakpoints.sm 
                  ? typography.fontSize.xs 
                  : dimensions.width < breakpoints.lg 
                    ? typography.fontSize.sm 
                    : typography.fontSize.base
              }}
            >
              {formatPopulation(tick)}
            </text>
          ))}

          {/* Area fill */}
          <path
            className="area-fill"
            d={areaPath}
            fill="url(#premiumGradient)"
          />

          {/* Main line */}
          <path
            className="main-line"
            d={linePath}
            fill="none"
            stroke={colors.forest[500]}
            strokeWidth={dimensions.width < breakpoints.sm ? "3.5" : dimensions.width < breakpoints.lg ? "4" : "4.5"}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#softGlow)"
          />

          {/* Data points */}
          {data.map((row) => {
            const x = xScale(row.year)
            const y = yScale(row.city)
            const isActive = row.year === activeYear
            const isHovered = row.year === hoveredYear
            const hasMilestone = !!row.milestoneTitle

            return (
              <g key={row.year}>
                {/* Interactive hit area */}
                <rect
                  x={x - 15}
                  y={0}
                  width={30}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => onYearClick(row.year)}
                  onMouseEnter={() => onYearHover(row.year)}
                  onMouseLeave={() => onYearHover(null)}
                  onFocus={() => onYearHover(row.year)}
                  onBlur={() => onYearHover(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onYearClick(row.year)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${row.year}: ${row.city.toLocaleString()} residents${hasMilestone ? ` - ${row.milestoneTitle}` : ''}`}
                />

                {/* Active indicator line */}
                {(isActive || isHovered) && (
                  <motion.line
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    x1={x}
                    y1={-15}
                    x2={x}
                    y2={chartHeight + 10}
                    stroke={isActive ? colors.forest[500] : colors.forest[300]}
                    strokeWidth={isActive ? borders.width.thick : borders.width.medium}
                    strokeOpacity={isActive ? 0.8 : 0.5}
                    strokeDasharray={isActive ? "0" : "5,5"}
                  />
                )}

                {/* Milestone indicator */}
                {hasMilestone && !isActive && !isHovered && (
                  <circle
                    cx={x}
                    cy={y - 10}
                    r="4"
                    fill={colors.gold[500]}
                    stroke="#fff"
                    strokeWidth={borders.width.thin + 0.5}
                    opacity={0.8}
                  />
                )}

                {/* Data point */}
                <circle
                  className="data-point"
                  data-year={row.year}
                  cx={x}
                  cy={y}
                  r={isActive 
                    ? (dimensions.width < 640 ? 7 : dimensions.width < 1024 ? 8 : 9)
                    : isHovered 
                      ? (dimensions.width < 640 ? 6 : dimensions.width < 1024 ? 7 : 8)
                      : hasMilestone 
                        ? (dimensions.width < 640 ? 5 : dimensions.width < 1024 ? 6 : 7)
                        : (dimensions.width < 640 ? 4.5 : dimensions.width < 1024 ? 5.5 : 6.5)
                  }
                  fill={isActive ? colors.forest[500] : isHovered ? colors.forest[300] : hasMilestone ? colors.gold[500] : colors.forest[300]}
                  stroke={isActive || isHovered ? "#fff" : "none"}
                  strokeWidth={isActive || isHovered ? (dimensions.width < breakpoints.sm ? "2.5" : borders.width.thick) : "0"}
                  filter={isActive ? "url(#glow)" : undefined}
                  style={{ 
                    transition: motionTokens.transition.transform,
                    transform: 'translateZ(0)' // GPU acceleration
                  }}
                />

                {/* Year labels */}
                {row.year % 10 === 0 && (
                  <text
                    x={x}
                    y={chartHeight + 25}
                    textAnchor="middle"
                    className={cn(
                      "font-sans font-bold transition-all",
                      row.year === activeYear 
                        ? "fill-forest-700" 
                        : isHovered && row.year === hoveredYear
                          ? "fill-forest-600"
                          : "fill-charcoal-500"
                    )}
                    style={{ 
                      fontSize: row.year === activeYear 
                        ? (dimensions.width < breakpoints.sm ? typography.fontSize.sm : dimensions.width < breakpoints.lg ? typography.fontSize.base : typography.fontSize.base)
                        : (dimensions.width < breakpoints.sm ? typography.fontSize.xs : dimensions.width < breakpoints.lg ? typography.fontSize.sm : typography.fontSize.sm),
                      fill: row.year === activeYear 
                        ? colors.forest[700] 
                        : isHovered && row.year === hoveredYear
                          ? colors.forest[600]
                          : colors.charcoal[500]
                    }}
                  >
                    {row.year}
                  </text>
                )}
              </g>
            )
          })}
        </g>
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {(hoveredYear || activeYear) && (() => {
          const yearIndex = data.findIndex(d => d.year === (hoveredYear || activeYear))
          const xPosition = yearIndex >= 0 ? xScale(data[yearIndex].year) + margin.left : 0
          const row = data.find(d => d.year === (hoveredYear || activeYear))
          return (
            <motion.div
              key={hoveredYear || activeYear}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: shouldReduceMotion ? 0 : motionTokens.duration.fast / 1000 }}
              className="absolute pointer-events-none"
              style={{ 
                zIndex: depth.tooltip,
                top: spacing[4] - spacing[1],
                left: `${(xPosition / dimensions.width) * 100}%`,
                transform: 'translateX(-50%) translateZ(0)',
              }}
            >
              <div 
                style={{
                  backgroundColor: `${colors.forest[900]}F2`,
                  backdropFilter: `blur(${blur.md})`,
                  border: `${borders.width.medium}px solid ${colors.forest[500]}`,
                  color: '#FFFFFF',
                  padding: `${spacing[3]}px ${spacing[4]}px`,
                  borderRadius: borders.radius.xl,
                  boxShadow: elevation.shadow['2xl'],
                  maxWidth: `${spacing[24] + spacing[20] + spacing[10]}px`, // ~216px
                }}
              >
                <div 
                  className="flex items-center"
                  style={{ 
                    gap: spacing[2], 
                    marginBottom: spacing[2] - spacing[1] 
                  }}
                >
                  <Calendar style={{ width: spacing[4], height: spacing[4], color: colors.forest[400] }} />
                  <span 
                    style={{
                      color: colors.forest[300],
                      fontFamily: typography.fontFamily.display,
                      fontWeight: typography.fontWeight.bold,
                      fontSize: typography.fontSize.sm,
                    }}
                  >
                    {hoveredYear || activeYear}
                  </span>
                </div>
                <div 
                  style={{
                    color: '#FFFFFF',
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.bold,
                    marginBottom: spacing[1],
                  }}
                >
                  {row?.city.toLocaleString()} residents
                </div>
                {row?.milestoneTitle && (
                  <div 
                    style={{
                      color: colors.gold[400],
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                      borderTop: `${borders.width.thin}px solid ${colors.forest[700]}`,
                      paddingTop: spacing[2] - spacing[1],
                      marginTop: spacing[2] - spacing[1],
                    }}
                  >
                    <Zap style={{ width: spacing[3], height: spacing[3], display: 'inline', marginRight: spacing[1] }} />
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
// STATS PANEL WITH PREMIUM DESIGN
// ═══════════════════════════════════════════════════════════════════════════

function PremiumStatsPanel({ data, activeYear }: { data: CityThroughTimeRow[], activeYear: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const activeRow = useMemo(() => data.find(d => d.year === activeYear) || data[data.length - 1], [data, activeYear])
  const previousRow = useMemo(() => {
    const idx = data.findIndex(d => d.year === activeYear)
    return idx > 0 ? data[idx - 1] : null
  }, [data, activeYear])

  const population = useCountUp(activeRow?.city || 0, motionTokens.duration.verySlow, isInView)
  const growth = previousRow ? ((activeRow.city - previousRow.city) / previousRow.city * 100) : null
  const isPositive = growth !== null && growth >= 0

  const firstRow = data[0]
  const totalGrowth = firstRow ? ((activeRow.city - firstRow.city) / firstRow.city * 100) : null

  return (
    <div ref={ref} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Population */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: shouldReduceMotion ? 0 : motionTokens.duration.slow / 1000, 
            delay: shouldReduceMotion ? 0 : motionTokens.delay.short / 1000 
          }}
          style={{ transform: 'translateZ(0)' }}
        >
          <div 
            className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity"
            style={{
              background: `linear-gradient(to bottom right, ${colors.forest[100]}, ${colors.forest[50]})`,
              transitionDuration: `${motionTokens.duration.normal}ms`,
            }}
          />
          <div 
            className="relative rounded-xl transition-all group"
            style={{
              backgroundColor: colors.semantic.bgCard,
              padding: spacing[6],
              border: `${borders.width.medium}px solid ${colors.forest[300]}`,
              boxShadow: elevation.shadow.lg,
              transform: 'translateZ(0)',
            }}
            onMouseEnter={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  borderColor: colors.forest[500],
                  boxShadow: elevation.shadow.xl,
                  scale: interaction.hover.scaleSm,
                  duration: motionTokens.duration.normal / 1000, // Smoother timing
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  borderColor: colors.forest[300],
                  boxShadow: elevation.shadow.lg,
                  scale: 1,
                  duration: motionTokens.duration.normal / 1000, // Smoother timing
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onTouchStart={(e) => {
              // Touch feedback for mobile
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  scale: interaction.active.scale,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onTouchEnd={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
          >
            <div 
              className="flex items-center"
              style={{ gap: spacing[2], marginBottom: spacing[3] }}
            >
              <Users style={{ width: spacing[5], height: spacing[5], color: colors.forest[600] }} />
              <span 
                style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.forest[700],
                  textTransform: 'uppercase',
                  letterSpacing: typography.letterSpacing.widest,
                }}
              >
                Population
              </span>
            </div>
            <div 
              style={{
                fontSize: `clamp(${typography.fontSize['4xl']}, 4vw, ${typography.fontSize['5xl']})`,
                fontFamily: typography.fontFamily.display,
                fontWeight: typography.fontWeight.bold,
                color: colors.charcoal[900],
                fontVariantNumeric: 'tabular-nums',
                marginBottom: spacing[1],
              }}
            >
              {population.toLocaleString()}
            </div>
            <div 
              style={{
                fontSize: typography.fontSize.xs,
                color: colors.charcoal[500],
                fontWeight: typography.fontWeight.medium,
              }}
            >
              Year {activeRow?.year}
            </div>
          </div>
        </motion.div>
        
        {/* Growth */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: shouldReduceMotion ? 0 : motionTokens.duration.slow / 1000, 
            delay: shouldReduceMotion ? 0 : motionTokens.delay.medium / 1000 
          }}
          style={{ transform: 'translateZ(0)' }}
        >
          <div 
            className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity"
            style={{
              background: isPositive 
                ? `linear-gradient(to bottom right, ${colors.forest[100]}, ${colors.forest[50]})`
                : `linear-gradient(to bottom right, ${colors.rust[500]}20, ${colors.rust[500]}10)`,
              transitionDuration: `${motionTokens.duration.normal}ms`,
            }}
          />
          <div 
            className="relative rounded-xl transition-all"
            style={{
              backgroundColor: colors.semantic.bgCard,
              padding: spacing[6],
              border: `${borders.width.medium}px solid ${isPositive ? colors.forest[300] : colors.rust[500]}`,
              boxShadow: elevation.shadow.lg,
              transform: 'translateZ(0)',
            }}
            onMouseEnter={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  borderColor: isPositive ? colors.forest[500] : colors.rust[600],
                  boxShadow: elevation.shadow.xl,
                  scale: interaction.hover.scaleSm,
                  duration: motionTokens.duration.normal / 1000, // Smoother timing
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  borderColor: isPositive ? colors.forest[300] : colors.rust[500],
                  boxShadow: elevation.shadow.lg,
                  scale: 1,
                  duration: motionTokens.duration.normal / 1000, // Smoother timing
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onTouchStart={(e) => {
              // Touch feedback for mobile
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  scale: interaction.active.scale,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onTouchEnd={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
          >
            <div 
              className="flex items-center"
              style={{ gap: spacing[2], marginBottom: spacing[3] }}
            >
              <TrendingUp style={{ 
                width: spacing[5], 
                height: spacing[5], 
                color: isPositive ? colors.forest[600] : colors.rust[600] 
              }} />
              <span 
                style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.bold,
                  color: isPositive ? colors.forest[700] : colors.rust[700],
                  textTransform: 'uppercase',
                  letterSpacing: typography.letterSpacing.widest,
                }}
              >
                Period Growth
              </span>
            </div>
            <div 
              style={{
                fontSize: `clamp(${typography.fontSize['4xl']}, 4vw, ${typography.fontSize['5xl']})`,
                fontFamily: typography.fontFamily.display,
                fontWeight: typography.fontWeight.bold,
                fontVariantNumeric: 'tabular-nums',
                marginBottom: spacing[1],
                color: growth === null 
                  ? colors.charcoal[400] 
                  : isPositive 
                    ? colors.forest[600] 
                    : colors.rust[600],
              }}
            >
              {growth !== null ? `${isPositive ? '+' : ''}${growth.toFixed(0)}%` : '—'}
            </div>
            <div 
              style={{
                fontSize: typography.fontSize.xs,
                color: colors.charcoal[500],
                fontWeight: typography.fontWeight.medium,
              }}
            >
              {previousRow ? `Since ${previousRow.year}` : 'Baseline'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Milestone card */}
      {activeRow?.milestoneTitle && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : motionTokens.duration.normal / 1000 }}
          style={{
            background: `linear-gradient(to right, ${colors.gold[50]}, ${colors.cream[50]})`,
            border: `${borders.width.medium}px solid ${colors.gold[300]}`,
            borderRadius: borders.radius.xl,
            padding: spacing[5],
            boxShadow: elevation.shadow.lg,
          }}
        >
          <div 
            className="flex items-start"
            style={{ gap: spacing[3] }}
          >
            <div 
              style={{
                padding: spacing[2] + spacing[1],
                backgroundColor: colors.gold[500],
                borderRadius: borders.radius.lg,
                boxShadow: elevation.shadow.md,
              }}
            >
              <Zap style={{ width: spacing[5], height: spacing[5], color: '#FFFFFF' }} />
            </div>
            <div className="flex-1">
              <h4 
                style={{
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.charcoal[900],
                  marginBottom: spacing[2] - spacing[1],
                }}
              >
                {activeRow.milestoneTitle}
              </h4>
              {activeRow.milestoneBody && (
                <p 
                  style={{
                    fontSize: typography.fontSize.xs,
                    color: colors.charcoal[700],
                    lineHeight: typography.lineHeight.relaxed,
                  }}
                >
                  {activeRow.milestoneBody}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Total growth badge */}
      {totalGrowth !== null && (
        <motion.div 
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: shouldReduceMotion ? 0 : motionTokens.duration.normal / 1000, 
            delay: shouldReduceMotion ? 0 : motionTokens.delay.long / 1000 
          }}
          style={{
            gap: spacing[2],
            padding: spacing[4],
            backgroundColor: colors.forest[50],
            border: `${borders.width.medium}px solid ${colors.forest[200]}`,
            borderRadius: borders.radius.lg,
            boxShadow: elevation.shadow.sm,
            transform: 'translateZ(0)',
          }}
        >
          <MapPin style={{ width: spacing[5], height: spacing[5], color: colors.forest[600] }} />
          <span 
            style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
              color: colors.forest[900],
            }}
          >
            <span style={{ color: colors.forest[600] }}>+{totalGrowth.toFixed(0)}%</span> total growth since 1900
          </span>
        </motion.div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// DECADE JUMPER
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
    <div 
      style={{
        backgroundColor: colors.semantic.bgCard,
        border: `${borders.width.medium}px solid ${colors.forest[200]}`,
        borderRadius: borders.radius.xl,
        padding: spacing[5],
        boxShadow: elevation.shadow.lg,
      }}
    >
      <div 
        className="flex items-center justify-between"
        style={{ marginBottom: spacing[4] }}
      >
        <h4 
          className="flex items-center"
          style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            color: colors.forest[900],
            gap: spacing[2],
          }}
        >
          <Clock style={{ width: spacing[4], height: spacing[4] }} />
          Jump to Decade
        </h4>
        <span 
          style={{
            fontSize: typography.fontSize.xs,
            color: colors.charcoal[500],
            fontWeight: typography.fontWeight.medium,
          }}
        >
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
            className="flex-shrink-0 snap-start font-bold transition-all"
            style={{
              padding: `${spacing[2] + spacing[1]}px ${spacing[5]}px`,
              borderRadius: borders.radius.lg,
              fontSize: typography.fontSize.sm,
                  transition: motionTokens.transition.normal,
                  transform: activeYear === row.year ? `scale(${interaction.hover.scaleMd}) translateZ(0)` : 'scale(1) translateZ(0)',
                  minHeight: '44px', // Better touch target
                  minWidth: '44px', // Better touch target
              ...(activeYear === row.year ? {
                background: `linear-gradient(to right, ${colors.forest[500]}, ${colors.forest[600]})`,
                color: '#FFFFFF',
                boxShadow: elevation.shadow.forest,
                border: 'none',
              } : {
                backgroundColor: colors.forest[50],
                color: colors.forest[700],
                border: `${borders.width.thin}px solid ${colors.forest[200]}`,
              }),
            }}
            onMouseEnter={(e) => {
              if (!shouldReduceMotion && activeYear !== row.year) {
                gsap.to(e.currentTarget, {
                  backgroundColor: colors.forest[100],
                  borderColor: colors.forest[300],
                  scale: interaction.hover.scaleSm,
                  duration: motionTokens.duration.normal / 1000, // Smoother timing
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!shouldReduceMotion && activeYear !== row.year) {
                gsap.to(e.currentTarget, {
                  backgroundColor: colors.forest[50],
                  borderColor: colors.forest[200],
                  scale: 1,
                  duration: motionTokens.duration.normal / 1000, // Smoother timing
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onTouchStart={(e) => {
              // Touch feedback for mobile
              if (!shouldReduceMotion && activeYear !== row.year) {
                gsap.to(e.currentTarget, {
                  scale: interaction.active.scale,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onTouchEnd={(e) => {
              if (!shouldReduceMotion && activeYear !== row.year) {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = `${interaction.focus.ringWidth}px solid ${interaction.focus.ringColor}`
              e.currentTarget.style.outlineOffset = `${interaction.focus.ringOffset}px`
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none'
            }}
          >
            {row.year}
          </button>
        ))}
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
          className="relative flex-shrink-0 whitespace-nowrap snap-start transition-all"
          style={{
            padding: `${spacing[3]}px ${spacing[5]}px`,
            borderRadius: borders.radius.lg,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            transition: motionTokens.transition.fast,
            transform: 'translateZ(0)',
            ...(activeIndex === index ? {
              background: `linear-gradient(to right, ${colors.forest[500]}, ${colors.forest[600]})`,
              color: '#FFFFFF',
              boxShadow: elevation.shadow.lg,
              border: 'none',
            } : {
              backgroundColor: colors.cream[100],
              color: colors.charcoal[700],
              border: `${borders.width.thin}px solid ${colors.charcoal[200]}`,
            }),
          }}
          onMouseEnter={(e) => {
            if (!shouldReduceMotion && activeIndex !== index) {
              gsap.to(e.currentTarget, {
                backgroundColor: colors.forest[50],
                borderColor: colors.forest[300],
                scale: interaction.hover.scaleSm,
                duration: motionTokens.duration.normal / 1000, // Smoother timing
                ease: motionTokens.easing.natural,
                force3D: true
              })
            }
          }}
          onMouseLeave={(e) => {
            if (!shouldReduceMotion && activeIndex !== index) {
              gsap.to(e.currentTarget, {
                backgroundColor: colors.cream[100],
                borderColor: colors.charcoal[200],
                scale: 1,
                duration: motionTokens.duration.normal / 1000, // Smoother timing
                ease: motionTokens.easing.natural,
                force3D: true
              })
            }
          }}
          onTouchStart={(e) => {
            // Touch feedback for mobile
            if (!shouldReduceMotion && activeIndex !== index) {
              gsap.to(e.currentTarget, {
                scale: interaction.active.scale,
                duration: motionTokens.duration.fast / 1000,
                ease: motionTokens.easing.natural,
                force3D: true
              })
            }
          }}
          onTouchEnd={(e) => {
            if (!shouldReduceMotion && activeIndex !== index) {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: motionTokens.duration.fast / 1000,
                ease: motionTokens.easing.natural,
                force3D: true
              })
            }
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = `${interaction.focus.ringWidth}px solid ${interaction.focus.ringColor}`
            e.currentTarget.style.outlineOffset = `${interaction.focus.ringOffset}px`
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
          }}
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
      transition={{ duration: shouldReduceMotion ? 0 : motionTokens.duration.fast / 1000 }}
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[4],
        transform: 'translateZ(0)',
      }}
    >
      <div 
        className="relative overflow-hidden"
        style={{
          borderRadius: borders.radius.xl,
          border: `${borders.width.medium}px solid ${colors.forest[300]}`,
          background: `linear-gradient(to bottom right, ${colors.forest[50]}, ${colors.semantic.bgCard})`,
          padding: spacing[5],
          boxShadow: elevation.shadow.lg,
        }}
      >
        <div 
          className="flex items-start"
          style={{ gap: spacing[3] }}
        >
          <Sparkles 
            style={{ 
              width: spacing[5], 
              height: spacing[5], 
              color: colors.forest[600],
              flexShrink: 0,
              marginTop: spacing[1] / 2,
            }} 
          />
          <p 
            style={{
              fontSize: typography.fontSize.sm,
              color: colors.charcoal[800],
              fontWeight: typography.fontWeight.medium,
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            {chapter.takeaway}
          </p>
        </div>
      </div>

      <div 
        className="grid grid-cols-2"
        style={{ gap: spacing[3] }}
      >
        {chapter.metricHighlights.slice(0, 2).map((metric, i) => (
          <div 
            key={i}
            className="rounded-xl transition-colors"
            style={{
              padding: spacing[4],
              background: `linear-gradient(to bottom right, ${colors.gold[50]}, ${colors.semantic.bgCard})`,
              border: `${borders.width.medium}px solid ${colors.gold[200]}`,
              boxShadow: elevation.shadow.sm,
              transform: 'translateZ(0)',
            }}
            onMouseEnter={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  borderColor: colors.gold[400],
                  scale: interaction.hover.scaleSm,
                  duration: motionTokens.duration.normal / 1000, // Smoother timing
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  borderColor: colors.gold[200],
                  scale: 1,
                  duration: motionTokens.duration.normal / 1000, // Smoother timing
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onTouchStart={(e) => {
              // Touch feedback for mobile
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  scale: interaction.active.scale,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
            onTouchEnd={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                  force3D: true
                })
              }
            }}
          >
            <div 
              style={{
                fontSize: typography.fontSize['2xl'],
                fontFamily: typography.fontFamily.display,
                fontWeight: typography.fontWeight.bold,
                color: colors.gold[600],
                marginBottom: spacing[1],
              }}
            >
              {metric.value}
            </div>
            <div 
              style={{
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.bold,
                color: colors.charcoal[700],
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.wide,
              }}
            >
              {metric.label}
            </div>
            {metric.note && (
              <div 
                style={{
                  fontSize: typography.fontSize.xs,
                  color: colors.charcoal[500],
                  marginTop: spacing[1],
                }}
              >
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

  // GSAP scroll animations - optimized for performance
  useEffect(() => {
    if (!isInView || shouldReduceMotion || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
      if (elements && elements.length > 0) {
        gsap.fromTo(elements,
          { opacity: 0, y: 30 }, // Reduced initial offset for smoother feel
          {
            opacity: 1,
            y: 0,
            duration: motionTokens.duration.slower / 1000,
            stagger: motionTokens.delay.short / 1000,
            ease: motionTokens.easing.smooth,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%', // Slightly later trigger for better timing
              end: 'bottom 20%',
              toggleActions: 'play none none reverse', // Reverse on scroll up
              markers: false, // Ensure markers are off in production
            },
            force3D: true, // GPU acceleration
            willChange: 'transform, opacity' // Hint browser for optimization
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isInView, shouldReduceMotion])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        paddingTop: spacing.section.paddingMobile,
        paddingBottom: spacing.section.paddingMobile,
        background: `linear-gradient(to bottom, ${colors.cream[50]}, ${colors.semantic.bgCard}, ${colors.cream[50]})`,
        zIndex: depth.content,
      }}
      aria-labelledby="data-story-heading"
    >
      {/* Decorative background elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.05 }}
      >
        <div 
          className="absolute rounded-full"
          style={{
            top: spacing[20],
            left: spacing[10],
            width: spacing[64],
            height: spacing[64],
            backgroundColor: colors.forest[500],
            filter: `blur(${blur['3xl']})`,
            transform: 'translateZ(0)',
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            bottom: spacing[20],
            right: spacing[10],
            width: spacing[96],
            height: spacing[96],
            backgroundColor: colors.gold[500],
            filter: `blur(${blur['3xl']})`,
            transform: 'translateZ(0)',
          }}
        />
      </div>

      <div 
        className="container mx-auto relative"
        style={{
          paddingLeft: spacing.container.paddingMobile,
          paddingRight: spacing.container.paddingMobile,
          maxWidth: grid.container['2xl'],
          zIndex: depth.content,
        }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16 animate-on-scroll"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: shouldReduceMotion ? 0 : motionTokens.duration.slower / 1000,
            ease: motionTokens.easing.smooth
          }}
        >
          <div 
            className="inline-flex items-center rounded-full"
            style={{
              gap: spacing[2],
              padding: `${spacing[2] + spacing[1]}px ${spacing[5]}px`,
              backgroundColor: colors.forest[100],
              color: colors.forest[700],
              marginBottom: spacing[6],
              boxShadow: elevation.shadow.sm,
            }}
          >
            <Mountain style={{ width: spacing[4], height: spacing[4] }} />
            <span 
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.bold,
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.widest,
              }}
            >
              Data & Demographics
            </span>
          </div>
          <h2 
            id="data-story-heading"
            style={{
              fontSize: typography.fontSize.h2,
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
              color: colors.charcoal[900],
              marginBottom: spacing[6],
            }}
          >
            {cityName} by the Numbers
          </h2>
          <p 
            style={{
              fontSize: `clamp(${typography.fontSize.lg}, 2vw, ${typography.fontSize.xl})`,
              color: colors.charcoal[600],
              maxWidth: spacing[48] * 3,
              margin: '0 auto',
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            From Gold Rush origins to modern gateway—explore {yearsOfData} years of growth through interactive data, 
            historical milestones, and civic insights.
          </p>
        </motion.div>

        {/* Quick Stats Banner */}
        <motion.div 
          className="animate-on-scroll"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: shouldReduceMotion ? 0 : motionTokens.duration.slower / 1000, 
            delay: shouldReduceMotion ? 0 : motionTokens.delay.medium / 1000 
          }}
          style={{
            background: `linear-gradient(to right, ${colors.forest[500]}, ${colors.forest[600]})`,
            borderRadius: borders.radius['2xl'],
            padding: `clamp(${spacing[8]}px, 4vw, ${spacing[10]}px)`,
            marginBottom: spacing[12],
            boxShadow: elevation.shadow['2xl'],
            transform: 'translateZ(0)',
          }}
        >
          <div 
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: spacing[6] }}
          >
            <div className="text-center">
              <div 
                style={{
                  fontSize: `clamp(${typography.fontSize['4xl']}, 4vw, ${typography.fontSize['5xl']})`,
                  fontFamily: typography.fontFamily.display,
                  fontWeight: typography.fontWeight.bold,
                  color: '#FFFFFF',
                  marginBottom: spacing[2],
                }}
              >
                {established}
              </div>
              <div 
                style={{
                  fontSize: typography.fontSize.sm,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                Founded
              </div>
            </div>
            <div className="text-center">
              <div 
                style={{
                  fontSize: `clamp(${typography.fontSize['4xl']}, 4vw, ${typography.fontSize['5xl']})`,
                  fontFamily: typography.fontFamily.display,
                  fontWeight: typography.fontWeight.bold,
                  color: '#FFFFFF',
                  marginBottom: spacing[2],
                }}
              >
                +{totalGrowth}%
              </div>
              <div 
                style={{
                  fontSize: typography.fontSize.sm,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                Total Growth
              </div>
            </div>
            <div className="text-center">
              <div 
                style={{
                  fontSize: `clamp(${typography.fontSize['4xl']}, 4vw, ${typography.fontSize['5xl']})`,
                  fontFamily: typography.fontFamily.display,
                  fontWeight: typography.fontWeight.bold,
                  color: '#FFFFFF',
                  marginBottom: spacing[2],
                }}
              >
                {data.length}
              </div>
              <div 
                style={{
                  fontSize: typography.fontSize.sm,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                Data Points
              </div>
            </div>
            <div className="text-center">
              <div 
                style={{
                  fontSize: `clamp(${typography.fontSize['4xl']}, 4vw, ${typography.fontSize['5xl']})`,
                  fontFamily: typography.fontFamily.display,
                  fontWeight: typography.fontWeight.bold,
                  color: '#FFFFFF',
                  marginBottom: spacing[2],
                }}
              >
                {chapters.length}
              </div>
              <div 
                style={{
                  fontSize: typography.fontSize.sm,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                Historical Eras
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Visualization Card */}
        <motion.div 
          className="animate-on-scroll"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ 
            duration: shouldReduceMotion ? 0 : motionTokens.duration.slower / 1000, 
            delay: shouldReduceMotion ? 0 : motionTokens.delay.long / 1000 
          }}
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[6],
            transform: 'translateZ(0)',
          }}
        >
          {/* Main card */}
          <div 
            style={{
              backgroundColor: colors.semantic.bgCard,
              borderRadius: borders.radius['2xl'],
              border: `${borders.width.medium}px solid ${colors.forest[300]}`,
              overflow: 'hidden',
              boxShadow: elevation.shadow['2xl'],
              transform: 'translateZ(0)',
            }}
          >
            {/* MOBILE: Stacked layout */}
            <div className="lg:hidden">
              <div 
            style={{
              padding: `clamp(${spacing[4]}px, 2vw, ${spacing[6]}px)`,
              background: `linear-gradient(to bottom right, ${colors.cream[50]}, ${colors.semantic.bgCard})`,
              borderBottom: `${borders.width.medium}px solid ${colors.forest[200]}`,
              transform: 'translateZ(0)', // GPU acceleration
            }}
              >
                <PremiumChart
                  data={data}
                  activeYear={activeYear}
                  hoveredYear={hoveredYear}
                  onYearClick={handleYearSelect}
                  onYearHover={setHoveredYear}
                />
              </div>
              
              <div 
                style={{
                  padding: spacing[4],
                  backgroundColor: colors.semantic.bgCard,
                  borderBottom: `${borders.width.medium}px solid ${colors.forest[100]}`,
                }}
              >
                <PremiumStatsPanel data={data} activeYear={activeYear} />
              </div>
              
              <div 
                style={{
                  padding: spacing[4],
                  backgroundColor: colors.semantic.bgCard,
                }}
              >
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
                        "rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2",
                        activeChapterIndex === 0
                          ? "text-charcoal-300 cursor-not-allowed opacity-50"
                          : "text-charcoal-600 hover:text-forest-600 hover:bg-forest-50 active:scale-95"
                      )}
                      style={{
                        padding: spacing[2],
                        minWidth: '44px', // Better touch target
                        minHeight: '44px', // Better touch target
                        transform: 'translateZ(0)', // GPU acceleration
                      }}
                      aria-label="Previous era"
                      aria-disabled={activeChapterIndex === 0}
                    >
                      <ChevronLeft style={{ width: spacing[4], height: spacing[4] }} />
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={activeChapterIndex === chapters.length - 1}
                      type="button"
                      className={cn(
                        "rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2",
                        activeChapterIndex === chapters.length - 1
                          ? "text-charcoal-300 cursor-not-allowed opacity-50"
                          : "text-charcoal-600 hover:text-forest-600 hover:bg-forest-50 active:scale-95"
                      )}
                      style={{
                        padding: spacing[2],
                        minWidth: '44px', // Better touch target
                        minHeight: '44px', // Better touch target
                        transform: 'translateZ(0)', // GPU acceleration
                      }}
                      aria-label="Next era"
                      aria-disabled={activeChapterIndex === chapters.length - 1}
                    >
                      <ChevronRight style={{ width: spacing[4], height: spacing[4] }} />
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
            <div 
              className="hidden lg:grid lg:grid-cols-5"
              style={{
                borderLeft: 'none',
                borderRight: 'none',
              }}
            >
              <div 
                className="lg:col-span-3"
                style={{
                  padding: spacing[8],
                  background: `linear-gradient(to bottom right, ${colors.cream[50]}, ${colors.semantic.bgCard})`,
                  borderRight: `${borders.width.medium}px solid ${colors.forest[200]}`,
                }}
              >
                <div style={{ marginBottom: spacing[8] }}>
                  <PremiumChart
                    data={data}
                    activeYear={activeYear}
                    hoveredYear={hoveredYear}
                    onYearClick={handleYearSelect}
                    onYearHover={setHoveredYear}
                  />
                </div>
                <PremiumStatsPanel data={data} activeYear={activeYear} />
              </div>

              <div 
                className="lg:col-span-2"
                style={{
                  padding: spacing[8],
                  backgroundColor: colors.semantic.bgCard,
                }}
              >
                <div className="flex items-center justify-between mb-6">
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
                        "rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2",
                        activeChapterIndex === 0
                          ? "text-charcoal-300 cursor-not-allowed opacity-50"
                          : "text-charcoal-600 hover:text-forest-600 hover:bg-forest-50 active:scale-95"
                      )}
                      style={{
                        padding: spacing[2],
                        minWidth: '44px', // Better touch target
                        minHeight: '44px', // Better touch target
                        transform: 'translateZ(0)', // GPU acceleration
                      }}
                      aria-label="Previous era"
                      aria-disabled={activeChapterIndex === 0}
                    >
                      <ChevronLeft style={{ width: spacing[5], height: spacing[5] }} />
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={activeChapterIndex === chapters.length - 1}
                      type="button"
                      className={cn(
                        "rounded-lg transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2",
                        activeChapterIndex === chapters.length - 1
                          ? "text-charcoal-300 cursor-not-allowed opacity-50"
                          : "text-charcoal-600 hover:text-forest-600 hover:bg-forest-50 active:scale-95"
                      )}
                      style={{
                        padding: spacing[2],
                        minWidth: '44px', // Better touch target
                        minHeight: '44px', // Better touch target
                        transform: 'translateZ(0)', // GPU acceleration
                      }}
                      aria-label="Next era"
                      aria-disabled={activeChapterIndex === chapters.length - 1}
                    >
                      <ChevronRight style={{ width: spacing[5], height: spacing[5] }} />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <ChapterSelector
                    chapters={chapters}
                    activeIndex={activeChapterIndex}
                    onSelect={handleChapterSelect}
                  />
                </div>

                <div className="mb-6">
                  <div className="text-xs font-bold text-forest-600 uppercase tracking-widest mb-1">
                    {activeChapter.startYear}–{activeChapter.endYear}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-charcoal-900">
                    {activeChapter.title}
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  <ChapterPanel key={activeChapter.id} chapter={activeChapter} />
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Decade jumper */}
          <div className="hidden md:block">
            <DecadeJumper 
              data={data} 
              activeYear={activeYear} 
              onYearSelect={handleYearSelect}
            />
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="animate-on-scroll"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            delay: shouldReduceMotion ? 0 : motionTokens.delay.long / 1000 
          }}
          style={{
            marginTop: spacing[16],
            backgroundColor: colors.semantic.bgCard,
            borderRadius: borders.radius['2xl'],
            border: `${borders.width.medium}px solid ${colors.gold[200]}`,
            overflow: 'hidden',
            boxShadow: elevation.shadow.xl,
            transform: 'translateZ(0)',
          }}
        >
          <div 
            className="text-center"
            style={{
              padding: `clamp(${spacing[10]}px, 4vw, ${spacing[12]}px)`,
            }}
          >
            <Sparkles 
              style={{ 
                width: spacing[14], 
                height: spacing[14], 
                color: colors.gold[500],
                margin: `0 auto ${spacing[6]}px`,
              }} 
            />
            <h3 
              style={{
                fontSize: typography.fontSize.h3,
                fontFamily: typography.fontFamily.display,
                fontWeight: typography.fontWeight.bold,
                color: colors.charcoal[900],
                marginBottom: spacing[4],
              }}
            >
              Want the Full Story?
            </h3>
            <p 
              style={{
                color: colors.charcoal[600],
                marginBottom: spacing[8],
                maxWidth: spacing[20] * 2,
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: typography.fontSize.lg,
              }}
            >
              Dive deeper into Auburn's demographic evolution with detailed methodology, 
              data sources, accessibility information, and expanded historical context.
            </p>
            <div 
              className="flex flex-col sm:flex-row justify-center"
              style={{ gap: spacing[4] }}
            >
              <Link
                href="/discover/auburn-data"
                className="inline-flex items-center justify-center group"
                style={{
                  gap: spacing[2],
                  padding: `${spacing[4]}px ${spacing[10]}px`,
                  borderRadius: borders.radius.xl,
                  background: `linear-gradient(to right, ${colors.forest[500]}, ${colors.forest[600]})`,
                  color: '#FFFFFF',
                  fontWeight: typography.fontWeight.bold,
                  fontSize: typography.fontSize.lg,
                  boxShadow: elevation.shadow.lg,
                  transform: 'translateZ(0)',
                  transition: motionTokens.transition.normal,
                }}
                onMouseEnter={(e) => {
                  if (!shouldReduceMotion) {
                    gsap.to(e.currentTarget, {
                      background: `linear-gradient(to right, ${colors.forest[600]}, ${colors.forest[700]})`,
                      scale: interaction.hover.scaleMd,
                      boxShadow: elevation.shadow.xl,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                      force3D: true
                    })
                    gsap.to(e.currentTarget.querySelector('svg'), {
                      x: spacing[1],
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                      force3D: true
                    })
                  }
                }}
                onMouseLeave={(e) => {
                  if (!shouldReduceMotion) {
                    gsap.to(e.currentTarget, {
                      background: `linear-gradient(to right, ${colors.forest[500]}, ${colors.forest[600]})`,
                      scale: 1,
                      boxShadow: elevation.shadow.lg,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                      force3D: true
                    })
                    gsap.to(e.currentTarget.querySelector('svg'), {
                      x: 0,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                      force3D: true
                    })
                  }
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `${interaction.focus.ringWidth}px solid ${interaction.focus.ringColor}`
                  e.currentTarget.style.outlineOffset = `${interaction.focus.ringOffset}px`
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none'
                }}
              >
                <span>Explore Full Data Story</span>
                <ArrowRight style={{ width: spacing[5], height: spacing[5] }} />
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center justify-center"
                style={{
                  gap: spacing[2],
                  padding: `${spacing[4]}px ${spacing[10]}px`,
                  borderRadius: borders.radius.xl,
                  border: `${borders.width.medium}px solid ${colors.forest[300]}`,
                  color: colors.forest[700],
                  fontWeight: typography.fontWeight.bold,
                  fontSize: typography.fontSize.lg,
                  transform: 'translateZ(0)',
                  transition: motionTokens.transition.normal,
                }}
                onMouseEnter={(e) => {
                  if (!shouldReduceMotion) {
                    gsap.to(e.currentTarget, {
                      backgroundColor: colors.forest[50],
                      borderColor: colors.forest[500],
                      scale: interaction.hover.scaleSm,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                      force3D: true
                    })
                  }
                }}
                onMouseLeave={(e) => {
                  if (!shouldReduceMotion) {
                    gsap.to(e.currentTarget, {
                      backgroundColor: 'transparent',
                      borderColor: colors.forest[300],
                      scale: 1,
                  duration: motionTokens.duration.fast / 1000,
                  ease: motionTokens.easing.natural,
                      force3D: true
                    })
                  }
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `${interaction.focus.ringWidth}px solid ${interaction.focus.ringColor}`
                  e.currentTarget.style.outlineOffset = `${interaction.focus.ringOffset}px`
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none'
                }}
              >
                <span>Discover Auburn</span>
              </Link>
            </div>
          </div>
          
          <div 
            style={{
              backgroundColor: colors.cream[50],
              padding: `${spacing[5]}px ${spacing[8]}px`,
              borderTop: `${borders.width.thin}px solid ${colors.gold[200]}`,
            }}
          >
            <p 
              className="text-center"
              style={{
                fontSize: typography.fontSize.xs,
                color: colors.charcoal[500],
              }}
            >
              <strong style={{ color: colors.charcoal[700] }}>Data Sources:</strong> U.S. Census Bureau • California Department of Finance • Placer County Records
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
