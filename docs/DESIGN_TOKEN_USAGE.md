# Design Token Usage Guide
## Homepage Visualization Section

---

## Component Style Examples

### Card Component

```tsx
import { spacing, elevation, borders, colors } from '@/lib/designTokens'

// Using CSS variables (recommended)
<div className="
  bg-[var(--color-bg-card)]
  p-[var(--spacing-card-padding-mobile)] md:p-[var(--spacing-card-padding-desktop)]
  rounded-[var(--border-radius-lg)]
  border-[var(--border-width-medium)] border-[var(--color-border-medium)]
  shadow-[var(--elevation-3)]
  hover:shadow-[var(--elevation-4)]
  transition-[var(--transition-shadow)]
">
  {/* Content */}
</div>

// Using Tailwind with tokens
<div className="
  bg-white
  p-6 md:p-8
  rounded-xl
  border-2 border-forest-200
  shadow-lg hover:shadow-xl
  transition-shadow duration-300
">
  {/* Content */}
</div>
```

### Button Component

```tsx
<button className="
  px-8 py-4
  rounded-xl
  bg-[var(--color-primary)]
  text-white
  font-bold
  shadow-[var(--elevation-3)]
  hover:bg-[var(--color-primary-hover)]
  hover:shadow-[var(--elevation-4)]
  hover:scale-[var(--hover-scale-sm)]
  active:scale-[var(--active-scale)]
  transition-[var(--transition-normal)]
  focus:outline-none
  focus:ring-2 focus:ring-[var(--focus-ring-color)]
  focus:ring-offset-2
">
  Button Text
</button>
```

### Chart Container

```tsx
<div className="
  w-full
  p-[var(--spacing-6)] md:p-[var(--spacing-8)]
  bg-gradient-to-br from-[var(--color-cream-50)] to-white
  rounded-[var(--border-radius-xl)]
  border-[var(--border-width-medium)] border-[var(--color-border-medium)]
  shadow-[var(--elevation-4)]
">
  <svg className="
    w-full h-auto
    text-[var(--color-primary)]
    stroke-[var(--color-primary)]
  ">
    {/* Chart content */}
  </svg>
</div>
```

### Stats Card

```tsx
<div className="
  bg-[var(--color-bg-card)]
  p-[var(--spacing-6)]
  rounded-[var(--border-radius-lg)]
  border-[var(--border-width-medium)] border-[var(--color-forest-300)]
  shadow-[var(--elevation-3)]
  hover:border-[var(--color-forest-500)]
  hover:shadow-[var(--elevation-4)]
  transition-[var(--transition-normal)]
  group
">
  <div className="
    text-[var(--font-size-5xl)]
    font-[var(--font-weight-bold)]
    font-[var(--font-display)]
    text-[var(--color-charcoal-900)]
    mb-[var(--spacing-2)]
  ">
    {value}
  </div>
  <div className="
    text-[var(--font-size-sm)]
    font-[var(--font-weight-semibold)]
    text-[var(--color-text-secondary)]
    uppercase
    tracking-[var(--letter-spacing-widest)]
  ">
    {label}
  </div>
</div>
```

---

## Token Usage Examples

### Color Tokens

```tsx
// CSS Variables
<div style={{ color: 'var(--color-primary)' }}>
<div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
<div style={{ borderColor: 'var(--color-border-medium)' }}>

// TypeScript
import { colors } from '@/lib/designTokens'
<div style={{ color: colors.semantic.primary }}>
<div style={{ backgroundColor: colors.cream[50] }}>
```

### Spacing Tokens

```tsx
// CSS Variables
<div style={{ padding: 'var(--spacing-6)' }}>
<div style={{ gap: 'var(--spacing-grid-gap-desktop)' }}>
<div style={{ marginTop: 'var(--spacing-section-padding-mobile)' }}>

// TypeScript
import { spacing } from '@/lib/designTokens'
<div style={{ padding: `${spacing[6]}px` }}>
<div style={{ gap: `${spacing.grid.gapDesktop}px` }}>
```

