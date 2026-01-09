# PopulationChart Component

An accessible, interactive SVG chart for visualizing population data over time with full keyboard navigation and screen reader support.

## 📋 Overview

The `PopulationChart` component is a production-ready, WCAG 2.1 AA compliant data visualization that:
- Uses custom SVG rendering (no external chart library needed)
- Implements full keyboard navigation with roving tabindex
- Provides accessible tooltips (not hover-only)
- Synchronizes with shared state for coordinated interactions
- Respects user preferences (reduced motion, color blindness)
- Works seamlessly on mobile and desktop

---

## 🚀 Quick Start

### Basic Usage

```tsx
import { PopulationChart } from '@/components/sections/CityDataStory'
import { StoryStoreProvider } from '@/components/sections/CityDataStory'
import { auburnThroughTimeData } from '@/lib/data/cityThroughTime'

export function MyPage() {
  return (
    <StoryStoreProvider>
      <PopulationChart data={auburnThroughTimeData} />
    </StoryStoreProvider>
  )
}
```

---

## 📦 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `CityThroughTimeRow[]` | required | Population data points |
| `width` | `number` | `800` | Initial width (responsive) |
| `height` | `number` | `400` | Initial height (responsive) |
| `className` | `string` | `''` | Additional CSS classes |
| `showLegend` | `boolean` | `true` | Show legend below chart |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `showAxes` | `boolean` | `true` | Show X and Y axes |

---

## ✨ Features

### 🎯 Interactive

- **Click**: Set active year
- **Hover**: Highlight year (show tooltip)
- **Focus**: Keyboard-accessible tooltips
- **Drag**: (Future enhancement)

### ⌨️ Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from chart points |
| `Enter` / `Space` | Select active year |
| `→` | Move to next data point |
| `←` | Move to previous data point |
| `Home` | Jump to first data point |
| `End` | Jump to last data point |
| `Escape` | Clear selection and close tooltip |

### ♿ Accessibility Features

#### WCAG 2.1 AA Compliant

- ✅ **Keyboard navigable**: All interactions work without mouse
- ✅ **Screen reader friendly**: Proper ARIA labels and live regions
- ✅ **Focus indicators**: Visible 2px gold ring on focused points
- ✅ **Non-color cues**: Size, stroke, and patterns (not just color)
- ✅ **Accessible tooltips**: Show on focus, not just hover
- ✅ **Reduced motion**: Respects `prefers-reduced-motion`
- ✅ **Touch-friendly**: 40px hit areas for mobile

#### Visual Cues (Beyond Color)

