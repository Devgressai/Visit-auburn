import Image, { ImageProps } from 'next/image'
import { getAuburnImageById, getAuburnImagePath, isAuburnImage } from '@/data/auburnImages'
import { PhotoCredit } from './PhotoCredit'

interface AuburnImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  imageId: string
  showCredit?: boolean
  creditClassName?: string
  containerClassName?: string
}

/**
 * AuburnImage Component
 * 
 * Enforces Auburn-only image policy:
 * - All images MUST use imageId from auburnImages.ts registry
 * - Automatically includes alt text from registry
 * - Automatically includes photo credit
 * - Build validation ensures compliance
 * 
 * Usage:
 * <AuburnImage imageId="hero-old-town-clocktower" fill className="..." />
 */
export function AuburnImage({
  imageId,
  showCredit = true,
  creditClassName = '',
  containerClassName = '',
  className = '',
  ...imageProps
}: AuburnImageProps) {
  const image = getAuburnImageById(imageId)

  // Development warning
  if (!image && process.env.NODE_ENV === 'development') {
    console.error(
      `[AuburnImage] Invalid imageId: "${imageId}". ` +
      `Image not found in Auburn registry. ` +
      `Please use an imageId from /data/auburnImages.ts`
    )
  }

  // Fallback for missing image (should never happen in production due to build validation)
  if (!image) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${containerClassName}`}>
        <span className="text-gray-500 text-sm">Image not found: {imageId}</span>
      </div>
    )
  }

  const imageSrc = getAuburnImagePath(imageId)

  return (
    <div className={containerClassName}>
      <Image
        src={imageSrc}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={className}
        {...imageProps}
      />
      {showCredit && (
        <PhotoCredit imageId={imageId} className={creditClassName} />
      )}
    </div>
  )
}

/**
 * AuburnHeroImage - Specialized for hero sections
 * 
 * contentPosition options:
 * - "center" (default): Centers content both horizontally and vertically
 * - "bottom-left": Positions content at bottom-left (for cinematic heroes)
 * - "bottom-center": Positions content at bottom-center
 * - "custom": No positioning applied - children handle their own layout
 */
export function AuburnHeroImage({
  imageId,
  overlay = true,
  showCredit = true,
  contentPosition = 'center',
  children,
}: {
  imageId: string
  overlay?: boolean
  showCredit?: boolean
  contentPosition?: 'center' | 'bottom-left' | 'bottom-center' | 'custom'
  children?: React.ReactNode
}) {
  const image = getAuburnImageById(imageId)

  // Development warning
  if (!image && process.env.NODE_ENV === 'development') {
    console.error(
      `[AuburnHeroImage] Invalid imageId: "${imageId}". ` +
      `Image not found in Auburn registry. ` +
      `Please use an imageId from /data/auburnImages.ts`
    )
  }

  // Use getAuburnImagePath which has fallback logic - never return null
  const imagePath = getAuburnImagePath(imageId)
  const altText = image?.alt || `Auburn, California - ${imageId}`

  // Position classes based on contentPosition prop
  const positionClasses = {
    'center': 'flex items-center justify-center',
    'bottom-left': 'flex items-end justify-start pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20',
    'bottom-center': 'flex items-end justify-center pb-16 md:pb-24',
    'custom': '',
  }

  return (
    <div className="absolute inset-0">
      <Image
        src={imagePath}
        alt={altText}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/40 to-charcoal-900/70" />
      )}
      {children && (
        <div className={`absolute inset-0 ${positionClasses[contentPosition]}`}>
          {children}
        </div>
      )}
      {showCredit && image && (
        <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded z-20">
          <PhotoCredit imageId={imageId} className="text-white text-[10px] mt-0" />
        </div>
      )}
    </div>
  )
}

/**
 * Validate that a src path is from Auburn registry
 * Used in build-time validation
 */
export function validateAuburnImageSrc(src: string): boolean {
  return isAuburnImage(src)
}

