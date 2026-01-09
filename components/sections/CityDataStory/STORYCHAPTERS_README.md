# StoryChapters Component

A card-based navigation system for scrollytelling experiences. Each chapter card represents a thematic time period with rich visual hierarchy, interactive states, and IntersectionObserver integration.

## 🎯 Features

### Visual Hierarchy
- **Chapter Title** - Large, bold display font
- **Year Range** - Pill badge showing time span
- **Takeaway** - Bold thesis statement
- **Detail Text** - 1-2 paragraph narrative
- **Metric Highlights** - Chip-style data callouts

### Interactive States
- **Hover** - Subtle border and background changes
- **Active** - Pine accent color, glow effect, left indicator bar
- **Focus** - Clear focus ring for keyboard navigation
- **Distinct States** - Active state clearly different from hover

### Behavior
- **Click Navigation** - Clicking a card sets `activeYear` to `chapter.endYear`
- **Scroll Activation** - Cards auto-activate when scrolled into view (via IntersectionObserver)
- **Manual Scrubbing** - Clicking temporarily disables auto-activation (2 seconds)
- **Reset Control** - "Reset to Start" button returns to initial state

### Accessibility
- ✅ Keyboard navigable (Tab, Enter, Space)
- ✅ Clear focus indicators
- ✅ ARIA labels and roles
- ✅ Screen reader status announcements
- ✅ Semantic HTML structure

---

## 📦 Installation

The component is already part of the CityDataStory module:

```tsx
import { StoryChapters } from '@/components/sections/CityDataStory'
```

---

## 🚀 Quick Start

### Basic Usage

```tsx
import { StoryChapters, StoryStoreProvider } from '@/components/sections/CityDataStory'
import { auburnStoryChapters } from '@/lib/data/cityThroughTime'

export function MyScrollytelling() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <StoryChapters chapters={auburnStoryChapters} />
    </StoryStoreProvider>
  )
}
```

### Scrollytelling Layout (Side-by-Side)

```tsx
export function ScrollytellingLayout() {
  return (
    <StoryStoreProvider initialYear={1900}>
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left: Sticky Visualization */}
        <div className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:items-center">
          <YourChart />
        </div>

        {/* Right: Scrolling Chapters */}
        <div className="py-8">
          <StoryChapters chapters={auburnStoryChapters} />
        </div>
      </div>
    </StoryStoreProvider>
  )
}
```

---

## 🎨 API Reference

### Props

```tsx
interface StoryChaptersProps {
  /** Array of story chapters to display */
  chapters: StoryChapter[]
  
  /** Whether to enable IntersectionObserver auto-activation (default: true) */
  enableAutoActivation?: boolean
  
  /** Intersection threshold (0-1, default: 0.5) */
  intersectionThreshold?: number
  
  /** Root margin for intersection observer (default: '-20% 0px -20% 0px') */
  intersectionRootMargin?: string
  
  /** Callback when a chapter is activated */
  onChapterActivate?: (chapter: StoryChapter) => void
  
  /** Custom className for container */
  className?: string
}
```

### StoryChapter Type

```tsx
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

## 🎯 Common Patterns

### Pattern 1: Track Chapter Views

```tsx
function MyScrollytelling() {
  const handleChapterActivate = (chapter) => {
    console.log('Viewing:', chapter.title)
    
    // Track with analytics
    gtag('event', 'chapter_view', {
      chapter_id: chapter.id,
      chapter_title: chapter.title,
    })
  }

  return (
    <StoryStoreProvider initialYear={1900}>
      <StoryChapters 
        chapters={auburnStoryChapters}
        onChapterActivate={handleChapterActivate}
      />
    </StoryStoreProvider>
  )
}
```

### Pattern 2: Custom Intersection Settings

```tsx
<StoryChapters 
  chapters={auburnStoryChapters}
  intersectionThreshold={0.6}
  intersectionRootMargin="-10% 0px -10% 0px"
/>
```

**When to adjust:**
- `intersectionThreshold`: Higher = card must be more visible to activate
- `intersectionRootMargin`: Negative margins = activate when card is more centered

### Pattern 3: Manual Control Only

```tsx
<StoryChapters 
  chapters={auburnStoryChapters}
  enableAutoActivation={false}
