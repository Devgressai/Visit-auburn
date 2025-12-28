'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Tag, Calendar, ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface SpecialOffer {
  _id: string
  title: string
  slug: { current: string }
  description: string
  image?: {
    url: string
    alt?: string
  }
  discountAmount: string
  discountType: string
  startDate: string
  endDate: string
  category: string
  promoCode?: string
  bookingLink?: string
  terms?: string
}

interface OfferCardProps {
  offer: SpecialOffer
  index: number
}

function OfferCard({ offer, index }: OfferCardProps) {
  const [copiedCode, setCopiedCode] = useState(false)

  const copyPromoCode = () => {
    if (offer.promoCode) {
      navigator.clipboard.writeText(offer.promoCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  const endDate = new Date(offer.endDate)
  const isExpiringSoon = (endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24) < 7

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
    >
      {/* Image */}
      {offer.image?.url && (
        <div className="relative h-56 overflow-hidden">
          <Image
            src={offer.image.url}
            alt={offer.image.alt || offer.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badge */}
          <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full shadow-lg">
            {offer.discountAmount}
          </div>

          {/* Category Tag */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 capitalize">
            {offer.category}
          </div>

          {/* Expiring Soon Badge */}
          {isExpiringSoon && (
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full">
              Ending Soon!
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {offer.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {offer.description}
        </p>

        {/* Validity */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4" />
          <span>Valid until {endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Promo Code */}
        {offer.promoCode && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xs text-gray-500 mb-1">Promo Code</div>
                <div className="font-mono font-bold text-lg text-gray-900">
                  {offer.promoCode}
                </div>
              </div>
              <button
                onClick={copyPromoCode}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm font-semibold"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        {offer.bookingLink && (
          <Link
            href={offer.bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            View Offer
            <ExternalLink className="w-4 h-4" />
          </Link>
        )}

        {/* Terms */}
        {offer.terms && (
          <details className="mt-4 text-xs text-gray-500">
            <summary className="cursor-pointer hover:text-gray-700 font-semibold">
              Terms & Conditions
            </summary>
            <p className="mt-2 leading-relaxed">{offer.terms}</p>
          </details>
        )}
      </div>
    </motion.div>
  )
}

interface SpecialOffersGridProps {
  offers: SpecialOffer[]
  category?: string
}

export function SpecialOffersGrid({ offers, category }: SpecialOffersGridProps) {
  const filteredOffers = category 
    ? offers.filter(offer => offer.category === category)
    : offers

  if (filteredOffers.length === 0) {
    return (
      <div className="text-center py-16">
        <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Offers Available</h3>
        <p className="text-gray-600">Check back soon for new special offers!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredOffers.map((offer, index) => (
        <OfferCard key={offer._id} offer={offer} index={index} />
      ))}
    </div>
  )
}


