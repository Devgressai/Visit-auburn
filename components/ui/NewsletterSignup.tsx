'use client'

import { useState, FormEvent } from 'react'
import { Mail, Check, AlertCircle, Sparkles } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'section' | 'footer'
  className?: string
}

export function NewsletterSignup({ variant = 'section', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setEmail('')
        setName('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 border border-charcoal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
          required
          disabled={status === 'loading' || status === 'success'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-2 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </button>
      </form>
    )
  }

  if (variant === 'footer') {
    return (
      <div className={className}>
        <h4 className="text-white font-semibold mb-3">Stay Connected</h4>
        <p className="text-sm text-charcoal-300 mb-4">
          Get the latest Auburn news and events
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full px-4 py-2 bg-charcoal-800 border border-charcoal-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder-charcoal-400"
            required
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-2 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'success' ? (
              <>
                <Check className="w-4 h-4" />
                Subscribed!
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </>
            )}
          </button>
          {status === 'error' && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    )
  }

  // Section variant (hero/prominent) - Updated with Gold Country theme
  return (
    <section className={`relative py-16 md:py-20 overflow-hidden ${className}`}>
      {/* Background with forest green gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-600 via-forest-700 to-charcoal-900" />
      
      {/* Decorative gold accent elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold-600/10 rounded-full blur-3xl" />
      </div>
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center text-white mb-8">
          {/* Gold icon circle */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500 rounded-full mb-6 shadow-glow">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Stay Connected with Auburn
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Get the latest news on events, special offers, and insider tips delivered straight to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              disabled={status === 'loading' || status === 'success'}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              required
              disabled={status === 'loading' || status === 'success'}
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full sm:w-auto px-10 py-4 bg-gold-500 text-white font-bold rounded-xl hover:bg-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mx-auto block shadow-lg hover:shadow-glow transform hover:scale-105"
          >
            {status === 'loading' && 'Subscribing...'}
            {status === 'success' && '✓ Thank You!'}
            {status === 'idle' && 'Subscribe to Newsletter'}
            {status === 'error' && 'Try Again'}
          </button>

          {status === 'success' && (
            <p className="mt-4 text-center text-gold-300 flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              You're all set! Check your inbox for confirmation.
            </p>
          )}
          
          {status === 'error' && (
            <p className="mt-4 text-center text-red-300 flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {errorMessage}
            </p>
          )}
        </form>

        <p className="text-center text-white/50 text-sm mt-6">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
