'use client'

import Link from 'next/link'
import { AuburnImage } from '@/components/ui/AuburnImage'
import { 
  Attraction, 
  attractionTypeLabels, 
  locationAreaLabels 
} from '@/data/attractions'
import { 
  MapPin, 
  Clock, 
  Mountain, 
  Users, 
  Dog, 
  Star,
  ArrowRight
} from 'lucide-react'

interface AttractionCardProps {
  attraction: Attraction
  variant?: 'default' | 'compact' | 'featured'
  showLocation?: boolean
  showDifficulty?: boolean
  showDuration?: boolean
}

export function AttractionCard({ 
  attraction, 
  variant = 'default',
  showLocation = true,
  showDifficulty = true,
  showDuration = true,
}: AttractionCardProps) {
  // Get the first related page as the link target
  const linkTarget = attraction.relatedPages[0] || '/things-to-do'
  
  // Difficulty color mapping
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    moderate: 'bg-amber-100 text-amber-700',
    challenging: 'bg-red-100 text-red-700',
  }

  if (variant === 'compact') {
    return (
      <Link 
        href={linkTarget}
        className="group flex gap-4 p-4 rounded-xl bg-white hover:bg-cream-50 border border-charcoal-100 hover:border-gold-300 transition-all hover:shadow-md"
      >
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <AuburnImage
            imageId={attraction.imageId}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors truncate">
            {attraction.name}
          </h3>
          <p className="text-sm text-charcoal-600 line-clamp-2 mt-1">
            {attraction.shortDescription}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-0.5 bg-gold-100 text-gold-700 rounded-full">
              {attractionTypeLabels[attraction.type]}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link 
        href={linkTarget}
        className="group relative rounded-2xl overflow-hidden bg-charcoal-900 aspect-[4/3] md:aspect-[16/9]"
      >
        <AuburnImage
          imageId={attraction.imageId}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          showCredit={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-charcoal-900/50 to-transparent" />
        
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          {attraction.featured && (
            <div className="flex items-center gap-1 text-gold-400 text-sm font-semibold mb-2">
              <Star className="w-4 h-4 fill-current" />
              Featured
            </div>
          )}
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-gold-300 transition-colors" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6)' }}>
            {attraction.name}
          </h3>
          
          <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">
            {attraction.shortDescription}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white">
              {attractionTypeLabels[attraction.type]}
            </span>
            {attraction.difficulty && (
              <span className={`px-3 py-1 rounded-full ${difficultyColors[attraction.difficulty]}`}>
                {attraction.difficulty.charAt(0).toUpperCase() + attraction.difficulty.slice(1)}
              </span>
            )}
            {attraction.duration && (
              <span className="flex items-center gap-1 text-white/70">
                <Clock className="w-4 h-4" />
                {attraction.duration}
              </span>
            )}
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-gold-400 font-semibold group-hover:gap-3 transition-all">
            Explore
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    )
  }

  // Default card variant
  return (
    <Link 
      href={linkTarget}
      className="group block rounded-xl overflow-hidden bg-white border border-charcoal-100 hover:border-gold-300 hover:shadow-lg transition-all"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <AuburnImage
          imageId={attraction.imageId}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          showCredit={false}
        />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-charcoal-800">
            {attractionTypeLabels[attraction.type]}
          </span>
        </div>

        {/* Featured Badge */}
        {attraction.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="flex items-center gap-1 px-2 py-1 bg-gold-500 rounded-full text-xs font-semibold text-white">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          </div>
        )}

        {/* Difficulty Badge */}
        {attraction.difficulty && showDifficulty && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[attraction.difficulty]}`}>
              {attraction.difficulty.charAt(0).toUpperCase() + attraction.difficulty.slice(1)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors mb-2">
          {attraction.name}
        </h3>
        
        <p className="text-charcoal-600 text-sm line-clamp-2 mb-4">
          {attraction.shortDescription}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal-500">
          {showLocation && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {locationAreaLabels[attraction.locationArea]}
            </span>
          )}
          
          {showDuration && attraction.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {attraction.duration}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-charcoal-100">
          {attraction.familyFriendly && (
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <Users className="w-3 h-3" />
              Family
            </span>
          )}
          {attraction.petFriendly && (
            <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              <Dog className="w-3 h-3" />
              Pet-Friendly
            </span>
          )}
          {attraction.seasonal && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Seasonal
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

