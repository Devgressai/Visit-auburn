#!/usr/bin/env tsx
/**
 * Placeholder Check Script
 * 
 * Scans the codebase for placeholder content that should not appear in the UI:
 * - Fake phone numbers (555-1234, etc.)
 * - Placeholder emails (visitauburn.com fake inboxes)
 * - Lorem ipsum text
 * - TBD/Coming Soon in rendered text
 * 
 * Note: TODO comments in code are allowed
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const PLACEHOLDER_PATTERNS = [
  // Phone numbers
  /\b555[-.\s]?1234\b/i,
  /\b\(530\)\s*555[-.\s]?1234\b/i,
  
  // Fake emails (but allow real ones)
  /\bmeetings@visitauburn\.com\b/i,
  /\bweddings@visitauburn\.com\b/i,
  /\binfo@visitauburn\.com\b/i, // This might be real, but flag it for review
  
  // Lorem ipsum
  /\blorem\s+ipsum\b/i,
  /\blorem\b/i,
  
  // Placeholder text
  /\bTBD\b/i,
  /\bT\.B\.D\.\b/i,
  /\bcoming\s+soon\b/i,
  /\bplaceholder\b/i,
  
  // Generic placeholders
  /\b\[.*?\]\b/, // [Something] in rendered text
]

const ALLOWED_PATTERNS = [
  // Allow TODO in comments
  /\/\/.*TODO/i,
  /\/\*.*TODO/i,
  /<!--.*TODO/i,
  
  // Allow in code comments
  /\/\/.*placeholder/i,
  /\/\*.*placeholder/i,
  
  // Allow in markdown/docs
  /\.md$/,
  /\.txt$/,
]

const IGNORE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /dist/,
  /build/,
  /coverage/,
  /\.tsbuildinfo/,
  /package-lock\.json/,
  /yarn\.lock/,
  /pnpm-lock\.yaml/,
]

interface Issue {
  file: string
  line: number
  column: number
  pattern: string
  match: string
  context: string
}

function shouldIgnoreFile(filePath: string): boolean {
  return IGNORE_PATTERNS.some(pattern => pattern.test(filePath))
}

function isAllowedContext(line: string, match: string): boolean {
  // Check if match is in a comment
  const matchIndex = line.indexOf(match)
  if (matchIndex === -1) return false
  
  const beforeMatch = line.substring(0, matchIndex)
  
  // Check if it's in a comment
  if (beforeMatch.includes('//')) return true
  if (beforeMatch.includes('/*')) return true
  if (beforeMatch.includes('<!--')) return true
  
  // Check if it's in a string that's clearly a comment/TODO
  if (beforeMatch.includes('TODO')) return true
  
  return false
}

function scanFile(filePath: string): Issue[] {
  const issues: Issue[] = []
  
  try {
    const content = readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')
    
    lines.forEach((line, lineIndex) => {
      // Skip comment-only lines for certain patterns
      const isCommentLine = line.trim().startsWith('//') || 
                           line.trim().startsWith('/*') ||
                           line.trim().startsWith('*')
      
      PLACEHOLDER_PATTERNS.forEach((pattern, patternIndex) => {
        // Create global version for matchAll
        const globalPattern = new RegExp(pattern.source, pattern.flags + 'g')
        const matches = Array.from(line.matchAll(globalPattern))
        
        matches.forEach((match) => {
          if (!match[0]) return
          
          // Skip if in allowed context
          if (isAllowedContext(line, match[0])) return
          
          // Special case: info@visitauburn.com might be real, but flag for review
          if (patternIndex === 2 && isCommentLine) return
          
          issues.push({
            file: filePath,
            line: lineIndex + 1,
            column: (match.index || 0) + 1,
            pattern: pattern.toString(),
            match: match[0],
            context: line.trim().substring(0, 100),
          })
        })
      })
    })
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
  }
  
  return issues
}

function scanDirectory(dirPath: string, issues: Issue[] = []): Issue[] {
  const entries = readdirSync(dirPath)
  
  entries.forEach((entry) => {
    const fullPath = join(dirPath, entry)
    
    if (shouldIgnoreFile(fullPath)) return
    
    try {
      const stat = statSync(fullPath)
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath, issues)
      } else if (stat.isFile()) {
        // Only scan relevant file types
        if (/\.(ts|tsx|js|jsx|md|txt)$/.test(entry)) {
          const fileIssues = scanFile(fullPath)
          issues.push(...fileIssues)
        }
      }
    } catch (error) {
      // Skip files we can't read
    }
  })
  
  return issues
}

function main() {
  const rootDir = process.cwd()
  console.log(`Scanning for placeholders in: ${rootDir}\n`)
  
  const issues = scanDirectory(rootDir)
  
  if (issues.length === 0) {
    console.log('✅ No placeholder content found!')
    process.exit(0)
  }
  
  console.log(`❌ Found ${issues.length} potential placeholder(s):\n`)
  
  // Group by file
  const byFile = issues.reduce((acc, issue) => {
    if (!acc[issue.file]) acc[issue.file] = []
    acc[issue.file].push(issue)
    return acc
  }, {} as Record<string, Issue[]>)
  
  Object.entries(byFile).forEach(([file, fileIssues]) => {
    console.log(`\n📄 ${file}`)
    fileIssues.forEach((issue) => {
      console.log(`   Line ${issue.line}:${issue.column} - Found "${issue.match}"`)
      console.log(`   Context: ${issue.context}`)
    })
  })
  
  console.log(`\n⚠️  Please review and remove placeholder content from the UI.`)
  console.log(`   TODO comments in code are allowed, but rendered text should not contain placeholders.`)
  
  process.exit(1)
}

main()

