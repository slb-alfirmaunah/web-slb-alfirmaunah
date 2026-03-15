/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: { 
    extend: {
      // Opsi tambahan agar warna merahnya sesuai dengan brand sekolah
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    } 
  },
  plugins: [
    typography, // Ini yang akan mengaktifkan spacing pada sejarah sekolah
  ],
};