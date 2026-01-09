# Testing & Deployment Checklist

## Pre-Deployment Testing

### Build & Compilation
- [ ] `npm run build` completes without errors
- [ ] `npm run dev` starts without warnings
- [ ] No TypeScript errors reported
- [ ] ESLint passes all files
- [ ] No console errors in dev mode

### Code Quality
- [ ] All modified files pass linting
- [ ] No unused imports detected
- [ ] Type checking passes
- [ ] No deprecated API usage

---

## Visual Testing - Plan Pages

### Header Consistency
**Test on**: Chrome, Firefox, Safari, Edge, iPhone, Android

- [ ] `/plan/meetings` - Hero height matches other pages
- [ ] `/plan/weddings` - Hero height matches other pages
- [ ] `/plan/faq` - Hero height matches other pages
- [ ] `/plan/getting-here` - Hero height matches other pages
- [ ] `/plan/maps-guides` - Hero height matches other pages
- [ ] `/plan/venues` - Hero height matches other pages

**Success Criteria**: All headers visually aligned, consistent spacing, no white gaps

### Responsive Design
- [ ] Desktop (1920px): All headers full width, content centered
- [ ] Tablet (768px): Headers responsive, text scales properly
- [ ] Mobile (375px): Headers stack properly, text readable
- [ ] Mobile (320px): All content visible without horizontal scroll

### Hero Images
- [ ] Images load correctly
- [ ] No 404 errors in console
- [ ] Gradient overlays visible
- [ ] Text readable over images (contrast check)

### Breadcrumbs
- [ ] **Venues Page**: Breadcrumbs appear ONCE only
- [ ] All breadcrumbs clickable and link correctly
- [ ] Breadcrumb hierarchy makes sense
- [ ] Breadcrumbs visible on all screen sizes

---

## Functional Testing

### /plan/getting-here - Google Maps
- [ ] Map embed appears on page
- [ ] Auburn, CA is visible in center of map
- [ ] Map is interactive (can pan/zoom)
- [ ] "View Fullscreen" button works
- [ ] Opens fullscreen map in new tab
- [ ] No CORS errors in console
- [ ] Responsive (shrinks on mobile)
- [ ] Map fully loads within 3 seconds

**Mobile Testing**:
- [ ] Pinch-to-zoom works on iPhone
- [ ] Two-finger zoom works on Android
- [ ] Map doesn't block content on small screens

### /plan/maps-guides - Downloads
**Prepare**: Add these files to `/public/downloads/`
```
- auburn-visitor-guide.pdf
- old-town-walking-map.pdf
- trail-guide.pdf
- dining-wine-guide.pdf
- events-calendar.pdf
- historic-sites-guide.pdf
```

**Testing**:
- [ ] All 6 download buttons visible
- [ ] Clicking each button initiates download
- [ ] File names are correct (check browser download folder)
- [ ] Files are actual PDFs (not 404 errors)
- [ ] File sizes reasonable (> 0 bytes)
- [ ] Links work on Chrome, Firefox, Safari, Edge
- [ ] Download works on mobile (iOS/Android)
- [ ] "Popular" badge shows on main visitor guide
- [ ] Download progress indicator shows

### /events - Calendar
**Desktop Testing**:
- [ ] Calendar displays month/year header
- [ ] Calendar has 7 columns (Sun-Sat)
- [ ] Day labels visible at top
- [ ] All days for current month show
- [ ] Previous/next month buttons work
- [ ] Prev/next cycle through months correctly

**Date Selection**:
- [ ] Clicking a date selects it (blue highlight)
- [ ] Sidebar shows events for that date
- [ ] Event list updates when date changes
- [ ] Date with no events shows "No events" message
- [ ] Event times display correctly
- [ ] Dates with events have gold borders

**Navigation**:
- [ ] Prev month button goes back 1 month
- [ ] Next month button goes forward 1 month
- [ ] Can navigate through entire year
- [ ] Selected date resets when changing months

**Mobile Testing**:
- [ ] Calendar fits on screen (no horizontal scroll)
- [ ] Day boxes clickable with finger
- [ ] Text readable on small screens
- [ ] Sidebar scrolls if events exceed height
- [ ] Responsive at 320px, 375px, 480px widths

