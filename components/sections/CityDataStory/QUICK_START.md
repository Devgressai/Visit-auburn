# City Data Story - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Import the Provider

```tsx
import { StoryStoreProvider } from '@/components/sections/CityDataStory'
```

### Step 2: Wrap Your Components

```tsx
export function CityDataStorySection() {
  return (
    <StoryStoreProvider initialYear={2020}>
      <YourCharts />
    </StoryStoreProvider>
  )
}
```

### Step 3: Use the Store

```tsx
import { useStoryStore } from '@/components/sections/CityDataStory'
import { auburnThroughTimeData } from '@/lib/data/cityThroughTime'

function YourChart() {
  const { activeYear, setActiveYear, getActiveRow } = useStoryStore()
  const activeRow = getActiveRow(auburnThroughTimeData)

  return (
    <div onClick={() => setActiveYear(2020)}>
      {activeRow?.milestoneTitle}
    </div>
  )
}
```

---

## 📦 What's Available

### State

```tsx
const { activeYear, hoveredYear, compareMode } = useStoryStore()
```

### Actions

```tsx
const { setActiveYear, setHoveredYear, setCompareMode, reset } = useStoryStore()
```

### Selectors

```tsx
const {
  getActiveRow,
  getSeries,
  formatPopulation,
  getYearRange,
  isValidYear
} = useStoryStore()
```

---

## 🎯 Common Patterns

### Pattern: Scrollytelling with StoryChapters

```tsx
import { StoryChapters } from '@/components/sections/CityDataStory'
import { auburnStoryChapters } from '@/lib/data/cityThroughTime'

function ScrollytellingSection() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Sticky visualization */}
        <div className="lg:sticky lg:top-24">
          <YourChart />
        </div>
        
        {/* Scrolling chapters */}
        <StoryChapters chapters={auburnStoryChapters} />
      </div>
    </StoryStoreProvider>
  )
}
```

### Pattern: Synchronized Highlighting

```tsx
function DataPoint({ year }: { year: number }) {
  const { hoveredYear, setHoveredYear } = useStoryStore()
  
  return (
    <circle
      className={hoveredYear === year ? 'highlighted' : ''}
      onMouseEnter={() => setHoveredYear(year)}
      onMouseLeave={() => setHoveredYear(null)}
    />
  )
}
```

### Pattern: Display Active Data

```tsx
function PopulationDisplay() {
  const { getActiveRow, formatPopulation } = useStoryStore()
  const activeRow = getActiveRow(auburnThroughTimeData)

  if (!activeRow) return <p>Select a year</p>

  return <p>{formatPopulation(activeRow.city)}</p>
}
```

### Pattern: Comparison Toggle

```tsx
function CompareToggle() {
  const { compareMode, setCompareMode } = useStoryStore()

  return (
    <>
      <button onClick={() => setCompareMode('city')}>City</button>
      <button onClick={() => setCompareMode('county')}>+ County</button>
      <button onClick={() => setCompareMode('state')}>+ State</button>
    </>
  )
}
```

---

## 📚 Full Documentation

- **API Reference**: See `README.md`
- **StoryChapters**: See `STORYCHAPTERS_README.md`
- **Examples**: See `storyStore.example.tsx` and `StoryChapters.example.tsx`
- **Tests**: See `storyStore.test.tsx`
- **Implementation**: See `IMPLEMENTATION_SUMMARY.md`

---

## 🆘 Troubleshooting

### Error: "useStoryStore must be used within a StoryStoreProvider"

**Fix:** Wrap your component tree:

```tsx
<StoryStoreProvider>
  <YourComponent />
</StoryStoreProvider>
```

### State not updating?

**Fix:** Make sure you're using the setter functions:

```tsx
const { setActiveYear } = useStoryStore()
setActiveYear(2020)  // ✅ Correct
activeYear = 2020    // ❌ Wrong
```

---

## 🎓 Next Steps

1. Read the full `README.md` for complete API reference
2. Check `storyStore.example.tsx` for 12 usage patterns
3. Run `storyStore.test.tsx` to validate your setup
4. Start building your visualizations!

---

**Need help?** See the full documentation in `README.md`

