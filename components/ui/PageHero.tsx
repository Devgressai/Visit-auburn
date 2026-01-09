'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPlaceholderImage, PlaceholderKey } from '@/lib/images'

interface PageHeroProps {
  title: string
  subtitle?: string
  eyebrow?: string
  backgroundImage?: string
  imageKey?: PlaceholderKey
  badge?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  overlay?: 'light' | 'dark' | 'gradient'
  breadcrumbs?: React.ReactNode
  ctas?: Array<{ label: string; href: string; variant?: 'primary' | 'secondary' }>
  minHeightPreset?: 'sticky-header' | 'standard'
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  backgroundImage,
  imageKey = 'hero',
  badge,
  size = 'md',
  overlay = 'gradient',
  breadcrumbs,
  ctas,
  minHeightPreset = 'standard'
}: PageHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const imageUrl = backgroundImage || getPlaceholderImage(imageKey)

  // Standardized heights across all Plan pages
  // All should have minimum 400px (or adjusted for sticky header)
  const heights = {
    sm: 'min-h-[400px] md:min-h-[450px]',
    md: 'min-h-[450px] md:min-h-[500px]',
    lg: 'min-h-[500px] md:min-h-[550px]',
    xl: 'min-h-[550px] md:min-h-[600px]'
  }

  const overlays = {
    light: 'bg-black/30',
    dark: 'bg-black/60',
    gradient: 'bg-gradient-to-b from-black/60 via-black/40 to-black/70'
  }

  return (
    <section className={`relative w-full overflow-hidden ${heights[size]}`}>
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        className={`object-cover transition-transform duration-[1.5s] ${
          isLoaded ? 'scale-100' : 'scale-105'
        }`}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlays[overlay]}`} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        {eyebrow && (
          <p 
            className={`uppercase tracking-[0.2em] text-xs md:text-sm font-medium text-gold-300 mb-3 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '50ms' }}
          >
            {eyebrow}
          </p>
        )}

        {badge && (
          <span 
            className={`inline-block text-gold-400 uppercase tracking-[0.2em] text-xs md:text-sm font-medium mb-4 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {badge}
          </span>
        )}

        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-700 font-display ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p 
            className={`text-lg md:text-xl text-white/90 max-w-2xl transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {subtitle}
          </p>
        )}

        {ctas && ctas.length > 0 && (
          <div 
            className={`flex flex-col sm:flex-row gap-4 mt-8 justify-center transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            {ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  cta.variant === 'secondary'
                    ? 'border-2 border-white/70 text-white hover:bg-white/10'
                    : 'bg-white text-charcoal-900 hover:bg-cream-50 shadow-lg'
                }`}
              >
                {cta.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {breadcrumbs && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="container mx-auto px-4 py-3">
            {breadcrumbs}
          </div>
        </div>
      )}
    </section>
  )
}

