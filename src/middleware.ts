import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // 1. Biarkan Keystatic dan Vercel memproses data dengan error mereka sendiri
  const response = await next();

  // 2. OPERASI PEMBAJAKAN: Cegat data tepat sebelum dikirim ke browser
  if (response.status === 302 || response.status === 307) {
    const location = response.headers.get('location');
    
    // Jika ini adalah URL redirect ke GitHub yang membawa penyakit localhost
    if (location && location.includes('github.com/login/oauth/authorize')) {
      
      let fixedLocation = location;
      
      // Eksekusi perbaikan anomali tanda tanya dari Vercel (%3F adalah kode untuk ?)
      // Kita ubah menjadi %2F (kode untuk garis miring /)
      fixedLocation = fixedLocation.replace('localhost%3Fapi', 'slbalfirmaunah.com%2Fapi');
      fixedLocation = fixedLocation.replace('localhost?api', 'slbalfirmaunah.com/api');
      
      // Musnahkan sisa kata localhost
      fixedLocation = fixedLocation.replace('localhost', 'slbalfirmaunah.com');

      // Gandakan semua cookie asli (SANGAT KRUSIAL agar sesi login tidak putus)
      const headers = new Headers(response.headers);
      
      // Suntikkan URL yang sudah disterilkan ke jalur pengiriman
      headers.set('location', fixedLocation);

      // Tendang keluar response yang sudah diperbaiki ke browser
      return new Response(null, {
        status: response.status,
        headers: headers
      });
    }
  }

  // Jika bukan halaman login, biarkan lewat
  return response;
});