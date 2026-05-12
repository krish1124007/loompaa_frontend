/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        elevated: 'var(--bg-elevated)',
        cream: 'var(--bg-inverse)',
        ink: {
          DEFAULT: 'var(--ink-primary)',
          sec: 'var(--ink-secondary)',
          tri: 'var(--ink-tertiary)',
          inverse: 'var(--ink-inverse)',
          'on-cream': 'var(--ink-on-cream)',
        },
        tangerine: 'var(--accent-tangerine)',
        lemon: 'var(--accent-lemon)',
        'card-orange': 'var(--card-orange)',
        'card-blue': 'var(--card-blue)',
        'card-yellow': 'var(--card-yellow)',
        'card-mint': 'var(--card-mint)',
        success: 'var(--success)',
        error: 'var(--error)',
      },
      borderColor: {
        subtle: 'var(--border-subtle)',
        strong: 'var(--border-strong)',
      },
      fontFamily: {
        display: ['"Mona Sans"', 'sans-serif'],
        sans: ['"Mona Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        eyebrow: ['11px', { letterSpacing: '0.14em', lineHeight: '1', fontWeight: '700' }],
        'display-xl': ['clamp(2.8rem, 7.5vw, 6.5rem)', { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-lg': ['clamp(2.4rem, 5.5vw, 5rem)',   { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-md': ['clamp(1.9rem, 4vw, 3.2rem)',   { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '700' }],
      },
      borderRadius: {
        pill: '9999px',
        card: '20px',
      },
      maxWidth: {
        '7xl': '1280px',
        prose: '70ch',
      },
      transitionTimingFunction: {
        loompaa: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.3333%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
