/**
 * Search core utilities - client-safe
 * Types, pure helpers, and index operations (NO content imports)
 */

import FlexSearch from 'flexsearch'

export type SearchDocumentType = 
  | 'activity' 
  | 'accommodation' 
  | 'dining' 
  | 'event' 
  | 'editorial'
  | 'attraction'
  | 'venue'

export interface SearchDocument {
  id: string
  type: SearchDocumentType
  title: string
  href: string
  text: string // Full text for indexing
  snippet: string // Short snippet for display (max 160 chars, no HTML)
  tags?: string[]
  location?: string
  [key: string]: any // Index signature for FlexSearch compatibility
}

/**
 * Strip HTML tags and limit text length
 */
export function cleanSnippet(text: string, maxLength: number = 160): string {
  // Remove HTML tags
  const stripped = text.replace(/<[^>]*>/g, '')
  // Remove extra whitespace
  const cleaned = stripped.replace(/\s+/g, ' ').trim()
  // Truncate to max length
  if (cleaned.length <= maxLength) {
    return cleaned
  }
  // Truncate at word boundary
  const truncated = cleaned.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...'
}

/**
 * Build search text from content fields
 */
export function buildSearchText(
  title: string,
  excerpt?: string,
  description?: any,
  category?: string,
  location?: { city?: string; address?: string }
): string {
  const parts: string[] = [title]
  
  if (excerpt) parts.push(excerpt)
  if (category) parts.push(category)
  if (location?.city) parts.push(location.city)
  if (location?.address) parts.push(location.address)
  
  // Handle description (could be PortableText or string)
  if (description) {
    if (typeof description === 'string') {
      parts.push(description)
    } else if (Array.isArray(description)) {
      // PortableText array - extract text
      const text = description
        .map((block: any) => {
          if (block._type === 'block' && block.children) {
            return block.children
              .map((child: any) => child.text || '')
              .join(' ')
          }
          return ''
        })
        .join(' ')
      if (text) parts.push(text)
    }
  }
  
  return parts.join(' ').toLowerCase()
}

/**
 * Calculate relevance score for ranking
 */
function calculateRelevanceScore(document: SearchDocument, query: string): number {
  const lowerQuery = query.toLowerCase()
  const lowerTitle = document.title.toLowerCase()
  
  // Exact title match: highest score
  if (lowerTitle === lowerQuery) {
    return 1000
  }
  
  // Prefix title match: high score
  if (lowerTitle.startsWith(lowerQuery)) {
    return 500
  }
  
  // Title includes query: medium score
  if (lowerTitle.includes(lowerQuery)) {
    return 200
  }
  
  // Text includes query: lower score
  if (document.text.includes(lowerQuery)) {
    return 100
  }
  
  // Tags match: bonus
  if (document.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
    return 50
  }
  
  return 0
}

/**
 * Create FlexSearch Document index
 */
export function createSearchIndex(documents: SearchDocument[]) {
  const index = new FlexSearch.Document<SearchDocument>({
    document: {
      id: 'id',
      index: ['title', 'text', 'tags'],
      store: ['id', 'type', 'title', 'href', 'snippet', 'tags', 'location'],
    },
    tokenize: 'forward',
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  })

  // Add all documents to index
  documents.forEach((doc) => {
    index.add(doc)
  })

  return index
}

/**
 * Search the index with ranking boosts
 */
export function searchIndex(
  index: FlexSearch.Document<SearchDocument>,
  query: string,
  options?: { type?: SearchDocumentType; limit?: number }
): SearchDocument[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const limit = options?.limit || 20
  const searchQuery = query.trim().toLowerCase()

  // Perform search
  const results = index.search(searchQuery, {
    limit: limit * 2, // Get more results for ranking
    enrich: true,
  })

  // Flatten and extract documents with scores
  const documentMap = new Map<string, { doc: SearchDocument; score: number }>()
  
  for (const result of results) {
    if (result.field === 'title' || result.field === 'text' || result.field === 'tags') {
      for (const doc of result.result) {
        // Filter by type if specified
        if (options?.type && doc.type !== options.type) {
          continue
        }
        
        const searchDoc = doc as SearchDocument
        const existing = documentMap.get(searchDoc.id)
        
        // Calculate relevance score
        const score = calculateRelevanceScore(searchDoc, searchQuery)
        
        // Keep highest score for each document
        if (!existing || score > existing.score) {
          documentMap.set(searchDoc.id, { doc: searchDoc, score })
        }
      }
    }
  }

  // Convert to array and sort by score (descending), then by title (ascending) for stability
  const ranked = Array.from(documentMap.values())
    .sort((a, b) => {
      // Primary sort: by score
      if (b.score !== a.score) {
        return b.score - a.score
      }
      // Secondary sort: by title (deterministic)
      return a.doc.title.localeCompare(b.doc.title)
    })
    .map(item => item.doc)
    .slice(0, limit)

  return ranked
}
