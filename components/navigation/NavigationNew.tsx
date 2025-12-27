'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-deep-surface/95 backdrop-blur-md border-b border-border-subtle py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.png"
              alt="Visit Auburn - California Gold Country"
              width={293}
              height={183}
              className="h-[117px] md:h-[137px] w-auto object-contain rounded-lg"
              priority
            />
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
                  className="flex items-center gap-1 px-4 py-2 text-text-muted hover:text-text-primary font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === item.name ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Dropdown */}
                {item.submenu && activeMenu === item.name && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-56"
                    onMouseEnter={() => setActiveMenu(item.name)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className="glass-surface rounded-xl shadow-xl overflow-hidden py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-text-muted hover:text-pine-400 hover:bg-white/5 transition-colors duration-200"
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

          {/* Right Side - CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/special-offers"
              className="px-5 py-2.5 bg-pine-500 hover:bg-pine-600 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-pine-500/20"
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-text-primary hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border-subtle pt-4">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-text-primary font-medium hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 border-l border-border-subtle pl-4 mt-1 mb-2">
                      {item.submenu.slice(0, 4).map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-text-muted hover:text-pine-400 text-sm transition-colors"
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
                className="mt-4 mx-4 text-center px-6 py-3 bg-pine-500 hover:bg-pine-600 text-white font-semibold rounded-full transition-colors"
              >
                Plan Your Trip
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
