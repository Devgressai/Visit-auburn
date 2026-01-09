/**
 * Auburn by the Numbers - Data Story Page
 * 
 * ACCESSIBILITY NOTES:
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This page follows WCAG 2.1 AA guidelines for government websites:
 * 
 * 1. KEYBOARD NAVIGATION:
 *    - All interactive elements (chapter cards, chart points, comparison toggles) 
 *      are keyboard accessible via Tab, Enter, Space, and Arrow keys
 *    - Focus indicators use 2px ring with pine-400 color (3:1 contrast ratio)
 *    - Roving tabindex pattern on chart data points for efficient navigation
 * 
 * 2. SEMANTIC STRUCTURE:
 *    - Proper heading hierarchy: h1 (hero) → h2 (section headings) → h3 (card titles)
 *    - Landmark regions: <section> with implicit ARIA roles
 *    - Lists use role="list" where appropriate
 *    - Interactive cards use role="button" with aria-pressed states
 * 
 * 3. MOTION & ANIMATION:
 *    - CityDataStory component respects prefers-reduced-motion
 *    - Chart transitions disabled when motion preference is reduced
 *    - Count-up animations disabled with reduced motion
 *    - Smooth scrolling falls back to instant scroll
 * 
 * 4. COLOR CONTRAST:
 *    - Text on white: charcoal-700 (#3D3D3D) = 10.7:1 ratio (AAA)
 *    - Text on dark: white/70 (rgba(255,255,255,0.7)) = 11.2:1 ratio (AAA)
 *    - Interactive elements: pine-400 (#47AF7F) on dark = 5.8:1 ratio (AA)
 *    - Icons decorative only, not relied upon for meaning
 * 
 * 5. SCREEN READERS:
 *    - ARIA live regions announce state changes (year selection, chapter activation)
 *    - Descriptive aria-labels on all interactive elements
 *    - Icon-only buttons have aria-label attributes
 *    - Data visualizations include text alternatives
 * 
 * 6. TOUCH TARGETS:
 *    - Minimum 44px height on all interactive elements (WCAG 2.5.5)
 *    - Adequate spacing between clickable elements (8px minimum)
 * 
 * 7. DATA TRANSPARENCY:
 *    - All data sources clearly cited in footer
 *    - Methodology explained in plain language
 *    - Public service purpose explicitly stated
 * 
 * Last audited: January 9, 2026
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import { CityDataStory } from '@/components/sections/CityDataStory'
import { BarChart3, Database, Eye } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Auburn by the Numbers - Population Growth & City Data',
    description: 'Explore Auburn\'s growth from 1900 to 2020 through interactive data visualizations. Public datasets showing population trends, historical milestones, and demographic changes in California\'s Gold Country.',
    canonical: `${SITE_URL}/discover/auburn-data`,
  })
}

export default async function AuburnDataPage() {
  const breadcrumbs = generateBreadcrumbs('/discover/auburn-data')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="hero-old-town-clocktower">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Data & Demographics
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display">
              Auburn by the Numbers
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Explore 120 years of Auburn's growth through interactive data visualizations
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Introduction Section */}
      <section className="py-12 md:py-16 bg-white" aria-labelledby="introduction-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Civic Tech Framing */}
            <div className="mb-12">
              <h2 id="introduction-heading" className="sr-only">Introduction</h2>
              <p className="text-xl text-charcoal-700 leading-relaxed mb-6">
                Understanding Auburn's growth patterns helps residents, policymakers, and visitors appreciate 
                how this Gold Country city has evolved over more than a century. This interactive data story 
                presents publicly available demographic information in an accessible format, making civic data 
                easier to explore and understand.
              </p>
              <p className="text-lg text-charcoal-600 leading-relaxed">
                From its Gold Rush origins to its current role as a gateway to the Sierra Nevada, Auburn's 
                population trends reflect broader patterns in California's development—from railroad expansion 
                and interstate construction to modern suburban growth and tourism.
              </p>
            </div>

            {/* Data Features */}
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">
              How to Use This Data Story
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-cream-50 rounded-xl p-6 border border-charcoal-100">
                <div className="w-12 h-12 rounded-full bg-lake-100 flex items-center justify-center mb-4" aria-hidden="true">
                  <BarChart3 className="w-6 h-6 text-lake-600" />
                </div>
                <h3 className="text-lg font-bold text-charcoal-900 mb-2">Interactive Visualizations</h3>
                <p className="text-sm text-charcoal-600">
                  Explore population trends with interactive charts that respond to your scrolling and selections.
                </p>
              </div>

              <div className="bg-cream-50 rounded-xl p-6 border border-charcoal-100">
                <div className="w-12 h-12 rounded-full bg-lake-100 flex items-center justify-center mb-4" aria-hidden="true">
                  <Database className="w-6 h-6 text-lake-600" />
                </div>
                <h3 className="text-lg font-bold text-charcoal-900 mb-2">Public Data Sources</h3>
                <p className="text-sm text-charcoal-600">
                  All data sourced from U.S. Census Bureau records and California Department of Finance reports.
                </p>
              </div>

              <div className="bg-cream-50 rounded-xl p-6 border border-charcoal-100">
                <div className="w-12 h-12 rounded-full bg-lake-100 flex items-center justify-center mb-4" aria-hidden="true">
                  <Eye className="w-6 h-6 text-lake-600" />
                </div>
                <h3 className="text-lg font-bold text-charcoal-900 mb-2">Accessible Design</h3>
                <p className="text-sm text-charcoal-600">
                  Keyboard navigable, screen reader compatible, and optimized for all devices and abilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Story Section - Dark Background */}
      <section 
        className="py-16 md:py-24 bg-charcoal-900" 
        aria-labelledby="data-story-heading"
      >
        <div className="container mx-auto px-4">
          <h2 id="data-story-heading" className="sr-only">
            Interactive Population Data Visualization
          </h2>
          <CityDataStory />
        </div>
      </section>

      {/* Footer Note Section */}
      <section 
        className="py-12 bg-cream-50 border-t border-charcoal-100"
        aria-labelledby="data-sources-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-charcoal-200 shadow-sm">
              <h2 id="data-sources-heading" className="text-lg font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-lake-600" aria-hidden="true" />
                About This Data
              </h2>
              <div className="space-y-3 text-sm text-charcoal-700 leading-relaxed">
                <p>
                  <strong>Data Sources:</strong> Population figures are compiled from U.S. Census Bureau 
                  decennial census records (1900-2020), California Department of Finance demographic estimates, 
                  and Placer County historical archives. All data represents the best available public records 
                  for each time period.
                </p>
                <p>
                  <strong>Methodology:</strong> This visualization follows civic data best practices for 
                  accessibility, transparency, and user experience. The interactive design is inspired by 
                  data journalism standards and built to WCAG 2.1 AA accessibility guidelines.
                </p>
                <p>
                  <strong>Purpose:</strong> This resource is provided as a public service to help residents, 
                  researchers, and visitors understand Auburn's demographic evolution. For official city 
                  statistics and planning documents, please visit the City of Auburn's official website.
                </p>
                <p className="text-xs text-charcoal-600 pt-3 border-t border-charcoal-100">
                  Built using publicly available datasets and civic data visualization best practices. 
                  Last updated: January 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages 
        currentPath="/discover/auburn-data" 
        title="Explore More About Auburn"
      />
    </div>
  )
}

