/**
 * Stats Panel - Contextual Data Display
 * 
 * A narrative-focused panel that displays detailed information about the
 * active or hovered year, including population, growth metrics, milestones,
 * and data sources.
 * 
 * Features:
 * - Count-up animation for population changes
 * - Preview state when hovering (subtle visual difference)
 * - Growth indicators (absolute and percentage)
 * - Milestone narrative display
 * - Source attribution with links
 * - Respects prefers-reduced-motion
 * - ARIA live region for screen readers
 */

'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Calendar,
  Users,
  BookOpen,
  ExternalLink,
  Info,
} from 'lucide-react'
import { useStoryStore } from './storyStore'
import type { CityThroughTimeRow } from '@/lib/data/cityThroughTime'
import { cn } from '@/lib/utils'

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface StatsPanelProps {
  data: CityThroughTimeRow[]
  className?: string
  showSources?: boolean
  showMilestone?: boolean
  showGrowth?: boolean
}

interface GrowthMetrics {
  absolute: number
  percentage: number
  isPositive: boolean
  isNeutral: boolean
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate growth metrics between two data points
 */
function calculateGrowth(
  current: number,
  previous: number | undefined
): GrowthMetrics | null {
  if (!previous || previous === 0) return null

  const absolute = current - previous
  const percentage = (absolute / previous) * 100

  return {
    absolute,
    percentage,
    isPositive: absolute > 0,
    isNeutral: absolute === 0,
  }
}

/**
 * Format growth percentage
 */
function formatGrowthPercentage(percentage: number): string {
  const sign = percentage >= 0 ? '+' : ''
  return `${sign}${percentage.toFixed(1)}%`
}

/**
 * Format absolute growth
 */
function formatAbsoluteGrowth(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${Math.abs(value).toLocaleString()}`
}

// ═══════════════════════════════════════════════════════════════════════════
// COUNT-UP ANIMATION HOOK
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Animates a number from previous value to current value
 */
function useCountUp(
  value: number,
  duration: number = 800,
  enabled: boolean = true
): number {
  const [displayValue, setDisplayValue] = useState(value)
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (!enabled) {
      setDisplayValue(value)
      return
    }

    const startValue = prevValueRef.current
    const endValue = value
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)
      
      const current = startValue + (endValue - startValue) * eased
      setDisplayValue(Math.round(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        prevValueRef.current = value
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration, enabled])

  return displayValue
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function StatsPanel({
  data,
  className = '',
  showSources = true,
  showMilestone = true,
  showGrowth = true,
}: StatsPanelProps) {
  const {
    activeYear,
    hoveredYear,
    getActiveRow,
    getHoveredRow,
    formatPopulation,
  } = useStoryStore()

  const shouldReduceMotion = useReducedMotion()
  const [lastAnnouncedYear, setLastAnnouncedYear] = useState<number | null>(null)

  // Determine which row to display (hovered takes precedence for preview)
  const isPreviewMode = hoveredYear !== null && hoveredYear !== activeYear
  const displayRow = isPreviewMode ? getHoveredRow(data) : getActiveRow(data)
  const displayYear = isPreviewMode ? hoveredYear : activeYear

  // Get previous row for growth calculation
  const currentIndex = data.findIndex(d => d.year === displayRow?.year)
  const previousRow = currentIndex > 0 ? data[currentIndex - 1] : undefined

  // Calculate growth metrics
  const growth = displayRow && previousRow 
    ? calculateGrowth(displayRow.city, previousRow.city)
    : null

  // Count-up animation for population
  const animatedPopulation = useCountUp(
    displayRow?.city || 0,
    shouldReduceMotion ? 0 : 800,
    !shouldReduceMotion
  )

  // Update ARIA announcement only when activeYear changes (not on hover)
  useEffect(() => {
    if (activeYear && activeYear !== lastAnnouncedYear) {
      setLastAnnouncedYear(activeYear)
    }
  }, [activeYear, lastAnnouncedYear])

  // If no data, show empty state
  if (!displayRow) {
    return (
      <div className={cn('bg-white rounded-2xl shadow-card p-8', className)}>
        <div className="text-center text-charcoal-600">
          <Info className="w-12 h-12 mx-auto mb-4 text-charcoal-400" />
          <p className="text-lg font-medium">Select a year to view details</p>
          <p className="text-sm mt-2">
            Click on a data point or chapter to explore
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('bg-white rounded-2xl shadow-card overflow-hidden', className)}>
      {/* Preview Banner */}
      <AnimatePresence>
        {isPreviewMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-lake-100 border-b border-lake-200 px-6 py-2"
          >
            <p className="text-sm font-medium text-lake-800 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Preview Mode - Click to select this year
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-8">
        {/* Year Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pine-500 to-pine-600 flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-charcoal-600">Year</div>
              <motion.div
                key={displayYear}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-black text-charcoal-900"
              >
                {displayYear}
              </motion.div>
            </div>
          </div>

          {isPreviewMode && (
            <div className="px-3 py-1 bg-lake-100 text-lake-700 text-xs font-semibold rounded-full">
              Preview
            </div>
          )}
        </div>

        {/* Population Display */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm font-semibold text-charcoal-600">
              Population
            </div>
          </div>

          <motion.div
            key={`pop-${displayYear}`}
            initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-5xl font-black text-charcoal-900 mb-2"
          >
            {shouldReduceMotion 
              ? formatPopulation(displayRow.city)
              : animatedPopulation.toLocaleString()
            }
          </motion.div>

          {/* Growth Indicator */}
          {showGrowth && growth && previousRow && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold',
                growth.isPositive && 'bg-green-100 text-green-800',
                !growth.isPositive && !growth.isNeutral && 'bg-red-100 text-red-800',
                growth.isNeutral && 'bg-gray-100 text-gray-800'
              )}
            >
              {growth.isPositive && <TrendingUp className="w-4 h-4" />}
              {!growth.isPositive && !growth.isNeutral && <TrendingDown className="w-4 h-4" />}
              {growth.isNeutral && <Minus className="w-4 h-4" />}
              
              <span>
                {formatAbsoluteGrowth(growth.absolute)}
              </span>
              <span className="opacity-75">
                ({formatGrowthPercentage(growth.percentage)})
              </span>
              <span className="text-xs opacity-60">
                vs {previousRow.year}
              </span>
            </motion.div>
          )}
        </div>

        {/* Milestone */}
        {showMilestone && (
          <motion.div
            key={`milestone-${displayYear}`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6 p-5 bg-gradient-to-br from-cream-50 to-gold-50 border border-gold-200 rounded-xl"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-2">
                  {displayRow.milestoneTitle}
                </h3>
                <p className="text-charcoal-700 leading-relaxed">
                  {displayRow.milestoneBody}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sources */}
        {showSources && displayRow.sources && displayRow.sources.length > 0 && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="border-t border-charcoal-100 pt-6"
          >
            <h4 className="text-sm font-semibold text-charcoal-600 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Data Sources
            </h4>
            <div className="flex flex-wrap gap-2">
              {displayRow.sources.map((source, index) => (
                <SourceChip
                  key={index}
                  label={source.label}
                  url={source.url}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ARIA Live Region - Only announces activeYear changes */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {activeYear === lastAnnouncedYear && displayRow && (
          `Year ${displayRow.year}, Population ${formatPopulation(displayRow.city)}. ${displayRow.milestoneTitle}.`
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SOURCE CHIP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function SourceChip({ 
  label, 
  url 
}: { 
  label: string
  url?: string 
}) {
  const content = (
    <>
      <span className="text-xs font-medium">{label}</span>
      {url && <ExternalLink className="w-3 h-3" />}
    </>
  )

  const baseClasses = cn(
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
    'border border-charcoal-200 bg-white',
    'text-charcoal-700 transition-all'
  )

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          baseClasses,
          'hover:border-lake-400 hover:bg-lake-50 hover:text-lake-700',
          'focus:outline-none focus:ring-2 focus:ring-lake-500 focus:ring-offset-2'
        )}
        aria-label={`View source: ${label}`}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={baseClasses}>
      {content}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPACT VARIANT (For smaller spaces)
// ═══════════════════════════════════════════════════════════════════════════

export function StatsPanelCompact({
  data,
  className = '',
}: {
  data: CityThroughTimeRow[]
  className?: string
}) {
  const {
    activeYear,
    hoveredYear,
    getActiveRow,
    getHoveredRow,
    formatPopulation,
  } = useStoryStore()

  const shouldReduceMotion = useReducedMotion()
  const isPreviewMode = hoveredYear !== null && hoveredYear !== activeYear
  const displayRow = isPreviewMode ? getHoveredRow(data) : getActiveRow(data)

  const animatedPopulation = useCountUp(
    displayRow?.city || 0,
    shouldReduceMotion ? 0 : 600,
    !shouldReduceMotion
  )

  if (!displayRow) {
    return (
      <div className={cn('bg-white rounded-lg shadow-sm p-4', className)}>
        <p className="text-sm text-charcoal-600 text-center">
          Select a year
        </p>
      </div>
    )
  }

  return (
    <div className={cn('bg-white rounded-lg shadow-sm p-4', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-charcoal-600">Year</span>
        <span className="text-2xl font-black text-charcoal-900">
          {displayRow.year}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-charcoal-600">Population</span>
        <span className="text-xl font-bold text-gold-600">
          {shouldReduceMotion 
            ? formatPopulation(displayRow.city)
            : animatedPopulation.toLocaleString()
          }
        </span>
      </div>
      {isPreviewMode && (
        <div className="mt-2 text-xs text-lake-600 text-center">
          Preview
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  calculateGrowth,
  formatGrowthPercentage,
  formatAbsoluteGrowth,
  useCountUp,
  SourceChip,
}

export type { StatsPanelProps, GrowthMetrics }