1. **Active Point**:
   - Larger size (10px radius vs 5px)
   - Gold color (#D4A017)
   - Thick stroke (3px)
   - Dashed ring indicator

2. **Hovered/Focused Point**:
   - Medium size (7px radius)
   - Darker green stroke
   - Scale animation (1.1x)

3. **Normal Point**:
   - Small size (5px radius)
   - Forest green (#2D5A27)
   - No stroke

#### Screen Reader Support

```html
<!-- Chart has descriptive label -->
<svg role="img" aria-label="Population over time line chart">

<!-- Each point is a button with label -->
<circle 
  role="button" 
  aria-label="2020: Population 14,000"
  aria-pressed="true"
  tabindex="0"
/>

<!-- Live region announces changes -->
<div role="status" aria-live="polite" aria-atomic="true">
  Active year: 2020
</div>

<!-- Instructions for screen readers -->
<div class="sr-only" id="chart-instructions">
  Use Tab to navigate between data points. 
  Press Enter or Space to select a year. 
  Use Arrow keys to move between points.
</div>
```

---

## 🎨 Visual Design

### Color Palette

- **City Line**: Forest Green (#2D5A27) - Solid 3px line
- **County Line**: Lake Blue (#4BA3C7) - Dashed 2px line
- **Active Point**: Gold (#D4A017) - 10px circle
- **Hover Point**: Dark Pine (#1F6B4D) - 7px circle
- **Grid Lines**: Light Gray (#E5E5E5) - Dashed 1px
- **Axes**: Charcoal (#525252) - Solid 2px

### Non-Color Visual Cues

1. **Line Styles**:
   - City: Solid line
   - County: Dashed line (5px dash, 5px gap)
   - State: Dotted line (future)

2. **Point Sizes**:
   - Active: 10px radius
   - Hovered/Focused: 7px radius
   - Normal: 5px radius

3. **Stroke Patterns**:
   - Active: Dashed ring (3px dash, 3px gap)
   - Focused: Solid ring
   - Normal: No ring

---

## 📊 Technical Implementation

### Custom SVG Rendering

The chart uses pure SVG with custom scaling functions (no d3 dependency):

```typescript
// Linear scale (like d3.scaleLinear)
function createScale(
  domain: [number, number],
  range: [number, number]
): (value: number) => number

// Usage
const xScale = createScale([1900, 2020], [0, chartWidth])
const yScale = createScale([0, maxPopulation], [chartHeight, 0])

const x = xScale(year)  // Convert year to pixel position
const y = yScale(population)  // Convert population to pixel position
```

### Responsive Sizing

Uses `ResizeObserver` to adapt to container width:

```typescript
useEffect(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width } = entry.contentRect
      setDimensions({
        width,
        height: width * 0.5, // Maintain aspect ratio
      })
    }
  })
  
  resizeObserver.observe(svgRef.current)
  return () => resizeObserver.disconnect()
}, [])
```

### Smooth Animations

Uses Framer Motion for smooth transitions:

```typescript
<motion.path
  d={lineData}
  initial={{ pathLength: 0, opacity: 0 }}
  animate={{ pathLength: 1, opacity: 1 }}
  transition={{ duration: 1, ease: 'easeInOut' }}
/>

<motion.circle
  animate={{ scale: isActive ? 1.2 : 1 }}
  transition={{ duration: 0.2 }}
/>
```

### Roving Tabindex

Implements keyboard navigation pattern:

```typescript
// Only one point is tabbable at a time
<circle
  tabIndex={index === focusedIndex ? 0 : -1}
  onKeyDown={(e) => {
    if (e.key === 'ArrowRight') {
      setFocusedIndex(index + 1)
    }
  }}
/>
```

---

## 🔗 State Integration

The chart integrates with `StoryStore` for coordinated interactions:

```typescript
const {
  activeYear,        // Currently selected year
  hoveredYear,       // Year being hovered
  compareMode,       // 'city' | 'county' | 'state'
  setActiveYear,     // Click handler
  setHoveredYear,    // Hover handler
  formatPopulation,  // Number formatter
} = useStoryStore()

// Click point → update active year
<circle onClick={() => setActiveYear(point.year)} />

// Hover point → update hovered year
<circle onMouseEnter={() => setHoveredYear(point.year)} />

// Compare mode → show/hide county/state lines
{compareMode !== 'city' && <path d={countyLine} />}
```

---

## 📱 Responsive Behavior

### Desktop (> 1024px)
- Full chart with all features
- Hover tooltips
- Keyboard navigation
- Year scrubber

### Tablet (768px - 1024px)
- Medium-sized chart
- Touch + hover tooltips
- Simplified grid

### Mobile (< 768px)
- Compact chart (300px height)
- Touch-only tooltips
- Larger hit areas (40px)
- Simplified axes

---

## 🎯 Usage Examples

### Example 1: Basic Chart

```tsx
<PopulationChart data={auburnThroughTimeData} />
```

### Example 2: Custom Size

```tsx
<PopulationChart 
  data={auburnThroughTimeData}
  width={600}
  height={300}
/>
```

### Example 3: Minimal Chart

```tsx
<PopulationChart 
  data={auburnThroughTimeData}
  showLegend={false}
  showGrid={false}
  showAxes={false}
/>
```

### Example 4: With Controls

```tsx
import { ComparisonControls } from '@/components/sections/CityDataStory'

<div className="space-y-6">
  <ComparisonControls />
  <PopulationChart data={auburnThroughTimeData} />
</div>
```

### Example 5: Filtered Data

```tsx
const modernData = auburnThroughTimeData.filter(d => d.year >= 1950)

<PopulationChart data={modernData} />
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] Tab to first data point
- [ ] Arrow keys navigate between points
- [ ] Enter/Space activates point
- [ ] Home/End jump to first/last
- [ ] Escape clears selection
- [ ] Focus indicators visible

#### Screen Reader
- [ ] Chart has descriptive label
- [ ] Points have meaningful labels
- [ ] State changes announced
- [ ] Instructions available

#### Mouse/Touch
- [ ] Click activates point
- [ ] Hover shows tooltip
- [ ] Touch shows tooltip
- [ ] Tooltip follows cursor

#### Visual
- [ ] Active point clearly marked
- [ ] Hovered point highlighted
- [ ] Non-color cues present
- [ ] Animations smooth

#### Responsive
- [ ] Adapts to container width
- [ ] Maintains aspect ratio
- [ ] Mobile layout works
- [ ] Touch targets adequate

### Accessibility Testing

```bash
# Lighthouse
npm run build
lighthouse http://localhost:3000/data-story --view

# axe DevTools
# Install browser extension and run audit

# Screen Reader
# Test with NVDA (Windows), JAWS (Windows), VoiceOver (Mac)
```

---

## 🛠️ Utility Functions

### formatCompact

Format large numbers with K/M suffixes:

```typescript
formatCompact(1500)      // "1.5K"
formatCompact(1500000)   // "1.5M"
formatCompact(500)       // "500"
```

### formatFull

Format with full locale formatting:

```typescript
formatFull(13330)        // "13,330"
formatFull(1500000)      // "1,500,000"
```

### getNiceTicks

Generate nice axis tick values:

```typescript
getNiceTicks(0, 15000, 5)  // [0, 5000, 10000, 15000]
getNiceTicks(0, 147, 5)    // [0, 50, 100, 150]
```

### createScale

Create linear scale function:

```typescript
const xScale = createScale([1900, 2020], [0, 800])
xScale(1960)  // 400 (middle of range)
```

---

## 🎨 Customization

### Custom Colors

Override colors via Tailwind classes:

```tsx
<PopulationChart 
  data={data}
  className="[&_path]:stroke-blue-500 [&_circle]:fill-red-500"
/>
```

### Custom Tooltip

Replace the default tooltip:

```tsx
import { ChartTooltip } from '@/components/sections/CityDataStory'

// Custom implementation
function MyTooltip({ data }) {
  return (
    <div className="custom-tooltip">
      {/* Your custom tooltip */}
    </div>
  )
}
```

### Custom Legend

Replace the default legend:

```tsx
import { ChartLegend } from '@/components/sections/CityDataStory'

// Custom implementation
function MyLegend({ compareMode }) {
  return (
    <div className="custom-legend">
      {/* Your custom legend */}
    </div>
  )
}
```

---

## 🐛 Troubleshooting

### Chart not rendering

**Cause**: Missing `StoryStoreProvider`

**Fix**: Wrap component in provider:

```tsx
<StoryStoreProvider>
  <PopulationChart data={data} />
</StoryStoreProvider>
```

### Keyboard navigation not working

**Cause**: Points not focusable

**Fix**: Ensure `tabIndex={0}` on points and `onKeyDown` handler present

### Tooltip not showing on focus

**Cause**: Tooltip only shows on hover

**Fix**: Tooltip should show on both `onMouseEnter` and `onFocus`

### Chart too small on mobile

**Cause**: Fixed dimensions

**Fix**: Chart uses `ResizeObserver` - ensure container has width

---

## 📚 Related Documentation

- **Main Component**: See `CityDataStory.tsx`
- **Store API**: See `storyStore.ts` and `README.md`
- **Data Model**: See `/lib/data/cityThroughTime.ts`
- **Usage Examples**: See `PopulationChart.example.tsx`

---

## 🚀 Future Enhancements

### Planned Features

1. **Zoom & Pan**: Allow users to zoom into specific time periods
2. **Data Export**: Export chart as PNG/SVG
3. **Annotations**: Add milestone markers on the chart
4. **Comparison Mode**: Overlay multiple cities
5. **Animation Controls**: Play/pause timeline animation
6. **Touch Gestures**: Pinch to zoom, swipe to pan

### Performance Optimizations

1. **Canvas Rendering**: For very large datasets (>100 points)
2. **Virtual Scrolling**: For long timelines
3. **Web Workers**: Offload calculations
4. **Memoization**: Cache expensive calculations

---

## 📄 License

Part of the Visit-Auburn project. See main project LICENSE.

