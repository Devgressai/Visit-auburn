import { NextRequest, NextResponse } from 'next/server'
import { buildSearchDocuments } from '@/lib/search/index.server'
import { createSearchIndex, searchIndex, type SearchDocumentType } from '@/lib/search/core'

// Build index once at module init time
let searchIndexInstance: ReturnType<typeof createSearchIndex> | null = null

function getSearchIndex() {
  if (!searchIndexInstance) {
    const documents = buildSearchDocuments()
    searchIndexInstance = createSearchIndex(documents)
  }
  return searchIndexInstance
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get('q')?.trim() || ''
  const type = searchParams.get('type') as SearchDocumentType | null
  const limitParam = searchParams.get('limit')
  const limit = limitParam ? parseInt(limitParam, 10) : 20

  // If query is empty, return empty results
  if (!q || q.length < 2) {
    return NextResponse.json({
      query: q,
      type: type || null,
      results: [],
      tookMs: Date.now() - startTime,
    })
  }

  try {
    const index = getSearchIndex()
    const results = searchIndex(index, q, {
      type: type || undefined,
      limit: Math.min(limit, 100), // Cap at 100
    })

    return NextResponse.json({
      query: q,
      type: type || null,
      results,
      tookMs: Date.now() - startTime,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      {
        query: q,
        type: type || null,
        results: [],
        error: 'Search failed',
        tookMs: Date.now() - startTime,
      },
      { status: 500 }
    )
  }
}
