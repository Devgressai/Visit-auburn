/**
 * Stats Panel - Usage Examples
 * 
 * Demonstrates various configurations and use cases for the StatsPanel component.
 */

import { StatsPanel, StatsPanelCompact } from './StatsPanel'
import { StoryStoreProvider } from './storyStore'
import { auburnThroughTimeData } from '@/lib/data/cityThroughTime'

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Basic Usage
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Default stats panel with all features enabled
 */
export function BasicStatsPanel() {
  return (
    <StoryStoreProvider initialYear={2020}>
      <StatsPanel data={auburnThroughTimeData} />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: Minimal Panel (No Sources or Growth)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Simplified panel showing only year, population, and milestone
 */
export function MinimalStatsPanel() {
  return (
    <StoryStoreProvider initialYear={1950}>
      <StatsPanel 
        data={auburnThroughTimeData}
        showSources={false}
        showGrowth={false}
        showMilestone={true}
      />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Compact Variant
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Compact version for sidebars or small spaces
 */
export function CompactStats() {
  return (
    <StoryStoreProvider initialYear={2000}>
      <StatsPanelCompact data={auburnThroughTimeData} />
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: Side-by-Side with Chart
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Stats panel alongside a chart
 */
import { PopulationChart } from './PopulationChart'

export function ChartWithStats() {
  return (
    <StoryStoreProvider initialYear={2010}>
      <div className="grid md:grid-cols-2 gap-6">
        <PopulationChart 
          data={auburnThroughTimeData}
          height={400}
        />
        <StatsPanel 
          data={auburnThroughTimeData}
          showSources={true}
          showMilestone={true}
          showGrowth={true}
        />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: Dashboard Layout
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Multiple panels in a dashboard
 */
export function DashboardLayout() {
  return (
    <StoryStoreProvider initialYear={2020}>
      <div className="space-y-6">
        {/* Main Chart */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-display text-2xl font-bold mb-4">
            Population Trend
          </h2>
          <PopulationChart 
            data={auburnThroughTimeData}
            height={300}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatsPanelCompact data={auburnThroughTimeData} />
          <StatsPanelCompact data={auburnThroughTimeData} />
          <StatsPanelCompact data={auburnThroughTimeData} />
        </div>

        {/* Detailed Stats */}
        <StatsPanel data={auburnThroughTimeData} />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: With Custom Styling
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Stats panel with custom container styling
 */
export function StyledStatsPanel() {
  return (
    <StoryStoreProvider initialYear={1980}>
      <div className="bg-gradient-to-br from-gold-50 to-cream-50 p-8 rounded-3xl">
        <h2 className="font-display text-3xl font-bold text-charcoal-900 mb-6">
          Historical Data
        </h2>
        <StatsPanel 
          data={auburnThroughTimeData}
          className="shadow-xl"
        />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 7: Interactive Demo with Controls
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Interactive demo showing hover preview behavior
 */
import { ComparisonControls } from './CityDataStory'

export function InteractiveDemo() {
  return (
    <StoryStoreProvider initialYear={2000}>
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-2">
            Try These Interactions:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Hover over chart points to see preview mode</li>
            <li>• Click a point to set it as active</li>
            <li>• Use keyboard navigation (Tab, Arrows, Enter)</li>
            <li>• Watch the count-up animation</li>
          </ul>
        </div>

        <ComparisonControls />

        <div className="grid md:grid-cols-2 gap-6">
          <PopulationChart data={auburnThroughTimeData} />
          <StatsPanel data={auburnThroughTimeData} />
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 8: Mobile-Optimized Layout
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Layout optimized for mobile devices
 */
export function MobileOptimizedLayout() {
  return (
    <StoryStoreProvider initialYear={2020}>
      <div className="space-y-4 px-4 md:px-0">
        {/* Compact stats at top */}
        <StatsPanelCompact data={auburnThroughTimeData} />

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-card p-4">
          <PopulationChart 
            data={auburnThroughTimeData}
            height={250}
            showGrid={false}
          />
        </div>

        {/* Full stats below */}
        <StatsPanel 
          data={auburnThroughTimeData}
          showSources={false} // Hide on mobile for space
        />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 9: Accessibility Testing
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Component for testing accessibility features
 */
export function AccessibilityTest() {
  return (
    <StoryStoreProvider initialYear={1950}>
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-bold text-green-900 mb-2">
            Accessibility Features:
          </h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>✓ ARIA live region announces active year changes</li>
            <li>✓ Descriptive link labels for sources</li>
            <li>✓ Count-up animation respects reduced motion</li>
            <li>✓ Preview mode clearly indicated</li>
            <li>✓ Focus indicators on source links</li>
          </ul>
        </div>

        <StatsPanel data={auburnThroughTimeData} />

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-bold text-yellow-900 mb-2">
            Testing Checklist:
          </h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>□ Enable reduced motion - verify no animation</li>
            <li>□ Test with screen reader (NVDA/JAWS/VoiceOver)</li>
            <li>□ Verify live region announcements</li>
            <li>□ Tab through source links</li>
            <li>□ Check color contrast (4.5:1 minimum)</li>
          </ul>
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 10: Comparison View
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Side-by-side comparison of two years
 */
export function ComparisonView() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <StoryStoreProvider initialYear={1950}>
        <div>
          <h3 className="font-display text-xl font-bold mb-4">1950</h3>
          <StatsPanel data={auburnThroughTimeData} />
        </div>
      </StoryStoreProvider>

      <StoryStoreProvider initialYear={2020}>
        <div>
          <h3 className="font-display text-xl font-bold mb-4">2020</h3>
          <StatsPanel data={auburnThroughTimeData} />
        </div>
      </StoryStoreProvider>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 11: Filtered Data
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Stats panel with filtered dataset
 */
export function FilteredDataPanel() {
  // Show only modern era (1950+)
  const modernData = auburnThroughTimeData.filter(d => d.year >= 1950)

  return (
    <StoryStoreProvider initialYear={1950}>
      <div className="space-y-4">
        <div className="bg-pine-50 border border-pine-200 rounded-lg p-4">
          <p className="text-sm text-pine-800">
            Showing data from 1950-2020 (Modern Era)
          </p>
        </div>
        <StatsPanel data={modernData} />
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 12: Print-Friendly Layout
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Layout optimized for printing
 */
export function PrintFriendlyLayout() {
  return (
    <StoryStoreProvider initialYear={2020}>
      <div className="print:bg-white print:shadow-none">
        <h1 className="font-display text-3xl font-bold mb-6 print:text-black">
          Auburn Population Report
        </h1>

        <div className="grid md:grid-cols-2 gap-6 print:gap-4">
          <div>
            <h2 className="font-display text-xl font-bold mb-4">Chart</h2>
            <PopulationChart 
              data={auburnThroughTimeData}
              height={300}
              className="print:border print:border-gray-300"
            />
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-4">Statistics</h2>
            <StatsPanel 
              data={auburnThroughTimeData}
              className="print:border print:border-gray-300"
            />
          </div>
        </div>

        <div className="mt-6 text-sm text-charcoal-600 print:text-black">
          <p>Generated: {new Date().toLocaleDateString()}</p>
          <p>Source: US Census Bureau</p>
        </div>
      </div>
    </StoryStoreProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  BasicStatsPanel,
  MinimalStatsPanel,
  CompactStats,
  ChartWithStats,
  DashboardLayout,
  StyledStatsPanel,
  InteractiveDemo,
  MobileOptimizedLayout,
  AccessibilityTest,
  ComparisonView,
  FilteredDataPanel,
  PrintFriendlyLayout,
}