### Typography Tokens

```tsx
// CSS Variables
<h1 style={{ 
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--font-size-hero-mobile)',
  fontWeight: 'var(--font-weight-black)',
  lineHeight: 'var(--line-height-tight)',
  letterSpacing: 'var(--letter-spacing-tight)',
}}>

// Tailwind Classes
<h1 className="
  font-display
  text-hero-display
  font-black
  leading-tight
  tracking-tight
">
```

### Elevation Tokens

```tsx
// CSS Variables
<div style={{ boxShadow: 'var(--elevation-3)' }}>
<div style={{ boxShadow: 'var(--shadow-forest)' }}>

// TypeScript
import { elevation } from '@/lib/designTokens'
<div style={{ boxShadow: elevation.levels[3] }}>
```

---

## Motion Usage Examples

### GSAP Animation

```tsx
import { gsap } from 'gsap'
import { motion } from '@/lib/designTokens'

// Using token durations
gsap.to(element, {
  opacity: 1,
  y: 0,
  duration: motion.duration.slow / 1000, // Convert to seconds
  ease: motion.easing.smooth,
  delay: motion.delay.medium / 1000,
})

// Timeline with tokens
const tl = gsap.timeline({ defaults: { ease: motion.easing.smooth } })
tl.to(element1, { opacity: 1, duration: motion.duration.normal / 1000 })
  .to(element2, { y: 0, duration: motion.duration.slow / 1000 }, '-=0.2')
```

### Framer Motion

```tsx
import { motion } from 'framer-motion'
import { motion as motionTokens } from '@/lib/designTokens'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: motionTokens.duration.normal / 1000,
    ease: motionTokens.easing.natural,
    delay: motionTokens.delay.short / 1000,
  }}
>
```

### CSS Transitions

```tsx
// Using CSS variables
<div className="transition-[var(--transition-normal)]">
<div className="transition-[var(--transition-color)]">
<div className="transition-[var(--transition-transform)]">

// Custom with tokens
<div style={{
  transition: `all ${motion.duration.normal}ms ${motion.easing.natural}`,
}}>
```

---

## Responsive Examples

### Mobile-First Spacing

```tsx
// CSS Variables (responsive)
<div className="
  p-[var(--spacing-card-padding-mobile)] 
  md:p-[var(--spacing-card-padding-desktop)]
  gap-[var(--spacing-grid-gap-mobile)]
  md:gap-[var(--spacing-grid-gap-desktop)]
">

// TypeScript with breakpoints
import { spacing, breakpoints } from '@/lib/designTokens'

const isMobile = window.innerWidth < breakpoints.md
const padding = isMobile 
  ? spacing.card.paddingMobile 
  : spacing.card.paddingDesktop
```

### Responsive Typography

```tsx
// CSS Variables (fluid)
<h1 className="text-[var(--font-size-hero-mobile)]">
<h2 className="text-[var(--font-size-h1-mobile)]">

// Tailwind with clamp
<h1 className="text-hero-display">
<h2 className="text-4xl md:text-5xl">
```

### Responsive Grid

```tsx
// CSS Variables
<div className="
  grid
  grid-cols-[var(--grid-columns-mobile)]
  md:grid-cols-[var(--grid-columns-tablet)]
  lg:grid-cols-[var(--grid-columns-desktop)]
  gap-[var(--spacing-grid-gap-mobile)]
  md:gap-[var(--spacing-grid-gap-desktop)]
">
```

---

## Dark/Light Adaptability

### CSS Variables (Future)

```css
[data-theme="dark"] {
  --color-bg-primary: #1A1A1A;
  --color-text-primary: #FFFFFF;
  --color-border-subtle: #404040;
}
```

### TypeScript Hook

