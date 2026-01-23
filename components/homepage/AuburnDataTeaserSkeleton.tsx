/**
 * AuburnDataTeaserSkeleton - Loading placeholder
 * 
 * Matches the visual structure of AuburnDataTeaser to prevent layout shift.
 * Uses soft card design with optional subtle shimmer effect.
 */

import { Mountain } from 'lucide-react'
import { 
  colors, 
  spacing, 
  typography, 
  elevation, 
  depth, 
  borders,
  grid,
} from '@/lib/designTokens'

export function AuburnDataTeaserSkeleton() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: spacing.section.paddingMobile,
        paddingBottom: spacing.section.paddingMobile,
        background: `linear-gradient(to bottom, ${colors.cream[50]}, ${colors.semantic.bgCard}, ${colors.cream[50]})`,
        zIndex: depth.content,
      }}
      aria-label="Loading data visualization"
      aria-busy="true"
    >
      {/* Decorative background elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.05 }}
      >
        <div 
          className="absolute rounded-full"
          style={{
            top: spacing[20],
            left: spacing[10],
            width: spacing[32] * 2,
            height: spacing[32] * 2,
            backgroundColor: colors.forest[500],
            filter: 'blur(60px)',
            transform: 'translateZ(0)',
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            bottom: spacing[20],
            right: spacing[10],
            width: spacing[32] * 3,
            height: spacing[32] * 3,
            backgroundColor: colors.gold[500],
            filter: 'blur(60px)',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      <div 
        className="container mx-auto relative"
        style={{
          paddingLeft: spacing.container.paddingMobile,
          paddingRight: spacing.container.paddingMobile,
          maxWidth: grid.container['2xl'],
          zIndex: depth.content,
        }}
      >
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center rounded-full"
            style={{
              gap: spacing[2],
              padding: `${spacing[2] + spacing[1]}px ${spacing[5]}px`,
              backgroundColor: colors.forest[100],
              color: colors.forest[700],
              marginBottom: spacing[6],
              boxShadow: elevation.shadow.sm,
            }}
          >
            <Mountain style={{ width: spacing[4], height: spacing[4] }} />
            <span 
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.bold,
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.widest,
              }}
            >
              Data & Demographics
            </span>
          </div>
          <div 
            style={{
              fontSize: typography.fontSize.h2,
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
              color: colors.charcoal[900],
              marginBottom: spacing[6],
            }}
          >
            Auburn by the Numbers
          </div>
          <div 
            style={{
              width: '80%',
              maxWidth: spacing[24] * 6,
              height: typography.fontSize.xl,
              margin: '0 auto',
              backgroundColor: colors.charcoal[200],
              borderRadius: borders.radius.md,
            }}
            className="skeleton-shimmer"
          />
        </div>

        {/* Quick Stats Banner Skeleton */}
        <div
          style={{
            background: `linear-gradient(to right, ${colors.forest[500]}, ${colors.forest[600]})`,
            borderRadius: borders.radius['2xl'],
            padding: `clamp(${spacing[8]}px, 4vw, ${spacing[10]}px)`,
            marginBottom: spacing[12],
            boxShadow: elevation.shadow['2xl'],
            transform: 'translateZ(0)',
          }}
        >
          <div 
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: spacing[6] }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div 
                  style={{
                    width: '60%',
                    height: `clamp(${typography.fontSize['4xl']}, 4vw, ${typography.fontSize['5xl']})`,
                    margin: `0 auto ${spacing[2]}px`,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: borders.radius.md,
                  }}
                  className="skeleton-shimmer"
                />
                <div 
                  style={{
                    width: '50%',
                    height: typography.fontSize.sm,
                    margin: '0 auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: borders.radius.sm,
                  }}
                  className="skeleton-shimmer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Visualization Card Skeleton */}
        <div
          style={{
            backgroundColor: colors.semantic.bgCard,
            borderRadius: borders.radius['2xl'],
            border: `${borders.width.medium}px solid ${colors.forest[200]}`,
            boxShadow: elevation.shadow.xl,
            padding: `clamp(${spacing[8]}px, 4vw, ${spacing[12]}px)`,
            marginBottom: spacing[8],
          }}
        >
          {/* Chart area skeleton */}
          <div
            style={{
              width: '100%',
              height: 'clamp(300px, 40vw, 550px)',
              backgroundColor: colors.cream[100],
              borderRadius: borders.radius.xl,
              marginBottom: spacing[6],
            }}
            className="skeleton-shimmer"
          />

          {/* Stats panel skeleton */}
          <div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            style={{ marginBottom: spacing[6] }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: colors.cream[50],
                  borderRadius: borders.radius.xl,
                  padding: spacing[5],
                  border: `${borders.width.medium}px solid ${colors.forest[200]}`,
                }}
              >
                <div
                  style={{
                    width: '60%',
                    height: typography.fontSize['2xl'],
                    backgroundColor: colors.charcoal[200],
                    borderRadius: borders.radius.md,
                    marginBottom: spacing[2],
                  }}
                  className="skeleton-shimmer"
                />
                <div
                  style={{
                    width: '80%',
                    height: typography.fontSize.sm,
                    backgroundColor: colors.charcoal[200],
                    borderRadius: borders.radius.sm,
                  }}
                  className="skeleton-shimmer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section Skeleton */}
        <div
          style={{
            backgroundColor: colors.semantic.bgCard,
            borderRadius: borders.radius['2xl'],
            border: `${borders.width.medium}px solid ${colors.gold[200]}`,
            boxShadow: elevation.shadow.lg,
            padding: `clamp(${spacing[10]}px, 4vw, ${spacing[12]}px)`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '200px',
              height: typography.fontSize.h3,
              margin: `0 auto ${spacing[4]}px`,
              backgroundColor: colors.charcoal[200],
              borderRadius: borders.radius.md,
            }}
            className="skeleton-shimmer"
          />
          <div
            style={{
              width: '70%',
              maxWidth: spacing[20] * 2,
              height: typography.fontSize.lg,
              margin: `0 auto ${spacing[8]}px`,
              backgroundColor: colors.charcoal[200],
              borderRadius: borders.radius.md,
            }}
            className="skeleton-shimmer"
          />
          <div
            className="flex flex-col sm:flex-row justify-center"
            style={{ gap: spacing[4] }}
          >
            {[1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '200px',
                  height: '48px',
                  backgroundColor: colors.charcoal[200],
                  borderRadius: borders.radius.xl,
                  margin: '0 auto',
                }}
                className="skeleton-shimmer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
