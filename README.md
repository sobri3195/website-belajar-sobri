# Belajar Sobri

Belajar Sobri adalah website Vue 3 + Vite yang 100% frontend-only untuk latihan harian Sobri. Aplikasi membantu latihan SIMAK UI, LPDP, dan persiapan seleksi spesialis dengan prioritas Onkologi Radiasi.

## Struktur folder

```text
src/
  assets/
  components/
    Sidebar.vue
    MobileNavbar.vue
    QuestionCard.vue
    ProgressBar.vue
    StatCard.vue
    QuizResult.vue
    CategoryBadge.vue
    DifficultyBadge.vue
    ConfirmModal.vue
  pages/
    Dashboard.vue
    DailyPractice.vue
    SimakUI.vue
    LPDP.vue
    OncologyRadiation.vue
    QuestionBank.vue
    Bookmarks.vue
    History.vue
    Statistics.vue
    Settings.vue
  data/
    questions.json
  utils/
    storage.js
    quizEngine.js
    dateUtils.js
    statistics.js
  router/
    index.js
  App.vue
  main.js
  style.css
```

## Fitur utama

- Latihan harian minimal 50 soal acak dengan komposisi default 20% SIMAK UI, 20% LPDP, dan 60% Onkologi Radiasi.
- Set soal harian disimpan berdasarkan tanggal agar tidak berubah pada hari yang sama.
- Progress, jawaban, bookmark, riwayat sesi, streak, dan pengaturan disimpan di LocalStorage.
- Bank soal lokal berbasis `src/data/questions.json` berisi 150 soal dummy orisinal: 40 SIMAK UI, 40 LPDP, dan 70 Onkologi Radiasi.
- Dashboard, halaman kategori, mode kuis satu soal per halaman, statistik Chart.js, dark mode, export/import progress, dan reset data.

## LocalStorage keys

- `sobri_user_settings`
- `sobri_daily_practice`
- `sobri_answer_history`
- `sobri_bookmarks`
- `sobri_quiz_sessions`
- `sobri_streak_data`
- `sobri_weak_topics`
- `sobri_question_frequency`

## Install lokal

```bash
npm create vite@latest belajar-sobri -- --template vue
cd belajar-sobri
npm install
npm install vue-router chart.js vue-chartjs
npm run dev
```

Pada repository ini scaffold sudah tersedia, sehingga cukup jalankan:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy ke Vercel

1. Push project ke GitHub.
2. Buka Vercel.
3. Import repository.
4. Framework preset: Vite.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

## Menambah soal baru

Tambahkan objek baru ke `src/data/questions.json` dengan format berikut:

```json
{
  "id": "OR-071",
  "kategori": "Onkologi Radiasi",
  "subkategori": "Radiobiologi",
  "tingkat_kesulitan": "Sedang",
  "pertanyaan": "Isi pertanyaan orisinal...",
  "opsi": {
    "A": "Pilihan A",
    "B": "Pilihan B",
    "C": "Pilihan C",
    "D": "Pilihan D",
    "E": "Pilihan E"
  },
  "jawaban_benar": "C",
  "pembahasan": "Pembahasan lengkap dan edukatif.",
  "tags": ["radiobiologi", "fraksinasi", "radioterapi"]
}
```

Pastikan `id` unik, kategori/subkategori konsisten, dan soal tidak menyalin soal resmi dari SIMAK UI, LPDP, atau ujian spesialis.

## Frontend-only

Aplikasi ini tidak memakai backend, database server, login server, atau API eksternal. Semua soal berada di JSON lokal dan semua progress tersimpan di browser menggunakan LocalStorage.
