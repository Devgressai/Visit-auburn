# CityDataStory Component

A reusable, accessible scrollytelling visualization component for civic demographic data.

---

## 🚀 Quick Start

```tsx
import { CityDataStory } from '@/components/sections/CityDataStory'
import { auburnDataStoryConfig } from '@/lib/data/cityThroughTime'

export default function DataPage() {
  return <CityDataStory config={auburnDataStoryConfig} />
}
```

---

## 📦 How to Use for Another City

### Step 1: Create Your Data File

Create a new file: `lib/data/yourCity.ts`

```typescript
import type { CityDataStoryConfig, CityThroughTimeRow, StoryChapter } from '@/lib/data/cityThroughTime'

// Define your population data
export const yourCityData: CityThroughTimeRow[] = [
  {
    year: 1900,
    city: 5000,
    county: 50000,      // Optional
    state: 1000000,     // Optional
    milestoneTitle: 'Turn of the Century',
    milestoneBody: 'Your city enters the 20th century...',
    sources: [
      { label: 'US Census 1900', url: 'https://census.gov/...' }
    ],
  },
  // ... more years
]

// Define your narrative chapters
export const yourCityChapters: StoryChapter[] = [
  {
    id: 'early-days',
    title: 'Early Days',
    startYear: 1900,
    endYear: 1950,
    takeaway: 'Your city establishes itself',
    detail: 'The early years saw...',
    metricHighlights: [
      { label: 'Population Growth', value: '+200%', note: '1900-1950' },
    ],
  },
  // ... more chapters
]

// Create your config
export const yourCityConfig: CityDataStoryConfig = {
  cityName: 'Your City',
  countyName: 'Your County',
  stateName: 'Your State',
  established: 1850,
  theme: {
    accentClassName: 'blue', // 'gold' | 'blue' | 'pine' | 'lake' | 'rust'
  },
  data: yourCityData,
  chapters: yourCityChapters,
}
```

### Step 2: Use in Your Page

```tsx
import { CityDataStory } from '@/components/sections/CityDataStory'
import { yourCityConfig } from '@/lib/data/yourCity'

export default function YourCityDataPage() {
  return (
    <section className="py-16 bg-charcoal-900">
      <div className="container">
        <CityDataStory config={yourCityConfig} />
      </div>
    </section>
  )
}
```

**That's it!** No component code changes needed.

---

## 📂 Where to Change Data

### For Auburn (Current City)

**Data Location**: `lib/data/cityThroughTime.ts`

**What to Update**:
1. `auburnThroughTimeData` - Population data points
2. `auburnStoryChapters` - Narrative chapters
3. `auburnDataStoryConfig` - City metadata

### For a New City

**Create New File**: `lib/data/yourCity.ts`

**Follow the Template**: See "How to Use for Another City" above

---

## 🎨 Features

### Desktop Layout
- Two-column layout (scrollable chapters + sticky visualization)
- Intersection Observer activates chapters as you scroll
- Keyboard navigation (Tab, Enter, Space, Arrow keys)

### Mobile Layout
- Stacked layout (visualization first)
- Accordion chapters (tap to expand)
- Touch-friendly 44×44px tap targets
- Swipe-friendly spacing

### Accessibility (WCAG 2.1 AA)
- ✅ **Keyboard Navigation**: Full functionality via keyboard
- ✅ **Screen Reader Support**: ARIA labels, live regions, semantic HTML
- ✅ **Motion Sensitivity**: Respects `prefers-reduced-motion`
- ✅ **Color Independence**: Information conveyed through multiple cues
- ✅ **Touch Targets**: Minimum 44×44px on all interactive elements
- ✅ **Contrast Ratios**: Text meets 4.5:1 minimum

### Performance
- ✅ Memoized calculations (no unnecessary rerenders)
- ✅ IntersectionObserver cleanup on unmount
- ✅ Lazy evaluation of chart data
- ✅ Optimized React component structure

---

## 🎯 Props

### `CityDataStory`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `CityDataStoryConfig` | `auburnDataStoryConfig` | Complete city configuration |
| `initialChapterIndex` | `number` | `0` | Starting chapter (0-indexed) |

### `CityDataStoryConfig`

```typescript
interface CityDataStoryConfig {
  cityName: string                    // Required: "Auburn"
  countyName?: string                 // Optional: "Placer County"
  stateName?: string                  // Optional: "California"
  established?: number                // Optional: 1849
  theme?: {
    accentClassName?: string          // Optional: 'gold' | 'blue' | 'pine' | 'lake' | 'rust'
  }
  data: CityThroughTimeRow[]         // Required: Population data
  chapters: StoryChapter[]            // Required: Narrative chapters
}
```

---

## 🔧 Customization

### Theme Colors

```typescript
const config: CityDataStoryConfig = {
  // ...
  theme: {
    accentClassName: 'blue', // Changes accent colors throughout
  },
}
```

**Available Themes**:
- `'gold'` (default) - Warm gold accents
- `'blue'` - Cool blue accents
- `'pine'` - Forest green accents
- `'lake'` - Teal/aqua accents
- `'rust'` - Warm orange/red accents

### Initial Chapter

```typescript
<CityDataStory 
  config={myConfig} 
  initialChapterIndex={2} // Start at 3rd chapter
/>
```

---

## 📊 Data Requirements

### Minimum Requirements
- **Data Points**: At least 5 (recommended: 10+)
- **Chapters**: At least 3 (recommended: 4-6)
- **Sources**: Cite all data sources

### Data Quality
- ✅ Use official sources (Census Bureau, state agencies)
- ✅ Cite every data point
- ✅ Ensure chronological order
- ✅ Provide context in milestones
- ✅ Connect data to historical events

