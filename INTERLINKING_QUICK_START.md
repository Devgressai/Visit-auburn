# Interlinking System - Quick Reference

## 📚 Key Files

### 1. Route Map (Single Source of Truth)
**`/lib/routes.ts`**
- Defines all routes, breadcrumbs, related pages
- Use `generateBreadcrumbs(path)` for breadcrumbs
- Use `getRelatedPages(path)` for related pages

### 2. Related Pages Component
**`/components/ui/RelatedPages.tsx`**
```tsx
<RelatedPages currentPath="/your-page" />
```

### 3. Validation Script
**`/scripts/validate-interlinking.ts`**
```bash
npm run validate:links
```

---

## 🚀 Adding a New Page

### Step 1: Add to Route Map
Edit `/lib/routes.ts`:

```typescript
'/your-new-page': {
  path: '/your-new-page',
  breadcrumbLabel: 'Your Page',
  parentSection: '/parent', // Optional
  relatedPages: [
    '/page-1',
    '/page-2',
    '/page-3',
    '/page-4',
    '/page-5',
    '/page-6',
  ],
  photoRequired: true, // or false
  blurb: 'One-sentence Auburn-specific description.',
}
```

### Step 2: Add to Page Component
In `/app/your-new-page/page.tsx`:

```tsx
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'

const breadcrumbs = generateBreadcrumbs('/your-new-page')

export default function YourPage() {
  return (
    <div>
      {/* After hero/header */}
      <Breadcrumbs items={breadcrumbs} />
      
      {/* Your content */}
      
      {/* Before footer */}
      <RelatedPages currentPath="/your-new-page" />
    </div>
  )
}
```

### Step 3: Validate
```bash
npm run validate:links
```

---

## 🔍 Validation Rules

Build fails if a page:
- ❌ Missing `<Breadcrumbs />` component
- ❌ Missing `<RelatedPages />` component
- ❌ Has < 3 internal links

Current pages average **40-60+ links** per page ✅

---

## 📊 Link Distribution Per Page

| Source | Links | Always Present |
|--------|-------|----------------|
| Header Nav | 15-20 | ✅ |
| Breadcrumbs | 2-3 | ✅ |
| Related Pages | 6 | ✅ |
| Footer | 20+ | ✅ |
| In-Content | 5-10 | ✅ |
| **Total** | **40-60+** | ✅ |

---

## 🎯 No Orphan Pages Guarantee

Every page is accessible through:
1. **Header navigation** (top menu)
2. **Footer links** (bottom menu)
3. **Breadcrumbs** (from parent pages)
4. **Related Pages** (from related content)

= **Zero orphan pages** 🎉

---

## 🛠️ Common Tasks

### Update Related Pages
Edit `/lib/routes.ts` → `relatedPages` array

### Add Navigation Link
- **Header:** `/components/navigation/NavigationNew.tsx`
- **Footer:** `/components/footer/FooterNew.tsx`

### Change Breadcrumb Label
Edit `/lib/routes.ts` → `breadcrumbLabel`

### Run Validation
```bash
npm run validate:links
```

### Build with Validation
```bash
npm run build
```

---

## 📖 Full Documentation

See `/INTERLINKING_IMPLEMENTATION.md` for complete details.

