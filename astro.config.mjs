// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://lockd.app',
  // 'server' so /api/waitlist can run; every page still opts into static
  // prerendering (see `export const prerender = true` in src/pages/index.astro)
  // so the marketing page itself ships as static HTML.
  output: 'server',
  adapter: vercel(),
  build: {
    // Ship one stylesheet rather than a <style> tag per component.
    inlineStylesheets: 'auto',
  },
  image: {
    // The five screenshots are the only product imagery; nothing is remote.
    remotePatterns: [],
  },
  devToolbar: {
    enabled: false,
  },
});
