'use client'

/**
 * LazyMount - IntersectionObserver wrapper for lazy loading
 * 
 * Renders children only after the component enters the viewport.
 * Uses IntersectionObserver with configurable rootMargin for early loading.
 * 
 * @param rootMargin - Distance from viewport to trigger (default: '400px')
 * @param children - Content to render when in viewport
 */

import { useState, useEffect, useRef, ReactNode } from 'react'

interface LazyMountProps {
  children: ReactNode
  rootMargin?: string
  fallback?: ReactNode
}

export function LazyMount({ 
  children, 
  rootMargin = '400px',
  fallback = null 
}: LazyMountProps) {
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    // If IntersectionObserver is not available, render immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            // Disconnect after first intersection to avoid re-renders
            observer.disconnect()
          }
        })
      },
      {
        rootMargin,
        threshold: 0.01, // Trigger as soon as any part is visible
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin])

  return (
    <div ref={containerRef} style={{ minHeight: '1px' }}>
      {isInView ? children : fallback}
    </div>
  )
}
