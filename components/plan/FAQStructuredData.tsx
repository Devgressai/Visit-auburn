'use client'

import { useEffect } from 'react'
import { faqAuburnData } from '@/lib/content/faq-auburn'
import { useFAQSearch } from './FAQSearchContext'

export function FAQStructuredData() {
  const { searchQuery } = useFAQSearch()
  useEffect(() => {
    // Get visible FAQs based on search query
    const getVisibleFAQs = () => {
      if (!searchQuery.trim()) {
        return faqAuburnData.flatMap(cat => 
          cat.items.map(item => ({ question: item.question, answer: item.answer }))
        )
      }
      
      const query = searchQuery.toLowerCase()
      return faqAuburnData.flatMap(cat => 
        cat.items
          .filter(item => 
            item.question.toLowerCase().includes(query) || 
            item.answer.toLowerCase().includes(query)
          )
          .map(item => ({ question: item.question, answer: item.answer }))
      )
    }

    const visibleFAQs = getVisibleFAQs()

    // Create FAQPage JSON-LD schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: visibleFAQs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }

    // Remove existing script if present
    const existingScript = document.getElementById('faq-structured-data')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new script
    const script = document.createElement('script')
    script.id = 'faq-structured-data'
    script.type = 'application/ld+json'
    script.text = JSON.stringify(faqSchema)
    document.head.appendChild(script)

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById('faq-structured-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [searchQuery])

  return null
}

