import Link from 'next/link'
import { Button } from '@/components/ui'

export function FinalCTA() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Explore Auburn?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light leading-relaxed">
            Start planning your visit today and discover all that Auburn has to offer
          </p>
          <Button href="/things-to-do" variant="secondary" size="lg" className="font-semibold">
            Start Exploring
          </Button>
        </div>
      </div>
    </section>
  )
}

