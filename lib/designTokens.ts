/**
 * Design Token System - TypeScript Exports
 * 
 * Homepage Visualization Section Tokens
 * 
 * Usage:
 * import { colors, spacing, typography } from '@/lib/designTokens'
 * 
 * Design Intent: Premium, Civic, Tourism-first, Trustworthy
 */

// ═══════════════════════════════════════════════════════════════
// COLOR TOKENS
// ═══════════════════════════════════════════════════════════════

export const colors = {
  forest: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#4CAF50',
    500: '#2D5A27', // Primary
    600: '#1E3A1A',
    700: '#1B5E20',
    800: '#0D3810',
    900: '#071F08',
  },
  gold: {
    50: '#FFF9E6',
    100: '#FFF0BF',
    200: '#FFE699',
    300: '#FFD966',
    400: '#FFCC33',
    500: '#D4A017', // Accent
    600: '#B8860B',
    700: '#8B6914',
    800: '#5C4A0F',
    900: '#2D2507',
  },
  charcoal: {
    50: '#F5F5F5',
    100: '#E5E5E5',
    200: '#D4D4D4',
    300: '#A3A3A3',
    400: '#737373',
    500: '#525252',
    600: '#404040',
    700: '#2D2D2D',
    800: '#1A1A1A',
    900: '#0A0A0A',
  },
  cream: {
    50: '#FFFEF7',
    100: '#FFFCEB',
    200: '#FFF8D6',
    300: '#FFF3C2',
    400: '#FFEEAE',
  },
  lake: {
    400: '#4BA3C7',
    500: '#2E8FA3',
    600: '#247082',
  },
  rust: {
    500: '#A0522D',
    600: '#8B4513',
  },
  semantic: {
    primary: '#2D5A27',
    primaryHover: '#1E3A1A',
    primaryActive: '#1B5E20',
    accent: '#D4A017',
    accentHover: '#B8860B',
    textPrimary: '#0A0A0A',
    textSecondary: '#2D2D2D',
    textTertiary: '#525252',
    textDisabled: '#A3A3A3',
    bgPrimary: '#FFFEF7',
    bgSecondary: '#FFFCEB',
    bgCard: '#FFFFFF',
    borderSubtle: '#D4D4D4',
    borderMedium: '#A5D6A7',
    borderStrong: '#81C784',
  },
} as const

// ═══════════════════════════════════════════════════════════════
// SPACING TOKENS
// ═══════════════════════════════════════════════════════════════

const spacingBase = 4

export const spacing = {
  base: spacingBase,
  1: spacingBase * 1,   // 4px
  2: spacingBase * 2,   // 8px
  3: spacingBase * 3,   // 12px
  4: spacingBase * 4,   // 16px
  5: spacingBase * 5,   // 20px
  6: spacingBase * 6,   // 24px
  8: spacingBase * 8,   // 32px
  10: spacingBase * 10, // 40px
  12: spacingBase * 12, // 48px
  16: spacingBase * 16, // 64px
  20: spacingBase * 20, // 80px
  24: spacingBase * 24, // 96px
  32: spacingBase * 32, // 128px
  card: {
    paddingMobile: spacingBase * 6,  // 24px
    paddingDesktop: spacingBase * 8, // 32px
  },
  section: {
    paddingMobile: spacingBase * 24, // 96px
    paddingDesktop: spacingBase * 32, // 128px
  },
  container: {
    paddingMobile: spacingBase * 4,  // 16px
    paddingDesktop: spacingBase * 8,  // 32px
  },
  grid: {
    gapMobile: spacingBase * 4,  // 16px
    gapDesktop: spacingBase * 6, // 24px
  },
} as const

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY TOKENS
// ═══════════════════════════════════════════════════════════════

export const typography = {
  fontFamily: {
    display: "'Playfair Display', Georgia, serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.75rem', // 28px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    hero: 'clamp(2rem, 5vw, 3.75rem)',
    h1: 'clamp(1.75rem, 4vw, 2.5rem)',
    h2: 'clamp(1.5rem, 3.5vw, 2rem)',
    h3: 'clamp(1.25rem, 3vw, 1.5rem)',
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.75,
  },
  letterSpacing: {
    tighter: '-0.03em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.15em',
  },
} as const

// ═══════════════════════════════════════════════════════════════
// ELEVATION TOKENS
// ═══════════════════════════════════════════════════════════════

