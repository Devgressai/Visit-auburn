'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { SearchDocumentType } from '@/lib/search/core'
import { trackSearchSubmit, trackSearchTypeaheadSelect } from '@/lib/analytics'

interface SearchBarProps {
  variant?: 'header' | 'hero' | 'standalone'
  isHomepage?: boolean
  className?: string
}

interface SearchSuggestion {
  id: string
  type: string
  title: string
  href: string
  snippet: string
}

export function SearchBar({ variant = 'header', isHomepage = false, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const listboxId = `search-listbox-${variant}`
  const inputId = variant === 'hero' ? 'hero-search' : 'header-search'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      trackSearchSubmit(query.trim().length, 'full')
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setIsFocused(false)
      setSuggestions([])
      setSelectedIndex(-1)
    }
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    setSelectedIndex(-1)
    setHasSearched(false)
    inputRef.current?.focus()
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    trackSearchTypeaheadSelect(suggestion.type as any, suggestion.href)
    router.push(suggestion.href)
    setQuery('')
    setIsFocused(false)
    setSuggestions([])
    setSelectedIndex(-1)
  }

  const handleSeeAllResults = () => {
    if (query.trim()) {
      trackSearchSubmit(query.trim().length, 'typeahead')
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setIsFocused(false)
      setSuggestions([])
      setSelectedIndex(-1)
    }
  }

  // Debounced search for typeahead with AbortController
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      setIsLoading(false)
      setHasSearched(false)
      return
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new AbortController
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setIsLoading(true)
    setHasSearched(false)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=6`, {
        signal: abortController.signal,
        cache: 'no-store',
      })
      
      if (abortController.signal.aborted) {
        return
      }

      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.results || [])
        setHasSearched(true)
      } else {
        setSuggestions([])
        setHasSearched(true)
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was aborted, ignore
        return
      }
      console.error('Search suggestions error:', error)
      setSuggestions([])
      setHasSearched(true)
    } finally {
      if (!abortController.signal.aborted) {
        setIsLoading(false)
      }
    }
  }, [])

  // Debounce input
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (query.length >= 2) {
      debounceTimerRef.current = setTimeout(() => {
        fetchSuggestions(query)
      }, 250)
    } else {
      setSuggestions([])
      setSelectedIndex(-1)
      setHasSearched(false)
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [query, fetchSuggestions])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Handle keyboard navigation on input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isFocused) return

    const maxIndex = suggestions.length // "See all results" is at index suggestions.length

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => {
          if (prev < maxIndex) {
            return prev + 1
          }
          return prev
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else if (selectedIndex === suggestions.length && query.trim()) {
          // "See all results" selected
          handleSeeAllResults()
        } else if (query.trim()) {
          trackSearchSubmit(query.trim().length, 'typeahead')
          handleSubmit(e as any)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsFocused(false)
        setSuggestions([])
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // Type labels for display
  const typeLabels: Record<string, string> = {
    activity: 'Activity',
    accommodation: 'Accommodation',
    dining: 'Dining',
    event: 'Event',
    editorial: 'Article',
    attraction: 'Attraction',
    venue: 'Venue',
  }

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className={`max-w-3xl mx-auto ${className}`}>
        <div className="relative">
          <label htmlFor="hero-search" className="sr-only">
            Search for places, activities, restaurants in Auburn
          </label>
          <input
            id={inputId}
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder="Search for places, activities, restaurants..."
            aria-label="Search for places, activities, restaurants in Auburn"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={isFocused && (suggestions.length > 0 || isLoading || (hasSearched && query.length >= 2))}
            aria-activedescendant={selectedIndex >= 0 && selectedIndex <= suggestions.length ? `${listboxId}-option-${selectedIndex === suggestions.length ? 'see-all' : selectedIndex}` : undefined}
            className="w-full px-6 py-5 pr-28 text-lg rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-lake-500/50 transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-lake-500"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
            <button
              type="submit"
              aria-label="Search"
              className="px-6 py-3 bg-gradient-to-r from-lake-600 to-lake-700 text-white font-semibold rounded-xl hover:from-lake-700 hover:to-lake-800 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-lake-500 focus:ring-offset-2"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {isFocused && (suggestions.length > 0 || isLoading || (hasSearched && query.length >= 2 && suggestions.length === 0)) && (
              <motion.div
                ref={listboxRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                id={listboxId}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto"
                role="listbox"
                aria-label="Search suggestions"
              >
                {isLoading ? (
                  <div className="px-6 py-4 text-center text-gray-500" role="status" aria-live="polite">
                    Searching...
                  </div>
                ) : suggestions.length > 0 ? (
                  <>
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={suggestion.id}
                        id={`${listboxId}-option-${idx}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        aria-selected={selectedIndex === idx}
                        role="option"
                        className={`w-full px-6 py-3 text-left transition-colors flex items-start gap-3 focus:outline-none ${
                          selectedIndex === idx
                            ? 'bg-lake-50 border-l-4 border-lake-500'
                            : 'hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                      >
                        <Search className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" aria-hidden="true" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-900 font-semibold truncate">
                              {suggestion.title}
                            </span>
                            <span className="px-2 py-0.5 bg-lake-100 text-lake-700 text-xs font-semibold rounded whitespace-nowrap flex-shrink-0">
                              {typeLabels[suggestion.type] || suggestion.type}
                            </span>
                          </div>
                          {suggestion.snippet && (
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {suggestion.snippet}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                    {/* See all results row */}
                    <button
                      id={`${listboxId}-option-see-all`}
                      onClick={handleSeeAllResults}
                      onMouseEnter={() => setSelectedIndex(suggestions.length)}
                      aria-selected={selectedIndex === suggestions.length}
                      role="option"
                      className={`w-full px-6 py-3 text-left transition-colors flex items-center gap-3 border-t border-gray-200 focus:outline-none ${
                        selectedIndex === suggestions.length
                          ? 'bg-lake-50 border-l-4 border-lake-500'
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <Search className="w-4 h-4 text-lake-600 flex-shrink-0" aria-hidden="true" />
                      <span className="text-lake-600 font-semibold">
                        See all results for &quot;{query}&quot;
                      </span>
                    </button>
                  </>
                ) : hasSearched && query.length >= 2 ? (
                  <div className="px-6 py-4">
                    <p className="text-gray-600 mb-3">No results found</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 mb-2">Try browsing:</p>
                      <div className="flex flex-wrap gap-2">
                        {['Activities', 'Dining', 'Accommodations', 'Events'].map((category) => (
                          <button
                            key={category}
                            onClick={() => router.push(`/${category.toLowerCase()}`)}
                            className="px-3 py-1.5 text-sm bg-cream-50 hover:bg-cream-100 text-charcoal-700 rounded-full transition-colors"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    )
  }

  // Header variant
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <label htmlFor="header-search" className="sr-only">
            Search Auburn
          </label>
      <input
        id={inputId}
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        aria-label="Search Auburn"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={isFocused && (suggestions.length > 0 || isLoading || (hasSearched && query.length >= 2))}
        aria-activedescendant={selectedIndex >= 0 && selectedIndex < suggestions.length ? `${listboxId}-option-${selectedIndex}` : undefined}
        className={`pl-10 pr-4 py-2 rounded-full transition-all focus:outline-none focus:ring-2 ${
          isHomepage
            ? 'bg-white/10 text-white placeholder-white/70 focus:bg-white/20 focus:ring-white/30 border border-white/20'
            : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-lake-500 border border-gray-200'
        } ${isFocused ? 'w-64' : 'w-48'}`}
      />
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isHomepage ? 'text-white/70' : 'text-gray-400'}`} aria-hidden="true" />
      
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isHomepage ? 'text-white/70' : 'text-gray-400'} focus:outline-none focus:ring-2 focus:ring-lake-500 rounded`}
        >
          <X aria-hidden="true" />
        </button>
      )}

      {/* Suggestions Dropdown for Header variant */}
      <AnimatePresence>
        {isFocused && (suggestions.length > 0 || isLoading || (hasSearched && query.length >= 2 && suggestions.length === 0)) && (
          <motion.div
            ref={listboxRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id={listboxId}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto"
            role="listbox"
            aria-label="Search suggestions"
          >
            {isLoading ? (
              <div className="px-6 py-4 text-center text-gray-500" role="status" aria-live="polite">
                Searching...
              </div>
            ) : suggestions.length > 0 ? (
              <>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={suggestion.id}
                    id={`${listboxId}-option-${idx}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    aria-selected={selectedIndex === idx}
                    role="option"
                    className={`w-full px-6 py-3 text-left transition-colors flex items-start gap-3 focus:outline-none ${
                      selectedIndex === idx
                        ? 'bg-lake-50 border-l-4 border-lake-500'
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <Search className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-900 font-semibold truncate">
                          {suggestion.title}
                        </span>
                        <span className="px-2 py-0.5 bg-lake-100 text-lake-700 text-xs font-semibold rounded whitespace-nowrap flex-shrink-0">
                          {typeLabels[suggestion.type] || suggestion.type}
                        </span>
                      </div>
                      {suggestion.snippet && (
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {suggestion.snippet}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
                {/* See all results row */}
                <button
                  id={`${listboxId}-option-see-all`}
                  onClick={handleSeeAllResults}
                  onMouseEnter={() => setSelectedIndex(suggestions.length)}
                  aria-selected={selectedIndex === suggestions.length}
                  role="option"
                  className={`w-full px-6 py-3 text-left transition-colors flex items-center gap-3 border-t border-gray-200 focus:outline-none ${
                    selectedIndex === suggestions.length
                      ? 'bg-lake-50 border-l-4 border-lake-500'
                      : 'hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <Search className="w-4 h-4 text-lake-600 flex-shrink-0" aria-hidden="true" />
                  <span className="text-lake-600 font-semibold">
                    See all results for &quot;{query}&quot;
                  </span>
                </button>
              </>
            ) : hasSearched && query.length >= 2 ? (
              <div className="px-6 py-4">
                <p className="text-gray-600 mb-3">No results found</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 mb-2">Try browsing:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Activities', 'Dining', 'Accommodations', 'Events'].map((category) => (
                      <button
                        key={category}
                        onClick={() => router.push(`/${category.toLowerCase()}`)}
                        className="px-3 py-1.5 text-sm bg-cream-50 hover:bg-cream-100 text-charcoal-700 rounded-full transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}


