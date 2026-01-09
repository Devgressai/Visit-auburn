# CityDataStory Component

A world-class scrollytelling visualization component for civic data storytelling, inspired by UnderstandingHouston.org and NYT Graphics.

## 📋 Overview

`CityDataStory` is an accessible, responsive scrollytelling component that combines:
- **Sticky visualizations** that update as you scroll
- **Narrative chapters** with historical context
- **Interactive controls** for data comparison
- **Keyboard navigation** and WCAG 2.1 AA compliance
- **Mobile-first design** with touch-friendly interactions

---

## 🚀 Quick Start

### Basic Usage

```tsx
import { CityDataStory } from '@/components/sections/CityDataStory'

export default function DataStoryPage() {
  return <CityDataStory />
}
```

That's it! The component uses Auburn data by default.

---

## 📦 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `CityThroughTimeRow[]` | `auburnThroughTimeData` | Population data points |
| `chapters` | `StoryChapter[]` | `auburnStoryChapters` | Narrative chapters |
| `config` | `CityConfig` | `auburnConfig` | City configuration |
| `initialChapterIndex` | `number` | `0` | Starting chapter (0-indexed) |

---

## 🎨 Features

### Desktop Layout

```
┌─────────────────────────────────────────────────────┐
│                    HEADER                           │
│              Auburn Through Time                    │
├──────────────────────┬──────────────────────────────┤
│                      │                              │
│  SCROLLABLE          │   STICKY VISUALIZATION       │
│  CHAPTERS            │   ┌──────────────────────┐   │
│  ┌────────────────┐  │   │  Population Chart   │   │
│  │ Chapter 1      │  │   │                     │   │
│  │ 1900-1930      │  │   │  [Chart Here]       │   │
│  │ Gold Rush...   │  │   │                     │   │
│  └────────────────┘  │   └──────────────────────┘   │
│  ┌────────────────┐  │   ┌──────────────────────┐   │
│  │ Chapter 2      │  │   │  Stats Cards        │   │
│  │ 1930-1950      │  │   │  Year: 1930         │   │
│  │ Depression...  │  │   │  Pop: 2,800         │   │
│  └────────────────┘  │   └──────────────────────┘   │
│  ┌────────────────┐  │   ┌──────────────────────┐   │
│  │ Chapter 3      │  │   │  Milestone          │   │
│  │ 1950-1970      │  │   │  The Great...       │   │
│  │ Interstate...  │  │   └──────────────────────┘   │
│  └────────────────┘  │                              │
│                      │                              │
└──────────────────────┴──────────────────────────────┘
```

### Mobile Layout

```
┌─────────────────────────┐
│       HEADER            │
│  Auburn Through Time    │
├─────────────────────────┤
│  STICKY VISUALIZATION   │
│  ┌───────────────────┐  │
│  │  Population Chart │  │
│  │  [Chart Here]     │  │
│  └───────────────────┘  │
├─────────────────────────┤
│  ACCORDION CHAPTERS     │
│  ▼ Chapter 1 (Active)   │
│  ┌───────────────────┐  │
│  │ 1900-1930         │  │
│  │ Gold Rush Legacy  │  │
│  │ [Content...]      │  │
│  └───────────────────┘  │
│  ▶ Chapter 2            │
│  ▶ Chapter 3            │
└─────────────────────────┘
```

---

## 🎯 Key Interactions

### Scroll Activation

As you scroll through chapters, the visualization automatically updates:

1. **IntersectionObserver** detects which chapter is in view (>50% visible)
2. **Active chapter** is highlighted with gold ring
3. **Visualization updates** to show data for that chapter's end year
4. **Smooth transitions** (respects `prefers-reduced-motion`)

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate between chapters |
| `Enter` / `Space` | Activate focused chapter |
| `↓` | Move to next chapter |
| `↑` | Move to previous chapter |

### Comparison Controls

