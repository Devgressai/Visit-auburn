'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Youtube, Mail, ArrowRight, Check, MapPin } from 'lucide-react'
import { getPlaceholderImage } from '@/lib/images'

const footerLinks = {
  explore: [
    { name: 'Stay', href: '/accommodations' },
    { name: 'Things To Do', href: '/activities' },
    { name: 'Food & Drink', href: '/dining' },
    { name: 'Events', href: '/events' },
    { name: 'Plan My Visit', href: '/plan/visitor-information' },
  ],
  connect: [
    { name: 'Weddings', href: '/plan/weddings' },
    { name: 'Meetings', href: '/plan/meetings' },
    { name: 'Special Offers', href: '/special-offers' },
    { name: 'Maps & Guides', href: '/plan/maps-guides' },
    { name: 'About Auburn', href: '/discover' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/visitauburn' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/visitauburn' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/visitauburn' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/visitauburn' },
]

const partnerLogos = [
  { name: 'Visit California', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/200px-Flag_of_California.svg.png' },
  { name: 'Placer County', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=50&fit=crop&q=80' },
]

export function FooterNew() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <footer className="relative">
      {/* Main Footer Section */}
      <div className="relative bg-charcoal-800 overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={getPlaceholderImage('hero')}
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-800 via-charcoal-800/95 to-charcoal-900" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Left Column - CTA & Branding */}
            <div className="lg:col-span-4">
              {/* Plan Your Trip CTA */}
              <p className="text-gold-400 uppercase tracking-widest text-sm font-medium mb-2">
                Start Planning
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                Plan Your Trip Today!
              </h2>
              <p className="text-charcoal-300 mb-6 leading-relaxed">
                Make planning easy with this guide to all the must-see vistas, 
                must-eat dishes and must-experience attractions.
              </p>
              <Link 
                href="/plan/visitor-information"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold transition-colors group"
              >
                Plan Your Trip
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Logo */}
              <div className="mt-10 mb-8">
                <Link href="/" className="block">
                  <div className="text-white">
                    <span className="block text-sm tracking-widest text-gold-400 mb-1">VISIT</span>
                    <span className="block text-5xl md:text-6xl font-display font-bold tracking-tight">
                      Auburn
                    </span>
                    <span className="block text-xs tracking-[0.3em] text-charcoal-400 mt-1">CALIFORNIA • GOLD COUNTRY</span>
                  </div>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-charcoal-700 hover:bg-gold-500 flex items-center justify-center transition-all duration-300 text-charcoal-300 hover:text-white"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Center Column - Phone Mockup */}
            <div className="lg:col-span-3 flex justify-center items-start">
              <div className="relative">
                {/* Phone Frame */}
                <div className="relative w-48 md:w-56">
                  <div className="relative bg-charcoal-900 rounded-[2.5rem] p-2 shadow-2xl">
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-charcoal-900 rounded-b-2xl z-10" />
                    {/* Screen */}
                    <div className="relative rounded-[2rem] overflow-hidden aspect-[9/19]">
                      <Image
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                        alt="Visit Auburn Mobile"
                        fill
                        className="object-cover"
                      />
                      {/* App overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white/80 text-xs">Explore</span>
                        <p className="text-white font-bold text-sm">Auburn, CA</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl" />
              </div>
            </div>

            {/* Right Column - Newsletter & Links */}
            <div className="lg:col-span-5">
              {/* Newsletter */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4 font-display">
                  Sign Up For Our Newsletter
                </h3>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      required
                      disabled={status === 'loading' || status === 'success'}
                      className="w-full px-5 py-4 bg-charcoal-700/50 border border-charcoal-600 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-6 py-4 bg-white text-charcoal-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-70"
                  >
                    {status === 'success' ? <Check className="w-5 h-5" /> : 'Next'}
                  </button>
                </form>
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  {footerLinks.explore.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block py-2 text-charcoal-300 hover:text-gold-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div>
                  {footerLinks.connect.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block py-2 text-charcoal-300 hover:text-gold-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-charcoal-900 py-8 border-t border-charcoal-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-charcoal-500 text-sm uppercase tracking-wider">Our Partners:</span>
            <div className="flex items-center gap-2 text-charcoal-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Placer County Tourism</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal-400">
              <span className="text-sm font-medium">Visit California</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal-400">
              <span className="text-sm font-medium">Gold Country Visitors Association</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal-400">
              <span className="text-sm font-medium">Auburn Chamber of Commerce</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-charcoal-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-charcoal-500 text-sm">
              © {new Date().getFullYear()} Auburn Area Visitors Bureau. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-charcoal-500 hover:text-gold-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-charcoal-500 hover:text-gold-400 transition-colors">
                Legal Disclaimer
              </Link>
              <Link href="/accessibility" className="text-charcoal-500 hover:text-gold-400 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Plan Trip Button */}
      <Link
        href="/plan/visitor-information"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gold-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-gold-600 hover:shadow-xl transition-all duration-300 group"
      >
        <MapPin className="w-5 h-5" />
        <span className="font-semibold">Plan Your Trip</span>
      </Link>
    </footer>
  )
}
