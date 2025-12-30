'use client'

import { useState, FormEvent } from 'react'

export function WeddingForm() {
  const [name, setName] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [vision, setVision] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/weddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          partnerName,
          email,
          phone,
          weddingDate,
          guestCount,
          vision,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setName('')
        setPartnerName('')
        setEmail('')
        setPhone('')
        setWeddingDate('')
        setGuestCount('')
        setVision('')
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
            required
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-2">
            Partner's Name
          </label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
            required
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-2">
            Wedding Date (if set)
          </label>
          <input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-2">
            Estimated Guest Count
          </label>
          <input
            type="number"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
            min="1"
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-2">
          Tell us about your wedding vision
        </label>
        <textarea
          rows={4}
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
          placeholder="Venue preferences, style, special requests..."
          disabled={status === 'loading' || status === 'success'}
        ></textarea>
      </div>

      {status === 'error' && errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Thank you for your inquiry! We'll be in touch soon with personalized recommendations for your special day.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : 'Request Wedding Information'}
      </button>
    </form>
  )
}
