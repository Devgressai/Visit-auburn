'use client'

import { useState, FormEvent } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setPhone('')
        setSubject('')
        setMessage('')
        setTimeout(() => setStatus('idle'), 8000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Contact Information */}
      <div className="lg:col-span-1 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Get in Touch</h2>
          <p className="text-charcoal-600 leading-relaxed mb-8">
            Have questions about visiting Auburn? We're here to help make your Gold Country adventure unforgettable.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-1">Visit Us</h3>
              <p className="text-charcoal-600 text-sm leading-relaxed">
                Auburn Area Chamber of Commerce<br />
                601 Lincoln Way<br />
                Auburn, CA 95603
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-1">Call Us</h3>
              <a 
                href="tel:+15308854616" 
                className="text-charcoal-600 text-sm hover:text-gold-600 transition-colors"
              >
                (530) 885-4616
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-1">Email Us</h3>
              <a 
                href="mailto:info@auburnchamber.net" 
                className="text-charcoal-600 text-sm hover:text-gold-600 transition-colors"
              >
                info@auburnchamber.net
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-charcoal-200">
          <h3 className="font-semibold text-charcoal-900 mb-3">Office Hours</h3>
          <div className="space-y-2 text-sm text-charcoal-600">
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday - Sunday: Closed</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-charcoal-100">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Send Us a Message</h2>
          
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 mb-1">Message Sent!</h4>
                <p className="text-sm text-green-700">
                  Thank you for contacting us. We'll get back to you within 1-2 business days.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Error</h4>
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-charcoal-900 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-charcoal-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-charcoal-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-charcoal-900 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a topic...</option>
                  <option value="general">General Inquiry</option>
                  <option value="accommodations">Accommodations</option>
                  <option value="activities">Activities & Events</option>
                  <option value="dining">Dining</option>
                  <option value="meetings">Meetings & Groups</option>
                  <option value="weddings">Weddings</option>
                  <option value="media">Media Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-charcoal-900 mb-2">
                Your Message *
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
