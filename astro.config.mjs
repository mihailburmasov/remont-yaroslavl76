// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Сборка для превью на GitHub Pages (repo-страница https://<user>.github.io/remont-yaroslavl76/)
// живёт под подпутём, поэтому сайту нужен base. В "боевой" сборке (реальный домен) DEPLOY_TARGET
// не задан, base остаётся корневым — переключается флагом из GitHub Actions workflow.
const isGhPagesBuild = process.env.DEPLOY_TARGET === 'gh-pages';

// https://astro.build/config
export default defineConfig({
  site: isGhPagesBuild ? 'https://mihailburmasov.github.io' : 'https://proremont76.ru',
  base: isGhPagesBuild ? '/remont-yaroslavl76' : '/',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/styleguide'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
