import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  // --- AKTIVASI MODE CLOUD (ANTI-BUG VERCEL) ---
  storage: { 
    kind: 'cloud',
  },
  cloud: {
    project: 'slb-alfirmaunah/web-slb-alfirmaunah', 
  },
  // ----------------------------------------------

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
        gambar: fields.image({
          label: 'Foto Cover Berita',
          directory: 'public/images/berita',
          publicPath: '/images/berita/',
          validation: { isRequired: true }
        }),
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
        pendidikan: fields.text({ label: 'Riwayat Pendidikan' }),
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
    galeriVideo: collection({
      label: 'Galeri Video',
      slugField: 'judul',
      path: 'src/content/galeri-video/*',
      format: { data: 'json' },
      schema: {
        judul: fields.slug({ name: { label: 'Judul Video' } }),
        tanggal: fields.date({ label: 'Tanggal Publikasi' }),
        youtubeId: fields.text({ label: 'ID Video YouTube' }),
        deskripsi: fields.text({ label: 'Deskripsi Singkat', multiline: true }),
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
          itemLabel: (p) => p.fields.teks.value || 'Poin Misi',
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
          label: 'Brosur PPDB',
          directory: 'public/images/ppdb',
          publicPath: '/images/ppdb/',
        }),
        
        // --- INJEKSI PERBAIKAN ERROR PPDB ---
        brosurPdf: fields.text({ 
          label: 'Link Download Brosur (PDF / Google Drive)',
          description: 'Kosongkan jika tidak ada file PDF'
        }),
        // ------------------------------------
        
        syarat: fields.array(fields.object({ teks: fields.text({ label: 'Syarat' }) }), { label: 'Syarat', itemLabel: (p) => p.fields.teks.value || 'Syarat' }),
        alur: fields.array(fields.object({ judul: fields.text({ label: 'Judul' }), deskripsi: fields.text({ label: 'Deskripsi' }) }), { label: 'Alur', itemLabel: (p) => p.fields.judul.value || 'Langkah' }),
        whatsappNumber: fields.text({ label: 'WhatsApp', defaultValue: '628' }),
        pesanWA: fields.text({ label: 'Pesan WA' }),
        jadwalHari: fields.text({ label: 'Hari' }),
        jadwalJam: fields.text({ label: 'Jam' }),
      }
    }),
    pengaturanWebsite: singleton({
      label: 'Pengaturan Footer & Kontak',
      path: 'src/content/pengaturan/website',
      format: { data: 'json' },
      schema: {
        deskripsiSingkat: fields.text({ 
          label: 'Deskripsi Singkat Footer', 
          multiline: true,
          defaultValue: 'Mendidik dengan hati, membangun generasi mandiri dan berkarakter.'
        }),
        alamat: fields.text({ 
          label: 'Alamat Lengkap', 
          multiline: true 
        }),
        telepon: fields.text({ label: 'Nomor Telepon / WhatsApp (Format: +62...)' }),
        email: fields.text({ label: 'Email Sekolah' }),
        linkGoogleMap: fields.text({
          label: 'Link Embed Google Maps',
          description: 'Hanya masukkan URL (link) dari bagian src="..." saat Anda mengcopy embed code dari Google Maps.',
        }),
        facebook: fields.text({ label: 'Link Facebook (Opsional)' }),
        instagram: fields.text({ label: 'Link Instagram (Opsional)' }),
        youtube: fields.text({ label: 'Link YouTube (Opsional)' }),
      },
    }),
  },
});