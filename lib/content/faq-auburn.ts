/**
 * FAQ Content for Auburn, California
 * Single source of truth for all FAQ questions and answers
 */

export interface FAQItem {
  question: string
  answer: string
  links?: Array<{
    text: string
    href: string
  }>
}

export interface FAQCategory {
  category: string
  items: FAQItem[]
}

export const faqAuburnData: FAQCategory[] = [
  {
    category: 'Before You Visit',
    items: [
      {
        question: 'When is the best time to visit Auburn?',
        answer: 'Auburn is beautiful year-round! Spring (March-May) offers wildflowers and comfortable temperatures. Summer (June-August) is perfect for water activities and outdoor concerts. Fall (September-November) brings stunning foliage and harvest festivals. Winter (December-February) is quieter with occasional snow in the foothills.',
        links: [
          { text: 'Plan your visit', href: '/plan/visitor-information' },
          { text: 'Things to do', href: '/things-to-do' }
        ]
      },
      {
        question: 'What\'s the weather like in Auburn?',
        answer: 'Auburn has a Mediterranean climate with hot, dry summers (80-95°F) and mild, wet winters (45-60°F). Summer evenings cool down nicely. Bring layers year-round, especially if you\'re hiking. Snow is rare in town but common in nearby mountains.',
        links: [
          { text: 'Visitor information', href: '/plan/visitor-information' }
        ]
      },
      {
        question: 'Do I need a car to visit Auburn?',
        answer: 'A car is recommended for maximum flexibility. While downtown Auburn is walkable, many attractions, trails, and restaurants are spread throughout the area. Ride-sharing services are available but limited compared to larger cities.',
        links: [
          { text: 'Getting here', href: '/plan/getting-here' }
        ]
      },
      {
        question: 'Are there accommodations for all budgets?',
        answer: 'Yes! Auburn offers everything from budget motels and campgrounds to charming bed & breakfasts and vacation rentals. Historic downtown has several boutique inns, while the surrounding area has chain hotels and unique cabin rentals.',
        links: [
          { text: 'Find accommodations', href: '/accommodations' }
        ]
      },
    ],
  },
  {
    category: 'Things To Do',
    items: [
      {
        question: 'What are the must-see attractions?',
        answer: 'Don\'t miss the historic Old Town Auburn, Placer County Courthouse (oldest continuously operating courthouse in California), Auburn State Recreation Area trails, and the Gold Country Museum. The Foresthill Bridge offers stunning views and is one of the highest bridges in California.',
        links: [
          { text: 'Explore attractions', href: '/things-to-do' }
        ]
      },
      {
        question: 'Are there kid-friendly activities?',
        answer: 'Absolutely! Kids love panning for gold at various sites, exploring the Gold Country Museum, swimming in the American River, hiking easy trails at Auburn State Recreation Area, and visiting local parks. Many restaurants are family-friendly.',
        links: [
          { text: 'Family activities', href: '/things-to-do' }
        ]
      },
      {
        question: 'What outdoor activities are available?',
        answer: 'Auburn is an outdoor paradise! Popular activities include hiking and mountain biking on 100+ miles of trails, kayaking and rafting on the American River, horseback riding, rock climbing, fishing, and trail running. The Western States Trail passes through Auburn.',
        links: [
          { text: 'Outdoor adventures', href: '/things-to-do/outdoor-adventures' }
        ]
      },
      {
        question: 'How long should I plan to stay?',
        answer: 'A weekend (2-3 days) lets you see the highlights. A full week allows time for extensive hiking, day trips to nearby attractions (Nevada City, Lake Tahoe), and deeper exploration of Gold Rush history. Many visitors use Auburn as a base for exploring the region.',
        links: [
          { text: 'Plan your trip', href: '/plan/visitor-information' },
          { text: 'View itineraries', href: '/itineraries' }
        ]
      },
    ],
  },
  {
    category: 'Practical Information',
    items: [
      {
        question: 'Where is the visitor center?',
        answer: 'The Auburn Visitor Center is located in historic Old Town at 1103 High Street. Hours are typically 9am-5pm weekdays. They offer maps, brochures, and local expertise. You can also find information at the Gold Country Museum.',
        links: [
          { text: 'Visitor information', href: '/plan/visitor-information' }
        ]
      },
      {
        question: 'Are dogs allowed on trails?',
        answer: 'Yes! Most trails in Auburn State Recreation Area are dog-friendly, but dogs must be leashed. Always pack out waste, bring plenty of water for your dog, and check specific trail regulations. Some swimming areas may have restrictions during peak season.',
        links: [
          { text: 'Outdoor activities', href: '/things-to-do/outdoor-adventures' }
        ]
      },
      {
        question: 'Is Auburn accessible for wheelchairs?',
        answer: 'Historic downtown has uneven sidewalks due to its age, but many businesses are accessible. Newer areas and most hotels meet ADA standards. Some trails have accessible sections. Call ahead to specific venues to confirm accessibility needs.',
        links: [
          { text: 'Visitor information', href: '/plan/visitor-information' }
        ]
      },
      {
        question: 'What\'s the cell phone coverage like?',
        answer: 'Cell coverage in town and along main highways is good with major carriers. Some remote trails and canyons in Auburn State Recreation Area may have limited or no service. Download maps and directions before heading to wilderness areas.',
        links: [
          { text: 'Maps & guides', href: '/plan/maps-guides' }
        ]
      },
      {
        question: 'Are there EV charging stations?',
        answer: 'Yes, several EV charging stations are available in Auburn, including at some hotels, shopping centers, and public parking areas. Check apps like PlugShare or ChargePoint for current locations and availability.',
        links: [
          { text: 'Getting here', href: '/plan/getting-here' }
        ]
      },
    ],
  },
  {
    category: 'Food & Dining',
    items: [
      {
        question: 'What type of cuisine is available?',
        answer: 'Auburn has diverse dining options including American comfort food, Italian, Mexican, Asian, farm-to-table restaurants, breweries, cafes, and bakeries. Historic downtown has many unique restaurants, while the surrounding area has more chains and casual options.',
        links: [
          { text: 'Dining options', href: '/dining' }
        ]
      },
      {
        question: 'Are there vegetarian/vegan options?',
        answer: 'Yes! Many Auburn restaurants offer vegetarian options, and several have dedicated vegan dishes. Farm-to-table restaurants typically have the most plant-based choices. Call ahead for specific dietary requirements.',
        links: [
          { text: 'Find restaurants', href: '/dining' }
        ]
      },
    ],
  },
  {
    category: 'Getting Here',
    items: [
      {
        question: 'How far is Auburn from major cities?',
        answer: 'Auburn is 30 minutes northeast of Sacramento, 2.5 hours from San Francisco, 45 minutes from South Lake Tahoe, and 1.5 hours from Reno. It\'s easily accessible via Interstate 80, making it a convenient stopover or day trip.',
        links: [
          { text: 'Getting here', href: '/plan/getting-here' }
        ]
      },
      {
        question: 'What airport should I fly into?',
        answer: 'Sacramento International Airport (SMF) is closest at 30 minutes away. Reno-Tahoe Airport (RNO) is 1 hour 45 minutes. San Francisco (SFO) and Oakland (OAK) are 2.5-3 hours. Car rentals are available at all airports.',
        links: [
          { text: 'Travel information', href: '/plan/getting-here' }
        ]
      },
      {
        question: 'Is there public transportation?',
        answer: 'Auburn has limited public transit. Placer County Transit connects Auburn to surrounding areas. Capitol Corridor Amtrak serves nearby Roseville (20 minutes away). Most visitors rely on personal vehicles or ride-sharing.',
        links: [
          { text: 'Getting here', href: '/plan/getting-here' }
        ]
      },
    ],
  },
]

