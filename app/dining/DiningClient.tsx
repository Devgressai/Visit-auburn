'use client'

import { useSearchParams } from 'next/navigation'
import { dining } from '@/lib/data'
import { ListingGrid } from '@/components/listings/ListingGrid'
import { AttractionGrid } from '@/components/attractions'
import { getFoodDrinkAttractions } from '@/data/attractions'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function DiningClient() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams?.get('category') || ''

  // Initialize filter state from URL param
  const [initialCategory, setInitialCategory] = useState<string>(categoryParam)

  // Update when URL changes
  useEffect(() => {
    setInitialCategory(categoryParam)
  }, [categoryParam])

  return (
    <>
      {/* Dining Directory - Cream background */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
              Browse Auburn Restaurants & Dining
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Discover the best places to eat and drink in Auburn, from casual cafes to fine dining
            </p>
          </div>
          <ListingGrid
            items={dining}
            itemType="dining"
            showFilters={true}
          />
        </div>
      </section>

      {/* Featured Food & Drink Attractions - White background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <AttractionGrid
            attractions={getFoodDrinkAttractions()}
            title="Featured Food & Drink"
            subtitle="Restaurants, breweries, wineries, and markets that define Auburn's culinary scene"
            showFilters={true}
            filterTypes={['restaurant', 'brewery', 'winery', 'market']}
            columns={3}
          />
        </div>
      </section>

      {/* Dining Categories - White background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
              Explore by Category
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Find the perfect dining experience for your taste and occasion
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/dining?category=restaurant" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                Restaurants →
              </h3>
              <p className="text-charcoal-600">
                Farm-to-table dining, historic taverns, and Gold Country cuisine in Old Town Auburn
              </p>
            </Link>
            <Link href="/dining?category=winery" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                Wineries →
              </h3>
              <p className="text-charcoal-600">
                Sierra Foothills wine tasting rooms and vineyard tours near Auburn
              </p>
            </Link>
            <Link href="/dining?category=brewery" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                Breweries →
              </h3>
              <p className="text-charcoal-600">
                Craft beer and local breweries serving Gold Country's best brews
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Blue accent band */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Plan Your Culinary Adventure
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            From wine tasting to craft beer, farm-to-table to food festivals—Auburn's food scene awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/itineraries/history-and-wine" 
              className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Wine & History Itinerary
            </Link>
            <Link 
              href="/events" 
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Food Events
            </Link>
            <Link 
              href="/things-to-do" 
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Things to Do
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