### Chapter Coverage
- Chapters should cover the entire timeline
- No gaps (every year should belong to a chapter)
- Non-overlapping year ranges

---

## ♿ Accessibility Notes

### Keyboard Navigation

**Chart Interactions**:
- `Tab` - Navigate between data points
- `Enter` / `Space` - Select a year
- `Arrow Left/Right` - Move between points
- `Home` - Jump to first point
- `End` - Jump to last point
- `Escape` - Clear selection

**Chapter Navigation**:
- `Tab` - Navigate between chapters
- `Enter` / `Space` - Activate chapter
- `Arrow Up/Down` - Move between chapters (desktop)

### Screen Reader Support

All interactive elements have:
- Descriptive `aria-label` attributes
- Proper ARIA roles (`button`, `region`, etc.)
- Live regions for state changes
- Semantic HTML structure

### Motion Sensitivity

Component automatically respects user's motion preferences:
- Animations disabled if `prefers-reduced-motion: reduce`
- Smooth scrolling falls back to instant scroll
- Count-up animations disabled
- Chart transitions simplified

### Testing

Tested with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- Keyboard-only navigation
- Mobile touch navigation

---

## 🐛 Error Handling

### Missing Data

Component gracefully handles:
- Empty data arrays → Shows "No data available"
- Missing years → Skips gaps in visualization
- Missing county/state data → Hides comparison options
- Invalid numbers → Shows "N/A"

### Runtime Guards

```typescript
// Example: Safe data access
const activeRow = getActiveRow(data)
if (!activeRow) {
  return <EmptyState />
}
```

---

## 🎨 Microinteractions

### Hover States
- Chapters: Subtle background color change
- Chart points: Size increase + tooltip
- Buttons: Color shift + scale

### Active States
- Chapters: Border highlight + glow effect
- Chart points: Larger size + accent color
- Year scrubber: Background fill

### Transitions
- All transitions respect `prefers-reduced-motion`
- Smooth, subtle (200-300ms duration)
- Easing: `ease-out` for natural feel

---

## 📱 Mobile Optimization

### Layout Changes
- **Desktop**: Two-column (chapters + sticky viz)
- **Mobile**: Stacked (viz first, then accordion)

### Touch Targets
- Minimum 44×44px on all interactive elements
- Adequate spacing (8px minimum between elements)
- Large tap areas for chart points (20px radius)

### Performance
- IntersectionObserver auto-expands chapters on mobile
- Lazy rendering of chart elements
- Optimized for 3G networks

---

## 🔍 Troubleshooting

### "City name not showing"
**Solution**: Ensure `cityName` is set in config:
```typescript
const config = {
  cityName: 'YourCity', // Required
  // ...
}
```

### "Chart labels are generic"
**Solution**: Provide `countyName` and `stateName`:
```typescript
const config = {
  cityName: 'YourCity',
  countyName: 'Your County',
  stateName: 'Your State',
  // ...
}
```

### "Chapters not activating"
**Solution**: Ensure chapter year ranges cover all data:
```typescript
// ✅ Good: Continuous coverage
{ startYear: 1900, endYear: 1950 },
{ startYear: 1950, endYear: 2020 },

// ❌ Bad: Gap between 1950-1970
{ startYear: 1900, endYear: 1950 },
{ startYear: 1970, endYear: 2020 },
```

---

## 📚 Additional Documentation

- **Platform Engineer's Guide**: `PLATFORM_ENGINEER_GUIDE.md`
- **Quick Reference**: `QUICK_REFERENCE_CONFIG.md`
- **Refactor Summary**: `REFACTOR_SUMMARY.md`
- **Migration Guide**: `MIGRATION_GUIDE.md`

---

## 🏗️ Architecture

### Component Structure

```
CityDataStory (Provider wrapper)
  └─ CityDataStoryContent (Main layout)
      ├─ Header (Title + description)
      ├─ ComparisonControls (City/County/State toggle)
      ├─ Mobile Layout
      │   ├─ VisualizationPanel (Sticky)
      │   └─ Accordion Chapters
      └─ Desktop Layout
          ├─ Chapter Cards (Scrollable)
          └─ VisualizationPanel (Sticky)
```

### State Management

Uses React Context (`StoryStoreProvider`) for shared state:
- `activeYear` - Currently selected year
- `hoveredYear` - Year being hovered
- `compareMode` - City/County/State comparison mode

### Sub-Components

- **PopulationChart**: Interactive SVG chart with keyboard navigation
- **StatsPanel**: Displays population, growth, and milestones
- **StoryChapters**: Scrollytelling narrative cards
- **ComparisonControls**: Toggle between comparison modes
- **YearScrubber**: Quick decade navigation

---

## 🚀 Performance Tips

### Optimization Checklist
- [x] Memoized calculations (`useMemo`, `useCallback`)
- [x] IntersectionObserver cleanup on unmount
- [x] Lazy evaluation of derived data
- [x] Minimal re-renders (React.memo where appropriate)
- [x] Efficient event handlers (debounced where needed)

### Best Practices
- Keep data arrays small (10-15 points ideal)
- Avoid deep nesting in chapters
- Use semantic HTML for better performance
- Leverage CSS for animations (not JS)

---

## 📄 License

Part of the Visit Auburn project. See main project LICENSE.

---

## 🤝 Contributing

To contribute improvements:
1. Test with real data from multiple cities
2. Ensure accessibility compliance (WCAG 2.1 AA)
3. Add tests for new features
4. Update documentation

---

**Built with ❤️ for civic technologists and municipal governments.**

*Last updated: January 9, 2026*
