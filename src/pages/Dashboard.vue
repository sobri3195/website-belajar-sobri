<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import StatCard from '../components/StatCard.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { getSettings } from '../utils/storage'
import { getTodayStats, getOverallStats, getBestWorstCategory } from '../utils/statistics'
import { getWeakTopics } from '../utils/quizEngine'
const router = useRouter(); const settings = computed(getSettings); const today = computed(getTodayStats); const overall = computed(getOverallStats); const bw = computed(getBestWorstCategory); const weak = computed(() => getWeakTopics('Onkologi Radiasi')[0]?.topic || 'Radiobiologi')
</script>
<template><section class="page"><div class="hero"><div><span class="eyebrow">Dashboard belajar profesional</span><h1>Halo, Sobri</h1><p>Target harian default {{ settings.dailyTarget }} soal dengan bobot utama Onkologi Radiasi agar persiapan spesialis tetap konsisten.</p></div><button class="btn xl" @click="router.push('/daily')">Mulai 50 Soal Acak</button></div><ProgressBar :value="today.answered" :max="settings.dailyTarget" label="Progress harian"/><div class="stat-grid"><StatCard title="Dikerjakan hari ini" :value="today.answered" :helper="`Akurasi ${today.accuracy}%`"/><StatCard title="Total jawaban" :value="overall.totalAnswered" helper="Semua riwayat localStorage"/><StatCard title="Streak belajar" :value="`${overall.streak} hari`" helper="Bertambah saat sesi selesai" tone="green"/><StatCard title="Kategori terkuat" :value="bw.strongest" helper="Berdasarkan akurasi"/><StatCard title="Kategori terlemah" :value="bw.weakest" helper="Butuh pengulangan" tone="amber"/><StatCard title="Rekomendasi" :value="weak" helper="Topik latihan berikutnya" tone="purple"/></div><div class="card"><h2>Rencana hari ini</h2><p>Komposisi mode Semua: 20% SIMAK UI, 20% LPDP, dan 60% Onkologi Radiasi. Data tersimpan hanya di browser Sobri.</p></div></section></template>
