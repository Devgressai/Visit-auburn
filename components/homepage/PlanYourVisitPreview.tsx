import Link from 'next/link'
import { Card } from '@/components/ui'
import { MapPin, Info, FileText } from 'lucide-react'

export function PlanYourVisitPreview() {
  const resources = [
    {
      title: 'Getting Here',
      description: 'Directions and transportation options',
      href: '/plan/getting-here',
      icon: MapPin,
      color: 'text-blue-600',
    },
    {
      title: 'Visitor Information',
      description: 'Essential information for visitors',
      href: '/plan/visitor-information',
      icon: Info,
      color: 'text-green-600',
    },
    {
      title: 'Maps & Guides',
      description: 'Downloadable resources and maps',
      href: '/plan/maps-guides',
      icon: FileText,
      color: 'text-purple-600',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Plan Your Visit
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for your trip to Auburn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <Link key={resource.href} href={resource.href} className="group">
                <Card className="h-full text-center p-8 hover:bg-blue-50 transition-colors">
                  <Icon className={`w-12 h-12 ${resource.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600">{resource.description}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}


