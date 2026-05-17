# Fitur yang Masih Kurang dan Belum Sempurna

Dokumen ini mencatat area Belajar Sobri yang sudah berjalan, tetapi masih bisa dibuat lebih matang agar pengalaman belajar lebih profesional, aman, dan mudah dikembangkan.

## Prioritas Tinggi

1. **Akun pengguna dan sinkronisasi cloud**
   - Saat ini progres tersimpan di LocalStorage browser, sehingga data bisa hilang jika cache dihapus atau pengguna pindah perangkat.
   - Idealnya tersedia login, backup cloud, dan sinkronisasi antar perangkat.

2. **Panel admin bank soal**
   - Bank soal masih berupa berkas JSON lokal.
   - Dibutuhkan dashboard admin untuk tambah, ubah, impor, ekspor, validasi jawaban, dan menandai kualitas soal.

3. **Pembahasan lebih kaya**
   - Pembahasan perlu dilengkapi referensi, tag subtopik, tingkat keyakinan, dan tautan bacaan lanjutan.
   - Untuk Onkologi Radiasi, pembahasan sebaiknya memiliki rujukan akademik/klinis yang jelas.

4. **Mode ujian penuh**
   - Perlu simulasi ujian dengan timer, aturan jeda, navigasi nomor soal, review sebelum submit, dan skor akhir yang lebih mirip ujian sesungguhnya.

5. **Analitik kelemahan yang lebih detail**
   - Statistik sudah ada, tetapi masih bisa ditingkatkan menjadi analisis per topik, tren mingguan, akurasi berdasarkan tingkat kesulitan, dan rekomendasi otomatis.

## Prioritas Menengah

1. **Spaced repetition**
   - Soal yang salah sebaiknya muncul kembali berdasarkan jadwal pengulangan terencana.
   - Bookmark dapat diubah menjadi sistem kartu belajar dengan status `baru`, `dipelajari`, `dikuasai`, dan `perlu ulang`.

2. **Pencarian dan filter lanjutan**
   - Bank soal perlu filter gabungan berdasarkan kategori, topik, tingkat kesulitan, status pernah salah, bookmark, dan kata kunci pembahasan.

3. **PWA offline yang lebih kuat**
   - Aplikasi sudah memiliki manifest dan service worker, tetapi perlu strategi cache yang lebih lengkap, halaman offline, dan notifikasi update versi.

4. **Ekspor laporan belajar**
   - Tambahkan ekspor PDF/CSV untuk progres harian, riwayat sesi, topik lemah, dan target berikutnya.

5. **Aksesibilitas lanjutan**
   - Perlu audit keyboard navigation, kontras warna, label komponen interaktif, dan dukungan pembaca layar pada semua mode kuis.

## Prioritas Rendah

1. **Gamifikasi**
   - Badge, level, misi mingguan, dan pencapaian dapat meningkatkan motivasi jika tidak mengganggu fokus belajar.

2. **Tema visual tambahan**
   - Tambahkan tema warna, mode fokus rendah distraksi, dan opsi ukuran font.

3. **Kolaborasi mentor**
   - Mentor dapat memberi catatan pada hasil latihan, meninjau topik lemah, dan membuat paket soal khusus.

4. **Integrasi kalender**
   - Target belajar dapat dikirim ke Google Calendar/ICS agar jadwal lebih disiplin.

## Catatan Kesempurnaan Produk

- Logo dan favicon sudah ditambahkan agar identitas visual lebih konsisten.
- Dashboard sudah dibuat lebih informatif dengan kartu fokus, ringkasan progres, dan CTA yang lebih jelas.
- Area yang paling penting berikutnya adalah penyimpanan cloud, panel admin soal, dan mode ujian penuh karena ketiganya berdampak langsung pada keandalan aplikasi sebagai alat belajar jangka panjang.
