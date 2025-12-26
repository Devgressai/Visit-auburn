import Link from 'next/link'
import { MapPin, UtensilsCrossed, Bed, Calendar, BookOpen, Map } from 'lucide-react'

interface QuickExplorationProps {
  className?: string
}

export function QuickExploration({ className = '' }: QuickExplorationProps) {
  const items = [
    { title: 'Things To Do', href: '/things-to-do', icon: MapPin, color: 'text-blue-600' },
    { title: 'Food & Drink', href: '/dining', icon: UtensilsCrossed, color: 'text-red-600' },
    { title: 'Where to Stay', href: '/accommodations', icon: Bed, color: 'text-purple-600' },
    { title: 'Events', href: '/events', icon: Calendar, color: 'text-orange-600' },
    { title: 'Discover', href: '/discover', icon: BookOpen, color: 'text-green-600' },
    { title: 'Plan Your Visit', href: '/plan', icon: Map, color: 'text-indigo-600' },
  ]

  return (
    <section className={`py-16 bg-white border-b border-gray-200 ${className}`}>
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center justify-center w-32 md:w-36 h-32 md:h-36 bg-gray-50 hover:bg-blue-50 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all duration-200"
              >
                <Icon className={`w-8 h-8 md:w-10 md:h-10 mb-3 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-blue-600 text-center px-2">
                  {item.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

