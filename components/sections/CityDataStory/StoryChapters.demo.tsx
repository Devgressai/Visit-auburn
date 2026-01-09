/**
 * Story Chapters - Interactive Demo
 * 
 * A standalone demo page to test and showcase the StoryChapters component.
 * This file can be imported into a Next.js page for visual testing.
 */

'use client'

import { useState } from 'react'
import { StoryChapters } from './StoryChapters'
import { StoryStoreProvider, useStoryStore } from './storyStore'
import { auburnStoryChapters, type StoryChapter } from '@/lib/data/cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// DEMO COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function StoryChaptersDemo() {
  const [enableAutoActivation, setEnableAutoActivation] = useState(true)
  const [intersectionThreshold, setIntersectionThreshold] = useState(0.5)
  const [activationLog, setActivationLog] = useState<string[]>([])

  const handleChapterActivate = (chapter: StoryChapter) => {
    const timestamp = new Date().toLocaleTimeString()
    const logEntry = `[${timestamp}] Activated: ${chapter.title} (${chapter.startYear}-${chapter.endYear})`
    setActivationLog(prev => [logEntry, ...prev].slice(0, 10))
  }

  return (
    <div className="min-h-screen bg-charcoal-800">
      {/* Header */}
      <header className="bg-charcoal-900 border-b border-white/10 py-8 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display mb-2">
            StoryChapters Demo
          </h1>
          <p className="text-text-muted">
            Interactive demo of the scrollytelling chapter navigation component
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column: Controls + Visualization (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Controls Panel */}
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6 sticky top-32">
                <h2 className="text-xl font-bold text-white font-display mb-4">
                  Controls
                </h2>

                {/* Auto-activation toggle */}
                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableAutoActivation}
                      onChange={(e) => setEnableAutoActivation(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-pine-500 focus:ring-2 focus:ring-pine-500"
                    />
                    <span className="text-sm text-white">
                      Enable auto-activation on scroll
                    </span>
                  </label>
                </div>

                {/* Intersection threshold slider */}
                <div className="mb-6">
                  <label className="block text-sm text-white mb-2">
                    Intersection Threshold: {intersectionThreshold.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={intersectionThreshold}
                    onChange={(e) => setIntersectionThreshold(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    How much of the card must be visible to activate (0 = any, 1 = all)
                  </p>
                </div>

                {/* State Display */}
                <StateDisplay />

                {/* Activation Log */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Activation Log
                  </h3>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {activationLog.length === 0 ? (
                      <p className="text-xs text-text-muted italic">
                        No activations yet
                      </p>
                    ) : (
                      activationLog.map((entry, index) => (
                        <p key={index} className="text-xs text-text-muted font-mono">
                          {entry}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Chapters (8 cols) */}
            <div className="lg:col-span-8">
              <StoryStoreProvider initialYear={1900}>
                <StoryChapters
                  chapters={auburnStoryChapters}
                  enableAutoActivation={enableAutoActivation}
                  intersectionThreshold={intersectionThreshold}
                  onChapterActivate={handleChapterActivate}
                />
              </StoryStoreProvider>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-900 border-t border-white/10 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-text-muted text-sm space-y-2">
            <p>
              <strong className="text-white">Testing Tips:</strong>
            </p>
            <ul className="space-y-1">
              <li>• Scroll to see auto-activation in action</li>
              <li>• Click cards to manually navigate</li>
              <li>• Try keyboard navigation (Tab, Enter, Space)</li>
              <li>• Adjust intersection threshold to change sensitivity</li>
              <li>• Watch the activation log to see events</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// STATE DISPLAY COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function StateDisplay() {
  const { activeYear, hoveredYear, compareMode } = useStoryStore()

  return (
    <div className="bg-charcoal-900 rounded-lg p-4 border border-white/10">
      <h3 className="text-sm font-semibold text-white mb-3">
        Current State
      </h3>
      <div className="space-y-2 font-mono text-xs">
        <div className="flex justify-between">
          <span className="text-text-muted">activeYear:</span>
          <span className="text-pine-400 font-semibold">
            {activeYear ?? 'null'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">hoveredYear:</span>
          <span className="text-pine-400 font-semibold">
            {hoveredYear ?? 'null'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">compareMode:</span>
          <span className="text-pine-400 font-semibold">
            {compareMode}
          </span>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLLYTELLING DEMO (Side-by-Side Layout)
// ═══════════════════════════════════════════════════════════════════════════

export function ScrollytellingDemo() {
  return (
    <div className="min-h-screen bg-charcoal-800">
      {/* Header */}
      <header className="bg-charcoal-900 border-b border-white/10 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display mb-2">
            Scrollytelling Demo
          </h1>
          <p className="text-text-muted">
            Classic side-by-side layout with sticky visualization
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <StoryStoreProvider initialYear={1900}>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left: Sticky Visualization */}
              <div className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:items-center">
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-white font-display mb-4">
                    Population Growth
                  </h2>
                  <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <VisualizationPlaceholder />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Scrolling Chapters */}
              <div className="py-8">
                <StoryChapters chapters={auburnStoryChapters} />
              </div>
            </div>
          </StoryStoreProvider>
        </div>
      </main>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// VISUALIZATION PLACEHOLDER
// ═══════════════════════════════════════════════════════════════════════════

function VisualizationPlaceholder() {
  const { activeYear } = useStoryStore()

  return (
    <div className="space-y-4">
      <div className="text-6xl font-bold text-pine-400 font-display">
        {activeYear ?? '—'}
      </div>
      <p className="text-text-muted">
        {activeYear 
          ? `Showing data for year ${activeYear}`
          : 'Select a chapter to view data'
        }
      </p>
      <div className="pt-4">
        <div className="inline-block px-4 py-2 bg-pine-500/10 border border-pine-500/30 rounded-lg">
          <p className="text-xs text-pine-300 font-medium">
            Your chart/visualization goes here
          </p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export default StoryChaptersDemo

