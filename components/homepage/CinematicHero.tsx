'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, ChevronDown } from 'lucide-react'

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
  heroImage = '/images/hero.jpg',
  videoUrl,
  weather = { temp: 72, condition: 'sunny' }
}: CinematicHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [displayedSubtitle, setDisplayedSubtitle] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Typing effect for subtitle - disabled on mobile/reduced-motion
  useEffect(() => {
    // Check for mobile or reduced motion preference
    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (isMobile || prefersReducedMotion) {
      // Show full subtitle immediately on mobile or for reduced motion users
      setDisplayedSubtitle(subtitle)
      setCurrentIndex(subtitle.length)
      return
    }
    
    if (currentIndex < subtitle.length) {
      const timeout = setTimeout(() => {
        setDisplayedSubtitle(prev => prev + subtitle[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 40)
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, subtitle])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Auburn, California - Gold Country"
          fill
          priority
          sizes="100vw"
          quality={85}
          className={`object-cover transition-transform duration-[2s] ${isLoaded ? 'scale-100' : 'scale-110'}`}
        />
        {/* Enhanced overlay for better text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(0, 0, 0, 0.65) 0%,
              rgba(27, 67, 50, 0.45) 40%,
              rgba(0, 0, 0, 0.55) 100%
            )`
          }}
        />
        {/* Bottom gradient for stats bar readability */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: `linear-gradient(
              to top,
              rgba(27, 67, 50, 0.85) 0%,
              rgba(27, 67, 50, 0.5) 40%,
              transparent 100%
            )`
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-start text-left px-4 sm:px-6 md:px-12 lg:px-20 pt-28 md:pt-24 pb-32">
        {/* Main Title - Mobile Optimized */}
        <h1 
          className={`hero-title mb-6 md:mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: '200ms',
            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.6)'
          }}
        >
          {title}
        </h1>

        {/* Subtitle - Mobile Optimized */}
        <div 
          className={`relative max-w-2xl mb-8 md:mb-12 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: '400ms',
          }}
        >
          {/* Background glow for better readability */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/60 to-transparent blur-2xl -z-10 rounded-lg"
            style={{ transform: 'scale(1.1)' }}
          />
          {/* Semi-transparent background */}
          <div 
            className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm -z-10 rounded-lg"
            style={{ margin: '-12px -16px', padding: '12px 16px' }}
          />
          <p 
            className="hero-subtitle text-white relative"
            style={{ 
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,1)',
              lineHeight: '1.6'
            }}
          >
            {displayedSubtitle}
            {currentIndex < subtitle.length && (
              <span className="hidden md:inline-block w-0.5 h-6 bg-gold-400 ml-1 animate-pulse" style={{ verticalAlign: 'middle' }} />
            )}
          </p>
        </div>

        {/* CTA Buttons - Mobile: Single Column, Desktop: Row */}
        <div 
          className={`flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <Link href="/activities" className="btn-primary text-center">
            Things To Do
          </Link>
          <Link href="/plan/visitor-information" className="btn-outline-white text-center">
            Plan Your Trip
          </Link>
        </div>
        
        {/* Trust Line - Mobile Only */}
        <p className="hero-trust-line mt-4 md:hidden text-white/70">
          35 miles from Sacramento • 300+ days of sunshine
        </p>

        {/* Play Video Button - Desktop Only */}
        {videoUrl && (
          <button 
            onClick={() => setShowVideo(true)}
            className={`hidden md:flex mt-10 group items-center gap-3 text-text-muted hover:text-text-primary transition-all duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="w-14 h-14 rounded-full border-2 border-white/40 group-hover:border-pine-400 group-hover:bg-pine-500/20 flex items-center justify-center transition-all">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
            <span className="font-medium">Watch the Video</span>
          </button>
        )}
      </div>

      {/* Stats Bar - Desktop Only (mobile uses ProofChips) */}
      <div 
        className={`hidden md:block absolute bottom-0 left-0 right-0 z-20 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '800ms' }}
      >
        <div className="stats-bar">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border-subtle">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="py-6 md:py-8 px-4 md:px-8 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-text-muted font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Desktop Only */}
        <button 
          onClick={scrollToContent}
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-text-muted hover:text-pine-400 transition-colors animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      {/* Video Modal */}
      {showVideo && videoUrl && (
        <div 
          className="fixed inset-0 z-50 bg-deep-bg/95 flex items-center justify-center p-8"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-text-muted hover:text-pine-400 transition-colors"
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
