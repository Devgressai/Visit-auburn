'use client'

/**
 * Auburn Data Teaser - Homepage Interactive Section
 * 
 * A compact, self-contained interactive data experience that fits
 * in a single viewport. Users can explore Auburn's population history
 * without scrolling - everything is accessible in one organized panel.
 */

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { 
  TrendingUp, 
  Users, 
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ═══════════════════════════════════════════════════════════════════════════
// DATA - Auburn population through time (condensed for homepage)
// ═══════════════════════════════════════════════════════════════════════════

interface DataPoint {
  year: number
  population: number
  milestone?: string
}

const auburnData: DataPoint[] = [
  { year: 1880, population: 1800, milestone: 'Railroad arrives' },
  { year: 1900, population: 2200 },
  { year: 1920, population: 3500, milestone: 'Highway 40 opens' },
  { year: 1940, population: 4800 },
  { year: 1960, population: 6100, milestone: 'I-80 construction begins' },
  { year: 1980, population: 8500, milestone: 'Tech boom begins' },
  { year: 2000, population: 12500 },
  { year: 2020, population: 15000, milestone: 'Remote work migration' },
]

// ═══════════════════════════════════════════════════════════════════════════
// MINI CHART COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function MiniChart({ 
  data, 
  selectedIndex, 
  onSelectIndex 
}: { 
  data: DataPoint[]
  selectedIndex: number
  onSelectIndex: (index: number) => void
}) {
  const shouldReduceMotion = useReducedMotion()
  
  // Calculate chart dimensions
  const maxPop = Math.max(...data.map(d => d.population))
  const minPop = Math.min(...data.map(d => d.population))
  const range = maxPop - minPop
  
  return (
    <div className="relative h-48 flex items-end justify-between gap-1 px-2">
      {data.map((point, index) => {
        const heightPercent = ((point.population - minPop) / range) * 80 + 20
        const isSelected = index === selectedIndex
        const hasMilestone = !!point.milestone
        
        return (
          <button
            key={point.year}
            onClick={() => onSelectIndex(index)}
            className={cn(
              "relative flex-1 rounded-t-lg transition-all duration-300",
              "focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-charcoal-900",
              "group cursor-pointer",
              isSelected 
                ? "bg-gold-500" 
                : hasMilestone 
                  ? "bg-pine-500/70 hover:bg-pine-400/80" 
                  : "bg-white/20 hover:bg-white/30"
            )}
            style={{ height: `${heightPercent}%` }}
            aria-label={`${point.year}: ${point.population.toLocaleString()} residents${point.milestone ? ` - ${point.milestone}` : ''}`}
            aria-pressed={isSelected}
          >
            {/* Year label */}
            <span className={cn(
              "absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap",
              isSelected ? "text-gold-400" : "text-white/50"
            )}>
              {point.year}
            </span>
            
            {/* Hover tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isSelected ? 1 : 0, y: isSelected ? 0 : 10 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none"
            >
              <div className="bg-charcoal-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                {point.population.toLocaleString()}
              </div>
            </motion.div>
            
            {/* Milestone indicator */}
            {hasMilestone && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold-400" />
            )}
          </button>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// STATS DISPLAY
// ═══════════════════════════════════════════════════════════════════════════

function StatsDisplay({ 
  currentData, 
  previousData 
}: { 
  currentData: DataPoint
  previousData: DataPoint | null
}) {
  const growth = previousData 
    ? ((currentData.population - previousData.population) / previousData.population * 100).toFixed(0)
    : null

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Population */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
          <Users className="w-4 h-4" />
          <span>Population</span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white font-display">
          {currentData.population.toLocaleString()}
        </div>
      </div>
      
      {/* Growth */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
          <TrendingUp className="w-4 h-4" />
          <span>Growth</span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white font-display">
          {growth ? (
            <span className={Number(growth) >= 0 ? "text-pine-400" : "text-red-400"}>
              {Number(growth) >= 0 ? '+' : ''}{growth}%
            </span>
          ) : (
            <span className="text-white/40">—</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function AuburnDataTeaser() {
  const [selectedIndex, setSelectedIndex] = useState(auburnData.length - 1)
  const shouldReduceMotion = useReducedMotion()
  
  const currentData = auburnData[selectedIndex]
  const previousData = selectedIndex > 0 ? auburnData[selectedIndex - 1] : null
  
  // Navigation handlers
  const goToPrevious = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1)
  }
  
  const goToNext = () => {
    if (selectedIndex < auburnData.length - 1) setSelectedIndex(selectedIndex + 1)
  }

  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      aria-labelledby="data-teaser-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-pine-900" />
      
      {/* Decorative grid */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        {/* Compact card container */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="bg-charcoal-800/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gold-500/20">
                  <BarChart3 className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h2 
                    id="data-teaser-heading"
                    className="text-lg md:text-xl font-bold text-white"
                  >
                    Auburn Through Time
                  </h2>
                  <p className="text-sm text-white/60">
                    140 years of Gold Country growth
                  </p>
                </div>
              </div>
              
              <Link
                href="/discover/auburn-data"
                className={cn(
                  "hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg",
                  "text-sm font-medium text-gold-400",
                  "hover:bg-gold-500/10 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-gold-400"
                )}
              >
                <span>Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Main content */}
            <div className="p-6 space-y-6">
              {/* Stats row */}
              <StatsDisplay 
                currentData={currentData} 
                previousData={previousData} 
              />

              {/* Chart */}
              <div className="pt-4 pb-8">
                <MiniChart 
                  data={auburnData}
                  selectedIndex={selectedIndex}
                  onSelectIndex={setSelectedIndex}
                />
              </div>

              {/* Milestone display */}
              <div className="flex items-center justify-between gap-4">
                {/* Navigation buttons */}
                <button
                  onClick={goToPrevious}
                  disabled={selectedIndex === 0}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-gold-400",
                    selectedIndex === 0
                      ? "text-white/20 cursor-not-allowed"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                  aria-label="Previous year"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Year and milestone */}
                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center gap-2 text-gold-400 font-display text-2xl font-bold">
                    <Calendar className="w-5 h-5" />
                    <span>{currentData.year}</span>
                  </div>
                  {currentData.milestone && (
                    <motion.p
                      key={currentData.milestone}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                      className="text-sm text-white/70 mt-1"
                    >
                      {currentData.milestone}
                    </motion.p>
                  )}
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={goToNext}
                  disabled={selectedIndex === auburnData.length - 1}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-gold-400",
                    selectedIndex === auburnData.length - 1
                      ? "text-white/20 cursor-not-allowed"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                  aria-label="Next year"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Footer CTA (mobile) */}
            <div className="px-6 py-4 border-t border-white/10 sm:hidden">
              <Link
                href="/discover/auburn-data"
                className={cn(
                  "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg",
                  "bg-gold-500 text-charcoal-900 font-semibold",
                  "hover:bg-gold-400 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-charcoal-800"
                )}
              >
                <span>Explore Full Data Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
