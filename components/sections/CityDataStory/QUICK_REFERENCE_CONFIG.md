# CityDataStory Configuration - Quick Reference

## ⚡ 30-Second Setup

```typescript
import { CityDataStory } from '@/components/sections/CityDataStory'
import type { CityDataStoryConfig } from '@/lib/data/cityThroughTime'

const myConfig: CityDataStoryConfig = {
  cityName: 'YourCity',
  countyName: 'Your County',
  stateName: 'Your State',
  established: 1850,
  data: yourData,
  chapters: yourChapters,
}

<CityDataStory config={myConfig} />
```

---

## 📋 Config Template

```typescript
const config: CityDataStoryConfig = {
  // REQUIRED
  cityName: 'Auburn',
  data: [/* CityThroughTimeRow[] */],
  chapters: [/* StoryChapter[] */],
  
  // OPTIONAL
  countyName: 'Placer County',
  stateName: 'California',
  established: 1849,
  theme: {
    accentClassName: 'gold', // 'gold' | 'blue' | 'pine' | 'lake' | 'rust'
  },
}
```

---

## 📊 Data Row Template

```typescript
{
  year: 2020,
  city: 14000,
  county: 398000,        // optional
  state: 39538000,       // optional
  milestoneTitle: 'Modern Auburn',
  milestoneBody: 'Auburn thrives as a destination...',
  sources: [
    { label: 'US Census 2020', url: 'https://...' }
  ],
}
```

---

## 📖 Chapter Template

```typescript
{
  id: 'modern-era',
  title: 'Modern Auburn',
  startYear: 1990,
  endYear: 2020,
  takeaway: 'Balancing heritage, growth, and quality of life',
  detail: 'Modern Auburn has mastered the art of balance...',
  metricHighlights: [
    { label: 'Population Growth', value: '+32%', note: '1990-2020' },
    { label: 'Annual Visitors', value: '500,000+' },
  ],
}
```

---

## 🎨 Theme Colors

| Value | Description | Use Case |
|-------|-------------|----------|
| `'gold'` | Warm gold (default) | Heritage, historic cities |
| `'blue'` | Cool blue | Tech, innovation, coastal |
| `'pine'` | Forest green | Nature, sustainability |
| `'lake'` | Teal/aqua | Water, recreation |
| `'rust'` | Warm orange/red | Desert, Southwest |

---

## ✅ Validation Checklist

**Data:**
- [ ] At least 5 data points
- [ ] Years in chronological order
- [ ] All sources cited
- [ ] City population always present

**Chapters:**
- [ ] At least 3 chapters
- [ ] No gaps in year coverage
- [ ] Each chapter has 2-4 metrics
- [ ] Takeaways are concise

**Config:**
- [ ] `cityName` is set
- [ ] `countyName` and `stateName` provided (if comparing)
- [ ] Theme matches brand (if customized)

---

## 🚨 Common Mistakes

### ❌ Missing City Name
```typescript
const config = {
  // cityName: 'Auburn', // FORGOT THIS!
  data: myData,
  chapters: myChapters,
}
```

### ✅ Correct
```typescript
const config = {
  cityName: 'Auburn', // ✅ Always required
  data: myData,
  chapters: myChapters,
}
```

---

### ❌ Chapter Gaps
```typescript
chapters: [
  { startYear: 1900, endYear: 1950 },
  { startYear: 1970, endYear: 2020 }, // ❌ 1950-1970 missing!
]
```

### ✅ Correct
```typescript
chapters: [
  { startYear: 1900, endYear: 1950 },
  { startYear: 1950, endYear: 2020 }, // ✅ Continuous
]
```

---

### ❌ Missing Data Sources
```typescript
{
  year: 2020,
  city: 14000,
  sources: [], // ❌ No sources!
}
```

### ✅ Correct
```typescript
{
  year: 2020,
  city: 14000,
  sources: [
    { label: 'US Census 2020', url: 'https://census.gov/...' }
  ], // ✅ Always cite
}
```

---

## 🔗 Links

- **Full Guide**: `PLATFORM_ENGINEER_GUIDE.md`
- **API Docs**: `CITYDATASTORY_README.md`
- **Examples**: `CityDataStory.example.tsx`

---

**Need help?** See the full Platform Engineer's Guide.

