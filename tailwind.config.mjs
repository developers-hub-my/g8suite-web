/** @type {import('tailwindcss').Config} */

// Semantic tokens are RGB-channel CSS variables (defined in global.css). This
// wrapper lets Tailwind inject alpha (e.g. bg-brass/40) while the values flip
// between light and dark themes via the `.dark` class on <html>.
const v = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: v('--bg'),
        soft: v('--soft'),
        card: { DEFAULT: v('--card'), 2: v('--card-2') },
        line: { DEFAULT: v('--line'), strong: v('--line-strong') },
        body: v('--text'),
        muted: v('--text-muted'),
        faint: v('--text-faint'),
        brass: { DEFAULT: v('--brass'), soft: v('--brass-soft'), on: v('--on-brass') },
        green: v('--green'),
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
      boxShadow: {
        elevated: '0 6px 28px -12px rgb(var(--shadow) / 0.5)',
      },
    },
  },
  plugins: [],
};
