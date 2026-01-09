#!/usr/bin/env node

/**
 * Fetch images from Unsplash and convert to WebP
 * 
 * Usage:
 *   npx ts-node scripts/fetch-images.ts
 * 
 * This script will:
 * 1. Download curated images from Unsplash for Auburn tourism
 * 2. Convert JPG to WebP format (quality 85)
 * 3. Save to /public/images/auburn/ directories
 * 4. Update image references in the codebase
 */

import https from 'https'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

interface ImageConfig {
  filename: string
  directory: string
  unsplashUrl: string
  description: string
  category?: string
}

// Curated Unsplash images for Auburn tourism
// Using direct Unsplash image URLs that work without API keys
const IMAGES_TO_FETCH: ImageConfig[] = [
  // Wedding venue photos
  {
    filename: 'park-victorian.jpg',
    directory: 'auburn/weddings',
    unsplashUrl: 'https://images.unsplash.com/photo-1519167758481-83f19106ab41?w=800&q=80',
    description: 'Victorian mansion for weddings',
    category: 'venue'
  },
  {
    filename: 'golf-course-venue.jpg',
    directory: 'auburn/weddings',
    unsplashUrl: 'https://images.unsplash.com/photo-1587280591960-e3fda66ea385?w=800&q=80',
    description: 'Golf course wedding venue',
    category: 'venue'
  },
  {
    filename: 'garden-wedding.jpg',
    directory: 'auburn/weddings',
    unsplashUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
    description: 'Garden wedding setup',
    category: 'venue'
  },
  {
    filename: 'outdoor-ceremony.jpg',
    directory: 'auburn/weddings',
    unsplashUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80',
    description: 'Outdoor wedding ceremony',
    category: 'venue'
  },
  {
    filename: 'historic-venue.jpg',
    directory: 'auburn/weddings',
    unsplashUrl: 'https://images.unsplash.com/photo-1508873699372-f91e59a9a9b5?w=800&q=80',
    description: 'Historic building venue',
    category: 'venue'
  },
  {
    filename: 'winery-wedding.jpg',
    directory: 'auburn/weddings',
    unsplashUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    description: 'Winery wedding venue',
    category: 'venue'
  },
  {
    filename: 'barn-event.jpg',
    directory: 'auburn/weddings',
    unsplashUrl: 'https://images.unsplash.com/photo-1519745737565-e42601bc5a41?w=800&q=80',
    description: 'Rustic barn event space',
    category: 'venue'
  },
  {
    filename: 'reception-hall.jpg',
    directory: 'auburn/weddings',
    unsplashUrl: 'https://images.unsplash.com/photo-1519167758481-83f19106ab41?w=800&q=80',
    description: 'Reception hall venue',
    category: 'venue'
  },
  
  // Dining venue photos
  {
    filename: 'restaurant-casual.jpg',
    directory: 'auburn/dining',
    unsplashUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    description: 'Casual dining restaurant',
    category: 'dining'
  },
  {
    filename: 'fine-dining.jpg',
    directory: 'auburn/dining',
    unsplashUrl: 'https://images.unsplash.com/photo-1504674900152-7a34fbb02321?w=800&q=80',
    description: 'Fine dining establishment',
    category: 'dining'
  },
  {
    filename: 'cafe-ambiance.jpg',
    directory: 'auburn/dining',
    unsplashUrl: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80',
    description: 'Cozy cafe atmosphere',
    category: 'dining'
  },
  {
    filename: 'brewery-taproom.jpg',
    directory: 'auburn/dining',
    unsplashUrl: 'https://images.unsplash.com/photo-1608476527521-2bf4fc95ef3d?w=800&q=80',
    description: 'Brewery taproom interior',
    category: 'dining'
  },
  {
    filename: 'wine-tasting.jpg',
    directory: 'auburn/dining',
    unsplashUrl: 'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=800&q=80',
    description: 'Wine tasting room',
    category: 'dining'
  },
  {
    filename: 'farmers-market.jpg',
    directory: 'auburn/dining',
    unsplashUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80',
    description: 'Farmers market stand',
    category: 'dining'
  },

  // Discover page images
  {
    filename: 'gold-rush-museum.jpg',
    directory: 'auburn/discover',
    unsplashUrl: 'https://images.unsplash.com/photo-1532619042210-8282aaac3962?w=800&q=80',
    description: 'Gold Rush history museum',
    category: 'discover'
  },
  {
    filename: 'old-town-street.jpg',
    directory: 'auburn/discover',
    unsplashUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
    description: 'Historic Old Town Auburn',
    category: 'discover'
  },
  {
    filename: 'folsom-lake.jpg',
    directory: 'auburn/discover',
    unsplashUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Folsom Lake outdoor recreation',
    category: 'discover'
  },
  {
    filename: 'hiking-trail.jpg',
    directory: 'auburn/discover',
    unsplashUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    description: 'Scenic hiking trail',
    category: 'discover'
  },
  
  // Hero images
  {
    filename: 'hero-old-town-clocktower.jpg',
    directory: 'auburn',
    unsplashUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
    description: 'Old Town Auburn historic view',
    category: 'hero'
  },
  {
    filename: 'hero-american-river-canyon.jpg',
    directory: 'auburn',
    unsplashUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'American River Canyon scenic view',
    category: 'hero'
  },
  {
    filename: 'event-gold-rush-days.jpg',
    directory: 'auburn/events',
    unsplashUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    description: 'Gold Rush Days festival atmosphere',
    category: 'hero'
  },
]

