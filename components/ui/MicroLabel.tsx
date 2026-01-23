/**
 * MicroLabel - Reusable micro-label component
 * 
 * Used for subtle metadata labels like "Updated daily", "Live", "Right now", etc.
 * Matches design system tokens and existing aesthetic.
 */

import { cn } from '@/lib/utils'
import { typography, colors } from '@/lib/designTokens'

interface MicroLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  tone?: 'neutral' | 'info' | 'success' | 'warning'
  size?: 'xs' | 'sm'
}

export function MicroLabel({ 
  children, 
  tone = 'neutral', 
  size = 'xs',
  className,
  style,
  ...props
}: MicroLabelProps) {
  const toneStyles = {
    neutral: {
      color: 'text-charcoal-500',
      opacity: 0.7,
    },
    info: {
      color: 'text-white/70',
      opacity: 0.7,
    },
    success: {
      color: 'text-forest-600',
      opacity: 0.8,
    },
    warning: {
      color: 'text-gold-600',
      opacity: 0.8,
    },
  }

  const sizeStyles = {
    xs: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
    },
    sm: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
    },
  }

  const currentTone = toneStyles[tone]
  const currentSize = sizeStyles[size]

  return (
    <span
      {...props}
      className={cn(
        currentTone.color,
        'font-medium',
        className
      )}
      style={{
        fontSize: currentSize.fontSize,
        fontWeight: currentSize.fontWeight,
        opacity: currentTone.opacity,
        ...style,
      }}
    >
      {children}
    </span>
  )
}
