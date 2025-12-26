import { PortableText } from '@/components/portable-text/PortableText'

interface SeasonalSpotlightProps {
  content?: any
}

export function SeasonalSpotlight({ content }: SeasonalSpotlightProps) {
  if (!content) return null

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-y border-gray-200">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg md:prose-xl max-w-none text-center">
            <PortableText content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

