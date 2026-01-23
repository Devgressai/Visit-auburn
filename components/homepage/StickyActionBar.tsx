'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, MoreVertical, Route } from 'lucide-react'

const vibeChips = [
  { label: 'Adventure', href: '/things-to-do/outdoor-adventures' },
  { label: 'Family', href: '/search?q=family' },
  { label: 'Food & Wine', href: '/dining' },
  { label: 'History', href: '/things-to-do/history-culture' },
  { label: 'Relaxed', href: '/search?q=relaxed' },
]

export function StickyActionBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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
          setShowMoreMenu(false) // Close menu on scroll
        } else {
          setIsVisible(true)
        }
      } else {
        setHasScrolledPastHero(false)
        setIsVisible(false)
        setShowMoreMenu(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close menu on pointerdown outside (better for mobile/touch)
  useEffect(() => {
    if (showMoreMenu) {
      const handlePointerDownOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement
        if (
          menuRef.current &&
          buttonRef.current &&
          !menuRef.current.contains(target) &&
          !buttonRef.current.contains(target)
        ) {
          setShowMoreMenu(false)
        }
      }

      // Use pointerdown for better mobile/touch support
      document.addEventListener('pointerdown', handlePointerDownOutside)
      return () => document.removeEventListener('pointerdown', handlePointerDownOutside)
    }
  }, [showMoreMenu])

  // Close menu on Escape key
  useEffect(() => {
    if (showMoreMenu) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowMoreMenu(false)
          // Return focus to button after closing
          buttonRef.current?.focus()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [showMoreMenu])

  const handleMenuToggle = () => {
    setShowMoreMenu((prev) => !prev)
  }

  const handleMenuItemClick = () => {
    setShowMoreMenu(false)
  }

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
          {/* Column 1: Build Weekend */}
          <Link
            href="/itineraries"
            className="action-bar-btn py-3 hover:bg-white/10 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-forest-800 focus-visible:ring-2"
          >
            <Route className="w-6 h-6" />
            <span>Build Weekend</span>
          </Link>

          {/* Column 2: Things To Do */}
          <Link
            href="/things-to-do"
            className="action-bar-btn py-3 hover:bg-white/10 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-forest-800 focus-visible:ring-2"
          >
            <MapPin className="w-6 h-6" />
            <span>Things To Do</span>
          </Link>

          {/* Column 3: More (button only) */}
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={handleMenuToggle}
              className="action-bar-btn py-3 w-full hover:bg-white/10 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-forest-800 focus-visible:ring-2"
              aria-haspopup="menu"
              aria-expanded={showMoreMenu}
              aria-label="More options"
            >
              <MoreVertical className="w-6 h-6" />
              <span>More</span>
            </button>
            
            {/* More Menu Dropdown */}
            {showMoreMenu && (
              <div 
                ref={menuRef}
                className="absolute bottom-full left-0 right-0 mb-2 bg-forest-800/98 backdrop-blur-md rounded-lg border border-gold-500/30 shadow-xl overflow-hidden z-50"
                role="menu"
                aria-label="More options"
              >
                <div className="p-2 space-y-1">
                  {/* Events This Week link */}
                  <Link
                    href="/events"
                    onClick={handleMenuItemClick}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-forest-800 focus-visible:ring-2 transition-colors"
                    role="menuitem"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Events This Week</span>
                  </Link>
                  
                  {/* Divider */}
                  <div className="border-t border-white/10 my-1" />
                  
                  {/* Vibe chips list */}
                  {vibeChips.map((chip) => (
                    <Link
                      key={chip.label}
                      href={chip.href}
                      onClick={handleMenuItemClick}
                      className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-forest-800 focus-visible:ring-2 transition-colors"
                      role="menuitem"
                    >
                      {chip.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Spacer to prevent content from being hidden on mobile when bar is visible */}
      {hasScrolledPastHero && (
        <div className="md:hidden h-[72px]" aria-hidden="true" />
      )}
    </>
  )
}

