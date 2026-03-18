import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // Deteksi anomali infeksi localhost dari server internal Vercel
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    
    // Mutasi paksa identitas domain
    url.hostname = 'slbalfirmaunah.com';
    url.protocol = 'https:';
    url.port = '';

    // Operasi bedah untuk memperbaiki rute yang dihancurkan Vercel (?api... menjadi /api...)
    if (url.search.includes('api/keystatic')) {
      // Paksakan rute callback GitHub yang absolut
      url.pathname = '/api/keystatic/github/oauth/callback';
      url.search = ''; 
    }

    // Suntikkan URL yang sudah disterilisasi ke dalam sistem Astro
    context.url = url;
    
    // Timpa request asli dari Vercel dengan request buatan kita
    const interceptedRequest = new Request(url.toString(), context.request);
    return next(interceptedRequest);
  }

  // Jika URL sudah benar, biarkan lewat
  return next();
});