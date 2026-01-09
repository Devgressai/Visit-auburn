/**
 * City Through Time - Data Model & Seed Dataset
 * 
 * A portable, type-safe data structure for civic demographic storytelling.
 * This file contains SEED DATA for demonstration purposes.
 * 
 * 🔄 TO REPLACE WITH REAL DATA:
 * See the "DATA SOURCES & REPLACEMENT GUIDE" section at the bottom.
 */

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * A single data point in the city's demographic timeline.
 * Represents population and key milestones for a specific year.
 */
export interface CityThroughTimeRow {
  /** Year of the data point (e.g., 1900, 1950, 2020) */
  year: number
  
  /** City population for this year */
  city: number
  
  /** County population (optional - for context/comparison) */
  county?: number
  
  /** State population (optional - for context/comparison) */
  state?: number
  
  /** Title of a significant milestone/event in this year */
  milestoneTitle: string
  
  /** Detailed description of the milestone */
  milestoneBody: string
  
  /** Data sources and citations */
  sources: Array<{
    label: string
    url?: string
  }>
}

/**
 * A narrative chapter grouping multiple years into a thematic story.
 * Used for scrollytelling and data visualization sections.
 */
export interface StoryChapter {
  /** Unique identifier for the chapter */
  id: string
  
  /** Chapter title (e.g., "The Gold Rush Era") */
  title: string
  
  /** Starting year of the chapter's time range */
  startYear: number
  
  /** Ending year of the chapter's time range */
  endYear: number
  
  /** Key takeaway or thesis statement for this chapter */
  takeaway: string
  
  /** Detailed narrative text for the chapter */
  detail: string
  
  /** Highlighted metrics/statistics for this time period */
  metricHighlights: Array<{
    label: string
    value: string
    note?: string
  }>
}

/**
 * Configuration for city-specific data.
 * Makes it easy to port this to other cities.
 */
export interface CityConfig {
  name: string
  county: string
  state: string
  established: number
  dataStartYear: number
  dataEndYear: number
}

/**
 * Complete configuration for CityDataStory component.
 * This type allows the component to be used for ANY city without code changes.
 * 
 * @example
 * const myConfig: CityDataStoryConfig = {
 *   cityName: 'Sacramento',
 *   countyName: 'Sacramento County',
 *   stateName: 'California',
 *   data: sacramentoData,
 *   chapters: sacramentoChapters,
 * }
 */
export interface CityDataStoryConfig {
  /** Display name of the city (e.g., "Auburn", "Sacramento") */
  cityName: string
  
  /** Display name of the county (optional, e.g., "Placer County") */
  countyName?: string
  
  /** Display name of the state (optional, e.g., "California") */
  stateName?: string
  
  /** Year the city was established (optional, for display) */
  established?: number
  
  /** Theme customization (optional) */
  theme?: {
    /** Tailwind class for accent color (default: 'gold') */
    accentClassName?: string
  }
  
  /** Population data through time */
  data: CityThroughTimeRow[]
  
  /** Narrative chapters for scrollytelling */
  chapters: StoryChapter[]
}

// ═══════════════════════════════════════════════════════════════════════════
// CITY CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export const auburnConfig: CityConfig = {
  name: 'Auburn',
  county: 'Placer County',
  state: 'California',
  established: 1849,
  dataStartYear: 1900,
  dataEndYear: 2020,
}

/**
 * Complete CityDataStory configuration for Auburn
 */
export const auburnDataStoryConfig: CityDataStoryConfig = {
  cityName: 'Auburn',
  countyName: 'Placer County',
  stateName: 'California',
  established: 1849,
  theme: {
    accentClassName: 'gold', // Uses gold-500, gold-600, etc.
  },
  data: [], // Will be populated below after data definition
  chapters: [], // Will be populated below after chapters definition
}

/**
 * EXAMPLE: DemoCity Configuration
 * 
 * This example shows how to configure CityDataStory for a different city.
 * Simply create your own data and chapters arrays, then pass this config.
 * 
 * const demoCityConfig: CityDataStoryConfig = {
 *   cityName: 'DemoCity',
 *   countyName: 'Demo County',
 *   stateName: 'Demo State',
 *   established: 1850,
 *   theme: {
 *     accentClassName: 'blue', // Or 'pine', 'lake', 'rust', etc.
 *   },
 *   data: [
 *     {
 *       year: 1900,
 *       city: 5000,
 *       county: 50000,
 *       state: 1000000,
 *       milestoneTitle: 'Turn of the Century',
 *       milestoneBody: 'DemoCity enters the 20th century...',
 *       sources: [{ label: 'Census 1900', url: 'https://...' }],
 *     },
 *     // ... more data points
 *   ],
 *   chapters: [
 *     {
 *       id: 'early-days',
 *       title: 'Early Days',
 *       startYear: 1900,
 *       endYear: 1950,
 *       takeaway: 'DemoCity establishes itself',
 *       detail: 'The early years saw rapid growth...',
 *       metricHighlights: [
 *         { label: 'Population Growth', value: '+200%', note: '1900-1950' },
 *       ],
 *     },
 *     // ... more chapters
 *   ],
 * }
 */

