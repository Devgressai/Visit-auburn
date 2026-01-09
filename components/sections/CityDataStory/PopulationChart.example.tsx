/**
 * Population Chart - Usage Examples
 * 
 * Demonstrates how to use the PopulationChart component
 * in various contexts and configurations.
 */

import { PopulationChart } from './PopulationChart'
import { StoryStoreProvider } from './storyStore'
import { auburnThroughTimeData } from '@/lib/data/cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Basic Usage
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Simplest usage - chart with all defaults
 */
export function BasicPopulationChart() {
  return (
    <StoryStoreProvider>
      <PopulationChart data={auburnThroughTimeData} />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: Custom Dimensions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Chart with custom width and height
 */
export function CustomSizeChart() {
  return (
    <StoryStoreProvider>
      <PopulationChart 
        data={auburnThroughTimeData}
        width={600}
        height={300}
      />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Minimal Chart (No Legend, Grid, or Axes)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Simplified chart for small spaces
 */
export function MinimalChart() {
  return (
    <StoryStoreProvider>
      <PopulationChart 
        data={auburnThroughTimeData}
        showLegend={false}
        showGrid={false}
        showAxes={false}
        height={200}
      />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: With Custom Styling
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Chart with custom container styling
 */
export function StyledChart() {
  return (
    <StoryStoreProvider>
      <div className="bg-gradient-to-br from-cream-50 to-gold-50 p-8 rounded-2xl shadow-card">
        <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-6">
          Population Growth
        </h3>
        <PopulationChart 
          data={auburnThroughTimeData}
          className="bg-white rounded-xl p-4"
        />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: In a Dashboard Layout
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Chart as part of a data dashboard
 */
export function DashboardChart() {
  return (
    <StoryStoreProvider initialYear={2020}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display text-xl font-bold text-charcoal-900 mb-4">
            Population Trend
          </h3>
          <PopulationChart 
            data={auburnThroughTimeData}
            height={300}
          />
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display text-xl font-bold text-charcoal-900 mb-4">
            Key Statistics
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-pine-50 rounded-lg">
              <div className="text-3xl font-black text-pine-600">14,000</div>
              <div className="text-sm text-charcoal-600">Current Population</div>
            </div>
            <div className="p-4 bg-gold-50 rounded-lg">
              <div className="text-3xl font-black text-gold-600">+656%</div>
              <div className="text-sm text-charcoal-600">Growth Since 1900</div>
            </div>
          </div>
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: Responsive Chart
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Chart that adapts to container width
 */
export function ResponsiveChart() {
  return (
    <StoryStoreProvider>
      <div className="w-full max-w-4xl mx-auto">
        <PopulationChart 
          data={auburnThroughTimeData}
          width={1000} // Will be overridden by ResizeObserver
          height={400}
        />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 7: With Comparison Controls
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Chart with mode toggle controls
 */
import { ComparisonControls } from './CityDataStory'

export function ChartWithControls() {
  return (
    <StoryStoreProvider>
      <div className="space-y-6">
        <ComparisonControls />
        <PopulationChart data={auburnThroughTimeData} />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 8: Multiple Synchronized Charts
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Multiple charts sharing the same state
 */
export function SynchronizedCharts() {
  return (
    <StoryStoreProvider initialYear={2000}>
      <div className="space-y-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-4">Full Timeline</h3>
          <PopulationChart data={auburnThroughTimeData} />
        </div>

        <div>
          <h3 className="font-display text-xl font-bold mb-4">Recent Decades</h3>
          <PopulationChart 
            data={auburnThroughTimeData.filter(d => d.year >= 1980)}
            height={250}
          />
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 9: Accessibility Testing Component
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Component for testing accessibility features
 */
export function AccessibilityTestChart() {
  return (
    <StoryStoreProvider>
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-2">Accessibility Features:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Tab through data points</li>
            <li>✓ Arrow keys to navigate</li>
            <li>✓ Enter/Space to select</li>
            <li>✓ Escape to clear</li>
            <li>✓ Screen reader announcements</li>
            <li>✓ Focus indicators visible</li>
            <li>✓ Non-color visual cues (size, stroke)</li>
          </ul>
        </div>

        <PopulationChart 
          data={auburnThroughTimeData}
          showLegend={true}
          showGrid={true}
          showAxes={true}
        />

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-bold text-green-900 mb-2">Testing Checklist:</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>□ Test with keyboard only</li>
            <li>□ Test with screen reader (NVDA/JAWS/VoiceOver)</li>
            <li>□ Test with reduced motion enabled</li>
            <li>□ Test on mobile (touch interactions)</li>
            <li>□ Verify focus indicators visible</li>
            <li>□ Verify tooltips work on focus</li>
          </ul>
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 10: Print-Friendly Chart
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Chart optimized for printing
 */
export function PrintFriendlyChart() {
  return (
    <StoryStoreProvider>
      <div className="print:bg-white print:shadow-none">
        <h2 className="font-display text-2xl font-bold mb-4 print:text-black">
          Auburn Population: 1900-2020
        </h2>
        
        <PopulationChart 
          data={auburnThroughTimeData}
          showLegend={true}
          showGrid={true}
          showAxes={true}
          className="print:border print:border-gray-300"
        />

        <div className="mt-4 text-sm text-charcoal-600 print:text-black">
          <p>Source: US Census Bureau (Seed Data)</p>
          <p>Generated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 11: With Custom Data
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Chart with filtered or custom data
 */
export function CustomDataChart() {
  // Filter to show only post-1950 data
  const modernData = auburnThroughTimeData.filter(d => d.year >= 1950)

  return (
    <StoryStoreProvider>
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h3 className="font-display text-xl font-bold text-charcoal-900 mb-4">
          Modern Era (1950-2020)
        </h3>
        <PopulationChart 
          data={modernData}
          height={350}
        />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 12: Mobile-Optimized Chart
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Chart optimized for mobile viewing
 */
export function MobileOptimizedChart() {
  return (
    <StoryStoreProvider>
      <div className="w-full px-4 md:px-0">
        <PopulationChart 
          data={auburnThroughTimeData}
          height={300}
          showLegend={true}
          showGrid={false} // Simplify for mobile
          className="touch-manipulation"
        />
        
        <div className="mt-4 text-sm text-center text-charcoal-600">
          <p className="md:hidden">Tap points to see details</p>
          <p className="hidden md:block">Click or hover points to see details</p>
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  BasicPopulationChart,
  CustomSizeChart,
  MinimalChart,
  StyledChart,
  DashboardChart,
  ResponsiveChart,
  ChartWithControls,
  SynchronizedCharts,
  AccessibilityTestChart,
  PrintFriendlyChart,
  CustomDataChart,
  MobileOptimizedChart,
}

