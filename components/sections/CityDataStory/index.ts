/**
 * City Data Story - Barrel Export
 * 
 * Centralized exports for the CityDataStory section
 */

// Main component export
export { CityDataStory } from './CityDataStory'

// Sub-component exports
export {
  VisualizationPanel,
  ChapterContent,
  ComparisonControls,
  YearScrubber,
  PlaceholderChart,
} from './CityDataStory'

// Chart component exports
export { 
  PopulationChart,
  ChartTooltip,
  ChartLegend,
} from './PopulationChart'

// Stats panel exports
export {
  StatsPanel,
  StatsPanelCompact,
  SourceChip,
} from './StatsPanel'

// Stats panel utility exports
export {
  calculateGrowth,
  formatGrowthPercentage,
  formatAbsoluteGrowth,
  useCountUp,
} from './StatsPanel'

// Scrollytelling component exports
export { StoryChapters } from './StoryChapters'

// Chart utility exports
export {
  formatCompact,
  formatFull,
  getNiceTicks,
  createScale,
} from './PopulationChart'

// Store exports
export {
  StoryStoreProvider,
  useStoryStore,
  useStoryStoreSafe,
  useActiveYear,
  useHoveredYear,
  useCompareMode,
} from './storyStore'

// Type exports
export type {
  CompareMode,
  TimeSeriesPoint,
  SeriesData,
} from './storyStore'

