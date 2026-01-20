import Link from 'next/link'
import Image from 'next/image'
import { NewsletterSignup } from '@/components/ui/NewsletterSignup'
import { Facebook, Instagram, Twitter, Mail, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-lg">Visit Auburn</h3>
            <p className="text-sm mb-6 leading-relaxed">
              Your guide to discovering Auburn, California - the heart of Gold Country. 
              Where history meets adventure in the Sierra Nevada foothills.
            </p>
            
            {/* Logo - Centered and Larger */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/visit-auburn-logo.png"
                alt="Visit Auburn Gold Country"
                width={280}
                height={120}
                className="object-contain"
                priority
              />
            </div>
            
            {/* Social Links - Centered */}
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://www.facebook.com/AuburnCAChamber" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Visit us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/visitauburn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/AuburnChamber" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@AuburnChamber" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Watch us on YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/accommodations" className="hover:text-white transition-colors">
                  Where to Stay
                </Link>
              </li>
              <li>
                <Link href="/things-to-do" className="hover:text-white transition-colors">
                  Things to Do
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-white transition-colors">
                  Food & Drink
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/discover" className="hover:text-white transition-colors">
                  Discover
                </Link>
              </li>
            </ul>
          </div>

          {/* Plan Your Visit */}
          <div>
            <h4 className="text-white font-semibold mb-4">Plan Your Visit</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/plan/getting-here" className="hover:text-white transition-colors">
                  Getting Here
                </Link>
              </li>
              <li>
                <Link href="/plan/visitor-information" className="hover:text-white transition-colors">
                  Visitor Information
                </Link>
              </li>
              <li>
                <Link href="/plan/maps-guides" className="hover:text-white transition-colors">
                  Maps & Guides
                </Link>
              </li>
              <li>
                <Link href="/plan/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <NewsletterSignup variant="footer" />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {currentYear} Visit Auburn. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          
          {/* Agency Credits */}
          <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
            <p className="text-xs text-gray-500">
              Designed, Developed & Managed by{' '}
              <a 
                href="https://webvello.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                Webvello.com
              </a>
              {' '}&{' '}
              <a 
                href="https://eseospace.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                eSEOspace.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

