'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2, Mountain } from 'lucide-react'

interface StatItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

const stats: StatItem[] = [
  {
    icon: Calendar,
    label: 'Founded',
    value: '1849',
  },
  {
    icon: Building2,
    label: 'Hotels & B&Bs',
    value: '25+',
  },
  {
    icon: MapPin,
    label: 'Restaurants',
    value: '100+',
  },
  {
    icon: Mountain,
    label: 'Trail Miles',
    value: '50+',
  },
]

export function StatsBar() {
  return (
    <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-y border-amber-100 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-3 md:mb-4 shadow-lg">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}




