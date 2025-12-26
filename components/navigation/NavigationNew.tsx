'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Sun, MapPin } from 'lucide-react'

const navigation = [
  {
    name: 'Stay',
    href: '/accommodations',
    submenu: [
      { name: 'All Accommodations', href: '/accommodations' },
      { name: 'Hotels', href: '/accommodations?category=hotel' },
      { name: 'Cabins & Rentals', href: '/accommodations?category=cabin' },
    ],
  },
  {
    name: 'Things To Do',
    href: '/things-to-do',
    submenu: [
      { name: 'All Activities', href: '/activities' },
      { name: 'Outdoor Adventures', href: '/things-to-do/outdoor-adventures' },
      { name: 'History & Culture', href: '/things-to-do/history-culture' },
      { name: 'Arts & Culture', href: '/things-to-do/arts-culture' },
    ],
  },
  {
    name: 'Food & Drink',
    href: '/dining',
    submenu: [
      { name: 'All Dining', href: '/dining' },
      { name: 'Restaurants', href: '/dining?category=restaurant' },
      { name: 'Wineries', href: '/dining?category=winery' },
      { name: 'Cafes', href: '/dining?category=cafe' },
    ],
  },
  {
    name: 'Events',
    href: '/events',
  },
  {
    name: 'Plan My Visit',
    href: '/plan',
    submenu: [
      { name: 'Getting Here', href: '/plan/getting-here' },
      { name: 'Visitor Information', href: '/plan/visitor-information' },
      { name: 'Maps & Guides', href: '/plan/maps-guides' },
      { name: 'FAQ', href: '/plan/faq' },
      { name: 'Respect Auburn', href: '/plan/respect-auburn' },
      { name: 'Weddings', href: '/plan/weddings' },
      { name: 'Meetings', href: '/plan/meetings' },
    ],
  },
]

export function NavigationNew() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-charcoal-900/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-white font-bold text-lg">VA</span>
            </div>
            <span className="text-white font-display text-xl font-bold hidden sm:block group-hover:text-gold-400 transition-colors">
              Visit Auburn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-white/90 hover:text-white font-medium transition-colors rounded-lg hover:bg-white/10`}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {item.submenu && activeMenu === item.name && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-56"
                    onMouseEnter={() => setActiveMenu(item.name)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-charcoal-700 hover:text-gold-600 hover:bg-cream-100 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side - Weather & Special Offers */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/special-offers"
              className="px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Special Offers
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 border-l border-white/20 pl-4 mt-1 mb-2">
                      {item.submenu.slice(0, 4).map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-white/70 hover:text-white text-sm transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/special-offers"
                onClick={() => setIsOpen(false)}
                className="mt-4 mx-4 text-center px-6 py-3 bg-gold-500 text-white font-semibold rounded-full"
              >
                Special Offers
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

