#!/usr/bin/env node
/**
 * Auburn Image Validation Script
 * 
 * Enforces strict Auburn-only image policy:
 * 1. All <Image> components must use src from auburnImages.ts registry
 * 2. All images must have alt text
 * 3. Each page must have minimum 3 Auburn images (1 hero + 2 inline)
 * 
 * Run: npm run validate:images
 * This runs automatically before build
 */

import * as fs from 'fs'
import * as path from 'path'
import { getAllAuburnImagePaths, auburnImages } from '../data/auburnImages'

interface ImageValidationResult {
  page: string
  errors: string[]
  warnings: string[]
  imageCount: number
  auburnImageCount: number
  hasHero: boolean
  images: Array<{
    src: string
    alt: string | null
    isAuburn: boolean
    lineNumber: number
  }>
}

const results: ImageValidationResult[] = []
let hasErrors = false

// Colors for terminal output
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const GREEN = '\x1b[32m'
const BLUE = '\x1b[36m'
const RESET = '\x1b[0m'

/**
 * Extract images from file content
 */
function extractImagesFromFile(content: string, filePath: string): ImageValidationResult {
  const result: ImageValidationResult = {
    page: filePath,
    errors: [],
    warnings: [],
    imageCount: 0,
    auburnImageCount: 0,
    hasHero: false,
    images: [],
  }

  const lines = content.split('\n')
  const auburnPaths = getAllAuburnImagePaths()
  const auburnIds = auburnImages.map(img => img.id)

  // Pattern 1: <Image src={...} alt={...} />
  const imagePattern = /<Image[^>]*(?:src|imageId)=[\{"]([^}"]+)["}\]][^>]*(?:alt=[\{"]([^}"]+)["}\]])?[^>]*\/?>/g
  
  // Pattern 2: <AuburnImage imageId="..." />
  const auburnImagePattern = /<AuburnImage[^>]+imageId=["']([^"']+)["'][^>]*\/?>/g
  
  // Pattern 3: Regular img tags (should not be used)
  const htmlImgPattern = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi

  let match

  // Check AuburnImage components (these are valid)
  const auburnImageMatches = content.matchAll(auburnImagePattern)
  for (const match of auburnImageMatches) {
    const imageId = match[1]
    const lineNumber = content.substring(0, match.index).split('\n').length
    
    if (auburnIds.includes(imageId)) {
      result.auburnImageCount++
      result.imageCount++
      result.images.push({
        src: imageId,
        alt: 'From registry',
        isAuburn: true,
        lineNumber,
      })
      
      // Check if it's a hero image
      if (imageId.includes('hero-') || content.includes('AuburnHeroImage')) {
        result.hasHero = true
      }
    } else {
      result.errors.push(
        `Line ${lineNumber}: Invalid imageId "${imageId}" - not found in Auburn registry`
      )
    }
  }

  // Check Next.js Image components
  while ((match = imagePattern.exec(content)) !== null) {
    const src = match[1]
    const alt = match[2] || null
    const lineNumber = content.substring(0, match.index).split('\n').length

    // Skip if it's an AuburnImage (already processed)
    if (content.substring(match.index - 20, match.index).includes('AuburnImage')) {
      continue
    }

    result.imageCount++

    // Check if src is from Auburn registry
    const isAuburnImage = auburnPaths.some(auburnPath => 
      src.includes(auburnPath) || 
      src.includes('/auburn/') ||
      auburnIds.some(id => src.includes(id))
    )

    if (isAuburnImage) {
      result.auburnImageCount++
    } else {
      // Check for placeholder/stock images
      if (
        src.includes('unsplash') ||
        src.includes('placeholder') ||
        src.includes('via.placeholder') ||
        src.includes('placehold') ||
        src.includes('lorempixel') ||
        src.includes('picsum') ||
        src.includes('images.pexels')
      ) {
        result.errors.push(
          `Line ${lineNumber}: Forbidden stock/placeholder image: ${src}. Use Auburn images only.`
        )
      } else if (
        !src.startsWith('{') &&
        !src.includes('getPlaceholderImage') &&
        !src.includes('/public/')
      ) {
        result.warnings.push(
          `Line ${lineNumber}: Image src "${src}" not recognized from Auburn registry`
        )
      }
    }

    // Check for alt text
    if (!alt || alt.trim() === '') {
      result.errors.push(
        `Line ${lineNumber}: Image missing alt text: ${src}`
      )
    }

    result.images.push({
      src,
      alt,
      isAuburn: isAuburnImage,
      lineNumber,
    })

    // Check if it's a hero image
    if (src.includes('hero') || match[0].includes('priority')) {
      result.hasHero = true
    }
  }

  // Check for HTML img tags (not allowed in Next.js)
  while ((match = htmlImgPattern.exec(content)) !== null) {
    const lineNumber = content.substring(0, match.index).split('\n').length
    result.errors.push(
      `Line ${lineNumber}: Use <Image /> component instead of <img> tag`
    )
  }

  return result
}

