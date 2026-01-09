/**
 * Story Store - Usage Examples
 * 
 * This file demonstrates how to use the StoryStore in various components
 * and patterns for interlinked data visualizations.
 */

'use client'

import { useEffect } from 'react'
import { 
  StoryStoreProvider, 
  useStoryStore,
  useActiveYear,
  useHoveredYear,
  useCompareMode,
} from './storyStore'
import { auburnThroughTimeData } from '@/lib/data/cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Basic Setup - Wrapping Your Component Tree
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Root component that provides the store to all children
 */
export function CityDataStorySection() {
  return (
    <StoryStoreProvider initialYear={2020} initialCompareMode="city">
      <div className="city-data-story">
        <StoryHeader />
        <InteractiveTimeline />
        <PopulationChart />
        <MilestoneCards />
        <ComparisonControls />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: Reading State - Display Active Year Info
// ═══════════════════════════════════════════════════════════════════════════

function StoryHeader() {
  const { activeYear, getActiveRow, formatPopulation } = useStoryStore()
  const data = auburnThroughTimeData
  const activeRow = getActiveRow(data)

  return (
    <header className="story-header">
      <h1>Auburn Through Time</h1>
      {activeRow ? (
        <div className="active-year-info">
          <h2>{activeRow.year}</h2>
          <p className="population">
            Population: {formatPopulation(activeRow.city)}
          </p>
          <p className="milestone">{activeRow.milestoneTitle}</p>
        </div>
      ) : (
        <p>Select a year to explore Auburn&apos;s history</p>
      )}
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Setting State - Interactive Timeline
// ═══════════════════════════════════════════════════════════════════════════

function InteractiveTimeline() {
  const { activeYear, hoveredYear, setActiveYear, setHoveredYear } = useStoryStore()
  const data = auburnThroughTimeData

  return (
    <div className="timeline">
      {data.map((row) => (
        <button
          key={row.year}
          className={`timeline-point ${activeYear === row.year ? 'active' : ''} ${hoveredYear === row.year ? 'hovered' : ''}`}
          onClick={() => setActiveYear(row.year)}
          onMouseEnter={() => setHoveredYear(row.year)}
          onMouseLeave={() => setHoveredYear(null)}
          aria-label={`${row.year}: ${row.milestoneTitle}`}
        >
          <span className="year">{row.year}</span>
          <span className="dot" />
        </button>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: Using Selectors - Population Chart with Series
// ═══════════════════════════════════════════════════════════════════════════

function PopulationChart() {
  const { compareMode, getSeries, activeYear, hoveredYear } = useStoryStore()
  const data = auburnThroughTimeData
  const series = getSeries(data, compareMode)

  return (
    <div className="chart-container">
      <svg width="800" height="400" role="img" aria-label="Population over time">
        {/* City line (always shown) */}
        <g className="city-line">
          {series.city.map((point, i) => {
            const isActive = point.year === activeYear
            const isHovered = point.year === hoveredYear
            
            return (
              <circle
                key={point.year}
                cx={i * 60}
                cy={400 - (point.value / 100)}
                r={isActive ? 8 : isHovered ? 6 : 4}
                fill={isActive ? '#D4A017' : '#2D5A27'}
                className="data-point"
              />
            )
          })}
        </g>

        {/* County line (if compare mode includes it) */}
        {series.county && (
          <g className="county-line">
            {series.county.map((point, i) => (
              <circle
                key={point.year}
                cx={i * 60}
                cy={400 - (point.value / 1000)}
                r={3}
                fill="#4BA3C7"
                opacity={0.6}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: Coordinated Highlighting - Milestone Cards
// ═══════════════════════════════════════════════════════════════════════════

function MilestoneCards() {
  const { hoveredYear, setActiveYear, setHoveredYear } = useStoryStore()
  const data = auburnThroughTimeData

  return (
    <div className="milestone-grid">
      {data.map((row) => (
        <article
          key={row.year}
          className={`milestone-card ${hoveredYear === row.year ? 'highlighted' : ''}`}
          onClick={() => setActiveYear(row.year)}
          onMouseEnter={() => setHoveredYear(row.year)}
          onMouseLeave={() => setHoveredYear(null)}
        >
          <time className="year">{row.year}</time>
          <h3>{row.milestoneTitle}</h3>
          <p>{row.milestoneBody}</p>
        </article>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: Mode Controls - Compare Mode Toggle
// ═══════════════════════════════════════════════════════════════════════════

function ComparisonControls() {
  const { compareMode, setCompareMode } = useStoryStore()

  return (
    <div className="comparison-controls" role="group" aria-label="Comparison mode">
      <button
        className={compareMode === 'city' ? 'active' : ''}
        onClick={() => setCompareMode('city')}
        aria-pressed={compareMode === 'city'}
      >
        City Only
      </button>
      <button
        className={compareMode === 'county' ? 'active' : ''}
        onClick={() => setCompareMode('county')}
        aria-pressed={compareMode === 'county'}
      >
        + County
      </button>
      <button
        className={compareMode === 'state' ? 'active' : ''}
        onClick={() => setCompareMode('state')}
        aria-pressed={compareMode === 'state'}
      >
        + State
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 7: Convenience Hooks - Simplified Components
// ═══════════════════════════════════════════════════════════════════════════

function YearSelector() {
  // Use convenience hook for cleaner code
  const { activeYear, setActiveYear } = useActiveYear()
  const data = auburnThroughTimeData

  return (
    <select 
      value={activeYear || ''} 
      onChange={(e) => setActiveYear(Number(e.target.value))}
      aria-label="Select year"
    >
      <option value="">Select a year</option>
      {data.map((row) => (
        <option key={row.year} value={row.year}>
          {row.year}
        </option>
      ))}
    </select>
  )
}

function HoverTooltip() {
  const { hoveredYear } = useHoveredYear()
  const { getHoveredRow, formatPopulation } = useStoryStore()
  const data = auburnThroughTimeData
  const hoveredRow = getHoveredRow(data)

  if (!hoveredRow) return null

  return (
    <div className="tooltip" role="tooltip">
      <strong>{hoveredRow.year}</strong>
      <p>Population: {formatPopulation(hoveredRow.city)}</p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 8: Advanced - Population Change Indicator
// ═══════════════════════════════════════════════════════════════════════════

function PopulationChangeIndicator() {
  const { activeYear, getActiveRow, formatPopulationChange } = useStoryStore()
  const data = auburnThroughTimeData
  const activeRow = getActiveRow(data)

  if (!activeRow) return null

  // Find previous decade
  const previousRow = data.find(d => d.year === activeRow.year - 10)
  if (!previousRow) return null

  const change = formatPopulationChange(activeRow.city, previousRow.city)

  return (
    <div className="population-change">
      <div className="current">{change.formatted}</div>
      <div className={`change ${change.isPositive ? 'positive' : 'negative'}`}>
        {change.changePercent}
        <span className="period">vs. {previousRow.year}</span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 9: Keyboard Navigation
// ═══════════════════════════════════════════════════════════════════════════

function KeyboardNavigableChart() {
  const { activeYear, setActiveYear, getYearRange } = useStoryStore()
  const data = auburnThroughTimeData
  const yearRange = getYearRange(data)

  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      if (!activeYear || !yearRange) return

      const currentIndex = data.findIndex(d => d.year === activeYear)
      
      if (e.key === 'ArrowRight' && currentIndex < data.length - 1) {
        setActiveYear(data[currentIndex + 1].year)
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setActiveYear(data[currentIndex - 1].year)
      } else if (e.key === 'Home') {
        setActiveYear(yearRange.min)
      } else if (e.key === 'End') {
        setActiveYear(yearRange.max)
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [activeYear, data, yearRange, setActiveYear])

  return (
    <div 
      className="keyboard-chart" 
      tabIndex={0}
      role="application"
      aria-label="Use arrow keys to navigate through years"
    >
      {/* Chart content */}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 10: Runtime Guards - Safe Data Access
// ═══════════════════════════════════════════════════════════════════════════

function SafeDataDisplay() {
  const { activeYear, getActiveRow, isValidYear, formatPopulation } = useStoryStore()
  const data = auburnThroughTimeData

  // Guard: Check if year is valid
  if (activeYear && !isValidYear(data, activeYear)) {
    return (
      <div className="error">
        Year {activeYear} not found in dataset
      </div>
    )
  }

  const activeRow = getActiveRow(data)

  // Guard: Check if row exists
  if (!activeRow) {
    return <div className="placeholder">Select a year to begin</div>
  }

  // Guard: Check if population data exists
  if (activeRow.city === undefined) {
    return (
      <div className="warning">
        Population data not available for {activeRow.year}
      </div>
    )
  }

  return (
    <div className="data-display">
      <h3>{activeRow.year}</h3>
      <p>Population: {formatPopulation(activeRow.city)}</p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 11: Reset Functionality
// ═══════════════════════════════════════════════════════════════════════════

function ResetButton() {
  const { reset } = useStoryStore()

  return (
    <button 
      onClick={reset}
      className="reset-button"
      aria-label="Reset visualization to initial state"
    >
      Reset
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 12: Multiple Charts Synchronized
// ═══════════════════════════════════════════════════════════════════════════

function SynchronizedDashboard() {
  return (
    <StoryStoreProvider initialYear={2020}>
      <div className="dashboard">
        {/* All these components share the same state */}
        <div className="row">
          <PopulationChart />
          <GrowthRateChart />
        </div>
        <div className="row">
          <InteractiveTimeline />
          <MilestoneCards />
        </div>
        <div className="controls">
          <YearSelector />
          <ComparisonControls />
          <ResetButton />
        </div>
      </div>
    </StoryStoreProvider>
  )
}

function GrowthRateChart() {
  const { activeYear, hoveredYear } = useStoryStore()
  // This chart automatically highlights when user interacts with PopulationChart
  // because they share the same store!
  
  return (
    <div className="growth-chart">
      {/* Chart implementation */}
      <p>Active: {activeYear}, Hovered: {hoveredYear}</p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  StoryHeader,
  InteractiveTimeline,
  PopulationChart,
  MilestoneCards,
  ComparisonControls,
  YearSelector,
  HoverTooltip,
  PopulationChangeIndicator,
  KeyboardNavigableChart,
  SafeDataDisplay,
  ResetButton,
  SynchronizedDashboard,
}

