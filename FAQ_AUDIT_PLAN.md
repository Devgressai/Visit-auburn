# FAQ Page Audit & Fix Plan
**Route:** `/plan/faq`  
**Date:** 2025-01-27  
**Status:** Diagnosis Complete - Ready for Implementation

---

## Step 1: File Locations

### Primary Route File
- **File:** `app/plan/faq/page.tsx`
  - Server Component (default export)
  - Uses `FAQSection` component
  - Contains page structure, hero, breadcrumbs, contact cards, CTA sections

### Core FAQ Component
- **File:** `components/plan/FAQSection.tsx`
  - Client Component (`'use client'`)
  - Contains FAQ data (hardcoded array `faqData`)
  - Contains `FAQAccordion` sub-component
  - Uses framer-motion for animations

### Supporting Components
- `components/navigation/Breadcrumbs.tsx` - Breadcrumb navigation
- `components/ui/RelatedPages.tsx` - Related pages section
- `components/ui/AuburnImage.tsx` - Hero image component

### Data Source
- **Type:** Hardcoded TypeScript array
- **Location:** `components/plan/FAQSection.tsx` (lines 17-115)
- **Structure:** Array of `FAQCategory` objects, each containing `FAQItem[]` with `question` and `answer` strings

---

## Step 2: Root Cause Diagnosis

### Problem Identified
**Answers are not rendering when FAQ items are clicked/expanded.**

### Root Cause Analysis

#### Issue #1: Missing `key` Prop in AnimatePresence (CRITICAL)
**Location:** `components/plan/FAQSection.tsx`, line 152

**Problem:**
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div  // ❌ Missing key prop
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      ...
    >
```

**Why it fails:**
- `AnimatePresence` requires a unique `key` prop on each `motion` component to track enter/exit animations
- Without a key, React cannot properly identify which component to animate
- This can cause the component to not render or animate correctly

#### Issue #2: Height Animation with 'auto' (POTENTIAL)
**Location:** `components/plan/FAQSection.tsx`, line 154

**Problem:**
```tsx
animate={{ height: 'auto', opacity: 1 }}
```

**Why it might fail:**
- Framer Motion's `height: 'auto'` can be unreliable in some scenarios
- Better to use explicit height calculation or `layout` animations
- However, this is less likely to be the primary issue

#### Issue #3: State Management (LOW RISK)
**Location:** `components/plan/FAQSection.tsx`, line 118

**Current implementation:**
- Uses `useState<number | null>(null)` to track single open index
- Only one FAQ can be open at a time per category
- This is working as designed, but could be improved

### Verification
- ✅ Component is marked `'use client'` (correct)
- ✅ `framer-motion` is installed (v12.23.26)
- ✅ Data structure is correct (questions and answers exist)
- ✅ Click handler is attached to button
- ✅ State management logic appears correct
- ❌ **Missing `key` prop on `motion.div`** (PRIMARY ISSUE)

---

## Step 3: Implementation Plan

### File 1: `components/plan/FAQSection.tsx`

#### Change 1: Add `key` prop to motion.div
**Location:** Line 152  
**Current:**
```tsx
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: 'auto', opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.3 }}
  className="overflow-hidden"
>
```

**Change to:**
```tsx
<motion.div
  key={`faq-${category}-${index}`}  // ADD THIS
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: 'auto', opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.3 }}
  className="overflow-hidden"
>
```

**Rationale:** AnimatePresence requires keys to track component lifecycle for animations.

#### Change 2: Improve height animation (OPTIONAL but recommended)
**Location:** Line 154  
**Alternative approach:**
```tsx
// Option A: Keep current but ensure key is present
animate={{ height: 'auto', opacity: 1 }}

// Option B: Use layout animation (more reliable)
// Add to motion.div: layout="position"
// Change animate to: animate={{ opacity: 1 }}
// Remove height from initial/animate/exit
```

**Recommendation:** Start with Change 1 (key prop). If issues persist, implement Change 2.

#### Change 3: Add error boundary/fallback (OPTIONAL)
**Location:** After line 180 (in FAQSection component)

Add console logging for debugging:
```tsx
export function FAQSection() {
  // Optional: Add data validation
  if (!faqData || faqData.length === 0) {
    console.warn('FAQ data is empty')
    return <div>No FAQ data available</div>
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {faqData.map((category) => (
        <FAQAccordion key={category.category} {...category} />
      ))}
    </div>
  )
}
```

---

## Step 4: Testing Checklist

After implementation, verify:

- [ ] FAQ questions are visible
- [ ] Clicking a question expands the answer
- [ ] Answer text is readable (proper color contrast)
- [ ] Animation works smoothly (expand/collapse)
- [ ] Only one FAQ per category can be open at a time
- [ ] Clicking another question closes the previous one
- [ ] Chevron icon rotates correctly
- [ ] Works on mobile devices
- [ ] No console errors
- [ ] No hydration mismatches

---

## Step 5: Additional Improvements (Optional)

### Enhancement 1: Allow multiple FAQs open
**File:** `components/plan/FAQSection.tsx`  
**Change:** Replace `useState<number | null>` with `useState<Set<number>>`  
**Impact:** Users can open multiple FAQs simultaneously

### Enhancement 2: Add FAQ search/filter
**File:** `components/plan/FAQSection.tsx`  
**Change:** Add search input that filters FAQ items  
**Impact:** Better UX for users with specific questions

### Enhancement 3: Add structured data (SEO)
**File:** `app/plan/faq/page.tsx`  
**Change:** Add FAQPage JSON-LD schema  
**Impact:** Better SEO, potential rich snippets in search results

---

## Summary

**Primary Fix Required:**
1. Add `key` prop to `motion.div` in `AnimatePresence` (line 152 of `FAQSection.tsx`)

**Expected Outcome:**
- FAQ answers will render when questions are clicked
- Smooth expand/collapse animations will work
- No breaking changes to existing functionality

**Files to Modify:**
- `components/plan/FAQSection.tsx` (1-2 lines)

**Risk Level:** Low (single prop addition)

**Estimated Time:** 5 minutes

---

## Implementation Command

```bash
# After making changes, test locally:
npm run dev
# Navigate to: http://localhost:3000/plan/faq
# Test clicking FAQ items to verify answers appear
```

