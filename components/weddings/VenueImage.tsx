'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getPlaceholderImage } from '@/lib/images'

interface VenueImageProps {
  src: string
  alt: string
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
}

export function VenueImage({ src, alt, fill = true, sizes, className = 'object-cover', priority = false }: VenueImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [hasError, setHasError] = useState(false)

  // Use placeholder if image fails to load
  const fallbackSrc = getPlaceholderImage('hero')

  useEffect(() => {
    // For local paths, we can't reliably check if file exists client-side
    // So we'll let Next.js Image handle it and use onError as fallback
    setImgSrc(src)
    setHasError(false)
  }, [src])

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  // If we're already on fallback or have an error, use fallback directly
  const imageSource = hasError ? fallbackSrc : imgSrc

  return (
    <Image
      src={imageSource}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={handleError}
      unoptimized={imageSource.startsWith('http') && !imageSource.includes('unsplash.com')}
    />
  )
}
