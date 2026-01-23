'use client'

/**
 * Cinematic Hero Section - Premium Tourism Experience
 * 
 * Fully tokenized with design system integration
 * Features:
 * - GSAP-powered cinematic animations (token-based)
 * - Parallax scrolling effects
 * - Premium, trustworthy, warm tone
 * - Mobile-first responsive design
 * - Accessibility compliant with reduced motion support
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, ChevronDown, MapPin } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, colors, spacing, typography, elevation, depth, breakpoints, interaction, blur, borders, grid } from '@/lib/designTokens'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { HOMEPAGE_STATS } from '@/lib/constants/stats'
import { WeatherData } from '@/lib/weather'
import { trackHeroPrimaryClick, trackHeroVibeClick, trackHeroQuickPlanClick } from '@/lib/analytics'
import { MicroLabel } from '@/components/ui/MicroLabel'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  try {
    gsap.registerPlugin(ScrollTrigger)
  } catch (e) {
    console.warn('ScrollTrigger not available, parallax disabled')
  }
}

interface CinematicHeroProps {
  title?: string
  subtitle?: string
  heroImage?: string
  videoUrl?: string
}

export function CinematicHero({
  title = 'Visit Auburn, California',
  subtitle = "Experience Gold Country's best-kept secret",
  heroImage = '/images/hero-main.webp',
  videoUrl,
}: CinematicHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const shouldReduceMotion = useReducedMotion()
  
  // Fetch weather if feature flag is enabled
  useEffect(() => {
    const enableWeather = process.env.NEXT_PUBLIC_ENABLE_WEATHER_WIDGET === 'true'
    if (enableWeather) {
      fetch('/api/weather')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && !data.error) {
            setWeather(data)
          }
        })
        .catch(() => {
          // Silently fail - weather is optional
        })
    }
  }, [])
  
  // Refs for GSAP animations
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const trustLineRef = useRef<HTMLParagraphElement>(null)
  const videoButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // GSAP animations on mount - fully tokenized
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Convert token durations to seconds for GSAP
      const titleDuration = shouldReduceMotion ? 0 : motion.duration.verySlow / 1000
      const subtitleDuration = shouldReduceMotion ? 0 : motion.duration.slower / 1000
      const ctaDuration = shouldReduceMotion ? 0 : motion.duration.slower / 1000
      const statsDuration = shouldReduceMotion ? 0 : motion.duration.slower / 1000
      const badgeDuration = shouldReduceMotion ? 0 : motion.duration.slower / 1000
      const trustLineDuration = shouldReduceMotion ? 0 : motion.duration.slower / 1000
      const videoButtonDuration = shouldReduceMotion ? 0 : motion.duration.slower / 1000

      // Create master timeline with token easing
      const tl = gsap.timeline({ defaults: { ease: motion.easing.smooth } })

      // Title animation - cinematic reveal
      if (titleRef.current && !shouldReduceMotion) {
        gsap.set(titleRef.current, { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' })
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: titleDuration,
          ease: motion.easing.smooth
        }, motion.delay.medium / 1000)
      } else if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1, y: 0 })
      }

      // Subtitle animation - elegant fade in
      if (subtitleRef.current && !shouldReduceMotion) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 40 })
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: subtitleDuration,
          ease: motion.easing.natural
        }, motion.delay.long / 1000)
      } else if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 1, y: 0 })
      }

      // Badge animation
      if (badgeRef.current && !shouldReduceMotion) {
        gsap.to(badgeRef.current, {
          opacity: 1,
          duration: badgeDuration,
          delay: motion.delay.medium / 1000,
          ease: motion.easing.natural
        })
      } else if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 1 })
      }

      // CTA buttons - staggered entrance
      if (ctaRef.current && !shouldReduceMotion) {
        const buttons = ctaRef.current.children
        gsap.set(buttons, { opacity: 0, y: 30, scale: 0.95 })
        tl.to(buttons, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ctaDuration,
          stagger: motion.delay.short / 1000,
          ease: motion.easing.bounce
        }, motion.delay.veryLong / 1000)
      } else if (ctaRef.current) {
        const buttons = ctaRef.current.children
        gsap.set(buttons, { opacity: 1, y: 0, scale: 1 })
      }

      // Stats bar - slide up
      if (statsRef.current && !shouldReduceMotion) {
        gsap.set(statsRef.current, { opacity: 0, y: 40 })
        tl.to(statsRef.current, {
          opacity: 1,
          y: 0,
          duration: statsDuration,
          ease: motion.easing.natural
        }, motion.delay.veryLong / 1000)
      } else if (statsRef.current) {
        gsap.set(statsRef.current, { opacity: 1, y: 0 })
      }

      // Trust line
      if (trustLineRef.current && !shouldReduceMotion) {
        gsap.to(trustLineRef.current, {
          opacity: 1,
          duration: trustLineDuration,
          delay: (motion.delay.veryLong + motion.delay.long) / 1000,
          ease: motion.easing.natural
        })
      } else if (trustLineRef.current) {
        gsap.set(trustLineRef.current, { opacity: 1 })
      }

      // Video button
      if (videoButtonRef.current && !shouldReduceMotion) {
        gsap.to(videoButtonRef.current, {
          opacity: 1,
          duration: videoButtonDuration,
          delay: (motion.delay.veryLong + motion.delay.long) / 1000,
          ease: motion.easing.natural
        })
      } else if (videoButtonRef.current) {
        gsap.set(videoButtonRef.current, { opacity: 1 })
      }

      // Scroll indicator - smooth pulse animation
      if (scrollIndicatorRef.current && !shouldReduceMotion) {
        gsap.to(scrollIndicatorRef.current, {
          y: 8, // Reduced movement for subtlety
          opacity: 0.7, // Better visibility
          duration: motion.duration.slower / 1000, // Slower, more elegant
          repeat: -1,
          yoyo: true,
          ease: motion.easing.natural // More natural easing
        })
      }

      // Parallax effect on scroll - GPU-friendly with smooth easing
      if (imageRef.current && heroRef.current && typeof ScrollTrigger !== 'undefined' && !shouldReduceMotion) {
        try {
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5, // Smoother scrubbing
            onUpdate: (self) => {
              const progress = self.progress
              // Use transform for GPU acceleration with smoother easing
              gsap.to(imageRef.current, {
                y: progress * 80, // Reduced parallax distance for subtlety
                scale: 1 + progress * 0.08, // Reduced scale for subtlety
                duration: 0.1,
                ease: motion.easing.natural,
                force3D: true // GPU acceleration
              })
            }
          })
        } catch (e) {
          // Parallax not available, continue without it
        }
      }
    }, heroRef)

    return () => ctx.revert()
  }, [isLoaded, shouldReduceMotion])

  const scrollToContent = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ zIndex: depth.base }}
      aria-label="Hero section"
    >
      {/* Background Image with Parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0"
        style={{ 
          willChange: shouldReduceMotion ? 'auto' : 'transform',
          transform: 'translateZ(0)' // GPU acceleration
        }}
      >
        <Image
          src={imageError ? '/images/hero-main.webp' : heroImage}
          alt="Auburn, California - Gold Country landscape"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
          onError={() => setImageError(true)}
        />
        {/* Subtle gradient overlay - improved contrast for readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.25) 0%,
              rgba(0, 0, 0, 0.08) 35%,
              rgba(0, 0, 0, 0.12) 65%,
              rgba(0, 0, 0, 0.35) 100%
            )`
          }}
        />
      </div>

      {/* Main Content */}
      <div 
        className="relative min-h-screen flex flex-col justify-center items-start text-left"
          style={{
            zIndex: depth.content,
            paddingLeft: `clamp(${spacing[4]}px, 4vw, ${spacing[20]}px)`,
            paddingRight: `clamp(${spacing[4]}px, 4vw, ${spacing[20]}px)`,
            paddingTop: `clamp(${spacing[20]}px, 8vh, ${spacing[24] + spacing[4]}px)`, // Better mobile spacing
            paddingBottom: `clamp(${spacing[24]}px, 6vh, ${spacing[32]}px)`, // Better mobile spacing
          }}
      >
        {/* Location Badge - Premium touch with glass effect */}
        <div className="flex items-center gap-3 flex-wrap">
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full text-white/95 font-medium"
            style={{
              opacity: 0,
              padding: `${spacing[2] + spacing[1]}px ${spacing[4] + spacing[1]}px`, // Better touch target
              marginBottom: `clamp(${spacing[4]}px, 2vh, ${spacing[6]}px)`, // Responsive spacing
              backgroundColor: 'rgba(255, 255, 255, 0.12)', // Slightly more visible
              backdropFilter: `blur(${blur.md})`,
              border: `1px solid rgba(255, 255, 255, 0.25)`, // Better contrast
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              transform: 'translateZ(0)', // GPU acceleration
            }}
          >
            <MapPin style={{ width: spacing[4], height: spacing[4] }} />
            <span>Gold Country, California</span>
          </div>
          
          {/* Weather Display - Only if enabled and data exists */}
          {weather && (
            <div 
              className="inline-flex items-center gap-2 rounded-full text-white/95 font-medium"
              style={{
                padding: `${spacing[2] + spacing[1]}px ${spacing[4] + spacing[1]}px`,
                marginBottom: `clamp(${spacing[4]}px, 2vh, ${spacing[6]}px)`,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: `blur(${blur.md})`,
                border: `1px solid rgba(255, 255, 255, 0.25)`,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                transform: 'translateZ(0)',
              }}
            >
              <span>{weather.temp}°F</span>
              <MicroLabel 
                tone="info" 
                size="xs" 
                className="font-normal"
                aria-label="Live weather data"
              >
                Live
              </MicroLabel>
            </div>
          )}
        </div>

        {/* Main Title */}
        <h1 
          ref={titleRef}
          style={{
            fontFamily: typography.fontFamily.display,
            fontSize: typography.fontSize.hero,
            fontWeight: typography.fontWeight.black,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: typography.letterSpacing.tight,
            color: '#FFFFFF',
            textShadow: `0 2px 20px rgba(0,0,0,0.6), 0 4px 40px rgba(0,0,0,0.4), 0 8px 60px rgba(0,0,0,0.3)`,
            marginBottom: `clamp(${spacing[4]}px, 2vh, ${spacing[8]}px)`, // Better responsive spacing
            transform: 'translateZ(0)', // GPU acceleration
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p 
            ref={subtitleRef}
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.normal,
              lineHeight: typography.lineHeight.relaxed,
              color: 'rgba(255, 255, 255, 0.95)', // Better readability
              textShadow: '0 1px 10px rgba(0,0,0,0.8), 0 2px 20px rgba(0,0,0,0.7), 0 4px 30px rgba(0,0,0,0.6)',
              maxWidth: '42rem', // Better max-width for readability
              marginBottom: `clamp(${spacing[6]}px, 3vh, ${spacing[12]}px)`, // Better responsive spacing
              transform: 'translateZ(0)', // GPU acceleration
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Decision Hero Interface - Primary Actions */}
        <div 
          ref={ctaRef}
          className="w-full sm:w-auto"
          style={{
            marginBottom: `clamp(${spacing[4]}px, 2vh, ${spacing[6]}px)`,
          }}
        >
          {/* Primary Buttons */}
          <div 
            className="flex flex-col sm:flex-row w-full sm:w-auto"
            style={{
              gap: `clamp(${spacing[3]}px, 1.5vw, ${spacing[4]}px)`,
            }}
          >
            <Link 
              href="/itineraries" 
              className="text-center group relative overflow-hidden rounded-xl font-semibold transition-all"
              style={{
                padding: `clamp(${spacing[3] + spacing[1]}px, 1.5vw, ${spacing[4]}px) clamp(${spacing[6]}px, 3vw, ${spacing[8]}px)`,
                minHeight: '44px',
                backgroundColor: colors.semantic.primary,
                color: '#FFFFFF',
                boxShadow: elevation.shadow.lg,
                transform: 'translateZ(0)',
              }}
              onClick={() => trackHeroPrimaryClick('build_weekend')}
              onMouseEnter={(e) => {
                if (!shouldReduceMotion) {
                  gsap.to(e.currentTarget, {
                    backgroundColor: colors.semantic.primaryHover,
                    boxShadow: elevation.shadow.xl,
                    scale: interaction.hover.scaleSm,
                    duration: motion.duration.normal / 1000,
                    ease: motion.easing.natural,
                    force3D: true
                  })
                }
              }}
              onMouseLeave={(e) => {
                if (!shouldReduceMotion) {
                  gsap.to(e.currentTarget, {
                    backgroundColor: colors.semantic.primary,
                    boxShadow: elevation.shadow.lg,
                    scale: 1,
                    duration: motion.duration.normal / 1000,
                    ease: motion.easing.natural,
                    force3D: true
                  })
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid ${interaction.focus.ringColor}`
                e.currentTarget.style.outlineOffset = `${interaction.focus.ringOffset}px`
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none'
              }}
            >
              <span className="relative z-10">Build a Weekend</span>
            </Link>
            <Link 
              href="/things-to-do" 
              className="text-center group relative overflow-hidden rounded-xl font-semibold transition-all"
              style={{
                padding: `clamp(${spacing[3] + spacing[1]}px, 1.5vw, ${spacing[4]}px) clamp(${spacing[6]}px, 3vw, ${spacing[8]}px)`,
                minHeight: '44px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: `blur(${blur.md})`,
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                transform: 'translateZ(0)',
              }}
              onClick={() => trackHeroPrimaryClick('things_to_do')}
              onMouseEnter={(e) => {
                if (!shouldReduceMotion) {
                  gsap.to(e.currentTarget, {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    scale: interaction.hover.scaleSm,
                    duration: motion.duration.normal / 1000,
                    ease: motion.easing.natural,
                    force3D: true
                  })
                }
              }}
              onMouseLeave={(e) => {
                if (!shouldReduceMotion) {
                  gsap.to(e.currentTarget, {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    scale: 1,
                    duration: motion.duration.normal / 1000,
                    ease: motion.easing.natural,
                    force3D: true
                  })
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid ${interaction.focus.ringColor}`
                e.currentTarget.style.outlineOffset = `${interaction.focus.ringOffset}px`
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none'
              }}
            >
              <span className="relative z-10">Things To Do</span>
            </Link>
            <Link 
              href="/events" 
              className="text-center group relative overflow-hidden rounded-xl font-semibold transition-all"
              style={{
                padding: `clamp(${spacing[3] + spacing[1]}px, 1.5vw, ${spacing[4]}px) clamp(${spacing[6]}px, 3vw, ${spacing[8]}px)`,
                minHeight: '44px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: `blur(${blur.md})`,
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                transform: 'translateZ(0)',
              }}
              onClick={() => trackHeroPrimaryClick('events_this_week')}
              onMouseEnter={(e) => {
                if (!shouldReduceMotion) {
                  gsap.to(e.currentTarget, {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    scale: interaction.hover.scaleSm,
                    duration: motion.duration.normal / 1000,
                    ease: motion.easing.natural,
                    force3D: true
                  })
                }
              }}
              onMouseLeave={(e) => {
                if (!shouldReduceMotion) {
                  gsap.to(e.currentTarget, {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    scale: 1,
                    duration: motion.duration.normal / 1000,
                    ease: motion.easing.natural,
                    force3D: true
                  })
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid ${interaction.focus.ringColor}`
                e.currentTarget.style.outlineOffset = `${interaction.focus.ringOffset}px`
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none'
              }}
            >
              <span className="relative z-10">Events This Week</span>
            </Link>
          </div>

          {/* Quick Itinerary Shortcuts */}
          <div 
            className="flex flex-col gap-1.5 mt-3"
            style={{
              marginTop: `clamp(${spacing[3]}px, 1.5vh, ${spacing[4]}px)`,
            }}
            role="group"
            aria-label="Quick plans"
          >
            {/* Label */}
            <MicroLabel 
              tone="info" 
              size="xs"
              style={{
                marginBottom: spacing[1],
              }}
            >
              Quick plans
            </MicroLabel>
            
            {/* Shortcuts Container */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '1 Day', href: '/itineraries/outdoor-adventure-day', plan: '1_day' as const },
                { label: '2 Days', href: '/itineraries/weekend-getaway', plan: '2_days' as const },
                { label: 'Family Weekend', href: '/itineraries/family-fun', plan: 'family_weekend' as const },
                { label: 'Adventure Weekend', href: '/itineraries/outdoor-adventure', plan: 'adventure_weekend' as const },
              ].map((shortcut) => (
                <Link
                  key={shortcut.label}
                  href={shortcut.href}
                  className="itinerary-shortcut relative overflow-hidden rounded-full font-medium"
                  onClick={() => trackHeroQuickPlanClick(shortcut.plan)}
                  style={{
                    padding: `${spacing[1] + spacing[1] / 2}px ${spacing[3]}px`,
                    minHeight: '28px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: `blur(${blur.sm})`,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: typography.fontSize.xs,
                    transform: 'translateZ(0)',
                    transitionProperty: 'background-color, border-color, transform',
                    transitionDuration: `${motion.duration.fast}ms`,
                    transitionTimingFunction: motion.easing.natural,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `2px solid ${interaction.focus.ringColor}`
                    e.currentTarget.style.outlineOffset = `${interaction.focus.ringOffset}px`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none'
                  }}
                >
                  <span className="relative z-10">{shortcut.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Vibe Chips */}
          <div 
            className="flex flex-col gap-2 mt-4"
            style={{
              marginTop: `clamp(${spacing[4]}px, 2vh, ${spacing[6]}px)`,
            }}
            role="group"
            aria-label="Browse by vibe"
          >
            {/* Label */}
            <span 
              className="text-white/80 font-medium"
              style={{
                fontSize: typography.fontSize.sm,
                marginBottom: spacing[1],
              }}
            >
              Choose your vibe
            </span>
            
            {/* Chips Container */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Adventure', href: '/things-to-do/outdoor-adventures', vibe: 'adventure' as const },
                { label: 'Family', href: '/search?q=family', vibe: 'family' as const },
                { label: 'Food & Wine', href: '/search?q=wine', vibe: 'food_wine' as const },
                { label: 'History', href: '/things-to-do/history-culture', vibe: 'history' as const },
                { label: 'Relaxed', href: '/search?q=relaxed', vibe: 'relaxed' as const },
              ].map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="vibe-chip relative overflow-hidden rounded-full font-medium"
                  onClick={() => trackHeroVibeClick(chip.vibe)}
                  style={{
                    padding: `${spacing[2]}px ${spacing[4]}px`,
                    minHeight: '36px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: `blur(${blur.sm})`,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: typography.fontSize.sm,
                    transform: 'translateZ(0)',
                    transitionProperty: 'background-color, border-color, transform',
                    transitionDuration: `${motion.duration.fast}ms`,
                    transitionTimingFunction: motion.easing.natural,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `2px solid ${interaction.focus.ringColor}`
                    e.currentTarget.style.outlineOffset = `${interaction.focus.ringOffset}px`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none'
                  }}
                >
                  <span className="relative z-10">{chip.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Trust Line - Mobile Only */}
        <p 
          ref={trustLineRef}
          className="md:hidden text-white/80"
          style={{
            opacity: 0,
            marginTop: spacing[6],
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
            lineHeight: typography.lineHeight.normal,
          }}
        >
          35 miles from Sacramento • 300+ days of sunshine
        </p>

        {/* Play Video Button - Desktop Only */}
        {videoUrl && (
          <button 
            ref={videoButtonRef}
            onClick={() => setShowVideo(true)}
            className="hidden md:flex mt-8 group items-center gap-3 text-white/80 hover:text-white transition-all"
            style={{
              opacity: 0,
              marginTop: spacing[8],
              transitionDuration: `${motion.duration.slow}ms`,
            }}
            aria-label="Watch video about Auburn"
            onMouseEnter={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget.querySelector('div'), {
                  borderColor: colors.gold[400],
                  backgroundColor: `${colors.gold[500]}33`,
                  scale: interaction.hover.scaleLg,
                  duration: motion.duration.fast / 1000,
                  ease: motion.easing.natural,
                  force3D: true
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!shouldReduceMotion) {
                gsap.to(e.currentTarget.querySelector('div'), {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  backgroundColor: 'transparent',
                  scale: 1,
                  duration: motion.duration.fast / 1000,
                  ease: motion.easing.natural,
                  force3D: true
                })
              }
            }}
          >
            <div 
              className="rounded-full border-2 flex items-center justify-center transition-all"
            style={{
              width: spacing[12] + spacing[2],
              height: spacing[12] + spacing[2],
              borderColor: 'rgba(255, 255, 255, 0.4)',
              transform: 'translateZ(0)',
            }}
            >
              <Play style={{ width: spacing[6], height: spacing[6], marginLeft: spacing.base }} />
            </div>
            <span style={{ fontWeight: typography.fontWeight.medium }}>Watch the Video</span>
          </button>
        )}
      </div>

      {/* Stats Bar - Desktop Only */}
      <div 
        ref={statsRef}
        className="hidden md:block absolute bottom-0 left-0 right-0"
        style={{ zIndex: depth.elevated }}
      >
        <div className="container mx-auto">
          <div 
            className="grid grid-cols-2 md:grid-cols-4"
            style={{
              borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
            }}
          >
            {HOMEPAGE_STATS.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center group cursor-default"
                style={{
                  opacity: 0,
                  paddingTop: spacing[6],
                  paddingBottom: spacing[8],
                  paddingLeft: spacing[8],
                  paddingRight: spacing[8],
                  borderRight: index < HOMEPAGE_STATS.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  transform: 'translateZ(0)',
                }}
                  ref={(el) => {
                    if (el && isLoaded && !shouldReduceMotion) {
                      gsap.to(el, {
                        opacity: 1,
                        y: 0,
                        duration: motion.duration.slow / 1000,
                        delay: (motion.delay.veryLong + index * motion.delay.short) / 1000,
                        ease: motion.easing.natural
                      })
                    } else if (el) {
                      gsap.set(el, { opacity: 1, y: 0 })
                    }
                  }}
                onMouseEnter={(e) => {
                  if (!shouldReduceMotion) {
                    const target = e.currentTarget.querySelector('div:first-child') as HTMLElement
                    if (target) {
                      gsap.to(target, {
                        scale: interaction.hover.scaleMd,
                        duration: motion.duration.normal / 1000, // Smoother timing
                        ease: motion.easing.natural,
                        force3D: true
                      })
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (!shouldReduceMotion) {
                    const target = e.currentTarget.querySelector('div:first-child') as HTMLElement
                    if (target) {
                      gsap.to(target, {
                        scale: 1,
                        duration: motion.duration.normal / 1000, // Smoother timing
                        ease: motion.easing.natural,
                        force3D: true
                      })
                    }
                  }
                }}
              >
                <div 
                  style={{
                    fontSize: typography.fontSize['4xl'],
                    fontWeight: typography.fontWeight.bold,
                    color: '#F5FAFF',
                    marginBottom: spacing[1],
                    fontFamily: typography.fontFamily.display,
                    transform: 'translateZ(0)',
                  }}
                >
                  {stat.value}
                </div>
                <div 
                  style={{
                    fontSize: typography.fontSize.base,
                    color: 'rgba(245, 250, 255, 0.72)',
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - Desktop Only */}
        <button 
          ref={scrollIndicatorRef}
          onClick={scrollToContent}
          className="absolute left-1/2 -translate-x-1/2 transition-colors"
          style={{
            top: `-${spacing[16]}px`,
            color: 'rgba(245, 250, 255, 0.72)',
            transform: 'translateX(-50%) translateZ(0)',
          }}
          onMouseEnter={(e) => {
            if (!shouldReduceMotion) {
              gsap.to(e.currentTarget, {
                color: colors.gold[400],
                duration: motion.duration.fast / 1000,
                ease: motion.easing.natural
              })
            }
          }}
          onMouseLeave={(e) => {
            if (!shouldReduceMotion) {
              gsap.to(e.currentTarget, {
                color: 'rgba(245, 250, 255, 0.72)',
                duration: motion.duration.fast / 1000,
                ease: motion.easing.natural
              })
            }
          }}
          aria-label="Scroll to content"
        >
          <ChevronDown style={{ width: spacing[8], height: spacing[8] }} aria-hidden="true" />
        </button>
      </div>

      {/* Video Modal */}
      {showVideo && videoUrl && (
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: depth.modal,
            backgroundColor: `${colors.charcoal[900]}F2`,
            padding: spacing[8],
          }}
          onClick={() => setShowVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video modal"
        >
          <div 
            className="relative w-full aspect-video"
            style={{
              maxWidth: spacing[32] * 2.5,
            }}
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute right-0 text-white/70 hover:text-white transition-colors font-medium"
              style={{
                top: `-${spacing[12]}px`,
                fontSize: typography.fontSize.lg,
                transitionDuration: `${motion.duration.fast}ms`,
              }}
              aria-label="Close video"
            >
              Close
            </button>
            <iframe
              src={videoUrl}
              className="w-full h-full rounded-lg"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Auburn, California video"
            />
          </div>
        </div>
      )}
    </section>
  )
}
