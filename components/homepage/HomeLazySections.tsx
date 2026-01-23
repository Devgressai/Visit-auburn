'use client'

/**
 * HomeLazySections - Client Component for lazy-loading heavy homepage sections
 * 
 * Wraps dynamic imports that require ssr: false (like AuburnDataTeaser with D3/GSAP)
 * Must be a Client Component to use next/dynamic with ssr: false
 */

import dynamic from 'next/dynamic'
import { LazyMount } from '@/components/ui/LazyMount'
import { AuburnDataTeaserSkeleton } from '@/components/homepage/AuburnDataTeaserSkeleton'

// Dynamically import heavy AuburnDataTeaser component (D3, GSAP, framer-motion)
// Load only on client-side after initial paint to reduce initial bundle size
const AuburnDataTeaser = dynamic(
  () => import('@/components/homepage/AuburnDataTeaser').then((mod) => ({ 
    default: mod.AuburnDataTeaser 
  })),
  { 
    ssr: false, // Client-only to avoid including D3/GSAP in SSR bundle
    loading: () => <AuburnDataTeaserSkeleton />,
  }
)

export function HomeLazySections() {
  return (
    <LazyMount rootMargin="400px">
      <AuburnDataTeaser />
    </LazyMount>
  )
}
