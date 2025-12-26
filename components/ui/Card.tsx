import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  href?: string
  className?: string
  onClick?: () => void
}

export function Card({ children, href, className, onClick }: CardProps) {
  const baseStyles = 'bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300'
  
  const classes = cn(baseStyles, className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={cn(classes, 'text-left w-full')}>
        {children}
      </button>
    )
  }

  return <div className={classes}>{children}</div>
}

