'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, MapPin, Sun, ChevronDown } from 'lucide-react'
import { getPlaceholderImage } from '@/lib/images'

interface CinematicHeroProps {
  title?: string
  subtitle?: string
  heroImage?: string
  videoUrl?: string
  weather?: {
    temp: number
    condition: string
  }
}

const stats = [
  { value: '300+', label: 'Days of Sunshine' },
  { value: '1,255', label: 'Feet Elevation' },
  { value: '1848', label: 'Year Founded' },
  { value: '30+', label: 'Miles of Trails' },
]

export function CinematicHero({
  title = 'Auburn',
  subtitle = "Where Gold Country history meets Sierra Nevada adventure. Discover California's best-kept secret in the heart of the foothills.",
  heroImage,
  videoUrl,
  weather = { temp: 72, condition: 'sunny' }
}: CinematicHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage || getPlaceholderImage('hero')}
          alt="Auburn, California - Gold Country"
          fill
          priority
          className={`object-cover transition-transform duration-[2s] brightness-[1.33] ${isLoaded ? 'scale-100' : 'scale-110'}`}
        />
        {/* Gradient Overlays - Lighter for brighter feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      {/* Weather Widget - Top Right */}
      <div className="absolute top-24 right-6 md:right-12 z-20">
        <div className="glass-dark rounded-full px-5 py-3 flex items-center gap-3">
          <Sun className="w-5 h-5 text-gold-400" />
          <span className="text-white font-medium">{weather.condition}</span>
          <span className="text-white font-bold">{weather.temp}°F</span>
        </div>
      </div>

      {/* Quick Links - Top Right Below Weather */}
      <div className="absolute top-36 right-6 md:right-12 z-20 hidden md:flex flex-col gap-2">
        <Link 
          href="/plan/getting-here" 
          className="glass-dark rounded-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          Road Conditions
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        {/* Pre-title */}
        <p 
          className={`text-gold-400 uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Explore the Wonder of
        </p>

        {/* Main Title */}
        <h1 
          className={`hero-title text-white mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p 
          className={`hero-subtitle text-white/90 max-w-3xl mb-12 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <Link href="/accommodations" className="btn-gold">
            Places to Stay
          </Link>
          <Link href="/things-to-do" className="btn-outline-white">
            Things to Do
          </Link>
        </div>

        {/* Play Video Button */}
        {videoUrl && (
          <button 
            onClick={() => setShowVideo(true)}
            className={`group flex items-center gap-3 text-white/80 hover:text-white transition-all duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <div className="w-14 h-14 rounded-full border-2 border-white/50 group-hover:border-white group-hover:bg-white/20 flex items-center justify-center transition-all">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
            <span className="font-medium">Play Full Video</span>
          </button>
        )}
      </div>

      {/* Stats Bar - Bottom */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="stats-bar">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="py-6 md:py-8 px-4 md:px-8 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/70 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToContent}
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      {/* Video Modal */}
      {showVideo && videoUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gold-400 transition-colors"
            >
              Close
            </button>
            <iframe
              src={videoUrl}
              className="w-full h-full rounded-lg"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}

