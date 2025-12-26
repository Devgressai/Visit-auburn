interface SectionHeadingProps {
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ title, description, className = '', align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight ${align === 'center' ? 'mx-auto' : ''} max-w-4xl`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}

