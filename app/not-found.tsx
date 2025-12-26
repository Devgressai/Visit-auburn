import Link from 'next/link'
import { Home, Search, MapPin, Calendar, Utensils, Bed } from 'lucide-react'

export default function NotFound() {
  const quickLinks = [
    { name: 'Activities', href: '/activities', icon: MapPin },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Dining', href: '/dining', icon: Utensils },
    { name: 'Accommodations', href: '/accommodations', icon: Bed },
  ]

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-32">
      <div className="text-center max-w-2xl">
        {/* 404 Number with Gold Gradient */}
        <div className="mb-8">
          <span className="text-[10rem] md:text-[14rem] font-black leading-none text-gradient-gold opacity-20 select-none">
            404
          </span>
        </div>

        {/* Content */}
        <div className="-mt-32 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-charcoal-600 mb-8">
            Looks like this trail leads nowhere. Let's get you back on track to explore Auburn.
          </p>

          {/* Primary CTA */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-gold-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-gold-600 transition-all duration-300 shadow-lg hover:shadow-xl mb-12"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>

          {/* Quick Links */}
          <div className="pt-8 border-t border-charcoal-200">
            <p className="text-charcoal-500 mb-6">Or explore popular sections:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-charcoal-200 rounded-full text-charcoal-700 hover:border-gold-400 hover:text-gold-600 transition-colors shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
