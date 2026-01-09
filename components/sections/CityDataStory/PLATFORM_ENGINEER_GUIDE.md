# CityDataStory - Platform Engineer's Guide

## 🎯 Overview

The `CityDataStory` component is now a **fully reusable civic data visualization platform** that can be configured for ANY city without code changes. This guide shows you how to use it for your own municipality.

---

## 🚀 Quick Start: Using for Another City

### Step 1: Create Your Data

```typescript
import type { CityThroughTimeRow, StoryChapter, CityDataStoryConfig } from '@/lib/data/cityThroughTime'

// Define your city's population data
const sacramentoData: CityThroughTimeRow[] = [
  {
    year: 1900,
    city: 29282,
    county: 45915,
    state: 1485000,
    milestoneTitle: 'Capital City Established',
    milestoneBody: 'Sacramento solidifies its role as California\'s capital...',
    sources: [
      { label: 'US Census 1900', url: 'https://census.gov/...' }
    ],
  },
  // ... more data points
]

// Define narrative chapters
const sacramentoChapters: StoryChapter[] = [
  {
    id: 'gold-rush',
    title: 'Gold Rush Era',
    startYear: 1900,
    endYear: 1930,
    takeaway: 'Sacramento becomes the gateway to the goldfields',
    detail: 'As the capital city and a major port...',
    metricHighlights: [
      { label: 'Population Growth', value: '+150%', note: '1900-1930' },
    ],
  },
  // ... more chapters
]
```

### Step 2: Create Your Config

```typescript
const sacramentoConfig: CityDataStoryConfig = {
  cityName: 'Sacramento',
  countyName: 'Sacramento County',
  stateName: 'California',
  established: 1850,
  theme: {
    accentClassName: 'blue', // or 'gold', 'pine', 'lake', 'rust'
  },
  data: sacramentoData,
  chapters: sacramentoChapters,
}
```

### Step 3: Use the Component

```tsx
import { CityDataStory } from '@/components/sections/CityDataStory'
import { sacramentoConfig } from '@/lib/data/sacramento'

export default function SacramentoDataPage() {
  return (
    <section className="py-16 bg-charcoal-900">
      <div className="container">
        <CityDataStory config={sacramentoConfig} />
      </div>
    </section>
  )
}
```

**That's it!** No code changes needed. The component will:
- Display "Sacramento Through Time" as the title
- Use "Sacramento", "Sacramento County", "California" in all labels
- Show your custom data and chapters
- Apply your theme colors

---

## 📦 Configuration Reference

### `CityDataStoryConfig` Type

```typescript
interface CityDataStoryConfig {
  /** Display name of the city (e.g., "Auburn", "Sacramento") */
  cityName: string
  
  /** Display name of the county (optional, e.g., "Placer County") */
  countyName?: string
  
  /** Display name of the state (optional, e.g., "California") */
  stateName?: string
  
  /** Year the city was established (optional, for display) */
  established?: number
  
  /** Theme customization (optional) */
  theme?: {
    /** Tailwind class for accent color (default: 'gold') */
    accentClassName?: string
  }
  
  /** Population data through time */
  data: CityThroughTimeRow[]
  
  /** Narrative chapters for scrollytelling */
  chapters: StoryChapter[]
}
```

### `CityThroughTimeRow` Type

```typescript
interface CityThroughTimeRow {
  year: number
  city: number
  county?: number
  state?: number
  milestoneTitle: string
  milestoneBody: string
  sources: Array<{
    label: string
    url?: string
  }>
}
```

### `StoryChapter` Type

```typescript
interface StoryChapter {
  id: string
  title: string
  startYear: number
  endYear: number
  takeaway: string
  detail: string
  metricHighlights: Array<{
    label: string
    value: string
    note?: string
  }>
}
```

---

## 🎨 Theming

The `theme.accentClassName` property allows you to customize the accent color used throughout the visualization. Available options:

- `'gold'` (default) - Warm gold accents
- `'blue'` - Cool blue accents
- `'pine'` - Forest green accents
- `'lake'` - Teal/aqua accents
- `'rust'` - Warm orange/red accents

These map to Tailwind color classes (e.g., `gold-500`, `blue-600`, etc.).

---

## 🔧 Advanced Usage

### Custom Initial Chapter

```tsx
<CityDataStory 
  config={myConfig} 
  initialChapterIndex={2} // Start at 3rd chapter
/>
```

### Programmatic Control

The component uses a shared store for state management. You can access it:

```tsx
import { useStoryStore } from '@/components/sections/CityDataStory'

function MyCustomControl() {
  const { activeYear, setActiveYear } = useStoryStore()
  
  return (
    <button onClick={() => setActiveYear(2000)}>
      Jump to 2000
    </button>
  )
}
```

---

## 📊 Data Guidelines

### Population Data

- **Minimum**: 5 data points (recommended: 10+)
- **Frequency**: Decennial (every 10 years) works well
- **Sources**: Always cite official sources (Census, state agencies)
- **Completeness**: City population required; county/state optional

