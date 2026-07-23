import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://g8suite.com',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    icon({ include: { lucide: ['*'] } }),
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
