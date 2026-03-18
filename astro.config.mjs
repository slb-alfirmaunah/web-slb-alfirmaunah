import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react'; // MESIN UTAMA KEYSTATIC
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// --- IMPORT ADAPTER VERCEL ---
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  // --- IDENTITAS DOMAIN ---
  site: 'https://slbalfirmaunah.com',
  // ------------------------

  integrations: [
    tailwind(),
    react(), // INI WAJIB ADA AGAR DASHBOARD BISA DIBUKA
    markdoc(),
    keystatic(),
  ],
  
  // --- MUTASI ARSITEKTUR KE HYBRID (CRITICAL FIX) ---
  output: 'hybrid',
  adapter: vercel(),
});