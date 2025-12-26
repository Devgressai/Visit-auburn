'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'
import { navigation as staticNavigation } from '@/lib/data'
import { WeatherWidget } from '@/components/ui/WeatherWidget'
import { SearchBar } from '@/components/ui/SearchBar'

interface NavigationItem {
  title: string
  slug?: { current: string }
  description?: string
  children?: NavigationItem[]
}

interface NavigationProps {
  navigation?: {
    mainNavigation: NavigationItem[]
  }
}

export function Navigation({ navigation }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpenItems, setMobileOpenItems] = useState<Set<string>>(new Set())
  const pathname = usePathname()
  
  // Check if we're on the homepage
  const isHomepage = pathname === '/'

  // Use provided navigation or default to static navigation
  const navItems = navigation?.mainNavigation || staticNavigation.mainNavigation

  // Legacy default navigation structure (kept for reference but not used)
  const defaultNav: NavigationItem[] = [
    {
      title: 'Stay',
      description: 'Hotels, resorts, and vacation rentals',
      children: [
        { title: 'All Accommodations', slug: { current: '/accommodations' } },
        { title: 'Hotels & Motels', slug: { current: '/accommodations?category=hotels' } },
        { title: 'Vacation Rentals', slug: { current: '/accommodations?category=vacation-rentals' } },
        { title: 'Bed & Breakfasts', slug: { current: '/accommodations?category=bed-breakfasts' } },
      ],
    },
    {
      title: 'Things to Do',
      description: 'Activities and attractions',
      children: [
        { title: 'All Activities', slug: { current: '/things-to-do' } },
        { title: 'Outdoor Adventures', slug: { current: '/things-to-do/outdoor-adventures' } },
        { title: 'History & Culture', slug: { current: '/things-to-do/history-culture' } },
        { title: 'Arts & Culture', slug: { current: '/things-to-do/arts-culture' } },
        { title: 'Shopping', slug: { current: '/things-to-do/shopping' } },
      ],
    },
    {
      title: 'Food & Drink',
      description: 'Restaurants, cafes, and breweries',
      children: [
        { title: 'All Dining', slug: { current: '/dining' } },
        { title: 'Restaurants', slug: { current: '/dining?category=restaurants' } },
        { title: 'Cafes & Coffee', slug: { current: '/dining?category=cafes' } },
        { title: 'Breweries & Wineries', slug: { current: '/dining?category=breweries-wineries' } },
      ],
    },
    {
      title: 'Events',
      description: 'Upcoming events and festivals',
      slug: { current: '/events' },
    },
    {
      title: 'Discover',
      description: 'Stories and insights about Auburn',
      slug: { current: '/discover' },
    },
    {
      title: 'Plan',
      description: 'Travel information and resources',
      children: [
        { title: 'Getting Here', slug: { current: '/plan/getting-here' } },
        { title: 'Visitor Information', slug: { current: '/plan/visitor-information' } },
        { title: 'Maps & Guides', slug: { current: '/plan/maps-guides' } },
      ],
    },
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMobileItem = (title: string) => {
    const newSet = new Set(mobileOpenItems)
    if (newSet.has(title)) {
      newSet.delete(title)
    } else {
      newSet.add(title)
    }
    setMobileOpenItems(newSet)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHomepage ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-md'}`}>
      <div className="container">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className={`text-sm md:text-base font-semibold leading-tight transition-colors ${isHomepage ? 'text-white/90 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>Visit</span>
            <span className={`text-2xl md:text-3xl font-bold leading-tight transition-colors ${isHomepage ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>Auburn</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Weather Widget */}
            <WeatherWidget isHomepage={isHomepage} />
            
            {/* Search Bar */}
            <SearchBar isHomepage={isHomepage} />
            
            {navItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.slug ? (
                  <Link
                    href={item.slug.current}
                    className={`px-3 py-2 text-sm font-semibold transition-all relative group ${isHomepage ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}`}
                  >
                    {item.title}
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform ${isHomepage ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                  </Link>
                ) : (
                  <button className={`px-3 py-2 text-sm font-semibold transition-all flex items-center gap-1 relative group ${isHomepage ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}`}>
                    {item.title}
                    {item.children && <ChevronDown className="w-4 h-4" />}
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform ${isHomepage ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                  </button>
                )}

                {/* Mega Menu */}
                {item.children && activeDropdown === item.title && (
                  <div className="absolute left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 py-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-6 mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      )}
                    </div>
                    <div className="border-t border-gray-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.slug?.current || '#'}
                          className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all hover:translate-x-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Special Offers Button */}
            <Link
              href="/special-offers"
              className={`px-6 py-3 text-white text-sm font-bold rounded-full transition-all hover:scale-105 hover:shadow-lg ${isHomepage ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-purple-500/50' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-blue-500/50'}`}
            >
              Special Offers
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${isHomepage ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-gray-900'}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 md:top-24 bg-white z-50 overflow-y-auto">
          <div className="container py-6">
            {navItems.map((item) => (
              <div key={item.title} className="border-b border-gray-200">
                {item.slug && !item.children ? (
                  <Link
                    href={item.slug.current}
                    className="block py-4 text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleMobileItem(item.title)}
                      className="w-full flex items-center justify-between py-4 text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      <span>{item.title}</span>
                      {item.children && (
                        mobileOpenItems.has(item.title) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )
                      )}
                    </button>
                    {item.children && mobileOpenItems.has(item.title) && (
                      <div className="pb-4 pl-4 space-y-2">
                        {item.description && (
                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        )}
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.slug?.current || '#'}
                            className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
