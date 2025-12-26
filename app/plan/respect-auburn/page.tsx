import { buildMetadata, SITE_URL } from '@/lib/seo'
import { RespectAuburnSection } from '@/components/homepage/RespectAuburnSection'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPlaceholderImage } from '@/lib/images'

export const metadata: Metadata = buildMetadata({
  title: 'Respect Auburn - Responsible Tourism Guidelines',
  description: 'Learn how to be a responsible visitor to Auburn, California. Follow our principles to help preserve Auburn\'s history, nature, and community.',
  canonical: `${SITE_URL}/plan/respect-auburn`,
})

export default function RespectAuburnPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={getPlaceholderImage('things-to-do')}
          alt="Auburn Nature"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/50 to-green-900/70" />
        
        <div className="relative z-10 container text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Respect Auburn
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Five principles for responsible tourism in Gold Country
          </p>
        </div>
      </div>

      {/* Main Content */}
      <RespectAuburnSection />

      {/* Additional Info Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Responsible Tourism Matters
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Auburn is more than just a destination—it's a living community with 
              175 years of history, pristine natural areas, and residents who call this 
              place home. As visitor numbers grow, so does our responsibility to protect 
              what makes Auburn special.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              By following these simple principles, you help ensure that Auburn's 
              Gold Rush heritage sites remain intact, our trails and natural areas 
              stay beautiful, and our local businesses continue to thrive.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Every action counts. Whether it's picking up a piece of litter on the trail, 
              choosing a local restaurant over a chain, or simply being courteous to residents, 
              you're making a positive impact on Auburn's future.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
              <h3 className="text-xl font-bold text-green-900 mb-2">
                Thank You
              </h3>
              <p className="text-green-800 mb-0">
                We appreciate your commitment to being a responsible visitor. 
                Together, we can keep Auburn beautiful, authentic, and welcoming 
                for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