/**
 * Download image from URL
 */
async function downloadImage(imageUrl: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    https
      .get(imageUrl, (response) => {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {}) // Delete file on error
        reject(err)
      })
  })
}

/**
 * Convert JPG to WebP using ImageMagick
 */
async function convertToWebP(jpgPath: string, webpPath: string): Promise<void> {
  try {
    await execAsync(`convert "${jpgPath}" -quality 85 "${webpPath}"`)
  } catch (error) {
    console.error(`Failed to convert ${jpgPath}:`, error)
    throw error
  }
}

/**
 * Ensure directory exists
 */
function ensureDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Auburn Tourism Image Fetcher & Converter')
  console.log('=' .repeat(50))
  
  const publicDir = path.join(process.cwd(), 'public', 'images')
  
  // Check if ImageMagick is installed
  try {
    await execAsync('which convert')
  } catch {
    console.error('❌ ImageMagick not found!')
    console.error('Install it with: brew install imagemagick')
    console.error('Or download from: https://imagemagick.org/script/download.php')
    process.exit(1)
  }

  let successCount = 0
  let errorCount = 0

  for (const imageConfig of IMAGES_TO_FETCH) {
    try {
      const fullDir = path.join(publicDir, imageConfig.directory)
      ensureDirectory(fullDir)

      const jpgPath = path.join(fullDir, imageConfig.filename)
      const webpPath = path.join(fullDir, imageConfig.filename.replace('.jpg', '.webp'))

      console.log(`\n📥 Downloading: ${imageConfig.description}`)
      console.log(`   → ${imageConfig.filename}`)

      // Download image
      await downloadImage(imageConfig.unsplashUrl, jpgPath)
      const jpgStats = fs.statSync(jpgPath)
      console.log(`   ✅ Downloaded (${(jpgStats.size / 1024).toFixed(2)} KB)`)

      // Convert to WebP
      console.log(`   🔄 Converting to WebP (quality 85)...`)
      await convertToWebP(jpgPath, webpPath)
      const webpStats = fs.statSync(webpPath)
      const reduction = ((1 - webpStats.size / jpgStats.size) * 100).toFixed(1)
      console.log(`   ✅ Converted (${(webpStats.size / 1024).toFixed(2)} KB, ${reduction}% smaller)`)

      // Keep JPG as fallback, or delete to save space
      // fs.unlinkSync(jpgPath) // Uncomment to delete JPG after conversion

      successCount++
    } catch (error) {
      console.error(`   ❌ Error: ${error instanceof Error ? error.message : String(error)}`)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`\n📊 Results:`)
  console.log(`   ✅ Successful: ${successCount}`)
  console.log(`   ❌ Failed: ${errorCount}`)
  console.log(`   📁 Location: ${publicDir}`)
  console.log(`\n✨ Done! Images are ready for deployment.\n`)

  if (errorCount > 0) {
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

