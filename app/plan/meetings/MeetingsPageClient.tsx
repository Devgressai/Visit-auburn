'use client'

import { useState, useEffect } from 'react'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { MapPin, Car, Building2, Mountain, Coffee, ExternalLink, ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getAuburnImagePath } from '@/data/auburnImages'
import { meetingVenues } from '@/data/meetings-venues'
import { trackCTAClick, trackEvent, trackPageView } from '@/lib/analytics'

// Why Auburn - Real Auburn-specific reasons
const whyAuburn = [
  {
    icon: MapPin,
    title: 'Strategic Gold Country Location',
    description: '30 minutes from Sacramento, 2.5 hours from San Francisco Bay Area, 45 minutes from Lake Tahoe. Perfect midpoint for regional meetings.',
  },
  {
    icon: Building2,
    title: 'Historic Old Town + Modern Facilities',
    description: 'Unique blend of Gold Rush heritage and contemporary meeting spaces. Walkable downtown with restaurants, shops, and character.',
  },
  {
    icon: Mountain,
    title: 'Outdoor Recreation & Team Building',
    description: 'World-class hiking trails, American River Canyon, Lake Clementine, and Hidden Falls. Perfect for team-building activities and post-meeting adventures.',
  },
  {
    icon: Coffee,
    title: 'Wine, Beer & Farm-to-Table Dining',
    description: 'Sierra Foothills wineries, craft breweries, and farm-to-table restaurants. Excellent group dining options throughout Auburn.',
  },
  {
    icon: Car,
    title: 'Easy Accessibility & Parking',
    description: 'Direct I-80 access, 35 miles from Sacramento International Airport (SMF), ample parking, and walkable downtown core.',
  },
]

// Team building activities - Real Auburn activities
const teamBuildingActivities = [
  {
    title: 'Hiking & Trail Adventures',
    description: 'Explore Auburn State Recreation Area, Lake Clementine Trail, and Hidden Falls. Guided group hikes available.',
    activities: ['Lake Clementine Trail (8 miles)', 'Hidden Falls Regional Park', 'Overlook Park scenic views', 'Western States Trail'],
    imageId: 'outdoor-lake-clementine',
  },
  {
    title: 'Gold Rush History Tours',
    description: 'Interactive gold panning, historic walking tours of Old Town, and visits to Gold Country Museum and Bernhard Museum.',
    activities: ['Gold panning experiences', 'Old Town walking tours', 'Museum visits', 'Historic site exploration'],
    imageId: 'historic-gold-country-museum',
  },
  {
    title: 'Brewery & Winery Experiences',
    description: 'Team tastings at Auburn Alehouse, Knee Deep Brewing, and local Sierra Foothills wineries. Group packages available.',
    activities: ['Auburn Alehouse tours', 'Wine tasting rooms', 'Brewery visits', 'Group dining experiences'],
    imageId: 'dining-auburn-alehouse',
  },
  {
    title: 'River & Outdoor Activities',
    description: 'American River swimming holes, rafting (seasonal), mountain biking, and scenic picnics at canyon overlooks.',
    activities: ['River swimming', 'Scenic picnics', 'Mountain biking trails', 'Canyon exploration'],
    imageId: 'outdoor-river-swimming',
  },
]

