'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPlaceholderImage, PlaceholderKey } from '@/lib/images'

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  imageKey?: PlaceholderKey
  badge?: string
  size?: 'sm' | 'md' | 'lg'
  overlay?: 'light' | 'dark' | 'gradient'
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  imageKey = 'hero',
  badge,
  size = 'md',
  overlay = 'gradient'
}: PageHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const imageUrl = backgroundImage || getPlaceholderImage(imageKey)

  const heights = {
    sm: 'h-64 md:h-80',
    md: 'h-80 md:h-96',
    lg: 'h-96 md:h-[28rem]'
  }

  const overlays = {
    light: 'bg-black/30',
    dark: 'bg-black/60',
    gradient: 'bg-gradient-to-b from-black/60 via-black/40 to-black/70'
  }

  return (
    <section className={`relative ${heights[size]} w-full overflow-hidden`}>
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
        {badge && (
          <span 
            className={`inline-block text-gold-400 uppercase tracking-[0.2em] text-sm font-medium mb-4 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {badge}
          </span>
        )}

        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p 
            className={`text-lg md:text-xl text-white/90 max-w-2xl transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

