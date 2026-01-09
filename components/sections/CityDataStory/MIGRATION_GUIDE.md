# Migration Guide - CityDataStory v2.0

**If you were using CityDataStory before the refactor**, this guide will help you migrate to the new config-based API.

---

## 🔄 What Changed?

The component now uses a **single config object** instead of separate props for data, chapters, and metadata.

---

## 📋 Quick Migration

### Before (Old API)

```tsx
import { CityDataStory } from '@/components/sections/CityDataStory'
import { 
  auburnThroughTimeData, 
  auburnStoryChapters,
  auburnConfig 
} from '@/lib/data/cityThroughTime'

<CityDataStory 
  data={auburnThroughTimeData}
  chapters={auburnStoryChapters}
  config={auburnConfig}
/>
```

### After (New API)

```tsx
import { CityDataStory } from '@/components/sections/CityDataStory'
import { auburnDataStoryConfig } from '@/lib/data/cityThroughTime'

<CityDataStory config={auburnDataStoryConfig} />
```

---

## 🔍 Detailed Changes

### 1. Props Interface Changed

**Before**:
```typescript
interface CityDataStoryProps {
  data?: CityThroughTimeRow[]
  chapters?: StoryChapter[]
  config?: CityConfig
  initialChapterIndex?: number
}
```

**After**:
```typescript
interface CityDataStoryProps {
  config?: CityDataStoryConfig  // Single config object
  initialChapterIndex?: number
}
```

### 2. Config Type Changed

**Before** (Old `CityConfig`):
```typescript
interface CityConfig {
  name: string
  county: string
  state: string
  established: number
  dataStartYear: number
  dataEndYear: number
}
```

**After** (New `CityDataStoryConfig`):
```typescript
interface CityDataStoryConfig {
  cityName: string           // Was: name
  countyName?: string        // Was: county
  stateName?: string         // Was: state
  established?: number       // Now optional
  theme?: {                  // NEW: theming support
    accentClassName?: string
  }
  data: CityThroughTimeRow[]        // NEW: includes data
  chapters: StoryChapter[]          // NEW: includes chapters
}
```

---

## 🛠️ Migration Steps

### Step 1: Update Imports

**Before**:
```typescript
import { 
  auburnThroughTimeData, 
  auburnStoryChapters,
  auburnConfig 
} from '@/lib/data/cityThroughTime'
```

**After**:
```typescript
import { auburnDataStoryConfig } from '@/lib/data/cityThroughTime'
```

### Step 2: Update Component Usage

**Before**:
```tsx
<CityDataStory 
  data={auburnThroughTimeData}
  chapters={auburnStoryChapters}
  config={auburnConfig}
/>
```

**After**:
```tsx
<CityDataStory config={auburnDataStoryConfig} />
```

### Step 3: Update Custom Configs (If Any)

If you created custom configs, update them to the new format:

**Before**:
```typescript
const myConfig: CityConfig = {
  name: 'MyCity',
  county: 'MyCounty',
  state: 'MyState',
  established: 1850,
  dataStartYear: 1900,
  dataEndYear: 2020,
}

<CityDataStory 
  data={myData}
  chapters={myChapters}
  config={myConfig}
/>
```

**After**:
```typescript
const myConfig: CityDataStoryConfig = {
  cityName: 'MyCity',      // Renamed from 'name'
  countyName: 'MyCounty',  // Renamed from 'county'
  stateName: 'MyState',    // Renamed from 'state'
  established: 1850,
  data: myData,            // Now part of config
  chapters: myChapters,    // Now part of config
}

<CityDataStory config={myConfig} />
```

---

## ⚠️ Breaking Changes

### 1. Prop Names Changed

| Old Prop | New Prop | Notes |
|----------|----------|-------|
| `data` | `config.data` | Now part of config object |
| `chapters` | `config.chapters` | Now part of config object |
| `config.name` | `config.cityName` | Renamed for clarity |
| `config.county` | `config.countyName` | Renamed for clarity |
| `config.state` | `config.stateName` | Renamed for clarity |
| N/A | `config.theme` | NEW: theming support |

### 2. Required vs Optional

**Before**:
- `config.name` - Required
- `config.county` - Required
- `config.state` - Required
- `config.established` - Required

