'use client'

/**
 * Auburn Data Section - Homepage
 * 
 * Embeds the full CityDataStory component on the homepage,
 * showcasing Auburn's population history with the interactive
 * scrollytelling visualization we built.
 */

import Link from 'next/link'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { CityDataStory } from '@/components/sections/CityDataStory'
import { auburnDataStoryConfig } from '@/lib/data/cityThroughTime'
import { cn } from '@/lib/utils'

export function AuburnDataTeaser() {
  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden"
      aria-labelledby="data-story-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-pine-900" />
      
      {/* Decorative grid */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-500/20">
              <BarChart3 className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h2 
                id="data-story-heading"
                className="text-2xl md:text-3xl font-display font-bold text-white"
              >
                Auburn Through Time
              </h2>
              <p className="text-sm text-white/60 mt-1">
                Explore 120+ years of Gold Country history
              </p>
            </div>
          </div>
          
          <Link
            href="/discover/auburn-data"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg",
              "bg-gold-500 text-charcoal-900 font-semibold text-sm",
              "hover:bg-gold-400 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-charcoal-900",
              "group"
            )}
          >
            <span>View Full Story</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* The actual CityDataStory component we built */}
        <CityDataStory config={auburnDataStoryConfig} />
      </div>
    </section>
  )
}
