<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import StatCard from '../components/StatCard.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { getSettings } from '../utils/storage'
import { getTodayStats, getOverallStats, getBestWorstCategory } from '../utils/statistics'
import { getWeakTopics } from '../utils/quizEngine'

const router = useRouter()
const settings = computed(getSettings)
const today = computed(getTodayStats)
const overall = computed(getOverallStats)
const bw = computed(getBestWorstCategory)
const weak = computed(() => getWeakTopics('Onkologi Radiasi')[0]?.topic || 'Radiobiologi')
const progressPercent = computed(() => Math.min(100, Math.round((today.value.answered / settings.value.dailyTarget) * 100)))

const focusCards = [
  { title: 'SIMAK UI', copy: 'Latih penalaran kuantitatif, verbal, dan logika dengan paket cepat.', to: '/simak-ui', accent: 'blue' },
  { title: 'LPDP', copy: 'Rapikan wawasan kebangsaan, esai, dan simulasi seleksi beasiswa.', to: '/lpdp', accent: 'purple' },
  { title: 'Onkologi Radiasi', copy: 'Perkuat radiobiologi, fisika radiasi, staging, dan prinsip klinis.', to: '/onkologi-radiasi', accent: 'green' },
]
</script>

<template>
  <section class="page">
    <div class="hero hero-polished">
      <div class="hero-copy">
        <span class="eyebrow">Dashboard belajar profesional</span>
        <h1>Halo, Sobri. Belajar lebih rapi, terukur, dan konsisten.</h1>
        <p>
          Target harian {{ settings.dailyTarget }} soal dengan prioritas Onkologi Radiasi, didukung bank soal lokal,
          bookmark, riwayat, statistik, serta pengaturan yang tetap aman di browser.
        </p>
        <div class="hero-actions">
          <button class="btn xl" type="button" @click="router.push('/daily')">Mulai 50 Soal Acak</button>
          <button class="btn ghost xl" type="button" @click="router.push('/bank-soal')">Lihat Bank Soal</button>
        </div>
      </div>

      <div class="hero-panel" aria-label="Ringkasan progres harian">
        <img src="/logo.svg" alt="Belajar Sobri" />
        <div class="progress-orb" :style="{ '--progress': `${progressPercent}%` }">
          <strong>{{ progressPercent }}%</strong>
          <span>target hari ini</span>
        </div>
        <div class="hero-mini-grid">
          <span><b>{{ today.answered }}</b> dikerjakan</span>
          <span><b>{{ today.accuracy }}%</b> akurasi</span>
          <span><b>{{ overall.streak }}</b> hari streak</span>
        </div>
      </div>
    </div>

    <ProgressBar :value="today.answered" :max="settings.dailyTarget" label="Progress harian" />

    <div class="stat-grid">
      <StatCard title="Dikerjakan hari ini" :value="today.answered" :helper="`Akurasi ${today.accuracy}%`" />
      <StatCard title="Total jawaban" :value="overall.totalAnswered" helper="Semua riwayat localStorage" />
      <StatCard title="Streak belajar" :value="`${overall.streak} hari`" helper="Bertambah saat sesi selesai" tone="green" />
      <StatCard title="Kategori terkuat" :value="bw.strongest" helper="Berdasarkan akurasi" />
      <StatCard title="Kategori terlemah" :value="bw.weakest" helper="Butuh pengulangan" tone="amber" />
      <StatCard title="Rekomendasi" :value="weak" helper="Topik latihan berikutnya" tone="purple" />
    </div>

    <div class="focus-grid">
      <article v-for="card in focusCards" :key="card.to" class="card focus-card" :class="`focus-${card.accent}`">
        <span class="pill">Fokus</span>
        <h2>{{ card.title }}</h2>
        <p>{{ card.copy }}</p>
        <button class="btn ghost" type="button" @click="router.push(card.to)">Buka modul</button>
      </article>
    </div>

    <div class="card daily-plan-card">
      <div>
        <span class="eyebrow">Rencana hari ini</span>
        <h2>Pakai pola 20/20/60 agar latihan tetap seimbang.</h2>
        <p>
          Komposisi mode Semua: 20% SIMAK UI, 20% LPDP, dan 60% Onkologi Radiasi. Gunakan statistik dan riwayat
          untuk mengulang topik yang akurasinya paling rendah.
        </p>
      </div>
      <button class="btn success" type="button" @click="router.push('/statistik')">Cek statistik</button>
    </div>
  </section>
</template>
