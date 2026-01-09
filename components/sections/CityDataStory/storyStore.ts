/**
 * City Data Story - Shared State Store
 * 
 * A React Context-based state management solution for interlinked data visualizations.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ARCHITECTURE DECISION: React Context vs Zustand
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * CHOSEN: React Context
 * 
 * JUSTIFICATION:
 * 1. Consistency: This repo already uses React Context (FAQSearchContext, useSavedItems)
 * 2. Zero dependencies: No need to add Zustand to package.json
 * 3. SSR-safe: Context works seamlessly with Next.js App Router
 * 4. Sufficient complexity: Our state is simple enough that Context won't cause
 *    performance issues (3 state values, ~10-20 data points max)
 * 5. Colocation: State is scoped to CityDataStory section, not global
 * 
 * WHEN TO SWITCH TO ZUSTAND:
 * - If state becomes more complex (>10 values)
 * - If we need devtools debugging
 * - If we need state persistence across page navigation
 * - If we see performance issues with frequent updates
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use client'

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react'
import type { CityThroughTimeRow } from '@/lib/data/cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Comparison mode for multi-series visualization
 */
export type CompareMode = 'city' | 'county' | 'state'

/**
 * Time series data point for charting
 */
export interface TimeSeriesPoint {
  year: number
  value: number
  label: string
}

/**
 * Multi-series data for comparison charts
 */
export interface SeriesData {
  city: TimeSeriesPoint[]
  county?: TimeSeriesPoint[]
  state?: TimeSeriesPoint[]
}

/**
 * Store state interface
 */
interface StoryStoreState {
  /** Currently selected year (for detail view, annotations) */
  activeYear: number | null
  
  /** Year being hovered over (for coordinated highlighting) */
  hoveredYear: number | null
  
  /** Which data series to display in comparison mode */
  compareMode: CompareMode
}

/**
 * Store actions interface
 */
interface StoryStoreActions {
  /** Set the active year (clicked/selected) */
  setActiveYear: (year: number | null) => void
  
  /** Set the hovered year (for interactive tooltips) */
  setHoveredYear: (year: number | null) => void
  
  /** Set comparison mode (which series to show) */
  setCompareMode: (mode: CompareMode) => void
  
  /** Reset all state to defaults */
  reset: () => void
}

/**
 * Derived selectors interface
 */
interface StoryStoreSelectors {
  /** Get the data row for the active year */
  getActiveRow: (data: CityThroughTimeRow[]) => CityThroughTimeRow | null
  
  /** Get the data row for the hovered year */
  getHoveredRow: (data: CityThroughTimeRow[]) => CityThroughTimeRow | null
  
  /** Get time series data based on compare mode */
  getSeries: (data: CityThroughTimeRow[], mode?: CompareMode) => SeriesData
  
  /** Format population number for display */
  formatPopulation: (n: number | undefined) => string
  
  /** Format population with change indicator */
  formatPopulationChange: (current: number, previous: number) => {
    formatted: string
    change: number
    changePercent: string
    isPositive: boolean
  }
  
  /** Get year range from data */
  getYearRange: (data: CityThroughTimeRow[]) => { min: number; max: number } | null
  
  /** Check if a year exists in the dataset */
  isValidYear: (data: CityThroughTimeRow[], year: number) => boolean
}

/**
 * Complete store context type
 */
type StoryStoreContextType = StoryStoreState & StoryStoreActions & StoryStoreSelectors

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT CREATION
// ═══════════════════════════════════════════════════════════════════════════

const StoryStoreContext = createContext<StoryStoreContextType | undefined>(undefined)

// ═══════════════════════════════════════════════════════════════════════════
// PROVIDER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface StoryStoreProviderProps {
  children: ReactNode
  /** Initial year to set as active (optional) */
  initialYear?: number | null
  /** Initial compare mode (default: 'city') */
  initialCompareMode?: CompareMode
}

