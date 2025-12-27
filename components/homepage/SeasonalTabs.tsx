'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Season = 'spring' | 'summer' | 'fall' | 'winter'

interface Activity {
  title: string
  image: string
  href: string
}

const seasons: Record<Season, { 
  name: string
  tagline: string
  activities: Activity[]
}> = {
  spring: {
    name: 'Spring',
    tagline: 'Wildflowers & Waterfalls',
    activities: [
      { title: 'Wildflower Hikes', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80', href: '/things-to-do/outdoor-adventures' },
      { title: 'Hidden Falls', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80', href: '/things-to-do/outdoor-adventures/hidden-falls-regional-park' },
      { title: 'Farmers Markets', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80', href: '/dining' },
      { title: 'Wine Tasting', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', href: '/dining/mt-vernon-winery' },
    ],
  },
  summer: {
    name: 'Summer',
    tagline: 'River Adventures & Festivals',
    activities: [
      { title: 'River Swimming', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', href: '/things-to-do/outdoor-adventures/auburn-swim-hole-american-river' },
      { title: 'Gold Rush Days', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', href: '/events/gold-rush-days' },
      { title: 'Trail Running', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', href: '/things-to-do/outdoor-adventures' },
      { title: 'Old Town Dining', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', href: '/dining' },
    ],
  },
  fall: {
    name: 'Fall',
    tagline: 'Harvest & Golden Foliage',
    activities: [
      { title: 'Fall Hiking', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', href: '/things-to-do/outdoor-adventures' },
      { title: 'Wine Harvest', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', href: '/dining' },
      { title: 'Mountain Biking', image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600&q=80', href: '/things-to-do/outdoor-adventures' },
      { title: 'Historic Tours', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80', href: '/things-to-do/history-culture' },
    ],
  },
  winter: {
    name: 'Winter',
    tagline: 'Cozy History & Nearby Snow',
    activities: [
      { title: 'Museum Visits', image: 'https://images.unsplash.com/photo-1566127444979-b2f1f4b1e18b?w=600&q=80', href: '/things-to-do/history-culture' },
      { title: 'Wine Country', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', href: '/dining' },
      { title: 'Holiday Events', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&q=80', href: '/events' },
      { title: 'Cozy Dining', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', href: '/dining' },
    ],
  },
}

export function SeasonalTabs() {
  const [activeSeason, setActiveSeason] = useState<Season>('winter')

  return (
    <section className="py-20 md:py-28 bg-cream-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-eyebrow-light">
            Come Back Again & Again
          </p>
          <h2 className="section-title-light mb-6">Auburn for Every Season</h2>
          <div className="w-16 h-1 rounded-full bg-gradient-gold mx-auto" />
        </div>

        {/* Season Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-md border border-charcoal-200">
            {(Object.keys(seasons) as Season[]).map((season) => (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeSeason === season
                    ? 'bg-gradient-forest text-white shadow-lg'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                {seasons[season].name}
              </button>
            ))}
          </div>
        </div>

        {/* Season Content */}
        <div className="relative">
          {/* Tagline */}
          <p className="text-center text-2xl md:text-3xl font-display text-charcoal-600 mb-10">
            {seasons[activeSeason].tagline}
          </p>

          {/* Activity Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {seasons[activeSeason].activities.map((activity, index) => (
              <Link
                key={activity.title}
                href={activity.href}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-white font-bold text-lg md:text-xl group-hover:text-gold-300 transition-colors">
                      {activity.title}
                    </h3>
                  </div>
                  {/* Hover border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-forest-500/40 transition-colors" />
                </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Link 
              href={`/things-to-do?season=${activeSeason}`}
              className="inline-flex items-center gap-2 text-lake-500 hover:text-lake-600 font-semibold transition-colors underline"
            >
              See All {seasons[activeSeason].name} Activities
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
