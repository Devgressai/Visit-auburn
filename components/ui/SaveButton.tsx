'use client'

import { Heart } from 'lucide-react'
import { useSavedItems, type SavedItem } from '@/lib/useSavedItems'

interface SaveButtonProps {
  item: Omit<SavedItem, 'savedAt'>
  size?: 'sm' | 'md'
  className?: string
}

export function SaveButton({ item, size = 'md', className = '' }: SaveButtonProps) {
  const { isSaved, toggleSave } = useSavedItems()
  const saved = isSaved(item.id)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleSave(item)
      }}
      className={`
        ${sizeClasses[size]}
        rounded-full
        backdrop-blur-sm
        transition-all
        duration-200
        flex
        items-center
        justify-center
        ${saved 
          ? 'bg-gold-500 text-white hover:bg-gold-600' 
          : 'bg-white/90 text-charcoal-600 hover:bg-white hover:text-gold-500'
        }
        shadow-md
        hover:scale-110
        active:scale-95
        ${className}
      `}
      aria-label={saved ? 'Remove from saved' : 'Save for later'}
      style={{ minWidth: '40px', minHeight: '40px' }}
    >
      <Heart 
        className={`${iconSizes[size]} transition-all ${saved ? 'fill-current' : ''}`} 
      />
    </button>
  )
}

