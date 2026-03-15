import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react'; // MESIN UTAMA KEYSTATIC
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// --- IMPORT ADAPTER VERCEL ---
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [
    tailwind(),
    react(), // INI WAJIB ADA AGAR DASHBOARD BISA DIBUKA
    markdoc(),
    keystatic(),
  ],
  
  // --- KONFIGURASI SERVER VERCEL ---
  output: 'server',
  adapter: vercel(),
});