Toggle between three modes:
- **City Only**: Show city population
- **+ County**: Add county comparison
- **+ State**: Add state comparison

### Year Scrubber (Desktop)

Click decade buttons to jump to specific years.

---

## ♿ Accessibility Features

### WCAG 2.1 AA Compliant

- ✅ **Keyboard navigable**: All interactive elements accessible via keyboard
- ✅ **Screen reader friendly**: Semantic HTML with proper ARIA labels
- ✅ **Focus indicators**: Visible focus rings on all interactive elements
- ✅ **Color contrast**: Meets 4.5:1 ratio for text
- ✅ **Reduced motion**: Respects `prefers-reduced-motion` preference
- ✅ **Touch targets**: Minimum 48px for mobile interactions

### Semantic HTML

```html
<section aria-labelledby="data-story-title">
  <h1 id="data-story-title">Auburn Through Time</h1>
  
  <nav aria-label="Story chapters">
    <article role="button" tabindex="0" aria-current="true">
      <!-- Chapter content -->
    </article>
  </nav>
  
  <div role="group" aria-label="Comparison mode">
    <button aria-pressed="true">City Only</button>
    <button aria-pressed="false">+ County</button>
  </div>
</section>
```

---

## 📱 Responsive Design

### Breakpoints

| Size | Layout | Features |
|------|--------|----------|
| `< 768px` | Mobile | Stacked layout, accordion chapters, sticky viz at top |
| `768px - 1024px` | Tablet | Two-column layout, simplified controls |
| `> 1024px` | Desktop | Full layout with year scrubber |

### Mobile Optimizations

- **Sticky visualization** at top (always visible)
- **Accordion chapters** (tap to expand/collapse)
- **Touch-friendly controls** (48px minimum)
- **Simplified chart** (fewer data points for clarity)
- **Horizontal scroll** disabled (vertical only)

---

## 🎨 Styling & Theming

### Tailwind Classes Used

The component uses existing Visit-Auburn design tokens:

**Colors:**
- `gold-*` - Primary accent (active states, highlights)
- `pine-*` - Secondary accent (info boxes, buttons)
- `charcoal-*` - Text and borders
- `cream-*` - Backgrounds
- `lake-*` - County/state data

**Typography:**
- `font-display` - Headings (Playfair Display)
- `font-sans` - Body text (Inter)
- `section-title-light` - Main titles
- `section-eyebrow-light` - Overlines

**Components:**
- `shadow-card` - Card shadows
- `shadow-card-hover` - Hover shadows
- `btn-*` - Button styles (from globals.css)

### Custom Styling

Override with Tailwind classes:

```tsx
<div className="my-custom-wrapper">
  <CityDataStory />
</div>
```

Or wrap with styled container:

```tsx
<div className="bg-gradient-to-b from-gold-50 to-cream-50 py-20">
  <CityDataStory />
</div>
```

---

## 🔧 Advanced Usage

### Custom Data (Porting to Another City)

```tsx
import { CityDataStory } from '@/components/sections/CityDataStory'

const myData = [
  {
    year: 1900,
    city: 50000,
    county: 100000,
    state: 1485000,
    milestoneTitle: 'Turn of Century',
    milestoneBody: 'City description...',
    sources: [{ label: 'US Census 1900' }],
  },
  // ... more data
]

const myChapters = [
  {
    id: 'chapter-1',
    title: 'Early Growth',
    startYear: 1900,
    endYear: 1930,
    takeaway: 'Key insight...',
    detail: 'Detailed narrative...',
    metricHighlights: [
      { label: 'Growth', value: '+50%' },
    ],
  },
  // ... more chapters
]

const myConfig = {
  name: 'My City',
  county: 'My County',
  state: 'California',
  established: 1850,
  dataStartYear: 1900,
  dataEndYear: 2020,
}

export default function MyDataStory() {
  return (
    <CityDataStory 
      data={myData}
      chapters={myChapters}
      config={myConfig}
    />
  )
}
```

