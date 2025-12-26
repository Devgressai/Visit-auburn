/**
 * Search utilities using FlexSearch
 * Provides fast, client-side search across all content
 */

import FlexSearch from 'flexsearch'

export interface SearchableItem {
  id: string
  title: string
  description: string
  category: string
  slug: string
  image?: string
  type: 'accommodation' | 'dining' | 'activity' | 'event' | 'editorial'
}

export interface SearchResult extends SearchableItem {
  score?: number
}

// FlexSearch Index type - using any for flexibility with the FlexSearch library
interface SearchIndex {
  add: (id: number, content: string) => void
  search: (query: string, options?: { limit?: number }) => (string | number)[]
}

// Create search index
export function createSearchIndex(items: SearchableItem[]) {
  const index = new FlexSearch.Index({
    tokenize: 'forward',
    cache: true,
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  }) as unknown as SearchIndex

  // Store items for retrieval
  const itemsMap = new Map<string, SearchableItem>()

  items.forEach((item, idx) => {
    const searchableText = `${item.title} ${item.description} ${item.category}`.toLowerCase()
    index.add(idx, searchableText)
    itemsMap.set(idx.toString(), item)
  })

  return { index, itemsMap }
}

// Perform search
export function performSearch(
  query: string,
  index: SearchIndex,
  itemsMap: Map<string, SearchableItem>,
  limit: number = 20
): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const results = index.search(query.toLowerCase(), { limit })
  
  return results.map((idx) => {
    const item = itemsMap.get(idx.toString())
    return item as SearchResult
  }).filter(Boolean)
}

// Get suggestions (autocomplete)
export function getSuggestions(
  query: string,
  index: SearchIndex,
  itemsMap: Map<string, SearchableItem>,
  limit: number = 5
): string[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const results = performSearch(query, index, itemsMap, limit)
  return results.map(item => item.title)
}
