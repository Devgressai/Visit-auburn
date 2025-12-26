'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, SlidersHorizontal, X, MapPin, Clock, Star, Calendar, DollarSign } from 'lucide-react'
import { getImageUrl } from '@/lib/images'
import type { Accommodation, Activity, Dining, Event } from '@/types'

interface ListingCardProps {
  item: Accommodation | Activity | Dining | Event
  itemType: 'accommodations' | 'activities' | 'dining' | 'events'
  index: number
}

function ListingCard({ item, itemType, index }: ListingCardProps) {
  const getHref = () => {
    const slug = item.slug.current
    switch (itemType) {
      case 'accommodations':
        return `/accommodations/${slug}`
      case 'activities':
        return `/activities/${slug}`
      case 'dining':
        return `/dining/${slug}`
      case 'events':
        return `/events/${slug}`
      default:
        return '#'
    }
  }

  const imageUrl = item.featuredImage ? getImageUrl(item.featuredImage) : null

  const getCategory = () => {
    if ('category' in item && item.category) {
      return item.category
    }
    if ('cuisine' in item && item.cuisine) {
      return item.cuisine
    }
    return null
  }

  const getMetadata = () => {
    if (itemType === 'accommodations') {
      const acc = item as Accommodation
      return {
        primary: acc.priceRange,
        secondary: acc.location?.city || 'Auburn',
        icon: DollarSign,
        rating: acc.rating
      }
    }
    if (itemType === 'activities') {
      const act = item as Activity
      return {
        primary: act.duration,
        secondary: act.location?.city || 'Auburn',
        icon: Clock,
      }
    }
    if (itemType === 'dining') {
      const din = item as Dining
      return {
        primary: din.priceRange,
        secondary: din.cuisine,
        icon: MapPin,
      }
    }
    if (itemType === 'events') {
      const evt = item as Event
      return {
        primary: evt.startDate ? new Date(evt.startDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }) : null,
        secondary: evt.location?.city || 'Auburn',
        icon: Calendar,
      }
    }
    return { primary: null, secondary: null, icon: MapPin }
  }

  const metadata = getMetadata()
  const category = getCategory()

  return (
    <Link 
      href={getHref()} 
      className="group block"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <article className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 h-full card-hover">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center">
              <span className="text-gold-600 text-4xl font-display">{item.title.charAt(0)}</span>
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-charcoal-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              {category}
            </div>
          )}

          {/* Rating Badge */}
          {'rating' in metadata && metadata.rating && (
            <div className="absolute top-4 right-4 bg-gold-500 text-white text-sm font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              {metadata.rating}
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-1">
            {item.title}
          </h3>

          {item.excerpt && (
            <p className="text-charcoal-500 text-sm mb-4 line-clamp-2">
              {item.excerpt}
            </p>
          )}

          {/* Metadata Row */}
          <div className="flex items-center justify-between text-sm">
            {metadata.primary && (
              <div className="flex items-center gap-1.5 text-charcoal-600">
                <metadata.icon className="w-4 h-4 text-gold-500" />
                <span className="font-medium">{metadata.primary}</span>
              </div>
            )}
            {metadata.secondary && (
              <div className="flex items-center gap-1.5 text-charcoal-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{metadata.secondary}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

interface ListingGridProps {
  items: (Accommodation | Activity | Dining | Event)[]
  itemType: 'accommodations' | 'activities' | 'dining' | 'events'
  showFilters?: boolean
}

export function ListingGrid({ items, itemType, showFilters = false }: ListingGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const categories = useMemo(() => {
    const cats = new Set<string>()
    items.forEach((item) => {
      if ('category' in item && item.category) {
        cats.add(item.category)
      }
      if ('cuisine' in item && item.cuisine) {
        cats.add(item.cuisine)
      }
    })
    return Array.from(cats).sort()
  }, [items])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const itemCategory = 'category' in item ? item.category : ('cuisine' in item ? item.cuisine : null)
      const matchesCategory = selectedCategory === 'all' || itemCategory === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [items, selectedCategory, searchQuery])

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all'

  return (
    <div>
      {showFilters && (
        <div className="mb-10">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-charcoal-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all text-charcoal-800 placeholder:text-charcoal-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter Buttons */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gold-500 text-white shadow-md'
                      : 'bg-white border border-charcoal-200 text-charcoal-600 hover:border-gold-400 hover:text-gold-600'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-gold-500 text-white shadow-md'
                        : 'bg-white border border-charcoal-200 text-charcoal-600 hover:border-gold-400 hover:text-gold-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between bg-cream-100 rounded-xl px-4 py-3">
              <p className="text-charcoal-600">
                <span className="font-semibold text-charcoal-900">{filteredItems.length}</span>
                {' '}
                {filteredItems.length === 1 ? 'result' : 'results'} found
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="text-gold-600 hover:text-gold-700 text-sm font-semibold flex items-center gap-1"
              >
                Clear all
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <ListingCard key={item._id} item={item} itemType={itemType} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-charcoal-400" />
          </div>
          <h3 className="text-xl font-bold text-charcoal-900 mb-2">No results found</h3>
          <p className="text-charcoal-500 mb-6">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
