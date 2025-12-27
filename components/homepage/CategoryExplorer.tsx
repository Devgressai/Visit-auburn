'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Compass, Mountain, Utensils, CalendarDays, Bed, Camera, ShoppingBag, TreePine } from 'lucide-react'

const categories = [
  {
    id: 'outdoor-adventures',
    title: 'Outdoor Adventures',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
    href: '/things-to-do/outdoor-adventures',
    icon: Mountain,
  },
  {
    id: 'history-culture',
    title: 'History & Culture',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80',
    href: '/things-to-do/history-culture',
    icon: Camera,
  },
  {
    id: 'food-drink',
    title: 'Food & Drink',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    href: '/dining',
    icon: Utensils,
  },
  {
    id: 'events',
    title: 'Events',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
    href: '/events',
    icon: CalendarDays,
  },
  {
    id: 'lodging',
    title: 'Where to Stay',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
    href: '/accommodations',
    icon: Bed,
  },
  {
    id: 'shopping',
    title: 'Shopping',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    href: '/things-to-do/arts-culture',
    icon: ShoppingBag,
  },
  {
    id: 'trails',
    title: 'Trails & Parks',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80',
    href: '/things-to-do/outdoor-adventures',
    icon: TreePine,
  },
  {
    id: 'explore',
    title: 'Explore All',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    href: '/discover',
    icon: Compass,
  },
]

export function CategoryExplorer() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-20 md:py-28 bg-deep-bg relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 px-4 md:px-0">
          <div>
            <p className="section-eyebrow">
              Dig In & Discover
            </p>
            <h2 className="section-title">
              Explore Auburn
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-3 mt-6 md:mt-0">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-border-subtle text-text-muted hover:border-pine-500 hover:text-pine-400 hover:bg-pine-500/10 flex items-center justify-center transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-border-subtle text-text-muted hover:border-pine-500 hover:text-pine-400 hover:bg-pine-500/10 flex items-center justify-center transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrolling Cards */}
        <div 
          ref={scrollRef}
          className="scroll-container pl-4 md:pl-0 -mr-4 md:mr-0"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={category.href}
                className="scroll-item group"
              >
                <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden category-card">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="w-12 h-12 rounded-full bg-pine-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-pine-400 transition-all shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-pine-300 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  
                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pine-500/50 transition-colors z-20" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
