// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lockd.app',
  output: 'static',
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