**After**:
- `config.cityName` - Required
- `config.countyName` - Optional (defaults to "County")
- `config.stateName` - Optional (defaults to "State")
- `config.established` - Optional (omitted if not provided)

---

## ✅ Backward Compatibility

### Default Config

If you don't provide a config, the component defaults to Auburn:

```tsx
// This still works!
<CityDataStory />

// Equivalent to:
<CityDataStory config={auburnDataStoryConfig} />
```

### Gradual Migration

You can migrate gradually:

1. **Phase 1**: Keep using old imports, just wrap in new config
2. **Phase 2**: Switch to pre-built `auburnDataStoryConfig`
3. **Phase 3**: Create custom configs for other cities

---

## 🎨 New Features

### 1. Theming Support

```typescript
const myConfig: CityDataStoryConfig = {
  cityName: 'MyCity',
  theme: {
    accentClassName: 'blue', // 'gold' | 'blue' | 'pine' | 'lake' | 'rust'
  },
  data: myData,
  chapters: myChapters,
}
```

### 2. Optional County/State

```typescript
// Minimal config (no county/state comparison)
const minimalConfig: CityDataStoryConfig = {
  cityName: 'MyCity',
  data: myData,
  chapters: myChapters,
}
```

### 3. Reusable Configs

```typescript
// Create once, use everywhere
export const sacramentoConfig: CityDataStoryConfig = { /* ... */ }

// Page 1
<CityDataStory config={sacramentoConfig} />

// Page 2
<CityDataStory config={sacramentoConfig} />
```

---

## 🧪 Testing Your Migration

### Checklist

- [ ] Component renders without errors
- [ ] City name appears in title
- [ ] County/state names appear in chart (if provided)
- [ ] Tooltips show correct labels
- [ ] StoryChapters shows correct city name
- [ ] No console warnings
- [ ] TypeScript compiles without errors

### Test Cases

```tsx
// Test 1: Default config
<CityDataStory />

// Test 2: Auburn config (explicit)
<CityDataStory config={auburnDataStoryConfig} />

// Test 3: Custom config
<CityDataStory config={myCustomConfig} />

// Test 4: With initial chapter
<CityDataStory config={auburnDataStoryConfig} initialChapterIndex={2} />
```

---

## 🐛 Troubleshooting

### "Property 'name' does not exist on type 'CityDataStoryConfig'"

**Problem**: Using old `config.name` instead of `config.cityName`.

**Solution**: Rename to `cityName`:
```typescript
// ❌ Old
config: { name: 'MyCity' }

// ✅ New
config: { cityName: 'MyCity' }
```

### "Type 'CityConfig' is not assignable to type 'CityDataStoryConfig'"

**Problem**: Using old `CityConfig` type instead of `CityDataStoryConfig`.

**Solution**: Update type and add data/chapters:
```typescript
// ❌ Old
const config: CityConfig = { /* ... */ }

// ✅ New
const config: CityDataStoryConfig = {
  cityName: 'MyCity',
  data: myData,
  chapters: myChapters,
}
```

### "Cannot read property 'city' of undefined"

**Problem**: Data or chapters not provided in config.

**Solution**: Ensure config includes both:
```typescript
const config: CityDataStoryConfig = {
  cityName: 'MyCity',
  data: myData,        // ✅ Required
  chapters: myChapters, // ✅ Required
}
```

---

## 📚 Additional Resources

- **Platform Engineer's Guide**: `PLATFORM_ENGINEER_GUIDE.md`
- **Quick Reference**: `QUICK_REFERENCE_CONFIG.md`
- **Refactor Summary**: `REFACTOR_SUMMARY.md`
- **Complete Status**: `REFACTOR_COMPLETE.md`

---

## 🆘 Need Help?

If you encounter issues during migration:

1. Check this guide's troubleshooting section
2. See `PLATFORM_ENGINEER_GUIDE.md` for comprehensive docs
3. Review `QUICK_REFERENCE_CONFIG.md` for templates
4. Check TypeScript errors for specific guidance

---

**Migration completed?** You're now ready to use CityDataStory for any city! 🎉

*Last updated: January 9, 2026*

