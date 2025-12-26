'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Leaf, Heart, Trash2, Camera, MapPin } from 'lucide-react'
import { getPlaceholderImage } from '@/lib/images'

const rules = [
  { icon: Leaf, title: 'Leave No Trace', description: 'Pack out what you pack in' },
  { icon: Heart, title: 'Respect History', description: 'Preserve our Gold Rush heritage' },
  { icon: Trash2, title: 'Keep It Clean', description: 'Help maintain our trails and parks' },
  { icon: Camera, title: 'Share Responsibly', description: 'Tag @VisitAuburn in your posts' },
  { icon: MapPin, title: 'Stay on Trails', description: 'Protect native habitats' },
]

export function RespectAuburnBanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image - Auburn's Green Bridge */}
      <div className="absolute inset-0">
        <Image
          src="/images/discover.jpg"
          alt="The iconic green bridge in Auburn, California"
          fill
          className="object-cover"
        />
        {/* Warm overlay - lighter to show more of the golden foothills */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/50 to-charcoal-900/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gold-500/30">
            <Leaf className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-medium uppercase tracking-wider">
              Responsible Tourism
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
            Respect Auburn
          </h2>
          
          <p className="text-xl md:text-2xl text-charcoal-300 leading-relaxed max-w-2xl mx-auto">
            The stunning trails. The rich history. The welcoming community. 
            It all starts with mutual respect. Here's how to keep Auburn awesome.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
          {rules.map((rule) => {
            const Icon = rule.icon
            return (
              <div 
                key={rule.title}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 cursor-default border border-white/10 hover:border-gold-500/30"
              >
                <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-gold-500/20">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-bold mb-1 font-display">{rule.title}</h3>
                <p className="text-charcoal-400 text-sm">{rule.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/plan/respect-auburn"
            className="inline-flex items-center gap-3 bg-gold-500 text-white font-bold px-8 py-4 rounded-full hover:bg-gold-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold-500/20"
          >
            Learn the Rules
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