export const elevation = {
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    forest: '0 10px 25px rgba(45, 90, 39, 0.2)',
    gold: '0 10px 25px rgba(212, 160, 23, 0.2)',
  },
  levels: {
    0: 'none',
    1: '0 1px 2px rgba(0, 0, 0, 0.05)',
    2: '0 4px 6px rgba(0, 0, 0, 0.1)',
    3: '0 10px 15px rgba(0, 0, 0, 0.1)',
    4: '0 20px 25px rgba(0, 0, 0, 0.1)',
    5: '0 25px 50px rgba(0, 0, 0, 0.25)',
  },
} as const

// ═══════════════════════════════════════════════════════════════
// BLUR TOKENS
// ═══════════════════════════════════════════════════════════════

export const blur = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '40px',
} as const

// ═══════════════════════════════════════════════════════════════
// GLASS TOKENS
// ═══════════════════════════════════════════════════════════════

export const glass = {
  opacity: {
    light: 0.1,
    medium: 0.15,
    heavy: 0.2,
  },
  blur: blur.md,
  background: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    heavy: 'rgba(255, 255, 255, 0.2)',
  },
  border: {
    light: 'rgba(255, 255, 255, 0.2)',
    medium: 'rgba(255, 255, 255, 0.3)',
  },
} as const

// ═══════════════════════════════════════════════════════════════
// DEPTH TOKENS (Z-Index)
// ═══════════════════════════════════════════════════════════════

export const depth = {
  base: 0,
  content: 1,
  card: 10,
  elevated: 20,
  tooltip: 30,
  dropdown: 40,
  modal: 50,
  maximum: 100,
} as const

// ═══════════════════════════════════════════════════════════════
// MOTION TOKENS
// ═══════════════════════════════════════════════════════════════

export const motion = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 600,
    slower: 800,
    verySlow: 1200,
    slowest: 2000,
  },
  delay: {
    none: 0,
    short: 100,
    medium: 200,
    long: 400,
    veryLong: 800,
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // power2.out
    natural: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // back.out(1.2)
    consistent: 'cubic-bezier(0.42, 0, 0.58, 1)', // power1.inOut
  },
  transition: {
    fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    color: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

// ═══════════════════════════════════════════════════════════════
// INTERACTION TOKENS
// ═══════════════════════════════════════════════════════════════

export const interaction = {
  hover: {
    scaleSm: 1.02,
    scaleMd: 1.05,
    scaleLg: 1.1,
  },
  focus: {
    ringWidth: 2,
    ringOffset: 2,
    ringColor: colors.semantic.primary,
  },
  active: {
    scale: 0.98,
    opacity: 0.9,
  },
} as const

// ═══════════════════════════════════════════════════════════════
// BREAKPOINT TOKENS
// ═══════════════════════════════════════════════════════════════

export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
} as const

// ═══════════════════════════════════════════════════════════════
// GRID TOKENS
// ═══════════════════════════════════════════════════════════════

export const grid = {
  columns: {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  },
  gap: {
    mobile: spacing.grid.gapMobile,
    desktop: spacing.grid.gapDesktop,
  },
  container: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1400,
  },
} as const

// ═══════════════════════════════════════════════════════════════
// BORDER TOKENS
// ═══════════════════════════════════════════════════════════════

export const borders = {
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },
  width: {
    thin: 1,
    medium: 2,
    thick: 3,
  },
} as const

// ═══════════════════════════════════════════════════════════════
// SEASONAL TOKENS
// ═══════════════════════════════════════════════════════════════

export const seasonal = {
  spring: {
    accent: '#E6B800',
    bg: '#FFFDF0',
  },
  summer: {
    accent: '#FFD700',
    bg: '#FFFEF7',
  },
  fall: {
    accent: '#C9A961',
    bg: '#FFF9E6',
  },
  winter: {
    accent: '#B8860B',
    bg: '#FFFCEB',
  },
} as const

// ═══════════════════════════════════════════════════════════════
// EXPORT ALL TOKENS
// ═══════════════════════════════════════════════════════════════

export const designTokens = {
  colors,
  spacing,
  typography,
  elevation,
  blur,
  glass,
  depth,
  motion,
  interaction,
  breakpoints,
  grid,
  borders,
  seasonal,
} as const

export default designTokens
