import { getAuburnImageById } from '@/data/auburnImages'

interface PhotoCreditProps {
  imageId: string
  className?: string
  showFullDetails?: boolean
}

/**
 * PhotoCredit Component
 * Displays photographer credit and licensing info for Auburn images
 * Required on ALL images per Auburn image policy
 */
export function PhotoCredit({ 
  imageId, 
  className = '',
  showFullDetails = false 
}: PhotoCreditProps) {
  const image = getAuburnImageById(imageId)

  if (!image) {
    console.warn(`PhotoCredit: Image ID "${imageId}" not found in Auburn registry`)
    return null
  }

  return (
    <div 
      className={`text-xs text-gray-500 mt-2 ${className}`}
      aria-label="Photo credit information"
    >
      {showFullDetails ? (
        <div className="space-y-1">
          <div>
            <span className="font-medium">Photo:</span> {image.photographerCredit}
          </div>
          <div>
            <span className="font-medium">Location:</span> {image.locationName}
          </div>
          {image.sourceUrl && (
            <div>
              <a 
                href={image.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Source
              </a>
            </div>
          )}
          <div className="text-[10px] text-gray-400">
            {image.licenseType === 'city-owned' && '© City of Auburn'}
            {image.licenseType === 'creative-commons' && 'Creative Commons License'}
            {image.licenseType === 'licensed' && 'Licensed for use'}
            {image.licenseType === 'contributed' && 'Contributed image'}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span>Photo: {image.photographerCredit}</span>
          {image.sourceUrl && (
            <a 
              href={image.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-2"
              aria-label="View photo source"
            >
              Source
            </a>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Compact inline credit for space-constrained areas
 */
export function PhotoCreditInline({ imageId }: { imageId: string }) {
  const image = getAuburnImageById(imageId)

  if (!image) return null

  return (
    <span className="text-[10px] text-gray-400 italic">
      Photo: {image.photographerCredit}
    </span>
  )
}

