/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A1F44',
          700: '#1E3A6F',
          500: '#3B5998',
        },
        sky: {
          400: '#7BB3E8',
          100: '#DCE9F5',
        },
        ink: {
          900: '#0F172A',
          600: '#475569',
          400: '#94A3B8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F8FAFC',
          card: '#F1F5F9',
        },
        accent: {
          green: '#10B981',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
      boxShadow: {
        elevated: '0 4px 20px -8px rgba(10, 31, 68, 0.10)',
      },
    },
  },
  plugins: [],
};
