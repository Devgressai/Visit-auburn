'use client'

import { useState } from 'react'
import { AttractionCard } from './AttractionCard'
import { 
  Attraction, 
  AttractionType,
  attractionTypeLabels,
  getAttractionsByType,
  getFeaturedAttractions,
} from '@/data/attractions'
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react'

interface AttractionGridProps {
  attractions: Attraction[]
  title?: string
  subtitle?: string
  showFilters?: boolean
  showViewToggle?: boolean
  featuredFirst?: boolean
  maxItems?: number
  columns?: 2 | 3 | 4
  variant?: 'default' | 'compact' | 'mixed'
  filterTypes?: AttractionType[]
  emptyMessage?: string
}

export function AttractionGrid({
  attractions,
  title,
  subtitle,
  showFilters = false,
  showViewToggle = false,
  featuredFirst = true,
  maxItems,
  columns = 3,
  variant = 'default',
  filterTypes,
  emptyMessage = 'No attractions found.',
}: AttractionGridProps) {
  const [selectedType, setSelectedType] = useState<AttractionType | 'all'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Get unique types from attractions
  const availableTypes = filterTypes || Array.from(
    new Set(attractions.map(a => a.type))
  ) as AttractionType[]

  // Filter attractions
  let filteredAttractions = selectedType === 'all' 
    ? attractions 
    : attractions.filter(a => a.type === selectedType)

  // Sort featured first
  if (featuredFirst) {
    filteredAttractions = [
      ...filteredAttractions.filter(a => a.featured),
      ...filteredAttractions.filter(a => !a.featured),
    ]
  }

  // Limit items
  if (maxItems) {
    filteredAttractions = filteredAttractions.slice(0, maxItems)
  }

  // Column classes
  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className="w-full">
      {/* Header */}
      {(title || subtitle || showFilters || showViewToggle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-charcoal-600 mb-6">{subtitle}</p>
          )}

          {/* Filters and View Toggle */}
          {(showFilters || showViewToggle) && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Type Filters */}
              {showFilters && availableTypes.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 text-sm text-charcoal-500 mr-2">
                    <Filter className="w-4 h-4" />
                    Filter:
                  </span>
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      selectedType === 'all'
                        ? 'bg-gold-500 text-white'
                        : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
                    }`}
                  >
                    All
                  </button>
                  {availableTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedType === type
                          ? 'bg-gold-500 text-white'
                          : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
                      }`}
                    >
                      {attractionTypeLabels[type]}
                    </button>
                  ))}
                </div>
              )}

              {/* View Toggle */}
              {showViewToggle && (
                <div className="flex items-center gap-1 bg-charcoal-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-charcoal-900 shadow-sm'
                        : 'text-charcoal-500 hover:text-charcoal-700'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white text-charcoal-900 shadow-sm'
                        : 'text-charcoal-500 hover:text-charcoal-700'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      {showFilters && (
        <p className="text-sm text-charcoal-500 mb-4">
          Showing {filteredAttractions.length} attraction{filteredAttractions.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Grid/List */}
      {filteredAttractions.length > 0 ? (
        viewMode === 'grid' ? (
          <div className={`grid gap-6 ${columnClasses[columns]} relative z-0`}>
            {variant === 'mixed' ? (
              <>
                {/* First item featured */}
                {filteredAttractions[0] && (
                  <div className="md:col-span-2">
                    <AttractionCard 
                      attraction={filteredAttractions[0]} 
                      variant="featured"
                    />
                  </div>
                )}
                {/* Rest default */}
                {filteredAttractions.slice(1).map(attraction => (
                  <AttractionCard
                    key={attraction.id}
                    attraction={attraction}
                    variant="default"
                  />
                ))}
              </>
            ) : (
              filteredAttractions.map(attraction => (
                <AttractionCard
                  key={attraction.id}
                  attraction={attraction}
                  variant={variant === 'compact' ? 'compact' : 'default'}
                />
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAttractions.map(attraction => (
              <AttractionCard
                key={attraction.id}
                attraction={attraction}
                variant="compact"
              />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12 bg-charcoal-50 rounded-xl">
          <SlidersHorizontal className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
          <p className="text-charcoal-600">{emptyMessage}</p>
          {selectedType !== 'all' && (
            <button
              onClick={() => setSelectedType('all')}
              className="mt-4 text-gold-600 hover:text-gold-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================
// PRESET GRIDS FOR SPECIFIC PAGE TYPES
// ============================================

/**
 * Outdoor Attractions Grid
 */
export function OutdoorAttractionGrid({ 
  maxItems,
  showFilters = true,
}: { 
  maxItems?: number
  showFilters?: boolean 
}) {
  const { getOutdoorAttractions } = require('@/data/attractions')
  return (
    <AttractionGrid
      attractions={getOutdoorAttractions()}
      title="Outdoor Adventures"
      subtitle="Trails, parks, and natural wonders in Auburn's backyard"
      showFilters={showFilters}
      filterTypes={['trail', 'park', 'viewpoint', 'water-activity']}
      maxItems={maxItems}
      featuredFirst={true}
    />
  )
}

/**
 * History & Culture Grid
 */
export function HistoryCultureGrid({ 
  maxItems,
  showFilters = true,
}: { 
  maxItems?: number
  showFilters?: boolean 
}) {
  const { getHistoryCultureAttractions } = require('@/data/attractions')
  return (
    <AttractionGrid
      attractions={getHistoryCultureAttractions()}
      title="History & Culture"
      subtitle="Museums, historic sites, and Gold Rush heritage"
      showFilters={showFilters}
      filterTypes={['museum', 'historic-site', 'cultural']}
      maxItems={maxItems}
      featuredFirst={true}
    />
  )
}

/**
 * Food & Drink Grid
 */
export function FoodDrinkGrid({ 
  maxItems,
  showFilters = true,
}: { 
  maxItems?: number
  showFilters?: boolean 
}) {
  const { getFoodDrinkAttractions } = require('@/data/attractions')
  return (
    <AttractionGrid
      attractions={getFoodDrinkAttractions()}
      title="Food & Drink"
      subtitle="Restaurants, breweries, wineries, and markets"
      showFilters={showFilters}
      filterTypes={['restaurant', 'brewery', 'winery', 'market']}
      maxItems={maxItems}
      featuredFirst={true}
    />
  )
}

/**
 * Featured Attractions Grid (for homepage/landing)
 */
export function FeaturedAttractionGrid({ 
  maxItems = 6,
}: { 
  maxItems?: number 
}) {
  return (
    <AttractionGrid
      attractions={getFeaturedAttractions(maxItems)}
      title="Top Auburn Attractions"
      subtitle="The best of what Gold Country has to offer"
      showFilters={false}
      variant="mixed"
      maxItems={maxItems}
    />
  )
}

