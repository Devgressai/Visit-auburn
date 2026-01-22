/**
 * Design Token Utilities - Safe Access Helpers
 * 
 * Prevents invalid token indexing by providing type-safe accessors
 * that clamp to valid values or compute safe alternatives.
 */

import { colors, spacing } from './designTokens'

// ═══════════════════════════════════════════════════════════════
// COLOR HELPERS
// ═══════════════════════════════════════════════════════════════

type ColorPalette = 'forest' | 'rust' | 'charcoal' | 'gold' | 'cream' | 'lake'
type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

/**
 * Get a color from a palette, clamping to the closest available shade
 */
export function getPaletteColor(
  palette: ColorPalette,
  shade: number
): string {
  const paletteColors = colors[palette] as Record<number, string>
  
  // If exact shade exists, return it
  if (paletteColors[shade as ColorShade]) {
    return paletteColors[shade as ColorShade]
  }
  
  // Clamp to closest available shade
  const availableShades = Object.keys(paletteColors)
    .map(Number)
    .sort((a, b) => a - b)
  
  // Find closest shade
  let closest = availableShades[0]
  let minDiff = Math.abs(shade - closest)
  
  for (const available of availableShades) {
    const diff = Math.abs(shade - available)
    if (diff < minDiff) {
      minDiff = diff
      closest = available
    }
  }
  
  return paletteColors[closest]
}

/**
 * Type-safe color accessor with fallback
 * Usage: getColor('forest', 700) or getColor('rust', 700, 'rust', 600)
 */
export function getColor(
  palette: ColorPalette,
  shade: number,
  fallbackPalette?: ColorPalette,
  fallbackShade?: number
): string {
  const paletteColors = colors[palette] as Record<number, string>
  
  if (paletteColors[shade as ColorShade]) {
    return paletteColors[shade as ColorShade]
  }
  
  // Use fallback if provided
  if (fallbackPalette && fallbackShade !== undefined) {
    return getPaletteColor(fallbackPalette, fallbackShade)
  }
  
  // Otherwise clamp to closest
  return getPaletteColor(palette, shade)
}

// ═══════════════════════════════════════════════════════════════
// SPACING HELPERS
// ═══════════════════════════════════════════════════════════════

type SpacingKey = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32

/**
 * Get spacing value, computing from available tokens if needed
 * Usage: getSpace(48) -> spacing[24] + spacing[24] or spacing[32] + spacing[16]
 */
export function getSpace(n: number): number {
  // If exact key exists, return it
  if (spacing[n as SpacingKey]) {
    return spacing[n as SpacingKey]
  }
  
  // Compute from available tokens
  // Strategy: use largest available tokens that sum to target
  const availableKeys: SpacingKey[] = [32, 24, 20, 16, 12, 10, 8, 6, 5, 4, 3, 2, 1]
  
  // Try to find exact combination
  let remaining = n
  let result = 0
  
  for (const key of availableKeys) {
    const value = spacing[key]
    const count = Math.floor(remaining / value)
    if (count > 0) {
      result += count * value
      remaining -= count * value
    }
    if (remaining === 0) break
  }
  
  // If we couldn't get exact, use closest available or compute
  if (remaining > 0) {
    // Find closest single token
    let closest = availableKeys[0]
    let minDiff = Math.abs(n - spacing[closest])
    
    for (const key of availableKeys) {
      const diff = Math.abs(n - spacing[key])
      if (diff < minDiff) {
        minDiff = diff
        closest = key
      }
    }
    
    // If closest single token is better than our sum, use it
    if (Math.abs(n - spacing[closest]) < Math.abs(n - result)) {
      return spacing[closest]
    }
  }
  
  return result || spacing[1] // Fallback to minimum
}

/**
 * Get spacing as a string with 'px' suffix
 */
export function getSpacePx(n: number): string {
  return `${getSpace(n)}px`
}

/**
 * Type-safe spacing accessor
 * Usage: getSpacing(48) -> returns computed value
 */
export function getSpacing(key: SpacingKey | number): number {
  if (spacing[key as SpacingKey]) {
    return spacing[key as SpacingKey]
  }
  return getSpace(key)
}