### Start with Specific Chapter

```tsx
<CityDataStory initialChapterIndex={2} />
```

### Lazy Loading

```tsx
import dynamic from 'next/dynamic'

const CityDataStory = dynamic(
  () => import('@/components/sections/CityDataStory').then(m => m.CityDataStory),
  { ssr: false }
)
```

---

## 🧩 Sub-Components

The component exports several sub-components for advanced customization:

### VisualizationPanel

The sticky chart and stats panel.

```tsx
import { VisualizationPanel } from '@/components/sections/CityDataStory'

<VisualizationPanel data={data} chapters={chapters} />
```

### ChapterContent

Individual chapter content (takeaway, detail, metrics).

```tsx
import { ChapterContent } from '@/components/sections/CityDataStory'

<ChapterContent chapter={chapter} />
```

### ComparisonControls

City/County/State toggle buttons.

```tsx
import { ComparisonControls } from '@/components/sections/CityDataStory'

<ComparisonControls />
```

### YearScrubber

Decade jump buttons (desktop only).

```tsx
import { YearScrubber } from '@/components/sections/CityDataStory'

<YearScrubber data={data} />
```

---

## 🔗 Integration with Store

The component uses `StoryStoreProvider` internally. All child components have access to:

```tsx
import { useStoryStore } from '@/components/sections/CityDataStory'

function MyCustomComponent() {
  const {
    activeYear,
    hoveredYear,
    compareMode,
    setActiveYear,
    getActiveRow,
    formatPopulation,
  } = useStoryStore()

  // Your custom logic
}
```

See `storyStore.ts` documentation for full API.

---

## 📊 Placeholder Chart

The component includes a simple SVG chart as a placeholder. To replace with Recharts:

1. Install Recharts: `npm install recharts`
2. Create a new `Chart.tsx` component
3. Replace `PlaceholderChart` in `CityDataStory.tsx`

Example:

```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function RealChart({ data }: { data: CityThroughTimeRow[] }) {
  const chartData = data.map(d => ({
    year: d.year,
    population: d.city,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="population" stroke="#2D5A27" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Desktop layout renders correctly
- [ ] Mobile layout renders correctly
- [ ] Scroll activation works (chapters update viz)
- [ ] Keyboard navigation works (Tab, Enter, Arrows)
- [ ] Comparison toggle works (City/County/State)
- [ ] Year scrubber works (desktop)
- [ ] Accordion works (mobile)
- [ ] Reduced motion respected
- [ ] Focus indicators visible
- [ ] Screen reader announces changes

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🐛 Troubleshooting

### Visualization not updating on scroll

**Cause**: IntersectionObserver not detecting chapters

**Fix**: Ensure chapters have unique refs and are properly rendered

### Keyboard navigation not working

**Cause**: Missing `tabIndex` or `onKeyDown` handlers

**Fix**: Verify all chapter cards have `tabIndex={0}` and key handlers

### Mobile accordion not expanding

**Cause**: State not updating

**Fix**: Check `expandedChapters` state and `toggleChapter` function

### Reduced motion not working

**Cause**: `useReducedMotion` not imported

**Fix**: Ensure `framer-motion` is installed and hook is used

---

## 📚 Related Documentation

- **Store API**: See `storyStore.ts` and `README.md`
- **Data Model**: See `/lib/data/cityThroughTime.ts`
- **Usage Examples**: See `CityDataStory.example.tsx`
- **Implementation Summary**: See `IMPLEMENTATION_SUMMARY.md`

---

## 🚀 Next Steps

1. **Replace placeholder chart** with Recharts or D3
2. **Add real Census data** (replace seed data)
3. **Implement data export** (CSV, JSON)
4. **Add print styles**
5. **Create embed codes** for external sites
6. **Add social sharing** buttons
7. **Implement analytics** tracking
8. **Create video walkthrough**

---

## 📄 License

Part of the Visit-Auburn project. See main project LICENSE.

