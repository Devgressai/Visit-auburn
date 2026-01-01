'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useFAQSearch } from './FAQSearchContext'
import { faqAuburnData, type FAQCategory, type FAQItem } from '@/lib/content/faq-auburn'

// Re-export for backward compatibility
export type { FAQItem, FAQCategory }
export const faqData = faqAuburnData

function FAQAccordion({ category, items, searchQuery = '' }: FAQCategory & { searchQuery?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items
    
    const query = searchQuery.toLowerCase()
    return items.filter(item => 
      item.question.toLowerCase().includes(query) || 
      item.answer.toLowerCase().includes(query)
    )
  }, [items, searchQuery])

  // Don't render category if no items match
  if (filteredItems.length === 0) return null

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-6 flex items-center gap-3 font-display">
        <span className="w-1 h-8 bg-gradient-to-b from-lake-400 to-lake-600 rounded-full" />
        {category}
      </h2>
      
      <div className="space-y-4">
        {filteredItems.map((item, index) => {
          const originalIndex = items.indexOf(item)
          const isOpen = openIndex === originalIndex
          const itemId = `faq-${category}-${originalIndex}`
          const answerId = `${itemId}-answer`
          
          return (
            <div
              key={originalIndex}
              className="bg-white rounded-xl border border-charcoal-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <button
                id={itemId}
                onClick={() => setOpenIndex(isOpen ? null : originalIndex)}
                onKeyDown={(e) => handleKeyDown(e, originalIndex)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="w-full px-6 py-5 min-h-[44px] flex items-center justify-between text-left gap-4 hover:bg-cream-50 transition-colors focus:outline-none focus:ring-2 focus:ring-lake-500 focus:ring-offset-2 rounded-t-xl"
                style={{ minHeight: '44px' }}
              >
                <span className="text-lg font-semibold text-charcoal-900 flex-1">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-lake-600 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key={`faq-${category}-${originalIndex}`}
                    id={answerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-charcoal-700 leading-relaxed border-t border-charcoal-200 pt-4">
                      <p className="mb-4">{item.answer}</p>
                      {item.links && item.links.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-charcoal-200">
                          <p className="text-sm font-semibold text-charcoal-900 mb-2">Learn more:</p>
                          <ul className="flex flex-wrap gap-3">
                            {item.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link
                                  href={link.href}
                                  className="text-lake-600 hover:text-lake-700 font-medium text-sm underline transition-colors"
                                >
                                  {link.text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function FAQSection() {
  const { searchQuery, setSearchQuery } = useFAQSearch()

  // Get all visible FAQs for JSON-LD (will be filtered client-side)
  const visibleFAQs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqAuburnData.flatMap(cat => 
        cat.items.map(item => ({ question: item.question, answer: item.answer }))
      )
    }
    
    const query = searchQuery.toLowerCase()
    return faqAuburnData.flatMap(cat => 
      cat.items
        .filter(item => 
          item.question.toLowerCase().includes(query) || 
          item.answer.toLowerCase().includes(query)
        )
        .map(item => ({ question: item.question, answer: item.answer }))
    )
  }, [searchQuery])

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search frequently asked questions..."
            className="w-full pl-12 pr-12 py-4 border-2 border-charcoal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lake-500 focus:border-lake-500 text-charcoal-900 placeholder-charcoal-400"
            aria-label="Search FAQ questions and answers"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-charcoal-400 hover:text-charcoal-600 focus:outline-none focus:ring-2 focus:ring-lake-500 rounded"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-charcoal-600">
            Found {visibleFAQs.length} {visibleFAQs.length === 1 ? 'result' : 'results'}
          </p>
        )}
      </div>

      {/* FAQ Categories */}
      {faqAuburnData.map((category) => (
        <FAQAccordion 
          key={category.category} 
          {...category} 
          searchQuery={searchQuery}
        />
      ))}

      {/* No Results Message */}
      {searchQuery && visibleFAQs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-charcoal-600 text-lg mb-2">No results found</p>
          <p className="text-charcoal-500 text-sm">Try different keywords or clear your search</p>
        </div>
      )}
    </div>
  )
}