// ═══════════════════════════════════════════════════════════════════════════
// SEED DATA - AUBURN THROUGH TIME
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ⚠️ SEED DATA NOTICE ⚠️
 * 
 * The data below contains PLAUSIBLE PLACEHOLDER VALUES for demonstration.
 * These are NOT official Census figures and should be replaced with real data.
 * 
 * Data marked with [SEED] are estimates based on:
 * - Historical patterns for Gold Country towns
 * - Known Auburn historical events
 * - Typical growth curves for similar California cities
 * 
 * See "DATA SOURCES & REPLACEMENT GUIDE" section below for real data sources.
 */
export const auburnThroughTimeData: CityThroughTimeRow[] = [
  {
    year: 1900,
    city: 1850, // [SEED] Post-Gold Rush stabilization
    county: 15200, // [SEED] Placer County
    state: 1485000, // [SEED] California
    milestoneTitle: 'Turn of the Century',
    milestoneBody: 'Auburn transitions from a booming Gold Rush town to a stable agricultural and transportation hub. The Southern Pacific Railroad brings new commerce and connectivity to the region.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1900' },
    ],
  },
  {
    year: 1910,
    city: 2100, // [SEED] Modest growth
    county: 16300, // [SEED]
    state: 2377000, // [SEED]
    milestoneTitle: 'Railroad Expansion',
    milestoneBody: 'The expansion of rail lines through Auburn solidifies its role as a transportation crossroads. Agriculture, particularly fruit orchards, becomes a major economic driver.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1910' },
    ],
  },
  {
    year: 1920,
    city: 2350, // [SEED] Slow growth
    county: 18500, // [SEED]
    state: 3426000, // [SEED]
    milestoneTitle: 'Post-WWI Growth',
    milestoneBody: 'Following World War I, Auburn sees modest growth as veterans return and the Lincoln Highway (precursor to I-80) brings automobile tourism through the region.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1920' },
    ],
  },
  {
    year: 1930,
    city: 2800, // [SEED] Pre-Depression peak
    county: 22100, // [SEED]
    state: 5677000, // [SEED]
    milestoneTitle: 'The Great Depression',
    milestoneBody: 'The Depression slows growth, but Auburn remains resilient due to its agricultural base and position on major transportation routes. The Placer County Courthouse becomes a landmark.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1930' },
    ],
  },
  {
    year: 1940,
    city: 3200, // [SEED] Recovery begins
    county: 25800, // [SEED]
    state: 6907000, // [SEED]
    milestoneTitle: 'Pre-War Recovery',
    milestoneBody: 'Economic recovery before WWII brings new residents. Auburn State Recreation Area begins to take shape as a regional outdoor destination.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1940' },
    ],
  },
  {
    year: 1950,
    city: 4500, // [SEED] Post-war boom begins
    county: 34600, // [SEED]
    state: 10586000, // [SEED]
    milestoneTitle: 'Post-War Boom',
    milestoneBody: 'The post-WWII economic boom reaches Auburn. New housing developments and improved highways make Auburn an attractive destination for families leaving urban centers.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1950' },
    ],
  },
  {
    year: 1960,
    city: 5800, // [SEED] Suburban growth
    county: 56200, // [SEED] Placer County growing rapidly
    state: 15717000, // [SEED]
    milestoneTitle: 'Interstate Era Begins',
    milestoneBody: 'Construction of Interstate 80 transforms Auburn into a gateway to the Sierra Nevada. Tourism and recreation become major economic drivers alongside traditional industries.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1960' },
    ],
  },
  {
    year: 1970,
    city: 7200, // [SEED] Continued growth
    county: 77600, // [SEED]
    state: 19953000, // [SEED]
    milestoneTitle: 'Recreation Destination',
    milestoneBody: 'Auburn State Recreation Area officially established. The Western States Endurance Run begins, putting Auburn on the map for endurance sports enthusiasts worldwide.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1970' },
    ],
  },
  {
    year: 1980,
    city: 8900, // [SEED] Strong growth decade
    county: 117200, // [SEED] Placer County boom
    state: 23668000, // [SEED]
    milestoneTitle: 'Suburban Expansion',
    milestoneBody: 'Auburn experiences significant suburban expansion as Sacramento metro area grows. Old Town Auburn preservation efforts begin, protecting historic character while accommodating growth.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1980' },
    ],
  },
  {
    year: 1990,
    city: 10600, // [SEED] Approaching modern size
    county: 172000, // [SEED]
    state: 29760000, // [SEED]
    milestoneTitle: 'Historic Preservation',
    milestoneBody: 'Old Town Auburn becomes a model for historic preservation. The balance between growth and heritage protection becomes a defining characteristic of the city.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 1990' },
    ],
  },
  {
    year: 2000,
    city: 12500, // [SEED] Dot-com era growth
    county: 248000, // [SEED] Placer County rapid growth
    state: 33871000, // [SEED]
    milestoneTitle: 'New Millennium',
    milestoneBody: 'Auburn enters the 21st century as a thriving small city balancing tourism, recreation, and quality of life. The city becomes known for its outdoor recreation access and historic charm.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 2000' },
    ],
  },
  {
    year: 2010,
    city: 13330, // [SEED] Based on actual 2010 Census (~13,330)
    county: 348000, // [SEED] Placer County continues growth
    state: 37254000, // [SEED]
    milestoneTitle: 'Recession & Recovery',
    milestoneBody: 'Auburn weathers the Great Recession better than many California cities due to its diversified economy. Tourism, outdoor recreation, and wine country attractions continue to draw visitors.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 2010' },
      { 
        label: 'US Census 2010 (Actual: ~13,330)',
        url: 'https://www.census.gov/programs-surveys/decennial-census/decade/2010/2010-census-main.html'
      },
    ],
  },
  {
    year: 2020,
    city: 14000, // [SEED] Estimated current population
    county: 398000, // [SEED] Placer County
    state: 39538000, // [SEED] California
    milestoneTitle: 'Modern Auburn',
    milestoneBody: 'Auburn thrives as a destination for outdoor enthusiasts, history buffs, and wine lovers. The city successfully balances growth with preservation, maintaining its Gold Country charm while offering modern amenities.',
    sources: [
      { label: '[SEED DATA] Placeholder - Replace with US Census 2020' },
      { 
        label: 'US Census 2020',
        url: 'https://www.census.gov/programs-surveys/decennial-census/decade/2020/2020-census-main.html'
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// STORY CHAPTERS - NARRATIVE STRUCTURE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Narrative chapters that group the timeline data into thematic stories.
 * Used for scrollytelling visualizations and data storytelling.
 */
export const auburnStoryChapters: StoryChapter[] = [
  {
    id: 'gold-rush-legacy',
    title: 'Gold Rush Legacy',
    startYear: 1900,
    endYear: 1930,
    takeaway: 'Auburn transitions from boom town to stable community',
    detail: 'After the frenzy of the Gold Rush, Auburn found its footing as a transportation hub and agricultural center. The arrival of the railroad and the Lincoln Highway transformed the city from a mining camp into a permanent settlement with lasting infrastructure.',
    metricHighlights: [
      {
        label: 'Population Growth',
        value: '+51%',
        note: '1900-1930 (SEED DATA)',
      },
      {
        label: 'Economic Base',
        value: 'Agriculture & Rail',
        note: 'Primary industries',
      },
      {
        label: 'Key Infrastructure',
        value: 'Railroad Hub',
        note: 'Southern Pacific expansion',
      },
    ],
  },
  {
    id: 'depression-resilience',
    title: 'Depression & Resilience',
    startYear: 1930,
    endYear: 1950,
    takeaway: 'Auburn weathers economic storms through diversification',
    detail: 'While the Great Depression and World War II brought challenges, Auburn\'s diverse economic base—agriculture, transportation, and emerging tourism—helped the community remain stable. The post-war boom brought new opportunities and population growth.',
    metricHighlights: [
      {
        label: 'Population Growth',
        value: '+61%',
        note: '1930-1950 (SEED DATA)',
      },
      {
        label: 'Economic Shift',
        value: 'Tourism Emerges',
        note: 'Recreation becomes viable',
      },
      {
        label: 'Post-War Boom',
        value: '1945-1950',
        note: 'Rapid growth begins',
      },
    ],
  },
  {
    id: 'interstate-transformation',
    title: 'The Interstate Era',
    startYear: 1950,
    endYear: 1970,
    takeaway: 'I-80 transforms Auburn into a Sierra gateway',
    detail: 'The construction of Interstate 80 fundamentally changed Auburn\'s role in the region. No longer just a waypoint, Auburn became the primary gateway to the Sierra Nevada for millions of travelers. This accessibility sparked growth in tourism, recreation, and residential development.',
    metricHighlights: [
      {
        label: 'Population Growth',
        value: '+60%',
        note: '1950-1970 (SEED DATA)',
      },
      {
        label: 'I-80 Opens',
        value: '1964',
        note: 'Game-changing infrastructure',
      },
      {
        label: 'Tourism Growth',
        value: '3x Increase',
        note: 'Estimated visitor growth (SEED)',
      },
    ],
  },
  {
    id: 'recreation-capital',
    title: 'Recreation Capital',
    startYear: 1970,
    endYear: 1990,
    takeaway: 'Auburn becomes synonymous with outdoor adventure',
    detail: 'The establishment of Auburn State Recreation Area and the launch of the Western States Endurance Run put Auburn on the international map for outdoor recreation. The city successfully balanced growth with historic preservation, protecting Old Town while welcoming new residents.',
    metricHighlights: [
      {
        label: 'Population Growth',
        value: '+47%',
        note: '1970-1990 (SEED DATA)',
      },
      {
        label: 'Western States Run',
        value: 'Since 1974',
        note: 'World\'s oldest 100-mile race',
      },
      {
        label: 'Trail Miles',
        value: '50+ Miles',
        note: 'Auburn SRA system',
      },
    ],
  },
  {
    id: 'modern-auburn',
    title: 'Modern Auburn',
    startYear: 1990,
    endYear: 2020,
    takeaway: 'Balancing heritage, growth, and quality of life',
    detail: 'Modern Auburn has mastered the art of balance—preserving its Gold Rush heritage while embracing sustainable growth. The city has become a model for small-city tourism, outdoor recreation access, and historic preservation. Today, Auburn attracts visitors seeking authentic California Gold Country experiences.',
    metricHighlights: [
      {
        label: 'Population Growth',
        value: '+32%',
        note: '1990-2020 (SEED DATA)',
      },
      {
        label: 'Annual Visitors',
        value: '500,000+',
        note: 'Estimated (SEED DATA)',
      },
      {
        label: 'Historic Buildings',
        value: '100+',
        note: 'Preserved structures',
      },
      {
        label: 'Economic Mix',
        value: 'Tourism + Heritage',
        note: 'Diversified economy',
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get data points within a specific year range
 */
export function getDataByYearRange(
  data: CityThroughTimeRow[],
  startYear: number,
  endYear: number
): CityThroughTimeRow[] {
  return data.filter(row => row.year >= startYear && row.year <= endYear)
}

/**
 * Get the chapter that contains a specific year
 */
export function getChapterByYear(
  chapters: StoryChapter[],
  year: number
): StoryChapter | undefined {
  return chapters.find(
    chapter => year >= chapter.startYear && year <= chapter.endYear
  )
}

/**
 * Calculate population growth rate between two years
 */
export function calculateGrowthRate(
  data: CityThroughTimeRow[],
  startYear: number,
  endYear: number
): number | null {
  const startData = data.find(row => row.year === startYear)
  const endData = data.find(row => row.year === endYear)
  
  if (!startData || !endData) return null
  
  const growth = ((endData.city - startData.city) / startData.city) * 100
  return Math.round(growth * 10) / 10 // Round to 1 decimal
}

/**
 * Get population data formatted for charting
 */
export function getChartData(data: CityThroughTimeRow[]) {
  return data.map(row => ({
    year: row.year,
    Auburn: row.city,
    'Placer County': row.county,
    California: row.state ? row.state / 1000 : undefined, // Convert to thousands for scale
  }))
}

/**
 * Get all milestones in chronological order
 */
export function getMilestones(data: CityThroughTimeRow[]) {
  return data.map(row => ({
    year: row.year,
    title: row.milestoneTitle,
    body: row.milestoneBody,
  }))
}

// ═══════════════════════════════════════════════════════════════════════════
// POPULATE AUBURN CONFIG (after data and chapters are defined)
// ═══════════════════════════════════════════════════════════════════════════

auburnDataStoryConfig.data = auburnThroughTimeData
auburnDataStoryConfig.chapters = auburnStoryChapters

// ═══════════════════════════════════════════════════════════════════════════
// DATA SOURCES & REPLACEMENT GUIDE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 📊 HOW TO REPLACE SEED DATA WITH REAL DATA
 * 
 * This file currently contains PLACEHOLDER DATA marked with [SEED].
 * Follow this guide to replace it with official demographic data:
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 1. US CENSUS BUREAU (Decennial Census - Every 10 years)
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * Source: https://data.census.gov/
 * 
 * What to get:
 * - Total Population (P1 table in recent censuses)
 * - Geographic level: Place (for Auburn city)
 * - Geographic level: County (for Placer County)
 * - Geographic level: State (for California)
 * 
 * Available years: 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980,
 *                  1990, 2000, 2010, 2020
 * 
 * How to access:
 * 1. Visit https://data.census.gov/
 * 2. Search for "Auburn city, California"
 * 3. Select "Total Population" tables
 * 4. Download data for each census year
 * 5. Repeat for Placer County and California state
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 2. AMERICAN COMMUNITY SURVEY (ACS - Annual estimates)
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * Source: https://data.census.gov/
 * 
 * What to get:
 * - ACS 5-Year Estimates (most reliable for small cities)
 * - Table B01003: Total Population
 * 
 * Available: 2010-present (annual)
 * 
 * Use case: Fill in years between decennial censuses (e.g., 2015, 2018)
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 3. CALIFORNIA DEPARTMENT OF FINANCE (CA DOF)
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * Source: https://dof.ca.gov/forecasting/demographics/estimates/
 * 
 * What to get:
 * - E-4 Population Estimates for Cities, Counties, and the State
 * - Annual estimates (January 1 of each year)
 * 
 * Available: 1970-present (annual)
 * 
 * Advantage: California-specific, more frequent updates than Census
 * 
 * How to access:
 * 1. Visit DOF Demographics page
 * 2. Download "E-4 Historical Population Estimates"
 * 3. Find Auburn in the spreadsheet
 * 4. Extract population by year
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 4. HISTORICAL DATA (Pre-1900)
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * For Gold Rush era data:
 * - California State Library: https://www.library.ca.gov/
 * - Placer County Historical Society
 * - Auburn Area Chamber of Commerce archives
 * - "History of Placer County" (Thompson & West, 1882)
 * 
 * Note: Pre-1900 data may be estimates or from local records
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 5. IMPLEMENTATION STEPS
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * Step 1: Gather official data from sources above
 * Step 2: Create a spreadsheet with columns: year, city, county, state
 * Step 3: Replace the values in auburnThroughTimeData array
 * Step 4: Update the sources array for each row with real citations
 * Step 5: Remove [SEED] markers from comments
 * Step 6: Update milestones with historically verified events
 * Step 7: Recalculate metricHighlights in auburnStoryChapters
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 6. DATA VALIDATION
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * After replacing data, verify:
 * ✓ Population never decreases dramatically (unless historically accurate)
 * ✓ Growth rates are plausible for the region
 * ✓ County population > city population (always)
 * ✓ State population > county population (always)
 * ✓ All sources have proper citations
 * ✓ Milestone dates align with historical records
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 7. EXAMPLE: REPLACING ONE DATA POINT
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * BEFORE (Seed Data):
 * {
 *   year: 2010,
 *   city: 13330, // [SEED] Based on actual 2010 Census (~13,330)
 *   county: 348000, // [SEED]
 *   state: 37254000, // [SEED]
 *   sources: [
 *     { label: '[SEED DATA] Placeholder - Replace with US Census 2010' },
 *   ],
 * }
 * 
 * AFTER (Real Data):
 * {
 *   year: 2010,
 *   city: 13330, // US Census 2010 (Official)
 *   county: 348432, // US Census 2010 (Official)
 *   state: 37253956, // US Census 2010 (Official)
 *   sources: [
 *     { 
 *       label: 'US Census 2010, Table P1',
 *       url: 'https://data.census.gov/table/DECENNIALSF12010.P1'
 *     },
 *   ],
 * }
 * 
 * ─────────────────────────────────────────────────────────────────────────
 * 8. PORTING TO ANOTHER CITY
 * ─────────────────────────────────────────────────────────────────────────
 * 
 * To adapt this for another city:
 * 1. Update auburnConfig with new city details
 * 2. Replace auburnThroughTimeData with new city's data
 * 3. Rewrite auburnStoryChapters with new city's narrative
 * 4. Update milestone events to match new city's history
 * 5. Rename exports (e.g., auburnThroughTimeData → sacramentoThroughTimeData)
 * 
 * The TypeScript interfaces remain the same—only data changes!
 */

