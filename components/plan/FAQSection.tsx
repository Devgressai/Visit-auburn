'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  category: string
  items: FAQItem[]
}

const faqData: FAQCategory[] = [
  {
    category: 'Before You Visit',
    items: [
      {
        question: 'When is the best time to visit Auburn?',
        answer: 'Auburn is beautiful year-round! Spring (March-May) offers wildflowers and comfortable temperatures. Summer (June-August) is perfect for water activities and outdoor concerts. Fall (September-November) brings stunning foliage and harvest festivals. Winter (December-February) is quieter with occasional snow in the foothills.',
      },
      {
        question: 'What\'s the weather like in Auburn?',
        answer: 'Auburn has a Mediterranean climate with hot, dry summers (80-95°F) and mild, wet winters (45-60°F). Summer evenings cool down nicely. Bring layers year-round, especially if you\'re hiking. Snow is rare in town but common in nearby mountains.',
      },
      {
        question: 'Do I need a car to visit Auburn?',
        answer: 'A car is recommended for maximum flexibility. While downtown Auburn is walkable, many attractions, trails, and restaurants are spread throughout the area. Ride-sharing services are available but limited compared to larger cities.',
      },
      {
        question: 'Are there accommodations for all budgets?',
        answer: 'Yes! Auburn offers everything from budget motels and campgrounds to charming bed & breakfasts and vacation rentals. Historic downtown has several boutique inns, while the surrounding area has chain hotels and unique cabin rentals.',
      },
    ],
  },
  {
    category: 'Things To Do',
    items: [
      {
        question: 'What are the must-see attractions?',
        answer: 'Don\'t miss the historic Old Town Auburn, Placer County Courthouse (oldest continuously operating courthouse in California), Auburn State Recreation Area trails, and the Gold Country Museum. The Foresthill Bridge offers stunning views and is one of the highest bridges in California.',
      },
      {
        question: 'Are there kid-friendly activities?',
        answer: 'Absolutely! Kids love panning for gold at various sites, exploring the Gold Country Museum, swimming in the American River, hiking easy trails at Auburn State Recreation Area, and visiting local parks. Many restaurants are family-friendly.',
      },
      {
        question: 'What outdoor activities are available?',
        answer: 'Auburn is an outdoor paradise! Popular activities include hiking and mountain biking on 100+ miles of trails, kayaking and rafting on the American River, horseback riding, rock climbing, fishing, and trail running. The Western States Trail passes through Auburn.',
      },
      {
        question: 'How long should I plan to stay?',
        answer: 'A weekend (2-3 days) lets you see the highlights. A full week allows time for extensive hiking, day trips to nearby attractions (Nevada City, Lake Tahoe), and deeper exploration of Gold Rush history. Many visitors use Auburn as a base for exploring the region.',
      },
    ],
  },
  {
    category: 'Practical Information',
    items: [
      {
        question: 'Where is the visitor center?',
        answer: 'The Auburn Visitor Center is located in historic Old Town at 1103 High Street. Hours are typically 9am-5pm weekdays. They offer maps, brochures, and local expertise. You can also find information at the Gold Country Museum.',
      },
      {
        question: 'Are dogs allowed on trails?',
        answer: 'Yes! Most trails in Auburn State Recreation Area are dog-friendly, but dogs must be leashed. Always pack out waste, bring plenty of water for your dog, and check specific trail regulations. Some swimming areas may have restrictions during peak season.',
      },
      {
        question: 'Is Auburn accessible for wheelchairs?',
        answer: 'Historic downtown has uneven sidewalks due to its age, but many businesses are accessible. Newer areas and most hotels meet ADA standards. Some trails have accessible sections. Call ahead to specific venues to confirm accessibility needs.',
      },
      {
        question: 'What\'s the cell phone coverage like?',
        answer: 'Cell coverage in town and along main highways is good with major carriers. Some remote trails and canyons in Auburn State Recreation Area may have limited or no service. Download maps and directions before heading to wilderness areas.',
      },
      {
        question: 'Are there EV charging stations?',
        answer: 'Yes, several EV charging stations are available in Auburn, including at some hotels, shopping centers, and public parking areas. Check apps like PlugShare or ChargePoint for current locations and availability.',
      },
    ],
  },
  {
    category: 'Food & Dining',
    items: [
      {
        question: 'What type of cuisine is available?',
        answer: 'Auburn has diverse dining options including American comfort food, Italian, Mexican, Asian, farm-to-table restaurants, breweries, cafes, and bakeries. Historic downtown has many unique restaurants, while the surrounding area has more chains and casual options.',
      },
      {
        question: 'Are there vegetarian/vegan options?',
        answer: 'Yes! Many Auburn restaurants offer vegetarian options, and several have dedicated vegan dishes. Farm-to-table restaurants typically have the most plant-based choices. Call ahead for specific dietary requirements.',
      },
    ],
  },
  {
    category: 'Getting Here',
    items: [
      {
        question: 'How far is Auburn from major cities?',
        answer: 'Auburn is 30 minutes northeast of Sacramento, 2.5 hours from San Francisco, 45 minutes from South Lake Tahoe, and 1.5 hours from Reno. It\'s easily accessible via Interstate 80, making it a convenient stopover or day trip.',
      },
      {
        question: 'What airport should I fly into?',
        answer: 'Sacramento International Airport (SMF) is closest at 30 minutes away. Reno-Tahoe Airport (RNO) is 1 hour 45 minutes. San Francisco (SFO) and Oakland (OAK) are 2.5-3 hours. Car rentals are available at all airports.',
      },
      {
        question: 'Is there public transportation?',
        answer: 'Auburn has limited public transit. Placer County Transit connects Auburn to surrounding areas. Capitol Corridor Amtrak serves nearby Roseville (20 minutes away). Most visitors rely on personal vehicles or ride-sharing.',
      },
    ],
  },
]

function FAQAccordion({ category, items }: FAQCategory) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3 font-display">
        <span className="w-1 h-8 bg-gradient-to-b from-pine-400 to-pine-600 rounded-full" />
        {category}
      </h2>
      
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          
          return (
            <div
              key={index}
              className="card-glass overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-lg font-semibold text-text-primary flex-1">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-pine-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-text-muted leading-relaxed border-t border-border-subtle pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function FAQSection() {
  return (
    <div className="max-w-4xl mx-auto">
      {faqData.map((category) => (
        <FAQAccordion key={category.category} {...category} />
      ))}
    </div>
  )
}
