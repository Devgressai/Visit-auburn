#!/usr/bin/env tsx
/**
 * Content Completeness Gate - Visit Auburn
 * 
 * This script validates the site is launch-ready by checking:
 * - Required components (breadcrumbs, related pages)
 * - Auburn image requirements (3+ per page)
 * - Word count minimums (600 pillar, 400 subpage)
 * - Internal link counts (3+ per page)
 * - No placeholder text
 * - No unauthorized external images
 * 
 * Exit code 0 = pass, 1 = fail
 */

import * as fs from 'fs'
import * as path from 'path'

// ============================================
// CONFIGURATION
// ============================================

const APP_DIR = path.join(process.cwd(), 'app')
const AUBURN_IMAGES_PATH = path.join(process.cwd(), 'data', 'auburnImages.ts')

// Pillar pages (require 600+ words)
const PILLAR_ROUTES = [
  '/',
  '/accommodations',
  '/things-to-do',
  '/things-to-do/outdoor-adventures',
  '/things-to-do/history-culture',
  '/things-to-do/arts-culture',
  '/dining',
  '/events',
  '/discover',
  '/itineraries',
]

// Subpages (require 400+ words)
const SUBPAGE_ROUTES = [
  '/itineraries/weekend-getaway',
  '/itineraries/outdoor-adventure',
  '/itineraries/gold-rush-history',
  '/itineraries/family-fun',
  '/itineraries/romantic-escape',
  '/plan/visitor-information',
  '/plan/getting-here',
  '/plan/maps-guides',
  '/plan/faq',
  '/plan/respect-auburn',
  '/plan/weddings',
  '/plan/meetings',
  '/plan/venues',
  '/special-offers',
  '/search',
]

// Pages exempt from certain checks (dynamic routes, special pages)
const EXEMPT_FROM_WORD_COUNT = [
  '/search',
  '/special-offers',
  '/', // Homepage content is in components
]

const EXEMPT_FROM_BREADCRUMBS = [
  '/', // Homepage doesn't need breadcrumbs
]

const EXEMPT_FROM_IMAGE_CHECK = [
  '/search',
  '/special-offers', // Uses dynamic content
  '/plan/faq',
  '/plan/maps-guides',
  '/plan/visitor-information', // Informational page
  '/', // Homepage uses different image system
]

const EXEMPT_FROM_RELATED_PAGES = [
  '/', // Homepage doesn't need RelatedPages
]

// Set to true to allow build to pass even with errors (development mode)
const NON_BLOCKING_MODE = true

// Whitelisted external image patterns
const WHITELISTED_IMAGE_PATTERNS = [
  '/images/', // Legacy images folder
  '/og-image', // OG images
  '/logo', // Logo
  '/favicon', // Favicon
  '/icon', // Icons
  'unsplash.com', // Unsplash (temporary during dev)
  'placeholder', // Placeholder utils
  'getPlaceholderImage', // Placeholder function
]

