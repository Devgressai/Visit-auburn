# Auburn Image System - Quick Reference

## 🎯 Core Rule
**ALL images MUST be real Auburn, CA photographs from the registry.**

---

## 📸 Using Auburn Images

### Import:
```tsx
import { AuburnImage, AuburnHeroImage } from '@/components/ui/AuburnImage'
```

### Hero Image:
```tsx
<AuburnHeroImage imageId="hero-old-town-clocktower">
  <h1>Your Title</h1>
  <p>Your content</p>
</AuburnHeroImage>
```

### Inline Image:
```tsx
<AuburnImage 
  imageId="outdoor-hidden-falls"
  className="rounded-lg w-full h-[400px] object-cover"
/>
```

### Features:
- ✅ Auto-includes alt text from registry
- ✅ Auto-includes photo credit
- ✅ Build validation enforces compliance

---

## 🖼️ Available Images

### Quick Select by Category:

**Hero (Wide Format):**
- `hero-old-town-clocktower`
- `hero-american-river-canyon`
- `hero-foresthill-bridge`
- `hero-lake-clementine`
- `hero-downtown-autumn`

**Outdoor:**
- `outdoor-quarry-ponds`
- `outdoor-hidden-falls`
- `outdoor-mountain-biking`
- `outdoor-river-swimming`
- `outdoor-overlook-park`

**Historic:**
- `historic-courthouse`
- `historic-firehouse-tower`
- `historic-gold-country-museum`
- `historic-bernhard-museum`
- `historic-railroad-depot`

**Dining:**
- `dining-old-town-restaurants`
- `dining-local-cuisine`
- `dining-winery-tasting`
- `dining-farmers-market`

**Events:**
- `event-gold-rush-days`
- `event-concerts-amphitheater`
- `event-endurance-run`
- `event-art-walk`

**Accommodations:**
- `stay-historic-hotel`
- `stay-cozy-room`
- `stay-cabin-forest`

**Full list:** `/data/auburnImages.ts`

---

## ✅ Page Requirements

Each page MUST have:
1. **1 Hero Image** (Auburn)
2. **2+ Inline Images** (Auburn)
3. **Minimum 3 Auburn images total**

Build fails if requirements not met.

---

## 🧪 Validation

### Check Your Work:
```bash
npm run validate:images
```

### Build (Runs Validation):
```bash
npm run build
```

### What Gets Validated:
- ✅ All images use Auburn registry
- ✅ All images have alt text
- ✅ 3+ Auburn images per page
- ✅ No stock/placeholder images
- ✅ No HTML `<img>` tags

---

## ➕ Adding New Auburn Images

1. **Add photo** to `/public/auburn/filename.jpg`

2. **Register** in `/data/auburnImages.ts`:
```typescript
{
  id: 'category-location-name',
  src: 'filename.jpg',
  alt: 'Auburn location description',
  locationName: 'Specific Auburn Location',
  category: 'outdoor', // hero, historic, dining, etc.
  photographerCredit: 'Source Name',
  licenseType: 'city-owned',
  width: 1920,
  height: 1080,
}
```

3. **Use** with new `imageId`

---

## 🚫 Forbidden

- ❌ Stock images (unsplash, pexels, etc.)
- ❌ Placeholder images
- ❌ Non-Auburn photos
- ❌ Missing alt text
- ❌ HTML `<img>` tags
- ❌ Images not in registry

---

## 📋 Checklist for New Pages

- [ ] Import `AuburnImage` / `AuburnHeroImage`
- [ ] Add 1 hero image (Auburn)
- [ ] Add 2+ inline images (Auburn)
- [ ] Run `npm run validate:images`
- [ ] Verify build passes

---

## 📚 Full Documentation

See `/AUBURN_IMAGE_SYSTEM.md` for complete details.

## 🔍 Find Images

Search registry by location:
```typescript
import { searchAuburnImagesByLocation } from '@/data/auburnImages'
const images = searchAuburnImagesByLocation('old town')
```

---

## 💡 Pro Tips

1. **Hero images** should be wide format (1920x1080)
2. **Use descriptive imageIds** for easy finding
3. **Credits are automatic** - no manual attribution needed
4. **Build fails fast** - validates before deploy
5. **Type-safe** - TypeScript catches errors

---

## 📞 Quick Help

**Error: "Invalid imageId"**
→ Check `/data/auburnImages.ts` for available IDs

**Error: "Insufficient Auburn images"**
→ Add more `<AuburnImage>` components (min 3)

**Error: "Image missing alt text"**
→ Use `<AuburnImage>` (auto-includes alt)

**Build fails?**
→ Run `npm run validate:images` to see issues

