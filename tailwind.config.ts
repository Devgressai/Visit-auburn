import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // EXISTING PALETTE — Sierra Gold (Auburn Gold Country)
        // ═══════════════════════════════════════════════════════════════
        gold: {
          50: '#FFF9E6',
          100: '#FFF0BF',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFCC33',
          500: '#D4A017', // Primary gold
          600: '#B8860B', // Dark gold
          700: '#8B6914',
          800: '#5C4A0F',
          900: '#2D2507',
        },
        forest: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#4CAF50',
          500: '#2D5A27', // Primary forest
          600: '#1E3A1A', // Dark forest
          700: '#1B5E20',
          800: '#0D3810',
          900: '#071F08',
        },
        rust: {
          50: '#FBE9E7',
          100: '#FFCCBC',
          200: '#FFAB91',
          300: '#FF8A65',
          400: '#D2691E',
          500: '#A0522D', // Primary rust/terracotta
          600: '#8B4513', // Saddle brown
          700: '#6D3813',
          800: '#4E2A0F',
          900: '#2F1A0A',
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

        // ═══════════════════════════════════════════════════════════════
        // DESTINATION PALETTE — Warm Neutrals for City Tourism
        // ═══════════════════════════════════════════════════════════════
        
        // Background tones (warm neutrals instead of blue)
        deep: {
          bg: '#1A1A1A',        // Charcoal for dark sections
          surface: '#F5F2EB',   // Warm cream for light sections  
          card: '#FFFFFF',      // White for cards
        },
        
        // Lake blues
        lake: {
          50: '#E6F4F9',
          100: '#CCE9F3',
          200: '#99D3E7',
          300: '#66BDDB',
          400: '#4BA3C7',       // --lake-blue: Primary accent
          500: '#2E8FA3',       // --lake-teal: Secondary accent
          600: '#247082',
          700: '#1B5461',
          800: '#123841',
          900: '#091C20',
        },
        
        // Pine greens (ACCENT - use sparingly)
        pine: {
          50: '#E8F5EF',
          100: '#D1EBDF',
          200: '#A3D7BF',
          300: '#75C39F',
          400: '#47AF7F',
          500: '#1F6B4D',       // --pine: Primary pine accent
          600: '#144735',       // --pine-dark: Dark pine
          700: '#0F3527',
          800: '#0A231A',
          900: '#05120D',
        },
        
        // Sunset accent (very limited use)
        sunset: {
          400: '#F5C992',
          500: '#F2B27A',       // --sunset-accent
          600: '#E89B5C',
        },
        
        // Text colors for dark mode
        'text-primary': '#F5FAFF',
        'text-muted': 'rgba(245, 250, 255, 0.72)',
        'border-subtle': 'rgba(255, 255, 255, 0.10)',
      },
      
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1a1a1a',
            h1: { fontWeight: '700', lineHeight: '1.1' },
            h2: { fontWeight: '700', lineHeight: '1.2' },
            h3: { fontWeight: '600', lineHeight: '1.3' },
          },
        },
        // Dark mode typography
        invert: {
          css: {
            color: '#F5FAFF',
            h1: { color: '#F5FAFF' },
            h2: { color: '#F5FAFF' },
            h3: { color: '#F5FAFF' },
            strong: { color: '#F5FAFF' },
          },
        },
      },
      
      fontSize: {
        // Hero headline - responsive clamping
        'hero-display': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.05', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-xl': ['5rem', { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.03em' }],
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h2': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
      },
      
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 40px rgba(212, 160, 23, 0.3)',
        'glow-lg': '0 0 60px rgba(212, 160, 23, 0.4)',
        'glow-pine': '0 0 40px rgba(31, 107, 77, 0.3)',
        'glow-lake': '0 0 40px rgba(75, 163, 199, 0.25)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #D4A017 0%, #B8860B 50%, #8B6914 100%)',
        'gradient-forest': 'linear-gradient(135deg, #2D5A27 0%, #1E3A1A 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)',
        // Warm destination gradients (minimal blue usage)
        'gradient-cream': 'linear-gradient(180deg, #FFFFFF 0%, #F5F2EB 100%)',
        'gradient-pine': 'linear-gradient(135deg, #1F6B4D 0%, #144735 100%)',
        'gradient-lake': 'linear-gradient(135deg, #4BA3C7 0%, #2E8FA3 100%)',  // Keep for link accents only
      },
      
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