export function MeetingsPageClient() {
  const [isStickyVisible, setIsStickyVisible] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Track page view
    trackPageView('/plan/meetings')

    // Handle sticky CTA visibility
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > 400)
    }
    
    // Throttle scroll events for performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  const scrollToForm = () => {
    trackCTAClick('meetings_page', '#request-proposal', 'Request Proposal')
    document.getElementById('request-proposal')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToVenues = () => {
    trackCTAClick('meetings_page', '#featured-venues', 'Explore Venues')
    document.getElementById('featured-venues')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    const form = e.currentTarget
    const formDataObj = new FormData(form)
    
    const formData = {
      organizationName: formDataObj.get('organizationName') as string || '',
      contactName: formDataObj.get('contactName') as string || '',
      email: formDataObj.get('email') as string || '',
      phone: formDataObj.get('phone') as string || '',
      eventType: formDataObj.get('eventType') as string || '',
      preferredDate: formDataObj.get('preferredDate') as string || '',
      numberOfAttendees: formDataObj.get('numberOfAttendees') as string || '',
      eventDetails: formDataObj.get('eventDetails') as string || '',
    }

    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setFormSubmitted(true)
        form.reset()
        // Track successful form submission
        trackEvent('meeting_rfp_submitted', {
          event_type: formData.eventType,
          number_of_attendees: formData.numberOfAttendees,
        })
        // Scroll to success message
        setTimeout(() => {
          document.getElementById('request-proposal')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
        // Reset form after 10 seconds
        setTimeout(() => {
          setFormSubmitted(false)
        }, 10000)
      } else {
        setSubmitError(data.error || 'Failed to submit. Please try again.')
        // Scroll to error message
        setTimeout(() => {
          document.getElementById('request-proposal')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError('Network error. Please try again or contact us directly.')
      // Scroll to error message
      setTimeout(() => {
        document.getElementById('request-proposal')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } finally {
      setIsSubmitting(false)
    }
  }

  const breadcrumbs = generateBreadcrumbs('/plan/meetings')

  // Hero image - use Old Town Auburn or downtown
  const heroImage = getAuburnImagePath('downtown-lincoln-way')
  const fallbackHeroImage = '/images/hero-main.webp'

  const handleImageError = (imageId: string, fallback: string) => {
    if (!imageErrors.has(imageId)) {
      setImageErrors(prev => new Set(prev).add(imageId))
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.warn(`Image failed to load: ${imageId}, using fallback: ${fallback}`)
      }
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Sticky CTA Bar */}
      {isStickyVisible && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-charcoal-800 text-white shadow-lg border-b-2 border-gold-500" role="banner" aria-label="Request proposal">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="hidden md:block">
                <p className="text-sm text-white/80">Ready to plan your Auburn meeting?</p>
              </div>
              <button
                onClick={scrollToForm}
                className="btn-primary w-full md:w-auto"
                aria-label="Scroll to request proposal form"
              >
                Request Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - White background with image */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden" aria-label="Hero section">
        <Image
          src={imageErrors.has('hero') ? fallbackHeroImage : heroImage}
          alt="Historic Old Town Auburn, California - Gold Country meeting destination"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          onError={() => handleImageError('hero', fallbackHeroImage)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-800/60 to-charcoal-900/70" />
        
        <div className="relative z-10 container text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
            Meetings & Events in Auburn, California (95603)
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Gold Country hospitality for retreats, reunions, and corporate offsites
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="btn-primary"
              aria-label="Scroll to request proposal form"
            >
              Request Proposal
            </button>
            <button
              onClick={scrollToVenues}
              className="btn-outline-white"
              aria-label="Scroll to featured venues section"
            >
              Explore Venues
            </button>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Why Auburn Section - White background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6 font-display">
              Why Choose Auburn for Your Event?
            </h2>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
              Combine productivity with inspiration in a destination that offers modern facilities, 
              natural beauty, and unique team-building opportunities in California's Gold Country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAuburn.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div
                  key={index}
                  className="bg-cream-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-charcoal-100"
                >
                  <div className="w-12 h-12 bg-lake-500 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-900 mb-2 font-display">
                    {reason.title}
                  </h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Venues Section - Blue accent band */}
      <section id="featured-venues" className="py-16 md:py-24 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Featured Venues
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              From historic theaters to modern conference centers, discover versatile spaces for your Auburn event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meetingVenues.map((venue, index) => {
              const venueImage = getAuburnImagePath(venue.imageId)
              const fallbackVenueImage = '/images/discover.jpg'
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.googleMapsQuery)}`
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
                >
                  <div className="relative h-48">
                    <Image
                      src={imageErrors.has(venue.imageId) ? fallbackVenueImage : venueImage}
                      alt={`${venue.name} in ${venue.neighborhood}, Auburn, California`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onError={() => handleImageError(venue.imageId, fallbackVenueImage)}
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-lake-600 uppercase tracking-wide">
                        {venue.neighborhood}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2 font-display">
                      {venue.name}
                    </h3>
                    <p className="text-charcoal-600 text-sm mb-4 leading-relaxed">
                      {venue.description}
                    </p>
                    {venue.capacity && (
                      <div className="mb-4 pb-4 border-b border-charcoal-100">
                        <p className="text-xs text-charcoal-500 mb-2">Capacity:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {venue.capacity.theater && (
                            <div>
                              <span className="text-charcoal-500">Theater:</span>
                              <span className="font-semibold text-charcoal-900 ml-1">{venue.capacity.theater}</span>
                            </div>
                          )}
                          {venue.capacity.banquet && (
                            <div>
                              <span className="text-charcoal-500">Banquet:</span>
                              <span className="font-semibold text-charcoal-900 ml-1">{venue.capacity.banquet}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-lake-600 hover:text-lake-700 transition-colors"
                      onClick={() => trackCTAClick('meetings_page', 'google_maps', venue.name)}
                      aria-label={`View ${venue.name} on Google Maps`}
                    >
                      View on Map
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Building Section - White background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6 font-display">
              Team Building in Auburn
            </h2>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto mb-8">
              Auburn's Gold Country setting offers memorable activities that strengthen teams and create lasting connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamBuildingActivities.map((activity, index) => {
              const activityImage = getAuburnImagePath(activity.imageId)
              const fallbackActivityImage = '/images/things-to-do.jpg'
              
              return (
                <div
                  key={index}
                  className="bg-cream-50 rounded-2xl overflow-hidden shadow-lg border border-charcoal-100"
                >
                  <div className="relative h-64">
                    <Image
                      src={imageErrors.has(activity.imageId) ? fallbackActivityImage : activityImage}
                      alt={`${activity.title} in Auburn, California`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onError={() => handleImageError(activity.imageId, fallbackActivityImage)}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-charcoal-900 mb-3 font-display">
                      {activity.title}
                    </h3>
                    <p className="text-charcoal-600 mb-4 leading-relaxed">
                      {activity.description}
                    </p>
                    <ul className="space-y-2">
                      {activity.activities.map((item, actIndex) => (
                        <li key={actIndex} className="flex items-center gap-3 text-charcoal-700">
                          <Check className="w-5 h-5 text-pine-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lodging & Dining Support - Cream neutral background */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6 font-display">
              Lodging & Dining Support
            </h2>
            <p className="text-lg text-charcoal-600 leading-relaxed mb-8">
              Auburn offers a range of accommodations from historic hotels to modern lodges, plus exceptional dining 
              options including farm-to-table restaurants, craft breweries, and Sierra Foothills wineries. Perfect for 
              hosting out-of-town attendees and group dining experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/accommodations"
                className="btn-primary inline-flex items-center gap-2"
              >
                Explore Lodging
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/dining"
                className="btn-outline-pine inline-flex items-center gap-2"
              >
                Discover Dining
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here Section - White background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6 font-display">
              Getting Here
            </h2>
          </div>
          <div className="bg-cream-50 rounded-2xl p-8 md:p-12 border border-charcoal-100">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 font-display flex items-center gap-2">
                  <Car className="w-6 h-6 text-lake-600" />
                  By Car
                </h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Auburn is easily accessible via Interstate 80. From Sacramento, take I-80 East approximately 35 miles 
                  (approx. 30-40 minutes). From the San Francisco Bay Area, take I-80 East approximately 130 miles 
                  (approx. 2-2.5 hours). From Lake Tahoe, take I-80 West approximately 45 miles (approx. 45-60 minutes).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 font-display flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-lake-600" />
                  By Air
                </h3>
                <p className="text-charcoal-600 leading-relaxed">
                  <strong>Sacramento International Airport (SMF):</strong> 35 miles from Auburn (approx. 30-40 minutes by car). 
                  Major airlines serve SMF with connections to most major cities. Rental cars and shuttle services available.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 font-display flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-lake-600" />
                  Parking
                </h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Most venues offer on-site parking. Downtown Auburn has public parking lots and street parking. 
                  Large events may coordinate with venues for additional parking arrangements.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="/plan/getting-here"
                  className="inline-flex items-center gap-2 text-lake-600 hover:text-lake-700 font-semibold"
                >
                  More Travel Information
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Proposal Form - White background */}
      <section id="request-proposal" className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6 font-display">
              Request a Proposal
            </h2>
            <p className="text-xl text-charcoal-600 leading-relaxed">
              Tell us about your event and we'll help you create an unforgettable experience in Auburn, California
            </p>
          </div>

          <div className="bg-cream-50 rounded-2xl shadow-xl p-8 md:p-12 border border-charcoal-100">
            {formSubmitted ? (
              <div className="text-center py-12" role="status" aria-live="polite">
                <div className="w-16 h-16 bg-pine-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal-900 mb-2 font-display">Thank You!</h3>
                <p className="text-charcoal-600 mb-4">
                  We've received your request and will respond within 2-3 business days.
                </p>
                <p className="text-sm text-charcoal-500">
                  A confirmation email has been sent to the address you provided.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6" aria-label="Meeting proposal request form" noValidate>
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert" aria-live="assertive">
                    <p className="text-sm font-semibold text-red-800 mb-1">Error submitting form</p>
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                )}
                <fieldset disabled={isSubmitting} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="organizationName" className="block text-sm font-semibold text-charcoal-900 mb-2">
                        Organization Name *
                      </label>
                      <input
                        id="organizationName"
                        name="organizationName"
                        type="text"
                        required
                        aria-required="true"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-lake-500 focus:border-transparent bg-white text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-semibold text-charcoal-900 mb-2">
                        Contact Name *
                      </label>
                      <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        required
                        aria-required="true"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-lake-500 focus:border-transparent bg-white text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-charcoal-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        autoComplete="email"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-lake-500 focus:border-transparent bg-white text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-charcoal-900 mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        aria-required="true"
                        autoComplete="tel"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-lake-500 focus:border-transparent bg-white text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="eventType" className="block text-sm font-semibold text-charcoal-900 mb-2">
                        Event Type *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        aria-required="true"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-lake-500 focus:border-transparent bg-white text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select...</option>
                        <option value="conference">Conference</option>
                        <option value="corporate-meeting">Corporate Meeting</option>
                        <option value="team-retreat">Team Retreat</option>
                        <option value="training">Training</option>
                        <option value="trade-show">Trade Show</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-semibold text-charcoal-900 mb-2">
                        Preferred Date(s)
                      </label>
                      <input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-lake-500 focus:border-transparent bg-white text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="numberOfAttendees" className="block text-sm font-semibold text-charcoal-900 mb-2">
                        Number of Attendees *
                      </label>
                      <input
                        id="numberOfAttendees"
                        name="numberOfAttendees"
                        type="number"
                        min="1"
                        required
                        aria-required="true"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-lake-500 focus:border-transparent bg-white text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="eventDetails" className="block text-sm font-semibold text-charcoal-900 mb-2">
                      Event Details & Requirements *
                    </label>
                    <textarea
                      id="eventDetails"
                      name="eventDetails"
                      rows={5}
                      required
                      aria-required="true"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-lake-500 focus:border-transparent bg-white text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Please describe your event needs, including venue preferences, AV requirements, catering, accommodations, and any special requests..."
                    ></textarea>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-lake-500 to-lake-600 text-white font-bold rounded-lg hover:from-lake-600 hover:to-lake-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  aria-label={isSubmitting ? 'Submitting request' : 'Submit meeting proposal request'}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>

                <p className="text-sm text-charcoal-500 text-center">
                  We'll respond within 2-3 business days with a customized proposal for your Auburn event.
                </p>
              </form>
            )}

            {/* Contact Info - Removed fake contact info */}
            <div className="mt-8 pt-8 border-t border-charcoal-200 text-center">
              <p className="text-sm text-charcoal-600 mb-2">
                Need immediate assistance?
              </p>
              <p className="text-charcoal-500 text-sm">
                Contact the Auburn Area Chamber of Commerce for meeting planning support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-16 bg-cream-50" aria-label="Related pages">
        <div className="container mx-auto px-4">
          <RelatedPages currentPath="/plan/meetings" />
        </div>
      </section>
    </main>
  )
}

