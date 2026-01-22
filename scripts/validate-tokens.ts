#!/usr/bin/env tsx
/**
 * Token Validation Script
 * 
 * Scans for potentially invalid token indexing patterns:
 * - colors.<palette>[<number>] where shade might not exist
 * - spacing[<number>] where key might not exist
 * 
 * NON-BLOCKING: Emits warnings only
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

// Valid color shades per palette
const validColorShades: Record<string, number[]> = {
  forest: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  rust: [500, 600],
  charcoal: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  gold: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  cream: [50, 100, 200, 300, 400],
  lake: [400, 500, 600],
}

// Valid spacing keys
const validSpacingKeys = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32]

interface Warning {
  file: string
  line: number
  message: string
  suggestion: string
}

function validateFile(filePath: string): Warning[] {
  const warnings: Warning[] = []
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  // Check for color palette indexing
  const colorPattern = /colors\.(forest|rust|charcoal|gold|cream|lake)\[(\d+)\]/g
  let match
  while ((match = colorPattern.exec(content)) !== null) {
    const palette = match[1]
    const shade = parseInt(match[2], 10)
    const validShades = validColorShades[palette] || []
    
    if (!validShades.includes(shade)) {
      const lineNum = content.substring(0, match.index).split('\n').length
      const closest = validShades.reduce((prev, curr) => 
        Math.abs(curr - shade) < Math.abs(prev - shade) ? curr : prev
      )
      
      warnings.push({
        file: filePath,
        line: lineNum,
        message: `Invalid color shade: colors.${palette}[${shade}]`,
        suggestion: `Use colors.${palette}[${closest}] or getColor('${palette}', ${shade}) from '@/lib/tokenUtils'`
      })
    }
  }

  // Check for spacing indexing
  const spacingPattern = /spacing\[(\d+)\]/g
  while ((match = spacingPattern.exec(content)) !== null) {
    const key = parseInt(match[1], 10)
    
    if (!validSpacingKeys.includes(key)) {
      const lineNum = content.substring(0, match.index).split('\n').length
      // Find closest valid key or suggest calculation
      const closest = validSpacingKeys.reduce((prev, curr) => 
        Math.abs(curr - key) < Math.abs(prev - key) ? curr : prev
      )
      
      // Suggest calculation if key is large
      let suggestion = `Use spacing[${closest}] or getSpace(${key}) from '@/lib/tokenUtils'`
      if (key > 32) {
        const factors = findSpacingFactors(key)
        if (factors) {
          suggestion = `Use ${factors} or getSpace(${key}) from '@/lib/tokenUtils'`
        }
      }
      
      warnings.push({
        file: filePath,
        line: lineNum,
        message: `Invalid spacing key: spacing[${key}]`,
        suggestion
      })
    }
  }

  return warnings
}

function findSpacingFactors(target: number): string | null {
  const validKeys = validSpacingKeys.filter(k => k <= target).sort((a, b) => b - a)
  
  // Try to find a simple multiplication
  for (const key of validKeys) {
    if (target % key === 0) {
      const factor = target / key
      if (factor <= 10) {
        return `spacing[${key}] * ${factor}`
      }
    }
  }
  
  // Try addition
  for (let i = 0; i < validKeys.length; i++) {
    for (let j = i; j < validKeys.length; j++) {
      if (validKeys[i] + validKeys[j] === target) {
        return `spacing[${validKeys[i]}] + spacing[${validKeys[j]}]`
      }
    }
  }
  
  return null
}

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir)
  
  files.forEach(file => {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    
    if (stat.isDirectory()) {
      // Skip node_modules, .next, dist
      if (!['node_modules', '.next', 'dist', '.git'].includes(file)) {
        getAllFiles(filePath, fileList)
      }
    } else if (stat.isFile()) {
      const ext = extname(file)
      if (['.ts', '.tsx'].includes(ext)) {
        fileList.push(filePath)
      }
    }
  })
  
  return fileList
}

function main() {
  const componentsDir = join(process.cwd(), 'components')
  const appDir = join(process.cwd(), 'app')
  const libDir = join(process.cwd(), 'lib')
  
  const allFiles: string[] = []
  if (statSync(componentsDir).isDirectory()) getAllFiles(componentsDir, allFiles)
  if (statSync(appDir).isDirectory()) getAllFiles(appDir, allFiles)
  if (statSync(libDir).isDirectory()) getAllFiles(libDir, allFiles)

  const allWarnings: Warning[] = []
  
  for (const file of allFiles) {
    const warnings = validateFile(file)
    allWarnings.push(...warnings)
  }

  if (allWarnings.length > 0) {
    console.log('\n⚠️  Token Validation Warnings (NON-BLOCKING)\n')
    console.log('═'.repeat(60))
    
    for (const warning of allWarnings) {
      console.log(`\n📄 ${warning.file}:${warning.line}`)
      console.log(`   ⚠️  ${warning.message}`)
      console.log(`   💡 ${warning.suggestion}`)
    }
    
    console.log('\n' + '═'.repeat(60))
    console.log(`\nFound ${allWarnings.length} potential token indexing issue(s)`)
    console.log('These are warnings only and will not block the build.')
    console.log('Consider using tokenUtils helpers for safer access.\n')
  } else {
    console.log('✅ No token indexing issues found')
  }
}

main()
