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
  subtitle = "Experience Gold Country's best-kept secret",
  heroImage = '/images/hero.jpg',
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
        {/* 
          DESIGN DECISION: Ultra-minimal overlay to preserve scenery visibility.
          No full-screen dark gradient—text gets its own localized backdrop below.
        */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.15) 0%,
              rgba(0, 0, 0, 0.05) 50%,
              rgba(0, 0, 0, 0.2) 100%
            )`
          }}
        />
      </div>

      {/* 
        MAIN CONTENT CONTAINER
        POSITIONING STRATEGY (Mobile-First):
        - Positioned lower in viewport (justify-end on mobile with pb-40 safe area)
        - Creates "anchored" feeling by placing text stack near bottom third
        - pt-20 prevents collision with fixed navigation
        - Desktop: more centered (justify-center) for traditional composition
      */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end md:justify-center items-start text-left px-4 sm:px-6 md:px-12 lg:px-20 pt-20 pb-40 md:pb-32">
        
        {/* 
          COHESIVE TEXT + CTA STACK
          DESIGN DECISION: All content grouped in single container with localized backdrop.
          - Left-aligned for natural reading flow
          - Max-width constrains for readability (no more than ~600px on mobile)
          - Subtle left-to-right gradient backdrop for contrast without covering scenery
        */}
        <div 
          className={`relative max-w-[90%] sm:max-w-xl md:max-w-2xl transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* 
            LOCALIZED TEXT BACKDROP
            - Left-to-right gradient fades to transparent (keeps right side of image visible)
            - Blur + semi-transparent black for WCAG-compliant contrast
            - Extends beyond text edges for breathing room
          */}
          <div 
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.4) 80%, transparent 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transform: 'translateX(-16px) translateY(-16px)',
              width: 'calc(100% + 48px)',
              height: 'calc(100% + 32px)',
            }}
          />

          {/* 
            CONTENT STACK (relative positioning to sit above backdrop)
            Tightly grouped: headline → subheadline → CTAs → trust line
            Reduced spacing to prevent "floating" feeling
          */}
          <div className="relative px-4 py-6 sm:px-6 sm:py-8">
            {/* 
              HEADLINE: Visit Auburn, California
              RESPONSIVE SIZING:
              - Mobile (390px): 32px (2rem) = 2 lines max
              - Tablet: 40-48px
              - Desktop: 64px+ 
              Line height 1.1 keeps it compact
            */}
            <h1 
              className="text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: '#FFFFFF',
                maxWidth: '100%',
                // Enhanced shadow for bright sky backgrounds
                textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)',
              }}
            >
              {title}
            </h1>

            {/* 
              SUBHEADLINE: Short descriptor
              - Kept brief for mobile (15-20 words max)
              - 16px mobile / 18px desktop
              - mb-6 for tight grouping with CTAs
            */}
            {subtitle && (
              <p 
                className="text-base sm:text-lg md:text-xl font-medium mb-6 md:mb-7"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  maxWidth: '480px',
                  lineHeight: '1.5',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)',
                }}
              >
                {subtitle}
              </p>
            )}

            {/* 
              CTA BUTTONS
              CONVERSION OPTIMIZATION:
              - "Plan Your Trip" = PRIMARY (filled, gold border) → trip planning intent
              - "Things To Do" = SECONDARY (outline) → browsing intent
              - Mobile: full-width stacked (better thumb reach)
              - Desktop: horizontal row (traditional)
              - 48px min-height for touch targets (WCAG 2.5.5)
              - 12px gap for separation
            */}
            <div 
              className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-0"
            >
              {/* PRIMARY CTA */}
              <Link 
                href="/plan/visitor-information" 
                className="inline-flex items-center justify-center font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-charcoal-800 text-white border-2 border-gold-500 hover:bg-charcoal-700 hover:border-gold-400 hover:shadow-lg transition-all duration-300 text-center"
                style={{ minHeight: '48px', minWidth: '160px' }}
              >
                Plan Your Trip
              </Link>
              
              {/* SECONDARY CTA */}
              <Link 
                href="/activities" 
                className="inline-flex items-center justify-center font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-white/80 text-white backdrop-blur-sm bg-white/5 hover:bg-white hover:text-charcoal-900 transition-all duration-300 text-center"
                style={{ minHeight: '48px', minWidth: '160px' }}
              >
                Things To Do
              </Link>
            </div>

            {/* 
              TRUST LINE (Mobile only)
              - Builds credibility with quick facts
              - Hidden on desktop to reduce clutter
            */}
            <p 
              className="text-xs sm:text-sm text-white/75 mt-3 md:hidden"
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
              }}
            >
              35 miles from Sacramento • 300+ days of sunshine
            </p>
          </div>
        </div>

        {/* Play Video Button - Desktop Only, positioned separately */}
        {videoUrl && (
          <button 
            onClick={() => setShowVideo(true)}
            className={`hidden md:flex mt-8 group items-center gap-3 text-white/80 hover:text-white transition-all duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="w-14 h-14 rounded-full border-2 border-white/40 group-hover:border-gold-400 group-hover:bg-gold-500/20 flex items-center justify-center transition-all">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
            <span className="font-medium">Watch the Video</span>
          </button>
        )}
      </div>

      {/* 
        STATS BAR - Desktop Only
        Mobile version handled by ProofChips component (see app/page.tsx)
      */}
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
          className="fixed inset-0 z-50 bg-charcoal-900/95 flex items-center justify-center p-8"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors text-lg font-medium"
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