export function StoryStoreProvider({
  children,
  initialYear = null,
  initialCompareMode = 'city',
}: StoryStoreProviderProps) {
  // ─────────────────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────────────────
  
  const [activeYear, setActiveYearState] = useState<number | null>(initialYear)
  const [hoveredYear, setHoveredYearState] = useState<number | null>(null)
  const [compareMode, setCompareModeState] = useState<CompareMode>(initialCompareMode)

  // ─────────────────────────────────────────────────────────────────────────
  // ACTIONS (Memoized with useCallback)
  // ─────────────────────────────────────────────────────────────────────────
  
  const setActiveYear = useCallback((year: number | null) => {
    setActiveYearState(year)
  }, [])

  const setHoveredYear = useCallback((year: number | null) => {
    setHoveredYearState(year)
  }, [])

  const setCompareMode = useCallback((mode: CompareMode) => {
    setCompareModeState(mode)
  }, [])

  const reset = useCallback(() => {
    setActiveYearState(initialYear)
    setHoveredYearState(null)
    setCompareModeState(initialCompareMode)
  }, [initialYear, initialCompareMode])

  // ─────────────────────────────────────────────────────────────────────────
  // SELECTORS (Memoized with useCallback)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Get the data row for the active year
   * Returns null if no active year or year not found
   */
  const getActiveRow = useCallback((data: CityThroughTimeRow[]): CityThroughTimeRow | null => {
    if (activeYear === null) return null
    
    const row = data.find(d => d.year === activeYear)
    
    // Runtime guard: warn if year not found
    if (!row && process.env.NODE_ENV === 'development') {
      console.warn(`[StoryStore] Active year ${activeYear} not found in dataset`)
    }
    
    return row || null
  }, [activeYear])

  /**
   * Get the data row for the hovered year
   * Returns null if no hovered year or year not found
   */
  const getHoveredRow = useCallback((data: CityThroughTimeRow[]): CityThroughTimeRow | null => {
    if (hoveredYear === null) return null
    return data.find(d => d.year === hoveredYear) || null
  }, [hoveredYear])

  /**
   * Get time series data based on compare mode
   * Includes runtime guards for missing data
   */
  const getSeries = useCallback((
    data: CityThroughTimeRow[],
    mode: CompareMode = compareMode
  ): SeriesData => {
    // Runtime guard: empty data
    if (!data || data.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[StoryStore] getSeries called with empty data array')
      }
      return { city: [] }
    }

    const series: SeriesData = {
      city: data.map(d => ({
        year: d.year,
        value: d.city,
        label: `${d.year}: ${formatPopulation(d.city)}`,
      })),
    }

    // Add county data if available and requested
    if ((mode === 'county' || mode === 'state') && data.some(d => d.county !== undefined)) {
      series.county = data
        .filter(d => d.county !== undefined)
        .map(d => ({
          year: d.year,
          value: d.county!,
          label: `${d.year}: ${formatPopulation(d.county!)}`,
        }))
    }

    // Add state data if available and requested
    if (mode === 'state' && data.some(d => d.state !== undefined)) {
      series.state = data
        .filter(d => d.state !== undefined)
        .map(d => ({
          year: d.year,
          value: d.state!,
          label: `${d.year}: ${formatPopulation(d.state!)}`,
        }))
    }

    return series
  }, [compareMode])

  /**
   * Format population number for display
   * Handles undefined/null gracefully
   */
  const formatPopulation = useCallback((n: number | undefined): string => {
    if (n === undefined || n === null || isNaN(n)) {
      return 'N/A'
    }
    
    // Use Intl.NumberFormat for locale-aware formatting
    return new Intl.NumberFormat('en-US').format(n)
  }, [])

  /**
   * Format population with change indicator
   * Calculates absolute and percentage change
   */
  const formatPopulationChange = useCallback((current: number, previous: number) => {
    const change = current - previous
    const changePercent = ((change / previous) * 100).toFixed(1)
    const isPositive = change >= 0
    
    return {
      formatted: formatPopulation(current),
      change,
      changePercent: `${isPositive ? '+' : ''}${changePercent}%`,
      isPositive,
    }
  }, [formatPopulation])

  /**
   * Get the min and max years from dataset
   * Returns null if data is empty
   */
  const getYearRange = useCallback((data: CityThroughTimeRow[]) => {
    if (!data || data.length === 0) return null
    
    const years = data.map(d => d.year)
    return {
      min: Math.min(...years),
      max: Math.max(...years),
    }
  }, [])

  /**
   * Check if a year exists in the dataset
   */
  const isValidYear = useCallback((data: CityThroughTimeRow[], year: number): boolean => {
    return data.some(d => d.year === year)
  }, [])

  // ─────────────────────────────────────────────────────────────────────────
  // CONTEXT VALUE (Memoized)
  // ─────────────────────────────────────────────────────────────────────────

  const contextValue = useMemo<StoryStoreContextType>(
    () => ({
      // State
      activeYear,
      hoveredYear,
      compareMode,
      
      // Actions
      setActiveYear,
      setHoveredYear,
      setCompareMode,
      reset,
      
      // Selectors
      getActiveRow,
      getHoveredRow,
      getSeries,
      formatPopulation,
      formatPopulationChange,
      getYearRange,
      isValidYear,
    }),
    [
      activeYear,
      hoveredYear,
      compareMode,
      setActiveYear,
      setHoveredYear,
      setCompareMode,
      reset,
      getActiveRow,
      getHoveredRow,
      getSeries,
      formatPopulation,
      formatPopulationChange,
      getYearRange,
      isValidYear,
    ]
  )

  return (
    <StoryStoreContext.Provider value={contextValue}>
      {children}
    </StoryStoreContext.Provider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook to access the Story Store
 * 
 * @throws Error if used outside of StoryStoreProvider
 * 
 * @example
 * ```tsx
 * function MyChart() {
 *   const { activeYear, setActiveYear, getActiveRow } = useStoryStore()
 *   const data = auburnThroughTimeData
 *   const activeRow = getActiveRow(data)
 *   
 *   return (
 *     <div onClick={() => setActiveYear(2020)}>
 *       {activeRow?.milestoneTitle}
 *     </div>
 *   )
 * }
 * ```
 */
export function useStoryStore(): StoryStoreContextType {
  const context = useContext(StoryStoreContext)
  
  if (context === undefined) {
    throw new Error(
      'useStoryStore must be used within a StoryStoreProvider. ' +
      'Wrap your component tree with <StoryStoreProvider>...</StoryStoreProvider>'
    )
  }
  
  return context
}

// ═══════════════════════════════════════════════════════════════════════════
// SSR-SAFE HOOK (Optional)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SSR-safe version of useStoryStore
 * Returns null during SSR, actual store on client
 * 
 * Use this if you need to render components that use the store in RSC contexts
 * 
 * @example
 * ```tsx
 * function OptionalChart() {
 *   const store = useStoryStoreSafe()
 *   
 *   if (!store) {
 *     return <div>Loading...</div>
 *   }
 *   
 *   return <Chart activeYear={store.activeYear} />
 * }
 * ```
 */
export function useStoryStoreSafe(): StoryStoreContextType | null {
  try {
    return useStoryStore()
  } catch {
    return null
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY HOOKS (Convenience)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook to get only the active year state and setter
 * Useful for components that only need active year
 */
export function useActiveYear() {
  const { activeYear, setActiveYear } = useStoryStore()
  return { activeYear, setActiveYear }
}

/**
 * Hook to get only the hovered year state and setter
 * Useful for hover-based interactions
 */
export function useHoveredYear() {
  const { hoveredYear, setHoveredYear } = useStoryStore()
  return { hoveredYear, setHoveredYear }
}

/**
 * Hook to get only the compare mode state and setter
 * Useful for mode toggle components
 */
export function useCompareMode() {
  const { compareMode, setCompareMode } = useStoryStore()
  return { compareMode, setCompareMode }
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  StoryStoreState,
  StoryStoreActions,
  StoryStoreSelectors,
  StoryStoreContextType,
  TimeSeriesPoint,
  SeriesData,
}

