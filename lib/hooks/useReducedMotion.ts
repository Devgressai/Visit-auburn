/**
 * Reduced Motion Hook
 * 
 * Detects user's motion preference for accessibility
 * 
 * Usage:
 * const shouldReduceMotion = useReducedMotion()
 */

import { useState, useEffect } from 'react'

export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduce(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduce(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return shouldReduce
}
