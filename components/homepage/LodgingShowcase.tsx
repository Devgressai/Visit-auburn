'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react'
import { accommodations } from '@/lib/data'
import { getImageUrl } from '@/lib/images'

const lodgingTypes = [
  { id: 'all', label: 'All Lodging' },
  { id: 'hotel', label: 'Hotels' },
  { id: 'cabin', label: 'Cabins' },
  { id: 'resort', label: 'Resorts' },
]

export function LodgingShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-gold-600 uppercase tracking-[0.2em] text-sm font-medium mb-3">
              Rest & Recharge
            </p>
            <h2 className="section-title">Auburn Lodging</h2>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            {/* Navigation */}
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border-2 border-charcoal-200 text-charcoal-400 hover:border-gold-500 hover:text-gold-500 flex items-center justify-center transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border-2 border-charcoal-200 text-charcoal-400 hover:border-gold-500 hover:text-gold-500 flex items-center justify-center transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Lodging Cards */}
        <div 
          ref={scrollRef}
          className="scroll-container -mx-4 px-4"
        >
          {accommodations.map((accommodation) => {
            const imageUrl = accommodation.featuredImage 
              ? getImageUrl(accommodation.featuredImage) 
              : null

            return (
              <Link
                key={accommodation._id}
                href={`/accommodations/${accommodation.slug.current}`}
                className="scroll-item group"
              >
                <div className="w-80 bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={accommodation.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    {/* Category Badge */}
                    {accommodation.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-charcoal-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                        {accommodation.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors flex-1 pr-2">
                        {accommodation.title}
                      </h3>
                      {accommodation.rating && (
                        <div className="flex items-center gap-1 text-gold-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold">{accommodation.rating}</span>
                        </div>
                      )}
                    </div>

                    {accommodation.excerpt && (
                      <p className="text-charcoal-500 text-sm line-clamp-2 mb-3">
                        {accommodation.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {accommodation.priceRange && (
                        <span className="text-charcoal-600 font-semibold">
                          {accommodation.priceRange}
                        </span>
                      )}
                      {accommodation.amenities && accommodation.amenities.length > 0 && (
                        <div className="flex gap-1">
                          {accommodation.amenities.slice(0, 3).map((amenity, i) => (
                            <span 
                              key={i}
                              className="text-xs bg-charcoal-100 text-charcoal-600 px-2 py-1 rounded"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link 
            href="/accommodations"
            className="inline-flex items-center gap-2 bg-charcoal-900 text-white font-semibold px-8 py-4 rounded-full hover:bg-gold-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Lodging
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

