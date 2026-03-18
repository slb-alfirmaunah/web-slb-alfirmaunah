import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Hanya bajak response yang berupa Redirect (302/307)
  if (response.status === 302 || response.status === 307) {
    const location = response.headers.get('location');
    
    // Deteksi jika ini adalah jalur otorisasi ke GitHub
    if (location && location.includes('github.com/login/oauth/authorize')) {
      
      // 1. OPERASI BEDAH URL (Mensterilkan localhost)
      let fixedLocation = location;
      fixedLocation = fixedLocation.replace(/localhost(?:%3F|\?)api/g, 'slbalfirmaunah.com/api');
      fixedLocation = fixedLocation.replace('localhost', 'slbalfirmaunah.com');

      // 2. OPERASI PENYELAMATAN COOKIE (SANGAT KRUSIAL)
      const newHeaders = new Headers(response.headers);
      
      // Deteksi engine Node.js modern yang memiliki fitur ekstrak cookie
      if ('getSetCookie' in response.headers) {
        // Ambil cookie secara murni (dalam bentuk Array)
        const cookies = response.headers.getSetCookie();
        // Hapus cookie lama yang rawan tergabung (collapse)
        newHeaders.delete('set-cookie');
        // Suntikkan kembali cookie satu per satu secara independen
        cookies.forEach(cookie => newHeaders.append('set-cookie', cookie));
      }

      // Suntikkan URL yang sudah bersih
      newHeaders.set('location', fixedLocation);

      // Tendang keluar ke browser
      return new Response(null, {
        status: response.status,
        headers: newHeaders
      });
    }
  }

  return response;
});