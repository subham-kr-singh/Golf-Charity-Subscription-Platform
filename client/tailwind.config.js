/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'accent-2': 'var(--color-accent-2)',
        'accent-3': 'var(--color-accent-3)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        btn: 'var(--radius-btn)',
        badge: 'var(--radius-badge)',
      },
      boxShadow: {
        'glow-cyan': 'var(--shadow-glow-cyan)',
        'glow-violet': 'var(--shadow-glow-violet)',
        'glow-gold': 'var(--shadow-glow-gold)',
        card: 'var(--shadow-card)',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      }
    },
  },
  plugins: [],
}
