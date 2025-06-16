// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import db from '@astrojs/db';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), db()],
  output: "server",
  site: "https://unfallkarte-hamburg.de",
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({
    mode: 'standalone'
  })
});