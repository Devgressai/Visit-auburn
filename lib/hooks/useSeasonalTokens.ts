/**
 * Seasonal Token Hook
 * 
 * Provides seasonal color adaptations for visualization section
 * 
 * Usage:
 * const { accentColor, bgColor } = useSeasonalTokens()
 */

import { useMemo } from 'react'
import { seasonal } from '@/lib/designTokens'

type Season = 'spring' | 'summer' | 'fall' | 'winter'

function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1 // 1-12
  
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'fall'
  return 'winter'
}

export function useSeasonalTokens() {
  const season = useMemo(() => getCurrentSeason(), [])
  const tokens = useMemo(() => seasonal[season], [season])
  
  return {
    season,
    accentColor: tokens.accent,
    bgColor: tokens.bg,
    ...tokens,
  }
}
