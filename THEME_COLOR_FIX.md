# Theme Color Deprecation Fix

## Issue
Next.js 13+ deprecated `themeColor` in the `metadata` export and moved it to a separate `viewport` export.

### Build Warnings (Before Fix)
```
⚠ Unsupported metadata themeColor is configured in metadata export
Please move it to viewport export instead
```

This warning appeared for **40+ pages** during build, even though `themeColor` was only defined once in the root layout.

---

## Solution

### Changed in `/app/layout.tsx`

**Before:**
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  // ... other metadata
  themeColor: '#D4A017',
  // ... more metadata
}
```

**After:**
```typescript
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  // ... other metadata (themeColor removed)
}

export const viewport: Viewport = {
  themeColor: '#D4A017',
}
```

---

## What Changed

1. **Added `Viewport` import** from `next`
2. **Removed `themeColor`** from `metadata` export
3. **Created new `viewport` export** with `themeColor`

---

## Why This Matters

### Technical Reasons:
- **Future-proofing**: Prevents breaking changes in future Next.js versions
- **Best practices**: Follows Next.js 13+ recommended patterns
- **Clean builds**: Eliminates 40+ deprecation warnings

### User Experience:
- No visible changes to users
- Theme color still works on mobile browsers
- Better separation of concerns (viewport vs metadata)

---

## What is Theme Color?

The `themeColor` meta tag controls the color of the browser's UI elements on mobile devices:

- **Mobile Safari**: Colors the status bar and browser chrome
- **Android Chrome**: Colors the address bar and task switcher
- **PWA**: Sets the theme color for installed apps

**Auburn's Theme Color:** `#D4A017` (Gold)

---

## Build Results

### Before Fix:
```
⚠ 40+ warnings about themeColor
✓ Build succeeded (with warnings)
```

### After Fix:
```
✓ Build succeeded
✓ Zero warnings
✓ 98 pages generated successfully
```

---

## Testing

To verify the theme color still works:

1. **Mobile Safari (iOS):**
   - Visit site on iPhone/iPad
   - Check status bar color matches Auburn gold

2. **Chrome (Android):**
   - Visit site on Android device
   - Check address bar color matches Auburn gold

3. **Developer Tools:**
   ```html
   <meta name="theme-color" content="#D4A017">
   ```
   Should be present in the `<head>` of all pages

---

## Related Files

| File | Change |
|------|--------|
| `/app/layout.tsx` | Moved themeColor from metadata to viewport export |

---

## References

- [Next.js Viewport API](https://nextjs.org/docs/app/api-reference/functions/generate-viewport)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [MDN: theme-color](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color)

---

**Fixed:** January 20, 2026  
**Build Status:** ✅ Passing (0 warnings)  
**Impact:** Future-proofed, no user-facing changes
