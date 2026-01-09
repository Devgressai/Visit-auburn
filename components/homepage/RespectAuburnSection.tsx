'use client'

import { motion } from 'framer-motion'
import { Landmark, Mountain, ShoppingBag, Trash2, Users, Heart } from 'lucide-react'
import Link from 'next/link'

interface Principle {
  number: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  tips: string[]
}

const principles: Principle[] = [
  {
    number: 1,
    icon: Landmark,
    title: 'Honor Our History',
    description: 'Auburn\'s Gold Rush heritage is irreplaceable. Help us preserve it for future generations.',
    tips: [
      'Respect historic sites and buildings',
      'Don\'t remove artifacts or disturb archaeological sites',
      'Stay on marked paths at historic locations',
      'Support preservation efforts through donations or volunteering',
    ],
  },
  {
    number: 2,
    icon: Mountain,
    title: 'Tread Lightly',
    description: 'Our natural beauty is fragile. Stay on trails and leave nature as you found it.',
    tips: [
      'Stay on designated trails and paths',
      'Don\'t pick wildflowers or disturb wildlife',
      'Keep pets leashed on trails',
      'Respect trail closures and seasonal restrictions',
    ],
  },
  {
    number: 3,
    icon: ShoppingBag,
    title: 'Support Local',
    description: 'Local businesses are the heart of Auburn. Your support keeps our community thriving.',
    tips: [
      'Shop at locally-owned stores',
      'Dine at family-run restaurants',
      'Buy from local artisans and makers',
      'Book tours with local guides',
    ],
  },
  {
    number: 4,
    icon: Trash2,
    title: 'Leave It Better',
    description: 'Take responsibility for our shared spaces. Pack out what you pack in—and maybe a little extra.',
    tips: [
      'Pack out all trash, including food scraps',
      'Pick up litter when you see it',
      'Use designated restrooms and facilities',
      'Properly dispose of pet waste',
    ],
  },
  {
    number: 5,
    icon: Users,
    title: 'Be a Good Neighbor',
    description: 'Auburn is home to thousands of residents. Respect their community as you enjoy your visit.',
    tips: [
      'Respect residential areas and quiet hours',
      'Park only in designated areas',
      'Keep noise levels reasonable',
      'Be courteous to locals and fellow visitors',
    ],
  },
]

export function RespectAuburnSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-green-50/30 to-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Respect Auburn
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Auburn's beauty, history, and character don't happen by accident. 
            They come from mutual respect—from locals and visitors alike. 
            Follow these principles to help keep Auburn special.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {principles.map((principle, index) => {
            const Icon = principle.icon
            return (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {principle.number}
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {principle.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {principle.description}
                </p>
                
                <ul className="space-y-2">
                  {principle.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 font-bold mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Take the Pledge
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Commit to being a responsible visitor and help us preserve Auburn's 
            beauty, history, and community for generations to come.
          </p>
          <Link
            href="/plan/visitor-information"
            className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
          >
            Learn More About Visiting Auburn
          </Link>
        </motion.div>
      </div>
    </section>
  )
}




