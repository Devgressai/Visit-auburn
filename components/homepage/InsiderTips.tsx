'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { editorials } from '@/lib/data'
import { getImageUrl } from '@/lib/images'
import { getAuburnImagePath } from '@/data/auburnImages'

// Extended articles for the carousel
// TODO: Replace fallback images with specific Auburn images from /public/images/auburn/insider-tips/
// Expected filenames:
// - hiking-trails.jpg
// - gold-rush-history.jpg
// - wine-tasting.jpg
// - family-itinerary.jpg
const articles = [
  {
    id: '1',
    title: "Best Hiking Trails for Every Skill Level",
    excerpt: "From easy strolls to challenging climbs, discover Auburn's most scenic trails...",
    image: getAuburnImagePath('outdoor-lake-clementine'), // Fallback to existing Auburn image
    href: '/things-to-do/outdoor-adventures',
  },
  {
    id: '2',
    title: "Gold Rush History Walking Tour",
    excerpt: "Step back in time and explore the historic sites of Old Town Auburn...",
    image: getAuburnImagePath('historic-old-town-clocktower'), // Fallback to existing Auburn image
    href: '/things-to-do/history-culture',
  },
  {
    id: '3',
    title: "Wine Tasting in the Foothills",
    excerpt: "Discover boutique wineries and tasting rooms in Auburn's wine country...",
    image: getAuburnImagePath('dining-winery-tasting'), // Fallback to existing Auburn image
    href: '/dining',
  },
  {
    id: '4',
    title: "Family-Friendly Weekend Itinerary",
    excerpt: "Two days of adventure, history, and fun for the whole family...",
    image: getAuburnImagePath('outdoor-quarry-ponds'), // Fallback to existing Auburn image
    href: '/plan/visitor-information',
  },
  ...editorials.map(e => ({
    id: e._id,
    title: e.title,
    excerpt: e.excerpt || '',
    image: e.featuredImage ? getImageUrl(e.featuredImage) : getAuburnImagePath('hero-old-town-clocktower'), // Fallback to existing Auburn image
    href: `/discover/${e.slug.current}`,
  })),
]

export function InsiderTips() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-20 md:py-28 bg-deep-surface">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="section-eyebrow-light">
              Local Knowledge
            </p>
            <h2 className="section-title-light">Insider Tips From Auburn</h2>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-charcoal-300 text-charcoal-600 hover:border-forest-500 hover:text-forest-600 flex items-center justify-center transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-charcoal-300 text-charcoal-600 hover:border-forest-500 hover:text-forest-600 flex items-center justify-center transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Articles Carousel */}
        <div 
          ref={scrollRef}
          className="scroll-container -mx-4 px-4"
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="scroll-item group"
            >
              <article className="w-80 md:w-96">
                {/* Image */}
                <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Hover border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pine-500/40 transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-forest-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-charcoal-600 text-sm line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-forest-600 font-medium text-sm group-hover:gap-2 transition-all">
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
