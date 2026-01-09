/**
 * City Through Time - Usage Examples
 * 
 * This file demonstrates how to use the cityThroughTime data model
 * in various visualization and storytelling contexts.
 */

import {
  auburnThroughTimeData,
  auburnStoryChapters,
  auburnConfig,
  getDataByYearRange,
  getChapterByYear,
  calculateGrowthRate,
  getChartData,
  getMilestones,
  type CityThroughTimeRow,
  type StoryChapter,
} from './cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Basic Data Access
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get all population data for Auburn
 */
export function getAllAuburnData(): CityThroughTimeRow[] {
  return auburnThroughTimeData
}

/**
 * Get the most recent population data
 */
export function getCurrentPopulation(): number {
  const latestData = auburnThroughTimeData[auburnThroughTimeData.length - 1]
  return latestData.city
}

/**
 * Get population at a specific year
 */
export function getPopulationByYear(year: number): number | null {
  const data = auburnThroughTimeData.find(row => row.year === year)
  return data ? data.city : null
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: Chart Data Preparation
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Prepare data for a line chart showing population over time
 * Returns data in a format ready for Recharts or similar libraries
 */
export function getPopulationLineChartData() {
  return auburnThroughTimeData.map(row => ({
    year: row.year,
    population: row.city,
    label: `${row.year}: ${row.city.toLocaleString()}`,
  }))
}

/**
 * Prepare data for a multi-line comparison chart
 * (Auburn vs Placer County vs California - scaled)
 */
export function getComparisonChartData() {
  return getChartData(auburnThroughTimeData)
}

/**
 * Prepare data for a bar chart showing decade-over-decade growth
 */
export function getGrowthBarChartData() {
  const decades = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010]
  
  return decades.map((startYear, index) => {
    const endYear = decades[index + 1]
    if (!endYear) return null
    
    const growthRate = calculateGrowthRate(auburnThroughTimeData, startYear, endYear)
    
    return {
      period: `${startYear}-${endYear}`,
      growthRate: growthRate || 0,
      label: `${growthRate?.toFixed(1)}%`,
    }
  }).filter(Boolean)
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Narrative & Scrollytelling
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get all story chapters in order
 */
export function getStoryChapters(): StoryChapter[] {
  return auburnStoryChapters
}

/**
 * Get a specific chapter by ID
 */
export function getChapterById(id: string): StoryChapter | undefined {
  return auburnStoryChapters.find(chapter => chapter.id === id)
}

/**
 * Get the chapter and relevant data for a scrollytelling section
 */
export function getScrollytellingSection(chapterId: string) {
  const chapter = getChapterById(chapterId)
  if (!chapter) return null
  
  const data = getDataByYearRange(
    auburnThroughTimeData,
    chapter.startYear,
    chapter.endYear
  )
  
  return {
    chapter,
    data,
    chartData: getChartData(data),
    milestones: data.map(row => ({
      year: row.year,
      title: row.milestoneTitle,
      body: row.milestoneBody,
    })),
  }
}

/**
 * Get chapter progress based on scroll position
 * Useful for scroll-based animations
 */
export function getChapterProgress(
  chapterId: string,
  currentYear: number
): number {
  const chapter = getChapterById(chapterId)
  if (!chapter) return 0
  
  const yearRange = chapter.endYear - chapter.startYear
  const progress = (currentYear - chapter.startYear) / yearRange
  
  return Math.max(0, Math.min(1, progress))
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: Statistical Analysis
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate total population growth over entire dataset
 */
export function getTotalGrowth() {
  const firstYear = auburnThroughTimeData[0]
  const lastYear = auburnThroughTimeData[auburnThroughTimeData.length - 1]
  
  const absolute = lastYear.city - firstYear.city
  const percentage = ((absolute / firstYear.city) * 100).toFixed(1)
  
  return {
    absolute,
    percentage: `${percentage}%`,
    years: `${firstYear.year}-${lastYear.year}`,
  }
}

/**
 * Find the decade with highest growth
 */
export function getFastestGrowthDecade() {
  const decades = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010]
  
  let maxGrowth = -Infinity
  let maxDecade = { start: 0, end: 0, rate: 0 }
  
  decades.forEach((startYear, index) => {
    const endYear = decades[index + 1]
    if (!endYear) return
    
    const growthRate = calculateGrowthRate(auburnThroughTimeData, startYear, endYear)
    if (growthRate && growthRate > maxGrowth) {
      maxGrowth = growthRate
      maxDecade = { start: startYear, end: endYear, rate: growthRate }
    }
  })
  
  return maxDecade
}

/**
 * Calculate average annual growth rate
 */
export function getAverageAnnualGrowth() {
  const firstYear = auburnThroughTimeData[0]
  const lastYear = auburnThroughTimeData[auburnThroughTimeData.length - 1]
  
  const years = lastYear.year - firstYear.year
  const totalGrowthRate = ((lastYear.city - firstYear.city) / firstYear.city) * 100
  const avgAnnualRate = totalGrowthRate / years
  
  return {
    rate: avgAnnualRate.toFixed(2),
    period: `${firstYear.year}-${lastYear.year}`,
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: Data Highlights for UI
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get key statistics for a "By The Numbers" section
 */
export function getKeyStatistics() {
  const currentData = auburnThroughTimeData[auburnThroughTimeData.length - 1]
  const totalGrowth = getTotalGrowth()
  const fastestDecade = getFastestGrowthDecade()
  
  return {
    currentPopulation: {
      value: currentData.city.toLocaleString(),
      label: 'Current Population',
      year: currentData.year,
    },
    founded: {
      value: auburnConfig.established.toString(),
      label: 'Year Established',
    },
    totalGrowth: {
      value: totalGrowth.percentage,
      label: 'Total Growth',
      sublabel: totalGrowth.years,
    },
    fastestGrowth: {
      value: `${fastestDecade.rate.toFixed(1)}%`,
      label: 'Fastest Growth Decade',
      sublabel: `${fastestDecade.start}-${fastestDecade.end}`,
    },
  }
}

/**
 * Get milestone timeline for a visual timeline component
 */
export function getMilestoneTimeline() {
  return getMilestones(auburnThroughTimeData)
}

/**
 * Get data for a specific chapter's metric highlights
 */
export function getChapterMetrics(chapterId: string) {
  const chapter = getChapterById(chapterId)
  return chapter?.metricHighlights || []
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: Filtering & Searching
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get data for a custom year range
 */
export function getCustomYearRange(startYear: number, endYear: number) {
  return getDataByYearRange(auburnThroughTimeData, startYear, endYear)
}

/**
 * Search milestones by keyword
 */
export function searchMilestones(keyword: string): CityThroughTimeRow[] {
  const lowerKeyword = keyword.toLowerCase()
  
  return auburnThroughTimeData.filter(row => 
    row.milestoneTitle.toLowerCase().includes(lowerKeyword) ||
    row.milestoneBody.toLowerCase().includes(lowerKeyword)
  )
}

/**
 * Get chapters that cover a specific theme
 */
export function getChaptersByTheme(theme: string): StoryChapter[] {
  const lowerTheme = theme.toLowerCase()
  
  return auburnStoryChapters.filter(chapter =>
    chapter.title.toLowerCase().includes(lowerTheme) ||
    chapter.takeaway.toLowerCase().includes(lowerTheme) ||
    chapter.detail.toLowerCase().includes(lowerTheme)
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 7: Accessibility Helpers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate accessible description for a chart
 */
export function getChartAccessibleDescription(chapterId: string): string {
  const section = getScrollytellingSection(chapterId)
  if (!section) return ''
  
  const { chapter, data } = section
  const startPop = data[0]?.city || 0
  const endPop = data[data.length - 1]?.city || 0
  const change = endPop - startPop
  const changePercent = ((change / startPop) * 100).toFixed(1)
  
  return `Line chart showing Auburn population from ${chapter.startYear} to ${chapter.endYear}. ` +
    `Population grew from ${startPop.toLocaleString()} to ${endPop.toLocaleString()}, ` +
    `an increase of ${change.toLocaleString()} people or ${changePercent}%.`
}

/**
 * Generate data table for screen readers
 */
export function getAccessibleDataTable(chapterId: string) {
  const section = getScrollytellingSection(chapterId)
  if (!section) return []
  
  return section.data.map(row => ({
    year: row.year.toString(),
    population: row.city.toLocaleString(),
    milestone: row.milestoneTitle,
  }))
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 8: Responsive Chart Configuration
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get chart configuration based on viewport size
 */
export function getResponsiveChartConfig(viewportWidth: number) {
  if (viewportWidth < 768) {
    // Mobile
    return {
      height: 300,
      margin: { top: 10, right: 10, bottom: 30, left: 40 },
      showLegend: false,
      fontSize: 12,
      dataPoints: auburnThroughTimeData.filter((_, i) => i % 2 === 0), // Every other point
    }
  } else if (viewportWidth < 1024) {
    // Tablet
    return {
      height: 400,
      margin: { top: 20, right: 30, bottom: 40, left: 60 },
      showLegend: true,
      fontSize: 14,
      dataPoints: auburnThroughTimeData,
    }
  } else {
    // Desktop
    return {
      height: 500,
      margin: { top: 20, right: 40, bottom: 50, left: 80 },
      showLegend: true,
      fontSize: 16,
      dataPoints: auburnThroughTimeData,
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 9: Export for External Use
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Export data as CSV string
 */
export function exportAsCSV(): string {
  const headers = ['Year', 'City Population', 'County Population', 'State Population', 'Milestone']
  const rows = auburnThroughTimeData.map(row => [
    row.year,
    row.city,
    row.county || '',
    row.state || '',
    `"${row.milestoneTitle}"`,
  ])
  
  return [headers, ...rows].map(row => row.join(',')).join('\n')
}

/**
 * Export data as JSON for API
 */
export function exportAsJSON() {
  return {
    config: auburnConfig,
    data: auburnThroughTimeData,
    chapters: auburnStoryChapters,
    metadata: {
      generatedAt: new Date().toISOString(),
      dataPoints: auburnThroughTimeData.length,
      yearRange: {
        start: auburnThroughTimeData[0].year,
        end: auburnThroughTimeData[auburnThroughTimeData.length - 1].year,
      },
    },
  }
}

