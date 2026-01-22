import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/images'
import { Button } from '@/components/ui'
import type { Image as SanityImage } from '@/types'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  image?: SanityImage
  ctaText?: string
  ctaLink?: string
}

export function HeroSection({ title, subtitle, image, ctaText, ctaLink }: HeroSectionProps) {
  const defaultTitle = 'Discover Auburn, California'
  const defaultSubtitle = 'Explore the heart of Gold Country - where history meets adventure'
  const defaultCtaText = 'Start Exploring'
  const defaultCtaLink = '/things-to-do'

  const heroTitle = title || defaultTitle
  const heroSubtitle = subtitle || defaultSubtitle
  const heroCtaText = ctaText || defaultCtaText
  const heroCtaLink = ctaLink || defaultCtaLink

  const imageUrl = image ? urlFor(image).width(1920).height(1080).url() : getPlaceholderImage('hero')

  return (
    <section className="relative h-[75vh] min-h-[600px] md:h-[85vh] md:min-h-[700px] flex items-center justify-center overflow-hidden pt-20 md:pt-24 pb-8 md:pb-12">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={image?.alt || 'Auburn, California'}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>
      
      <div className="relative z-10 container text-center text-white px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 text-balance leading-[1.1] tracking-tight">
          {heroTitle}
        </h1>
        {heroSubtitle && (
          <p className="text-xl md:text-2xl lg:text-3xl mb-10 md:mb-12 text-balance text-white/95 max-w-4xl mx-auto font-light leading-relaxed">
            {heroSubtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href={heroCtaLink} variant="secondary" size="lg" className="min-w-[200px] font-semibold">
            {heroCtaText}
          </Button>
        </div>
      </div>
    </section>
  )
}

