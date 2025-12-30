import { notFound } from 'next/navigation'
import { editorials } from '@/lib/data'
import { buildMetadata, breadcrumbJsonLd, articleJsonLd, SITE_URL, truncateDescription } from '@/lib/seo'
import { getImageUrl } from '@/lib/images'
import { PortableText } from '@/components/portable-text/PortableText'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag, Share2, Bookmark } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

function getEditorial(slug: string) {
  return editorials.find(e => e.slug.current === slug) || null
}

function getRelatedEditorials(currentId: string) {
  return editorials.filter(e => e._id !== currentId).slice(0, 3)
}

export async function generateStaticParams() {
  return editorials.map(e => ({ slug: e.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const editorial = getEditorial(slug)

  if (!editorial) {
    return {}
  }

  const canonical = `${SITE_URL}/discover/${slug}`
  const image = editorial.featuredImage
    ? getImageUrl(editorial.featuredImage)
    : undefined

  const title = editorial.title || `Discover - ${slug}`
  const description = truncateDescription(
    editorial.excerpt || `Read about ${editorial.title} in Auburn, California.`
  )

  return buildMetadata({
    title,
    description,
    canonical,
    ogImage: image,
    type: 'article',
    publishedTime: editorial.publishedAt,
  })
}

export default async function DiscoverPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const editorial = getEditorial(slug)

  if (!editorial) {
    notFound()
  }

  const canonical = `${SITE_URL}/discover/${slug}`
  const relatedEditorials = getRelatedEditorials(editorial._id)
  const imageUrl = editorial.featuredImage ? getImageUrl(editorial.featuredImage) : null

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Discover', url: '/discover' },
    { name: editorial.title, url: `/discover/${slug}` },
  ])

  const articleSchema = articleJsonLd({
    headline: editorial.title,
    description: truncateDescription(editorial.excerpt || editorial.title),
    image: imageUrl || undefined,
    datePublished: editorial.publishedAt,
    author: editorial.author
      ? {
          name: editorial.author.name,
          image: editorial.author.image ? getImageUrl(editorial.author.image) : undefined,
        }
      : undefined,
    url: canonical,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen bg-white">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={editorial.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-lake-400 to-lake-500" />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          {/* Back Button */}
          <Link
            href="/discover"
            className="absolute top-24 left-4 md:left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="hidden md:inline font-medium">Back to Discover</span>
          </Link>

          {/* Category Badge */}
          {editorial.category && (
            <div className="absolute top-24 right-4 md:right-8 z-20">
              <span className="bg-gold-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                {editorial.category}
              </span>
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12">
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {editorial.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                {editorial.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={editorial.publishedAt}>
                      {new Date(editorial.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                )}
                {editorial.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{editorial.author.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Excerpt */}
            {editorial.excerpt && (
              <p className="text-xl md:text-2xl text-charcoal-700 mb-8 leading-relaxed font-display">
                {editorial.excerpt}
              </p>
            )}

            {/* Share buttons */}
            <div className="flex items-center gap-3 mb-10 pb-10 border-b border-charcoal-200">
              <span className="text-sm text-charcoal-500">Share this article:</span>
              <button className="w-10 h-10 rounded-full border border-charcoal-200 flex items-center justify-center text-charcoal-600 hover:border-gold-400 hover:text-gold-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-charcoal-200 flex items-center justify-center text-charcoal-600 hover:border-gold-400 hover:text-gold-600 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            {/* Article Content */}
            {editorial.content && (
              <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-headings:font-display prose-p:text-charcoal-700 prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl mb-12">
                <PortableText content={editorial.content} />
              </div>
            )}
          </div>

          {/* Related Articles */}
          {relatedEditorials.length > 0 && (
            <section className="max-w-6xl mx-auto mt-16 pt-12 border-t border-charcoal-200">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-8">More to Discover</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedEditorials.map((related) => {
                  const relatedImageUrl = related.featuredImage ? getImageUrl(related.featuredImage) : null
                  return (
                    <Link
                      key={related._id}
                      href={`/discover/${related.slug.current}`}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-card card-hover">
                        <div className="relative h-48 overflow-hidden">
                          {relatedImageUrl ? (
                            <Image
                              src={relatedImageUrl}
                              alt={related.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-full bg-gradient-to-br from-lake-100 to-lake-200" />
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-charcoal-900 group-hover:text-lake-600 transition-colors mb-2">
                            {related.title}
                          </h3>
                          {related.excerpt && (
                            <p className="text-sm text-charcoal-500 line-clamp-2">{related.excerpt}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}