/>
```

**Use case:** When you want users to explicitly click chapters, not auto-activate on scroll.

### Pattern 4: Filtered Chapters

```tsx
// Show only modern chapters
const modernChapters = auburnStoryChapters.filter(
  chapter => chapter.startYear >= 1950
)

<StoryChapters chapters={modernChapters} />
```

### Pattern 5: Mobile-Optimized Layout

```tsx
<div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-16">
  {/* Mobile: Chart first, Desktop: Chart left */}
  <div className="order-2 lg:order-1 lg:sticky lg:top-24">
    <YourChart />
  </div>

  {/* Mobile: Chapters second, Desktop: Chapters right */}
  <div className="order-1 lg:order-2 py-8">
    <StoryChapters chapters={auburnStoryChapters} />
  </div>
</div>
```

---

## 🎨 Styling Guide

### Active State Styling

The component uses these CSS classes for active state:

```css
/* Active card */
bg-pine-500/10          /* Pine background tint */
border-pine-500         /* Pine border */
shadow-glow-pine        /* Pine glow effect */

/* Active indicator bar */
w-1 bg-pine-500         /* Left edge indicator */

/* Active text */
text-pine-400           /* Title color */
text-white              /* Takeaway color */
```

### Hover State Styling

```css
/* Hover card */
border-white/30         /* Brighter border */
bg-white/10             /* Brighter background */

/* Hover text */
text-pine-300           /* Title color */
text-white              /* Takeaway color */
```

### Custom Styling

Override with `className` prop:

```tsx
<StoryChapters 
  chapters={auburnStoryChapters}
  className="max-w-2xl mx-auto"
/>
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Click Navigation**: Clicking a card activates it
- [ ] **Scroll Activation**: Scrolling activates cards automatically
- [ ] **Manual Scrubbing**: Clicking disables auto-activation temporarily
- [ ] **Reset Button**: Reset returns to initial state
- [ ] **Keyboard Navigation**: Tab, Enter, Space work correctly
- [ ] **Focus Indicators**: Focus ring visible on keyboard navigation
- [ ] **Screen Reader**: Announcements work correctly
- [ ] **Mobile**: Layout works on small screens
- [ ] **Hover States**: Hover effects work on desktop
- [ ] **Active States**: Active state clearly distinct from hover

### Automated Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { StoryChapters } from './StoryChapters'
import { StoryStoreProvider } from './storyStore'
import { auburnStoryChapters } from '@/lib/data/cityThroughTime'

describe('StoryChapters', () => {
  it('renders all chapters', () => {
    render(
      <StoryStoreProvider>
        <StoryChapters chapters={auburnStoryChapters} />
      </StoryStoreProvider>
    )
    
    expect(screen.getByText('Gold Rush Legacy')).toBeInTheDocument()
    expect(screen.getByText('Modern Auburn')).toBeInTheDocument()
  })

  it('activates chapter on click', () => {
    const handleActivate = jest.fn()
    
    render(
      <StoryStoreProvider>
        <StoryChapters 
          chapters={auburnStoryChapters}
          onChapterActivate={handleActivate}
        />
      </StoryStoreProvider>
    )
    
    fireEvent.click(screen.getByText('Gold Rush Legacy'))
    expect(handleActivate).toHaveBeenCalledWith(auburnStoryChapters[0])
  })
})
```

---

## 🔧 Customization

### Custom Chapter Data

Create your own chapters:

```tsx
const myChapters: StoryChapter[] = [
  {
    id: 'chapter-1',
    title: 'The Beginning',
    startYear: 1900,
    endYear: 1920,
    takeaway: 'A city is born',
    detail: 'In the early 1900s, our city began to take shape...',
    metricHighlights: [
      { label: 'Population', value: '5,000', note: 'Census 1900' },
      { label: 'Growth', value: '+150%', note: '1900-1920' },
    ],
  },
  // ... more chapters
]

