'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface FAQSearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const FAQSearchContext = createContext<FAQSearchContextType | undefined>(undefined)

export function FAQSearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <FAQSearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </FAQSearchContext.Provider>
  )
}

export function useFAQSearch() {
  const context = useContext(FAQSearchContext)
  if (context === undefined) {
    throw new Error('useFAQSearch must be used within FAQSearchProvider')
  }
  return context
}

