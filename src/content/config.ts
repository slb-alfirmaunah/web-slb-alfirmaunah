import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const berita = defineCollection({
  loader: glob({ pattern: '**/index.mdoc', base: 'src/content/berita' }),
  schema: z.object({
    judul: z.string(),
    tanggal: z.date(),
    kategori: z.string(),
    deskripsi: z.string(),
    gambar: z.string(),
  }),
});

const testimoni = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/testimoni' }),
  schema: z.object({
    nama: z.string(),
    peran: z.string(),
    pesan: z.string(),
  }),
});

const slideshow = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/slideshow' }),
  schema: z.object({
    // --- PERUBAHAN: Menjadikan judul dan subjudul opsional agar bisa upload gambar saja ---
    judul: z.string().optional(),
    subjudul: z.string().optional(),
    // --------------------------------------------------------------------------------------
    gambar: z.string(),
    urutan: z.number().default(1),
  }),
});

const guru = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/guru' }),
  schema: z.object({
    nama: z.string(),
    jabatan: z.string(),
    
    // --- PENAMBAHAN FIELD PENDIDIKAN AGAR LOLOS VALIDASI ASTRO ---
    pendidikan: z.string().optional(),
    // -------------------------------------------------------------

    nip: z.string().optional(),
    foto: z.string().optional(), 
  }),
});

const siswa = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/siswa' }),
  schema: z.object({
    nama: z.string(),
    nisn: z.string().optional(),
    tingkat: z.string().optional(),
    kelas: z.string(),
    kekhususan: z.string().optional(),
  }),
});

// --- KOLEKSI FASILITAS (Disesuaikan kembali ke String) ---
const fasilitas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/fasilitas' }),
  schema: z.object({
    nama: z.string(), // Diubah dari z.object ke z.string sesuai data JSON
    deskripsi: z.string(),
    gambar: z.string(),
  }),
});

const ppdb = defineCollection({
  loader: glob({ pattern: 'info.json', base: 'src/content/ppdb' }),
  schema: z.object({
    judulTahunAjaran: z.string().default("Tahun Ajaran Baru"),
    posterTahunan: z.string().optional().nullable(),
    brosurPdf: z.string().optional().nullable(),
    syarat: z.array(z.object({
      teks: z.string(),
      catatan: z.string().optional().nullable(),
    })).default([]),
    alur: z.array(z.object({
      judul: z.string(),
      deskripsi: z.string(),
    })).default([]),
    whatsappNumber: z.string().default(""),
    pesanWA: z.string().default(""),
    jadwalHari: z.string().default(""),
    jadwalJam: z.string().default(""),
  }),
});

export const collections = {
  'berita': berita,
  'testimoni': testimoni,
  'slideshow': slideshow,
  'guru': guru,
  'siswa': siswa, 
  'fasilitas': fasilitas,
  'ppdb': ppdb,
};