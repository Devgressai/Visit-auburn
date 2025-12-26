'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, DollarSign, Phone, Globe, Calendar, Star, ArrowLeft, Share2, Heart, Tag, Utensils, Wifi, Car, Coffee } from 'lucide-react'
import { PortableText } from '@/components/portable-text/PortableText'
import { getImageUrl } from '@/lib/images'

// Icon mapping for string-based icon names
const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Globe,
  Calendar,
  Star,
  Tag,
  Utensils,
  Wifi,
  Car,
  Coffee,
}

interface DetailInfo {
  icon: string
  label: string
  value: string
}

interface RelatedItem {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: any
}

interface DetailLayoutProps {
  title: string
  excerpt?: string
  description?: any[]
  featuredImage?: any
  category?: string
  rating?: number
  info: DetailInfo[]
  location?: {
    address?: string
    city?: string
    state?: string
  }
  contact?: {
    phone?: string
    website?: string
    email?: string
  }
  relatedItems?: RelatedItem[]
  relatedTitle?: string
  relatedBasePath?: string
  breadcrumbLabel: string
  breadcrumbPath: string
}

export function DetailLayout({
  title,
  excerpt,
  description,
  featuredImage,
  category,
  rating,
  info,
  location,
  contact,
  relatedItems = [],
  relatedTitle = 'You May Also Like',
  relatedBasePath,
  breadcrumbLabel,
  breadcrumbPath,
}: DetailLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imageUrl = featuredImage ? getImageUrl(featuredImage) : null

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <article className="min-h-screen bg-cream-50">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className={`object-cover transition-transform duration-[1.5s] ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-gold-200 to-gold-400" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Back Button */}
        <Link
          href={breadcrumbPath}
          className="absolute top-24 left-4 md:left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="hidden md:inline font-medium">Back to {breadcrumbLabel}</span>
        </Link>

        {/* Category & Rating Badges */}
        <div className="absolute top-24 right-4 md:right-8 z-20 flex items-center gap-3">
          {category && (
            <span className="bg-white/90 backdrop-blur-sm text-charcoal-800 text-sm font-semibold px-4 py-2 rounded-full">
              {category}
            </span>
          )}
          {rating && (
            <span className="bg-gold-500 text-white text-sm font-bold px-3 py-2 rounded-full flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              {rating}
            </span>
          )}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12">
          <div className="container mx-auto">
            <h1 
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {title}
            </h1>

            {location && (
              <p 
                className={`flex items-center gap-2 text-white/80 text-lg transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <MapPin className="w-5 h-5" />
                {[location.address, location.city, location.state].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {excerpt && (
              <p className="text-xl text-charcoal-700 mb-8 leading-relaxed">
                {excerpt}
              </p>
            )}

            {description && description.length > 0 && (
              <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-700 prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline mb-12">
                <PortableText content={description} />
              </div>
            )}

            {/* Info Grid */}
            {info.length > 0 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card mb-12">
                <h2 className="text-xl font-bold text-charcoal-900 mb-6">Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {info.map((item, index) => {
                    const IconComponent = iconMap[item.icon] || Tag
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-gold-600" />
                        </div>
                        <div>
                          <p className="text-sm text-charcoal-500">{item.label}</p>
                          <p className="font-semibold text-charcoal-900">{item.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            {contact && (contact.phone || contact.website) && (
              <div className="bg-white rounded-2xl p-6 shadow-card mb-6 sticky top-24">
                <h3 className="text-lg font-bold text-charcoal-900 mb-4">Contact</h3>

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-3 text-charcoal-700 hover:text-gold-600 transition-colors mb-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span>{contact.phone}</span>
                  </a>
                )}

                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-charcoal-700 hover:text-gold-600 transition-colors mb-6"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span>Visit Website</span>
                  </a>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-charcoal-100">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold-500 text-white font-semibold rounded-xl hover:bg-gold-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-charcoal-200 text-charcoal-600 rounded-xl hover:border-gold-400 hover:text-gold-600 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            {location && (
              <div className="bg-charcoal-100 rounded-2xl h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-charcoal-400 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-500">Map coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && relatedBasePath && (
          <section className="mt-16 pt-12 border-t border-charcoal-200">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-8">{relatedTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((item) => {
                const itemImageUrl = item.featuredImage ? getImageUrl(item.featuredImage) : null
                return (
                  <Link
                    key={item._id}
                    href={`${relatedBasePath}/${item.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-card card-hover">
                      <div className="relative h-48 overflow-hidden">
                        {itemImageUrl ? (
                          <Image
                            src={itemImageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-gold-100 to-gold-200" />
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors mb-2">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-sm text-charcoal-500 line-clamp-2">{item.excerpt}</p>
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
  )
}
