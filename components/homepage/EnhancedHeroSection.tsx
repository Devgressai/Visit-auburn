'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor, isSanityConfigured } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/images'
import { Button } from '@/components/ui'
import type { Image as SanityImage } from '@/types'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  image?: SanityImage
  video?: {
    url: string
    poster?: SanityImage
  }
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

export function EnhancedHeroSection({ 
  title, 
  subtitle, 
  image, 
  video,
  ctaText, 
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroSectionProps) {
  const defaultTitle = 'Discover Auburn, California'
  const defaultSubtitle = 'Explore the heart of Gold Country - where history meets adventure'
  const defaultCtaText = 'Start Exploring'
  const defaultCtaLink = '/things-to-do'

  const heroTitle = title || defaultTitle
  const heroSubtitle = subtitle || defaultSubtitle
  const heroCtaText = ctaText || defaultCtaText
  const heroCtaLink = ctaLink || defaultCtaLink

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, video will show poster
        setIsVideoPlaying(false)
      })
    }
  }, [])

  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true)
    setIsVideoPlaying(true)
  }

  return (
    <section className="relative h-[85vh] min-h-[700px] md:h-[90vh] md:min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Video Background (if provided) */}
      {video?.url && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoadedData}
          poster={video.poster ? urlFor(video.poster).width(1920).height(1080).url() : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded && isVideoPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={video.url} type="video/mp4" />
        </video>
      )}
      
      {/* Image Background (fallback or primary) */}
      <div className={`absolute inset-0 ${video?.url && isVideoLoaded && isVideoPlaying ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <Image
          src={image?.mockUrl || image?.asset?.url || getPlaceholderImage('hero')}
          alt={image?.alt || 'Auburn, California'}
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Animated Content */}
      <div className="relative z-10 container text-center text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 text-balance leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroTitle}
          </motion.h1>
          
          {heroSubtitle && (
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl mb-10 md:mb-12 text-balance text-white/95 max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {heroSubtitle}
            </motion.p>
          )}
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              href={heroCtaLink} 
              variant="secondary" 
              size="lg" 
              className="min-w-[200px] font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200"
            >
              {heroCtaText}
            </Button>
            
            {secondaryCtaText && secondaryCtaLink && (
              <Button 
                href={secondaryCtaLink} 
                variant="outline" 
                size="lg"
                className="min-w-[200px] font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm bg-white/10"
              >
                {secondaryCtaText}
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

