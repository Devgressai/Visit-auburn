/**
 * Search utilities - re-exports from core
 * Client-safe types and helpers
 */

// Re-export types and client-safe functions
export type { SearchDocumentType, SearchDocument } from './search/core'
export { cleanSnippet, buildSearchText } from './search/core'
