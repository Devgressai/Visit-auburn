/**
 * Population Chart - Accessible Interactive Visualization
 * 
 * A fully accessible SVG chart with keyboard navigation, screen reader support,
 * and coordinated state management.
 * 
 * Accessibility Features:
 * - Keyboard navigable (Tab, Arrow keys, Enter, Space)
 * - Screen reader announcements (ARIA live regions)
 * - Focus indicators (not just hover)
 * - Non-color-dependent visual cues (size, stroke, patterns)
 * - Accessible tooltips (keyboard + mouse)
 * 
 * Interactions:
 * - Hover point → setHoveredYear
 * - Click point → setActiveYear
 * - Focus point → show tooltip
 * - Arrow keys → navigate between points
 */

'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useStoryStore } from './storyStore'
import type { CityThroughTimeRow } from '@/lib/data/cityThroughTime'
import { cn } from '@/lib/utils'

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface PopulationChartProps {
  data: CityThroughTimeRow[]
  width?: number
  height?: number
  className?: string
  showLegend?: boolean
  showGrid?: boolean
  showAxes?: boolean
}

interface ChartPoint {
  year: number
  city: number
  county?: number
  state?: number
  x: number
  y: number
}

interface TooltipData {
  year: number
  city: number
  county?: number
  state?: number
  x: number
  y: number
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Linear scale function (like d3.scaleLinear)
 */
function createScale(
  domain: [number, number],
  range: [number, number]
): (value: number) => number {
  const [d0, d1] = domain
  const [r0, r1] = range
  const scale = (r1 - r0) / (d1 - d0)
  
  return (value: number) => {
    return r0 + (value - d0) * scale
  }
}

/**
 * Format large numbers with K/M suffixes
 */
function formatCompact(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toLocaleString()
}

/**
 * Format number with full locale formatting
 */
function formatFull(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

/**
 * Get nice tick values for axis
 */
function getNiceTicks(min: number, max: number, count: number = 5): number[] {
  const range = max - min
  const roughStep = range / (count - 1)
  
  // Round to nice number
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)))
  const normalized = roughStep / magnitude
  
  let niceStep: number
  if (normalized < 1.5) niceStep = magnitude
  else if (normalized < 3) niceStep = 2 * magnitude
  else if (normalized < 7) niceStep = 5 * magnitude
  else niceStep = 10 * magnitude
  
  const niceMin = Math.floor(min / niceStep) * niceStep
  const niceMax = Math.ceil(max / niceStep) * niceStep
  
  const ticks: number[] = []
  for (let i = niceMin; i <= niceMax; i += niceStep) {
    ticks.push(i)
  }
  
  return ticks
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function PopulationChart({
  data,
  width = 800,
  height = 400,
  className = '',
  showLegend = true,
  showGrid = true,
  showAxes = true,
}: PopulationChartProps) {
  const {
    activeYear,
    hoveredYear,
    compareMode,
    setActiveYear,
    setHoveredYear,
    formatPopulation,
  } = useStoryStore()

  const shouldReduceMotion = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null)
  const [dimensions, setDimensions] = useState({ width, height })

  // ─────────────────────────────────────────────────────────────────────────
  // RESPONSIVE SIZING
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!svgRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w } = entry.contentRect
        setDimensions({
          width: w,
          height: Math.max(300, Math.min(400, w * 0.5)), // Maintain aspect ratio
        })
      }
    })

    resizeObserver.observe(svgRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  // ─────────────────────────────────────────────────────────────────────────
  // CHART CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────

  const chartData = useMemo(() => {
    const margin = { top: 20, right: 20, bottom: 60, left: 70 }
    const chartWidth = dimensions.width - margin.left - margin.right
    const chartHeight = dimensions.height - margin.top - margin.bottom

    // Get data ranges
    const years = data.map(d => d.year)
    const cityValues = data.map(d => d.city)
    const countyValues = data.map(d => d.county).filter((v): v is number => v !== undefined)
    const stateValues = data.map(d => d.state).filter((v): v is number => v !== undefined)

    // Determine max value based on compare mode
    let maxValue = Math.max(...cityValues)
    if (compareMode === 'county' && countyValues.length > 0) {
      maxValue = Math.max(maxValue, ...countyValues)
    }
    if (compareMode === 'state' && stateValues.length > 0) {
      // State values are much larger, scale differently
      maxValue = Math.max(maxValue, ...countyValues)
    }

    // Create scales
    const xScale = createScale(
      [Math.min(...years), Math.max(...years)],
      [0, chartWidth]
    )

    const yScale = createScale(
      [0, maxValue * 1.1], // Add 10% padding
      [chartHeight, 0] // Inverted for SVG coordinates
    )

    // Generate chart points
    const points: ChartPoint[] = data.map(d => ({
      year: d.year,
      city: d.city,
      county: d.county,
      state: d.state,
      x: xScale(d.year),
      y: yScale(d.city),
    }))

    // Generate axis ticks
    const yTicks = getNiceTicks(0, maxValue * 1.1, 5)
    const xTicks = years.filter((_, i) => i % 2 === 0) // Every other year

    return {
      points,
      margin,
      chartWidth,
      chartHeight,
      xScale,
      yScale,
      yTicks,
      xTicks,
      maxValue,
    }
  }, [data, dimensions, compareMode])

  // ─────────────────────────────────────────────────────────────────────────
  // KEYBOARD NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const { points } = chartData

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        setActiveYear(points[index].year)
        break

      case 'ArrowRight':
        e.preventDefault()
        if (index < points.length - 1) {
          setFocusedIndex(index + 1)
          setHoveredYear(points[index + 1].year)
        }
        break

      case 'ArrowLeft':
        e.preventDefault()
        if (index > 0) {
          setFocusedIndex(index - 1)
          setHoveredYear(points[index - 1].year)
        }
        break

      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        setHoveredYear(points[0].year)
        break

      case 'End':
        e.preventDefault()
        setFocusedIndex(points.length - 1)
        setHoveredYear(points[points.length - 1].year)
        break

      case 'Escape':
        e.preventDefault()
        setFocusedIndex(null)
        setHoveredYear(null)
        setTooltipData(null)
        break
    }
  }, [chartData, setActiveYear, setHoveredYear])

  // ─────────────────────────────────────────────────────────────────────────
  // POINT INTERACTIONS
  // ─────────────────────────────────────────────────────────────────────────

  const handlePointClick = useCallback((year: number) => {
    setActiveYear(year)
  }, [setActiveYear])

  const handlePointHover = useCallback((point: ChartPoint | null) => {
    if (point) {
      setHoveredYear(point.year)
      setTooltipData({
        year: point.year,
        city: point.city,
        county: point.county,
        state: point.state,
        x: point.x + chartData.margin.left,
        y: point.y + chartData.margin.top,
      })
    } else {
      setHoveredYear(null)
      setTooltipData(null)
    }
  }, [setHoveredYear, chartData.margin])

  const handlePointFocus = useCallback((point: ChartPoint, index: number) => {
    setFocusedIndex(index)
    setHoveredYear(point.year)
    setTooltipData({
      year: point.year,
      city: point.city,
      county: point.county,
      state: point.state,
      x: point.x + chartData.margin.left,
      y: point.y + chartData.margin.top,
    })
  }, [setHoveredYear, chartData.margin])

  const handlePointBlur = useCallback(() => {
    if (focusedIndex === null) {
      setTooltipData(null)
    }
  }, [focusedIndex])

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  const { points, margin, chartWidth, chartHeight, yScale, yTicks, xTicks } = chartData

  return (
    <div className={cn('relative', className)}>
      {/* Chart Container */}
      <svg
        ref={svgRef}
        width="100%"
        height={dimensions.height}
        role="img"
        aria-label="Population over time line chart"
        className="overflow-visible"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid Lines */}
          {showGrid && (
            <g className="grid" aria-hidden="true">
              {yTicks.map((tick) => (
                <line
                  key={tick}
                  x1={0}
                  y1={yScale(tick)}
                  x2={chartWidth}
                  y2={yScale(tick)}
                  stroke="#E5E5E5"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              ))}
            </g>
          )}

          {/* Y Axis */}
          {showAxes && (
            <g className="y-axis">
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={chartHeight}
                stroke="#525252"
                strokeWidth="2"
              />
              {yTicks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={-5}
                    y1={yScale(tick)}
                    x2={0}
                    y2={yScale(tick)}
                    stroke="#525252"
                    strokeWidth="2"
                  />
                  <text
                    x={-10}
                    y={yScale(tick)}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="text-xs fill-charcoal-600 font-medium"
                  >
                    {formatCompact(tick)}
                  </text>
                </g>
              ))}
              <text
                x={-50}
                y={chartHeight / 2}
                textAnchor="middle"
                transform={`rotate(-90, -50, ${chartHeight / 2})`}
                className="text-sm fill-charcoal-700 font-semibold"
              >
                Population
              </text>
            </g>
          )}

          {/* X Axis */}
          {showAxes && (
            <g className="x-axis">
              <line
                x1={0}
                y1={chartHeight}
                x2={chartWidth}
                y2={chartHeight}
                stroke="#525252"
                strokeWidth="2"
              />
              {xTicks.map((year) => {
                const x = points.find(p => p.year === year)?.x || 0
                return (
                  <g key={year}>
                    <line
                      x1={x}
                      y1={chartHeight}
                      x2={x}
                      y2={chartHeight + 5}
                      stroke="#525252"
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={chartHeight + 20}
                      textAnchor="middle"
                      className="text-xs fill-charcoal-600 font-medium"
                    >
                      {year}
                    </text>
                  </g>
                )
              })}
              <text
                x={chartWidth / 2}
                y={chartHeight + 45}
                textAnchor="middle"
                className="text-sm fill-charcoal-700 font-semibold"
              >
                Year
              </text>
            </g>
          )}

          {/* City Line */}
          <motion.path
            d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke="#2D5A27"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldReduceMotion ? {} : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />

          {/* County Line (if enabled) */}
          {compareMode !== 'city' && points.every(p => p.county !== undefined) && (
            <motion.path
              d={`M ${points.map(p => `${p.x},${yScale(p.county!)}`).join(' L ')}`}
              fill="none"
              stroke="#4BA3C7"
              strokeWidth="2"
              strokeDasharray="5,5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={shouldReduceMotion ? {} : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
            />
          )}

          {/* Data Points */}
          <g className="data-points">
            {points.map((point, index) => {
              const isActive = point.year === activeYear
              const isHovered = point.year === hoveredYear
              const isFocused = index === focusedIndex

              return (
                <g key={point.year}>
                  {/* Larger hit area for accessibility */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={20}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePointClick(point.year)}
                    onMouseEnter={() => handlePointHover(point)}
                    onMouseLeave={() => handlePointHover(null)}
                  />

                  {/* Visual point */}
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? 10 : isHovered || isFocused ? 7 : 5}
                    fill={isActive ? '#D4A017' : '#2D5A27'}
                    stroke={isActive ? '#B8860B' : isHovered || isFocused ? '#1F6B4D' : 'none'}
                    strokeWidth={isActive ? 3 : 2}
                    tabIndex={0}
                    role="button"
                    aria-label={`${point.year}: Population ${formatPopulation(point.city)}`}
                    aria-pressed={isActive}
                    onFocus={() => handlePointFocus(point, index)}
                    onBlur={handlePointBlur}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={cn(
                      'transition-all cursor-pointer',
                      'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2'
                    )}
                    animate={{
                      scale: isActive ? 1.2 : isHovered || isFocused ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <title>{`${point.year}: ${formatPopulation(point.city)}`}</title>
                  </motion.circle>

                  {/* Active indicator (non-color cue) */}
                  {isActive && (
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r={15}
                      fill="none"
                      stroke="#D4A017"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </g>
              )
            })}
          </g>
        </g>
      </svg>

      {/* Accessible Tooltip */}
      <AnimatePresence>
        {tooltipData && (
          <ChartTooltip
            data={tooltipData}
            compareMode={compareMode}
            formatPopulation={formatPopulation}
          />
        )}
      </AnimatePresence>

      {/* Legend */}
      {showLegend && (
        <ChartLegend compareMode={compareMode} />
      )}

      {/* Screen Reader Announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {activeYear && `Active year: ${activeYear}`}
        {hoveredYear && hoveredYear !== activeYear && `, Hovering: ${hoveredYear}`}
      </div>

      {/* Keyboard Instructions */}
      <div className="sr-only" id="chart-instructions">
        Use Tab to navigate between data points. 
        Press Enter or Space to select a year. 
        Use Arrow keys to move between points. 
        Press Escape to clear selection.
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// TOOLTIP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function ChartTooltip({
  data,
  compareMode,
  formatPopulation,
}: {
  data: TooltipData
  compareMode: 'city' | 'county' | 'state'
  formatPopulation: (n: number | undefined) => string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="absolute z-50 pointer-events-none"
      style={{
        left: data.x + 15,
        top: data.y - 10,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg border-2 border-gold-500 p-4 min-w-[200px]">
        <div className="font-display text-lg font-bold text-charcoal-900 mb-2">
          {data.year}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-forest-500" />
              <span className="text-sm text-charcoal-700">City</span>
            </div>
            <span className="text-sm font-semibold text-charcoal-900">
              {formatPopulation(data.city)}
            </span>
          </div>

          {compareMode !== 'city' && data.county && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-lake-400 border-2 border-lake-600" />
                <span className="text-sm text-charcoal-700">County</span>
              </div>
              <span className="text-sm font-semibold text-charcoal-900">
                {formatPopulation(data.county)}
              </span>
            </div>
          )}

          {compareMode === 'state' && data.state && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rust-400" />
                <span className="text-sm text-charcoal-700">State</span>
              </div>
              <span className="text-sm font-semibold text-charcoal-900">
                {formatPopulation(data.state)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// LEGEND COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function ChartLegend({
  compareMode,
}: {
  compareMode: 'city' | 'county' | 'state'
}) {
  return (
    <div 
      className="flex flex-wrap items-center justify-center gap-4 mt-4"
      role="list"
      aria-label="Chart legend"
    >
      <div className="flex items-center gap-2" role="listitem">
        <div className="w-4 h-4 rounded-full bg-forest-500" />
        <span className="text-sm font-medium text-charcoal-700">City</span>
      </div>

      {compareMode !== 'city' && (
        <div className="flex items-center gap-2" role="listitem">
          <div className="w-4 h-1 bg-lake-400 rounded" />
          <span className="text-sm font-medium text-charcoal-700">County</span>
        </div>
      )}

      {compareMode === 'state' && (
        <div className="flex items-center gap-2" role="listitem">
          <div className="w-4 h-4 rounded-full bg-rust-400" />
          <span className="text-sm font-medium text-charcoal-700">State</span>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export { ChartTooltip, ChartLegend, formatCompact, formatFull, getNiceTicks, createScale }

