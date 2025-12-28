'use client'

import { useState, useEffect } from 'react'

export interface SavedItem {
  id: string
  type: 'event' | 'accommodation' | 'activity' | 'dining'
  title: string
  slug: string
  savedAt: number
}

const STORAGE_KEY = 'auburn-saved-items'

export function useSavedItems() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load saved items from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setSavedItems(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading saved items:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems))
      } catch (error) {
        console.error('Error saving items:', error)
      }
    }
  }, [savedItems, isLoaded])

  const saveItem = (item: Omit<SavedItem, 'savedAt'>) => {
    setSavedItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) return prev
      return [...prev, { ...item, savedAt: Date.now() }]
    })
  }

  const unsaveItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id))
  }

  const isSaved = (id: string) => {
    return savedItems.some(item => item.id === id)
  }

  const toggleSave = (item: Omit<SavedItem, 'savedAt'>) => {
    if (isSaved(item.id)) {
      unsaveItem(item.id)
    } else {
      saveItem(item)
    }
  }

  const clearAll = () => {
    setSavedItems([])
  }

  return {
    savedItems,
    saveItem,
    unsaveItem,
    isSaved,
    toggleSave,
    clearAll,
    count: savedItems.length,
    isLoaded,
  }
}