<StoryChapters chapters={myChapters} />
```

### Custom Intersection Behavior

```tsx
<StoryChapters 
  chapters={auburnStoryChapters}
  // Activate when 60% visible
  intersectionThreshold={0.6}
  // Activate when in center 50% of viewport
  intersectionRootMargin="-25% 0px -25% 0px"
/>
```

### Custom Callbacks

```tsx
function MyScrollytelling() {
  const handleChapterActivate = (chapter) => {
    // Update URL hash
    window.location.hash = chapter.id
    
    // Track analytics
    trackEvent('chapter_view', chapter.id)
    
    // Update external state
    setCurrentChapter(chapter)
  }

  return (
    <StoryChapters 
      chapters={auburnStoryChapters}
      onChapterActivate={handleChapterActivate}
    />
  )
}
```

---

## 🐛 Troubleshooting

### Issue: Auto-activation not working

**Cause:** IntersectionObserver not supported or disabled

**Fix:**
```tsx
// Check browser support
if ('IntersectionObserver' in window) {
  // Use auto-activation
} else {
  // Fallback to manual only
  <StoryChapters enableAutoActivation={false} />
}
```

### Issue: Cards activate too early/late

**Cause:** Intersection settings need tuning

**Fix:**
```tsx
// Activate when more visible
<StoryChapters intersectionThreshold={0.7} />

// Activate when more centered
<StoryChapters intersectionRootMargin="-30% 0px -30% 0px" />
```

### Issue: Manual scrubbing doesn't work

**Cause:** Timeout too short or disabled

**Fix:** The component has a 2-second timeout after clicking. If you need longer:

```tsx
// Modify in StoryChapters.tsx
manualScrubbingTimeoutRef.current = setTimeout(() => {
  setIsManualScrubbing(false)
}, 3000) // 3 seconds instead of 2
```

### Issue: Active state not showing

**Cause:** `activeYear` not set or outside chapter range

**Fix:**
```tsx
// Check initial year
<StoryStoreProvider initialYear={1900}>
  <StoryChapters chapters={auburnStoryChapters} />
</StoryStoreProvider>

// Debug active year
const { activeYear } = useStoryStore()
console.log('Active year:', activeYear)
```

---

## 📚 Related Components

- **[StoryStore](./storyStore.ts)** - Shared state management
- **[PopulationChart](./PopulationChart.tsx)** - Visualization component
- **[CityDataStory](./CityDataStory.tsx)** - Main section component

---

## 📖 Further Reading

- **[QUICK_START.md](./QUICK_START.md)** - Get started quickly
- **[README.md](./README.md)** - Full API reference
- **[StoryChapters.example.tsx](./StoryChapters.example.tsx)** - 12 usage examples
- **[cityThroughTime.ts](../../lib/data/cityThroughTime.ts)** - Data structure

---

## 🎓 Best Practices

### DO ✅

- Use semantic chapter titles that tell a story
- Keep takeaways concise (1 sentence)
- Limit metric highlights to 3-5 per chapter
- Test on mobile devices
- Provide meaningful year ranges
- Use consistent time periods across chapters

### DON'T ❌

- Don't use overly long detail text (keep to 2-3 sentences)
- Don't overlap chapter year ranges
- Don't skip IntersectionObserver polyfill for older browsers
- Don't forget to wrap in `StoryStoreProvider`
- Don't use too many metric highlights (clutters UI)

---

## 🚀 Performance

### Optimization Tips

1. **Memoize chapters array** if it's computed:
   ```tsx
   const chapters = useMemo(() => 
     auburnStoryChapters.filter(c => c.startYear >= 1950),
     []
   )
   ```

2. **Lazy load images** in metric highlights:
   ```tsx
   <img loading="lazy" ... />
   ```

3. **Debounce callbacks** if they're expensive:
   ```tsx
   const debouncedCallback = useMemo(
     () => debounce(handleChapterActivate, 300),
     []
   )
   ```

4. **Use CSS containment** for large lists:
   ```css
   .chapter-card {
     contain: layout style paint;
   }
   ```

---

## 📝 License

Part of the Visit Auburn project. See main LICENSE file.

