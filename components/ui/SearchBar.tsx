'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  variant?: 'header' | 'hero' | 'standalone'
  isHomepage?: boolean
  className?: string
}

export function SearchBar({ variant = 'header', isHomepage = false, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setIsFocused(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  // Mock suggestions - replace with actual search API
  useEffect(() => {
    if (query.length >= 2) {
      // Simulate fetching suggestions
      setSuggestions([
        'Auburn State Recreation Area',
        'Historic Old Town',
        'Gold Rush Museum',
      ].filter(s => s.toLowerCase().includes(query.toLowerCase())))
    } else {
      setSuggestions([])
    }
  }, [query])

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className={`max-w-3xl mx-auto ${className}`}>
        <div className="relative">
          <label htmlFor="hero-search" className="sr-only">
            Search for places, activities, restaurants in Auburn
          </label>
          <input
            id="hero-search"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for places, activities, restaurants..."
            aria-label="Search for places, activities, restaurants in Auburn"
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
            {isFocused && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
              >
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(suggestion)
                      router.push(`/search?q=${encodeURIComponent(suggestion)}`)
                    }}
                    aria-label={`Search for ${suggestion}`}
                    className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-lake-500"
                  >
                    <Search className="w-4 h-4 text-gray-400" aria-hidden="true" />
                    <span className="text-gray-900">{suggestion}</span>
                  </button>
                ))}
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
        id="header-search"
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder="Search..."
        aria-label="Search Auburn"
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
    </form>
  )
}


