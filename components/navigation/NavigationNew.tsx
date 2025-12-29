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
      { name: 'Special Offers', href: '/special-offers' },
    ],
  },
  {
    name: 'Things To Do',
    href: '/things-to-do',
    submenu: [
      { name: 'All Activities', href: '/things-to-do' },
      { name: 'Outdoor Adventures', href: '/things-to-do/outdoor-adventures' },
      { name: 'History & Culture', href: '/things-to-do/history-culture' },
      { name: 'Arts & Culture', href: '/things-to-do/arts-culture' },
      { name: 'Events Calendar', href: '/events' },
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
    name: 'Discover',
    href: '/discover',
  },
  {
    name: 'Plan',
    href: '/plan/visitor-information',
    submenu: [
      { name: 'Visitor Information', href: '/plan/visitor-information' },
      { name: 'Getting Here', href: '/plan/getting-here' },
      { name: 'Maps & Guides', href: '/plan/maps-guides' },
      { name: 'FAQ', href: '/plan/faq' },
      { name: 'Respect Auburn', href: '/plan/respect-auburn' },
      { name: 'Weddings & Events', href: '/plan/weddings' },
      { name: 'Meetings & Groups', href: '/plan/meetings' },
      { name: 'Venues', href: '/plan/venues' },
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
          ? 'bg-deep-surface/95 backdrop-blur-md border-b border-border-subtle py-2 md:py-3' 
          : 'bg-transparent py-3 md:py-5'
      }`}
    >
      <div className="w-full px-0">
        <div className="flex items-center justify-between pr-4 md:pr-6">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Visit Auburn - California Gold Country"
              width={293}
              height={183}
              className="h-[90px] md:h-[117px] lg:h-[137px] w-auto object-contain rounded-lg"
              priority
              sizes="(max-width: 768px) 180px, (max-width: 1024px) 234px, 293px"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-6 py-3 text-text-primary hover:text-gold-400 font-extrabold transition-colors duration-200 rounded-lg hover:bg-gold-500/10 text-xl"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${activeMenu === item.name ? 'rotate-180' : ''}`} />
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
                          className="block px-4 py-2.5 text-white/90 hover:text-gold-400 hover:bg-gold-500/10 transition-colors duration-200 font-medium"
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
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <Link 
              href="/special-offers"
              className="px-5 py-2.5 bg-gradient-forest hover:bg-forest-600 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-forest-500/20 whitespace-nowrap"
            >
              Special Offers
            </Link>
          </div>

          {/* Mobile Menu Button - 48px tap target */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 text-text-primary hover:bg-white/10 rounded-lg transition-colors"
            style={{ minWidth: '48px', minHeight: '48px' }}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - Full height, thumb-friendly */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[96px] md:top-[120px] bottom-0 bg-deep-surface/98 backdrop-blur-lg border-t border-border-subtle overflow-y-auto">
            <nav className="flex flex-col p-4 pb-24">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-border-subtle last:border-0">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-4 text-text-primary font-bold hover:bg-white/5 rounded-lg transition-colors text-lg"
                    style={{ minHeight: '56px' }}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 border-l-2 border-gold-500/30 pl-4 pb-3">
                      {item.submenu.slice(0, 5).map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-3 text-text-muted hover:text-pine-400 transition-colors"
                          style={{ minHeight: '48px' }}
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
                className="mt-6 mx-2 text-center px-6 py-4 bg-gradient-forest hover:bg-forest-600 text-white font-semibold rounded-full transition-colors shadow-lg"
                style={{ minHeight: '56px' }}
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
