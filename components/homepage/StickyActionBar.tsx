'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Compass } from 'lucide-react'

export function StickyActionBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.9 // Approximate hero height
      
      // Show bar only after scrolling past hero
      if (currentScrollY > heroHeight) {
        setHasScrolledPastHero(true)
        
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > heroHeight + 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      } else {
        setHasScrolledPastHero(false)
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Mobile only: < md breakpoint */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
          hasScrolledPastHero && isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(27, 67, 50, 0.98) 0%, rgba(20, 50, 45, 0.98) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(229, 185, 78, 0.3)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="grid grid-cols-3 divide-x divide-white/20">
          {/* Plan My Day */}
          <Link
            href="/plan/visitor-information"
            className="action-bar-btn py-3 hover:bg-white/10 active:bg-white/20"
          >
            <Compass className="w-6 h-6" />
            <span>Plan My Day</span>
          </Link>

          {/* Events */}
          <Link
            href="/events"
            className="action-bar-btn py-3 hover:bg-white/10 active:bg-white/20"
          >
            <Calendar className="w-6 h-6" />
            <span>Events</span>
          </Link>

          {/* Map */}
          <Link
            href="/plan/maps-guides"
            className="action-bar-btn py-3 hover:bg-white/10 active:bg-white/20"
          >
            <MapPin className="w-6 h-6" />
            <span>Map</span>
          </Link>
        </div>
      </div>
      
      {/* Spacer to prevent content from being hidden on mobile when bar is visible */}
      {hasScrolledPastHero && (
        <div className="md:hidden h-[72px]" aria-hidden="true" />
      )}
    </>
  )
}

