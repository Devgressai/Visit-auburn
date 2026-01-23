/**
 * Homepage statistics - single source of truth
 * Ensures consistency across all components that display these stats
 */

export interface HomepageStat {
  value: string
  label: string
}

/**
 * Homepage statistics displayed in CinematicHero and ProofChips
 * These values should be kept in sync and accurate
 */
export const HOMEPAGE_STATS: HomepageStat[] = [
  { value: '300+', label: 'Days of Sunshine' },
  { value: '1,255', label: 'Feet Elevation' },
  { value: '1849', label: 'Year Founded' },
  { value: '30+', label: 'Miles of Trails' },
]

/**
 * Additional proof points for mobile (ProofChips component)
 * Includes stats not shown in desktop hero
 */
export const PROOF_POINTS: HomepageStat[] = [
  { value: '35', label: 'Miles from Sacramento' },
  { value: '300+', label: 'Days of Sunshine' },
  { value: '30+', label: 'Miles of Trails' },
  { value: '50+', label: 'Local Restaurants' },
  { value: '1849', label: 'Year Founded' },
]
