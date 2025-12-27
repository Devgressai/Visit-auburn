'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react'
import { accommodations } from '@/lib/data'
import { getImageUrl } from '@/lib/images'

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
    <section className="py-20 md:py-28 bg-deep-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="section-eyebrow">
              Rest & Recharge
            </p>
            <h2 className="section-title">Auburn Lodging</h2>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            {/* Navigation */}
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-border-subtle text-text-muted hover:border-pine-500 hover:text-pine-400 flex items-center justify-center transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-border-subtle text-text-muted hover:border-pine-500 hover:text-pine-400 flex items-center justify-center transition-all"
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
                <div className="w-80 glass-surface rounded-2xl overflow-hidden card-hover">
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
                      <div className="absolute top-4 left-4 pine-badge">
                        {accommodation.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-pine-400 transition-colors flex-1 pr-2">
                        {accommodation.title}
                      </h3>
                      {accommodation.rating && (
                        <div className="flex items-center gap-1 text-gold-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold">{accommodation.rating}</span>
                        </div>
                      )}
                    </div>

                    {accommodation.excerpt && (
                      <p className="text-text-muted text-sm line-clamp-2 mb-3">
                        {accommodation.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {accommodation.priceRange && (
                        <span className="text-text-primary font-semibold">
                          {accommodation.priceRange}
                        </span>
                      )}
                      {accommodation.amenities && accommodation.amenities.length > 0 && (
                        <div className="flex gap-1">
                          {accommodation.amenities.slice(0, 2).map((amenity, i) => (
                            <span 
                              key={i}
                              className="text-xs bg-white/5 text-text-muted px-2 py-1 rounded border border-border-subtle"
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
        <div className="text-center mt-12">
          <Link 
            href="/accommodations"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Lodging
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