/**
 * Validate page file
 */
function validatePageFile(filePath: string): ImageValidationResult {
  if (!fs.existsSync(filePath)) {
    return {
      page: filePath,
      errors: ['File not found'],
      warnings: [],
      imageCount: 0,
      auburnImageCount: 0,
      hasHero: false,
      images: [],
    }
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  const result = extractImagesFromFile(content, filePath)

  // Validate minimum image requirements
  if (result.auburnImageCount < 3) {
    result.errors.push(
      `Insufficient Auburn images: found ${result.auburnImageCount}, minimum required is 3 (1 hero + 2 inline)`
    )
  }

  if (!result.hasHero) {
    result.warnings.push(
      'No hero image detected - pages should have a hero image'
    )
  }

  return result
}

/**
 * Find all page files
 */
function findPageFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (!file.startsWith('.') && file !== 'node_modules') {
        findPageFiles(filePath, fileList)
      }
    } else if (file === 'page.tsx' || file === 'page.jsx') {
      fileList.push(filePath)
    }
  })

  return fileList
}

/**
 * Main validation function
 */
function validateAuburnImages() {
  console.log(`\n${BLUE}╔════════════════════════════════════════════════╗${RESET}`)
  console.log(`${BLUE}║   Auburn Image Validation Script              ║${RESET}`)
  console.log(`${BLUE}╚════════════════════════════════════════════════╝${RESET}\n`)

  console.log(`${BLUE}📸 Registered Auburn Images: ${auburnImages.length}${RESET}`)
  console.log(`${BLUE}📁 Scanning for page files...${RESET}\n`)

  const appDir = path.join(process.cwd(), 'app')
  const pageFiles = findPageFiles(appDir)

  console.log(`${BLUE}📄 Found ${pageFiles.length} page files${RESET}\n`)

  for (const pageFile of pageFiles) {
    const relativePath = path.relative(process.cwd(), pageFile)
    const result = validatePageFile(pageFile)
    results.push(result)

    // Print result
    const hasError = result.errors.length > 0

    if (hasError) {
      hasErrors = true
      console.log(`${RED}✗ ${relativePath}${RESET}`)
      result.errors.forEach(error => {
        console.log(`  ${RED}  ✗ ${error}${RESET}`)
      })
    } else if (result.warnings.length > 0) {
      console.log(`${YELLOW}⚠ ${relativePath}${RESET}`)
      result.warnings.forEach(warning => {
        console.log(`  ${YELLOW}  ⚠ ${warning}${RESET}`)
      })
    } else {
      console.log(
        `${GREEN}✓ ${relativePath}${RESET} ` +
        `(${result.auburnImageCount} Auburn images${result.hasHero ? ', has hero' : ''})`
      )
    }
  }

  // Print summary
  console.log(`\n${BLUE}═══════════════════════════════════════════════${RESET}`)
  console.log(`${BLUE}Summary:${RESET}`)

  const passed = results.filter(r => r.errors.length === 0).length
  const failed = results.filter(r => r.errors.length > 0).length
  const totalAuburnImages = results.reduce((sum, r) => sum + r.auburnImageCount, 0)
  const totalImages = results.reduce((sum, r) => sum + r.imageCount, 0)
  const avgImagesPerPage = (totalAuburnImages / results.length).toFixed(1)

  console.log(`${GREEN}✓ Passed: ${passed}${RESET}`)
  console.log(`${failed > 0 ? RED : GREEN}✗ Failed: ${failed}${RESET}`)
  console.log(`${BLUE}📸 Total Auburn images: ${totalAuburnImages}/${totalImages}${RESET}`)
  console.log(`${BLUE}📊 Average Auburn images per page: ${avgImagesPerPage}${RESET}`)
  console.log(`${BLUE}═══════════════════════════════════════════════${RESET}\n`)

  if (hasErrors) {
    console.log(`${RED}❌ Build failed: Fix image violations above${RESET}`)
    console.log(`${BLUE}💡 Tip: Use <AuburnImage imageId="..." /> for all images${RESET}`)
    console.log(`${BLUE}💡 Available image IDs in /data/auburnImages.ts${RESET}\n`)
    process.exit(1)
  } else {
    console.log(`${GREEN}✅ All pages pass Auburn image validation!${RESET}\n`)
    process.exit(0)
  }
}

// Run validation
validateAuburnImages()

