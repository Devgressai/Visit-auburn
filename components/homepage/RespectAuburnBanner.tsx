'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Leaf, Heart, Trash2, Camera, MapPin } from 'lucide-react'

const rules = [
  { icon: Leaf, title: 'Leave No Trace', description: 'Pack out what you pack in' },
  { icon: Heart, title: 'Respect History', description: 'Preserve our Gold Rush heritage' },
  { icon: Trash2, title: 'Keep It Clean', description: 'Help maintain our trails and parks' },
  { icon: Camera, title: 'Share Responsibly', description: 'Tag @VisitAuburn in your posts' },
  { icon: MapPin, title: 'Stay on Trails', description: 'Protect native habitats' },
]

export function RespectAuburnBanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/discover.jpg"
          alt="The iconic green bridge in Auburn, California"
          fill
          className="object-cover"
        />
        {/* Deep blue overlay with pine tint */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(20, 50, 80, 0.2) 0%,
              rgba(20, 50, 80, 0.15) 50%,
              rgba(20, 50, 80, 0.25) 100%
            )`
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white text-forest-600 shadow-lg border-2 border-forest-500">
            <Leaf className="w-4 h-4 mr-2" />
            Responsible Tourism
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 font-display">
            Respect Auburn
          </h2>
          
          <p className="text-xl md:text-2xl text-text-muted leading-relaxed max-w-2xl mx-auto">
            The stunning trails. The rich history. The welcoming community. 
            It all starts with mutual respect. Here's how to keep Auburn awesome.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto mb-14">
          {rules.map((rule) => {
            const Icon = rule.icon
            return (
              <div 
                key={rule.title}
                className="group p-6 text-center hover:bg-white transition-all duration-300 cursor-default rounded-2xl border border-white/30 shadow-lg"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div className="w-14 h-14 rounded-full bg-forest-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-forest-600 transition-all shadow-lg">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-charcoal-900 font-bold mb-1 font-display">{rule.title}</h3>
                <p className="text-charcoal-700 text-sm">{rule.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/plan/respect-auburn"
            className="inline-flex items-center gap-3 border-2 border-white text-white font-bold px-8 py-4 rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300 hover:bg-white hover:text-forest-700 shadow-lg"
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
