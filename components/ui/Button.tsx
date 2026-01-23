import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 shadow-sm hover:shadow-md',
    secondary: 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50 focus:ring-gray-900',
    ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:ring-gray-500',
    outline: 'bg-transparent border-2 border-current hover:bg-white/10 focus:ring-white',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''

  const classes = cn(baseStyles, variants[variant], sizes[size], disabledStyles, className)

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}

