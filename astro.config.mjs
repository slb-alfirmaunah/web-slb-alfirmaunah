import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react'; 
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// --- IMPORT ADAPTER VERCEL YANG BARU ---
import vercel from '@astrojs/vercel';

export default defineConfig({
  // --- IDENTITAS DOMAIN ---
  site: 'https://slbalfirmaunah.com',
  // ------------------------

  integrations: [
    tailwind(),
    react(), 
    markdoc(),
    keystatic(),
  ],
  
  // --- MUTASI KE STATIC (STANDAR ASTRO 5) ---
  output: 'static',
  adapter: vercel(),
});