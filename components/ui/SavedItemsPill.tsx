'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, X } from 'lucide-react'
import { useSavedItems } from '@/lib/useSavedItems'

export function SavedItemsPill() {
  const { savedItems, count, unsaveItem } = useSavedItems()
  const [isExpanded, setIsExpanded] = useState(false)

  if (count === 0) return null

  return (
    <>
      {/* Floating Pill - Bottom Right on mobile, avoids action bar */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-30">
        {!isExpanded ? (
          // Collapsed: Just the count pill
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gold-500 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-gold-600 transition-all duration-300 font-semibold"
            style={{ minHeight: '48px', minWidth: '48px' }}
          >
            <Heart className="w-5 h-5 fill-current" />
            <span>Saved ({count})</span>
          </button>
        ) : (
          // Expanded: Show list
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ width: '280px', maxHeight: '400px' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-charcoal-200 bg-cream-50">
              <h3 className="font-bold text-charcoal-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-gold-500 fill-current" />
                Saved ({count})
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-charcoal-100 rounded transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
              {savedItems.map((item) => {
                const href = `/${item.type === 'activity' ? 'activities' : item.type === 'accommodation' ? 'accommodations' : item.type === 'dining' ? 'dining' : 'events'}/${item.slug}`
                
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 border-b border-charcoal-100 last:border-0 hover:bg-cream-50 transition-colors group"
                  >
                    <Link href={href} className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-charcoal-900 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs text-charcoal-500 mt-0.5 capitalize">
                        {item.type}
                      </p>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        unsaveItem(item.id)
                      }}
                      className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0"
                      aria-label="Remove"
                    >
                      <X className="w-4 h-4 text-charcoal-400 hover:text-red-600" />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-charcoal-200 bg-cream-50">
              <Link
                href="/saved"
                className="block text-center text-sm font-semibold text-forest-600 hover:text-forest-700 transition-colors"
                onClick={() => setIsExpanded(false)}
              >
                View All Saved →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-20"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  )
}