// Placeholder text patterns to flag
const PLACEHOLDER_PATTERNS = [
  /\blorem\b/i,
  /\bipsum\b/i,
  /\bcoming soon\b/i,
  /\btbd\b/i,
  /\bplaceholder\b/i,
  /\bTODO\b/,
  /\bFIXME\b/,
  /\bXXX\b/,
  /\[insert\b/i,
  /\[add\b/i,
  /\bsample text\b/i,
  /\bexample text\b/i,
]

// ============================================
// TYPES
// ============================================

interface ValidationError {
  type: 'error' | 'warning'
  message: string
}

interface PageValidation {
  route: string
  filePath: string
  errors: ValidationError[]
  warnings: ValidationError[]
  stats: {
    hasBreadcrumbs: boolean
    hasRelatedPages: boolean
    auburnImageCount: number
    wordCount: number
    internalLinkCount: number
    hasPlaceholderText: boolean
    hasUnauthorizedImages: boolean
  }
}

// ============================================
// UTILITIES
// ============================================

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
}

function log(message: string) {
  console.log(message)
}

function logError(message: string) {
  console.log(`${colors.red}✗ ${message}${colors.reset}`)
}

function logWarning(message: string) {
  console.log(`${colors.yellow}⚠ ${message}${colors.reset}`)
}

function logSuccess(message: string) {
  console.log(`${colors.green}✓ ${message}${colors.reset}`)
}

function logSection(title: string) {
  console.log(`\n${colors.blue}${colors.bold}${title}${colors.reset}`)
  console.log(`${colors.dim}${'─'.repeat(50)}${colors.reset}`)
}

// ============================================
// FILE DISCOVERY
// ============================================

function findPageFiles(dir: string, basePath: string = ''): { route: string; filePath: string }[] {
  const pages: { route: string; filePath: string }[] = []
  
  if (!fs.existsSync(dir)) {
    return pages
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const routePath = path.join(basePath, entry.name)

    if (entry.isDirectory()) {
      // Skip dynamic route directories for now (they need different handling)
      if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
        continue
      }
      // Skip API routes and special directories
      if (['api', 'fonts', '_components'].includes(entry.name)) {
        continue
      }
      pages.push(...findPageFiles(fullPath, routePath))
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      // Convert file path to route
      let route = basePath || '/'
      route = route.replace(/\\/g, '/') // Normalize Windows paths
      if (!route.startsWith('/')) {
        route = '/' + route
      }
      pages.push({ route, filePath: fullPath })
    }
  }

  return pages
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

function checkBreadcrumbs(content: string): boolean {
  // Check for Breadcrumbs import and component usage
  const hasBreadcrumbsImport = /import.*\{.*Breadcrumbs.*\}.*from/.test(content)
  const hasBreadcrumbsComponent = /<Breadcrumbs\s/.test(content)
  const hasGenerateBreadcrumbs = /generateBreadcrumbs\(/.test(content)
  
  return hasBreadcrumbsImport && (hasBreadcrumbsComponent || hasGenerateBreadcrumbs)
}

function checkRelatedPages(content: string): boolean {
  // Check for RelatedPages import and component usage
  const hasRelatedPagesImport = /import.*\{.*RelatedPages.*\}.*from/.test(content)
  const hasRelatedPagesComponent = /<RelatedPages\s/.test(content)
  
  return hasRelatedPagesImport && hasRelatedPagesComponent
}

function countAuburnImages(content: string): number {
  // Count AuburnImage and AuburnHeroImage components
  const auburnImageMatches = content.match(/<AuburnImage\s/g) || []
  const auburnHeroImageMatches = content.match(/<AuburnHeroImage\s/g) || []
  
  return auburnImageMatches.length + auburnHeroImageMatches.length
}

function estimateWordCount(content: string): number {
  // Remove imports, exports, and code
  let textContent = content
  
  // Remove import statements
  textContent = textContent.replace(/import\s+.*?from\s+['"].*?['"]/gs, '')
  
  // Remove export statements
  textContent = textContent.replace(/export\s+(const|function|default|async)/g, '')
  
  // Extract text from JSX strings
  const stringMatches = textContent.match(/['"`]([^'"`]{10,})['"`]/g) || []
  const textFromStrings = stringMatches
    .map(s => s.slice(1, -1))
    .filter(s => !s.includes('{') && !s.includes('<') && !s.includes('/'))
    .join(' ')
  
  // Extract text from JSX content (between > and <)
  const jsxTextMatches = textContent.match(/>([^<>{]+)</g) || []
  const textFromJsx = jsxTextMatches
    .map(s => s.slice(1, -1).trim())
    .filter(s => s.length > 2 && !/^[{}\s]+$/.test(s))
    .join(' ')
  
  const allText = textFromStrings + ' ' + textFromJsx
  
  // Count words
  const words = allText
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2)
  
  return words.length
}

function countInternalLinks(content: string): number {
  // Count Link components with internal hrefs
  const linkMatches = content.match(/<Link\s+[^>]*href=['"]\/[^'"]*['"]/g) || []
  
  // Also count <a> tags with internal hrefs
  const anchorMatches = content.match(/<a\s+[^>]*href=['"]\/[^'"]*['"]/g) || []
  
  // Count links in related pages route arrays
  const relatedPageLinks = content.match(/relatedPages:\s*\[([^\]]+)\]/g) || []
  let relatedCount = 0
  relatedPageLinks.forEach(match => {
    const links = match.match(/['"]\/[^'"]+['"]/g) || []
    relatedCount += links.length
  })
  
  return linkMatches.length + anchorMatches.length
}

function checkPlaceholderText(content: string): string[] {
  const found: string[] = []
  
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(content)) {
      const match = content.match(pattern)
      if (match) {
        found.push(match[0])
      }
    }
  }
  
  return found
}

function checkUnauthorizedImages(content: string): string[] {
  const unauthorized: string[] = []
  
  // Find all image src attributes
  const srcMatches = content.match(/src=['"]([^'"]+)['"]/g) || []
  const srcSetMatches = content.match(/srcSet=['"]([^'"]+)['"]/g) || []
  
  const allSrcs = [...srcMatches, ...srcSetMatches]
  
  for (const srcMatch of allSrcs) {
    const src = srcMatch.replace(/src(Set)?=['"]/, '').replace(/['"]$/, '')
    
    // Skip dynamic/variable sources
    if (src.includes('{') || src.includes('$')) {
      continue
    }
    
    // Skip whitelisted patterns
    const isWhitelisted = WHITELISTED_IMAGE_PATTERNS.some(pattern => 
      src.includes(pattern)
    )
    
    if (isWhitelisted) {
      continue
    }
    
    // Check if it's an Auburn image
    if (src.startsWith('/auburn/') || src.includes('/public/auburn/')) {
      continue
    }
    
    // Check if using AuburnImage component (which handles validation)
    if (content.includes('AuburnImage') || content.includes('AuburnHeroImage')) {
      continue
    }
    
    // Flag external URLs that aren't whitelisted
    if (src.startsWith('http') && !WHITELISTED_IMAGE_PATTERNS.some(p => src.includes(p))) {
      unauthorized.push(src)
    }
  }
  
  return unauthorized
}

// ============================================
// PAGE VALIDATION
// ============================================

function validatePage(route: string, filePath: string): PageValidation {
  const result: PageValidation = {
    route,
    filePath,
    errors: [],
    warnings: [],
    stats: {
      hasBreadcrumbs: false,
      hasRelatedPages: false,
      auburnImageCount: 0,
      wordCount: 0,
      internalLinkCount: 0,
      hasPlaceholderText: false,
      hasUnauthorizedImages: false,
    },
  }

  // Read file content
  let content: string
  try {
    content = fs.readFileSync(filePath, 'utf-8')
  } catch (error) {
    result.errors.push({
      type: 'error',
      message: `Could not read file: ${filePath}`,
    })
    return result
  }

  // Check breadcrumbs
  result.stats.hasBreadcrumbs = checkBreadcrumbs(content)
  if (!result.stats.hasBreadcrumbs && !EXEMPT_FROM_BREADCRUMBS.includes(route)) {
    result.errors.push({
      type: 'error',
      message: 'Missing <Breadcrumbs /> component',
    })
  }

  // Check related pages
  result.stats.hasRelatedPages = checkRelatedPages(content)
  if (!result.stats.hasRelatedPages && !EXEMPT_FROM_RELATED_PAGES.includes(route)) {
    result.errors.push({
      type: 'error',
      message: 'Missing <RelatedPages /> component',
    })
  }

  // Count Auburn images
  result.stats.auburnImageCount = countAuburnImages(content)
  if (result.stats.auburnImageCount < 3 && !EXEMPT_FROM_IMAGE_CHECK.includes(route)) {
    result.errors.push({
      type: 'error',
      message: `Insufficient Auburn images: found ${result.stats.auburnImageCount}, minimum 3 required`,
    })
  }

  // Check word count
  result.stats.wordCount = estimateWordCount(content)
  const isPillar = PILLAR_ROUTES.includes(route)
  const minWords = isPillar ? 600 : 400
  
  if (!EXEMPT_FROM_WORD_COUNT.includes(route)) {
    if (result.stats.wordCount < minWords) {
      result.errors.push({
        type: 'error',
        message: `Insufficient word count: ~${result.stats.wordCount} words, minimum ${minWords} required (${isPillar ? 'pillar' : 'subpage'})`,
      })
    }
  }

  // Count internal links
  result.stats.internalLinkCount = countInternalLinks(content)
  if (result.stats.internalLinkCount < 3) {
    result.errors.push({
      type: 'error',
      message: `Insufficient internal links: found ${result.stats.internalLinkCount}, minimum 3 required`,
    })
  }

  // Check for placeholder text
  const placeholders = checkPlaceholderText(content)
  result.stats.hasPlaceholderText = placeholders.length > 0
  if (result.stats.hasPlaceholderText) {
    result.errors.push({
      type: 'error',
      message: `Placeholder text found: ${placeholders.slice(0, 3).join(', ')}${placeholders.length > 3 ? '...' : ''}`,
    })
  }

  // Check for unauthorized images
  const unauthorized = checkUnauthorizedImages(content)
  result.stats.hasUnauthorizedImages = unauthorized.length > 0
  if (result.stats.hasUnauthorizedImages) {
    result.warnings.push({
      type: 'warning',
      message: `Unauthorized images found: ${unauthorized.slice(0, 2).join(', ')}${unauthorized.length > 2 ? '...' : ''}`,
    })
  }

  return result
}

// ============================================
// MAIN VALIDATION
// ============================================

async function main() {
  console.log(`
${colors.blue}${colors.bold}╔════════════════════════════════════════════════╗
║     Content Completeness Gate - Visit Auburn    ║
╚════════════════════════════════════════════════╝${colors.reset}
`)

  // Find all page files
  const pages = findPageFiles(APP_DIR)
  log(`${colors.blue}📄 Found ${pages.length} page files to validate${colors.reset}\n`)

  // Validate each page
  const results: PageValidation[] = []
  let passCount = 0
  let failCount = 0
  let warningCount = 0

  for (const { route, filePath } of pages) {
    const result = validatePage(route, filePath)
    results.push(result)

    const hasErrors = result.errors.length > 0
    const hasWarnings = result.warnings.length > 0

    if (hasErrors) {
      failCount++
      logError(route)
      for (const error of result.errors) {
        console.log(`  ${colors.red}• ${error.message}${colors.reset}`)
      }
    } else if (hasWarnings) {
      warningCount++
      logWarning(route)
      for (const warning of result.warnings) {
        console.log(`  ${colors.yellow}• ${warning.message}${colors.reset}`)
      }
    } else {
      passCount++
      logSuccess(`${route} (${result.stats.wordCount} words, ${result.stats.auburnImageCount} images, ${result.stats.internalLinkCount} links)`)
    }
  }

  // Summary
  logSection('VALIDATION SUMMARY')
  
  console.log(`
${colors.green}✓ Passed: ${passCount}${colors.reset}
${colors.yellow}⚠ Warnings: ${warningCount}${colors.reset}
${colors.red}✗ Failed: ${failCount}${colors.reset}
`)

  // Statistics
  logSection('CONTENT STATISTICS')
  
  const totalWords = results.reduce((sum, r) => sum + r.stats.wordCount, 0)
  const totalImages = results.reduce((sum, r) => sum + r.stats.auburnImageCount, 0)
  const totalLinks = results.reduce((sum, r) => sum + r.stats.internalLinkCount, 0)
  
  const avgWords = Math.round(totalWords / results.length)
  const avgImages = (totalImages / results.length).toFixed(1)
  const avgLinks = (totalLinks / results.length).toFixed(1)
  
  console.log(`
📊 Total estimated words: ${totalWords.toLocaleString()}
📸 Total Auburn images: ${totalImages}
🔗 Total internal links: ${totalLinks}
📈 Average words per page: ${avgWords}
📷 Average images per page: ${avgImages}
🔗 Average links per page: ${avgLinks}
`)

  // Exit with appropriate code
  if (failCount > 0) {
    console.log(`
${colors.red}${colors.bold}❌ CONTENT GATE FAILED${colors.reset}
${colors.red}Fix the ${failCount} error(s) above before deploying${colors.reset}

${colors.dim}Requirements:
• Breadcrumbs component on every page (except homepage)
• RelatedPages component on every page  
• 3+ Auburn images per page (AuburnImage/AuburnHeroImage)
• 600+ words for pillar pages, 400+ for subpages
• 3+ internal links per page
• No placeholder text (Lorem, TBD, Coming soon, etc.)
${colors.reset}
`)
    
    if (NON_BLOCKING_MODE) {
      console.log(`${colors.yellow}${colors.bold}⚠️  NON-BLOCKING MODE: Build will continue${colors.reset}`)
      console.log(`${colors.dim}Set NON_BLOCKING_MODE = false in validate-site.ts to enforce${colors.reset}\n`)
      process.exit(0)
    } else {
      process.exit(1)
    }
  } else {
    console.log(`
${colors.green}${colors.bold}✅ CONTENT GATE PASSED${colors.reset}
${colors.green}Site is launch-ready!${colors.reset}
`)
    process.exit(0)
  }
}

// Run validation
main().catch((error) => {
  console.error('Validation script error:', error)
  process.exit(1)
})