### /dining - Category Filters
- [ ] All restaurant categories visible in pills
- [ ] Click "All" shows all restaurants
- [ ] Click category pill filters correctly
- [ ] Multiple pills can be active (if multi-select)
- [ ] Results count updates correctly
- [ ] Search box filters by title/description
- [ ] "Clear all" button resets filters
- [ ] No results message shows when appropriate
- [ ] Filters keyboard accessible (Tab, Enter)

---

## Navigation Testing

### Removed Route
- [ ] Navigate to `/plan/respect-auburn` 
- [ ] Page redirects to `/plan/visitor-information`
- [ ] Redirect is permanent (301)
- [ ] Redirect works in all browsers

### Navigation Menus
- [ ] "Respect Auburn" NOT in Plan submenu (NavigationNew)
- [ ] "Respect Auburn" NOT in footer Plan links (FooterNew)
- [ ] "Respect Auburn" NOT in footer Plan links (Footer)
- [ ] All other Plan links work correctly
- [ ] No broken link indicators

### Breadcrumb Navigation
- [ ] Clicking breadcrumb links works
- [ ] Breadcrumb parents link to correct pages
- [ ] Breadcrumb current page doesn't link

---

## Image Testing

### Wedding Page
**Prepare**: Add images to `/public/images/auburn/weddings/`
- [ ] park-victorian.jpg loads
- [ ] ridge-golf-course.jpg loads
- [ ] garden-theater.jpg loads
- [ ] veterans-memorial.jpg loads
- [ ] old-town-auburn-wedding.jpg loads
- [ ] fairgrounds.jpg loads
- [ ] hidden-falls.jpg loads
- [ ] winery-venue.jpg loads
- [ ] historic-building.jpg loads (check for duplicates)
- [ ] hero-weddings.jpg loads
- [ ] No 404 errors in console
- [ ] Images are optimized for web (reasonable file sizes)

### Hero Images
- [ ] All hero images load without 404s
- [ ] Alt text present (check accessibility tree)
- [ ] Images display with proper aspect ratio
- [ ] No image distortion (proper object-fit)
- [ ] Lazy loading not preventing initial display

---

## Accessibility Testing

### Calendar Component
- [ ] Can navigate calendar with keyboard
- [ ] Tab focuses all interactive elements
- [ ] Enter/Space activates buttons
- [ ] ARIA labels present on buttons
- [ ] Focus indicators visible
- [ ] Month header announced by screen readers

### Maps Embed
- [ ] Embed has descriptive title attribute
- [ ] Map container focusable
- [ ] Zoom controls keyboard accessible
- [ ] No keyboard traps

### Forms & Filters
- [ ] Filter pills focusable
- [ ] Visual focus indicator on buttons
- [ ] Filter state announced (selected/unselected)
- [ ] Form labels associated with inputs
- [ ] Error messages associated with fields

### General
- [ ] Color contrast ratios meet WCAG AA
- [ ] All interactive elements keyboard accessible
- [ ] Page structure semantic (h1 → h2 → h3)
- [ ] Skip to content link present
- [ ] No content hidden from screen readers

---

## Performance Testing

### Load Times
- [ ] Events page calendar loads < 2s
- [ ] Google Maps embed loads < 3s
- [ ] Download page loads < 1.5s
- [ ] No layout shift when images load

### Rendering
- [ ] No jank when selecting calendar dates
- [ ] Filter pills respond instantly
- [ ] Month navigation smooth (no lag)
- [ ] Sidebar updates without delay

### Lighthouse Audit
Run locally: `npm run build && npm run start`

- [ ] Performance: > 85
- [ ] Accessibility: > 90
- [ ] Best Practices: > 85
- [ ] SEO: > 90
- [ ] No deprecation warnings

---

## Cross-Browser Testing

### Chrome
- [ ] All features work
- [ ] Maps embed renders correctly
- [ ] Downloads work
- [ ] Calendar fully functional

### Firefox
- [ ] All features work
- [ ] Maps embed renders correctly
- [ ] Downloads work
- [ ] Calendar fully functional

