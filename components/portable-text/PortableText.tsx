import { PortableText as SanityPortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

interface PortableTextProps {
  content: any
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Image'}
            width={1200}
            height={600}
            className="rounded-lg"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      if (!value?.href) return <>{children}</>
      const target = value.href.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="text-blue-600 hover:text-blue-700 underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-4 mb-2">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),
  },
} as any

export function PortableText({ content }: PortableTextProps) {
  if (!content) return null
  return <SanityPortableText value={content} components={components} />
}
