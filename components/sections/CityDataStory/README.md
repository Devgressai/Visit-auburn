# City Data Story - Shared State Store

A React Context-based state management solution for interlinked data visualizations in the CityDataStory section.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture Decision](#architecture-decision)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Usage Examples](#usage-examples)
- [SSR & App Router Compatibility](#ssr--app-router-compatibility)
- [Testing](#testing)
- [Performance Considerations](#performance-considerations)

---

## Overview

The Story Store provides a centralized state management layer that enables multiple data visualization components to stay synchronized. When a user interacts with one chart (e.g., hovering over a year), all related visualizations update automatically.

### Key Features

- ✅ **Synchronized State**: All charts share the same active/hovered year
- ✅ **Compare Modes**: Toggle between city-only, city+county, and city+state views
- ✅ **Derived Selectors**: Built-in helpers for common data operations
- ✅ **Type-Safe**: Full TypeScript support with comprehensive types
- ✅ **SSR-Safe**: Works seamlessly with Next.js App Router
- ✅ **Accessible**: Designed for keyboard navigation and screen readers
- ✅ **Runtime Guards**: Graceful fallbacks for missing data

---

## Architecture Decision

### Why React Context (not Zustand)?

**Chosen: React Context**

**Justification:**

1. **Consistency**: This repo already uses React Context (`FAQSearchContext`, `useSavedItems`)
2. **Zero Dependencies**: No need to add Zustand to `package.json`
3. **SSR-Safe**: Context works seamlessly with Next.js App Router
4. **Sufficient Complexity**: Our state is simple (3 values, ~10-20 data points)
5. **Colocation**: State is scoped to CityDataStory section, not global

**When to Switch to Zustand:**

- If state becomes more complex (>10 values)
- If we need devtools debugging
- If we need state persistence across page navigation
- If we see performance issues with frequent updates

---

## Installation

The store is already included in the CityDataStory component directory. No additional dependencies needed.

### Files

```
components/sections/CityDataStory/
├── storyStore.ts           # Main store implementation
├── storyStore.example.tsx  # Usage examples
├── storyStore.test.tsx     # Runtime tests
├── index.ts                # Barrel exports
└── README.md               # This file
```

---

## Quick Start

### 1. Wrap Your Component Tree

```tsx
import { StoryStoreProvider } from '@/components/sections/CityDataStory'

export function CityDataStorySection() {
  return (
    <StoryStoreProvider initialYear={2020} initialCompareMode="city">
      <YourCharts />
      <YourTimeline />
      <YourControls />
    </StoryStoreProvider>
  )
}
```

### 2. Use the Store in Child Components

```tsx
import { useStoryStore } from '@/components/sections/CityDataStory'
import { auburnThroughTimeData } from '@/lib/data/cityThroughTime'

function PopulationDisplay() {
  const { activeYear, getActiveRow, formatPopulation } = useStoryStore()
  const data = auburnThroughTimeData
  const activeRow = getActiveRow(data)

  return (
    <div>
      {activeRow ? (
        <p>Population in {activeRow.year}: {formatPopulation(activeRow.city)}</p>
      ) : (
        <p>Select a year</p>
      )}
    </div>
  )
}
```

### 3. Update State on Interaction

```tsx
function InteractiveChart() {
  const { setActiveYear, setHoveredYear } = useStoryStore()

  return (
    <div
      onClick={() => setActiveYear(2020)}
      onMouseEnter={() => setHoveredYear(2020)}
      onMouseLeave={() => setHoveredYear(null)}
    >
      Click or hover me!
    </div>
  )
}
```

---

## API Reference

### Provider

#### `<StoryStoreProvider>`

Provides the store context to child components.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Child components |
| `initialYear` | `number \| null` | `null` | Initial active year |
| `initialCompareMode` | `CompareMode` | `'city'` | Initial comparison mode |

**Example:**

```tsx
<StoryStoreProvider initialYear={2020} initialCompareMode="county">
  {children}
</StoryStoreProvider>
```

---

### Hooks

#### `useStoryStore()`

Main hook to access the store. Returns all state, actions, and selectors.

**Returns:** `StoryStoreContextType`

**Throws:** Error if used outside of `StoryStoreProvider`

**Example:**

```tsx
const { activeYear, setActiveYear, getActiveRow } = useStoryStore()
```

---

#### `useActiveYear()`

Convenience hook for active year state only.

**Returns:** `{ activeYear: number | null, setActiveYear: (year: number | null) => void }`

**Example:**

```tsx
const { activeYear, setActiveYear } = useActiveYear()
```

---

#### `useHoveredYear()`

Convenience hook for hovered year state only.

**Returns:** `{ hoveredYear: number | null, setHoveredYear: (year: number | null) => void }`

**Example:**

```tsx
const { hoveredYear, setHoveredYear } = useHoveredYear()
```

---

#### `useCompareMode()`

Convenience hook for compare mode state only.

**Returns:** `{ compareMode: CompareMode, setCompareMode: (mode: CompareMode) => void }`

**Example:**

```tsx
const { compareMode, setCompareMode } = useCompareMode()
```

---

#### `useStoryStoreSafe()`

SSR-safe version of `useStoryStore()`. Returns `null` during SSR.

**Returns:** `StoryStoreContextType | null`

**Example:**

```tsx
const store = useStoryStoreSafe()
if (!store) return <div>Loading...</div>
```

---

### State

| Property | Type | Description |
|----------|------|-------------|
| `activeYear` | `number \| null` | Currently selected year (for detail view) |
| `hoveredYear` | `number \| null` | Year being hovered over (for tooltips) |
| `compareMode` | `CompareMode` | Which data series to display (`'city'`, `'county'`, or `'state'`) |

---

### Actions

#### `setActiveYear(year: number | null)`

Set the active year (clicked/selected).

**Example:**

```tsx
setActiveYear(2020)  // Set to 2020
setActiveYear(null)  // Clear selection
```

---

#### `setHoveredYear(year: number | null)`

Set the hovered year (for interactive tooltips).

**Example:**

```tsx
setHoveredYear(2020)  // Hover on 2020
setHoveredYear(null)  // Clear hover
```

---

#### `setCompareMode(mode: CompareMode)`

Set comparison mode (which series to show).

**Example:**

```tsx
setCompareMode('city')    // Show city only
setCompareMode('county')  // Show city + county
setCompareMode('state')   // Show city + county + state
```

---

#### `reset()`

Reset all state to initial values.

**Example:**

```tsx
reset()  // Back to initialYear and initialCompareMode
```

---

### Selectors

#### `getActiveRow(data: CityThroughTimeRow[])`

Get the data row for the active year.

**Returns:** `CityThroughTimeRow | null`

**Example:**

```tsx
const activeRow = getActiveRow(auburnThroughTimeData)
if (activeRow) {
  console.log(activeRow.milestoneTitle)
}
```

---

#### `getHoveredRow(data: CityThroughTimeRow[])`

Get the data row for the hovered year.

**Returns:** `CityThroughTimeRow | null`

**Example:**

```tsx
const hoveredRow = getHoveredRow(auburnThroughTimeData)
```

---

#### `getSeries(data: CityThroughTimeRow[], mode?: CompareMode)`

Get time series data based on compare mode.

**Returns:** `SeriesData`

```typescript
interface SeriesData {
  city: TimeSeriesPoint[]
  county?: TimeSeriesPoint[]
  state?: TimeSeriesPoint[]
}

interface TimeSeriesPoint {
  year: number
  value: number
  label: string
}
```

**Example:**

```tsx
const series = getSeries(auburnThroughTimeData, 'county')
// series.city: always present
// series.county: present if mode is 'county' or 'state'
// series.state: present if mode is 'state'
```

---

#### `formatPopulation(n: number | undefined)`

Format population number for display.

**Returns:** `string`

**Example:**

```tsx
formatPopulation(13330)    // "13,330"
formatPopulation(undefined) // "N/A"
```

---

#### `formatPopulationChange(current: number, previous: number)`

Format population with change indicator.

**Returns:**

```typescript
{
  formatted: string      // "13,330"
  change: number         // 1000
  changePercent: string  // "+8.1%"
  isPositive: boolean    // true
}
```

**Example:**

```tsx
const change = formatPopulationChange(13330, 12330)
console.log(change.changePercent)  // "+8.1%"
```

---

#### `getYearRange(data: CityThroughTimeRow[])`

Get the min and max years from dataset.

**Returns:** `{ min: number, max: number } | null`

**Example:**

```tsx
const range = getYearRange(auburnThroughTimeData)
if (range) {
  console.log(`${range.min} - ${range.max}`)  // "1900 - 2020"
}
```

---

#### `isValidYear(data: CityThroughTimeRow[], year: number)`

Check if a year exists in the dataset.

**Returns:** `boolean`

**Example:**

```tsx
if (isValidYear(auburnThroughTimeData, 2020)) {
  setActiveYear(2020)
}
```

---

## Usage Examples

### Example 1: Synchronized Charts

```tsx
function Dashboard() {
  return (
    <StoryStoreProvider initialYear={2020}>
      <LineChart />
      <BarChart />
      <Timeline />
    </StoryStoreProvider>
  )
}

function LineChart() {
  const { activeYear, hoveredYear } = useStoryStore()
  // Automatically highlights when user interacts with BarChart or Timeline!
  return <svg>{/* chart implementation */}</svg>
}
```

### Example 2: Coordinated Highlighting

```tsx
function MilestoneCard({ year, title }: { year: number, title: string }) {
  const { hoveredYear, setHoveredYear, setActiveYear } = useStoryStore()
  const isHighlighted = hoveredYear === year

  return (
    <div
      className={isHighlighted ? 'highlighted' : ''}
      onClick={() => setActiveYear(year)}
      onMouseEnter={() => setHoveredYear(year)}
      onMouseLeave={() => setHoveredYear(null)}
    >
      <h3>{year}</h3>
      <p>{title}</p>
    </div>
  )
}
```

### Example 3: Compare Mode Toggle

```tsx
function ComparisonControls() {
  const { compareMode, setCompareMode } = useCompareMode()

  return (
    <div role="group" aria-label="Comparison mode">
      <button
        onClick={() => setCompareMode('city')}
        aria-pressed={compareMode === 'city'}
      >
        City Only
      </button>
      <button
        onClick={() => setCompareMode('county')}
        aria-pressed={compareMode === 'county'}
      >
        + County
      </button>
      <button
        onClick={() => setCompareMode('state')}
        aria-pressed={compareMode === 'state'}
      >
        + State
      </button>
    </div>
  )
}
```

### Example 4: Keyboard Navigation

```tsx
function KeyboardNavigableChart() {
  const { activeYear, setActiveYear, getYearRange } = useStoryStore()
  const data = auburnThroughTimeData
  const yearRange = getYearRange(data)

  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      if (!activeYear || !yearRange) return

      const currentIndex = data.findIndex(d => d.year === activeYear)

      if (e.key === 'ArrowRight' && currentIndex < data.length - 1) {
        setActiveYear(data[currentIndex + 1].year)
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setActiveYear(data[currentIndex - 1].year)
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [activeYear, data, yearRange, setActiveYear])

  return <div tabIndex={0}>Chart</div>
}
```

---

## SSR & App Router Compatibility

### Server Components

The store uses `'use client'` directive and is designed for client components only. This is intentional and correct for interactive visualizations.

### Hydration Safety

The store initializes with `null` or provided initial values, preventing hydration mismatches.

### Safe Usage in RSC

If you need to use the store in a component that might be rendered on the server:

```tsx
import { useStoryStoreSafe } from '@/components/sections/CityDataStory'

function MyComponent() {
  const store = useStoryStoreSafe()
  
  if (!store) {
    return <div>Loading...</div>  // Server render
  }
  
  // Client render with store
  return <div>{store.activeYear}</div>
}
```

---

## Testing

### Runtime Tests

Run the test component in development:

```tsx
import { StoryStoreTestRunner } from '@/components/sections/CityDataStory/storyStore.test'

export default function TestPage() {
  return <StoryStoreTestRunner />
}
```

### Manual Console Tests

```js
import { manualTests } from './storyStore.test'
manualTests.runAll()
```

### Integration Tests

```tsx
import { StoryStoreIntegrationTestRunner } from '@/components/sections/CityDataStory/storyStore.test'

export default function IntegrationTestPage() {
  return <StoryStoreIntegrationTestRunner />
}
```

---

## Performance Considerations

### Optimization Strategies

1. **Memoization**: All actions and selectors use `useCallback` and `useMemo`
2. **Selective Subscriptions**: Use convenience hooks (`useActiveYear`, etc.) to subscribe only to needed state
3. **Shallow Updates**: State updates are shallow and fast
4. **No Unnecessary Re-renders**: Context value is memoized

### When to Optimize Further

If you experience performance issues:

1. **Split Contexts**: Separate `activeYear` and `hoveredYear` into different contexts
2. **Add Zustand**: Consider Zustand with selectors for fine-grained subscriptions
3. **Debounce Hover**: Add debouncing to `setHoveredYear` for rapid mouse movements
4. **Virtualization**: Use virtual scrolling for large timelines

### Current Performance Profile

- **State Size**: ~100 bytes (3 values)
- **Update Frequency**: Low (user interactions only)
- **Re-render Scope**: Only subscribed components
- **Memory Footprint**: Negligible

---

## Troubleshooting

### Error: "useStoryStore must be used within a StoryStoreProvider"

**Cause**: Component using `useStoryStore()` is not wrapped in `<StoryStoreProvider>`

**Solution**:

```tsx
// ❌ Wrong
function MyApp() {
  return <MyChart />
}

// ✅ Correct
function MyApp() {
  return (
    <StoryStoreProvider>
      <MyChart />
    </StoryStoreProvider>
  )
}
```

### Warning: "Active year X not found in dataset"

**Cause**: Trying to set an active year that doesn't exist in your data

**Solution**: Validate year before setting:

```tsx
if (isValidYear(data, year)) {
  setActiveYear(year)
}
```

### State Not Updating

**Cause**: Multiple `StoryStoreProvider` instances (nested or sibling)

**Solution**: Ensure only one provider wraps your component tree

---

## Migration Guide

### From Local State to Store

**Before:**

```tsx
function MyChart() {
  const [activeYear, setActiveYear] = useState(2020)
  return <div onClick={() => setActiveYear(2021)}>Chart</div>
}
```

**After:**

```tsx
function MyChart() {
  const { activeYear, setActiveYear } = useActiveYear()
  return <div onClick={() => setActiveYear(2021)}>Chart</div>
}
```

### From Props to Store

**Before:**

```tsx
<Chart activeYear={activeYear} onYearChange={setActiveYear} />
```

**After:**

```tsx
<Chart />  // Gets state from store automatically
```

---

## License

Part of the Visit-Auburn project. See main project LICENSE.