### Safari
- [ ] All features work
- [ ] Maps embed renders correctly
- [ ] Downloads work (may need enable download prompt)
- [ ] Calendar fully functional
- [ ] Check -webkit vendor prefixes if needed

### Edge
- [ ] All features work
- [ ] Maps embed renders correctly
- [ ] Downloads work
- [ ] Calendar fully functional

### Mobile Safari (iOS 14+)
- [ ] Calendar responsive
- [ ] Maps embed zoom works with pinch
- [ ] Downloads trigger correctly
- [ ] No horizontal scroll

### Chrome Mobile (Android 8+)
- [ ] Calendar responsive
- [ ] Maps embed zoom works with pinch
- [ ] Downloads trigger correctly
- [ ] No horizontal scroll

---

## SEO Testing

### Meta Tags
- [ ] Page titles unique and descriptive
- [ ] Meta descriptions present
- [ ] Canonical tags present on removed route redirect
- [ ] Open Graph tags (if applicable)

### Structured Data
- [ ] Schema.org markup valid
- [ ] Breadcrumb schema correct
- [ ] No validation errors in structured data

### Sitemap
- [ ] Sitemap updated (respect-auburn removed)
- [ ] All Plan pages listed
- [ ] Events page listed

---

## Security Testing

### Links & Redirects
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] No mixed content warnings (https everywhere)
- [ ] Redirect doesn't expose information

### Content Security
- [ ] No inline scripts
- [ ] No dangerous iframes (verify Google Maps is trusted)
- [ ] No XSS vulnerabilities in event data
- [ ] Form inputs sanitized

---

## User Acceptance Testing

### Scenario 1: Planning a Wedding
1. [ ] Navigate to `/plan/weddings`
2. [ ] Header displays properly
3. [ ] View wedding venues
4. [ ] Map venue on Google Maps
5. [ ] Navigate back to plan section

### Scenario 2: Finding an Event
1. [ ] Navigate to `/events`
2. [ ] Calendar displays
3. [ ] Select date with events
4. [ ] See events for that day
5. [ ] Navigate months

### Scenario 3: Downloading Guides
1. [ ] Navigate to `/plan/maps-guides`
2. [ ] See download options
3. [ ] Download a PDF
4. [ ] File opens successfully

### Scenario 4: Finding a Restaurant
1. [ ] Navigate to `/dining`
2. [ ] Use category filters
3. [ ] Filter works correctly
4. [ ] Results update
5. [ ] Clear filters

---

## Content Verification

### All Pages
- [ ] No placeholder text remains
- [ ] All links point to real pages
- [ ] Phone numbers formatted correctly
- [ ] Email addresses working
- [ ] Hours of operation current

### Special Cases
- [ ] Wedding venue images match venues (if added)
- [ ] Event calendar shows actual upcoming events
- [ ] Restaurant listings current

---

## Post-Deployment Monitoring

### First 24 Hours
- [ ] Monitor error logs for JavaScript errors
- [ ] Check Google Maps embed loading
- [ ] Verify no 404s on download links
- [ ] Monitor calendar interactions

### First Week
- [ ] Check Lighthouse scores
- [ ] Monitor user behavior (time on page, clicks)
- [ ] Verify redirect analytics
- [ ] Check mobile performance

### Ongoing
- [ ] Weekly 404 error report
- [ ] Monthly Lighthouse audits
- [ ] Traffic trends on events page
- [ ] Download link engagement

---

## Sign-Off

**QA Testing Complete**: _____ Date: _____

**Approval for Deployment**: _____ Date: _____

**Deployed to Production**: _____ Date: _____

**Post-Deployment Verified**: _____ Date: _____

---

## Notes & Issues Found

```
Issue #1: [Description]
Status: [Open/Fixed]
Severity: [Critical/High/Medium/Low]
Resolution: [Action taken]

Issue #2: [Description]
...
```

---

## Rollback Plan

If critical issues found:
1. Revert to previous git commit
2. Remove new components (EventsCalendar)
3. Restore events page to previous state
4. Remove image utilities if not needed
5. Rebuild and test

**Estimated Rollback Time**: 30 minutes

---

**Checklist Version**: 1.0  
**Last Updated**: January 2026  
**Status**: Ready for QA

