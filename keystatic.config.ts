import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    berita: collection({
      label: 'Berita',
      slugField: 'judul',
      path: 'src/content/berita/*/',
      format: { contentField: 'konten' },
      schema: {
        judul: fields.slug({ name: { label: 'Judul Berita' } }),
        tanggal: fields.date({ label: 'Tanggal Publikasi' }),
        kategori: fields.text({ label: 'Kategori' }),
        deskripsi: fields.text({ label: 'Deskripsi Singkat', multiline: true }),
        gambar: fields.text({ label: 'URL Gambar' }), 
        konten: fields.document({ label: 'Isi Artikel', formatting: true }),
      },
    }),
    testimoni: collection({
      label: 'Buku Tamu',
      slugField: 'nama',
      path: 'src/content/testimoni/*',
      format: { data: 'json' },
      schema: {
        nama: fields.slug({ name: { label: 'Nama' } }),
        peran: fields.text({ label: 'Peran' }),
        pesan: fields.text({ label: 'Pesan', multiline: true }),
      },
    }),
    slideshow: collection({
      label: 'Slideshow Hero',
      slugField: 'judul',
      path: 'src/content/slideshow/*',
      format: { data: 'json' },
      schema: {
        judul: fields.slug({ name: { label: 'Judul Slide' } }),
        subjudul: fields.text({ label: 'Teks Pendukung' }),
        gambar: fields.image({
          label: 'Gambar Background',
          directory: 'public/images/hero',
          publicPath: '/images/hero/',
        }),
        urutan: fields.number({ label: 'Urutan Tampil', defaultValue: 1 }),
      },
    }),
    guru: collection({
      label: 'Daftar Guru & Staf',
      slugField: 'nama',
      path: 'src/content/guru/*',
      format: { data: 'json' },
      schema: {
        nama: fields.slug({ name: { label: 'Nama Lengkap (beserta gelar)' } }),
        jabatan: fields.text({ label: 'Mata Pelajaran / Jabatan' }),
        
        // --- PENAMBAHAN FIELD PENDIDIKAN ---
        pendidikan: fields.text({ 
          label: 'Riwayat Pendidikan', 
          description: 'Contoh: S1 Pendidikan Luar Biasa (UM)' 
        }),
        // -----------------------------------

        nip: fields.text({ label: 'NIP (Opsional)' }),
        foto: fields.image({
          label: 'Foto Profil Guru',
          directory: 'public/images/guru',
          publicPath: '/images/guru/',
        }),
      },
    }),
    siswa: collection({
      label: 'Daftar Siswa',
      slugField: 'nama',
      path: 'src/content/siswa/*', 
      format: { data: 'json' },
      schema: {
        nama: fields.slug({ name: { label: 'Nama Lengkap Siswa' } }),
        nisn: fields.text({ label: 'NIS / NISN' }),
        tingkat: fields.select({
          label: 'Tingkat Pendidikan',
          options: [
            { label: 'TKLB', value: 'TKLB' },
            { label: 'SDLB', value: 'SDLB' },
            { label: 'SMPLB', value: 'SMPLB' },
            { label: 'SMALB', value: 'SMALB' },
            { label: 'TRANSISI', value: 'TRANSISI' },
          ],
          defaultValue: 'SDLB',
        }),
        kelas: fields.text({ label: 'Kelas' }),
        kekhususan: fields.text({ label: 'Kekhususan' }),
      },
    }),
    fasilitas: collection({
      label: 'Fasilitas Sekolah',
      slugField: 'nama',
      path: 'src/content/fasilitas/*',
      format: { data: 'json' },
      schema: {
        nama: fields.slug({ name: { label: 'Nama Fasilitas' } }),
        deskripsi: fields.text({ label: 'Deskripsi Singkat', multiline: true }),
        gambar: fields.image({
          label: 'Foto Fasilitas',
          directory: 'public/images/fasilitas',
          publicPath: '/images/fasilitas/',
        }),
      },
    }),
  },
  singletons: {
    profilSekolah: singleton({
      label: 'Profil Sekolah',
      path: 'src/content/profil/sekolah',
      format: { data: 'json' },
      schema: {
        judul: fields.text({ label: 'Judul' }),
        subjudul: fields.text({ label: 'Sub-judul' }),
        banner: fields.image({
          label: 'Gambar Banner',
          directory: 'public/images/profil',
          publicPath: '/images/profil/',
        }),
        visi: fields.text({ label: 'Visi Sekolah', multiline: true }),
        misi: fields.array(fields.object({ teks: fields.text({ label: 'Poin Misi' }) }), {
          label: 'Misi Sekolah',
          itemLabel: (props) => props?.fields?.teks?.value || 'Poin Misi',
        }),
        sejarah: fields.document({ label: 'Sejarah', formatting: true }),
      },
    }),
    ppdb: singleton({
      label: 'Pengaturan PPDB',
      path: 'src/content/ppdb/info',
      format: { data: 'json' },
      schema: {
        judulTahunAjaran: fields.text({ label: 'Judul Tahun Ajaran', defaultValue: 'Tahun Ajaran 2026/2027' }),
        posterTahunan: fields.image({
          label: 'Brosur PPDB (Portrait 1080x1920)',
          directory: 'public/images/ppdb',
          publicPath: '/images/ppdb/',
        }),
        
        brosurPdf: fields.file({
          label: 'File Brosur PDF (Opsional)',
          description: 'Upload berkas brosur dalam format PDF agar bisa diunduh wali murid',
          directory: 'public/files/ppdb',
          publicPath: '/files/ppdb/',
        }),

        syarat: fields.array(
          fields.object({
            teks: fields.text({ label: 'Nama Syarat' }),
            catatan: fields.text({ label: 'Catatan (Opsional)', description: 'Contoh: Lampirkan jika ada' }),
          }),
          { 
            label: 'Persyaratan Administrasi', 
            itemLabel: (p) => p.fields.teks.value || 'Syarat Baru' 
          }
        ),
        alur: fields.array(
          fields.object({
            judul: fields.text({ label: 'Judul Langkah' }),
            deskripsi: fields.text({ label: 'Deskripsi', multiline: true }),
          }),
          { 
            label: 'Alur Pendaftaran', 
            itemLabel: (p) => p.fields.judul.value || 'Langkah Baru' 
          }
        ),
        whatsappNumber: fields.text({ 
          label: 'No WhatsApp Admin', 
          defaultValue: '628',
          description: 'Awali dengan 62 (Contoh: 6281234567890)'
        }),
        pesanWA: fields.text({ 
          label: 'Isi Pesan WA', 
          multiline: true,
          defaultValue: 'Halo Admin SLB Al-Firmaunah, saya ingin menanyakan informasi pendaftaran siswa baru.'
        }),
        jadwalHari: fields.text({ label: 'Hari Pelayanan', defaultValue: "Senin - Jum'at" }),
        jadwalJam: fields.text({ label: 'Jam Pelayanan', defaultValue: '07.00 - 15.00' }),
      }
    }),
  },
});