```tsx
import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(mediaQuery.matches ? 'dark' : 'light')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return theme
}
```

---

## Seasonal Adaptability

### Using Hook

```tsx
import { useSeasonalTokens } from '@/lib/hooks/useSeasonalTokens'

function SeasonalComponent() {
  const { accentColor, bgColor, season } = useSeasonalTokens()
  
  return (
    <div 
      style={{ 
        backgroundColor: bgColor,
        borderColor: accentColor,
      }}
      data-season={season}
    >
      {/* Content */}
    </div>
  )
}
```

### CSS Data Attribute

```tsx
// Component sets data-season
<div data-season="spring" className="
  bg-[var(--seasonal-bg)]
  border-[var(--seasonal-accent)]
">
```

### Manual Override

```tsx
import { seasonal } from '@/lib/designTokens'

const springColors = seasonal.spring
<div style={{ 
  backgroundColor: springColors.bg,
  borderColor: springColors.accent,
}>
```

---

## Best Practices

### 1. Always Use Tokens

❌ **Don't**
```tsx
<div style={{ padding: '24px', color: '#2D5A27' }}>
```

✅ **Do**
```tsx
<div className="p-6 text-forest-500">
// or
<div style={{ padding: 'var(--spacing-6)', color: 'var(--color-primary)' }}>
```

### 2. Use CSS Variables for Styles

❌ **Don't**
```tsx
<div style={{ padding: `${spacing[6]}px` }}>
```

✅ **Do**
```tsx
<div className="p-6">
// or
<div style={{ padding: 'var(--spacing-6)' }}>
```

### 3. Use TypeScript Tokens for Logic

✅ **Do**
```tsx
const padding = isMobile ? spacing.card.paddingMobile : spacing.card.paddingDesktop
const duration = shouldReduceMotion ? 0 : motion.duration.slow
```

### 4. Maintain Consistency

✅ **Do**
- Use same token for same purpose
- Follow spacing rhythm
- Use semantic color names
- Maintain typography hierarchy

### 5. Test Accessibility

✅ **Do**
- Check contrast ratios
- Test with reduced motion
- Verify focus states
- Validate color combinations

---

## Token Reference

### Quick Lookup

**Colors**: `colors.forest[500]`, `colors.semantic.primary`  
**Spacing**: `spacing[6]`, `spacing.card.paddingMobile`  
**Typography**: `typography.fontSize.hero`, `typography.fontFamily.display`  
**Motion**: `motion.duration.slow`, `motion.easing.smooth`  
**Elevation**: `elevation.levels[3]`, `elevation.shadow.forest`  
**Breakpoints**: `breakpoints.md`, `breakpoints.lg`  

### CSS Variable Names

All tokens are available as CSS variables with `--` prefix:
- `--color-primary`
- `--spacing-6`
- `--font-size-hero-mobile`
- `--duration-slow`
- `--elevation-3`

---

## Migration Guide

### From Hardcoded Values

**Before**:
```tsx
<div style={{ padding: '24px', color: '#2D5A27' }}>
```

**After**:
```tsx
<div className="p-6 text-forest-500">
// or
<div style={{ padding: 'var(--spacing-6)', color: 'var(--color-primary)' }}>
```

### From Tailwind Arbitrary Values

**Before**:
```tsx
<div className="p-[24px] text-[#2D5A27]">
```

**After**:
```tsx
<div className="p-6 text-forest-500">
```

---

## Troubleshooting

### Token Not Found

1. Check import: `import { colors } from '@/lib/designTokens'`
2. Verify token exists in `designTokens.ts`
3. Check CSS variable name matches

### CSS Variable Not Working

1. Ensure `design-tokens.css` is imported
2. Check variable name (case-sensitive)
3. Verify scope (`:root` vs component)

### TypeScript Type Errors

1. Use `as const` for token objects
2. Import correct token type
3. Check token path (e.g., `colors.forest[500]`)