### Chapters

- **Minimum**: 3 chapters (recommended: 4-6)
- **Coverage**: Should span your entire data timeline
- **Non-overlapping**: Each year should belong to exactly one chapter
- **Metrics**: 2-4 metric highlights per chapter

### Milestones

- **Specificity**: Each year should have a unique milestone
- **Length**: Title (5-10 words), Body (2-3 sentences)
- **Relevance**: Connect to population trends when possible

---

## 🌐 Real-World Examples

### Example 1: Small Town (Population < 20,000)

```typescript
const smallTownConfig: CityDataStoryConfig = {
  cityName: 'Truckee',
  countyName: 'Nevada County',
  stateName: 'California',
  established: 1863,
  data: truckeeData, // 8 data points (1900-2020)
  chapters: truckeeChapters, // 4 chapters
}
```

### Example 2: Mid-Size City (Population 50,000-200,000)

```typescript
const midCityConfig: CityDataStoryConfig = {
  cityName: 'Roseville',
  countyName: 'Placer County',
  stateName: 'California',
  established: 1909,
  theme: { accentClassName: 'blue' },
  data: rosevilleData, // 12 data points (1910-2020)
  chapters: rosevilleChapters, // 5 chapters
}
```

### Example 3: Major City (Population > 200,000)

```typescript
const majorCityConfig: CityDataStoryConfig = {
  cityName: 'Sacramento',
  countyName: 'Sacramento County',
  stateName: 'California',
  established: 1850,
  theme: { accentClassName: 'pine' },
  data: sacramentoData, // 15 data points (1850-2020)
  chapters: sacramentoChapters, // 6 chapters
}
```

---

## ✅ Pre-Flight Checklist

Before deploying your city's data story:

- [ ] All population data is from official sources
- [ ] Sources are properly cited with URLs
- [ ] Data points are in chronological order
- [ ] No gaps in chapter coverage (every year belongs to a chapter)
- [ ] City name appears correctly in all UI elements
- [ ] County/state names are accurate (if provided)
- [ ] Metric highlights are factually correct
- [ ] Milestone narratives are historically accurate
- [ ] Theme colors match your brand (if customized)
- [ ] Tested on mobile and desktop
- [ ] Accessibility verified (keyboard navigation, screen readers)

---

## 🎓 Best Practices

### Data Quality

1. **Use Official Sources**: Census Bureau, state demographic agencies
2. **Cite Everything**: Every data point should have a source
3. **Be Transparent**: Mark estimates/projections clearly
4. **Update Regularly**: Refresh when new census data is released

### Narrative Design

1. **Tell a Story**: Connect data to historical events
2. **Be Balanced**: Acknowledge both growth and challenges
3. **Use Context**: Compare to county/state for perspective
4. **Keep It Human**: Focus on what the numbers mean for residents

### Performance

1. **Optimize Data**: 10-15 data points is the sweet spot
2. **Lazy Load**: Consider code-splitting for large datasets
3. **Cache Config**: Store config in a separate file for reusability

### Accessibility

1. **Test Keyboard**: All interactions should work without a mouse
2. **Check Contrast**: Ensure text meets WCAG AA standards
3. **Provide Alternatives**: Screen readers should get full context
4. **Respect Motion**: Component already handles `prefers-reduced-motion`

---

## 🐛 Troubleshooting

### "City name not showing"

**Problem**: Component shows "City" instead of your city name.

**Solution**: Ensure `cityName` is set in your config:

```typescript
const config: CityDataStoryConfig = {
  cityName: 'YourCity', // ✅ Required
  // ...
}
```

### "Chart labels are generic"

**Problem**: Chart shows "City", "County", "State" instead of specific names.

**Solution**: Provide `countyName` and `stateName` in config:

```typescript
const config: CityDataStoryConfig = {
  cityName: 'Auburn',
  countyName: 'Placer County', // ✅ Add this
  stateName: 'California',     // ✅ Add this
  // ...
}
```

### "Chapters not activating"

**Problem**: Scrolling doesn't activate chapters.

**Solution**: Ensure chapter year ranges cover all data points:

```typescript
// ❌ BAD: Gap between 1950 and 1970
{ startYear: 1900, endYear: 1950 },
{ startYear: 1970, endYear: 2020 },

// ✅ GOOD: Continuous coverage
{ startYear: 1900, endYear: 1950 },
{ startYear: 1950, endYear: 2020 },
```

---

## 📚 Additional Resources

- **API Reference**: See `CITYDATASTORY_README.md`
- **Component Docs**: See `README.md`
- **Store Documentation**: See `storyStore.ts`
- **Examples**: See `CityDataStory.example.tsx`

---

## 🤝 Contributing

If you use this component for your city and make improvements, consider:

1. Sharing your data structure patterns
2. Contributing new theme colors
3. Reporting bugs or edge cases
4. Suggesting new features

---

**Built with ❤️ for civic technologists and municipal governments.**

*Last updated: January 9, 2026*

